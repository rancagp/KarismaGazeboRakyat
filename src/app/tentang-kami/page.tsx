'use client';

import { FaLeaf, FaTools, FaUsers, FaAward } from 'react-icons/fa';
import Image from 'next/image';

const TentangKami = () => {
  const features = [
    {
      icon: <FaLeaf className="w-8 h-8 text-amber-600" />,
      title: 'Ramah Lingkungan',
      description: 'Menggunakan bahan-bahan berkualitas tinggi yang ramah lingkungan dan berkelanjutan.'
    },
    {
      icon: <FaTools className="w-8 h-8 text-amber-600" />,
      title: 'Pengerjaan Profesional',
      description: 'Dikerjakan oleh tim ahli yang berpengalaman di bidangnya dengan standar kualitas tinggi.'
    },
    {
      icon: <FaUsers className="w-8 h-8 text-amber-600" />,
      title: 'Pelayanan Terbaik',
      description: 'Memberikan pelayanan terbaik dengan mengutamakan kepuasan pelanggan.'
    },
    {
      icon: <FaAward className="w-8 h-8 text-amber-600" />,
      title: 'Bergaransi',
      description: 'Setiap produk yang kami buat dilengkapi dengan garansi kualitas.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-wood-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tentang Kami</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Menciptakan ruang nyaman dan berkualitas untuk setiap sudut rumah Anda
          </p>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-wood-200 flex items-center justify-center text-wood-400">
                  <span>Gambar Tim Kami</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-amber-600 font-semibold">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold text-wood-900 mb-6">
                Karisma Gazebo Rakyat
              </h2>
              <p className="text-wood-600 mb-6">
                Karisma Gazebo Rakyat telah berpengalaman lebih dari 10 tahun dalam pembuatan berbagai jenis gazebo berkualitas tinggi. 
                Kami berkomitmen untuk memberikan produk terbaik dengan bahan pilihan dan pengerjaan yang teliti.
              </p>
              <p className="text-wood-600 mb-8">
                Dengan tim ahli yang berpengalaman, kami siap mewujudkan impian Anda memiliki gazebo idaman yang tidak hanya indah 
                tetapi juga kokoh dan tahan lama.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-wood-900">{feature.title}</h3>
                      <p className="text-sm text-wood-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="py-20 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold">Visi & Misi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-wood-900 mb-4">
              Komitmen Kami
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-wood-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3">1</span>
                Visi
              </h3>
              <p className="text-wood-600">
                Menjadi produsen gazebo terdepan yang dikenal dengan kualitas, inovasi, dan pelayanan terbaik di Indonesia, 
                menciptakan ruang luar yang indah dan nyaman untuk setiap pelanggan.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-wood-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3">2</span>
                Misi
              </h3>
              <ul className="space-y-3 text-wood-600">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Menyediakan produk gazebo berkualitas tinggi dengan bahan terbaik
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Memberikan pelayanan terbaik dan solusi kreatif untuk kebutuhan pelanggan
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Berinovasi dalam desain dan teknologi pembuatan gazebo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold">Tim Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold text-wood-900 mb-4">
              Kenali Tim Profesional Kami
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group text-center">
                <div className="relative h-64 w-48 mx-auto mb-4 rounded-xl overflow-hidden bg-wood-100 flex items-center justify-center">
                  <span className="text-wood-400">Foto Anggota Tim</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white text-left">
                      <h4 className="font-bold">Nama Anggota {item}</h4>
                      <p className="text-sm text-amber-200">Jabatan</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-wood-900">Nama Anggota {item}</h3>
                <p className="text-wood-600">Jabatan</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKami;
