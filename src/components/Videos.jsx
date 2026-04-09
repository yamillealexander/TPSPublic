import { videos } from '../data/content';
import Reveal from './Reveal';

export default function Videos() {
  return (
    <section id="videos" className="section">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {videos.eyebrow}
          </span>
          <h2 className="section-heading mt-3">{videos.title}</h2>
          <p className="section-subheading">{videos.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.items.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
            <div
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition h-full"
            >
              <div className="aspect-video bg-gradient-to-br from-brand-900 to-brand-500 flex items-center justify-center relative">
                <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-900 ml-1">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-sun-500 text-slate-900 px-2 py-1 rounded-full font-bold">
                  {videos.comingSoon}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-1">{v.title}</h3>
                <div className="text-xs text-slate-500">{v.duration}</div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
