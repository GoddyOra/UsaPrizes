// Phase 3 pipeline: pulls the latest draw(s) for each tracked game from data.ny.gov's Socrata
// (SODA) API and writes them into src/data/lottery/*.json.
//
// Games are grouped by "shape" — the datasets don't share one schema, so each shape has its own
// parsing logic:
//   - "jackpot":      multi-state rolling-jackpot games (Powerball, Mega Millions, Millionaire
//                      for Life). numbers[] + a special ball, drawn on fixed weekdays.
//   - "bonus":         NY Lotto. numbers[] + a bonus ball that only affects secondary prize
//                      tiers (not required to win the jackpot), drawn on fixed weekdays.
//   - "twice-daily":   NY Numbers (pick 3) and Win 4 (pick 4). One row per day with separate
//                      midday/evening columns, drawn every day — no rolling jackpot or "next
//                      draw date" concept.
//
// Dataset resource IDs (confirmed via each dataset's data.gov/data.ny.gov listing):
//   Powerball:            d6yy-54nr
//   Mega Millions:        5xaw-6ayf
//   Millionaire for Life: a4w9-a3tp  (launched Feb 22, 2026, replacing the retired Cash4Life)
//   NY Lotto:             6nbc-h7bj
//   Numbers (pick 3):     n4w8-wxte
//   Win 4 (pick 4):       hj4u-8nyt
//
// The "twice-daily" resource IDs and their exact field names could not be verified from this
// sandbox (data.ny.gov blocks its outbound requests — see Phase 3 notes) or confirmed against a
// live API response before shipping. Parsing is written defensively: on any unexpected shape it
// logs the raw row and fails loudly rather than writing bad data, so a live Actions run will
// surface a clear, fixable error if a field name guess is wrong — the same process that caught
// the Mega Millions schema difference originally.
//
// No app token is required for light use (Socrata allows ~500 req/hr per IP without one).
// Optionally set SOCRATA_APP_TOKEN (a free token from https://data.ny.gov/profile/app_tokens)
// as a GitHub Actions secret to raise that ceiling and avoid throttling — not required to run.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const GAMES = [
  {
    slug: 'powerball',
    shape: 'jackpot',
    resourceId: 'd6yy-54nr',
    jsonPath: new URL('../src/data/lottery/powerball.json', import.meta.url),
    displayName: 'Powerball',
    specialBallName: 'Powerball',
    // 0 = Sunday ... 6 = Saturday. Powerball draws Mon/Wed/Sat.
    drawDaysOfWeek: [1, 3, 6],
  },
  {
    slug: 'mega-millions',
    shape: 'jackpot',
    resourceId: '5xaw-6ayf',
    jsonPath: new URL('../src/data/lottery/mega-millions.json', import.meta.url),
    displayName: 'Mega Millions',
    specialBallName: 'Mega Ball',
    // Unlike Powerball, this dataset reports the Mega Ball as its own field rather than
    // folding it into "winning_numbers" (confirmed via a live Actions run on 2026-08-26).
    specialBallField: 'mega_ball',
    // Mega Millions draws Tue/Fri.
    drawDaysOfWeek: [2, 5],
  },
  {
    slug: 'millionaire-for-life',
    shape: 'jackpot',
    resourceId: 'a4w9-a3tp',
    jsonPath: new URL('../src/data/lottery/millionaire-for-life.json', import.meta.url),
    displayName: 'Millionaire for Life',
    specialBallName: 'Million Ball',
    // Not independently confirmed which field the bonus ball lands in — falls back to the
    // last entry in winning_numbers (the Powerball-style pattern) if no dedicated field is
    // found. Fixed top prize, not a rolling jackpot — see fixedTopPrize below.
    specialBallField: 'million_ball',
    // Drawn every night.
    drawDaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    fixedTopPrize: '$1,000,000 a year for life',
  },
  {
    slug: 'ny-lotto',
    shape: 'bonus',
    resourceId: '6nbc-h7bj',
    jsonPath: new URL('../src/data/lottery/ny-lotto.json', import.meta.url),
    displayName: 'NY Lotto',
    bonusField: 'bonus',
    // NY Lotto draws Wed/Sat.
    drawDaysOfWeek: [3, 6],
  },
  {
    slug: 'numbers',
    shape: 'twice-daily',
    resourceId: 'n4w8-wxte',
    jsonPath: new URL('../src/data/lottery/numbers.json', import.meta.url),
    displayName: 'Numbers',
    digits: 3,
    middayField: 'midday_daily',
    eveningField: 'evening_daily',
  },
  {
    slug: 'win4',
    shape: 'twice-daily',
    resourceId: 'hj4u-8nyt',
    jsonPath: new URL('../src/data/lottery/win4.json', import.meta.url),
    displayName: 'Win 4',
    digits: 4,
    middayField: 'midday_win_4',
    eveningField: 'evening_win_4',
  },
];

function nextDrawDateISO(drawDaysOfWeek, fromDate = new Date()) {
  const d = new Date(Date.UTC(fromDate.getUTCFullYear(), fromDate.getUTCMonth(), fromDate.getUTCDate()));
  for (let i = 1; i <= 7; i++) {
    d.setUTCDate(d.getUTCDate() + 1);
    if (drawDaysOfWeek.includes(d.getUTCDay())) {
      return d.toISOString().slice(0, 10);
    }
  }
  return null;
}

async function fetchRows(resourceId, params) {
  const url = `https://data.ny.gov/resource/${resourceId}.json?${params}`;
  const headers = { Accept: 'application/json' };
  if (process.env.SOCRATA_APP_TOKEN) {
    headers['X-App-Token'] = process.env.SOCRATA_APP_TOKEN;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Socrata request failed: ${res.status} ${res.statusText} — ${url}`);
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No rows returned from ${url}`);
  }
  return rows;
}

function parseWinningNumbers(row, game) {
  const winningNumbersRaw = row.winning_numbers;
  if (!winningNumbersRaw) {
    console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
    throw new Error(`Expected a "winning_numbers" field, got keys: ${Object.keys(row).join(', ')}`);
  }

  const numbers = String(winningNumbersRaw).trim().split(/\s+/).map(Number);

  let special;
  const specialField = game.specialBallField ?? game.bonusField;
  if (specialField && row[specialField] !== undefined) {
    special = Number(row[specialField]);
    if (Number.isNaN(special)) {
      console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
      throw new Error(`Expected numeric "${specialField}" field`);
    }
  } else if (game.shape === 'jackpot') {
    // No dedicated field — the special ball is the last entry in winning_numbers (the
    // Powerball-style pattern).
    if (numbers.length < 2) {
      console.error('Unexpected winning_numbers format — raw row:', JSON.stringify(row, null, 2));
      throw new Error(`Could not parse "winning_numbers": "${winningNumbersRaw}"`);
    }
    special = numbers.pop();
  }

  if (numbers.some(Number.isNaN)) {
    console.error('Unexpected winning_numbers format — raw row:', JSON.stringify(row, null, 2));
    throw new Error(`Could not parse "winning_numbers": "${winningNumbersRaw}"`);
  }

  return { numbers, special };
}

async function updateJackpotGame(game) {
  const filePath = fileURLToPath(game.jsonPath);
  const current = JSON.parse(await readFile(filePath, 'utf-8'));

  const rows = await fetchRows(game.resourceId, '$limit=1&$order=draw_date%20DESC');
  const row = rows[0];
  const drawDate = row.draw_date;
  if (!drawDate) {
    console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
    throw new Error(`Expected a "draw_date" field, got keys: ${Object.keys(row).join(', ')}`);
  }
  const drawDateISO = new Date(drawDate).toISOString().slice(0, 10);

  if (current.drawDate === drawDateISO) {
    console.log(`${game.displayName}: no new draw since ${current.drawDate}, skipping.`);
    return false;
  }

  const { numbers, special } = parseWinningNumbers(row, game);

  const updated = {
    game: game.displayName,
    drawDate: drawDateISO,
    numbers,
    ...(game.shape === 'jackpot'
      ? { specialBall: special, specialBallName: game.specialBallName, jackpot: null }
      : { bonus: special ?? null }),
    ...(game.fixedTopPrize ? { fixedTopPrize: game.fixedTopPrize } : {}),
    nextDrawDate: nextDrawDateISO(game.drawDaysOfWeek),
    lastUpdated: new Date().toISOString(),
  };

  await writeFile(filePath, JSON.stringify(updated, null, 2) + '\n');
  console.log(`${game.displayName}: updated to draw date ${drawDateISO}.`);
  return true;
}

function digitsArray(rawValue, digitCount) {
  const n = Number(rawValue);
  if (Number.isNaN(n)) return null;
  return String(Math.trunc(n)).padStart(digitCount, '0').split('').map(Number);
}

async function updateTwiceDailyGame(game) {
  const filePath = fileURLToPath(game.jsonPath);
  const current = JSON.parse(await readFile(filePath, 'utf-8'));

  const rows = await fetchRows(game.resourceId, '$limit=1&$order=draw_date%20DESC');
  const row = rows[0];
  const drawDate = row.draw_date;
  if (!drawDate) {
    console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
    throw new Error(`Expected a "draw_date" field, got keys: ${Object.keys(row).join(', ')}`);
  }
  const drawDateISO = new Date(drawDate).toISOString().slice(0, 10);

  if (current.drawDate === drawDateISO) {
    console.log(`${game.displayName}: no new draw date since ${current.drawDate}, skipping.`);
    return false;
  }

  if (!(game.middayField in row) && !(game.eveningField in row)) {
    console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
    throw new Error(
      `Expected "${game.middayField}" and/or "${game.eveningField}" fields, got keys: ${Object.keys(row).join(', ')}`
    );
  }

  const midday = digitsArray(row[game.middayField], game.digits);
  const evening = digitsArray(row[game.eveningField], game.digits);

  const updated = {
    game: game.displayName,
    drawDate: drawDateISO,
    midday,
    evening,
    lastUpdated: new Date().toISOString(),
  };

  await writeFile(filePath, JSON.stringify(updated, null, 2) + '\n');
  console.log(`${game.displayName}: updated to draw date ${drawDateISO}.`);
  return true;
}

for (const game of GAMES) {
  try {
    if (game.shape === 'twice-daily') {
      await updateTwiceDailyGame(game);
    } else {
      await updateJackpotGame(game);
    }
  } catch (err) {
    console.error(`${game.displayName}: FAILED —`, err.message);
    process.exitCode = 1;
  }
}
