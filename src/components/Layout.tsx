import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onMouseMove?: (e: React.MouseEvent) => void;
}

export const Section = ({ children, className, id, onMouseMove }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={cn("py-24 px-6 md:px-12 max-w-7xl mx-auto", className)}
      onMouseMove={onMouseMove}
    >
      {children}
    </section>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  key?: React.Key;
}

export const FadeIn = ({ children, delay = 0, direction = 'up', className }: FadeInProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? (isMobile ? 20 : 40) : direction === 'down' ? (isMobile ? -20 : -40) : 0,
      x: direction === 'left' ? (isMobile ? 20 : 40) : direction === 'right' ? (isMobile ? -20 : -40) : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: isMobile ? delay * 0.5 : delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
