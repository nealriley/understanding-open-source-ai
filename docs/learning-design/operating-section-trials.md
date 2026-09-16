# Operating section: two teaching trials

16 September 2026. Original, fictional teaching samples for the two sequences in the [section plan](operating-section-plan.md). These are authoring exercises, not published chapters. No real service prices or performance measurements appear below. The reviewer is the authoring agent; no independent reviewer or learner participated.

## Trial A — Begin with the service

The library has chosen a version of its Alder assistant for a small pilot. Earlier chapters helped us distinguish its model from its application, inspect its data and test its answers. The pilot now faces a different question: what must happen for a visitor to receive a useful answer on a busy afternoon?

Imagine that six visitors ask questions at the same moment. Alder needs the right library notice for each question, a model response and a way to show that response to the visitor. Someone also needs to notice when these steps fail. A **service** is the application made available to users, together with the arrangements that keep it available. A good answer in a saved test does not tell us whether that service can keep up with a queue.

Follow one request. The visitor enters a question into the library's website. The application retrieves an approved notice and puts it in the model's context. The model generates an answer. The application displays it with its source and a way to contact staff. This is one possible design, not a requirement for every model application. We can now ask who supplies and maintains each part.

Under the fictional Hosted route, a supplier runs the model on its computers. The library still owns the notices, decides what answers count as acceptable, maintains its website and handles questions sent to staff. Under the Self-operated route, the library also arranges the computers and software that run the model. It might employ a contractor to do that work. “Self-operated” describes a responsibility; it does not mean a librarian personally repairs a server.

Both routes could use the same openly released weights. The release's permissions and the location where it runs are separate choices. Conversely, possessing weights does not supply the rest of the service. Before choosing a route, the library should identify which responsibilities it can actually meet.

Two measurements make the busy afternoon clearer. **Latency** is elapsed time for a specified event, such as receiving the complete answer. **Throughput** is the amount of completed work in a period, such as answered requests per minute. A service can finish many requests in a minute while some individual visitors wait too long. Always name the event and unit. “Fast” leaves both unclear.

For this exercise, suppose the Hosted offer promises someone will investigate model-service outages, but says nothing about updating the library's notices. The Self-operated offer includes a computer and installation, but no continuing support. Neither offer tells us how the system behaves when several long questions arrive together. These are gaps in the offers, not evidence that either route must fail.

**Try it.** Assign an owner for three jobs: correcting an obsolete notice, restoring a failed model service and deciding whether a changed model still answers acceptably. Identify one unanswered question for each offer. Then propose a check that reflects the six simultaneous visitors. You may choose either route or postpone the choice, but name the work your decision depends on.

**Feedback.** The library must arrange notice correction and define acceptance even when a supplier runs the model. The Hosted offer assigns outage investigation, although its response time still needs clarification. The Self-operated offer leaves ongoing recovery unassigned. A useful check sends a representative mix of questions together, records completion times and failures, and applies the existing answer rubric. Repeating a single easy question is weaker evidence. Postponing the decision until a contractor accepts recovery duties is defensible; so is a hosted pilot with a clear escalation path. Next, we can price the work we have identified and compare the two routes over the same period.

## Trial B — Begin with the budget

The library's evaluation gave Alder a defined task and a way to judge answers. Chapters 0–1 also taught us that access to model weights and permission to use them are different questions. The director now asks another: if both operating routes pass our minimum requirements, which can we afford? A zero download price does not supply enough information to answer.

Start with a deliberately small, fictional ledger. A **cost boundary** states whose costs we count, over what period, and which activities are included. Here we compare the library's spending during one month. Setup work is assumed to have been paid already and is excluded from this month's ledger. Website maintenance, staff review and other operating work are also excluded for now. We will identify those omissions before making a recommendation. These figures are teaching assumptions, not quotations from suppliers.

The Hosted route costs 120 credits for the month plus 0.03 credits for each submitted request. The Self-operated route costs 360 credits for the month plus 0.01 credits per request. A credit is an invented unit of money. The first amount is **fixed** within the stated month and request range: it is charged even if few requests arrive. The second amount is **variable**: it changes with the number of requests. Real arrangements may add capacity or change prices in steps; this simple example assumes neither happens within the range considered.

At 4,000 requests, Hosted costs 120 plus 120, or 240 credits. Self-operated costs 360 plus 40, or 400 credits. Dividing by the same 4,000 requests gives 0.06 and 0.10 credits per request. Hosted is cheaper inside this boundary. It does not follow that it is cheaper for every workload, or that a submitted request is a useful answer.

To see the second problem, suppose we inspect all 4,000 responses using the library's acceptance rubric. In this fictional month, Hosted produces 2,000 accepted answers and Self-operated produces 3,600. Divide each cost by its own accepted count: 240 divided by 2,000 is 0.12; 400 divided by 3,600 is about 0.111 credits per accepted answer. The ranking reverses. These counts are additional assumptions, not something we can infer from the two price schedules.

**Try it.** First change the traffic to 20,000 requests while keeping the invented price schedules. Calculate both monthly totals. Then explain why you cannot yet calculate cost per accepted answer for that larger workload. Finally, identify two omitted activities that could change your recommendation. Give one condition under which you would still prefer Hosted.

**Feedback.** Hosted costs 720 credits and Self-operated costs 560. We need accepted-answer counts for the new workload, or an explicitly labelled assumption about them, to calculate the second measure. Earlier acceptance rates are not a promise about a different mix of requests. Omitted activities include handling failures, reviewing answers, maintaining the service and changing providers. A hosted route could still be preferable when the library cannot staff the alternative, or when both meet its requirements and avoiding a larger fixed commitment matters more than the stated unit cost.

We have learned how to compare a bounded ledger, but have also discovered why the ledger cannot choose an operating arrangement by itself. Someone must identify the service's components, who maintains them and whether they can handle the expected traffic. That is the next chapter in this candidate sequence. When we later return to release incentives, we can also ask why different organizations might pay development costs while charging users for different parts of the service.

## Editorial review and choice

| Check | Trial A | Trial B |
|---|---|---|
| Bridge from current chapters | Extends the saved evaluation to simultaneous real use; reuses context, retrieval and release permissions. | Extends a scored outcome to a cost denominator. |
| First-use terminology | Defines service, operating routes, latency and throughput; avoids GPU/KV vocabulary in the required path. | Defines cost boundary, fixed/variable cost and invented currency; division explained step by step. |
| Task answerable from explanation | Offers name the responsibilities and omissions needed for the owner map; task asks for a test proposal, not unknown measured results. | Rates and request counts suffice for totals; feedback explicitly identifies absent quality data. |
| Repetition | Brief retrieval recap serves the new owner map; do not reteach training. | Openness recap is brief; scoring rubric is reused rather than reinvented. |
| Factual support | General service and measurement distinctions supported by resources in the plan. Offer details are fictional. | Arithmetic and counts are fictional; no empirical savings claim. Categories are deliberately incomplete. |
| Main prerequisite gap | Readiness for ongoing operation, made explicit in the opening. | Ownership and missing work need a later chapter before a complete decision is possible. |

**Decision:** Use A as the opening approach. Its final paragraph supplies the inventory needed for costs. Retain B's worked arithmetic and ranking reversal for Chapter 6 after the responsibilities are explained. The revision to A explicitly separates release permissions from operating location and avoids presenting a model supplier as owner of the whole application. The revision to B makes omitted costs and unknown future acceptance counts visible before the recommendation.

For the full draft, expand A's continuous explanation before adding optional inference internals. Expand B with capacity limits, staff-time assumptions and sensitivity to traffic, then a complete ledger. Do not turn either sample into a succession of vocabulary boxes. The three full chapters remain the next implementation work.
