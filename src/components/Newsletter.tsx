import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  return (
    <section className="py-6 px-4">
      <div className="max-w-md mx-auto sm:translate-x-0 md:-translate-x-8 text-left">
        <h2 className="text-xl font-bold mb-2">
          DON'T LACK!
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          Sign up to our mailing list for exclusive access &<br />
          receive 10% off your first order.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-2/3 px-0 py-1.5 bg-transparent border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none text-left tracking-wide text-sm"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-black text-white px-5 py-1.5 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
          >
            JOIN THE CLUB
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;