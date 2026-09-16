# Open Models: A Field Guide to Open-Source AI

A developing, GitHub-Pages-hosted textbook on open language models. The available draft contains two foundations chapters and a three-chapter section on data, adaptation and evaluation. The rest is being rebuilt around concepts, in sections of at most three chapters.

## Current draft

Read the chapters in order: How Language Models Work → What “Open” Means → Where Model Data Comes From → How Models Are Adapted → How to Judge a Model. Attempt their applications and compare the feedback. The study guide, glossary and annotated sources support the available material. No coding is required for the core reading.

The [archive index](docs/learning-design/archive-index.md) preserves the previous ten-chapter edition, its attributed essays, sources and reuse decisions. Old chapter URLs show withdrawal notices; old completion records remain stored but do not count towards the active draft. New chapters have concept-based IDs and URLs so their order can change without transferring quiz scores.

## Learning design

The [authoring pack](docs/learning-design/README.md) contains evidence and curriculum maps, source-review limits and validation records. This remains plain HTML/CSS/JavaScript with no deployment build. Educational effectiveness has not been tested with learners.

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
- Worked examples, optional technical depth, versioned quizzes and no-JavaScript reading.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying to GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)`. The `.nojekyll` file is present so Pages serves the files as-is.

## Editing

Chapter bodies are wrapped by `tools/wrap.sh`, which adds the shared header, sidebar and footer. To add a chapter, add an entry to `OMT.chapters` in `js/data.js` and create the HTML file in `chapters/`. Glossary terms and chart records also live in `js/data.js`. Run `python3 tools/render_navigation.py`, `python3 tools/render_data.py` and `python3 tools/render_learning.py` after shared-data edits.


## Editing shared data and evidence

`js/data.js` contains chart records, fictional teaching examples and provenance, glossary and timeline records. After editing these, run `python3 tools/render_data.py` to refresh their committed static HTML views, then validate. The generation utility is an authoring convenience; GitHub Pages serves the committed files directly. Chart tables and core reference content work without JavaScript.

`docs/learning-design/claim-register.json` records sources, inspected passages, dates, status and affected locations. Unresolved entries must not become facts or quiz keys. Material quiz revisions require a new `quizId` in the chapter, manifest and curriculum map. Keep chapter IDs unchanged to preserve reading completion.

The concept rebuild has two sequential deliveries: foundations reset, then the researched next section. Merge and deploy the reset first. No branch is auto-merged.
