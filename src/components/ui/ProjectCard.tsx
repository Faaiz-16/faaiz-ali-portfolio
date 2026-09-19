import { ArrowUpRight, ExternalLink as ExternalIcon, Star } from 'lucide-react';
import { Github } from './BrandIcons';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/types';
import { isPlaceholderText, isUsableLink } from '../../lib/utils';
import { ExternalLink } from './ExternalLink';
import { SmartImage } from './SmartImage';

interface ProjectCardProps {
  project: Project;
}

/** Show at most this many tags on the card; the rest are counted. */
const MAX_TAGS = 4;

export function ProjectCard({ project }: ProjectCardProps) {
  const tags = project.technologies.slice(0, MAX_TAGS);
  const hiddenTagCount = project.technologies.length - tags.length;
  const descriptionIsPlaceholder = isPlaceholderText(project.description);

  return (
    <article className="card card-interactive group relative flex h-full flex-col overflow-hidden">
      <SmartImage
        src={project.image}
        alt={project.imageAlt || `Screenshot of ${project.title}`}
        wrapperClassName="aspect-16/10 border-b border-border"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        fallbackLabel={`/images/projects/${project.slug}.png`}
      />

      <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-2">
        {project.featured && (
          <span className="tag !border-accent/30 !bg-accent-soft !text-accent backdrop-blur">
            <Star aria-hidden="true" className="h-3 w-3" />
            Featured
          </span>
        )}
        {project.status && <span className="tag backdrop-blur">{project.status}</span>}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-text">
          {/* This link covers the whole card via the ::after pseudo-element. */}
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p
          className={
            descriptionIsPlaceholder
              ? 'mt-2 text-sm leading-relaxed text-muted italic opacity-70'
              : 'mt-2 text-sm leading-relaxed text-muted'
          }
        >
          {project.description}
        </p>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
            {hiddenTagCount > 0 && <li className="tag">+{hiddenTagCount}</li>}
          </ul>
        )}

        <div aria-hidden="true" className="h-5" />

        <div className="mt-auto flex items-center gap-1 border-t border-border pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="btn btn-ghost relative z-10 !min-h-[2.25rem] !px-2.5 !text-sm !text-accent"
          >
            Details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>

          <span className="flex-1" />

          {isUsableLink(project.githubUrl) && (
            <ExternalLink
              href={project.githubUrl}
              ariaLabel={`View the source code for ${project.title} on GitHub`}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              <Github aria-hidden="true" className="h-[18px] w-[18px]" />
            </ExternalLink>
          )}
          {isUsableLink(project.liveUrl) && (
            <ExternalLink
              href={project.liveUrl}
              ariaLabel={`Open the live demo of ${project.title}`}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              <ExternalIcon aria-hidden="true" className="h-[18px] w-[18px]" />
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
