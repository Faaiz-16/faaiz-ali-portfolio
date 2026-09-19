import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  /** Optional action, e.g. a "Show all" button. */
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-14 text-center">
      <Inbox aria-hidden="true" className="h-8 w-8 text-muted opacity-60" />
      <p className="font-semibold text-text">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
