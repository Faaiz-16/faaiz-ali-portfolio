import { useMemo, useState } from 'react';
import { Github } from '../ui/BrandIcons';
import { projects, projectCategories } from '../../data/projects';
import { siteConfig } from '../../data/site';
import type { ProjectCategory } from '../../data/types';
import { cn, isUsableLink } from '../../lib/utils';
import { EmptyState } from '../ui/EmptyState';
import { ExternalLink } from '../ui/ExternalLink';
import { ProjectCard } from '../ui/ProjectCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

type Filter = 'All' | ProjectCategory;

/* Only offer filters when there are enough projects for them to be useful. */
const MIN_PROJECTS_FOR_FILTERS = 4;

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filters: Filter[] = useMemo(() => ['All', ...projectCategories], []);

  const visibleProjects = useMemo(() => {
    const filtered =
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter));
    /* Featured projects always sort to the top, order otherwise preserved.
       `toSorted` returns a new array, leaving the original data untouched. */
    return filtered.toSorted(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
    );
  }, [activeFilter]);

  const showFilters =
    projects.length >= MIN_PROJECTS_FOR_FILTERS && projectCategories.length > 1;

  return (
    <Section
      id="projects"
      title="Things I have built"
      subtitle="Each one started as something I wanted to figure out. Open a project to read what the problem was and how I approached it."
    >
      {showFilters && (
        <Reveal>
          {/* Toggle buttons rather than a radio group: `aria-pressed` states the
              current choice without the arrow-key navigation a radiogroup is
              expected to implement. */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mb-8 flex flex-wrap gap-2"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              const count =
                filter === 'All'
                  ? projects.length
                  : projects.filter((p) => p.categories.includes(filter)).length;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'inline-flex min-h-[2.25rem] items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-accent bg-accent text-accent-contrast'
                      : 'border-border bg-surface text-muted hover:border-accent hover:text-accent',
                  )}
                >
                  {filter}
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem]',
                      isActive ? 'opacity-80' : 'opacity-60',
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      {visibleProjects.length === 0 ? (
        <EmptyState
          title="No projects in this category yet"
          description="Try another filter, or add a project in src/data/projects.ts."
          action={
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="btn btn-secondary mt-2"
            >
              Show all projects
            </button>
          }
        />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={Math.min(index, 5) * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}

      {isUsableLink(siteConfig.links.github) && (
        <Reveal delay={120}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
            Not everything is listed here.
            <ExternalLink
              href={siteConfig.links.github}
              ariaLabel="Browse all repositories on GitHub"
              className="btn btn-secondary"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              Browse all repositories
            </ExternalLink>
          </p>
        </Reveal>
      )}
    </Section>
  );
}
