import React, { useState } from 'react';
import PolicyModals from './PolicyModals';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-6 text-sm">
            <button className="text-gray-600 hover:text-black transition-colors">
              Egypt
            </button>
            <button 
              onClick={() => setActiveModal('refund')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Refund policy
            </button>
            <button 
              onClick={() => setActiveModal('shipping')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Shipping policy
            </button>
            <button 
              onClick={() => setActiveModal('privacy')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Privacy policy
            </button>
          </div>
        </div>
      </div>

      <PolicyModals 
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
};

export default Footer; 