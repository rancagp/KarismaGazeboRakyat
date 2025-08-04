'use client';

import { FaLeaf, FaTools, FaUsers, FaAward } from 'react-icons/fa';
import Image from 'next/image';

const TentangKami = () => {
  const features = [
    {
      icon: <FaLeaf className="w-8 h-8 text-red-600" />,
      title: 'Ramah Lingkungan',
      description: 'Menggunakan bahan-bahan berkualitas tinggi yang ramah lingkungan dan berkelanjutan.'
    },
    {
      icon: <FaTools className="w-8 h-8 text-red-600" />,
      title: 'Pengerjaan Profesional',
      description: 'Dikerjakan oleh tim ahli yang berpengalaman di bidangnya dengan standar kualitas tinggi.'
    },
    {
      icon: <FaUsers className="w-8 h-8 text-red-600" />,
      title: 'Pelayanan Terbaik',
      description: 'Memberikan pelayanan terbaik dengan mengutamakan kepuasan pelanggan.'
    },
    {
      icon: <FaAward className="w-8 h-8 text-red-600" />,
      title: 'Bergaransi',
      description: 'Setiap produk yang kami buat dilengkapi dengan garansi kualitas.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Menciptakan ruang nyaman dan berkualitas untuk setiap sudut rumah Anda
          </p>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                  <span>Gambar Tim Kami</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-red-600 font-semibold">Tentang Kami</span>
              <h2 className="text-3xl font-bold text-black mb-6">
                Tentang Karisma Gazebo Rakyat
              </h2>
              <p className="text-gray-600 mb-6">
                Sudah 20 tahun sejak pertama kali kami membangun sebuah gazebo untuk client kami di daerah jakarta, sejak itu pula kami berkomitmen untuk terus meningkatkan kualitas kami baik dari segi jasa maupun kualitas produk kami.
              </p>
              <p className="text-gray-600 mb-8">
                Kini kami telah berdiri dengan banyak hal yang tentunya lebih baik dari hari sebelumnya, kami telah di percaya untuk mengerjakan puluhan proyek di seluruh wilayah di indonesia.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Keunggulan Kami</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-red-500 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-black mb-2">Visi</h3>
              <p className="text-gray-600">
                Menjadi produsen gazebo terdepan yang dikenal dengan kualitas, inovasi, dan pelayanan terbaik di Indonesia, 
                menciptakan ruang luar yang indah dan nyaman untuk setiap pelanggan.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-red-500 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-black mb-2">Misi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Menyediakan produk gazebo berkualitas tinggi dengan bahan terbaik
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Memberikan pelayanan terbaik dan solusi kreatif untuk kebutuhan pelanggan
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Berinovasi dalam desain dan teknologi pembuatan gazebo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKami;
