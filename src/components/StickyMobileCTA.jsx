import { useEffect, useState } from 'react';
import { brand } from '../data/content';

/**
 * Mobile-only sticky bottom bar.
 * - Hidden until user scrolls past the hero (~500px).
 * - Auto-hides when the consultation form section is in view (no point showing it).
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById('consulta');

    let formInView = false;

    const onScroll = () => {
      const past = window.scrollY > 500;
      setShow(past && !formInView);
    };

    let obs;
    if (formEl && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        ([entry]) => {
          formInView = entry.isIntersecting;
          onScroll();
        },
        { threshold: 0.15 }
      );
      obs.observe(formEl);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (obs) obs.disconnect();
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div className="bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)]">
        <div className="container-page py-3 flex items-center gap-3">
          <a
            href={`tel:${brand.phone.replace(/[^0-9+]/g, '')}`}
            aria-label="Llamar"
            className="h-12 w-12 flex-shrink-0 rounded-full bg-brand-50 text-brand-900 border border-brand-100 flex items-center justify-center hover:bg-brand-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
          <a href="#consulta" className="btn-accent flex-1 !py-3">
            Solicita tu Consulta
          </a>
        </div>
      </div>
    </div>
  );
}
