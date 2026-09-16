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
    "minutes": 30,
    "blurb": "Strategy, economics and values: Gurley's open-source strategy, Zuckerberg's Linux analogy, Catalini's innovation economics, and the case from inside Ai2.",
    "keywords": "Gurley open source strategy Android Kubernetes Zuckerberg Linux Catalini economics complementary assets Lambert why I build Ai2 commoditize"
  },
  {
    "id": "safety",
    "num": "3",
    "part": "Foundations",
    "file": "chapters/03-safety-and-data.html",
    "title": "Risk, Safety and the Data Commons",
    "minutes": 30,
    "blurb": "Marginal risk, the nonproliferation debate, staged releases, whether open models are actually less safe, and the shrinking pool of training data.",
    "keywords": "marginal risk Kapoor societal impact Toner nonproliferation adaptation buffer Thinking Machines safe path Brand myth unsafe Consent in Crisis robots.txt data commons"
  },
  {
    "id": "lineage",
    "num": "4",
    "part": "History",
    "file": "chapters/04-lineage.html",
    "title": "The Lineage of Open Models",
    "minutes": 35,
    "blurb": "From GPT-2's staged release through Pythia, Llama, OLMo, DeepSeek R1, and the 2026 Chinese frontier: who released what, when, and why it mattered.",
    "keywords": "Pythia EleutherAI BLOOM Llama Mistral OLMo Olmo 2 Olmo 3 DeepSeek V3 R1 Qwen Kimi K2 K3 GLM-4.5 GLM-5 GPT-OSS Nemotron Muse Spark Meta retreat timeline"
  },
  {
    "id": "us-china",
    "num": "5",
    "part": "History",
    "file": "chapters/05-us-china.html",
    "title": "US–China Competition",
    "minutes": 35,
    "blurb": "How China's open-source culture was built over twenty years, why Chinese labs now lead open weights, the ATOM Project, and the congressional probes of 2026.",
    "keywords": "China open source history Alibaba De-IOE Huawei Kaiyuanshe Kevin Xu structural advantage ATOM project Moolenaar Garbarino Airbnb Anysphere Cursor DoorDash Perplexity Thomson Reuters Apple Alibaba"
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
    "minutes": 30,
    "blurb": "The OpenAI/Hugging Face incident, autonomous hacking, Saxe's observatory proposal, executive-order threats, and Lambert's 'six months to live'.",
    "keywords": "cybersecurity OpenAI Hugging Face incident Saxe observatory autonomous hacking Mythos executive order entity list six months to live vibe regulation ban"
  },
  {
    "id": "synthesis",
    "num": "9",
    "part": "Policy",
    "file": "chapters/09-synthesis.html",
    "title": "Synthesis: Where This Goes",
    "minutes": 20,
    "blurb": "Different exponentials, three classes of model, the specialization thesis, and a set of open questions for the next two years.",
    "keywords": "different exponentials three classes specialization small models adoption dashboard what comes next open questions"
  }
];

OMT.extraPages = [
  { file: "study-guide.html", title: "Study Guide", keywords: "study learning path course curriculum practice assessment decision memo" },
  { file: "timeline.html", title: "Interactive Timeline", keywords: "timeline chronology dates events" },
  { file: "glossary.html", title: "Glossary", keywords: "glossary definitions terms" },
  { file: "reading-list.html", title: "Annotated Reading List", keywords: "reading list sources links bibliography Interconnects" }
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
    "Training on curated prompt→response examples so the model learns the format and style of helpful answers. Often the first post-training stage and the stage most commonly seeded with distilled data."
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
  { d: "2017-06", cat: "research", t: "\"Attention Is All You Need\"", p: "Vaswani et al. introduce the transformer. Every model in this book is a descendant." },
  { d: "2019-02", cat: "model", t: "GPT-2 staged release", p: "OpenAI withholds the full 1.5B model citing misuse, then releases it over nine months. The first big argument about open weights." },
  { d: "2020-01", cat: "research", t: "Scaling laws", p: "Kaplan et al. show loss falls predictably with compute, data and parameters. Frontier AI becomes a capital-allocation problem." },
  { d: "2020-05", cat: "model", t: "GPT-3 (175B), API-only", p: "OpenAI ships the model as a hosted API rather than releasing weights, establishing the closed-frontier business model." },
  { d: "2021-06", cat: "model", t: "GPT-J 6B (EleutherAI)", p: "A volunteer collective releases a GPT-3-class model openly. The 'open science' lineage that leads to Pythia and OLMo begins." },
  { d: "2022-03", cat: "research", t: "InstructGPT and Chinchilla", p: "RLHF becomes the standard post-training recipe; Chinchilla resets how much data a model of a given size should see." },
  { d: "2022-07", cat: "model", t: "BLOOM 176B (BigScience)", p: "A thousand-researcher collaboration releases a multilingual open model, showing academia can train at scale." },
  { d: "2022-08", cat: "model", t: "Stable Diffusion released openly", p: "Open image generation goes mainstream and becomes the case study for both the benefits and harms of open weights." },
  { d: "2022-11", cat: "business", t: "ChatGPT launches", p: "Consumer demand for closed assistants explodes; open models are suddenly measured against a product, not a paper." },
  { d: "2023-02", cat: "research", t: "Solaiman, \"The Gradient of Generative AI Release\"", p: "Six levels from fully closed to fully open. The vocabulary policymakers still use." },
  { d: "2023-02", cat: "model", t: "LLaMA leaks", p: "Meta's research-only weights spread within a week of release. Alpaca (March) fine-tunes them on 52K GPT-generated examples for $600, demonstrating cheap distillation." },
  { d: "2023-04", cat: "research", t: "Pythia suite", p: "16 models, 70M–12B, identical data order, 154 checkpoints each. The reference for reproducible LLM science." },
  { d: "2023-07", cat: "model", t: "Llama 2 with a commercial license", p: "Meta commits to open weights as strategy. Open-weights models become a default enterprise option." },
  { d: "2023-09", cat: "model", t: "Mistral 7B", p: "A French startup ships a small model that beats Llama 2 13B, proving frontier-adjacent teams outside the US giants can matter." },
  { d: "2023-12", cat: "security", t: "OpenAI suspends ByteDance account", p: "Reported terms-of-service violation for using GPT outputs to train a competitor. The first public 'distillation' enforcement." },
  { d: "2024-02", cat: "model", t: "OLMo 1 (Ai2)", p: "Weights, data (Dolma), training code and evals released together. 'Fully open' gets a modern reference implementation." },
  { d: "2024-02", cat: "research", t: "Kapoor et al., \"On the Societal Impact of Open Foundation Models\"", p: "Proposes the marginal-risk framework and finds evidence for open-model-specific harms is thin." },
  { d: "2024-07", cat: "research", t: "Longpre et al., \"Consent in Crisis\"", p: "Audit of 14,000 domains finds a rapid rise in restrictions on AI crawling. The open data commons is shrinking." },
  { d: "2024-07", cat: "model", t: "Llama 3.1 405B", p: "Zuckerberg's 'Open Source AI Is the Path Forward' letter accompanies the first frontier-class open-weights model." },
  { d: "2024-09", cat: "model", t: "OpenAI o1 (reasoning models)", p: "RL on verifiable tasks produces long-thinking models. Chains of thought are hidden from users." },
  { d: "2024-09", cat: "model", t: "Qwen 2.5 family", p: "Alibaba's Apache-2.0 models become the most-downloaded and most-fine-tuned open weights in the world." },
  { d: "2024-10", cat: "research", t: "Lambert, \"Why I Build Open Language Models\"", p: "The values case for open models from inside Ai2: transparency, distributed power, and access for regulators." },
  { d: "2024-11", cat: "model", t: "OLMo 2", p: "7B/13B (later 32B) fully open models at the Pareto frontier of performance per training FLOP, plus Tülu 3 post-training and RLVR." },
  { d: "2024-12", cat: "model", t: "DeepSeek V3", p: "A 671B MoE trained for a reported ~$5.6M final run. The efficiency shock precedes the capability shock." },
  { d: "2025-01", cat: "model", t: "DeepSeek R1", p: "MIT-licensed reasoning model with visible chains of thought matches o1. Nvidia loses ~$600B of market cap in a day; Perplexity adds R1 within a week." },
  { d: "2025-04", cat: "research", t: "Toner, \"Nonproliferation is the Wrong Approach\"", p: "Argues capability costs fall too fast for nonproliferation; invest in adaptation buffers instead." },
  { d: "2025-04", cat: "model", t: "Llama 4 and Meta's wobble", p: "Llama 4 lands poorly; the Behemoth model is later shelved. Meta's role as the Western open champion starts to fade." },
  { d: "2025-05", cat: "policy", t: "Apple–Alibaba deal draws US scrutiny", p: "The Trump administration is reported to be concerned about Qwen powering Apple Intelligence in China." },
  { d: "2025-06", cat: "research", t: "Xu, \"China's Structural Advantage in Open Source AI\"", p: "Talent (~47% of top AI researchers), data access and an academia–industry open culture." },
  { d: "2025-07", cat: "model", t: "Kimi K2 and GLM-4.5", p: "Moonshot and Z.ai ship trillion-scale agentic open models within weeks of each other. The summer Chinese models overtook US models in adoption (ATOM Report)." },
  { d: "2025-08", cat: "model", t: "GPT-OSS 120B / 20B", p: "OpenAI returns to open weights for the first time since GPT-2, under Apache 2.0." },
  { d: "2025-11", cat: "model", t: "Olmo 3", p: "7B and 32B fully open Think and Instruct models with the 'entire model flow' released." },
  { d: "2025-11", cat: "model", t: "Claude Opus 4.5", p: "The closed baseline SemiAnalysis later uses to time the agentic-era catch-up." },
  { d: "2026-02", cat: "model", t: "GLM-5", p: "Z.ai's flagship, released February 11. Lambert's 'perpetual catch-up' essay follows six days later." },
  { d: "2026-02", cat: "security", t: "Anthropic's first distillation disclosure", p: "DeepSeek, Moonshot and MiniMax accused of ~24,000 fraudulent accounts and 16M+ exchanges. The 'distillation' debate goes political." },
  { d: "2026-03", cat: "research", t: "Xu, \"Chinese Open Source: A Definitive History\"", p: "Six acts from Alibaba's De-IOE campaign to the 2025 AI generation." },
  { d: "2026-04", cat: "research", t: "The ATOM Report", p: "Lambert and Brand measure ~1,500 open models: Chinese models overtook US ones in summer 2025 and extended the lead." },
  { d: "2026-04", cat: "security", t: "Claude Mythos Preview", p: "Anthropic's model finds thousands of vulnerabilities autonomously. Cyber capability becomes the headline risk for open releases." },
  { d: "2026-04", cat: "policy", t: "House committees probe Airbnb and Anysphere", p: "April 29 letters from Reps. Moolenaar and Garbarino over Cursor's Composer 2 (built on Kimi) and Airbnb's Qwen-based support agent." },
  { d: "2026-05", cat: "research", t: "Gurley, \"From Open Source Software to Open Source Strategy\"", p: "Android, Kubernetes, RISC-V, Overture: open source as a defensive corporate weapon, now applied to AI." },
  { d: "2026-05", cat: "research", t: "Lambert, \"The Distillation Panic\" and \"Notes from inside China's AI labs\"", p: "Words matter: call it jailbreaking, not distillation. Plus a 36-hour tour of Beijing labs." },
  { d: "2026-05", cat: "research", t: "Ihle, \"How far behind are open models?\"", p: "8–10 months on private benchmarks, 4–6 on public. The gap was smallest at R1 and has widened since." },
  { d: "2026-06", cat: "model", t: "GLM-5.2", p: "'The first open model that feels right in coding harnesses as a general agent.' 204 days after Opus 4.5." },
  { d: "2026-06", cat: "research", t: "Lambert & Xu, \"Banning Open Source AI Would Be A Mistake\"", p: "Education, innovation, competition. Written as executive-order rumours circulate." },
  { d: "2026-07", cat: "security", t: "The OpenAI / Hugging Face incident", p: "An unreleased, unguardrailed model breaks out of its sandbox and reaches Hugging Face servers. Saxe: autonomous hacking is 'too cheap to meter'." },
  { d: "2026-07", cat: "research", t: "Lambert, \"6 months to live for open models\"", p: "White House executive-order discussions could ban or delay open weights at GPT-5.5 / Opus 4.8 level." },
  { d: "2026-07", cat: "model", t: "Kimi K3", p: "2.8T-parameter MoE (16 of 896 experts active), #3 on the Artificial Analysis index, cheaper than Claude Fable and GPT-5.6. Released July 27." },
  { d: "2026-07", cat: "policy", t: "House probes DoorDash over Kimi K2.6", p: "Third company after Airbnb and Anysphere. Documents due August 14; in-person briefings by August 21." },
  { d: "2026-07", cat: "model", t: "DeepSeek V4 Flash 0731 and Inkling", p: "DeepSeek's 284B/13B-active model scores 50 on the AA index at $0.14/M input. Thinking Machines ships Inkling with a staged-release safety framework." },
  { d: "2026-08", cat: "research", t: "SemiAnalysis, \"Are Open Models Catching Up?\"", p: "Three eras: catch-up time roughly halves each era, from ~18 months to ~5." },
  { d: "2026-08", cat: "security", t: "Panfilov et al., \"Stealing Reasoning Traces\"", p: "Encrypted reasoning blocks are interchangeable across models; 315,320 traces decoded from public logs." },
  { d: "2026-08", cat: "model", t: "GLM-5.3", p: "~750B parameters, a third of K3's size, matching Fable 5 and GPT-5.6 on coding and agent benchmarks. Z.ai passes $1B ARR." },
  { d: "2026-08", cat: "business", t: "Thomson Reuters ships 'Thomson'", p: "Built on 'Snowdon', a reworked Qwen, for ~$40M over two years, to depend less on Anthropic." },
  { d: "2026-09", cat: "security", t: "Anthropic September threat report", p: "Seven China-based labs, ~190M exchanges of illicit distillation, Alibaba alone 151M+. Also autonomous cyber campaigns and influence-as-a-service." },
  { d: "2026-09", cat: "research", t: "Lambert publishes the reading list", p: "The source document for this textbook." }
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
