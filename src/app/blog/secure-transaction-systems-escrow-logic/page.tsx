"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function BlogPostPage() {
  useEffect(() => {
    document.title = "Secure Transaction Systems: Escrow Logic - Hansen Addy Joy";
  }, []);
  return (
    <div className="min-h-screen bg-[#000000] px-6 lg:px-10 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <Link href="/blog" className="font-mono tracking-[0.15em] uppercase text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-300">
              [ &lt; Back to Articles ]
            </Link>
          </div>
          <h1 className="font-serif uppercase tracking-tight text-[#FFFFFF] text-4xl sm:text-5xl mb-6">
            Secure Transaction Systems: Implementing Escrow Logic
          </h1>
          <p className="text-xl text-[#9CA3AF] font-sans leading-relaxed max-w-3xl">
            Building Trust-Mediated Payment Systems with Proper Fund Holding and Release Mechanisms
          </p>
          <div className="flex items-center gap-4 mt-6 mb-16">
            <span className="font-mono tracking-[0.15em] uppercase text-[#9CA3AF] text-sm">March 15, 2026</span>
            <span className="text-[#E5E7EB]">//</span>
            <span className="font-mono tracking-[0.15em] uppercase text-[#9CA3AF] text-sm">15 min read</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[#9CA3AF] font-sans leading-relaxed mb-6">
            When building platforms that mediate financial transactions between parties, trust is the most critical commodity. Implementing escrow logic correctly can mean the difference between a thriving marketplace and one that loses users to fraud concerns.
          </p>

          <h2 className="font-serif uppercase tracking-tight text-[#FFFFFF] text-2xl mt-12 mb-4">
            The Escrow Problem
          </h2>
          <p className="text-[#9CA3AF] font-sans leading-relaxed mb-6">
            In any peer-to-peer marketplace, both buyers and sellers face the same fundamental risk: &quot;What if the other party doesn&apos;t hold up their end of the deal?&quot; Traditional escrow services solve this by holding funds in a neutral account until both parties confirm satisfaction.
          </p>

          <h2 className="font-serif uppercase tracking-tight text-[#FFFFFF] text-2xl mt-12 mb-4">
            Architecture Overview
          </h2>
          <p className="text-[#9CA3AF] font-sans leading-relaxed mb-6">
            The escrow system I built follows a state-machine architecture where each transaction progresses through well-defined states with strict validation at each transition:
          </p>

          <div className="border border-[#DC2626] p-6 mb-6">
            <h3 className="font-mono tracking-[0.15em] uppercase text-[#DC2626] text-sm mb-4">[ Transaction Lifecycle ]</h3>
            <ol className="list-decimal pl-6 text-[#9CA3AF] font-sans leading-relaxed space-y-3">
              <li><span className="text-[#FFFFFF]">Initiation</span> - Buyer initiates transaction, funds are held in escrow</li>
              <li><span className="text-[#FFFFFF]">Processing</span> - Seller fulfills their obligation</li>
              <li><span className="text-[#FFFFFF]">Verification</span> - Buyer confirms receipt and satisfaction</li>
              <li><span className="text-[#FFFFFF]">Release</span> - Funds are released to seller upon mutual confirmation</li>
              <li><span className="text-[#FFFFFF]">Dispute Resolution</span> - Mediation process if parties cannot agree</li>
            </ol>
          </div>

          <h2 className="font-serif uppercase tracking-tight text-[#FFFFFF] text-2xl mt-12 mb-4">
            Key Technical Decisions
          </h2>
          <p className="text-[#9CA3AF] font-sans leading-relaxed mb-6">
            Several design decisions proved critical to the system&apos;s reliability and security:
          </p>
          <ul className="list-disc pl-6 text-[#9CA3AF] font-sans leading-relaxed mb-6 space-y-2">
            <li><span className="text-[#DC2626]">Webhook-driven reconciliation</span> - Ensuring fund movements only happen when both parties confirm</li>
            <li><span className="text-[#DC2626]">Atomic database transactions</span> - Preventing partial state changes that could leave funds in limbo</li>
            <li><span className="text-[#DC2626]">Comprehensive audit logging</span> - Every state change is recorded with timestamps and user context</li>
            <li><span className="text-[#DC2626]">Multi-signature security</span> - Requiring multiple approvals for high-value transactions</li>
            <li><span className="text-[#DC2626]">Time-based auto-release</span> - Preventing funds from being held indefinitely</li>
          </ul>

          <div className="border-t border-[#333333] my-12"></div>

          <h2 className="font-serif uppercase tracking-tight text-[#FFFFFF] text-2xl mt-12 mb-4">
            Lessons Learned
          </h2>
          <p className="text-[#9CA3AF] font-sans leading-relaxed mb-6">
            Building this system taught me that the hardest part of escrow isn&apos;t the technology—it&apos;s the edge cases. What happens when a buyer never confirms? When a seller becomes unresponsive? When network failures interrupt a transaction mid-process? These scenarios required extensive error handling and fallback mechanisms.
          </p>
        </motion.div>

        <div className="border-t border-[#333333] my-12"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <Link href="/blog" className="font-mono tracking-[0.15em] uppercase text-[#9CA3AF] hover:text-[#DC2626] transition-colors duration-300">
            [ &lt; Back to Articles ]
          </Link>
          <div className="flex gap-3">
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626] border border-[#DC2626] px-3 py-1">
              Security
            </span>
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626] border border-[#DC2626] px-3 py-1">
              Payments
            </span>
            <span className="font-mono tracking-[0.15em] uppercase text-xs text-[#DC2626] border border-[#DC2626] px-3 py-1">
              Backend Architecture
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
