# AI Concierge Chatbot — Documentation

## Overview
The chatbot serves as a smart, concierge-style virtual assistant for the portfolio. It simulates advanced AI capabilities using a rule-based NLP system, context tracking, and a comprehensive knowledge base—all locally, without paid APIs.

## Capabilities

### Conversational Intelligence
- **Natural Language Understanding** via keyword + pattern matching (compromise.js-ready)
- **Context Awareness** — tracks conversation state (greeting → general → scheduling → closing)
- **Multi-Intent Detection** — identifies topics from a single message
- **Personality** — friendly, professional, concierge-like tone
- **Typing Simulation** — realistic response delays based on message length

### Information Delivery
- **About/Bio** — detailed professional summary
- **Skills Matrix** — categorized by frontend, backend, AI, DevOps, mobile, design
- **Services** — complete service offering list
- **Project Showcase** — interactive carousel with 6 featured projects
- **Testimonials** — random client quotes
- **Pricing** — tiered ranges (small/medium/large) with examples
- **Process** — 7-step development workflow
- **FAQ** — 6 pre-loaded Q&A pairs
- **Contact** — email, phone, WhatsApp, LinkedIn, GitHub, location, Calendly link

### Lead Generation & Conversion
- **Appointment Scheduling** — collects name, email, date, time, purpose; simulates WhatsApp notification
- **WhatsApp Integration (Simulated)** — logs "📱 WhatsApp → +233535292708" to browser console
- **Contact Capture** — prompts for email/Calendly
- **Company Inquiry Flow** — asks business name and needs
- **Project Qualification** — gathers details via conversational questions

### Engagement Features
- **Quick Replies** — context-sensitive one-click buttons
- **Project Carousel** — interactive gallery with navigation arrows and tags
- **Rich Markdown** — bold, lists, links formatted
- **Typing Indicators** — bouncing dots animation
- **Minimize/Close** — window controls
- **Auto-greeting** — initiates conversation when opened
- **Message History** — scrollable conversation

### User Experience
- **Black Background** — modern dark theme
- **Responsive** — fixed size (380×464px) with mobile adaptation
- **Gold Accents** — matches portfolio branding
- **Smooth Animations** — framer-motion transitions
- **Keyboard Support** — Enter to send

## Architecture

### Components
```
ChatBotLazy      → dynamic import wrapper (ssr: false)
ChatBot          → main controller, state management, response generation
ChatWindow       → UI: messages, input, quick replies, carousel
ChatButton       → floating action button with pulse
ChatKnowledge    → knowledge base + context provider
ChatTypes        → shared TypeScript interfaces
```

### Knowledge Base (`ChatKnowledge.tsx`)
- Single source of truth for all portfolio data
- Easily editable—no code changes needed to update content
- Structured objects for skills, projects, pricing, process, etc.

### Context System
- `ChatProvider` wraps the app in layout.tsx
- Tracks: conversation state, collected data, inquiry count, last topic
- Accessible via `useChatContext()` hook
- Resets on chat close

### Response Engine (`ChatBot.tsx`)
1. **Intent Detection** — regex/keyword matching on user input
2. **State Transition** — updates conversation context
3. **Response Selection** — maps intent to pre-written response templates
4. **Quick Replies** — attaches next-step suggestions to bot messages
5. **Actions** — triggers WhatsApp simulation, carousel display
6. **Typing Simulation** — delays based on response length

## Customization

### Update Your Info
Edit `src/components/ChatKnowledge.tsx` → `knowledge` object:

```ts
export const knowledge: KnowledgeBase = {
  name: "Your Name",
  title: "Your Title",
  about: "Your bio...",
  skills: { frontend: [...], backend: [...], ... },
  projects: [ ... ],
  contact: { email, phone, whatsapp, ... },
  pricing: { ... },
  process: [ ... ],
  testimonials: [ ... ],
  faq: [ ... ]
};
```

### Add Projects
Add objects to `knowledge.projects` array with:
- `id`, `title`, `description`, `image`, `tags[]`, `url` (or null)
- Carousel auto-updates

### Adjust Quick Replies
Each response function returns `quickReplies` array. Modify per intent in `generateResponse()`.

### Change WhatsApp Number
Update in two places:
1. `knowledge.contact.whatsapp`
2. `simulateWhatsApp()` console.log line (for demo visibility)

## Extending with Real WhatsApp (Optional)
When ready to go live, replace `simulateWhatsApp()` with actual API call:

```ts
// src/components/ChatBot.tsx
const simulateWhatsApp = async (msg: string) => {
  await fetch('/api/whatsapp', {
    method: 'POST',
    body: JSON.stringify({ to: knowledge.contact.whatsapp, message: msg })
  });
};
```

Then create `src/app/api/whatsapp/route.ts` using Twilio, MessageBird, or a webhook to WhatsApp Business API (requires paid plan for production).

## Dependencies
- `framer-motion` — animations
- `react-markdown` — markdown rendering
- `compromise` — NLP (optional, currently using regex; ready to plug in)
- `date-fns` — date formatting (optional, not yet used)
- `uuid` — message IDs

All are free, open-source packages.

## Browser Console Output
When user requests WhatsApp info, a green-styled message appears:
```
📱 WhatsApp → +233535292708: Hi! I'm [name]...
```

This confirms the trigger without needing a backend.

## Analytics Idea
Hook into `incrementInquiries()` and log to localStorage:
```ts
useEffect(() => {
  if (context.inquiries > 0) {
    localStorage.setItem('chat_inquiries', context.inquiries.toString());
  }
}, [context.inquiries]);
```

## Future Enhancements (Free)
- **Voice Input** — Web Speech API (browser-native)
- **Speech Output** — `speechSynthesis` API
- **Persistent Context** — localStorage to remember returning users
- **Search** — fuzzy matching over knowledge base
- **RAG Simulation** — precomputed Q&A pairs from resume/projects
- **A/B Testing** — randomize response variants

## Troubleshooting
- **Chat doesn't open** — ensure `<ChatProvider>` wraps `<ChatBotLazy />` in `layout.tsx`
- **No quick replies** — check `getQuickReplies()` returns non-null array
- **Build errors** — run `npx tsc --noEmit` to check types

## File Locations
```
src/
├── components/
│   ├── ChatBot.tsx          ← main logic (edit responses here)
│   ├── ChatWindow.tsx       ← UI (styles in Tailwind classes)
│   ├── ChatButton.tsx       ← floating button
│   ├── ChatKnowledge.tsx    ← knowledge base & context
│   ├── ChatTypes.ts         ← interfaces
│   └── ChatBotLazy.tsx      ← dynamic import wrapper
└── app/
    └── layout.tsx           ← ChatProvider wraps ChatBotLazy
```

All chatbot logic is frontend-only. No server required.
