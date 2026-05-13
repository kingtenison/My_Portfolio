"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import TechBadge from "@/components/TechBadge";

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

// AnimatedProjectCard component with reveal animation
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
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className={`grid md:grid-cols-2 gap-10 items-center ${isReversed ? "md:flex-row-reverse" : ""}`}>
        {/* Project Carousel */}
        <div className={`${isReversed ? "md:order-1" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary-start/10 group"
          >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-start/0 via-gold/0 to-accent-purple/0 group-hover:from-primary-start/10 group-hover:via-gold/10 group-hover:to-accent-purple/10 rounded-2xl transition-all duration-500 pointer-events-none z-10" />
            
            {/* Shadow glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-start/20 via-gold/20 to-accent-purple/20 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500 -z-10" />
            
            <ImageCarousel images={project.images} title={project.title} />
          </motion.div>
          
          {/* Project number indicator */}
          <motion.div
            className="absolute -top-6 -right-6 w-24 h-24 hidden md:flex items-center justify-center"
            initial={{ rotate: -10, scale: 0 }}
            animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -10, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
             <span className="text-[7.6rem] font-bold text-primary-start/10 font-beyonders">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className={`space-y-6 ${isReversed ? "md:order-2 md:text-right" : ""}`}>
          <div>
            <motion.span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary-start/20 to-gold/30 text-primary-start mb-3"
              initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 20 : -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Featured Project
            </motion.span>
            
            <motion.h3
              className="text-3xl md:text-4xl font-cinzel font-bold text-primary-start mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.title}
            </motion.h3>
            
            <motion.p
              className="text-gray-700 leading-relaxed text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`${isReversed ? "md:flex md:justify-end" : ""}`}
          >
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                >
                  <TechBadge name={tech} size="md" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`${isReversed ? "md:text-right" : ""}`}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group/link"
              whileHover={{ x: 5 }}
            >
              <span className="text-xl font-cinzel font-bold text-primary-start group-hover:text-gold transition-colors">
                View Live Project
              </span>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-start/10 to-accent-purple/10 flex items-center justify-center border-2 border-primary-start/20 group-hover:border-gold/50 group-hover:scale-110 transition-all">
                <svg className="w-5 h-5 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Divider (except last) */}
      {index < projectsData.length - 1 && (
        <div className="my-20 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gradient opacity-20" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function About() {
  return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Ambient background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-[100px] opacity-10"
              style={{
                width: 400 + i * 100,
                height: 400 + i * 100,
                left: i % 2 === 0 ? "-10%" : "auto",
                right: i % 2 === 1 ? "-10%" : "auto",
                top: i * 20 + "%",
                background: `radial-gradient(circle, 
                  ${i === 0 ? "rgba(40,184,213,0.3)" : i === 1 ? "rgba(139,92,246,0.3)" : "rgba(212,175,55,0.3)"},
                  transparent 70%)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 18 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary-start/20 to-accent-purple/20 text-primary-start border border-primary-start/30">
                About Me
              </span>
            </motion.div>

            <h1 className="text-[2.1375rem] sm:text-[3.5625rem] font-cinzel font-bold text-primary-start mb-6 font-beyonders">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-start via-accent-purple to-gold">
                Crafting Digital Excellence
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-primary-start via-gold to-accent-purple mx-auto rounded-full" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100/60 shadow-lg">
                <h2 className="text-2xl font-cinzel font-bold text-primary-start mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-start/10 to-accent-purple/10 flex items-center justify-center border border-primary-start/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Profile
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  I build software that solves real problems. In the last few years I have shipped a full hospital management system,
                  a live escrow marketplace, an AI pipeline that creates and posts YouTube videos with no human input, and two
                  business websites that directly increased client revenue. My work spans React and Node.js fullstack development,
                  MongoDB database architecture, UI/UX design, and end-to-end AI automation. I am equally comfortable working solo
                  from spec to deployment and collaborating on larger engineering teams.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100/60 shadow-lg">
                <h3 className="text-xl font-bold text-primary-start mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-primary-start/20 flex items-center justify-center border border-gold/30">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Contact
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-start/10 flex items-center justify-center">📧</span>
                    kingtenison@gmail.com
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-start/10 flex items-center justify-center">📱</span>
                    +233 53 529 2708
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-start/10 flex items-center justify-center">📍</span>
                    Accra, Ghana — Open to remote
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-start/10 flex items-center justify-center">🔗</span>
                    <a href="https://github.com/kingtenison" className="text-gold hover:underline">github.com/kingtenison</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100/60 shadow-lg">
                <h2 className="text-2xl font-cinzel font-bold text-primary-start mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-start/10 to-accent-purple/10 flex items-center justify-center border border-primary-start/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Experience
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-gold pl-6 relative">
                    <div className="absolute -left-[9px] top-6 w-2 h-2 rounded-full bg-gold" />
                    <h3 className="font-bold text-primary-start text-lg">IT Systems Engineer</h3>
                    <p className="text-gold font-medium mb-1">Nexus Gold Coast Hub — Nexus Global</p>
                    <p className="text-sm text-gray-600 mb-3">October 2024 – Present | Accra, Ghana</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">▹</span>
                        Maintain and optimise IT infrastructure across hardware, software, and network layers
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">▹</span>
                        Diagnose and resolve system-level and user-reported faults
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">▹</span>
                        Drive digital workflow improvements
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">▹</span>
                        Own reliability, security, and performance monitoring
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100/60 shadow-lg">
                <h3 className="text-xl font-bold text-primary-start mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-primary-start/20 flex items-center justify-center border border-gold/30">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </span>
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-primary-start">BSc Information Technology Management</p>
                    <p className="text-gray-700">University of Professional Studies, Accra (UPSA)</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary-start">Diploma in Information Technology</p>
                    <p className="text-gray-700">UPSA, 2023</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary-start">Google Junior Developer Certificate</p>
                    <p className="text-gray-700">2022</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-cinzel font-bold text-primary-start mb-6">Languages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["English (Professional)", "Ga (Native)", "Twi (Native)"].map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-start/10 to-accent-purple/10 text-primary-start rounded-2xl border border-primary-start/20 font-semibold backdrop-blur-sm"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* About Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary-start/20 to-accent-purple/20 text-primary-start border border-primary-start/30">
                About Me
              </span>
            </motion.div>

             <h1 className="text-[2.1375rem] sm:text-[3.5625rem] font-cinzel font-bold text-primary-start mb-8 font-beyonders tracking-wider">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-start via-accent-purple to-gold">
                Crafting Digital Excellence
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-primary-start via-gold to-accent-purple mx-auto rounded-full" />
          </motion.div>

          {/* Projects Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-[2.1375rem] sm:text-[2.85rem] lg:text-[3.5625rem] font-cinzel font-bold text-primary-start mb-6 font-beyonders">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-start via-accent-purple to-gold">
                  Project Spotlight
                </span>
              </h2>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                A selection of recent work spanning fullstack applications, AI automation, and enterprise systems.
              </p>
              
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-primary-start via-gold to-accent-purple mx-auto mt-8 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
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
      </div>
  );
}