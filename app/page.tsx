'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

const galleryPhotos = [
  {
    src: '/assets/foto/album/AES_0577.JPG.jpeg',
    alt: 'Atmosphere 01',
    caption: 'ARCH // 01',
  },
  {
    src: '/assets/foto/album/AES_0599.JPG.jpeg',
    alt: 'Atmosphere 03',
    caption: 'DEV // 03',
  },
  {
    src: '/assets/foto/album/AES_0578.JPG.jpeg',
    alt: 'Atmosphere 02',
    caption: 'SYSTEMS // 02',
  },
  {
    src: '/assets/foto/album/AES_0602.JPG.jpeg',
    alt: 'Atmosphere 04',
    caption: 'AI & CORE // 04',
  },
];

const projects = [
  {
    title: 'La Clase Digital',
    category: 'EdTech & E-learning',
    description:
      'Plataforma educativa integral y gestión de cursos online con arquitectura backend modular y alta escalabilidad.',
    href: 'https://laclasedigital.com.ar',
  },
  {
    title: 'Bienestar Docente',
    category: 'Plataforma & Comunidad',
    description:
      'Portal institucional y ecosistema comunitario orientado a educadores, con foco en accesibilidad, seguridad y UX.',
    href: 'https://bienestardocente.com.ar',
  },
  {
    title: 'Pizarras Digitales',
    category: 'Hardware & Catálogo',
    description:
      'Catálogo comercial y soluciones tecnológicas interactivas para instituciones y empresas, optimizado para conversión.',
    href: 'https://pizarrasdigitales.com.ar',
  },
  {
    title: 'FormosaHack 2025',
    category: '3er Puesto Ultrahackathon 24h',
    description:
      'Desarrollo intensivo durante 24 horas continuas de programación de software. Galardonado en el podio general de la competencia.',
    href: 'https://github.com/marcoslopezsoft',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Sincronizar Lenis con la barra de progreso superior
  useLenis((lenis) => {
    ScrollTrigger.update();
    if (indicatorRef.current) {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = lenis.scroll;
      const progress =
        scrollHeight > 0
          ? Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100)
          : 0;
      indicatorRef.current.style.width = `${progress}%`;
    }
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animación Hero
      gsap.to('.hero-image', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
      });

      gsap.to('.about-text', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
      });

      // Animación Galería (clip-path reveal)
      const items = gsap.utils.toArray<HTMLElement>('.gallery-item img');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item.parentElement ?? item,
              start: 'top bottom-=100',
              end: 'bottom top+=100',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Animación Footer CTA
      gsap.to('.footer-cta', {
        scrollTrigger: {
          trigger: '#footer',
          start: 'top bottom-=150',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen text-[#3a3a38] overflow-x-hidden"
    >
      {/* Header Sticky Full-Width */}
      <header className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 xl:px-20 backdrop-blur-[2px]">
        <div className="w-full flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold tracking-tighter">
            MARCOSLOPEZSOFT
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:marcoslopez.soft@gmail.com"
              className="bg-[#3a3a38] text-white px-4 py-1.5 text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 hover:text-[#ffd700] transition-colors"
            >
              +INIT_HANDSHAKE
            </a>
            {/* Scroll Indicator */}
            <div className="w-28 sm:w-56 h-[2px] bg-neutral-300">
              <div
                ref={indicatorRef}
                className="h-full w-0 bg-[#ffd700] transition-all duration-75"
              />
            </div>
          </div>

          <nav className="hidden sm:flex gap-8 text-sm lowercase font-medium">
            <a href="#hero" className="hover:opacity-60 transition-opacity">
              home
            </a>
            <a href="#gallery" className="hover:opacity-60 transition-opacity">
              gallery
            </a>
            <a href="#projects" className="hover:opacity-60 transition-opacity">
              projects
            </a>
            <a href="#footer" className="hover:opacity-60 transition-opacity">
              contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - 100% Width & 100vh */}
      <section
        id="hero"
        className="w-full min-h-screen pt-32 pb-16 px-6 md:px-12 xl:px-20 flex flex-col justify-between"
      >
        {/* Monumental Hero Wordmark - SOFTWARE */}
        <div className="w-full my-auto py-6 select-none pointer-events-none">
          <svg
            className="w-full h-auto block select-none"
            viewBox="0 0 1000 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="135"
              textAnchor="middle"
              fill="#3a3a38"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              letterSpacing="-0.04em"
              fontSize="165"
              className="uppercase tracking-tighter"
            >
              SOFTWARE
            </text>
          </svg>
        </div>

        {/* Content row - Ancho completo de borde a borde */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <div className="hero-image group w-full relative overflow-hidden rounded-sm filter blur-sm scale-95 opacity-80">
              <img
                src="/assets/foto/mi-foto.jpeg"
                alt="Marcos Adrian Lopez — Full Stack Developer"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto max-h-[55vh] lg:max-h-[60vh] grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out object-cover object-top cursor-pointer"
              />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-2" />
          <div className="md:col-span-6 lg:col-span-5 md:text-right">
            <p className="about-text text-lg sm:text-xl md:text-2xl font-light leading-relaxed opacity-0 translate-y-8 filter blur-[4px]">
              Soy Marcos Adrian Lopez, Full Stack Developer y Técnico Superior
              en Desarrollo de Software Multiplataforma. Especializado en
              arquitecturas backend escalables, integración de IA (Gemini,
              Ollama, LangChain), automatización con n8n y desarrollo web de
              alto rendimiento orientado a conversión y solidez técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section - Full Width fluid layout con expansión al hover */}
      <section
        id="gallery"
        className="w-full min-h-screen py-28 px-6 md:px-12 xl:px-20 flex flex-col justify-center border-t border-neutral-300/40"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            {'// 01. Visual Atmosphere & Editorial Frame'}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            [ HOVER TO EXPAND ]
          </span>
        </div>

        {/* Galería interactiva con expansión suave en hover */}
        <div className="w-full flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              className="gallery-item group flex-1 hover:flex-[1.8] h-64 sm:h-80 md:h-[460px] overflow-hidden relative transition-all duration-700 ease-out cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-black/75 text-white px-2.5 py-1">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full text-center">
          <p className="text-base font-mono text-neutral-600 leading-relaxed max-w-4xl mx-auto">
            [ 01 // Next.js & Fastify & Python — Arquitecturas modulares,
            automatización con n8n, integración de IA (Gemini, LangChain,
            Ollama), Docker y despliegues orientados a rendimiento y
            escalabilidad. ]
          </p>
        </div>
      </section>

      {/* Projects Section - Debajo de la galería con diseño editorial */}
      <section
        id="projects"
        className="w-full py-28 px-6 md:px-12 xl:px-20 border-t border-neutral-300/40"
      >
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
              {'// 02. Selected Works & Systems'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              PROYECTOS DESTACADOS
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            [ 2024 — 2026 ]
          </span>
        </div>

        <div className="w-full divide-y divide-neutral-300/60 border-y border-neutral-300/60">
          {projects.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:px-4 hover:bg-neutral-200/30 cursor-pointer"
            >
              <div className="flex items-start sm:items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-neutral-400 group-hover:text-[#ffd700] transition-colors pt-1 sm:pt-0">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#3a3a38] group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                    {item.title}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-base font-mono text-[#ffd700]">
                      ↗
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-light max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-start md:self-auto pl-8 sm:pl-10 md:pl-0">
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-neutral-200/80 group-hover:bg-[#3a3a38] group-hover:text-white transition-colors">
                  {item.category}
                </span>
                <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  VISITAR ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer Section - Full Width */}
      <section
        id="footer"
        className="w-full min-h-[50vh] py-24 px-6 md:px-12 xl:px-20 flex flex-col justify-between items-center text-center border-t border-neutral-300/40"
      >
        <div className="footer-cta flex flex-col items-center gap-4 opacity-0 translate-y-6 filter blur-[4px]">
          <a
            href="mailto:marcoslopez.soft@gmail.com"
            className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#ffd700] hover:underline"
          >
            [ PROTOCOL // 200 OK — INITIALIZE HANDSHAKE ↗ ]
          </a>
          <a
            href="mailto:marcoslopez.soft@gmail.com"
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#3a3a38] hover:opacity-75 transition-opacity"
          >
            marcoslopez.soft@gmail.com
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-mono uppercase tracking-wider">
            <a
              href="https://www.linkedin.com/in/marcoslopezsoft"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffd700] transition-colors"
            >
              LinkedIn ↗
            </a>
            <span className="opacity-30">•</span>
            <a
              href="https://github.com/marcoslopezsoft"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffd700] transition-colors"
            >
              GitHub ↗
            </a>
            <span className="opacity-30">•</span>
            <a
              href="https://wa.me/543705119756"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffd700] transition-colors"
            >
              WhatsApp (+54 370 511-9756) ↗
            </a>
          </div>
        </div>

        <div className="w-full opacity-40 pt-20">
          <span className="text-xs font-mono uppercase tracking-widest block">
            © 2026 Marcos Adrian Lopez — MARCOSLOPEZSOFT
          </span>
        </div>
      </section>
    </div>
  );
}
