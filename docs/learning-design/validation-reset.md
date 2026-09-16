# Foundations reset validation

Reviewed 16 September 2026 against archive commit `91925912b1818e0099442026916454365660c56a`.

- Two active chapters; nine withdrawal notices (eight chapters and timeline). Chapters 0–1 retain text, tasks, quiz versions and IDs except section labels and forward/navigation links.
- `python3 tools/check_learning.py`: PASS, 15 HTML pages, 2 active curriculum units, 10 questions; links, anchors, claim locations, archived evidence references, prerequisite order, section limit, quiz associations and static navigation/data parity.
- `node --check js/data.js`, `node --check js/app.js`, `node --check tools/check_browser.cjs`, `git diff --check`: PASS.
- Playwright/Chrome regression: PASS, active quizzes and correct/incorrect feedback; persisted reading/quiz records; old version scores excluded; withdrawn search/navigation/assessment content; simulated manifest reordering; keyboard disclosures/menu; mobile overflow; both themes; no-JavaScript core content; no page errors.
- Agent-browser CLI is unavailable; used the repository's Playwright runner with system Chrome instead. Inspected desktop-light and mobile screenshots; chapter text, cards and navigation remain readable. Theme screenshots are produced by the same run.
- Remote archive tag is created idempotently by the narrowly scoped archive workflow on the reset branch; the native shell has no GitHub push credentials. Verify tag SHA and Actions before merging.
- Deployment verification is pending owner merge. Merge/deploy this PR before the next section. No learner sessions were conducted.
