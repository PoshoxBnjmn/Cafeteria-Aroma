"use client";

import { Button } from '@/components/ui/button';
import type { ProductCategory } from '@/lib/types';

interface CategoryFiltersProps {
  categories: (ProductCategory | 'Todos' | 'Pedidos Anteriormente')[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilters({ categories, selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category)}
          className="capitalize"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
