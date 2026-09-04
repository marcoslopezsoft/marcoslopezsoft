import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Marcos Lopez | Software Developer',
  description: 'Portfolio de desarrollo de software y arquitectura',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-neutral-950 text-neutral-100 antialiased selection:bg-neutral-800">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
