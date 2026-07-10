import { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store';
import { Bottle } from './Bottle';
import { Stars } from './Stars';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [sizeMl, setSizeMl] = useState(product?.defaultSizeMl ?? 50);

  if (!product) return null;
  const idx = products_index(product.id);
  const wished = isWishlisted(product.id);
  const size = product.sizes.find((s) => s.ml === sizeMl) ?? product.sizes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-[rgb(var(--bg))] shadow-2xl animate-scale-in md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-ink-50/80 p-2 text-ink-800 backdrop-blur dark:bg-ink-900/70 dark:text-ink-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {/* Image */}
        <div
          className="relative flex items-center justify-center p-10"
          style={{ background: `linear-gradient(160deg, ${product.color}26, ${product.color}0a)` }}
        >
          <Bottle color={product.color} size={240} variant={variants[idx % variants.length]} className="animate-float" />
        </div>
        {/* Details */}
        <div className="flex flex-col overflow-y-auto p-8">
          <p className="eyebrow">{product.family} · {product.gender}</p>
          <h2 className="heading-md mt-2">{product.name}</h2>
          <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-400">{product.tagline}</p>
          <div className="mt-3">
            <Stars rating={product.rating} showValue count={product.reviewCount} />
          </div>
          <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">{product.inspiration}</p>

          {/* Pyramid summary */}
          <div className="mt-5 space-y-2 rounded-xl border border-ink-200/60 p-4 dark:border-ink-800/60">
            <p className="eyebrow">Scent Pyramid</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-ink-400">Top</p>
                <p className="text-ink-700 dark:text-ink-200">{product.pyramid.top.map((n) => n.name).join(', ')}</p>
              </div>
              <div>
                <p className="text-ink-400">Heart</p>
                <p className="text-ink-700 dark:text-ink-200">{product.pyramid.heart.map((n) => n.name).join(', ')}</p>
              </div>
              <div>
                <p className="text-ink-400">Base</p>
                <p className="text-ink-700 dark:text-ink-200">{product.pyramid.base.map((n) => n.name).join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-5">
            <p className="eyebrow mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.ml}
                  onClick={() => setSizeMl(s.ml)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    s.ml === sizeMl
                      ? 'border-gold-500 bg-gold-500 text-ink-900'
                      : 'border-ink-300 text-ink-700 hover:border-gold-500 dark:border-ink-700 dark:text-ink-200'
                  }`}
                >
                  {s.sample ? 'Sample · ' : ''}{s.ml}ml · ${s.price}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-3 pt-6">
            <button
              onClick={() => { addToCart(product, sizeMl); onClose(); }}
              className="btn-primary flex-1"
            >
              <Plus size={16} /> Add to Bag · ${size.price}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="rounded-full border border-ink-300 p-3.5 text-ink-700 transition-all hover:border-rose-500 hover:text-rose-500 dark:border-ink-700 dark:text-ink-200"
              aria-label="Toggle wishlist"
            >
              <Heart size={18} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>
          <button
            onClick={() => { onClose(); navigate({ name: 'product', slug: product.slug }); }}
            className="btn-link mt-3 justify-center"
          >
            View Full Details →
          </button>
        </div>
      </div>
    </div>
  );
}

function products_index(id: string): number {
  // simple deterministic index for variant selection
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}
