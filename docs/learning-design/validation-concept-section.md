# Concept section: editorial review and validation

Reviewed 16 September 2026. Parent delivery: foundations reset PR #8, branch `revision/foundations-reset`, commit `44c9878788d98ea2a740b4aadb9a044b5ab3674f`. The next section is a separate dependent review branch; it must not be published before the reset is merged and deployed.

## Editorial review

- Compared eight educational resources across model-building, application-building and conceptual ML approaches. Named passages and access limits are recorded in `next-section-research.md`. Source prestige/popularity was not treated as proof of educational effectiveness.
- Wrote two original trials (approximately 600 words each; within the 500–800 word requirement) before drafting full chapters. Selected data → adaptation → evaluation, with task framing at the beginning. Reviewed trade-offs and revised the ambiguity around held-out data and derivative notice families.
- Drafted three chapters of approximately 2,100–2,300 words each before quiz text. Main explanations define first-use terms, continue the fictional library example and provide required practice and feedback. Deeper probability/distillation and crossover material is optional.
- Outcome review: data roles/provenance/splits each prepare the inventory task; intervention levels/signals/controls each prepare the pipeline experiment; scoring/weighting/uncertainty each prepare the decision note. Detailed mappings live in `curriculum-map.json`.
- Traced the application (Alder) separately from its underlying model (Cedar). The evaluation comparison identifies Alder and Birch as fictional complete systems. No model performance, commercial uplift or legal conclusion is inferred from these examples.
- Preserved competing decisions: immediate bounded investigation and deferral for better evidence. Feedback judges evidence, reasoning, alternatives and uncertainty rather than agreement with an author.
- Real methodological cases: Dolma, InstructGPT, DPO, probability/on-policy distillation and HELM, with reviewed passages in the register. Rechecked paper revision dates; corrected the Dolma v2 date to 6 June 2024. The Dolma card’s inconsistent v1.7 day is explicitly unresolved and not an answer key. No historical ranking/pricing series was revived.
- Original author debates about business, competition and policy remain in the archive rather than being rewritten as technical facts. History, operating economics and governance remain unwritten future sections.

## Technical validation

- `python3 tools/check_learning.py`: PASS — 18 HTML pages, 5 active curriculum units, 22 quiz questions. Checks local links/anchors/IDs, prerequisite ordering, section cap, active versus historical claims, supported quiz keys and their active locations, quiz identities, learning maps and generated reference/navigation/data parity.
- `node --check js/data.js`, `node --check js/app.js`, `node --check tools/check_browser.cjs`, `git diff --check`: PASS.
- Browser runner with Playwright and system Chrome: PASS — all five quizzes, correct/incorrect feedback, keyboard focus, saved current scores, earlier score compatibility, completion retention, active-only search/navigation, withdrawn URLs, reordered manifest navigation, both themes, mobile overflow and no-JavaScript pages.
- Negative fixtures in an isolated temporary copy: validator rejected a section over three chapters, a reused quiz identity, an active claim pointing at a withdrawal notice, a prerequisite ordered after its dependent chapter, and an unresolved quiz key.
- Calculation checks: fictional table rows match shared records; widget values agree at 0%, 20%, 50%, 80% and 100% manual weighting. Equal means are 60% and 70%; 80%-manual means are 72% and 64%; crossover 2/3; one changed manual outcome moves the 80%-weighted score by eight points. Mobile table supports keyboard horizontal scrolling. Independent rational arithmetic also verified means, the exact crossover and the one-outcome sensitivity.
- Visually inspected desktop chapter opening, dark intervention table, mobile widget and chapter diagrams. Prose-table columns were widened after the mobile review to prevent excessively narrow wrapping. No blank pages or page errors. Agent-browser CLI is unavailable; the repository Playwright runner supplies the browser verification.
- Reading and source pages are generated from active maps by `render_learning.py`; navigation/cards by `render_navigation.py`; shared chart tables/glossary by `render_data.py`. These are authoring conveniences, not a deployment build.

## Publication and review limits

PR #8 and this section remain for owner review/merge. The archive tag has been verified remotely. Published review-branch files and GitHub checks will be verified after upload; live Pages parity is conditional on an approved merge. No automatic merge or live deployment was requested for this delivery.

This is the authoring agent’s editorial and technical review. No independent reviewer or learner participants were used. Accessibility checks do not establish formal conformance; educational effectiveness remains unproven. Existing learner-pilot materials are historical templates and must be scoped to the available section before recruitment.
