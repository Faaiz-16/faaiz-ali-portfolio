import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { cn } from '../../lib/utils';

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds. Keep it under ~300ms so it stays snappy. */
  delay?: number;
  className?: string;
  /** Render as a different element, e.g. 'li' inside a list. */
  as?: 'div' | 'li' | 'section' | 'article';
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  /* `as` is a runtime tag name, so the element rendered is whichever tag was
     asked for. The cast only tells TypeScript which ref type to expect, which
     saves every caller from having to declare it. */
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={cn('reveal', isVisible && 'reveal-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
