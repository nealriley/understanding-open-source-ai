# Two teaching trials

Original fictional teaching text. Reviewed 16 September 2026. Samples are experiments in sequence, not additional published chapters. Each sample below is 500–800 words, excluding this introduction and the review.

## Sample A — Data before adaptation and evaluation

The library has inspected Cedar’s release and found terms compatible with its intended pilot. That answers a question about permission. It does not tell the team what material to give the assistant, or whether the assistant will use it well. Before changing the model, the librarian puts three folders on the desk: public notices, practice answers and a sealed set of questions for checking the finished system. All three contain text. They have different jobs.

The public notices supply facts. One says the library now opens on Sunday afternoons. Another describes how to renew a book. If the application retrieves a notice and includes it in a request, the model can use that text while answering. Its trained weights need not change. The notice can be replaced when the opening hours change. This is the context route introduced in Chapter 0, now attached to a concrete collection of documents.

The practice answers demonstrate behaviour. The librarian writes a question, includes the relevant notice, and supplies an answer that cites it. These records could become training examples. If the team uses them to update Cedar’s weights, the information travels through a different route. A collection of examples prepared for a particular purpose is a dataset. A row might contain a question, a document reference, an answer and a note about who checked it.

The checking questions have a third job. The library wants to discover whether the changed system can answer questions beyond the exact examples used to improve it. If the team repeatedly rewrites its instructions after inspecting these answers, those questions have become development material. They remain useful, but their results no longer offer the same kind of independent check. Keep a separate final collection aside until the design is chosen.

Now consider a mistake. An assistant generates fifty versions of “Are you open on Sunday?” All are based on the same notice and all use nearly identical answers. The team puts forty in training and ten in its final check. There are different sentences in the two folders, but the apparent separation is weak. Success could depend on rehearsing that one notice and answer pattern. It would tell us little about renewal questions or notices that do not contain the answer.

A better inventory records where each item came from and groups related material before assigning its role. It also records whether the material may be used for the proposed purpose. A public page, a visitor’s private message and a staff-written example do not become interchangeable because all can be copied into a spreadsheet. The team needs a reason for each inclusion and an honest record of unknowns.

Try this small decision. You have a current public notice, an outdated copy, an unchecked generated answer and a private visitor message. The fictional pilot is restricted to public information, and the library has confirmed permission to use its own notices. Choose what can enter the pilot now, what needs checking, and what should be held out. Then describe one question that the available material cannot yet support. Do not solve the exercise by counting files.

A defensible answer uses the current notice, excludes the obsolete copy from current answers, checks the generated answer against its source before using it as a demonstration, and keeps the private message outside this pilot. Missing renewal information is a coverage gap, even if the folder contains many Sunday examples. Another answer may postpone training entirely and first test a retrieval prototype. Both succeed if they distinguish purpose, permission, quality and coverage. The next chapter can now ask what changes when these carefully chosen examples become a training signal.

## Sample B — Evaluation before data and adaptation

The library has two candidate assistants and one afternoon to decide what to investigate next. Cedar answered the demonstration question fluently. Birch produced a shorter answer. Chapter 1 helped us inspect their access and permissions, but those documents cannot settle which assistant will serve visitors better. We need to turn “better” into a question that a small comparison can actually answer.

Begin with the job. In this fictional pilot, the assistant should answer from public library notices, name the notice it used and say when the notice does not contain enough information. It should not reserve books or inspect visitor accounts. A successful answer is therefore more than a pleasant sentence. It must be supported, relevant and within the pilot’s boundaries. These criteria make the comparison narrower, but also more useful.

Write a question with its source before showing it to either assistant. The notice says Sunday opening is from noon until four. The visitor asks whether they can return a book at three. “Yes, during Sunday opening hours” is supported. “Yes, through the overnight drop box” adds a facility that the notice never mentioned. A human reviewer could mark the second answer unsuccessful even if its conclusion about three o’clock happens to be correct.

Now make a small set of different cases. Include a straightforward opening-hours question, a renewal question, a notice with an exception, and a question whose answer is missing. Run both assistants with the same documents and instructions. Record the outputs before scoring them. If one receives the relevant notice and the other receives nothing, the comparison describes two different systems; it does not isolate the contribution of the model.

Suppose Cedar passes three of four cases and Birch passes two. That is evidence about these outputs on these four cases. It does not establish that Cedar is usually better. One additional successful answer changes the score by twenty-five percentage points. The renewal case may also matter more to the library than the others. A useful report keeps the individual results alongside the average so someone can see what went wrong.

There is another complication. What if the librarian used those same questions yesterday to rewrite Cedar’s instructions? The questions helped develop Cedar. Reusing them today can show whether that particular fix worked, but gives a weaker check of performance on unfamiliar requests. We need to know how the examples were selected, whether related examples entered training and which results influenced the team. The apparent testing problem has become a data problem.

Try reviewing this claim: “Cedar is ready because it scored seventy-five percent and Birch scored fifty percent.” Rewrite it into a narrower conclusion and name two checks you would perform before a public pilot. Explain what you would do if Cedar’s failed case involved inventing an exception to a library rule, while Birch’s failures were simply incomplete answers.

A sound response says Cedar did better on this small, specified exercise under the recorded conditions. It asks for more representative questions and an independent check after development choices are fixed. It also investigates the kinds of failure: one aggregate score cannot express every consequence. A cautious recommendation to defer either system can be as defensible as choosing Cedar for further internal testing. The evidence should determine the next step rather than decorate a choice already made.

This sequence gives the reader an immediate reason to care about data and adaptation. Its next chapter must explain how to construct those records and protect the final check. Only after that can the reader investigate whether changing instructions, adding documents or updating weights would address the observed failures. The opening decision is useful, but its unresolved dependencies need careful handling.

## Editorial review and selection

| Criterion | A | B |
|---|---|---|
| Continuity from the release inspection | Direct: what materials the library needs next | Direct: whether the candidate is useful |
| First-use vocabulary | Dataset and data roles introduced with folders | Scoring is concrete, but data independence is deferred |
| Missing prerequisites | Must state the task before selecting records | Full evaluation chapter would need data lineage, splits and intervention controls early |
| Application answerability | Supplied permission/scope facts support every decision | Supplied outputs support a bounded conclusion; independence requires a follow-on explanation |
| Repetition risk | Brief context/weights recap, then new material | Could substantially repeat Chapter 0’s failure and evaluation introduction |
| Evidence risk | Keep permissions fictional; source real pipeline claims separately | Do not turn a four-case illustration into a confidence estimate |

**Select A, with B’s purpose-first framing.** A closes the largest prerequisite gap before introducing adaptation, and it leaves evaluation enough space for scoring and uncertainty. The revised opening names the library’s task immediately and distinguishes development checks from a final test before any training proposal. The final chapter returns to B’s conditional decision, using a complete scoring example.

Revision applied in the full draft: replace ambiguous “held out” in the data task with explicit intended data roles; explain that a source notice can legitimately be supplied at evaluation while a copied training question/answer creates a different problem; distinguish the application named Alder from the underlying Cedar model. Each chapter can be moved later using stable concept IDs. No learner participants or independent reviewer were used; this is the authoring agent’s editorial assessment.
