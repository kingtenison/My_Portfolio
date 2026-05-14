"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useChatContext } from "./ChatKnowledge";
import { Message } from "./ChatTypes";
import { v4 as uuid } from "uuid";
import { knowledge } from "./ChatKnowledge";

type PromptType = "greeting" | "services" | "projects" | "skills" | "pricing" | "process" | "contact" | "testimonial" | "faq" | "availability" | "about" | "whatsapp" | "closing" | "smalltalk" | "direct_whatsapp" | "direct_email" | "website_price" | "webapp_price";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { context, setContext, incrementInquiries, resetContext } = useChatContext();

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getQuickReplies = useCallback((): string[] | null => {
    switch (context.state) {
      case "greeting":
        return ["Tell me about yourself", "What services do you offer?", "Show me projects", "Pricing info"];
      case "general":
        return ["Your skills", "How can I hire you?", "Book a call", "Send WhatsApp"];
      case "scheduling":
        return ["Skip, just email me", "View calendar"];
      case "company_interest":
        return ["Skip, let's continue", "Just schedule a call"];
      default:
        return ["Yes", "No", "Tell me more", "Another question"];
    }
  }, [context.state]);

  const showProjectCarousel = useCallback(() => {
    const carouselMsg: Message = {
      id: uuid(),
      text: "Here are some of my featured projects. Click the arrows to browse:",
      sender: "bot",
      timestamp: new Date(),
      type: "carousel",
      data: knowledge.projects
    };
    setMessages(prev => [...prev, carouselMsg]);
  }, []);

  const simulateWhatsApp = useCallback((msg: string) => {
    console.log(`%c📱 WhatsApp → +233535292708: ${msg}`, "color:#25D366;font-weight:bold;");
  }, []);

  const generateResponse = useCallback((input: string): { text: string; quickReplies?: string[]; type?: PromptType } => {
    const lower = input.toLowerCase().trim();

    const responses: Record<PromptType, () => { text: string; quickReplies?: string[]; type?: PromptType }> = {
      greeting: () => {
        const time = new Date().getHours();
        let timeGreeting = "Good morning";
        if (time >= 12) timeGreeting = "Good afternoon";
        if (time >= 18) timeGreeting = "Good evening";

        // Check if input includes time-based greeting
        if (/good (morning|afternoon|evening)/i.test(lower)) {
          return {
            text: `${timeGreeting}! 👋 I'm ${knowledge.name}'s virtual assistant. How can I help you today?`,
            quickReplies: ["About Hansen", "View projects", "Pricing", "Contact info"],
            type: "greeting"
          };
        }

        return {
          text: `Hey there! 👋 I'm ${knowledge.name}'s virtual assistant — your personal concierge to this portfolio. 🤖\n\nI can:\n\n📋 Showcase projects & skills\n💬 Answer any questions about Hansen\n📅 Schedule consultations\n📱 WhatsApp you information\n💰 Discuss pricing & timelines\n🧠 Deep-dive into tech details\n\nWhat interests you today?`,
          quickReplies: ["About Hansen", "View projects", "Pricing", "Contact info"],
          type: "greeting"
        };
      },

      services: () => ({
        text: `**Services I Provide:**\n\n${knowledge.services.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\nWhich service are you interested in? I can provide examples and case studies.`,
        quickReplies: ["Web development", "AI/Automation", "Consulting", "All services"],
        type: "services"
      }),

      projects: () => {
        showProjectCarousel();
        return {
          text: "Here's a selection of my best work. Which would you like to explore?\n\n🏥 Hospital Management System\n🔒 Escrow Marketplace\n🍔 Restaurant Ordering Platform\n🔗 Link Shortener\n🔄 File Converter\n🤖 AI Chatbot",
          quickReplies: ["Hospital System", "Escrow Platform", "Restaurant OS", "AI Chatbot"],
          type: "projects"
        };
      },

      skills: () => ({
        text: `**Technical Expertise:**\n\n**Frontend:** ${knowledge.skills.frontend.join(' • ')}\n\n**Backend:** ${knowledge.skills.backend.join(' • ')}\n\n**AI/ML:** ${knowledge.skills.ai.join(' • ')}\n\n**DevOps:** ${knowledge.skills.devops.join(' • ')}\n\nAsk me about any specific technology!`,
        quickReplies: ["React/Next.js details", "Python/AI projects", "DevOps examples", "All projects"],
        type: "skills"
      }),

      pricing: () => ({
        text: `**Investment Ranges:**\n\n🔹 **Small** (landing pages, tools): ${knowledge.pricing.small.range}\nExamples: ${knowledge.pricing.small.examples.join(', ')}\n\n🔸 **Medium** (web apps, dashboards): ${knowledge.pricing.medium.range}\nExamples: ${knowledge.pricing.medium.examples.join(', ')}\n\n🔶 **Large** (SaaS, AI systems): ${knowledge.pricing.large.range}\n\n⏱️ **Hourly:** ${knowledge.pricing.hourly}\n\nWant a custom quote for your project? Tell me what you're building!`,
        quickReplies: ["Get exact quote", "Payment terms", "Schedule to discuss"],
        type: "pricing"
      }),

      process: () => ({
        text: `**My Process:**\n\n${knowledge.process.map((step, i) => `${i+1}. ${step}`).join('\n')}\n\nTimelines: Small (1–2w), Medium (3–4w), Large (2–3mo)\n\nReady? Let's schedule a call!`,
        quickReplies: ["Book now", "See calendar", "Later"],
        type: "process"
      }),

      contact: () => ({
        text: `**Contact ${knowledge.name}:**\n\n✉️ Email: ${knowledge.contact.email}\n📱 Phone: ${knowledge.contact.phone}\n💬 WhatsApp: ${knowledge.contact.whatsapp} ⭐ Fastest\n💼 LinkedIn: ${knowledge.contact.linkedin}\n🐙 GitHub: ${knowledge.contact.github}\n📍 ${knowledge.contact.location}\n\nWould you like me to **send a WhatsApp message** with my portfolio?`,
        quickReplies: ["Yes, WhatsApp me!", "Send email", "Just links", "Schedule call"],
        type: "contact"
      }),

      availability: () => ({
        text: `**Status:** ${knowledge.availability.status.replace('_', ' ')}\n\n${knowledge.availability.next_available}\n\n${knowledge.responseTime}\n\nBook: ${knowledge.contact.calenderly}`,
        quickReplies: ["Book now", "Check later", "Send availability"],
        type: "availability"
      }),

      about: () => ({
        text: knowledge.about,
        quickReplies: ["Experience details", "Current availability", "Why hire me?", "Schedule interview"],
        type: "about"
      }),

      smalltalk: () => {
        const responses = [
          "I'm doing great, thanks for asking! Ready to help you with anything portfolio-related. 😊",
          "All good here! What can I do for you today?",
          "Great! I'm here to assist — ask me anything about Hansen's work or services.",
          "Fantastic! Let's dive into your project needs. What are you looking for?"
        ];
        const random = responses[Math.floor(Math.random() * responses.length)];
        return { text: random, quickReplies: ["Projects", "Pricing", "Contact"], type: "smalltalk" as PromptType };
      },

      direct_whatsapp: () => ({
        text: `📱 **WhatsApp:** ${knowledge.contact.whatsapp}\n\nI usually respond within minutes on WhatsApp! Feel free to message me anytime. ${knowledge.responseTime}\n\nWant me to send you an intro message now?`,
        quickReplies: ["Yes, send intro", "Maybe later", "Email instead"],
        type: "whatsapp"
      }),

      direct_email: () => ({
        text: `✉️ **Email:** ${knowledge.contact.email}\n\nI check email frequently and respond within 1 hour during business hours (Mon–Fri, 9am–6pm GMT).\n\nAlternatively, WhatsApp me at ${knowledge.contact.whatsapp} for faster response!`,
        quickReplies: ["Also WhatsApp me", "Schedule call", "View pricing"],
        type: "contact"
      }),

      website_price: () => ({
        text: `**Website Pricing:**\n\n🟢 **Basic/Landing Page** — $500–$1,500 (1–2 weeks)\n🟡 **Business Website** — $1,500–$3,000 (2–3 weeks)\n🔵 **Web Application** — $2,000–$10,000+ (3–6 weeks)\n\nAll sites are responsive, SEO-friendly, and built with modern tech (React/Next.js).\n\nWant a precise quote? Tell me about your project!`,
        quickReplies: ["Get exact quote", "See payment terms", "Schedule consultation"],
        type: "pricing"
      }),

      webapp_price: () => ({
        text: `**Web App Pricing:**\n\n⚡ **Simple App** (MVP, few features): $2,000–$5,000 (3–4w)\n🎯 **Medium App** (dashboard, integrations): $5,000–$15,000 (4–8w)\n🚀 **Complex App** (real-time, AI, multi-user): $15,000–$50,000+ (2–4mo)\n\nI also offer hourly rate: ${knowledge.pricing.hourly} for ongoing work.\n\nReady to scope your idea? Let's talk!`,
        quickReplies: ["Schedule a call", "Send requirements", "View process"],
        type: "pricing"
      }),

      whatsapp: () => ({
        text: `📲 **WhatsApp introduction queued!**\n\nI'll send you:\n• Brief intro\n• Portfolio highlights\n• Availability\n• Contact links\n\n**To:** ${knowledge.contact.whatsapp}\n\n*Demo: Check browser console for simulated notification.*`,
        quickReplies: ["Also email me", "Schedule a call", "Ask something else"],
        type: "whatsapp"
      }),

      testimonial: () => {
        const t = knowledge.testimonials[Math.floor(Math.random() * knowledge.testimonials.length)];
        return {
          text: `"${t.quote}"\n\n— ${t.name}, ${t.role}`,
          quickReplies: ["Another testimonial", "View projects", "Contact info"],
          type: "testimonial"
        };
      },

      faq: () => {
        const q = knowledge.faq[Math.floor(Math.random() * knowledge.faq.length)];
        return {
          text: `**Q:** ${q.q}\n\n**A:** ${q.a}`,
          quickReplies: ["Another FAQ", "Contact directly", "Pricing", "Process"],
          type: "faq"
        };
      },

      closing: () => ({
        text: `I'm here to help! Try asking about:\n• Projects\n• Pricing\n• Process\n• Tech stack\n• Booking a call`,
        quickReplies: ["Projects", "Pricing", "Booking", "Skills"],
        type: "closing"
      })
    };

    // Keyword routing — more specific first
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(lower)) return responses.greeting();
    if (/(how are you|how's it going|what's up|sup|yo|what is happening)/i.test(lower)) return responses.smalltalk();
    if (/(what('s| is) your name|who are you)/i.test(lower)) return {
      text: `I'm the virtual assistant for ${knowledge.name}. You can just call me Assistant! 🤖 How can I help you today?`,
      quickReplies: ["About Hansen", "View projects", "Pricing"],
      type: "about"
    };
    if (/(whatsapp number|what's your whatsapp|send whatsapp)/i.test(lower)) return responses.direct_whatsapp();
    if (/(email address|what's your email|your email|send email)/i.test(lower)) return responses.direct_email();
    if (/(how much for a (simple )?website|price for website|cost for website|website pricing)/i.test(lower)) return responses.website_price();
    if (/(how much for a (web )?app|price for app|cost for app|web app pricing|pricing for app)/i.test(lower)) return responses.webapp_price();
    if (/^(about|who is|tell me about|bio)/i.test(lower)) return responses.about();
    if (/(skill|tech|stack|experience|expertise)/i.test(lower)) return responses.skills();
    if (/(service|offer|provide)/i.test(lower)) return responses.services();
    if (/(project|portfolio|work|case|show)/i.test(lower)) return responses.projects();
    if (/(price|cost|rate|budget|quote)/i.test(lower)) return responses.pricing();
    if (/(process|timeline|steps)/i.test(lower)) return responses.process();
    if (/(contact|phone|reach|hire)/i.test(lower)) return responses.contact();
    if (/(availability|when|available)/i.test(lower)) return responses.availability();
    if (/(testimonial|review|client)/i.test(lower)) return responses.testimonial();
    if (/(whatsapp|message|text|ping)/i.test(lower)) return responses.whatsapp();
    if (/(appointment|schedule|book|meeting)/i.test(lower)) return responses.closing();
    if (/(thank|thanks)/i.test(lower)) return { text: "You're welcome! Anything else I can help with?", quickReplies: ["Projects", "Pricing", "Contact"], type: "closing" };
    if (/react|next\.js|vue|node|python/i.test(lower)) {
      const tech = lower.match(/react|next\.js|vue|node|python/)?.[0] || "tech";
      return {
        text: `${tech} is one of my core strengths! I've built multiple production apps with ${tech}. Want to see examples?`,
        quickReplies: ["Show React projects", "Show Node.js projects", "Show Python/AI projects"],
        type: "skills"
      };
    }

    // FAQ match
    for (const q of knowledge.faq) {
      if (q.q.toLowerCase().split(' ').some(word => lower.includes(word))) {
        return {
          text: q.a,
          quickReplies: ["Another question", "Contact me", "View pricing"],
          type: "faq"
        };
      }
    }

    return {
      text: `That's a great question! While I gather my thoughts, here's what I can help with:\n\n• **Projects** — see my portfolio\n• **Pricing** — get estimates\n• **Process** — how I work\n• **Contact** — get in touch\n\nOr rephrase and I'll give it my best!`,
      quickReplies: ["Projects", "Pricing", "Process", "Contact"],
      type: "closing"
    };
  }, [showProjectCarousel]);

  const simulateTyping = useCallback((text: string): number => {
    return Math.min(400 + text.length * 15, 2000);
  }, []);

  const sendUserMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: uuid(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    incrementInquiries();
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 300 + Math.random() * 400));

    const { text: response, quickReplies, type } = generateResponse(text);
    const typingDuration = simulateTyping(response);
    await new Promise(r => setTimeout(r, 100));

    const botMsg: Message = {
      id: uuid(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
      data: quickReplies ? { quickReplies } : undefined,
      type
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
    setContext({ state: "general", lastTopic: type });

    if (/(whatsapp|message|text)/i.test(text)) {
      simulateWhatsApp(`Hi! I'm ${knowledge.name}. You requested info via chatbot. Services: ${knowledge.services.slice(0,3).join(', ')}. WhatsApp: ${knowledge.contact.whatsapp}`);
    }
  }, [generateResponse, incrementInquiries, simulateWhatsApp, simulateTyping, setContext]);

  const handleQuickReply = useCallback((reply: string) => {
    sendUserMessage(reply);
  }, [sendUserMessage]);

  // Auto greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        const { text, quickReplies } = generateResponse("hello");
        const greeting: Message = {
          id: uuid(),
          text,
          sender: "bot",
          timestamp: new Date(),
          data: quickReplies ? { quickReplies } : undefined,
          type: "greeting"
        };
        setMessages([greeting]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, generateResponse]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetContext();
      setMessages([]);
    }, 300);
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            onSendMessage={sendUserMessage}
            onQuickReply={handleQuickReply}
            onClose={handleClose}
            getQuickReplies={(msg) => {
              const data = msg.data as { quickReplies?: string[] } | undefined;
              return data?.quickReplies ?? null;
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
