# Source and content audit

Reviewed 16 September 2026. Baseline: `bdb4ed0`.

## Inspection levels

The local chapter structure, objectives, quiz data, navigation, and shared widgets were inspected across all ten chapters. Chapter 1 and the final assessment received close reading for this change. The machine inventory records baseline headings, objectives, quiz counts, and outbound links. Extraction is not claim verification.

The Interconnects reading-list page was opened as provenance context. This pass did not independently confirm the book's assertion of complete coverage of that list or every linked essay. No assertion of a whole-book fact check is intended.

## Pilot evidence register

| ID | Source and inspected location | What it supports | Boundary |
| --- | --- | --- | --- |
| S01 | [Solaiman, 2023](https://arxiv.org/abs/2302.04844), abstract | Six access arrangements and release trade-offs | Chapter's widget text is a teaching summary, not a quoted scale of safety |
| S02 | [OSI Definition 1.0](https://opensource.org/ai/open-source-ai-definition), freedoms and preferred-form sections | Components and terms to inspect | A licence on weights alone does not settle the complete assessment |
| S03 | [OSI FAQ](https://opensource.org/ai/faq), data and reproducibility questions | Data categories and limits of reproducibility claims | Model-validation examples are not certifications; no blanket family classification |
| S04 | [MIT](https://opensource.org/license/mit), grant and notice condition | Broad permissions and retained notices | No conclusion about components not under these terms |
| S05 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0), sections 2–4 | Grants and redistribution conditions | A reading prompt, not a complete compliance analysis |
| S06 | [Llama 3.1 agreement](https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE), sections 1–2; inspected raw text | Version-specific conditions, including commercial threshold timing | Do not generalise to another version; this repository URL can change |
| S07 | [OLMo](https://arxiv.org/abs/2402.00838), abstract, v4 dated 7 June 2024 | Release of training data and training/evaluation code | No reproduction experiment performed |
| S08 | [Pythia](https://arxiv.org/abs/2304.01373), abstract, v2 dated 31 May 2023 | Across-training checkpoints and data-order reconstruction tools | No current hosting or compute-availability guarantee |

Only the stated passages were needed for these claims; the papers were not reviewed as whole empirical studies. Original Cedar, Rowan, and final-memo cases are authored examples and have no external factual provenance.

## Findings and dispositions

| Finding | Action in this change |
| --- | --- |
| Chapter 1 blended access, licences, artefacts, and scientific reproducibility | Separate the dimensions and use release-specific evidence |
| Original wording suggested withheld data alone settled every OSI assessment | Replace with definition and FAQ references and an explicit data-information distinction |
| Original licence table used sweeping model-family labels and shorthand such as “Do anything” | Replace with bounded reading tasks linked to exact terms |
| Original gradient descriptions mixed historical/current examples with broad capability claims | Replace with stable access descriptions; preserve the six named levels |
| Original questions often rewarded named-model recall | Pilot now asks for evidence-based assessment; older saved quiz result is separated using `openness-v2` |
| Final exercise assumed rankings and costs for real named models | Use a fictional decision case with explicit knowns, unknowns, constraints, and criteria |

## Remaining review queue

- **Primer / distillation:** training stages and claims that distillation “cannot” help RL need careful scope and primary technical evidence. Avoid turning an attributed argument into an unrestricted law.
- **Measurement:** inspect widget numbers, normalisation, benchmark versions, and reported versus illustrative data. Cross-source estimates need comparable conditions.
- **History / competition:** confirm release names, dates, adoption measures, and actor claims against original records.
- **Safety / policy / synthesis:** distinguish allegations, observed incidents, proposed policy, enacted rules, and forecasts. Strong universal or causal claims need explicit support.
- **Shared glossary / reading list:** pilot terms were aligned; other definitions and source annotations still need the same review.
- **Publishing:** determine original-content and code reuse terms; do not infer rights from public GitHub access.

These are review priorities, not determinations that each statement is false. Preserve unresolved status until the relevant evidence has been inspected.
