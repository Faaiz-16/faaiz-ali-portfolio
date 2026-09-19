import type { ReactNode } from 'react';
import { isUsableLink } from '../../lib/utils';

interface ExternalLinkProps {
  href?: string;
  children: ReactNode;
  className?: string;
  /** Spoken by screen readers, e.g. 'View StudentTechHub on GitHub'. */
  ariaLabel?: string;
  /** Set to false for mailto: / tel: links, which should stay in the tab. */
  newTab?: boolean;
}

export function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
  newTab = true,
}: ExternalLinkProps) {
  if (!isUsableLink(href)) return null;

  const isSameTab = !newTab || href.startsWith('mailto:') || href.startsWith('tel:');

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(isSameTab ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  );
}
