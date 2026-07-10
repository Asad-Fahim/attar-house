import { ArrowRight, Compass, Leaf, Quote, Sparkles, Star } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { collections, testimonials, journalPosts } from '../data/content';
import { ProductCard } from '../components/ProductCard';
import { Bottle } from '../components/Bottle';
import { Stars } from '../components/Stars';
import { useReveal } from '../components/useReveal';
import { QuickView } from '../components/QuickView';
import { useState } from 'react';
import type { Product } from '../types';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

export function Home() {
  const { navigate } = useStore();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.new);

  return (
    <div className="grain">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
            alt="Atmospheric perfume bottle in mist"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/45 to-[rgb(var(--bg))]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-ink-950/15 to-transparent" />
        </div>

        {/* Floating mist orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-gold-200/10 blur-3xl animate-mist" />
          <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-rose-200/10 blur-3xl animate-mist" style={{ animationDelay: '3s' }} />
        </div>

        {/* Content */}
        <div className="container-luxe relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex animate-fade-down items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-gold-300 backdrop-blur-sm" style={{ animationDelay: '0.1s', opacity: 0 }}>
              The Art of Scent · Grasse, France
            </div>
            <h1 className="heading-xl mt-5 animate-fade-up text-ink-50 text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Discover Your<br />
              <span className="italic shimmer-text">Signature Scent</span>
            </h1>
            <p className="mt-6 max-w-lg animate-fade-up text-lg text-ink-100/95 text-pretty drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]" style={{ animationDelay: '0.4s', opacity: 0 }}>
              Artisanal perfumes built from real materials — rose petals picked at dawn in Grasse, oud aged in oak, amber distilled by hand. No shortcuts, no synthetics pretending to be nature.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '0.6s', opacity: 0 }}>
              <button onClick={() => navigate({ name: 'shop' })} className="btn-primary !bg-ink-50 !text-ink-900 hover:!bg-gold-400">
                Shop the Collection <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate({ name: 'discovery' })} className="btn-ghost !border-ink-50/60 !text-ink-50 hover:!bg-ink-50 hover:!text-ink-900">
                <Compass size={14} /> Find Your Fragrance
              </button>
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 border-t border-white/15 pt-6 animate-fade-up sm:grid-cols-3 sm:gap-6" style={{ animationDelay: '0.8s', opacity: 0 }}>
            {[
              { value: '24', label: 'Artisanal Fragrances' },
              { value: '92%', label: 'Natural Origin' },
              { value: '4.9★', label: '12,000+ Reviews' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-100/90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-100/60 lg:flex">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-ink-100/20">
            <div className="h-1/2 w-full bg-gold-300 animate-[shimmer_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* MARQUEE / TRUST STRIP */}
      <section className="border-y border-ink-200/60 bg-ink-50/50 py-5 dark:border-ink-800/60 dark:bg-ink-950/40">
        <div className="container-luxe">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-ink-600 dark:text-ink-400">
            <span className="flex items-center gap-2"><Leaf size={14} className="text-gold-600 dark:text-gold-300" /> 92% Natural Origin</span>
            <span className="text-ink-300">·</span>
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-gold-600 dark:text-gold-300" /> Hand-Poured in Grasse</span>
            <span className="text-ink-300">·</span>
            <span>Cruelty-Free & Vegan</span>
            <span className="text-ink-300">·</span>
            <span>Aged in Oak Barrels</span>
            <span className="text-ink-300">·</span>
            <span>Award-Winning House</span>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <Section
        eyebrow="Loved by Thousands"
        title="Best Sellers"
        subtitle="The fragrances our customers return to, season after season."
        action={{ label: 'View All Fragrances', onClick: () => navigate({ name: 'shop' }) }}
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
          ))}
        </div>
      </Section>

      {/* DISCOVERY QUIZ TEASER */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl animate-mist" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl animate-mist" style={{ animationDelay: '4s' }} />
        </div>
        <div className="container-luxe relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-gold-300">The Discovery Quiz</p>
              <h2 className="heading-lg mt-4 text-ink-50 text-balance">
                Find the fragrance that feels like you
              </h2>
              <p className="mt-5 max-w-md text-ink-200/80 text-pretty">
                Answer six questions about the scents you love, the moods you chase, and the life you live. We will recommend three fragrances tailored to you — and send you samples to try at home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate({ name: 'discovery' })} className="btn-primary !bg-gold-400 !text-ink-900 hover:!bg-ink-50">
                  Take the Quiz <ArrowRight size={14} />
                </button>
                <button onClick={() => navigate({ name: 'sample-club' })} className="btn-ghost !border-ink-50/40 !text-ink-50 hover:!bg-ink-50 hover:!text-ink-900">
                  Join the Sample Club
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-ink-200/70">
                <Stars rating={5} />
                <span className="text-sm">2 minutes · 4.9/5 from 8,400+ takers</span>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {products.slice(0, 6).map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => navigate({ name: 'product', slug: p.slug })}
                    className="group flex aspect-square items-center justify-center rounded-2xl border border-ink-50/10 bg-ink-50/5 backdrop-blur transition-all hover:border-gold-400/40 hover:bg-ink-50/10"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <Bottle color={p.color} size={70} variant={variants[i % variants.length]} className="transition-transform duration-500 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <Section
        eyebrow="Curated Worlds"
        title="Explore by Collection"
        subtitle="Four ways into the House — each a complete olfactory story."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <CollectionCard key={c.id} collection={c} index={i} />
          ))}
        </div>
      </Section>

      {/* STORY / HERITAGE */}
      <section className="relative overflow-hidden py-24">
        <div className="container-luxe">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
                  alt="Rose harvest in Grasse"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-ink-200/60 bg-[rgb(var(--card))] p-6 shadow-xl dark:border-ink-800/60 sm:block">
                <p className="font-display text-4xl text-gold-600 dark:text-gold-300">10</p>
                <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">Years of Craft</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="heading-lg mt-4 text-balance">
                A house built on a single belief: <span className="italic">real materials smell better</span>
              </h2>
              <div className="mt-6 space-y-4 text-ink-600 dark:text-ink-300">
                <p>
                  Attar House was founded in 2014 in a converted barn above Grasse, the historic capital of perfumery. We started with one idea that felt radical then and still feels radical now: that a perfume should be made from things that actually exist in the world — petals, resins, woods, citrus rinds — rather than the synthetic molecules that dominate modern perfumery.
                </p>
                <p>
                  Ten years later, we work with twelve partner farms across the Mediterranean, age every composition in oak for a minimum of six months, and bottle by hand. We are still small. We intend to stay that way.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '12', label: 'Partner Farms' },
                  { value: '6mo', label: 'Oak Aging' },
                  { value: '100%', label: 'Hand-Bottled' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-ink-200/60 p-4 text-center dark:border-ink-800/60">
                    <p className="font-display text-3xl text-gold-600 dark:text-gold-300">{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-500 dark:text-ink-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate({ name: 'about' })} className="btn-link mt-8">
                Read Our Full Story <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <Section
          eyebrow="Just Landed"
          title="New Arrivals"
          subtitle="The latest additions to the House."
          action={{ label: 'Shop New', onClick: () => navigate({ name: 'shop' }) }}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 4} onQuickView={setQuickView} />
            ))}
          </div>
        </Section>
      )}

      {/* TESTIMONIALS */}
      <section className="bg-ink-50/50 py-24 dark:bg-ink-950/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">From Our Clients</p>
            <h2 className="heading-lg mt-3 text-balance">Worn, loved, and returned to</h2>
            <div className="divider-gold mt-6" />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <figure key={t.id} className="card-surface flex flex-col p-6">
                <Quote size={24} className="text-gold-500 dark:text-gold-300" />
                <blockquote className="mt-4 flex-1 text-sm italic text-ink-700 dark:text-ink-200 text-pretty">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-ink-200/60 pt-4 dark:border-ink-800/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg">{t.author}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400">{t.location}</p>
                    </div>
                    <Stars rating={t.rating} size={12} />
                  </div>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-300">{t.product}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL TEASER */}
      <Section
        eyebrow="The Journal"
        title="Scent Guides & Stories"
        subtitle="How to choose, how to wear, and what we are making next."
        action={{ label: 'Read More', onClick: () => navigate({ name: 'journal' }) }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {journalPosts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="block overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink-50/90 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-900 backdrop-blur">{post.category}</span>
                </div>
              </button>
              <div className="mt-4 flex flex-1 flex-col">
                <p className="text-xs text-ink-500 dark:text-ink-400">{post.date} · {post.readTime}</p>
                <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="mt-1 text-left">
                  <h3 className="heading-sm transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-300">{post.title}</h3>
                </button>
                <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-400">{post.excerpt}</p>
                <button onClick={() => navigate({ name: 'journal-post', slug: post.slug })} className="btn-link mt-auto pt-4">
                  Read Article <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* GIFT / SAMPLE TEASER */}
      <section className="container-luxe py-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 p-10 dark:from-rose-900/30 dark:to-rose-950/20">
            <p className="eyebrow text-rose-600 dark:text-rose-300">Try Before You Buy</p>
            <h3 className="heading-md mt-3 text-balance">The Sample Club</h3>
            <p className="mt-3 max-w-sm text-sm text-ink-700 dark:text-ink-200">
              Three 2ml samples delivered each month, hand-selected by our perfumers. $25/month — and every cent becomes credit toward a full bottle.
            </p>
            <button onClick={() => navigate({ name: 'sample-club' })} className="btn-primary mt-6 !bg-ink-900 !text-ink-50 dark:!bg-ink-50 dark:!text-ink-900">
              Join the Club <ArrowRight size={14} />
            </button>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-10 dark:from-ink-900 dark:to-ink-950">
            <p className="eyebrow text-gold-300">Gift the House</p>
            <h3 className="heading-md mt-3 text-ink-50 text-balance">A discovery set for someone you love</h3>
            <p className="mt-3 max-w-sm text-sm text-ink-200/80">
              Five 2ml samples in a hand-finished oak box, with a personalized note and a credit toward a full bottle of their choice.
            </p>
            <button onClick={() => navigate({ name: 'shop' })} className="btn-primary mt-6 !bg-gold-400 !text-ink-900 hover:!bg-ink-50">
              Shop Gift Sets <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* UGC / INSTAGRAM STRIP */}
      <section className="py-16">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">#AttarHouse</p>
            <h2 className="heading-md mt-3 text-balance">Worn around the world</h2>
            <p className="mt-3 text-sm text-ink-600 dark:text-ink-400">Tag us @attarhouse to be featured. Real customers, real bottles, real life.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
              'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg',
              'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg',
              'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg',
              'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
              'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg',
            ].map((src, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="group relative aspect-square overflow-hidden rounded-xl">
                <img src={src} alt="Customer photo" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-ink-950/0 transition-colors group-hover:bg-ink-950/30" />
                <Star size={18} className="absolute right-3 top-3 text-ink-50 opacity-0 transition-opacity group-hover:opacity-100" fill="currentColor" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {quickView && (
        <QuickView product={quickView} onClose={() => setQuickView(null)} />
      )}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="container-luxe py-20">
      <div ref={ref} className="reveal mb-12 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="heading-lg mt-3 text-balance">{title}</h2>
          {subtitle && <p className="mt-3 text-ink-600 dark:text-ink-400 text-pretty">{subtitle}</p>}
        </div>
        {action && (
          <button onClick={action.onClick} className="btn-link shrink-0">
            {action.label} <ArrowRight size={14} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function CollectionCard({ collection, index }: { collection: typeof collections[number]; index: number }) {
  const { navigate } = useStore();
  const ref = useReveal<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={() => navigate({ name: 'shop' })}
      className="reveal group relative block overflow-hidden rounded-2xl text-left"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={collection.image} alt={collection.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-60"
          style={{ background: `linear-gradient(to top, ${collection.accent}80, transparent)` }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl text-ink-50">{collection.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-100/80">{collection.description}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold-300 transition-all group-hover:gap-3">
          Explore <ArrowRight size={12} />
        </span>
      </div>
    </button>
  );
}
