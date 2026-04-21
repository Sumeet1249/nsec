import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Eye, Network, Award, MessageSquare, Users, ArrowRight } from 'lucide-react';

const iconMap = {
  overview: Info,
  vision: Eye,
  org: Network,
  accreditation: Award,
  messages: MessageSquare,
  committees: Users
};

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'org', label: 'Org Chart' },
  { id: 'accreditation', label: 'Accreditation' },
  { id: 'messages', label: 'Messages' },
  { id: 'committees', label: 'Committees' },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/page-about-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load about config:", err));
  }, []);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading...</div>;

  const tabContent = {
    overview: (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-brand-maroon">{config.content.overview.heading}</h3>
        <p className="text-brand-muted leading-relaxed">
          {config.content.overview.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {config.content.overview.stats.map((s, i) => (
            <div key={i} className="glass-card p-6">
              <h4 className="text-2xl font-bold text-brand-accent">{s.value}</h4>
              <p className="text-sm font-medium text-brand-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    vision: (
      <div className="space-y-8">
        <div className="glass-card p-8 border-l-4 border-l-brand-accent">
          <h3 className="text-2xl font-bold text-brand-maroon mb-4">Vision</h3>
          <p className="text-brand-muted leading-relaxed">{config.content.vision.visionText}</p>
        </div>
        <div className="glass-card p-8 border-l-4 border-l-brand-maroon">
          <h3 className="text-2xl font-bold text-brand-accent mb-4">Mission</h3>
          <ul className="space-y-3 text-brand-muted list-disc ml-5 leading-relaxed">
            {config.content.vision.missionPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    org: (
      <div className="space-y-6">
         <h3 className="text-3xl font-bold text-brand-maroon">Organizational Structure</h3>
         <div className="glass-card p-12 flex items-center justify-center min-h-[400px]">
            <p className="text-brand-muted italic">Interactive Org Chart Diagram goes here</p>
         </div>
      </div>
    ),
    accreditation: (
      <div className="space-y-6">
         <h3 className="text-3xl font-bold text-brand-maroon">Accreditation & Affiliation</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.content.accreditation.map((item, idx) => (
               <div key={idx} className="glass-card p-8 flex flex-col items-center text-center gap-4">
                  <Award className="w-12 h-12 text-brand-accent" />
                  <h4 className="font-bold text-brand-maroon">{item.label}</h4>
               </div>
            ))}
         </div>
      </div>
    ),
    messages: (
      <div className="space-y-8">
         <h3 className="text-3xl font-bold text-brand-maroon">Leadership Messages</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {config.content.messages.map((m, i) => (
             <div key={i} className="glass-card p-8 flex flex-col h-full">
                <h4 className="text-xl font-bold text-brand-accent mb-2">{m.title}</h4>
                <p className="text-brand-muted leading-relaxed line-clamp-4 flex-1">"{m.excerpt}"</p>
                <button className="text-brand-accent font-bold text-sm mt-4 w-fit inline-flex items-center gap-2 hover:translate-x-2 transition-transform">Read Full Message <ArrowRight className="w-4 h-4" /></button>
             </div>
           ))}
         </div>
      </div>
    ),
    committees: (
      <div className="space-y-6">
         <h3 className="text-3xl font-bold text-brand-maroon">Committees & Cells</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.content.committees.map((item, idx) => (
               <div key={idx} className="glass-card px-6 py-4 flex items-center justify-between group hover:border-brand-accent transition-colors cursor-pointer">
                  <span className="font-medium text-brand-muted group-hover:text-brand-accent transition-colors">{item}</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent/0 group-hover:text-brand-accent transition-all transform -translate-x-2 group-hover:translate-x-0" />
               </div>
            ))}
         </div>
      </div>
    )
  };

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-32 pb-24">
      {/* Header section */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full mb-16">
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
           className="text-6xl lg:text-8xl text-brand-maroon font-black uppercase tracking-tighter mt-4"
         >
           {config.hero.title} <span className="hero-serif text-brand-accent italic">{config.hero.titleHighlight}</span>
         </motion.h1>
      </section>

      {/* Main Content layout */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 glass-card p-4 space-y-2 sticky top-[120px]">
          {tabs.map((tab) => {
            const Icon = iconMap[tab.id] || Info;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all ${
                  isActive 
                    ? 'bg-brand-accent text-white font-bold shadow-lg shadow-brand-accent/30 translate-x-2' 
                    : 'text-brand-muted hover:bg-white/5 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-brand-accent/70'}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
