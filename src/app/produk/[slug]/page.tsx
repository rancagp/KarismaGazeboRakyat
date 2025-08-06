import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Tipe data untuk produk
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  specs: string;
  price: number;
  image: string;
  // Tambahkan properti lain yang diperlukan
}

// Fungsi untuk mengambil data produk berdasarkan slug
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Gunakan environment variable untuk base URL API
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/produk/${slug}`
      : `http://kgr-backend.test/api/produk/${slug}`;
    
    console.log('Mengambil detail produk dari:', API_URL);
    
    const res = await fetch(API_URL, {
      next: { revalidate: 60 }, // Revalidate setiap 60 detik
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!res.ok) {
      console.error(`Gagal mengambil data produk (${res.status}):`, res.statusText);
      if (res.status === 404) {
        console.error('Produk tidak ditemukan');
      }
      return null;
    }

    const data = await res.json();
    console.log('Data produk yang diterima:', JSON.stringify(data, null, 2));
    
    // Pastikan data yang dikembalikan sesuai dengan tipe Product
    if (!data || !data.id) {
      console.error('Format data produk tidak valid');
      return null;
    }

    // Dapatkan path gambar yang benar
    let imageUrl = data.gambar || data.image || '';
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL 
        ? process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/?$/, '')
        : 'http://kgr-backend.test';
      imageUrl = `${baseUrl}/img/produk/produk/${fileName}`;
    } else {
      imageUrl = '/images/placeholder-product.jpg';
    }

    return {
      id: data.id,
      name: data.name || data.nama || 'Nama Produk',
      slug: data.slug || slug,
      description: data.deskripsi || data.description || 'Tidak ada deskripsi',
      specs: data.specs || data.spesifikasi || '',
      price: data.harga || data.price || 0,
      image: imageUrl
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="pt-20 md:pt-24 pb-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/produk" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                    Produk
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Gallery Side */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image || '/images/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-red-500 transition-all">
                    <Image
                      src={product.image || '/images/placeholder-product.jpg'}
                      alt={`${product.name} - ${item}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Side */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="h-1 w-20 bg-red-600 rounded-full mb-4"></div>
              </div>

              {product.description && (
                <div className="prose max-w-none text-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}

              {product.specs && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Spesifikasi Teknis</h3>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.specs }} />
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/hubungi-kami" 
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                >
                  Konsultasi Sekarang
                </Link>
                <Link 
                  href="/produk" 
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-300 text-center"
                >
                  Lihat Produk Lainnya
                </Link>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-blue-700">
                    Butuh bantuan memilih produk yang tepat? Tim kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for related products */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.image || '/images/placeholder-product.jpg'}
                    alt={`Produk terkait ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Gazebo Minimalis {item}</h3>
                  <p className="text-sm text-gray-500 mb-3">Ukuran 3x3 meter</p>
                  <Link 
                    href="/produk/gazebo-minimalis-1" 
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
