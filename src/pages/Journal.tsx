import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { journalPosts } from '../data/content';

const categories = ['All', 'Scent Guides', 'Behind the Scenes', 'Trends', 'How-To'] as const;

export function Journal() {
  const { navigate } = useStore();
  const [category, setCategory] = useState<typeof categories[number]>('All');

  const filtered = category === 'All' ? journalPosts : journalPosts.filter((p) => p.category === category);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10 text-center">
        <p className="eyebrow">The Journal</p>
        <h1 className="heading-lg mt-3 text-balance">Scent guides, stories, and the craft behind the bottle</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-600 dark:text-ink-400 text-pretty">
          How to choose a fragrance, what we are making next, and the people and places behind every bottle.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
              category === c
                ? 'border-gold-500 bg-gold-500 text-ink-900'
                : 'border-ink-300 text-ink-700 hover:border-gold-500 dark:border-ink-700 dark:text-ink-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured && (
        <article className="mb-12">
          <button
            onClick={() => navigate({ name: 'journal-post', slug: featured.slug })}
            className="group grid w-full overflow-hidden rounded-3xl border border-ink-200/60 text-left dark:border-ink-800/60 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-ink-50/90 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-900 backdrop-blur">{featured.category}</span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-xs text-ink-500 dark:text-ink-400">{featured.date} · {featured.readTime} read</p>
              <h2 className="heading-lg mt-3 text-balance group-hover:text-gold-600 dark:group-hover:text-gold-300">{featured.title}</h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300 text-pretty">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-600 dark:text-gold-300">
                Read Article <ArrowRight size={12} />
              </span>
            </div>
          </button>
        </article>
      )}

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article key={post.id} className="group flex flex-col">
            <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="block overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-full bg-ink-50/90 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-900 backdrop-blur">{post.category}</span>
              </div>
            </button>
            <div className="mt-4 flex flex-1 flex-col">
              <p className="text-xs text-ink-500 dark:text-ink-400">{post.date} · {post.readTime}</p>
              <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="mt-1 text-left">
                <h3 className="heading-sm transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-300">{post.title}</h3>
              </button>
              <p className="mt-2 line-clamp-3 text-sm text-ink-600 dark:text-ink-400">{post.excerpt}</p>
              <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="btn-link mt-auto pt-4">
                Read Article <ArrowRight size={12} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
