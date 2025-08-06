'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';

// Tipe data untuk gambar galeri
interface GalleryImage {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  alt?: string;
  slug: string;
  created_at: string;
  updated_at: string;
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

// Komponen untuk menampilkan loading
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <FiLoader className="animate-spin text-4xl text-red-600" />
    <span className="ml-2">Memuat galeri...</span>
  </div>
);

// Komponen untuk menampilkan pesan error
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center py-12 text-red-500">
    <p>Terjadi kesalahan: {message}</p>
  </div>
);

// Komponen untuk menampilkan galeri kosong
const EmptyGallery = () => (
  <div className="text-center py-12">
    <p className="text-gray-500">Belum ada gambar di galeri.</p>
  </div>
);

// Komponen utama Gallery
const Gallery = () => {
  // State untuk data galeri
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk lightbox
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [category, setCategory] = useState('Semua');
  const [isOpen, setIsOpen] = useState(false);
  
  // Ambil data galeri dari API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const API_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://kgr-backend.test/api') + '/galeri';
        const res = await fetch(API_URL, { cache: 'no-store' });
        
        if (!res.ok) throw new Error('Gagal mengambil data galeri');
        
        const data = await res.json();
        
        // Format data sesuai dengan yang dibutuhkan
        const formattedData = data.map((item: any) => ({
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
        
        setGalleryImages(formattedData);
        setFilteredImages(formattedData);
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
  
  // Filter gambar berdasarkan kategori
  useEffect(() => {
    if (!galleryImages.length) return;
    
    let result = [...galleryImages];
    
    if (category !== 'Semua') {
      result = result.filter(img => img.category === category);
    }
    
    setFilteredImages(result);
  }, [category, galleryImages]);
  
  // Dapatkan daftar kategori unik
  const categories = ['Semua', ...new Set(galleryImages.map(img => img.category))];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const totalImages = filteredImages.length;
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev === 0 ? totalImages - 1 : prev! - 1));
    } else {
      setSelectedImage((prev) => (prev === totalImages - 1 ? 0 : prev! + 1));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-red-600 font-semibold mb-3">Portofolio Kami</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Galeri Pekerjaan
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Jelajahi koleksi hasil karya terbaik kami yang telah menghiasi berbagai ruang luar dengan keindahan dan fungsionalitasnya.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredImages.length === 0 ? (
          <EmptyGallery />
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredImages.map((item, index) => (
            <motion.div 
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-64 bg-gray-100"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E5YjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAxMWE3IDcgMCAwIDEtMTQgMHM3IDcgNyA3IDctNyA3LTd6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold line-clamp-1">{item.title}</h3>
                    <span className="text-red-400 text-sm">{item.category}</span>
                    {item.description && (
                      <div 
                        className="text-white text-xs mt-1 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(index);
                  }}
                  className="text-white bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors"
                  aria-label="Zoom in"
                >
                  <FiZoomIn className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="/galeri"
            className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-base font-medium rounded-md text-red-600 hover:bg-red-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
          >
            Lihat Galeri Lengkap
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>

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
                {/* Image Container */}
                <div className="flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                  <Image
                    src={filteredImages[selectedImage].image}
                    alt={filteredImages[selectedImage].alt || filteredImages[selectedImage].title}
                    fill
                    className="object-contain"
                    style={{
                      maxHeight: 'calc(85vh - 180px)',
                      padding: '1.5rem'
                    }}
                    priority
                    sizes="(max-width: 1200px) 100vw, 80vw"
                  />
                </div>

                {/* Info Panel */}
                <div className="border-t border-gray-200 bg-white p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {filteredImages[selectedImage].category && (
                          <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                            {filteredImages[selectedImage].category}
                          </span>
                        )}
                        <span className="text-gray-500 text-sm">
                          {selectedImage + 1} / {filteredImages.length}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {filteredImages[selectedImage].title}
                      </h3>
                      {filteredImages[selectedImage].description && (
                        <div 
                          className="text-gray-600 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: filteredImages[selectedImage].description }}
                        />
                      )}
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
      </div>
    </section>
  );
};

export default Gallery;
