# Open Models: A Field Guide to Open-Source AI

An interactive, GitHub-Pages-hosted textbook on open-source AI and open language models: how they work, why anyone builds them, where they came from, how far behind the closed frontier they are, the US–China dynamic, distillation, security and the 2026 regulatory fight.

The spine is [Nathan Lambert's Open-Source AI & Open Models Reading List](https://www.interconnects.ai/p/open-source-ai-reading-list) (Interconnects). The annotated reading list distinguishes inspected source passages from further-reading leads. Primary sources support bounded factual claims; essays preserve the authors’ competing arguments.

## Structure

| # | Chapter | Part |
|---|---------|------|
| 0 | How Language Models Work | Primer |
| 1 | What "Open" Means | Primer |
| 2 | Why Anyone Builds Open Models | Foundations |
| 3 | Risk, Safety and the Data Commons | Foundations |
| 4 | The Lineage of Open Models | History |
| 5 | US–China Competition | History |
| 6 | Measuring the Gap | Science |
| 7 | Distillation and Synthetic Data | Science |
| 8 | Security, Cyber and the Regulatory Fight | Policy |
| 9 | Synthesis: Where This Goes | Policy |

Plus an interactive timeline, a glossary with hover definitions, and the annotated reading list.

## Learning design

All ten chapters have preparation checks, observable outcomes, an application task and feedback. The [study guide](study-guide.html) connects them to a final decision memo, review rubric and contrasting example responses. Chapters 0 and 1 now provide a fuller beginner introduction, using a continuous library example, release documents and conceptual diagrams. See the [opening-chapter editorial review](docs/learning-design/opening-chapters-review.md).

The [authoring pack](docs/learning-design/README.md) includes the claim register, curriculum map, source inspection limits, validation records and a protocol for a future learner pilot. The book remains plain HTML/CSS/JavaScript with no deployment build. Educational effectiveness has not been tested with learners.

Validate with:

```bash
python3 tools/check_learning.py
node --check js/app.js
node --check js/data.js
```

Optional browser regression checks use Playwright (1.62.1), supplied separately through `NODE_PATH`, and `node tools/check_browser.cjs`. Set `BOOK_BROWSER_PATH` to a local Chrome executable if not using Playwright's installed Chromium. GitHub Actions runs the same checks in a temporary dependency directory.

## Features

- Zero build step: plain HTML, CSS and JavaScript. Works from `file://` and on GitHub Pages.
- Reading progress and quiz scores saved in `localStorage` (browser-only, no backend).
- Per-chapter quizzes with explanations, glossary tooltips, chapter search, dark mode.
- Interactive widgets: fictional task-weighting exercise, fictional threshold-delay comparison, filterable timeline.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying to GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)`. The `.nojekyll` file is present so Pages serves the files as-is.

## Editing

Chapter bodies are wrapped by `tools/wrap.sh`, which adds the shared header, sidebar and footer. To add a chapter, add an entry to `OMT.chapters` in `js/data.js` and create the HTML file in `chapters/`. Glossary terms and timeline events also live in `js/data.js`.


## Editing shared data and evidence

`js/data.js` contains chart records, fictional teaching examples and provenance, glossary and timeline records. After editing these, run `python3 tools/render_data.py` to refresh their committed static HTML views, then validate. The generation utility is an authoring convenience; GitHub Pages serves the committed files directly. Chart tables and core reference content work without JavaScript.

`docs/learning-design/claim-register.json` records sources, inspected passages, dates, status and affected locations. Unresolved entries must not become facts or quiz keys. Material quiz revisions require a new `quizId` in the chapter, manifest and curriculum map. Keep chapter IDs unchanged to preserve reading completion.

The five review branches form a dependent stack. Merge in order: evidence foundation → technical core → strategy/history → risk/policy → synthesis/integration. No branch is auto-merged or independently deployed.
