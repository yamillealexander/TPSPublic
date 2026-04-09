import { learnTopics } from '../data/content';
import Reveal from './Reveal';

const ICONS = [
  // Sun (cómo funciona la energía solar)
  {
    bg: 'from-amber-300 to-sun-500',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  // Lightning (Medición Neta)
  {
    bg: 'from-brand-500 to-brand-900',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  // Dollar coin (financiamiento)
  {
    bg: 'from-emerald-400 to-emerald-600',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v12M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.2 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5" />
      </svg>
    ),
  },
  // Shield check (errores comunes)
  {
    bg: 'from-rose-400 to-rose-600',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function LearnTopics() {
  return (
    <section id="educacion" className="section bg-slate-50">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {learnTopics.eyebrow}
          </span>
          <h2 className="section-heading mt-3">{learnTopics.title}</h2>
          <p className="section-subheading">{learnTopics.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learnTopics.items.map((item, i) => {
            const icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 90}>
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition h-full">
                  <div
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${icon.bg} text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <span className="h-7 w-7 block">{icon.svg}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
