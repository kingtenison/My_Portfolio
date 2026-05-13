"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPostPage() {
  return (
      <div className="min-h-screen bg-white py-20">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl sm:text-5xl font-cinzel font-bold text-primary-start mb-6">
            Secure Transaction Systems: Implementing Escrow Logic
          </h1>
           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
             Building Trust-Mediated Payment Systems with Proper Fund Holding and Release Mechanisms
           </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-sm text-gray-600">March 15, 2026</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">15 min read</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-gray-700 leading-relaxed mb-6">
             When building platforms that mediate financial transactions between parties, trust is the most critical 
             commodity. Implementing escrow logic correctly can mean the difference between a thriving marketplace and one 
             that loses users to fraud concerns.
           </p>
          
           <h2 className="text-2xl font-cinzel font-bold text-primary-start mt-8 mb-4">
            The Escrow Problem
          </h2>
           <p className="text-gray-700 leading-relaxed mb-6">
             In any peer-to-peer marketplace, both buyers and sellers face the same fundamental risk: 
             "What if the other party doesn't hold up their end of the deal?" Traditional escrow services 
             solve this by holding funds in a neutral account until both parties confirm satisfaction.
           </p>
          
           <h2 className="text-2xl font-cinzel font-bold text-primary-start mt-8 mb-4">
            Architecture Overview
          </h2>
           <p className="text-gray-700 leading-relaxed mb-6">
             The escrow system I built follows a state-machine architecture where each transaction progresses 
             through well-defined states with strict validation at each transition:
           </p>
          
           <div className="bg-primary-start/5 rounded-lg p-6 mb-6">
             <h3 className="text-lg font-cinzel font-semibold text-primary-start mb-3">Transaction Lifecycle</h3>
             <ol className="list-decimal pl-6 text-gray-700 space-y-3">
              <li><strong>Initiation</strong> - Buyer initiates transaction, funds are held in escrow</li>
              <li><strong>Processing</strong> - Seller fulfills their obligation</li>
              <li><strong>Verification</strong> - Buyer confirms receipt and satisfaction</li>
              <li><strong>Release</strong> - Funds are released to seller upon mutual confirmation</li>
              <li><strong>Dispute Resolution</strong> - Mediation process if parties cannot agree</li>
            </ol>
          </div>

           <h2 className="text-2xl font-cinzel font-bold text-primary-start mt-8 mb-4">
            Key Technical Decisions
          </h2>
           <p className="text-gray-700 leading-relaxed mb-6">
             Several design decisions proved critical to the system's reliability and security:
           </p>
           <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Webhook-driven reconciliation</strong> - Ensuring fund movements only happen when both parties confirm</li>
            <li><strong>Atomic database transactions</strong> - Preventing partial state changes that could leave funds in limbo</li>
            <li><strong>Comprehensive audit logging</strong> - Every state change is recorded with timestamps and user context</li>
            <li><strong>Multi-signature security</strong> - Requiring multiple approvals for high-value transactions</li>
            <li><strong>Time-based auto-release</strong> - Preventing funds from being held indefinitely</li>
          </ul>

           <h2 className="text-2xl font-cinzel font-bold text-primary-start mt-8 mb-4">
            Lessons Learned
          </h2>
           <p className="text-gray-700 leading-relaxed mb-6">
             Building this system taught me that the hardest part of escrow isn't the technology—it's the edge cases. 
             What happens when a buyer never confirms? When a seller becomes unresponsive? When network failures 
             interrupt a transaction mid-process? These scenarios required extensive error handling and fallback mechanisms.
           </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex justify-between items-center"
        >
           <Link href="/blog" className="text-primary-start hover:text-gold/80 transition-colors duration-300">
            ← Back to All Articles
          </Link>
          <div className="flex gap-4">
              <span className="text-sm text-gray-600 px-3 py-1 bg-primary-start/10 text-primary-start rounded-full">
                Security
              </span>
              <span className="text-sm text-gray-600 px-3 py-1 bg-primary-start/10 text-primary-start rounded-full">
                Payments
              </span>
              <span className="text-sm text-gray-600 px-3 py-1 bg-primary-start/10 text-primary-start rounded-full">
                Backend Architecture
              </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}