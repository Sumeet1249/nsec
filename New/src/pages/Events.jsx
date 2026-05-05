import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Award, Zap, Camera, FileText, ChevronRight, BookOpen, ExternalLink, X, Download } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import PdfCard from '../components/pdfCard';

const EVENTS_DATA = [
  {
    year: "AY 2025-26",
    events: [
      { date: "09-12/04/2026", desc: "Intra College Sports Tournament “ZEST 2026” will be held from 09.04.2026 to 12.04.2026 within the college premises" },
      { date: "17-19/04/2026", desc: "AVENIR-26: Annual Techno-Management Fest" },
      { date: "07/04/2026", desc: "World Health Day: Awareness Sessions on \"Cancer: Cure or Control?” and “Holistic Healthcare: Ayurveda Meets Modern Medicine\"" },
      { date: "3-6/02/2026", desc: "Skill Development Training Programme for 3rd year AEIE students at CGCRI-CSIR, Kolkata" },
      { date: "29/01/2026", desc: "Seminar on Cyber Security" },
      { date: "8-11/01/2026", desc: "\"INFINITO 2025 - 2026\" - Inter College Sports Tournament" },
      { date: "6-10/01/2026", desc: "Five-Day Faculty Development Programme (FDP) with technical co-sponsorship from the IEEE Kolkata Section on “Computational Methods in IoT and Machine Learning for Advancing Communication Processes towards Sustainable Development" },
      { date: "12/12/2025", desc: "Fresher's Welcome (Prelude 2025)" },
      { date: "From 15/09/2025", desc: "Orientation Programme for the Students of B.Tech 1st Year, 2025-26" },
      { date: "11/09/2025", desc: "Internal SIH-2025" },
      { date: "22-27/09/2025", desc: "A Six-Day Online FDP on E-mobility & Micro-grids: A Pathway to Sustainable Energy" },
      { date: "26/07/2025", desc: "\"AI Insight\" Workshop" },
      { date: "25/07/2025", desc: "Online Career Counselling through Alumni Talk: Inspiring Journeys & Real-World Insights" },
      { date: "07/07/2025", desc: "Online Webinar on Cyber Hygiene and Digital Wellness: A Women-Centric Guide to Online Safety, organized by the Department of Applied Electronics & Instrumentation Engineering as a part of IEEE-WIE Day 2025 celebration" },
      { date: "07-11/07/2025", desc: "FDP on The Recent Trends in AI Applications for Microwave Engineering: Active and Passive Component Design, Imaging, and Beyond" },
    ]
  },
  {
    year: "AY 2024-25",
    events: [
      { date: "29/04/2025", desc: "Blood Donation Camp & Cancer Awareness Program" },
      { date: "29/04/2025", desc: "Workshop on Web3 and Security Fundamental" },
      { date: "28-29/04/2025", desc: "Skill Development Training Programme for 3rd year AEIE students from 28th-30th April 2025 followed by one-day visit by departmental teaching staff at CSIR-CGCRI on 2nd May 2025" },
      { date: "23/04/2025", desc: "Internal SAP Hackfest 2025" },
      { date: "5-6, & 11/04/2025", desc: "MESMERIZER (Annual Cultural Fest 2025)" },
      { date: "1-4, 7-9 & 19/04/2025", desc: "Intra College Sports Tournament, ZEST 2025" },
      { date: "29/03/2025", desc: "One-Day Awareness Programme on Accreditation Scheme for IT/ICS Cyber Security Consultancy Organisations (COs) and Training Bodies (TBs)" },
      { date: "28/03/2025", desc: "One-Day Awareness Programme on Personnel Certification Scheme for IT/ICS Cyber Security Professionals (CyberPros)" },
      { date: "27/03/2025", desc: "One-Day Awareness Programme on Scheme for Cyber Security Management System Scheme and Inspection Scheme for Critical Sector Entities" },
      { date: "05-14/02/2025", desc: "FDP on Recent Advances in Deep Learning" },
      { date: "06-11/01/2025", desc: "Six-Day Online AICTE ATAL FDP on Innovative Pedagogy with AI and ML: Exploring Intelligent Model Predictive Control" },
      { date: "15-18/11/2024", desc: "INFINITO 2024: Inter College Sports" },
      { date: "04/09/2024", desc: "Internal SIH 2024" },
      { date: "05/08/2024", desc: "Member Driven Initiatives (MDI) Program\nSpeaker: Prof. SAMBIT BAKSHI, Computer Science and Engineering Department, NIT, Rourkela.\nVenue: A. P. C Roy Hall, Electrical Engineering Department, NSEC" },
    ]
  },
  {
    year: "AY 2023-24",
    events: [
      { date: "05/06/2024", desc: "Eco Cultural Club of NSEC presents World Environment Day, June 5, 2024" },
      { date: "25/05/2024", desc: "Workshop titled \"Google Cloud Community Day, Kolkata Extended Event\" on 25th May, 2024" },
      { date: "16-18/05/2024", desc: "\"Avenir'24 - Realms of Multiverse\" the Flagship annual techno-management fest from May 16th to May 18th" },
      { date: "15/05/2024", desc: "Workshop titled “Instigate Open-source & GitHub” on 15th May, 2024" },
      { date: "12/05/2024", desc: "Online Workshop titled “Build with AI” on 12th May, 2024" },
      { date: "26/04/2024", desc: "Workshop titled “Soroban Accelerated Bootcamp – Blockchain” on 26th April, 2024" },
      { date: "26/04/2024", desc: "Workshop on \"Intellectual Property Rights\" on 26th April 2024" },
      { date: "24/04/2024", desc: "Workshop titled “Career Re-Engineering : The Blueprint for IT Career Success” on 24th April, 2024" },
      { date: "18/04/2024", desc: "A ROBOTICS Seminar in collaboration with Blackbird Robotics will be held on 18th April, 2024" },
      { date: "18-27/04/2024", desc: "Intra College Tournament, ZEST 2024" },
      { date: "12/04/2024", desc: "Online workshop on “Mastering Android : Best Practices & Trends”" },
      { date: "09/04/2024", desc: "Invited Talk on \"The Steel and It's Applications\"" },
      { date: "01/03/2024", desc: "\"BLOOD DONATION CAMP\" scheduled on 1st March, 2024 in the college" },
      { date: "26/02/2024", desc: "Hult Prize local edition,2024 on campus on 26/02/24" },
      { date: "10-30/01/2024", desc: "Online workshop on “Firebase Fundamentals: Empowering Android App Development” on 30th January, 2024, Tuesday from 07:00 PM" },
      { date: "10-18/01/2024", desc: "6 Days FDP on \"Advanced machine Learning & it's Application\"" },
      { date: "09/01/2024", desc: "Online workshop on 'Machine Learning' on 09th Jan, 2024 at 07:00 PM" },
      { date: "17-18/11/2023", desc: "Nationwide Roadshow on Digital India RISC-V Vega Processors (17 - 18 November, 2023)" },
      { date: "09/10/2023", desc: "Seminar: AI for Cyber-Physical system" },
      { date: "04-07/10/2023", desc: "INFINITO 2K23: Inter College Sports Tournament" },
      { date: "29/08/2023", desc: "National Sports Day Celebration" },
    ]
  }
];

const EVENT_ICONS = [Calendar, Users, Award, Zap, Camera, FileText];

function PdfModal({ url, onClose }) {
  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <BookOpen size={16} />
                </div>
                <h3 className="text-sm font-heading font-black italic uppercase tracking-widest text-slate-800">Document Preview</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors" title="Open in new tab">
                  <ExternalLink size={18} />
                </a>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Close">
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* Iframe */}
            <div className="flex-1 relative">
              <iframe src={url} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EventCard({ index, date, text, alternate, hasDetails, onViewDetails }) {
  const Icon = EVENT_ICONS[index % EVENT_ICONS.length];
  
  // Use alternate styling for some cards to mimic PunishmentCard / ConstitutesCard variance
  const bgGradient = alternate 
    ? "from-brand-maroon/[0.04] via-white to-white" 
    : "from-brand-accent/[0.02] via-white to-white";
  const borderColor = alternate 
    ? "border-brand-maroon/[0.12] border-l-brand-maroon hover:border-brand-maroon/[0.22]" 
    : "border-brand-accent/10 border-l-[#fbbf24] hover:border-brand-accent/30";
  const badgeColor = alternate ? "bg-brand-maroon text-white" : "bg-[#fbbf24] text-slate-900";
  const iconColor = alternate ? "text-brand-maroon border-brand-maroon/40 bg-brand-maroon/[0.08]" : "text-brand-accent border-brand-accent/40 bg-brand-accent/[0.08]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 10) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[20px] bg-gradient-to-br ${bgGradient} border ${borderColor} border-l-[3px] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-[250ms] ease-out mt-3 ml-3`}
    >
      {/* Date Badge */}
      <div className={`absolute -top-3 -left-4 px-3 py-1.5 h-auto rounded-full ${badgeColor} flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-all duration-[250ms] ease-out z-10 border-2 ${alternate ? 'border-[#fbbf24]/80' : 'border-white'} min-w-[60px]`}>
        <span className="text-[12px] font-mono font-black whitespace-nowrap">
          {date}
        </span>
        {/* Connector line */}
        <div className="absolute top-1/2 left-full w-12 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-16 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: `linear-gradient(to right, ${alternate ? 'rgba(128,0,0,0.8)' : 'rgba(251,191,36,0.8)'}, ${alternate ? 'rgba(128,0,0,0.1)' : 'rgba(251,191,36,0.1)'}, transparent)` }} />
      </div>

      <div className="p-6 pt-8 min-h-[140px] flex flex-col gap-4 relative z-10 h-full">
        <div className="flex gap-4 items-start flex-1">
          <div className={`shrink-0 w-10 h-10 rounded-[30%] border flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-all duration-300 mt-1 ${iconColor}`}>
            <Icon size={20} />
          </div>
          <p className="text-[15px] font-body font-medium text-slate-700 leading-[1.7] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2 whitespace-pre-line">
            {text}
          </p>
        </div>
        {hasDetails && (
          <div className="pt-4 mt-auto border-t border-slate-100 -mx-6 -mb-6 px-6 pb-6">
            <PdfCard
              onClick={onViewDetails}
              icon={Download}
              title="View Details"
              label="PDF"
              variant="slate"
              size="compact"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState({});

  const toggleShowAll = (yearIdx) => {
    setShowAllEvents(prev => ({ ...prev, [yearIdx]: !prev[yearIdx] }));
  };

  const carouselPhrases = [
    { main: "VIBRANT CAMPUS", highlight: "ACTIVITIES" },
    { main: "FOSTERING INNOVATION", highlight: "AND EXCELLENCE" },
    { main: "CELEBRATING OUR", highlight: "ACHIEVEMENTS" },
    { main: "BUILDING THE", highlight: "COMMUNITY" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="CAMPUS"
        titleFill="EVENTS"
        statutoryLabel={<span className="text-[#fbbf24]">ACTIVITIES</span>}
        policyLabel=""
        rightLabel={<span className="text-[#fbbf24]">Year-Round.Engagements</span>}
        rightContent={
          <div className="leading-snug">
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Explore', 'a', 'dynamic', 'array', 'of', 'academic,'].map((word, i) => (
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

              {/* Glowing keyword */}
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
                  cultural & technical
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
              {['events', 'held', 'throughout', 'the', 'academic', 'year.'].map((word, i) => (
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

      {/* Golden gradient separator below hero */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* ── 02. EVENTS CONTENT ── */}
      <section className="relative pt-24 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {EVENTS_DATA.map((yearData, yearIdx) => (
          <div key={yearIdx} className={`mb-16 relative ${yearIdx > 0 ? 'pt-16 border-t border-brand-maroon/5' : ''}`}>
            
            {yearIdx > 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-brand-maroon/10 to-transparent" />
            )}

            <SectionHeading
              title={`Events of`}
              tagline={yearData.year}
            />
            <div className="flex justify-end mb-4 pr-0 max-w-5xl mx-auto">
              <button 
                onClick={() => toggleShowAll(yearIdx)}
                className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.2em] hover:translate-x-2 transition-transform shrink-0"
              >
                {showAllEvents[yearIdx] ? 'View Less' : 'View All Archives'} <ChevronRight size={14} className={`transition-transform ${showAllEvents[yearIdx] ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <div className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
              {yearData.events.slice(0, showAllEvents[yearIdx] ? undefined : 2).map((item, i) => {
                const hasDetails = item.desc !== "Intra College Sports Tournament “ZEST 2026” will be held from 09.04.2026 to 12.04.2026 within the college premises";
                return (
                  <EventCard 
                    key={i} 
                    index={i} 
                    date={item.date} 
                    text={item.desc} 
                    alternate={yearIdx % 2 !== 0} 
                    hasDetails={hasDetails}
                    onViewDetails={() => setSelectedPdf("/assets/pdfs/Anti-Ragging-Committee-NSEC-2024-2025.pdf")} // Dummy PDF for now
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* PDF Modal */}
      <PdfModal url={selectedPdf} onClose={() => setSelectedPdf(null)} />

    </div>
  );
}
