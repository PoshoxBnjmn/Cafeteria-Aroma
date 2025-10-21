
"use client";

import { useState, useRef, ChangeEvent, DragEvent, useCallback } from 'react';
import Image from 'next/image';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { UploadCloud, X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Helper function to create a cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL('image/jpeg');
}

const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = (rotation * Math.PI) / 180;
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
};


export function ImageUploader({ value, onChange, className }: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(value);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Archivo no válido",
          description: "Por favor, selecciona un archivo de imagen.",
        });
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        setImageToCrop(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
                handleFileSelect(file);
                toast({
                    title: "Imagen pegada",
                    description: "Tu imagen se ha subido desde el portapapeles.",
                });
            }
            event.preventDefault();
            break;
        }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onChange('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    try {
        const croppedImage = await getCroppedImg(
            imageToCrop,
            croppedAreaPixels,
            rotation
        );
        setImagePreview(croppedImage);
        onChange(croppedImage);
        setImageToCrop(null);
        setZoom(1);
        setRotation(0);
    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "Error al recortar",
            description: "No se pudo recortar la imagen. Inténtalo de nuevo."
        });
    }
  };

  return (
    <div className={cn("space-y-2", className)} onPaste={handlePaste}>
        {imagePreview ? (
            <div className="relative group w-32 h-32 mx-auto">
                <Image
                    src={imagePreview}
                    alt="Vista previa de perfil"
                    width={128}
                    height={128}
                    className="rounded-full object-cover w-32 h-32 border-4 border-secondary"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={removeImage}
                >
                    <X className="h-4 w-4" />
                </Button>
                 <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Cambiar
                </Button>
            </div>
        ) : (
            <Card
                className={cn(
                'border-2 border-dashed hover:border-primary transition-colors',
                isDragging && 'border-primary bg-accent/50'
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CardContent className="p-4 text-center">
                    <div
                        className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Arrastra y suelta o <span className="font-semibold text-primary">haz clic</span> para subir.
                        </p>
                         <p className="text-xs text-muted-foreground">
                            También puedes pegar desde el portapapeles.
                        </p>
                    </div>
                </CardContent>
            </Card>
        )}
        <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
        />

        <Dialog open={!!imageToCrop} onOpenChange={(open) => !open && setImageToCrop(null)}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Recorta tu Imagen</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-80 bg-muted rounded-md">
                    {imageToCrop && (
                        <Cropper
                            image={imageToCrop}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            cropShape="round"
                            showGrid={false}
                        />
                    )}
                </div>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                        <ZoomOut className="h-5 w-5" />
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                        />
                        <ZoomIn className="h-5 w-5" />
                    </div>
                     <div className="flex items-center gap-2">
                        <RotateCw className="h-5 w-5" />
                        <Slider
                            value={[rotation]}
                            min={0}
                            max={360}
                            step={1}
                            onValueChange={(value) => setRotation(value[0])}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setImageToCrop(null)}>Cancelar</Button>
                    <Button onClick={handleCrop}>Guardar Imagen</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
