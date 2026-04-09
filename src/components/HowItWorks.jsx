import { howItWorks } from '../data/content';
import Reveal from './Reveal';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section bg-white">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {howItWorks.eyebrow}
          </span>
          <h2 className="section-heading mt-3">{howItWorks.title}</h2>
          <p className="section-subheading">{howItWorks.subtitle}</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-brand-100 via-sun-400 to-brand-100"
          />

          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="relative text-center px-2">
                <div className="relative mx-auto h-18 w-18 mb-5 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-brand-50" />
                  <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-brand-900 to-brand-700 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-lg ring-4 ring-white">
                    {step.number}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#consulta" className="btn-accent">
            Solicita tu Consulta Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
