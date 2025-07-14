import React, { useState, useEffect } from 'react';
import { Menu, Minus, Plus, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { useCart } from '../context/CartContext';
import { NewsTicker } from './NewsTicker';
import Newsletter from './Newsletter';

interface CartPageProps {
  onNavigate: (page: string) => void;
  onMenuOpen: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate, onMenuOpen }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [currentTime, setCurrentTime] = useState(DateTime.utc().setZone('Africa/Cairo'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.utc().setZone('Africa/Cairo'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(245,245,245)] text-black">
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
      <header className="flex flex-col items-center py-6 mt-6 bg-[rgb(245,245,245)]">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="mb-4 mt-8"
        >
          <img 
            src="/icons/black_mindless.png" 
            alt="MINDLESS" 
            className="h-6"
          />
        </button>

        {/* Date/Time */}
        <div className="flex items-center space-x-2 text-sm mb-6">
          <span className="font-light">{currentTime.toFormat("MM/dd/yyyy")}</span>
          <span className="mx-1">·</span>
          <span className="font-light">{currentTime.toFormat("h:mm a 'GMT+1'")}</span>
        </div>
      </header>

      {/* Cart Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-6 py-4">
                  <div className="w-32 h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover bg-gray-100"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start pt-6">
                      <div>
                        <h3 className="text-base font-medium text-black mb-1">
                          {item.name}{item.size ? ` - ${item.size}` : ''}
                        </h3>
                        <p className="text-base font-medium text-black">LE {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="flex items-center space-x-5">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="text-xl font-medium"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              if (value > 0) {
                                updateQuantity(item.id, value);
                              }
                            }}
                            className="text-sm border px-3 py-1 w-[60px] text-left focus:outline-none"
                            min="0"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="text-xl font-medium"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center text-sm font-medium mb-8">
                <span>Total</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xs text-gray-600">EGP</span>
                  <span>LE {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full py-3 px-6 bg-black text-white hover:bg-gray-900 transition-colors text-sm text-center"
                >
                  Checkout
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 px-6 bg-white text-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,1)] transition-shadow text-sm text-center"
                >
                  Keep Shopping
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => onNavigate('shop')}
              className="py-4 px-8 bg-black text-white hover:bg-gray-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="w-full max-w-4xl mx-auto px-6">
        <Newsletter />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-600 bg-[rgb(245,245,245)]">
        @2025 MINDLESS
      </footer>
    </div>
  );
};

export default CartPage; 