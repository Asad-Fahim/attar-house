import { ArrowRight, Droplets, Leaf, Recycle, TreePine } from 'lucide-react';
import { useStore } from '../store';

export function Sustainability() {
  const { navigate } = useStore();
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg" alt="Mediterranean landscape" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-sage-900/50 to-ink-950/80" />
        </div>
        <div className="container-luxe relative flex min-h-[55vh] items-end pb-16 pt-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-sage-300">Our Commitment</p>
            <h1 className="heading-xl mt-4 text-ink-50 text-balance">Luxury that does not cost the earth</h1>
            <p className="mt-5 max-w-xl text-lg text-ink-100/90 text-pretty">
              We believe a fragrance should be as kind to the world as it is to the person who wears it. Here is exactly how we work, and what we are still working on.
            </p>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: '92% Natural Origin', body: 'Across our entire collection. We name every ingredient on the bottle and publish our full INCI list online.' },
            { icon: TreePine, title: 'Regenerative Sourcing', body: 'We work with twelve partner farms practicing organic and regenerative agriculture. We visit every one, every year.' },
            { icon: Recycle, title: 'Refillable Bottles', body: 'Every full-size bottle is designed to be refilled. Refills use 80% less glass and cost 30% less.' },
            { icon: Droplets, title: 'Waterless Formulation', body: 'Our extraits are alcohol- and oil-based only — no water, no preservatives, no shortcuts.' },
          ].map((p) => (
            <div key={p.title} className="card-surface p-6">
              <p.icon size={26} className="text-sage-600 dark:text-sage-300" strokeWidth={1.4} />
              <h3 className="heading-sm mt-4">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 text-pretty">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-50/50 py-20 dark:bg-ink-950/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Transparency Report</p>
            <h2 className="heading-lg mt-3 text-balance">Our 2025 numbers</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { v: '92%', l: 'Natural Origin' },
              { v: '12', l: 'Partner Farms' },
              { v: '0', l: 'Animal Testing' },
              { v: '100%', l: 'Recyclable Packaging' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-5xl text-sage-600 dark:text-sage-300">{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-500 dark:text-ink-400 text-pretty">
            We publish a full transparency report annually, including the things we have not yet solved. We believe honesty is part of sustainability.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sage-100 to-ink-50 p-10 dark:from-sage-900/30 dark:to-ink-950">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-sage-700 dark:text-sage-300">Refill, Don't Replace</p>
              <h2 className="heading-lg mt-3 text-balance">Every bottle is designed for a second life</h2>
              <p className="mt-4 text-ink-600 dark:text-ink-300 text-pretty">
                Our refill program lets you send back empty bottles for a 15% credit on your next purchase, or refill them at home with our 250ml refill pouches. Less glass, less waste, lower cost.
              </p>
              <button onClick={() => navigate({ name: 'shop' })} className="btn-primary mt-6">Shop Refillable Fragrances <ArrowRight size={14} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg', 'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg'].map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl">
                  <img src={src} alt="Sustainable packaging" className="aspect-square w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
