"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "./ChatBot";
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    // Focus input when chat opens
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  const handleQuickReply = (reply: string) => {
    onQuickReply(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === "carousel" && message.data) {
      return <ProjectCarousel projects={message.data} />;
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 underline font-medium"
                onClick={(e) => {
                  // For demo purposes, prevent navigation
                  if (href?.startsWith('/') || href?.includes('calendly')) {
                    e.preventDefault();
                    window.open(href, '_blank');
                  }
                }}
              >
                {children}
              </a>
            ),
             strong: ({ children }) => (
               <strong className="text-primary-start font-semibold">{children}</strong>
             ),
            ul: ({ children }) => (
              <ul className="list-disc pl-4 space-y-1 mt-2">{children}</ul>
            ),
            p: ({ children }) => (
              <p className="mb-2 last:mb-0">{children}</p>
            )
          }}
        >
          {message.text}
        </ReactMarkdown>
      </div>
    );
  };

  const quickReplies = messages.length > 0 ? getQuickReplies(messages[messages.length - 1]) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-24 right-6 z-50 flex flex-col"
      style={{ width: "380px", height: "580px" }}
    >
       {/* Chat Header */}
       <div className="bg-gradient-to-r from-primary-start to-primary-end border-t-2 border-gold rounded-t-2xl px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Bot Avatar */}
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold">
            <span className="text-xl">🤖</span>
          </div>
          
          {/* Bot Info */}
          <div>
            <h3 className="text-white font-cinzel font-semibold text-sm">Virtual Assistant</h3>
            <p className="text-white/70 text-xs">Online • Typically replies instantly</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMinimized ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`bg-card-bg rounded-b-2xl shadow-2xl overflow-hidden flex flex-col ${isMinimized ? 'h-0' : 'flex-1'}`}>
        {!isMinimized && (
          <>
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                     <div
                       className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                         message.sender === "user"
                           ? "bg-primary text-white rounded-br-md"
                           : "bg-gray-800 text-gray-100 rounded-bl-md"
                       }`}
                     >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gold">🤖 Assistant</span>
                          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                        </div>
                      )}
                      
                      {renderMessageContent(message)}
                      
                      {/* Quick Replies */}
                      {message.sender === "bot" && getQuickReplies(message) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                             {getQuickReplies(message)!.map((reply, idx) => (
                               <button
                                 key={idx}
                                 onClick={() => handleQuickReply(reply)}
                                 className="px-3 py-1.5 bg-primary-start/10 text-primary-start text-xs rounded-full
                                            hover:bg-primary-start hover:text-white transition-all duration-200
                                            border border-primary-start/20 hover:border-primary-start"
                               >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                 >
                   <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                     <div className="flex items-center gap-1">
                       <span className="text-xs font-semibold text-gold mb-1">🤖 Assistant</span>
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

             {/* Input Area */}
             <div className="px-4 py-3 bg-gray-800 border-t border-gray-600">
               <div className="flex items-center gap-2">
                 <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && inputValue.trim() && onSendMessage(inputValue)}
                   placeholder="Type your message..."
                   className="flex-1 px-4 py-2.5 bg-card-bg border border-gray-600 rounded-full
                             focus:outline-none focus:ring-2 focus:ring-primary-start focus:border-transparent
                             text-sm placeholder-gray-400"
                  disabled={isTyping}
                />
                 <button
                   onClick={() => inputValue.trim() && onSendMessage(inputValue)}
                   disabled={!inputValue.trim() || isTyping}
                   className="p-2.5 bg-primary-start text-white rounded-full
                             hover:bg-primary-start/90 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 shadow-md hover:shadow-lg"
                 >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {/* Suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["About", "Skills", "Projects", "Contact"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onSendMessage(suggestion)}
                    className="text-xs px-2.5 py-1 bg-card-bg border border-gray-600 rounded-full
                              text-gray-400 hover:text-primary hover:border-primary/30
                              transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// Project Carousel Component
function ProjectCarousel({ projects }: { projects: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  const project = projects[currentIndex];
  
   return (
     <div className="space-y-3">
       <div className="relative bg-gray-800 rounded-xl overflow-hidden" style={{ height: "180px" }}>
        {/* Project Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-start/10 to-primary-end/10 flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
        
        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <h4 className="text-white font-cinzel font-semibold text-sm mb-1">{project.title}</h4>
          <p className="text-white/80 text-xs line-clamp-2">{project.description}</p>
        </div>
        
        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card-bg/90 rounded-full 
                         flex items-center justify-center shadow-md hover:bg-card-bg transition-colors"
            >
               <svg className="w-4 h-4 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card-bg/90 rounded-full 
                         flex items-center justify-center shadow-md hover:bg-card-bg transition-colors"
            >
               <svg className="w-4 h-4 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
            </button>
          </>
        )}
        
        {/* Indicators */}
        {projects.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-gold" : "bg-card-bg/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag: string) => (
           <span key={tag} className="px-2 py-0.5 bg-primary-start/10 text-primary-start text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {/* CTA */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary-start hover:text-gold/80 transition-colors text-sm font-medium"
      >
        View Live Project
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
