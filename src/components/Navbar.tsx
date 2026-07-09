"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500">
      <div className={`
        transition-all duration-500
        ${isScrolled 
          ? "backdrop-blur-2xl bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.05)]" 
          : "backdrop-blur-0 bg-white/50"
        }
      `}>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-start/50 via-accent-purple/30 via-accent-teal/50 to-transparent opacity-60" />
        
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/" 
                className="group relative text-2xl font-bold font-cinzel"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-teal to-primary-start group-hover:from-primary-start group-hover:to-accent-purple transition-all duration-500">
                  Hansen Joy
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center space-x-1"
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname?.startsWith(item.href));
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                        ${isActive 
                          ? "text-primary-start" 
                          : "text-gray-700 hover:text-primary-start"
                        }
                      `}
                    >
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-start/10 to-accent-purple/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                      
                      {/* Hover background */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-start/10 to-accent-purple/10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block"
            >
              <Link href="/contact">
                <motion.button
                  className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-primary-start to-accent-purple text-white shadow-md"
                      : "bg-gradient-to-r from-primary-start/10 to-accent-purple/10 border border-primary-start/30 text-primary-start"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-start hover:bg-primary-start/10 transition-all"
              aria-label="Toggle menu"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-[60] bg-white/75 backdrop-blur-2xl"
          >
            <div className="h-full flex flex-col justify-center px-8">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-6 py-3 sm:py-4 text-xl sm:text-2xl font-medium transition-all duration-200 rounded-2xl
                          ${isActive 
                            ? "text-primary-start bg-white/50" 
                            : "text-gray-700 hover:text-primary-start hover:bg-white/50"
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="pt-8 mt-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-start to-accent-purple text-white font-semibold text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.04 + 0.1 }}
                  >
                    Get in Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;