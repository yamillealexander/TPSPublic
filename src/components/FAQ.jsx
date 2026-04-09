import { useState } from 'react';
import { faq } from '../data/content';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="section bg-slate-50">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {faq.eyebrow}
          </span>
          <h2 className="section-heading mt-3">{faq.title}</h2>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span>{item.q}</span>
                  <span className={`text-brand-900 text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
