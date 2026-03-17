'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import type { GitHubRepository } from '@/lib/github';

type GitHubProjectsProps = {
  username: string;
};

export default function GitHubProjects({ username }: GitHubProjectsProps) {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRepositories() {
      try {
        const response = await axios.get<{ repos: GitHubRepository[] }>(`/api/github?username=${username}`);
        if (!mounted) return;
        setRepos(response.data.repos);
        setError(null);
      } catch {
        if (!mounted) return;
        setError('Unable to load live GitHub data right now.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadRepositories();

    return () => {
      mounted = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="glass-panel animate-pulse rounded-[2rem] p-6">
            <div className="h-4 w-24 rounded bg-slate-700" />
            <div className="mt-6 h-6 w-2/3 rounded bg-slate-700" />
            <div className="mt-4 h-20 rounded bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {repos.map((repo) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -6 }}
          className="glass-panel rounded-[2rem] p-6 transition duration-300 hover:border-cyan-400/30"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              {repo.language ?? 'Code'}
            </span>
            <span className="text-sm text-slate-400">★ {repo.stargazers_count}</span>
          </div>
          <h3 className="mt-5 text-xl text-white">{repo.name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {repo.description ?? 'Repository without a public description.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {repo.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
                #{topic}
              </span>
            ))}
          </div>
        </motion.a>
      ))}
      {error ? (
        <p className="md:col-span-2 xl:col-span-3 text-sm text-slate-400" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
}
