import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function StandardInfoPage({ configPath }) {
  const [config, setConfig] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(configPath)
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        // Default to first tab if no hash, otherwise match hash
        const hash = location.hash.replace('#', '');
        if (hash && data.tabs.some(t => t.id === hash)) {
          setActiveTabId(hash);
        } else if (data.tabs && data.tabs.length > 0) {
          setActiveTabId(data.tabs[0].id);
        }
      })
      .catch(err => console.error("Failed to load Standard Info config:", err));
  }, [configPath, location.hash]);

  const handleTabClick = (id) => {
    setActiveTabId(id);
    navigate(`#${id}`, { replace: true });
  };

  if (!config) return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading...</div>;

  const activeTab = config.tabs.find(t => t.id === activeTabId) || config.tabs[0];

  const titleParts = config.title.split(' ');
  const titleStroke = titleParts[0].toUpperCase();
  const titleFill = titleParts.slice(1).join(' ').toUpperCase();

  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke={titleStroke}
        titleFill={titleFill}
        statutoryLabel={config.category}
        policyLabel={config.sidebarTitle || "Information Panel"}
        rightLabel="Information.Node"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Accessing <span className="text-brand-accent">institutional data</span> and formal documentation for Netaji Subhash Engineering College.
            </p>
            <div className="h-px w-12 bg-brand-maroon/40" />
            <p className="text-white/45 text-[11px] font-mono uppercase tracking-[0.2em]">Verified.Institutional.Framework</p>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Institutional Life</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* T2 SIDEBAR: YELLOW ACCENT NAVIGATION */}
          <div className="w-full lg:w-80 shrink-0 sticky top-40 bg-white shadow-xl rounded-2xl overflow-hidden border border-brand-accent/20">
            <div className="bg-brand-accent px-6 py-4 border-b border-brand-accent/50">
              <h3 className="font-black text-white text-lg tracking-wide uppercase">{config.sidebarTitle || "Information"}</h3>
            </div>
            
            <div className="flex flex-col divide-y divide-brand-accent/10">
              {config.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    text-left px-6 py-4 flex items-center justify-between transition-all duration-300
                    ${activeTabId === tab.id 
                      ? 'bg-brand-accent/5 text-brand-accent border-l-4 border-l-brand-accent font-bold' 
                      : 'bg-white text-brand-blue hover:bg-gray-50 hover:text-brand-accent hover:pl-8 font-medium'
                    }
                  `}
                >
                  <span className="text-sm uppercase tracking-wide">{tab.label}</span>
                  <ChevronRight size={16} className={`transition-transform duration-300 ${activeTabId === tab.id ? 'translate-x-1 opacity-100' : 'opacity-40'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 w-full min-h-[600px] glass-card p-8 lg:p-12 relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <h2 className="text-3xl font-black text-brand-maroon uppercase tracking-tighter mb-8 border-b-2 border-brand-accent/20 pb-4 inline-block">
                  {activeTab.title}
                </h2>
                
                <div className="prose prose-lg prose-slate max-w-none text-brand-blue/80">
                  {/* Dynamic render of content blocks */}
                  {activeTab.content.map((block, idx) => (
                    <div key={idx} className="mb-8 p-6 bg-white/50 backdrop-blur-sm shadow-sm rounded-xl border border-white">
                      {block.type === 'paragraph' && (
                        <p className="leading-relaxed whitespace-pre-wrap">{block.text}</p>
                      )}
                      
                      {block.type === 'list' && (
                        <ul className="space-y-3 mt-4">
                          {block.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-brand-accent mt-1">∎</span>
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {block.type === 'person' && (
                        <div className="flex flex-col sm:flex-row gap-6 items-start mt-6 bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                          <img src={block.image} alt={block.name} className="w-32 h-32 rounded-lg object-cover shadow-md" />
                          <div>
                            <h4 className="text-2xl font-bold text-brand-maroon">{block.name}</h4>
                            <p className="text-brand-accent font-medium mb-3">{block.role}</p>
                            <p className="text-sm italic border-l-2 border-brand-accent/30 pl-4">{block.bio}</p>
                          </div>
                        </div>
                      )}
                      
                      {block.type === 'download' && (
                        <a href={block.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-accent transition-colors shadow-md mt-4">
                          Download PDF Document
                          <ChevronRight size={16} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}
