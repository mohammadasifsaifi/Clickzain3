import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Send, Sparkles, MousePointer2 } from 'lucide-react';

interface ThankYouProps {
  onBack: () => void;
}

const ClickZainLogoAnimated = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-3 mb-8"
  >
    <motion.div 
      initial={{ rotate: -45, x: -10, y: 10 }}
      animate={{ rotate: 0, x: 0, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 12
      }}
      className="relative w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(180,255,0,0.3)]"
    >
      <motion.div
        animate={{ 
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ 
          duration: 0.4, 
          delay: 1,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <MousePointer2 className="text-black w-10 h-10 fill-black" />
      </motion.div>
      
      {/* Click ripple effect */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.5], 
          opacity: [0.6, 0] 
        }}
        transition={{ 
          delay: 1.1,
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 2.6,
          ease: "easeOut"
        }}
        className="absolute w-6 h-6 bg-white rounded-full pointer-events-none"
        style={{ left: '30%', top: '30%' }}
      />
    </motion.div>
    <span className="text-2xl sm:text-4xl font-display font-black tracking-tighter text-white">CLICKZAIN</span>
  </motion.div>
);

const ThankYou = ({ onBack }: ThankYouProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="flex justify-center">
          <ClickZainLogoAnimated />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-primary/20"
        >
          <CheckCircle2 className="text-brand-primary w-12 h-12" />
        </motion.div>

        <h1 className="text-4xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter leading-tight">
          YOU'RE ALL <span className="gradient-text">SET! 🚀</span>
        </h1>
        
        <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-lg mx-auto">
          Thank you for choosing Clickzain. Our AI specialists are already reviewing your details. We'll reach out within 24 hours to schedule your strategy call.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
              <Send className="text-brand-primary w-5 h-5" />
            </div>
            <h3 className="text-white font-bold mb-2">Check Your Inbox</h3>
            <p className="text-white/40 text-sm">We've sent a confirmation email with some initial growth resources.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Sparkles className="text-purple-500 w-5 h-5" />
            </div>
            <h3 className="text-white font-bold mb-2">What's Next?</h3>
            <p className="text-white/40 text-sm">Prepare your current marketing data for our deep-dive audit session.</p>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="group flex items-center gap-3 mx-auto text-white/60 hover:text-brand-primary transition-all font-bold uppercase tracking-widest text-sm"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to Home
        </button>
      </motion.div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
    </div>
  );
};

export default ThankYou;
