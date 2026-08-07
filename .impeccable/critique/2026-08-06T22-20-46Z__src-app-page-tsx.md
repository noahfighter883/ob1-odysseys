---
target: OB1 Odysseys — full site (landing, odyssey index/detail, about, take-action, data)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-08-06T22-20-46Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a74d20ea77efa949c · B: a0381bb35d3a12981)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Sticky in-page nav on the odyssey page never scroll-spies to show which section you're in; header has no active-page state |
| 2 | Match System / Real World | 3/4 | Journalism structure (Problem → Analysis → CTA → Sources → Datasets) and domain terms map cleanly to a real investigative-report mental model |
| 3 | User Control and Freedom | 3/4 | Clear back links throughout; no odyssey-to-odyssey prev/next; external links open new tabs consistently |
| 4 | Consistency and Standards | 4/4 | Card/spacing/type rhythm is rigorously uniform across all seven pages |
| 5 | Error Prevention | 3/4 | Low-risk static site; only real action (CSV download) has no failure path to guard |
| 6 | Recognition Rather Than Recall | 3/4 | Sticky in-page nav aids long-scroll recall; dataset row counts repeated helpfully |
| 7 | Flexibility and Efficiency of Use | n/a | Persuade/Read hybrid surface, no power-user paths expected |
| 8 | Aesthetic and Minimalist Design | 2/4 | Downgraded from initial 3: confirmed pervasive WCAG-failing contrast across the ember/desert/dusk gradient system undercuts otherwise clean composition |
| 9 | Help Users Recognize/Diagnose/Recover from Errors | 0/4 | No `not-found.tsx` — a mistyped or dead odyssey link hits the raw unstyled Next.js default 404, no header/footer, no way back |
| 10 | Help and Documentation | n/a | Marketing/editorial site; the `/data` methodology page substitutes adequately |

**Total: 20/32 (63%) — Acceptable.** Solid structural bones, undermined by one systemic accessibility defect and one unhandled failure path.

## Design Specificity Verdict

**Design review**: The content is genuinely specific — a real 206-row wildfire dataset, a dual-axis chart built from live computed aggregates (not hardcoded numbers), three named era comparisons, row-level CSV source citations, copy that name-checks CAL FIRE/InciWeb/USFS. That's real data journalism, not placeholder copy. The three per-odyssey gradient themes (ember/desert/dusk) are a nice specific touch structurally.

But the chrome around that content is generic shadcn/Vercel-template output: sticky blurred header, identical `rounded-2xl border bg-card p-6` reused for thesis cards, CTA cards, source list, and dataset cards, default Lucide icons in a circle badge — a pattern found on thousands of SaaS marketing sites. Nothing in the visual language evokes "Jedi-inspired evangelist," expedition, or place — no persona presence, no map/waypoint motif despite having 86 real trail-waypoint coordinates sitting unused in the dataset. Strip the copy and this is any climate-nonprofit template.

**Detector evidence**: The CLI scan of `src/app` and `src/components` came back clean (0 findings on both), but Assessment B verified independently that the static-file detector is weak on computed-style issues like contrast — it hand-crafted a test file with a known-bad contrast pair and the CLI missed it. The browser-injected scan (the reliable signal) found 11 anti-patterns on `/`, 19 on `/odysseys/al-was-right`, 5 on `/odysseys/joshua-tree`, 1 on `/about`. Two findings directly corroborate the design-review verdict: `ai-color-palette` flagged the dusk theme's purple-to-tan gradient specifically — the same gradient the design review called out as generic and disconnected from the brand — and `nested-cards` (×3 on the landing page) confirms the "identical card pattern reused everywhere" observation with exact locations.

## Overall Impression

The content and data infrastructure are the real thing — sourced, computed, downloadable, structurally honest. The visual system that wraps it is competent but interchangeable, and it has one genuine, pervasive accessibility defect (white text over light gradient endpoints) that a design review alone wouldn't have quantified as precisely as the detector did. The single biggest opportunity: use the assets you already have — the persona, the trail waypoints, the era data — to make the chrome as specific as the content already is.

## What's Working

- **Real, sourced, downloadable data with row-level citations.** The `Download CSV` pattern on every dataset card plus the aggregated `/data` page makes the "show your work" thesis structurally true, not just claimed in copy.
- **Three-era table + dual-axis chart pairing**, both computed live from `getWildfireAnalysis()` rather than hardcoded — showing count and average size together avoids the common trap of one misleading aggregate.
- **Coming-soon pages don't fake completeness.** They clearly label status and explain what's missing instead of shipping empty or placeholder-stuffed sections.
- **Reduced-motion handling is explicit and correct** in `globals.css` — above-average care for a first pass.

## Priority Issues

**[P0] White text on gradient themes fails WCAG contrast, sitewide.**
Why it matters: independently verified — `#ffffff` on `#e08a2e` measures 2.7:1, on `#e7c477` measures 1.7:1, on `#c98a4e` measures 2.9:1 (WCAG AA needs 4.5:1 for body text, 3:1 for large text). This hits the odyssey-card overlay titles on `/`, `/odysseys`, and the full hero band (badge + h1 + hook paragraph) on `/odysseys/al-was-right` and both coming-soon pages — every gradient-themed surface on the site fails contrast wherever text lands near the light end of `src/lib/odyssey-theme.ts`'s gradients.
Fix: add a dark scrim/overlay behind text on the gradient bands (a `bg-black/25` layer or a darker gradient stop under the text specifically), or move text to the guaranteed-dark corner of each gradient and stop letting it span the full range.
Suggested command: `/impeccable audit` (contrast-focused) or `/impeccable polish`

**[P0] Unbranded, dead-end 404 page.**
Why it matters: confirmed — no `src/app/not-found.tsx` exists, so a mistyped or dead odyssey slug hits the raw default Next.js 404 (no header, no footer, no way home). This is the exact failure mode the site's entire distribution model invites: Instagram → deep link → odyssey page. A broken link stops the funnel cold with zero recovery path.
Fix: add `not-found.tsx` using `SiteHeader`/`SiteFooter` plus a "Browse odysseys" CTA.
Suggested command: `/impeccable harden`

**[P1] Mobile horizontal overflow on the flagship odyssey page.**
Why it matters: confirmed via `scrollWidth` vs `innerWidth` (544px vs 354px, a 190px overflow) with 11 instances of body text bleeding 7–188px off the right edge on `/odysseys/al-was-right`. Note the measurement viewport was ~354px, narrower than a standard 375px device, so the exact magnitude needs re-verification at real breakpoints — but a 21px difference won't fully absorb a 190px overflow, so this is very likely a real bug, not a viewport artifact.
Fix: audit the Analysis section (chart card, era table wrapper, largest-fires list) for a fixed-width or non-wrapping element at narrow widths; the `overflow-x-auto` table wrapper is one confirmed culprit for `cramped-padding` and a likely source.
Suggested command: `/impeccable adapt`

**[P1] The brand's stated differentiator — the OB1 persona — has zero presence in the actual UI.**
Why it matters: "playful Jedi-inspired evangelist, serious in substance" is the entire brand personality per the program brief, but it exists only as third-person prose on `/about`. No avatar, no byline, no voice marker, no recurring motif anywhere else across seven pages. This is also what the detector's `ai-color-palette` flag on the dusk gradient is symptomatic of: color and identity choices made without a specific character or world to anchor them.
Fix: give OB1 a visual presence — a byline/avatar on odyssey headers, a consistent icon or mark tied to the persona, reused site-wide.
Suggested command: `/impeccable delight`

**[P2] The "Watch the PSA" link goes to the Instagram profile root, not the specific video.**
Why it matters: the site's core premise is a closed loop — watch the claim in the PSA, verify it here. Linking to a generic profile instead of the specific post breaks that loop at the exact moment it should close.
Fix: add a per-odyssey `videoUrl` field to `src/content/odysseys.ts` and link directly once each PSA is published; until then, say so explicitly rather than implying the link is specific.
Suggested command: `/impeccable clarify`

## Persona Red Flags

**Jordan (confused first-timer)**: Arriving via an Instagram link straight into `/odysseys/al-was-right` hits a dense chart and a five-column table immediately after a cinematic hero, with no "here's how to read this" framing. First-time visitors get zero onboarding into the data-journalism format before the data starts.

**Sam (accessibility-dependent)**: Two compounding failures. First, the confirmed contrast failures above mean Sam may not be able to read the hero title/hook on several pages at all. Second, the wildfire trend chart's only text alternative is a two-line legend below it — no table fallback, no `aria-label` summarizing the actual finding ("6x more mega-fires in 2020–25 than 2000–12"), so the chart's core finding is inaccessible to a screen-reader user without the surrounding prose doing all the work.

**Alex (impatient power user)**: Trying to download the dataset and act fast must scroll past Problem Statement, Analysis, and Call to Action before reaching Datasets — no shortcut in the header or hero despite the downloadable dataset being a stated core deliverable of the whole program.

## Minor Observations

- Orphaned CTA card: the `callToAction` grid on `/odysseys/al-was-right` (`sm:grid-cols-2`) leaves a lone third card in row 2, breaking the visual grouping right at the section meant to drive action.
- No scroll-spy on the sticky in-page nav (`problem`/`analysis`/etc. never highlight as active).
- `overused-font` flagged Fraunces at 18–29% of text on three pages — likely intentional (many card titles styled as mini-headings), but worth a deliberate pass to confirm it's not leaking onto body copy by accident.
- Hero image alt text is well-written and descriptive — a good accessibility catch already made correctly.
- The footer nav claim from the initial design-review pass ("omits Take Action") was checked against `site-footer.tsx` and does not hold — the footer correctly includes all five nav items; no fix needed there.

## Questions to Consider

- If the persona is the brand's whole differentiator, why does the site never show or "speak as" OB1 — should articles carry a byline voice instead of neutral third-person analyst copy?
- The trail-point dataset has 86 real waypoints. What would this look like with the wildfire data anchored to an actual map instead of a generic line chart — wouldn't that be far more specific to "place-based research" than what's there now?
- Given the entire value prop is "click through from the video to verify the claim," what's the actual plan for closing that loop once PSAs exist?
