import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Target, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Smartphone, 
  TrendingUp, 
  Search, 
  Youtube, 
  Layers, 
  Bot, 
  Palette,
  Briefcase,
  Eye,
  Compass,
  ChevronRight,
  ArrowLeft,
  PhoneCall,
  Facebook,
  Settings
} from 'lucide-react';
import { FadeIn } from './Layout';

interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  note?: string;
  color: string;
  icon: React.ReactNode;
}

interface ServiceSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  packages: Package[];
}

const CompanyProfile = ({ onBack, onContact }: { onBack: () => void, onContact: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('digital-marketing');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services: ServiceSection[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      icon: <Target className="w-6 h-6" />,
      description: 'Performance-driven strategies to dominate your market and capture high-intent leads.',
      packages: [
        {
          name: "Starter Growth",
          price: "₹10,000",
          description: "Perfect for small businesses starting their digital journey.",
          color: "#00FF88",
          icon: <Zap className="w-6 h-6" />,
          features: [
            "Social media content strategy",
            "Content planning & management",
            "Video enhancement & optimization",
            "Google My Business (GMB) optimization",
            "Website & landing page basic improvements",
            "Lead generation campaign setup",
            "₹10,000 ad spend guidance",
            "YouTube basic optimization",
            "Monthly performance reporting"
          ],
          note: "In this plan, the client creates videos. Clickzain provides strategy, posting, and optimization."
        },
        {
          name: "Business Growth",
          price: "₹15,000",
          description: "Our most popular plan for consistent scaling and leads.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Rocket className="w-6 h-6" />,
          features: [
            "Everything in Starter Plan",
            "Complete video production (Shoot + Edit)",
            "Up to 6 professional videos per month",
            "Ad creatives included in videos",
            "Facebook & Google Ads management",
            "Full lead funnel setup",
            "Retargeting campaigns",
            "Landing page optimization",
            "Basic CRM / lead tracking setup",
            "Bi-weekly performance reports"
          ]
        },
        {
          name: "Advanced Scaling",
          price: "₹25,000",
          description: "For businesses ready to dominate their market.",
          color: "#A855F7",
          icon: <ShieldCheck className="w-6 h-6" />,
          features: [
            "Everything in Business Plan",
            "Advanced marketing & scaling strategy",
            "High-conversion ad creatives & copy",
            "YouTube Ads & scaling campaigns",
            "Advanced WhatsApp/Email automation",
            "Conversion Rate Optimization (CRO)",
            "In-depth competitor analysis",
            "Weekly performance reports",
            "Dedicated strategy support"
          ]
        },
        {
          name: "Custom Enterprise",
          price: "Custom",
          description: "Tailored solutions for large scale organizations.",
          color: "#EF4444",
          icon: <Settings className="w-6 h-6" />,
          features: [
            "AI-powered marketing solutions",
            "Full automation (WhatsApp, Email, CRM)",
            "Custom website development",
            "Complete promotion & branding strategy",
            "Advanced lead management system",
            "Multi-platform ad scaling",
            "Custom API integrations",
            "Dedicated account manager"
          ]
        }
      ]
    },
    {
      id: 'web-development',
      title: 'Web Development',
      icon: <Globe className="w-6 h-6" />,
      description: 'High-performance, conversion-optimized websites built with cutting-edge technologies.',
      packages: [
        {
          name: "Landing Page",
          price: "₹15,000",
          description: "Single page optimized for high conversion rates.",
          color: "#00FF88",
          icon: <Globe className="w-6 h-6" />,
          features: ["Responsive design", "Fast loading speeds", "Lead form integration", "SEO optimized structure"]
        },
        {
          name: "Business Site",
          price: "₹35,000",
          description: "Complete professional website for established brands.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Globe className="w-6 h-6" />,
          features: ["Up to 10 pages", "Custom UI/UX design", "Content Management System", "Advanced SEO setup"]
        },
        {
          name: "E-commerce Pro",
          price: "₹65,000",
          description: "Full-featured online store to sell your products globally.",
          color: "#A855F7",
          icon: <Globe className="w-6 h-6" />,
          features: ["Product management", "Payment gateway integration", "Inventory tracking", "Customer dashboard"]
        },
        {
          name: "Custom Web App",
          price: "Custom",
          description: "Complex web applications tailored to your business logic.",
          color: "#EF4444",
          icon: <Globe className="w-6 h-6" />,
          features: ["Custom backend architecture", "User authentication", "API integrations", "Scalable cloud hosting"]
        }
      ]
    },
    {
      id: 'ai-automation',
      title: 'AI Tools & Automation',
      icon: <Bot className="w-6 h-6" />,
      description: 'Leverage the power of AI to automate workflows and enhance customer experience.',
      packages: [
        {
          name: "Basic Bot",
          price: "₹12,000",
          description: "Automated customer support for your website or social media.",
          color: "#00FF88",
          icon: <Bot className="w-6 h-6" />,
          features: ["FAQ automation", "Lead qualification bot", "Basic CRM integration", "24/7 availability"]
        },
        {
          name: "Workflow Pro",
          price: "₹25,000",
          description: "Connect your tools and automate repetitive tasks.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Bot className="w-6 h-6" />,
          features: ["Zapier/Make automation", "Email/WhatsApp sequences", "Data entry automation", "Custom triggers"]
        },
        {
          name: "AI Agent Suite",
          price: "₹50,000",
          description: "Advanced AI agents that handle complex business tasks.",
          color: "#A855F7",
          icon: <Bot className="w-6 h-6" />,
          features: ["Natural language processing", "Custom knowledge base", "Voice AI integration", "Advanced analytics"]
        },
        {
          name: "Enterprise AI",
          price: "Custom",
          description: "Full-scale AI transformation for your entire organization.",
          color: "#EF4444",
          icon: <Bot className="w-6 h-6" />,
          features: ["Custom LLM fine-tuning", "Predictive analytics", "Internal tool automation", "Dedicated AI consulting"]
        }
      ]
    },
    {
      id: 'saas-tools',
      title: 'SaaS Tools',
      icon: <Layers className="w-6 h-6" />,
      description: 'Custom Software-as-a-Service solutions to build your own digital product.',
      packages: [
        {
          name: "MVP Build",
          price: "₹1,50,000",
          description: "Launch your product idea quickly with essential features.",
          color: "#00FF88",
          icon: <Layers className="w-6 h-6" />,
          features: ["Core functionality", "User management", "Subscription billing", "Basic analytics"]
        },
        {
          name: "SaaS Growth",
          price: "₹3,00,000",
          description: "Scale your MVP with advanced features and better UI.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Layers className="w-6 h-6" />,
          features: ["Advanced dashboards", "Team collaboration tools", "API access", "Enhanced security"]
        },
        {
          name: "Enterprise SaaS",
          price: "₹7,50,000",
          description: "Robust, scalable solution for large user bases.",
          color: "#A855F7",
          icon: <Layers className="w-6 h-6" />,
          features: ["Multi-tenancy architecture", "SSO integration", "Custom reporting", "White-label options"]
        },
        {
          name: "Custom Platform",
          price: "Custom",
          description: "Unique platform built from the ground up for your vision.",
          color: "#EF4444",
          icon: <Layers className="w-6 h-6" />,
          features: ["Microservices architecture", "High-availability setup", "Custom integrations", "Ongoing maintenance"]
        }
      ]
    },
    {
      id: 'mobile-apps',
      title: 'Mobile App Development',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Native and cross-platform mobile apps that provide a seamless user experience.',
      packages: [
        {
          name: "iOS/Android MVP",
          price: "₹80,000",
          description: "Cross-platform app with essential features.",
          color: "#00FF88",
          icon: <Smartphone className="w-6 h-6" />,
          features: ["Flutter/React Native", "User profiles", "Push notifications", "App Store submission"]
        },
        {
          name: "Business App",
          price: "₹1,50,000",
          description: "Feature-rich app for growing businesses.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Smartphone className="w-6 h-6" />,
          features: ["Payment integration", "Social login", "Real-time updates", "Admin dashboard"]
        },
        {
          name: "Advanced App",
          price: "₹3,50,000",
          description: "Complex mobile solution with high performance.",
          color: "#A855F7",
          icon: <Smartphone className="w-6 h-6" />,
          features: ["Offline mode", "Advanced animations", "Third-party integrations", "Performance optimization"]
        },
        {
          name: "App Ecosystem",
          price: "Custom",
          description: "Complete mobile ecosystem with multiple user roles.",
          color: "#EF4444",
          icon: <Smartphone className="w-6 h-6" />,
          features: ["Multi-app architecture", "Custom backend", "Scalable infrastructure", "Dedicated support"]
        }
      ]
    },
    {
      id: 'social-media',
      title: 'Social Media Growth',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Build a powerful brand presence and grow your community organically.',
      packages: [
        {
          name: "Content Starter",
          price: "₹12,000",
          description: "Consistent posting and basic engagement.",
          color: "#00FF88",
          icon: <TrendingUp className="w-6 h-6" />,
          features: ["12 posts per month", "Hashtag research", "Basic engagement", "Monthly report"]
        },
        {
          name: "Engagement Pro",
          price: "₹25,000",
          description: "Active growth and community management.",
          isPopular: true,
          color: "#3B82F6",
          icon: <TrendingUp className="w-6 h-6" />,
          features: ["20 posts + 8 Reels", "Community management", "Influencer outreach", "Growth analytics"]
        },
        {
          name: "Viral Growth",
          price: "₹45,000",
          description: "Aggressive strategy to maximize reach and followers.",
          color: "#A855F7",
          icon: <TrendingUp className="w-6 h-6" />,
          features: ["Daily content + 15 Reels", "Viral trend monitoring", "Paid boost management", "Competitor tracking"]
        },
        {
          name: "Brand Dominance",
          price: "Custom",
          description: "Complete social media takeover for major brands.",
          color: "#EF4444",
          icon: <TrendingUp className="w-6 h-6" />,
          features: ["Full content studio", "PR & Media integration", "Live event coverage", "Omnichannel strategy"]
        }
      ]
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads',
      icon: <Facebook className="w-6 h-6" />,
      description: 'Precision-targeted Facebook and Instagram ads to drive sales and leads.',
      packages: [
        {
          name: "Campaign Setup",
          price: "₹15,000",
          description: "Professional setup of your Meta ad account.",
          color: "#00FF88",
          icon: <Facebook className="w-6 h-6" />,
          features: ["Pixel/CAPI setup", "Audience research", "3 Ad creatives", "15-day monitoring"]
        },
        {
          name: "Growth Management",
          price: "₹25,000",
          description: "Ongoing management for consistent results.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Facebook className="w-6 h-6" />,
          features: ["Continuous optimization", "A/B testing", "Weekly reporting", "Retargeting setup"]
        },
        {
          name: "Scaling Pro",
          price: "₹50,000",
          description: "Aggressive scaling for high-budget campaigns.",
          color: "#A855F7",
          icon: <Facebook className="w-6 h-6" />,
          features: ["Advanced scaling logic", "Creative testing lab", "Competitor spying", "Dedicated manager"]
        },
        {
          name: "Omnichannel Meta",
          price: "Custom",
          description: "Full-funnel Meta strategy for enterprise brands.",
          color: "#EF4444",
          icon: <Facebook className="w-6 h-6" />,
          features: ["Brand awareness + Conversion", "Dynamic catalog ads", "Offline conversion tracking", "Strategy consulting"]
        }
      ]
    },
    {
      id: 'google-ads',
      title: 'Google Ads',
      icon: <Search className="w-6 h-6" />,
      description: 'Be found when your customers are searching for your products or services.',
      packages: [
        {
          name: "Search Starter",
          price: "₹15,000",
          description: "Basic search campaigns for local businesses.",
          color: "#00FF88",
          icon: <Search className="w-6 h-6" />,
          features: ["Keyword research", "Ad copy writing", "Conversion tracking", "Monthly report"]
        },
        {
          name: "Performance Max",
          price: "₹30,000",
          description: "Full Google ecosystem coverage (Search, Display, YT).",
          isPopular: true,
          color: "#3B82F6",
          icon: <Search className="w-6 h-6" />,
          features: ["P-Max campaign setup", "Display ad design", "Shopping ads (if e-com)", "Weekly optimization"]
        },
        {
          name: "Scaling Pro",
          price: "₹60,000",
          description: "High-volume lead generation through Google.",
          color: "#A855F7",
          icon: <Search className="w-6 h-6" />,
          features: ["Advanced bidding strategies", "Competitor conquesting", "Landing page testing", "Daily monitoring"]
        },
        {
          name: "Enterprise Search",
          price: "Custom",
          description: "Global search dominance for large organizations.",
          color: "#EF4444",
          icon: <Search className="w-6 h-6" />,
          features: ["Multi-country setup", "Advanced scripts", "CRM integration", "Quarterly strategy"]
        }
      ]
    },
    {
      id: 'youtube-content',
      title: 'YouTube Content',
      icon: <Youtube className="w-6 h-6" />,
      description: 'Professional video production and channel management to build authority.',
      packages: [
        {
          name: "Edit & Optimize",
          price: "₹20,000",
          description: "Professional editing for your raw footage.",
          color: "#00FF88",
          icon: <Youtube className="w-6 h-6" />,
          features: ["4 long-form edits", "8 Shorts edits", "SEO thumbnails", "Channel optimization"]
        },
        {
          name: "Full Production",
          price: "₹45,000",
          description: "We handle everything from script to upload.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Youtube className="w-6 h-6" />,
          features: ["Script writing", "Professional shooting", "Advanced editing", "Growth management"]
        },
        {
          name: "Channel Growth",
          price: "₹85,000",
          description: "Aggressive strategy to grow your subscribers and views.",
          color: "#A855F7",
          icon: <Youtube className="w-6 h-6" />,
          features: ["8 long-form + 15 Shorts", "Community management", "Collab outreach", "Monetization strategy"]
        },
        {
          name: "Brand Studio",
          price: "Custom",
          description: "Your own dedicated YouTube production team.",
          color: "#EF4444",
          icon: <Youtube className="w-6 h-6" />,
          features: ["Daily content production", "Podcast setup", "Documentary style content", "Full channel takeover"]
        }
      ]
    },
    {
      id: 'branding',
      title: 'Branding & Identity',
      icon: <Palette className="w-6 h-6" />,
      description: 'Create a memorable brand identity that resonates with your audience.',
      packages: [
        {
          name: "Logo Pack",
          price: "₹10,000",
          description: "Professional logo design for new startups.",
          color: "#00FF88",
          icon: <Palette className="w-6 h-6" />,
          features: ["3 Logo concepts", "Brand color palette", "Typography guide", "High-res files"]
        },
        {
          name: "Brand Identity",
          price: "₹25,000",
          description: "Complete visual identity for growing brands.",
          isPopular: true,
          color: "#3B82F6",
          icon: <Palette className="w-6 h-6" />,
          features: ["Logo + Stationery", "Social media kit", "Brand style guide", "Marketing templates"]
        },
        {
          name: "Premium Branding",
          price: "₹50,000",
          description: "Deep brand strategy and visual overhaul.",
          color: "#A855F7",
          icon: <Palette className="w-6 h-6" />,
          features: ["Brand positioning", "Voice & Tone guide", "Full visual system", "Launch strategy"]
        },
        {
          name: "Enterprise Brand",
          price: "Custom",
          description: "Global brand management and evolution.",
          color: "#EF4444",
          icon: <Palette className="w-6 h-6" />,
          features: ["Brand audit", "Rebranding strategy", "Internal branding", "Ongoing consulting"]
        }
      ]
    }
  ];

  const activeService = services.find(s => s.id === activeCategory) || services[0];

  return (
    <div className="min-h-screen bg-bg-dark text-white pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/30 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Back</span>
          </button>
          
          <div className="text-2xl font-display font-black tracking-tighter text-white">
            CLICKZAIN <span className="text-brand-primary">BLUEPRINT</span>
          </div>

          <button 
            onClick={onContact}
            className="btn-primary py-2 px-6 text-sm hidden md:block"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(180,255,0,0.05)_0%,transparent_70%)] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <Briefcase className="text-brand-primary w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">Company Profile & Solutions</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-[0.9]">
              THE GROWTH <br />
              <span className="gradient-text">ECOSYSTEM.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              A comprehensive guide to our services, pricing, and the strategic vision that drives digital dominance for our partners.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                  Pioneering the <br />
                  <span className="text-brand-primary">Digital Future.</span>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  Clickzain Digital Solutions isn't just an agency; we are a growth engine. Founded on the principle of "Results Over Promises," we've spent 8+ years perfecting the art of lead generation and digital scaling.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-bold text-brand-primary mb-1">8+</div>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Years Experience</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-bold text-brand-primary mb-1">500+</div>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="glass p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Eye size={80} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Eye className="text-brand-primary w-6 h-6" />
                    Our Vision
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    To become the global benchmark for performance marketing, where every business, regardless of size, has access to elite-level growth strategies powered by human creativity and artificial intelligence.
                  </p>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border-brand-primary/20 bg-brand-primary/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Compass size={80} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Compass className="text-brand-primary w-6 h-6" />
                    Our Mission
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Our mission is to bridge the gap between businesses and their ideal customers. We provide the tools, the strategy, and the execution needed to turn digital presence into measurable revenue growth.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="py-24 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Solutions & Pricing</h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                Explore our specialized service ecosystems. Each designed to solve specific growth challenges with transparent, value-based pricing.
              </p>
            </FadeIn>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveCategory(service.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                  activeCategory === service.id 
                    ? 'bg-brand-primary text-black shadow-[0_0_20px_rgba(180,255,0,0.3)]' 
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                }`}
              >
                {service.icon}
                {service.title}
              </button>
            ))}
          </div>

          {/* Active Service Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 text-brand-primary mb-4">
                  {activeService.icon}
                  <h3 className="text-3xl font-bold">{activeService.title}</h3>
                </div>
                <p className="text-white/50 max-w-xl mx-auto">{activeService.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeService.packages.map((pkg, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={isMobile ? {} : { y: -10 }}
                    className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                      pkg.isPopular 
                        ? 'bg-brand-primary/5 border-brand-primary shadow-[0_0_40px_rgba(180,255,0,0.1)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-8">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-opacity-10`} style={{ backgroundColor: `${pkg.color}20` }}>
                        <div style={{ color: pkg.color }}>{pkg.icon}</div>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{pkg.name}</h4>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-black text-white">{pkg.price}</span>
                        {pkg.price !== 'Custom' && <span className="text-white/40 text-xs font-medium">+ GST</span>}
                      </div>
                      <p className="text-white/40 text-xs leading-relaxed">{pkg.description}</p>
                    </div>
                    <div className="flex-1 space-y-3 mb-8">
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-xs text-white/70">{feature}</span>
                        </div>
                      ))}
                      {pkg.note && (
                        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5">
                          <p className="text-[10px] text-white/40 italic leading-relaxed">
                            <span className="text-brand-primary font-bold not-italic mr-1">👉 Note:</span> {pkg.note}
                          </p>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={onContact}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 group ${
                        pkg.isPopular 
                          ? 'bg-brand-primary text-black' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Choose Plan
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass p-12 rounded-[3rem] border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-transparent text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to Build Your <br /><span className="text-brand-primary">Legacy?</span></h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Our ecosystem is ready to integrate with your business. Let's discuss which blueprint fits your current growth stage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={onContact}
                className="btn-primary px-10 py-5 text-lg w-full sm:w-auto flex items-center justify-center gap-3"
              >
                <PhoneCall size={20} />
                Book Strategy Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">
          Clickzain Digital Solutions • Precision Growth • AI Optimized
        </div>
      </footer>
    </div>
  );
};

export default CompanyProfile;
