
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';

export function CtaSection() {
  const { user } = useAppContext();

  if (user) {
    return null;
  }

  return (
    <section>
        <Card className="bg-accent/30 text-center py-12 border-accent border-2">
            <CardHeader>
                <CardTitle className="text-3xl font-headline font-bold">¡Únete a la familia Aroma!</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto pt-2">
                    Guarda tus Favoritos y Recibe Recomendaciones Personalizadas. ¡Regístrate en Aroma!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/register">Crear mi Cuenta Aroma</Link>
                </Button>
            </CardContent>
        </Card>
    </section>
  );
}
