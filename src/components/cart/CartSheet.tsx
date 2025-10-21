"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { CartItem } from "./CartItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart, createOrder, user } = useAppContext();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      createOrder();
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Tu Bandeja Virtual de Aroma</SheetTitle>
          <SheetDescription>
            Revisa tus productos y finaliza tu compra.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-grow my-4">
              <div className="flex flex-col gap-4 pr-6">
                {cart.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full font-bold" size="lg" disabled={!user}>
                  {user ? "Finalizar Compra" : "Inicia sesión para comprar"}
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Tu bandeja está vacía.</p>
            <p className="text-sm text-muted-foreground">Añade productos para verlos aquí.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
