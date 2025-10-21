
"use client";

import { useState, useMemo } from 'react';
import { CategoryFilters } from '@/components/products/CategoryFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import type { Product, ProductCategory } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

type Category = ProductCategory | 'Todos' | 'Pedidos Anteriormente';

export default function MenuPage() {
  const { products, user, isPreviouslyOrdered, isAppLoaded } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');

  const categories: Category[] = useMemo(() => {
    const baseCategories: Category[] = ['Todos', 'Bebestibles Calientes', 'Frappes / Bebidas Frías', 'Dulces', 'Salados'];
    if (user) {
      baseCategories.push('Pedidos Anteriormente');
    }
    return baseCategories;
  }, [user]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return products.filter(p => p.category !== 'Canjeables');
    }
    if (selectedCategory === 'Pedidos Anteriormente') {
      return products.filter(p => isPreviouslyOrdered(p.id) && p.category !== 'Canjeables');
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory, products, isPreviouslyOrdered]);

  const redeemableProducts = useMemo(() => {
    return products.filter(p => p.category === 'Canjeables');
  }, [products]);

  const renderProductGrid = (products: Product[]) => {
    if (!isAppLoaded) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      );
    }
    return <ProductGrid products={products} />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">El Menú Clásico de Aroma</h1>
        <p className="text-muted-foreground mt-2">Explora nuestra selección de delicias hechas con amor.</p>
      </div>
      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category as Category)}
      />
      {renderProductGrid(filteredProducts)}

      <Separator className="my-12" />
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-headline font-bold">Canjea tus Puntos</h2>
          <p className="text-muted-foreground mt-2">Usa tus puntos de lealtad para disfrutar de estos productos.</p>
        </div>
        {renderProductGrid(redeemableProducts)}
      </div>
    </div>
  );
}
