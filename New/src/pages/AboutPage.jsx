import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Eye, Network, Award, MessageSquare, Users, ArrowRight, Download, FileText, Shield } from 'lucide-react';
import PageHero from '../components/PageHero';

const iconMap = {
  overview: Info,
  'vision-mission': Eye,
  'org-structure': Network,
  accreditation: Award,
  messages: MessageSquare,
  committees: Users,
  downloads: Download,
  rti: FileText,
  policies: Shield,
  distinctiveness: Award
};

export default function AboutPage() {
  const [activeTabId, setActiveTabId] = useState('overview');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/page-about-config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        if (data.tabs && data.tabs.length > 0) {
          setActiveTabId(data.tabs[0].id);
        }
      })
      .catch(err => console.error("Failed to load about config:", err));
  }, []);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading...</div>;

  const activeTab = config.tabs.find(t => t.id === activeTabId) || config.tabs[0];

  return (
    <div className="w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke={config.title.split(' ')[0].toUpperCase()}
        titleFill={config.title.split(' ').slice(1).join(' ').toUpperCase()}
        statutoryLabel={config.category}
        policyLabel={config.sidebarTitle}
        rightLabel="About.Node"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Discover the <span className="text-brand-accent">legacy and vision</span> of Netaji Subhash Engineering College since 1998.
            </p>
            <div className="flex items-center gap-3 mt-4">
               <div className="h-px w-12 bg-brand-maroon" />
               <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Verified Institutional Identity</span>
            </div>
          </div>
        }
      />

      {/* Main Content layout */}
      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 glass-card p-4 space-y-2 sticky top-[120px]">
          {config.tabs.map((tab) => {
            const Icon = iconMap[tab.id] || Info;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
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
              key={activeTabId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-8 lg:p-12 min-h-[600px]"
            >
              <h2 className="text-3xl font-black text-brand-maroon uppercase tracking-tighter mb-8 border-b-2 border-brand-accent/20 pb-4 inline-block">
                {activeTab.title}
              </h2>
              
              <div className="space-y-8">
                {activeTab.content.map((block, idx) => (
                  <div key={idx} className="animate-fade-in">
                    {block.type === 'paragraph' && (
                      <p className="text-brand-muted leading-relaxed text-lg mb-6">{block.text}</p>
                    )}
                    
                    {block.type === 'list' && (
                      <ul className="space-y-4 mb-6">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 group">
                            <div className="mt-2 w-2 h-2 rounded-full bg-brand-accent shrink-0 group-hover:scale-125 transition-transform" />
                            <span className="text-brand-muted font-medium" dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.type === 'person' && (
                      <div className="flex flex-col md:flex-row gap-8 items-start bg-white/50 p-8 rounded-3xl border border-white shadow-sm mb-8">
                        <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-xl shrink-0 border-4 border-white">
                          <img src={block.image} alt={block.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-brand-maroon">{block.name}</h4>
                          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{block.role}</p>
                          <p className="text-brand-muted italic leading-relaxed">"{block.bio}"</p>
                        </div>
                      </div>
                    )}

                    {block.type === 'download' && (
                      <a 
                        href={block.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-4 px-8 py-4 bg-brand-maroon text-white rounded-2xl hover:bg-brand-accent transition-all shadow-xl hover:-translate-y-1 group"
                      >
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="font-bold">{block.text || 'Download Document'}</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
