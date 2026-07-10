import type { Collection, JournalPost, Testimonial } from '../types';

export const collections: Collection[] = [
  {
    id: 'c1',
    name: 'The Noir Collection',
    description:
      'Deep, resinous, and unapologetically nocturnal. Fragrances for the hours after dark.',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    productIds: ['p1', 'p3', 'p5'],
    accent: '#8a4a2f',
  },
  {
    id: 'c2',
    name: 'The Floral Atelier',
    description:
      'Petals captured at their peak. Our most romantic and feminine compositions.',
    image: 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg',
    productIds: ['p2', 'p7'],
    accent: '#e8c9d4',
  },
  {
    id: 'c3',
    name: 'The Mediterranean Edit',
    description:
      'Sun, citrus, and sea air. Fragrances that smell like the summer you wish you were having.',
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg',
    productIds: ['p4', 'p6'],
    accent: '#a8b886',
  },
  {
    id: 'c4',
    name: 'The Wood Library',
    description:
      'Cedar, sandalwood, oud, and vetiver. For those who prefer their scents dry and grounded.',
    image: 'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg',
    productIds: ['p3', 'p8', 'p5'],
    accent: '#5a4a3a',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'I have been a customer for four years. Attar House is the only house whose fragrances I can identify blindfolded — they all smell like real things, not "perfume."',
    author: 'Isabelle R.',
    location: 'Paris, France',
    rating: 5,
    product: 'Velvet Amber Noir',
  },
  {
    id: 't2',
    quote:
      'The discovery quiz recommended Fleur de Lune and it was uncannily accurate. It is now my signature and I get asked about it constantly.',
    author: 'Mei L.',
    location: 'Singapore',
    rating: 5,
    product: 'Fleur de Lune',
  },
  {
    id: 't3',
    quote:
      'I appreciate that they send a sample with every full bottle. I have discovered two of my favorite scents that way — ones I never would have tried.',
    author: 'James D.',
    location: 'London, UK',
    rating: 5,
    product: 'Cedar & Smoke',
  },
  {
    id: 't4',
    quote:
      'The sample club is the best $25 a month I spend. I have discovered fragrances I never knew I loved and the full-bottle credits make it pay for itself.',
    author: 'Sofia M.',
    location: 'Milan, Italy',
    rating: 5,
    product: 'Sample Club member',
  },
];

export const journalPosts: JournalPost[] = [
  {
    id: 'j1',
    slug: 'best-woody-perfumes-2026',
    title: 'The Best Woody Perfumes of 2026',
    excerpt:
      'From cedar to sandalwood to oud, our guide to the woody fragrances worth wearing this year — and how to choose between them.',
    category: 'Scent Guides',
    author: 'Élise Moreau',
    date: '2026-06-18',
    readTime: '8 min',
    image: 'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg',
    body: [
      'Woody fragrances have quietly become the most coveted category in niche perfumery, and for good reason. Where florals can feel dated and citruses fleeting, woods offer depth, longevity, and a kind of grown-up sensuality that works across seasons and genders.',
      'The category is broader than it sounds. Cedar is dry and almost pencil-shaving fresh; sandalwood is creamy and intimate; oud is resinous, animalic, and polarizing; vetiver is earthy and slightly smoky. A great woody fragrance knows which wood it is built around and lets that wood lead.',
      'Our Cedar & Smoke is built on Virginia cedar with a birch tar base — it is the most literal interpretation of "woody" in our collection. Santal Mystique, by contrast, uses Mysore sandalwood for its creamy warmth, softened with cardamom and iris. They are both woody fragrances, but they could not be more different.',
      'When choosing a woody fragrance, consider when you will wear it. Cedar and vetiver are excellent for daytime and office; sandalwood and oud come into their own in the evening. And do not be afraid of the category if you have historically worn florals — the right woody fragrance can be the most versatile thing in your wardrobe.',
    ],
  },
  {
    id: 'j2',
    slug: 'how-to-choose-fragrance',
    title: 'How to Choose a Fragrance You Will Actually Wear',
    excerpt:
      'A practical guide to finding your signature scent — without buying a dozen bottles you will never finish.',
    category: 'How-To',
    author: 'Henrik Lindqvist',
    date: '2026-06-10',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/264787/pexels-photo-264787.jpeg',
    body: [
      'The most common mistake people make with fragrance is buying a full bottle after a single sniff in a store. Perfume changes on skin over hours, and what smells wonderful in the first thirty seconds can become cloying by the second hour — or, just as often, the reverse.',
      'Start with samples. Wear each one for a full day and pay attention to the dry-down, which is what you and the people around you will actually live with. Notice when strangers ask what you are wearing — that is usually a good sign.',
      'Think about your life before your preferences. If you work in a close office, a subtle fragrance will serve you better than a powerhouse. If you live somewhere warm, fresh and citrus compositions bloom; in cold climates, you can carry heavier orientals and woods.',
      'And finally: a signature scent is not a lifetime commitment. Many of our customers rotate between two or three fragrances seasonally. The goal is not to find one scent forever — it is to find scents that feel like you, in the life you actually have.',
    ],
  },
  {
    id: 'j3',
    slug: 'behind-the-bottle-velvet-amber',
    title: 'Behind the Bottle: Velvet Amber Noir',
    excerpt:
      'Three years, two trips to Morocco, and one very stubborn amber accord. The making of our bestseller.',
    category: 'Behind the Scenes',
    author: 'Élise Moreau',
    date: '2026-05-28',
    readTime: '10 min',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    body: [
      'Velvet Amber Noir began with a single evening in Marrakech. I was sitting in the courtyard of a small riad, drinking mint tea, and the air was thick with incense from a nearby censer, rose petals underfoot, and the faintest trace of woodsmoke from a kitchen somewhere behind me. I wrote in my notebook: "this is what I want to make."',
      'It took three years. The amber accord alone went through forty-seven iterations. Amber is not a single material but a family of resins, and getting the balance of labdanum, benzoin, and vanilla to feel warm rather than sweet was the hardest part. The breakthrough came when I added a small amount of real Cambodian oud — it gave the amber a darkness it had been missing.',
      'The Bulgarian rose was the last piece. I had been using Turkish rose, which is beautiful but too bright for this composition. The Bulgarian, with its deeper, slightly honeyed character, was exactly right. It sits in the heart of the fragrance like a velvet cushion.',
      'When we finally released it, I was nervous. It is not an easy fragrance — it is intense, resinous, and unapologetic. But the response was immediate and overwhelming. It is now our bestseller, and the fragrance I am most proud of in our collection.',
    ],
  },
  {
    id: 'j4',
    slug: 'fragrance-trends-2026',
    title: 'Fragrance Trends We Are Watching in 2026',
    excerpt:
      'The rise of the extrait, the return of chypre, and why everyone suddenly wants to smell like a library.',
    category: 'Trends',
    author: 'Lucia Romano',
    date: '2026-05-15',
    readTime: '7 min',
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg',
    body: [
      'The biggest shift we are seeing in 2026 is the move toward higher concentrations. Customers who once reached for eau de toilette are now asking for extrait — and they are willing to pay for it. The reason is simple: longevity. A great extrait lasts eight hours on skin where an EDT lasts three.',
      'Chypre is back. The bergamot-rose-oakmoss structure that defined mid-century perfumery fell out of favor as regulations restricted oakmoss, but modern chypre constructions using everny and other alternatives are winning back devotees. Expect to see more of them.',
      'The "old library" accord — paper, dust, leather, and a hint of vanilla — has become the surprise hit of the year. It is part of a broader turn toward "atmospheric" fragrances that smell like places rather than flowers or foods. We are experimenting with our own version for 2027.',
      'Finally, transparency matters more than ever. Customers want to know what is in their fragrance, where it came from, and whether it was produced ethically. The brands that can answer those questions clearly will win.',
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
