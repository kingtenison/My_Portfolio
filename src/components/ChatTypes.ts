export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "carousel" | "quick-replies" | "form" | "appointment" | "greeting" | "about" | "skills" | "services" | "pricing" | "process" | "contact" | "testimonial" | "faq" | "availability" | "whatsapp" | "closing" | "projects" | "smalltalk" | "direct_whatsapp" | "direct_email" | "website_price" | "webapp_price";
  data?: unknown;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string | null;
  longDescription?: string;
}
