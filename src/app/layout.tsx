import type { Metadata } from "next";
import { Poppins, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientGradientBlob from "@/components/AmbientGradientBlob";
import ChatBotLazy from "@/components/ChatBotLazy";
import { ChatProvider } from "@/components/ChatKnowledge";

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
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col relative">
        {/* Global ambient effects */}
        <ScrollProgress />
        <AmbientGradientBlob />
        
        <Navbar />
        <main className="flex-1 pt-16 relative z-10">{children}</main>
        <Footer />
        <ChatProvider>
          <ChatBotLazy />
        </ChatProvider>
      </body>
    </html>
  );
}
