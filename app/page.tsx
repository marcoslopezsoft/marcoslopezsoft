'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { useLanguage } from './hooks/useLanguage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { lang, handleLanguageChange, t } = useLanguage();

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

      // Inversión cromática hacia modo oscuro al llegar a Featured Projects
      gsap.to(containerRef.current, {
        backgroundColor: '#070707',
        color: '#f5f5f5',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%',
          end: 'top 20%',
          scrub: true,
        },
      });

      // Adaptación de fondo y borde del Header fijo al entrar a proyectos
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(7, 7, 7, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        });
      }

      // Marquee Kinético 1: Desplazamiento horizontal vinculado al scroll
      gsap.to('.marquee-track-1', {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Marquee Kinético 2: Contra-flujo inferior dinámico
      gsap.to('.marquee-track-2', {
        xPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Parallax de números gigantes en background de las tarjetas
      const parallaxNums = gsap.utils.toArray<HTMLElement>('.project-parallax-num');
      parallaxNums.forEach((num) => {
        gsap.fromTo(
          num,
          { y: 35 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: num.parentElement ?? num,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      });

      // Entrada suave y reactiva de cada tarjeta con el scroll
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 45,
            opacity: 0.35,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.5,
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
      className="relative w-full min-h-screen text-[#3a3a38] overflow-x-hidden bg-[#f5f5f5] transition-[background-color,color] duration-150"
    >
      <Header
        headerRef={headerRef}
        indicatorRef={indicatorRef}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
      <HeroSection t={t} />
      <GallerySection t={t} />
      <ProjectsSection t={t} />
      <ContactSection />
      <FooterSection t={t} />
    </div>
  );
}
