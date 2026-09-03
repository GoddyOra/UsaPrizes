# Content Log

Running record of published/refreshed content, per the Phase 9 content workflow. One line per
piece: date, page, and whether it's new or a refresh. Keeps the publishing cadence visible and
gives us a real trail for the "sustained weekly cadence for 4+ consecutive weeks" exit criterion.

## 2026-08-26 — initial content build (Phase 4)

- New: `/casinos/reviews/chumba/`
- New: `/casinos/reviews/pulsz/`
- New: `/casinos/reviews/wow-vegas/`
- New: `/casinos/reviews/mcluck/`
- New: `/casinos/reviews/stake-us/`
- New: `/casinos/reviews/luckyland/`
- New: `/casinos/reviews/fortune-coins/`
- New: `/casinos/best-sweepstakes-casinos/`
- New: `/casinos/legal-by-state/`
- New: `/guides/how-sweepstakes-casinos-work/`
- New: `/guides/sweepstakes-vs-online-casinos/`
- New: `/guides/are-sweepstakes-casinos-legal/`
- New: `/guides/what-is-a-sweeps-coin/`
- New: `/guides/how-to-redeem-sweepstakes-winnings/`
- New: `/guides/sweepstakes-casino-no-deposit-bonuses/`
- New: `/guides/how-to-check-powerball-numbers/`
- New: `/guides/powerball-vs-mega-millions-odds/`
- New: `/guides/what-happens-if-no-one-wins-the-jackpot/`
- New: `/guides/how-lottery-winnings-are-taxed/`

## 2026-08-27 — Phase 7 trust pass

- Refresh: `/editorial-policy/` (named reviewer, honest methodology, real contact)
- Refresh: `/about/` (named reviewer, real contact)
- Refresh: all 7 casino reviews (byline + hands-on-verification status added)

## 2026-08-27 — Phase 9, second guide batch

- New: `/guides/what-is-a-gold-coin/` (companion to the existing Sweeps Coin guide)
- New: `/guides/sweepstakes-casino-minimum-age/`
- New: `/guides/how-to-claim-a-lottery-prize/`

## 2026-09-02 — Article Batch 2 (see docs/ARTICLE_BATCH_2_PLAN.md)

- New: `/casinos/reviews/crown-coins/` (8th brand — added to `casinos.json`, `legal-by-state/`)
- New: `/guides/chumba-vs-pulsz/`
- New: `/guides/sweepstakes-casino-kyc-verification/`
- New: `/guides/lottery-taxes-by-state/`
- New: `/guides/lottery-winner-anonymity-by-state/`
- New: `/guides/biggest-lottery-jackpots-ever-won/`
- New: `/guides/lottery-cash-option-vs-annuity/`
- New: `/guides/best-sweepstakes-casinos-slots-vs-table-games/`
- New: `/guides/sweepstakes-casino-vip-programs/`
- New: `/guides/new-sweepstakes-casinos-2026/`
- Refresh: `/guides/how-to-check-powerball-numbers/` (link to biggest jackpots)
- Refresh: `/guides/how-lottery-winnings-are-taxed/` (link to tax by state)
- Refresh: `/guides/how-to-claim-a-lottery-prize/` (links to anonymity + cash vs. annuity)
- Refresh: `/guides/how-to-redeem-sweepstakes-winnings/` (link to KYC guide)
- Refresh: `/guides/sweepstakes-casino-no-deposit-bonuses/` (link to VIP programs)
- Refresh: `/casinos/best-sweepstakes-casinos/` (new FAQ item, slots vs. table games link)
- Refresh: `/casinos/` (new Guides section)
- Refresh: FAQ entries on Chumba, Pulsz, WOW Vegas, Stake.us, LuckyLand reviews (cross-links)
- Template: guides now support an optional `faq` field (FaqAccordion + FAQPage schema); `FaqAccordion` renders answers as HTML to allow inline links

## 2026-09-03 — Lottery feed expansion (2 → 6 games)

- New: `/lottery/millionaire-for-life/` (multi-state, replaced the retired Cash4Life Feb 2026)
- New: `/lottery/ny-lotto/`
- New: `/lottery/numbers/` (midday + evening)
- New: `/lottery/win4/` (midday + evening)
- Refresh: `/lottery/` (split into Multi-state games / New York games sections)
- Refresh: `/` (live-feed stat count now derived from `src/lib/lottery-games.ts`, not hardcoded)
- Pipeline: `scripts/fetch-lottery-results.mjs` restructured to handle 3 dataset shapes (rolling
  jackpot, NY Lotto's bonus ball, twice-daily pick-3/pick-4) — see script header for resource IDs
  and the note on which field names still need live-run verification.
- `.github/workflows/lottery-results.yml` IndexNow step extended for the 4 new result files.

---

<!--
Add new entries above this line, newest section on top isn't required — just append chronologically.
Format: ## YYYY-MM-DD — short description, then a bullet per page (New: or Refresh:).
-->
