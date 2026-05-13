import type { Metadata } from "next";
import { Poppins, Cinzel, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientGradientBlob from "@/components/AmbientGradientBlob";
import ParticleBackground from "@/components/ParticleBackground";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Hansen Addy Joy - Portfolio",
  description: "Fullstack Engineer & AI Automation Specialist showcasing innovative projects and automation solutions.",
};

// Lazy load ChatBot - splits it into separate chunk, only loads on client
const ChatBotLoader = dynamic(() => import("@/components/ChatBot"), {
  ssr: false,
  loading: () => null,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cinzel.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* Global ambient effects */}
        <ScrollProgress />
        <ParticleBackground density={10} />
        <AmbientGradientBlob />
        
        <Navbar />
        <main className="flex-1 pt-16 relative z-10">{children}</main>
        <Footer />
        <ChatBotLoader />
      </body>
    </html>
  );
}
