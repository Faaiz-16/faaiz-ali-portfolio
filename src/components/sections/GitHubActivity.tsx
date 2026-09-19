import { GitBranch, ExternalLink as ExternalIcon } from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import { siteConfig } from '../../data/site';
import { isUsableLink } from '../../lib/utils';
import { ExternalLink } from '../ui/ExternalLink';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { useGitHubRepos, type GitHubRepo } from '../../hooks/useGitHubRepos';

export function GitHubActivity() {
  const hasGitHub = isUsableLink(siteConfig.links.github);
  const hasUsername =
    Boolean(siteConfig.githubUsername) && !/_HERE/i.test(siteConfig.githubUsername);

  /* Hooks must run on every render, so this sits before the early return.
     An empty username makes the hook skip the network request entirely. */
  const { status, repos } = useGitHubRepos(hasUsername ? siteConfig.githubUsername : '');

  if (!hasGitHub) return null;

  const showRepos = status === 'loading' || (status === 'ready' && repos.length > 0);

  return (
    <Section
      id="github"
      title="Where I actually write code"
      subtitle="My repositories are the most honest thing on this site ~ commit history included."
      muted
    >
      <div
        className={
          showRepos ? 'grid gap-4 lg:grid-cols-[1fr_1.2fr]' : 'grid max-w-2xl gap-4'
        }
      >
        <Reveal>
          <div className="card flex h-full flex-col justify-between p-6">
            <div>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent"
              >
                <Github className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text">
                {hasUsername ? `@${siteConfig.githubUsername}` : 'GitHub'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Everything I build ends up here, including the unfinished experiments. Have
                a look through the commit history if you want to see how I work rather than
                just what I ship.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ExternalLink
                href={siteConfig.links.github}
                ariaLabel="Open GitHub profile in a new tab"
                className="btn btn-primary"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
                View profile
              </ExternalLink>
              <ExternalLink
                href={`${siteConfig.links.github}?tab=repositories`}
                ariaLabel="Browse repositories on GitHub"
                className="btn btn-secondary"
              >
                <GitBranch aria-hidden="true" className="h-4 w-4" />
                Repositories
                <ExternalIcon aria-hidden="true" className="h-3.5 w-3.5" />
              </ExternalLink>
            </div>
          </div>
        </Reveal>

        {showRepos && (
          <Reveal delay={100}>
            <div className="card h-full p-6">
              <h3 className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
                Latest repositories
              </h3>
              {status === 'loading' ? <RepoSkeleton /> : <RepoList repos={repos} />}
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

function RepoList({ repos }: { repos: GitHubRepo[] }) {
  return (
    <ul className="mt-3 divide-y divide-border">
      {repos.map((repo) => (
        <li key={repo.id}>
          <ExternalLink
            href={repo.url}
            ariaLabel={`Open the ${repo.name} repository on GitHub`}
            className="group -mx-2 block rounded-lg px-2 py-3 transition-colors hover:bg-surface-2"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="truncate font-mono text-sm font-medium text-text group-hover:text-accent">
                {repo.name}
              </span>
              <span className="shrink-0 text-xs text-muted">
                Updated {dateFormat.format(new Date(repo.pushedAt))}
              </span>
            </span>
            {repo.description && (
              <span className="mt-1 line-clamp-1 block text-sm text-muted">
                {repo.description}
              </span>
            )}
            {repo.language && <span className="tag mt-2">{repo.language}</span>}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function RepoSkeleton() {
  return (
    <div role="status" aria-live="polite" className="mt-3 divide-y divide-border">
      <span className="sr-only">Loading repositories</span>
      {[0, 1, 2].map((row) => (
        <div key={row} aria-hidden="true" className="space-y-2 py-3">
          <div className="h-4 w-1/2 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-surface-2" />
        </div>
      ))}
    </div>
  );
}
