import { ArrowRight, Download, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { projects } from '../../data/projects';
import { cn, isUsableLink } from '../../lib/utils';
import { SmartImage } from '../ui/SmartImage';
import { SocialLinks } from '../ui/SocialLinks';

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ block: 'start' });
}

export function Hero() {
  const hasPhoto = isUsableLink(siteConfig.profileImage);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-backdrop opacity-[0.55]" />
        <div className="absolute inset-0 hero-glow" />
      </div>

      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="reveal reveal-visible min-w-0">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {siteConfig.availability}
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl"
            >
              {siteConfig.name}
            </h1>

            <p className="mt-4 font-mono text-base text-accent sm:text-lg">
              {siteConfig.headline}
              <span aria-hidden="true" className="animate-caret ml-1 inline-block">
                _
              </span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.tagline}
            </p>

            {siteConfig.location && (
              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                {siteConfig.location}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={scrollToProjects} className="btn btn-primary">
                View my projects
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              {isUsableLink(siteConfig.resume) && (
                <a
                  href={siteConfig.resume}
                  download={`${siteConfig.name.replace(/\s+/g, '-')}-Resume.pdf`}
                  className="btn btn-secondary"
                  aria-label={`Download ${siteConfig.name}'s resume as a PDF`}
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download resume
                </a>
              )}
            </div>

            <SocialLinks className="mt-6" />
          </div>

          <div
            className={cn('reveal reveal-visible min-w-0', 'lg:justify-self-end')}
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {hasPhoto ? <ProfileCard /> : <CodeCard />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[1.75rem] bg-accent/10 blur-2xl"
      />
      <SmartImage
        src={siteConfig.profileImage}
        alt={`Portrait of ${siteConfig.name}`}
        loading="eager"
        wrapperClassName="relative aspect-4/5 rounded-[1.5rem] border border-border shadow-card"
      />
    </div>
  );
}

function CodeCard() {
  return (
    <div className="card mx-auto w-full max-w-md overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-muted">developer.py</span>
      </div>

      {/* The <pre> is decorative detail; the same facts are stated in the copy
          and in the About section, so screen readers are not missing anything. */}
      <pre
        aria-hidden="true"
        className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-relaxed"
      >
        <code className="text-muted">
          <span className="text-accent">class</span>{' '}
          <span className="text-text">Developer</span>:{'\n'}
          {'    '}name = <span className="text-accent">&quot;{siteConfig.name}&quot;</span>
          {'\n'}
          {'    '}role = <span className="text-accent">&quot;{siteConfig.role}&quot;</span>
          {'\n'}
          {'    '}stack = [<span className="text-accent">&quot;Python&quot;</span>,{' '}
          <span className="text-accent">&quot;JavaScript&quot;</span>,{' '}
          <span className="text-accent">&quot;SQL&quot;</span>]{'\n'}
          {'    '}projects = <span className="text-accent">{projects.length}</span>
          {'\n\n'}
          {'    '}
          <span className="text-accent">def</span> <span className="text-text">status</span>
          (self):{'\n'}
          {'        '}
          <span className="text-accent">return</span>{' '}
          <span className="text-accent">&quot;building &amp; learning&quot;</span>
          <span className="animate-caret ml-0.5 inline-block text-text">▌</span>
        </code>
      </pre>
    </div>
  );
}
