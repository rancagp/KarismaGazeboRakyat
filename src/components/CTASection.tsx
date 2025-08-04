'use client';

import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Butuh Bantuan Memilih Produk?</h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Tim ahli kami siap membantu Anda menemukan gazebo yang sempurna untuk kebutuhan Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/hubungi-kami"
            className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Hubungi Kami
          </Link>
          <Link 
            href="tel:+6281234567890"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +62 812-3456-7890
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
