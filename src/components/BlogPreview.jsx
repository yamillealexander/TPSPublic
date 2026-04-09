import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Reveal from './Reveal';

export default function BlogPreview() {
  // Show up to 3 most recent posts
  const featured = posts.slice(0, 3);

  return (
    <section id="blog" className="section bg-slate-50">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            Blog
          </span>
          <h2 className="section-heading mt-3">Artículos para dueños de hogar</h2>
          <p className="section-subheading">
            Guías y artículos para entender la energía solar paso a paso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col h-full"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${post.cover.gradient} relative`}>
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-white/95 text-brand-900 px-2 py-1 rounded-full font-bold">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-brand-900 transition">{post.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <span className="text-brand-900 font-semibold text-sm">Leer artículo →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/blog" className="btn-outline">Ver todos los artículos</Link>
        </div>
      </div>
    </section>
  );
}
