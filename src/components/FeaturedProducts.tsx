'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Gazebo Minimalis',
    description: 'Gazebo dengan desain minimalis yang cocok untuk halaman rumah Anda, memberikan kesan lapang dan modern.',
    features: ['Kayu Jati Tahan Lama', 'Atap Tahan Air', 'Desain Modern'],
    image: '/images/gazebo1.jpeg'
  },
  {
    id: 2,
    name: 'Gazebo Klasik',
    description: 'Gazebo dengan sentuhan klasik yang elegan dan mewah, cocok untuk taman bergaya tradisional.',
    features: ['Kayu Ulin Kokoh', 'Ukiran Klasik', 'Finishing Halus'],
    image: '/images/gazebo1.jpeg'
  },
  {
    id: 3,
    name: 'Gazebo Modern',
    description: 'Gazebo dengan desain modern dan fungsional untuk ruang luar Anda, minimalis namun elegan.',
    features: ['Desain Kekinian', 'Material Berkualitas', 'Perawatan Mudah'],
    image: '/images/gazebo1.jpeg'
  }
];

const FeaturedProducts = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
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
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-red-600 font-semibold mb-3 text-sm uppercase tracking-wider">Produk Unggulan</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Koleksi Gazebo Kami
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan berbagai pilihan gazebo berkualitas tinggi dengan desain elegan dan fungsional untuk melengkapi ruang luar Anda.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-500 flex flex-col h-full"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="h-64 bg-gray-50 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="text-right">
                  </div>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/produk/${product.id}`}
                  className="mt-auto block w-full text-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 hover:shadow-lg hover:shadow-red-100"
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
