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
    description: 'Gazebo minimalis dengan desain modern yang cocok untuk hunian kontemporer. Dibuat dengan material berkualitas tinggi dan finishing yang rapi.',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 2, 
    title: 'Gazebo Klasik', 
    category: 'Klasik',
    alt: 'Gazebo dengan sentuhan klasik yang elegan',
    description: 'Gazebo klasik dengan ornamen kayu yang indah. Cocok untuk taman bergaya tradisional dengan sentuhan mewah.',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 3, 
    title: 'Gazebo Taman', 
    category: 'Taman',
    alt: 'Gazebo di tengah taman yang asri',
    description: 'Gazebo taman yang nyaman dengan sirkulasi udara yang baik. Dilengkapi dengan tempat duduk yang luas untuk bersantai di taman.',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 4, 
    title: 'Gazebo Mewah', 
    category: 'Mewah',
    alt: 'Gazebo mewah dengan desain eksklusif',
    description: 'Gazebo mewah dengan material pilihan dan desain eksklusif. Cocok untuk properti premium dengan sentuhan kemewahan.',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 5, 
    title: 'Gazebo Minimalis 2', 
    category: 'Minimalis',
    alt: 'Gazebo minimalis dengan atap datar',
    description: 'Gazebo minimalis dengan atap datar yang modern. Desain simpel namun elegan untuk hunian masa kini.',
    src: '/images/gazebo1.jpeg'
  },
  { 
    id: 6, 
    title: 'Gazebo Klasik 2', 
    category: 'Klasik',
    alt: 'Gazebo klasik dengan ukiran kayu',
    description: 'Gazebo klasik dengan ukiran kayu yang detail. Menghadirkan nuansa tradisional yang hangat dan elegan.',
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
    console.log('Opening lightbox with index:', index);
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
        prev === 0 ? filteredImages.length - 1 : (prev !== null ? prev - 1 : 0)
      );
    } else {
      setSelectedImage(prev => 
        prev === filteredImages.length - 1 ? 0 : (prev !== null ? prev + 1 : 0)
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
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-red-100 h-full flex flex-col cursor-pointer"
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
                      className="w-full h-full object-cover pointer-events-none"
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
      <AnimatePresence mode="wait">
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
              className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors p-2 z-10"
              aria-label="Tutup"
            >
              <FiX className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-red-400 transition-all p-4 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm z-10"
              aria-label="Gambar sebelumnya"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div 
              className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container - Full Height with Gray Background */}
              <div className="flex-1 relative overflow-hidden bg-gray-200 flex items-center justify-center p-0">
                {filteredImages[selectedImage] && (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={filteredImages[selectedImage].src} 
                      alt={filteredImages[selectedImage].alt}
                      className="w-full h-full object-contain max-h-full max-w-full"
                      style={{
                        backgroundColor: 'transparent',
                        objectFit: 'contain',
                        padding: '1.5rem',
                        maxHeight: 'calc(85vh - 180px)', // Menyesuaikan tinggi maksimum dengan ukuran lightbox yang lebih kecil
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E5YjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAxMWE3IDcgMCAwIDEtMTQgMHM3IDcgNyA3IDctNyA3LTd6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Info Panel */}
              <div className="border-t border-gray-200 bg-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                        {filteredImages[selectedImage]?.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {selectedImage !== null ? selectedImage + 1 : 0} / {filteredImages.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {filteredImages[selectedImage]?.title}
                    </h3>
                    <p className="text-gray-600">
                      {filteredImages[selectedImage]?.description}
                    </p>
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {filteredImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === selectedImage ? 'bg-red-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Pergi ke gambar ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-red-400 transition-all p-4 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm z-10"
              aria-label="Gambar berikutnya"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Debug Info */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50 hidden">
        <div>isOpen: {isOpen ? 'true' : 'false'}</div>
        <div>selectedImage: {selectedImage}</div>
        <div>Image src: {selectedImage !== null ? filteredImages[selectedImage]?.src : 'No image selected'}</div>
      </div>
    </div>
  );
};

export default GalleryPage;
