"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to Tokyo Lore!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>About</h3>
            <p className="text-sm leading-relaxed">
              Tokyo Lore celebrates the hidden stories, forgotten corners, and secret beauty of Japan's capital through photography, poetry, and street art.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/featured-stories" className="hover:text-pink-600 transition-colors">Featured Stories</a></li>
              <li><a href="/gallery" className="hover:text-pink-600 transition-colors">Photo Gallery</a></li>
              <li><a href="/map" className="hover:text-pink-600 transition-colors">Street Art Map</a></li>
              <li><a href="/community" className="hover:text-pink-600 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/guide" className="hover:text-pink-600 transition-colors">Tokyo Guide</a></li>
              <li><a href="/photography-tips" className="hover:text-pink-600 transition-colors">Photography Tips</a></li>
              <li><a href="mailto:support@tokyolore.com" className="hover:text-pink-600 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-pink-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>Newsletter</h3>
            <p className="text-sm mb-4">Get the latest Tokyo stories delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-pink-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Partner Links Section */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
          <a href="https://www.careduel.com" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-gray-600 hover:text-pink-600 transition-colors">
            CareDuel
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://www.top216.com"
             target="_blank"
             rel="noopener noreferrer"
             className="text-gray-600 hover:text-pink-600 transition-colors">
            Top216
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://www.thetop36.com"
             target="_blank"
             rel="noopener noreferrer"
             className="text-gray-600 hover:text-pink-600 transition-colors">
            TheTop36
          </a>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Tokyo Lore. All rights reserved. Made by <b>Arpit Sehal</b> for Tokyo's stories.</p>
        </div>
      </div>
    </footer>
  );
}
