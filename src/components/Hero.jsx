import { hero } from '../data/content';

function HeroIllustration() {
  return (
    <div className="relative w-64 sm:w-80 lg:w-full lg:max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        role="img"
        aria-label="Ilustración: hogar con paneles solares y sol brillante"
      >
        <defs>
          <radialGradient id="sky" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#FFE9A8" />
            <stop offset="55%" stopColor="#9FC8FF" />
            <stop offset="100%" stopColor="#1e5bb8" />
          </radialGradient>
          <linearGradient id="sunG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE17A" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>
          <linearGradient id="panelG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0b3d91" />
          </linearGradient>
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Sky background circle */}
        <circle cx="200" cy="200" r="190" fill="url(#sky)" />

        {/* Sun with rays */}
        <g>
          <circle cx="305" cy="105" r="38" fill="url(#sunG)" />
          <g stroke="#FFD24D" strokeWidth="4" strokeLinecap="round">
            <line x1="305" y1="40"  x2="305" y2="55"  />
            <line x1="305" y1="155" x2="305" y2="170" />
            <line x1="240" y1="105" x2="255" y2="105" />
            <line x1="355" y1="105" x2="370" y2="105" />
            <line x1="258" y1="58"  x2="269" y2="69"  />
            <line x1="341" y1="141" x2="352" y2="152" />
            <line x1="258" y1="152" x2="269" y2="141" />
            <line x1="341" y1="69"  x2="352" y2="58"  />
          </g>
        </g>

        {/* Cloud */}
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="105" cy="120" rx="35" ry="14" />
          <ellipse cx="130" cy="112" rx="22" ry="14" />
          <ellipse cx="80"  cy="115" rx="18" ry="12" />
        </g>

        {/* Ground */}
        <path d="M0 320 Q200 290 400 320 L400 400 L0 400 Z" fill="url(#grass)" />

        {/* House body */}
        <rect x="115" y="220" width="170" height="110" rx="4" fill="#fdf6e3" stroke="#1f2937" strokeWidth="3"/>
        {/* Roof */}
        <path d="M95 225 L200 145 L305 225 Z" fill="#b91c1c" stroke="#1f2937" strokeWidth="3" strokeLinejoin="round"/>
        {/* Door */}
        <rect x="185" y="265" width="35" height="65" rx="2" fill="#0b3d91" stroke="#1f2937" strokeWidth="2"/>
        <circle cx="213" cy="298" r="2" fill="#FFD24D" />
        {/* Windows */}
        <rect x="135" y="245" width="35" height="35" rx="2" fill="#bfdbfe" stroke="#1f2937" strokeWidth="2"/>
        <line x1="152" y1="245" x2="152" y2="280" stroke="#1f2937" strokeWidth="2"/>
        <line x1="135" y1="262" x2="170" y2="262" stroke="#1f2937" strokeWidth="2"/>
        <rect x="235" y="245" width="35" height="35" rx="2" fill="#bfdbfe" stroke="#1f2937" strokeWidth="2"/>
        <line x1="252" y1="245" x2="252" y2="280" stroke="#1f2937" strokeWidth="2"/>
        <line x1="235" y1="262" x2="270" y2="262" stroke="#1f2937" strokeWidth="2"/>

        {/* Solar panels on roof — angled rectangle made of grid cells */}
        <g transform="translate(143 168) rotate(-37)">
          <rect x="0" y="0" width="120" height="55" fill="url(#panelG)" stroke="#0b1f4d" strokeWidth="2" rx="2"/>
          {/* grid lines */}
          <g stroke="#3b82f6" strokeWidth="1.2" opacity="0.7">
            <line x1="30"  y1="0" x2="30"  y2="55" />
            <line x1="60"  y1="0" x2="60"  y2="55" />
            <line x1="90"  y1="0" x2="90"  y2="55" />
            <line x1="0"   y1="18" x2="120" y2="18" />
            <line x1="0"   y1="37" x2="120" y2="37" />
          </g>
          {/* shine */}
          <polygon points="0,0 30,0 10,55 0,55" fill="#ffffff" opacity="0.08"/>
        </g>

        {/* Small palm tree (PR vibe) */}
        <g transform="translate(335 280)">
          <rect x="-4" y="0" width="8" height="50" fill="#92400e" />
          <path d="M0 0 Q-25 -12 -40 -5 Q-22 -2 0 0" fill="#16a34a"/>
          <path d="M0 0 Q25 -12 40 -5 Q22 -2 0 0" fill="#16a34a"/>
          <path d="M0 0 Q-15 -28 -25 -32 Q-12 -18 0 0" fill="#16a34a"/>
          <path d="M0 0 Q15 -28 25 -32 Q12 -18 0 0" fill="#16a34a"/>
        </g>
      </svg>

      {/* Caption pill */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-100 whitespace-nowrap">
        ☀️ Tu hogar, tu decisión
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sun-400 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-100 blur-3xl" />
      </div>

      <div className="container-page py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sun-600 bg-sun-500/10 px-3 py-1 rounded-full mb-4 sm:mb-5">
            {hero.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-5 sm:mb-6 break-words">
            {hero.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-7 sm:mb-8 max-w-xl mx-auto lg:mx-0">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <a href="#consulta" className="btn-accent">{hero.primaryCta}</a>
            <a href="#educacion" className="btn-outline">{hero.secondaryCta}</a>
          </div>
        </div>

        <div className="relative order-first lg:order-none">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
