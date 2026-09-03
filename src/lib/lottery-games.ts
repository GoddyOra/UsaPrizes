// Single source of truth for which lottery games have a live results page, so the homepage
// stat count and the /lottery/ hub can't drift out of sync the way the hardcoded "2" did.

export const multiStateGames = [
  { slug: 'powerball', name: 'Powerball', desc: 'Drawings every Monday, Wednesday, and Saturday.' },
  { slug: 'mega-millions', name: 'Mega Millions', desc: 'Drawings every Tuesday and Friday.' },
  { slug: 'millionaire-for-life', name: 'Millionaire for Life', desc: 'Drawings every night. Fixed $1,000,000-a-year-for-life top prize.' },
];

export const nyGames = [
  { slug: 'ny-lotto', name: 'NY Lotto', desc: 'Drawings every Wednesday and Saturday.' },
  { slug: 'numbers', name: 'Numbers', desc: 'Pick 3, drawn midday and evening, every day.' },
  { slug: 'win4', name: 'Win 4', desc: 'Pick 4, drawn midday and evening, every day.' },
];

export const allLotteryGames = [...multiStateGames, ...nyGames];
