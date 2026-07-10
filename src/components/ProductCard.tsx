import { Eye, Heart, Plus } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../store';
import { Bottle } from './Bottle';
import { Stars } from './Stars';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
  variant?: 'grid' | 'list';
}

export function ProductCard({ product, index = 0, onQuickView, variant = 'grid' }: ProductCardProps) {
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const bottleVariant = variants[index % variants.length];
  const wished = isWishlisted(product.id);

  const badges: string[] = [];
  if (product.bestSeller) badges.push('Best Seller');
  if (product.new) badges.push('New');
  if (product.limited) badges.push('Limited');

  if (variant === 'list') {
    return (
      <article className="group card-surface flex gap-6 p-5 hover:border-gold-400/60 dark:hover:border-gold-400/40">
        <button
          onClick={() => navigate({ name: 'product', slug: product.slug })}
          className="relative shrink-0 overflow-hidden rounded-xl"
          aria-label={`View ${product.name}`}
        >
          <div
            className="flex h-44 w-44 items-center justify-center transition-transform duration-700 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${product.color}22, ${product.color}08)` }}
          >
            <Bottle color={product.color} size={120} variant={bottleVariant} className="transition-transform duration-700 group-hover:-translate-y-1" />
          </div>
        </button>
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">{product.family} · {product.gender}</p>
              <h3 className="heading-sm">{product.name}</h3>
              <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-400">{product.tagline}</p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="rounded-full p-2 text-ink-400 transition-colors hover:text-rose-500"
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{product.inspiration}</p>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} showValue count={product.reviewCount} />
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="font-display text-2xl text-ink-900 dark:text-ink-50">
              ${product.price}
              <span className="ml-1 text-xs font-sans tracking-normal text-ink-400">/{product.defaultSizeMl}ml</span>
            </p>
            <div className="flex gap-2">
              {onQuickView && (
                <button
                  onClick={() => onQuickView(product)}
                  className="btn-ghost !px-4 !py-2.5 !text-[10px]"
                >
                  <Eye size={14} /> Quick View
                </button>
              )}
              <button
                onClick={() => addToCart(product, product.defaultSizeMl)}
                className="btn-primary !px-4 !py-2.5 !text-[10px]"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl">
        <button
          onClick={() => navigate({ name: 'product', slug: product.slug })}
          className="block w-full"
          aria-label={`View ${product.name}`}
        >
          <div
            className="relative flex aspect-[4/5] items-center justify-center overflow-hidden transition-all duration-700"
            style={{ background: `linear-gradient(160deg, ${product.color}26, ${product.color}0a 70%, ${product.color}1a)` }}
          >
            {/* Mist effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-mist" />
              <div className="absolute right-0 top-1/2 h-32 w-32 rounded-full bg-white/10 blur-3xl animate-mist" style={{ animationDelay: '2s' }} />
            </div>
            <Bottle
              color={product.color}
              size={180}
              variant={bottleVariant}
              className="transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-105"
            />
            {/* Badges */}
            {badges.length > 0 && (
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-ink-900/85 px-3 py-1 text-[10px] uppercase tracking-widest text-ink-50 backdrop-blur dark:bg-ink-50/90 dark:text-ink-900"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className="absolute right-4 top-4 rounded-full bg-ink-50/80 p-2 text-ink-700 backdrop-blur transition-all hover:bg-ink-50 dark:bg-ink-900/70 dark:text-ink-200"
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>
        </button>
        {/* Quick view bar */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={() => onQuickView(product)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-50/95 py-3 text-[11px] uppercase tracking-widest text-ink-900 backdrop-blur transition-colors hover:bg-gold-400 dark:bg-ink-900/90 dark:text-ink-50 dark:hover:bg-gold-400 dark:hover:text-ink-900"
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow">{product.family}</p>
          <Stars rating={product.rating} />
        </div>
        <button
          onClick={() => navigate({ name: 'product', slug: product.slug })}
          className="mt-1 text-left"
        >
          <h3 className="heading-sm transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-300">{product.name}</h3>
        </button>
        <p className="mt-0.5 text-sm italic text-ink-500 dark:text-ink-400">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-display text-xl text-ink-900 dark:text-ink-50">
            ${product.price}
            <span className="ml-1 text-xs font-sans tracking-normal text-ink-400">/{product.defaultSizeMl}ml</span>
          </p>
          <button
            onClick={() => addToCart(product, product.defaultSizeMl)}
            className="rounded-full border border-ink-300 p-2 text-ink-700 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900 dark:border-ink-700 dark:text-ink-200 dark:hover:border-gold-400 dark:hover:bg-gold-400"
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
