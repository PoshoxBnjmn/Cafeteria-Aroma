import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white rounded-lg overflow-hidden shadow-2xl">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-shadow">
          Cafetería Aroma: El Sabor Clásico, Ahora donde Quieras.
        </h1>
        <p className="mt-4 text-lg md:text-xl font-body max-w-2xl mx-auto">
          Somos Cafetería Aroma, ahora 100% virtual para ofrecerte la mejor calidad y precios, directamente a tu puerta.
        </p>
        <Button asChild size="lg" className="mt-8 font-bold text-lg">
          <Link href="/menu">Ver Nuestro Menú Retro</Link>
        </Button>
      </div>
    </section>
  );
}
