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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    // Project carousel
    if (message.type === "carousel" && message.data) {
      return <ProjectCarousel projects={message.data as Project[]} onSelect={(project) => {
        onSendMessage(`Tell me more about ${project.title}`);
      }} />;
    }

    return (
      <div className="prose prose-sm prose-invert max-w-none">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/90 underline font-medium break-words"
                onClick={(e) => {
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
              <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>
            ),
            p: ({ children }) => (
              <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
            ),
            code: ({ children }) => (
              <code className="bg-gray-900/50 px-1.5 py-0.5 rounded text-xs text-gray-300">{children}</code>
            )
          }}
        >
          {message.text}
        </ReactMarkdown>
      </div>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-24 right-4 z-50 flex flex-col transition-all duration-300"
       style={{ width: "min(360px, calc(100vw - 2rem))", height: "min(464px, 70vh)", maxWidth: "calc(100vw - 2rem)", maxHeight: "70vh" }}
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-start to-primary-end border-t-2 border-gold rounded-t-2xl px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          {/* Bot Avatar */}
          <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold">
            <span className="text-lg">🤖</span>
          </div>

          {/* Bot Info */}
          <div>
            <h3 className="text-white font-cinzel font-semibold text-sm">Virtual Assistant</h3>
            <p className="text-white/70 text-xs">Online • Replies instantly</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="text-white/70 hover:text-white transition-colors p-1.5"
              aria-label="Maximize"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/70 hover:text-white transition-colors p-1.5"
              aria-label="Minimize"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1.5"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`bg-black/95 backdrop-blur-sm rounded-b-2xl shadow-2xl overflow-hidden flex flex-col ${isMinimized ? 'h-0' : 'flex-1'}`}>
        {!isMinimized && (
          <>
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-md shadow-md"
                          : "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-bl-md border border-gray-700/50"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-xs font-semibold text-gold">🤖 Assistant</span>
                          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        </div>
                      )}

                      {renderMessageContent(message)}

                      {/* Quick Replies */}
                      {message.sender === "bot" && getQuickReplies(message) && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {getQuickReplies(message)!.map((reply, idx) => (
                            <button
                              key={idx}
                              onClick={() => onQuickReply(reply)}
                              className="px-2.5 py-1 bg-primary-start/20 text-primary-start text-xs rounded-full
                                        hover:bg-primary-start hover:text-white border border-primary-start/30
                                        transition-all duration-200 hover:scale-105 active:scale-95"
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
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl rounded-bl-md px-3.5 py-2.5 border border-gray-700/50">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-gold">🤖</span>
                      <div className="flex gap-1">
                        <motion.div
                          className="w-1.5 h-1.5 bg-gold rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 bg-gold rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 bg-gold rounded-full"
                          animate={{ y: [0, -4, 0] }}
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
            <div className="px-3 py-2.5 bg-gray-900/90 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3.5 py-2 bg-gray-800 border border-gray-600 rounded-full
                            focus:outline-none focus:ring-2 focus:ring-primary-start focus:border-transparent
                            text-sm text-white placeholder-gray-400 transition-all"
                  disabled={isTyping}
                />
                <button
                  onClick={() => inputValue.trim() && onSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-primary-start text-white rounded-full
                            hover:bg-primary-start/90 disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="mt-2 flex flex-wrap gap-1">
                {["Projects", "Skills", "Pricing", "Contact"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onSendMessage(suggestion)}
                    className="text-xs px-2 py-0.5 bg-gray-800 border border-gray-600 rounded-full
                              text-gray-400 hover:text-gold hover:border-gold/50 transition-colors"
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
function ProjectCarousel({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const project = projects[currentIndex];

  return (
    <div className="space-y-2">
      <div className="relative bg-gray-800/80 rounded-lg overflow-hidden border border-gray-700" style={{ height: "120px", minHeight: "100px" }}>
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-start/20 to-primary-end/20 flex items-center justify-center">
          <span className="text-3xl">🚀</span>
        </div>

        {/* Project info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/85 to-transparent">
          <h4 className="text-white font-cinzel font-semibold text-[11px] mb-0.5 leading-tight">{project.title}</h4>
          <p className="text-white/90 text-[9px] line-clamp-2 leading-tight">{project.description}</p>
        </div>

        {/* Navigation */}
        {projects.length > 1 && (
          <>
            <button onClick={prevProject} className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/85 transition-colors border border-gray-600">
              <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextProject} className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/85 transition-colors border border-gray-600">
              <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {projects.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1 h-1 rounded-full transition-colors ${idx === currentIndex ? "bg-gold" : "bg-gray-600 hover:bg-gray-500"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag: string) => (
          <span key={tag} className="px-1 py-0.5 bg-primary-start/15 text-primary-start text-[8px] rounded-full border border-primary-start/20">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      {project.url && (
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1 text-gold hover:text-gold/80 text-[10px] font-medium group"
        >
          View project details
          <svg className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      )}
    </div>
  );
}
