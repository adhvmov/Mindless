import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onCartOpen: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate, onCartOpen }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page: string) => {
    onClose();
    onNavigate(page);
  };

  const handleCartClick = () => {
    onClose();
    onCartOpen();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      onNavigate('search', { query: searchQuery });
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}
      
      {/* Menu Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-8">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('home')}
            className="mb-12"
          >
            <img 
              src="/icons/black_mindless.png" 
              alt="MINDLESS" 
              className="h-6"
            />
          </button>

          {/* Cart */}
          <button 
            onClick={handleCartClick}
            className="flex items-center justify-center space-x-2 mb-8 text-base w-full"
          >
            <span className="font-light">Cart</span>
            <div className="bg-black text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[16px]">
              {totalItems}
            </div>
          </button>

          {/* Search Field */}
          <form onSubmit={handleSearch} className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH"
              className="w-full bg-black text-white py-2.5 px-4 text-sm placeholder-white text-left focus:outline-none"
            />
          </form>

          {/* Navigation Links */}
          <nav className="space-y-6">
            <button 
              onClick={() => handleNavigation('support')}
              className="block text-sm hover:opacity-70 transition-opacity w-full text-left"
            >
              Shipping & Returns
            </button>
            <button 
              onClick={() => handleNavigation('account')}
              className="block text-sm hover:opacity-70 transition-opacity w-full text-left"
            >
              Account
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className="block text-sm hover:opacity-70 transition-opacity w-full text-left"
            >
              Back Home
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideMenu;