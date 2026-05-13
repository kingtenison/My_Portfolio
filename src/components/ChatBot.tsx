"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

const intentPatterns = {
  greeting: /(hi|hello|hey|greetings)/i,
  about: /(about|bio|background)/i,
  skills: /(skills?|tech stack)/i,
  projects: /(projects?|work|portfolio)/i,
  contact: /(contact|email|phone|hire)/i,
  resume: /(resume|cv)/i,
  location: /(location|where|based)/i,
  social: /(github|linkedin)/i,
  help: /(help)/i,
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "" });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const portfolioData = useMemo(() => ({
    name: "Hansen Addy Joy",
    email: "kingtenison@gmail.com",
    phone: "+233 53 529 2708",
    github: "https://github.com/kingtenison",
    linkedin: "https://linkedin.com/in/hansenjoy",
    resumeUrl: "/resume.pdf",
    calenderlyUrl: "https://calendly.com/your-link",
    about: "Fullstack Engineer & AI Automation Specialist with 5+ years experience.",
    skills: { frontend: ["React"], backend: ["Node.js"], ai: ["OpenAI"] },
    projects: [
      { id: "hospital", title: "Hospital System", image: "/projects/hospital.jpg", url: "https://frontend-nu-lovat-79.vercel.app/" },
      { id: "escrow", title: "Escrow Marketplace", image: "/projects/escrow.jpg", url: "https://escrow-tan.vercel.app/" },
      { id: "restaurant", title: "Restaurant Platform", image: "/projects/restaurant.jpg", url: "https://fable-os.vercel.app/" },
      { id: "link", title: "Link Shortener", image: "/projects/link-shortener.jpg", url: "https://link-platform-two.vercel.app/" },
      { id: "converter", title: "File Converter", image: "/projects/file-converter.jpg", url: "https://fileforge-iota.vercel.app" }
    ]
  }), []);

  const sendBotMessage = useCallback((text: string, type?: Message["type"], data?: any) => {
    const botMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      type,
      data
    };
    setMessages(prev => [...prev, botMsg]);
  }, []);

  const processUserMessage = useCallback(async (input: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 400));
    const lowerInput = input.toLowerCase();

    if (showLeadForm) {
      const step = leadData.name ? (leadData.email ? "done" : "email") : "name";
      if (step === "name") {
        setLeadData(prev => ({ ...prev, name: input }));
        sendBotMessage("Email?");
      } else {
        setLeadData(prev => ({ ...prev, email: input }));
        sendBotMessage(`Thanks! I'll contact you at ${input}.`);
      }
      setIsTyping(false);
      return;
    }

    if (intentPatterns.greeting.test(lowerInput)) {
      sendBotMessage(`Hi! I'm ${portfolioData.name}'s assistant.`);
    } else if (intentPatterns.about.test(lowerInput)) {
      sendBotMessage(`${portfolioData.name} - ${portfolioData.about}`);
    } else if (intentPatterns.skills.test(lowerInput)) {
      sendBotMessage(`Skills: ${portfolioData.skills.frontend.join(", ")} · ${portfolioData.skills.backend.join(", ")}`);
    } else if (intentPatterns.projects.test(lowerInput)) {
      sendBotMessage("Projects:", "carousel", portfolioData.projects);
    } else if (intentPatterns.contact.test(lowerInput) || lowerInput.includes("hire")) {
      sendBotMessage(`Email: ${portfolioData.email}\nPhone: ${portfolioData.phone}\nSchedule: ${portfolioData.calenderlyUrl}`, "quick-replies", ["Yes", "No"]);
    } else if (intentPatterns.resume.test(lowerInput)) {
      sendBotMessage(`Resume: ${portfolioData.resumeUrl}`);
    } else if (intentPatterns.social.test(lowerInput)) {
      sendBotMessage(`GitHub: ${portfolioData.github}\nLinkedIn: ${portfolioData.linkedin}`);
    } else if (intentPatterns.help.test(lowerInput)) {
      sendBotMessage("Ask: About, Skills, Projects, Contact, Resume.");
    } else {
      sendBotMessage("Type 'help' for options.");
    }

    setIsTyping(false);
  }, [portfolioData, showLeadForm, sendBotMessage, leadData]);

  const sendUserMessage = useCallback((text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    processUserMessage(text);
  }, [processUserMessage]);

  const handleQuickReply = useCallback((reply: string) => {
    sendUserMessage(reply);
  }, [sendUserMessage]);

  // Auto-greeting after chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        sendBotMessage(`Hi! I'm ${portfolioData.name}'s assistant.`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, portfolioData.name, sendBotMessage]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            getQuickReplies={(msg) => msg.data?.quickReplies || null}
          />
        )}
      </AnimatePresence>
    </>
  );
}
