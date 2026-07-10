import { ArrowRight, Check, Gift, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { Bottle } from '../components/Bottle';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

export function SampleClub() {
  const { navigate, addToCart, showToast } = useStore();

  const tiers = [
    { name: 'The Explorer', price: 25, samples: 3, perks: ['Three 2ml samples monthly', 'Perfumer tasting notes', 'Full credit toward full bottles', 'Cancel anytime'] },
    { name: 'The Connoisseur', price: 45, samples: 5, perks: ['Five 2ml samples monthly', 'Early access to new releases', 'Invitations to private launches', 'Full credit + 10% bonus', 'Free shipping'], featured: true },
    { name: 'The Collector', price: 85, samples: 8, perks: ['Eight 2ml samples monthly', 'All Connoisseur perks', 'Annual full-size birthday gift', 'Personal perfumer consultation', 'Full credit + 20% bonus'] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-ink-50 to-gold-50 py-20 dark:from-rose-950/30 dark:via-ink-950 dark:to-ink-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-rose-300/20 blur-3xl animate-mist" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gold-300/20 blur-3xl animate-mist" style={{ animationDelay: '3s' }} />
        </div>
        <div className="container-luxe relative text-center">
          <p className="eyebrow text-rose-600 dark:text-rose-300">The Sample Club</p>
          <h1 className="heading-xl mx-auto mt-4 max-w-3xl text-balance">
            Discover a new fragrance every month
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-600 dark:text-ink-300 text-pretty">
            Hand-selected 2ml samples, chosen by our perfumers, delivered to your door. Every cent becomes credit toward the full bottles you fall in love with.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => showToast('Welcome to the Sample Club!')} className="btn-primary">
              Join Now <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate({ name: 'discovery' })} className="btn-ghost">
              Take the Quiz First
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-luxe py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="heading-lg mt-3 text-balance">Three steps to your next signature scent</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { n: '01', title: 'Tell us your tastes', body: 'Take our preference quiz or update your profile anytime. Our perfumers learn what you love.' },
            { n: '02', title: 'Receive your samples', body: 'Three to eight 2ml samples arrive each month, with tasting notes from the perfumer who composed them.' },
            { n: '03', title: 'Fall in love, get credit', body: 'Order full bottles of the ones you love. Your subscription fee becomes credit — every dollar, every month.' },
          ].map((step) => (
            <div key={step.n} className="text-center">
              <p className="font-display text-5xl text-gold-500/40 dark:text-gold-400/40">{step.n}</p>
              <h3 className="heading-sm mt-3">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 text-pretty">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-ink-50/50 py-20 dark:bg-ink-950/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Choose Your Membership</p>
            <h2 className="heading-lg mt-3 text-balance">Three ways to discover</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-400">All tiers include full credit toward full bottles. Cancel or pause anytime.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.featured
                    ? 'border-gold-500 bg-[rgb(var(--card))] shadow-xl lg:-translate-y-4'
                    : 'border-ink-200/60 bg-[rgb(var(--card))] dark:border-ink-800/60'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-[10px] uppercase tracking-widest text-ink-900">Most Popular</span>
                )}
                <h3 className="heading-sm">{tier.name}</h3>
                <p className="mt-3 font-display text-5xl">${tier.price}<span className="text-base text-ink-500 dark:text-ink-400">/mo</span></p>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{tier.samples} samples per month</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-300" /> {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => showToast(`Joined ${tier.name}!`)}
                  className={`mt-8 w-full ${tier.featured ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Join {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* This month's selection */}
      <section className="container-luxe py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">This Month's Selection</p>
          <h2 className="heading-lg mt-3 text-balance">What members are receiving</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 5).map((p, i) => (
            <button
              key={p.id}
              onClick={() => navigate({ name: 'product', slug: p.slug })}
              className="group flex flex-col items-center rounded-2xl border border-ink-200/60 p-5 text-center transition-all hover:border-gold-400/60 dark:border-ink-800/60"
            >
              <div
                className="flex h-32 w-full items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}
              >
                <Bottle color={p.color} size={80} variant={variants[i % variants.length]} className="transition-transform duration-500 group-hover:scale-110" />
              </div>
              <p className="mt-3 font-display text-lg">{p.name}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">{p.family}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Gift */}
      <section className="container-luxe pb-20">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-10 text-center dark:from-ink-900 dark:to-ink-950">
          <Gift size={32} className="mx-auto text-gold-300" />
          <h2 className="heading-md mx-auto mt-4 max-w-xl text-ink-50 text-balance">Gift a Sample Club membership</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-200/80">
            Three, six, or twelve months of discovery — perfect for the fragrance lover who has everything.
          </p>
          <button onClick={() => addToCart(products[0], 2, 1)} className="btn-primary mt-6 !bg-gold-400 !text-ink-900 hover:!bg-ink-50">
            <Sparkles size={14} /> Gift the Club
          </button>
        </div>
      </section>
    </div>
  );
}
