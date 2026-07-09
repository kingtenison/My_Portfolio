"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useChatContext } from "./ChatKnowledge";
import { Message } from "./ChatTypes";
import { v4 as uuid } from "uuid";
import { knowledge } from "./ChatKnowledge";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setContext, incrementInquiries, resetContext } = useChatContext();
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const showProjectCarousel = useCallback(() => {
    const carouselMsg: Message = {
      id: uuid(),
      text: "Here are some of my featured projects:",
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

  const shouldShowCarousel = (text: string): boolean => {
    const lower = text.toLowerCase();
    return /project|portfolio|work|cases|show/i.test(lower) && !historyRef.current.some(h => h.content.includes("show project carousel"));
  };

  const shouldSimulateWhatsApp = (text: string): boolean => {
    return /whatsapp/i.test(text) && !historyRef.current.some(h => h.content.includes("whatsapp simulated"));
  };

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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: historyRef.current.slice(-20),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      historyRef.current.push({ role: "user", content: text.trim() });
      historyRef.current.push({ role: "assistant", content: data.text });

      const botMsg: Message = {
        id: uuid(),
        text: data.text,
        sender: "bot",
        timestamp: new Date(),
        data: { quickReplies: data.quickReplies },
        type: "text",
      };

      setMessages(prev => [...prev, botMsg]);
      setContext({ state: "general", lastTopic: "text" });

      if (shouldShowCarousel(data.text)) {
        setTimeout(() => showProjectCarousel(), 500);
      }

      if (shouldSimulateWhatsApp(data.text)) {
        simulateWhatsApp(`Hi! This is ${knowledge.name}'s assistant. You requested info via the portfolio chatbot.`);
      }
    } catch {
      const fallback: Message = {
        id: uuid(),
        text: "Sorry, I'm having trouble connecting. Please try again or contact Hansen directly at kingtenison@gmail.com",
        sender: "bot",
        timestamp: new Date(),
        data: { quickReplies: ["Try again", "Contact via email", "WhatsApp"] },
      };
      setMessages(prev => [...prev, fallback]);
    }

    setIsTyping(false);
  }, [incrementInquiries, setContext, showProjectCarousel, simulateWhatsApp]);

  const handleQuickReply = useCallback((reply: string) => {
    sendUserMessage(reply);
  }, [sendUserMessage]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(async () => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "hello", history: [] }),
          });
          if (!res.ok) throw new Error("API error");
          const data = await res.json();
          historyRef.current.push({ role: "assistant", content: data.text });
          const greeting: Message = {
            id: uuid(),
            text: data.text,
            sender: "bot",
            timestamp: new Date(),
            data: { quickReplies: data.quickReplies },
            type: "greeting",
          };
          setMessages([greeting]);
        } catch {
          const fallback: Message = {
            id: uuid(),
            text: `Hey there! I'm ${knowledge.name}'s virtual assistant. Ask me about projects, skills, or anything portfolio-related!`,
            sender: "bot",
            timestamp: new Date(),
            data: { quickReplies: ["About Hansen", "View projects", "Pricing", "Contact info"] },
            type: "greeting",
          };
          setMessages([fallback]);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetContext();
      setMessages([]);
      historyRef.current = [];
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
              const d = msg.data as { quickReplies?: string[] } | undefined;
              return d?.quickReplies ?? null;
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
