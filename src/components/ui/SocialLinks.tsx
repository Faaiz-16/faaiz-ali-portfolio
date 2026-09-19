import { Mail } from 'lucide-react';
import type { AnyIcon } from '../../lib/icons';
import { Github, Linkedin, Twitter } from './BrandIcons';
import { siteConfig } from '../../data/site';
import { cn, isUsableLink, mailtoLink } from '../../lib/utils';
import { ExternalLink } from './ExternalLink';

interface SocialLinksProps {
  className?: string;
  /** Icon box size. */
  size?: 'sm' | 'md';
}

interface SocialEntry {
  label: string;
  href: string;
  Icon: AnyIcon;
  newTab: boolean;
}

export function SocialLinks({ className, size = 'md' }: SocialLinksProps) {
  const entries: SocialEntry[] = [
    { label: 'GitHub profile', href: siteConfig.links.github, Icon: Github, newTab: true },
    {
      label: 'LinkedIn profile',
      href: siteConfig.links.linkedin,
      Icon: Linkedin,
      newTab: true,
    },
    {
      label: 'X (Twitter) profile',
      href: siteConfig.links.twitter,
      Icon: Twitter,
      newTab: true,
    },
    {
      label: 'Send an email',
      href: isUsableLink(siteConfig.email) ? mailtoLink(siteConfig.email) : '',
      Icon: Mail,
      newTab: false,
    },
  ].filter((entry) => isUsableLink(entry.href));

  if (entries.length === 0) return null;

  const boxSize = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {entries.map(({ label, href, Icon, newTab }) => (
        <li key={label}>
          <ExternalLink
            href={href}
            ariaLabel={label}
            newTab={newTab}
            className={cn(
              boxSize,
              'flex items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent',
            )}
          >
            <Icon aria-hidden="true" className={iconSize} />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
