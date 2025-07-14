import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { DateTime } from 'luxon';
import ProductGrid from './ProductGrid';
import Newsletter from './Newsletter';
import { NewsTicker } from './NewsTicker';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  onNavigate: (page: string) => void;
  onCartOpen: () => void;
  onMenuOpen: () => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, onCartOpen, onMenuOpen }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [currentTime, setCurrentTime] = useState(DateTime.utc().setZone('Africa/Cairo'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.utc().setZone('Africa/Cairo'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Menu Button - Fixed */}
      <button 
        onClick={onMenuOpen}
        className="fixed right-6 top-[4.5rem] z-50"
      >
        <Menu className="w-8 h-8" strokeWidth={1.5} />
      </button>

      {/* News Ticker */}
      <NewsTicker onNavigate={onNavigate} />

      {/* Header */}
      <header className="flex flex-col items-center py-6 mt-6">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="h-28"
        >
          <img 
            src="/icons/MINDLESS.png" 
            alt="MINDLESS" 
            className="h-full scale-125"
          />
        </button>

        {/* Date and Cart */}
        <div className="flex flex-col items-center space-y-3">
          {/* Date/Time */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-light">{currentTime.toFormat("MM/dd/yyyy")}</span>
            <span className="mx-1">·</span>
            <span className="font-light">{currentTime.toFormat("h:mm a 'GMT+1'")}</span>
          </div>
          
          {/* Cart */}
          <button 
            onClick={onCartOpen}
            className="flex items-center space-x-2 font-light text-base"
          >
            <span>Cart</span>
            <div 
              key={totalItems} 
              className="bg-black text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[16px] transform transition-transform duration-200 animate-cartBounce"
            >
              {totalItems}
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-8 py-8">
        <ProductGrid onNavigate={onNavigate} />
      </main>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        ©2025 MINDLESS
      </footer>
    </div>
  );
};

export default ShopPage;