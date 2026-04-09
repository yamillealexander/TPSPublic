import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPost } from '../data/posts';

function formatDate(iso) {
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const d = new Date(iso);
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-4">{block.text}</h2>;
    case 'p':
      return <p className="text-lg leading-relaxed text-slate-700 mb-5">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-3 mb-6 pl-1">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-slate-700 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sun-500" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="my-8 rounded-2xl border-l-4 border-sun-500 bg-sun-500/10 p-5 text-slate-800 italic">
          {block.text}
        </div>
      );
    case 'cta':
      return (
        <div className="my-12 rounded-3xl bg-gradient-to-br from-brand-900 to-brand-700 text-white p-8 sm:p-10 text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-2">{block.text}</h3>
          <p className="text-white/90 mb-6">{block.body}</p>
          <Link to={block.href} className="btn-accent">{block.button}</Link>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (post) document.title = `${post.title} — Tus Placas Seguras`;
    return () => { document.title = 'Tus Placas Seguras — Energía Solar para tu Hogar en PR'; };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="bg-white">
      {/* Hero */}
      <header className={`bg-gradient-to-br ${post.cover.gradient} text-white`}>
        <div className="container-page max-w-3xl py-16 sm:py-20">
          <Link to="/blog" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-6">
            <span aria-hidden="true">←</span> Volver al blog
          </Link>
          <span className="inline-block text-[10px] uppercase tracking-wider bg-white/15 text-white px-3 py-1 rounded-full font-bold mb-5">
            {post.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 text-white">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/85">
            {post.authorPhoto && (
              <img
                src={post.authorPhoto}
                alt={post.author}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/40 shadow-lg flex-shrink-0"
              />
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Por <strong className="text-white">{post.author}</strong>{post.authorRole && `, ${post.authorRole}`}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} de lectura</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-page max-w-3xl py-12 sm:py-16">
        {post.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/blog" className="text-brand-900 font-semibold hover:underline">
            ← Más artículos
          </Link>
          <Link to="/#consulta" className="btn-primary">
            Solicita tu Consulta
          </Link>
        </div>
      </div>
    </article>
  );
}
