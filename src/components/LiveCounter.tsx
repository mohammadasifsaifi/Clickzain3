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
    <div className="fixed bottom-24 left-6 z-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl shadow-brand-primary/10"
      >
        <div className="relative">
          <Users className="w-4 h-4 text-brand-primary" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            <motion.span 
              key={count}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-bold text-white leading-none"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Live Visitors</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveCounter;
