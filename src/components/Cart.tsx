import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onNavigate }) => {
  const { cartItems, updateQuantity, getTotalPrice } = useCart();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, Math.max(0, newQuantity));
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 300); // Remove highlight after animation
  };

  const handleCheckout = () => {
    onClose();
    onNavigate('checkout');
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
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-3xl font-medium">Cart</h2>
            <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 17.25L17.25 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.25 17.25L6.75 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center space-x-6 p-4 transition-colors duration-300 ${
                      highlightedId === item.id ? 'bg-[#f7f7f7]' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-[#f7f7f7]"
                    />
                    <div className="flex flex-1 items-start justify-between min-w-0">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="font-medium text-sm mb-1 break-words">{item.name}{item.size ? ` - ${item.size}` : ''}</h3>
                        <p className="text-sm text-gray-500">LE {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            handleQuantityChange(item.id, value);
                          }}
                          className="text-sm border px-3 py-1 w-[60px] text-left focus:outline-none"
                          min="0"
                        />
                        <div className="flex items-center space-x-5 mt-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-xl font-medium"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-xl font-medium"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t space-y-6">
              {/* Free Delivery Progress */}
              <div className="space-y-2.5">
                <div className="relative h-1.5 w-full bg-gray-100 rounded-full">
                  <div 
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-500 rounded-full"
                    style={{ 
                      width: `${Math.min((getTotalPrice() / 10000) * 100, 100)}%`
                    }}
                  />
                </div>
                {getTotalPrice() >= 10000 ? (
                  <div className="flex items-center space-x-2 text-sm text-black">
                    <Check size={16} className="text-black" strokeWidth={2.5} />
                    <p className="font-light">
                      Free delivery has been applied to your order
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm font-light">
                    <span className="text-black">
                      Add LE {(10000 - getTotalPrice()).toFixed(2)} for free delivery
                    </span>
                    <span className="text-gray-500">
                      LE 10,000
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Subtotal */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>LE {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span>{getTotalPrice() >= 10000 ? 'Free' : 'LE 65.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>LE {(getTotalPrice() + (getTotalPrice() >= 10000 ? 0 : 65)).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3.5 font-medium hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;