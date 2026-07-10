import { useState } from 'react';
import { Heart, Package, Settings, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type Tab = 'orders' | 'wishlist' | 'recently-viewed' | 'profile';

export function Account() {
  const { wishlist, recentlyViewed, navigate, cart } = useStore();
  const [tab, setTab] = useState<Tab>('wishlist');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const recentProducts = products.filter((p) => recentlyViewed.includes(p.id));

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'recently-viewed', label: 'Recently Viewed', icon: ShoppingBag, count: recentProducts.length },
    { id: 'orders', label: 'Orders', icon: Package, count: cart.length },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900">
          <User size={28} />
        </div>
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1 className="heading-md">Your Account</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  tab === t.id ? 'bg-ink-900 text-ink-50 dark:bg-ink-50 dark:text-ink-900' : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-900'
                }`}
              >
                <t.icon size={16} />
                {t.label}
                {t.count != null && t.count > 0 && (
                  <span className={`ml-auto rounded-full px-2 text-xs ${tab === t.id ? 'bg-ink-50/20 text-ink-50 dark:bg-ink-900/20 dark:text-ink-900' : 'bg-ink-200 dark:bg-ink-800'}`}>{t.count}</span>
                )}
              </button>
            ))}
          </nav>
          <button className="btn-ghost mt-4 w-full !justify-start lg:mt-8">Sign Out</button>
        </aside>

        {/* Content */}
        <div>
          {tab === 'wishlist' && (
            <div>
              <h2 className="heading-sm mb-6">Your Wishlist</h2>
              {wishlistProducts.length === 0 ? (
                <EmptyState icon={Heart} title="Your wishlist is empty" body="Save fragrances you love by tapping the heart icon." cta="Discover Fragrances" onClick={() => navigate({ name: 'shop' })} />
              ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
                  {wishlistProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'recently-viewed' && (
            <div>
              <h2 className="heading-sm mb-6">Recently Viewed</h2>
              {recentProducts.length === 0 ? (
                <EmptyState icon={ShoppingBag} title="Nothing here yet" body="Fragrances you view will appear here." cta="Shop the Collection" onClick={() => navigate({ name: 'shop' })} />
              ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
                  {recentProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'orders' && (
            <div>
              <h2 className="heading-sm mb-6">Your Orders</h2>
              {cart.length === 0 ? (
                <EmptyState icon={Package} title="No orders yet" body="When you place an order, it will appear here for tracking." cta="Start Shopping" onClick={() => navigate({ name: 'shop' })} />
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-ink-200/60 p-5 dark:border-ink-800/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg">Order #ML-DEMO-001</p>
                        <p className="text-xs text-ink-500 dark:text-ink-400">Placed today · {cart.length} items</p>
                      </div>
                      <span className="rounded-full bg-gold-100 px-3 py-1 text-xs uppercase tracking-widest text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">In your bag</span>
                    </div>
                    <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">Complete your purchase to track this order.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'profile' && (
            <div className="max-w-md">
              <h2 className="heading-sm mb-6">Your Profile</h2>
              <div className="card-surface space-y-5 p-6">
                <div>
                  <label className="eyebrow mb-2 block">Name</label>
                  <input className="input-luxe" defaultValue="Demo Customer" />
                </div>
                <div>
                  <label className="eyebrow mb-2 block">Email</label>
                  <input className="input-luxe" type="email" defaultValue="demo@attarhouse.example" />
                </div>
                <div>
                  <label className="eyebrow mb-2 block">Preferred Scent Families</label>
                  <div className="flex flex-wrap gap-2">
                    {['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus'].map((f) => (
                      <span key={f} className="rounded-full border border-ink-300 px-3 py-1.5 text-xs dark:border-ink-700">{f}</span>
                    ))}
                  </div>
                </div>
                <button className="btn-primary w-full">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, body, cta, onClick }: { icon: any; title: string; body: string; cta: string; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 py-16 text-center dark:border-ink-700">
      <Icon size={32} className="text-ink-400" strokeWidth={1.2} />
      <p className="mt-4 font-display text-2xl">{title}</p>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{body}</p>
      <button onClick={onClick} className="btn-primary mt-6">{cta}</button>
    </div>
  );
}
