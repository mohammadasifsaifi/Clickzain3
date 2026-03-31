import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Zap, 
  Rocket, 
  ShieldCheck, 
  Video, 
  BarChart3, 
  Globe, 
  Target, 
  Users, 
  Bot, 
  Mail,
  ArrowRight,
  PhoneCall,
  Settings
} from 'lucide-react';

interface PlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  color: string;
  note?: string;
  icon: React.ReactNode;
  onCtaClick: () => void;
}

const PlanCard: React.FC<PlanProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  ctaText, 
  isPopular, 
  color, 
  note,
  icon,
  onCtaClick
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -10 }}
      className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
        isPopular 
          ? `bg-white/5 border-brand-primary ${isMobile ? '' : 'shadow-[0_0_40px_rgba(0,255,136,0.1)] scale-105'} z-10` 
          : 'bg-black/40 border-white/10 hover:border-white/20'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/40 text-sm mb-6">{description}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white">{price}</span>
          {price !== 'Custom' && <span className="text-white/40 text-sm font-medium">+ GST</span>}
        </div>
      </div>

      <div className="flex-1 space-y-4 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">{feature}</span>
          </div>
        ))}
        {note && (
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-white/40 italic leading-relaxed">
              <span className="text-brand-primary font-bold not-italic mr-1">👉 Note:</span> {note}
            </p>
          </div>
        )}
      </div>

      <button 
        onClick={onCtaClick}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${
          isPopular 
            ? 'bg-brand-primary text-black hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]' 
            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
        }`}
      >
        {ctaText}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

const PricingSection: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const plans = [
    {
      title: "Starter Growth",
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
      note: "In this plan, the client creates videos. Clickzain provides strategy, posting, and optimization.",
      ctaText: "Get Started"
    },
    {
      title: "Business Growth",
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
      ],
      ctaText: "Get Started"
    },
    {
      title: "Advanced Scaling",
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
      ],
      ctaText: "Get Started"
    },
    {
      title: "Custom Enterprise",
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
      ],
      ctaText: "Book a Call"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full -z-10 ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`} />
      <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full -z-10 ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Pricing & Plans
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
          >
            Invest in Your <span className="text-brand-primary">Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto text-lg"
          >
            Transparent pricing designed to scale with your business. Choose the plan that fits your current goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} {...plan} onCtaClick={onCtaClick} />
          ))}
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Need a custom solution?</h3>
            <p className="text-white/40">We can build a plan specifically tailored to your unique business requirements.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a 
              href="tel:9311295120"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4"
            >
              <PhoneCall className="w-5 h-5" />
              Call Now
            </a>
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              Schedule a Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
