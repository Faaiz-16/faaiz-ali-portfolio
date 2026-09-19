export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * A link is only usable if it is a non-empty string that is not one of the
 * placeholder values. Components use this to hide buttons instead of rendering
 * a link that goes nowhere.
 */
export function isUsableLink(url?: string): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed.length === 0) return false;
  return !/_HERE|^TODO/i.test(trimmed);
}

export function isPlaceholderText(value?: string): boolean {
  if (!value) return false;
  return /^TODO\b|_HERE/i.test(value.trim());
}

export function withoutPlaceholders(values?: string[]): string[] {
  return (values ?? []).filter((value) => !isPlaceholderText(value));
}

export function mailtoLink(email: string, subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${query}`;
}
