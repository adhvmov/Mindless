import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { DateTime } from 'luxon';
import Newsletter from './Newsletter';
import { NewsTicker } from './NewsTicker';
import { useCart } from '../context/CartContext';

interface SupportPageProps {
  onNavigate: (page: string) => void;
  onCartOpen?: () => void;
  onMenuOpen?: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onNavigate, onCartOpen, onMenuOpen }) => {
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

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-8 text-sm">
          {/* Contact Info */}
          <p className="text-black">
            Please contact us at <a href="mailto:hello@seaszn.co.uk" className="underline">hello@seaszn.co.uk</a> for a returns form.
          </p>

          {/* Black Friday Notice */}
          <div className="space-y-1">
            <p className="font-medium">BLACK FRIDAY NOTICE:</p>
            <p className="font-medium">ALL SALES ARE FINAL. NO RETURNS. NO EXCHANGES</p>
          </div>

          {/* Returns & Exchanges */}
          <div className="space-y-2">
            <p className="font-medium">RETURNS & EXCHANGES</p>
            <ul className="space-y-1 list-disc pl-8">
              <li>All customers must return their items within 14 days of the date shown on their dispatch email to be eligible for either a full refund or exchange.</li>
              <li>Exchange is only available for U.K. customers only</li>
              <li>All items must be unworn and unwashed.</li>
              <li>All items must have all tags attached.</li>
              <li>All sales are final for discounted / special items. No refunds or exchanges.</li>
              <li>All items must be returned in their original packaging.</li>
              <li>We do not offer free returns postage, therefore all customers are liable for their own postage costs.</li>
              <li>We do not refund shipping costs.</li>
              <li>All customers must complete and insert their return slip when returning their items. Please specify whether it is a return or exchange.</li>
              <li>All customers are responsible for checking available sizes before send their product for an exchange. If the requested size is not available, an automatic refund is processed.</li>
              <li>If you try to make a return, we may have to send it back to you and ask you to cover the delivery costs.</li>
              <li>All products are at the responsibility of the customer until they have been delivered to us.</li>
            </ul>
            <p>SEASZN retains the right to reject exchanges or returns that do not comply with our established exchange and return policy.</p>

            <p className="font-medium pt-4">The following products can NOT be returned:</p>
            <ul className="space-y-1 list-disc pl-8">
              <li>Showing signs of being worn, washed, modified or damaged in anyway will not be eligible for refund.</li>
              <li>If they are marked, soiled, stretched, bleached or damaged in anyway.</li>
              <li>If they are scented with aftershave, perfume, deodorant or smoke.</li>
              <li>SALE items.</li>
            </ul>
          </div>

          {/* Shipping */}
          <div className="space-y-2">
            <p className="font-medium">SHIPPING</p>
            <ul className="space-y-1 list-disc pl-8">
              <li>All orders will be dispatched within 5 working days and will always be sent via tracked shipping. (Unless it's a pre-order)</li>
              <li>In the event that any orders are undelivered due to incorrect details provided by the customer, it will be the customer that is responsible for payment of re-delivery.</li>
              <li>We are not responsible for any orders which are damaged during delivery.</li>
              <li>Once the products have dispatched from out office. All orders are completely out of our control. It is the customers responsibility to be present in receiving the order</li>
            </ul>
          </div>

          {/* Customs */}
          <div className="space-y-2">
            <p className="font-medium">CUSTOMS</p>
            <p>
              Shipping costs do not include relevant overseas customs duties, foreign taxes or other fees, which may be imposed and this is the responsibility of the customer. Not all countries charge an import fee, please check with your local customs office for further information.
            </p>
          </div>
        </div>
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

export default SupportPage; 