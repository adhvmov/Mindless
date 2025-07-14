import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { useCart } from '../context/CartContext';
import { products } from './ProductGrid';
import { NewsTicker } from './NewsTicker';
import RestockModal from './RestockModal';
import Newsletter from './Newsletter';

interface ProductDetailsProps {
  onNavigate: (page: string) => void;
  onCartOpen: () => void;
  onMenuOpen: () => void;
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onNavigate, onCartOpen, onMenuOpen, productId }) => {
  const { addToCart, getTotalItems } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(DateTime.utc().setZone('Africa/Cairo'));
  const [showSizeAlert, setShowSizeAlert] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showFullImages, setShowFullImages] = useState(false);
  const totalItems = getTotalItems();

  // Find product from the products array
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.utc().setZone('Africa/Cairo'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || selectedSize === '') {
      setShowSizeAlert(true);
      setTimeout(() => setShowSizeAlert(false), 3000); // Hide after 3 seconds
      return;
    }

    if (!product.soldOut) {
      addToCart({
        id: product.id,
        name: `[${product.type}] ${product.name}`,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize
      });
      onCartOpen();
    }
  };

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
          className="h-28"
        >
          <img 
            src="/icons/MINDLESS.png" 
            alt="MINDLESS" 
            className="h-full scale-125"
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {showFullImages ? (
              // Full size images view
              <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-y-auto">
                <button 
                  onClick={() => setShowFullImages(false)}
                  className="fixed right-6 top-6 z-50 text-white"
                >
                  <X className="w-8 h-8" />
                </button>
                <div className="max-w-4xl mx-auto space-y-4 pt-12 px-4">
                  {product.images.map((img, index) => (
                    <div key={index} className="w-full">
                      <img
                        src={img}
                        alt={`${product.type} ${product.name} view ${index + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div 
                  className="relative bg-gray-50 cursor-pointer aspect-square"
                  onClick={() => setShowFullImages(true)}
                >
                  {product.soldOut && (
                    <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-sm tracking-widest uppercase font-medium z-10">
                      Sold Out
                    </div>
                  )}
                  <img
                    src={product.images[mainImageIndex]}
                    alt={`${product.type} ${product.name}`}
                    className="w-full h-full object-contain transition-transform duration-300"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <div 
                      key={index}
                      className={`bg-gray-50 cursor-pointer transition-all duration-300 hover:scale-105 aspect-square ${
                        mainImageIndex === index ? 'opacity-100' : 'opacity-30'
                      }`}
                      onClick={() => setMainImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.type} ${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-8">
            {/* Product Name and Type */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-medium mb-1">[{product.type}] {product.name}</h1>
            </div>

            {/* Product Features */}
            <div className="text-center lg:text-left">
              <ul className="space-y-1 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Model Information */}
            <div className="text-center lg:text-left">
              <p className="text-sm mb-1">The waist fits true to size. If you like to sag, size UP.</p>
              <p className="text-sm">Male model is 6'0 wearing size LARGE</p>
              <p className="text-sm">Female model is 5'6 wearing size SMALL</p>
            </div>

            {/* Size Chart */}
            <div className="flex justify-center lg:justify-start py-1">
              <div className="w-full lg:w-3/4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="py-1 text-center border border-gray-300 font-medium">SIZE</th>
                      <th className="py-1 text-center border border-gray-300 font-medium">LENGTH</th>
                      <th className="py-1 text-center border border-gray-300 font-medium">PIT TO PIT</th>
                      <th className="py-1 text-center border border-gray-300 font-medium">WOMENS</th>
                      <th className="py-1 text-center border border-gray-300 font-medium">STOCK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((option) => (
                      <tr key={option.size}>
                        <td className="py-1 text-center border border-gray-300">{option.size}</td>
                        <td className="py-1 text-center border border-gray-300">{option.length}</td>
                        <td className="py-1 text-center border border-gray-300">{option.pitToPit}</td>
                        <td className="py-1 text-center border border-gray-300">{option.womens}</td>
                        <td className="py-1 text-center border border-gray-300">
                          {option.inStock ? 'In Stock' : 'Out of Stock'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Washing Instructions */}
            <div className="text-center lg:text-left">
              <h2 className="font-medium mb-1">Washing Instructions</h2>
              <p className="text-sm">
                Wash Cold. Do not tumble dry. Do not bleach. Do not use softener.
              </p>
            </div>

            {/* International Ordering */}
            <div className="text-center lg:text-left">
              <h2 className="font-medium mb-1">Ordering from outside the UK?</h2>
              <p className="text-sm">
                Prices do not include relevant overseas customs duties, foreign taxes
                or other fees, which may be imposed and this is the responsibility of
                the customer.
              </p>
            </div>

            {/* Price */}
            <div className="text-center lg:text-left py-1">
              <p className="text-xl font-medium">LE {product.price.toFixed(2)}</p>
            </div>

            {/* Sold Out Badge above buttons */}
            {product.soldOut && (
              <div className="text-center lg:text-left py-2">
                <div className="inline-block bg-black text-white px-4 py-2 text-sm tracking-widest uppercase font-medium">
                  Sold Out
                </div>
              </div>
            )}

            {/* Size Selection - Only show if product is not sold out */}
            {!product.soldOut && (
              <div className="py-1">
                <select
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    setShowSizeAlert(false);
                  }}
                  className="w-full py-1.5 px-3 border border-black bg-white focus:outline-none text-center appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="">Select Size</option>
                  {product.sizes.filter(s => s.inStock).map((sizeOption) => (
                    <option key={sizeOption.size} value={sizeOption.size}>
                      {sizeOption.size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Alert Message */}
            {showSizeAlert && !product.soldOut && (
              <div className="mt-4 p-2 bg-red-500 text-white text-center text-sm">
                Please select a size before adding to cart.
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {!product.soldOut ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-2 px-4 bg-black text-white hover:bg-gray-900 text-sm cursor-pointer"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="w-full py-2 px-4 bg-black text-white hover:bg-gray-900 text-sm cursor-pointer"
                  >
                    Keep Shopping
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full py-2 px-4 bg-black text-white hover:bg-gray-900 text-sm cursor-pointer"
                    onClick={() => setIsRestockModalOpen(true)}
                  >
                    Restock Notification
                  </button>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="w-full py-2 px-4 bg-black text-white hover:bg-gray-900 text-sm cursor-pointer"
                  >
                    Keep Shopping
                  </button>
                </>
              )}
            </div>

            {/* Restock Modal */}
            <RestockModal
              isOpen={isRestockModalOpen}
              onClose={() => setIsRestockModalOpen(false)}
              productName={product.name}
              productType={product.type}
              sizes={product.sizes}
            />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-center sm:justify-start md:justify-center">
          <Newsletter />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        ©2025 MINDLESS
      </footer>
    </div>
  );
};

export default ProductDetails; 