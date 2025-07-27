import Hero from '@/components/Hero';
import ServiceOverview from '@/components/ServiceOverview';
import FeaturedProducts from '@/components/FeaturedProducts';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceOverview />
      <FeaturedProducts />
      <Gallery />
    </>
  );
}
