"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "carousel" | "quick-replies" | "form";
  data?: any;
}

export interface QuickReply {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

// Portfolio data for the bot
export const portfolioData = {
  name: "Hansen Addy Joy",
  title: "Fullstack Engineer & AI Automation Specialist",
  location: "Accra, Ghana",
  email: "kingtenison@gmail.com",
  phone: "+233 53 529 2708",
  github: "https://github.com/kingtenison",
  linkedin: "https://linkedin.com/in/hansenjoy",
  resumeUrl: "/resume.pdf", // You should add your actual resume
  calenderlyUrl: "https://calendly.com/your-link", // Add your Calendly
  about: "With over 5+ years of experience, I specialize in building innovative software solutions that solve real-world problems. From hospital management systems to AI-powered automation, I create solutions that drive measurable business results. I'm passionate about clean code, user experience, and delivering projects that exceed expectations.",
  
  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive Design"],
    backend: ["Node.js", "Express.js", "RESTful API Design", "Authentication"],
    databases: ["MongoDB", "Database Architecture", "Query Optimisation"],
    aiAutomation: ["OpenAI API", "LLM Integration", "Workflow Automation", "YouTube Data API"],
    design: ["UI/UX Design", "Figma", "Conversion Optimisation"],
    tools: ["Git & GitHub", "Postman", "Python", "C#", "C++"]
  },
  
  projects: [
    {
      id: "hospital-management",
      title: "Hospital Management System",
      description: "Complete HMS with patient records, appointment booking, staff management, and reporting dashboards.",
      image: "/projects/hospital.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      url: "https://frontend-nu-lovat-79.vercel.app/"
    },
    {
      id: "escrow-marketplace",
      title: "Escrow Marketplace Platform",
      description: "Secure buyer-seller transaction platform with multi-step fund holding and automated release.",
      image: "/projects/escrow.jpg",
      tags: ["React", "Node.js", "Payment Gateway"],
      url: "https://escrow-tan.vercel.app/"
    },
     {
       id: "restaurant-platform",
       title: "Restaurant Ordering Platform",
       description: "Fully-featured restaurant website with online ordering, table reservations, menu management, and integrated payment processing.",
       image: "/projects/restaurant.jpg",
       tags: ["React", "Node.js", "MongoDB", "Stripe"],
       url: "https://fable-os.vercel.app/"
     },
    {
      id: "link-shortener",
      title: "Link Shortener Platform",
      description: "URL shortener with custom aliases, real-time analytics, QR codes, and expiry controls.",
      image: "/projects/link-shortener.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      url: "https://link-platform-two.vercel.app/dashboard"
    },
    {
      id: "file-converter",
      title: "File Converter Web App",
      description: "Multi-format file conversion with drag-and-drop UI, server-side processing, and instant download.",
      image: "/projects/file-converter.jpg",
      tags: ["React", "Node.js", "Serverside Processing"],
      url: "https://fileforge-iota.vercel.app"
    },
    {
      id: "pharmacy-redesign",
      title: "Pharmacy Website Redesign",
      description: "Improved navigation, product discoverability, mobile responsiveness, and checkout flow.",
      image: "/projects/pharmacy.jpg",
      tags: ["React", "Node.js", "SEO", "Conversion Optimisation"],
      url: "https://frontend-nu-lovat-79.vercel.app/"
    }
  ],
  
  faqs: [
    {
      question: "What is your experience?",
      answer: "I'm a Fullstack Engineer & AI Automation Specialist with over 5+ years of experience building production-grade systems across healthcare, finance, e-commerce, and content automation. I've delivered 50+ successful projects."
    },
    {
      question: "What technologies do you use?",
      answer: "I specialize in React, Node.js, Python, MongoDB, and AI/ML technologies like OpenAI API. I also have experience with cloud platforms, CI/CD, and modern DevOps practices."
    },
    {
      question: "Where are you located?",
      answer: "I'm based in Accra, Ghana, but I work remotely with clients worldwide. I'm open to both freelance and full-time opportunities."
    },
    {
      question: "What are your working hours?",
      answer: "I'm typically available Monday - Friday, 9 AM - 6 PM GMT. I'm flexible and can adjust to match your timezone for collaboration."
    },
    {
      question: "Do you work on freelance projects?",
      answer: "Yes! I'm always open to freelance and contract work. I can handle projects of any size - from MVPs to large-scale enterprise systems."
    },
    {
      question: "How can we schedule a call?",
      answer: "You can schedule a consultation directly through my Calendly link. I'd love to discuss your project requirements!"
    }
  ]
};

// Intent patterns for simple NLP
const intentPatterns = {
  greeting: /(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i,
  about: /(about|bio|background|who is|tell me about|introduce)/i,
  skills: /(skills?|tech stack|technologies|languages|what do you know|programming)/i,
  projects: /(projects?|work|portfolio|examples|showcase|built)/i,
  contact: /(contact|email|phone|reach|get in touch|hire|availability)/i,
  resume: /(resume|cv|curriculum vitae|download cv|see your cv)/i,
  location: /(location|where|based|city|country|remote)/i,
  availability: /(available|free|schedule|call|meeting|book)/i,
  pricing: /(price|cost|rate|budget|how much)/i,
  social: /(github|linkedin|social|profile)/i,
  help: /(help|support|assistance)/i,
  thanks: /(thanks|thank you|appreciate)/i,
  goodbye: /(bye|goodbye|see you|later)/i
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name?: string; interest?: string }>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", budget: "", timeline: "" });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-greeting after 3 seconds if chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        sendBotMessage(greetingMessage());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const greetingMessage = (): string => {
    const greetings = [
      `Hi there! 👋 I'm ${portfolioData.name}'s virtual assistant. How can I help you today?`,
      `Hello! Welcome to ${portfolioData.name}'s portfolio. I'm here to help you explore the work and skills.`,
      `Hey! 👋 I'm the virtual assistant for ${portfolioData.name}. Feel free to ask me anything!`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const sendBotMessage = (text: string, type: Message["type"] = "text", data?: any) => {
    const botMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      type,
      data
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const sendUserMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    processUserMessage(text);
  };

  const processUserMessage = async (input: string) => {
    setIsTyping(true);
    
    // Simulate bot thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    
    const lowerInput = input.toLowerCase();
    
    // Check for lead capture trigger
    if (showLeadForm) {
      handleLeadFormInput(input);
      return;
    }
    
    // Intent detection
    if (intentPatterns.greeting.test(lowerInput)) {
      sendBotMessage(greetingMessage());
      sendQuickReplies();
    }
    else if (intentPatterns.about.test(lowerInput) || lowerInput.includes("tell me more")) {
      sendBotMessage(
        `${portfolioData.name} is a ${portfolioData.title} based in ${portfolioData.location}. ` +
        `${portfolioData.about || "With over 5+ years of experience, I specialize in building innovative software solutions " +
        "that solve real-world problems. From hospital management systems to AI-powered automation, " +
        "I create solutions that drive measurable business results. I'm passionate about clean code, " +
        "user experience, and delivering projects that exceed expectations."}`
      );
      sendQuickReplies();
    }
    else if (intentPatterns.skills.test(lowerInput)) {
      const skillsText = `Here's my tech stack:\n\n` +
        `**Frontend:** ${portfolioData.skills.frontend.join(", ")}\n\n` +
        `**Backend:** ${portfolioData.skills.backend.join(", ")}\n\n` +
        `**Databases:** ${portfolioData.skills.databases.join(", ")}\n\n` +
        `**AI & Automation:** ${portfolioData.skills.aiAutomation.join(", ")}\n\n` +
        `**Design:** ${portfolioData.skills.design.join(", ")}\n\n` +
        `**Tools:** ${portfolioData.skills.tools.join(", ")}`;
      sendBotMessage(skillsText);
      sendQuickReplies();
    }
    else if (intentPatterns.projects.test(lowerInput)) {
      // Check for specific project type filtering
      const projectKeywords: Record<string, string[]> = {
        "mobile": ["hospital", "pharmacy"],
        "python": ["ai-automation", "hospital"],
        "react": ["hospital", "escrow", "link-shortener", "file-converter", "pharmacy"],
        "node": ["hospital", "escrow", "link-shortener", "file-converter", "pharmacy"],
        "ai": ["ai-automation"],
        "automation": ["ai-automation"],
        "ecommerce": ["pharmacy"],
        "web": ["hospital", "escrow", "link-shortener", "file-converter", "pharmacy"]
      };
      
      let filteredProjects = portfolioData.projects;
      for (const [keyword, matches] of Object.entries(projectKeywords)) {
        if (lowerInput.includes(keyword)) {
          filteredProjects = portfolioData.projects.filter(p => matches.includes(p.id));
          break;
        }
      }
      
      sendBotMessage("Here are some of my notable projects:", "carousel", filteredProjects);
    }
    else if (intentPatterns.contact.test(lowerInput) || 
             lowerInput.includes("hire") || 
             lowerInput.includes("work with")) {
      sendBotMessage(
        `Great! I'd love to hear about your project. ` +
        `You can reach me at:\n\n` +
        `📧 Email: ${portfolioData.email}\n` +
        `📱 Phone: ${portfolioData.phone}\n` +
        `🔗 Or schedule a call: [Book a Meeting](${portfolioData.calenderlyUrl})\n\n` +
        `Would you like me to collect your details so I can follow up?`,
        "quick-replies",
        ["Yes, collect my info", "Just show me the contact info"]
      );
    }
    else if (intentPatterns.resume.test(lowerInput)) {
      sendBotMessage(
        `You can download my resume here: [Download CV](${portfolioData.resumeUrl})\n\n` +
        `It includes detailed experience, education, and project history. Let me know if you need anything else!`
      );
      sendQuickReplies();
    }
    else if (intentPatterns.location.test(lowerInput)) {
      sendBotMessage(
        `I'm based in ${portfolioData.location}, but I work remotely with clients worldwide. ` +
        `I'm open to both freelance and full-time opportunities. Would you like to schedule a call to discuss your project?`,
        "quick-replies",
        ["Schedule a call", "See my projects first"]
      );
    }
    else if (intentPatterns.availability.test(lowerInput)) {
      sendBotMessage(
        `I'm currently available for new projects! My standard working hours are Monday - Friday, 9 AM - 6 PM GMT. ` +
        `You can book a free consultation here: [Book Now](${portfolioData.calenderlyUrl})`
      );
      sendQuickReplies();
    }
    else if (intentPatterns.pricing.test(lowerInput)) {
      sendBotMessage(
        `My rates vary depending on project scope and complexity. For a personalized quote, I'd need to understand your requirements better. ` +
        `Let's schedule a quick call to discuss! [Book a Meeting](${portfolioData.calenderlyUrl})`
      );
      sendQuickReplies();
    }
    else if (intentPatterns.social.test(lowerInput)) {
      sendBotMessage(
        `You can find me on:\n\n` +
        `🐙 GitHub: [github.com/kingtenison](${portfolioData.github})\n` +
        `💼 LinkedIn: [linkedin.com/in/hansenjoy](${portfolioData.linkedin})\n\n` +
        `Feel free to connect!`
      );
      sendQuickReplies();
    }
    else if (intentPatterns.thanks.test(lowerInput)) {
      sendBotMessage("You're welcome! Is there anything else I can help you with?");
      sendQuickReplies();
    }
    else if (intentPatterns.goodbye.test(lowerInput)) {
      sendBotMessage("Thank you for visiting! Feel free to reach out anytime. Have a great day! 👋");
    }
    else if (lowerInput.includes("collect") || lowerInput.includes("yes")) {
      setShowLeadForm(true);
      sendBotMessage("Great! Let me collect your details. What's your name?");
    }
    else if (lowerInput.includes("just show") || lowerInput.includes("no")) {
      sendBotMessage("No problem! Here are my contact details again:\n\n" +
        `📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n🔗 ${portfolioData.calenderlyUrl}`);
      sendQuickReplies();
    }
    else if (lowerInput.includes("help")) {
      sendBotMessage(
        "I can help you with:\n\n" +
        "• **About me** - My background and experience\n" +
        "• **Skills** - My technical proficiencies\n" +
        "• **Projects** - Show you my work (filter by tech stack)\n" +
        "• **Contact** - How to reach me\n" +
        "• **Resume** - Download my CV\n" +
        "• **Hire me** - Discuss your project\n\n" +
        "What would you like to know?"
      );
      sendQuickReplies();
    }
    else {
      // Unknown input - offer human fallback
      sendBotMessage(
        "I'm not sure I understand. I can help you with:\n\n" +
        "• My background & skills\n" +
        "• Viewing my projects\n" +
        "• Contact information\n" +
        "• Scheduling a call\n\n" +
        "Type 'help' for more options, or would you like to leave a message for me?"
      );
      sendQuickReplies(["Help", "Leave a message", "Email me"]);
    }
    
    setIsTyping(false);
  };

  const sendQuickReplies = (customReplies?: string[]) => {
    const defaultReplies = [
      "View My Projects",
      "See My Skills",
      "Contact Me",
      "Download Resume"
    ];
    const replies = customReplies || defaultReplies;
    
    // Store quick replies in the last message data
    setMessages(prev => {
      const updated = [...prev];
      const lastBotMsg = updated[updated.length - 1];
      if (lastBotMsg && lastBotMsg.sender === "bot") {
        lastBotMsg.data = { quickReplies: replies };
      }
      return updated;
    });
  };

  const handleLeadFormInput = (input: string) => {
    const step = leadData.name ? (leadData.email ? (leadData.budget ? "timeline" : "budget") : "email") : "name";
    
    if (step === "name") {
      setLeadData(prev => ({ ...prev, name: input }));
      sendBotMessage("Nice to meet you! What's your email address?");
    } else if (step === "email") {
      setLeadData(prev => ({ ...prev, email: input }));
      sendBotMessage("Great! What's your approximate project budget? (e.g., $5k-$10k, $10k-$25k, $25k+)");
    } else if (step === "budget") {
      setLeadData(prev => ({ ...prev, budget: input }));
      sendBotMessage("And what's your expected timeline? (e.g., 1-2 weeks, 1 month, 3+ months)");
    } else if (step === "timeline") {
      setLeadData(prev => ({ ...prev, timeline: input }));
      sendBotMessage(
        `Thank you! I've captured your details:\n\n` +
        `Name: ${leadData.name}\n` +
        `Email: ${leadData.email}\n` +
        `Budget: ${input}\n` +
        `Timeline: ${leadData.timeline}\n\n` +
        `I'll review this and get back to you within 24 hours. In the meantime, feel free to:\n` +
        `📧 Email me directly: ${portfolioData.email}\n` +
        `📅 Book a call: ${portfolioData.calenderlyUrl}\n\n` +
        `Is there anything else I can help you with?`
      );
      setShowLeadForm(false);
      // Here you would normally send lead data to your backend/CRM
      console.log("Lead captured:", { ...leadData, timeline: input });
      sendQuickReplies();
    }
  };

  const handleQuickReply = (reply: string) => {
    sendUserMessage(reply);
  };

  const getQuickRepliesFromMessage = (message: Message): string[] | null => {
    return message.data?.quickReplies || null;
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
            onSendMessage={(text) => {
              sendUserMessage(text);
              setInputValue("");
            }}
            onQuickReply={handleQuickReply}
            onClose={() => setIsOpen(false)}
            getQuickReplies={getQuickRepliesFromMessage}
            userInfo={userInfo}
          />
        )}
      </AnimatePresence>
    </>
  );
}
