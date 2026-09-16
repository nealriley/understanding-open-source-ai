# Validation record

16 September 2026 · First learning-design application

## Mechanical checks — passed

```bash
python3 tools/check_learning.py
node --check js/app.js
node --check js/data.js
git diff --check
```

The Python check covered 15 HTML pages, ten curriculum units, and 42 quiz questions. It checked local file/fragment targets, duplicate IDs, quiz options and feedback, curriculum output anchors, chapter associations, and prerequisite cycles. JavaScript syntax and patch whitespace checks passed. External URLs and subject claims are outside the checker.

## Browser checks — passed

The available in-app browser was used against a local Python HTTP preview. The agent-browser CLI named by the verification skill was unavailable, so this used the available browser API instead.

- Homepage → study guide → Chapter 1 navigation worked.
- Search returned the study guide.
- The release slider changed its description using an arrow key.
- Chapter practice feedback and final-memo feedback expanded visibly.
- A deliberately mixed set of quiz answers produced 3/4, with explanatory feedback. The homepage subsequently displayed the new quiz's 3/4 result.
- Revised questions use `openness-v2`; the landing card reads that version's score rather than presenting an old quiz result as current.
- Study-guide layout was inspected at desktop width. Chapter 1 and the memo table were inspected at 390 × 844; no document-level horizontal overflow was measured. Mobile contents navigation worked.
- No warning or error messages were reported by the browser log inspection during these checks.

The temporary viewport override was reset. Test answers affected only the localhost browser's reading record.

## Editorial review

Chapter 1 was compared with the bounded source passages in [the source register](source-audit.md). The review checked access versus permission, the data-information distinction, reproducibility limits, version-specific licence scope, and separation of invented examples from reported research releases.

The [pilot map](pilot-map.md) records teaching and assessment coverage and explicit exclusions. The study guide supplies tasks and criteria for all ten chapters; this does not mean all their domain claims received equivalent verification.

## Not performed

No learner pilot, independent subject review, complete external-link audit, whole-book fact check, screen-reader/conformance audit, printed/PDF export review, or production deployment verification. Planned reading times are estimates. The same assistant authored and reviewed this pass.
