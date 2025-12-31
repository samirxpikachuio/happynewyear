
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartOff, Clock, Sparkles, ShieldCheck, Gift, History, BellOff, ZapOff } from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/sounds';

const INITIAL_CARDS: CardItem[] = [
  { id: '1', text: 'Misunderstandings', icon: 'HeartOff', color: 'from-rose-500/80 to-pink-700/80' },
  { id: '2', text: 'The Daily Rush', icon: 'Clock', color: 'from-blue-500/80 to-indigo-600/80' },
  { id: '3', text: 'Unnecessary Stress', icon: 'ZapOff', color: 'from-amber-500/80 to-orange-600/80' },
  { id: '4', text: 'Life\'s Distractions', icon: 'BellOff', color: 'from-violet-500/80 to-purple-600/80' },
];

const IconMap: Record<string, React.FC<any>> = { HeartOff, Clock, Sparkles, ShieldCheck, History, BellOff, ZapOff };

interface Props {
  onComplete: () => void;
}

const DistractionsStep: React.FC<Props> = ({ onComplete }) => {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);

  const removeCard = (id: string) => {
    soundManager.play('whoosh');
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const getSubtext = (text: string) => {
    switch(text) {
      case 'Misunderstandings': return 'Choosing patience and soft words';
      case 'The Daily Rush': return 'Slowing down to enjoy every moment';
      case 'Unnecessary Stress': return 'Protecting the peace in our home';
      case 'Life\'s Distractions': return 'Giving you my undivided heart';
      default: return 'Swipe to clear the path';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-3 z-10 px-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Filtering our 2026...</h2>
        <p className="text-white/50 text-lg">Swiping away what we don't need for us</p>
      </div>

      <div className="relative w-72 h-96 flex items-center justify-center">
        <AnimatePresence>
          {cards.length === 0 && (
            <motion.button
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={() => { soundManager.play('tap'); onComplete(); }}
              className="relative z-50 w-44 h-44 bg-gradient-to-tr from-pink-600 to-rose-500 rounded-[3rem] flex items-center justify-center shadow-[0_0_80px_rgba(236,72,153,0.5)] border-2 border-white/20 cursor-pointer"
            >
              <Gift className="w-20 h-20 text-white drop-shadow-lg" />
              <div className="absolute -bottom-14 whitespace-nowrap text-pink-300 font-bold tracking-[0.3em] uppercase text-[10px] animate-pulse text-center">
                Ready for our <br/>new beginning?
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {cards.map((card, index) => {
              const IconComp = IconMap[card.icon];
              return (
                <motion.div
                  key={card.id}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 120) {
                      removeCard(card.id);
                    }
                  }}
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ 
                    scale: 1 - (index * 0.05), 
                    y: index * -10,
                    opacity: 1,
                    rotate: (index - cards.length / 2) * 2
                  }}
                  exit={{ 
                    x: Math.random() > 0.5 ? 800 : -800, 
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0, 
                    rotate: 120,
                    scale: 0.2
                  }}
                  className={`absolute w-full h-full bg-gradient-to-br ${card.color} backdrop-blur-md rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-8 cursor-grab active:cursor-grabbing border border-white/20 flex flex-col items-center justify-center space-y-6 pointer-events-auto transition-all hover:shadow-pink-500/30`}
                  style={{ zIndex: 100 - index }}
                >
                  <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md border border-white/10 shadow-inner">
                    <IconComp className="w-16 h-16 text-white" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <span className="text-2xl font-black text-white tracking-tight block drop-shadow-md">
                      {card.text}
                    </span>
                    <span className="text-white/80 text-sm font-medium italic block px-4 leading-tight">
                      {getSubtext(card.text)}
                    </span>
                  </div>

                  <div className="absolute bottom-8 flex flex-col items-center space-y-2">
                    <div className="w-12 h-1 bg-white/20 rounded-full" />
                    <div className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-black">
                      Swipe to leave behind
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DistractionsStep;
