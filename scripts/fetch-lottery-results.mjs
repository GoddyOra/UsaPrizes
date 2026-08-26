// Phase 3 pipeline: pulls the latest Powerball / Mega Millions draw from data.ny.gov's
// Socrata (SODA) API and writes it into src/data/lottery/*.json.
//
// Dataset resource IDs (confirmed via each dataset's data.gov/data.ny.gov listing):
//   Powerball:     d6yy-54nr
//   Mega Millions: 5xaw-6ayf
//
// No app token is required for light use (Socrata allows ~500 req/hr per IP without one).
// Optionally set SOCRATA_APP_TOKEN (a free token from https://data.ny.gov/profile/app_tokens)
// as a GitHub Actions secret to raise that ceiling and avoid throttling — not required to run.
//
// NOTE: this dataset does not include jackpot amount or next-draw-date, so `jackpot` stays
// null (no free reliable source for live jackpot estimates yet) and `nextDrawDate` is computed
// locally from each game's known weekly draw schedule rather than pulled from the API.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const GAMES = [
  {
    slug: 'powerball',
    resourceId: 'd6yy-54nr',
    jsonPath: new URL('../src/data/lottery/powerball.json', import.meta.url),
    displayName: 'Powerball',
    specialBallName: 'Powerball',
    // 0 = Sunday ... 6 = Saturday. Powerball draws Mon/Wed/Sat.
    drawDaysOfWeek: [1, 3, 6],
  },
  {
    slug: 'mega-millions',
    resourceId: '5xaw-6ayf',
    jsonPath: new URL('../src/data/lottery/mega-millions.json', import.meta.url),
    displayName: 'Mega Millions',
    specialBallName: 'Mega Ball',
    // Mega Millions draws Tue/Fri.
    drawDaysOfWeek: [2, 5],
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

async function fetchLatestDraw(resourceId) {
  const url = `https://data.ny.gov/resource/${resourceId}.json?$limit=1&$order=draw_date%20DESC`;
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

  const row = rows[0];

  // The historical NY lottery datasets expose the draw as a "winning_numbers" string
  // (space-separated), with the special ball as the final number. Parse defensively and
  // dump the raw row on failure so a schema mismatch is immediately visible in the Action log.
  const drawDate = row.draw_date;
  const winningNumbersRaw = row.winning_numbers;

  if (!drawDate || !winningNumbersRaw) {
    console.error('Unexpected row shape from Socrata — raw row:', JSON.stringify(row, null, 2));
    throw new Error(
      `Expected "draw_date" and "winning_numbers" fields, got keys: ${Object.keys(row).join(', ')}`
    );
  }

  const parts = String(winningNumbersRaw).trim().split(/\s+/).map(Number);
  if (parts.length < 6 || parts.some(Number.isNaN)) {
    console.error('Unexpected winning_numbers format — raw row:', JSON.stringify(row, null, 2));
    throw new Error(`Could not parse "winning_numbers": "${winningNumbersRaw}"`);
  }

  const specialBall = parts[parts.length - 1];
  const numbers = parts.slice(0, parts.length - 1);

  return {
    drawDateISO: new Date(drawDate).toISOString().slice(0, 10),
    numbers,
    specialBall,
    multiplier: row.multiplier ?? null,
  };
}

async function updateGame(game) {
  const filePath = fileURLToPath(game.jsonPath);
  const current = JSON.parse(await readFile(filePath, 'utf-8'));

  const draw = await fetchLatestDraw(game.resourceId);

  if (current.drawDate === draw.drawDateISO) {
    console.log(`${game.displayName}: no new draw since ${current.drawDate}, skipping.`);
    return false;
  }

  const updated = {
    game: game.displayName,
    drawDate: draw.drawDateISO,
    numbers: draw.numbers,
    specialBall: draw.specialBall,
    specialBallName: game.specialBallName,
    jackpot: null,
    nextDrawDate: nextDrawDateISO(game.drawDaysOfWeek),
    lastUpdated: new Date().toISOString(),
  };

  await writeFile(filePath, JSON.stringify(updated, null, 2) + '\n');
  console.log(`${game.displayName}: updated to draw date ${draw.drawDateISO}.`);
  return true;
}

for (const game of GAMES) {
  try {
    await updateGame(game);
  } catch (err) {
    console.error(`${game.displayName}: FAILED —`, err.message);
    process.exitCode = 1;
  }
}
