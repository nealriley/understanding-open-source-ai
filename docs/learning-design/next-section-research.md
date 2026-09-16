# What follows the foundations?

Reviewed 16 September 2026. This is a comparative editorial review of eight educational resources, not a systematic review of learning effectiveness. We sampled the passages identified below; we did not read every book, watch every lecture or run the courses. The current audience needs to understand and assess open models without writing code.

## Source comparison

### 1. Hugging Face — LLM Course

- **Edition/audience:** living web course, accessed on the review date; programmers with Python and introductory deep-learning knowledge.
- **Overlap and continuation:** transformer basics and using models lead into fine-tuning, sharing, datasets and tokenizers.
- **Inspected:** [Processing the data](https://huggingface.co/learn/llm-course/en/chapter3/2), especially “Loading a dataset from the Hub,” “Preprocessing a dataset” and the exercises. The lesson follows actual sentence pairs through labelled records and model inputs.
- **Decision:** adapt the concrete record walkthrough and short prediction exercises. Defer library APIs, batching and padding. Its fine-tuning-first chapter order relies on programming preparation our readers do not share.

### 2. Stanford — CS336, Spring 2025

- **Edition/audience:** [archived 2025 syllabus](https://cs336.stanford.edu/spring2025/); substantial Python, mathematics, deep learning and systems prerequisites.
- **Overlap and continuation:** model construction is followed by systems, scaling, inference, evaluation, data and alignment.
- **Inspected:** [lecture 12 source](https://github.com/stanford-cs336/spring2025-lectures/blob/main/lecture_12.py), functions `how_to_think_about_evaluation`, `validity` and `what_are_we_evaluating`. These ask what the evaluation is for, distinguish models from systems and question test overlap.
- **Decision:** adopt purpose-before-score and inspect individual outputs. Defer GPU kernels and leaderboard tours. Do not copy this specialist course’s overall sequence.

### 3. Full Stack Deep Learning — LLM Bootcamp

- **Edition/audience:** Spring 2023, application developers; Josh Tobin’s LLMOps lesson dated 9 May 2023.
- **Overlap and continuation:** foundations connect to prompting, augmentation, application design and operations.
- **Inspected:** [LLMOps lesson summaries](https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/llmops/#testing-llms-what-works), “Testing LLMs,” “Evaluation metrics” and “Test-driven development.” Written summaries inspected; video/slides not reviewed.
- **Decision:** bring the user task and evaluation plan forward. Defer production tooling. Reject the dated provider rankings and blanket security comparisons as present-day teaching claims; generated test cases need independent checking.

### 4. Google — Machine Learning Crash Course

- **Edition/audience:** general introductory ML; sampled lesson last updated 3 December 2025. Exercises are accessible conceptually, although the complete course includes technical work.
- **Overlap and continuation:** data/generalisation precede advanced neural-network and LLM units; production and fairness follow.
- **Inspected:** [Dividing the original dataset](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets#training_validation_and_test_sets), including feedback on repeated test use and duplicates.
- **Decision:** adapt the mistake → explanation → revision pattern. Teach train/development/test roles without prescribing a universal percentage split. Repeated testing can influence development even without direct training on test rows.

### 5. Chip Huyen — systems and application writing

- **Edition/audience:** *Designing Machine Learning Systems* (2022), engineer-oriented; companion material also identifies limits for nontechnical readers.
- **Overlap and continuation:** [chapter summaries](https://github.com/chiphuyen/dmls-book/blob/main/summary.md#chapter-2-introduction-to-machine-learning-systems-design) move from objectives and requirements to data, development/evaluation, deployment and monitoring. Summaries inspected; the full paid book was not read.
- **Lesson sample:** [Building LLM applications for production](https://huyenchip.com/2023/04/11/llm-engineering.html#prompt-evaluation), 11 April 2023: prompt evaluation and versioning, using a concrete scoring task.
- **Decision:** adapt the explicit task and change record. Defer infrastructure. Do not reproduce historical prices or guarantees about deterministic generation.

### 6. Zhang, Lipton, Li and Smola — Dive into Deep Learning

- **Edition/audience:** web documentation version 1.0.3; quantitative, executable textbook.
- **Overlap and continuation:** foundational model fitting leads to generalisation and model selection, with neural and language-model material later.
- **Inspected:** [Generalization](https://d2l.ai/chapter_linear-regression/generalization.html#training-error-and-generalization-error), sections 3.6.1 and 3.6.3 and exercises. It separates performance on observed training records from expected performance on new records.
- **Decision:** adapt the distinction and model-selection caution; move equations to optional depth. Avoid carrying broad “more data” claims outside their assumptions.

### 7. Nathan Lambert — RLHF Book

- **Edition/audience:** current web edition, site build dated 11 September 2026; quantitative readers studying post-training.
- **Overlap and continuation:** introductory training concepts lead through instruction tuning, reward modelling and optimisation; synthetic data and evaluation receive further treatment.
- **Inspected:** [Instruction Fine-Tuning](https://rlhfbook.com/c/04-instruction-tuning#chat-templates-and-the-structure-of-instructions), opening and chat-template explanation. The old instruction-tuning URL redirects; record the current destination.
- **Decision:** adapt the visible prompt/response record and connection between formatting and subsequent stages. Defer implementation templates. Do not repeat unqualified claims of perfect formatting consistency. Interpret “alignment” as a stated training objective rather than agreement with all human values.

### 8. Howard and Gugger — fast.ai / fastbook

- **Edition/audience:** [course lesson 1](https://course.fast.ai/Lessons/lesson1.html), 2022 course; coders, with a complete worked project early.
- **Overlap and continuation:** a working model introduces data, labels, metrics and validation before their deeper mechanisms.
- **Inspected:** [chapter 1 notebook source](https://raw.githubusercontent.com/fastai/fastbook/master/01_intro.ipynb), explanations of validation and the section “Use Judgment in Defining Test Sets,” including time and group splits. GitHub’s notebook rendering did not expose the body and nbviewer returned 429; the raw notebook text was inspected instead. Code was not executed.
- **Decision:** adapt familiar situations and split-by-use reasoning. Avoid copying coding prerequisites, default percentages or claims of universally sufficient sample sizes.

## Concept dependency map

```
0: weights, training, inference, context, applications
             ↓
1: access, artefacts, permissions, practical unknowns
             ↓
a stated library task and what evidence it needs
             ↓
data records → selection/provenance → train/development/test roles
             ↓
training signals → adaptation choices → controlled comparison
             ↓
scoring → task weighting → uncertainty → conditional recommendation
             ↓
future operating/economic, historical and governance arguments
```

This is a reading order, not a claim that real development is linear. Developers specify evaluation criteria before training, then iterate. Data introduces the test plan before adaptation; evaluation later deepens its measurement and interpretation.

## Candidates and trial design

**A — Data → Adaptation → Evaluation.** Trace the materials behind a release, the changes they enable, then judge results. Main risk: the reason for gathering data arrives too late unless the user task appears immediately.

**B — Evaluation → Data → Adaptation.** Start with a purchasing/pilot decision and work backwards. Main risk: the first chapter needs data splits and distinctions among interventions before it has taught them.

The two original 500–800-word samples in [sequence-trials.md](sequence-trials.md) use the same library context. They include an explanation, task and feedback. Evaluate dependency gaps, vocabulary, evidence, repetition, task answerability and narrative continuity; these are editorial checks, not simulated learner results.
