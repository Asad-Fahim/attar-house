import { useEffect, useState } from 'react';
import {
  ArrowLeft, Award, Check, Clock, Heart, Leaf, Minus, Plus,
  RefreshCw, ShieldCheck, Sparkles, Truck, Wind,
} from 'lucide-react';
import { useStore } from '../store';
import { getProduct, getRelated, products as allProducts } from '../data/products';
import { Bottle } from '../components/Bottle';
import { Stars } from '../components/Stars';
import { ProductCard } from '../components/ProductCard';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

export function ProductDetail({ slug }: { slug: string }) {
  const { navigate, addToCart, toggleWishlist, isWishlisted, addRecentlyViewed, showToast } = useStore();
  const product = getProduct(slug);
  const [sizeMl, setSizeMl] = useState(product?.defaultSizeMl ?? 50);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'story' | 'notes' | 'reviews' | 'details'>('story');
  const [bottleVariant, setBottleVariant] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImage(0);
      setSizeMl(product.defaultSizeMl);
      setQty(1);
      setTab('story');
      setBottleVariant(Math.abs(hashCode(product.id)) % variants.length);
    }
  }, [product?.id, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="heading-lg">Fragrance not found</h1>
        <button onClick={() => navigate({ name: 'shop' })} className="btn-primary mt-6">Back to Shop</button>
      </div>
    );
  }

  const size = product.sizes.find((s) => s.ml === sizeMl) ?? product.sizes[0];
  const related = getRelated(product, 4);
  const wished = isWishlisted(product.id);
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = product.reviews.length ? (count / product.reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-luxe pt-6">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">
          <button onClick={() => navigate({ name: 'home' })} className="hover:text-gold-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate({ name: 'shop' })} className="hover:text-gold-600">Shop</button>
          <span>/</span>
          <button onClick={() => navigate({ name: 'shop', family: product.family })} className="hover:text-gold-600">{product.family}</button>
          <span>/</span>
          <span className="text-ink-800 dark:text-ink-200">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="container-luxe py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            {/* Thumbnails */}
            <div className="flex gap-3 sm:flex-col">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === i ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
              {/* 360 / bottle view toggle */}
              <button
                onClick={() => setActiveImage(-1)}
                className={`flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 text-[9px] uppercase tracking-widest transition-all ${
                  activeImage === -1 ? 'border-gold-500 text-gold-600' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <RefreshCw size={18} className="animate-spin-slow" />
                <span className="mt-1">360°</span>
              </button>
            </div>
            {/* Main image */}
            <div className="flex-1">
              <div
                className="relative aspect-square overflow-hidden rounded-3xl"
                style={{ background: `linear-gradient(160deg, ${product.color}26, ${product.color}0a 70%, ${product.color}1a)` }}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
              >
                {activeImage === -1 ? (
                  <div className="flex h-full items-center justify-center">
                    <Bottle
                      color={product.color}
                      size={320}
                      variant={variants[bottleVariant]}
                      className="transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <img
                    src={product.gallery[activeImage]}
                    alt={`${product.name} - view ${activeImage + 1}`}
                    className={`h-full w-full object-cover transition-transform duration-700 ${zoom ? 'scale-110' : 'scale-100'}`}
                  />
                )}
                {/* Badges */}
                {product.badges && (
                  <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                    {product.badges.map((b) => (
                      <span key={b} className="rounded-full bg-ink-900/85 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-50 backdrop-blur dark:bg-ink-50/90 dark:text-ink-900">{b}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute right-4 top-4 rounded-full bg-ink-50/80 p-2.5 text-ink-700 backdrop-blur transition-all hover:bg-ink-50 dark:bg-ink-900/70 dark:text-ink-200"
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow">{product.family} · {product.gender} · {product.concentration}</p>
            <h1 className="heading-lg mt-3 text-balance">{product.name}</h1>
            <p className="mt-2 text-lg italic text-ink-500 dark:text-ink-400">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-4">
              <Stars rating={product.rating} size={16} />
              <button onClick={() => setTab('reviews')} className="text-sm text-ink-600 underline-offset-4 hover:underline dark:text-ink-300">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </button>
            </div>

            <p className="mt-5 text-ink-600 dark:text-ink-300 text-pretty">{product.inspiration}</p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl">${size.price}</span>
              <span className="text-sm text-ink-500 dark:text-ink-400">{size.ml}ml{size.sample ? ' · Discovery Sample' : ''}</span>
            </div>

            {/* Size selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Size</p>
                <button className="text-xs text-ink-500 underline-offset-4 hover:underline dark:text-ink-400">Size guide</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.ml}
                    onClick={() => setSizeMl(s.ml)}
                    className={`flex flex-col items-center rounded-xl border px-4 py-3 transition-all ${
                      s.ml === sizeMl
                        ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                        : 'border-ink-300 hover:border-gold-500 dark:border-ink-700'
                    }`}
                  >
                    <span className="font-display text-lg">{s.ml}ml</span>
                    <span className="text-xs text-ink-500 dark:text-ink-400">${s.price}</span>
                    {s.sample && <span className="mt-0.5 text-[9px] uppercase tracking-widest text-gold-600 dark:text-gold-300">Sample</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-ink-300 px-2 dark:border-ink-700">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-ink-600 hover:text-gold-600 dark:text-ink-300" aria-label="Decrease quantity"><Minus size={16} /></button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 text-ink-600 hover:text-gold-600 dark:text-ink-300" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
              <button
                onClick={() => addToCart(product, sizeMl, qty)}
                className="btn-primary flex-1"
              >
                Add to Bag · ${(size.price * qty).toFixed(0)}
              </button>
              <button
                onClick={() => { toggleWishlist(product.id); showToast(wished ? 'Removed from wishlist' : 'Saved to wishlist'); }}
                className="rounded-full border border-ink-300 p-3.5 text-ink-700 transition-all hover:border-rose-500 hover:text-rose-500 dark:border-ink-700 dark:text-ink-200"
                aria-label="Toggle wishlist"
              >
                <Heart size={18} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
            </div>

            {/* Sample teaser */}
            <button
              onClick={() => { addToCart(product, 2, 1); }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-gold-400/60 py-3 text-xs uppercase tracking-widest text-gold-700 transition-colors hover:bg-gold-50 dark:text-gold-300 dark:hover:bg-gold-900/20"
            >
              <Sparkles size={14} /> Try a 2ml sample first · ${product.sizes.find((s) => s.sample)?.price}
            </button>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-200/60 pt-6 dark:border-ink-800/60">
              {[
                { icon: ShieldCheck, label: 'Authenticity guaranteed' },
                { icon: RefreshCw, label: '30-day returns, even opened' },
                { icon: Truck, label: 'Free shipping over $150' },
                { icon: Leaf, label: product.vegan ? 'Vegan & cruelty-free' : 'Cruelty-free' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-ink-600 dark:text-ink-300">
                  <t.icon size={16} className="shrink-0 text-gold-600 dark:text-gold-300" /> {t.label}
                </div>
              ))}
            </div>

            {/* Performance meters */}
            <div className="mt-6 space-y-3 rounded-2xl border border-ink-200/60 p-5 dark:border-ink-800/60">
              <p className="eyebrow">Performance</p>
              <Meter icon={Clock} label="Longevity" value={product.longevity} max={5} />
              <Meter icon={Wind} label="Sillage" value={product.sillage} max={5} />
              <div className="flex flex-wrap gap-2 pt-2">
                {product.mood.map((m) => (
                  <span key={m} className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-700 dark:bg-ink-800 dark:text-ink-200">{m}</span>
                ))}
              </div>
            </div>

            {/* Perfumer */}
            <div className="mt-6 flex items-center gap-3 text-sm text-ink-600 dark:text-ink-400">
              <Award size={18} className="text-gold-600 dark:text-gold-300" />
              Composed by <span className="text-ink-900 dark:text-ink-100">{product.perfumer}</span> · Launched {product.launchYear}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-luxe">
        <div className="flex flex-wrap gap-2 border-b border-ink-200/60 dark:border-ink-800/60">
          {([
            ['story', 'The Story'],
            ['notes', 'Scent Pyramid'],
            ['reviews', `Reviews (${product.reviewCount})`],
            ['details', 'Details'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative px-5 py-4 text-xs uppercase tracking-widest transition-colors ${
                tab === key ? 'text-gold-600 dark:text-gold-300' : 'text-ink-500 hover:text-ink-800 dark:text-ink-400'
              }`}
            >
              {label}
              {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-500 dark:bg-gold-300" />}
            </button>
          ))}
        </div>

        <div className="py-10">
          {tab === 'story' && (
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="eyebrow">The Inspiration</p>
                <h2 className="heading-md mt-3 text-balance">{product.inspiration}</h2>
                <div className="mt-5 space-y-4 text-ink-600 dark:text-ink-300 text-pretty">
                  <p>{product.story}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-ink-200/60 p-6 dark:border-ink-800/60">
                <p className="eyebrow">Wear It For</p>
                <ul className="mt-3 space-y-2">
                  {product.occasion.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-200">
                      <Check size={14} className="text-gold-600 dark:text-gold-300" /> {o}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-6">Mood</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.mood.map((m) => (
                    <span key={m} className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-700 dark:bg-ink-800 dark:text-ink-200">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'notes' && (
            <PyramidView product={product} />
          )}

          {tab === 'reviews' && (
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-ink-200/60 p-6 dark:border-ink-800/60">
                  <p className="font-display text-5xl text-gold-600 dark:text-gold-300">{product.rating.toFixed(1)}</p>
                  <Stars rating={product.rating} size={18} className="mt-2" />
                  <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Based on {product.reviewCount} reviews</p>
                  <div className="mt-5 space-y-2">
                    {ratingBreakdown.map((r) => (
                      <div key={r.star} className="flex items-center gap-2 text-xs">
                        <span className="w-3">{r.star}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
                          <div className="h-full bg-gold-500" style={{ width: `${r.pct}%` }} />
                        </div>
                        <span className="w-6 text-right text-ink-500">{r.count}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-ghost mt-6 w-full">Write a Review</button>
                </div>
              </div>
              {/* Reviews list */}
              <div className="lg:col-span-2">
                <div className="space-y-5">
                  {product.reviews.map((review) => (
                    <article key={review.id} className="rounded-2xl border border-ink-200/60 p-6 dark:border-ink-800/60">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-display text-lg">{review.author}</p>
                            {review.verified && (
                              <span className="flex items-center gap-1 rounded-full bg-sage-100 px-2 py-0.5 text-[10px] uppercase tracking-widest text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                                <Check size={10} /> Verified
                              </span>
                            )}
                          </div>
                          {review.location && <p className="text-xs text-ink-500 dark:text-ink-400">{review.location}</p>}
                        </div>
                        <Stars rating={review.rating} size={14} />
                      </div>
                      <p className="mt-3 font-display text-xl">{review.title}</p>
                      <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 text-pretty">{review.body}</p>
                      {review.hasPhoto && (
                        <div className="mt-3 flex gap-2">
                          {[product.image, product.gallery[1]].map((img, i) => (
                            <div key={i} className="h-20 w-20 overflow-hidden rounded-lg">
                              <img src={img} alt="Customer photo" className="h-full w-full object-cover" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-4 text-xs text-ink-500 dark:text-ink-400">
                        <span>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {review.helpful != null && (
                          <button className="flex items-center gap-1 hover:text-gold-600">
                            <Check size={12} /> Helpful ({review.helpful})
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'details' && (
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Specifications</p>
                <dl className="mt-4 divide-y divide-ink-200/60 dark:divide-ink-800/60">
                  {[
                    ['Concentration', product.concentration],
                    ['Scent Family', product.family],
                    ['For', product.gender],
                    ['Perfumer', product.perfumer],
                    ['Launched', String(product.launchYear)],
                    ['Vegan', product.vegan ? 'Yes' : 'No'],
                    ['Natural Origin', product.natural ? 'Yes' : 'No'],
                    ['Cruelty-Free', product.crueltyFree ? 'Yes' : 'No'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-3 text-sm">
                      <dt className="text-ink-500 dark:text-ink-400">{k}</dt>
                      <dd className="text-ink-900 dark:text-ink-100">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <p className="eyebrow">Ingredients</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{product.ingredients}</p>
                <p className="eyebrow mt-6">How to Wear</p>
                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
                  Apply to pulse points — wrists, neck, behind the ears. Do not rub. For a softer trail, spray into the air and walk through. Reapply as desired.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* You may also like */}
      <section className="container-luxe py-16">
        <div className="mb-10 text-center">
          <p className="eyebrow">You May Also Like</p>
          <h2 className="heading-md mt-3">Complementary Scents</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      <RecentlyViewed />
    </div>
  );
}

function Meter({ icon: Icon, label, value, max }: { icon: any; label: string; value: number; max: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Icon size={14} /> {label}</span>
        <span className="text-ink-500 dark:text-ink-400">{value}/{max}</span>
      </div>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
            <div className={`h-full ${i < value ? 'bg-gold-500' : 'bg-transparent'}`} style={{ width: i < value ? '100%' : '0%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PyramidView({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const layers: Array<{ key: 'top' | 'heart' | 'base'; label: string; desc: string }> = [
    { key: 'top', label: 'Top Notes', desc: 'The first impression — bright, volatile, gone in minutes.' },
    { key: 'heart', label: 'Heart Notes', desc: 'The character — emerges as top notes fade, lingers for hours.' },
    { key: 'base', label: 'Base Notes', desc: 'The foundation — the scent that stays on skin and clothes.' },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-center text-ink-600 dark:text-ink-300 text-pretty">
        A fragrance unfolds in three stages. The top notes are your first impression; the heart is its character; the base is what lingers on your skin hours later.
      </p>
      <div className="mt-10 space-y-4">
        {layers.map((layer, i) => {
          const notes = product.pyramid[layer.key];
          return (
            <div key={layer.key} className="rounded-2xl border border-ink-200/60 p-6 dark:border-ink-800/60" style={{ marginLeft: `${i * 24}px`, marginRight: `${(2 - i) * 24}px` }}>
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl">{layer.label}</p>
                <span className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-300">Layer {i + 1}</span>
              </div>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{layer.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {notes.map((n) => (
                  <span key={n.name} className="flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-sm dark:bg-ink-800">
                    <span className="h-2 w-2 rounded-full" style={{ background: product.color }} />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentlyViewed() {
  const { recentlyViewed, navigate } = useStore();
  const items = recentlyViewed.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean).slice(0, 4) as typeof allProducts;
  if (items.length < 2) return null;
  return (
    <section className="container-luxe py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="heading-sm">Recently Viewed</h2>
        <button onClick={() => navigate({ name: 'shop' })} className="btn-link">View All <ArrowLeft size={12} /></button>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
        ))}
      </div>
    </section>
  );
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
