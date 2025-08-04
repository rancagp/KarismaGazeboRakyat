import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Tentang Kami */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Tentang Kami</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Karisma Gazebo Rakyat telah berpengalaman lebih dari 20 tahun dalam membangun gazebo berkualitas di berbagai wilayah Indonesia, menghadirkan ruang luar yang indah, fungsional, dan terpercaya.
            </p>
            <div className="flex space-x-4 pt-4 border-t border-gray-800">
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-xl">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-xl">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-xl">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Kontak */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex">
                <div className="flex-shrink-0 pt-1">
                  <FaMapMarkerAlt className="text-red-500 text-lg mr-4" />
                </div>
                <div className="leading-relaxed">
                  Jln. Curug Agung rt 001/9 no. 8 kelurahan tanah baru – kecamatan beji depok jawa barat indonesia
                </div>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <span>+62 813-8698-8879</span>  
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <span>karisma.aldi@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Peta Lokasi */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Lokasi Kami</h3>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.735371946093!2d106.82753831529466!3d-6.37266356400806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a9f1c5a9b%3A0x1e3a4b9b9b6b9b1e!2sJalan%20Curug%20Agung%2C%20Tanah%20Baru%2C%20Kec.%20Beji%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016424!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="w-full h-48 md:h-48 lg:h-56"
                title="Lokasi Karisma Gazebo Rakyat"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Karisma Gazebo Rakyat. All rights reserved. Powered by Team IT PT Karisma Gazebo Rakyat.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
