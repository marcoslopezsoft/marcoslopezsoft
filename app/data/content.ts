export type Lang = 'es' | 'en';
export const SUPPORTED_LANGUAGES: Lang[] = ['es', 'en'];

export const CONTACT_INFO = {
  email: 'marcoslopez.soft@gmail.com',
  phone: '+54 370 511-9756',
  whatsappUrl: 'https://wa.me/543705119756',
  linkedinUrl: 'https://www.linkedin.com/in/marcoslopezsoft',
  githubUrl: 'https://github.com/marcoslopezsoft',
  location: 'Formosa, Argentina',
};

export interface SocialLink {
  name: string;
  href: string;
  label?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: CONTACT_INFO.linkedinUrl,
    label: 'LinkedIn ↗',
  },
  {
    name: 'GitHub',
    href: CONTACT_INFO.githubUrl,
    label: 'GitHub ↗',
  },
  {
    name: 'WhatsApp',
    href: CONTACT_INFO.whatsappUrl,
    label: `WhatsApp ↗`,
  },
];

export const NAV_ITEMS = [
  { key: 'home', href: '#hero' },
  { key: 'gallery', href: '#gallery' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#footer' },
] as const;

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

export const galleryPhotos: GalleryPhoto[] = [
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

export interface ProjectItem {
  title: string;
  category: string;
  status: string;
  description: string;
  tags: string[];
  href: string;
}

export interface ContentData {
  nav: {
    home: string;
    gallery: string;
    projects: string;
    contact: string;
  };
  cta: string;
  hero: {
    about: string;
  };
  gallery: {
    tag: string;
    hover: string;
    quote: string;
  };
  projects: {
    tag: string;
    title: string;
    period: string;
    visit: string;
    marqueePrimary: string;
    marqueeSecondary: string;
    items: ProjectItem[];
  };
  footer: {
    protocol: string;
    rights: string;
  };
}

export const CONTENT: Record<Lang, ContentData> = {
  es: {
    nav: {
      home: 'inicio',
      gallery: 'galería',
      projects: 'proyectos',
      contact: 'contacto',
    },
    cta: '+INIT_HANDSHAKE',
    hero: {
      about:
        'Soy Marcos Adrian Lopez, Full Stack Developer y Técnico Superior en Desarrollo de Software Multiplataforma. Especializado en arquitecturas backend escalables, integración de IA (Gemini, Ollama, LangChain), automatización con n8n y desarrollo web de alto rendimiento orientado a conversión y solidez técnica.',
    },
    gallery: {
      tag: '// 01. Atmósfera Visual & Encuadre Editorial',
      hover: '[ PASA EL CURSOR PARA EXPANDIR ]',
      quote:
        '[ 01 // Next.js & Fastify & Python — Arquitecturas modulares, automatización con n8n, integración de IA (Gemini, LangChain, Ollama), Docker y despliegues orientados a rendimiento y escalabilidad. ]',
    },
    projects: {
      tag: '// 02. Sistemas & Producción en Vivo',
      title: 'PROYECTOS DESTACADOS',
      period: '[ 2024 — 2026 ]',
      visit: 'EXPLORAR SISTEMA',
      marqueePrimary:
        '✦ ARQUITECTURA MODULAR ✦ BACKEND ESCALABLE ✦ AGENTES IA ✦ AUTOMATIZACIÓN N8N ✦ FASTIFY & NEXT.JS ✦ DESPLIEGUE CONTINUO ✦ ',
      marqueeSecondary:
        '// HIGH PERFORMANCE ARCHITECTURE // PRODUCTION READY // LATENCY OPTIMIZED // 2026 // ',
      items: [
        {
          title: 'La Clase Digital',
          category: 'EdTech & E-learning',
          status: 'PRODUCCIÓN',
          description:
            'Plataforma educativa integral y gestión de cursos online con arquitectura backend modular, pasarelas de pago y alta escalabilidad.',
          tags: ['Next.js', 'Fastify', 'PostgreSQL', 'Docker', 'REST API'],
          href: 'https://laclasedigital.com.ar',
        },
        {
          title: 'Bienestar Docente',
          category: 'Plataforma Institucional',
          status: 'ACTIVO',
          description:
            'Portal institucional y ecosistema comunitario orientado a educadores, con foco en accesibilidad, seguridad de datos y UX.',
          tags: ['React', 'Full Stack', 'Tailwind CSS', 'Auth & Security'],
          href: 'https://bienestardocente.com.ar',
        },
        {
          title: 'Pizarras Digitales',
          category: 'Hardware & Catálogo',
          status: 'ACTIVO',
          description:
            'Catálogo comercial y soluciones tecnológicas interactivas para instituciones y empresas, optimizado para conversión y velocidad.',
          tags: ['E-Commerce', 'Hardware Interactivo', 'SEO', 'Performance'],
          href: 'https://pizarrasdigitales.com.ar',
        },
        {
          title: 'FormosaHack 2025',
          category: '3er Puesto Ultrahackathon 24h',
          status: 'PREMIADO',
          description:
            'Desarrollo intensivo durante 24 horas continuas de programación de software. Galardonado en el podio general de la competencia.',
          tags: ['Ultrahackathon 24h', 'Python', 'FastAPI', 'Podio General'],
          href: 'https://www.formosa.gob.ar/noticia/33628/871/formosahack_2025_consagro_a_los_proyectos_mas_innovadores_de_su_segunda_edicion',
        },
      ],
    },
    footer: {
      protocol: '[ PROTOCOLO // 200 OK — INICIALIZAR HANDSHAKE ↗ ]',
      rights: '© 2026 Marcos Adrian Lopez — MARCOSLOPEZSOFT',
    },
  },
  en: {
    nav: {
      home: 'home',
      gallery: 'gallery',
      projects: 'projects',
      contact: 'contact',
    },
    cta: '+INIT_HANDSHAKE',
    hero: {
      about:
        'I am Marcos Adrian Lopez, Full Stack Developer and Higher Technician in Multiplatform Software Development. Specialized in scalable backend architectures, AI integration (Gemini, Ollama, LangChain), workflow automation with n8n, and high-performance web engineering focused on conversion and technical robustness.',
    },
    gallery: {
      tag: '// 01. Visual Atmosphere & Editorial Frame',
      hover: '[ HOVER TO EXPAND ]',
      quote:
        '[ 01 // Next.js & Fastify & Python — Modular architectures, n8n automation, AI integration (Gemini, LangChain, Ollama), Docker, and deployments engineered for performance and scalability. ]',
    },
    projects: {
      tag: '// 02. Systems & Live Production',
      title: 'FEATURED PROJECTS',
      period: '[ 2024 — 2026 ]',
      visit: 'EXPLORE SYSTEM',
      marqueePrimary:
        '✦ MODULAR ARCHITECTURE ✦ SCALABLE BACKEND ✦ AI AGENTS ✦ N8N AUTOMATION ✦ FASTIFY & NEXT.JS ✦ CONTINUOUS DELIVERY ✦ ',
      marqueeSecondary:
        '// HIGH PERFORMANCE ARCHITECTURE // PRODUCTION READY // LATENCY OPTIMIZED // 2026 // ',
      items: [
        {
          title: 'La Clase Digital',
          category: 'EdTech & E-learning',
          status: 'PRODUCTION',
          description:
            'Comprehensive educational platform and online course management with modular backend architecture, payment gateways, and high scalability.',
          tags: ['Next.js', 'Fastify', 'PostgreSQL', 'Docker', 'REST API'],
          href: 'https://laclasedigital.com.ar',
        },
        {
          title: 'Bienestar Docente',
          category: 'Institutional Platform',
          status: 'LIVE',
          description:
            'Institutional portal and community ecosystem designed for educators, with emphasis on accessibility, data security, and UX.',
          tags: ['React', 'Full Stack', 'Tailwind CSS', 'Auth & Security'],
          href: 'https://bienestardocente.com.ar',
        },
        {
          title: 'Pizarras Digitales',
          category: 'Hardware & Catalog',
          status: 'LIVE',
          description:
            'Commercial catalog and interactive hardware solutions for institutions and businesses, optimized for conversion and load speed.',
          tags: ['E-Commerce', 'Interactive Tech', 'SEO', 'Performance'],
          href: 'https://pizarrasdigitales.com.ar',
        },
        {
          title: 'FormosaHack 2025',
          category: '3rd Place Ultrahackathon 24h',
          status: 'AWARDED',
          description:
            'Intensive development over 24 continuous hours of software engineering. Awarded a top-3 podium finish in the overall competition.',
          tags: ['Ultrahackathon 24h', 'Python', 'FastAPI', 'Podium Finish'],
          href: 'https://www.formosa.gob.ar/noticia/33628/871/formosahack_2025_consagro_a_los_proyectos_mas_innovadores_de_su_segunda_edicion',
        },
      ],
    },
    footer: {
      protocol: '[ PROTOCOL // 200 OK — INITIALIZE HANDSHAKE ↗ ]',
      rights: '© 2026 Marcos Adrian Lopez — MARCOSLOPEZSOFT',
    },
  },
};
