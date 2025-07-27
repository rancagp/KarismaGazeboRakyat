import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Karisma Gazebo Rakyat - Jasa Pembuatan Gazebo Berkualitas",
  description: "Jasa pembuatan gazebo berkualitas tinggi dengan desain elegan dan material terbaik. Cocok untuk hunian, taman, maupun komersial.",
  keywords: ["gazebo", "jasa pembuatan gazebo", "gazebo kayu", "gazebo minimalis", "gazebo murah"],
  icons: {
    icon: [
      { url: '/images/logo-KGR2.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
