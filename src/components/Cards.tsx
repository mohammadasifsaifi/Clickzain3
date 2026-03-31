import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export const ServiceCard = ({ title, description, icon: Icon, delay = 0 }: CardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={isMobile ? {} : { y: -10 }}
      className="p-6 md:p-8 rounded-2xl bg-card-bg border border-white/5 hover:border-brand-primary/30 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-primary" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </motion.div>
  );
};

interface IndustryCardProps {
  title: string;
  image: string;
  benefits: string[];
  delay?: number;
}

export const IndustryCard = ({ title, image, benefits, delay = 0 }: IndustryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden rounded-3xl group aspect-[4/5]"
    >
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center text-sm text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
