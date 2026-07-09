"use client";

import { useRef, useState, useEffect } from "react";

function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnim(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-lg font-mono mb-2">
        <span className="text-[#6B7280]">{label}</span>
        <span className="text-[#111827] font-bold tracking-tight">{value}<span className="text-[#6B7280] text-sm">/{max}</span></span>
      </div>
      <div className="h-[6px] bg-[#E5E7EB] relative">
        <div
          className="h-full bg-[#DC2626] transition-all duration-[1200ms] ease-out"
          style={{ width: anim ? `${pct}%` : "0%" }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border border-[#DC2626] bg-[#000000]" />
      </div>
    </div>
  );
}

function CrosshairBracket({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 4 L8 4 M4 4 L4 8" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
      <path d="M20 4 L16 4 M20 4 L20 8" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
      <path d="M4 20 L8 20 M4 20 L4 16" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
      <path d="M20 20 L16 20 M20 20 L20 16" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function GridLine({ className = "" }: { className?: string }) {
  return <div className={`absolute bg-[#DC2626] opacity-[0.04] pointer-events-none ${className}`} />;
}

const capabilities = [
  {
    id: "SYS-01",
    heading: "FullStack Engineering",
    description: "Web applications, mobile apps, API development, databases, and more — end-to-end systems built for production.",
    items: ["Web Development", "Mobile Applications", "API Development", "Databases & More"],
    stat: { label: "Systems Deployed", value: 12, max: 50 },
    status: "OPERATIONAL" as const,
  },
  {
    id: "SYS-02",
    heading: "AI & Automation",
    description: "AI chatbots, AI integration, data analysis, system automations, and more — intelligent solutions at scale.",
    items: ["AI Chatbots", "AI Integration", "Data Analysis", "System Automations"],
    stat: { label: "Agents Deployed", value: 8, max: 30 },
    status: "OPERATIONAL" as const,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#000000] py-20 lg:py-32 px-6 lg:px-10">
      {/* Background HUD grid */}
      <GridLine className="top-0 left-0 w-full h-px" />
      <GridLine className="bottom-0 left-0 w-full h-px" />
      <GridLine className="top-0 left-[33.33%] w-px h-full" />
      <GridLine className="top-0 left-[66.66%] w-px h-full" />

      {/* Section header */}
      <div className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">[</span>
          <span className="text-base font-mono tracking-[0.25em] text-[#9CA3AF] uppercase">Capabilities</span>
          <span className="text-[#DC2626] font-mono text-xl tracking-[0.15em] font-bold">]</span>
          <span className="h-px flex-1 bg-[#333333]" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FFFFFF] tracking-tight uppercase">
          Systems I Build
        </h2>
        <p className="mt-4 text-lg font-mono text-[#9CA3AF] max-w-lg">
          Systems, applications, and infrastructure designed for production.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((cap, i) => (
          <div
            key={cap.heading}
            className="relative border border-[#E5E7EB] bg-[#F5F5F0] p-6 lg:p-10 flex flex-col gap-6 lg:gap-8 transition-colors duration-100 hover:border-[#FEE2E2]"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            {/* Corner bracket decorations */}
            <CrosshairBracket className="absolute top-3 left-3" />
            <CrosshairBracket className="absolute top-3 right-3 scale-x-[-1]" />
            <CrosshairBracket className="absolute bottom-3 left-3 scale-y-[-1]" />
            <CrosshairBracket className="absolute bottom-3 right-3 scale-[-1]" />

            {/* System ID + status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono tracking-[0.2em] text-[#6B7280]">{cap.id}</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#DC2626]" />
                <span className="text-sm font-mono tracking-[0.15em] text-[#DC2626] uppercase font-semibold">{cap.status}</span>
              </div>
            </div>

            {/* Index */}
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#111827] tracking-tight">{cap.heading}</h3>
              <span className="text-[#DC2626] font-mono text-2xl font-bold tracking-wider">{String(i + 1).padStart(2, "0")}</span>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-[#6B7280] text-xs font-mono">◆</span>
              <span className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            {/* Description */}
            <p className="text-base font-mono text-[#6B7280] leading-relaxed">{cap.description}</p>

            {/* Stat bar with animated fill */}
            <StatBar label={cap.stat.label} value={cap.stat.value} max={cap.stat.max} />

            {/* Tech inventory */}
            <div className="mt-auto">
              <div className="text-xs font-mono tracking-[0.2em] text-[#6B7280] mb-3 uppercase">Equipment</div>
              <div className="flex flex-wrap gap-3">
                {cap.items.map((item) => (
                  <span
                    key={item}
                    className="text-base font-mono tracking-wider px-4 py-2 border border-[#E5E7EB] text-[#6B7280]"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
