import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import SearchPage from './components/SearchPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import SoundControl from './components/SoundControl';
import Cart from './components/Cart';
import SideMenu from './components/SideMenu';
import { CartProvider } from './context/CartContext';
import { AudioProvider } from './context/AudioContext';
import { UserProvider } from './context/UserContext';
import { AudioControls } from './components/AudioControls';
import { useAudio } from './context/AudioContext';
import AccountPage from './components/AccountPage';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/OrdersPage';
import SettingsPage from './components/SettingsPage';
import SupportPage from './components/SupportPage';

interface PageState {
  name: string;
  params?: {
    id?: string;
    query?: string;
    [key: string]: string | undefined;
  };
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>({ name: 'home' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scroll to top effect when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const AppContent = () => {
    const { stopAudio } = useAudio();

    // Stop audio when entering checkout or payment pages
    useEffect(() => {
      if (currentPage.name === 'checkout' || currentPage.name === 'payment') {
        stopAudio();
      }
    }, [currentPage.name, stopAudio]);

    const handlePageChange = (pageName: string, params?: Record<string, string>) => {
      setCurrentPage({ name: pageName, params });
    };

    const renderPage = () => {
      switch (currentPage.name) {
        case 'home':
          return <HomePage onNavigate={handlePageChange} />;
        case 'shop':
          return <ShopPage onNavigate={handlePageChange} onCartOpen={() => setIsCartOpen(true)} onMenuOpen={() => setIsMenuOpen(true)} />;
        case 'search':
          return (
            <SearchPage 
              onNavigate={handlePageChange} 
              onCartOpen={() => setIsCartOpen(true)} 
              onMenuOpen={() => setIsMenuOpen(true)}
              initialQuery={currentPage.params?.query || ''}
            />
          );
        case 'product':
          return (
            <ProductDetails
              onNavigate={handlePageChange}
              onCartOpen={() => setIsCartOpen(true)}
              onMenuOpen={() => setIsMenuOpen(true)}
              productId={currentPage.params?.id || ''}
            />
          );
        case 'cart':
          return <CartPage onNavigate={handlePageChange} onMenuOpen={() => setIsMenuOpen(true)} />;
        case 'checkout':
          return <CheckoutPage onNavigate={handlePageChange} />;
        case 'payment':
          return <PaymentPage onNavigate={handlePageChange} />;
        case 'account':
          return <AccountPage onNavigate={handlePageChange} />;
        case 'profile':
          return <ProfilePage onNavigate={handlePageChange} />;
        case 'orders':
          return <OrdersPage onNavigate={handlePageChange} />;
        case 'settings':
          return <SettingsPage onNavigate={handlePageChange} />;
        case 'support':
          return <SupportPage 
            onNavigate={handlePageChange} 
            onCartOpen={() => setIsCartOpen(true)} 
            onMenuOpen={() => setIsMenuOpen(true)} 
          />;
        default:
          return <HomePage onNavigate={handlePageChange} />;
      }
    };

    return (
      <div className="min-h-screen bg-black text-white font-sans">
        {renderPage()}
        
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={handlePageChange} />
        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={handlePageChange} 
          onCartOpen={() => setIsCartOpen(true)}
        />
        <SoundControl />
        {/* Only show audio controls if not on checkout or payment page */}
        {currentPage.name !== 'checkout' && currentPage.name !== 'payment' && <AudioControls />}
      </div>
    );
  };

  return (
    <AudioProvider>
      <CartProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </CartProvider>
    </AudioProvider>
  );
}

export default App;