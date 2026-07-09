"use client";

import { useRef, useState, useEffect } from "react";

function CrosshairMark({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-crosshair">
        <circle cx="20" cy="20" r="3" stroke="#DC2626" strokeWidth="1" />
        <line x1="20" y1="2" x2="20" y2="13" stroke="#DC2626" strokeWidth="1" />
        <line x1="20" y1="27" x2="20" y2="38" stroke="#DC2626" strokeWidth="1" />
        <line x1="2" y1="20" x2="13" y2="20" stroke="#DC2626" strokeWidth="1" />
        <line x1="27" y1="20" x2="38" y2="20" stroke="#DC2626" strokeWidth="1" />
      </svg>
    </div>
  );
}

function StatBar({ label, value, max, icon }: { label: string; value: number; max: number; icon: string }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-base lg:text-lg font-mono">
        <span className="flex items-center gap-3 text-[#9CA3AF]">
          <span className="w-6 text-center text-xl lg:text-2xl text-[#DC2626]">{icon}</span>
          {label}
        </span>
        <span className="text-[#FFFFFF] tracking-tight font-bold">
          {value}
          <span className="text-[#9CA3AF] font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-[6px] bg-[#333333]">
        <div className="h-full bg-[#DC2626]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function BracketButton({ children, href, primary = false }: { children: string; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 font-mono tracking-[0.2em] uppercase transition-colors duration-100 ${
        primary
          ? "text-[#FFFFFF] bg-[#DC2626] chamfer-md px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-bold hover:bg-[#b91c1c]"
          : "text-[#9CA3AF] hover:text-[#DC2626] text-base lg:text-lg"
      }`}
    >
      {primary ? (
        <>{children}</>
      ) : (
        <>
          <span className="text-[#DC2626] text-xl lg:text-2xl font-bold">[</span>
          <span className="text-[#DC2626] text-xl lg:text-2xl">&rsaquo;</span>
          <span className="font-semibold">{children.replace(/^\[|\]$/g, "")}</span>
          <span className="text-[#DC2626] text-xl lg:text-2xl font-bold">]</span>
        </>
      )}
    </a>
  );
}

const roles = ["Fullstack Engineer", "AI Automation Specialist", "UI/UX Designer", "System Architect"];

const tabStats: Record<string, { icon: string; label: string; value: number; max: number }[]> = {
  Stats: [
    { icon: "▣", label: "Experience", value: 5, max: 10 },
    { icon: "▤", label: "Projects Delivered", value: 50, max: 100 },
    { icon: "▥", label: "Technologies", value: 30, max: 50 },
  ],
  Skills: [
    { icon: "▣", label: "Frontend", value: 8, max: 15 },
    { icon: "▤", label: "Backend", value: 8, max: 15 },
    { icon: "▥", label: "AI & Automation", value: 7, max: 15 },
  ],
  Equip: [
    { icon: "▣", label: "Dev Tools", value: 15, max: 30 },
    { icon: "▤", label: "Certifications", value: 2, max: 10 },
    { icon: "▥", label: "Clients Served", value: 10, max: 50 },
  ],
};

const roster = [
  { name: "AI Automation Engine", active: true },
  { name: "Escrow Transaction System", active: false },
  { name: "Data Pipeline Architecture", active: false },
  { name: "Portfolio Platform", active: false },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("Stats");

  const tabs = ["Stats", "Skills", "Equip"];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText.length < currentRole.length) {
      t = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80 + Math.random() * 50);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      t = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      t = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length - 1)), 40 + Math.random() * 30);
    } else if (isDeleting && displayText.length === 0) {
      t = setTimeout(() => { setIsDeleting(false); setRoleIndex((p) => (p + 1) % roles.length); }, 100);
    }
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  const currentStats = tabStats[activeTab];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden bg-[#000000] flex flex-col"
    >
      {/* —— Main grid: stack on mobile, 3-column on lg+ —— */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[360px_1fr_340px] xl:grid-cols-[400px_1fr_380px]">

        {/* — LEFT COLUMN: Identity + Stats — */}
        <div className="lg:border-r border-[#333333] px-6 lg:px-10 pb-8 lg:pb-12 pt-4 flex flex-col gap-8 lg:gap-10">
          {/* Name */}
          <div>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,3rem)] lg:text-[clamp(2rem,3vw,3.5rem)] font-bold leading-[0.9] tracking-tight text-[#FFFFFF] uppercase">
              Hansen<br />Addy Joy
            </h1>
            <div className="mt-3 lg:mt-4 flex items-center gap-2">
              <span className="text-base lg:text-lg font-mono tracking-[0.2em] text-[#9CA3AF] uppercase min-w-[180px] lg:min-w-[240px]">
                {displayText}
              </span>
              <span className="inline-block w-[2px] h-4 lg:h-5 bg-[#DC2626] animate-pulse" />
            </div>
          </div>

          {/* Tab selector */}
          <div className="grid grid-cols-3 border border-[#333333] text-sm lg:text-base font-mono tracking-[0.15em] uppercase">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 lg:py-4 transition-colors duration-100 ${
                  activeTab === tab
                    ? "bg-[#DC2626] text-[#FFFFFF] font-bold"
                    : "text-[#9CA3AF] hover:text-[#FFFFFF]"
                } ${tab !== tabs[0] ? "border-l border-[#333333]" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stat bars */}
          <div className="space-y-6 lg:space-y-8" key={activeTab}>
            {currentStats.map((s) => (
              <StatBar key={s.label} icon={s.icon} label={s.label} value={s.value} max={s.max} />
            ))}
          </div>
        </div>

        {/* — CENTER COLUMN: Hero visual — */}
        <div className="relative overflow-hidden flex items-center justify-center min-h-[240px] lg:min-h-0">
          {/* Diagonal split backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #1A1A1A 0%, #1A1A1A 45%, #000000 45%, #000000 100%)`,
            }}
          />

          {/* Large watermark name */}
          <span
            className="absolute font-serif text-[clamp(5rem,20vw,7rem)] lg:text-[clamp(7rem,16vw,14rem)] font-bold text-[#D1D5DB] opacity-[0.04] leading-none select-none pointer-events-none uppercase"
            style={{ transform: "rotate(-12deg)" }}
          >
            HANSEN
          </span>

          {/* Decorative diagonal corner line */}
          <div
            className="absolute bottom-0 right-0 w-[60%] h-[2px]"
            style={{ background: "linear-gradient(135deg, transparent, #DC262622)", transform: "rotate(-45deg) translateY(-50%)" }}
          />

          {/* Crosshair marks - hide on mobile */}
          <CrosshairMark className="hidden lg:block top-[20%] left-[15%]" />
          <CrosshairMark className="hidden lg:block bottom-[25%] right-[20%]" />
          <CrosshairMark className="hidden lg:block top-[55%] right-[35%]" />

          {/* Focal text */}
          <div className="relative z-10 text-center px-4">
            <p className="font-serif text-[clamp(1.8rem,6vw,2.5rem)] lg:text-[clamp(2rem,3vw,3rem)] font-bold text-[#FFFFFF] tracking-tight uppercase leading-tight">
              Complex Problems.<br />Elegant Solutions.
            </p>
            <div className="mt-4 lg:mt-5 w-16 lg:w-20 h-[3px] bg-[#DC2626] mx-auto" />
            <p className="mt-3 lg:mt-4 text-sm lg:text-base font-mono tracking-[0.2em] text-[#9CA3AF] uppercase">
              Fullstack · AI · Automation
            </p>
          </div>
        </div>

        {/* — RIGHT COLUMN: Lore + List — */}
        <div className="lg:border-l border-t lg:border-t-0 border-[#333333] px-6 lg:px-10 pb-8 lg:pb-12 pt-4 flex flex-col gap-8 lg:gap-10">
          {/* Description */}
          <p className="text-base font-mono text-[#9CA3AF] leading-relaxed">
            I transform complex problems into elegant software solutions. From fullstack applications to AI automation, I build systems that deliver real results.
          </p>

          {/* CTA */}
          <BracketButton href="/projects">[ VIEW PROJECTS ]</BracketButton>

          {/* Divider */}
          <div className="h-px bg-[#333333]" />

          {/* Roster list */}
          <div>
            <p className="text-sm lg:text-base font-mono tracking-[0.2em] text-[#9CA3AF] uppercase mb-4 lg:mb-5">Recent Projects</p>
            <div className="space-y-3 lg:space-y-4">
              {roster.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center gap-4 text-base lg:text-lg font-mono transition-colors duration-100 ${
                    item.active ? "text-[#FFFFFF]" : "text-[#9CA3AF]"
                  }`}
                >
                  {item.active ? (
                    <span className="text-[#DC2626] font-bold text-lg lg:text-xl">[</span>
                  ) : (
                    <span className="w-3.5 lg:w-4 h-3.5 lg:h-4 border border-[#333333] flex-shrink-0" />
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* —— Bottom bar —— */}
      <div className="border-t border-[#333333] px-6 lg:px-10 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <a href="https://github.com/kingtenison" target="_blank" rel="noopener noreferrer" className="text-sm lg:text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase font-semibold">[ GitHub ]</a>
          <a href="https://linkedin.com/in/kingtenison" target="_blank" rel="noopener noreferrer" className="text-sm lg:text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase font-semibold">[ LinkedIn ]</a>
          <a href="https://x.com/kingtenison" target="_blank" rel="noopener noreferrer" className="text-sm lg:text-base font-mono tracking-[0.15em] text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-100 uppercase font-semibold">[ X ]</a>
        </div>
        <div className="flex items-center gap-6 lg:gap-10">
          <span className="text-sm lg:text-base font-mono tracking-[0.15em] text-[#9CA3AF] uppercase animate-crosshair flex items-center gap-3 font-semibold">
            <span className="w-2.5 lg:w-3 h-2.5 lg:h-3 bg-[#DC2626]" />
            Available Now
          </span>
          <BracketButton href="/contact" primary>
            [ CONTACT ]
          </BracketButton>
        </div>
      </div>
    </section>
  );
}
