import { Metadata } from 'next';
import { FaSearch, FaFilter, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import Link from 'next/link';

// Metadata untuk SEO
const metadata: Metadata = {
  title: 'Produk - Karisma Gazebo Rakyat',
  description: 'Temukan berbagai pilihan gazebo berkualitas tinggi dengan desain yang elegan dan fungsional.',
};

// Data produk dummy
const products = [
  {
    id: 1,
    name: 'Gazebo Minimalis',
    category: 'Minimalis',
    price: 15000000,
    rating: 4.8,
    reviewCount: 24,
    image: '/images/products/gazebo-minimalis.jpg',
    description: 'Gazebo dengan desain minimalis yang cocok untuk halaman rumah Anda, memberikan kesan lapang dan modern.',
    features: ['Kayu Jati Tahan Lama', 'Atap Tahan Air', 'Desain Modern'],
    sizes: ['3x3', '4x4', '5x5'],
    colors: ['#8B5A2B', '#5D4037', '#3E2723']
  },
  {
    id: 2,
    name: 'Gazebo Klasik',
    category: 'Klasik',
    price: 25000000,
    rating: 4.9,
    reviewCount: 18,
    image: '/images/products/gazebo-klasik.jpg',
    description: 'Gazebo dengan sentuhan klasik yang elegan dan mewah, cocok untuk taman bergaya tradisional.',
    features: ['Kayu Ulin Kokoh', 'Ukiran Klasik', 'Finishing Halus'],
    sizes: ['3x3', '4x4', '5x5', '6x6'],
    colors: ['#5D4037', '#3E2723', '#1B5E20']
  },
  {
    id: 3,
    name: 'Gazebo Modern',
    category: 'Modern',
    price: 20000000,
    rating: 4.7,
    reviewCount: 32,
    image: '/images/products/gazebo-modern.jpg',
    description: 'Gazebo dengan desain modern dan fungsional untuk ruang luar Anda, minimalis namun elegan.',
    features: ['Desain Kekinian', 'Material Berkualitas', 'Perawatan Mudah'],
    sizes: ['3x3', '4x4', '5x5'],
    colors: ['#3E2723', '#1B5E20', '#0D47A1']
  },
  {
    id: 4,
    name: 'Gazebo Taman',
    category: 'Taman',
    price: 18000000,
    rating: 4.6,
    reviewCount: 15,
    image: '/images/products/gazebo-taman.jpg',
    description: 'Gazebo yang dirancang khusus untuk taman dengan konsep alami yang menyatu dengan lingkungan.',
    features: ['Desain Alami', 'Tahan Cuaca', 'Perawatan Mudah'],
    sizes: ['3x3', '4x4', '5x5'],
    colors: ['#1B5E20', '#33691E', '#8B5A2B']
  },
  {
    id: 5,
    name: 'Gazebo Mewah',
    category: 'Mewah',
    price: 35000000,
    rating: 5.0,
    reviewCount: 12,
    image: '/images/products/gazebo-mewah.jpg',
    description: 'Gazebo mewah dengan sentuhan eksklusif untuk memberikan kesan mewah pada properti Anda.',
    features: ['Material Eksklusif', 'Desain Eksklusif', 'Garansi Premium'],
    sizes: ['4x4', '5x5', '6x6', 'Custom'],
    colors: ['#3E2723', '#1A237E', '#4A148C']
  },
  {
    id: 6,
    name: 'Gazebo Minimalis 2',
    category: 'Minimalis',
    price: 17000000,
    rating: 4.5,
    reviewCount: 20,
    image: '/images/products/gazebo-minimalis-2.jpg',
    description: 'Varian lain dari gazebo minimalis dengan sentuhan modern yang elegan.',
    features: ['Kayu Berkualitas', 'Desain Minimalis', 'Tahan Lama'],
    sizes: ['3x3', '4x4', '5x5'],
    colors: ['#8B5A2B', '#5D4037', '#3E2723']
  }
];

const categories = ['Semua', ...new Set(products.map(p => p.category))];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Koleksi Produk</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Temukan gazebo berkualitas tinggi dengan desain elegan untuk mempercantik ruang luar Anda
          </p>
        </div>
      </section>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari produk..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <FaFilter />
                Filter
              </button>
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>Urutkan: Terpopuler</option>
                <option>Harga: Rendah ke Tinggi</option>
                <option>Harga: Tinggi ke Rendah</option>
                <option>Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Minimalis', 'Klasik', 'Modern', 'Tradisional', 'Besar'].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'Semua' 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-red-500">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Gambar {product.name}</span>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors shadow-sm">
                      <FaHeart />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors shadow-sm">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-500">{product.category}</span>
                      <h3 className="text-lg font-bold text-black">{product.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>
                    <Link 
                      href={`/produk/${product.id}`}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center group"
                    >
                      Lihat Detail <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                1
              </button>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                10
              </button>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Butuh Bantuan Memilih Produk?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda menemukan gazebo yang sempurna untuk kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/hubungi-kami"
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Hubungi Kami
            </Link>
            <Link 
              href="tel:+6281234567890"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +62 812-3456-7890
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
