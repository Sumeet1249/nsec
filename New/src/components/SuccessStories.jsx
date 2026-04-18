import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PlayCircle, Quote, GraduationCap, Building2, Calendar, MoveRight, X, Play, Hexagon } from 'lucide-react';
import { cn } from '../utils/cn';
import * as Lucide from 'lucide-react';

const VideoThumbnail = ({ src, thumbnail, alt }) => {
  const [imgError, setImgError] = useState(false);

  if (thumbnail && !imgError) {
    return (
      <img 
        src={thumbnail} 
        alt={alt} 
        onError={() => setImgError(true)}
        className="w-full h-full object-cover opacity-60 group-hover/video:opacity-40 transition-opacity grayscale group-hover/video:grayscale-0" 
      />
    );
  }

  return (
    <video 
      src={`${src}#t=0.5`} 
      className="w-full h-full object-cover opacity-60 group-hover/video:opacity-40 transition-opacity grayscale group-hover/video:grayscale-0"
      muted
      playsInline
      preload="metadata"
    />
  );
};

const SuccessMarquee = React.memo(({ items, reverse = false, tilt = "left" }) => {
  const duplicatedItems = React.useMemo(() => [...items, ...items], [items]);
  
  return (
    <div 
      className={cn(
        "relative py-10 overflow-hidden border-y-4 border-brand-accent/20 shadow-2xl",
        tilt === "left" ? "-skew-y-2 bg-slate-950" : "skew-y-2 bg-slate-900"
      )}
    >
      <div className={cn("flex", tilt === "left" ? "skew-y-2" : "-skew-y-2")}>
        <motion.div 
          animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ 
            duration: 240, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex gap-24 items-center whitespace-nowrap min-w-max px-12 will-change-transform"
        >
          {duplicatedItems.map((item, i) => {
            const isMaroon = i % 3 === 0;
            const isCyan = i % 3 === 1;
            
            return (
              <div key={i} className="flex items-center gap-12 group/item">
                <div className="flex flex-col items-end text-right">
                  {/* Company Name: Increased size and vibrant colors */}
                  <span className={cn(
                    "text-4xl lg:text-6xl font-black uppercase tracking-tighter italic leading-none transition-all duration-500",
                    isMaroon ? "text-brand-maroon group-hover/item:text-white group-hover/item:scale-105" : 
                    isCyan ? "text-brand-accent group-hover/item:text-white group-hover/item:scale-105" : 
                    "text-white/95 group-hover/item:text-brand-accent group-hover/item:scale-105"
                  )}>
                    {item.company}
                  </span>
                  
                  {/* Name & Designation: Increased size and contrast */}
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[12px] font-black text-white/90 uppercase tracking-[0.3em] font-mono group-hover/item:text-white">{item.name}</span>
                    <div className="w-1.5 h-4 bg-brand-accent/40" />
                    <span className="text-[12px] font-bold text-white/60 uppercase tracking-widest italic group-hover/item:text-brand-accent transition-colors">{item.designation}</span>
                  </div>
                </div>
                
                {/* High-Contrast Logo Container */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className={cn(
                    "absolute inset-0 rounded-[2rem] border-4 rotate-12 group-hover/item:rotate-0 transition-all duration-500 scale-90 bg-transparent",
                    isMaroon ? "border-brand-maroon" : isCyan ? "border-brand-accent" : "border-white/20"
                  )} />
                  
                  <div className="relative w-24 h-24 bg-white rounded-3xl overflow-hidden p-2 flex items-center justify-center z-10 shadow-lg">
                    <img 
                      src={item.logo} 
                      alt={item.company} 
                      className="w-[85%] h-[85%] object-contain group-hover/item:scale-110 transition-transform duration-500" 
                    />
                  </div>
                </div>
                
                <div className={cn(
                  "w-[2px] h-12 transition-all duration-500",
                  isMaroon ? "bg-brand-maroon" : isCyan ? "bg-brand-accent" : "bg-white/10"
                )} />
              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Decorative Glitch Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
    </div>
  );
});

const VideoCard = ({ alumni, isActive, onPlay, onStop }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col group/video"
    >
      <div 
        className="relative aspect-video bg-brand-blue overflow-hidden border border-brand-accent/40 mb-6 group-hover/video:border-brand-accent/60 transition-all shadow-2xl cursor-pointer"
        onClick={() => !isActive && onPlay(alumni.videoUrl)}
      >
        {isActive ? (
          <div className="absolute inset-0 z-50 bg-black">
            <video 
              src={alumni.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onStop();
              }}
              className="absolute top-2 right-2 p-1.5 bg-brand-accent text-brand-blue hover:bg-white transition-colors z-[60]"
              title="Close Player"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <VideoThumbnail 
              src={alumni.videoUrl} 
              thumbnail={alumni.thumbnail} 
              alt={alumni.name} 
            />
            <div className="absolute inset-0 flex items-center justify-start p-8">
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,139,139,0.5)] group-hover/video:scale-110 transition-transform">
                <PlayCircle size={24} className="text-brand-blue fill-current" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-brand-accent w-1/3 group-hover/video:w-full transition-all duration-[3000ms]" />
            </div>
          </>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-black text-brand-maroon uppercase italic tracking-tighter leading-none">
            {alumni.name}
          </h4>
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest italic leading-none">'{alumni.year.slice(-2)} Batch</span>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">
            {alumni.designation} <span className="mx-2 opacity-30">|</span> {alumni.company}
          </p>
        </div>
        <div className="pt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
          <span className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-widest">{alumni.specialization}</span>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ alumni }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white p-6 border-2 border-brand-blue/5 relative group transition-all duration-500 flex gap-6 items-center min-h-[220px] overflow-hidden hover:border-brand-accent/40"
    >
      {/* Cyan Hover Highlight */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-brand-accent group-hover:h-full transition-all duration-500" />
      
      {/* Quotation Icon: Darkened & repositioned top right */}
      <Quote className="absolute top-4 right-4 text-brand-accent/40 group-hover:text-brand-accent/60 transition-colors pointer-events-none opacity-60" size={48} />
      
      {/* Left: Large Photo - Now Rounded Rectangle */}
      <div className="shrink-0 relative z-10">
        <div className="w-28 h-28 overflow-hidden rounded-2xl border-2 border-slate-100 group-hover:border-brand-accent/20 transition-colors shadow-xl">
          <img 
            src={alumni.photo} 
            alt={alumni.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
      </div>

      {/* Middle: Info & Quote */}
      <div className="flex-1 space-y-2 relative z-10 min-w-0">
        <div className="flex items-center justify-between pr-8">
          <div className="min-w-0">
            <h4 className="text-lg font-black text-brand-blue uppercase italic tracking-tighter leading-none truncate mb-1">
              {alumni.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em] italic">
                {alumni.year} Batch
              </span>
              <div className="w-[1px] h-2 bg-brand-accent/30" />
              <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em] italic">
                {alumni.specialization}
              </span>
            </div>
          </div>
        </div>

        {/* Quote Text: Smaller Font */}
        <div className="relative border-l-2 border-brand-accent/20 pl-3">
          <p className="text-[13px] font-mono font-bold text-slate-800 leading-snug italic line-clamp-3">
            "{alumni.text}"
          </p>
        </div>

        {/* Professional Details: Optimized Footer with multi-line company */}
        <div className="flex items-end justify-between pr-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-tight">
                {alumni.designation}
              </span>
              <span className="text-[10px] font-mono font-black text-brand-maroon/80 uppercase tracking-tight">
                @ {alumni.company}
              </span>
            </div>
          </div>

          {/* Logo: Positioned bottom right - INCREASED SIZE */}
          <div className="w-20 h-20 bg-white shadow-xl border border-slate-50 p-2.5 flex items-center justify-center group-hover:-translate-y-1 transition-transform shrink-0">
            <img src={alumni.logo} alt={alumni.company} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SuccessStories({ data }) {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!data) return null;

  const validTestimonials = (data.alumniSpeak || []).filter(item => item.photo && item.logo);
  const testimonyItems = [...validTestimonials, ...validTestimonials];

  return (
    <section className="py-32 bg-white relative overflow-hidden border-t border-brand-accent/10">
      {/* Structural Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.4] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />

      <div className="px-8 lg:px-24 mb-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="space-y-4">
            <h2 className="text-7xl lg:text-9xl leading-[0.8] tracking-tighter text-brand-maroon uppercase italic font-black">
              Alumni <span className="text-brand-blue">Nexus.</span>
            </h2>
          </div>
          <div className="lg:max-w-md text-right border-r-4 border-brand-maroon pr-8 mb-2">
            <p className="font-mono text-xs font-bold uppercase text-brand-accent italic">
              "Global engineering nodes architecting future-proof systems across world-class technology hub hubs."
            </p>
          </div>
        </div>
      </div>

      {/* Oblique Marquee Section */}
      <div className="mb-40 space-y-6 relative z-10">
        <SuccessMarquee items={data.marquee.slice(0, 10)} tilt="left" />
        <SuccessMarquee items={data.marquee.slice(10)} reverse tilt="right" />
      </div>

      <div className="px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        {/* Left: Experiences (2x2 Grid) */}
        <div className="lg:col-span-7 space-y-16">
          <div className="flex items-center justify-between border-b border-brand-accent/40 pb-4">
            <h3 className="text-2xl font-black italic tracking-tighter text-brand-maroon uppercase">Experiences</h3>
            <button className="text-[10px] font-black text-brand-blue hover:text-brand-accent transition-colors uppercase tracking-[0.3em] flex items-center gap-2 group">
              Experience_Archive <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.alumniVideos.slice(0, 4).map((v, i) => (
              <VideoCard 
                key={i} 
                alumni={v} 
                isActive={activeVideo === v.videoUrl}
                onPlay={setActiveVideo} 
                onStop={() => setActiveVideo(null)}
              />
            ))}
          </div>
        </div>

        {/* Right: Testimony (Infinite Scroll + Static) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-brand-accent/40 pb-4 mb-10">
            <h3 className="text-2xl font-black italic tracking-tighter text-brand-maroon uppercase">Testimony</h3>
            <button className="text-[10px] font-black text-brand-blue hover:text-brand-accent transition-colors uppercase tracking-[0.3em] flex items-center gap-2 group">
              Testimony_Archive <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Refined Testimony Container - Height adjusted to align with left side grid */}
          <div className="relative h-[480px] overflow-hidden group/testimonials border-2 border-brand-blue/5 bg-slate-50/30 mask-fade-y">
            {/* Infinite scrolling items */}
            <motion.div 
              animate={{ y: ["0%", "-50%"] }}
              transition={{ 
                duration: 80,
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="space-y-4 absolute top-0 left-0 w-full p-4"
            >
              {testimonyItems.map((a, i) => (
                <TestimonialCard key={i} alumni={a} />
              ))}
            </motion.div>
            
            {/* Technical Detail: Vertical Label */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 opacity-20 pointer-events-none">
              <span className="vertical-label text-[7px]">SCROLL_SEQUENCE_ACTIVE</span>
            </div>
          </div>

          {/* Static Placeholder Card */}
          <motion.div 
            whileHover={{ scale: 1.02, backgroundColor: "var(--color-brand-blue)" }}
            className="mt-4 p-6 border-2 border-brand-blue/5 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer transition-all duration-500 shadow-xl bg-white relative z-30 h-[140px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:rotate-12 transition-all duration-500 shadow-md">
              <GraduationCap className="text-brand-accent group-hover:text-white transition-colors" size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-brand-blue group-hover:text-white uppercase italic tracking-tighter">Register Your Trajectory</h4>
              <p className="text-[10px] font-bold text-slate-600 group-hover:text-white/70 uppercase tracking-widest leading-relaxed px-4">Integrate your professional achievements into the Global Alumni Infrastructure.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}