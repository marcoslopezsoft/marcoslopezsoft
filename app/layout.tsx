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
      <body className="bg-[#f5f5f5] text-[#3a3a38] antialiased selection:bg-neutral-800 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
