import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { userEmail, setUserEmail } = useUser();
  const [email, setEmail] = useState('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    if (userEmail) {
      onNavigate('profile');
    }
  }, [userEmail, onNavigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user email and redirect to profile
      setUserEmail(email);
      onNavigate('profile');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in, don't render the sign-in form
  if (userEmail) {
    return null;
  }

  const PrivacyModal = () => {
    if (!isPrivacyModalOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setIsPrivacyModalOpen(false)}
      >
        <div 
          className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h2 className="text-lg font-medium">Privacy Policy</h2>
            <button 
              onClick={() => setIsPrivacyModalOpen(false)}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4 text-sm text-gray-600">
              <p>Your privacy is important to us. It is MINDLESS's policy to respect your privacy regarding any information we may collect from you across our website, http://mindlessclothing.com, and other sites we own and operate.</p>
              <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
              <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
              <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#f4f4f4] p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <button onClick={() => onNavigate('home')} className="h-8">
            <img 
              src="/icons/black_mindless.png" 
              alt="MINDLESS" 
              className="h-full"
            />
          </button>
        </div>

        {/* Sign In Form */}
        <div className="text-left mb-8">
          <h1 className="text-2xl font-medium mb-2 text-black">Sign in</h1>
          <p className="text-gray-600 text-sm">Sign in by email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Email"
              className={`w-full px-4 py-3 bg-transparent border-0 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:border-black focus:outline-none text-left tracking-wide text-sm`}
              required
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-900 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        {/* Privacy Link */}
        <div className="mt-8 text-left">
          <button 
            onClick={() => setIsPrivacyModalOpen(true)}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Privacy
          </button>
        </div>
      </div>

      {/* Privacy Modal */}
      <PrivacyModal />
    </div>
  );
};

export default AccountPage; 