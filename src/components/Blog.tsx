"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Building Production-Grade Automation Systems: Lessons from 50+ Projects",
    excerpt: "Key patterns and anti-patterns I&apos;ve discovered while building automation systems for healthcare, finance, and e-commerce clients.",
    date: "May 10, 2026",
    readTime: "8 min read",
    tags: ["Automation", "Architecture", "Best Practices"],
    slug: "building-production-grade-automation-systems"
  },
  {
    id: 2,
    title: "The Future of AI-Powered Content Creation: Beyond Basic GPT Wrappers",
    excerpt: "How to build sophisticated AI content pipelines that maintain brand voice while scaling production.",
    date: "April 25, 2026",
    readTime: "12 min read",
    tags: ["AI", "Content Automation", "YouTube API"],
    slug: "future-of-ai-powered-content-creation"
  },
  {
    id: 3,
    title: "Secure Transaction Systems: Implementing Escrow Logic in Web Applications",
    excerpt: "A deep dive into building trust-mediated payment systems with proper fund holding and release mechanisms.",
    date: "March 15, 2026",
    readTime: "15 min read",
    tags: ["Security", "Payments", "Backend Architecture"],
    slug: "secure-transaction-systems-escrow-logic"
  }
];

export default function Blog() {
  return (
    <section className="py-20 bg-[#000000] px-6 lg:px-10">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-sm">// SECTION</span>
            <div className="h-px flex-1 bg-[#333333]"></div>
          </div>
          <h2 className="font-serif uppercase tracking-wide text-[#FFFFFF] text-4xl sm:text-5xl mb-4">
            Technical Insights
          </h2>
          <p className="font-sans text-[#9CA3AF] max-w-2xl">
            Deep dives into automation, AI integration, and software architecture from real-world projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: post.id * 0.1 }}
              viewport={{ once: true }}
              className="border border-[#E5E7EB] bg-[#F5F5F0]"
              style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}
            >
              <div className="bg-[#000000] border-b border-[#333333] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-xs">// ARTICLE</span>
                </div>
                <span className="font-mono text-[#9CA3AF] text-xs">{post.readTime}</span>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono tracking-[0.15em] uppercase text-[10px] text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5"
                      style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif uppercase tracking-wide text-[#111827] text-lg mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="font-sans text-[#6B7280] text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-[#6B7280] border-t border-[#E5E7EB] pt-4">
                  <span>{post.date}</span>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-[#DC2626]">[ Read More ]</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-[#DC2626] px-6 py-3 font-mono tracking-[0.15em] uppercase text-sm text-[#DC2626] bg-transparent"
            style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
