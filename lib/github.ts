export type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  topics: string[];
  homepage?: string | null;
};

export const fallbackRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: 'enterprise-rag-orchestrator',
    description: 'Multi-model retrieval and response orchestration for enterprise intelligence.',
    stargazers_count: 128,
    language: 'Python',
    html_url: 'https://github.com/ashish-soni/enterprise-rag',
    topics: ['rag', 'llm', 'agents'],
    homepage: null,
  },
  {
    id: 2,
    name: 'coal-forecasting-lab',
    description: 'Forecasting and sentiment-enriched commodity modeling workflows.',
    stargazers_count: 92,
    language: 'Python',
    html_url: 'https://github.com/ashish-soni/coal-forecasting',
    topics: ['forecasting', 'ml', 'analytics'],
    homepage: null,
  },
  {
    id: 3,
    name: 'ai-portfolio-lab',
    description: 'Interactive portfolio experiments with 3D visuals and AI demos.',
    stargazers_count: 61,
    language: 'TypeScript',
    html_url: 'https://github.com/ashish-soni',
    topics: ['nextjs', 'threejs', 'portfolio'],
    homepage: null,
  },
];
