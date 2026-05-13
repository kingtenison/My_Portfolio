"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";
import TechBadge from "@/components/TechBadge";

const featuredProjects = [
  {
    title: "Restaurant Ordering Platform",
    description: "Fully-featured restaurant website with online ordering, table reservations, menu management, and integrated payment processing for seamless customer experience.",
    url: "https://fable-os.vercel.app/",
    type: "web",
    tech: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    title: "Escrow Marketplace Platform",
    description: "Secure buyer-seller transaction platform with multi-step fund holding and automated release logic.",
    url: "https://escrow-tan.vercel.app/",
    type: "web",
    tech: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    title: "Link Shortener Platform",
    description: "URL shortening with custom aliases, real-time analytics dashboard, QR code generation, and expiry controls.",
    url: "https://link-platform-two.vercel.app/dashboard",
    type: "web",
    tech: ["React", "Node.js", "MongoDB", "Google Analytics"]
  },
  {
    title: "File Converter Web App",
    description: "Multi-format file conversion tool with drag-and-drop UI, server-side processing, and instant download.",
    url: "https://fileforge-iota.vercel.app",
    type: "web",
    tech: ["React", "Node.js"]
  }
];

const FeaturedProjects = () => {
  return (
      <section className="relative py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-10"
              style={{
                width: 300 + i * 50,
                height: 300 + i * 50,
                left: `${i * 18}%`,
                top: `${i % 2 === 0 ? 0 : 70}%`,
                background: `radial-gradient(circle, 
                  ${i % 2 === 0 ? "rgba(40,184,213,0.3)" : "rgba(139,92,246,0.3)"}, 
                  transparent 70%)`,
              }}
              animate={{
                y: [0, 40, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary-start/20 to-accent-purple/20 text-primary-start border border-primary-start/30">
                Selected Works
              </span>
            </motion.div>

             <h2 className="text-[2.1375rem] sm:text-[2.85rem] lg:text-[3.5625rem] font-cinzel font-bold text-primary-start mb-6 font-beyonders">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-start via-accent-purple to-gold">
                Featured Projects
              </span>
            </h2>
              
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Interactive previews of my automation systems and web applications
            </p>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-primary-start via-gold to-accent-purple mx-auto mt-8 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/60 depth-shadow"
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-start via-accent-purple to-gold" />
                
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-start/5 via-accent-purple/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
                
                <div className="p-8 relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-cinzel font-bold text-primary-start group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-start/10 to-accent-purple/10 flex items-center justify-center border border-primary-start/20"
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg className="w-5 h-5 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <TechBadge key={tech} name={tech} size="md" />
                    ))}
                  </div>
                  
                  {/* IFRAME Preview */}
                  <motion.div
                    className="mb-6 rounded-xl overflow-hidden border border-gray-200/60 bg-gray-50"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <iframe
                      src={project.url}
                      className="w-full aspect-video border-none"
                      title={project.title}
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-100">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-primary-start font-semibold hover:text-gold transition-colors"
                    >
                      <span>View Live</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </Link>
                    
                    <Link
                      href="/projects"
                      className="text-gray-600 hover:text-primary-start font-medium transition-colors text-sm uppercase tracking-wider"
                    >
                      More Projects →
                    </Link>
                  </div>
                </div>
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary-start/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => window.location.href = '/projects'} 
                variant="primary" 
                size="lg"
                className="shadow-2xl group-btn"
              >
                Explore All Projects
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
};

export default FeaturedProjects;