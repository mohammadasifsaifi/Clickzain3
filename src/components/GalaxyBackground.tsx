import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Search, 
  Globe, 
  Brain, 
  Target, 
  Share2, 
  Zap,
  Cpu,
  BarChart3
} from 'lucide-react';

const GalaxyBackground = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Generate random stars - reduced count for mobile
  const stars = useMemo(() => {
    const count = isMobile ? 50 : 200;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, [isMobile]);

  // Shooting stars - fewer on mobile
  const shootingStars = useMemo(() => {
    const count = isMobile ? 2 : 6;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
      duration: Math.random() * 2 + 2
    }));
  }, [isMobile]);

  // Marketing service elements
  const floatingElements = [
    { Icon: Facebook, color: '#1877F2', top: '15%', left: '12%', scale: 1.2, label: 'Facebook' },
    { Icon: Instagram, color: '#E4405F', top: '45%', left: '88%', scale: 1.4, label: 'Instagram' },
    { Icon: Target, color: '#B4FF00', top: '25%', left: '78%', scale: 1.3, label: 'Meta Ads' },
    { Icon: Search, color: '#4285F4', top: '12%', left: '65%', scale: 1.5, label: 'Google / SEO' },
    { Icon: Globe, color: '#00F0FF', top: '68%', left: '82%', scale: 1.4, label: 'GEO' },
    { Icon: Brain, color: '#A855F7', top: '82%', left: '18%', scale: 1.6, label: 'AIO / AI' },
    { Icon: Share2, color: '#3B82F6', top: '75%', left: '10%', scale: 1.1, label: 'Networking' },
    { Icon: Zap, color: '#EAB308', top: '35%', left: '22%', scale: 1.2, label: 'Performance' },
  ];

  // Parallax transforms - disabled on mobile for performance
  const backgroundY = useTransform(smoothProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);
  const nebulaRotate = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [0, 30]);
  const elementsY = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020205]">
      {/* Deep Space Nebula Layers */}
      <motion.div 
        style={isMobile ? {} : { y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Primary Nebula */}
        <div className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-primary/10 ${isMobile ? 'blur-[80px]' : 'blur-[150px] animate-pulse'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/10 ${isMobile ? 'blur-[80px]' : 'blur-[150px] animate-pulse'}`} style={{ animationDelay: '2s' }} />
        
        {/* Secondary Accents */}
        <div className={`absolute top-[20%] right-[15%] w-[40%] h-[40%] rounded-full bg-purple-600/5 ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`} />
        <div className={`absolute middle-0 left-[30%] w-[30%] h-[30%] rounded-full bg-cyan-500/5 ${isMobile ? 'blur-[50px]' : 'blur-[100px]'}`} />
      </motion.div>

      {/* Orbital Rings (Solar System Feel) */}
      <motion.div 
        style={isMobile ? {} : { rotate: nebulaRotate }}
        className="absolute inset-0 flex items-center justify-center opacity-10"
      >
        <div className="absolute w-[140vw] h-[140vw] border-[1px] border-white/10 rounded-full" />
        <div className="absolute w-[100vw] h-[100vw] border-[1px] border-white/5 rounded-full" />
        <div className="absolute w-[60vw] h-[60vw] border-[1px] border-white/5 rounded-full" />
        
        {/* Rotating Glow */}
        <div className="absolute w-full h-full animate-[spin_120s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgba(180,255,0,0.05),transparent)]" />
      </motion.div>

      {/* Shooting Stars - Disabled on mobile */}
      {!isMobile && shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          initial={{ x: '-100%', y: '-100%', opacity: 0 }}
          animate={{ 
            x: ['0%', '200%'], 
            y: ['0%', '200%'], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
            repeatDelay: Math.random() * 15 + 5
          }}
          className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[45deg]"
          style={{
            top: star.top,
            left: star.left,
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: star.opacity }}
          animate={isMobile ? {} : { opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
          transition={isMobile ? {} : {
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            boxShadow: (!isMobile && star.size > 1.5) ? `0 0 ${star.size * 2}px rgba(255,255,255,0.8)` : 'none'
          }}
        />
      ))}

      {/* Floating Marketing Icons - Simplified or disabled on mobile */}
      {floatingElements.map((el, i) => {
        // Only show 4 icons on mobile to save resources
        if (isMobile && i >= 4) return null;
        
        return (
          <motion.div
            key={`icon-${i}`}
            style={{ 
              y: elementsY,
              top: el.top,
              left: el.left,
              scale: el.scale,
            }}
            animate={isMobile ? { 
              y: [0, -10, 10, 0],
            } : { 
              x: [0, 20, -20, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: isMobile ? 8 + i : 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute flex flex-col items-center gap-2 group"
          >
            <div 
              className="relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:border-white/30"
              style={{ 
                boxShadow: isMobile ? 'none' : `0 0 20px ${el.color}20`,
                color: el.color 
              }}
            >
              <el.Icon size={isMobile ? 24 : 32} strokeWidth={1.5} className="drop-shadow-[0_0_8px_currentColor]" />
              
              {/* Glow Aura - Disabled on mobile */}
              {!isMobile && (
                <div 
                  className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: el.color }}
                />
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors">
              {el.label}
            </span>
          </motion.div>
        );
      })}

      {/* Subtle Scanline / Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,5,0.4)_100%)]" />
    </div>
  );
};

export default GalaxyBackground;

