import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  /** Must match an entry in src/data/navigation.ts for the navbar to track it. */
  id: string;
  /** Small monospace label above the heading, e.g. '02'. Optional. */
  eyebrow?: string;
  title: string;
  /** One line of context under the heading. Optional. */
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** Adds a subtle alternate background so sections are easier to tell apart. */
  muted?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  muted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('section', muted && 'bg-surface-2/50', className)}
    >
      <div className="container-content">
        <Reveal>
          <header className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                <span aria-hidden="true" className="h-px w-6 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id={`${id}-heading`} className="text-3xl font-bold text-text sm:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
