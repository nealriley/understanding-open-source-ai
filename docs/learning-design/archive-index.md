# Archive before the concept rebuild

Snapshot: `91925912b1818e0099442026916454365660c56a` ([browse](https://github.com/nealriley/understanding-open-source-ai/tree/91925912b1818e0099442026916454365660c56a)). Named tag: `archive/pre-concept-rebuild-2026-09-16`. The archive workflow publishes this tag before the reset is merged. No archived HTML is copied into the current Pages tree.

| Previous chapter | Decision | Reuse destination |
|---|---|---|
| [0. How Language Models Work](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/00-primer.html) | Keep | Foundations; only bridges change. |
| [1. What 'Open' Means](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/01-what-open-means.html) | Keep | Foundations; only bridges change. |
| [2. Why Anyone Builds Open Models](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/02-foundations.html) | Defer | Economics: Gurley, Zuckerberg, Catalini and Lambert retain distinct attributed arguments. |
| [3. Risk, Safety and the Data Commons](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/03-safety-and-data.html) | Split | Data selection/provenance into data; Kapoor/Toner/Brand release-risk arguments into governance. |
| [4. The Lineage of Open Models](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/04-lineage.html) | Defer | Milestones return after mechanisms; reuse individual documented release examples earlier. |
| [5. US–China Competition](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/05-us-china.html) | Defer | Adoption and geopolitical arguments follow evaluation and economics; preserve Xu and ATOM attribution. |
| [6. Measuring the Gap](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/06-measuring-the-gap.html) | Split | Task comparisons into evaluation; frontier-delay debates deferred. Preserve SemiAnalysis and Ihle as competing methods. |
| [7. Distillation and Synthetic Data](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/07-distillation.html) | Split | Teacher–student mechanisms into adaptation; access-abuse allegations into governance. Preserve author attribution. |
| [8. Security, Cyber and the Regulatory Fight](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/08-security-and-policy.html) | Defer | Incident/proposal distinctions and Saxe/Lambert policy arguments follow risk foundations. |
| [9. Synthesis: Where This Goes](https://github.com/nealriley/understanding-open-source-ai/blob/91925912b1818e0099442026916454365660c56a/chapters/09-synthesis.html) | Replace | New section tasks now; full-book memo and contrasting responses rebuilt when whole-book support exists. |

The snapshot also preserves the full glossary, timeline, bibliography, curriculum, claim register, learner-pilot documents and assessment responses. Original essays remain sources of their authors’ arguments, not interchangeable factual authority. Reinspect premises when reused.

## Evidence schema v2

`affected_locations` describes current locations. Optional `archived_locations` contains `{commit, location}` records referring to the exact historical snapshot. Withdrawal changes location, not factual status. Archive-only claims retain their source IDs, status and editorial decisions. Historical records are not valid active quiz references unless supported and used in the active chapter.

## Delivery

Reset PR first; next-section PR follows on its branch until the owner merges the reset. Merge and deploy the reset before publishing the next section. Later authoring records supersede the ten-chapter maps in the historical documentation.
