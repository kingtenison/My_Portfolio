"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "@/components/Button";
import TechBadge from "./TechBadge";

// Icons
const AIIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#28b8d5" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="40" height="32" rx="8" fill="url(#aiGrad)" />
    <circle cx="24" cy="32" r="6" fill="#d4af37" />
    <circle cx="40" cy="32" r="6" fill="#0ea5e9" />
    <rect x="20" y="44" width="8" height="3" rx="1" fill="#d4af37" />
    <rect x="36" y="44" width="8" height="3" rx="1" fill="#d4af37" />
  </svg>
);

const ComputerIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <defs>
      <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#28b8d5" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="10" y="14" width="44" height="26" rx="4" fill="url(#compGrad)" />
    <rect x="16" y="20" width="32" height="16" rx="2" fill="#020344" />
    <rect x="22" y="26" width="20" height="2" rx="1" fill="#28b8d5" />
    <rect x="8" y="42" width="48" height="4" rx="2" fill="url(#compGrad)" />
    <rect x="20" y="48" width="24" height="5" rx="2" fill="#8b5cf6" />
  </svg>
);

const services = {
  fullstack: {
    title: "Fullstack Engineering",
    description: "End-to-end web application development with modern technologies and best practices.",
    color: "#28b8d5",
    capabilities: [
      {
        heading: "Custom Web Applications",
        description: "Build scalable, performant web apps tailored to your business needs—from MVPs to enterprise systems.",
        tech: ["React", "Next.js", "Node.js", "TypeScript"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      },
      {
        heading: "API Development & Integration",
        description: "Design and implement robust RESTful or GraphQL APIs. Seamlessly integrate third-party services and legacy systems.",
        tech: ["REST APIs", "GraphQL", "Webhooks", "Microservices"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      },
      {
        heading: "Database Architecture",
        description: "Design efficient, secure database structures optimized for your data patterns and growth trajectory.",
        tech: ["MongoDB", "PostgreSQL", "Redis", "ORM/ODM"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        )
      },
      {
        heading: "Responsive UI/UX Implementation",
        description: "Pixel-perfect, accessible interfaces that work flawlessly across all devices and browsers.",
        tech: ["Tailwind CSS", "Framer Motion", "Accessibility (WCAG)"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM14 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      },
      {
        heading: "Performance Optimization",
        description: "Speed up your existing applications with code splitting, caching strategies, and bundle optimization.",
        tech: ["Lighthouse", "Core Web Vitals", "CDN", "Caching"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        heading: "DevOps & Deployment",
        description: "Set up CI/CD pipelines, containerization, and cloud infrastructure for reliable, scalable deployments.",
        tech: ["Docker", "AWS", "Vercel", "CI/CD"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
          </svg>
        )
      }
    ]
  },
  aiAutomation: {
    title: "AI Automation Solutions",
    description: "Intelligent systems that automate workflows and augment human capabilities.",
    color: "#8b5cf6",
    capabilities: [
      {
        heading: "AI Content Pipelines",
        description: "End-to-end automated content creation: AI-generated scripts, text-to-speech, video assembly, and multi-platform publishing.",
        tech: ["OpenAI GPT", "ElevenLabs", "FFmpeg", "YouTube API"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        heading: "Workflow Automation",
        description: "Replace manual, repetitive tasks with intelligent bots that handle data entry, notifications, reporting, and more.",
        tech: ["Node-RED", "n8n", "Zapier", "Custom Scripts"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM14 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      },
      {
        heading: "Smart Data Processing",
        description: "Automate data extraction, classification, and transformation from unstructured sources (emails, documents, images).",
        tech: ["OCR", "NLP", "Computer Vision", "Data Pipelines"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      },
      {
        heading: "Chatbots & Virtual Assistants",
        description: "Deploy AI-powered chat agents for customer support, lead qualification, and internal knowledge bases.",
        tech: ["Rasa", "Dialogflow", "OpenAI", "Vector DBs"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )
      },
      {
        heading: "Predictive Analytics",
        description: "Implement ML models that forecast trends, detect anomalies, and provide actionable business insights.",
        tech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        heading: "Integration Automation",
        description: "Connect disparate tools and platforms with smart middleware that routes data and triggers actions automatically.",
        tech: ["Webhooks", "RPA", "API Orchestration", "Event-driven"],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )
      }
    ]
  }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState<"fullstack" | "aiAutomation">("fullstack");

  return (
    <section id="services" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-[1.78125rem] sm:text-[2.1375rem] lg:text-[2.85rem] font-cinzel font-bold text-primary-start mb-4 font-beyonders">
            Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your needs
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-start via-gold to-accent-purple mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Simple Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { id: "fullstack", label: "Fullstack Engineering", icon: ComputerIcon },
            { id: "aiAutomation", label: "AI Automation", icon: AIIcon },
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id as "fullstack" | "aiAutomation")}
              className={`group relative px-6 py-3 rounded-xl font-cinzel font-medium text-base transition-all duration-300 flex items-center gap-2 ${
                activeTab === id
                  ? "bg-gradient-to-r from-primary-start to-accent-purple text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Capabilities Grid - Responsive 2->3->4 columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {services[activeTab].capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-square bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-primary-start/40 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Icon */}
                  <div className="mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${services[activeTab].color}15`,
                        color: services[activeTab].color
                      }}
                    >
                      {capability.icon}
                    </div>
                  </div>

                  {/* Heading */}
                  <h4 className="text-base font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary-start transition-colors line-clamp-2">
                    {capability.heading}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {capability.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {capability.tech.slice(0, 2).map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                    {capability.tech.length > 2 && (
                      <span className="text-xs text-gray-500">+{capability.tech.length - 2}</span>
                    )}
                  </div>

                  {/* Hover accent border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border-2"
                    style={{ borderColor: `${services[activeTab].color}30` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button
                onClick={() => window.location.href = '/contact'}
                variant="primary"
                size="md"
                className="shadow-md"
              >
                Discuss Your {services[activeTab].title.split(' ')[0]} Project
              </Button>
              <p className="text-gray-500 mt-3 text-sm">
                Free consultation • Custom proposal • No commitment
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
