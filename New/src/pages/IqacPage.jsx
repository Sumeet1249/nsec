import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Rocket, Shield, ArrowRight, BookOpen } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Rocket: Rocket,
  Shield: Shield
};

export default function IqacPage({ configPath }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(configPath)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, [configPath]);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading...</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pt-32">
      <section className="px-6 lg:px-12 py-16 max-w-[1800px] mx-auto w-full">
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
               className="text-6xl lg:text-8xl text-brand-maroon font-black uppercase tracking-tighter"
             >
               {config.hero.title} <br />
               <span className="hero-serif text-brand-accent italic">{config.hero.titleHighlight}</span>
             </motion.h1>
          </div>
          
          <div className="lg:col-span-4 pb-4">
             <p className="text-xl text-brand-muted font-medium leading-relaxed border-l-2 border-brand-accent pl-8">
               Ensuring continuous improvement in the entire operations of the institution.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.content.map((prog, i) => {
            const Icon = Rocket;
            return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-card p-12 flex flex-col justify-between group"
               >
                 <div>
                   <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-10 group-hover:bg-brand-accent group-hover:text-white transition-all">
                     <Icon className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl text-white mb-4">{prog.title}</h2>
                   <p className="text-brand-muted font-medium mb-10 leading-relaxed">{prog.desc}</p>
                   
                   <ul className="space-y-4 mb-12">
                     {prog.items.map((item, j) => (
                       <li key={j} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                         {item}
                       </li>
                     ))}
                   </ul>
                 </div>
   
                 <button className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-3">
                   View Documents <ArrowRight className="w-4 h-4" />
                 </button>
               </motion.div>
             )
          })}
        </div>
      </section>
    </div>
  );
}
