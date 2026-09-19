import { ArrowUp, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../data/navigation';
import { siteConfig } from '../../data/site';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="border-t border-border bg-surface-2/40">
      <div className="container-content py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-accent-contrast"
              >
                {siteConfig.initials}
              </span>
              <span className="font-semibold tracking-tight text-text">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.role}</p>
            <SocialLinks className="mt-5" size="sm" />
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
              Sections
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted sm:text-left">
            © {year} {siteConfig.name}
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
              Made with
              <Heart aria-hidden="true" className="h-3 w-3 fill-accent text-accent" />
              and a lot of debugging
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
