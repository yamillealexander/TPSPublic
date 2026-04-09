import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Reveal from '../components/Reveal';

function formatDate(iso) {
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const d = new Date(iso);
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

export default function BlogIndexPage() {
  return (
    <section className="section bg-slate-50 min-h-[60vh]">
      <div className="container-page max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            Blog
          </span>
          <h1 className="section-heading mt-3">Educación solar para tu hogar</h1>
          <p className="section-subheading">
            Artículos para entender cómo funciona la energía solar en Puerto Rico paso a paso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition h-full"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${post.cover.gradient} relative`}>
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-white/95 text-brand-900 px-2 py-1 rounded-full font-bold">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-500 mb-2">
                    {formatDate(post.date)} · {post.readTime} de lectura
                  </div>
                  <h2 className="font-bold text-xl leading-snug mb-3 group-hover:text-brand-900 transition">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-brand-900 font-semibold text-sm">
                    Leer artículo <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
