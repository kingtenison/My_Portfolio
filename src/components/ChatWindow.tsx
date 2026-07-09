"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message, Project } from "./ChatTypes";
import ReactMarkdown from "react-markdown";

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onQuickReply: (reply: string) => void;
  onClose: () => void;
  getQuickReplies: (message: Message) => string[] | null;
}

export default function ChatWindow({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  onSendMessage,
  onQuickReply,
  onClose,
  getQuickReplies
}: ChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useRef(false);

  useEffect(() => {
    isDesktop.current = window.innerWidth >= 640;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isMinimized) inputRef.current?.focus();
  }, [isMinimized]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === "carousel" && message.data) {
      return <ProjectCarousel projects={message.data as Project[]} onSelect={(project) => {
        onSendMessage(`Tell me more about ${project.title}`);
      }} />;
    }

    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="text-[#DC2626] hover:underline font-medium break-words"
                onClick={(e) => {
                  if (href?.startsWith('/') || href?.includes('calendly')) {
                    e.preventDefault();
                    window.open(href, '_blank');
                  }
                }}
              >{children}</a>
            ),
            strong: ({ children }) => <strong className="text-[#FFFFFF] font-bold">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>,
            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-sm md:text-[13px]">{children}</p>,
            code: ({ children }) => <code className="bg-[#000000] px-1.5 py-0.5 text-xs text-[#9CA3AF]">{children}</code>
          }}
        >{message.text}</ReactMarkdown>
      </div>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) onSendMessage(inputValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-4 z-50 flex flex-col bg-[#000000] sm:border sm:border-[#333333] sm:w-[380px] sm:h-[580px] sm:max-h-[80vh]"
      style={{ clipPath: isDesktop.current ? "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" : "none" }}
    >
      {/* Header */}
      <div className="border-b border-[#333333] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between bg-[#000000] flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#DC2626] flex items-center justify-center bg-[#F5F5F0]"
            style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
          >
            <span className="text-xs sm:text-sm font-mono text-[#DC2626] font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-[#FFFFFF] tracking-tight uppercase">AI Assistant</h3>
            <p className="text-[10px] sm:text-xs font-mono text-[#9CA3AF] tracking-[0.1em] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#DC2626]" />
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)}
            className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors p-1.5" aria-label={isMinimized ? "Maximize" : "Minimize"}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMinimized ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
          <button onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors p-1.5" aria-label="Close chat">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={`bg-[#F5F5F0] flex flex-col min-h-0 ${isMinimized ? 'h-0 overflow-hidden' : 'flex-1'}`}>
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto min-h-0 px-2 sm:px-3 py-2 sm:py-3 space-y-2 sm:space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[88%] sm:max-w-[85%] px-3 sm:px-3.5 py-2 sm:py-2.5 ${
                      message.sender === "user"
                        ? "bg-[#DC2626] text-[#FFFFFF]"
                        : "bg-[#000000] text-[#9CA3AF] border border-[#333333]"
                    }`}
                      style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
                          <span className="text-[10px] sm:text-xs font-mono tracking-[0.1em] text-[#DC2626] uppercase font-semibold">AI</span>
                          <span className="text-[10px] sm:text-xs font-mono text-[#9CA3AF]">{formatTime(message.timestamp)}</span>
                        </div>
                      )}

                      {renderMessageContent(message)}

                      {message.sender === "bot" && getQuickReplies(message) && (
                        <div className="mt-2 sm:mt-2.5 flex flex-wrap gap-1 sm:gap-1.5">
                          {getQuickReplies(message)!.map((reply, idx) => (
                            <button key={idx} onClick={() => onQuickReply(reply)}
                              className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-mono tracking-[0.1em] uppercase text-[#DC2626] border border-[#DC2626] hover:bg-[#DC2626] hover:text-[#FFFFFF] transition-colors duration-100"
                              style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
                            >{reply}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2">
                  <div className="bg-[#000000] border border-[#333333] px-3 sm:px-3.5 py-2 sm:py-2.5"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-mono text-[#DC2626] uppercase font-semibold">AI</span>
                      <div className="flex gap-1 ml-1">
                        <motion.div className="w-1.5 h-1.5 bg-[#6B7280]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-[#6B7280]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-[#6B7280]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-2 sm:px-3 py-2 sm:py-2.5 border-t border-[#333333] bg-[#000000]">
              <div className="flex items-center gap-2">
                <input ref={inputRef} type="text" value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-3.5 py-2 bg-[#F5F5F0] border border-[#E5E7EB] text-sm font-mono text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#DC2626] transition-colors"
                  style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
                  disabled={isTyping}
                />
                <button onClick={() => inputValue.trim() && onSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-[#DC2626] text-[#FFFFFF] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#b91c1c] transition-colors duration-100 flex-shrink-0"
                  style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {["Projects", "Skills", "Pricing", "Contact"].map((suggestion) => (
                  <button key={suggestion} onClick={() => onSendMessage(suggestion)}
                    className="text-[10px] sm:text-xs font-mono px-2 py-0.5 border border-[#333333] text-[#9CA3AF] hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
                    style={{ clipPath: "polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)" }}
                  >{suggestion}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCarousel({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const project = projects[currentIndex];

  return (
    <div className="space-y-2">
      <div className="relative border border-[#333333] bg-[#000000] overflow-hidden"
        style={{ height: "100px", clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono text-[#E5E7EB]">◆</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#1A1A1A] to-transparent">
            <h4 className="font-serif text-xs font-bold text-[#FFFFFF] uppercase tracking-tight truncate">{project.title}</h4>
            <p className="text-[10px] font-mono text-[#9CA3AF] line-clamp-2 leading-tight">{project.description}</p>
        </div>

        {projects.length > 1 && (
          <>
            <button onClick={prevProject}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#000000] border border-[#333333] flex items-center justify-center hover:border-[#DC2626] transition-colors">
              <svg className="w-2.5 h-2.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextProject}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#000000] border border-[#333333] flex items-center justify-center hover:border-[#DC2626] transition-colors">
              <svg className="w-2.5 h-2.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {projects.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {projects.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)}
                className={`w-1 h-1 ${idx === currentIndex ? "bg-[#DC2626]" : "bg-[#333333] hover:bg-[#6B7280]"}`} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag: string) => (
          <span key={tag} className="px-1 py-0.5 text-[8px] font-mono text-[#9CA3AF] border border-[#333333]">{tag}</span>
        ))}
      </div>

      {project.url && (
        <button onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.1em] uppercase text-[#DC2626] hover:underline">
          View project details
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      )}
    </div>
  );
}
