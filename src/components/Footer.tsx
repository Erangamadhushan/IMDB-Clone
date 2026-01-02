import React, { useState } from 'react';
import { Film } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  

  

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewsletterSubmit();
    }
  };
  return (
    <footer className="bg-red-950 border-t border-red-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Quick Links - Column 1 */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Newest
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* About - Column 2 */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter - Column 3-5 */}
          <div className="lg:col-span-3">
            <h3 className="text-yellow-400 font-bold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest movie news and updates delivered to
              your inbox.
            </p>
            <div className="flex gap-2 max-w-md">
              <form onSubmit={(e) => {e.preventDefault(); alert("Newsletter subscription temporary interruption")}} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleEmailKeyPress}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  required
                />
                <button
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 IMDB-Clone. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Film className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">IMDB-Clone Database</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
