'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulasi pengiriman form
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      reset();
      
      // Tampilkan pesan sukses
      setSubmitStatus({
        success: true,
        message: 'Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Terjadi kesalahan. Silakan coba lagi nanti.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />,
      title: 'Alamat',
      description: 'Jl. Contoh No. 123, Kel. Contoh, Kec. Contoh, Kota Contoh, 12345',
      link: 'https://maps.google.com',
      linkText: 'Lihat di Peta'
    },
    {
      icon: <FaPhoneAlt className="w-5 h-5 text-amber-600" />,
      title: 'Telepon',
      description: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
      linkText: 'Hubungi Sekarang'
    },
    {
      icon: <FaEnvelope className="w-5 h-5 text-amber-600" />,
      title: 'Email',
      description: 'info@karismagazeborakyat.com',
      link: 'mailto:info@karismagazeborakyat.com',
      linkText: 'Kirim Email'
    },
    {
      icon: <FaClock className="w-5 h-5 text-amber-600" />,
      title: 'Jam Kerja',
      description: 'Senin - Jumat: 08:00 - 17:00 WIB',
      subDescription: 'Sabtu: 08:00 - 14:00 WIB',
      link: '#',
      linkText: 'Lihat Jadwal'
    }
  ];

  const socialMedia = [
    { 
      name: 'Facebook', 
      icon: <FaFacebook className="w-5 h-5" />, 
      url: 'https://facebook.com/karismagazeborakyat',
      color: 'hover:bg-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-600',
      hoverTextColor: 'group-hover:text-white'
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram className="w-5 h-5" />, 
      url: 'https://instagram.com/karismagazeborakyat',
      color: 'hover:bg-pink-600',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-600',
      hoverTextColor: 'group-hover:text-white'
    },
    { 
      name: 'WhatsApp', 
      icon: <FaWhatsapp className="w-5 h-5" />, 
      url: 'https://wa.me/6281234567890',
      color: 'hover:bg-green-600',
      textColor: 'text-green-600',
      borderColor: 'border-green-600',
      hoverTextColor: 'group-hover:text-white'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-wood-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Kami siap membantu mewujudkan gazebo impian Anda
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-wood-50 p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-wood-900 mb-6">Kirim Pesan</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-wood-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Nama lengkap wajib diisi' })}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-wood-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                      placeholder="Nama Anda"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-wood-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email wajib diisi',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Alamat email tidak valid'
                        }
                      })}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-wood-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                      placeholder="email@contoh.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-wood-700 mb-1">
                    Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { 
                      required: 'Nomor telepon wajib diisi',
                      pattern: {
                        value: /^[0-9+\-\s]+$/,
                        message: 'Format nomor telepon tidak valid'
                      },
                      minLength: {
                        value: 10,
                        message: 'Nomor telepon minimal 10 digit'
                      }
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-wood-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                    placeholder="0812-3456-7890"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-wood-700 mb-1">
                    Subjek <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subjek wajib diisi' })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-wood-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                    placeholder="Subjek pesan Anda"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-wood-700 mb-1">
                    Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { 
                      required: 'Pesan wajib diisi',
                      minLength: {
                        value: 10,
                        message: 'Pesan minimal 10 karakter'
                      }
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-wood-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-wood-600 hover:bg-wood-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-wood-900 mb-6">Informasi Kontak</h2>
              <p className="text-wood-600 mb-8">
                Tim kami siap membantu Anda dengan pertanyaan, permintaan, atau masukan. 
                Jangan ragu untuk menghubungi kami melalui formulir atau informasi kontak di bawah ini.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-wood-900">{item.title}</h3>
                      <p className="text-wood-600">{item.description}</p>
                      {item.subDescription && (
                        <p className="text-wood-600">{item.subDescription}</p>
                      )}
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-amber-600 hover:text-amber-700 font-medium text-sm"
                      >
                        {item.linkText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-wood-900 mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-10 h-10 rounded-full border-2 flex items-center justify-center ${social.borderColor} ${social.textColor} ${social.hoverTextColor} ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-wood-900 mb-4">Lokasi Kami</h3>
                <div className="aspect-w-16 aspect-h-9 bg-wood-100 rounded-lg overflow-hidden">
                  <div className="w-full h-64 flex items-center justify-center text-wood-400">
                    <div className="text-center">
                      <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2" />
                      <p>Peta Lokasi</p>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Buka di Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-wood-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'Berapa lama waktu pengerjaan gazebo?',
                answer: 'Waktu pengerjaan bervariasi tergantung pada ukuran dan kompleksitas desain. Rata-rata pengerjaan memakan waktu 2-4 minggu setelah konfirmasi pesanan.'
              },
              {
                question: 'Apakah harga sudah termasuk pemasangan?',
                answer: 'Ya, harga yang kami tawarkan sudah termasuk biaya pemasangan di lokasi Anda. Namun, untuk area tertentu mungkin ada biaya tambahan transportasi.'
              },
              {
                question: 'Material apa saja yang digunakan?',
                answer: 'Kami menggunakan material berkualitas seperti kayu jati, kayu ulin, atau kayu kamper tergantung pilihan paket. Semua material sudah melalui proses pengawetan untuk ketahanan yang lebih baik.'
              },
              {
                question: 'Apakah ada garansi untuk produk?',
                answer: 'Ya, kami memberikan garansi 1 tahun untuk kerusakan yang bukan disebabkan oleh bencana alam atau kesalahan perawatan. Kami juga menyediakan layanan purna jual untuk perawatan dan perbaikan.'
              },
              {
                question: 'Bagaimana cara pemesanan?',
                answer: 'Anda dapat menghubungi kami melalui telepon, WhatsApp, atau mengisi formulir kontak di website. Tim kami akan menghubungi Anda untuk diskusi lebih lanjut mengenai kebutuhan dan desain yang diinginkan.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-wood-50 transition-colors">
                    <h3 className="font-medium text-wood-900">{faq.question}</h3>
                    <svg className="w-5 h-5 text-wood-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-wood-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-wood-600 mb-6">Masih ada pertanyaan lain?</p>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
