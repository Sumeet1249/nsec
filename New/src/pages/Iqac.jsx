import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, BookOpen, ExternalLink, Download, Globe, Cpu, Laptop,
  Award, Info, Target, CheckCircle2, ChevronRight, Maximize,
  MessageSquare, Brain, Landmark, X, GraduationCap, FileText
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ContactSectionCard from '../components/ContactSectionCard.jsx';
import PdfCard from '../components/pdfCard';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
 ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'IQAC', 'Internal Quality Assurance Cell', 'Vision', 'Mission', 'Quality Culture',
  'Continuous Improvement', 'NAAC', 'NBA', 'Outcome-based Education', 'Outcome-based',
  'Transparency', 'Accountability', 'Benchmark', 'Prof. (Dr.) Amal K Ghosh',
  'Dr. Sukumar Roy', 'Academic', 'Administrative', 'AQAR', 'Techno India Group',
  'continuous enhancement', 'outcome-based education system', 'credibility', 'quality assurance practice',
  'creativity of the students', 'national level programs', 'annual progress', 'proper documentation',
  'quality benchmark', 'quality culture', 'systematic strategies', 'continuous improvement', 
  'academic and administrative performance', 'best practices', 'modern technologies',
  'effective teaching-learning', 'real time visualization', 'reduce the curriculum gap',
  'creative and innovative ecosystem', 'holistic development', 'accredited', 'NAAC and NBA',
  'quality benchmarks/parameters', 'instructional delivery', 'assessment processes', 
  'quality sustenance and enhancement', 'quality parameters', 'higher education',
  'learner-centric education', 'feedback responses', 'stakeholders', 'Monitor and document',
  'quality improvement', 'institutional database', 'institutional quality', 
  'training program', 'workshops', 'seminars', 'Annual Quality Assurance report', 'NAAC guidelines'
];

function HighlightText({ text }) {
  if (!text) return null;
  const regex = new RegExp(`(${BOLD_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    BOLD_KEYWORDS.some(k => k.toLowerCase() === part.toLowerCase())
      ? <strong key={i} className="font-bold text-slate-800">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

/* ═══════════════════════════════════════════════════════════
   ITEM CARD — identical to ConstitutesCard in AntiRagging
 ═══════════════════════════════════════════════════════════ */
const ITEM_ICONS = [MessageSquare, Target, CheckCircle2, Award, Shield, BookOpen, Brain, Landmark, Globe, Cpu, Laptop, Info, GraduationCap];

function ItemCard({ index, text, theme = "golden" }) {
  const Icon = ITEM_ICONS[index % ITEM_ICONS.length];
  
  const isBlack = theme === "black";
  const isSlate = theme === "slate";

  let badgeBg = "bg-[#fbbf24]";
  let badgeText = "text-slate-900";
  let borderLeft = "border-l-[#fbbf24]";
  let shadowBase = "shadow-[0_2px_4px_rgba(251,191,36,0.2)]";
  let shadowHover = "group-hover:shadow-[0_4px_8px_rgba(251,191,36,0.3)]";
  let gradientLine = 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(251,191,36,0.1), transparent)';

  if (isBlack) {
    badgeBg = "bg-slate-900";
    badgeText = "text-white";
    borderLeft = "border-l-slate-900";
    shadowBase = "shadow-[0_2px_4px_rgba(15,23,42,0.3)]";
    shadowHover = "group-hover:shadow-[0_4px_8px_rgba(15,23,42,0.4)]";
    gradientLine = 'linear-gradient(to right, rgba(15,23,42,0.8), rgba(15,23,42,0.1), transparent)';
  } else if (isSlate) {
    badgeBg = "bg-slate-600";
    badgeText = "text-white";
    borderLeft = "border-l-slate-600";
    shadowBase = "shadow-[0_2px_4px_rgba(71,85,105,0.3)]";
    shadowHover = "group-hover:shadow-[0_4px_8px_rgba(71,85,105,0.4)]";
    gradientLine = 'linear-gradient(to right, rgba(71,85,105,0.8), rgba(71,85,105,0.1), transparent)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] ${borderLeft} shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3`}
    >
      {/* Number Badge */}
      <div className={`absolute -top-3 -left-4 w-11 h-11 rounded-full ${badgeBg} flex items-center justify-center ${shadowBase} group-hover:scale-[1.05] ${shadowHover} transition-all duration-[250ms] ease-out z-10 border-2 border-white`}>
        <span className={`text-[12px] font-mono font-black ${badgeText}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: gradientLine }} />
      </div>

      <div className="p-6 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2">
          <HighlightText text={text} />
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PDF MODAL
 ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
 ═══════════════════════════════════════════════════════════ */
export default function Iqac() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showAllImportantLinks, setShowAllImportantLinks] = useState(false);
  const [showAllAnnualReports, setShowAllAnnualReports] = useState(false);

  const carouselPhrases = [
    { main: 'INTERNAL QUALITY', highlight: 'ASSURANCE CELL' },
    { main: 'CONTINUOUS', highlight: 'IMPROVEMENT' },
    { main: 'OUTCOME BASED', highlight: 'EDUCATION' },
    { main: 'NAAC & NBA', highlight: 'ACCREDITATION' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  const visionPoints = [
    'To evolve and implement the measures for continuous enhancement of the academic environment intending an outcome-based education system through modern techniques.',
    'To ensure transparency, accountability and credibility in accordance with internationally acceptable quality assurance practice.'
  ];

  const missionPoints = [
    'To nurture the creativity of the students by arranging several national level programs with proper coordination of various departments.',
    'To evaluate the annual progress in terms of academic and administrative activities through proper documentation.',
    'To establish a quality benchmark and institutionalized as well as internationalized the quality culture.',
    'To develop systematic strategies for continuous improvement of the academic and administrative performance of the institution to enhance and ensure the environment of quality culture.',
    'To stimulate the methods for institutionalization of best practices by proper coordination of various activities of documentation and communication through modern technologies.',
    'To promote the methodology of effective teaching-learning of the programs through real time visualization with the scholastic delivery system and implementation of the necessary remedies to reduce the curriculum gap.',
    'To inculcate a creative and innovative ecosystem within the institution and to encourage the social activities within the learners for holistic development.',
    'To become accredited by NAAC and NBA by the coming year to secure a suitable position among the best institutions of this country.'
  ];

  const objectives = [
    'Formulate and apply the quality benchmarks/parameters for various academic and administrative activities of the institution.',
    'Instill quality culture in terms instructional delivery and assessment processes for quality sustenance and enhancement.',
    'Publish and disseminate information on various quality parameters of higher education.',
    'Create and facilitate learner-centric education through appropriate methodologies.',
    'Develop and arrange feedback responses from students, parents and other stakeholders on quality-related institutional processes.',
    'Monitor and document various academic activities leading to quality improvement.',
    'Develop and maintain institutional database for enhancing the institutional quality.',
    'Plan and organize training program, workshops, seminars, etc for continuous quality improvement.',
    'Prepare the Annual Quality Assurance report (AQAR) as per NAAC guidelines.'
  ];

  const committee = [
    { name: 'Prof. (Dr.) Amal K Ghosh', role: 'Chairperson (Principal)' },
    { name: 'Dr. Sukumar Roy', role: 'Coordinator (Dean-Academic)' },
    { name: 'Dr. Arindam Roy', role: 'Management Representative (TIG)' },
    { name: 'Mr. Soumava Goswami', role: 'Senior Admin Officer' },
    { name: 'Prof. Indranil Ghosh', role: 'Teacher Rep (BESH)' },
    { name: 'Prof. Anupam Ghosh', role: 'Teacher Rep (CSE)' },
    { name: 'Prof. Anupam Bera', role: 'Teacher Rep (IT)' },
    { name: 'Prof. Silpi Bose', role: 'Teacher Rep (CSE)' },
    { name: 'Prof. Tridibesh Nag', role: 'Teacher Rep (EE)' },
    { name: 'Prof. Krishnendu Bhattacharyya', role: 'Teacher Rep (BESH)' },
    { name: 'Prof. Koushik Dutta', role: 'Teacher Rep (ECE)' },
    { name: 'Mrs. Papiya Halder', role: 'Local Society Nominee' },
    { name: 'Mr. Aritra Bag', role: 'Student Nominee' },
    { name: 'Mr. Sumanta Chatterjee', role: 'Alumni Nominee' },
    { name: 'Mr. Manik Sarkar', role: 'Employer Nominee (Lexmark)' },
    { name: 'Mr. R.N. Ghosh', role: 'Stakeholder Nominee' },
    { name: 'Mr. Digbijoy Chakraborty', role: 'Industrialist Nominee' }
  ];

  const importantLinks = [
    { title: 'Composition & Functions (Order)', url: 'https://www.nsec.ac.in/impdoc/230710_1_IQAC_Office%20Order.pdf' },
    { title: 'Meeting & Action Taken Reports', url: 'https://www.nsec.ac.in/page.php?id=514' },
    { title: 'AQAR Submissions', url: 'https://www.nsec.ac.in/page.php?id=512' }
  ];

  const reports = [
    { year: '2023-24', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2023-2024.pdf' },
    { year: '2022-23', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2022-2023.pdf' },
    { year: '2021-22', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2021-2022.pdf' },
    { year: '2020-21', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2020-2021.pdf' },
    { year: '2019-20', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2019-2020.pdf' },
    { year: '2018-19', url: 'https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2018-2019.pdf' }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="IQAC"
        titleFill="CELL"
        useYellowAccents={true}
        statutoryLabel="ESTD. 2013"
        policyLabel=""
        rightLabel="Strategic.Quality.Node"
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Ensuring', 'high', 'standards', 'of', 'excellence', 'in'].map((word, i) => (
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
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span
                  className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}
                >
                  Institutional Operations
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
                />
              </motion.span>
            </div>

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
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center flex-wrap gap-2"
                >
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>
                    {carouselPhrases[currentSentenceIdx].main}
                  </span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>
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

      {/* ── 02. VISION & MISSION ── */}
      <section className="relative pt-24 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="mb-8 relative">
          <SectionHeading
            title="Vision & Mission"
            tagline="The foundational quality benchmarks of NSEC."
          />
          <div className="mb-12" />
          <div className="flex flex-col gap-y-16 max-w-5xl mx-auto">

            {/* Vision Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon">Institutional Vision</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-4">
                {visionPoints.map((p, i) => (
                  <ItemCard key={i} index={i} text={p} theme="black" />
                ))}
              </div>
            </div>

            {/* Mission Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon">Core Mission</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-4">
                {missionPoints.map((p, i) => (
                  <ItemCard key={i} index={i + visionPoints.length} text={p} theme="slate" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── 03. OBJECTIVES ── */}
      <section className="relative pt-16 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="mb-8 relative">
          <SectionHeading
            title="Functions & Objectives"
            tagline="Strategic goals for quality sustenance and enhancement."
          />
          <div className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
            {objectives.map((obj, i) => (
              <ItemCard key={i} index={i} text={obj} />
            ))}
          </div>
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── 04. COMPOSITION ── */}
      <section className="relative pt-16 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="mb-8 relative">
          <SectionHeading
            title="IQAC Composition"
            tagline="The leadership and committee driving quality assurance."
          />
          <div className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {committee.map((m, i) => (
              <ContactSectionCard key={i} index={i} title={m.name} subtitle={m.role} />
            ))}
          </div>
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── 05. LINKS & REPORTS ── */}
      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">

          {/* Important Links */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon">Important Links</h2>
              <button 
                onClick={() => setShowAllImportantLinks(!showAllImportantLinks)}
                className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.2em] hover:translate-x-2 transition-transform shrink-0"
              >
                {showAllImportantLinks ? 'View Less' : 'View All Archives'} <ChevronRight size={14} className={`transition-transform ${showAllImportantLinks ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <div className="space-y-4">
              {importantLinks.slice(0, showAllImportantLinks ? undefined : 2).map((link, i) => (
                <PdfCard
                  key={i}
                  href={link.url}
                  icon={FileText}
                  title={link.title}
                  variant="accent"
                  index={i}
                  onClick={() => setSelectedPdf(link.url)}
                />
              ))}
            </div>
          </div>

          {/* Annual Reports */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon">Annual Reports</h2>
              <button 
                onClick={() => setShowAllAnnualReports(!showAllAnnualReports)}
                className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.2em] hover:translate-x-2 transition-transform shrink-0"
              >
                {showAllAnnualReports ? 'View Less' : 'View All Archives'} <ChevronRight size={14} className={`transition-transform ${showAllAnnualReports ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {reports.slice(0, showAllAnnualReports ? undefined : 2).map((report, i) => (
                <PdfCard
                  key={i}
                  href={report.url}
                  icon={FileText}
                  title={report.year}
                  label="Annual Report"
                  variant="danger"
                  index={i}
                  download={true}
                  onClick={() => setSelectedPdf(report.url)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PDF Modal */}
      <PdfModal url={selectedPdf} onClose={() => setSelectedPdf(null)} />

    </div>
  );
}
