import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CyberpunkNav from "@/components/CyberpunkNav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ChatBotLazy from "@/components/ChatBotLazy";
import { ChatProvider } from "@/components/ChatKnowledge";
import { MouseProvider } from "@/hooks/useMousePosition";


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
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.cdnfonts.com/css/robotaur" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/nexa-bold" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col relative">
        {/* Global effects */}
        <ScrollProgress />

        <MouseProvider>
          <CyberpunkNav />
          <main className="flex-1 pt-20 relative z-10">{children}</main>
          <Footer />
          <ChatProvider>
            <ChatBotLazy />
          </ChatProvider>
        </MouseProvider>
      </body>
    </html>
  );
}
