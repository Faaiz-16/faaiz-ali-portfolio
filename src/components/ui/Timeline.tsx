import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-border before:content-['']">
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  children: ReactNode;
  delay?: number;
  /** Fills the dot in solid, used to mark the current role or course. */
  active?: boolean;
}

export function TimelineItem({ children, delay = 0, active = false }: TimelineItemProps) {
  return (
    <Reveal as="li" delay={delay} className="relative pl-10">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-5 left-2 h-3.5 w-3.5 rounded-full border-2 border-bg ring-2',
          active ? 'bg-accent ring-accent' : 'bg-border ring-border',
        )}
      />
      {children}
    </Reveal>
  );
}
