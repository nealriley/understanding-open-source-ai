# Batch 5: integrated review — 16 September 2026

## Scope

All ten chapters reviewed as a connected course. Chapter 1's pilot is retained with dated context; nine chapters are substantively rewritten. The final task has six rubric dimensions and two contrasting conditional recommendations. The book preserves chapter URLs, chapter-completion keys and compatibility anchors. No licence change, framework, accounts, analytics or live feeds were added.

## Evidence and editorial checks

- 35 inspected source records support 35 bounded claim records; five unresolved claim families remain in the authoring record and are not rendered as factual claims or answer keys.
- Each source records its URL, inspected passage, review date and publication date where established. Each retained claim records affected locations. Essay attribution is distinguished from independent factual verification.
- Homepage, chapter summaries, glossary, selected timeline, bibliography and quizzes reconciled. Bibliography discovery leads explicitly do not constitute verified support.
- Original measured chart series retired, including a mismatched Llama 3.1 value. Both replacement datasets use fictional labels and exact documented calculations. Tables, bars and examples use the same records.
- Thirty mapped learning outcomes have preparation, application and feedback destinations. The 31 diagnostic questions identify outcomes; the chapter applications are the main assessments.
- Historical pilot documents and baseline inventory are retained as historical records. No learner sessions or efficacy claims.

## Automated checks

`python3 tools/check_learning.py` checks 15 HTML pages, links/fragments, duplicate IDs, quiz shape and feedback, prerequisites, outcome mappings, quiz-version associations, source/claim references, timeline provenance and generated data-view parity. `node --check` checks both scripts.

`tools/check_browser.cjs` passes in isolated headless Chrome using Playwright 1.62.1:

- All ten chapter quizzes render and accept correct answers; an incorrect answer reveals useful feedback and moves focus to it.
- Versioned scores persist. Legacy primer scores do not appear as revised results; unchanged pilot scores and reading-completion records survive.
- Search, chapter navigation, glossary links and timeline filters work.
- Keyboard slider changes reproduce weighted calculations; disclosure controls and mobile menu open/close with keyboard, including Escape.
- Light/dark selection persists. Desktop light/dark chart views and a 390px mobile view visually inspected.
- All 15 pages checked at 390px for page overflow, with JavaScript enabled and disabled. Core text, navigation and static tables remain available without scripts. Wide tables scroll inside labelled keyboard-focusable regions.
- No browser page errors observed.

The agent-browser executable was unavailable; the equivalent checks used the bundled Playwright runtime and an isolated local Chrome session. This is browser regression and visual review, not a screen-reader audit or accessibility certification. GitHub Actions contains the same structural, syntax and browser checks; remote CI status must be distinguished from these local results.

## Publication verification

Publication uses content-addressed Git blobs and trees. Compare each GitHub tree SHA with the validated local branch tree before opening its PR; fetch the resulting branch refs and check equality. The five PRs form a dependent stack and require owner review and merging. GitHub Pages continues to serve main until the owner merges.
