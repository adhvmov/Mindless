import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { DateTime } from 'luxon';
import { NewsTicker } from './NewsTicker';
import { useCart } from '../context/CartContext';
import { products } from './ProductGrid';

interface SearchPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onCartOpen: () => void;
  onMenuOpen: () => void;
  initialQuery: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ onNavigate, onCartOpen, onMenuOpen, initialQuery }) => {
  const { getTotalItems, addToCart } = useCart();
  const totalItems = getTotalItems();
  const [currentTime, setCurrentTime] = useState(DateTime.utc().setZone('Africa/Cairo'));
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.utc().setZone('Africa/Cairo'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(null, initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent | null, forcedQuery?: string) => {
    if (e) e.preventDefault();
    
    const query = forcedQuery || searchQuery;
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search delay for smooth animation
    setTimeout(() => {
      const results = products.filter(product => {
        const searchStr = query.toLowerCase();
        const fullProductName = `[${product.type}] ${product.name}`.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchStr) ||
          product.type.toLowerCase().includes(searchStr) ||
          fullProductName.includes(searchStr)
        );
      });
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    if (!product.soldOut) {
      addToCart({
        id: product.id,
        name: `[${product.type}] ${product.name}`,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  };

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
          className="h-8"
        >
          <img 
            src="/icons/black_mindless.png" 
            alt="MINDLESS" 
            className="h-full"
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

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 md:px-16 lg:px-24">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(null, e.target.value);
            }}
            placeholder="[DENIM] Shorts Sage Green"
            className="w-full bg-transparent border-b border-black py-2 text-lg focus:outline-none"
          />
        </form>

        {/* Search Results or No Results Message */}
        <div className={`transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-light">No products found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-6">
              {searchResults.map((product) => (
                <div 
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => onNavigate('product', { id: product.id })}
                >
                  <div className="relative overflow-hidden bg-gray-100 mb-3">
                    {product.soldOut && (
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 text-xs tracking-widest uppercase font-medium z-10">
                        Sold Out
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={`${product.type} ${product.name}`}
                      className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-sm sm:text-sm md:text-base">
                      [{product.type}] {product.name}
                    </h3>
                    <p className="text-sm sm:text-sm md:text-base font-light">
                      LE {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        ©2025 MINDLESS
      </footer>
    </div>
  );
};

export default SearchPage; 