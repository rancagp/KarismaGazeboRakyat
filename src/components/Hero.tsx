'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/wood-pattern.png')] bg-repeat"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Gazebo Berkualitas untuk Kenyamanan Anda
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Menciptakan ruang nyaman di tengah keindahan alam dengan gazebo berkualitas tinggi dari kayu pilihan yang tahan lama dan elegan.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/produk" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300 shadow-lg hover:shadow-red-900/20"
            >
              Lihat Produk
            </Link>
            <Link 
              href="/hubungi-kami" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-base font-medium rounded-md text-gray-800 hover:bg-gray-800 hover:text-white md:py-4 md:text-lg md:px-10 transition-colors duration-300"
            >
              Hubungi Kami
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
