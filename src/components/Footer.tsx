"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-primary-start to-primary-end text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-purple rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl opacity-20" />
      </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-cinzel font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white">
                Hansen Addy Joy
              </h3>
              <p className="text-white/80 mb-6 max-w-md leading-relaxed">
                Fullstack Engineer & AI Automation Specialist creating innovative solutions that drive real business results.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                 {[
                   { href: "https://github.com/kingtenison", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                   { 
                     href: "mailto:kingtenison@gmail.com",
                     icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                     stroke: true
                   },
                   { 
                     href: "https://wa.me/233535292708",
                     icon: "M17.46 14.34c-.23.11-1.06.63-1.22.71-.16.08-.27.11-.45.06-.18-.05-.38-.14-.56-.26-.18-.12-.38-.24-.58-.38-.2-.14-.05-.26.06-.42.11-.16.28-.48.7-.64l1.75-.76c.19-.08.38-.13.58-.13.21 0 .39.06.54.17.15.11.21.26.25.42.04.16.04.34-.02.51-.08.22-.26.5-.64.68l-1.87.75c-.22.09-.44.14-.65.14-.22 0-.43-.05-.62-.15-.19-.1-.33-.27-.4-.45-.07-.17-.09-.35-.05-.53.04-.18.15-.34.31-.46.16-.12.35-.2.54-.22.2-.02.39.05.54.19.15.14.21.32.25.51.04.2.04.39-.02.57zM12 6.5c-4.08 0-7.39 2.85-7.76 6.53l-2.15-1.25c.02-.32.33-1.44 2.99-1.44 2.23 0 3.04.99 3.35 1.91.32.92.43 1.91.44 2.49 0 .58-.06 1.13-.17 1.64l-2.35-1.15c-.07-.03-.14-.05-.21-.05-.27 0-.52-.09-.72-.26-.2-.17-.34-.42-.39-.72-.02-.13-.03-.26-.03-.39 0-.14.04-.27.11-.39.07-.12.18-.21.31-.28.13-.07.28-.1.43-.1.15 0 .31.03.44.1.13.07.24.16.32.28.08.12.13.25.13.39 0 .14-.04.27-.11.39-.07.12-.18.21-.31.28-.13.07-.28.1-.43.1-.16 0-.32-.04-.45-.12-.13-.08-.24-.18-.32-.3-.08-.12-.13-.26-.13-.4 0-.14.05-.27.14-.38.09-.11.22-.2.36-.25.14-.05.3-.07.46-.07.16 0 .33.02.46.07.13.05.25.14.33.25.09.12.14.26.14.41 0 .15-.05.29-.14.41-.09.12-.21.22-.34.29l-2.78 1.23c-.16.07-.34.11-.52.11-.19 0-.38-.05-.54-.15-.16-.1-.29-.26-.37-.44-.08-.18-.12-.38-.12-.59 0-.21.04-.41.12-.59.08-.18.21-.34.37-.46.16-.12.35-.19.55-.19.2 0 .4.07.56.2.16.13.27.32.32.54.05.22.07.45.04.68z",
                     stroke: false
                   }
                 ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group hover:scale-110"
                    whileHover={{ y: -3 }}
                  >
                    {social.stroke ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Projects", "Skills", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="text-white/80 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold">Get in Touch</h4>
              <div className="space-y-3 text-white/80">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  kingtenison@gmail.com
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +233 53 529 2708
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Accra, Ghana
                </p>
                <p className="flex items-center gap-3 text-gold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Open to remote
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60 mb-2">
              © {currentYear} Hansen Addy Joy. All rights reserved.
            </p>
            <p className="text-white/40 text-sm">
              Built by{' '}
              <a
                href="https://wa.me/233535292708"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                =[ØVĒRKĪLL]=
              </a>
            </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;