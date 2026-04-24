import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Music, 
  Coffee, 
  Heart, 
  Compass,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Life() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke="CAMPUS"
        titleFill="DYNAMICS"
        statutoryLabel="Campus Culture"
        policyLabel="Student Lifestyle"
        rightLabel="Life.Node"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              "Where <span className="text-brand-accent">academic rigor</span> meets a vibrant community of innovators and creators."
            </p>
            <div className="flex items-center gap-3 mt-4">
               <div className="w-8 h-[1px] bg-brand-maroon" />
               <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Active Community</span>
            </div>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Institutional Life</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Technical Societies', icon: Zap, desc: 'Student-led communities pushing the boundaries of robotics, coding, and innovation.' },
            { title: 'Cultural Heritage', icon: Music, desc: 'Celebrating diversity through annual festivals, performance arts, and creative expression.' },
            { title: 'Collaborative Spaces', icon: Coffee, desc: 'Designed environments that foster spontaneous interaction and intellectual exchange.' },
            { title: 'Social Responsibility', icon: Heart, desc: 'Connecting technical skills with philanthropic missions for meaningful social impact.' },
            { title: 'Technical Expeditions', icon: Compass, desc: 'Regular industry engagements and site visits for immersive professional exposure.' },
            { title: 'Visual Archive', icon: Camera, desc: 'Capturing the essence of collegiate life through professional documentation and media.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 space-y-8 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-white/5 group-hover:bg-brand-accent group-hover:text-white transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl text-white group-hover:text-brand-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-brand-muted font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-40">
          <div className="lg:col-span-4 aspect-square glass-card bg-brand-surface p-12 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none" />
            <span className="section-label">Media Protocol</span>
            <div className="space-y-4 relative z-10">
              <h2 className="text-5xl text-white font-bold leading-none">The <br /> Visual <br /> <span className="hero-serif text-brand-accent">Archive</span></h2>
              <p className="text-brand-muted text-sm font-medium tracking-wide uppercase">High Resolution Campus Life</p>
            </div>
            <ArrowUpRight className="absolute bottom-12 right-12 w-10 h-10 text-white/10 group-hover:text-brand-accent transition-all" />
          </div>
          <div className="lg:col-span-8 aspect-video lg:aspect-auto rounded-[3rem] overflow-hidden border border-white/5 group relative">
            <img 
              src="https://images.unsplash.com/photo-1523050335192-ce1dea059011?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
              alt="Campus Scene"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs font-bold tracking-[0.5em] text-white">LIVE_FEED_STREAMING</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
