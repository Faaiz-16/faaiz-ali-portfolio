import {
  ArrowLeft,
  ExternalLink as ExternalIcon,
  Lightbulb,
  Star,
  Target,
} from 'lucide-react';
import { Github } from '../components/ui/BrandIcons';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProjectBySlug, projects } from '../data/projects';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isPlaceholderText, isUsableLink, withoutPlaceholders } from '../lib/utils';
import { ExternalLink } from '../components/ui/ExternalLink';
import { Reveal } from '../components/ui/Reveal';
import { SmartImage } from '../components/ui/SmartImage';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  /* Unknown slug → let the 404 route handle it. */
  if (!project) return <Navigate to="/404" replace />;

  const features = withoutPlaceholders(project.features);
  const learnings = withoutPlaceholders(project.learnings);
  const hasProblem = project.problem && !isPlaceholderText(project.problem);
  const hasSolution = project.solution && !isPlaceholderText(project.solution);

  const otherProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <ProjectDetailBody
      key={project.slug}
      project={project}
      features={features}
      learnings={learnings}
      hasProblem={Boolean(hasProblem)}
      hasSolution={Boolean(hasSolution)}
      otherProjects={otherProjects}
    />
  );
}

/* Split out so the title hook runs unconditionally (Rules of Hooks). */
function ProjectDetailBody({
  project,
  features,
  learnings,
  hasProblem,
  hasSolution,
  otherProjects,
}: {
  project: NonNullable<ReturnType<typeof getProjectBySlug>>;
  features: string[];
  learnings: string[];
  hasProblem: boolean;
  hasSolution: boolean;
  otherProjects: ReturnType<typeof getProjectBySlug>[];
}) {
  useDocumentTitle(
    `${project.title} — ${siteConfig.name}`,
    isPlaceholderText(project.description) ? undefined : project.description,
  );

  return (
    <main className="pt-28 pb-20 md:pt-36">
      <article className="container-content max-w-4xl">
        <Link
          to="/"
          state={{ scrollTo: 'projects' }}
          className="btn btn-ghost -ml-3 !px-3 !text-sm"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All projects
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="tag !border-accent/30 !bg-accent-soft !text-accent">
                <Star aria-hidden="true" className="h-3 w-3" />
                Featured
              </span>
            )}
            {project.categories.map((category) => (
              <span key={category} className="tag">
                {category}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {project.title}
          </h1>

          <p
            className={
              isPlaceholderText(project.description)
                ? 'mt-4 text-lg leading-relaxed text-muted italic opacity-70'
                : 'mt-4 text-lg leading-relaxed text-muted'
            }
          >
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ExternalLink
              href={project.githubUrl}
              ariaLabel={`View the source code for ${project.title} on GitHub`}
              className="btn btn-primary"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              View source
            </ExternalLink>
            <ExternalLink
              href={project.liveUrl}
              ariaLabel={`Open the live demo of ${project.title}`}
              className="btn btn-secondary"
            >
              <ExternalIcon aria-hidden="true" className="h-4 w-4" />
              Live demo
            </ExternalLink>
            {!isUsableLink(project.githubUrl) && !isUsableLink(project.liveUrl) && (
              <p className="text-sm text-muted italic">
                Links for this project have not been added yet.
              </p>
            )}
          </div>
        </header>

        {isUsableLink(project.image) && (
          <Reveal className="mt-10">
            <SmartImage
              src={project.image}
              alt={project.imageAlt || `Screenshot of ${project.title}`}
              loading="eager"
              wrapperClassName="aspect-16/9 rounded-card border border-border shadow-card"
            />
          </Reveal>
        )}

        {project.technologies.length > 0 && (
          <Reveal className="mt-10">
            <h2 className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
              Built with
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="tag !px-3 !py-1.5 !text-[0.8125rem]">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {(hasProblem || hasSolution) && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {hasProblem && (
              <Reveal>
                <div className="card h-full p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-text">
                    <Target aria-hidden="true" className="h-4 w-4 text-accent" />
                    The problem
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.problem}
                  </p>
                </div>
              </Reveal>
            )}
            {hasSolution && (
              <Reveal delay={80}>
                <div className="card h-full p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-text">
                    <Lightbulb aria-hidden="true" className="h-4 w-4 text-accent" />
                    What I built
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.solution}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        )}

        {features.length > 0 && (
          <Reveal className="mt-10">
            <h2 className="text-xl font-bold text-text">Features</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="card flex gap-3 p-4 text-sm text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {learnings.length > 0 && (
          <Reveal className="mt-10">
            <h2 className="text-xl font-bold text-text">What I took away from it</h2>
            <ul className="mt-4 space-y-2.5">
              {learnings.map((learning) => (
                <li
                  key={learning}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {learning}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {otherProjects.length > 0 && (
          <Reveal className="mt-16 border-t border-border pt-10">
            <h2 className="text-sm font-semibold text-text">More projects</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {otherProjects.map((other) =>
                other ? (
                  <li key={other.slug}>
                    <Link
                      to={`/projects/${other.slug}`}
                      className="card card-interactive flex h-full items-center justify-between gap-3 p-4"
                    >
                      <span className="text-sm font-medium text-text">{other.title}</span>
                      <ExternalIcon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 rotate-45 text-muted"
                      />
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </Reveal>
        )}
      </article>
    </main>
  );
}
