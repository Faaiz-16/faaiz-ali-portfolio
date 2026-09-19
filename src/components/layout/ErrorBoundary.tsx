import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('Rendering error:', error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="card max-w-md p-8 text-center">
          <AlertTriangle aria-hidden="true" className="mx-auto h-8 w-8 text-accent" />
          <h1 className="mt-4 text-xl font-bold text-text">Something went wrong</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The page hit an unexpected error. Reloading usually fixes it.
          </p>
          {import.meta.env.DEV && this.state.message && (
            <p className="mt-4 rounded-lg bg-surface-2 p-3 text-left font-mono text-xs break-words text-muted">
              {this.state.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-primary mt-6"
          >
            Reload the page
          </button>
        </div>
      </main>
    );
  }
}
