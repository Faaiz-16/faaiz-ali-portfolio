import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Lets keyboard users jump past the navbar. Visible only when focused. */}
      <a
        href="#main"
        className="sr-only-focusable btn btn-primary fixed top-4 left-4 z-[60]"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <div id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </>
  );
}

function RouteFallback() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
      />
    </div>
  );
}
