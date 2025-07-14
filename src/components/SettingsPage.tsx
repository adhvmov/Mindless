import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { userEmail, logout } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

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

  const handleLogoutEverywhere = () => {
    logout();
    onNavigate('account');
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsSideMenuOpen(false);
    onNavigate('account');
  };

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
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black bg-gray-50"
                    >
                      Settings
                    </button>
                    <button 
                      onClick={handleLogout}
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
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black"
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
                onClick={handleLogout}
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
        <h1 className="text-2xl font-medium mb-8 text-black">Settings</h1>

        {/* Log Out Section */}
        <div className="bg-[#f4f4f4] rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <div className="p-2 bg-white rounded-lg mb-4 sm:mb-0 w-10 h-10 flex items-center justify-center flex-shrink-0">
              <LogOut size={20} className="text-black" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-black mb-1">Log out everywhere</h2>
              <p className="text-sm text-gray-600 mb-4">
                If you've lost a device or have security concerns, log out everywhere to ensure the security of your account.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 space-y-3 sm:space-y-0">
                <button
                  onClick={handleLogoutEverywhere}
                  className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  Log out everywhere
                </button>
                <span className="text-sm text-gray-600 text-center sm:text-left">You will be logged out on this device as well.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SettingsPage; 