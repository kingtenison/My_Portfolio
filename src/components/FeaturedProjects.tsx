"use client";

import { useRef, useState, useEffect } from "react";

const featuredProjects = [
  {
    title: "Hospital Management System",
    description: "Full-spectrum hospital management system — patient records, appointment scheduling, staff coordination, and real-time reporting.",
    tech: ["React", "Node.js", "MongoDB", "REST API"],
    url: "https://frontend-vert-one-84.vercel.app/",
    type: "Clinic Management System",
  },
  {
    title: "Escrow Marketplace Platform",
    description: "Multi-step escrow platform with secure fund holds, milestone-based release logic, and dispute resolution for buyer-seller transactions.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    url: "https://escrow-tan.vercel.app/",
    type: "Escrow & Transaction Platform",
  },
  {
    title: "Link Shortener & Analytics Platform",
    description: "Smart URL shortener with custom aliases, real-time click analytics, built-in QR code generator, and configurable link expiration.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    url: "https://link-platform-two.vercel.app/dashboard",
    type: "URL Link Shortener",
  },
  {
    title: "Restaurant Ordering Platform",
    description: "End-to-end restaurant ordering ecosystem — online ordering, table reservations, menu management, staff portal, and integrated payments.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    url: "https://fable-os.vercel.app/",
    type: "Restaurant Management System",
  },
  {
    title: "AWG Corporate Website",
    description: "Corporate brand platform for atmospheric water generators — product showcase, lead capture, and B2B inquiry management.",
    tech: ["React", "Node.js", "Email API", "Lead Gen"],
    url: "https://awg-virid.vercel.app/",
    type: "B2B Corporate Website",
  },
  {
    title: "Data Analysis & Visualization Tool",
    description: "Interactive data analysis workspace supporting CSV/JSON import, multi-chart visualizations, and real-time data filtering.",
    tech: ["React", "Node.js", "D3.js / Recharts"],
    url: "https://prophet-delta.vercel.app/",
    type: "Data Analysis Tool",
  },
];

function ProjectPreview({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setScale(Math.min(w / 1280, 1));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative border border-[#E5E7EB] bg-[#F5F5F0] flex flex-col transition-colors duration-100 hover:border-[#FEE2E2] group"
      style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
    >
      {/* Preview / iframe area */}
      <div ref={wrapperRef} className="relative w-full overflow-hidden bg-[#000000]" style={{ height: Math.round(720 * scale) }}>
        <div className="absolute top-0 left-0 origin-top-left" style={{ width: 1280, height: 720, transform: `scale(${scale})` }}>
          <iframe
            src={project.url}
            style={{ width: 1280, height: 720, border: 0 }}
            sandbox="allow-scripts allow-same-origin allow-forms"
            title={project.title}
          />
        </div>
      </div>

      {/* Info bar */}
      <div className="p-3 lg:p-6 flex flex-col gap-2 lg:gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] lg:text-sm font-mono tracking-[0.15em] text-[#DC2626] uppercase font-semibold">{project.type}</span>
          <span className="text-[#6B7280] font-mono text-xs lg:text-base tracking-wider">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p className="text-[10px] lg:text-sm font-mono text-[#6B7280] leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] lg:text-sm font-mono px-1.5 py-0.5 lg:px-3 lg:py-1.5 border border-[#E5E7EB] text-[#6B7280]"
              style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 lg:gap-3 text-xs lg:text-base font-mono tracking-[0.15em] uppercase text-[#6B7280] hover:text-[#DC2626] transition-colors duration-100 mt-auto"
        >
          <span className="text-[#DC2626] text-sm lg:text-xl font-bold">[</span>
          Visit
          <span className="text-[#DC2626] text-sm lg:text-xl font-bold">]</span>
        </a>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#000000] py-20 lg:py-32 px-6 lg:px-10">
      {/* Background HUD lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#DC2626] opacity-[0.04] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#DC2626] opacity-[0.04] pointer-events-none" />

      {/* Section header */}
      <div className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">[</span>
          <span className="text-base font-mono tracking-[0.25em] text-[#9CA3AF] uppercase">Deployments</span>
          <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">]</span>
          <span className="h-px flex-1 bg-[#333333]" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FFFFFF] tracking-tight uppercase">
          Featured Work
        </h2>
        <p className="mt-4 text-lg font-mono text-[#9CA3AF] max-w-lg">
          Live production systems and applications I&apos;ve designed and built.
        </p>
      </div>

      {/* 3x2 iframe grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, i) => (
          <ProjectPreview key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* View all link */}
      <div className="relative z-10 flex justify-center mt-16">
        <a
          href="/projects"
          className="inline-flex items-center gap-4 text-lg font-mono tracking-[0.2em] uppercase text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 font-semibold"
        >
          <span className="text-[#DC2626] text-2xl font-bold">[</span>
          View All Projects
          <span className="text-[#DC2626] text-2xl font-bold">]</span>
        </a>
      </div>
    </section>
  );
}
