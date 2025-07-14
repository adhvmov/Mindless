import React, { useState, useRef, useEffect } from 'react';
import { Pencil, ChevronDown, X, Menu } from 'lucide-react';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  governorate: string;
  postalCode: string;
  phone: string;
}

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

// Egyptian governorates list
const egyptianGovernorates = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia',
  'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh',
  'Luxor', 'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai',
  'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag',
  'South Sinai', 'Suez'
];

const AddressModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address, editIndex?: number) => void;
  editAddress?: Address;
  editIndex?: number;
  defaultName: { firstName: string; lastName: string } | null;
}> = ({ isOpen, onClose, onSave, editAddress, editIndex, defaultName }) => {
  const [formData, setFormData] = useState<Address>(() => {
    if (editAddress) {
      return editAddress;
    }
    return {
      firstName: defaultName?.firstName || '',
      lastName: defaultName?.lastName || '',
      address: '',
      apartment: '',
      city: '',
      governorate: '',
      postalCode: '',
      phone: ''
    };
  });

  // Reset form data when modal opens with new defaultName
  React.useEffect(() => {
    if (!editAddress && defaultName) {
      setFormData(prev => ({
        ...prev,
        firstName: defaultName.firstName,
        lastName: defaultName.lastName
      }));
    }
  }, [defaultName, editAddress, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, editIndex);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">Add New Address</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex w-full space-x-4">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
              required
            />

            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              value={formData.apartment}
              onChange={(e) => setFormData(prev => ({ ...prev, apartment: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
            />

            <div className="flex w-full space-x-4">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
              <div className="w-[50%] relative">
                <select
                  value={formData.governorate}
                  onChange={(e) => setFormData(prev => ({ ...prev, governorate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors appearance-none bg-white text-black"
                  required
                >
                  <option value="" className="text-gray-500">Select Governorate</option>
                  {egyptianGovernorates.map(gov => (
                    <option key={gov} value={gov} className="text-black">{gov}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex w-full space-x-4">
              <input
                type="text"
                placeholder="Postal code"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
              <div className="w-[50%] relative">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-black text-white hover:bg-gray-900 transition-colors text-sm text-center rounded-lg"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

const NameModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (firstName: string, lastName: string) => void;
  currentFirstName?: string;
  currentLastName?: string;
}> = ({ isOpen, onClose, onSave, currentFirstName = '', currentLastName = '' }) => {
  const [formData, setFormData] = useState({
    firstName: currentFirstName,
    lastName: currentLastName
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData.firstName, formData.lastName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">Edit Name</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex w-full space-x-4">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder-gray-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-black text-white hover:bg-gray-900 transition-colors text-sm text-center rounded-lg"
          >
            Save Name
          </button>
        </form>
      </div>
    </div>
  );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { userEmail } = useUser();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const savedAddresses = localStorage.getItem('userAddresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });
  const [editingAddress, setEditingAddress] = useState<{ address: Address; index: number } | null>(null);
  const [name, setName] = useState<{ firstName: string; lastName: string } | null>(() => {
    const savedName = localStorage.getItem('userName');
    return savedName ? JSON.parse(savedName) : null;
  });
  const profileRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  // Save name to localStorage whenever it changes
  useEffect(() => {
    if (name) {
      localStorage.setItem('userName', JSON.stringify(name));
    }
  }, [name]);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
  }, [addresses]);

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

  const handleSaveAddress = (address: Address, editIndex?: number) => {
    if (typeof editIndex === 'number') {
      setAddresses(prev => prev.map((addr, index) => 
        index === editIndex ? address : addr
      ));
    } else {
      setAddresses(prev => [...prev, address]);
    }
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address, index: number) => {
    setEditingAddress({ address, index });
    setIsAddressModalOpen(true);
  };

  const handleSaveName = (firstName: string, lastName: string) => {
    setName({ firstName, lastName });
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
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black bg-gray-50"
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
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-black bg-gray-50"
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
        <h1 className="text-2xl font-medium mb-8 text-black">Profile</h1>

        {/* Profile Section */}
        <div className="bg-[#f4f4f4] rounded-xl p-6 mb-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-black">Name</label>
                <button 
                  onClick={() => setIsNameModalOpen(true)}
                  className="text-black hover:opacity-70 transition-opacity"
                >
                  <Pencil size={16} />
                </button>
              </div>
              <div className="text-sm text-black">
                {name ? `${name.firstName} ${name.lastName}` : 'Add name'}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-black mb-1">Email</label>
              <div className="text-sm text-black">{userEmail}</div>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-[#f4f4f4] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-black">Addresses</h2>
            <button 
              onClick={() => {
                setEditingAddress(null);
                setIsAddressModalOpen(true);
              }}
              className="text-sm text-black hover:opacity-70 transition-opacity"
            >
              + Add
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="flex items-center space-x-2 text-sm text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>No addresses added</span>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-black">{address.firstName} {address.lastName}</h3>
                    <button 
                      onClick={() => handleEditAddress(address, index)}
                      className="text-black hover:opacity-70 transition-opacity"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-black space-y-1">
                    <p>{address.address}</p>
                    {address.apartment && <p>{address.apartment}</p>}
                    <p>{address.city}, {address.governorate}</p>
                    <p>{address.postalCode}</p>
                    <p>{address.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add the new Footer component */}
      <Footer onNavigate={onNavigate} />

      <AddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        editAddress={editingAddress?.address}
        editIndex={editingAddress?.index}
        defaultName={name}
      />

      <NameModal 
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleSaveName}
        currentFirstName={name?.firstName}
        currentLastName={name?.lastName}
      />
    </div>
  );
};

export default ProfilePage; 