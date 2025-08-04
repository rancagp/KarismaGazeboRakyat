'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const galleryImages = [
  { 
    id: 1, 
    src: '/images/gazebo1.jpeg', 
    alt: 'Gazebo Minimalis',
    category: 'Minimalis',
    title: 'Gazebo Minimalis di Taman Modern'
  },
  { 
    id: 2, 
    src: '/images/gazebo1.jpeg', 
    alt: 'Gazebo Klasik',
    category: 'Klasik',
    title: 'Gazebo Kayu Klasik'
  },
  { 
    id: 3, 
    src: '/images/gazebo1.jpeg', 
    alt: 'Gazebo Modern',
    category: 'Modern',
    title: 'Gazebo Desain Modern'
  },
  { 
    id: 4, 
    src: '/images/gazebo1.jpeg', 
    alt: 'Gazebo Taman',
    category: 'Taman',
    title: 'Gazebo Taman Asri'
  },
  { 
    id: 5, 
    src: '/images/gazebo1.jpeg', 
    alt: 'Gazebo Kayu',
    category: 'Kayu',
    title: 'Gazebo Kayu Berkualitas'
  },
  { 
    id: 6, 
    src: '/images/gazebo1.jpeg', 
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
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="text-red-400 text-sm">{item.category}</span>
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
                <Link 
                  href={`/galeri/${item.id}`}
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Lihat Detail
                </Link>
              </div>
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
            className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-base font-medium rounded-md text-red-600 hover:bg-red-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
          >
            Lihat Galeri Lengkap
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>

        {/* Lightbox */}
        {isOpen && selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              aria-label="Close lightbox"
            >
              <FiX className="w-8 h-8" />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors p-2"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <img 
                src={filteredImages[selectedImage].src} 
                alt={filteredImages[selectedImage].alt} 
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <h3 className="text-xl font-semibold">{filteredImages[selectedImage].title}</h3>
                <p className="text-red-400">{filteredImages[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
