import axios from 'axios';
import { fallbackRepositories } from '@/lib/github';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') ?? 'ashish-soni';

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 6,
      },
      headers: process.env.GITHUB_TOKEN
        ? {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }
        : undefined,
    });

    const repos = response.data
      .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return Response.json({ repos });
  } catch {
    return Response.json({ repos: fallbackRepositories });
  }
}
