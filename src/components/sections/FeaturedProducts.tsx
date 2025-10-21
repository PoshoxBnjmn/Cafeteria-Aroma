import { ProductCard } from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data';

export function FeaturedProducts() {
  const featured = MOCK_PRODUCTS.slice(0, 4);

  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Nuestros Productos Estrella</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
