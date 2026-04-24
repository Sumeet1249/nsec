import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, ChevronRight, Eye, Download, ExternalLink, Phone, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import PageHero from '../components/PageHero';

/* ═══════════════════════════════════════════════════════════
   THREE.JS  —  RIPPLE WAVE PARTICLE FIELD
   A 3D grid of 4,800 points that ripple like a living ocean.
   Completely unique — never seen on any Indian institution site.
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   POLICY LIST ITEM
   A clean, professional document-style list item.
 ═══════════════════════════════════════════════════════════ */
function PolicyListItem({ index, text, variant }) {
  const isCyan = variant === 'cyan';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex gap-6 py-6 border-b border-brand-blue/5 group"
    >
      <div className="shrink-0 flex flex-col items-center gap-2 pt-1">
        <span className={`font-mono text-[11px] font-black w-8 h-8 flex items-center justify-center rounded-full border ${isCyan ? 'border-brand-accent/20 text-brand-accent bg-brand-accent/5' : 'border-brand-maroon/20 text-brand-maroon bg-brand-maroon/5'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className={`w-[2px] flex-1 ${isCyan ? 'bg-brand-accent/10' : 'bg-brand-maroon/10'} group-hover:h-full transition-all duration-700`} />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-body font-medium text-slate-700 leading-relaxed group-hover:text-brand-blue transition-colors">
          {text}
        </p>
      </div>
    </motion.div>
  );
}



/* ═══════════════════════════════════════════════════════════
   HERO BANNER  — ultra-thin, one-line ANTI-RAGGING
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function AntiRagging() {
  const [config, setConfig] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const PDF_SRC = '/assets/pdfs/Anti-Ragging-Committee-NSEC-2024-2025.pdf';

  const carouselPhrases = [
    { main: "STRICT ZERO TOLERANCE", highlight: "AGAINST RAGGING" },
    { main: "REPORT ANY INCIDENT", highlight: "WITHOUT FEAR" },
    { main: "ENSURING A SECURE", highlight: "CAMPUS ENVIRONMENT" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/page-antiragging-config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(err => console.error('Failed to load Anti-Ragging config:', err));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* ── 01. HERO ── */}
      <PageHero
        titleStroke="ANTI-"
        titleFill="RAGGING"
        statutoryLabel="Statutory Committee"
        policyLabel="POLICY"
        rightLabel="Zero.Tolerance.Policy"
        rightContent={
          <div className="leading-snug">
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Ragging', 'in', 'any', 'form', 'is', 'a'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}

              {/* Glowing keyword — "punishable offence" */}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span
                  className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
                  style={{ textShadow: '0 0 25px var(--color-brand-accent), 0 0 50px rgba(0,139,139,0.5)' }}
                >
                  punishable offence
                </span>
                {/* animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
                  style={{ boxShadow: '0 0 8px rgba(0,139,139,0.8)' }}
                />
              </motion.span>
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['under', 'UGC', 'regulations', 'and', 'Indian', 'law.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 3 — softer */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-6 mt-2">
              {['Every', 'student', 'deserves', 'a', 'safe', 'and', 'dignified', 'campus', 'experience.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.36 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/45 text-[13px] font-body"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Carousel */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="h-8 relative w-full mt-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSentenceIdx}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center flex-wrap gap-2"
                >
                  <span
                    className="font-heading font-black italic uppercase tracking-tighter text-white"
                    style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
                  >
                    {carouselPhrases[currentSentenceIdx].main}
                  </span>
                  <span
                    className="font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
                    style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
                  >
                    {carouselPhrases[currentSentenceIdx].highlight}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      {/* ── 02. GUIDELINES CONTENT ── */}
      <section className="relative py-10 px-8 lg:px-24 bg-brand-bg">

        {/* Section 01: What Constitutes Ragging */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-4">

              <h2 className="text-4xl lg:text-6xl leading-[0.8] tracking-tighter text-[var(--color-brand-blue)] uppercase italic font-black">
                What Constitutes.
              </h2>
            </div>
            <div className="lg:max-w-md text-right border-r-4 border-[var(--color-brand-accent)] pr-8 mb-2">
              <p className="font-mono text-xs font-bold uppercase text-[var(--color-brand-accent)] italic">
                "Defining the boundaries of student conduct."
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {(config.what_constitutes_ragging || []).map((item, i) => (
              <PolicyListItem key={i} index={i} text={item} variant="cyan" />
            ))}
          </div>
        </div>

        {/* Section 02: Punishments */}
        <div>
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-4">

              <h2 className="text-4xl lg:text-6xl leading-[0.8] tracking-tighter text-[var(--color-brand-maroon)] uppercase italic font-black">
                Punishments.
              </h2>
            </div>
            <div className="lg:max-w-md text-right border-r-4 border-[var(--color-brand-maroon)] pr-8 mb-2">
              <p className="font-mono text-xs font-bold uppercase text-[var(--color-brand-maroon)] italic">
                "Actions to be taken for abetting in ragging."
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {(config.punishments || []).map((item, i) => (
              <PolicyListItem key={i} index={i} text={item} variant="maroon" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. REPORT & HELPLINE ── */}
      <section className="relative py-10 px-8 lg:px-24 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl leading-[0.8] tracking-tighter text-[var(--color-brand-blue)] uppercase italic font-black">
              How to Report.
            </h2>
          </div>
          <div className="lg:max-w-md text-right border-r-4 border-[var(--color-brand-maroon)] pr-8 mb-2">
            <p className="font-mono text-xs font-bold uppercase text-[var(--color-brand-accent)] italic">
              "Emergency nodes for immediate assistance."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Phone Helpline Card */}
          <motion.a
            href="tel:1800-180-5522"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative p-10 bg-white border border-brand-blue/10 flex flex-col gap-6
                       hover:border-brand-accent/60 hover:shadow-[12px_12px_0px_rgba(0,139,139,0.05)]
                       transition-all duration-500 overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full -mr-12 -mt-12 transition-all duration-700 group-hover:scale-150 group-hover:bg-brand-accent/10" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 bg-brand-blue flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shadow-sm">
                <Phone size={24} />
              </div>
              <span className="text-[10px] font-mono font-black text-brand-accent/40 uppercase tracking-[0.3em]">24/7 Toll-Free</span>
            </div>

            <div>
              <h4 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-blue mb-2">UGC National Helpline</h4>
              <p className="text-4xl font-mono font-black text-brand-blue/90 group-hover:text-brand-accent transition-colors duration-300">1800‑180‑5522</p>
            </div>

            <div className="mt-auto pt-6 border-t border-brand-blue/5 flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest italic">Confidential Audio Channel</span>
              <div className="flex items-center gap-2 text-brand-accent font-mono font-black text-[10px] uppercase tracking-widest translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                Call Now <ChevronRight size={14} />
              </div>
            </div>
          </motion.a>

          {/* Website Portal Card */}
          <motion.a
            href="https://antiragging.in"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative p-10 bg-white border border-brand-blue/10 flex flex-col gap-6
                       hover:border-brand-maroon/40 hover:shadow-[12px_12px_0px_rgba(128,0,0,0.05)]
                       transition-all duration-500 overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-maroon/5 rounded-full -mr-12 -mt-12 transition-all duration-700 group-hover:scale-150 group-hover:bg-brand-maroon/10" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 bg-brand-blue flex items-center justify-center text-white group-hover:bg-brand-maroon transition-all duration-500 shadow-sm">
                <ExternalLink size={24} />
              </div>
              <span className="text-[10px] font-mono font-black text-brand-maroon/40 uppercase tracking-[0.3em]">Online Portal</span>
            </div>

            <div>
              <h4 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-blue mb-2">Anti-Ragging Web Portal</h4>
              <p className="text-3xl font-mono font-black text-brand-blue/90 group-hover:text-brand-maroon transition-colors duration-300 tracking-tighter">antiragging.in</p>
            </div>

            <div className="mt-auto pt-6 border-t border-brand-blue/5 flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest italic">Direct Digital Complaint</span>
              <div className="flex items-center gap-2 text-brand-maroon font-mono font-black text-[10px] uppercase tracking-widest translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                Open Portal <ChevronRight size={14} />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ── 04. PDF PREVIEW ── */}
      <section className="py-10 px-8 lg:px-24 bg-brand-bg">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl leading-[0.8] tracking-tighter text-[var(--color-brand-maroon)] uppercase italic font-black">
              Committee (ARC).
            </h2>
          </div>
          <div className="lg:max-w-md text-right border-r-4 border-[var(--color-brand-blue)] pr-8 mb-2">
            <p className="font-mono text-xs font-bold uppercase text-[var(--color-brand-accent)] italic">
              "Official Anti-Ragging Committee (ARC) // 2024-2025"
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Browser chrome bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-brand-blue border-b border-brand-accent/20">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {['bg-red-500', 'bg-yellow-500', 'bg-green-400'].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-75`} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-white/35 uppercase tracking-widest hidden sm:block">
                Anti-Ragging-Committee-NSEC-2024-2025.pdf
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={PDF_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-accent text-white
                           font-mono font-black text-[10px] uppercase tracking-[0.18em]
                           hover:bg-white hover:text-brand-accent transition-all duration-300"
              >
                <Eye size={11} /> View
              </a>
              <a
                href={PDF_SRC}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-maroon text-white
                           font-mono font-black text-[10px] uppercase tracking-[0.18em]
                           hover:bg-white hover:text-brand-maroon transition-all duration-300 shadow-lg"
              >
                <Download size={11} /> Download
              </a>
            </div>
          </div>

          {/* iFrame */}
          <div className="w-full h-[78vh] border border-brand-blue/15 border-t-0">
            <iframe
              src={`${PDF_SRC}#view=FitH`}
              className="w-full h-full bg-white"
              title="Anti-Ragging Committee NSEC 2024-2025"
            />
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-brand-bg border border-brand-blue/10 border-t-0">
            <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest">
              Netaji Subhash Engineering College
            </span>
            <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest">
              Statutory Document // 2024-2025
            </span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
