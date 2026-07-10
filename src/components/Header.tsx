import { useEffect, useState } from 'react';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import type { ScentFamily } from '../types';

const families: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus', 'Chypre', 'Gourmand', 'Aromatic'];

const navLinks: { label: string; route: any }[] = [
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'Discovery', route: { name: 'discovery' } },
  { label: 'Sample Club', route: { name: 'sample-club' } },
  { label: 'Journal', route: { name: 'journal' } },
  { label: 'About', route: { name: 'about' } },
];

export function Header() {
  const { navigate, route, theme, toggleTheme, cartCount, setCartOpen, wishlist, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (name: string) => route.name === name;

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-50 overflow-hidden bg-ink-900 text-ink-50 dark:bg-ink-950">
        <div className="flex animate-[shimmer_18s_linear_infinite] whitespace-nowrap py-2 text-[11px] uppercase tracking-widest">
          <span className="px-8">Complimentary shipping on orders over $150</span>
          <span className="px-8 text-gold-400">·</span>
          <span className="px-8">Free 2ml sample with every full bottle</span>
          <span className="px-8 text-gold-400">·</span>
          <span className="px-8">30-day returns, even on opened bottles</span>
          <span className="px-8 text-gold-400">·</span>
          <span className="px-8">New: Bergamote Blanche — now shipping</span>
          <span className="px-8 text-gold-400">·</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-ink-200/60 dark:border-ink-800/60'
            : 'bg-transparent'
        }`}
      >
        <div className="container-luxe">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Left: mobile menu + nav */}
            <div className="flex flex-1 items-center gap-6">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <nav className="hidden items-center gap-7 lg:flex">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.route)}
                    className={`relative text-xs uppercase tracking-widest transition-colors hover:text-gold-500 dark:hover:text-gold-300 ${
                      isActive(link.route.name) ? 'text-gold-600 dark:text-gold-300' : 'text-ink-800 dark:text-ink-100'
                    }`}
                    onMouseEnter={() => link.route.name === 'shop' && setShopOpen(true)}
                    onMouseLeave={() => link.route.name === 'shop' && setShopOpen(false)}
                  >
                    {link.label}
                    {isActive(link.route.name) && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-gold-500 dark:bg-gold-300" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Center: logo */}
            <button
              onClick={() => navigate({ name: 'home' })}
              className="flex shrink-0 flex-col items-center"
              aria-label="Attar House home"
            >
              <span className="font-display text-2xl leading-none tracking-wide lg:text-3xl">Attar House</span>
              <span className="mt-0.5 text-[8px] uppercase tracking-[0.4em] text-gold-600 dark:text-gold-300">Grasse · Est. 2014</span>
            </button>

            {/* Right: actions */}
            <div className="flex flex-1 items-center justify-end gap-3 lg:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-ink-800 transition-colors hover:text-gold-500 dark:text-ink-100 dark:hover:text-gold-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className="text-ink-800 transition-colors hover:text-gold-500 dark:text-ink-100 dark:hover:text-gold-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => navigate({ name: 'account' })}
                className="hidden text-ink-800 transition-colors hover:text-gold-500 dark:text-ink-100 dark:hover:text-gold-300 sm:block"
                aria-label="Account"
              >
                <span className="text-xs uppercase tracking-widest">Account</span>
              </button>
              <button
                onClick={() => navigate({ name: 'account' })}
                className="relative text-ink-800 transition-colors hover:text-gold-500 dark:text-ink-100 dark:hover:text-gold-300"
                aria-label={`Wishlist, ${wishlist.length} items`}
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-medium text-ink-900">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-ink-800 transition-colors hover:text-gold-500 dark:text-ink-100 dark:hover:text-gold-300"
                aria-label={`Bag, ${cartCount} items`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-medium text-ink-900">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Shop dropdown */}
        {shopOpen && (
          <div
            className="absolute left-0 right-0 top-full hidden lg:block"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <div className="glass border-b border-ink-200/60 dark:border-ink-800/60">
              <div className="container-luxe py-8">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="eyebrow mb-3">By Scent Family</p>
                    <ul className="space-y-2">
                      {families.slice(0, 4).map((f) => (
                        <li key={f}>
                          <button
                            onClick={() => { navigate({ name: 'shop', family: f }); setShopOpen(false); }}
                            className="text-sm text-ink-700 transition-colors hover:text-gold-500 dark:text-ink-300"
                          >
                            {f}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-3 invisible">·</p>
                    <ul className="space-y-2">
                      {families.slice(4).map((f) => (
                        <li key={f}>
                          <button
                            onClick={() => { navigate({ name: 'shop', family: f }); setShopOpen(false); }}
                            className="text-sm text-ink-700 transition-colors hover:text-gold-500 dark:text-ink-300"
                          >
                            {f}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Explore</p>
                    <ul className="space-y-2">
                      <li><button onClick={() => { navigate({ name: 'shop' }); setShopOpen(false); }} className="text-sm text-ink-700 hover:text-gold-500 dark:text-ink-300">All Fragrances</button></li>
                      <li><button onClick={() => { navigate({ name: 'shop' }); setShopOpen(false); }} className="text-sm text-ink-700 hover:text-gold-500 dark:text-ink-300">Best Sellers</button></li>
                      <li><button onClick={() => { navigate({ name: 'shop' }); setShopOpen(false); }} className="text-sm text-ink-700 hover:text-gold-500 dark:text-ink-300">New Arrivals</button></li>
                      <li><button onClick={() => { navigate({ name: 'sample-club' }); setShopOpen(false); }} className="text-sm text-ink-700 hover:text-gold-500 dark:text-ink-300">Sample Club</button></li>
                      <li><button onClick={() => { navigate({ name: 'discovery' }); setShopOpen(false); }} className="text-sm text-ink-700 hover:text-gold-500 dark:text-ink-300">Discovery Quiz</button></li>
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <div className="relative h-full min-h-[140px]">
                      <img src={products[0].image} alt="Featured fragrance" className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-[10px] uppercase tracking-widest text-gold-300">Featured</p>
                        <p className="font-display text-lg text-ink-50">{products[0].name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-[rgb(var(--bg))] p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.route); setMobileOpen(false); }}
                  className="border-b border-ink-200/60 py-4 text-left font-display text-2xl dark:border-ink-800/60"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { navigate({ name: 'contact' }); setMobileOpen(false); }}
                className="border-b border-ink-200/60 py-4 text-left font-display text-2xl dark:border-ink-800/60"
              >
                Contact
              </button>
              <button
                onClick={() => { navigate({ name: 'faq' }); setMobileOpen(false); }}
                className="border-b border-ink-200/60 py-4 text-left font-display text-2xl dark:border-ink-800/60"
              >
                FAQ
              </button>
              <button
                onClick={() => { navigate({ name: 'sustainability' }); setMobileOpen(false); }}
                className="border-b border-ink-200/60 py-4 text-left font-display text-2xl dark:border-ink-800/60"
              >
                Sustainability
              </button>
            </nav>
            <div className="mt-8">
              <p className="eyebrow mb-3">Scent Families</p>
              <div className="flex flex-wrap gap-2">
                {families.map((f) => (
                  <button
                    key={f}
                    onClick={() => { navigate({ name: 'shop', family: f }); setMobileOpen(false); }}
                    className="rounded-full border border-ink-300 px-3 py-1.5 text-xs dark:border-ink-700"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
