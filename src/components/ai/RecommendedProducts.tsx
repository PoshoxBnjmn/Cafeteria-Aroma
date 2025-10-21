"use client";

import { useState, useEffect } from 'react';
import { recommendProducts, RecommendProductsInput, RecommendProductsOutput } from '@/ai/flows/recommend-products';
import { useAppContext } from '@/contexts/AppContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '../products/ProductCard';
import type { Product } from '@/lib/types';

export function RecommendedProducts() {
  const { orders, products, user } = useAppContext();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orders.length > 0) {
      const fetchRecommendations = async () => {
        setLoading(true);
        
        const orderHistoryForAI = orders.flatMap(order => 
          order.items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
          }))
        );

        const aiInput: RecommendProductsInput = { orderHistory: orderHistoryForAI };
        
        try {
            const result: RecommendProductsOutput = await recommendProducts(aiInput);
            if (result && result.recommendations) {
              const recommendedProducts = result.recommendations
                .map(rec => products.find(p => p.id === rec.productId))
                .filter((p): p is Product => p !== undefined);
              setRecommendations(recommendedProducts);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
      };
      fetchRecommendations();
    } else {
        setLoading(false);
    }
  }, [orders, products, user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Tus Clásicos de Aroma</CardTitle>
        <CardDescription>Basado en tus pedidos anteriores, ¡quizás te guste esto!</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        ) : recommendations.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {recommendations.map((product) => (
                <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex"/>
          </Carousel>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            {user ? "Haz algunos pedidos para que podamos darte recomendaciones." : "Inicia sesión para ver tus recomendaciones."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
