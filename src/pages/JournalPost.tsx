import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useStore } from '../store';
import { getPost, journalPosts } from '../data/content';

export function JournalPost({ slug }: { slug: string }) {
  const { navigate } = useStore();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="heading-lg">Article not found</h1>
        <button onClick={() => navigate({ name: 'journal' })} className="btn-primary mt-6">Back to Journal</button>
      </div>
    );
  }

  const more = journalPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-luxe relative flex min-h-[55vh] items-end pb-12 pt-32">
          <div className="max-w-2xl">
            <button onClick={() => navigate({ name: 'journal' })} className="btn-link mb-4 !text-ink-100 hover:!text-gold-300">
              <ArrowLeft size={12} /> The Journal
            </button>
            <span className="rounded-full bg-ink-50/90 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-900">{post.category}</span>
            <h1 className="heading-lg mt-4 text-ink-50 text-balance">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-ink-100/80">
              <span>By {post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-luxe py-16">
        <div className="mx-auto max-w-2xl">
          <p className="font-display text-2xl italic leading-relaxed text-ink-700 dark:text-ink-200 text-pretty">{post.excerpt}</p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-700 dark:text-ink-200 text-pretty">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 flex items-center gap-4 border-t border-ink-200/60 pt-6 dark:border-ink-800/60">
            <span className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">Share</span>
            {['Instagram', 'Pinterest', 'Twitter', 'Copy Link'].map((s) => (
              <button key={s} className="text-xs uppercase tracking-widest text-ink-600 hover:text-gold-600 dark:text-ink-300">{s}</button>
            ))}
          </div>
        </div>
      </section>

      {/* More */}
      <section className="container-luxe pb-20">
        <h2 className="heading-sm mb-6">Keep Reading</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {more.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate({ name: 'journal-post', slug: p.slug })}
              className="group flex gap-4 overflow-hidden rounded-2xl border border-ink-200/60 p-4 text-left dark:border-ink-800/60"
            >
              <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-300">{p.category}</p>
                <h3 className="heading-sm mt-1 transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-300">{p.title}</h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs uppercase tracking-widest text-ink-500">Read <ArrowRight size={10} /></span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
