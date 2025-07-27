'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';

// Data gambar galeri
const galleryImages = [
  { 
    id: 1, 
    title: 'Gazebo Minimalis', 
    category: 'Minimalis',
    alt: 'Gazebo Minimalis dengan desain modern'
  },
  { 
    id: 2, 
    title: 'Gazebo Klasik', 
    category: 'Klasik',
    alt: 'Gazebo dengan sentuhan klasik yang elegan'
  },
  { 
    id: 3, 
    title: 'Gazebo Taman', 
    category: 'Taman',
    alt: 'Gazebo di tengah taman yang asri'
  },
  { 
    id: 4, 
    title: 'Gazebo Mewah', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan desain eksklusif'
  },
  { 
    id: 5, 
    title: 'Gazebo Minimalis 2', 
    category: 'Minimalis',
    alt: 'Gazebo minimalis dengan atap datar'
  },
  { 
    id: 6, 
    title: 'Gazebo Klasik 2', 
    category: 'Klasik',
    alt: 'Gazebo klasik dengan ukiran kayu'
  },
  { 
    id: 7, 
    title: 'Gazebo Taman 2', 
    category: 'Taman',
    alt: 'Gazebo di taman bunga'
  },
  { 
    id: 8, 
    title: 'Gazebo Mewah 2', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan kolam renang'
  },
  { 
    id: 9, 
    title: 'Gazebo Minimalis 3', 
    category: 'Minimalis',
    alt: 'Gazebo minimalis dengan aksen kayu'
  },
  { 
    id: 10, 
    title: 'Gazebo Klasik 3', 
    category: 'Klasik',
    alt: 'Gazebo klasik dengan ornamen tradisional'
  },
  { 
    id: 11, 
    title: 'Gazebo Taman 3', 
    category: 'Taman',
    alt: 'Gazebo di taman belakang rumah'
  },
  { 
    id: 12, 
    title: 'Gazebo Mewah 3', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan pemandangan danau'
  },
];

// Kategori unik untuk filter
const categories = ['Semua', ...new Set(galleryImages.map(image => image.category))];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter gambar berdasarkan kategori dan pencarian
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'Semua' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Buka lightbox
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Tutup lightbox
  const closeLightbox = () => {
    setIsOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigasi gambar di lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(prev => 
        prev === 0 ? filteredImages.length - 1 : (prev || 1) - 1
      );
    } else {
      setSelectedImage(prev => 
        prev === filteredImages.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };

  // Tangani klik di backdrop lightbox
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // Tangani keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    }
  };

  // Efek untuk menangani event keyboard
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => window.removeEventListener('keydown', handleKeyDown as any);
    }
  }, [isOpen, selectedImage]);

  return (
    <div className="min-h-screen bg-wood-50">
      {/* Hero Section */}
      <section className="relative h-64 bg-wood-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Galeri</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Koleksi hasil karya terbaik kami dalam pembuatan gazebo
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari galeri..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-wood-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-wood-400" />
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-wood-300 rounded-lg px-4 py-2 text-wood-700 hover:bg-wood-50 transition-colors w-full justify-center md:w-auto"
              >
                <FiFilter />
                <span>Filter Kategori</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <motion.div 
            className={`mb-8 overflow-hidden ${showFilters ? 'block' : 'hidden'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? 'auto' : 0, 
              opacity: showFilters ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm border border-wood-100">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === selectedCategory
                      ? 'bg-wood-600 text-white'
                      : 'bg-wood-50 text-wood-700 hover:bg-wood-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-64 bg-wood-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-wood-300">
                    <div className="text-center p-4">
                      <FiZoomIn className="w-12 h-12 mx-auto mb-2" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="inline-block bg-amber-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openLightbox(index)}
                    className="absolute inset-0 w-full h-full focus:outline-none"
                    aria-label={`Lihat ${item.title}`}
                  >
                    <span className="sr-only">Lihat {item.title}</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-wood-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-wood-900">Tidak ada gambar yang ditemukan</h3>
              <p className="text-wood-500 mt-2">Coba cari dengan kata kunci lain atau pilih kategori yang berbeda</p>
            </div>
          )}

          {/* Pagination */}
          {filteredImages.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-1 rounded-md text-wood-600 hover:bg-wood-100">
                  &laquo;
                </button>
                <button className="w-10 h-10 rounded-md bg-wood-600 text-white">
                  1
                </button>
                <button className="w-10 h-10 rounded-md text-wood-600 hover:bg-wood-100">
                  2
                </button>
                <button className="w-10 h-10 rounded-md text-wood-600 hover:bg-wood-100">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="px-3 py-1 rounded-md text-wood-600 hover:bg-wood-100">
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
              aria-label="Tutup"
            >
              <FiX className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <motion.div 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
              >
                <div className="bg-wood-100 w-full h-[70vh] flex items-center justify-center text-wood-400">
                  <FiZoomIn className="w-16 h-16" />
                  <span className="sr-only">{filteredImages[selectedImage]?.alt}</span>
                </div>
                
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-wood-900 mb-2">
                    {filteredImages[selectedImage]?.title}
                  </h3>
                  <p className="text-wood-600">
                    {filteredImages[selectedImage]?.category}
                  </p>
                </div>
              </motion.div>
              
              <button 
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Gambar sebelumnya"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Gambar selanjutnya"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === selectedImage ? 'bg-amber-500' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Pergi ke gambar ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
