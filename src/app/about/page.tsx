import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-center font-bold">Acerca de "Aroma"</h1>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-headline mb-4">De un Rincón Acogedor a tu Hogar</h2>
              <p className="text-muted-foreground mb-4">
                "Cafetería Aroma" nació como un pequeño local en el corazón de la ciudad, un lugar donde el tiempo parecía detenerse entre el murmullo de las conversaciones y el rico perfume del café recién hecho. Nuestra pasión siempre ha sido la misma: ofrecer productos de alta calidad, elaborados con amor y los mejores ingredientes.
              </p>
              <p className="text-muted-foreground">
                Con el tiempo, nos dimos cuenta de que podíamos llevar esa misma experiencia más allá de nuestras cuatro paredes. Decidimos evolucionar y convertirnos en una cafetería 100% virtual. Esta transición nos permite centrarnos exclusivamente en la calidad de nuestros productos y en un servicio de entrega eficiente, llevando el sabor clásico de "Aroma" directamente a donde te encuentres.
              </p>
            </div>
            {heroImage && (
              <div className="relative min-h-[300px] md:min-h-0">
                <Image 
                  src={heroImage.imageUrl} 
                  alt="Interior de la cafetería" 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={heroImage.imageHint}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Nuestra Misión</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nuestra misión es simple: hacer que cada día sea un poco mejor con una taza de café perfecto, un dulce recién horneado o un bocado salado que reconforte el alma. Aunque ya no tengamos un espacio físico, nuestro compromiso con la calidad, la frescura y la satisfacción de nuestros clientes es más fuerte que nunca.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
