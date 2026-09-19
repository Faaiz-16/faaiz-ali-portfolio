import { ArrowLeft, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  const location = useLocation();
  useDocumentTitle(
    `Page not found — ${siteConfig.name}`,
    'This page does not exist. Head back to the homepage.',
  );

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hero-glow"
      />

      <div className="w-full max-w-lg text-center">
        <p className="font-mono text-7xl font-bold text-accent sm:text-8xl">404</p>

        <h1 className="mt-6 text-2xl font-bold text-text sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          There is nothing at this address. It may have moved, or the link might have a typo
          in it.
        </p>

        <p className="mt-5 inline-block max-w-full truncate rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted">
          {location.pathname}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            <Home aria-hidden="true" className="h-4 w-4" />
            Back to homepage
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
