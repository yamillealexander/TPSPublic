import { Link } from 'react-router-dom';
import { brand, footer, nav } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-page py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sun-500 text-slate-900 font-display font-bold">
              ☀
            </span>
            <span className="font-display font-bold text-white">{brand.name}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{footer.about}</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-sun-400 transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contáctanos</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${brand.email}`} className="hover:text-sun-400 transition">
                {brand.email}
              </a>
            </li>
            <li className="text-slate-400">{brand.phone}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {footer.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="h-9 w-9 rounded-full bg-slate-800 hover:bg-sun-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition"
                aria-label={s.label}
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page py-6 text-xs text-slate-500 space-y-2">
          <p>{footer.disclaimer}</p>
          <p>{footer.rightsLine}</p>
        </div>
      </div>
    </footer>
  );
}
