# Article Batch 2 — Plan (10 articles, ~1,500 words each)

Prepared 2026-09-02. Titles + SEO strategy only — no articles drafted yet, per request. Follows
the same content workflow as everything else on the site: Claude drafts once this plan is
approved, Mark fact-checks (especially anything state-specific or brand-specific), then publish
and log in `CONTENT_LOG.md`.

## Research basis

Grounded in live search research (Sept 2026), not assumption:
- **Crown Coins Casino** is a real, currently-trending brand (2nd most-searched sweepstakes
  casino in July 2026, per category-demand tracking) that we don't cover yet.
- **Lottery tax by state** and **biggest jackpots ever** are proven high-demand formats — multiple
  competitor sites exist just for these angles.
- **KYC/verification friction** is a confirmed, recurring pain point in what people search for
  help with ("account got flagged" is the most common complaint pattern found).
- **"Sites like Chumba" / head-to-head comparisons** are an established, popular format across
  every competitor in this space.

## Cross-cutting SEO strategy (applies to all 10)

- **Word count:** ~1,500 words each — enough depth to be genuinely information-rich per Google's
  helpful-content signals, not padded.
- **Title format:** primary keyword near the front, specific enough to earn clicks against
  generic competitor titles, kept close to ~55-60 characters so it doesn't truncate in search
  results. Each one below is written as the actual page `<title>`/H1, not just a working label.
- **Inlinks (internal, guaranteed):** every article links to at least 2 existing pages (a
  cornerstone page — a review, the roundup, or a lottery result page — plus a related guide), and
  at least one *existing* page gets a new contextual link added pointing into the new article, so
  nothing launches as an orphan page. Listed per article below.
- **Outbound citations ("backlinks" in the sense content can actually control):** each links out
  to 1-2 authoritative primary sources (official state lottery sites, IRS guidance, etc.) — real
  E-E-A-T practice, not a promise of inbound links.
- **Structure:** every article gets a short direct-answer opening (targets the featured-snippet
  box), a scannable table or comparison element where the topic supports one (matches what
  currently ranks for these query types), and an FAQ block using the existing `FaqAccordion`
  component + `FAQPage` schema.
- **Tone:** same voice as existing guides — direct, specific, hedges honestly where facts are
  genuinely state-dependent or time-sensitive, no filler intros.

---

## 1. Biggest Powerball and Mega Millions Jackpots Ever Won

- **Slug:** `/guides/biggest-lottery-jackpots-ever-won/`
- **Primary keyword:** "biggest lottery jackpots ever" / "biggest Powerball winners"
- **Intent:** informational, high curiosity/evergreen — confirmed one of the most-searched lottery
  question patterns ("who won the $X billion jackpot").
- **Why this is the safe version of "winner" content:** uses public-record, already-reported
  jackpots (like the confirmed Dec 2025 $1.817B Powerball win), not real-time unverified claims —
  fits the same honest-sourcing standard as the rest of the site.
- **Structure:** ranked table of the largest jackpots (game, amount, date, state sold), then brief
  context per top entry, then a section on lump-sum-vs-annuity choices those winners actually
  faced.
- **Inlinks:** links to `/lottery/powerball/`, `/lottery/mega-millions/`,
  `/guides/powerball-vs-mega-millions-odds/`, `/guides/how-lottery-winnings-are-taxed/`. Add a
  link into this article from `/guides/how-to-check-powerball-numbers/`'s "if you actually won"
  section.
- **Outbound citations:** state lottery press releases for the specific jackpots cited.
- **Fact-check flag:** every jackpot figure/date/location needs verification at write time —
  these are exactly the kind of specific claims that need citing a real source per entry, not
  asserting from memory.

## 2. Lottery Taxes by State: Which States Take the Most (and Least)

- **Slug:** `/guides/lottery-taxes-by-state/`
- **Primary keyword:** "lottery taxes by state" / "states with no lottery tax"
- **Intent:** commercial-investigation-adjacent informational — proven dedicated-page format.
- **Structure:** direct-answer opener (the 11 no-tax jurisdictions), full 50-state comparison
  table, then a worked example (e.g., "$1B jackpot: Texas vs. New York" dollar difference) for
  concreteness.
- **Inlinks:** links to `/guides/how-lottery-winnings-are-taxed/` (the existing general guide —
  this is the state-by-state deep-dive companion to it) and `/lottery/powerball/` +
  `/lottery/mega-millions/`. Add a link into this article from the existing tax guide's "state
  taxes are separate" section.
- **Outbound citations:** state department of revenue pages for a few notable states (highest/
  lowest), IRS withholding guidance.
- **Fact-check flag:** the full 50-state table needs a real verification pass — state tax rates
  change; don't publish a stale table.

## 3. Can You Stay Anonymous After Winning the Lottery? A State-by-State Guide

- **Slug:** `/guides/lottery-winner-anonymity-by-state/`
- **Primary keyword:** "can you stay anonymous after winning the lottery"
- **Intent:** high-curiosity informational, distinct enough from the existing claim guide (which
  only touches this briefly) to earn its own ranking.
- **Structure:** direct answer (depends on the state the ticket was sold in, not where you live),
  table of anonymity-permitting states, explanation of trust/LLC claiming mechanisms, and honest
  framing that this list shifts as state laws change.
- **Inlinks:** links to `/guides/how-to-claim-a-lottery-prize/` (expands on its anonymity mention)
  and `/lottery/powerball/` + `/lottery/mega-millions/`. Add a link into this article from the
  claim guide's anonymity paragraph.
- **Outbound citations:** a couple of state lottery FAQ pages that explicitly state their
  anonymity policy.
- **Fact-check flag:** the anonymity-state list needs re-confirmation at write time — this is a
  patchwork that changes as legislatures act.

## 4. Cash Option vs. Annuity: Which Should You Choose If You Win the Lottery?

- **Slug:** `/guides/lottery-cash-option-vs-annuity/`
- **Primary keyword:** "lottery cash option vs annuity" / "lump sum or annuity lottery"
- **Intent:** decision-support informational, financial-planning-adjacent — a real gap since the
  claim guide only mentions this exists without explaining the actual tradeoffs.
- **Structure:** plain-language explanation of both options, a factors-to-consider list (tax
  bracket smoothing, inflation, overspending risk, estate planning), explicitly framed as "talk to
  a professional" rather than telling readers which to pick.
- **Inlinks:** links to `/guides/how-to-claim-a-lottery-prize/`, `/guides/how-lottery-winnings-are-taxed/`,
  `/guides/biggest-lottery-jackpots-ever-won/` (new, #1 above). Add a link into this article from
  the claim guide's "lump sum vs. annuity" section.
- **Outbound citations:** a reputable financial-planning source on structured payouts (e.g., a
  CFP board or major personal-finance publisher's explainer).
- **Fact-check flag:** none state-specific — lower-risk piece; still avoid presenting either
  option as objectively "better."

## 5. Crown Coins Casino Review: Is It Legit? Bonuses & Redemption (2026)

- **Slug:** `/casinos/reviews/crown-coins/`
- **Primary keyword:** "Crown Coins Casino review" / "is Crown Coins Casino legit"
- **Intent:** commercial investigation — same template as the existing 7 reviews, added because
  it's a confirmed currently-trending brand we're missing.
- **Structure:** same review template as existing brands (verdict, at-a-glance table, pros/cons,
  FAQ, hands-on-verification badge) — this becomes an 8th entry in `casinos.json`, not a
  standalone article, so it inherits the existing Review + FAQPage schema automatically.
- **Inlinks:** appears in `/casinos/`, gets added to `/casinos/best-sweepstakes-casinos/`'s
  ranking and comparison table, and `/casinos/legal-by-state/`. Add a mention/link from
  `/guides/what-is-a-gold-coin/` and `/guides/how-sweepstakes-casinos-work/` where the existing 7
  brands are used as examples, if natural.
- **Outbound citations:** Crown Coins' own official site (already need to verify its real URL,
  same process as the original 7 — don't guess it).
- **Fact-check flag:** full research pass needed exactly like the original 7 (official URL,
  welcome bonus figures, state availability, payment methods) — this is a net-new review, not a
  lighter-weight article, so it should go through the same rigor.

## 6. Sweepstakes Casino KYC Verification: What to Expect and How to Avoid Delays

- **Slug:** `/guides/sweepstakes-casino-kyc-verification/`
- **Primary keyword:** "sweepstakes casino verification" / "sweepstakes casino KYC"
- **Intent:** practical how-to, confirmed real pain point (the #1 complaint pattern found in
  research is redemption delays caused by skipping/mistiming verification).
- **Structure:** what KYC actually is, what documents are typically needed, the single biggest
  practical tip (verify early — before your first redemption attempt, not at the moment you want
  to cash out), and a short "why my account got flagged" troubleshooting section.
- **Inlinks:** links to `/guides/how-to-redeem-sweepstakes-winnings/` (direct companion piece) and
  2-3 individual reviews where verification is mentioned in their "at a glance" table. Add a link
  into this article from the redemption guide.
- **Outbound citations:** not much authoritative external material fits naturally here; optional
  general KYC/AML explainer if one is genuinely useful, otherwise skip rather than force one.
- **Fact-check flag:** low — this is general-process content, not brand-specific claims.

## 7. Chumba vs. Pulsz: Which Sweepstakes Casino Is Better in 2026?

- **Slug:** `/guides/chumba-vs-pulsz/`
- **Primary keyword:** "Chumba vs Pulsz"
- **Intent:** commercial comparison — validated format (head-to-head comparisons are a proven
  popular pattern in this niche).
- **Structure:** direct-answer opener (depends on what you value — established track record vs.
  simpler model), side-by-side comparison table pulling from both existing reviews' real data
  (welcome bonus, redemption speed, state availability), verdict by use case.
- **Inlinks:** links directly to `/casinos/reviews/chumba/` and `/casinos/reviews/pulsz/` (both
  ways — add links into this article from both review pages' "at a glance" sections too) and
  `/casinos/best-sweepstakes-casinos/`.
- **Outbound citations:** none needed — this is a data comparison built from our own already-
  sourced review content, not new external claims.
- **Fact-check flag:** none new — pulls from already-verified review data, just needs consistency
  checking against those pages at write time in case either review has been refreshed since.

## 8. Best Sweepstakes Casinos for Slots vs. Table Games

- **Slug:** `/guides/best-sweepstakes-casinos-slots-vs-table-games/`
- **Primary keyword:** "best sweepstakes casino for slots" / "sweepstakes casino table games"
- **Intent:** commercial investigation, distinct angle from the overall roundup — people
  searching by game-type preference rather than "best overall."
- **Structure:** short section per game type (slots-focused picks vs. table-game-focused picks),
  pulling honestly from what's already documented in each review rather than inventing new game-
  library claims.
- **Inlinks:** links to all 7 (or 8, if Crown Coins is live by then) individual reviews and
  `/casinos/best-sweepstakes-casinos/`. Add a link into this article from the roundup page.
- **Outbound citations:** none needed.
- **Fact-check flag:** game-library specifics (which brand actually leans slots vs. table games)
  need a real check at write time — this isn't detailed in the current review data and shouldn't
  be invented.

## 9. Sweepstakes Casino VIP Programs and Loyalty Perks, Explained

- **Slug:** `/guides/sweepstakes-casino-vip-programs/`
- **Primary keyword:** "sweepstakes casino VIP program" / "sweepstakes casino loyalty rewards"
- **Intent:** informational, genuinely new angle — confirmed trending topic (multi-tier VIP
  programs, weekly cashback) not covered by any existing guide.
- **Structure:** what VIP/loyalty tiers typically offer (cashback %, bonus multipliers, dedicated
  support), how tiers are usually earned, honest framing that perks vary a lot by operator and
  shouldn't be the main reason to choose one.
- **Inlinks:** links to `/casinos/best-sweepstakes-casinos/` and 2-3 reviews where loyalty
  programs are genuinely a differentiator. Add a link into this article from
  `/guides/sweepstakes-casino-no-deposit-bonuses/` (natural companion — bonuses at signup vs.
  ongoing loyalty perks).
- **Outbound citations:** none needed.
- **Fact-check flag:** any specific brand's VIP tier details need real verification, not
  extrapolation — don't describe a program more precisely than what's actually confirmed.

## 10. New Sweepstakes Casinos Launching in 2026: How to Vet a New Site Before You Join

- **Slug:** `/guides/new-sweepstakes-casinos-2026/`
- **Primary keyword:** "new sweepstakes casinos 2026"
- **Intent:** discovery/freshness-oriented informational — captures people looking for what's new
  in the space, while steering them toward a safe evaluation process rather than just a list.
- **Structure:** brief current-landscape context (mentioning Crown Coins as a recent example of a
  brand that gained traction), then the real value: a concrete checklist for vetting *any* new
  sweepstakes casino before joining (state availability, real redemption terms, company
  transparency, review history) — reusable, evergreen framework.
- **Inlinks:** links to `/casinos/reviews/crown-coins/` (new, #5 above), `/casinos/legal-by-state/`,
  `/editorial-policy/#how-we-review` (reinforces our own methodology as the model for how to
  vet a site). Add a link into this article from `/casinos/` hub page.
- **Outbound citations:** none required; could reference a state gaming authority's general
  consumer-warning page on evaluating sweepstakes promotions if one fits naturally.
- **Fact-check flag:** avoid naming any brand as "new" or "trending" without a live check at
  write time — this list shifts fast, and the whole point of the article is teaching a durable
  evaluation method, not a snapshot list that goes stale in weeks.

---

## Suggested publishing order

Spread across the recommended 2-3/week cadence rather than all at once (per Phase 9's guidance):
1. Crown Coins review (#5) — highest commercial value, and #10 depends on it existing first.
2. Chumba vs. Pulsz (#7) and KYC guide (#6) — both lean on already-verified data, fastest to
   fact-check.
3. Lottery tax by state (#2) and anonymity guide (#3) — both need real state-data verification
   passes, group together.
4. Biggest jackpots ever (#1) and cash vs. annuity (#4) — round out the lottery pillar.
5. Slots-vs-table-games (#8), VIP programs (#9), then new-casinos-2026 (#10) last, since it
   references Crown Coins.
