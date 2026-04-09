import { altContact, brand } from '../data/content';
import Reveal from './Reveal';

const ICONS = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S6 8.5 6 9.9s1 2.8 1.2 3c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.2-.6-.4Z"/>
      <path d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3Zm-8.5 18.4h-.1c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C2 6.5 6.5 2 12 2c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 9.9-10 9.9Z"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 6L12 13 2 6"/>
    </svg>
  ),
};

const ACCENTS = {
  whatsapp: 'from-emerald-400 to-emerald-600',
  phone:    'from-brand-500 to-brand-900',
  email:    'from-sun-400 to-sun-600',
};

function hrefFor(kind) {
  if (kind === 'whatsapp') return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Hola, me gustaría una consulta sobre energía solar para mi hogar.')}`;
  if (kind === 'phone')    return `tel:${brand.phone.replace(/[^0-9+]/g, '')}`;
  if (kind === 'email')    return `mailto:${brand.email}`;
  return '#';
}

function valueFor(kind) {
  if (kind === 'whatsapp') return 'Chat directo';
  if (kind === 'phone')    return brand.phone;
  if (kind === 'email')    return brand.email;
  return '';
}

export default function AltContact() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="container-page max-w-4xl">
        <Reveal>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {altContact.title}
            </h3>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">{altContact.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {altContact.methods.map((m) => (
              <a
                key={m.kind}
                href={hrefFor(m.kind)}
                target={m.kind === 'whatsapp' ? '_blank' : undefined}
                rel={m.kind === 'whatsapp' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-500 hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div
                  className={`h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${ACCENTS[m.kind]} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                >
                  <span className="h-6 w-6 block">{ICONS[m.kind]}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    {m.label}
                  </div>
                  <div className="font-bold text-slate-900 truncate">{valueFor(m.kind)}</div>
                  <div className="text-xs text-slate-500">{m.detail}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
