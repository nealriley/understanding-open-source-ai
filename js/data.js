/* Shared data: chapter manifest, glossary, timeline, search index. */
window.OMT = window.OMT || {};

OMT.chapters = [
  {
    "id": "primer",
    "num": "0",
    "part": "Primer",
    "file": "chapters/00-primer.html",
    "title": "How Language Models Work",
    "minutes": 7,
    "blurb": "A model release is easier to understand when you can follow what changes during training and what stays fixed when someone uses it. The useful starting point is a pipeline, not a leaderboard.",
    "keywords": "Annotate a pipeline with data, learned parameters, post-training and inference. Distinguish a training objective from a deployment feature. Identify which release artefacts support running, adapting or investigating a model.  A model is an artefact inside a system \n Imagine a fictional library assistant, Alder. The application receives a question, retrieves a passage from a manual, sends both to a language model and displays a response. The model is one component: retrieval chooses material, the application decides permissions, and the interface decides what readers see. If a response improves after replacing the search index, that is not evidence that the model learned new weights. \n Text is represented as tokens: units selected by a tokenizer. Training adjusts numerical parameters so the model performs better under an objective. In an autoregressive language model, generation repeatedly predicts a next token from the available context. A convincing continuation is not a guarantee that a statement is true. A system may add tools, retrieval, verification and human review around that loop. \n  Vaswani and coll",
    "quizId": "primer-v2"
  },
  {
    "id": "openness",
    "quizId": "openness-v2",
    "num": "1",
    "part": "Primer",
    "file": "chapters/01-what-open-means.html",
    "title": "What 'Open' Means",
    "minutes": 20,
    "blurb": "Assess a release through access, artefacts, permissions, and missing evidence. Worked and practice cases distinguish open weights, OSI requirements, and research transparency.",
    "keywords": "open weights open source fully open license gradient of release Solaiman OSI MIT Apache Llama license staged release API"
  },
  {
    "id": "foundations",
    "num": "2",
    "part": "Foundations",
    "file": "chapters/02-foundations.html",
    "title": "Why Anyone Builds Open Models",
    "minutes": 6,
    "blurb": "A free download can be part of a profitable business, a research programme or a strategy against a rival. These explanations can coexist. The hard part is deciding what the evidence establishes about a particular release.",
    "keywords": "Compare two explanations for a release decision using evidence and alternatives. Distinguish an author’s strategic argument from a documented action or private motive. Identify an observation that would change a preferred explanation.  Follow the benefit, then test the story \n Think of a fictional company, Lantern, which gives away model weights and sells managed deployment. One explanation is that wider adoption increases demand for its hosting. Another is that publication helps recruit researchers. A third is that a common model weakens a rival’s proprietary platform. None follows simply from the download button. You need evidence about customers, hiring, product integration or the competitive setting. \n Motives are not mutually exclusive. A researcher can care about scientific access while an employer values cheaper infrastructure. An organisation can change priorities after a leadership or budget change. Resist explanations that make every possible outcome count as confirmation: if both continuing and stopping releases prove the same theory, the theory needs a more specific test. \n\n Gurley: openness as corporate s",
    "quizId": "foundations-v2"
  },
  {
    "id": "safety",
    "num": "3",
    "part": "Foundations",
    "file": "chapters/03-safety-and-data.html",
    "title": "Risk, Safety and the Data Commons",
    "minutes": 7,
    "blurb": "“Is it safe to release?” is incomplete until we specify a capability, an actor, a setting and an alternative. Open access can change both misuse opportunities and the ability to inspect or defend systems. The comparison is the substance of the argument.",
    "keywords": "Analyse a release against an explicit baseline and threat model. Distinguish observed misuse, capability tests and marginal risk. Evaluate data-access constraints without confusing availability with permission.  Start with the alternative world \n  Kapoor and colleagues’ 2024 position paper  proposes analysing the marginal risk of open foundation models: the additional risk relative to existing technologies. Its abstract reports insufficient evidence to characterise several misuse risks effectively. That is a reason to improve evidence, not a finding that the added risk is zero. \n Suppose a fictional community is considering releasing a model that helps explain software defects. A relevant baseline might include existing search, prior downloadable models and hosted services. Compare the same actors and tasks in both worlds. If the new model makes a difficult task easier for novices, that matters even when experts could already perform it. If a service already supplies similar help, the incremental effect of downloadable weights may concern scale, cost or removal of monitoring rather than entirel",
    "quizId": "safety-v2"
  },
  {
    "id": "lineage",
    "num": "4",
    "part": "History",
    "file": "chapters/04-lineage.html",
    "title": "The Lineage of Open Models",
    "minutes": 6,
    "blurb": "The history of open models is a history of changing access to useful artefacts. A release can matter because it makes research possible, broadens deployment or demonstrates a training method—even when it does not top a benchmark.",
    "keywords": "Compare two historical milestones using dated primary documents. Explain what an artefact release enabled and what it left unknown. Distinguish a publication date, a release date and later retrospective interpretation.  First ask what kind of date you have \n A paper submission, a product announcement and a downloadable checkpoint can appear on different days. Later revisions may document material absent from the first release. Record the event type before building a timeline. The milestones here are selected examples, not a complete lineage or a claim that later models simply descend from earlier ones. \n The dates in this chapter attach to specific documents. A paper’s first submission provides a dated public record of what its authors reported; it does not automatically prove that every linked file was available at that moment. For a legal or reproducibility assessment, inspect the particular artefact version too. \n  OpenAI’s 5 November 2019 GPT-2 announcement  identifies the final step in its staged release. This is a historical example of release as a process with changing access. It is not evidence",
    "quizId": "lineage-v2"
  },
  {
    "id": "us-china",
    "num": "5",
    "part": "History",
    "file": "chapters/05-us-china.html",
    "title": "US–China Competition",
    "minutes": 6,
    "blurb": "A country-level lead can describe downloads, deployment, benchmark scores or revenue. Those measures can move differently. To understand US–China competition, first identify the actors and the quantity being compared.",
    "keywords": "Critique an adoption claim by identifying its denominator, coverage and date. Compare a structural explanation with a plausible alternative. Separate nationality, capability, commercial adoption and policy status.  Xu’s history: institutions and choices \n In  “Chinese Open Source: A Definitive History” (March 2026) , Kevin Xu connects corporate technology choices, communities and the development of China’s open-source ecosystem. The historical narrative challenges the idea that open-model activity appeared from nowhere. Treat its causal interpretation as an argument: a sequence of events does not by itself isolate what caused later success. \n The unit matters. A company headquartered in one country can use research, software, people and hardware from many places. A community project can cross national boundaries. Specify whether you classify the original developer, the current maintainer, the host serving requests or the end user. The categories should follow the question, not an assumption that all these actors share a nationality. \n\n A structural explanation has limits \n Xu’s  June 2025 structur",
    "quizId": "us-china-v2"
  },
  {
    "id": "gap",
    "num": "6",
    "part": "Science",
    "file": "chapters/06-measuring-the-gap.html",
    "title": "Measuring the Gap",
    "minutes": 6,
    "blurb": "“How far behind?” sounds like one question. It can mean a score difference, a delay to a threshold, or a gap in useful work at a given cost. A good comparison begins by choosing which question matters.",
    "keywords": "Calculate a score and a threshold delay from a small documented example. Explain how evaluation and aggregation choices change a comparison. Specify evidence needed before applying a benchmark result to a decision.  Choose the quantity before choosing the chart \n A benchmark is a task collection and scoring rule. A result also belongs to a model version, prompt format, sampling configuration and environment. Giving one model tools or more attempts changes the comparison. A careful record includes those choices, the evaluation date, missing results and uncertainty. The country or licence of a model cannot substitute for this information. \n A difference of ten percentage points is not a delay of ten months. A delay needs a threshold and dated observations. A cost comparison needs units: per token, per attempt, per successful task or full operating expenditure. If different tasks have different error costs, an average can hide the failure you most care about. \n\n SemiAnalysis: compare within an era \n  SemiAnalysis’s “Are Open Models Catching Up?”  divides its analysis into early scaling, reasoning and ",
    "quizId": "gap-v2"
  },
  {
    "id": "distillation",
    "num": "7",
    "part": "Science",
    "file": "chapters/07-distillation.html",
    "title": "Distillation and Synthetic Data",
    "minutes": 7,
    "blurb": "Distillation describes an information flow. The same word can cover authorised model compression, synthetic training examples and allegations of abusive access. Keep the mechanism, the permission question and the measured benefit separate.",
    "keywords": "Trace teacher–student information flow and locate the training stage. Separate a company allegation from demonstrated causal uplift. Design a controlled comparison of teacher-assisted training.  A teacher supplies a training signal \n  Hinton, Vinyals and Dean’s 2015 paper  develops compression from an ensemble into a single model. The broader teacher–student idea asks what information one model supplies to another. It does not require the student to copy the teacher’s architecture, and it does not by itself specify how the teacher was accessed. \n In a response-based workflow, prompts go to a teacher; selected answers become examples used to train a student. In probability matching, the student learns from a teacher’s distribution over outputs rather than only a selected answer. Access to those probabilities need not mean access to the teacher’s weights: the interface might expose them. Conversely, a text-only service may not expose the information a particular method needs. \n Synthetic data is the wider category. It can supply questions, answers, preferences, tests or candidate",
    "quizId": "distillation-v2"
  },
  {
    "id": "security",
    "num": "8",
    "part": "Policy",
    "file": "chapters/08-security-and-policy.html",
    "title": "Security, Cyber and the Regulatory Fight",
    "minutes": 7,
    "blurb": "A policy can sound decisive while targeting the wrong mechanism. Compare proposals by the harm they aim to reduce, the actors they can reach and the evidence that would show whether they work.",
    "keywords": "Classify an incident report, proposal, enacted rule and forecast separately. Compare two policy approaches against the same objective. Specify success measures, displacement risks and a revision trigger.  From a report to a policy claim \n An incident report can document a failure, an attribution or a suspected mechanism. Before building a policy conclusion on it, ask what the reporting organisation observed directly, which parts are inferred and whether other investigators can corroborate them. A persuasive narrative is not a substitute for those distinctions. \n For example,  Anthropic’s February 2026 disclosure  reports alleged abusive collection of model outputs. That establishes a concrete subject for investigation. It does not, on its own, measure the net social benefit of a proposed restriction. The same evidence can be relevant to access enforcement, commercial interests and broader security debates, which need different additional premises. \n A high benchmark score, a demonstrated failure in a controlled test and a measured increase in real-world harm are also distinct. Each can j",
    "quizId": "security-v2"
  },
  {
    "id": "synthesis",
    "num": "9",
    "part": "Policy",
    "file": "chapters/09-synthesis.html",
    "title": "Synthesis: Where This Goes",
    "minutes": 6,
    "blurb": "A defensible recommendation joins a task, a release, evidence and a revision condition. The book’s disagreements are useful because they expose different assumptions about value, control and risk. Your final memo should make those assumptions visible.",
    "keywords": "Integrate release, evaluation, cost and risk evidence into a conditional recommendation. Represent a serious counterargument without treating a forecast as a conclusion. Review and revise a decision memo using explicit criteria.  Lambert’s forecast: different forms of value \n In  “Open and closed models are on different exponentials” (June 2026) , Nathan Lambert predicts a premium market for integrated frontier products alongside broader diffusion through an open-model ecosystem. The essay asks where users pay for marginal capability and where adequate performance at a lower cost is more valuable. Treat the proposed market structure as a forecast, not a measured equilibrium or guaranteed future. \n The useful lesson for a decision-maker is to connect model performance to the value of the work. An improvement matters differently when it prevents an expensive error, saves seconds on a routine task or enables a previously impossible workflow. A broad benchmark cannot assign those values for your organisation. State which improvements would change the decision. \n\n Adequate for what? \n A fictional assistant that answe",
    "quizId": "synthesis-v2"
  }
];

OMT.extraPages = [
  {
    "file": "study-guide.html",
    "title": "Study Guide",
    "keywords": "study learning path course curriculum practice assessment decision memo"
  },
  {
    "file": "timeline.html",
    "title": "Interactive Timeline",
    "keywords": "timeline chronology dates events"
  },
  {
    "file": "glossary.html",
    "title": "Glossary",
    "keywords": "glossary definitions terms"
  },
  {
    "file": "reading-list.html",
    "title": "Annotated Reading List",
    "keywords": "reading list sources links bibliography Interconnects"
  }
];

OMT.glossary = {
  "token": [
    "Token",
    "A unit represented by a tokenizer, such as a word fragment, punctuation or byte sequence. Token counts depend on the tokenizer and language."
  ],
  "transformer": [
    "Transformer",
    "A neural-network architecture built around attention. Different models alter its components; the architecture name does not specify the training recipe."
  ],
  "attention": [
    "Attention",
    "A mechanism combining information across token representations. Full pairwise attention has quadratic interactions in sequence length; implementation and architecture affect actual costs."
  ],
  "parameters": [
    "Parameters (weights)",
    "The numbers learned during training. A '7B' model has seven billion of them. The weights file is what an 'open-weights' release actually ships."
  ],
  "pretraining": [
    "Pretraining",
    "Initial broad training, often using next-token prediction, which produces a base checkpoint. Data, objectives and compute allocation vary."
  ],
  "post-training": [
    "Post-training",
    "Training after a base checkpoint, including supervised fine-tuning, preference optimisation and sometimes reinforcement learning. These are alternatives and combinations, not a compulsory three-step recipe."
  ],
  "sft": [
    "Supervised fine-tuning (SFT)",
    "Training on prompt–response examples to adapt model behaviour. Examples can be human-written, model-generated or mixed; inspect their origin and selection criteria."
  ],
  "rlhf": [
    "RLHF",
    "Reinforcement learning from human feedback: human judgements supply a reward signal, often through a learned reward model, for further model training."
  ],
  "rlvr": [
    "RLVR",
    "Reinforcement learning with verifiable rewards: training against an automatic checker. A checker measures the chosen criterion, not every aspect of quality."
  ],
  "moe": [
    "Mixture of Experts (MoE)",
    "Mixture of experts: a router selects subsets of specialist networks. Active parameters are one cost factor; total weights, memory traffic, context and serving settings also matter."
  ],
  "inference": [
    "Inference",
    "Running a model to produce outputs. In ordinary inference, weights stay fixed. Total deployment cost also includes hardware, utilisation, tools, operations and review."
  ],
  "context-window": [
    "Context window",
    "The token limit for an input/output context under a particular model and serving configuration. A large limit does not ensure reliable use of all information."
  ],
  "distillation": [
    "Distillation",
    "Training a student using a teacher’s predictions or other feedback. The information transferred and the permissions for obtaining it must be described separately."
  ],
  "synthetic-data": [
    "Synthetic data",
    "Data generated by a model or simulation. It may be filtered or human-reviewed and used at different training stages; its quality is not guaranteed."
  ],
  "open-weights": [
    "Open weights",
    "In this book, a release with downloadable trained parameters. Check runtime requirements, component licences, and available training materials separately; downloadability does not establish OSI compliance."
  ],
  "fully-open": [
    "Fully open",
    "Shorthand here for a broadly documented research release. List the actual data disclosures, code, weights and checkpoints; inspect reuse terms and reproducibility limits separately. This label is not a certification."
  ],
  "base-model": [
    "Base model",
    "A checkpoint before subsequent post-training. It can generate continuations; assistant behaviour depends on the training and prompting used."
  ],
  "benchmark": [
    "Benchmark",
    "A fixed evaluation dataset with a scoring rule (MMLU, SWE-bench, AIME). Useful for tracking progress; vulnerable to contamination and to labs 'hill-climbing' on them."
  ],
  "reasoning-model": [
    "Reasoning model",
    "A loose label for models designed or trained to spend additional computation on intermediate work. It is not a guarantee of correctness or one fixed training method."
  ],
  "chain-of-thought": [
    "Chain of thought (reasoning trace)",
    "Generated intermediate reasoning text. It can be useful training data but is not necessarily a faithful account of the internal computation."
  ],
  "marginal-risk": [
    "Marginal risk",
    "The additional risk an open model creates beyond what is already achievable with existing tools (search engines, closed APIs, textbooks). The framing proposed by Kapoor et al. (2024) for evaluating open releases."
  ],
  "adaptation-buffer": [
    "Adaptation buffer",
    "In Helen Toner’s argument, a temporary interval in which defenders can prepare before a capability becomes broadly accessible. Its duration is an empirical question."
  ],
  "api": [
    "API",
    "Application programming interface. A hosted model API provides remote access under service terms; it can expose an open-weights or a proprietary model."
  ],
  "jailbreak": [
    "Jailbreak",
    "An attempt to induce behaviour that bypasses intended model restrictions. Distillation does not inherently require a jailbreak."
  ],
  "pareto-frontier": [
    "Pareto frontier",
    "Options not dominated on all chosen objectives. A model is dominated if another is at least as good on each objective and strictly better on one."
  ],
  "scaling-laws": [
    "Scaling laws",
    "Empirical relationships among model loss, data, parameters and computation under specified conditions. They do not specify a universal catch-up schedule."
  ],
  "entity-list": [
    "Entity List",
    "A US export-control mechanism. The effect of a particular listing depends on the applicable entries, items and rules; the name alone does not establish a blanket prohibition."
  ],
  "checkpoint": [
    "Checkpoint",
    "A saved training state, often including model weights. A release may provide one or many; documentation determines what can be recovered."
  ],
  "midtraining": [
    "Midtraining",
    "A nonstandard label for continued training between a base phase and later adaptation. Inspect the actual data and objective instead of relying on the name."
  ],
  "on-policy-distillation": [
    "On-policy distillation",
    "A distillation variant where the student generates its own samples and the teacher scores or corrects them, reducing the mismatch between training data and what the student would actually produce."
  ],
  "agent": [
    "Agent / agentic",
    "A system that uses a model with tools and a control loop to perform tasks. Its permissions and surrounding software affect behaviour and risk."
  ]
};

OMT.timeline = [
  {
    "d": "2017-06",
    "cat": "research",
    "t": "Transformer paper",
    "p": "Paper milestone; an attention-based architecture.",
    "source": "https://arxiv.org/abs/1706.03762",
    "claim_id": "CL-11",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2019-11",
    "cat": "model",
    "t": "GPT-2 final staged release",
    "p": "Announcement of the final step in the release process.",
    "source": "https://openai.com/index/gpt-2-1-5b-release/",
    "claim_id": "CL-34",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2022-03",
    "cat": "research",
    "t": "InstructGPT",
    "p": "Paper describing demonstration training followed by human-feedback training.",
    "source": "https://arxiv.org/abs/2203.02155",
    "claim_id": "CL-01",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2023-04",
    "cat": "research",
    "t": "Pythia first paper",
    "p": "Research suite with checkpoints; inspected revision dated May 2023.",
    "source": "https://arxiv.org/abs/2304.01373v2",
    "claim_id": "CL-07",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2024-02",
    "cat": "model",
    "t": "OLMo first paper",
    "p": "Reported release of weights with training data and code; inspected June revision.",
    "source": "https://arxiv.org/abs/2402.00838v4",
    "claim_id": "CL-06",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2024-02",
    "cat": "research",
    "t": "Marginal-risk framework",
    "p": "Position paper; uncertainty is not evidence of zero added risk.",
    "source": "https://arxiv.org/abs/2403.07918",
    "claim_id": "CL-08",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2024-07",
    "cat": "research",
    "t": "Consent in Crisis",
    "p": "Historical study of web restrictions; not a legal ruling.",
    "source": "https://arxiv.org/abs/2407.14933v2",
    "claim_id": "CL-09",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2024-07",
    "cat": "model",
    "t": "Llama 3.1 announcement",
    "p": "Release and public company rationale; inspect the specific licence separately.",
    "source": "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    "claim_id": "CL-14",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2024-10",
    "cat": "research",
    "t": "Lambert on building open models",
    "p": "Research and scrutiny as motivations.",
    "source": "https://www.interconnects.ai/p/why-i-build-open-language-models",
    "claim_id": "CL-16",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2025-01",
    "cat": "research",
    "t": "DeepSeek-R1 report",
    "p": "Documented training distinctions and distilled students.",
    "source": "https://arxiv.org/html/2501.12948v1",
    "claim_id": "CL-05",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2025-04",
    "cat": "research",
    "t": "Toner on adaptation buffers",
    "p": "Argument for resilience; not a measured guarantee of safety.",
    "source": "https://helentoner.substack.com/p/nonproliferation-is-the-wrong-approach",
    "claim_id": "CL-23",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2025-06",
    "cat": "research",
    "t": "Xu on structural advantage",
    "p": "Proposed explanations, with data-access caveats.",
    "source": "https://interconnect.substack.com/p/chinas-structural-advantage-in-open",
    "claim_id": "CL-18",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-02",
    "cat": "security",
    "t": "Anthropic disclosure",
    "p": "Company allegations about abusive collection; not independent adjudication.",
    "source": "https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks",
    "claim_id": "CL-22",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-03",
    "cat": "research",
    "t": "Xu’s historical essay",
    "p": "Interpretive account of an ecosystem.",
    "source": "https://interconnect.substack.com/p/chinese-open-source-a-definitive",
    "claim_id": "CL-17",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-05",
    "cat": "research",
    "t": "ATOM revised report",
    "p": "Selected adoption snapshot; not a census of global AI usage.",
    "source": "https://arxiv.org/abs/2604.07190v2",
    "claim_id": "CL-10",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-05",
    "cat": "research",
    "t": "Gurley on open-source strategy",
    "p": "Strategic framework, not proof of every company’s motives.",
    "source": "https://p3institute.substack.com/p/from-open-source-software-to-open",
    "claim_id": "CL-13",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-05",
    "cat": "research",
    "t": "Ihle’s gap analysis",
    "p": "Threshold delays with coverage and serving caveats.",
    "source": "https://www.lesswrong.com/posts/rJcCrXyEsJKmmDpWG/how-far-behind-are-open-models",
    "claim_id": "CL-20",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-06",
    "cat": "research",
    "t": "Lambert’s different exponentials",
    "p": "Economic forecast, not a settled market outcome.",
    "source": "https://www.interconnects.ai/p/open-and-closed-models-are-on-different",
    "claim_id": "CL-27",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-07",
    "cat": "policy",
    "t": "Lambert’s policy warning",
    "p": "Prediction based partly on unofficial discussions; not enacted law.",
    "source": "https://www.interconnects.ai/p/6-months-to-live-for-open-models",
    "claim_id": "CL-26",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-07",
    "cat": "research",
    "t": "Thinking Machines release proposal",
    "p": "Model safety and ecosystem readiness framework.",
    "source": "https://thinkingmachines.ai/blog/a-safe-path-to-open-weights/",
    "claim_id": "CL-24",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-08",
    "cat": "research",
    "t": "Catalini’s economic argument",
    "p": "Diffusion, incentives and complementary assets.",
    "source": "https://www.a16z.news/p/some-simple-economics-of-open-versus",
    "claim_id": "CL-15",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-08",
    "cat": "policy",
    "t": "Saxe’s observatory proposal",
    "p": "Proposal to study the attacker–defender ecosystem.",
    "source": "https://joshuasaxe181906.substack.com/p/we-urgently-need-a-coherent-national",
    "claim_id": "CL-25",
    "reviewed_on": "2026-09-16"
  },
  {
    "d": "2026-08",
    "cat": "research",
    "t": "SemiAnalysis gap analysis",
    "p": "Within-era comparisons; no cross-era chart series reproduced here.",
    "source": "https://newsletter.semianalysis.com/p/are-open-models-catching-up",
    "claim_id": "CL-19",
    "reviewed_on": "2026-09-16"
  }
];

OMT.charts = [
  {
    "id": "task-scores",
    "kind": "fictional",
    "title": "Fictional correct answers out of ten per task",
    "provenance": "Authored teaching data; Alder and Birch are fictional, not aliases for real models.",
    "reviewed_on": "2026-09-16",
    "unit": "percent correct",
    "transformation": "100 * correct / total; weighted = w * manuals + (1-w) * arithmetic",
    "rows": [
      {
        "label": "Alder",
        "manuals": 8,
        "arithmetic": 4,
        "total": 10
      },
      {
        "label": "Birch",
        "manuals": 6,
        "arithmetic": 8,
        "total": 10
      }
    ]
  },
  {
    "id": "threshold-delay",
    "kind": "fictional",
    "title": "Fictional first crossings of fixed task thresholds",
    "provenance": "Authored teaching data; Harbor and Meadow are fictional. Months are offsets, not calendar release dates.",
    "reviewed_on": "2026-09-16",
    "unit": "months",
    "transformation": "Meadow crossing month minus Harbor crossing month",
    "rows": [
      {
        "label": "Manual task",
        "threshold": 70,
        "harbor": 0,
        "meadow": 4
      },
      {
        "label": "Arithmetic task",
        "threshold": 70,
        "harbor": 1,
        "meadow": 7
      }
    ]
  }
];
