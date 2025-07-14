import React, { useState, useEffect } from 'react';
import { CreditCard, Phone, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const egyptianGovernorates = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia',
  'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh',
  'Luxor', 'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai',
  'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag',
  'South Sinai', 'Suez'
];

const RefundPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">Refund Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-3 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All customers must return their items within 14 days of the date shown on their dispatch email.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All items must be unworn and unwashed.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All items must have all tags attached.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>Refunds for sale items are not accepted.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All items must be returned in their original packaging.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>We do not offer free returns postage, therefore all customers are liable for their own postage costs.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All customers must complete and insert their return slip when returning their items. Please specify whether it is a return or exchange.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>If you try to make a return, we may have to send it back to you and ask you to cover the delivery costs.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>All goods/ products are at the responsibility of the customer until they have been delivered to us.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>We reserve the right to refuse a return if we deem it to be in an unsuitable condition and the items may be returned to you at your own cost.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>We DO NOT accept exchanges from countries outside of the U.K due to complications.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>Refunds are still accepted from countries outside of the U.K.</span>
            </li>

            <li className="mt-4">
              <p className="font-medium mb-2 text-sm">The following products can NOT be returned:</p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-baseline gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
                  <span>Showing signs of being worn, washed, modified or damaged in anyway will not be eligible for refund.</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
                  <span>For hygiene reasons we cannot accept returns for underwear and socks unless faulty.</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
                  <span>If they are marked, soiled, stretched, bleached or damaged in anyway.</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
                  <span>If they are scented with aftershave, perfume, deodorant or smoke.</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ShippingPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">Shipping Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-4 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>UK - All orders will be dispatched within 5 working days and will always be sent signed for</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>In the event that any orders are undelivered due to incorrect details provided by the customer, it will be the customer that is responsible for payment of re-delivery.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1"></span>
              <span>We are not responsible for any orders which are damaged during delivery.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">Privacy Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4 text-sm text-gray-600">
            <p>Your privacy is important to us. It is MINDLESS's policy to respect your privacy regarding any information we may collect from you across our website, http://mindlessclothing.com, and other sites we own and operate.</p>
            
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
            
            <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
            
            <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
            
            <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
            
            <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
            
            <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
            
            <p className="text-gray-500 text-xs">This policy is effective as of 3 January 2021.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cartItems, getTotalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);
  const [isShippingPolicyOpen, setIsShippingPolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    emailOffers: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    governorate: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    discountCode: ''
  });
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;

    const handleScroll = () => {
      const scrollPosition = cartItemsDiv.scrollTop;
      const maxScroll = cartItemsDiv.scrollHeight - cartItemsDiv.clientHeight;
      
      // Show button only when not near the bottom
      setShowScrollButton(scrollPosition < maxScroll - 50);
    };

    cartItemsDiv.addEventListener('scroll', handleScroll);
    return () => cartItemsDiv.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 10000 ? 0 : 65;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-white text-black">
              {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="w-full max-w-[1200px] mx-auto px-5">
          <div className="h-16 flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="h-8">
              <img src="/icons/black_mindless.png" alt="MINDLESS" className="h-full" />
                  </button>
            <button 
              onClick={() => onNavigate('cart')} 
              className="flex items-center text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.6113 3H8.38836C6.433 3 4.76424 4.41365 4.44278 6.3424L2.77612 16.3424C2.36976 18.7805 4.24994 21 6.72169 21H17.278C19.7498 21 21.6299 18.7805 21.2236 16.3424L19.5569 6.3424C19.2355 4.41365 17.5667 3 15.6113 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
              </span>
                  </button>
                </div>
              </div>
      </header>

      <main className="w-full">
        <div className="w-full max-w-[1200px] mx-auto relative">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-white lg:bg-[rgb(245,245,245)] hidden lg:block" />
          
          <div className="flex flex-col lg:flex-row w-full">
            {/* Left Side - Checkout Form */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="w-[91%] max-w-[440px] mx-auto py-8">
                {/* Contact Information */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Contact</h2>
                    <button 
                      onClick={() => onNavigate('login')} 
                      className="text-sm text-black hover:opacity-70 transition-opacity"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                    required
                  />
                    <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="emailOffers"
                      checked={formData.emailOffers}
                      onChange={handleInputChange}
                        className="mr-3 h-5 w-5 rounded border-gray-200 accent-black focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    />
                    <span className="text-sm text-gray-600">Email me with news and offers</span>
                  </label>
                </div>
                  </div>

                {/* Delivery */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-6">Delivery</h2>
                  <div className="space-y-4">
                    <div className="flex w-full space-x-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                        className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                        className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                    required
                  />

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                    />

                    <div className="flex w-full space-x-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                        required
                      />
                      <div className="w-[50%] relative">
                        <select
                          name="governorate"
                          value={formData.governorate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors appearance-none bg-white text-base"
                          required
                        >
                          <option value="">Select Governorate</option>
                          {egyptianGovernorates.map(gov => (
                            <option key={gov} value={gov}>{gov}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full space-x-4">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-[50%] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-base"
                        required
                      />
                      <div className="w-[50%] relative">
                        <div className="relative flex items-center">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <div className="absolute left-10 top-1/2 -translate-y-1/2 h-5 w-[1px] bg-gray-200"></div>
                          <div className="absolute left-14 top-1/2 -translate-y-1/2 text-gray-400">+20</div>
                          <label className="absolute left-[4.5rem] -top-2 bg-white px-2 text-xs text-gray-500">Phone number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-24 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors pt-4 text-base"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                        className={`relative py-4 px-6 flex items-center justify-center border rounded-lg transition-all duration-200 ${
                          formData.paymentMethod === 'card' 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-200 hover:border-black text-gray-600 hover:text-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} />
                          <span className="font-medium">Credit Card</span>
                        </div>
                        {formData.paymentMethod === 'card' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-black border-2 border-white rounded-full" />
                        )}
                      </button>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                        className={`relative py-4 px-6 flex items-center justify-center border rounded-lg transition-all duration-200 ${
                          formData.paymentMethod === 'cash' 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-200 hover:border-black text-gray-600 hover:text-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 9V8C17 5.2386 14.7614 3 12 3C9.23858 3 7 5.2386 7 8V9M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                        {formData.paymentMethod === 'cash' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-black border-2 border-white rounded-full" />
                        )}
                      </button>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 pt-2">
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                            required
                          />
                          <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <input
                              type="text"
                              name="cardExpiry"
                              placeholder="MM / YY"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                              required
                            />
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                              <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardCvc"
                              placeholder="CVC"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                              required
                            />
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                              <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-black text-white hover:bg-gray-900 transition-colors text-sm text-center"
                >
                  Pay Now
                </button>
                  
                  {/* Terms and Privacy Text */}
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed text-center px-2">
                    Your info will be saved to a Shop account. By continuing, you agree to Shop's{' '}
                    <button 
                      onClick={() => onNavigate('terms')} 
                      className="text-black underline hover:opacity-70 transition-opacity"
                    >
                      Terms of Service
                    </button>
                    {' '}and acknowledge the{' '}
                    <button 
                      onClick={() => setIsPrivacyPolicyOpen(true)} 
                      className="text-black underline hover:opacity-70 transition-opacity"
                    >
                      Privacy Policy
                    </button>.
                  </div>

                  {/* Divider */}
                  <div className="mt-6 mb-4">
                    <div className="w-full h-[1px] bg-gray-200"></div>
                  </div>

                  {/* Policy Links */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <button 
                      onClick={() => setIsRefundPolicyOpen(true)} 
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      Refund Policy
                    </button>
                    <button 
                      onClick={() => setIsShippingPolicyOpen(true)} 
                      className="text-gray-600 hover:text-black transition-colors"
                >
                      Shipping Policy
                    </button>
                    <button 
                      onClick={() => setIsPrivacyPolicyOpen(true)} 
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      Privacy Policy
                </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              {/* Cart Panel */}
              <div className={`bg-[rgb(245,245,245)] transition-all duration-300 ${
                isCartOpen ? 'max-h-[2000px]' : 'max-h-[60px]'
              } lg:max-h-none overflow-hidden`}>
                {/* Mobile Summary Bar - Part of Cart Panel */}
                <div className="lg:hidden px-6 py-4 flex items-center justify-between cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Order Summary</span>
                    {isCartOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  <div className="font-medium">LE {total.toFixed(2)}</div>
                </div>

                {/* Cart Content */}
                <div className="px-6 sm:px-8 md:px-12 lg:px-16 py-6 lg:py-12">
                  <div className="max-w-lg mx-auto lg:sticky lg:top-4">
              {/* Cart Items */}
                    <div className="relative">
                      <div 
                        className="space-y-4 mb-8 lg:max-h-[40vh] lg:overflow-y-auto pt-2 scroll-smooth" 
                        id="cartItems"
                      >
                {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start space-x-4 pt-1">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                                className="w-20 h-20 object-cover bg-white border border-gray-200 rounded-lg"
                      />
                              <span className="absolute -top-2 -right-2 bg-[rgb(229,229,229)] text-black text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                              <div className="flex justify-between items-start pt-2">
                                <div>
                                  <h3 className="font-medium text-sm text-black">{item.name}{item.size ? ` - ${item.size}` : ''}</h3>
                                </div>
                                <p className="text-sm font-medium text-black">LE {(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                    </div>
                  </div>
                ))}
                      </div>
                      {cartItems.length > 3 && (
                        <button 
                          onClick={() => {
                            const cartItemsDiv = document.getElementById('cartItems');
                            if (cartItemsDiv) {
                              cartItemsDiv.scrollTo({
                                top: cartItemsDiv.scrollHeight,
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className={`lg:absolute bottom-0 left-1/2 -translate-x-1/2 bg-[rgba(82,82,82,0.8)] text-white px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[rgba(82,82,82,0.9)] transition-all duration-300 ${
                            showScrollButton && !window.matchMedia('(max-width: 1024px)').matches ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          Scroll for more items
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16L6 10H18L12 16Z" fill="currentColor"/>
                          </svg>
                        </button>
                      )}
              </div>

              {/* Discount Code */}
                    <div className="mb-8">
                      <div className="flex space-x-2">
                <input
                  type="text"
                          name="discountCode"
                          placeholder="Discount code"
                          value={formData.discountCode}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 bg-white border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black rounded-lg"
                />
                        <button className="px-6 py-3 bg-[rgb(229,229,229)] text-gray-600 font-medium hover:text-black transition-colors rounded-lg border border-gray-200">
                  Apply
                </button>
                      </div>
              </div>

              {/* Order Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                        <span className="text-black">LE {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-black">{shippingCost === 0 ? 'Free' : `LE ${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-200">
                        <span className="text-black">Total</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-sm text-gray-600">EGP</span>
                          <span className="text-black">LE {total.toFixed(2)}</span>
                        </div>
                      </div>
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Policy Modals */}
      <RefundPolicyModal 
        isOpen={isRefundPolicyOpen} 
        onClose={() => setIsRefundPolicyOpen(false)} 
      />
      <ShippingPolicyModal 
        isOpen={isShippingPolicyOpen} 
        onClose={() => setIsShippingPolicyOpen(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      />
    </div>
  );
};

export default CheckoutPage;