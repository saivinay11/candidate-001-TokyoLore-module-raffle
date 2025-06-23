"use client";

import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="cursor-pointer flex items-center space-x-2">
          <MapPin className="text-pink-600 w-6 h-6" />
          <span className="text-xl font-bold text-gray-800" style={{fontFamily: 'Playfair Display, serif'}}>
            Tokyo Lore
          </span>
        </Link>
        
        <nav className="flex space-x-8">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              isActive('/') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
            }`}
          >
            Home
          </Link>
          <Link
            href="/stories"
            className={`font-medium transition-colors ${
              isActive('/stories') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
            }`}
          >
            Stories
          </Link>
          <Link
            href="/submit"
            className={`font-medium transition-colors ${
              isActive('/submit') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
            }`}
          >
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
} 