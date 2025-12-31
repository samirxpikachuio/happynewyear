
import React, { useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { soundManager } from '../utils/sounds';

interface Props {
  onComplete: () => void;
}

const HoldStep: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number | null>(null);
  const controls = useAnimation();

  const HOLD_DURATION = 1800;

  const startHolding = () => {
    setIsHolding(true);
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(nextProgress);
      if (nextProgress >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        soundManager.play('success');
        onComplete();
      }
    }, 20);
    controls.start({ scale: 1.2 });
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    controls.start({ scale: 1 });
  };

  // 2 * PI * R where R is 42 (radius in viewBox units)
  // 2 * 3.14159 * 42 ≈ 263.89
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="flex flex-col items-center justify-center space-y-12 p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="text-center space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight text-white"
        >
          Hey my love...
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/50 font-medium text-lg px-4"
        >
          I have a little surprise waiting for you.
        </motion.p>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <AnimatePresence>
          {isHolding && (
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.6, opacity: 0.3 }}
              exit={{ scale: 1, opacity: 0 }}
              className="absolute inset-0 bg-pink-500 rounded-full blur-3xl"
            />
          )}
        </AnimatePresence>

        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        >
          <circle
            cx="50" cy="50" r="42"
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50" cy="50" r="42"
            fill="transparent"
            stroke="#ec4899"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * progress)}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px #ec4899)' }}
          />
        </svg>

        <motion.button
          onPointerDown={startHolding}
          onPointerUp={stopHolding}
          onPointerLeave={stopHolding}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          className="relative z-10 w-28 h-28 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer touch-none"
        >
          <Heart className={`w-12 h-12 text-white fill-current transition-transform duration-300 ${isHolding ? 'scale-125' : ''}`} />
        </motion.button>
      </div>

      <div className="text-center">
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
          Hold my heart to unlock
        </p>
      </div>
    </div>
  );
};

export default HoldStep;
