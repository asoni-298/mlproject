export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  impact: string;
  description: string;
  features: string[];
  keyContributions: string[];
  techStack: string[];
  results: string;
  metrics: ProjectMetric[];
  link: string;
  github: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  overview: string;
  keyContributions: string[];
  technologies: string[];
  highlights: string[];
};

export type PortfolioData = {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    about: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Array<{
    institution: string;
    degree: string;
    cgpa: string;
    graduationYear: number;
    location: string;
  }>;
  internships: Array<{
    company: string;
    title: string;
    duration: string;
  }>;
  achievements: string[];
  summary: string;
};

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Ashish Soni',
    title: 'GenAI Data Scientist | LLM Systems Engineer | RAG Architect',
    location: 'Ahmedabad, India',
    email: 'soniashish956@gmail.com',
    phone: '+91 8236980719',
    linkedin: 'https://linkedin.com/in/ashish-soni',
    github: 'https://github.com/ashish-soni',
    summary:
      'AI engineer with 3+ years of experience building production-scale machine learning and generative AI systems. Specialized in LLM applications, RAG architectures, forecasting models, and AI-driven decision intelligence platforms.',
    about:
      'I build AI systems that transform fragmented enterprise data into fast, decision-ready intelligence. My work spans LLM orchestration, agentic RAG, forecasting, optimization, backend infrastructure, and the interfaces that make complex systems usable for decision makers.',
  },
  experience: [
    {
      id: 1,
      company: 'Adani AI Labs',
      role: 'GenAI Data Scientist',
      duration: 'August 2022 - Present',
      location: 'Ahmedabad, India',
      overview:
        'Designing enterprise AI systems powered by machine learning, large language models, and resilient data pipelines for high-stakes business operations.',
      keyContributions: [
        'Architected a scalable agentic RAG ecosystem routing tasks across GPT-4o, Claude 3.5, and Gemini',
        'Built asynchronous extraction agents capable of 15+ parallel semantic retrieval operations',
        'Reduced dashboard generation latency by 70%',
        'Implemented deterministic incremental indexing using SHA-256 hashing and metadata checks',
        'Integrated Azure Document Intelligence OCR for enterprise document processing',
      ],
      technologies: [
        'Python',
        'FastAPI',
        'LangChain',
        'FAISS',
        'Azure Blob Storage',
        'Azure Document Intelligence',
        'AsyncIO',
        'Vector Databases',
        'PostgreSQL',
        'Streamlit',
      ],
      highlights: [
        'Multi-model routing for enterprise-grade AI question answering',
        'High-throughput semantic retrieval with async orchestration',
        'Deterministic indexing and document intelligence ingestion pipelines',
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Agentic RAG System',
      subtitle: 'Enterprise project intelligence platform',
      category: 'LLM Systems',
      impact: '70% latency reduction',
      description:
        'Built an enterprise AI platform that converts unstructured project data into structured intelligence with agentic retrieval, prompt composition, and multi-model orchestration.',
      features: [
        'Multi-model routing across GPT-4o, Claude, and Gemini',
        'Autonomous query decomposition',
        'Deterministic indexing with change-aware ingestion',
        'Real-time executive dashboard generation',
      ],
      keyContributions: [
        'Architected a scalable agentic RAG ecosystem for enterprise workflows',
        'Built asynchronous retrieval agents using Python AsyncIO',
        'Integrated OCR pipelines to extract structured knowledge from enterprise documents',
      ],
      techStack: [
        'Python',
        'FastAPI',
        'LangChain',
        'FAISS',
        'Azure Blob Storage',
        'Document Intelligence',
      ],
      results: 'Enabled faster and more reliable project intelligence reporting for decision makers.',
      metrics: [
        { label: 'Latency Reduction', value: '70%' },
        { label: 'Parallel Retrievals', value: '15+' },
        { label: 'Models Routed', value: '3' },
      ],
      link: '#architecture',
      github: 'https://github.com/ashish-soni/enterprise-rag',
    },
    {
      id: 2,
      title: 'Coal Price Forecasting',
      subtitle: 'ML forecasting with macro signal enrichment',
      category: 'Forecasting',
      impact: '99.78% accuracy',
      description:
        'Developed an ensemble commodity forecasting platform combining classical time-series techniques, machine learning models, and news-derived sentiment signals.',
      features: [
        'XGBoost, Random Forest, and Holt-Winters ensembles',
        'NLP sentiment features from external news',
        'Interactive analyst dashboards',
        'Volatility pattern monitoring',
      ],
      keyContributions: [
        'Built forecasting models achieving 99.78% prediction accuracy',
        'Integrated geopolitical and economic sentiment signals',
        'Created interactive visual dashboards with Flask and R Shiny',
      ],
      techStack: ['Python', 'Scikit-learn', 'XGBoost', 'NLTK', 'Flask', 'R Shiny'],
      results: 'Improved forecasting confidence for strategic procurement and planning.',
      metrics: [
        { label: 'Forecast Accuracy', value: '99.78%' },
        { label: 'Signal Sources', value: 'News + Market' },
        { label: 'Model Families', value: '5' },
      ],
      link: '#visualizations',
      github: 'https://github.com/ashish-soni/coal-forecasting',
    },
    {
      id: 3,
      title: 'Demand Forecasting & Inventory Optimization',
      subtitle: 'Supply chain intelligence and optimization layer',
      category: 'Optimization',
      impact: 'Rs. 2 Cr uplift',
      description:
        'Built forecasting and optimization workflows to align sourcing, dispatch, and sales dynamics with inventory decisions.',
      features: [
        'Multi-dataset demand forecasting',
        'Constraint-aware inventory optimization',
        'Recommendation engine for planners',
        'Financial impact estimation',
      ],
      keyContributions: [
        'Performed demand forecasting across sourcing, dispatch, and sales datasets',
        'Built optimization logic to recommend inventory levels',
        'Delivered measurable revenue uplift through better planning decisions',
      ],
      techStack: [
        'Python',
        'Pandas',
        'Scikit-learn',
        'Linear Programming',
        'Optimization Models',
      ],
      results: 'Created a practical optimization workflow directly tied to supply-chain economics.',
      metrics: [
        { label: 'Revenue Impact', value: 'Rs. 2 Cr' },
        { label: 'Datasets', value: '3' },
        { label: 'Decision Layer', value: 'Planner-ready' },
      ],
      link: '#projects',
      github: 'https://github.com/ashish-soni/inventory-optimization',
    },
    {
      id: 4,
      title: 'Customer Intelligence Platform',
      subtitle: 'Segmentation and churn prediction system',
      category: 'Applied ML',
      impact: 'Rs. 17 Cr saved',
      description:
        'Developed customer intelligence models to segment high-value accounts, predict churn risk, and guide targeted retention actions.',
      features: [
        'Customer segmentation modeling',
        'Churn risk scoring',
        'Retention recommendations',
        'Revenue-risk visibility',
      ],
      keyContributions: [
        'Built segmentation models for high, medium, and low-value customers',
        'Developed churn prediction workflows for at-risk accounts',
        'Enabled targeted actions that helped protect significant revenue',
      ],
      techStack: [
        'Python',
        'Classification Models',
        'Feature Engineering',
        'Customer Analytics',
      ],
      results: 'Turned customer behavior data into revenue protection strategies.',
      metrics: [
        { label: 'Revenue Protected', value: 'Rs. 17 Cr' },
        { label: 'Customer Segments', value: '3' },
        { label: 'Primary Outcome', value: 'Retention' },
      ],
      link: '#projects',
      github: 'https://github.com/ashish-soni/customer-intelligence',
    },
  ],
  skills: {
    'AI & LLM Systems': [
      'Large Language Models',
      'Agentic AI',
      'RAG Systems',
      'Prompt Engineering',
      'Embeddings',
      'Vector Search',
    ],
    'Machine Learning': [
      'Time Series Forecasting',
      'Classification Models',
      'Optimization Modeling',
      'Feature Engineering',
      'Model Evaluation',
      'Experimentation',
    ],
    'Backend & Infra': [
      'Python',
      'FastAPI',
      'AsyncIO',
      'PostgreSQL',
      'Azure',
      'Docker',
    ],
    'Data & Analytics': [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'SQL',
      'Power BI',
      'Databricks',
    ],
    'Frontend & Product': [
      'Next.js',
      'React',
      'TypeScript',
      'Three.js',
      'Framer Motion',
      'Recharts',
    ],
    'Frameworks & APIs': ['LangChain', 'OpenAI API', 'Gemini API', 'Flask', 'Streamlit', 'R Shiny'],
  },
  education: [
    {
      institution: 'SGSITS Indore',
      degree: 'B.Tech, Industrial Engineering',
      cgpa: '8.32',
      graduationYear: 2022,
      location: 'Indore, India',
    },
  ],
  internships: [
    { company: 'DRDO', title: 'FEA Analysis of Connecting Rod', duration: 'June 2021 - August 2021' },
    { company: 'NTPC', title: 'Power Plant Operations', duration: 'July 2021 - August 2021' },
    { company: 'IIT Roorkee', title: 'Guided Wave Propagation Analysis', duration: 'May 2021 - June 2021' },
    {
      company: 'SDNX Delhi (ISRO Research Project)',
      title: 'Inflatable Habitat Research',
      duration: 'July 2020 - December 2020',
    },
  ],
  achievements: [
    'Spot Recognition Award for machine learning model development',
    '70% latency reduction in dashboard generation',
    '99.78% forecasting accuracy in commodity prediction',
    'Rs. 2 Crore revenue uplift through inventory optimization',
    'Rs. 17 Crore revenue protected through churn intelligence',
  ],
  summary:
    'Passionate about building AI systems that solve real business problems with measurable outcomes, from enterprise RAG pipelines to forecasting engines and customer intelligence platforms.',
};

export const heroStats = [
  { value: '3+', label: 'Years in AI & ML systems' },
  { value: '15+', label: 'Parallel semantic retrieval operations' },
  { value: '70%', label: 'Latency reduction for intelligence dashboards' },
  { value: 'Rs. 19 Cr+', label: 'Business value created or protected' },
];

export const architectureNodeDetails = [
  {
    label: 'User Query',
    title: 'User Query',
    description: 'Natural-language request enters the orchestration layer.',
  },
  {
    label: 'Embedding Model',
    title: 'Embedding Model',
    description: 'Transforms text into vector representations for semantic search.',
  },
  {
    label: 'Vector Database (FAISS)',
    title: 'FAISS Vector Store',
    description: 'Indexes and retrieves the most relevant context chunks at low latency.',
  },
  {
    label: 'Retriever',
    title: 'Retriever',
    description: 'Ranks and selects context across indexed enterprise knowledge.',
  },
  {
    label: 'Prompt Builder',
    title: 'Prompt Builder',
    description: 'Composes instructions, context, and constraints into a model-ready prompt.',
  },
  {
    label: 'LLM (Gemini)',
    title: 'Gemini Model',
    description: 'Generates grounded answers from retrieved context and user intent.',
  },
  {
    label: 'Response Generator',
    title: 'Response Generator',
    description: 'Formats the final answer for dashboards, copilots, or analyst workflows.',
  },
];

export const pipelineStages = [
  'User Query',
  'Tokenization',
  'Embedding',
  'Vector Retrieval',
  'Prompt Construction',
  'Gemini Model',
  'Response',
];

export const forecastSeries = [
  { month: 'Jan', actual: 84, predicted: 82, confidence: 78 },
  { month: 'Feb', actual: 88, predicted: 87, confidence: 80 },
  { month: 'Mar', actual: 91, predicted: 90, confidence: 82 },
  { month: 'Apr', actual: 97, predicted: 95, confidence: 84 },
  { month: 'May', actual: 94, predicted: 96, confidence: 86 },
  { month: 'Jun', actual: 102, predicted: 101, confidence: 88 },
  { month: 'Jul', actual: 109, predicted: 107, confidence: 90 },
];

export const githubUsername = 'ashish-soni';
