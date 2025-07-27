'use client';

import { motion } from 'framer-motion';
import { FaTree, FaHammer, FaShieldAlt, FaLeaf, FaRulerCombined, FaTools } from 'react-icons/fa';

const ServiceOverview = () => {
  const features = [
    {
      icon: <FaTree className="w-10 h-10" />,
      title: 'Material Berkualitas',
      description: 'Menggunakan kayu pilihan berkualitas tinggi yang tahan lama, awet, dan ramah lingkungan.'
    },
    {
      icon: <FaHammer className="w-10 h-10" />,
      title: 'Pengerjaan Profesional',
      description: 'Dikerjakan oleh tenaga ahli berpengalaman dengan ketelitian tinggi dan standar kualitas terbaik.'
    },
    {
      icon: <FaShieldAlt className="w-10 h-10" />,
      title: 'Garansi Kualitas',
      description: 'Memberikan garansi untuk setiap produk yang kami hasilkan demi kepuasan pelanggan.'
    },
    {
      icon: <FaLeaf className="w-10 h-10" />,
      title: 'Ramah Lingkungan',
      description: 'Menggunakan bahan-bahan yang ramah lingkungan dan berkelanjutan.'
    },
    {
      icon: <FaRulerCombined className="w-10 h-10" />,
      title: 'Desain Kustom',
      description: 'Menerima pesanan dengan desain khusus sesuai kebutuhan dan keinginan Anda.'
    },
    {
      icon: <FaTools className="w-10 h-10" />,
      title: 'Peralatan Modern',
      description: 'Didukung dengan peralatan modern untuk hasil yang presisi dan berkualitas tinggi.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-wood-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-amber-600 font-semibold mb-3">Mengapa Memilih Kami</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wood-900 mb-4">
            Keunggulan Layanan Kami
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-wood-100 hover:border-amber-100"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6 mx-auto group-hover:bg-amber-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-center text-wood-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-wood-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceOverview;
