import { certifications } from '../data/certifications';
import { education } from '../data/education';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { siteConfig } from '../data/site';

const PLACEHOLDER = /TODO|_HERE|example\.com/i;

function findPlaceholders(value: unknown, path: string, found: string[]): void {
  if (typeof value === 'string') {
    if (PLACEHOLDER.test(value)) found.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => findPlaceholders(item, `${path}[${index}]`, found));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      findPlaceholders(child, `${path}.${key}`, found);
    }
  }
}

export function reportPlaceholders(): void {
  if (!import.meta.env.DEV) return;

  const found: string[] = [];
  findPlaceholders(siteConfig, 'site.ts', found);
  findPlaceholders(projects, 'projects.ts', found);
  findPlaceholders(experiences, 'experience.ts', found);
  findPlaceholders(education, 'education.ts', found);
  findPlaceholders(certifications, 'certifications.ts', found);

  if (found.length === 0) {
    // eslint-disable-next-line no-console
    console.info('%c✓ Portfolio: no placeholders left. Nice.', 'color:#16a34a');
    return;
  }

  /* eslint-disable no-console */
  console.groupCollapsed(
    `%c⚠ Portfolio: ${found.length} placeholder value(s) still to replace`,
    'color:#d97706;font-weight:600',
  );
  console.info('Edit the files in src/data/ — see CUSTOMIZATION.md for help.');
  found.forEach((path) => console.info('•', path));
  console.groupEnd();
  /* eslint-enable no-console */
}
