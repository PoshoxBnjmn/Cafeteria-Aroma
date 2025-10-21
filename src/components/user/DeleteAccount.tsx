
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const { deleteAccount, logout } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      deleteAccount(values.password);
      form.reset();
      setOpen(false);
      logout();
      router.push("/");
    } catch (error: any) {
      // Toast is handled in context, but we can reset the form field if needed
      form.setError("password", { type: "manual", message: "La contraseña es incorrecta." });
    }
  };

  return (
    <Card className="border-destructive">
        <CardHeader>
            <CardTitle className="text-destructive text-2xl font-headline">Zona de Peligro</CardTitle>
            <CardDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y tus datos.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Borrar mi cuenta</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y se borrarán tus datos de nuestros servidores.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...form}>
                    <form id="delete-account-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Para confirmar, escribe tu contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Tu contraseña" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                    </Form>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => form.reset()}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction type="submit" form="delete-account-form" disabled={form.formState.isSubmitting}>
                        Borrar mi cuenta permanentemente
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardContent>
    </Card>
  );
}
