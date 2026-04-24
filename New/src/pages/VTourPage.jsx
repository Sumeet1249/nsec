import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, PlayCircle, Calendar, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';

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
    <div className="w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke={config.hero.title.toUpperCase()}
        titleFill={config.hero.titleHighlight.toUpperCase()}
        statutoryLabel={config.hero.subtitle}
        policyLabel="Virtual Experience"
        rightLabel="Tour.Hub"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              {config.hero.description}
            </p>
            <div className="flex items-center gap-3 mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:bg-brand-accent/10 hover:border-brand-accent transition-all">
               <div className="p-2 bg-brand-accent/20 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Globe size={20} />
               </div>
               <span className="text-[11px] font-mono font-black text-white/60 uppercase tracking-widest">Launch.Experience</span>
            </div>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full">
         <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-[1.5px] bg-brand-accent" />
            <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Immersive Navigation</span>
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
          {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border-2" style={{ borderColor: 'rgb(128, 0, 0)', backgroundColor: 'rgba(128, 0, 0, 0.05)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(128, 0, 0, 0.1), rgba(178, 137, 37, 0.1))' }}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300" style={{ backgroundColor: 'rgb(128, 0, 0)' }}>
                <Map className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Campus Map</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Download our detailed campus map to navigate all departments, laboratories, facilities, and key amenities.</p>
              <button className="font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300" style={{ color: 'rgb(128, 0, 0)' }}>
                Download PDF <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border-2" style={{ borderColor: 'rgb(178, 137, 37)', backgroundColor: 'rgba(178, 137, 37, 0.08)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(178, 137, 37, 0.2), rgba(128, 0, 0, 0.1))' }}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-lg" style={{ backgroundColor: 'rgb(178, 137, 37)' }}>
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Schedule a Campus Visit</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Experience our campus firsthand. Book a guided tour with our admission counselors and explore in person.</p>
              <button className="font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300 px-6 py-2 rounded-lg text-white" style={{ backgroundColor: 'rgb(178, 137, 37)' }}>
                Book Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer accent */}
    </div>
  );
}
