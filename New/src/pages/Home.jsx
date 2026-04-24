import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import Layout from '../components/Layout';
import SuccessStories from '../components/SuccessStories';
import { 
  Square,
  Circle,
  Triangle,
  MoveRight,
  ArrowDownCircle,
  Box,
  Layers,
  Container,
  Compass,
  Activity,
  Zap,
  Target,
  Sparkles,
  Globe,
  MapPin,
  Mail,
  Award,
  BookOpen,
  Phone,
  GraduationCap,
  PlayCircle,
  Megaphone,
  Quote,
  ArrowUpRight,
  X,
  Maximize
} from 'lucide-react';
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
      src={`${src}#t=0.1`} 
      className="w-full h-full object-cover opacity-60 group-hover/video:opacity-40 transition-opacity grayscale group-hover/video:grayscale-0"
      muted
      playsInline
      preload="metadata"
    />
  );
};

const SplitHeading = ({ text, className }) => {
  const words = text.split(' ');
  if (words.length <= 1) return <span className={className}>{text}</span>;
  const lastWord = words.pop();
  return (
    <span className={className}>
      {words.join(' ')} <span className="text-brand-accent ml-1">{lastWord}</span>
    </span>
  );
};

const NoticeTicker = ({ notices }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const noticesPerPage = 5;
  
  if (!notices || notices.length === 0) return null;

  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const startIndex = currentPage * noticesPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + noticesPerPage);
  
  const isPDF = (link) => link?.toLowerCase().endsWith('.pdf') || link?.includes('/assets/Notices/');

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-brand-blue/60 uppercase tracking-[0.2em]">
            {startIndex + 1}-{Math.min(startIndex + noticesPerPage, notices.length)} of {notices.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="w-8 h-8 flex items-center justify-center border border-brand-accent/30 text-brand-blue hover:bg-brand-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-blue transition-all"
          >
            <MoveRight size={14} className="rotate-180" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="w-8 h-8 flex items-center justify-center border border-brand-accent/30 text-brand-blue hover:bg-brand-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-blue transition-all"
          >
            <MoveRight size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-3 min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {currentNotices.map((notice, i) => (
              <motion.a 
                key={`${currentPage}-${i}`}
                href={notice.link}
                target={isPDF(notice.link) ? "_blank" : "_self"}
                rel={isPDF(notice.link) ? "noopener noreferrer" : ""}
                whileHover={{ x: 5, borderColor: "var(--color-brand-accent)" }}
                className="group flex items-center gap-4 p-4 bg-white border border-brand-accent/20 hover:border-brand-accent/70 transition-all duration-500 relative shadow-sm"
              >
                <div className="w-10 h-10 bg-brand-blue/5 flex items-center justify-center border border-brand-blue/10 group-hover:border-brand-accent/40 transition-all shrink-0">
                  <Megaphone size={18} className="text-brand-accent" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-black leading-tight uppercase italic text-brand-blue/80 group-hover:text-brand-accent transition-colors tracking-tighter">
                    {notice.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">
                      {notice.date}
                    </span>
                    {currentPage === 0 && i < 2 && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-brand-maroon animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="w-1.5 h-1.5 bg-brand-blue/10 rounded-full group-hover:bg-brand-accent transition-all shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ArchitecturalCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 600); 
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200); 
    }, 7000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
      {/* 16:9 Container - Fixed with max-h and auto margins to ensure absolute equal space */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full overflow-visible group">
          
          {/* The Image Stage */}
          <div className="w-full h-full overflow-hidden relative bg-brand-blue z-10">
            
            {/* BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0 opacity-0 pointer-events-none">
              <img 
                src={images[nextIndex].path} 
                alt="preloader" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* ACTIVE IMAGE LAYER */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-10"
            >
              {/* Ken Burns Effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.25],
                  x: [0, -30, 15, 0],
                  y: [0, -15, 10, 0]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "linear" 
                }}
                className="w-full h-full will-change-transform"
              >
                <img 
                  src={images[currentIndex].path} 
                  alt={images[currentIndex].label} 
                  className="w-full h-full object-cover brightness-105"
                />
              </motion.div>

              {/* Technical Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-grid-white/5" />
              </div>

              {/* Label Node */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-8 left-8 z-20"
              >
                <div className="bg-brand-blue/90 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-brand-accent/20 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-6 bg-brand-accent rounded-full animate-pulse" />
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-accent block mb-0.5 opacity-80">
                        NSEC_ARCHIVE // {String(currentIndex + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">
                        {images[currentIndex].label}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* TRANSITION WIPE */}
            <motion.div
              animate={isTransitioning ? { x: ["-100%", "0%", "100%"] } : { x: "-100%" }}
              transition={{ 
                duration: 1.2, 
                times: [0, 0.5, 1], 
                ease: [0.65, 0, 0.35, 1] 
              }}
              className="absolute inset-0 z-40 flex pointer-events-none will-change-transform"
            >
              <div className="w-full h-full bg-brand-accent relative shadow-[0_0_80px_rgba(0,139,139,0.5)]">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-white/50" />
              </div>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 right-10 z-30 flex gap-1.5">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentIndex ? "w-6 bg-brand-accent" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [config, setConfig] = useState(null);
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch('/config/site-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load site config:", err));
  }, []);

  useEffect(() => {
    if (!config || !config.hero || !config.hero.phrases) return;
    const timer = setInterval(() => {
      setCurrentPhraseIdx((prev) => (prev + 1) % config.hero.phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [config]);

  if (!config) return <div className="h-screen bg-white" />;


  
  const { hero } = config;
  const tickerItems = hero.ticker || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const phraseVariants = {
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, filter: 'blur(10px)', transition: { duration: 0.8, ease: "easeInOut" } }
  };

const getLucideIcon = (name, size = 20, className = "text-brand-accent") => {
    const Icon = Lucide[name];
    return Icon ? <Icon size={size} className={className} /> : null;
  };

  return (
    <div className="relative">
      
      {/* 01. BOUTIQUE HERO SECTION - FULLY BLENDED */}
      <section className="h-[calc(100vh-186px)] flex flex-col bg-white overflow-hidden relative">
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* LEFT: ARCHITECTURAL CAROUSEL */}
          <div className="w-[62%] h-full border-r border-brand-accent/5">
            <ArchitecturalCarousel images={hero.carousel.images} />
          </div>

          {/* RIGHT: TEXT CONTENT & CTAS */}
          <div className="w-[38%] h-full flex flex-col justify-center px-8 lg:px-10 bg-white relative pt-4">
            {/* Contact Info Bar - Positioned at Right Edge */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col items-center gap-8 z-30 py-12 pl-6">
              {/* Subtle Maroon Vertical Fading Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-brand-maroon/60 to-transparent" />

              <a href="https://www.google.com/maps/place/Netaji+Subhash+Engineering+College/@22.47616,88.414933,15z/data=!4m5!3m4!1s0x0:0x276c0d30e6be12ea!8m2!3d22.4761596!4d88.4149326?hl=en-US" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/20 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500 shadow-sm">
                  <MapPin size={14} className="text-brand-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 [writing-mode:vertical-lr] group-hover:text-brand-accent transition-colors">Location</span>
              </a>
              
              
              <a href="mailto:info@nsec.ac.in" className="flex flex-col items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/20 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500 shadow-sm">
                  <Mail size={14} className="text-brand-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 [writing-mode:vertical-lr] group-hover:text-brand-accent transition-colors">E-Mail</span>
              </a>
              
              <a href="tel:9831817307" className="flex flex-col items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/20 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500 shadow-sm">
                  <Phone size={14} className="text-brand-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 [writing-mode:vertical-lr] group-hover:text-brand-accent transition-colors">Hotline</span>
              </a>
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6 relative z-10 pt-4 pr-16"
            >
              {/* Phrases */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1.5px] bg-brand-maroon" />
                  <span className="text-[9px] font-mono font-bold text-brand-maroon uppercase tracking-[0.4em]">Strategic.Vision</span>
                </div>
                <div className="h-[60px] lg:h-[70px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhraseIdx}
                      variants={phraseVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 flex items-center overflow-visible"
                    >
                      <h1 className="text-3xl lg:text-4xl font-black text-brand-maroon leading-tight tracking-tighter uppercase italic whitespace-nowrap">
                        <SplitHeading text={`${hero.phrases[currentPhraseIdx].main} ${hero.phrases[currentPhraseIdx].sub}`} />
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <p className="text-[13px] font-mono font-bold text-slate-600 leading-relaxed border-l-4 border-brand-maroon pl-4 max-w-sm capitalize italic">
                  {hero.description}
                </p>
              </motion.div>

              {/* CTAs Section - Adjusted height for viewport fit */}
              <motion.div variants={itemVariants} className="flex flex-col h-[340px] lg:h-[380px] pt-4">
                {/* Main Admission Button */}
                <div className="mb-4 relative z-20 shrink-0">
                  <Link to={hero.buttons.main.path} className="group flex items-center gap-4 p-4 bg-brand-blue text-white rounded-none border-l-4 border-brand-accent shadow-[10px_10px_0px_rgba(10,17,26,0.25)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-500 w-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="absolute inset-0 bg-grid-white/20" />
                    </div>
                    
                    <div className="w-10 h-10 bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30 group-hover:bg-brand-accent transition-all duration-500 relative z-10 shrink-0">
                      <div className="relative z-20 transition-colors duration-500">
                        {getLucideIcon(hero.buttons.main.icon, 20, "text-brand-accent group-hover:text-brand-blue transition-colors duration-500")}
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-lg font-black leading-none uppercase italic tracking-tighter text-white">
                        {hero.buttons.main.label}
                      </h4>
                      <p className="text-[9px] font-mono opacity-60 uppercase mt-1">
                        {hero.buttons.main.subLabel}
                      </p>
                    </div>

                    <div className="ml-auto relative z-10">
                      <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                        <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Sub-buttons with Simple Harmonic Motion (SHM) Scroll */}
                <div className="flex-1 relative overflow-hidden mask-fade-y border-y border-brand-blue/5">
                  <motion.div 
                    animate={{ 
                      y: [0, -120, 0] // SHM-style oscillation
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-0 left-0 w-full flex flex-col gap-2 py-4 pr-2"
                  >
                    {[...hero.buttons.grid, ...hero.buttons.grid].map((btn, i) => (
                      <Link 
                        key={i} 
                        to={btn.path} 
                        className="group flex items-center gap-3 p-3 bg-white border border-brand-accent/30 hover:border-brand-accent/60 transition-all duration-500 relative shrink-0"
                      >
                        <div className="w-8 h-8 bg-brand-blue/5 flex items-center justify-center border border-brand-blue/5 group-hover:border-brand-accent/20 transition-all shrink-0 overflow-hidden">
                          {btn.image ? (
                            <img src={btn.image} alt={btn.label} className="w-full h-full object-contain p-1.5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                          ) : (
                            getLucideIcon(btn.icon, 16)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-black leading-none uppercase italic text-brand-blue/80 group-hover:text-brand-accent transition-colors truncate">
                            {btn.label}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 truncate">
                            {btn.subLabel}
                          </p>
                        </div>
                        <div className="w-1 h-1 bg-brand-blue/20 rounded-full group-hover:bg-brand-accent transition-all" />
                      </Link>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* INNOVATIVE TICKER: SEGMENTED INDUSTRIAL SCANNER */}
        <div className="h-10 bg-brand-blue border-y border-brand-accent/30 flex items-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent animate-pulse" />
          
          <div className="flex whitespace-nowrap animate-marquee-infinite relative z-10">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-4 px-12 py-1 mx-2 relative transition-all duration-500 ${
                  i % 2 === 0 
                    ? "bg-brand-accent text-brand-blue" 
                    : "border border-brand-accent/50 text-brand-accent bg-transparent"
                }`}
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  {getLucideIcon(item.icon, 12, i % 2 === 0 ? "text-brand-blue" : "text-brand-accent")}
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {item.label1}
                  </span>
                  <div className={`w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-brand-blue/30" : "bg-brand-accent/30"}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-80">
                    {item.label2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. CORE METRICS / DATA RIBBON ARRAY */}
      <section className="bg-brand-bg py-16 relative overflow-hidden mt-2">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
        
        <div className="px-6 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-stretch gap-1 bg-brand-accent/5 border border-brand-accent/30 p-1">
            {(hero.metrics || []).map((s, i) => {
              const isPlacement = s.label.toLowerCase() === 'placement';
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, zIndex: 50 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    opacity: { delay: i * 0.1 },
                    y: { delay: i * 0.1 }
                  }}
                  className={cn(
                    "flex-1 relative p-8 group transition-all duration-500 overflow-hidden border border-brand-accent/40 cursor-pointer",
                    isPlacement 
                      ? "bg-brand-blue flex-[1.5] shadow-[0_20px_40px_rgba(0,0,0,0.3)]" 
                      : "bg-white hover:shadow-[0_0_30px_rgba(0,139,139,0.3)]"
                  )}
                >
                  {/* Status indicator */}
                  <div className="flex justify-end items-center mb-10">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      isPlacement ? "bg-brand-accent shadow-[0_0_12px_rgba(0,139,139,1)]" : "bg-brand-accent/30"
                    )} />
                  </div>

                  {/* Main Value Display */}
                  <div className="relative">
                    <h4 className={cn(
                      "text-5xl lg:text-7xl font-black italic tracking-tighter leading-none mb-4 transition-transform duration-500",
                      isPlacement ? "text-brand-accent" : "text-brand-blue"
                    )}>
                      {s.val}
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-[2px] w-6",
                        isPlacement ? "bg-brand-maroon" : "bg-brand-accent"
                      )} />
                      <span className={cn(
                        "text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none italic",
                        isPlacement ? "text-white" : "text-brand-blue"
                      )}>
                        {s.label}
                      </span>
                    </div>
                    <p className={cn(
                      "text-xs font-black uppercase tracking-widest mt-3 opacity-80",
                      isPlacement ? "text-white/60" : "text-slate-500"
                    )}>
                      {s.unit}
                    </p>
                  </div>

                  {/* Decorative Industrial Marks */}
                  <div className={cn(
                    "absolute bottom-0 right-0 w-4 h-4 border-r border-b transition-all duration-700",
                    isPlacement ? "border-brand-accent/40" : "border-brand-accent/10"
                  )} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. BROADCAST: SPOTLIGHT & NOTICES */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="px-8 lg:px-24 mb-24">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
              <h2 className="text-7xl lg:text-9xl leading-[0.8] tracking-tighter text-brand-maroon uppercase italic font-black">
                Broadcast.
              </h2>
            </div>
            <div className="lg:max-w-md text-right border-r-4 border-brand-maroon pr-8 mb-2">
              <p className="font-mono text-xs font-bold uppercase text-brand-accent italic">
                "Live nodes of institutional communication."
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Spotlight */}
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-brand-accent/40 pb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black italic tracking-tighter text-brand-maroon uppercase">Spotlight</h3>
                </div>
                <Link to={config.hero.broadcast?.spotlight?.archiveLink || "/spotlight/archive"} className="text-[10px] font-black text-brand-blue hover:text-brand-accent transition-colors uppercase tracking-[0.3em] flex items-center gap-2 group">
                  Spotlight_Archive <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-10">
                {(config.hero.broadcast?.spotlight?.items || []).slice(0, 1).map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex flex-col group/video"
                  >
                    {/* Video Thumbnail Placeholder / In-place Player */}
                    <div className="relative aspect-video bg-brand-blue overflow-hidden border border-brand-accent/40 mb-6 group-hover/video:border-brand-accent/60 transition-all shadow-2xl">
                      {activeVideo === item.videoUrl ? (
                        <div className="absolute inset-0 z-50 bg-black">
                          <video 
                            src={item.videoUrl} 
                            controls 
                            autoPlay 
                            className="w-full h-full object-contain"
                          />
                          <button 
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-2 right-2 p-1.5 bg-brand-accent text-brand-blue hover:bg-white transition-colors z-[60]"
                            title="Close Player"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="absolute inset-0 cursor-pointer"
                          onClick={() => setActiveVideo(item.videoUrl)}
                        >
                          <VideoThumbnail 
                            src={item.videoUrl} 
                            thumbnail={item.thumbnail} 
                            alt={item.name} 
                          />
                          <div className="absolute inset-0 flex items-center justify-start p-10">
                            <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,139,139,0.5)] group-hover/video:scale-110 transition-transform">
                              <PlayCircle size={24} className="text-brand-blue fill-current" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div className="h-full bg-brand-accent w-1/3 group-hover/video:w-full transition-all duration-[3000ms]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xl font-black text-brand-maroon uppercase italic tracking-tighter leading-none">
                          <SplitHeading text={item.name} />
                        </h4>
                        <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1">
                          {item.role} <span className="mx-2 opacity-30">|</span> {item.qualification}
                        </p>
                      </div>
                      <div className="h-[1px] w-8 bg-brand-maroon" />
                      <p className="text-[11px] font-mono font-bold text-slate-600 leading-relaxed uppercase italic">
                        Topic: {item.topic}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Notices */}
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-brand-accent/40 pb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black italic tracking-tighter text-brand-maroon uppercase">Notices</h3>
                </div>
                <Link to={config.hero.broadcast?.notices?.archiveLink || "/notices/archive"} className="text-[10px] font-mono font-black text-brand-blue hover:text-brand-accent transition-colors uppercase tracking-[0.3em] flex items-center gap-2 group">
                  Notice_Archive <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <NoticeTicker notices={config.hero.broadcast?.notices?.items || []} />
            </div>

          </div>
        </div>
      </section>

      {/* 04. SPECIALIZATIONS */}
      <section className="pt-8 pb-20 px-8 lg:px-24 relative bg-brand-bg">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-12">
          <div className="space-y-4">
            <h2 className="text-7xl lg:text-9xl leading-[0.8] tracking-tighter text-brand-maroon uppercase italic font-black">
              Specializations.
            </h2>
          </div>
          <div className="lg:max-w-md text-right border-r-4 border-brand-maroon pr-8 mb-2">
            <p className="font-mono text-xs font-bold uppercase text-brand-accent italic">
              "Standardized units of academic excellence."
            </p>
          </div>
        </div>

        <div className="space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-brand-blue/15">
            {(config.hero.specializations || [])
              .filter(d => !['CA', 'BCA_SEP', 'MGMT', 'BESH'].includes(d.code?.toUpperCase()))
              .map((dept, i) => {
              const homeLink = dept.path || "#";
              const isHighlighted = dept.isNewlyLaunched;
              
              return (
                <Link
                  key={i}
                  to={homeLink}
                  className="group block relative border-r border-b border-brand-blue/15 hover:z-20"
                >
                  <motion.div 
                    whileHover={{ 
                      backgroundColor: isHighlighted ? "var(--color-brand-blue)" : "rgba(0, 139, 139, 0.05)",
                      y: -2 
                    }}
                    className={cn(
                      "p-10 transition-all duration-500 cursor-pointer group/card flex flex-col h-full min-h-[320px] relative",
                      isHighlighted ? "bg-brand-blue" : "bg-white"
                    )}
                  >
                    {/* Newly Launched Badge */}
                    {isHighlighted && (
                      <div className="absolute top-0 right-0 z-30">
                        <div className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 flex items-center gap-2 shadow-lg">
                          <Zap size={10} className="fill-current" />
                          Newly Launched
                        </div>
                      </div>
                    )}

                    {/* Technical Crosshair corners */}
                    <div className={cn(
                      "absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover/card:opacity-100 transition-all",
                      isHighlighted ? "border-brand-accent" : "border-brand-accent/30 group-hover/card:border-brand-accent"
                    )} />
                    <div className={cn(
                      "absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 opacity-0 group-hover/card:opacity-100 transition-all",
                      isHighlighted ? "border-brand-accent" : "border-brand-accent/30 group-hover/card:border-brand-accent"
                    )} />
                    <div className={cn(
                      "absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 opacity-0 group-hover/card:opacity-100 transition-all",
                      isHighlighted ? "border-brand-accent" : "border-brand-accent/30 group-hover/card:border-brand-accent"
                    )} />
                    <div className={cn(
                      "absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover/card:opacity-100 transition-all",
                      isHighlighted ? "border-brand-accent" : "border-brand-accent/30 group-hover/card:border-brand-accent"
                    )} />

                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className={cn(
                          "w-14 h-1 transition-colors shrink-0 shadow-[0_0_8px_rgba(0,139,139,0.3)]",
                          isHighlighted ? "bg-brand-accent" : "bg-brand-accent"
                        )} />
                        <div className={cn(
                          "flex-1 h-[1px]",
                          isHighlighted ? "bg-white/10" : "bg-brand-accent/5 group-hover/card:bg-brand-accent/20"
                        )} />
                        <div className={cn(
                          "transition-colors rotate-[-15deg] group-hover/card:rotate-0 transition-transform duration-700",
                          isHighlighted ? "text-brand-accent" : "text-brand-maroon/20 group-hover/card:text-brand-accent"
                        )}>
                          {getLucideIcon(dept.icon || "GraduationCap", 48, isHighlighted ? "text-brand-accent" : "text-brand-accent")}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className={cn(
                          "text-xl font-bold font-mono leading-[1.1] transition-colors uppercase tracking-tight",
                          isHighlighted ? "text-white group-hover/card:text-brand-accent" : "text-brand-blue group-hover/card:text-brand-accent"
                        )}>
                          {dept.name}
                        </h3>
                      </div>

                      <div className="flex-1">
                        <p className={cn(
                          "text-[11px] font-mono font-bold leading-relaxed capitalize italic",
                          isHighlighted ? "text-white/60" : "text-slate-700"
                        )}>
                          {dept.desc}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-4 group/btn">
                        <span className={cn(
                          "text-[10px] font-mono font-black uppercase tracking-[0.4em] transition-colors",
                          isHighlighted ? "text-brand-accent" : "text-slate-700 group-hover/card:text-brand-accent"
                        )}>Explore</span>
                        <div className={cn(
                          "flex-1 h-[1px]",
                          isHighlighted ? "bg-white/10" : "bg-brand-accent/5 group-hover/card:bg-brand-accent/20"
                        )} />
                        <div className={cn(
                          "w-10 h-10 border flex items-center justify-center transition-all group-hover/card:rotate-45",
                          isHighlighted ? "border-white/20 text-brand-accent group-hover/card:border-brand-accent" : "border-brand-accent/20 group-hover/card:border-brand-accent group-hover/card:text-brand-accent"
                        )}>
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle Hover Grid */}
                    <div className="absolute inset-0 bg-grid opacity-0 group-hover/card:opacity-5 transition-opacity" />
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Section Separator */}
          <div className="flex items-center gap-8">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-brand-maroon/20 to-transparent" />
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-brand-maroon animate-pulse" />
              <h3 className="text-2xl font-black italic tracking-tighter text-brand-maroon uppercase">Allied Programs & Sciences</h3>
              <div className="w-2 h-2 rounded-full bg-brand-maroon animate-pulse" />
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-maroon/20 via-brand-maroon/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-brand-blue/15">
            {(config.hero.specializations || [])
              .filter(d => ['CA', 'BCA_SEP', 'MGMT', 'BESH'].includes(d.code?.toUpperCase()))
              .map((dept, i) => {
              const homeLink = dept.path || "#";
              
              return (
                <Link
                  key={i}
                  to={homeLink}
                  className="group block relative border-r border-b border-brand-blue/15 hover:z-20"
                >
                  <motion.div 
                    whileHover={{ 
                      backgroundColor: "rgba(0, 139, 139, 0.05)",
                      y: -2
                    }}
                    className="p-10 bg-white transition-all duration-500 cursor-pointer group/card flex flex-col h-full min-h-[320px] relative"
                  >
                    {/* Technical Crosshair corners */}
                    <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-brand-accent/30 opacity-0 group-hover/card:opacity-100 group-hover/card:border-brand-accent transition-all" />
                    <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-brand-accent/30 opacity-0 group-hover/card:opacity-100 group-hover/card:border-brand-accent transition-all" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-brand-accent/30 opacity-0 group-hover/card:opacity-100 group-hover/card:border-brand-accent transition-all" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-brand-accent/30 opacity-0 group-hover/card:opacity-100 group-hover/card:border-brand-accent transition-all" />

                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="w-14 h-1 bg-brand-accent transition-colors shrink-0 shadow-[0_0_8px_rgba(0,139,139,0.3)]" />
                        <div className="flex-1 h-[1px] bg-brand-accent/5 group-hover/card:bg-brand-accent/20" />
                        <div className="text-brand-maroon/20 group-hover/card:text-brand-accent transition-colors rotate-[-15deg] group-hover/card:rotate-0 transition-transform duration-700">
                          {getLucideIcon(dept.icon || "GraduationCap", 48, "text-brand-accent")}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-bold font-mono leading-[1.1] text-brand-blue group-hover/card:text-brand-accent transition-colors uppercase tracking-tight">
                          {dept.name}
                        </h3>
                      </div>

                      <div className="flex-1">
                        <p className="text-[11px] font-mono font-bold text-slate-700 leading-relaxed capitalize italic">
                          {dept.desc}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-4 group/btn">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-slate-700 group-hover/card:text-brand-accent transition-colors">Explore</span>
                        <div className="flex-1 h-[1px] bg-brand-accent/5 group-hover/card:bg-brand-accent/20" />
                        <div className="w-10 h-10 border border-brand-accent/20 flex items-center justify-center group-hover/card:border-brand-accent group-hover/card:text-brand-accent transition-all group-hover/card:rotate-45">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle Hover Grid */}
                    <div className="absolute inset-0 bg-grid opacity-0 group-hover/card:opacity-5 transition-opacity" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. SUCCESS STORIES */}
      <SuccessStories data={config.successStories} />
    </div>
  );
}
