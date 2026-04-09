import { Link } from 'react-router-dom';
import { netMetering } from '../data/content';

export default function NetMetering() {
  return (
    <section id="medicion" className="section">
      <div className="container-page">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-900 to-brand-700 text-white p-6 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-sun-500/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sun-400 bg-white/10 px-3 py-1 rounded-full mb-4 sm:mb-5">
              {netMetering.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-white">
              {netMetering.title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">{netMetering.body}</p>
            <Link
              to="/blog/que-es-medicion-neta-en-puerto-rico"
              className="inline-flex items-center gap-2 text-sun-400 font-semibold hover:text-sun-300 transition"
            >
              Lee la guía completa <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
