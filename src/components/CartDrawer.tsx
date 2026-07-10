import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { Bottle } from './Bottle';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQuantity, cartSubtotal, navigate } = useStore();

  if (!cartOpen) return null;

  const items = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const size = product?.sizes.find((s) => s.ml === item.sizeMl);
      return product && size ? { ...item, product, size } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const freeShipThreshold = 150;
  const remaining = Math.max(0, freeShipThreshold - cartSubtotal);
  const progress = Math.min(100, (cartSubtotal / freeShipThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setCartOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[rgb(var(--bg))] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-200/60 px-6 py-5 dark:border-ink-800/60">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-display text-2xl">Your Bag</h2>
            <span className="text-sm text-ink-400">({items.length})</span>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={22} /></button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-ink-200/60 px-6 py-4 dark:border-ink-800/60">
            <p className="text-xs text-ink-600 dark:text-ink-400">
              {remaining > 0 ? (
                <>You are <span className="font-medium text-gold-600 dark:text-gold-300">${remaining.toFixed(0)}</span> away from free shipping</>
              ) : (
                <span className="text-gold-600 dark:text-gold-300">You have unlocked free shipping</span>
              )}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
              <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-ink-100 p-6 dark:bg-ink-900">
                <ShoppingBag size={32} className="text-ink-400" />
              </div>
              <p className="mt-4 font-display text-2xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Discover your signature scent.</p>
              <button
                onClick={() => { setCartOpen(false); navigate({ name: 'shop' }); }}
                className="btn-primary mt-6"
              >
                Shop Fragrances
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item, i) => (
                <li key={`${item.productId}-${item.sizeMl}`} className="flex gap-4">
                  <button
                    onClick={() => { setCartOpen(false); navigate({ name: 'product', slug: item.product.slug }); }}
                    className="shrink-0"
                  >
                    <div
                      className="flex h-24 w-20 items-center justify-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${item.product.color}22, ${item.product.color}08)` }}
                    >
                      <Bottle color={item.product.color} size={70} variant={variants[i % variants.length]} />
                    </div>
                  </button>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <button
                          onClick={() => { setCartOpen(false); navigate({ name: 'product', slug: item.product.slug }); }}
                          className="text-left font-display text-lg leading-tight hover:text-gold-600 dark:hover:text-gold-300"
                        >
                          {item.product.name}
                        </button>
                        <p className="text-xs text-ink-500 dark:text-ink-400">{item.size.ml}ml · {item.product.concentration}</p>
                        {item.size.sample && <p className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-300">Discovery Sample</p>}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.sizeMl)}
                        className="text-ink-400 hover:text-rose-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border border-ink-300 dark:border-ink-700">
                        <button
                          onClick={() => updateQuantity(item.productId, item.sizeMl, item.quantity - 1)}
                          className="p-1.5 text-ink-600 hover:text-gold-600 dark:text-ink-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.sizeMl, item.quantity + 1)}
                          className="p-1.5 text-ink-600 hover:text-gold-600 dark:text-ink-300"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-display text-lg">${(item.size.price * item.quantity).toFixed(0)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ink-200/60 px-6 py-5 dark:border-ink-800/60">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-ink-600 dark:text-ink-400">Subtotal</span>
              <span className="font-display text-2xl">${cartSubtotal.toFixed(0)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Shipping and taxes calculated at checkout.</p>
            <button className="btn-primary mt-4 w-full">Proceed to Checkout</button>
            <button
              onClick={() => { setCartOpen(false); navigate({ name: 'shop' }); }}
              className="btn-link mt-3 w-full justify-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
