import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Cafetería Aroma Virtual. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Términos de Servicio</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
