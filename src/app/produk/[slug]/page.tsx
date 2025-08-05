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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Gambar Produk */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={product.image || '/images/placeholder-product.jpg'}
                alt={product.name}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Detail Produk */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-2xl font-semibold text-indigo-600">
                Rp {product.price?.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>

            {product.specs && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Spesifikasi</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.specs }} />
              </div>
            )}

            <div className="mt-8">
              <Link 
                href="/hubungi-kami" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors inline-block"
              >
                Hubungi Kami untuk Pemesanan
              </Link>
              <Link 
                href="/produk" 
                className="ml-4 text-indigo-600 hover:text-indigo-800 transition-colors inline-block"
              >
                ← Kembali ke Daftar Produk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
