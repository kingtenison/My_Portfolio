"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function CyberpunkNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#333333]">
      <div className="flex items-center justify-between px-6 lg:px-10 h-20">
        <Link href="/" className="text-[#9CA3AF] text-lg font-mono tracking-[0.2em] uppercase flex items-center gap-3 hover:text-[#FFFFFF] transition-colors duration-100">
          <span className="text-[#DC2626] text-xl">◆</span>
          <span className="hidden sm:inline">Id: USER-001</span>
          <span className="sm:hidden">HANSEN</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-12 text-lg font-mono tracking-[0.2em] uppercase">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-100 ${
                   isActive ? "text-[#FFFFFF]" : "text-[#9CA3AF] hover:text-[#FFFFFF]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Contact */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex justify-self-end chamfer-sm bg-[#D1D5DB] text-[#111827] px-8 py-3 text-base font-mono font-bold tracking-[0.15em] uppercase hover:bg-[#DC2626] hover:text-[#FFFFFF] transition-colors duration-100"
        >
          Contact
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-[#DC2626] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#DC2626] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#DC2626] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ${
          menuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-[#333333] px-6 py-6 flex flex-col gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-mono tracking-[0.2em] uppercase transition-colors duration-100 ${
                   isActive ? "text-[#FFFFFF]" : "text-[#9CA3AF] hover:text-[#FFFFFF]"
                }`}
              >
                <span className="text-[#DC2626] mr-3">&rsaquo;</span>
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 chamfer-sm bg-[#D1D5DB] text-[#111827] px-8 py-3 text-base font-mono font-bold tracking-[0.15em] uppercase hover:bg-[#DC2626] hover:text-[#FFFFFF] transition-colors duration-100 text-center"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
