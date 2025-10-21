
"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from './ImageUploader';

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  profilePicture: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres." }).optional().or(z.literal('')),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Debes introducir tu contraseña actual para cambiarla.",
    path: ["currentPassword"],
});


export function EditProfileForm() {
  const { user, updateUser, updatePassword } = useAppContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: {name?: string, profilePicture?: string} = {};
    if (values.name && values.name !== user?.name) {
        payload.name = values.name;
    }
    if (values.profilePicture !== user?.profilePicture) {
        payload.profilePicture = values.profilePicture;
    }

    if (Object.keys(payload).length > 0) {
        updateUser(payload);
    }
    
    if (values.newPassword && values.currentPassword) {
        try {
            updatePassword(values.currentPassword, values.newPassword);
            toast({
                title: "Contraseña actualizada",
                description: "Tu contraseña ha sido actualizada con éxito."
            });
        } catch (error: any) {
            form.setError("currentPassword", { type: "manual", message: error.message });
            return;
        }
    }

    form.reset({
        ...values,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
  }

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Editar Perfil</CardTitle>
        <CardDescription>Actualiza tu información personal.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
             <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
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
                  <FormLabel>Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Tu contraseña actual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Deja en blanco para no cambiar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña Nueva</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>Guardar Cambios</Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
