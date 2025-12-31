
import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Step } from './types';
import { soundManager } from './utils/sounds';
import HoldStep from './components/HoldStep';
import DistractionsStep from './components/DistractionsStep';
import TicketStep from './components/TicketStep';
import MomentsStep from './components/MomentsStep';
import GreetingStep from './components/GreetingStep';

const PRELOAD_IMAGES = [
  'https://i.postimg.cc/x8bztZRv/Picsart-25-12-31-21-46-19-631.jpg',
  'https://i.postimg.cc/6pQGPTY7/IMG-20251231-215056-005.jpg',
  'https://i.postimg.cc/sXbcj7Hw/IMG_20251231_WA0005.jpg',
  'https://i.postimg.cc/xCBRfMpR/IMG_20251231_WA0004.jpg',
  'https://www.transparenttextures.com/patterns/paper-fibers.png',
  'https://www.transparenttextures.com/patterns/handmade-paper.png'
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.HOLD);

  useEffect(() => {
    // Start background music listener
    const startMusic = () => {
      soundManager.startBgMusic();
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
    window.addEventListener('click', startMusic);
    window.addEventListener('touchstart', startMusic);

    // Pre-load all critical images
    PRELOAD_IMAGES.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    return () => {
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case Step.HOLD: return Step.DISTRACTIONS;
        case Step.DISTRACTIONS: return Step.TICKET;
        case Step.TICKET: return Step.MOMENTS;
        case Step.MOMENTS: return Step.GREETING;
        default: return Step.HOLD;
      }
    });
  }, []);

  // Helper for star colors
  const getStarColor = (i: number) => {
    if (i % 7 === 0) return 'rgba(191, 219, 254, 0.8)'; // Soft Blue
    if (i % 5 === 0) return 'rgba(252, 165, 165, 0.8)'; // Soft Rose
    return 'rgba(255, 255, 255, 0.8)'; // Pure White
  };

  return (
    <div className="relative w-full h-screen bg-[#080212] text-white overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            background: [
              'radial-gradient(circle_at 50% 50%, #1a0b3c 0%, #080212 100%)',
              'radial-gradient(circle_at 40% 60%, #1e0d4a 0%, #080212 100%)',
              'radial-gradient(circle_at 60% 40%, #160833 0%, #080212 100%)',
              'radial-gradient(circle_at 50% 50%, #1a0b3c 0%, #080212 100%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-80" 
        />
        
        {/* Drifting Stars with Multi-layer Parallax Feel */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.8 + 0.2,
              opacity: Math.random() * 0.4 + 0.1
            }}
            animate={{
              opacity: [0.1, 0.9, 0.3, 0.9, 0.1],
              scale: [1, 1.3, 0.8, 1.2, 1],
              x: [null, (Math.random() > 0.5 ? "+=40" : "-=40")],
              y: [null, (Math.random() > 0.5 ? "+=40" : "-=40")],
            }}
            transition={{
              duration: 5 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              width: i % 10 === 0 ? '3px' : '1.5px', 
              height: i % 10 === 0 ? '3px' : '1.5px',
              backgroundColor: getStarColor(i),
              filter: i % 10 === 0 ? 'blur(1px)' : 'none',
              boxShadow: i % 10 === 0 ? `0 0 8px ${getStarColor(i)}` : 'none'
            }}
          />
        ))}

        {/* Floating Bokeh Orbs with Fluid Color Shifts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full blur-[120px]"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              width: 250 + Math.random() * 450,
              height: 250 + Math.random() * 450,
              backgroundColor: i % 2 === 0 ? 'rgba(236, 72, 153, 0.05)' : 'rgba(124, 58, 237, 0.05)',
              opacity: 0.4
            }}
            animate={{
              x: [(Math.random() * 100) + "%", (Math.random() * 100) + "%", (Math.random() * 100) + "%"],
              y: [(Math.random() * 100) + "%", (Math.random() * 100) + "%", (Math.random() * 100) + "%"],
              backgroundColor: [
                'rgba(236, 72, 153, 0.06)',
                'rgba(124, 58, 237, 0.06)',
                'rgba(79, 70, 229, 0.06)',
                'rgba(236, 72, 153, 0.06)',
              ],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              duration: 25 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-lg z-10"
        >
          {currentStep === Step.HOLD && <HoldStep onComplete={nextStep} />}
          {currentStep === Step.DISTRACTIONS && <DistractionsStep onComplete={nextStep} />}
          {currentStep === Step.TICKET && <TicketStep onComplete={nextStep} />}
          {currentStep === Step.MOMENTS && <MomentsStep onComplete={nextStep} />}
          {currentStep === Step.GREETING && <GreetingStep />}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/10 text-[10px] tracking-[0.4em] uppercase font-bold pointer-events-none text-center">
        New Year 2026 • For My Ayshuu
      </div>
    </div>
  );
};

export default App;
