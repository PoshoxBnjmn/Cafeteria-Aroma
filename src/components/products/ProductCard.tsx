"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isPreviouslyOrdered, redeemPoints, user } = useAppContext();
  const { toast } = useToast();
  const previouslyOrdered = isPreviouslyOrdered(product.id);
  const isRedeemable = product.category === 'Canjeables';

  const handleRedeem = () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Inicia sesión",
            description: "Debes iniciar sesión para canjear productos.",
        });
        return;
    }
    if (product.pointsCost && user.points >= product.pointsCost) {
        redeemPoints(product.id, product.pointsCost);
        toast({
            title: "¡Producto canjeado!",
            description: `Has canjeado ${product.name} con éxito.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Puntos insuficientes",
            description: `No tienes suficientes puntos para canjear ${product.name}.`,
        });
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover aspect-square"
          data-ai-hint={product.imageHint}
        />
        {previouslyOrdered && !isRedeemable && <Badge className="absolute top-2 right-2" variant="secondary">Pedido Anteriormente</Badge>}
        {product.points && <Badge className="absolute top-2 left-2 flex items-center gap-1" variant="default"><Star className="h-3 w-3"/> {product.points}</Badge>}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        {isRedeemable ? (
            <p className="text-lg font-bold text-primary flex items-center gap-2">
                <Star className="h-5 w-5"/> {product.pointsCost} Puntos
            </p>
        ) : (
            <p className="text-lg font-bold text-primary">${product.price.toLocaleString('es-CL')}</p>
        )}

        {isRedeemable ? (
            <Button onClick={handleRedeem} disabled={!user || (product.pointsCost ? user.points < product.pointsCost : true)}>
                <Star className="mr-2 h-4 w-4" />
                Canjear
            </Button>
        ) : (
            <Button onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
