"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitStatus("success");
      form.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#000000] px-6 lg:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-sm">
            // CONTACT
          </span>
          <h1 className="font-serif uppercase text-[#FFFFFF] text-4xl sm:text-5xl mt-4">
            Get In Touch
          </h1>
          <p className="font-sans text-[#9CA3AF] max-w-2xl mx-auto mt-4 leading-relaxed">
            I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div
              className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                // EMAIL
              </span>
              <a
                href="mailto:kingtenison@gmail.com"
                className="block font-sans text-[#111827] mt-2 hover:text-[#DC2626] transition-colors"
              >
                [ kingtenison@gmail.com ]
              </a>
            </div>

            <div
              className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                // PHONE
              </span>
              <p className="font-sans text-[#111827] mt-2">
                [ +233 53 529 2708 ]
              </p>
            </div>

            <div
              className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                // LOCATION
              </span>
              <p className="font-sans text-[#111827] mt-2">
                [ Accra, Ghana — Open to remote ]
              </p>
            </div>

            <div
              className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                // GITHUB
              </span>
              <a
                href="https://github.com/kingtenison"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-[#111827] mt-2 hover:text-[#DC2626] transition-colors"
              >
                [ github.com/kingtenison ]
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="bg-[#F5F5F0] border border-[#E5E7EB] p-6"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">
                // SEND A MESSAGE
              </span>
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-xs">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full mt-1.5 px-4 py-3 bg-[#000000] border border-[#333333] text-[#FFFFFF] font-sans outline-none transition-colors focus:border-[#DC2626]"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-xs">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full mt-1.5 px-4 py-3 bg-[#000000] border border-[#333333] text-[#FFFFFF] font-sans outline-none transition-colors focus:border-[#DC2626]"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-xs">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full mt-1.5 px-4 py-3 bg-[#000000] border border-[#333333] text-[#FFFFFF] font-sans outline-none transition-colors focus:border-[#DC2626]"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-mono tracking-[0.15em] uppercase text-[#6B7280] text-xs">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full mt-1.5 px-4 py-3 bg-[#000000] border border-[#333333] text-[#FFFFFF] font-sans outline-none transition-colors focus:border-[#DC2626] resize-none"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#333333] bg-[#000000] px-4 py-3"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
                  >
                    <span className="font-mono text-[#DC2626] text-sm">&gt; MESSAGE SENT SUCCESSFULLY</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#333333] bg-[#000000] px-4 py-3"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
                  >
                    <span className="font-mono text-[#DC2626] text-sm">&gt; ERROR — PLEASE TRY AGAIN</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#DC2626] text-[#FFFFFF] font-mono tracking-[0.15em] uppercase text-sm py-3 px-6 transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
