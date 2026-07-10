import { useMemo, useState } from 'react';
import { ArrowRight, Check, Compass, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { Bottle } from '../components/Bottle';
import { Stars } from '../components/Stars';
import type { Product, ScentFamily } from '../types';

const variants: Array<'flask' | 'square' | 'round' | 'tall'> = ['flask', 'square', 'round', 'tall'];

interface Choice {
  id: string;
  label: string;
  description: string;
  families?: ScentFamily[];
  moods?: string[];
  occasions?: string[];
  color?: string;
}

const questions: { id: string; title: string; subtitle: string; choices: Choice[] }[] = [
  {
    id: 'moment',
    title: 'Where do you feel most yourself?',
    subtitle: 'Choose the place that calls to you.',
    choices: [
      { id: 'forest', label: 'A forest after rain', description: 'Damp earth, green leaves, silence', families: ['Woody', 'Aromatic'], moods: ['Grounded', 'Fresh'], color: '#5e7049' },
      { id: 'garden', label: 'A garden in full bloom', description: 'Roses, jasmine, warm sun', families: ['Floral'], moods: ['Romantic', 'Elegant'], color: '#c47a8a' },
      { id: 'market', label: 'A spice market at dusk', description: 'Cardamom, saffron, smoke', families: ['Oriental', 'Gourmand'], moods: ['Sensual', 'Warm'], color: '#8a4a2f' },
      { id: 'coast', label: 'A Mediterranean coast', description: 'Citrus, sea air, fig trees', families: ['Citrus', 'Fresh'], moods: ['Fresh', 'Carefree'], color: '#a8b886' },
    ],
  },
  {
    id: 'season',
    title: 'Which season is yours?',
    subtitle: 'When do you come alive?',
    choices: [
      { id: 'spring', label: 'Spring', description: 'First bloom, green shoots', families: ['Floral', 'Fresh'], occasions: ['Spring'] },
      { id: 'summer', label: 'Summer', description: 'Heat, light, long days', families: ['Citrus', 'Fresh', 'Aromatic'], occasions: ['Summer', 'Vacation'] },
      { id: 'autumn', label: 'Autumn', description: 'Woodsmoke, wool, golden light', families: ['Woody', 'Chypre'], occasions: ['Autumn', 'Cozy'] },
      { id: 'winter', label: 'Winter', description: 'Cold air, candlelight, warmth', families: ['Oriental', 'Gourmand'], occasions: ['Winter', 'Evening'] },
    ],
  },
  {
    id: 'mood',
    title: 'How do you want to feel?',
    subtitle: 'Pick the feeling you chase.',
    choices: [
      { id: 'sensual', label: 'Sensual & mysterious', description: 'A fragrance that draws people closer', moods: ['Sensual', 'Mysterious', 'Warm'] },
      { id: 'clean', label: 'Clean & effortless', description: 'Like freshly laundered linen', moods: ['Clean', 'Minimal', 'Energetic'] },
      { id: 'bold', label: 'Bold & unforgettable', description: 'A scent that enters the room first', moods: ['Bold', 'Opulent'] },
      { id: 'comforting', label: 'Comforting & warm', description: 'A cashmere sweater in a bottle', moods: ['Comforting', 'Warm', 'Grounded'] },
    ],
  },
  {
    id: 'intensity',
    title: 'How present should your fragrance be?',
    subtitle: 'There is no wrong answer.',
    choices: [
      { id: 'whisper', label: 'A whisper', description: 'Only those who lean in can smell it', moods: ['Minimal', 'Clean'] },
      { id: 'conversation', label: 'A conversation', description: 'Noticeable to those near you', moods: ['Elegant', 'Romantic'] },
      { id: 'statement', label: 'A statement', description: 'You announce the room', moods: ['Bold', 'Opulent'] },
      { id: 'memory', label: 'A memory', description: 'You linger after you leave', moods: ['Sensual', 'Mysterious'] },
    ],
  },
  {
    id: 'occasion',
    title: 'When will you wear it most?',
    subtitle: 'Your everyday, or your special moments?',
    choices: [
      { id: 'everyday', label: 'Every day, to work', description: 'A versatile signature', occasions: ['Daytime', 'Office'] },
      { id: 'evening', label: 'Evenings out', description: 'For dinner, dates, and after dark', occasions: ['Evening', 'Date Night'] },
      { id: 'special', label: 'Special occasions', description: 'For the moments that matter', occasions: ['Special Occasion', 'Wedding'] },
      { id: 'weekend', label: 'Weekends & travel', description: 'Easy, carefree, alive', occasions: ['Vacation', 'Daytime'] },
    ],
  },
  {
    id: 'values',
    title: 'What matters to you?',
    subtitle: 'Choose all that apply — or none.',
    choices: [
      { id: 'vegan', label: 'Vegan', description: 'No animal-derived materials' },
      { id: 'natural', label: 'Natural origin', description: 'Built from real materials, not synthetics' },
      { id: 'unisex', label: 'Unisex', description: 'Not for him or her — for you' },
      { id: 'artisanal', label: 'Artisanal craft', description: 'Small-batch, hand-poured, aged in oak' },
    ],
  },
];

export function Discovery() {
  const { navigate, addToCart } = useStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const isLast = step === questions.length - 1;
  const current = questions[step];
  const selected = answers[current.id] ?? [];

  const toggleChoice = (choiceId: string, multi: boolean) => {
    setAnswers((prev) => {
      const currentSelected = prev[current.id] ?? [];
      if (multi) {
        return { ...prev, [current.id]: currentSelected.includes(choiceId) ? currentSelected.filter((c) => c !== choiceId) : [...currentSelected, choiceId] };
      }
      return { ...prev, [current.id]: [choiceId] };
    });
  };

  const recommendations = useMemo(() => {
    const families = new Set<ScentFamily>();
    const moods = new Set<string>();
    const occasions = new Set<string>();
    let vegan = false, natural = false, unisex = false;

    Object.entries(answers).forEach(([qId, choiceIds]) => {
      choiceIds.forEach((cId) => {
        const choice = questions.find((q) => q.id === qId)?.choices.find((c) => c.id === cId);
        if (!choice) return;
        choice.families?.forEach((f) => families.add(f));
        choice.moods?.forEach((m) => moods.add(m));
        choice.occasions?.forEach((o) => occasions.add(o));
        if (qId === 'values') {
          if (cId === 'vegan') vegan = true;
          if (cId === 'natural') natural = true;
          if (cId === 'unisex') unisex = true;
        }
      });
    });

    const scored = products.map((p) => {
      let score = 0;
      if (families.has(p.family)) score += 3;
      p.mood.forEach((m) => { if (moods.has(m)) score += 1.5; });
      p.occasion.forEach((o) => { if (occasions.has(o)) score += 1; });
      if (vegan && p.vegan) score += 1;
      if (natural && p.natural) score += 1;
      if (unisex && p.gender === 'Unisex') score += 1;
      // small randomization tiebreaker
      score += Math.random() * 0.1;
      return { product: p, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((s) => s.product);
  }, [answers]);

  const showResults = isLast && (answers[current.id]?.length ?? 0) > 0;

  if (showResults) {
    return (
      <div className="container-luxe py-12 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-600 dark:text-gold-300">Your Recommendations</p>
          <h1 className="heading-lg mt-4 text-balance">Three fragrances, chosen for you</h1>
          <p className="mt-4 text-ink-600 dark:text-ink-400 text-pretty">
            Based on your answers, these are the scents we think will feel most like you. Try them as samples first — your nose is the final judge.
          </p>
          <div className="divider-gold mt-8" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {recommendations.map((p, i) => (
            <RecommendationCard key={p.id} product={p} rank={i} onAdd={() => addToCart(p, 2, 1)} onView={() => navigate({ name: 'product', slug: p.slug })} />
          ))}
        </div>

        {/* Sample bundle */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-8 text-center dark:from-ink-900 dark:to-ink-950">
          <p className="eyebrow text-gold-300">Try All Three</p>
          <h2 className="heading-md mt-3 text-ink-50">The Discovery Set</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-200/80">
            Three 2ml samples of your recommended fragrances, delivered to your door. $30 — and the full amount becomes credit toward a full bottle.
          </p>
          <button
            onClick={() => recommendations.forEach((p) => addToCart(p, 2, 1))}
            className="btn-primary mt-6 !bg-gold-400 !text-ink-900 hover:!bg-ink-50"
          >
            <Sparkles size={14} /> Add All Samples to Bag · $42
          </button>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => { setAnswers({}); setStep(0); }}
            className="btn-ghost"
          >
            <RotateCcw size={14} /> Retake the Quiz
          </button>
        </div>
      </div>
    );
  }

  const progress = ((step + (selected.length > 0 ? 0.5 : 0)) / questions.length) * 100;

  return (
    <div className="container-luxe py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow flex items-center justify-center gap-2 text-gold-600 dark:text-gold-300">
            <Compass size={14} /> The Discovery Quiz
          </p>
          <h1 className="heading-lg mt-4 text-balance">Find the fragrance that feels like you</h1>
          <p className="mt-3 text-ink-600 dark:text-ink-400">Six questions. Two minutes. Three personalized recommendations.</p>
        </div>

        {/* Progress */}
        <div className="mt-10 flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">Question {step + 1} of {questions.length}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
            <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div key={current.id} className="mt-10 animate-fade-up">
          <h2 className="heading-md text-balance">{current.title}</h2>
          <p className="mt-2 text-ink-500 dark:text-ink-400">{current.subtitle}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {current.choices.map((choice) => {
              const isSelected = selected.includes(choice.id);
              return (
                <button
                  key={choice.id}
                  onClick={() => toggleChoice(choice.id, current.id === 'values')}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                    isSelected
                      ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                      : 'border-ink-200/60 hover:border-gold-400/60 dark:border-ink-800/60'
                  }`}
                >
                  {choice.color && (
                    <div
                      className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                      style={{ background: choice.color }}
                    />
                  )}
                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl leading-tight">{choice.label}</p>
                      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{choice.description}</p>
                    </div>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected ? 'border-gold-500 bg-gold-500 text-ink-900' : 'border-ink-300 dark:border-ink-700'
                    }`}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`btn-ghost ${step === 0 ? 'invisible' : ''}`}
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}
              disabled={selected.length === 0}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? 'See My Results' : 'Continue'} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ product, rank, onAdd, onView }: { product: Product; rank: number; onAdd: () => void; onView: () => void }) {
  const labels = ['Top Match', 'Also Try', 'A Wildcard'];
  return (
    <article className="group card-surface flex flex-col overflow-hidden hover:border-gold-400/60">
      <button onClick={onView} className="relative" aria-label={`View ${product.name}`}>
        <div
          className="flex aspect-square items-center justify-center"
          style={{ background: `linear-gradient(160deg, ${product.color}26, ${product.color}0a)` }}
        >
          <Bottle color={product.color} size={180} variant={variants[rank % variants.length]} className="transition-transform duration-700 group-hover:scale-105" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink-900/85 px-3 py-1 text-[10px] uppercase tracking-widest text-gold-300 backdrop-blur">
          {labels[rank]}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{product.family}</p>
        <button onClick={onView} className="mt-1 text-left">
          <h3 className="heading-sm transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-300">{product.name}</h3>
        </button>
        <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-400">{product.tagline}</p>
        <div className="mt-2"><Stars rating={product.rating} showValue count={product.reviewCount} /></div>
        <p className="mt-3 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{product.inspiration}</p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button onClick={onAdd} className="btn-primary flex-1 !py-2.5 !text-[10px]">Add Sample · ${product.sizes.find((s) => s.sample)?.price}</button>
          <button onClick={onView} className="btn-ghost !px-4 !py-2.5 !text-[10px]">View</button>
        </div>
      </div>
    </article>
  );
}
