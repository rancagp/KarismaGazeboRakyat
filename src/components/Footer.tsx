import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tentang Kami */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
            <p className="mb-4 text-amber-100">
              Karisma Gazebo Rakyat adalah penyedia jasa pembuatan gazebo berkualitas tinggi dengan pengalaman bertahun-tahun dalam menciptakan ruang luar yang indah dan fungsional.
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
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-amber-200" />
                <span>Jl. Contoh No. 123, Kota Anda, Indonesia</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-amber-200" />
                <span>+62 123 4567 8900</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-amber-200" />
                <span>info@karismagazeborakyat.com</span>
              </li>
            </ul>
          </div>
          
          {/* Jam Kerja */}
          <div>
            <h3 className="text-xl font-bold mb-4">Jam Kerja</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 17:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu</span>
                <span>09:00 - 15:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Minggu</span>
                <span>Tutup</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-amber-800 mt-12 pt-6 text-center text-amber-200">
          <p>&copy; {currentYear} Karisma Gazebo Rakyat. Semua Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
