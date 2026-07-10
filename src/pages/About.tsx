import { ArrowRight, Leaf, MapPin, Users } from 'lucide-react';
import { useStore } from '../store';
import { useReveal } from '../components/useReveal';

export function About() {
  const { navigate } = useStore();
  const ref = useReveal<HTMLDivElement>();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
            alt="Rose fields in Grasse"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 to-ink-950/70" />
        </div>
        <div className="container-luxe relative flex min-h-[60vh] items-end pb-16 pt-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">Our Story</p>
            <h1 className="heading-xl mt-4 text-ink-50 text-balance">A house built on a single, stubborn belief</h1>
            <p className="mt-5 max-w-xl text-lg text-ink-100/90 text-pretty">
              That a perfume should be made from things that actually exist in the world — petals, resins, woods, citrus rinds — rather than the synthetic molecules that dominate modern perfumery.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-luxe py-24">
        <div ref={ref} className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">The Manifesto</p>
          <h2 className="heading-lg mt-4 text-balance">
            We are small. We intend to stay that way.
          </h2>
          <div className="mt-8 space-y-5 text-lg text-ink-600 dark:text-ink-300 text-pretty">
            <p>
              Attar House was founded in 2014 in a converted barn above Grasse, the historic capital of perfumery. We started with one idea that felt radical then and still feels radical now: that a perfume should be made from real materials, harvested at their peak, and aged slowly — not assembled from synthetic molecules in an afternoon.
            </p>
            <p>
              Ten years later, we work with twelve partner farms across the Mediterranean, age every composition in oak for a minimum of six months, and bottle by hand. We make a few thousand bottles of each fragrance a year. When a harvest fails, we do not substitute — we wait, or we discontinue.
            </p>
            <p>
              We believe this is what luxury actually means: not a higher price, but a deeper commitment to the way something is made.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink-50/50 py-24 dark:bg-ink-950/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Believe</p>
            <h2 className="heading-lg mt-3 text-balance">Three commitments, non-negotiable</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Leaf, title: 'Real Materials', body: '92% natural origin across our collection. We source from partner farms we have visited, and we name every ingredient on the bottle.' },
              { icon: MapPin, title: 'Place Matters', body: 'Rose from Grasse. Bergamot from Calabria. Oud from Cambodia. The same plant, grown elsewhere, smells different. We go to where the best grows.' },
              { icon: Users, title: 'People First', body: 'Our perfumers are named on every bottle. Our harvesters are paid fairly and credited. Our customers can email the founder directly.' },
            ].map((v) => (
              <div key={v.title} className="card-surface p-8">
                <v.icon size={28} className="text-gold-600 dark:text-gold-300" strokeWidth={1.4} />
                <h3 className="heading-sm mt-4">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 text-pretty">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-luxe py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">A Decade in the Making</p>
          <h2 className="heading-lg mt-3 text-balance">Our journey</h2>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          {[
            { year: '2014', title: 'The first barn', body: 'Founder Élise Moreau converts a barn above Grasse and releases the first three fragrances, made entirely from local materials.' },
            { year: '2017', title: 'The partner farms', body: 'We establish direct relationships with twelve farms across the Mediterranean, securing supply of our core materials.' },
            { year: '2020', title: 'The oak program', body: 'We begin aging every composition in oak barrels for a minimum of six months before bottling.' },
            { year: '2023', title: 'Velvet Amber Noir', body: 'Our bestseller launches and wins the Art & Olfaction Award for independent perfumery.' },
            { year: '2026', title: 'The Sample Club', body: 'We launch a monthly sample subscription, making niche perfumery accessible to everyone.' },
          ].map((item, i) => (
            <div key={item.year} className="flex gap-6 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500 font-display text-sm text-gold-600 dark:text-gold-300">{item.year}</span>
                {i < 4 && <span className="mt-2 h-full w-px flex-1 bg-ink-200 dark:bg-ink-800" />}
              </div>
              <div className="pt-2">
                <h3 className="heading-sm">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 text-pretty">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe pb-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-12 text-center dark:from-ink-900 dark:to-ink-950">
          <p className="eyebrow text-gold-300">Begin Your Discovery</p>
          <h2 className="heading-lg mx-auto mt-4 max-w-xl text-ink-50 text-balance">Find the fragrance that feels like you</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate({ name: 'discovery' })} className="btn-primary !bg-gold-400 !text-ink-900 hover:!bg-ink-50">
              Take the Discovery Quiz <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate({ name: 'shop' })} className="btn-ghost !border-ink-50/40 !text-ink-50 hover:!bg-ink-50 hover:!text-ink-900">
              Shop the Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
