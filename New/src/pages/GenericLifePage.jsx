import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Music, Coffee, Heart, Compass, Zap, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Camera: Camera,
  Music: Music,
  Coffee: Coffee,
  Heart: Heart,
  Compass: Compass,
  Zap: Zap
};

export default function GenericLifePage({ configPath }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(configPath)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, [configPath]);

  if (!config) return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading...</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pt-32">
      <section className="px-6 lg:px-12 py-32 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
             >
               <span className="section-label !mb-0">{config.hero.subtitle}</span>
               <div className="h-px w-12 bg-brand-accent/20" />
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-7xl lg:text-9xl text-brand-maroon font-black uppercase tracking-tighter"
             >
               {config.hero.title} <br />
               <span className="hero-serif text-brand-accent italic">{config.hero.titleHighlight}</span>
             </motion.h1>
          </div>
          
          <div className="lg:col-span-4 pb-4">
             <p className="text-xl text-brand-muted font-medium leading-relaxed border-l-2 border-brand-accent pl-8">
               {config.hero.description}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {config.features.map((item, i) => {
             const IconComponent = iconMap[item.icon] || Zap;
             return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-12 space-y-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-white/5 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl text-white group-hover:text-brand-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-brand-muted font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {config.media && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-40">
            <div className="lg:col-span-4 aspect-square glass-card bg-brand-surface p-12 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none" />
              <span className="section-label">{config.media.label}</span>
              <div className="space-y-4 relative z-10">
                <h2 className="text-5xl text-white font-bold leading-none" dangerouslySetInnerHTML={{ __html: config.media.title }}></h2>
                <p className="text-brand-muted text-sm font-medium tracking-wide uppercase">{config.media.subtitle}</p>
              </div>
              <ArrowUpRight className="absolute bottom-12 right-12 w-10 h-10 text-white/10 group-hover:text-brand-accent transition-all" />
            </div>
            <div className="lg:col-span-8 aspect-video lg:aspect-auto rounded-[3rem] overflow-hidden border border-white/5 group relative">
              <img 
                src={config.media.image} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                alt="Highlight Scene"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-xs font-bold tracking-[0.5em] text-white">INTERACTIVE_VIEW</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
