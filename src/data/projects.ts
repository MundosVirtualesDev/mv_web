export type Project = {
  slug: string;
  title: string;
  area: "automatizacion" | "efectivo";
  summary: string;
  tags: string[];
  year?: string;
  cover?: string;
  bullets?: string[];
};

export const projects: Project[] = [
  {
    slug: "celda-paletizado-robotico",
    title: "Celda de paletizado robótico",
    area: "automatizacion",
    summary: "Integración de robot industrial y periféricos para paletizado seguro y continuo.",
    tags: ["Robótica", "Paletizado", "Integración"],
    year: "2025",
    cover: "/img/projects/paletizado.jpg",
    bullets: [
      "Diseño e integración de celda robótica",
      "Programación PLC/HMI y robot",
      "Puesta en marcha y soporte postventa",
    ],
  },
  {
    slug: "vision-artificial-control-calidad",
    title: "Visión artificial para control de calidad",
    area: "automatizacion",
    summary: "Sistema de visión computacional para inspección y trazabilidad en línea.",
    tags: ["Visión", "IA", "Trazabilidad"],
    year: "2025",
    cover: "/img/projects/vision.jpg",
    bullets: [
      "Cámaras industriales + iluminación",
      "Algoritmos de detección y clasificación",
      "Integración con PLC y base de datos",
    ],
  },
  {
    slug: "implementacion-back-office",
    title: "Implementación Back Office (tesorería)",
    area: "efectivo",
    summary: "Integración de equipos de conteo/clasificación con soporte y mantenimiento preventivo.",
    tags: ["Back Office", "Tesorería", "SLA"],
    year: "2024",
    cover: "/img/projects/backoffice.jpg",
    bullets: [
      "Estandarización de procesos de apertura/cierre",
      "Capacitación y continuidad operativa",
      "Mantenimiento preventivo programado",
    ],
  },
  {
    slug: "autoservicio-front-office",
    title: "Front Office: autoservicio en sucursal",
    area: "efectivo",
    summary: "Kioscos/recicladores para reducir tiempos de atención y mejorar experiencia.",
    tags: ["Front Office", "Autoservicio", "Optimización"],
    year: "2024",
    cover: "/img/projects/frontoffice.jpg",
    bullets: [
      "Diseño del flujo de atención",
      "Integración y soporte",
      "Monitoreo operacional",
    ],
  },
];
