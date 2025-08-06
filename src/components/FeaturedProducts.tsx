'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  specs?: string;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/produk`
          : 'http://kgr-backend.test/api/produk';
        
        const res = await fetch(API_URL, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data produk');
        }

        const data = await res.json();
        
        // Ambil 3 produk pertama untuk ditampilkan
        const featuredProducts = data.slice(0, 3).map((item: any) => ({
          id: item.id,
          name: item.name || 'Nama Produk',
          slug: item.slug || `produk-${item.id}`,
          description: item.deskripsi || item.description || 'Tidak ada deskripsi',
          image: item.gambar || item.image || '/images/placeholder-product.jpg',
          category: item.category || 'Gazebo',
          specs: item.specs || item.spesifikasi || ''
        }));

        setProducts(featuredProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fungsi untuk mendapatkan path gambar yang benar
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/images/placeholder-product.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    
    const fileName = imagePath.split('/').pop();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL 
      ? process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/?$/, '')
      : 'http://kgr-backend.test';
    
    return `${baseUrl}/img/produk/produk/${fileName}`;
  };
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

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
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
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="text-right">
                  </div>
                </div>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {product.description}
                </p>
                {product.specs && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Spesifikasi:</div>
                    <div 
                      className="text-sm text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: product.specs }}
                    />
                  </div>
                )}
                <Link 
                  href={`/produk/${product.slug || product.id}`}
                  className="mt-auto block w-full text-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 hover:shadow-lg hover:shadow-red-100"
                >
                  Lihat Detail
                </Link>
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
            href="/produk"
            className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-base font-medium rounded-md text-red-600 hover:bg-red-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
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
