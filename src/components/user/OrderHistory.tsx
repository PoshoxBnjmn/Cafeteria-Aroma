"use client";

import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function OrderHistory() {
  const { orders } = useAppContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Historial de Pedidos</CardTitle>
        <CardDescription>Aquí puedes ver todos tus pedidos anteriores.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order, index) => (
              <AccordionItem value={`item-${index}`} key={order.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span>Pedido del {new Date(order.date).toLocaleDateString('es-ES')}</span>
                    <span className="font-bold">${order.total.toLocaleString('es-CL')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toLocaleString('es-CL')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center py-8">No has realizado ningún pedido todavía.</p>
        )}
      </CardContent>
    </Card>
  );
}
