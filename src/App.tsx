import { StoreProvider, useStore } from './store';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Discovery } from './pages/Discovery';
import { About } from './pages/About';
import { Journal } from './pages/Journal';
import { JournalPost } from './pages/JournalPost';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Account } from './pages/Account';
import { SampleClub } from './pages/SampleClub';
import { Sustainability } from './pages/Sustainability';

function Router() {
  const { route } = useStore();

  switch (route.name) {
    case 'home': return <Home />;
    case 'shop': return <Shop />;
    case 'product': return <ProductDetail slug={route.slug} />;
    case 'discovery': return <Discovery />;
    case 'about': return <About />;
    case 'journal': return <Journal />;
    case 'journal-post': return <JournalPost slug={route.slug} />;
    case 'contact': return <Contact />;
    case 'faq': return <FAQ />;
    case 'account': return <Account />;
    case 'sample-club': return <SampleClub />;
    case 'sustainability': return <Sustainability />;
    default: return <Home />;
  }
}

function App() {
  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <Toast />
      </div>
    </StoreProvider>
  );
}

export default App;
