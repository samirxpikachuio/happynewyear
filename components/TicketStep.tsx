
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Star, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sounds';

interface Props {
  onComplete: () => void;
}

const TicketStep: React.FC<Props> = ({ onComplete }) => {
  useEffect(() => {
    soundManager.play('magic');
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#facc15', '#fbbf24', '#ffffff', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }, []);

  const perks = [
    "Unlimited Kisses (Anytime, Anywhere)",
    "Infinite Hand-Holding Sessions",
    "Spontaneous Meetings on Demand",
    "Absolute Priority & 100% Attention"
  ];

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-white tracking-tight italic">My Promise to You</h2>
        <p className="text-white/50 text-lg px-6 leading-tight">Your all-access pass to my heart and time for 2026.</p>
      </div>

      <motion.div
        initial={{ rotateX: 45, y: 100, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
        className="w-full max-w-sm relative group"
      >
        {/* The Golden Ticket Card */}
        <div className="w-full bg-gradient-to-br from-[#2a1a4a] to-[#1a1127] border-[3px] border-yellow-500/50 rounded-[2.5rem] p-1 relative overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.2)]">
          
          {/* Internal Border Design */}
          <div className="border border-yellow-500/20 rounded-[2.2rem] p-6 h-full flex flex-col space-y-6">
            
            {/* Header Area */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-[10px] text-yellow-500/60 font-black tracking-[0.3em] uppercase">Private Tier</div>
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-600 italic tracking-tighter">ULTIMATE PASS</h3>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-yellow-500/40"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Promise / Perks List */}
            <div className="space-y-4 py-4">
              <div className="text-xs text-white/40 font-bold uppercase tracking-widest border-b border-white/5 pb-2">What I Will Do For You:</div>
              <div className="grid grid-cols-1 gap-3">
                {perks.map((perk, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center space-x-3 group/item"
                  >
                    <div className="p-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                    <span className="text-sm font-semibold text-white/90 group-hover/item:text-yellow-200 transition-colors">{perk}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-4 border-t border-white/5 flex flex-col items-center space-y-4">
              <div className="text-center">
                <span className="block text-[8px] text-white/30 uppercase tracking-[0.5em] mb-1 font-bold">Authenticated By</span>
                <span className="text-2xl font-serif text-yellow-500 italic drop-shadow-sm font-black">Samir</span>
              </div>
              
              {/* Fake Barcode/ID Area */}
              <div className="w-full flex justify-between items-end">
                <div className="flex space-x-0.5 opacity-20">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-white" style={{ width: Math.random() * 3 + 1, height: 16 }} />
                  ))}
                </div>
                <div className="text-[9px] font-mono text-white/20 tracking-tighter">ID: US-2026-FOREVER</div>
              </div>
            </div>
          </div>

          {/* Ticket Edge Notches */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-10 bg-[#080212] rounded-full border-r border-yellow-500/30" />
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-10 bg-[#080212] rounded-full border-l border-yellow-500/30" />

          {/* Shine Effect */}
          <motion.div 
            animate={{ 
              left: ['-100%', '200%'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut" 
            }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { soundManager.play('tap'); onComplete(); }}
        className="text-pink-400 hover:text-pink-300 uppercase tracking-[0.3em] font-black text-sm transition-all duration-300 border-b-2 border-pink-500/20 pb-2 flex items-center space-x-3"
      >
        <span>Redeem Pass</span>
        <Star className="w-4 h-4 fill-current" />
      </motion.button>
    </div>
  );
};

export default TicketStep;
