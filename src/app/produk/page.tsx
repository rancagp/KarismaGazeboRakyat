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
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <FaFilter />
                Filter
              </button>
              <select className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>Urutkan: Terpopuler</option>
                <option>Harga: Rendah ke Tinggi</option>
                <option>Harga: Tinggi ke Rendah</option>
                <option>Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'Semua' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="relative h-48 bg-gray-100">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fallbackSrc="/images/placeholder.jpg"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500 transition-colors">
                    <FaHeart className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <Link 
                    href={`/produk/${product.slug}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                1
              </button>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Butuh Bantuan Memilih Gazebo?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda memilih gazebo yang sempurna untuk kebutuhan Anda. Hubungi kami untuk konsultasi gratis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/hubungi-kami" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Hubungi Kami
            </Link>
            <Link 
              href="tel:+6281234567890" 
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +62 812-3456-7890
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
