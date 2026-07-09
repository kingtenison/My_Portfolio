"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Hospital Management System",
    description: "A complete HMS covering patient records, appointment booking, staff management, invoicing, and reporting dashboards with role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "REST API"],
    problem: "A dental clinic was running entirely on paper — appointments, patient records, billing, and staff scheduling were manual and error-prone.",
    outcome: "Reduced administrative overhead significantly by replacing manual processes with automated workflows.",
    link: "https://frontend-nu-lovat-79.vercel.app/",
  },
  {
    title: "Escrow Marketplace Platform",
    description: "A production escrow platform enabling secure buyer–seller transactions with multi-step fund hold and automated release logic.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    problem: "Need for secure online transactions with trust between parties.",
    outcome: "Funds only move when both parties confirm completion through webhook-driven reconciliation.",
    link: "https://escrow-tan.vercel.app/",
  },
  {
    title: "Link Shortener Platform",
    description: "Production-grade URL shortener with custom aliases, real-time click analytics, QR code generation, and expiry controls.",
    tech: ["React", "Node.js", "MongoDB", "Google Analytics"],
    outcome: "Clean dashboard for link management with high throughput redirect resolution.",
    link: "https://link-platform-two.vercel.app/dashboard",
  },
  {
    title: "Restaurant Ordering Platform",
    description: "Fully-featured restaurant website with online ordering, table reservations, menu management, and integrated payment processing for a seamless customer experience.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://fable-os.vercel.app/",
  },
  {
    title: "Pharmacy Website Redesign",
    description: "Rebuilt pharmacy website with improved navigation, product discoverability, mobile responsiveness, and checkout flow.",
    tech: ["React", "Node.js", "SEO", "Conversion Optimisation"],
    problem: "Existing website was losing potential customers due to poor UX and slow load times.",
    outcome: "Measurable improvement in sales conversions post-launch.",
    link: "https://frontend-nu-lovat-79.vercel.app/",
  },
  {
    title: "Atmospheric Water Generator Company Website",
    description: "Rebuilt web presence around lead generation and brand credibility for AWG units.",
    tech: ["React", "Node.js", "Lead Generation"],
    problem: "Need to improve enquiry volume and brand presentation.",
    outcome: "Improved enquiry volume from the redesigned contact and product pages.",
    link: "https://awg-virid.vercel.app/",
  },
  {
    title: "Data Analysis Tool",
    description: "Interactive data analysis and visualisation platform supporting CSV/JSON import, dashboard creation, charting, and real-time filtering.",
    tech: ["React", "Node.js", "D3.js / Recharts"],
    outcome: "Accessible, browser-based alternative to heavyweight BI tools.",
    link: "https://prophet-delta.vercel.app/",
  },
  {
    title: "File Converter Web App",
    description: "Multi-format file conversion tool with drag-and-drop UI, fast server-side processing, and instant download.",
    tech: ["React", "Node.js", "Serverside Processing"],
    outcome: "Supports document, image, and data file formats with a clean, zero-friction interface.",
    link: "https://fileforge-iota.vercel.app",
  },
  {
    title: "Background Remover Tool",
    description: "Web-based tool for removing backgrounds from images.",
    tech: ["React", "Image Processing"],
    outcome: "Simple and effective image editing utility.",
    link: "https://kingtenison.github.io/bcg_remove/",
  },
];

const Crosshair = () => (
  <svg className="absolute top-3 right-3 w-4 h-4 text-[#E5E7EB]" viewBox="0 0 16 16" fill="none">
    <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#000000] px-6 lg:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-sm mb-4">[ 0x02 ]</p>
        <h1 className="font-serif uppercase text-[#FFFFFF] text-4xl sm:text-5xl lg:text-6xl leading-none mb-4">
          My Projects
        </h1>
        <div className="w-full h-px bg-[#333333]" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            className="relative bg-[#F5F5F0] border border-[#E5E7EB]"
          >
            <Crosshair />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-[10px] border border-[#E5E7EB] px-2 py-0.5">
                  Project
                </span>
              </div>

              <h3 className="font-serif uppercase text-[#111827] text-lg mb-3 leading-tight">
                {project.title}
              </h3>

              <p className="font-sans text-[#6B7280] text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {project.problem && (
                <div className="mb-3 border-l-2 border-[#DC2626] pl-3">
                  <p className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-[10px] mb-1">
                    Problem
                  </p>
                  <p className="font-sans text-[#6B7280] text-sm">{project.problem}</p>
                </div>
              )}

              {project.outcome && (
                <div className="mb-4 border-l-2 border-[#E5E7EB] pl-3">
                  <p className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-[10px] mb-1">
                    Outcome
                  </p>
                  <p className="font-sans text-[#6B7280] text-sm">{project.outcome}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px)" }}
                    className="inline-block font-mono tracking-[0.15em] uppercase text-[10px] bg-[#000000] text-[#9CA3AF] border border-[#333333] px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono tracking-[0.15em] uppercase text-sm hover:text-[#DC2626] transition-colors duration-200"
                >
                  <span className="text-[#DC2626]">[</span> View Project <span className="text-[#DC2626]">]</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
