
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/user/ImageUploader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  price: z.coerce.number().min(0, { message: "El precio no puede ser negativo." }).optional(),
  pointsCost: z.coerce.number().min(0, { message: "Los puntos no pueden ser negativos." }).optional(),
  image: z.string().optional(),
});

function ProductEditForm({ product }: { product: Product }) {
  const { updateProduct } = useAppContext();
  const { toast } = useToast();
  const isRedeemable = product.category === 'Canjeables';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      pointsCost: product.pointsCost,
      image: product.image,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateProduct(product.id, values);
    toast({
        title: "¡Producto Actualizado!",
        description: `Se ha actualizado ${values.name}.`
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del Producto</FormLabel>
              <FormControl>
                <ImageUploader value={field.value || ''} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRedeemable ? (
            <FormField
              control={form.control}
              name="pointsCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coste en Puntos</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        ) : (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>Guardar Cambios</Button>
      </form>
    </Form>
  );
}


function AdminDashboard() {
    const { products } = useAppContext();
    
    const regularProducts = products.filter(p => p.category !== 'Canjeables');
    const redeemableProducts = products.filter(p => p.category === 'Canjeables');

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Gestión de Productos</CardTitle>
                    <CardDescription>Edita el nombre, precio e imagen de los productos estándar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {regularProducts.map((product) => (
                            <AccordionItem value={product.id} key={product.id}>
                                <AccordionTrigger>{product.name}</AccordionTrigger>
                                <AccordionContent>
                                    <ProductEditForm product={product} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Gestión de Productos Canjeables</CardTitle>
                    <CardDescription>Edita el nombre, coste en puntos e imagen de los productos canjeables.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {redeemableProducts.map((product) => (
                            <AccordionItem value={product.id} key={product.id}>
                                <AccordionTrigger>{product.name}</AccordionTrigger>
                                <AccordionContent>
                                    <ProductEditForm product={product} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AdminPage() {
    const { user } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user === null) {
                router.push('/login');
            } else if (user?.role !== 'admin') {
                router.push('/');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [user, router]);

    if (!user || user.role !== 'admin') {
        return (
             <div className="space-y-8">
                <div>
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }
    
    return <AdminDashboard />;
}
