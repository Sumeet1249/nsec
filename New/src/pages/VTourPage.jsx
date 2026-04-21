import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, PlayCircle } from 'lucide-react';

export default function VTourPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/page-vtour-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading tour...</div>;

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-32 pb-24">
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-4 mb-4"
         >
           <span className="section-label !mb-0">{config.hero.subtitle}</span>
           <div className="h-px w-12 bg-brand-accent/20" />
         </motion.div>
         
         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-8xl text-brand-maroon font-black uppercase tracking-tighter"
            >
              {config.hero.title} <br />
              <span className="hero-serif text-brand-accent italic">{config.hero.titleHighlight}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-muted max-w-2xl leading-relaxed border-l-2 border-brand-accent pl-6 lg:mb-4"
            >
              {config.hero.description}
            </motion.p>
         </div>

         {/* 360 Tour Container */}
         <div className="glass-card p-4 lg:p-6 mb-16 relative">
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] bg-black rounded-xl overflow-hidden relative group">
               {!isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://source.unsplash.com/1600x900/?university,building')] bg-cover bg-center">
                     <div className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm group-hover:bg-brand-bg/60 transition-colors" />
                     <div className="z-10 flex flex-col items-center">
                        <button 
                           onClick={() => setIsPlaying(true)}
                           className="w-24 h-24 bg-brand-accent text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-brand-accent/30 mb-6"
                        >
                           <PlayCircle className="w-12 h-12 ml-1" />
                        </button>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Start 360° Campus Tour</h3>
                        <p className="text-brand-accent mt-2 font-medium tracking-widest uppercase text-sm">Interactive Experience</p>
                     </div>
                  </div>
               ) : (
                  <div className="w-full h-full bg-brand-bg/50 flex flex-col items-center justify-center">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        className="w-full h-full min-h-[400px]"
                        src={config.embed} 
                        title="Virtual Tour" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     ></iframe>
                  </div>
               )}
            </div>
         </div>

         {/* Campus Map CTA */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-12 flex flex-col md:flex-row items-center gap-8 group">
               <div className="w-20 h-20 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Map className="w-10 h-10" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Campus Map</h3>
                  <p className="text-brand-muted mb-4 leading-relaxed">Download our detailed campus map to easily locate departments, labs, and amenities.</p>
                  <button className="text-brand-accent font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all">Download PDF <ArrowRight className="w-4 h-4" /></button>
               </div>
            </div>
            
            <div className="glass-card p-12 bg-white/5 border border-brand-accent/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Schedule a Visit</h3>
                  <p className="text-brand-muted mb-6 leading-relaxed">Prefer to see it in person? Book a guided campus tour with our admission counselors.</p>
                  <button className="btn-primary">Book Campus Tour</button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
