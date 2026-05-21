/* ===== REDESIGN.JS — Shahriar Noroozizadeh ===== */
'use strict';

// ============================================================
// DATA
// ============================================================

const PUBS_DATA = [
  {
    id: 'surv-hte',
    title: 'SurvHTE-Bench: A Benchmark for Heterogeneous Treatment Effect Estimation in Survival Analysis',
    badge: 'ICLR', badgeClass: 'badge-iclr', year: 2026,
    venue: 'ICLR 2026',
    authors: 'S. Noroozizadeh*, X. Shen*, J. Weiss, G. Chen',
    image: 'images/SurvHTE-Bench.png',
    abstract: 'Estimating heterogeneous treatment effects (HTEs) from right-censored survival data is critical in high-stakes applications such as precision medicine and individualized policy-making. Yet, the survival analysis setting poses unique challenges for HTE estimation due to censoring, unobserved counterfactuals, and complex identification assumptions. Despite recent advances, from causal survival forests to survival meta-learners and outcome imputation approaches, evaluation practices remain fragmented and inconsistent. We introduce SurvHTE‐Bench, the first comprehensive benchmark for HTE estimation with censored outcomes. The benchmark spans (i) a modular suite of synthetic datasets with known ground truth, systematically varying causal assumptions and survival dynamics, (ii) semi-synthetic datasets that pair real-world covariates with simulated treatments and outcomes, and (iii) real-world datasets from a twin study (with known ground truth) and from an HIV clinical trial.',
    links: { openreview: 'https://openreview.net/pdf?id=qG6O3jMkCj', code: 'https://github.com/Shahriarnz14/SurvHTE-Benchmark' },
    categories: ['Causal & Survival Analysis', 'ML for Healthcare']
  },
  {
    id: 'tts-forecast',
    title: 'Forecasting Clinical Risk from Textual Time Series: Structuring Narratives for Temporal AI in Healthcare',
    badge: 'AAAI', badgeClass: 'badge-aaai', year: 2026,
    venue: 'AAAI 2026 (AI for Social Impact)',
    authors: 'S. Noroozizadeh*, S. Kumar*, J. Weiss',
    image: 'images/TTS-Forecasts.png',
    abstract: 'Clinical case reports encode rich, temporal patient trajectories that are often underexploited by traditional machine learning methods relying on structured data. In this work, we introduce the forecasting problem from textual time series, where timestamped clinical findings — extracted via an LLM-assisted annotation pipeline — serve as the primary input for prediction. We systematically evaluate a diverse suite of models, including fine-tuned decoder-based large language models and encoder-based transformers, on tasks of event occurrence prediction, temporal ordering, and survival analysis.',
    links: { arxiv: 'https://arxiv.org/abs/2504.10340', code: 'https://github.com/Shahriarnz14/Textual-Time-Series-Forecasting' },
    categories: ['ML for Healthcare', 'Sequence Models & Memory']
  },
  {
    id: 'transformer-geometry',
    title: 'Deep sequence models tend to memorize geometrically; it is unclear why.',
    badge: 'Workshop', badgeClass: 'badge-workshop', year: 2025,
    venue: 'NeurIPS-FoRLM Workshop 2025',
    authors: 'S. Noroozizadeh, V. Nagarajan, E. Rosenfeld, S. Kumar',
    image: 'images/Overview_Geometric_Models_Path_Star.jpeg',
    abstract: 'Deep sequence models are said to store atomic facts predominantly in the form of associative memory: a brute-force lookup of co-occurring entities. We identify a dramatically different form of storage of atomic facts that we term as geometric memory. Here, the model has synthesized embeddings encoding novel global relationships between all entities, including ones that do not co-occur in training. Such storage is powerful: for instance, we show how it transforms a hard reasoning task involving an ℓ-fold composition into an easy-to-learn 1-step navigation task. By analyzing a connection to Node2Vec, we demonstrate how the geometry stems from a spectral bias that arises naturally despite the lack of various pressures.',
    links: { arxiv: 'https://arxiv.org/abs/2510.26745' },
    categories: ['Sequence Models & Memory', 'Representation Learning']
  },
  {
    id: 'pmoa-tts',
    title: 'PubMed Open Access Textual Time Series Corpus: Reconstructing patient trajectories from clinical case reports using LLMs',
    badge: 'Preprint', badgeClass: 'badge-preprint', year: 2026,
    venue: 'ArXiv 2026',
    authors: 'S. Noroozizadeh*, S. Kumar*, G. Chen, J. Weiss',
    image: 'images/Textual-Time-Series.png',
    abstract: 'Understanding temporal dynamics in clinical narratives is essential for modeling patient trajectories, yet large-scale temporally annotated resources remain limited. We present PMOA-TTS, the first openly available dataset of 124,699 PubMed Open Access case reports, each converted into structured (event, time) timelines via a scalable LLM-based pipeline. Our approach combines heuristic filtering with Llama 3.3 to identify single-patient case reports, resulting in over 5.6 million timestamped clinical events. In a downstream survival prediction task, embeddings from extracted timelines achieve time-dependent concordance indices up to 0.82 ± 0.01.',
    links: { arxiv: 'https://arxiv.org/abs/2505.20323', code: 'https://github.com/jcweiss2/pmoa_tts', data: 'https://huggingface.co/datasets/snoroozi/pmoa-tts' },
    categories: ['ML for Healthcare', 'Sequence Models & Memory']
  },
  {
    id: 'causal-survival',
    title: 'The Impact of Medication Non-adherence on Adverse Outcomes: Evidence from Schizophrenia Patients via Survival Analysis',
    badge: 'CHIL', badgeClass: 'badge-chil', year: 2025,
    venue: 'CHIL 2025',
    authors: 'S. Noroozizadeh, P. Welle, J. Weiss, G. Chen',
    image: 'images/Causal-Survival-Analysis-CHIL.png',
    abstract: 'This study quantifies the association between non-adherence to antipsychotic medications and adverse outcomes in individuals with schizophrenia. We frame the problem using survival analysis, focusing on the time to the earliest of several adverse events. We extend standard causal inference methods (T-learner, S-learner, nearest neighbor matching) to utilize various survival models to estimate individual and average treatment effects. Using data from Allegheny County, we find strong evidence that non-adherence advances adverse outcomes by approximately 1 to 4 months.',
    links: { pdf: 'https://proceedings.mlr.press/v287/noroozizadeh25a.html', code: 'https://github.com/Shahriarnz14/causal-meta-learner-survival-analysis' },
    categories: ['Causal & Survival Analysis', 'ML for Healthcare']
  },
  {
    id: 'mrna-lm',
    title: 'mRNA-LM: full-length integrated SLM for mRNA analysis',
    badge: 'NAR', badgeClass: 'badge-nar', year: 2025,
    venue: 'Nucleic Acids Research 2025',
    authors: 'S. Li, S. Noroozizadeh, S. Moayedpour, et al., Z. Bar-Joseph, S. Jager',
    image: 'images/mRNA-LM.png',
    abstract: 'The success of SARS-CoV-2 mRNA vaccine has led to increased interest in the design and use of mRNA for vaccines and therapeutics. We developed mRNA-LM, an integrated small language model for modeling the entire mRNA sequence. mRNA-LM uses a contrastive language–image pretraining integration technology to combine three separate language models for the different mRNA segments. We trained mRNA-LM on millions of diverse mRNA sequences from several different species, achieving state-of-the-art performance on various mRNA prediction tasks.',
    links: { pdf: 'https://academic.oup.com/nar/article/53/3/gkaf044/7997216', code: 'https://github.com/Sanofi-Public/mRNA-LM', patent: 'https://patents.google.com/patent/WO2025026948A1' },
    categories: ['Sequence Models & Memory', 'Neuro / Biomedical AI']
  },
  {
    id: 'tldr',
    title: 'T5-generated clinical-Language summaries for DeBERTa Report Analysis (TLDR)',
    badge: 'SemEval', badgeClass: 'badge-semeval', year: 2024,
    venue: 'SemEval-2024 at NAACL',
    authors: 'S. Das*, V. Samuel*, S. Noroozizadeh*',
    image: 'images/TLDR-Model.jpg',
    abstract: 'This paper introduces novel methodologies for the Natural Language Inference for Clinical Trials (NLI4CT) task. We present TLDR (T5-generated clinical-Language summaries for DeBERTa Report Analysis) which incorporates T5-model generated premise summaries for improved entailment and contradiction analysis in clinical NLI tasks. This approach overcomes the challenges posed by small context windows and lengthy premises, leading to a substantial improvement in Macro F1 scores: a 0.184 increase over truncated premises.',
    links: { pdf: 'https://aclanthology.org/2024.semeval-1.79/', code: 'https://github.com/Shahriarnz14/TLDR-T5-generated-clinical-Language-for-DeBERTa-Report-Analysis' },
    categories: ['ML for Healthcare']
  },
  {
    id: 'tscl',
    title: 'Temporal-Supervised Contrastive Learning: Modeling Patient Risk Progression',
    badge: 'ML4H', badgeClass: 'badge-ml4h', year: 2023,
    venue: 'ML4H 2023 & AAAI-R2HCAI Workshop',
    authors: 'S. Noroozizadeh, J. Weiss, G. Chen',
    image: 'images/TSCL-MIMIC.jpg',
    abstract: 'We consider the problem of predicting how the likelihood of an outcome of interest for a patient changes over time as we observe more of the patient\'s data. We propose a supervised contrastive learning framework that learns an embedding representation for each time step of a patient time series. Our framework learns the embedding space to have properties: nearby points have similar predicted class probabilities, adjacent time steps map to nearby points, and time steps with very different raw feature vectors map to far apart regions. We demonstrate outperformance over SOTA baselines in predicting mortality of septic patients (MIMIC-III) and tracking progression of cognitive impairment (ADNI).',
    links: { pdf: 'https://proceedings.mlr.press/v225/noroozizadeh23a.html', code: 'https://github.com/Shahriarnz14/Temporal-Supervised-Contrastive-Learning' },
    categories: ['ML for Healthcare', 'Representation Learning']
  },
  {
    id: 'et-clip',
    title: 'Pre-trained CLIP Encoder for Embodied Instruction Following in ALFRED',
    badge: 'CVPR', badgeClass: 'badge-cvpr', year: 2022,
    venue: 'CVPR Embodied-AI Workshop 2022',
    authors: 'Y.W. Byon*, C. Jiao*, S. Noroozizadeh*, J. Sun*, R. Vitiello*',
    image: 'images/et-clip.jpg',
    abstract: 'We introduce a method employing pre-trained CLIP encoders to enhance model generalization in the ALFRED task. In contrast to previous literature where CLIP replaces the visual encoder, we suggest using CLIP as an additional module through an auxiliary object detection objective. We validate our method on the Episodic Transformer architecture and demonstrate that incorporating CLIP improves task performance on the unseen validation set.',
    links: { pdf: 'https://embodied-ai.org/papers/2022/20.pdf' },
    categories: ['Representation Learning']
  },
  {
    id: 'neuroinformatics',
    title: 'Automatic Brain Pathology Analysis for Traumatic Brain Injury',
    badge: 'Neuroinformatics', badgeClass: 'badge-neuroinformatics', year: 2019,
    venue: 'Neuroinformatics Journal 2019',
    authors: 'A.D. Kyriazis*, S. Noroozizadeh*, A. Refaee*, et al.',
    image: 'images/neuroinformatics.jpg',
    abstract: 'We present a fully automated end-to-end system capable of assessing microglial activation in white matter regions on whole slide images of Iba1 stained sections. Our approach jointly applies functional minimization methods and deep learning classification to identify Iba1-immunopositive microglia. Detected cells are automatically traced to preserve their complex branching structure, after which fractal analysis is applied to determine activation states. The system detects microglia with F1 = 0.70 and performs morphology classification with 70% accuracy at a 20-fold speed increase over a human pathologist.',
    links: { pdf: 'https://link.springer.com/article/10.1007/s12021-018-9405-x' },
    categories: ['Neuro / Biomedical AI', 'ML for Healthcare']
  }
];

const CATEGORIES = [
  { id: 'all',    label: 'All / Recent',               colorClass: 'book-c0' },
  { id: 'seq',    label: 'Sequence Models & Memory',   colorClass: 'book-c1' },
  { id: 'health', label: 'ML for Healthcare',          colorClass: 'book-c2' },
  { id: 'causal', label: 'Causal & Survival Analysis', colorClass: 'book-c3' },
  { id: 'neuro',  label: 'Neuro / Biomedical AI',      colorClass: 'book-c4' },
  { id: 'repr',   label: 'Representation Learning',    colorClass: 'book-c5' },
];

const CATEGORY_LABELS = {
  seq:    'Sequence Models & Memory',
  health: 'ML for Healthcare',
  causal: 'Causal & Survival Analysis',
  neuro:  'Neuro / Biomedical AI',
  repr:   'Representation Learning',
};

const PROJECTS_DATA = [
  {
    id: 'manyshot',
    title: 'Many-Shot In-Context Learning for Molecular Inverse Design',
    description: 'Semi-supervised LLM method for molecular inverse design and lead optimization.',
    image: 'images/ManyShotICL.jpg',
    tags: ['LLM', 'Drug Discovery'],
    links: { pdf: 'https://arxiv.org/abs/2407.19089' },
    detail: 'Large Language Models (LLMs) have demonstrated great performance in few-shot In-Context Learning (ICL) for a variety of generative and discriminative chemical design tasks. The newly expanded context windows of LLMs can further improve ICL capabilities for molecular inverse design and lead optimization. We developed a new semi-supervised learning method that overcomes the lack of experimental data available for many-shot ICL, involving iterative inclusion of LLM generated molecules with high predicted performance. We further integrated our method in a multi-modal LLM which allows for the interactive modification of generated molecular structures using text instructions.'
  },
  {
    id: 'bert-crf',
    title: '"BERT, do you still love me?" A painful perspective from CRF',
    description: 'Best Poster Award: graphical models on top of BERT for POS tagging and NER.',
    image: 'images/BERT_CRF.jpg',
    tags: ['NLP', 'Best Poster Award'],
    links: {},
    detail: '[Best Poster Award: Probabilistic Graphical Models] Developed and compiled a comprehensive study of using graphical models on top of BERT and RNN variants for evaluating the encoding capacity of these models in Part of Speech Tagging (POS) and Named Entity Recognition (NER) tasks. Provided evidence of performance boost with end-to-end training of a conditional random field (CRF) on top of a pretrained BERT.'
  },
  {
    id: 'pets-mbrl',
    title: 'Model-Based RL with Probabilistic Ensemble and Trajectory Sampling',
    description: 'PETS algorithm for robotic control in OpenAI Gym Pusher environment.',
    image: 'images/PETS_MBRL.jpg',
    tags: ['Reinforcement Learning', 'Robotics'],
    links: { code: 'https://github.com/Shahriarnz14/Model-Based-RL-with-Probabilistic-Ensemble-and-Trajectory-Sampling' },
    detail: 'Implemented the PETS algorithm as a model-based RL method to solve the Pusher environment of OpenAI-Gym for a robotic arm to push an object to reach a randomly positioned goal location. Uses: (i) probabilistic ensemble of neural networks outputting distributions over resulting states, (ii) hallucinated trajectory propagation through time across ensemble networks, (iii) planning with model predictive control (MPC) on top of Cross Entropy Method (CEM) for random shooting.'
  },
  {
    id: 's3vm',
    title: 'Semi-Supervised Support Vector Machine (S3VM)',
    description: 'Self-training SVM and quasi-Newton S3VM for image classification on MNIST and CIFAR10.',
    image: 'images/S3VM.jpg',
    tags: ['Semi-Supervised Learning', 'SVM'],
    links: { code: 'https://github.com/Shahriarnz14/Semi-Supervised-Support-Vector-Machine-S3VM' },
    detail: 'Developed a self-training scheme with SVM to improve classification accuracy when only a small subset of data is labeled. Additionally, implemented a quasi-Newton method Semisupervised SVM (S3VM). Applied these two techniques for image classification of MNIST and CIFAR10. Showed significant improvement in classification accuracy in the range where only 30–50% of data is labeled, compared to conventional SVM.'
  },
  {
    id: 'tfus',
    title: 'Transcranial Focused Ultrasound Stimulation (tFUS)',
    description: 'MS Thesis: Novel neuromodulation via tFUS with computational and experimental methods.',
    image: 'images/tFUS.jpg',
    tags: ['Neuromodulation', 'BCI'],
    links: { pdf: 'https://drive.google.com/file/d/1iUfV4gimAnLFZUf9FgRXyzKLeEfHwaw9/view?usp=drive_link' },
    detail: 'MS Thesis: Characterization of Transcranial Focused Ultrasound Field to Reduce Ultrasonic Standing Waves. Multiple neural engineering research projects ranging from neural device development and neural signal processing and computation. Developed a novel method for enhancing the neuromodulation modality of tFUS through computer simulations, ex-vivo experimentation, and in-vivo rodent model demonstration. Utilized unsupervised learning algorithms for automated spike sorting of in-vivo intracranial neural data.'
  },
  {
    id: 'pat-gpu',
    title: 'GPU-Accelerated Photoacoustic Tomography',
    description: 'CUDA-accelerated real-time 3D imaging for breast cancer screening research.',
    image: 'images/PATgpu_research.jpg',
    tags: ['GPU Computing', 'Medical Imaging'],
    links: {},
    detail: 'Developed GPU-Accelerated Inversion Algorithm for Photoacoustic Tomography. The implemented algorithm reduces computation time for photoacoustic tomography for breast cancer screening research. Using multi-threaded and parallel processing features of GPU architecture with CUDA, enabling real-time 3D visualization of imaging at the time of diagnosis.'
  },
  {
    id: 'usc-seq',
    title: 'Pre-clustering RNA Sequences for Long-read Transcriptome Error Correction',
    description: 'Unsupervised ML for pre-clustering Pacific Biosciences RNA sequences.',
    image: 'images/USCsequencing_Preclustering.jpg',
    tags: ['Genomics', 'Clustering'],
    links: {},
    detail: 'Developed unsupervised machine learning algorithms for pre-clustering Pacific Biosciences RNA sequences database and improving the grouping of similar transcripts to be used for long-read de novo transcriptome error correction. The results achieve better accuracy and runtime for CONVEX tool for fast and accurate de novo transcriptome recovery from long reads.'
  },
  {
    id: 'batbot',
    title: 'Rescue-Bot: BatBot Rescuing Pets from Fire',
    description: 'Fully autonomous robot — quarter-finalist among 16 teams. 500+ hours of work.',
    image: 'images/batbot.jpg',
    tags: ['Robotics', 'Embedded Systems'],
    links: { code: 'https://github.com/Shahriarnz14/Batbot' },
    detail: 'Fully designed, built, and tested an autonomous robot to rescue 6 pets, finishing as quarter-finalist among 16 teams. 500+ hours of work. Implemented 2000+ lines of C++ including control algorithms for the drive system and robotic arm. Designed and built circuits: H-bridge, IR receiver, PWM, and signal filters. Designed and built the full robot body using SolidWorks and fabrication tools: Waterjet, laser cutter, 3D printer.'
  }
];

const TIMELINE_DATA = [
  {
    id: 'ubc', org: 'Univ. of British Columbia', role: 'BASc Engineering Physics\n(EECS Spec.)', dates: '2013–2018',
    type: 'edu', logo: null, initials: 'UBC',
    desc: 'Graduated with High Honours. Research on Automated Pathology and GPU-Accelerated Photoacoustic Tomography at Robotics and Control Lab under Prof. Tim Salcudean. Self-Directed Research Abroad (USC, ETH Zürich). Google Games 2016 — 3rd Place / 1st in Coding Challenge.',
    location: 'Vancouver, BC'
  },
  {
    id: 'microsoft', org: 'Microsoft', role: 'SDE Intern', dates: '2015',
    type: 'work', logo: 'images/microsoft.jpg',
    desc: 'Software Development Engineering Intern. Main focus areas: Windows 10 Universal Application Platform (UAP), Windows 10 NFL Application, KPI System development, Mocking Framework, Coded UI Automation and Build Machine Automation.',
    location: 'Redmond, WA'
  },
  {
    id: 'philips', org: 'Philips Healthcare', role: 'R&D Intern', dates: '2016',
    type: 'work', logo: 'images/philips.jpeg',
    desc: 'Developed an electronic nose sensor capable of selectively detecting biomarkers in exhaled breath to improve emergency diagnosis of lung infections (ARDS). Designed a signal processing algorithm for gas chromatography data to isolate octane — a critical ARDS biomarker.',
    location: 'Vancouver, BC'
  },
  {
    id: 'cmu-bme', org: 'Carnegie Mellon', role: 'MS Biomedical\nEngineering', dates: '2018–2020',
    type: 'edu', logo: null, initials: 'CMU',
    desc: 'Master\'s Thesis: Characterization of Transcranial Focused Ultrasound Field to Reduce Ultrasonic Standing Waves. Neural engineering research on tFUS neuromodulation, spike sorting, and BCI. CMU Presidential Fellowship 2018.',
    location: 'Pittsburgh, PA'
  },
  {
    id: 'cmu-ml', org: 'Carnegie Mellon', role: 'MS Machine\nLearning', dates: '2020–2022',
    type: 'edu', logo: null, initials: 'CMU',
    desc: 'Master\'s in Machine Learning at SCS/MLD. Projects spanning embodied AI (ALFRED/CLIP), semi-supervised learning, and model-based reinforcement learning. Graduated 2022.',
    location: 'Pittsburgh, PA'
  },
  {
    id: 'cmu-phd', org: 'Carnegie Mellon', role: 'PhD ML +\nPublic Policy', dates: '2021–Present',
    type: 'edu', logo: null, initials: 'CMU★',
    desc: 'Joint PhD at Machine Learning Department (SCS) and Heinz College. Advised by Prof. George Chen and Prof. Jeremy Weiss (NIH/NLM). NSERC CGS-D/PGS-D Fellowship 2023, TCS Presidential Fellowship 2024. Research: sequence models, causal survival analysis, ML for healthcare.',
    location: 'Pittsburgh, PA'
  },
  {
    id: 'sanofi', org: 'Sanofi', role: 'AI Research\nScientist Intern', dates: 'Summer 2024',
    type: 'work', logo: 'images/sanofi-logo.jpeg',
    desc: 'Co-led development of mRNA-LM model pretrained on millions of full-length mRNA sequences. Designed CLIP-inspired multimodal joint representation for mRNA regions. Published in Nucleic Acids Research (IF: 16.8). Filed patent WO2025026948A1. Contributed to Many-Shot In-Context Learning for Molecular Inverse Design.',
    location: 'Cambridge, MA'
  },
  {
    id: 'google', org: 'Google Research', role: 'AI PhD\nResearcher', dates: '2025',
    type: 'work', logo: 'images/Google-Research.webp',
    desc: 'Isolated clean instances of implicit in-weights reasoning in Transformers, demonstrating geometric memory vs. local associative storage. Provided empirical and theoretical evidence connecting geometric memory to spectral bias (Node2Vec-style dynamics). Investigating next-token prediction sufficiency and multi-token objectives for LLMs.',
    location: 'New York, NY'
  }
];

const NEWS_DATA = [
  { date: 'Feb 2026', text: 'SurvHTE-Bench accepted to ICLR-2026!', links: [{ l: 'Paper', u: 'https://openreview.net/pdf?id=qG6O3jMkCj' }, { l: 'Code', u: 'https://github.com/Shahriarnz14/SurvHTE-Benchmark' }] },
  { date: 'Nov 2025', text: 'Forecasting Textual Time Series accepted to AAAI-2026!', links: [{ l: 'Paper', u: 'https://arxiv.org/abs/2504.10340' }, { l: 'Code', u: 'https://github.com/Shahriarnz14/Textual-Time-Series-Forecasting' }] },
  { date: 'Sep 2025', text: 'Geometric Memory paper accepted to NeurIPS 2025 FoRLM Workshop!', links: [{ l: 'Workshop', u: 'https://openreview.net/pdf?id=2NuCrYf8Ap' }, { l: 'ArXiv', u: 'https://arxiv.org/abs/2510.26745' }] },
  { date: 'May 2025', text: 'Spending Summer & Fall 2025 at Google Research (NYC) as AI PhD Researcher hosted by Vaishnavh Nagarajan!', links: [] },
  { date: 'Apr 2025', text: 'Causal Survival-Analysis paper accepted to CHIL 2025!', links: [{ l: 'Paper', u: 'https://arxiv.org/abs/2506.18187' }, { l: 'Code', u: 'https://github.com/Shahriarnz14/causal-meta-learner-survival-analysis' }] },
  { date: 'Mar 2025', text: 'ML-Driven Glucose Prediction paper accepted to Biosensors Journal!', links: [{ l: 'Paper', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11940286/' }] },
  { date: 'Feb 2025', text: 'First Patent published for predicting mRNA properties using LLMs! (Sanofi Internship)', links: [{ l: 'Patent', u: 'https://patents.google.com/patent/WO2025026948A1' }] },
  { date: 'Jan 2025', text: 'mRNA-LM accepted to Nucleic Acids Research!', links: [{ l: 'Paper', u: 'https://academic.oup.com/nar/article/53/3/gkaf044/7997216' }, { l: 'Code', u: 'https://github.com/Sanofi-Public/mRNA-LM' }] },
  { date: 'Sep 2024', text: 'Awarded Tata Consultancy Services (TCS) Presidential Fellowship.', links: [] },
  { date: 'May 2024', text: 'Spending Summer 2024 as AI Research Scientist Intern at Sanofi Inc.', links: [] },
  { date: 'Apr 2024', text: 'TLDR paper accepted to SemEval-2024 at NAACL!', links: [{ l: 'Paper', u: 'https://arxiv.org/abs/2404.09136' }, { l: 'Code', u: 'https://github.com/Shahriarnz14/TLDR-T5-generated-clinical-Language-for-DeBERTa-Report-Analysis' }] },
  { date: 'Nov 2023', text: 'Temporal-SCL accepted to Machine Learning for Health (ML4H) 2023!', links: [{ l: 'Paper', u: 'https://arxiv.org/abs/2312.05933' }, { l: 'Code', u: 'https://github.com/Shahriarnz14/Temporal-Supervised-Contrastive-Learning' }] },
  { date: 'Sep 2023', text: 'Awarded NSERC CGS-D/PGS-D Fellowship.', links: [] },
  { date: 'May 2023', text: 'Awarded best first paper award at Heinz College.', links: [] },
  { date: 'Feb 2023', text: 'Oral Presentation at AAAI\'23 R2HCAI Workshop.', links: [{ l: 'Paper', u: 'https://r2hcai.github.io/AAAI-23/files/CameraReadys/46.pdf' }, { l: 'Video', u: 'https://www.youtube.com/watch?v=sykp_gKXpAk' }] },
  { date: 'Sep 2022', text: 'Awarded Fellowship in Digital Health Innovation from CMLH at CMU.', links: [{ l: 'Link', u: 'https://www.cs.cmu.edu/cmlh/digital-health-archive/cmlh-digital-health-fellows-2022' }] },
  { date: 'Jun 2022', text: 'Poster at CVPR\'22 Embodied AI Workshop.', links: [{ l: 'Paper', u: 'https://embodied-ai.org/papers/2022/20.pdf' }] },
  { date: 'May 2022', text: 'Graduated from Machine Learning Master\'s at CMU!', links: [] },
  { date: 'Sep 2021', text: 'Started joint PhD at Heinz College and MLD at CMU!', links: [] },
  { date: 'Dec 2020', text: 'Graduated from Biomedical Engineering Master\'s at CMU!', links: [{ l: 'Thesis', u: 'https://drive.google.com/file/d/1iUfV4gimAnLFZUf9FgRXyzKLeEfHwaw9/view' }] },
  { date: 'Jan 2019', text: 'Paper accepted to Neuroinformatics Journal! (AShLAW 🎉)', links: [{ l: 'Paper', u: 'https://link.springer.com/article/10.1007/s12021-018-9405-x' }] },
  { date: 'Sep 2018', text: 'Awarded CMU Presidential Fellowship from College of Engineering.', links: [] },
  { date: 'May 2018', text: 'Graduated from Engineering Physics at UBC!', links: [] },
];

const GLOBE_PINS = [
  { lat: 40.7128,  lon: -74.0060,   label: 'New York, NY (Google Research)' },
  { lat: 40.4406,  lon: -79.9959,   label: 'Pittsburgh, PA (CMU)' },
  { lat: 49.2827,  lon: -123.1207,  label: 'Vancouver, BC (UBC)' },
  { lat: 42.3601,  lon: -71.0589,   label: 'Cambridge, MA (Sanofi)' },
  { lat: 47.6092,  lon: -122.3301,  label: 'Redmond, WA (Microsoft)' },
  { lat: 47.3769,  lon: 8.5417,     label: 'Zürich, Switzerland (ETH)' },
  { lat: 34.0224,  lon: -118.2851,  label: 'Los Angeles, CA (USC)' },
];

// ============================================================
// CAROUSEL CLASS
// ============================================================
class Carousel {
  constructor(trackEl, dotsEl, prevBtn, nextBtn, data, renderFn, onActiveFn) {
    this.track    = trackEl;
    this.dotsEl   = dotsEl;
    this.prevBtn  = prevBtn;
    this.nextBtn  = nextBtn;
    this.data     = data;
    this.render   = renderFn;
    this.onActive = onActiveFn || (() => {});
    this.current  = 0;
    this.timer    = null;
    this.cards    = [];

    // Bind events ONCE
    this._bindEvents();
    // Build DOM
    this._rebuildDOM();
    this._startAuto();
  }

  _bindEvents() {
    this.track.addEventListener('click', e => {
      const card = e.target.closest('.cf-card');
      if (!card) return;
      const pos = card.getAttribute('data-pos');
      if (pos === 'prev' || pos === 'prev-2') { e.preventDefault(); this.prev(); return; }
      if (pos === 'next' || pos === 'next-2') { e.preventDefault(); this.next(); return; }
      if (pos === 'active') {
        const btn = e.target.closest('.cf-btn');
        if (btn) {
          if (btn.dataset.action === 'abs') { e.preventDefault(); this.onActive(this.data[this.current]); }
          // anchor .cf-btn elements without data-action navigate natively via href
        } else if (!e.target.closest('a')) {
          // clicking card image / body area (not a link)
          this.onActive(this.data[this.current]);
        }
      }
    });
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.track.addEventListener('mouseenter', () => this._stopAuto());
    this.track.addEventListener('mouseleave', () => this._startAuto());
  }

  _rebuildDOM() {
    this.track.innerHTML  = '';
    this.dotsEl.innerHTML = '';
    this.cards = [];

    this.data.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'cf-card';
      card.innerHTML = this.render(item, i);
      this.track.appendChild(card);
      this.cards.push(card);

      const dot = document.createElement('button');
      dot.className = 'cf-dot';
      dot.setAttribute('aria-label', `Go to item ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsEl.appendChild(dot);
    });

    this._update();
  }

  _startAuto() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 5000);
  }
  _stopAuto() { clearInterval(this.timer); }

  goTo(idx) {
    this.current = ((idx % this.data.length) + this.data.length) % this.data.length;
    this._update();
  }
  prev() { this.goTo(this.current - 1); }
  next() { this.goTo(this.current + 1); }

  filter(filteredData) {
    this._stopAuto();
    this.data    = filteredData;
    this.current = 0;
    this._rebuildDOM();
    this._startAuto();
  }

  _update() {
    const n = this.data.length;
    this.cards.forEach((card, i) => {
      const offset = ((i - this.current) + n) % n;
      let pos;
      if      (offset === 0)   pos = 'active';
      else if (offset === 1)   pos = 'next';
      else if (offset === 2)   pos = 'next-2';
      else if (offset === n-1) pos = 'prev';
      else if (offset === n-2) pos = 'prev-2';
      else                     pos = 'hidden';
      card.setAttribute('data-pos', pos);
    });
    const dotEls = this.dotsEl.querySelectorAll('.cf-dot');
    dotEls.forEach((d, i) => d.classList.toggle('active', i === this.current));
  }
}

// ============================================================
// RENDER HELPERS
// ============================================================
function renderPubButtons(links) {
  const map = {
    arxiv: 'ArXiv', pdf: 'PDF', openreview: 'OpenReview',
    code: 'Code', data: 'Data', patent: 'Patent'
  };
  return Object.entries(links).map(([k, u]) =>
    `<a class="cf-btn" href="${u}" target="_blank" rel="noopener">${map[k] || k.toUpperCase()}</a>`
  ).join('');
}

function renderPubCard(item) {
  return `
    <img class="cf-card-img" src="${item.image}" alt="${item.title}" loading="lazy" />
    <div class="cf-card-body">
      <span class="cf-badge ${item.badgeClass}">${item.badge}</span>
      <div class="cf-card-title">${item.title}</div>
      <div class="cf-card-authors">${item.authors}</div>
      <div class="cf-card-venue">${item.venue}</div>
      <div class="cf-btns">
        <button class="cf-btn" data-action="abs">ABS</button>
        ${renderPubButtons(item.links)}
      </div>
    </div>`;
}

function renderProjectCard(item) {
  const tags = item.tags.map(t => `<span class="cf-tag">${t}</span>`).join('');
  const btns = Object.entries(item.links).map(([k, u]) => {
    const label = k === 'pdf' ? 'Paper' : k === 'code' ? 'Code' : k.toUpperCase();
    return `<a class="cf-btn" href="${u}" target="_blank" rel="noopener">${label}</a>`;
  }).join('');
  return `
    <img class="cf-card-img project-card-img" src="${item.image}" alt="${item.title}" loading="lazy" />
    <div class="cf-card-body">
      <div class="cf-card-tags">${tags}</div>
      <div class="cf-card-title">${item.title}</div>
      <div class="cf-card-venue">${item.description}</div>
      <div class="cf-btns">
        <button class="cf-btn" data-action="abs">Details</button>
        ${btns}
      </div>
    </div>`;
}

// ============================================================
// MODAL
// ============================================================
const modal    = document.getElementById('modal-overlay');
const modalBox = document.getElementById('modal-box');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(html) {
  modalBody.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function pubModalHTML(item) {
  return `
    <img src="${item.image}" alt="${item.title}" />
    <h3>${item.title}</h3>
    <div class="modal-meta">${item.authors}</div>
    <div class="modal-venue"><span class="cf-badge ${item.badgeClass}">${item.badge}</span> &nbsp;${item.venue}</div>
    <div class="modal-abstract-label">Abstract</div>
    <div class="modal-abstract">${item.abstract}</div>
    <div class="modal-links">${renderPubButtons(item.links)}</div>`;
}

function projectModalHTML(item) {
  const btns = Object.entries(item.links).map(([k, u]) => {
    const label = k === 'pdf' ? 'Paper' : k === 'code' ? 'Code' : k.toUpperCase();
    return `<a class="cf-btn" href="${u}" target="_blank" rel="noopener">${label}</a>`;
  }).join('');
  const tags = item.tags.map(t => `<span class="cf-tag">${t}</span>`).join('');
  return `
    <img src="${item.image}" alt="${item.title}" />
    <h3>${item.title}</h3>
    <div class="modal-venue"><div class="cf-card-tags">${tags}</div></div>
    <div class="modal-abstract">${item.detail}</div>
    <div class="modal-links">${btns}</div>`;
}

function timelineModalHTML(item) {
  const logo = item.logo
    ? `<img src="${item.logo}" alt="${item.org}" style="max-height:80px;max-width:160px;object-fit:contain;display:block;margin:0 auto 1rem;" />`
    : `<div style="text-align:center;font-size:2rem;font-weight:800;color:#1c2b4a;margin-bottom:1rem;">${item.initials || item.org}</div>`;
  return `
    ${logo}
    <h3>${item.role.replace(/\n/g,' ')}</h3>
    <div class="modal-meta">${item.org} &mdash; ${item.location || ''}</div>
    <div class="modal-venue">${item.dates}</div>
    <div class="modal-abstract">${item.desc}</div>`;
}

// ============================================================
// BOOKSHELF
// ============================================================
function initBookshelf(pubCarousel) {
  const shelf = document.getElementById('bookshelf');
  let activeId = 'all';

  CATEGORIES.forEach(cat => {
    const count = cat.id === 'all'
      ? PUBS_DATA.length
      : PUBS_DATA.filter(p => p.categories.includes(CATEGORY_LABELS[cat.id])).length;

    const spine = document.createElement('div');
    spine.className = `book-spine ${cat.colorClass}`;
    spine.dataset.catId = cat.id;
    spine.innerHTML = `
      <div class="book-spine-inner">
        <span class="book-title">${cat.label}</span>
        <span class="book-count">${count}</span>
      </div>`;

    spine.addEventListener('click', () => {
      shelf.querySelectorAll('.book-spine').forEach(s => s.classList.remove('active'));
      spine.classList.add('active');
      activeId = cat.id;

      const filtered = cat.id === 'all'
        ? PUBS_DATA
        : PUBS_DATA.filter(p => p.categories.includes(CATEGORY_LABELS[cat.id]));
      pubCarousel.filter(filtered.length ? filtered : PUBS_DATA);
    });

    shelf.appendChild(spine);
  });

  // activate "All" by default
  shelf.querySelector('.book-spine').classList.add('active');
}

// ============================================================
// TIMELINE
// ============================================================
function initTimeline() {
  const track = document.getElementById('timeline-track');

  TIMELINE_DATA.forEach((item, i) => {
    const tli = document.createElement('div');
    tli.className = `tl-item tl-type-${item.type}`;
    tli.style.transitionDelay = `${i * 0.1}s`;

    const nodeInner = item.logo
      ? `<img src="${item.logo}" alt="${item.org}" />`
      : `<div class="tl-node-initials">${item.initials || item.org.slice(0,3)}</div>`;

    tli.innerHTML = `
      <div class="tl-node">${nodeInner}</div>
      <div class="tl-info">
        <div class="tl-dates">${item.dates}</div>
        <div class="tl-role">${item.role.replace(/\n/g,'<br>')}</div>
        <div class="tl-org">${item.org}</div>
      </div>`;

    tli.addEventListener('click', () => openModal(timelineModalHTML(item)));
    track.appendChild(tli);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  track.querySelectorAll('.tl-item').forEach(el => observer.observe(el));
}

// ============================================================
// NEWS
// ============================================================
function initNews() {
  const list = document.getElementById('news-list');
  NEWS_DATA.forEach(item => {
    const li = document.createElement('div');
    li.className = 'news-item';
    const linkHTML = item.links.map(lk =>
      `<a href="${lk.u}" target="_blank" rel="noopener">[${lk.l}]</a>`
    ).join(' ');
    li.innerHTML = `<span class="news-date">[${item.date}]</span>${item.text} ${linkHTML}`;
    list.appendChild(li);
  });
}

// ============================================================
// GLOBE — D3 orthographic with antique style
// ============================================================
function initGlobe() {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas || typeof d3 === 'undefined') return;

  const wrap   = canvas.parentElement;
  let W = wrap.clientWidth  || 300;
  let H = wrap.clientHeight || 300;
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  let rotation = [10, -28, 0];
  let dragging  = false;
  let lastXY    = null;
  let land = null, borders = null, graticule = null;

  function getProjection() {
    return d3.geoOrthographic()
      .scale(Math.min(W, H) / 2 - 8)
      .translate([W / 2, H / 2])
      .rotate(rotation)
      .clipAngle(90);
  }

  function draw() {
    const proj = getProjection();
    const path = d3.geoPath(proj, ctx);

    ctx.clearRect(0, 0, W, H);

    // ocean
    ctx.beginPath();
    path({ type: 'Sphere' });
    const og = ctx.createRadialGradient(W/2, H/2*0.9, 0, W/2, H/2, Math.min(W,H)/2);
    og.addColorStop(0, '#cec4a0');
    og.addColorStop(1, '#a99870');
    ctx.fillStyle = og;
    ctx.fill();

    // land
    if (land) {
      ctx.beginPath();
      path(land);
      ctx.fillStyle = '#7a6444';
      ctx.fill();
    }

    // borders
    if (borders) {
      ctx.beginPath();
      path(borders);
      ctx.strokeStyle = 'rgba(60,42,18,0.28)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // graticule
    if (graticule) {
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(60,42,18,0.1)';
      ctx.lineWidth = 0.35;
      ctx.stroke();
    }

    // sphere outline
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.strokeStyle = 'rgba(60,42,18,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // pins
    GLOBE_PINS.forEach(pin => {
      const p = proj([pin.lon, pin.lat]);
      if (!p) return;
      const dist = d3.geoDistance([pin.lon, pin.lat],
        [-rotation[0], -rotation[1]]);
      if (dist > Math.PI / 2) return; // back of globe

      // glow
      const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 11);
      glow.addColorStop(0, 'rgba(198,146,74,0.55)');
      glow.addColorStop(1, 'rgba(198,146,74,0)');
      ctx.beginPath();
      ctx.arc(p[0], p[1], 11, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // dot
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
      ctx.fillStyle = '#c6924a';
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });
  }

  // load world data
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r => r.json())
    .then(world => {
      land      = topojson.feature(world, world.objects.land);
      borders   = topojson.mesh(world, world.objects.countries, (a,b) => a !== b);
      graticule = d3.geoGraticule()();

      let animId;
      function animate() {
        if (!dragging) rotation[0] += 0.12;
        draw();
        animId = requestAnimationFrame(animate);
      }
      animate();
    })
    .catch(() => {
      // fallback: just spin a blank sphere
      function animate() {
        rotation[0] += 0.12;
        draw();
        requestAnimationFrame(animate);
      }
      animate();
    });

  // drag
  function onDown(x, y) { dragging = true; lastXY = [x, y]; }
  function onMove(x, y) {
    if (!dragging) return;
    const dx = x - lastXY[0];
    const dy = y - lastXY[1];
    rotation[0] += dx * 0.35;
    rotation[1] -= dy * 0.35;
    rotation[1] = Math.max(-85, Math.min(85, rotation[1]));
    lastXY = [x, y];
  }
  function onUp() { dragging = false; }

  canvas.addEventListener('mousedown',  e => onDown(e.clientX, e.clientY));
  window.addEventListener('mousemove',  e => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup',    onUp);
  canvas.addEventListener('touchstart', e => { onDown(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchend',   onUp);

  // resize
  const ro = new ResizeObserver(() => {
    W = wrap.clientWidth  || 300;
    H = wrap.clientHeight || 300;
    canvas.width  = W;
    canvas.height = H;
  });
  ro.observe(wrap);
}

// ============================================================
// NAV SCROLL SPY
// ============================================================
function initNavSpy() {
  const mainContent = document.querySelector('.main-content');
  const navLinks    = document.querySelectorAll('.content-nav a[data-section]');
  const sections    = Array.from(document.querySelectorAll('.content-section[id]'));

  mainContent.addEventListener('scroll', () => {
    const threshold = mainContent.getBoundingClientRect().top + 130;
    let current = sections[0].id;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= threshold) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
  }, { passive: true });

  navLinks.forEach(a => {
    if (!a.dataset.section) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      const sec = document.getElementById(a.dataset.section);
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Publication carousel
  const pubTrack  = document.getElementById('pub-track');
  const pubDots   = document.getElementById('pub-dots');
  const pubPrev   = document.getElementById('pub-prev');
  const pubNext   = document.getElementById('pub-next');

  const pubCarousel = new Carousel(
    pubTrack, pubDots, pubPrev, pubNext,
    PUBS_DATA, renderPubCard,
    item => openModal(pubModalHTML(item))
  );

  // Bookshelf
  initBookshelf(pubCarousel);

  // Project carousel
  const projTrack = document.getElementById('proj-track');
  const projDots  = document.getElementById('proj-dots');
  const projPrev  = document.getElementById('proj-prev');
  const projNext  = document.getElementById('proj-next');

  new Carousel(
    projTrack, projDots, projPrev, projNext,
    PROJECTS_DATA, renderProjectCard,
    item => openModal(projectModalHTML(item))
  );

  // Timeline
  initTimeline();

  // News
  initNews();

  // Globe
  initGlobe();

  // Nav spy
  initNavSpy();
});
