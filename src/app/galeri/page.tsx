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
    alt: 'Gazebo Minimalis dengan desain modern',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 2, 
    title: 'Gazebo Klasik', 
    category: 'Klasik',
    alt: 'Gazebo dengan sentuhan klasik yang elegan',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 3, 
    title: 'Gazebo Taman', 
    category: 'Taman',
    alt: 'Gazebo di tengah taman yang asri',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 4, 
    title: 'Gazebo Mewah', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan desain eksklusif',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 5, 
    title: 'Gazebo Minimalis 2', 
    category: 'Minimalis',
    alt: 'Gazebo minimalis dengan atap datar',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 6, 
    title: 'Gazebo Klasik 2', 
    category: 'Klasik',
    alt: 'Gazebo klasik dengan ukiran kayu',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 7, 
    title: 'Gazebo Taman 2', 
    category: 'Taman',
    alt: 'Gazebo di taman bunga',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 8, 
    title: 'Gazebo Mewah 2', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan kolam renang',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 9, 
    title: 'Gazebo Minimalis 3', 
    category: 'Minimalis',
    alt: 'Gazebo minimalis dengan aksen kayu',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 10, 
    title: 'Gazebo Klasik 3', 
    category: 'Klasik',
    alt: 'Gazebo klasik dengan ornamen tradisional',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 11, 
    title: 'Gazebo Taman 3', 
    category: 'Taman',
    alt: 'Gazebo di taman belakang rumah',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 12, 
    title: 'Gazebo Mewah 3', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan pemandangan danau',
    src: '/images/gazebo1.jpeg'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Galeri</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Koleksi hasil karya terbaik kami dalam pembuatan gazebo
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari galeri..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-5 py-3 text-gray-700 hover:bg-gray-50 hover:border-red-400 transition-all duration-300 w-full justify-center md:w-auto"
              >
                <FiFilter className="text-red-500" />
                <span>Filter Kategori</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <motion.div 
            className={`mb-12 overflow-hidden ${showFilters ? 'block' : 'hidden'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? 'auto' : 0, 
              opacity: showFilters ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-md shadow-red-100'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-red-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <motion.div 
                  key={image.id}
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-red-100 h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative h-64 md:h-80 w-full bg-gray-50">
                    {/* Gambar utama */}
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback ke placeholder jika gambar gagal dimuat
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E5YjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJ9PC9zdmc+';
                      }}
                    />
                    
                    {/* Overlay untuk hover */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center p-4">
                        <FiZoomIn className="w-12 h-12 mx-auto mb-2" />
                        <span className="text-sm text-white bg-black/50 px-2 py-1 rounded">Lihat Detail</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                      <div className="flex justify-end">
                        <span className="inline-block bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {image.category}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 rounded-full p-3 text-white transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-600 hover:scale-110">
                      <FiZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-gray-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada hasil</h3>
              <p className="text-gray-500 max-w-md mx-auto">Tidak ada gambar yang cocok dengan pencarian Anda.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="mt-6 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-red-400 transition-colors duration-300 font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors p-2 bg-black/50 rounded-full hover:bg-gray-800"
              aria-label="Tutup"
            >
              <FiX className="w-6 h-6" />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 md:left-8 text-white hover:text-red-400 transition-colors p-3 bg-black/60 rounded-full hover:bg-gray-800/80"
              aria-label="Gambar sebelumnya"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>

            <motion.div 
              className="relative max-w-4xl w-full max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="block text-gray-400">Gambar {filteredImages[selectedImage]?.title}</span>
                </div>
              </div>
              {/* Pagination Dots */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(idx);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === selectedImage ? 'bg-red-500' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Pergi ke gambar ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-gradient-to-t from-black/80 to-transparent py-4">
                <h3 className="text-xl font-semibold">{filteredImages[selectedImage]?.title}</h3>
                <p className="text-red-300 font-medium">{filteredImages[selectedImage]?.category}</p>
              </div>
            </motion.div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 md:right-8 text-white hover:text-red-400 transition-colors p-3 bg-black/60 rounded-full hover:bg-gray-800/80"
              aria-label="Gambar berikutnya"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
