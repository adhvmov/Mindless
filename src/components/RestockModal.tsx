import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productType: string;
  sizes: {
    size: string;
    inStock: boolean;
  }[];
}

const RestockModal: React.FC<RestockModalProps> = ({ isOpen, onClose, productName, productType, sizes }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Handle the notification registration
    console.log('Restock notification registered for:', { selectedSize, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          <h2 className="text-xl mb-4">Size not in stock?</h2>
          
          <p className="text-base">
            Register to receive a notification when this item comes back in stock.
          </p>

          <p className="text-base font-medium">
            [{productType}] {productName}
          </p>

          {/* Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white focus:outline-none text-center appearance-none"
          >
            <option value="">Select Size</option>
            {sizes.filter(s => !s.inStock).map((size) => (
              <option key={size.size} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full py-2 px-3 border border-gray-300 focus:outline-none"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-black text-white hover:bg-gray-900"
          >
            Notify me when available
          </button>

          {/* Powered by */}
          <div className="text-sm text-gray-500 text-center">
            Powered by Back in Stock
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestockModal; 