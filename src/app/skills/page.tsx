"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Responsive & Mobile-First Design", level: 95 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful API Design", level: 90 },
      { name: "Authentication & Authorisation", level: 80 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Database Architecture", level: 80 },
      { name: "Schema Design", level: 85 },
      { name: "Query Optimisation", level: 80 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "OpenAI API", level: 85 },
      { name: "LLM Integration", level: 80 },
      { name: "Workflow Automation", level: 90 },
      { name: "YouTube Data API", level: 75 },
      { name: "Business Process Automation", level: 85 },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "UI/UX Design", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Graphic Design", level: 70 },
      { name: "Digital Illustration", level: 65 },
      { name: "Conversion Optimisation", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 85 },
      { name: "npm", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "IT Systems & Networking", level: 75 },
      { name: "Python", level: 70 },
      { name: "C#", level: 60 },
      { name: "C++", level: 60 },
      { name: "Flutter (foundational)", level: 50 },
      { name: "Unity", level: 50 },
    ],
  },
];

const Crosshair = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="absolute top-3 right-3 opacity-30"
  >
    <circle cx="8" cy="8" r="2" stroke="#DC2626" strokeWidth="1" />
    <line x1="8" y1="0" x2="8" y2="4" stroke="#DC2626" strokeWidth="0.8" />
    <line x1="8" y1="12" x2="8" y2="16" stroke="#DC2626" strokeWidth="0.8" />
    <line x1="0" y1="8" x2="4" y2="8" stroke="#DC2626" strokeWidth="0.8" />
    <line x1="12" y1="8" x2="16" y2="8" stroke="#DC2626" strokeWidth="0.8" />
  </svg>
);

const ChamferCard = motion.div;
const ChamferCert = motion.div;

export default function Skills() {
  return (
    <div className="min-h-screen bg-[#000000] px-6 lg:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className="inline-block px-3 py-1 font-mono text-[#DC2626] tracking-[0.15em] uppercase text-xs border border-[#DC2626] bg-[#DC2626]/10"
            style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
          >
            Expertise
          </span>
        </motion.div>

        <h1 className="font-serif text-[#FFFFFF] uppercase tracking-wide text-4xl sm:text-5xl mb-4">
          Technical Skills
        </h1>
          <p className="font-sans text-[#9CA3AF] text-lg max-w-3xl">
          A comprehensive toolkit spanning fullstack development, AI automation, and system engineering
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <ChamferCard
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="relative bg-[#F5F5F0] border border-[#E5E7EB] p-6"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <Crosshair />

            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[#DC2626] tracking-[0.15em] uppercase text-sm">
                // {category.title.toUpperCase()}
              </span>
              <span className="w-2 h-2 bg-[#4ADE80] inline-block" />
              <span className="font-mono text-[#4ADE80] tracking-[0.15em] uppercase text-[10px]">
                ONLINE
              </span>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-sans text-sm text-[#111827]">{skill.name}</span>
                    <motion.span
                      className="font-mono text-xs text-[#DC2626]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-2">
                    <motion.div
                      className="h-full bg-[#DC2626]"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </ChamferCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16"
      >
        <span className="font-mono text-[#DC2626] tracking-[0.15em] uppercase text-sm mb-8 block">
          // CERTIFICATIONS
        </span>

        <div className="flex flex-wrap gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="relative bg-[#F5F5F0] border border-[#E5E7EB] p-6 min-w-[260px]"
            style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
          >
            <Crosshair />
            <div className="flex items-center gap-3 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="square">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="w-2 h-2 bg-[#4ADE80] inline-block" />
              <span className="font-mono text-[#4ADE80] tracking-[0.15em] uppercase text-[10px]">
                VERIFIED
              </span>
            </div>
            <h3 className="font-serif text-[#111827] uppercase tracking-wide text-base mb-1">
              Google Junior Developer Certificate
            </h3>
            <p className="font-mono text-[#6B7280] text-xs tracking-[0.15em]">2022</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
