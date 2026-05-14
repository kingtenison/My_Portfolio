"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/Button";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (in production, connect to your backend/email service)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      e.currentTarget.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl sm:text-5xl font-cinzel font-bold text-primary-start mb-6">
            Get In Touch
          </h1>
           <p className="text-xl text-gray-700 max-w-2xl mx-auto">
             I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
           </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-cinzel font-semibold text-primary-start mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-start/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                   <div>
                     <p className="font-medium text-primary-start">Email</p>
                     <p className="text-gray-700">kingtenison@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-start/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                   <div>
                     <p className="font-medium text-primary-start">Phone</p>
                     <p className="text-gray-700">+233 53 529 2708</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-start/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                   <div>
                     <p className="font-medium text-primary-start">Location</p>
                     <p className="text-gray-700">Accra, Ghana — Open to remote</p>
                  </div>
                </div>

                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-primary-start/10 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6 text-primary-start" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                   <div>
                     <p className="font-medium text-primary-start">GitHub</p>
                    <a href="https://github.com/kingtenison" className="text-gold hover:underline">github.com/kingtenison</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card-bg rounded-lg shadow-lg p-8 border border-gray-100"
          >
             <h2 className="text-2xl font-cinzel font-semibold text-primary-start mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                 <input
                   type="text"
                   id="name"
                   name="name"
                   required
                   className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-start focus:border-transparent transition-colors"
                   placeholder="Your name"
                 />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   required
                   className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-start focus:border-transparent transition-colors"
                   placeholder="your.email@example.com"
                 />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                 <input
                   type="text"
                   id="subject"
                   name="subject"
                   required
                   className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-start focus:border-transparent transition-colors"
                    placeholder="What&apos;s this about?"
                 />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                 <textarea
                   id="message"
                   name="message"
                   rows={5}
                   required
                   className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-start focus:border-transparent transition-colors resize-none"
                   placeholder="Tell me about your project or opportunity..."
                 />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  Oops! Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}