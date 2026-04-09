import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brand, nav } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isBlog = location.pathname.startsWith('/blog');

  // Scrollspy on home only
  useEffect(() => {
    if (!isHome) return;
    const ids = nav.links.map((l) => l.section).filter((s) => s !== 'blog');
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function isActive(link) {
    if (link.section === 'blog') return isBlog;
    return isHome && active === link.section;
  }

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-all ${
        scrolled
          ? 'bg-white/95 border-b border-slate-200 shadow-sm'
          : 'bg-white/80 border-b border-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group min-w-0">
          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 text-white font-display font-bold">
            ☀
          </span>
          <span className="flex flex-col leading-tight min-w-0">
            <span className="font-display font-bold text-brand-900 text-sm sm:text-base truncate">{brand.name}</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 truncate">
              parte de {brand.parent}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.links.map((l) => {
            const act = isActive(l);
            return (
              <Link
                key={l.href}
                to={l.href}
                aria-current={act ? 'page' : undefined}
                className={`relative text-sm font-medium px-3 py-2 rounded-lg transition ${
                  act ? 'text-brand-900' : 'text-slate-600 hover:text-brand-900 hover:bg-slate-50'
                }`}
              >
                {l.label}
                <span
                  className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-sun-500 transition-all ${
                    act ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link to="/#consulta" className="hidden lg:inline-flex btn-accent !py-2 !px-5 text-sm ml-3">
          {nav.cta}
        </Link>

        <button
          className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container-page py-3 flex flex-col gap-1">
            {nav.links.map((l) => {
              const act = isActive(l);
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 rounded-lg font-medium ${
                    act ? 'bg-brand-50 text-brand-900' : 'text-slate-700 hover:text-brand-900 hover:bg-slate-50'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/#consulta"
              onClick={() => setOpen(false)}
              className="btn-accent mt-2 w-full"
            >
              {nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
