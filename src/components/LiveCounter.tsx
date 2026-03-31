import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LiveCounter = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const socket = io();

    socket.on('visitorCount', (newCount: number) => {
      setCount(newCount);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -4, 0],
          rotate: [0, -1, 1, -1, 0]
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }
        }}
        className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.5)]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span 
              key={count}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-sm font-bold text-white tabular-nums"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-bold whitespace-nowrap">Live Visitors</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveCounter;
