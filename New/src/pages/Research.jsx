import React from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Globe, 
  Lightbulb, 
  ArrowUpRight,
  Database,
  Cpu
} from 'lucide-react';

const researchAreas = [
  {
    title: 'Advanced AI & Machine Learning',
    desc: 'Exploring neural architectures, predictive modeling, and intelligent systems.',
    icon: Cpu,
    stats: '45+ ACTIVE PROJECTS'
  },
  {
    title: 'Sustainable Energy Systems',
    desc: 'Researching renewable energy integration and smart grid optimization.',
    icon: Globe,
    stats: '12 PATENTS FILED'
  },
  {
    title: 'Biotechnology & Bioinformatics',
    desc: 'Innovating at the intersection of life sciences and computational engineering.',
    icon: Microscope,
    stats: '80+ RESEARCH PAPERS'
  },
  {
    title: 'Data Integrity & Cybersecurity',
    desc: 'Securing the future of decentralized networks and information systems.',
    icon: Database,
    stats: 'OPEN LABS'
  }
];

export default function Research() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pt-32">
      <section className="px-6 lg:px-12 py-32 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
             >
               <span className="section-label !mb-0">Innovation Ecosystem</span>
               <div className="h-px w-12 bg-brand-accent/20" />
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-7xl lg:text-9xl text-brand-maroon font-black uppercase tracking-tighter"
             >
               Intellectual Capital <br />
               <span className="hero-serif text-brand-accent italic">Hub.</span>
             </motion.h1>
          </div>
          
          <div className="lg:col-span-4 lg:pt-16">
             <div className="glass-card p-12 bg-brand-surface border-brand-accent/20 relative overflow-hidden group">
                <Lightbulb className="w-12 h-12 text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-2xl font-serif italic text-white leading-relaxed mb-8">
                   "We solve complex engineering challenges through rigorous inquiry and industrial collaboration."
                </p>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Dean of Research</span>
                  <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider mt-1">Netaji Subhash Engineering College</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {researchAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 space-y-10 group"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                <area.icon className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl text-white group-hover:text-brand-accent transition-colors">{area.title}</h3>
                <p className="text-sm text-brand-muted font-medium leading-relaxed">{area.desc}</p>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-brand-accent">{area.stats}</span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-brand-accent transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-y border-white/5 py-32 text-center space-y-16">
          <span className="section-label mx-auto w-fit">Global Alliances</span>
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-32 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {['MIT', 'STANFORD', 'TATA', 'GOOGLE', 'ISRO', 'NASA'].map(partner => (
              <span key={partner} className="text-3xl md:text-5xl font-bold tracking-tighter text-white cursor-default select-none">{partner}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
