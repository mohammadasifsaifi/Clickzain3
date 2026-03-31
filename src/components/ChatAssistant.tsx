import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  User,
  Bot,
  Phone,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_su9i5j4";
const EMAILJS_TEMPLATE_ID = "template_m3v75dt";
const EMAILJS_PUBLIC_KEY = "zFecskDa-s4XPcaLr";

const SYSTEM_INSTRUCTION = `You are a smart, friendly, and sales-focused digital marketing consultant for 'Clickzain Digital Solutions'. Your goal is to help visitors understand how Clickzain can grow their business through digital marketing and AI solutions.

🎯 Industry Handling:
- We are specialists in 4 Core Industries:
  1. Healthcare & Doctors (Patient acquisition, HIPAA funnels)
  2. Real Estate (High-intent buyer leads, project launches)
  3. Education (Student enrollment funnels, academy scaling)
  4. Travel & Tourism (Destination marketing, booking conversion)
- If a user belongs to these, prioritize highly relevant, tailored solutions for them.
- 🌐 Other Businesses Support: Do NOT ignore other industries. Understand their business, provide appropriate digital marketing guidance, suggest lead generation strategies, and recommend the most suitable Clickzain plan. We help ALL businesses scale.

📈 Lead Generation Plans Promotion:
Actively suggest and explain our "Invest in Your Growth" plans:
- 🟢 Plan 1: Starter Growth Plan (₹10,000 + GST) - Strategy, posting, and optimization. Client provides videos.
- 🔵 Plan 2: Business Growth Plan (₹15,000 + GST) - Full video production (shoot + edit), ads management, and funnels. (Most Popular)
- 🟣 Plan 3: Advanced Scaling Plan (₹25,000 + GST) - Advanced scaling, automation, and CRO.
- 🔴 Plan 4: Custom Enterprise Plan - AI-powered solutions and full custom automation.
Explain features in simple terms and guide users toward conversion actions like "Get Started" or "Book a Call".

🧠 Out-of-Scope Handling:
If a question is out of scope or unrelated to business/marketing:
- Respond politely: "👉 For more specific assistance, please connect with our Human Support directly at 9311295120. We’re here to help!"

🤖 Conversation Goal:
- Act as a smart sales assistant + marketing consultant.
- Focus on understanding user needs, providing value, and converting visitors into leads.
- Ask discovery questions: Business type, current ads, monthly budget, and goals.
- End every conversation with a clear call-to-action like "Would you like to book a free strategy call?" or "Shall we discuss your growth plan over a call?"

Tone & Style:
- Friendly, professional, and confident.
- Use simple English. You can mix light Hinglish (e.g., "Aapka business grow karne mein hum help karenge") to build rapport.
- Keep responses short, engaging, and conversational.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && isLeadCaptured && messages.length === 0) {
      setMessages([{ role: 'model', text: `Hi ${userInfo.name}! 👋 Welcome to Clickzain Digital Solutions! How can we help you grow your business today?` }]);
    }
  }, [isOpen, isLeadCaptured]);

  useEffect(() => {
    const handleUnload = () => {
      if (isLeadCaptured && messages.length >= 2) {
        sendTranscript();
      }
    };

    window.addEventListener("pagehide", handleUnload);
    return () => window.removeEventListener("pagehide", handleUnload);
  }, [isLeadCaptured, messages, userInfo]);

  const sendTranscript = async () => {
    if (messages.length < 2) return; // Don't send if only the greeting exists

    const transcriptText = messages
      .map((msg) => `${msg.role === "user" ? userInfo.name : "AI"}: ${msg.text}`)
      .join("\n\n");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          message: `CHAT TRANSCRIPT:\n\n${transcriptText}`,
          business_name: "Chat Session",
          monthly_budget: "N/A",
        },
        EMAILJS_PUBLIC_KEY,
      );
      console.log("Transcript sent via EmailJS");
    } catch (error) {
      console.error("Failed to send transcript via EmailJS:", error);
    }
  };

  const handleClose = () => {
    if (isLeadCaptured) {
      sendTranscript();
    }
    setIsOpen(false);
  };

  const validateForm = () => {
    const errors = { name: '', email: '', phone: '' };
    let isValid = true;

    if (!userInfo.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInfo.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(userInfo.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!userInfo.phone.trim()) {
      errors.phone = 'Phone is required';
      isValid = false;
    } else if (!phoneRegex.test(userInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Enter a valid 10-digit number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLeadCaptured(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      }

      const response = await chatRef.current.sendMessage({ message: userMessage });
      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting. Please try again or call us at 9311295120." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-brand-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <Bot className="text-black w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-white">Clickzain Assistant</div>
                  <div className="text-[10px] text-brand-primary uppercase tracking-widest font-bold">
                    {isLeadCaptured ? 'Online' : 'Identify Yourself'}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="text-white/60 w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {!isLeadCaptured ? (
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Start a Conversation</h3>
                  <p className="text-white/40 text-sm">Please provide your details to begin the chat with our AI expert.</p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={userInfo.name}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white outline-none focus:border-brand-primary transition-all`}
                    />
                    {formErrors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase tracking-widest font-bold">{formErrors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={userInfo.email}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white outline-none focus:border-brand-primary transition-all`}
                    />
                    {formErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase tracking-widest font-bold">{formErrors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={userInfo.phone}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      className={`w-full bg-white/5 border ${formErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white outline-none focus:border-brand-primary transition-all`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase tracking-widest font-bold">{formErrors.phone}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 mt-4"
                  >
                    Start Chatting
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-brand-primary text-black rounded-tr-none'
                            : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                        }`}
                      >
                        <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? '!text-black' : 'prose-invert !text-white'}`}>
                          <ReactMarkdown>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                        <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/80 backdrop-blur-md">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about growing your business..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 focus:border-brand-primary outline-none transition-all text-white text-sm placeholder:text-white/30"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold">
                    Powered by Clickzain AI
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/20 relative"
      >
        {isOpen ? (
          <X className="text-black w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="text-black w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ChatAssistant;
