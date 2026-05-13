"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Button from "@/components/Button";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isInView = useInView(videoRef, {
    once: true,
    margin: "-20%",
  });

  useEffect(() => {
    if (isInView && videoRef.current && !videoLoaded) {
      videoRef.current.play().catch(() => {});
      setVideoLoaded(true);
    }
  }, [isInView, videoLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.4) contrast(1.2)" }}
          disablePictureInPicture
          preload="auto"
        >
          <source src="/Floating Blue Plexus.mp4" type="video/mp4" />
        </video>
        
        {/* Animated gradient mesh overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(40, 184, 213, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(2, 3, 68, 0.4) 0px, transparent 60%),
              radial-gradient(at 30% 80%, rgba(236, 72, 153, 0.15) 0px, transparent 40%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 60 + 30,
              height: Math.random() * 60 + 30,
              background: `linear-gradient(135deg, 
                rgba(40, 184, 213, ${Math.random() * 0.08 + 0.04}),
                rgba(139, 92, 246, ${Math.random() * 0.08 + 0.04}))`,
              filter: `blur(${Math.random() * 25 + 15}px)`,
            }}
            animate={{
              y: [0, Math.random() * 60 - 30, 0],
              x: [0, Math.random() * 60 - 30, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute border-2 border-primary-start/10 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
              width: 120 - i * 20,
              height: 120 - i * 20,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
           className="text-center"
         >
           <h1 className="text-[2.85rem] sm:text-[4.275rem] lg:text-[5.7rem] font-bold text-white mb-4 uppercase font-beyonders tracking-tight">
             <span className="block">Hansen Addy</span>
             <span className="relative inline-block mt-4">
               <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary-start via-accent-purple to-gold">
                 Joy
               </span>
               <motion.div
                 className="absolute -bottom-2 left-0 right-0 h-1"
                 initial={{ scaleX: 0, opacity: 0 }}
                 animate={{ scaleX: 1, opacity: 1 }}
                 transition={{ duration: 1.2, delay: 0.5 }}
               >
                 <div className="w-full h-full bg-gradient-to-r from-primary-start via-accent-purple to-gold rounded-full" />
               </motion.div>
             </span>
           </h1>
         </motion.div>

         <motion.p
           className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-20 font-poppins font-light tracking-wider"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
         >
           <span className="text-gold font-semibold">Fullstack Engineer</span>
           <span className="mx-3 text-white/30">|</span>
           <span className="text-accent-blue font-semibold">AI Automation Specialist</span>
         </motion.p>

         <motion.p
           className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
         >
           I transform complex problems into elegant software solutions. 
           From fullstack applications to AI automation, I build systems that
           <span className="text-gold font-semibold"> deliver real results</span>.
         </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={() => window.location.href = '/#services'} 
              variant="primary" 
              size="lg"
              className="shadow-[0_8px_30px_rgba(40,184,213,0.4)] hover:shadow-[0_12px_40px_rgba(40,184,213,0.6)]"
            >
              Explore My Work
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={() => window.location.href = '/contact'} 
              variant="outline" 
              size="lg"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-primary-start shadow-lg hover:shadow-gold/50"
            >
              Let&apos;s Talk
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-primary-start to-gold rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;