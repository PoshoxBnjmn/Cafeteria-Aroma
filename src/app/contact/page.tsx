import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const faqs = [
    {
        question: "¿Cómo hago un pedido?",
        answer: "Simplemente navega por nuestro menú, añade los productos que desees a tu bandeja y procede a finalizar la compra. ¡Es así de fácil!"
    },
    {
        question: "¿Cuál es el área de entrega?",
        answer: "Actualmente, realizamos entregas en toda el área metropolitana. Estamos trabajando para expandir nuestro servicio."
    },
    {
        question: "¿Puedo personalizar mi pedido?",
        answer: "Por el momento, no ofrecemos personalizaciones a través de la web, pero estamos trabajando en ello. ¡Mantente atento a las actualizaciones!"
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos todas las principales tarjetas de crédito y débito. El pago se procesa de forma segura a través de nuestra plataforma."
    }
]

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-headline text-center font-bold mb-8">Contacto y Preguntas Frecuentes</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible>
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl">Ponte en Contacto</CardTitle>
                    <CardDescription>¿Tienes alguna otra pregunta? ¡Contáctanos!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:contacto@aromacafeteria.com" className="text-muted-foreground hover:text-primary">contacto@aromacafeteria.com</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">+1 (234) 567-890</span>
                    </div>
                     <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <span className="text-muted-foreground">Somos una cafetería 100% virtual, ¡te llevamos el café a donde estés!</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
