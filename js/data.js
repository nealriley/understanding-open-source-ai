/* Shared data: chapter manifest, glossary, timeline, search index. */
window.OMT = window.OMT || {};

OMT.chapters = [
  {
    "id": "primer",
    "num": "0",
    "part": "Primer",
    "file": "chapters/00-primer.html",
    "title": "How Language Models Work",
    "minutes": 20,
    "blurb": "Follow a library assistant from tokens and training to retrieval, tools and deployment. Worked examples explain which information and components change.",
    "keywords": "A visitor asks a library’s new assistant, “Can I return a book on Sunday?” A sentence appears a moment later. To the visitor, this is one service. Behind the screen are several things with different jobs: software that handles the conversation, a model that generates text, and perhaps a catalogue or a page of opening hours. Understanding those jobs is the first step towards understanding what an open model offers. We will follow Alder, a fictional library assistant , from its first answer to a more useful system. All dialogues and numerical examples in this chapter are invented for teaching. You need no programming experience. Keep one question in mind: where does the information in an answer come from? What you will be able to explain How training changes a model, and how that model generates an answer. How prompts, retrieved documents and tools contribute to an application. Which components and release materials a team needs to run, adapt or investigate a model. Before you start. Picture a search box and a chat box you have used. What do you expect each to return? Keep your answer; we will return to the difference when Alder needs information about the library. 1. The model behind the conversation A language model is a numerical system trained to represent patterns in language. The generative models discussed here use the text available to them to calculate what text could come next. They can continue a story, draft a message or produce an answer to a question. A conversation is one way an application arranges that activity. This sits within a larger field. Artificial intelligence covers systems built to perform tasks associated with intelligence. Machine learning develops behaviour from examples by adjusting a model’s numerical settings. Generative AI produces content, including text, images or sound. This book focuses on large language models, or LLMs ; other AI systems can have different inputs, structures and purposes. For Alder, the interface is the box where the visitor types. The application collects the message, passes input to a language model and displays the output. The model is the component doing the language computation. A model can be used in several applications, just as an application can switch models. The name on a chat window may therefore name a product rather than identify exactly which model produced a particular answer. One request, four steps. Follow the numbered sequence; the answer returns to the visitor through the application. Visitor Types a question Application Assembles the model’s input Language model Generates response text Application Displays the answer That distinction will matter throughout the book. If an assistant gains access to a catalogue, the complete service has acquired a useful ability. We still need to ask whether its model changed, its surrounding software changed, or both. 2. How text becomes more text A model processes numbers. A tokenizer converts text into numbered units called tokens , then converts generated token numbers back into readable text. A token might represent a word, part of a word or punctuation. Different tokenizers divide the same sentence differently, so a token count is not simply a word count. To make the process visible, imagine a tiny teaching tokenizer that divides “The library closes at five.” into The | library | closes | at | five | . . Spaces are implicit here. This is our invented division, not the output of a particular released tokenizer. The input “The library closes at” leaves the next token to be generated. One fictional prediction after “The library closes at” Possible next token Probability five 50% six 30% noon 15% All other tokens combined 5% The probabilities sum to 100%. They describe possible continuations under this fictional model. They do not say there is a 50% chance that the actual library closes at five. For that, we would need evidence about the library. A generation procedure chooses a token. It can choose the highest-probability option, or sample : make a random choice weighted by the probabilities. If “five” is chosen, the available text becomes “The library closes at five”. The model then calculates a new set of probabilities for the next position, perhaps favouring a full stop. Generation continues until a stopping condition is reached. The generation loop. The growing text feeds the next prediction; the model’s learned settings can stay fixed throughout. Available text The library closes at Next-token probabilities Calculated from that text Selected token five Extended text The library closes at five → repeat This is autoregressive generation : earlier text, including the model’s own output, becomes input for subsequent predictions. Hugging Face’s generation documentation describes the corresponding operations in software. You can understand the loop without running its code. The text available for a request is its context . It can contain instructions, the visitor’s message, earlier conversation and documents supplied by the application. A prompt is input supplied to guide the model. The context window places a limit on the tokens the model and serving configuration can handle together. A long conversation or document may need to be shortened or selectively included. 3. Where the probabilities come from The model contains a neural network : layers of numerical operations whose adjustable values are called parameters , often collectively called weights . Token numbers are mapped to lists of numbers called representations. Layers transform and combine these representations; the final computation produces scores from which token probabilities can be obtained. The weights determine how these transformations behave. Hugging Face’s transformer introduction connects architecture, attention and checkpoints. A useful distinction is between the arrangement of the operations—the model’s architecture —and the values learned during training. Two models can share an architecture and have different weights, leading to different answers. A label such as “7B” refers to approximately seven billion parameters. It does not count documents, words or facts. Many language models use a transformer architecture, introduced by Vaswani and colleagues in 2017 . Its attention mechanism combines information from token positions when forming representations. In “The library beside the shops closes early”, a useful representation of “closes” needs information about what is closing. Attention supplies a way to connect positions; repeated layers can build more complex relationships. This sentence illustrates the purpose, not a measured attention pattern in a particular model. A network has no single dial labelled “Sunday opening hours”. Its learned behaviour is distributed across numerical operations. Inspecting weights alone therefore does not give a readable explanation of every answer. The architecture tells us how computation is arranged; experiments help us investigate what the trained system does. 4. Learning from examples Before Alder can use a model, someone must train it. Training starts with data and an objective: a numerical criterion the training procedure tries to improve. A dataset is a collection of examples selected for that work. For next-token training, text provides its own targets: the next token in an example is the token the model is asked to predict. Consider our invented sentence again. During training, the procedure can present “The library closes at” and compare the model’s prediction with the actual next token in that example, “five”. A loss measures how poorly the prediction fits the target. An optimisation procedure calculates adjustments to weights intended to reduce loss across training examples. Training repeats this process over batches of data. Dive into Deep Learning’s explanation of loss and parameter updates develops the idea using a simpler numerical model. In the fictional probability table, the target “five” already has some probability. Training can still favour an adjustment that increases it. That does not install a permanent rule that every library closes at five. Other examples push the model towards other patterns; learning is shaped by their mixture and by the training procedure. Training and use happen on different loops. Both run model computations; only the training loop shown here updates weights. Training Examples → predictions → loss → weight updates → repeat. Save the resulting weights as a checkpoint. Ordinary inference Load a checkpoint → supply context → generate tokens → return an answer. The loaded weights stay fixed. Broad initial training is called pretraining . It can develop patterns useful across many tasks because its data contains many kinds of language: descriptions, dialogue, explanations and code, for example. Selecting and preparing that data involves human decisions about sources, quality, duplication and permissions. A model’s abilities and weaknesses partly reflect those choices. A checkpoint is saved model state. A checkpoint from broad training is often called a base model . Saving checkpoints at intervals also lets researchers compare behaviour at different stages. A release might include only the final checkpoint or a larger record of development. Learning patterns does not rule out memorisation. Carlini and colleagues demonstrated extraction of training passages from GPT-2 . That is a reason to take training-data disclosure seriously. It does not make every generated answer a retrieved quotation, or make weights a convenient substitute for the original dataset. 5. Becoming an assistant A base model’s ability to continue text does not by itself establish how it will behave in a conversation. Consider a prompt asking, “Explain how to renew a book.” One possible continuation is another question from an imagined list. A useful assistant should instead explain the renewal process. These are different patterns of continuation, even though both are language. Post-training is further training after a base checkpoint. In supervised fine-tuning , examples pair prompts with desired responses. For Alder, an illustrative example could pair a renewal question with a short explanation and a link to the renewal page. Training on such examples changes weights to favour the demonstrated behaviour. Merely inserting the same example into a prompt supplies context for that request. Feedback can provide another training signal. People might compare two answers and prefer the one that is clear and accurate. An automatic checker might reward a correct arithmetic result. Training methods use these signals in different ways. Reinforcement learning adjusts behaviour using rewards; it is one family of methods that can appear in post-training. In the 2022 InstructGPT study , Ouyang and colleagues used demonstrations, then rankings of answers and reinforcement learning from human feedback. The study gives a concrete historical example of the process. Its authors also reported remaining mistakes. Human preference and automated rewards each measure a chosen criterion; neither automatically supplies every quality an assistant needs. Optional: why training reports describe different recipes Supervised fine-tuning is often abbreviated SFT, and reinforcement learning from human feedback as RLHF. Direct Preference Optimization (DPO) provides another route for learning from preferences, avoiding the conventional separate reward-model/RL pipeline. Read a report for its actual examples, objectives and updates. Pretraining, post-training and inference are useful stage distinctions; a separate RL stage is not compulsory. 6. Giving Alder information it can use now Running the trained model to produce an output is inference . Suppose the library starts opening on Sundays after the model was trained. The team can supply: “Library notice: Sunday opening hours are 12–4; returns are accepted at the desk while the library is open. Answer using this notice.” The model now has relevant information in its context. No weight update is needed to make that information available for this answer. A supported answer, in our fictional example Visitor: Can I return a book on Sunday? Alder: Yes. The library notice says you can return it at the desk during Sunday opening hours, 12–4. The answer connects the question to the supplied notice. The team can check both the hours and the return arrangement against that text. For one notice, someone can paste the text into the prompt. For a collection of documents, the application can search for relevant passages and include them automatically. This is retrieval-augmented generation , commonly shortened to RAG . The retriever selects material; the generator uses the supplied material to compose an answer. Lewis and colleagues’ RAG paper investigated combining retrieval with a trained generator. Our library workflow illustrates the general arrangement rather than reproducing that experiment. This makes an important kind of updating straightforward: replace an outdated notice in the searchable collection, and future requests can retrieve the new version. There are still two opportunities for failure. The search may find the wrong passage; the generator may misread or embellish the right one. Showing the source lets a visitor or reviewer check the answer. Three interventions in Alder Intervention What changes? Example purpose Prompting Text supplied for a request Ask for a two-sentence answer Retrieval Which external passages the application supplies Find the latest opening-hours notice Fine-tuning Learned model parameters, possibly through added trainable components Learn a response style from many examples These can be combined. The team might fine-tune for a consistent style while retrieving changing facts. Whether fine-tuning is worth the effort depends on tests against a simpler prompting approach. A successful example in a chapter is the beginning of an evaluation, not a deployment result. Conversation history works through the application too. It can save earlier messages and supply them again, or keep a summary. The model then appears to remember the visitor. Persistent storage, the current context and model weights are three different places information can reside. Hugging Face’s chat-template guide shows how messages are converted into the model’s token sequence. A service may separately use saved conversations for later training; that is a product and data-governance choice, not an automatic consequence of generating the next reply. 7. Looking something up and taking action A visitor asks whether a particular book is available. Yesterday’s catalogue extract may be too old. The application can give the model a tool : a defined operation it can request, such as searching the current catalogue. An illustrative sequence is: the model requests a title search; application software checks and runs the request; the catalogue returns availability; the model receives that result and writes an answer. The software must decide which tools exist and what they are allowed to do. Reading availability and reserving a book are different permissions. A fluent sentence saying “I reserved it” does not itself create a reservation. The surrounding application must perform the operation and handle its result. A system that repeatedly uses a model to choose actions, inspect results and continue a task is often called an agent . Its tool setup and control software are sometimes called a harness . Adding a better catalogue tool can improve the system without changing its model. Likewise, allowing more attempts or generated intermediate reasoning can change performance and cost. Chapter 6 will ask how to make fair comparisons between such systems. 8. Useful answers need evidence and resources Imagine Alder answers, “You can return books through the Sunday drop box,” although the supplied notice mentions only returns at the desk while the building is open. The answer sounds useful, but it adds an unsupported facility. Such invented or unsupported content is commonly called a hallucination . The generation process favours continuations; it does not independently verify every statement against the world. The team needs an evaluation : a planned test of behaviour. It could set aside questions with checked answers, including ambiguous questions and questions the available documents cannot answer. Those held-out questions should remain separate from examples used to tune the system. A benchmark is a task collection with a scoring method; the library’s own test should reflect its visitors and the consequences of mistakes. Operating Alder also requires computation. Hardware must hold the model’s weights and working data and perform the operations for each request. A GPU is a processor suited to many numerical operations in parallel. Some models can run on ordinary computers; others require substantially more memory and specialised hardware. Downloadable files do not remove those requirements. Training incurs the work of making predictions and calculating updates over data. Serving incurs repeated inference work for users. Longer contexts and outputs, the number of simultaneous requests, hardware and software all affect resource use. The library must budget for staff, maintenance and review as well as computation. A free model download is only one part of that decision. Optional: model size and hardware Storing weights at lower numerical precision can reduce memory requirements; this is one use of quantisation . A mixture-of-experts model selects subsets of its network for a token, so total parameters and active parameters describe different things. Neither number alone gives the complete serving cost. Chinchilla’s scaling study examined allocation of model size and training data under compute budgets; such relationships do not by themselves predict a product’s price or a competitor’s catch-up date. 9. What the library needs to receive To run a released model, the team needs compatible weights, a tokenizer, configuration describing how to load the model, and inference software. These are artefacts : concrete outputs of development that someone can preserve or share. A model card is documentation describing a model, its intended uses, training or evaluation information, and limitations. To adapt the model, the team also needs appropriate training tools, examples and resources. To investigate how it was developed, researchers may need training code, information about the original data and intermediate checkpoints. Running an answer and reconstructing the development of the model are different projects. The next chapter opens a release package and shows how to inspect these materials. Training examples can themselves be produced by models. That is one form of synthetic data . When one model supplies predictions or feedback used to train another, we can describe a teacher–student information flow called distillation . Chapter 7 examines it in detail. For now, locate the generated material on the training side of the diagram when it is used to update the student. Make Alder more useful Begin with three sentences tracing one answer: how the request becomes tokens, how a next token is selected, and how generation continues. State whether ordinary inference changes the trained weights. The library has three new requirements: publish changed Sunday hours, make answers consistently brief, and check live book availability. Write a short proposal for each. Identify what you would change, whether weights change, and one way to check that the intervention worked. You can propose more than one approach if you explain when each is useful. Then annotate your proposal with the materials the team needs. It already has the model’s weights and tokenizer. What additional software, information or documentation is needed for your proposed work? Add one item a researcher would need to investigate the model’s original development. Compare your proposal with a worked response Trace the answer first The tokenizer converts the supplied text into token numbers. The model calculates next-token probabilities; the generation procedure selects a token and adds it to the sequence before the next prediction. Ordinary inference uses the loaded weights without updating them. Hours: supply current information Update the notice in the retrieval collection and test that Sunday questions retrieve it and receive a supported answer. For a tiny pilot, putting the notice directly in the prompt is also reasonable. Neither intervention requires changing weights. The team needs the notice, permission to use it and software to supply it. Style: compare a simple approach with training First try a prompt requesting brief answers and test whether important details survive. Fine-tuning on examples is another option if prompting is inadequate across representative questions. Fine-tuning changes learned parameters and requires training tools and examples; prompting changes request context. A shorter answer is not automatically a better answer. Availability: connect a current source Add a read-only catalogue tool and check the returned record against Alder’s answer. The team needs an interface to the catalogue and software that runs permitted requests. Updating model weights is unnecessary for each inventory change. A reservation feature would require additional permissions and confirmation of the actual operation. Research: ask a different question To investigate when a behaviour emerged, request intermediate checkpoints and their training context. To investigate data choices, request data documentation and processing code. Explain what each item lets you examine. Naming a file without a purpose leaves the proposal incomplete. Carry forward: explain Alder as a system with a trained model inside it. In Chapter 1 , the question becomes who can obtain its components, who may change them and who operates the resulting service.",
    "quizId": "primer-v3"
  },
  {
    "id": "openness",
    "quizId": "openness-v3",
    "num": "1",
    "part": "Primer",
    "file": "chapters/01-what-open-means.html",
    "title": "What 'Open' Means",
    "minutes": 18,
    "blurb": "Follow requests across deployment options, inspect a release package, and use its documents to assess access, permissions and practical fit.",
    "keywords": "The library has a working plan for Alder. Now it must decide what to obtain: a subscription to an assistant, access to a model service, or model files it can operate itself. Each could put an answer in front of a visitor. Each gives the library a different relationship with the people who built and run the system. That relationship is at the heart of the word open . To understand it, we will follow a request across the computers involved, open a model release package, and ask what its documents allow the library to do. The library, Alder, Cedar and Rowan are fictional teaching cases. A separate OLMo walkthrough uses a real, dated release. What you will be able to explain How a model release differs from a hosted application or model service. What a release’s materials and terms support, including the distinction between open weights and open-source AI. Which release and deployment arrangement fits a purpose, and what still needs checking. Before you start. From Chapter 0 , explain the difference between weights, inference software and training data. Then ask: if you can send a question to a model, does that mean you have received any of those materials? This chapter will make the answer concrete. 1. Three routes to an answer The easiest route to picture is a hosted application . The library opens a provider’s website and uses its chat interface. “Hosted” means someone operates the software on computers that users access over a network. The provider assembles the model, tools and interface into a service. The library may configure some features, but the provider manages the underlying operation. A second route is a model API , short for application programming interface. Think of it as a defined way for software to send a request and receive a result. Instead of a staff member typing into the provider’s chat box, the library’s application sends a message to the provider’s model service. It receives generated text and displays it in the library’s own interface. This lets the library build its own experience around a remotely operated model. For example, its software can find a relevant opening-hours notice and send that passage with the question. The API is the communication boundary; it does not imply that the provider has supplied the weights. API access can also include other operations, so inspect what a particular service offers. The third route is to obtain downloadable weights and operate the model. The library or a contractor loads the files using compatible inference software. The computers might be in the library, or they might be rented from a cloud company. “Running our own model” therefore needs a more precise description of who controls the software and infrastructure. Follow the request. Arrows show where the visitor’s question travels in three fictional arrangements. The answer returns along the corresponding route. Hosted application Visitor → provider’s application → provider-operated model. The provider manages the interface and model service. Model API Visitor → library’s application → provider’s API → provider-operated model. The library manages its application; the provider runs the model. Library-operated weights Visitor → library’s application → model running on library-controlled infrastructure. The library takes responsibility for the model service as well as the application. These routes can involve the same underlying model. A developer may publish weights and sell an API; another company may host those weights too. The model developer trains or adapts the model. The hosting provider runs it for requests. The application developer builds the visitor’s experience. One organisation can play all three roles, but it need not. This separation helps explain why sharing weights can create opportunities for other businesses. For Alder, the practical question is who will receive visitors’ questions and who can change the service. A local interface that calls an external API still sends information to that provider. Downloaded weights operated entirely inside a controlled environment can avoid that particular transfer, but the team must also examine logs, tools, backups and other network connections. Privacy depends on the complete arrangement. 2. What open source means in software Ordinary software starts as source code : instructions written in a programming language. Software tools interpret those instructions or translate them into a form a computer can execute. When you use a service, you may receive its results without receiving the source code used to produce them. Imagine the library has a small program that calculates return dates. If it receives the source and appropriate permissions, its developers can read the rules, change the loan period, fix a mistake and share their modified version. Someone else could maintain the program if the original developer stopped. They would still need the skill and resources to do that work. A licence states permissions and conditions for using or sharing the covered material. The Open Source Initiative’s software definition requires more than visible code: it includes access to source, redistribution and modification rights, and prohibits restrictions on fields of endeavour. For the library, the significance is being able to carry out useful work with the software under its licence. Price is another question. A download can cost nothing while its terms restrict modification or commercial use. Conversely, a business can charge for support or hosting around open-source software. A public repository is a place to find files; the applicable terms determine which permissions accompany them. A repository stores files and their change history. GitHub hosts repositories for software and documentation; model hubs also host model files and cards. A release identifies a package or version made available to others. A permanent revision identifier is useful when the files may change: it tells a later reader exactly what you inspected. 3. Why model releases contain several kinds of material A language model adds learned state to the software picture. Training code describes how a learning procedure runs. Weights contain the numerical values produced by training. Training data supplied the examples. Inference software uses the trained model to process new inputs. Receiving one of these does not reconstruct the others. Return to the loan-date program. Reading its source could reveal the explicit rule for calculating a due date. Reading a model’s inference code reveals operations for generating text, but not a neat collection of every rule its training established. If a researcher wants to understand why a model gives poor answers about certain libraries, data choices and training history may matter as well. Here is a fictional release folder. You do not need to open a terminal or understand the code inside it. Read it as a map of the things a model developer might share. Cedar release folder. Names and contents are invented. The indented licence files explicitly state which materials they cover. Cedar-7B/ README.md model.safetensors tokenizer.json config.json inference/ evaluations.md licenses/ weights-MIT.txt inference-MIT.txt What you would learn by inspecting each item Item What it contains or explains Why the library cares README / model card Identity, intended use, instructions and limitations Understand what was released and what its authors tested Weights Learned numerical parameters Load the trained model for inference or adaptation Tokenizer Text-to-token conversion information Prepare input the way this model expects Configuration Settings describing the model structure Load weights into the compatible architecture Inference software Code that runs the model Operate the service Evaluation record Tasks, conditions and reported results Assess which results are relevant and what to test next Licence files Permissions and conditions for named components Check the planned use, modification and sharing Additional materials support different work. Training code and its settings describe the learning procedure. Data documentation explains sources, selection and processing. Intermediate checkpoints let researchers inspect earlier stages. A release with final weights may serve the library’s operational purpose while supplying too little to reconstruct the original training. Documentation is also part of usability. A weights file without loading instructions can leave an inexperienced team stranded. A model card is a useful starting point, but its claims still need to be read alongside the files, licences and evaluation method it references. 4. Read Cedar’s documents with a purpose Suppose the library wants to test Alder on public opening-hours questions using its own equipment. Its engineer finds the folder above and these authored excerpts: Cedar: fictional document excerpts README — release contents “Cedar-7B provides final model weights, tokenizer, configuration and inference code. This release does not include training code or information about the training datasets.” Licence scope note “The weights and inference software are each supplied under the MIT licence in their respective files.” Evaluation note “The evaluation record describes a general question-answering test. Library opening-hours accuracy has not been evaluated.” Start with access : the library can download materials and attempt to operate them. Next, list the artefacts : final weights and runtime materials are present; training materials are expressly excluded. These are observations about this fictional package, not assumptions about every downloadable model. Then read permissions . The MIT licence grants broad use, modification and distribution permissions subject to its conditions, including retaining the required notice. Cedar’s scope note explicitly applies it to both weights and inference code. A licence attached only to a demonstration script would not establish the terms for the weights. Finally, ask about practical fit . The package gives the library a route to local testing, but an engineer must establish compatible hardware and software. The evaluation note supplies no answer to the actual opening-hours task. The next step is a small test using the library’s documents and checked questions. A useful conclusion is: “Cedar supplies downloadable weights and runtime materials under stated component licences. We can investigate a local pilot. We still need hardware checks and task evaluation; the release does not provide the training record needed to investigate its development.” Every part of that conclusion does work for the decision. 5. Try the same reading on a real release Historical case reviewed 16 September 2026. This walkthrough concerns the original OLMo-7B repository at revision 0f605aa . The linked snapshot fixes the documents for this reading exercise. Open the OLMo-7B model card and its Files view . The card presents the project as a resource for language-model research. Read three places: Model Details: the card identifies a base model and explains named checkpoint revisions. That helps you distinguish a final download from saved stages of training. Data: it links to Dolma documentation. Follow that link when investigating training inputs; the weights file is not the dataset. Files: locate config.json , tokenizer.json , weight files and the README. These have the runtime and documentation roles described above. The card notes that some checkpoint revisions were lost. Availability claims therefore need their stated limits. You have enough here to see how a real release can expose a development record. A complete reuse assessment would also inspect the linked code, data terms and the particular checkpoint. Chapter 4 returns to OLMo’s historical contribution. 6. Put the labels on firmer ground We can now distinguish several ideas that the word “open” often carries. In this book, open weights means that trained parameters are available to download. The term tells you something about access. You still need to inspect the permission to use those weights and the materials needed for your purpose. The OSI Open Source AI Definition 1.0 sets a more extensive standard: freedoms to use, study, modify and share, together with the preferred materials for making modifications. Its machine-learning requirements cover data information, code and parameters under specified terms. A permissive licence on a weights file alone does not establish that the package meets the definition. Notice the phrase data information . The definition calls for detailed information about training data, including sources and processing, and distinguishes categories of data availability. It should not be reduced to a demand that every raw training item be freely redistributed. Equally, a vague statement that a model used “public data” is not the detailed account the definition describes. Cedar is an open-weights release under this book’s terminology. Its expressly absent training code and data information prevent the described package from satisfying those requirements. That does not stop us from asking whether it is useful for the library’s pilot. Classification and fitness for a particular purpose answer different questions. Research transparency asks which investigations a release enables. Pythia , for example, provides intermediate checkpoints and information for reconstructing data order, supporting study of changes during training. This book sometimes uses “fully open” as shorthand for a broadly documented research release. Whenever you see that phrase, unpack the actual materials and permissions rather than treating it as a certification. Optional: compare component licences Apache 2.0 includes copyright and patent provisions and conditions for redistribution. The Llama 3.1 Community License has release-specific terms, including an additional condition in section 2 for specified very large organisations. Read the actual version and scope rather than substituting a familiar licence name. A model’s licence also does not settle every question about third-party data used with it. 7. Why people want different kinds of openness Consider three people looking at Cedar. The library’s engineer wants a stable service and freedom to change the application. A researcher wants to discover how training data affected a behaviour. A community maintainer wants to distribute an improved version to other libraries. All value access, but each needs a different combination of materials, permissions and support. For the engineer, downloadable weights can create the option to operate a chosen version and switch hosting arrangements. That option carries work: installing software, allocating memory, monitoring errors and maintaining security. If the team lacks that capacity, managed hosting may be more practical. Model availability and operational independence are related, but independence must be built. For the researcher, training documentation and intermediate checkpoints can make questions answerable that a chat interface cannot. Yet publishing an experiment’s materials does not make rerunning it affordable. Compute, missing details and software compatibility still affect reproducibility. Ask which investigation is enabled and what it would require. For the maintainer, redistribution terms determine whether improvements can travel. Good documentation and a place to report defects help other people contribute. An available file can remain difficult to maintain if nobody understands its surrounding tools. The continuing work of a community is part of how access becomes useful. These interests explain why openness debates involve both technical descriptions and values. People disagree about which freedoms matter most, who should control deployment, and which burdens sharing should impose. A fair account makes those priorities visible before comparing conclusions. Later chapters examine the commercial, scientific and safety arguments in their authors’ own terms. Optional: Solaiman’s framework for release arrangements Irene Solaiman’s 2023 release-gradient paper describes arrangements ranging from closed systems through limited or hosted access to broader releases. It helps name changes in access and control. A developer can offer both an API and downloads, so record both. The categories are not a single scale of quality, safety or licence compliance. Choose a route for the library The library wants a pilot answering questions from public notices. It must retain a copy of any weights it adapts and be permitted to distribute that adaptation to partner libraries. It has an engineer, but hardware suitability and answer quality have not yet been tested. No visitor records are included in this exercise. You have Cedar’s excerpts above and a second fictional package: Rowan: fictional document excerpts README — access “Download Rowan’s weights, runtime files and training code, or use our hosted API. Our release is fully open. A data README is linked separately.” Weights terms “Use and modification are permitted only for noncommercial research. Redistribution of original or modified weights is prohibited.” API terms summary “API access supplies generated outputs. It does not grant a right to obtain or redistribute weights.” Your inspection note The linked data README has not yet been opened. Its contents are unknown. Write a recommendation with four parts: the deployment route, the materials and terms that support it, the most important unresolved practical question, and an observation that would change your next step. Cite a specific excerpt. Explain whether Rowan’s extra training code changes your conclusion about sharing an adaptation. Compare two defensible next steps Option A: investigate Cedar locally Cedar is the candidate whose stated component terms support the intended adaptation and redistribution, subject to the licence conditions. Start with a hardware check and a held-out test of public-notice questions. The remaining risks concern practical suitability and answer quality, as well as checking the complete package. If the hardware is unsuitable or important answers fail, pause the pilot and revise the plan. Option B: defer the operational pilot A cautious team can first prepare checked questions and establish the resources needed to run Cedar. The engineer’s availability alone does not demonstrate operational readiness. Deferral is a concrete recommendation if it names those tasks and a condition for proceeding. It should not claim that the information already available proves Cedar unusable. What both answers must get right Rowan’s prohibition on redistribution conflicts with the stated sharing requirement. More training code does not remove that restriction. Its API supplies another access route, not a new grant to share weights. Its unopened data README is unknown, not absent. Neither recommendation should claim that Cedar is OSI-compliant or that either model has passed a library evaluation. Review your reasoning: did you name who operates the model, cite the relevant permissions, distinguish missing evidence from known restrictions, and propose a feasible next check? A different conclusion needs equally specific support. Carry a description into the rest of the book You can now replace a vague label with a useful account: who offers access, which model and materials are supplied, which activities are permitted, and what the user must operate or investigate. That account will help you read release announcements without depending on their choice of adjective. The library’s opportunity also raises an economic question. If Cedar’s developer has paid to train a model and lets others distribute it, where might the return come from? Hosting, support, complementary products and scientific collaboration suggest different answers. Chapter 2 examines why organisations choose to release models and how to assess the explanations they offer."
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
    "A unit mapped to a number by a tokenizer, such as a word, word fragment or punctuation. Counts depend on the tokenizer and text."
  ],
  "transformer": [
    "Transformer",
    "A neural-network architecture built around attention. Different models alter its components; the architecture name does not specify the training recipe."
  ],
  "attention": [
    "Attention",
    "A mechanism for combining information from token positions when forming representations. It is part of transformer architectures."
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
    "Running a trained model to produce outputs. In ordinary inference its weights stay fixed while request context and generated tokens change."
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
    "A task collection with a scoring method. Results depend on the model, prompts, tools, attempts and evaluation conditions."
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
    "Application programming interface: a defined way for software to send requests and receive results. A model API can provide access to a remotely operated model without supplying its weights."
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
  ],
  "architecture": [
    "Architecture",
    "The arrangement of a model’s layers and numerical operations. Models can share an architecture while having different learned weights."
  ],
  "artefact": [
    "Artefact",
    "A concrete output of development that can be preserved or shared, such as weights, code, a tokenizer or documentation."
  ],
  "context": [
    "Context",
    "The input and generated tokens available to a model during a request. An application may supply instructions, documents and earlier messages as context."
  ],
  "dataset": [
    "Dataset",
    "A collection of examples selected for training or evaluation. Its sources, selection, processing and permissions affect how it can be used."
  ],
  "fine-tuning": [
    "Fine-tuning",
    "Further training from an existing checkpoint to adapt model behaviour. It changes learned parameters, sometimes through additional trainable components."
  ],
  "gpu": [
    "GPU",
    "A processor suited to performing many numerical operations in parallel. Available memory and the workload affect which models can run on it."
  ],
  "hallucination": [
    "Hallucination",
    "Generated content that is invented or unsupported in the relevant context, even when expressed fluently. Checking against reliable evidence is a separate task."
  ],
  "harness": [
    "Harness",
    "The surrounding software, tools and control logic used to run or evaluate a model-based system. Different harnesses can change results with the same model."
  ],
  "hosting": [
    "Hosting",
    "Operating software on computers that users access over a network. A model developer and the provider hosting its model may be different organisations."
  ],
  "licence": [
    "Licence",
    "Permissions and conditions governing the covered material. Check which component and version it applies to."
  ],
  "loss": [
    "Loss",
    "A numerical measure of how poorly a model’s predictions fit a training objective. Optimisation uses it to calculate parameter updates."
  ],
  "model-card": [
    "Model card",
    "Documentation describing a model, its intended uses, training or evaluation information, and limitations. Inspect referenced evidence as well as the card’s claims."
  ],
  "neural-network": [
    "Neural network",
    "Layers of numerical operations with adjustable parameters. Training changes those parameters to improve performance under an objective."
  ],
  "prompt": [
    "Prompt",
    "Input supplied to guide a model, such as an instruction, question or example. Adding it to context does not itself update weights."
  ],
  "rag": [
    "Retrieval-augmented generation (RAG)",
    "An arrangement that retrieves relevant external material and supplies it to a model for generating an answer. Retrieval and generation can each introduce errors."
  ],
  "repository": [
    "Repository",
    "A collection of files with a history of changes. A release or revision identifies which version someone inspected or used."
  ],
  "sampling": [
    "Sampling",
    "Choosing an output token randomly according to a probability distribution, possibly modified by generation settings."
  ],
  "source-code": [
    "Source code",
    "Instructions written in a programming language, which tools interpret or translate for execution. Access to a service does not necessarily include its source."
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

// Authored teaching examples, never reported model measurements.
OMT.teachingExamples = [
  {
    "id": "next-token",
    "kind": "fictional",
    "context": "The library closes at",
    "unit": "percent probability",
    "provenance": "Authored teaching distribution and tokenizer. No measurements from a real model.",
    "reviewed_on": "2026-09-16",
    "rows": [
      {
        "label": "five",
        "value": 50
      },
      {
        "label": "six",
        "value": 30
      },
      {
        "label": "noon",
        "value": 15
      },
      {
        "label": "All other tokens combined",
        "value": 5
      }
    ]
  }
];
