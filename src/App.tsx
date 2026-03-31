import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Zap, 
  Target, 
  BarChart3, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Menu,
  X,
  Stethoscope,
  Building2, 
  GraduationCap, 
  Plane,
  Search, 
  MousePointer2, 
  Workflow, 
  LineChart, 
  User,
  Users,
  Activity,
  TrendingUp
} from 'lucide-react';
import { Section, FadeIn } from './components/Layout';
import { ServiceCard, IndustryCard } from './components/Cards';
import AboutUs from './components/AboutUs';
import ChatAssistant from './components/ChatAssistant';
import LiveCounter from './components/LiveCounter';
import GalaxyBackground from './components/GalaxyBackground';
import LeadModal from './components/LeadModal';
import PricingSection from './components/PricingSection';
import ThankYou from './components/ThankYou';

import { generateLogo } from './services/logoService';

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !logoUrl) {
      handleGenerate();
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const url = await generateLogo();
      setLogoUrl(url);
    } catch (error) {
      console.error("Failed to generate logo:", error);
    } finally {
      setLoading(false);
    }
  };

  const download = (format: 'jpg' | 'gif') => {
    if (!logoUrl) return;
    const link = document.createElement('a');
    link.href = logoUrl;
    link.download = `clickzain-logo.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass rounded-[2rem] md:rounded-[3rem] border-white/10 p-8 md:p-12 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-3 md:mb-4">Download Brand Assets</h2>
              <p className="text-sm md:text-base text-white/50">Get the official ClickZain logo for your marketing materials.</p>
            </div>

            <div className="flex flex-col items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group">
                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-widest">Generating...</span>
                  </div>
                ) : logoUrl ? (
                  <img src={logoUrl} alt="ClickZain Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-white/20">No logo generated</div>
                )}
                
                {logoUrl && !loading && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Official Asset</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                <button 
                  onClick={() => download('jpg')}
                  disabled={loading || !logoUrl}
                  className="btn-primary py-4 md:py-5 flex items-center justify-center gap-3 disabled:opacity-50 text-sm md:text-base"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-90" />
                  Download JPG
                </button>
                <button 
                  onClick={() => download('gif')}
                  disabled={loading || !logoUrl}
                  className="glass py-4 md:py-5 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors disabled:opacity-50 text-sm md:text-base"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-90" />
                  Download GIF
                </button>
              </div>
              
              <p className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold text-center">
                High Resolution • Vector Ready • Transparent Background
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ClickZainLogo = ({ className = "", onClick }: { className?: string, onClick?: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    onClick={onClick}
    className={`flex items-center gap-2 cursor-pointer group ${className}`}
  >
    <motion.div 
      initial={{ rotate: -45, x: -10, y: 10 }}
      animate={{ rotate: 0, x: 0, y: 0 }}
      transition={{ 
        delay: 0.3,
        type: "spring", 
        stiffness: 200, 
        damping: 12
      }}
      className="relative w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(180,255,0,0.2)]"
    >
      <motion.div
        animate={{ 
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ 
          duration: 0.4, 
          delay: 1.2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <MousePointer2 className="text-black w-6 h-6 fill-black" />
      </motion.div>
      
      {/* Click ripple effect */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.5], 
          opacity: [0.6, 0] 
        }}
        transition={{ 
          delay: 1.3,
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 2.6,
          ease: "easeOut"
        }}
        className="absolute w-4 h-4 bg-white rounded-full pointer-events-none"
        style={{ left: '30%', top: '30%' }}
      />
    </motion.div>
    <motion.span 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="text-2xl font-display font-bold tracking-tighter"
    >
      CLICKZAIN
    </motion.span>
  </motion.div>
);



export default function App() {
  const { scrollY } = useScroll();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  const [view, setView] = useState<'landing' | 'privacy' | 'terms' | 'cookie' | 'thank-you'>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const rotateX = useTransform(mouseY, (v) => v / -15);
  const rotateY = useTransform(mouseX, (v) => v / 15);

  // Handle scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const legalContent = {
    privacy: {
      title: "Privacy Policy",
      text: `
        At Clickzain, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our AI-powered lead generation services.

        1. Information We Collect
        We collect information that you provide directly to us, such as your name, email address, phone number, and business details when you request a consultation or use our services. We also collect automated data through cookies and similar technologies.

        2. How We Use Your Information
        We use the information we collect to:
        - Provide, maintain, and improve our services.
        - Communicate with you about your account or our services.
        - Personalize your experience and deliver targeted marketing.
        - Analyze usage patterns to enhance our AI algorithms.

        3. Sharing of Information
        We do not sell your personal information. We may share your data with trusted third-party partners (like Meta and Google) to facilitate our marketing services, or when required by law.

        4. Your Rights
        You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time.

        5. Security
        We implement industry-standard security measures to protect your data from unauthorized access or disclosure.
      `
    },
    terms: {
      title: "Terms of Service",
      text: `
        Welcome to Clickzain. By accessing our website or using our services, you agree to be bound by these Terms of Service.

        1. Description of Service
        Clickzain provides AI-powered lead generation and digital marketing services. We build and manage automated systems to help businesses acquire high-quality leads.

        2. User Obligations
        You agree to provide accurate information and use our services only for lawful purposes. You are responsible for maintaining the confidentiality of any account credentials.

        3. Intellectual Property
        All content, software, and proprietary AI algorithms used by Clickzain are the property of Clickzain and are protected by intellectual property laws.

        4. Limitation of Liability
        Clickzain is not liable for any indirect, incidental, or consequential damages arising from the use of our services. We do not guarantee specific business outcomes, as results depend on various market factors.

        5. Termination
        We reserve the right to terminate or suspend access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms.
      `
    },
    cookie: {
      title: "Cookie Policy",
      text: `
        This Cookie Policy explains how Clickzain uses cookies and similar technologies to recognize you when you visit our website.

        1. What are Cookies?
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide reporting information.

        2. How We Use Cookies
        We use cookies for several reasons:
        - Essential Cookies: Necessary for the website to function properly.
        - Analytics Cookies: Help us understand how visitors interact with our site.
        - Marketing Cookies: Used to deliver more relevant advertisements to you.

        3. Managing Cookies
        You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality may be restricted.

        4. Third-Party Cookies
        In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements.
      `
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-black relative">
      <GalaxyBackground />
      
      {view === 'thank-you' ? (
        <div className="relative z-10">
          <ThankYou onBack={() => setView('landing')} />
        </div>
      ) : (view === 'privacy' || view === 'terms' || view === 'cookie') ? (
        <div className="min-h-screen text-white p-6 md:p-12 relative">
          <nav className="max-w-7xl mx-auto mb-12 flex justify-between items-center">
            <div className="cursor-pointer">
              <ClickZainLogo onClick={() => setIsDownloadModalOpen(true)} />
            </div>
            <button 
              onClick={() => setView('landing')}
              className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </nav>

          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold mb-12 gradient-text">
                {legalContent[view as keyof typeof legalContent].title}
              </h1>
              <div className="glass p-8 md:p-12 rounded-[3rem] text-white/70 leading-relaxed whitespace-pre-line">
                {legalContent[view as keyof typeof legalContent].text}
              </div>
            </FadeIn>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation */}
          <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <ClickZainLogo onClick={() => setIsDownloadModalOpen(true)} />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {['About', 'Services', 'Industries', 'Pricing', 'Recent Projects', 'Process', 'Results', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-sm font-medium text-white/70 hover:text-brand-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setIsLeadModalOpen(true)}
              className="btn-primary py-2 px-6 text-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-bg-dark border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-10 flex flex-col gap-8">
                {['About', 'Services', 'Industries', 'Pricing', 'Recent Projects', 'Process', 'Results', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-xl font-display font-bold text-white/90 hover:text-brand-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsLeadModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full py-4"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Section className="pt-32 md:pt-40 pb-20 relative z-10 overflow-hidden" onMouseMove={handleMouseMove}>
        <motion.div 
          style={{ 
            rotateX,
            rotateY,
          }} 
          className="relative z-20"
        >
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1000px] max-h-[1000px] bg-brand-primary/5 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="right" className="z-30">
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-black leading-[0.9] mb-8 text-left tracking-tighter">
                GROW YOUR <br />
                <span className="gradient-text">BUSINESS</span> <br />
                DIGITALLY.
              </h1>
              
              <p className="text-base md:text-xl text-white/50 mb-12 leading-relaxed text-left max-w-xl font-light">
                Helping businesses grow digitally with performance-driven marketing strategies. Our result-oriented approach delivers high-intent customers directly to your pipeline.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => setIsLeadModalOpen(true)}
                  className="relative group px-8 md:px-10 py-4 md:py-5 bg-brand-primary text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(180,255,0,0.3)] w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-3 text-base md:text-lg">
                    Get Started
                    <ArrowRight className="w-6 h-6" />
                  </span>
                </button>
                
                <div 
                  className="flex items-center gap-4 group cursor-pointer" 
                  onClick={() => document.getElementById('recent-projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-colors">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">View Case Studies</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-brand-primary text-brand-primary" />
                  <span className="text-[10px] md:text-xs font-bold">4.9/5 Rating</span>
                </div>
                <div className="w-[1px] h-4 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  <span className="text-[10px] md:text-xs font-bold">Verified Results</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="relative mt-16 lg:mt-0 z-20">
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-primary/10 aspect-[4/5] lg:aspect-auto group bg-[#050505]">
                {/* Advanced Agency Dashboard */}
                <div className="p-10 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                        <Activity className="text-brand-primary w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Campaign Intelligence</div>
                        <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">System Status: Optimal</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[8px] font-bold text-red-500 uppercase tracking-widest animate-pulse">Live</div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-white/40 uppercase tracking-widest">v4.2.0</div>
                    </div>
                  </div>
                  
                  {/* Performance Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="glass p-6 rounded-[2rem] border-white/5 relative overflow-hidden group/card hover:border-brand-primary/30 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-primary/5 rounded-full blur-2xl group-hover/card:bg-brand-primary/10 transition-colors" />
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Conversion Rate</div>
                      <div className="text-4xl font-display font-black text-white mb-2 tracking-tighter">18.4%</div>
                      <div className="flex items-center gap-2 text-brand-primary">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] font-bold">+4.2% vs Industry Avg</span>
                      </div>
                    </div>
                    <div className="glass p-6 rounded-[2rem] border-white/5 relative overflow-hidden group/card hover:border-brand-primary/30 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-secondary/5 rounded-full blur-2xl group-hover/card:bg-brand-secondary/10 transition-colors" />
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Cost Per Lead</div>
                      <div className="text-4xl font-display font-black text-white mb-2 tracking-tighter">₹2.84</div>
                      <div className="flex items-center gap-2 text-brand-primary">
                        <TrendingUp className="w-3 h-3 rotate-180" />
                        <span className="text-[10px] font-bold">32% Efficiency Gain</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Flow Visualization */}
                  <div className="flex-1 glass rounded-[2.5rem] border-white/5 p-8 relative overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Lead Generation Velocity</div>
                        <div className="text-[10px] text-white/30">Real-time pipeline monitoring</div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex items-end gap-2 h-full">
                      {[30, 60, 40, 85, 55, 75, 45, 95, 65, 80, 50, 70, 90, 60, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05, duration: 1.5, ease: "circOut" }}
                          className="flex-1 bg-gradient-to-t from-brand-primary/5 via-brand-primary/20 to-brand-primary/80 rounded-t-lg hover:to-brand-primary transition-all cursor-pointer relative group/bar"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                            {h}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Floating Data Points */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [-20, -100],
                            x: [Math.random() * 300, Math.random() * 300],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                          }}
                          className="absolute bottom-0 w-1 h-1 bg-brand-primary rounded-full blur-[1px]"
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent pointer-events-none" />
                
                {/* ROAS Badge */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute top-1/2 -right-8 glass p-6 rounded-[2.5rem] backdrop-blur-3xl border-white/20 shadow-2xl z-30"
                >
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Avg. ROAS</div>
                  <div className="text-4xl font-display font-black text-brand-primary tracking-tighter">6.4X</div>
                </motion.div>
              </div>

              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-12 glass p-6 rounded-3xl z-20 shadow-2xl border-white/20 backdrop-blur-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-primary/40">
                    <Target className="text-black w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Lead Quality</div>
                    <div className="text-xl font-black text-white tracking-tight">98.2%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 30, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-16 -right-12 glass p-6 rounded-3xl z-20 shadow-2xl border-white/20 backdrop-blur-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-secondary/40">
                    <Users className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Active Leads</div>
                    <div className="text-xl font-black text-white tracking-tight">42,840</div>
                  </div>
                </div>
              </motion.div>

              {/* Cursor Interaction Simulation */}
              <motion.div
                animate={{ 
                  x: [150, 250, 200, 150],
                  y: [150, 80, 220, 150]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-40 pointer-events-none opacity-40"
              >
                <MousePointer2 className="text-brand-primary w-8 h-8 drop-shadow-[0_0_15px_rgba(180,255,0,0.6)]" />
              </motion.div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Partners Section */}
        <div className="mt-32 pt-12 border-t border-white/5">
          {/* Campaign Ticker */}
          <div className="mb-16 overflow-hidden whitespace-nowrap relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-dark to-transparent z-10" />
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="inline-flex gap-12 items-center"
            >
              {['FACEBOOK ADS', 'GOOGLE SEARCH', 'INSTAGRAM REELS', 'LINKEDIN OUTREACH', 'AI LEAD SCORING', 'ROAS OPTIMIZATION', 'PROGRAMMATIC BUYING', 'RETARGETING PIXELS'].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl font-display font-black text-white/10 tracking-tighter">{text}</span>
                  <div className="w-2 h-2 rounded-full bg-brand-primary/20" />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {['FACEBOOK ADS', 'GOOGLE SEARCH', 'INSTAGRAM REELS', 'LINKEDIN OUTREACH', 'AI LEAD SCORING', 'ROAS OPTIMIZATION', 'PROGRAMMATIC BUYING', 'RETARGETING PIXELS'].map((text, i) => (
                <div key={i + 100} className="flex items-center gap-4">
                  <span className="text-2xl font-display font-black text-white/10 tracking-tighter">{text}</span>
                  <div className="w-2 h-2 rounded-full bg-brand-primary/20" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Platforms We Master & Integrate</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            {[
              { 
                name: 'AiSensy', 
                icon: <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/0 group-hover:shadow-[#25D366]/40 transition-all"><MessageSquare className="text-white w-5 h-5 fill-white" /></div>,
                color: "group-hover:text-[#25D366]"
              },
              { 
                name: 'Meta', 
                icon: <Facebook className="w-8 h-8 text-white group-hover:text-[#1877F2] transition-colors drop-shadow-none group-hover:drop-shadow-[0_0_15px_rgba(24,119,242,0.6)]" />,
                color: "group-hover:text-[#1877F2]"
              },
              { 
                name: 'Google', 
                icon: (
                  <div className="group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                ),
                color: "group-hover:text-white"
              }
            ].map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer group ${partner.color}`}
              >
                {partner.icon}
                <span className="text-xl font-bold tracking-tighter transition-colors">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/5 pt-12">
          {[
            { label: 'Leads Generated', value: '500k+' },
            { label: 'Avg. ROI Increase', value: '310%' },
            { label: 'Ad Spend Managed', value: '₹12M+' },
            { label: 'AI Models Deployed', value: '45+' },
          ].map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Core Expertise</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Our full-stack marketing solutions are powered by proprietary AI algorithms designed for maximum conversion.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Lead Generation" 
            description="Performance-driven strategies to identify and qualify high-intent leads for your business growth."
            icon={Target}
            delay={0.1}
          />
          <ServiceCard 
            title="Meta Ads Management" 
            description="High-performance Facebook & Instagram campaigns optimized for conversion and ROI."
            icon={MousePointer2}
            delay={0.2}
          />
          <ServiceCard 
            title="Google Ads Mastery" 
            description="Search, Display, and YouTube ads that capture intent and drive immediate customer action."
            icon={Search}
            delay={0.3}
          />
          <ServiceCard 
            title="Website Development" 
            description="High-converting, modern landing pages and websites tailored for your business requirements."
            icon={Workflow}
            delay={0.4}
          />
          <ServiceCard 
            title="Social Media Management" 
            description="Strategic content planning and management to build a strong, engaging brand presence."
            icon={Users}
            delay={0.5}
          />
          <ServiceCard 
            title="AI & Automation" 
            description="Advanced AI-powered solutions and marketing automation to streamline your growth process."
            icon={Cpu}
            delay={0.6}
          />
        </div>
      </Section>

      {/* Industry Focus */}
      <Section id="industries" className="bg-white/[0.02] rounded-[4rem] my-12">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Industry Specialists</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We don't do everything for everyone. We specialize in high-ticket industries where precision matters.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IndustryCard 
            title="Healthcare & Doctors"
            image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
            benefits={['Patient Acquisition Systems', 'HIPAA Compliant Funnels', 'Clinic Growth Automation']}
            delay={0.1}
          />
          <IndustryCard 
            title="Real Estate"
            image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
            benefits={['High-Intent Buyer Leads', 'Developer Project Launch', 'Automated Property Tours']}
            delay={0.2}
          />
          <IndustryCard 
            title="Education"
            image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
            benefits={['Student Enrollment Funnels', 'Academy Scaling Systems', 'Coach Branding & Ads']}
            delay={0.3}
          />
          <IndustryCard 
            title="Travel & Tourism"
            image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
            benefits={['Destination Marketing', 'Booking Conversion Funnels', 'Travel Intent Targeting']}
            delay={0.4}
          />
        </div>
      </Section>

      {/* About Us Section */}
      <AboutUs />

      {/* Recent Projects Section */}
      <Section id="recent-projects">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Recent <span className="gradient-text">Projects</span></h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Explore our latest AI-powered marketing campaigns and the results we've delivered for our clients.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              title: "Healthcare Growth Engine",
              client: "Specialist Dental Clinic",
              image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
              results: "420+ Monthly Patients | +210% Growth",
              desc: "Implemented a multi-channel lead generation system targeting high-value dental procedures."
            },
            {
              title: "Real Estate Lead Machine",
              client: "Premium Property Developer",
              image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=1200",
              results: "₹4.2M Sales Pipeline | -64% CPL",
              desc: "Automated lead qualification funnel for residential projects using Meta Ads and AI-driven engagement."
            },
            {
              title: "Education Enrollment System",
              client: "Leading Training Academy",
              image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
              results: "1,200+ New Students | +340% ROI",
              desc: "Performance-driven enrollment funnel that identified and converted high-intent students effectively."
            },
            {
              title: "Travel Conversion Strategy",
              client: "Luxury Travel Agency",
              image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200",
              results: "₹2.8M Bookings | -45% CPA",
              desc: "Strategic ad creative system that personalized travel offers based on user intent and behavior."
            }
          ].map((project, idx) => (
            <FadeIn key={idx} delay={idx * 0.2}>
              <div className="group relative overflow-hidden rounded-[3rem] glass border border-white/10">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <div className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-2">{project.client}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-white/60 mb-6">{project.desc}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <CheckCircle2 className="text-brand-primary w-4 h-4" />
                    <span className="text-sm font-bold">{project.results}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section id="process">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">How We Scale <br /><span className="text-brand-primary">Your Business</span></h2>
            <p className="text-white/60 mb-12 text-lg">
              Our systematic approach removes the guesswork from marketing. We follow a data-backed roadmap to deliver consistent results.
            </p>
            
            <div className="space-y-8">
              {[
                { step: '01', title: 'Research & Strategy', desc: 'Deep dive into your market, competitors, and target audience behavior.' },
                { step: '02', title: 'Funnel Creation', desc: 'Building high-converting landing pages and automated lead flows.' },
                { step: '03', title: 'Ads Launch', desc: 'Deploying multi-channel campaigns across Meta and Google.' },
                { step: '04', title: 'AI Optimization', desc: 'Our AI models analyze data 24/7 to optimize bids and creatives.' },
                { step: '05', title: 'Scaling Results', desc: 'Aggressively scaling the winning campaigns to maximize ROI.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="text-2xl font-bold text-brand-primary/40 group-hover:text-brand-primary transition-colors">{item.step}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" className="relative">
            <div className="aspect-square glass rounded-[3rem] p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Lead Volume</span>
                    <span className="text-brand-primary font-bold">+142%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-brand-primary" 
                    />
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Cost Per Lead</span>
                    <span className="text-red-400 font-bold">-64%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '36%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-red-400" 
                    />
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Conversion Rate</span>
                    <span className="text-brand-secondary font-bold">+28%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '72%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="h-full bg-brand-secondary" 
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-secondary/20 blur-3xl rounded-full" />
          </FadeIn>
        </div>
      </Section>

      {/* Results / Case Studies */}
      <Section id="results" className="bg-brand-primary/5 rounded-[4rem] py-32">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Proven Results</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Real data from real clients. We focus on the metrics that actually impact your bottom line.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { client: 'Healthcare Specialist', metric: '420+', label: 'Monthly Patients', growth: '+210%', icon: Stethoscope },
            { client: 'Real Estate Developer', metric: '₹4.2M', label: 'Sales Pipeline', growth: '+155%', icon: Building2 },
            { client: 'Education Academy', metric: '1,200+', label: 'New Enrollments', growth: '+340%', icon: GraduationCap },
            { client: 'Travel Agency', metric: '₹2.8M', label: 'New Bookings', growth: '+240%', icon: Plane },
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="p-10 glass rounded-3xl text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon size={80} />
                </div>
                <div className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-4">{item.client}</div>
                <div className="text-5xl font-bold mb-2">{item.metric}</div>
                <div className="text-white/60 font-medium mb-6">{item.label}</div>
                <div className="inline-block px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold">
                  {item.growth} Growth
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What Our Clients Say</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Sarah C.', role: 'Founder, Aesthetics Clinic', text: 'Clickzain transformed our patient acquisition process. We went from struggling for bookings to a consistent flow of high-intent leads.' },
            { name: 'Marcus T.', role: 'CEO, Real Estate Firm', text: 'The lead generation system they built for our latest project launch delivered high-quality prospects at a significantly lower cost.' },
            { name: 'Elena R.', role: 'Director, Education Academy', text: 'Professional, data-driven, and results-oriented. They truly understand how to scale enrollment through strategic digital marketing.' },
            { name: 'Rahul K.', role: 'CEO, Travel Agency', text: 'The performance marketing strategies implemented for our luxury travel packages delivered exceptional results and high ROI.' },
          ].map((t, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="p-8 bg-card-bg rounded-2xl border border-white/5 h-full flex flex-col justify-between">
                <p className="text-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <User className="text-brand-primary w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <PricingSection onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Contact Section */}
      <Section id="contact" className="relative">
        <div className="grid lg:grid-cols-2 gap-20">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Build Your <br /><span className="gradient-text">Lead Machine?</span></h2>
            <p className="text-white/60 mb-12 text-lg">
              Book a free 30-minute strategy call where we'll audit your current setup and show you exactly how AI can scale your leads.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Mail className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-widest">Email Us</div>
                  <div className="font-bold">hello@clickzain.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Phone className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-widest">Call Us</div>
                  <div className="font-bold">9311295120</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-widest">Location</div>
                  <div className="font-bold">Plot no 11, poonam vihar, sainik enclave, uttam nagar -59</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="glass p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-8 border border-brand-primary/20">
                <Zap className="text-brand-primary w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Start Your <span className="gradient-text">Growth Journey</span></h3>
              <p className="text-white/60 mb-10 max-w-sm mx-auto">
                Helping businesses grow digitally with performance-driven marketing strategies.
              </p>
              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="btn-primary w-full py-5 text-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">No commitment required • 100% Free Audit</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="mb-6">
                <ClickZainLogo onClick={() => setIsDownloadModalOpen(true)} />
              </div>
              <p className="text-white/40 max-w-sm mb-8">
                Helping businesses grow digitally with performance-driven marketing strategies. We build tailored solutions that deliver real value and growth.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Linkedin, Twitter].map((Icon, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#about" className="hover:text-brand-primary transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-brand-primary transition-colors">Services</a></li>
                <li><a href="#industries" className="hover:text-brand-primary transition-colors">Industries</a></li>
                <li><a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                <li><a href="#recent-projects" className="hover:text-brand-primary transition-colors">Recent Projects</a></li>
                <li><a href="#process" className="hover:text-brand-primary transition-colors">Our Process</a></li>
                <li><a href="#results" className="hover:text-brand-primary transition-colors">Results</a></li>
                <li><a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Legal</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><button onClick={() => setView('privacy')} className="hover:text-brand-primary transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-brand-primary transition-colors">Terms of Service</button></li>
                <li><button onClick={() => setView('cookie')} className="hover:text-brand-primary transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-bold uppercase tracking-widest">
            <div>© 2026 Clickzain AI Agency. All rights reserved.</div>
            <div className="flex gap-8">
              <span>Built with AI Precision</span>
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Assistant */}
      <LeadModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        onSuccess={() => setView('thank-you')}
      />
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
      
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919311295120"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 group"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </motion.a>

      <ChatAssistant />
      <LiveCounter />
    </>
  )}
</div>
  );
}
