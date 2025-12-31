
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';

const GreetingStep: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    soundManager.play('flip');
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 100, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ec4899', '#f472b6', '#ffffff', '#fbbf24']
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ec4899', '#f472b6', '#ffffff', '#fbbf24']
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-white tracking-tight">For My Special Someone</h2>
        <p className="text-white/40 text-lg">Tap to open my heart's letter to you</p>
      </div>

      <div 
        className="relative w-full max-w-[340px] aspect-[3/4] cursor-pointer"
        onClick={handleToggle}
        style={{ perspective: '2000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isOpen ? -180 : 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Cover */}
          <div 
            className="absolute inset-0 bg-white rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 border-[12px] border-pink-50 overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_15%,rgba(236,72,153,0.08)_0%,transparent_60%)]" />
            
            <div className="w-full h-full border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center p-6 space-y-8">
              <motion.div 
                animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-pink-500 drop-shadow-2xl"
              >
                <svg viewBox="0 0 100 100" className="w-36 h-36 fill-current">
                  <path d="M50 88.7L45.2 84.3C18.1 59.8 0 43.4 0 23.5C0 7.3 12.7 0 27.5 0C35.8 0 43.8 3.9 49 10C54.2 3.9 62.2 0 70.5 0C85.3 0 98 7.3 98 23.5C98 43.4 79.9 59.8 52.8 84.3L50 88.7Z" />
                </svg>
              </motion.div>
              
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-pink-300 uppercase tracking-[0.3em]">To My Ayshuu</h3>
                <div className="text-6xl font-black text-pink-600 tracking-tighter">2026</div>
              </div>
              
              <div className="flex items-center space-x-4 text-pink-100">
                <div className="h-px w-10 bg-current opacity-30" />
                <span className="text-sm font-black uppercase tracking-widest text-pink-400">Happy New Year</span>
                <div className="h-px w-10 bg-current opacity-30" />
              </div>
            </div>
          </div>

          {/* Letter Inside */}
          <div 
            className="absolute inset-0 bg-[#fffdfd] rounded-3xl shadow-2xl p-10 flex flex-col justify-center space-y-6 overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 to-transparent pointer-events-none" />
            
            {/* Re-enabled scrolling with hidden scrollbar utility */}
            <div className="relative space-y-4 text-gray-800 leading-relaxed text-[15px] font-medium italic overflow-y-auto scrollbar-hide pr-1">
              <p className="text-pink-600 font-bold not-italic text-2xl mb-2 underline decoration-pink-100 underline-offset-8">My Dearest Ayshuu,</p>
              <p>Looking back at 2025, the most beautiful parts were the moments I spent with you. Your love has been my greatest gift.</p>
              <p>In 2026, I want to be even better for you. I want to make you smile every day, support your wildest dreams, and hold your hand through every chapter.</p>
              <p>You are my best friend and my entire heart. Thank you for choosing me.</p>
              <p>Let's make 2026 our most magical year yet.</p>
              <div className="pt-4 border-t border-pink-50">
                <p className="font-bold text-pink-700 not-italic text-sm">Forever Yours,</p>
                <p className="text-pink-500 font-black text-3xl not-italic tracking-tighter mt-1">Samir ❤️</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="text-pink-300 font-bold tracking-widest text-center uppercase text-xs">
              Tap to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GreetingStep;
