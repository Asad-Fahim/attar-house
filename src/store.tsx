import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product, Route } from './types';
import { products } from './data/products';

export interface CartItem {
  productId: string;
  sizeMl: number;
  quantity: number;
}

interface StoreState {
  route: Route;
  navigate: (route: Route) => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, sizeMl: number, quantity?: number) => void;
  removeFromCart: (productId: string, sizeMl: number) => void;
  updateQuantity: (productId: string, sizeMl: number, quantity: number) => void;
  cartCount: number;
  cartSubtotal: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  toast: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state]);
  return [state, setState] as const;
}

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash || hash === 'home') return { name: 'home' };
  const [path, ...rest] = hash.split('/');
  switch (path) {
    case 'shop': {
      const family = rest[0];
      return family ? { name: 'shop', family: family as any } : { name: 'shop' };
    }
    case 'product':
      return rest[0] ? { name: 'product', slug: rest[0] } : { name: 'home' };
    case 'discovery':
      return { name: 'discovery' };
    case 'about':
      return { name: 'about' };
    case 'journal':
      return rest[0] ? { name: 'journal-post', slug: rest[0] } : { name: 'journal' };
    case 'contact':
      return { name: 'contact' };
    case 'faq':
      return { name: 'faq' };
    case 'account':
      return { name: 'account' };
    case 'sample-club':
      return { name: 'sample-club' };
    case 'sustainability':
      return { name: 'sustainability' };
    default:
      return { name: 'home' };
  }
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'shop':
      return route.family ? `#/shop/${route.family}` : '#/shop';
    case 'product':
      return `#/product/${route.slug}`;
    case 'discovery':
      return '#/discovery';
    case 'about':
      return '#/about';
    case 'journal':
      return '#/journal';
    case 'journal-post':
      return `#/journal/${route.slug}`;
    case 'contact':
      return '#/contact';
    case 'faq':
      return '#/faq';
    case 'account':
      return '#/account';
    case 'sample-club':
      return '#/sample-club';
    case 'sustainability':
      return '#/sustainability';
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash());
  const [theme, setTheme] = usePersistentState<'light' | 'dark'>('ml-theme', 'light');
  const [cart, setCart] = usePersistentState<CartItem[]>('ml-cart', []);
  const [wishlist, setWishlist] = usePersistentState<string[]>('ml-wishlist', []);
  const [recentlyViewed, setRecentlyViewed] = usePersistentState<string[]>('ml-recent', []);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [route]);

  const navigate = useCallback((r: Route) => {
    window.location.hash = routeToHash(r);
    setRoute(r);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (product: Product, sizeMl: number, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) => i.productId === product.id && i.sizeMl === sizeMl
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id && i.sizeMl === sizeMl
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId: product.id, sizeMl, quantity }];
      });
      setCartOpen(true);
      showToast(`Added ${product.name} (${sizeMl}ml) to your bag`);
    },
    [setCart, showToast]
  );

  const removeFromCart = useCallback(
    (productId: string, sizeMl: number) => {
      setCart((prev) =>
        prev.filter((i) => !(i.productId === productId && i.sizeMl === sizeMl))
      );
    },
    [setCart]
  );

  const updateQuantity = useCallback(
    (productId: string, sizeMl: number, quantity: number) => {
      setCart((prev) =>
        prev
          .map((i) =>
            i.productId === productId && i.sizeMl === sizeMl
              ? { ...i, quantity: Math.max(0, quantity) }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    [setCart]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    },
    [setWishlist]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addRecentlyViewed = useCallback(
    (productId: string) => {
      setRecentlyViewed((prev) =>
        [productId, ...prev.filter((id) => id !== productId)].slice(0, 8)
      );
    },
    [setRecentlyViewed]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      const size = product.sizes.find((s) => s.ml === item.sizeMl);
      return sum + (size ? size.price * item.quantity : 0);
    }, 0);
  }, [cart]);

  const value: StoreState = {
    route,
    navigate,
    theme,
    toggleTheme,
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    wishlist,
    toggleWishlist,
    isWishlisted,
    recentlyViewed,
    addRecentlyViewed,
    searchOpen,
    setSearchOpen,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
