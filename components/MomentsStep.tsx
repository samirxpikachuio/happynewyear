
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sounds';

const MOMENTS = [
  { 
    id: 1, 
    url: 'https://i.postimg.cc/x8bztZRv/Picsart-25-12-31-21-46-19-631.jpg', 
    caption: 'Through every frame my heart chooses you' 
  },
  { 
    id: 2, 
    url: 'https://i.postimg.cc/6pQGPTY7/IMG-20251231-215056-005.jpg', 
    caption: 'I hope we can stay together in this life and the hereafter.' 
  },
  { 
    id: 3, 
    url: 'https://i.postimg.cc/sXbcj7Hw/IMG_20251231_WA0005.jpg', 
    caption: 'Every time we meet, my heart skips a beat.' 
  },
  { 
    id: 4, 
    url: 'https://i.postimg.cc/xCBRfMpR/IMG_20251231_WA0004.jpg', 
    caption: 'Being by your side is my favorite place' 
  },
];

interface Props {
  onComplete: () => void;
}

const MomentsStep: React.FC<Props> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  const handleTap = () => {
    soundManager.play('shutter');
    if (index === MOMENTS.length - 1) {
      onComplete();
    } else {
      setIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="text-center space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white tracking-tight"
        >
          Our 2025 Together
        </motion.h2>
        <p className="text-white/40 italic">Tap to flip through our memories</p>
      </div>

      <motion.div
        onClick={handleTap}
        className="relative w-full max-w-[320px] aspect-[4/5] bg-white p-3 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-sm cursor-pointer overflow-hidden"
        initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
        animate={{ rotate: index % 2 === 0 ? -2 : 2, scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="relative w-full h-[85%] overflow-hidden bg-gray-200 rounded-sm">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={MOMENTS[index].id}
              src={MOMENTS[index].url}
              alt="Memory"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </AnimatePresence>
          
          {/* Shutter Flash Effect */}
          <AnimatePresence>
            <motion.div
              key={`flash-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-white pointer-events-none z-10"
            />
          </AnimatePresence>
        </div>
        
        <div className="h-[15%] flex items-center justify-center p-2">
          <AnimatePresence mode="wait">
            <motion.p 
              key={MOMENTS[index].id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-gray-800 font-bold font-serif text-center text-sm italic tracking-tight"
            >
              {MOMENTS[index].caption}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-15 pointer-events-none" />
      </motion.div>

      <div className="flex flex-col items-center space-y-3">
        <div className="flex space-x-2">
          {MOMENTS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-pink-500' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
        <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase font-black">
          {index + 1} / {MOMENTS.length}
        </p>
      </div>
    </div>
  );
};

export default MomentsStep;
