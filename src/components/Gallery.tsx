'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const galleryImages = [
  { 
    id: 1, 
    src: '/images/gallery/gazebo1.jpg', 
    alt: 'Gazebo Minimalis',
    category: 'Minimalis',
    title: 'Gazebo Minimalis di Taman Modern'
  },
  { 
    id: 2, 
    src: '/images/gallery/gazebo2.jpg', 
    alt: 'Gazebo Klasik',
    category: 'Klasik',
    title: 'Gazebo Kayu Klasik'
  },
  { 
    id: 3, 
    src: '/images/gallery/gazebo3.jpg', 
    alt: 'Gazebo Modern',
    category: 'Modern',
    title: 'Gazebo Desain Modern'
  },
  { 
    id: 4, 
    src: '/images/gallery/gazebo4.jpg', 
    alt: 'Gazebo Taman',
    category: 'Taman',
    title: 'Gazebo Taman Asri'
  },
  { 
    id: 5, 
    src: '/images/gallery/gazebo5.jpg', 
    alt: 'Gazebo Kayu',
    category: 'Kayu',
    title: 'Gazebo Kayu Berkualitas'
  },
  { 
    id: 6, 
    src: '/images/gallery/gazebo6.jpg', 
    alt: 'Gazebo Mewah',
    category: 'Mewah',
    title: 'Gazebo Mewah'
  },
];

const categories = ['Semua', ...new Set(galleryImages.map(img => img.category))];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [category, setCategory] = useState('Semua');
  const [isOpen, setIsOpen] = useState(false);

  const filteredImages = category === 'Semua' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === category);

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
    <section className="py-20 bg-gradient-to-b from-wood-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-amber-600 font-semibold mb-3">Portofolio Kami</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wood-900 mb-4">
            Galeri Pekerjaan
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-wood-600 max-w-3xl mx-auto">
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
                  ? 'bg-wood-600 text-white'
                  : 'bg-wood-100 text-wood-700 hover:bg-wood-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

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
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-80 bg-wood-100"
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
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="/galeri"
            className="inline-flex items-center px-8 py-3 border-2 border-wood-600 text-base font-medium rounded-md text-wood-700 hover:bg-wood-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
          >
            Lihat Galeri Lengkap
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>

        {/* Lightbox */}
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
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
              aria-label="Tutup"
            >
              <FiX className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
                  <span className="sr-only">{filteredImages[selectedImage].alt}</span>
                </div>
                
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-wood-900 mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-wood-600">
                    {filteredImages[selectedImage].category}
                  </p>
                </div>
              </motion.div>
              
              <button 
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Gambar sebelumnya"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Gambar selanjutnya"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
