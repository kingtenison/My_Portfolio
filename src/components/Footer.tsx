"use client";

import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] border-t border-[#333333] px-6 lg:px-10">
      <div className="py-16 lg:py-24">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#DC2626] text-xl">◆</span>
              <span className="text-base font-mono tracking-[0.2em] text-[#9CA3AF] uppercase">Id: USER-001</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#FFFFFF] tracking-tight uppercase mb-5">
              Hansen Addy Joy
            </h3>
            <p className="text-base font-mono text-[#9CA3AF] leading-relaxed mb-8 max-w-sm">
              Fullstack Engineer &amp; AI Automation Specialist building production-grade systems, applications, and infrastructure.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/kingtenison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase border border-[#333333] chamfer-sm px-5 py-2.5 font-semibold"
              >
                [GH]
              </a>
              <a
                href="mailto:kingtenison@gmail.com"
                className="text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase border border-[#333333] chamfer-sm px-5 py-2.5 font-semibold"
              >
                [@]
              </a>
              <a
                href="https://wa.me/233535292708"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase border border-[#333333] chamfer-sm px-5 py-2.5 font-semibold"
              >
                [WA]
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">[</span>
              <span className="text-base font-mono tracking-[0.25em] text-[#9CA3AF] uppercase">Navigation</span>
              <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">]</span>
            </div>
            <div className="space-y-3.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-mono text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors duration-100"
                >
                  <span className="text-[#333333] mr-3">&rsaquo;</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">[</span>
              <span className="text-base font-mono tracking-[0.25em] text-[#9CA3AF] uppercase">Comms</span>
              <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">]</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg font-mono text-[#9CA3AF]">
                <span className="text-[#DC2626]">◆</span>
                kingtenison@gmail.com
              </div>
              <div className="flex items-center gap-3 text-lg font-mono text-[#9CA3AF]">
                <span className="text-[#DC2626]">◆</span>
                +233 53 529 2708
              </div>
              <div className="flex items-center gap-3 text-lg font-mono text-[#9CA3AF]">
                <span className="text-[#DC2626]">◆</span>
                Accra, Ghana
              </div>
              <div className="flex items-center gap-3 text-lg font-mono text-[#9CA3AF]">
                <span className="text-[#DC2626]">◆</span>
                Open to remote
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 lg:mt-20 pt-6 lg:pt-8 border-t border-[#333333]">
          <p className="text-sm lg:text-base font-mono text-[#9CA3AF] tracking-[0.1em]">
            &copy; {currentYear} Hansen Addy Joy
          </p>
        </div>
      </div>

      {/* Corner marks */}
      <div className="absolute top-0 right-0 w-16 h-[2px] bg-[#DC2626] opacity-30" />
      <div className="absolute top-0 right-0 w-[2px] h-16 bg-[#DC2626] opacity-30" />
    </footer>
  );
}
