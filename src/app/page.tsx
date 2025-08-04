import Hero from '@/components/Hero';
import ServiceOverview from '@/components/ServiceOverview';
import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceOverview />
      <FeaturedProducts />
      <CTASection />
      <Gallery />
    </>
  );
}
