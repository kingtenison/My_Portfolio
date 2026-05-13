"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Building Production-Grade Automation Systems: Lessons from 50+ Projects",
    excerpt: "Key patterns and anti-patterns I've discovered while building automation systems for healthcare, finance, and e-commerce clients.",
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
      <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h2 className="text-[1.78125rem] sm:text-[2.1375rem] font-cinzel font-bold text-primary-start mb-6 font-beyonders">
            Technical Insights
          </h2>
           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
             Deep dives into automation, AI integration, and software architecture from real-world projects
           </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: post.id * 0.1 }}
              viewport={{ once: true }}
               className="bg-gradient-to-br from-primary-start/15 to-primary-end/15 rounded-xl shadow-lg overflow-hidden border border-primary-start/20 hover:shadow-xl transition-all duration-300"
            >
               <div className="relative h-48 bg-gradient-to-br from-primary-start/20 to-primary-end/20 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-4xl mb-2">💻</div>
                   <div className="text-sm text-gray-600">Technical Article</div>
                 </div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                     <span
                       key={tag}
                       className="px-2 py-1 bg-primary-start/10 text-primary-start text-xs rounded-full font-medium"
                     >
                      {tag}
                    </span>
                  ))}
                </div>
                
                 <h3 className="text-xl font-cinzel font-semibold text-primary-start mb-3 hover:text-gold/80 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    <span className="mr-2">•</span> {post.date}
                    <span className="mx-2">•</span> {post.readTime}
                  </span>
                   <Link
                     href={`/blog/${post.slug}`}
                     className="font-medium text-primary-start hover:text-gold/80 transition-colors duration-300"
                   >
                    Read More →
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
             className="inline-flex items-center px-6 py-3 bg-primary-start text-white rounded-lg font-medium hover:bg-primary-start/90 transition-colors duration-300"
           >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}