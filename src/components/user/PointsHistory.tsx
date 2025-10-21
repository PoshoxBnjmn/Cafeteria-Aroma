"use client";

import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";

export function PointsHistory() {
  const { pointsHistory } = useAppContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Historial de Puntos</CardTitle>
        <CardDescription>Tus últimos movimientos de puntos.</CardDescription>
      </CardHeader>
      <CardContent>
        {pointsHistory.length > 0 ? (
          <ScrollArea className="h-64">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointsHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className={`text-right font-bold ${entry.amount > 0 ? 'text-green-600' : 'text-destructive'}`}>
                        {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-center py-8">Aún no tienes movimientos de puntos.</p>
        )}
      </CardContent>
    </Card>
  );
}
