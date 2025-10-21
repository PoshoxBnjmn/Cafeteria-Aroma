import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaSection } from '@/components/sections/CtaSection';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24 my-12">
      <HeroSection />
      <Separator className="my-8" />
      <FeaturedProducts />
      <Separator className="my-8" />
      <Testimonials />
      <Separator className="my-8" />
      <CtaSection />
    </div>
  );
}
