import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryCategories = ['All Space', 'Campus Life', 'Tech Fest', 'Labs', 'Convocation'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All Space');
  const [selectedImage, setSelectedImage] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/page-gallery-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading gallery...</div>;

  const filteredImages = config.images.filter(img => 
    activeFilter === 'All Space' || img.category === activeFilter
  );

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

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
               {galleryCategories.map(cat => (
                  <button
                     key={cat}
                     onClick={() => setActiveFilter(cat)}
                     className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                        activeFilter === cat 
                           ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/30' 
                           : 'bg-white/5 text-brand-muted hover:bg-white/10 hover:text-white border border-white/10'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         {/* Masonry Grid Simulation using CSS columns */}
         <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
               {filteredImages.map((img) => (
                  <motion.div
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.3 }}
                     key={img.id}
                     className="relative group overflow-hidden bg-white/5 rounded-2xl break-inside-avoid cursor-pointer"
                     onClick={() => setSelectedImage(img)}
                  >
                     <div className="absolute inset-0 bg-brand-maroon/80 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center p-6 text-center">
                        <ZoomIn className="w-10 h-10 text-brand-accent mb-4 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                        <h4 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h4>
                        <p className="text-brand-accent/80 text-sm font-semibold uppercase tracking-wider mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.category}</p>
                     </div>
                     <img 
                        src={img.url} 
                        alt={img.title} 
                        className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                     />
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
         {selectedImage && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedImage(null)}
               className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12"
            >
               <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 lg:top-12 lg:right-12 w-14 h-14 bg-white/10 hover:bg-brand-accent text-white rounded-full flex items-center justify-center transition-colors z-50"
               >
                  <X className="w-6 h-6" />
               </button>
               
               <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative max-w-7xl max-h-[90vh] w-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-brand-accent/20"
                  onClick={(e) => e.stopPropagation()}
               >
                  <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full max-h-[80vh] object-contain" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-8 pt-20">
                     <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                     <p className="text-brand-accent font-semibold">{selectedImage.category}</p>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
