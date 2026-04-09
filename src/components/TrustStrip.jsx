const items = [
  { icon: '🎓', label: 'Educación independiente' },
  { icon: '💬', label: 'Consulta 100% gratis' },
  { icon: '🚫', label: 'No vendemos paneles' },
  { icon: '🇵🇷', label: 'Servimos toda la isla' },
];

export default function TrustStrip() {
  return (
    <div className="bg-white border-y border-slate-100">
      <div className="container-page py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm sm:text-base">
          {items.map((it) => (
            <li
              key={it.label}
              className="flex items-center gap-2 text-slate-700 font-medium"
            >
              <span aria-hidden="true" className="text-xl">{it.icon}</span>
              <span>{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
