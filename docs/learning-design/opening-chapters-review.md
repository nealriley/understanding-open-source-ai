# Opening chapters: editorial review and validation

Reviewed 16 September 2026. Revision based on main commit `d6a4c73a9c0be5ea5e1e8cbd652cc77b349d7558`.

## Editorial decision

The previous opening named concepts faster than it explained them. The replacement follows a fictional library assistant through generation, training, retrieval, tools and deployment, then inspects fictional release documents and a real OLMo repository snapshot. The chapter URLs and existing section anchors are retained. The optional Solaiman section replaces the opening access slider.

The writing has completed an author editorial pass for conceptual coverage, explanation before assessment, factual scope, continuity and readable examples. This records an editorial judgement, not an independent reader study or proof that every novice will understand the text. Owner review and the planned learner pilot remain separate.

## Requirements and inspected evidence

| Requirement | Evidence in the revised chapters | Review judgement |
| --- | --- | --- |
| Orient a reader without coding experience | Chapter 0, “The model behind the conversation”; Chapter 1, “Three routes to an answer” | Model, application, interface, API and operator are connected to the same library example. |
| Show generation rather than define it only | Chapter 0, “How text becomes more text” | A labelled fictional tokenizer, probability table and generation loop show context growing one token at a time. Probability is distinguished from factual confidence. |
| Explain learned parameters and architecture | Chapter 0, “Where the probabilities come from” | Neural network, weights, architecture and attention have distinct roles; the attention sentence is explicitly illustrative. |
| Explain learning | Chapter 0, “Learning from examples” | Example, target, loss and weight update precede pretraining and post-training vocabulary. A training/use diagram makes the changed state visible. |
| Explain assistant adaptation | Chapter 0, “Becoming an assistant” | Demonstrations and feedback precede method abbreviations. InstructGPT supplies a bounded historical example; DPO is optional. |
| Separate prompting, retrieval and training | Chapter 0, “Giving Alder information it can use now” | A supplied notice supports a concrete answer; the comparison table identifies what each intervention changes. |
| Explain tools and practical reliability | Chapter 0, sections 7–8 | A catalogue call separates generated text from execution. Unsupported drop-box information illustrates a failure against the same notice. Held-out evaluation is introduced. |
| Give a resource intuition | Chapter 0, “Useful answers need evidence and resources” | Memory, numerical computation, GPUs, repeated serving work and staff effort are explained without a hardware shopping list or current prices. |
| Explain conventional software openness first | Chapter 1, “What open source means in software” | A return-date program gives source code, modification, maintenance and redistribution a purpose before the AI definition. |
| Make a release inspectable | Chapter 1, sections 3–5 | Annotated Cedar folder, file-purpose table, document excerpts and an OLMo walkthrough pinned to `0f605aa2bf7f9585bcedfa9b419326f15b453ddd`. |
| Connect access to permissions and practical fit | Chapter 1, Cedar assessment and closing application | MIT component scope is explicit; Rowan's redistribution restriction remains decisive despite extra training code. Uninspected documentation remains unknown. |
| Preserve purpose and debate | Chapter 1, “Why people want different kinds of openness” | Developer, researcher and maintainer needs explain different priorities. Solaiman, OSI and Pythia remain attributed. Economic questions lead into Chapter 2. |
| Prepare each assessed outcome | `curriculum-map.json`, first two units | Preparation links now point to explanatory sections, with additional sections recorded. Generation is tested in the written task and quiz. |
| Keep core reading independent of optional depth | Both chapter applications and feedback | All required concepts and supplied case documents appear outside technical disclosures. No code execution or account is required. |
| Keep examples and claims traceable | `claim-register.json`, E36–E45 / CL-36–CL-45; `js/data.js`, `teachingExamples` | Ten inspected additions; fictional probabilities recorded separately and generated into the static table. |
| Preserve reading records and separate quiz editions | `primer-v3`, `openness-v3`; browser regression test | Earlier quiz results are not displayed as new results; chapter completion survives. |

## Issues corrected during the editorial pass

- Added an explicit generation explanation to the application and feedback; proposing system changes alone did not assess that outcome fully.
- Completed the opening return-on-Sunday example with an explicit notice and supported answer. Opening hours alone would not establish return arrangements.
- Kept the unsupported drop-box answer tied to that same notice so the difference can be checked directly.
- Corrected the four-step diagram's caption and removed a left-to-right instruction that would be misleading on the stacked mobile layout.
- Pinned the real release documents rather than relying on mutable `main` links.
- Corrected the training source's gradient-descent section number after passage inspection.
- Replaced advanced-method and cost-trivia quiz questions with generation, training, tools, artefacts, permissions and practical-fit cases.

## Validation

- `python3 tools/check_learning.py`: passes; 15 HTML pages, 10 units and 34 questions. Includes local links, anchors, IDs, claim references, outcome associations, quiz versions, probability sum, and generated static data views.
- `node --check js/data.js` and `node --check js/app.js`: both pass.
- `tools/check_browser.cjs`: passes using the bundled Playwright package and local Chrome. Covers every chapter's quiz, correct/incorrect feedback, scores and reading records, navigation/search, light/dark themes, keyboard controls, 15 mobile pages and 15 pages without JavaScript. No page errors observed.
- Visual review: opening diagrams inspected in desktop light/dark and mobile layouts. The chapter-specific browser checks also capture these views. The first regression attempt incorrectly tried to change an already answered radio question; the test was corrected to respect the existing one-answer behaviour, then passed.
- Browser CLI fallback: `agent-browser` was unavailable, so the existing Playwright regression suite supplied browser automation and screenshots.

The source record supports factual scope; automated structural tests do not grade the quality of an explanation. The prose review above is the evidence for editorial readiness. The browser checks support technical readability and behaviour only.

## Owner review prompts

1. Can you explain what happens between a question and an answer without returning to the glossary?
2. Which first-use explanation still assumes knowledge you do not have?
3. Does the library example help you distinguish model, application and provider?
4. Can you justify the Cedar/Rowan decision from the supplied documents?
5. Where would a diagram, another example or a shorter paragraph help most?

The styled chapters can be read through a local static preview or after the review branch is merged and deployed. The published main site should not be described as containing these revisions before deployment.
