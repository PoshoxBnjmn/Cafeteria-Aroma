"use client";

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateCartQuantity, removeFromCart } = useAppContext();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateCartQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Image
        src={item.product.image}
        alt={item.product.name}
        width={64}
        height={64}
        className="rounded-md object-cover"
        data-ai-hint={item.product.imageHint}
      />
      <div className="flex-grow">
        <h4 className="font-semibold">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">${item.product.price.toLocaleString('es-CL')}</p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 h-8 text-center"
        />
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.product.id)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
