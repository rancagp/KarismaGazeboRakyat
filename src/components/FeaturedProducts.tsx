'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Gazebo Minimalis',
    description: 'Gazebo dengan desain minimalis yang cocok untuk halaman rumah Anda, memberikan kesan lapang dan modern.',
    price: '15.000.000',
    startingPrice: 'Mulai dari',
    features: ['Kayu Jati Tahan Lama', 'Atap Tahan Air', 'Desain Modern'],
    image: '/images/placeholder-gazebo1.jpg'
  },
  {
    id: 2,
    name: 'Gazebo Klasik',
    description: 'Gazebo dengan sentuhan klasik yang elegan dan mewah, cocok untuk taman bergaya tradisional.',
    price: '25.000.000',
    startingPrice: 'Mulai dari',
    features: ['Kayu Ulin Kokoh', 'Ukiran Klasik', 'Finishing Halus'],
    image: '/images/placeholder-gazebo2.jpg'
  },
  {
    id: 3,
    name: 'Gazebo Modern',
    description: 'Gazebo dengan desain modern dan fungsional untuk ruang luar Anda, minimalis namun elegan.',
    price: '20.000.000',
    startingPrice: 'Mulai dari',
    features: ['Desain Kekinian', 'Material Berkualitas', 'Perawatan Mudah'],
    image: '/images/placeholder-gazebo3.jpg'
  }
];

const FeaturedProducts = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-wood-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-amber-600 font-semibold mb-3">Produk Unggulan</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wood-900 mb-4">
            Koleksi Gazebo Kami
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-wood-600 max-w-3xl mx-auto">
            Temukan berbagai pilihan gazebo berkualitas tinggi dengan desain elegan dan fungsional untuk melengkapi ruang luar Anda.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-wood-100 hover:border-amber-100"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="h-60 bg-wood-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-wood-300">
                  <div className="text-center p-4">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Gambar {product.name}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-amber-500/90 text-white px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-wood-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-wood-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="text-sm text-wood-500">{product.startingPrice}</span>
                    <p className="text-2xl font-bold text-wood-900">
                      Rp {product.price}
                    </p>
                  </div>
                  <Link 
                    href={`/produk/${product.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-wood-600 hover:bg-wood-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wood-500 transition-colors"
                  >
                    Lihat Detail
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
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
            href="/produk"
            className="inline-flex items-center px-8 py-3 border-2 border-wood-600 text-base font-medium rounded-md text-wood-700 hover:bg-wood-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
          >
            Lihat Semua Produk
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
