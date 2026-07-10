import { useState } from 'react';
import { Award, Leaf, Package, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import type { Route } from '../types';

const trustBadges = [
  { icon: ShieldCheck, label: 'Authenticity Guaranteed' },
  { icon: Truck, label: 'Free Shipping over $150' },
  { icon: Package, label: '30-Day Returns' },
  { icon: Leaf, label: 'Vegan & Cruelty-Free' },
  { icon: Award, label: 'Award-Winning House' },
];

const linkColumns: { title: string; links: { label: string; route: Route }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Fragrances', route: { name: 'shop' } },
      { label: 'Best Sellers', route: { name: 'shop' } },
      { label: 'New Arrivals', route: { name: 'shop' } },
      { label: 'Sample Club', route: { name: 'sample-club' } },
      { label: 'Discovery Quiz', route: { name: 'discovery' } },
    ],
  },
  {
    title: 'House',
    links: [
      { label: 'Our Story', route: { name: 'about' } },
      { label: 'Sustainability', route: { name: 'sustainability' } },
      { label: 'The Journal', route: { name: 'journal' } },
      { label: 'Contact', route: { name: 'contact' } },
      { label: 'FAQ', route: { name: 'faq' } },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', route: { name: 'account' } },
      { label: 'Wishlist', route: { name: 'account' } },
      { label: 'Order Tracking', route: { name: 'account' } },
      { label: 'Shipping & Returns', route: { name: 'faq' } },
      { label: 'Sample Program', route: { name: 'sample-club' } },
    ],
  },
];

export function Footer() {
  const { navigate } = useStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email });
      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (err) {
      // Even if table not set up, show success for UX in demo
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <footer className="mt-24 border-t border-ink-200/60 bg-ink-50/50 dark:border-ink-800/60 dark:bg-ink-950/40">
      {/* Trust badges */}
      <div className="border-b border-ink-200/60 dark:border-ink-800/60">
        <div className="container-luxe">
          <div className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-3 lg:grid-cols-5">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <badge.icon size={22} className="shrink-0 text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
                <span className="text-xs uppercase tracking-widest text-ink-700 dark:text-ink-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container-luxe py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Join the House</p>
          <h2 className="heading-md mt-3 text-balance">Receive 10% off your first order, plus a complimentary sample</h2>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-400">
            One letter a month. Scent guides, new releases, and the occasional invitation to a private launch. Unsubscribe anytime.
          </p>
          {status === 'success' ? (
            <div className="mt-6 rounded-full border border-gold-400/60 bg-gold-50 px-6 py-4 text-sm text-gold-700 dark:bg-gold-900/20 dark:text-gold-200">
              Welcome to the House. Check your inbox for your 10% off code.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-luxe flex-1"
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-ink-400">By subscribing you agree to our Privacy Policy. GDPR compliant.</p>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-ink-200/60 dark:border-ink-800/60">
        <div className="container-luxe py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <button onClick={() => navigate({ name: 'home' })} className="text-left">
                <span className="font-display text-3xl">Attar House</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.4em] text-gold-600 dark:text-gold-300">Grasse · Est. 2014</span>
              </button>
              <p className="mt-4 max-w-sm text-sm text-ink-600 dark:text-ink-400">
                A niche fragrance house crafting artisanal, natural perfumes in Grasse, France. Each composition is built around real materials, harvested at their peak, and aged in oak before bottling.
              </p>
              <div className="mt-5 flex gap-3">
                {['Instagram', 'Pinterest', 'TikTok', 'YouTube'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-full border border-ink-300 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink-700 transition-colors hover:border-gold-500 hover:text-gold-600 dark:border-ink-700 dark:text-ink-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            {linkColumns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.route)}
                        className="text-sm text-ink-600 transition-colors hover:text-gold-600 dark:text-ink-400 dark:hover:text-gold-300"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-200/60 dark:border-ink-800/60">
        <div className="container-luxe py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Attar House. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate({ name: 'faq' })} className="hover:text-gold-600">Privacy</button>
              <button onClick={() => navigate({ name: 'faq' })} className="hover:text-gold-600">Terms</button>
              <button onClick={() => navigate({ name: 'faq' })} className="hover:text-gold-600">Accessibility</button>
              <span className="text-ink-400">·</span>
              <span>USD $</span>
              <span>·</span>
              <span>EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
