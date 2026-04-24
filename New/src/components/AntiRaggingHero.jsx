import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

const AntiRaggingHero = () => {
  return (
    <section className="relative w-full h-[8vh] min-h-[60px] overflow-hidden flex items-center">
      {/* BACKGROUND: Dark Premium Gradient */}
      <div
        className="absolute inset-0 z-0 bg-[#000000]"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #001a33 50%, #002b2b 100%)'
        }}
      />

      {/* ABSTRACT TEXTURE & PARTICLES */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,139,139,0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* NEON ACCENT LINES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-cyan-500/30 rotate-[-2deg] blur-[1px]" />
        <div className="absolute bottom-[30%] left-[-10%] w-[120%] h-[1px] bg-cyan-400/20 rotate-[1deg]" />
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-red-600/10 blur-[2px]" />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 w-full px-6 lg:px-24 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8">

          <div className="flex-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-[2px] bg-brand-accent shadow-[0_0_10px_rgba(0,139,139,0.8)]" />
              <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em]">
                Statutory Committee | Policy & Prevention
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85]"
            >
              Anti-Ragging <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Framework.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl text-white/60 text-sm lg:text-base font-medium leading-relaxed border-l-2 border-red-600/30 pl-4"
            >
              Ragging in any form is a punishable offence under UGC regulations and Indian law.
              Every student deserves a safe, respectful, and dignified campus environment.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-end gap-6"
          >
            <div className="hidden lg:flex items-center gap-4 text-white/30 font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Zero Tolerance Node</span>
              <div className="w-12 h-px bg-white/10" />
            </div>

            <button className="group relative px-8 py-4 bg-brand-maroon text-white font-black uppercase italic tracking-widest text-xs flex items-center gap-4 overflow-hidden transition-all hover:bg-white hover:text-brand-maroon shadow-2xl shadow-black/50">
              <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-white" />
              <span className="relative z-10 flex items-center gap-3">
                Report Confidentially <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </section>
  );
};

export default AntiRaggingHero;
