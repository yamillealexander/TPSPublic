import { about } from '../data/content';

export default function About() {
  return (
    <section id="sobre-nosotros" className="section bg-white">
      <div className="container-page max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          {about.eyebrow}
        </span>
        <h2 className="section-heading mt-3">{about.title}</h2>
        {about.body.map((p, i) => (
          <p key={i} className="text-lg text-slate-600 mt-4">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
