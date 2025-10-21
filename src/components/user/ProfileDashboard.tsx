"use client";

import { useAppContext } from "@/contexts/AppContext";
import { OrderHistory } from "./OrderHistory";
import { RecommendedProducts } from "../ai/RecommendedProducts";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";
import { PointsHistory } from "./PointsHistory";
import { EditProfileForm } from "./EditProfileForm";
import { DeleteAccount } from "./DeleteAccount";

export function ProfileDashboard() {
  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold">Mi Rincón Aroma</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad y recomendaciones para ti.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <RecommendedProducts />
            <Separator />
            <OrderHistory />
            <Separator />
            <PointsHistory />
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline text-2xl">Tus Puntos de Lealtad</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex items-center justify-center text-center gap-4">
                    <Star className="h-12 w-12 text-yellow-400" />
                    <div>
                        <p className="text-4xl font-bold">{user.points}</p>
                        <p className="text-muted-foreground">Puntos Disponibles</p>
                    </div>
                </div>
                </CardContent>
            </Card>
            <EditProfileForm />
            <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
