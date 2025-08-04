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
      icon: <FaMapMarkerAlt className="w-6 h-6 text-red-600" />,
      title: 'Alamat',
      description: 'Jl. Contoh No. 123, Kel. Contoh, Kec. Contoh, Kota Contoh, 12345',
      link: 'https://maps.google.com',
      linkText: 'Lihat di Peta'
    },
    {
      icon: <FaPhoneAlt className="w-6 h-6 text-red-600" />,
      title: 'Telepon',
      description: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
      linkText: 'Hubungi Sekarang'
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-red-600" />,
      title: 'Email',
      description: 'info@karismagazeborakyat.com',
      link: 'mailto:info@karismagazeborakyat.com',
      linkText: 'Kirim Email'
    },
    {
      icon: <FaClock className="w-6 h-6 text-red-600" />,
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
      <section className="relative h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tim kami siap membantu menjawab pertanyaan Anda dan memberikan solusi terbaik untuk kebutuhan gazebo Anda.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Kirim Pesan</h2>
              
              {submitStatus && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Nama lengkap wajib diisi' })}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      placeholder="Nama Anda"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      placeholder="email@contoh.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { 
                      required: 'Nomor telepon wajib diisi',
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: 'Format nomor telepon tidak valid'
                      }
                    })}
                    className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    placeholder="0812-3456-7890"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subjek wajib diisi' })}
                    className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    placeholder="Subjek pesan"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { 
                      required: 'Pesan wajib diisi',
                      minLength: {
                        value: 10,
                        message: 'Pesan minimal 10 karakter'
                      }
                    })}
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Pesan'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Informasi Kontak</h2>
              <p className="text-gray-600 mb-8">
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
                      <h3 className="font-semibold text-black">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      {item.subDescription && (
                        <p className="text-gray-600">{item.subDescription}</p>
                      )}
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        {item.linkText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-black mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 flex items-center justify-center transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-black mb-4">Lokasi Kami</h3>
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.735371946093!2d106.82753831529466!3d-6.37266356400806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a9f1c5a9b%3A0x1e3a4b9b9b6b9b1e!2sJalan%20Curug%20Agung%2C%20Tanah%20Baru%2C%20Kec.%20Beji%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016424!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    className="w-full h-64"
                    title="Lokasi Karisma Gazebo Rakyat"
                  ></iframe>
                </div>
                <a 
                  href="https://www.google.com/maps/place/Jalan+Curug+Agung,+Tanah+Baru,+Kec.+Beji,+Kota+Depok,+Jawa+Barat+16424/@-6.3726636,106.8275383,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ec1a9f1c5a9b:0x1e3a4b9b9b6b9b1e!8m2!3d-6.3726689!4d106.8301132!16s%2Fg%2F1tgb1t4f?entry=ttu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Pertanyaan yang Sering Diajukan</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
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
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-black">{faq.question}</h3>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Masih ada pertanyaan lain?</p>
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
