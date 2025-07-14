import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentPageProps {
  onNavigate: (page: string) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const { cartItems, getTotalPrice } = useCart();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    cardName: '',
    useShippingAddress: true,
    rememberMe: true,
    mobileNumber: ''
  });

  const handleInputChange = (e: React.TargetEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const shippingCost = 1460.00;
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left Side - Payment Form */}
          <div className="px-6 py-8 lg:px-12 lg:py-16">
            <div className="max-w-lg mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Payment</h1>
                <p className="text-sm text-gray-600">All transactions are secure and encrypted.</p>
              </div>

              {/* Payment Method */}
              <div className="border border-gray-300 rounded mb-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 border-b">
                  <span className="font-medium">Credit card</span>
                  <div className="flex space-x-2">
                    <img src="/visa.svg" alt="Visa" className="h-6" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="/amex.svg" alt="American Express" className="h-6" />
                    <span className="text-sm text-gray-500">+4</span>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black pr-10"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="Expiration date (MM / YY)"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                    />
                    <div className="relative">
                      <input
                        type="text"
                        name="securityCode"
                        placeholder="Security code"
                        value={paymentData.securityCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    value={paymentData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
                  />
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="useShippingAddress"
                      checked={paymentData.useShippingAddress}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm">Use shipping address as billing address</span>
                  </label>
                </div>
              </div>

              {/* Remember Me */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Remember me</h3>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={paymentData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="text-sm">Save my information for a faster checkout with a Shop account</span>
                </label>
                
                <div className="flex">
                  <select className="px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-black">
                    <option>+20</option>
                  </select>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile phone number"
                    value={paymentData.mobileNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center text-sm text-gray-600 mb-6">
                <Lock className="w-4 h-4 mr-2" />
                <span>Secure and encrypted</span>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Pay now
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Your info will be saved to a Shop account. By continuing, you agree to Shop's Terms of Service and acknowledge the Privacy Policy.
              </p>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-gray-50 px-6 py-8 lg:px-12 lg:py-16">
            <div className="max-w-lg mx-auto">
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover bg-gray-200 rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-500">S</p>
                    </div>
                    <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex mb-6">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:border-black"
                />
                <button className="bg-gray-200 px-6 py-3 rounded-r border border-l-0 border-gray-300 hover:bg-gray-300 transition-colors">
                  Apply
                </button>
              </div>

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>£{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>EGP £{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;