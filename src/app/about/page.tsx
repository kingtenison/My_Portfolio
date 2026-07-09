"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageCarousel from "@/components/ImageCarousel";

const projectsData = [
  {
    title: "Hospital Management System",
    description: "A complete HMS covering patient records, appointment booking, staff management, invoicing, and reporting dashboards with role-based access control. Built for a dental clinic to replace manual paper processes with automated workflows.",
    tech: ["React", "Node.js", "MongoDB", "REST API"],
    images: ["/project-screenshots/hospital-management-system.png"],
    link: "https://frontend-nu-lovat-79.vercel.app/"
  },
  {
    title: "Escrow Marketplace Platform",
    description: "A production escrow platform enabling secure buyer-seller transactions with multi-step fund hold and automated release logic. Funds only move when both parties confirm completion through webhook-driven reconciliation.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    images: ["/project-screenshots/escrow-marketplace.png"],
    link: "https://escrow-tan.vercel.app/"
  },
  {
    title: "Link Shortener Platform",
    description: "Production-grade URL shortener with custom aliases, real-time click analytics, QR code generation, and expiry controls. Clean dashboard for link management with high throughput redirect resolution.",
    tech: ["React", "Node.js", "MongoDB", "Google Analytics"],
    images: ["/project-screenshots/link-shortener.png"],
    link: "https://link-platform-two.vercel.app/dashboard"
  },
  {
    title: "Restaurant Ordering Platform",
    description: "Fully-featured restaurant website with online ordering, table reservations, menu management, and integrated payment processing for a seamless customer experience.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    images: ["/project-screenshots/restaurant-ordering.png"],
    link: "https://fable-os.vercel.app/"
  },
  {
    title: "Atmospheric Water Generator Website",
    description: "Rebuilt web presence focused on lead generation and brand credibility for AWG atmospheric water generators. Showcases sustainable water solutions and product information for a Ghana-based manufacturer.",
    tech: ["React", "Node.js", "Lead Generation"],
    images: ["/project-screenshots/awg-atmospheric-water.png"],
    link: "https://awg-virid.vercel.app/"
  },
  {
    title: "Data Analysis Tool",
    description: "Interactive data analysis and visualisation platform supporting CSV/JSON import, dashboard creation, charting, and real-time filtering. Accessible, browser-based alternative to heavyweight BI tools.",
    tech: ["React", "Node.js", "D3.js / Recharts"],
    images: ["/project-screenshots/data-analysis-tool.png"],
    link: "https://prophet-delta.vercel.app/"
  },
  {
    title: "File Converter Web App",
    description: "Multi-format file conversion tool with drag-and-drop UI, fast server-side processing, and instant download. Supports document, image, and data file formats with a clean, zero-friction interface.",
    tech: ["React", "Node.js", "Server-side Processing"],
    images: ["/project-screenshots/file-converter.png"],
    link: "https://fileforge-iota.vercel.app"
  },
  {
    title: "Background Remover Tool",
    description: "Web-based tool for removing backgrounds from images using the Remove.bg API. Simple and effective image editing utility with support for multiple formats.",
    tech: ["React", "Image Processing"],
    images: ["/project-screenshots/background-remover.png"],
    link: "https://kingtenison.github.io/bcg_remove/"
  }
];

const Crosshair = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" className={className} fill="none">
    <line x1="7" y1="0" x2="7" y2="14" stroke="#DC2626" strokeWidth="1" />
    <line x1="0" y1="7" x2="14" y2="7" stroke="#DC2626" strokeWidth="1" />
    <circle cx="7" cy="7" r="1.5" fill="#DC2626" />
  </svg>
);

const AnimatedProjectCard = ({
  project,
  index,
  isReversed
}: {
  project: typeof projectsData[0];
  index: number;
  isReversed: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className={isReversed ? "md:order-1" : ""}>
          <div
            className="relative border border-[#E5E7EB] bg-[#F5F5F0]"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <ImageCarousel images={project.images} title={project.title} />
          </div>
        </div>

        <div className={`space-y-6 ${isReversed ? "md:order-2 md:text-right" : ""}`}>
          <div>
            <motion.span
              className="inline-block text-xs font-mono tracking-[0.15em] uppercase text-[#DC2626] mb-3"
              initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 20 : -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              // FEATURED_PROJECT
            </motion.span>

            <motion.h3
              className="text-3xl md:text-4xl font-serif uppercase tracking-wide text-[#FFFFFF] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-[#9CA3AF] leading-relaxed text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={isReversed ? "md:flex md:justify-end" : ""}
          >
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  className="inline-block px-3 py-1 border border-[#DC2626] text-[#DC2626] text-xs font-mono tracking-[0.15em] uppercase"
                  style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={isReversed ? "md:text-right" : ""}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group/link"
            >
              <span className="text-[#DC2626]">[</span>
              <span           className="font-mono tracking-[0.15em] uppercase text-sm text-[#FFFFFF] group-hover/link:text-[#DC2626] transition-colors">
                View Project
              </span>
              <span className="text-[#DC2626]">]</span>
              <svg className="w-4 h-4 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {index < projectsData.length - 1 && (
        <div className="my-20 relative">
          <div className="border-t border-[#333333]" />
          <div className="absolute -top-[5px] left-1/2 -translate-x-1/2">
            <Crosshair />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#000000] px-6 lg:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-20"
      >
        <div className="border border-[#E5E7EB] bg-[#F5F5F0] p-6"
          style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crosshair />
              <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
                // SYS.ABOUT
              </span>
              <Crosshair />
            </div>
            <span className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#6B7280]">
              [ v1.0.0 ]
            </span>
          </div>

          <div className="border-t border-[#E5E7EB] mb-6" />

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Crosshair />
              <h1 className="text-[1.875rem] sm:text-[2.75rem] font-serif uppercase tracking-wide text-[#111827]">
                Crafting Digital Excellence
              </h1>
              <Crosshair />
            </div>
            <div className="flex items-center gap-3 justify-center">
              <span className="h-px w-12 bg-[#DC2626]" />
              <Crosshair />
              <span className="h-px w-12 bg-[#DC2626]" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <div
            className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Crosshair />
              <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
                // PROFILE
              </span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>
            <p className="text-[#6B7280] leading-relaxed text-lg font-sans">
              I build software that solves real problems. In the last few years I have shipped a full hospital management system,
              a live escrow marketplace, an AI pipeline that creates and posts YouTube videos with no human input, and two
              business websites that directly increased client revenue. My work spans React and Node.js fullstack development,
              MongoDB database architecture, UI/UX design, and end-to-end AI automation. I am equally comfortable working solo
              from spec to deployment and collaborating on larger engineering teams.
            </p>
          </div>

          <div
            className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Crosshair />
              <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
                // CONTACT
              </span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>
            <div className="space-y-3 text-[#6B7280] font-sans">
              <p className="flex items-center gap-3">
                <span className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#DC2626] w-12">
                  MAIL
                </span>
                <span className="h-px w-3 bg-[#E5E7EB]" />
                kingtenison@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <span className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#DC2626] w-12">
                  TEL
                </span>
                <span className="h-px w-3 bg-[#E5E7EB]" />
                +233 53 529 2708
              </p>
              <p className="flex items-center gap-3">
                <span className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#DC2626] w-12">
                  LOC
                </span>
                <span className="h-px w-3 bg-[#E5E7EB]" />
                Accra, Ghana — Open to remote
              </p>
              <p className="flex items-center gap-3">
                <span className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#DC2626] w-12">
                  GIT
                </span>
                <span className="h-px w-3 bg-[#E5E7EB]" />
                <a href="https://github.com/kingtenison" className="text-[#DC2626] hover:underline font-mono text-sm">
                  [ github.com/kingtenison ]
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-8"
        >
          <div
            className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Crosshair />
              <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
                // EXPERIENCE
              </span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>
            <div className="space-y-4">
              <div className="border-l border-[#DC2626] pl-6 relative">
                <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-[#DC2626]" />
                <h3 className="font-serif uppercase tracking-wide text-lg text-[#111827]">IT Systems Engineer</h3>
                <p className="text-[#DC2626] font-mono text-xs tracking-[0.15em] uppercase mb-1">
                  Nexus Gold Coast Hub — Nexus Global
                </p>
                <p className="text-[#6B7280] text-sm font-mono mb-3">
                  // October 2024 – Present | Accra, Ghana
                </p>
                <ul className="text-sm text-[#6B7280] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC2626] mt-1 font-mono">&gt;</span>
                    Maintain and optimise IT infrastructure across hardware, software, and network layers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC2626] mt-1 font-mono">&gt;</span>
                    Diagnose and resolve system-level and user-reported faults
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC2626] mt-1 font-mono">&gt;</span>
                    Drive digital workflow improvements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC2626] mt-1 font-mono">&gt;</span>
                    Own reliability, security, and performance monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Crosshair />
              <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
                // EDUCATION
              </span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>
            <div className="space-y-5">
              <div>
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-[#DC2626] mb-1">[ DEGREE ]</p>
                <p className="font-sans text-[#111827] font-medium">BSc Information Technology Management</p>
                <p className="font-mono text-xs text-[#6B7280]">University of Professional Studies, Accra (UPSA)</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-[#DC2626] mb-1">[ DIPLOMA ]</p>
                <p className="font-sans text-[#111827] font-medium">Diploma in Information Technology</p>
                <p className="font-mono text-xs text-[#6B7280]">UPSA, 2023</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-[#DC2626] mb-1">[ CERT ]</p>
                <p className="font-sans text-[#111827] font-medium">Google Junior Developer Certificate</p>
                <p className="font-mono text-xs text-[#6B7280]">2022</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mb-20"
      >
        <div
          className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
          style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Crosshair />
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
              // LANGUAGES
            </span>
            <span className="h-px flex-1 bg-[#E5E7EB]" />
          </div>
          <div className="flex flex-wrap gap-4">
            {["English (Professional)", "Ga (Native)", "Twi (Native)"].map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="inline-block px-4 py-2 border border-[#DC2626] text-[#DC2626] text-sm font-mono tracking-[0.15em] uppercase bg-[#000000]"
                style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div
          className="border border-[#E5E7EB] bg-[#F5F5F0] p-6 text-center"
          style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <Crosshair />
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
              // ABOUT_ME
            </span>
            <Crosshair />
          </div>
          <h2 className="text-[1.5rem] sm:text-[1.875rem] lg:text-[2.25rem] font-serif uppercase tracking-wide text-[#111827] mb-4">
            Crafting Digital Excellence
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <span className="h-px w-12 bg-[#DC2626]" />
            <Crosshair />
            <span className="h-px w-12 bg-[#DC2626]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div
          className="border border-[#E5E7EB] bg-[#F5F5F0] p-6 mb-12 text-center"
          style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <Crosshair />
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626]">
              // PROJECT_SPOTLIGHT
            </span>
            <Crosshair />
          </div>
          <p className="text-[#6B7280] text-lg font-sans max-w-3xl mx-auto">
            A selection of recent work spanning fullstack applications, AI automation, and enterprise systems.
          </p>
          <div className="flex items-center gap-3 justify-center mt-6">
            <span className="h-px w-12 bg-[#DC2626]" />
            <Crosshair />
            <span className="h-px w-12 bg-[#DC2626]" />
          </div>
        </div>

        <div className="space-y-24">
          {projectsData.map((project, index) => (
            <AnimatedProjectCard
              key={index}
              project={project}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
