import { useMemo, useState } from 'react';
import { ChevronDown, Filter, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { ScentFamily, Gender } from '../types';

const families: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus', 'Chypre', 'Gourmand', 'Aromatic'];
const genders: Gender[] = ['Unisex', 'Feminine', 'Masculine'];
const occasions = ['Daytime', 'Evening', 'Office', 'Date Night', 'Wedding', 'Vacation', 'Winter', 'Summer', 'Spring', 'Autumn', 'Cozy', 'Special Occasion'];
const moods = ['Sensual', 'Mysterious', 'Warm', 'Romantic', 'Elegant', 'Fresh', 'Bold', 'Grounded', 'Clean', 'Comforting', 'Opulent', 'Carefree', 'Energetic', 'Minimal', 'Timeless', 'Feminine', 'Masculine', 'Bright'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'new', label: 'Newest' },
] as const;

type SortValue = typeof sortOptions[number]['value'];

export function Shop() {
  const { route, navigate } = useStore();
  const initialFamily = route.name === 'shop' ? route.family : undefined;

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<SortValue>('featured');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [selectedFamilies, setSelectedFamilies] = useState<Set<ScentFamily>>(
    initialFamily ? new Set([initialFamily]) : new Set()
  );
  const [selectedGenders, setSelectedGenders] = useState<Set<Gender>>(new Set());
  const [selectedOccasions, setSelectedOccasions] = useState<Set<string>>(new Set());
  const [selectedMoods, setSelectedMoods] = useState<Set<string>>(new Set());
  const [priceMax, setPriceMax] = useState(650);
  const [veganOnly, setVeganOnly] = useState(false);
  const [naturalOnly, setNaturalOnly] = useState(false);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedFamilies.size > 0 && !selectedFamilies.has(p.family)) return false;
      if (selectedGenders.size > 0 && !selectedGenders.has(p.gender)) return false;
      if (selectedOccasions.size > 0 && !Array.from(selectedOccasions).some((o) => p.occasion.includes(o))) return false;
      if (selectedMoods.size > 0 && !Array.from(selectedMoods).some((m) => p.mood.includes(m))) return false;
      if (p.price > priceMax) return false;
      if (veganOnly && !p.vegan) return false;
      if (naturalOnly && !p.natural) return false;
      if (bestSellersOnly && !p.bestSeller) return false;
      if (newOnly && !p.new) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = [p.name, p.tagline, p.family, p.inspiration, ...p.pyramid.top, ...p.pyramid.heart, ...p.pyramid.base].map((x) => (typeof x === 'string' ? x : x.name)).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'new': result = [...result].sort((a, b) => b.launchYear - a.launchYear); break;
      default: result = [...result].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }
    return result;
  }, [selectedFamilies, selectedGenders, selectedOccasions, selectedMoods, priceMax, veganOnly, naturalOnly, bestSellersOnly, newOnly, search, sort]);

  const activeFilterCount =
    selectedFamilies.size + selectedGenders.size + selectedOccasions.size + selectedMoods.size +
    (veganOnly ? 1 : 0) + (naturalOnly ? 1 : 0) + (bestSellersOnly ? 1 : 0) + (newOnly ? 1 : 0) +
    (priceMax < 650 ? 1 : 0);

  const clearAll = () => {
    setSelectedFamilies(new Set());
    setSelectedGenders(new Set());
    setSelectedOccasions(new Set());
    setSelectedMoods(new Set());
    setPriceMax(650);
    setVeganOnly(false);
    setNaturalOnly(false);
    setBestSellersOnly(false);
    setNewOnly(false);
    setSearch('');
    navigate({ name: 'shop' });
  };

  return (
    <div className="container-luxe py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ink-500 dark:text-ink-400">
        <button onClick={() => navigate({ name: 'home' })} className="hover:text-gold-600">Home</button>
        <span>/</span>
        <span className="text-ink-800 dark:text-ink-200">Shop</span>
        {initialFamily && (
          <>
            <span>/</span>
            <span className="text-gold-600 dark:text-gold-300">{initialFamily}</span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow">The Collection</p>
        <h1 className="heading-lg mt-3">
          {initialFamily ? `${initialFamily} Fragrances` : 'All Fragrances'}
        </h1>
        <p className="mt-3 max-w-xl text-ink-600 dark:text-ink-400 text-pretty">
          {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'} · Each composed in Grasse, aged in oak, and bottled by hand.
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-ink-200/60 py-4 dark:border-ink-800/60">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 rounded-full border border-ink-300 px-4 py-2 text-xs uppercase tracking-widest lg:hidden dark:border-ink-700"
        >
          <Filter size={14} /> Filters {activeFilterCount > 0 && <span className="rounded-full bg-gold-500 px-1.5 text-ink-900">{activeFilterCount}</span>}
        </button>

        <div className="relative hidden flex-1 sm:block">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or note…"
            className="input-luxe max-w-xs"
          />
        </div>

        <div className="flex items-center gap-3 sm:ml-auto">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="appearance-none rounded-full border border-ink-300 bg-transparent py-2 pl-4 pr-9 text-xs uppercase tracking-widest dark:border-ink-700"
              aria-label="Sort by"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex overflow-hidden rounded-full border border-ink-300 dark:border-ink-700">
            <button
              onClick={() => setView('grid')}
              className={`p-2.5 ${view === 'grid' ? 'bg-ink-900 text-ink-50 dark:bg-ink-50 dark:text-ink-900' : ''}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2.5 ${view === 'list' ? 'bg-ink-900 text-ink-50 dark:bg-ink-50 dark:text-ink-900' : ''}`}
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterPanel
            selectedFamilies={selectedFamilies}
            selectedGenders={selectedGenders}
            selectedOccasions={selectedOccasions}
            selectedMoods={selectedMoods}
            priceMax={priceMax}
            veganOnly={veganOnly}
            naturalOnly={naturalOnly}
            bestSellersOnly={bestSellersOnly}
            newOnly={newOnly}
            onToggleFamily={(f) => toggle(selectedFamilies, f, setSelectedFamilies)}
            onToggleGender={(g) => toggle(selectedGenders, g, setSelectedGenders)}
            onToggleOccasion={(o) => toggle(selectedOccasions, o, setSelectedOccasions)}
            onToggleMood={(m) => toggle(selectedMoods, m, setSelectedMoods)}
            onPriceMax={setPriceMax}
            onVegan={setVeganOnly}
            onNatural={setNaturalOnly}
            onBestSellers={setBestSellersOnly}
            onNew={setNewOnly}
            onClear={clearAll}
            activeCount={activeFilterCount}
          />
        </aside>

        {/* Results */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-display text-3xl">No fragrances match</p>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Try removing a filter or broadening your search.</p>
              <button onClick={clearAll} className="btn-primary mt-6">Clear All Filters</button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} variant="list" onQuickView={() => navigate({ name: 'product', slug: p.slug })} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-[rgb(var(--bg))] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-2xl"><SlidersHorizontal size={18} /> Filters</span>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={22} /></button>
            </div>
            <div className="mt-6">
              <FilterPanel
                selectedFamilies={selectedFamilies}
                selectedGenders={selectedGenders}
                selectedOccasions={selectedOccasions}
                selectedMoods={selectedMoods}
                priceMax={priceMax}
                veganOnly={veganOnly}
                naturalOnly={naturalOnly}
                bestSellersOnly={bestSellersOnly}
                newOnly={newOnly}
                onToggleFamily={(f) => toggle(selectedFamilies, f, setSelectedFamilies)}
                onToggleGender={(g) => toggle(selectedGenders, g, setSelectedGenders)}
                onToggleOccasion={(o) => toggle(selectedOccasions, o, setSelectedOccasions)}
                onToggleMood={(m) => toggle(selectedMoods, m, setSelectedMoods)}
                onPriceMax={setPriceMax}
                onVegan={setVeganOnly}
                onNatural={setNaturalOnly}
                onBestSellers={setBestSellersOnly}
                onNew={setNewOnly}
                onClear={clearAll}
                activeCount={activeFilterCount}
              />
            </div>
            <button onClick={() => setShowFilters(false)} className="btn-primary mt-8 w-full">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterPanelProps {
  selectedFamilies: Set<ScentFamily>;
  selectedGenders: Set<Gender>;
  selectedOccasions: Set<string>;
  selectedMoods: Set<string>;
  priceMax: number;
  veganOnly: boolean;
  naturalOnly: boolean;
  bestSellersOnly: boolean;
  newOnly: boolean;
  onToggleFamily: (f: ScentFamily) => void;
  onToggleGender: (g: Gender) => void;
  onToggleOccasion: (o: string) => void;
  onToggleMood: (m: string) => void;
  onPriceMax: (n: number) => void;
  onVegan: (b: boolean) => void;
  onNatural: (b: boolean) => void;
  onBestSellers: (b: boolean) => void;
  onNew: (b: boolean) => void;
  onClear: () => void;
  activeCount: number;
}

function FilterPanel(p: FilterPanelProps) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <p className="font-display text-xl">Filter</p>
        {p.activeCount > 0 && (
          <button onClick={p.onClear} className="text-xs uppercase tracking-widest text-gold-600 hover:underline dark:text-gold-300">
            Clear ({p.activeCount})
          </button>
        )}
      </div>

      <FilterGroup title="Scent Family">
        <div className="flex flex-wrap gap-2">
          {families.map((f) => (
            <Chip key={f} active={p.selectedFamilies.has(f)} onClick={() => p.onToggleFamily(f)}>{f}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="For">
        <div className="flex flex-wrap gap-2">
          {genders.map((g) => (
            <Chip key={g} active={p.selectedGenders.has(g)} onClick={() => p.onToggleGender(g)}>{g}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={`Max Price · $${p.priceMax}`}>
        <input
          type="range"
          min={50}
          max={650}
          step={10}
          value={p.priceMax}
          onChange={(e) => p.onPriceMax(Number(e.target.value))}
          className="w-full"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-ink-400">
          <span>$50</span><span>$650</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Occasion">
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <Chip key={o} active={p.selectedOccasions.has(o)} onClick={() => p.onToggleOccasion(o)}>{o}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Mood">
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <Chip key={m} active={p.selectedMoods.has(m)} onClick={() => p.onToggleMood(m)}>{m}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Values">
        <div className="space-y-2">
          <CheckRow label="Vegan only" checked={p.veganOnly} onChange={p.onVegan} />
          <CheckRow label="Natural origin" checked={p.naturalOnly} onChange={p.onNatural} />
          <CheckRow label="Best sellers" checked={p.bestSellersOnly} onChange={p.onBestSellers} />
          <CheckRow label="New arrivals" checked={p.newOnly} onChange={p.onNew} />
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-widest text-ink-500 dark:text-ink-400">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
        active
          ? 'border-gold-500 bg-gold-500 text-ink-900'
          : 'border-ink-300 text-ink-700 hover:border-gold-500 dark:border-ink-700 dark:text-ink-200'
      }`}
    >
      {children}
    </button>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="flex w-full items-center gap-3 text-sm">
      <span className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${checked ? 'border-gold-500 bg-gold-500 text-ink-900' : 'border-ink-300 dark:border-ink-700'}`}>
        {checked && <span className="text-xs">✓</span>}
      </span>
      {label}
    </button>
  );
}
