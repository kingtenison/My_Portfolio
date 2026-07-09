"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Project } from "./ChatTypes";

interface KnowledgeBase {
  about: string;
  title: string;
  name: string;
  skills: {
    frontend: string[];
    backend: string[];
    ai: string[];
    devops: string[];
    mobile: string[];
    design: string[];
  };
  services: string[];
  projects: Project[];
  experience: string;
  responseTime: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    github: string;
    linkedin: string;
    calenderly: string;
  };
  pricing: {
    small: { range: string; examples: string[] };
    medium: { range: string; examples: string[] };
    large: { range: string; examples: string[] };
    hourly: string;
  };
  process: string[];
  testimonials: Array<{ name: string; role: string; quote: string }>;
  faq: Array<{ q: string; a: string }>;
  availability: {
    status: "available" | "busy" | "open_for_work";
    next_available: string;
  };
}

export const knowledge: KnowledgeBase = {
  name: "Hansen Addy Joy",
  title: "Fullstack Engineer & AI Automation Specialist",
  about: "I'm a passionate developer with 5+ years of experience building scalable web applications, intelligent automation systems, and AI-powered solutions. I've delivered 50+ successful projects across healthcare, fintech, e-commerce, and more. My focus is on creating elegant, performant systems that solve real business problems.",
  skills: {
    frontend: [
      "React / Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Framer Motion",
      "HTML5/CSS3", "Redux/Zustand", "GraphQL (Apollo, Relay)"
    ],
    backend: [
      "Node.js (Express, Fastify)", "Python (Django, FastAPI, Flask)",
      "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL", "WebSockets"
    ],
    ai: [
      "OpenAI GPT Integration", "Computer Vision (OpenCV, TensorFlow)",
      "NLP & Text Processing", "Machine Learning (scikit-learn)",
      "Automation (Zapier, Make, custom bots)", "Predictive Analytics"
    ],
    devops: [
      "Docker & Kubernetes", "AWS (EC2, S3, Lambda, RDS)",
      "CI/CD (GitHub Actions, Jenkins)", "Vercel/Netlify deployments",
      "Linux/Unix systems", "Terraform (infrastructure as code)"
    ],
    mobile: ["React Native", "Flutter (basic)", "PWA development"],
    design: ["Figma", "Adobe XD", "Prototyping", "UI/UX principles", "Responsive design"]
  },
  services: [
    "Full-stack Web & Mobile App Development",
    "AI & Machine Learning Solutions",
    "Business Process Automation",
    "API Development & Third-party Integrations",
    "Database Architecture & Optimization",
    "Performance Audits & Optimization",
    "DevOps & Cloud Infrastructure",
    "Technical Consulting & Code Reviews"
  ],
  projects: [
    {
      id: "hospital",
      title: "Hospital Management System",
      description: "Complete digital transformation for dental clinic — appointment scheduling, patient records, e-prescriptions, billing, insurance claims. Reduced administrative overhead by 60%.",
      image: "/projects/hospital.jpg",
      url: "https://frontend-nu-lovat-79.vercel.app/",
      tags: ["Healthcare", "React", "Node.js", "PostgreSQL", "HIPAA"],
      longDescription: "A comprehensive hospital management solution featuring real-time bed tracking, telemedicine integration, automated billing, and regulatory compliance (HIPAA)."
    },
    {
      id: "escrow",
      title: "Escrow Marketplace",
      description: "Secure escrow payment platform for high-value transactions with dispute resolution, multi-party payouts, and escrow release logic. Processed $2M+ in transactions.",
      image: "/projects/escrow.jpg",
      url: "https://escrow-tan.vercel.app/",
      tags: ["Fintech", "Escrow", "Security", "Stripe", "Legal"],
      longDescription: "End-to-end escrow solution with smart contract-inspired logic, multi-signature approvals, and escrow dispute resolution system."
    },
    {
      id: "restaurant",
      title: "Restaurant Ordering Platform",
      description: "Full-stack ordering system with real-time kitchen display, delivery tracking, inventory management, and customer loyalty program. Serves 50+ restaurants.",
      image: "/projects/restaurant.jpg",
      url: "https://fable-os.vercel.app/",
      tags: ["Food Tech", "React Native", "WebSockets", "Stripe"],
      longDescription: "Complete restaurant OS with POS integration, real-time order routing, driver tracking, and customer engagement features."
    },
    {
      id: "link",
      title: "Link Shortener Pro",
      description: "URL shortening service with custom domains, QR generation, click analytics, and UTM tracking. 100K+ links created.",
      image: "/projects/link-shortener.jpg",
      url: "https://link-platform-two.vercel.app/",
      tags: ["Tools", "Analytics", "API", "Redis"],
      longDescription: "Enterprise-grade link management with real-time analytics, geographic breakdowns, referral tracking, and custom branding."
    },
    {
      id: "converter",
      title: "File Converter Pro",
      description: "Multi-format file conversion tool supporting PDF, images, documents, and audio. Batch processing, cloud storage integration, 99.9% uptime.",
      image: "/projects/file-converter.jpg",
      url: "https://fileforge-iota.vercel.app",
      tags: ["Utilities", "File Processing", "Cloud", "FFmpeg"],
      longDescription: "Scalable file conversion microservice architecture with worker queues, format detection, and quality preservation."
    },
    {
      id: "ai-chatbot",
      title: "AI Customer Support Bot",
      description: "Intelligent chatbot for e-commerce support with RAG knowledge base, order lookup, and human handoff. Reduced support tickets by 40%.",
      image: "/projects/ai-chatbot.jpg",
      url: null,
      tags: ["AI", "NLP", "RAG", "Customer Support"],
      longDescription: "GPT-powered support bot with vector search, multi-language support, and seamless human escalation."
    }
  ],
  experience: "5+ years",
  responseTime: "Usually within 1 hour",
  availability: {
    status: "open_for_work",
    next_available: "Immediately for new projects"
  },
  contact: {
    email: "kingtenison@gmail.com",
    phone: "+233 53 529 2708",
    whatsapp: "+233535292708",
    location: "Accra, Ghana (Remote-friendly)",
    github: "https://github.com/kingtenison",
    linkedin: "https://linkedin.com/in/hansenjoy",
    calenderly: "https://calendly.com/hansen-joy"
  },
  pricing: {
    small: {
      range: "$500 — $2,000",
      examples: ["Landing page (1-2 weeks)", "Simple tool/utility (2-3w)", "API integration (1w)", "Bug fixes & enhancements"]
    },
    medium: {
      range: "$2,000 — $10,000",
      examples: ["Web app with dashboard (3-4w)", "E-commerce platform (4-6w)", "Admin panel + API (4w)", "Automation workflow (3w)"]
    },
    large: {
      range: "$10,000 — $50,000+",
      examples: ["SaaS platform (2-3 months)", "AI/ML integration (1-2 months)", "Enterprise system (3-6 months)", "Multi-platform suite"]
    },
    hourly: "$75 — $120/hour (depending on complexity)"
  },
  process: [
    "**Discovery Call** (30 min) - Understand your goals, requirements, timeline, budget",
    "**Proposal & Quote** (1-2 days) - Detailed scope, deliverables, timeline, milestones",
    "**Design & Prototyping** (if needed) - Wireframes, UI mockups, user flows",
    "**Development** - Weekly updates, sprint demos, transparent communication",
    "**Testing & QA** - Unit, integration, E2E testing; cross-browser/device checks",
    "**Launch & Handoff** - Production deployment, documentation, training",
    "**Post-launch Support** - 30 days bug fixes, optional maintenance retainer"
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      role: "CEO, HealthTech Startup",
      quote: "Hansen built our entire patient portal from scratch. The attention to detail and security compliance was exceptional. Highly recommend!"
    },
    {
      name: "Marcus Okonkwo",
      role: "Founder, FinLink",
      quote: "The escrow system Hansen delivered saved us months of development. His understanding of fintech security is top-notch."
    },
    {
      name: "Elena Petrova",
      role: "Product Manager, FoodTech Co",
      quote: "Restaurant platform exceeded expectations. Real-time tracking worked flawlessly. Hansen is a true professional."
    }
  ],
  faq: [
    { q: "What's your typical availability?", a: "I'm currently accepting new projects. Start date: 1-2 weeks from agreement." },
    { q: "Do you work remotely?", a: "Yes, fully remote. I work with clients globally, across timezones." },
    { q: "Can you see examples of code?", a: "Yes, my GitHub (github.com/kingtenison) has open-source projects and personal code samples." },
    { q: "Payment structure?", a: "50% upfront, 50% on delivery. Milestone payments for larger projects." },
    { q: "Maintenance after launch?", a: "Yes - 30-day bug fix window included. Ongoing maintenance retainers available." },
    { q: "Integrate with existing systems?", a: "Absolutely. I specialize in API integrations and legacy system modernization." },
    { q: "WhatsApp number?", a: "+233535292708 - I usually reply within minutes!" },
    { q: "Email address?", a: "kingtenison@gmail.com - I respond within 1 hour during business hours." },
    { q: "How much for a simple website?", a: "Basic sites start at $500-$1,500 depending on features. Want a precise quote?" },
    { q: "How much for a web app?", a: "Complex web apps: $2,000-$10,000+ based on scope. Tell me about your project." },
    { q: "Fixed price or hourly?", a: "Both! Fixed for well-defined scope, hourly ($75-$120) for ongoing/uncertain work." },
    { q: "How long for a website?", a: "Simple: 1-2 weeks. Medium: 3-4 weeks. Large: 2-3 months." }
  ]
};

interface ConversationContext {
  state: "greeting" | "general" | "scheduling" | "company_interest" | "pricing_discussion" | "project_deepdive" | "closing";
  step?: string;
  data: Record<string, string>;
  inquiries: number;
  lastTopic?: string;
}

interface SmartChatContextType {
  context: ConversationContext;
  setContext: (ctx: Partial<ConversationContext>) => void;
  resetContext: () => void;
  incrementInquiries: () => void;
}

const ChatContext = createContext<SmartChatContextType | null>(null);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [context, setContextState] = useState<ConversationContext>({
    state: "greeting",
    data: {},
    inquiries: 0
  });

  const setContext = useCallback((updates: Partial<ConversationContext>) => {
    setContextState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetContext = useCallback(() => {
    setContextState({ state: "greeting", data: {}, inquiries: 0 });
  }, []);

  const incrementInquiries = useCallback(() => {
    setContextState(prev => ({ ...prev, inquiries: prev.inquiries + 1 }));
  }, []);

  return (
    <ChatContext.Provider value={{ context, setContext, resetContext, incrementInquiries }}>
      {children}
    </ChatContext.Provider>
  );
}
