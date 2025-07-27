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
    <div className="min-h-screen bg-wood-50">
      {/* Hero Section */}
      <section className="relative h-64 bg-wood-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Produk Kami</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Temukan gazebo berkualitas tinggi dengan desain yang elegan dan fungsional
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-wood-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-wood-400" />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-wood-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option>Urutkan</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Rating Tertinggi</option>
                  <option>Terbaru</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <svg className="w-4 h-4 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button className="flex items-center gap-2 bg-white border border-wood-300 rounded-lg px-4 py-2 text-wood-700 hover:bg-wood-50 transition-colors">
                <FaFilter />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'Semua'
                    ? 'bg-wood-600 text-white'
                    : 'bg-white text-wood-700 hover:bg-wood-100 border border-wood-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 bg-wood-100 flex items-center justify-center">
                  <span className="text-wood-400">Gambar {product.name}</span>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-wood-600 hover:text-amber-500 transition-colors shadow-md">
                      <FaHeart />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-wood-600 hover:text-amber-500 transition-colors shadow-md">
                      <FaSearch />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/produk/${product.id}`} className="hover:text-amber-600 transition-colors">
                      <h3 className="text-xl font-bold text-wood-900 line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm">
                      <FaStar className="text-amber-500 mr-1" />
                      <span>{product.rating}</span>
                      <span className="text-wood-500 text-xs ml-1">({product.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-wood-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-wood-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button className="bg-wood-600 hover:bg-wood-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <FaShoppingCart />
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-md text-wood-600 hover:bg-wood-100">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-md bg-wood-600 text-white">
                1
              </button>
              <button className="w-10 h-10 rounded-md text-wood-600 hover:bg-wood-100">
                2
              </button>
              <button className="w-10 h-10 rounded-md text-wood-600 hover:bg-wood-100">
                3
              </button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 rounded-md text-wood-600 hover:bg-wood-100">
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-wood-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tidak Menemukan yang Anda Cari?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Kami siap membantu mewujudkan gazebo impian Anda dengan desain khusus sesuai kebutuhan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/hubungi-kami" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Konsultasi Gratis
            </Link>
            <Link 
              href="tel:+6281234567890" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +62 812-3456-7890
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
