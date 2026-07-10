export type ScentFamily =
  | 'Floral'
  | 'Woody'
  | 'Oriental'
  | 'Fresh'
  | 'Chypre'
  | 'Gourmand'
  | 'Citrus'
  | 'Aromatic';

export type Concentration = 'Extrait' | 'Eau de Parfum' | 'Eau de Toilette' | 'Eau de Cologne';

export type Gender = 'Unisex' | 'Feminine' | 'Masculine';

export interface Note {
  name: string;
  family: ScentFamily;
}

export interface Pyramid {
  top: Note[];
  heart: Note[];
  base: Note[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  location?: string;
  hasPhoto?: boolean;
  helpful?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  family: ScentFamily;
  gender: Gender;
  concentration: Concentration;
  price: number;
  sizes: { ml: number; price: number; sample?: boolean }[];
  defaultSizeMl: number;
  rating: number;
  reviewCount: number;
  longevity: number; // 1-5
  sillage: number; // 1-5
  vegan: boolean;
  natural: boolean;
  crueltyFree: boolean;
  bestSeller?: boolean;
  new?: boolean;
  limited?: boolean;
  occasion: string[];
  mood: string[];
  pyramid: Pyramid;
  inspiration: string;
  story: string;
  ingredients: string;
  image: string;
  gallery: string[];
  color: string; // hex for bottle accent
  launchYear: number;
  perfumer: string;
  reviews: Review[];
  badges?: string[];
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Scent Guides' | 'Behind the Scenes' | 'Trends' | 'How-To';
  author: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  product: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
  accent: string;
}

export type Route =
  | { name: 'home' }
  | { name: 'shop'; family?: ScentFamily }
  | { name: 'product'; slug: string }
  | { name: 'discovery' }
  | { name: 'about' }
  | { name: 'journal' }
  | { name: 'journal-post'; slug: string }
  | { name: 'contact' }
  | { name: 'faq' }
  | { name: 'account' }
  | { name: 'sample-club' }
  | { name: 'sustainability' };
