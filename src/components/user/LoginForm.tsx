"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  identifier: z.string().min(1, { message: "Por favor, introduce tu nombre de usuario o correo." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
});

export function LoginForm() {
  const { login } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        login(values.identifier, values.password);
        router.push('/profile');
    } catch (error: any) {
        // Error toast is handled in the context.
        form.setError("identifier", { type: "manual", message: error.message });
        form.setError("password", { type: "manual", message: " " });
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Bienvenido de Vuelta a Aroma</CardTitle>
        <CardDescription>Introduce tus datos para entrar.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo o Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@correo.com o tu_usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                   <div className="text-right">
                      <Link href="/forgot-password" passHref>
                        <Button variant="link" className="text-xs px-0 h-auto" type="button">¿Olvidaste tu contraseña?</Button>
                      </Link>
                   </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>Entrar</Button>
            <div className="mt-4 text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
