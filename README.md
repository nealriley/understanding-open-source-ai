# Open Models: A Field Guide to Open-Source AI

An interactive, GitHub-Pages-hosted textbook on open-source AI and open language models: how they work, why anyone builds them, where they came from, how far behind the closed frontier they are, the US–China dynamic, distillation, security and the 2026 regulatory fight.

The spine is [Nathan Lambert's Open-Source AI & Open Models Reading List](https://www.interconnects.ai/p/open-source-ai-reading-list) (Interconnects). Every link on that list is covered and catalogued in the annotated reading list, with additional primary sources where they strengthen the narrative.

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

The [study guide](study-guide.html) provides entry points, one application task per chapter, self-check criteria, and a final decision memo. [Chapter 1](chapters/01-what-open-means.html) is the first fully revised learning-design pilot: source review, worked example, practice, feedback, and assessment.

The [authoring pack](docs/learning-design/README.md) records the intake, curriculum map, source inventory, pilot coverage, and review limits. The remaining chapters have study tasks but have not all received this source review or rewrite. The website remains plain HTML, CSS, and JavaScript with no build step.

Validate local links, chapter quizzes, and curriculum mappings with:

```bash
python3 tools/check_learning.py
node --check js/app.js
node --check js/data.js
```

## Features

- Zero build step: plain HTML, CSS and JavaScript. Works from `file://` and on GitHub Pages.
- Reading progress and quiz scores saved in `localStorage` (browser-only, no backend).
- Per-chapter quizzes with explanations, glossary tooltips, chapter search, dark mode.
- Interactive widgets: release-gradient slider, era-by-era gap explorer, catch-up estimate comparison, filterable timeline.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying to GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)`. The `.nojekyll` file is present so Pages serves the files as-is.

## Editing

Chapter bodies are wrapped by `tools/wrap.sh`, which adds the shared header, sidebar and footer. To add a chapter, add an entry to `OMT.chapters` in `js/data.js` and create the HTML file in `chapters/`. Glossary terms and timeline events also live in `js/data.js`.
