"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";
import TechBadge from "@/components/TechBadge";

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
    title: "Link Shortener Platform",
    description: "Production-grade URL shortener with custom aliases, real-time click analytics, QR code generation, and expiry controls.",
    tech: ["React", "Node.js", "MongoDB", "Analytics"],
    outcome: "Clean dashboard for link management with high throughput redirect resolution.",
    link: "https://link-platform-two.vercel.app/dashboard",
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

export default function Projects() {
  return (
      <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl sm:text-5xl font-cinzel font-bold text-primary-start mb-6">
            My Projects
          </h1>
           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
             Showcasing innovative solutions in automation, web development, and AI integration
           </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card-bg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                 <h3 className="text-xl font-cinzel font-semibold text-primary-start mb-3">
                  {project.title}
                </h3>
                 <p className="text-gray-700 mb-4 leading-relaxed">
                   {project.description}
                 </p>

                {project.problem && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gold mb-1">Problem Solved:</h4>
                     <p className="text-sm text-gray-700">{project.problem}</p>
                  </div>
                )}

                {project.outcome && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gold mb-1">Outcome:</h4>
                    <p className="text-sm text-gray-700">{project.outcome}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div className="flex justify-end">
                    <Button onClick={() => window.open(project.link, '_blank')} variant="outline" size="sm" iconPosition="right">
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}