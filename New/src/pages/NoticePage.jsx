import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Calendar, Tag, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';

const categories = ['All', 'Academic', 'Examination', 'Events', 'Placement', 'Admin', 'General', 'Library'];

export default function NoticePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/page-notices-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading notices...</div>;

  const filteredNotices = config.notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || notice.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke={config.hero.title.toUpperCase()}
        titleFill={config.hero.titleHighlight.toUpperCase()}
        statutoryLabel={config.hero.subtitle}
        policyLabel="Bulletin Board"
        rightLabel="Notices.Hub"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Stay updated with the latest <span className="text-brand-accent">academic and administrative</span> announcements.
            </p>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
               <span className="text-[10px] font-mono text-white/60 uppercase">Total Notices</span>
               <span className="text-xl font-black text-brand-accent italic">{config.notices.length}</span>
            </div>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1500px] mx-auto w-full">

         {/* Filter Bar */}
         <div className="glass-card p-6 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted w-5 h-5" />
               <input 
                  type="text" 
                  placeholder="Search notices..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               <Filter className="text-brand-accent w-5 h-5 flex-shrink-0 mr-2" />
               {categories.map(cat => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === cat 
                           ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/30' 
                           : 'bg-white/5 text-brand-muted hover:bg-white/10 hover:text-white border border-transparent'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         {/* Notices List */}
         <div className="space-y-4">
            {filteredNotices.length > 0 ? (
               filteredNotices.map((notice, idx) => (
                  <motion.div
                     key={notice.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     className="glass-card p-6 hover:border-brand-accent/50 transition-colors group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                     <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                           {notice.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-brand-muted">
                           <span className="flex items-center gap-1.5 bg-brand-bg px-3 py-1 rounded-full text-brand-accent">
                              <Tag className="w-3.5 h-3.5" /> {notice.category}
                           </span>
                           <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" /> {notice.date}
                           </span>
                        </div>
                     </div>
                     <div className="w-full sm:w-auto">
                        <a href={notice.url} className="w-full sm:w-auto btn-primary !py-3 px-6 flex items-center justify-center gap-2">
                           <Download className="w-4 h-4" /> 
                           <span>Download PDF</span>
                           <span className="opacity-50 text-xs ml-1">({notice.size})</span>
                        </a>
                     </div>
                  </motion.div>
               ))
            ) : (
               <div className="glass-card p-16 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-muted">
                     <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No notices found</h3>
                  <p className="text-brand-muted">Try adjusting your search or category filter.</p>
               </div>
            )}
         </div>
      </section>
    </div>
  );
}
