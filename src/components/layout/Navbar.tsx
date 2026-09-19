import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { siteConfig } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import type { Theme } from '../../hooks/useTheme';
import { cn, isUsableLink } from '../../lib/utils';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled(16);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(isHome ? sectionIds : []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  /**
   * Scroll to a section. If we are on a project or 404 page we go back to the
   * homepage first, then scroll — so the navbar works from every route.
   */
  const goToSection = useCallback(
    (id: string) => {
      setIsMenuOpen(false);
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
        /* Keep the URL shareable without triggering a second jump. */
        window.history.replaceState(null, '', `#${id}`);
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    },
    [isHome, navigate],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Main"
        className="container-content flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
      >
        <button
          type="button"
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0 });
              window.history.replaceState(null, '', '/');
            } else {
              navigate('/');
            }
          }}
          className="group flex shrink-0 items-center gap-2.5 rounded-lg"
          aria-label={`${siteConfig.name} — back to top`}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-accent-contrast transition-transform group-hover:scale-105"
          >
            {siteConfig.initials}
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight text-text sm:inline">
            {siteConfig.name}
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goToSection(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-accent' : 'text-muted hover:text-text',
                  )}
                >
                  {item.label}
                  {/* Underline is decorative; `aria-current` carries the meaning. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {isUsableLink(siteConfig.resume) && (
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !min-h-[2.25rem] !px-4 !py-1.5 text-sm sm:inline-flex"
            >
              Resume
            </a>
          )}

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:border-accent lg:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Tapping anywhere outside the panel closes it. It is hidden from
          screen readers because Escape and the close button already do the
          same job for keyboard users. */}
      {isMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 -z-10 bg-text/20 lg:hidden"
        />
      )}

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="border-t border-border bg-bg/95 backdrop-blur-lg lg:hidden"
      >
        <ul className="container-content flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToSection(item.id)}
                aria-current={isHome && activeSection === item.id ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium transition-colors',
                  isHome && activeSection === item.id
                    ? 'bg-accent-soft text-accent'
                    : 'text-muted hover:bg-surface-2 hover:text-text',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
          {isUsableLink(siteConfig.resume) && (
            <li className="mt-2">
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                View resume
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-[18px] w-[18px]" />
      ) : (
        <Moon aria-hidden="true" className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
