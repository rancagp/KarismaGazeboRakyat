'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight, FiFilter, FiLoader } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';

// Tipe data untuk gambar galeri
interface GalleryImage {
  id: number;
  title: string;
  category: string;
  alt?: string;
  description: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

// Komponen untuk menampilkan loading
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <FiLoader className="animate-spin text-4xl text-primary" />
    <span className="ml-2">Memuat galeri...</span>
  </div>
);

// Komponen untuk menampilkan pesan error
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center py-12 text-red-500">
    <p>Terjadi kesalahan: {message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
    >
      Coba Lagi
    </button>
  </div>
);

// Komponen untuk menampilkan galeri kosong
const EmptyGallery = () => (
  <div className="text-center py-12">
    <p className="text-gray-500">Belum ada gambar di galeri.</p>
  </div>
);

// Fungsi untuk mengambil data galeri dari API
async function getGalleryImages() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/galeri';
  
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data galeri');
    
    const data = await res.json();
    
    return data.map((item: any) => ({
      id: item.id,
      title: item.judul || 'Tanpa Judul',
      category: item.kategori || 'Tanpa Kategori',
      description: item.isi || 'Tidak ada deskripsi',
      image: processImageUrl(item.image || ''),
      alt: item.judul || 'Gambar galeri',
      slug: item.slug || '',
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Fungsi untuk memproses URL gambar
function processImageUrl(path: string): string {
  if (!path) return '/images/placeholder.jpg';
  
  // Jika path sudah full URL, langsung kembalikan
  if (path.startsWith('http')) {
    return path;
  }
  
  // Dapatkan base URL tanpa /api
  let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://kgr-backend.test';
  baseUrl = baseUrl.replace(/\/api\/?$/, '');
  baseUrl = baseUrl.replace(/\/$/, '');
  
  // Ambil nama file dari path lengkap
  const fileName = path.split('/').pop();
  
  // Arahkan ke direktori img/galeri di root public
  return `${baseUrl}/img/galeri/${fileName}`;
}


const GalleryPage = () => {
  // State untuk data galeri
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State untuk filter dan pencarian
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handler untuk pencarian
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handler untuk filter kategori
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Ambil data galeri dari API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await getGalleryImages();
        
        // Debug: Tampilkan data yang diterima
        console.log('Data galeri yang diterima:', data);
        
        setGalleryImages(data);
        setFilteredImages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat galeri');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Filter gambar berdasarkan kategori dan pencarian
  useEffect(() => {
    if (!galleryImages.length) return;
    
    let result = [...galleryImages];
    
    // Filter berdasarkan kategori
    if (selectedCategory) {
      result = result.filter(img => img.category === selectedCategory);
    }
    
    // Filter berdasarkan pencarian
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        img => 
          img.title.toLowerCase().includes(term) || 
          (img.description && img.description.toLowerCase().includes(term)) ||
          (img.category && img.category.toLowerCase().includes(term))
      );
    }
    
    setFilteredImages(result);
  }, [selectedCategory, searchTerm, galleryImages]);
  
  // Dapatkan daftar kategori unik
  const categories = Array.from(new Set(
    galleryImages.map(img => img.category).filter(Boolean)
  ));

  // Buka lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Tutup lightbox
  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigasi gambar di lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? filteredImages.length - 1 : prev - 1;
      } else {
        return prev === filteredImages.length - 1 ? 0 : prev + 1;
      }
    });
  };

  // Handler untuk klik backdrop lightbox
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };
  
  // Handler untuk keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex, filteredImages.length]);

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
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                onClick={() => handleCategoryFilter(null)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-5 py-3 text-gray-700 hover:bg-gray-50 hover:border-red-400 transition-all duration-300 w-full justify-center md:w-auto"
              >
                <FiFilter className="text-red-500" />
                <span>Filter Kategori</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <motion.div 
            className={`mb-12 overflow-hidden`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
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

          {/* Daftar Galeri */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.alt || image.title}
                      className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error('Gagal memuat gambar:', image.image);
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E5YjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAxMWE3IDcgMCAwIDEtMTQgMHM3IDcgNyA3IDctNyA3LTd6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <FiZoomIn className="text-white text-3xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-500">{image.category}</p>
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
                  setSearchTerm('');
                  setSelectedCategory(null);
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
        {isOpen && filteredImages.length > 0 && filteredImages[currentImageIndex] && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors p-2 z-10"
              onClick={closeLightbox}
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
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-black transition-all p-4 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm z-10"
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
              {/* Image Container */}
              <div className="flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                <img 
                  src={filteredImages[currentImageIndex].image}
                  alt={filteredImages[currentImageIndex].alt || filteredImages[currentImageIndex].title}
                  className="w-full h-full object-contain max-h-full max-w-full"
                  style={{
                    backgroundColor: 'transparent',
                    objectFit: 'contain',
                    padding: '1.5rem',
                    maxHeight: 'calc(85vh - 180px)'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E5YjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAxMWE3IDcgMCAwIDEtMTQgMHM3IDcgNyA3IDctNyA3LTd6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==';
                  }}
                />
              </div>

              {/* Info Panel */}
              <div className="border-t border-gray-200 bg-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                        {filteredImages[currentImageIndex]?.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {currentImageIndex + 1} / {filteredImages.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {filteredImages[currentImageIndex]?.title}
                    </h3>
                    <div 
                      className="text-gray-600 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: filteredImages[currentImageIndex]?.description || '' }}
                    />
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {filteredImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-red-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
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
    </div>
  );
};

export default GalleryPage;
