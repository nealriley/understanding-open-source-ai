# Approved merges and publication verification

16 September 2026. The owner authorized merging the two prepared PRs and starting the next task.

| Stage | PR and validated head | Merge commit | Publication check |
|---|---|---|---|
| Foundations-only reset | [#8](https://github.com/nealriley/understanding-open-source-ai/pull/8), `44c9878788d98ea2a740b4aadb9a044b5ab3674f` | `03f42f85a36515f71992af3a9ec80120f6b3e50a` | All 18 published HTML/CSS/JS files matched the merged Git contents byte-for-byte **before** merging #9. |
| Data, Adaptation and Evaluation | [#9](https://github.com/nealriley/understanding-open-source-ai/pull/9), `ccf45284ed9c55dcbfee9ffcf26701a726d952cb` | `36643afe8eb20c5e4f87d26627eb2977432d0b08` | All 21 published HTML/CSS/JS files matched the merged Git contents byte-for-byte. The merge tree also matched the validated PR head. |

PR #9 was retargeted to `main` after the reset deployment was verified. Both merges used expected-head protection and preserved ancestry. Book checks had succeeded for both PR heads: [reset run](https://github.com/nealriley/understanding-open-source-ai/actions/runs/35154066613), [section run](https://github.com/nealriley/understanding-open-source-ai/actions/runs/35155545942).

Verification fetched each tracked `.html`, `.css` and `.js` reader file from GitHub Pages, excluding authoring/tool directories, with a revision query and a no-cache request. Each response was compared with `git show <merge>:<path>`. This covered the active chapters, withdrawal notices, homepage, references, study guide, timeline notice and shared assets. The prior browser validation applies because the final deployed files matched the validated tree; it was not claimed as a new learner test.

The [live contents](https://nealriley.github.io/understanding-open-source-ai/) now have five active chapters. The named archive tag remains `archive/pre-concept-rebuild-2026-09-16`, preserving commit `91925912b1818e0099442026916454365660c56a`.
