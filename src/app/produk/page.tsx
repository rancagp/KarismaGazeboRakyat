import { Metadata } from 'next';
import { FaSearch, FaFilter, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

// Tipe data untuk produk
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  specs?: string;
  created_at?: string;
  updated_at?: string;
}

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Produk - Karisma Gazebo Rakyat',
  description: 'Temukan berbagai pilihan gazebo berkualitas tinggi dengan desain yang elegan dan fungsional.',
};

// Fungsi untuk mengambil data produk dari API
async function getProducts(): Promise<Product[]> {
  // Menggunakan environment variable untuk base URL API
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/produk`
    : 'http://kgr-backend.test/api/produk'; // Fallback URL untuk development
  
  console.log('Mengambil data dari:', API_URL);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout setelah 15 detik
  
  try {
    console.log('Mencoba fetch ke:', API_URL);
    
    const res = await fetch(API_URL, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      next: { revalidate: 0 }
    });
    
    // Cek status response
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Response error:', errorText);
      
      let errorMessage = 'Gagal mengambil data produk';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorText;
      } catch (e) {
        errorMessage = errorText || 'Tidak ada pesan error';
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse response JSON
    const data = await res.json();
    console.log('Data dari API:', JSON.stringify(data, null, 2));
    
    // Pastikan data adalah array
    if (!Array.isArray(data)) {
      console.error('Format data tidak valid, bukan array:', data);
      return [];
    }
    
    // Debug: Tampilkan data mentah dari API
    console.log('Data mentah dari API:', JSON.stringify(data, null, 2));
    
    // Map data ke format yang diharapkan
    return data.map((item: any) => {
      // Dapatkan path gambar dari berbagai kemungkinan field
      let imagePath = item.gambar || item.image || '';
      let imageUrl = '/images/placeholder.jpg';

      // Proses path gambar jika ada
      if (imagePath) {
        console.log('Path gambar asli:', imagePath);
        
        // Hapus awalan 'storage/' atau '/' jika ada
        imagePath = imagePath.replace(/^\/|^storage\//, '');
        
        // Dapatkan nama file dari path
        const fileName = imagePath.split('/').pop();
        
        // Dapatkan base URL tanpa /api di akhir jika ada
        let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://kgr-backend.test';
        // Hapus /api dari akhir URL jika ada
        baseUrl = baseUrl.replace(/\/api\/?$/, '');
        
        // Pastikan base URL tidak diakhiri dengan /
        baseUrl = baseUrl.replace(/\/$/, '');
        
        // Gunakan path yang benar ke direktori gambar
        // Sesuai dengan lokasi sebenarnya di public/img/produk/produk/
        imageUrl = `${baseUrl}/img/produk/produk/${fileName}`;
        
        console.log('URL gambar yang dibangun:', imageUrl);
        
        // Jika path gambar sudah merupakan URL lengkap, gunakan langsung
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
          imageUrl = imagePath;
        }
      }
      
      // Pastikan URL gambar valid
      console.log(`Mengolah gambar untuk produk ${item.id}:`, {
        original: item.gambar || item.image,
        processed: imageUrl
      });
      
      if (!imageUrl || imageUrl === '/images/placeholder.jpg') {
        console.warn('URL gambar tidak valid untuk produk:', item.id, 'Gambar:', item.gambar || item.image);
      }
      
      return {
        id: item.id,
        slug: item.slug || `produk-${item.id}`,
        name: item.name || 'Produk Tanpa Nama',
        price: item.price || 0,
        image: imageUrl,
        rating: 0, // Default rating 0
        reviewCount: 0, // Default review count 0
        category: 'Gazebo', // Default kategori
        description: item.deskripsi || item.description || 'Deskripsi produk tidak tersedia',
        specs: item.specs || '' // Tambahkan spesifikasi jika ada
      } as Product;
    });
      
  } catch (error) {
    // Hapus timeout jika terjadi error
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      if (error.name === 'AbortError') {
        throw new Error('Permintaan ke server melebihi batas waktu 15 detik');
      }
      
      throw error;
    } else {
      console.error('Error details tidak tersedia:', error);
      throw new Error('Terjadi kesalahan yang tidak diketahui');
    }
  }
}

export default async function ProductsPage() {
  let products: Product[] = [];
  
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Gagal memuat produk:', error);
  }
  
  const categories = ['Semua', 'Minimalis', 'Klasik', 'Modern', 'Tradisional', 'Besar'];

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Cari produk..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="w-full md:w-auto flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select className="border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                <option>Urutkan: Terpopuler</option>
                <option>Harga: Rendah ke Tinggi</option>
                <option>Harga: Tinggi ke Rendah</option>
                <option>Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  category === 'Semua' 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="relative h-60 overflow-hidden">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Link
                      href={`/produk/${product.slug}`}
                      className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Lihat Detail
                      <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-red-600 hover:bg-red-700 transition-colors">
                1
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
                2
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200">
                8
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200">
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
