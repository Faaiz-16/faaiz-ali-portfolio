/* Uses GitHub's unauthenticated API (60 requests/hour per IP); results are cached per session. Any failure resolves to 'error'. */

import { useEffect, useState } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  pushedAt: string;
}

type Status = 'loading' | 'ready' | 'error';

interface RawRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

const MAX_REPOS = 4;

function cacheKey(username: string): string {
  return `portfolio-github-repos:${username}`;
}

function readCache(username: string): GitHubRepo[] | null {
  try {
    const raw = window.sessionStorage.getItem(cacheKey(username));
    return raw ? (JSON.parse(raw) as GitHubRepo[]) : null;
  } catch {
    return null;
  }
}

function writeCache(username: string, repos: GitHubRepo[]): void {
  try {
    window.sessionStorage.setItem(cacheKey(username), JSON.stringify(repos));
  } catch {
    /* Caching is a nicety; ignore storage errors. */
  }
}

export function useGitHubRepos(username: string) {
  const [state, setState] = useState<{ status: Status; repos: GitHubRepo[] }>(() => {
    const cached = username ? readCache(username) : null;
    return cached
      ? { status: 'ready', repos: cached }
      : { status: username ? 'loading' : 'error', repos: [] };
  });

  useEffect(() => {
    if (!username || state.status !== 'loading') return;

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=12`,
      {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
        return response.json() as Promise<RawRepo[]>;
      })
      .then((raw) => {
        const repos = raw
          .filter((repo) => !repo.fork)
          .slice(0, MAX_REPOS)
          .map<GitHubRepo>((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            language: repo.language,
            pushedAt: repo.pushed_at,
          }));
        writeCache(username, repos);
        setState({ status: 'ready', repos });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({ status: 'error', repos: [] });
      });

    return () => controller.abort();
  }, [username, state.status]);

  return state;
}
