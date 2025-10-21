import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MOCK_TESTIMONIALS } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Testimonials() {
  return (
    <section className="bg-secondary/50 rounded-lg py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map(testimonial => (
            <Card key={testimonial.id} className="border-2 border-primary/20 shadow-lg bg-background">
              <CardHeader className="items-center text-center">
                  <Avatar className="w-20 h-20 mb-4 border-4 border-secondary">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg font-headline">{testimonial.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic text-center">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
