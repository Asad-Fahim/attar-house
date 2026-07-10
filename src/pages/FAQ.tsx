import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Shopping Online',
    items: [
      { q: 'How do I choose a fragrance when I cannot smell it online?', a: 'This is the most common question we hear, and we have built our entire business around answering it. Start with our Discovery Quiz — it recommends three fragrances based on your preferences. Then order 2ml samples of each ($12–$18) to try at home for a full day. Every full bottle also ships with a complimentary sample, so if you do not love it, you can return the unopened bottle under our 30-day policy.' },
      { q: 'What is the difference between Eau de Cologne, Eau de Toilette, Eau de Parfum, and Extrait?', a: 'Concentration. Eau de Cologne is the lightest (2–5% fragrance oil), followed by Eau de Toilette (5–15%), Eau de Parfum (15–20%), and Extrait (20–40%). Higher concentration means more longevity and sillage, and usually a higher price — but a little goes a longer way. Most of our fragrances are Eau de Parfum or Extrait.' },
      { q: 'Are your fragrances vegan and cruelty-free?', a: 'All but one. Oud Impérial contains natural oud oil, which is not vegan. Every other fragrance in our collection is vegan and cruelty-free. We never test on animals and never work with suppliers who do.' },
    ],
  },
  {
    category: 'Shipping & Returns',
    items: [
      { q: 'How long does shipping take?', a: 'Orders ship from Grasse within 1–2 business days. Standard shipping within the EU takes 3–5 business days; international orders take 7–14 business days depending on customs. Express shipping is available at checkout.' },
      { q: 'Do you offer free shipping?', a: 'Yes — complimentary standard shipping on all orders over $150. Orders under $150 ship for a flat $8.' },
      { q: 'What is your return policy?', a: '30 days, no questions asked — and we accept returns even on opened bottles, because we believe you cannot truly know a fragrance until you have worn it. We also include a prepaid return label with every order over $150.' },
      { q: 'Can I return a sample?', a: 'Samples are non-returnable, but they are also inexpensive ($12–$18) and we credit the full amount toward a full bottle when you decide to buy one.' },
    ],
  },
  {
    category: 'The Sample Club',
    items: [
      { q: 'What is the Sample Club?', a: 'A monthly subscription: three hand-selected 2ml samples delivered each month, chosen by our perfumers based on your preferences. $25/month, cancel anytime. Every dollar you spend on the subscription becomes credit toward full bottles.' },
      { q: 'Can I choose my samples?', a: 'You can indicate preferences (families you love, ones you want to avoid) in your account, and our perfumers will select accordingly. You can also swap one sample per month if you have already tried it.' },
      { q: 'How do I use my credit?', a: 'Your subscription credit appears automatically at checkout. $25/month becomes $25 toward any full bottle, with no expiry.' },
    ],
  },
  {
    category: 'Authenticity & Care',
    items: [
      { q: 'How do I know my fragrance is authentic?', a: 'Every bottle ships in our branded packaging with a batch code printed on the box and engraved on the bottle base. You can verify any batch code on our authenticity page. We never sell through third-party marketplaces — if you see our products on Amazon or eBay, they are not ours.' },
      { q: 'How should I store my fragrance?', a: 'Away from direct sunlight, heat, and humidity. A cool, dark cupboard is ideal. Do not store fragrances in the bathroom — the humidity degrades them. Stored properly, our fragrances last 3–5 years; extrait concentrations can last a decade.' },
      { q: 'Why does my fragrance smell different on me than on my friend?', a: 'Skin chemistry — pH, oils, diet, and even medication — affects how a fragrance develops. This is why we encourage sampling on your own skin rather than testing on paper strips or someone else.' },
    ],
  },
];

export function FAQ() {
  const [open, setOpen] = useState<string | null>('0-0');

  return (
    <div className="container-luxe py-12 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Frequently Asked</p>
        <h1 className="heading-lg mt-3 text-balance">Everything you need to know</h1>
        <p className="mt-3 text-ink-600 dark:text-ink-400 text-pretty">
          Cannot find your answer? <button className="underline underline-offset-4 text-gold-600 dark:text-gold-300">Contact us</button> and we will reply within a day.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-10">
        {faqs.map((group, gi) => (
          <div key={group.category}>
            <h2 className="heading-sm mb-4">{group.category}</h2>
            <div className="space-y-2">
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const isOpen = open === key;
                return (
                  <div key={key} className="card-surface overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? null : key)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="font-display text-lg">{item.q}</span>
                      <ChevronDown size={18} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180 text-gold-600 dark:text-gold-300' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-ink-600 dark:text-ink-300 text-pretty animate-fade-in">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
