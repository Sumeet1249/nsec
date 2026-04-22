import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, PlayCircle, Calendar } from 'lucide-react';

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
