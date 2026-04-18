import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, ArrowLeft } from 'lucide-react';

const ComingSoon = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <motion.div 
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="inline-block"
        >
          <Hammer size={64} className="text-brand-accent" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-black text-brand-maroon uppercase italic tracking-tighter">
            Coming <span className="text-brand-accent">Soon.</span>
          </h1>
          <p className="text-brand-blue/60 font-medium max-w-md mx-auto">
            This module is currently under development as part of our new digital infrastructure.
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white font-black uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors"
        >
          <ArrowLeft size={16} />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
