import { educators } from '../data/educators';
import Reveal from './Reveal';

export default function Educators() {
  return (
    <section id="educadores" className="section bg-slate-50">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            Conoce a tus Educadores
          </span>
          <h2 className="section-heading mt-3">Las personas detrás del contenido</h2>
          <p className="section-subheading">
            Profesionales con experiencia real ayudándote a tomar mejores decisiones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educators.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left h-full hover:shadow-lg transition"
            >
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-24 w-24 flex-shrink-0 rounded-full object-cover object-[50%_20%] ring-4 ring-brand-100"
                />
              ) : (
                <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gradient-to-br from-brand-900 to-sun-500 flex items-center justify-center text-white font-display font-bold text-2xl ring-4 ring-brand-100">
                  {p.initials}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="text-sm text-sun-600 font-semibold mb-3">{p.role}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{p.bio}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
