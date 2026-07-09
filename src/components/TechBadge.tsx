"use client";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiPython,
  SiOpenai,
  SiYoutube,
  SiVercel,
  SiTailwindcss,
  SiGraphql,
  SiNginx,
  SiLinux,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiFigma,
  SiPostman,
  SiVscodium,
  SiZapier,
  SiElevenlabs,
  SiFfmpeg,
  SiNodered,
  SiN8N,
  SiRasa,
  SiDialogflow,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiLighthouse,
  SiStripe,
  SiGoogleanalytics,
  SiFramer
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// Mapping of tech names to react-icons components
const techIconMap: Record<string, IconType> = {
  // Core web technologies
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "GraphQL": SiGraphql,

  // Databases
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,

  // DevOps & Cloud
  "Docker": SiDocker,
  "AWS": FaAws,
  "Vercel": SiVercel,

  // Tools & Platforms
  "Git": SiGit,
  "GitHub": SiGithub,
  "Linux": SiLinux,
  "nginx": SiNginx,
  "Figma": SiFigma,
  "Postman": SiPostman,
  "VS Code": SiVscodium,
  "Lighthouse": SiLighthouse,
  "Stripe": SiStripe,
  "Google Analytics": SiGoogleanalytics,

  // AI/ML Stack
  "OpenAI": SiOpenai,
  "OpenAI GPT": SiOpenai,
  "OpenAI API": SiOpenai,
  "YouTube API": SiYoutube,
  "Python": SiPython,
  "TensorFlow": SiTensorflow,
  "PyTorch": SiPytorch,
  "Scikit-learn": SiScikitlearn,
  "Rasa": SiRasa,
  "Dialogflow": SiDialogflow,
  "ElevenLabs": SiElevenlabs,
  "FFmpeg": SiFfmpeg,
  "Node-RED": SiNodered,
  "n8n": SiN8N,
  "Zapier": SiZapier,
};

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function TechBadge({ name, size = "md" }: TechBadgeProps) {
  const IconComponent = techIconMap[name];

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 28;

   // If we have an official icon, render it
   if (IconComponent) {
     return (
       <div
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-start/5 border border-primary-start/10 rounded-full transition-all duration-300 hover:bg-primary-start/10 hover:border-primary-start/20 group text-primary-start group-hover:text-accent-teal/90"
       >
        <IconComponent
          className={`${sizeClasses[size]} transition-transform duration-300 group-hover:scale-110`}
          size={iconSize}
        />
        <span className={`${textSizeClasses[size]} font-medium`}>
          {name}
        </span>
      </div>
    );
  }

   // Fallback for technologies without icons
   return (
     <span
       className={`inline-block px-3 py-1.5 bg-primary-start/10 text-primary-start ${textSizeClasses[size]} rounded-full border border-primary-start/20 font-medium`}
     >
      {name}
    </span>
  );
}
