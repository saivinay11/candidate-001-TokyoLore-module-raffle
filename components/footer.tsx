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
          {/* Keep existing sections unchanged */}
        </div>
        
        {/* Updated Partner Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
          {/* CareDuel - Working but with beta notice */}
          <a 
            href="https://www.careduel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline"
          >
            CareDuel (Beta)
          </a>

          <span className="text-gray-400">•</span>

          {/* Top216 - Disabled state */}
          <span className="text-gray-400 cursor-not-allowed">
            Top216 (Coming Soon)
          </span>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Tokyo Lore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}