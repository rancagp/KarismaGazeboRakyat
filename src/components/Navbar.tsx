'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      setIsTop(window.scrollY < 10);
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Produk', href: '/produk' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Hubungi Kami', href: '/hubungi-kami' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isTop 
          ? 'bg-black shadow-none' 
          : 'bg-black/90 backdrop-blur-sm shadow-lg'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center ml-4 md:ml-6">
            <Link href="/" className="block h-12 w-auto">
              <img 
                className="h-full w-auto" 
                src="/images/logo-KGR2.png" 
                alt="Karisma Gazebo Rakyat"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block mr-2 md:mr-2">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-red-500 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-white/5"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-500 hover:bg-white/10 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden absolute left-0 right-0 top-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black/95'} border-t border-gray-800`}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:bg-white/10 hover:text-red-500 block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
