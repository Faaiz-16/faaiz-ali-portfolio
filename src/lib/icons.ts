import type { ComponentType } from 'react';
import {
  Cloud,
  Code2,
  Database,
  LayoutGrid,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export const iconMap = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  database: Database,
  wrench: Wrench,
  cloud: Cloud,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof iconMap;

/**
 * The minimum shape every icon in this project satisfies — Lucide icons and
 * the hand-written brand icons in src/components/ui/BrandIcons.tsx alike.
 * Use this instead of Lucide's own `LucideIcon` when a component needs to
 * accept either kind.
 */
export type AnyIcon = ComponentType<{
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

/**
 * Safely resolve an icon name coming from a data file.
 * If the name is misspelled we fall back to a generic icon instead of
 * crashing the page.
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] ?? Code2;
}
