import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-wood-900/90 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tentang Kami */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-100">Tentang Kami</h3>
            <p className="mb-4 text-amber-50">
              Karisma Gazebo Rakyat telah berpengalaman lebih dari 20 tahun dalam membangun gazebo berkualitas di berbagai wilayah Indonesia, menghadirkan ruang luar yang indah, fungsional, dan terpercaya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-amber-200 hover:text-white text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-amber-200 hover:text-white text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Kontak */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-100">Hubungi Kami</h3>
            <ul className="space-y-4 text-amber-50">
              <li className="flex">
                <div className="flex-shrink-0 pt-0.5">
                  <FaMapMarkerAlt className="text-amber-200 text-lg mr-3" />
                </div>
                <div>
                  Jln. Curug Agung rt 001/9 no. 8 kelurahan tanah baru – kecamatan beji depok jawa barat indonesia
                </div>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-amber-200 mr-3 flex-shrink-0" />
                <span>+62 813-8698-8879</span>  
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-200 mr-3 flex-shrink-0" />
                <span>karisma.aldi@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Peta Lokasi */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-100">Lokasi Kami</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.735371946093!2d106.82753831529466!3d-6.37266356400806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a9f1c5a9b%3A0x1e3a4b9b9b6b9b1e!2sJalan%20Curug%20Agung%2C%20Tanah%20Baru%2C%20Kec.%20Beji%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016424!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="w-full h-48 md:h-full"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-amber-100 mt-12 pt-6 text-center text-amber-100">
          <p>&copy; {currentYear} Karisma Gazebo Rakyat. Powered by Team IT PT Karisma Gazebo Rakyat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
