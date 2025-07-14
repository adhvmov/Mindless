import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Menu } from 'lucide-react';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

// Sample data for demonstration
const sampleOrders = [
  {
    id: "ORD123456",
    date: "March 15, 2024",
    status: "Delivered",
    total: 2599.00,
    discountCode: "SPRING20",
    discountAmount: 100,
    shippingCost: 0,
    items: [
      {
        id: 1,
        name: "Oversized T-Shirt",
        color: "Black",
        size: "L",
        price: 899.00,
        quantity: 2,
        image: "/images/product1.jpg"
      },
      {
        id: 2,
        name: "Cargo Pants",
        color: "Beige",
        size: "M",
        price: 801.00,
        quantity: 1,
        image: "/images/product2.jpg"
      }
    ]
  },
  {
    id: "ORD123455",
    date: "March 10, 2024",
    status: "Processing",
    total: 1299.00,
    shippingCost: 65,
    items: [
      {
        id: 3,
        name: "Hoodie",
        color: "Gray",
        size: "XL",
        price: 1299.00,
        quantity: 1,
        image: "/images/product3.jpg"
      }
    ]
  }
];

const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate }) => {
  const { userEmail } = useUser();
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Close profile dropdown and side menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      
      // Handle side menu
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasOrders = true; // Toggle this to false to see the empty state

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="border-b border-gray-200 bg-[#ebebeb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Menu Button (Mobile) */}
            <button 
              onClick={() => setIsSideMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white/60 rounded-lg"
            >
              <Menu size={24} className="text-black" />
            </button>

            {/* Logo (Centered on mobile) */}
            <div className="flex items-center flex-1 md:flex-none justify-center md:justify-start">
              <button onClick={() => onNavigate('home')} className="h-10">
                <img 
                  src="/icons/black_mindless.png" 
                  alt="MINDLESS" 
                  className="h-full"
                />
              </button>
              <nav className="hidden md:flex ml-8 space-x-4">
                <button 
                  onClick={() => onNavigate('shop')}
                  className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-white/60"
                >
                  Shop
                </button>
                <button 
                  onClick={() => onNavigate('orders')}
                  className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-white/60"
                >
                  Orders
                </button>
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-black"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''} hidden md:block`} />
              </button>

              {/* Profile Dropdown (Desktop) */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg py-2 z-50 hidden md:block">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{userEmail}</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        onNavigate('profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black"
                    >
                      Settings
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('logout');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Side Menu (Mobile) */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div 
            ref={sideMenuRef}
            className="absolute inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out"
          >
            {/* Close Button */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <button 
                onClick={() => setIsSideMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{userEmail}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="py-2">
              <button 
                onClick={() => {
                  onNavigate('shop');
                  setIsSideMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black"
              >
                Shop
              </button>
              <button 
                onClick={() => {
                  onNavigate('orders');
                  setIsSideMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black bg-gray-50"
              >
                Orders
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Account Links */}
            <div className="py-2">
              <button 
                onClick={() => {
                  onNavigate('profile');
                  setIsSideMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black"
              >
                Profile
              </button>
              <button 
                onClick={() => {
                  onNavigate('settings');
                  setIsSideMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black"
              >
                Settings
              </button>
              <button 
                onClick={() => {
                  onNavigate('logout');
                  setIsSideMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-medium mb-8 text-black">Orders</h1>

        {!hasOrders ? (
          <div className="bg-[#f4f4f4] rounded-xl p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 8.5V13.5M4 8.5V13.5M2 14.5V9.5C2 8.39543 2.89543 7.5 4 7.5H20C21.1046 7.5 22 8.39543 22 9.5V14.5C22 15.6046 21.1046 16.5 20 16.5H4C2.89543 16.5 2 15.6046 2 14.5Z" stroke="black" strokeWidth="1.5"/>
                  <path d="M12 7.5V16.5" stroke="black" strokeWidth="1.5"/>
                  <path d="M8 7.5L8 16.5" stroke="black" strokeWidth="1.5"/>
                  <path d="M16 7.5L16 16.5" stroke="black" strokeWidth="1.5"/>
                  <path d="M4 11.5H20" stroke="black" strokeWidth="1.5"/>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-black">No orders yet</h2>
              <p className="text-gray-600">Go to store to place an order.</p>
              <button 
                onClick={() => onNavigate('shop')}
                className="mt-4 px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors text-sm rounded-lg"
              >
                Continue shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sampleOrders.map((order) => (
              <div key={order.id} className="bg-[#f4f4f4] rounded-xl overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-black">{order.id}</h2>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-black">LE {order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.status}</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {order.items.length === 1 ? (
                        <>
                          <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img 
                              src={order.items[0].image} 
                              alt={order.items[0].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-black">{order.items[0].name}</h3>
                            <p className="text-sm text-gray-600">
                              {order.items[0].color} · Size {order.items[0].size}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex -space-x-3">
                            {order.items.slice(0, 2).map((item, index) => (
                              <div 
                                key={item.id}
                                className="w-16 h-16 bg-white rounded-lg border-2 border-white overflow-hidden"
                                style={{ zIndex: 2 - index }}
                              >
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-black">
                              {order.items.length} items
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.items.map(item => item.name).join(', ').slice(0, 30)}
                              {order.items.map(item => item.name).join(', ').length > 30 ? '...' : ''}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex items-center space-x-1 text-sm text-black hover:opacity-70 transition-opacity"
                    >
                      <span>{expandedOrders.includes(order.id) ? 'Hide details' : 'Show details'}</span>
                      {expandedOrders.includes(order.id) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrders.includes(order.id) && (
                  <div className="p-6 bg-white">
                    {/* Order Summary */}
                    <div className="space-y-6 mb-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {order.items.length > 1 && (
                              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              {order.items.length > 1 && (
                                <>
                                  <h3 className="text-sm font-medium text-black">{item.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {item.color} · Size {item.size}
                                  </p>
                                </>
                              )}
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} · LE {item.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-black">
                            LE {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-black">
                          LE {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                      {order.discountCode && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount ({order.discountCode})</span>
                          <span className="text-black">- LE {order.discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-black">
                          {order.shippingCost === 0 ? 'Free' : `LE ${order.shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                        <span className="font-medium text-black">Total</span>
                        <span className="font-medium text-black">LE {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default OrdersPage; 