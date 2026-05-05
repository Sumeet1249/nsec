import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Users, Globe, Building2, Leaf, Heart, MessageSquare, FileText, Download, CheckCircle2, ExternalLink, ChevronRight, GraduationCap, Globe2, TreePine, Sprout, BookOpen, X, Mail } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SpotlightStatusCard from '../components/SpotlightStatusCard';
import Card from '../components/card';
import MinCard from '../components/minCard';

void motion;

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'Unnat Bharat Abhiyan', 'UBA', 'MHRD', 'Ministry of Human Resource Development',
  'Netaji Subhash Engineering College', 'NSEC', 'Participating Institute', 'PI',
  'IIT Kharagpur', 'Regional Coordinating Institute', 'RCI', 'Rural India',
  'Human development', 'Material development', 'Sustainable development'
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

export default function UbaPage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "RURAL", highlight: "TRANSFORMATION" },
    { main: "COMMUNITY", highlight: "EMPOWERMENT" },
    { main: "KNOWLEDGE", highlight: "BRIDGE" },
    { main: "SUSTAINABLE", highlight: "GROWTH" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  const stats = [
    { label: "Participating Institute", value: "NSEC Garia", icon: Building2, bgImg: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" },
    { label: "Adopted Villages", value: "05 Clusters", icon: MapPin, bgImg: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" },
    { label: "Mentoring RCI", value: "IIT Kharagpur", icon: GraduationCap, bgImg: "https://images.unsplash.com/photo-1626245917164-21be272d3362?auto=format&fit=crop&w=800&q=80" }
  ];

  const ubaData = {
    about: "Unnat Bharat Abhiyan (UBA) is a flagship programme of the Ministry of Human Resource Development (MHRD), Govt. of India, with the intention to enrich Rural India. This mission is targeted to use the knowledge base and resources available in the higher technical institutions to bring in transformational change in the rural development process. Institutions through faculty and students will carry out studies of living conditions in the adopted villages, assess the local problems and needs, and to improve the quality of rural life through innovative and affordable technological interventions.",
    nsecRole: "Netaji Subhash Engineering College (NSEC), Garia, Kolkata, WB, is one of the Participating Institute (PI) under Unnat Bharat Abhiyan mission and mentored by Indian Institute of Technology, Kharagpur (IITKgp) as a Regional Coordinating Institute (RCI). The institute has formed a UBA Cell comprising of an active working group consisting of motivated faculty and staff members, NSS unit and NSEC-Rotaract Club.",
    villages: [
      { name: "Ranabhutia", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Jagatipata", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Kantipota", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Kamdebpur", region: "Sundarban", district: "24 Parganas (South)", type: "Remote" },
      { name: "Paschim Sripatinagar", region: "Sundarban", district: "24 Parganas (South)", type: "Remote" }
    ],
    focus: [
      "To develop linkage with selective rural clusters and involve in the planning process.",
      "To promote the requisite Science and Technology interventions to improvise and expedite developmental efforts.",
      "To develop competency of the working group by appropriate orientation and training.",
      "To upgrade the capabilities of both public and private organizations in the society.",
      "To bring in transformational change in the rural developmental process."
    ],
    functions: [
      "Engage faculty and students in understanding rural realities and assessment of local problems.",
      "Identify and assess the local problems and needs in the adopted villages.",
      "Customize indigenous technology as per the local needs.",
      "Devise implementation methods for innovative solutions and sustainable development.",
      "Effective implementation of various government programmes."
    ],
    interventions: {
      human: [
        { title: "Health", icon: Heart },
        { title: "Education & Culture", icon: GraduationCap },
        { title: "Values", icon: ShieldCheck },
        { title: "Skills & Entrepreneurship", icon: Users }
      ],
      material: [
        { title: "Organic Agriculture", icon: Sprout },
        { title: "Water Management", icon: Leaf },
        { title: "Renewable Energy", icon: Globe2 },
        { title: "Artisans & Rural Industries", icon: Building2 },
        { title: "Local Natural Resources", icon: TreePine },
        { title: "Basic Amenities", icon: MapPin },
        { title: "E-support (IT-enabling)", icon: Globe }
      ]
    },
    coordinators: [
      {
        name: "Dr. Sukumar Roy",
        role: "Professor-Dept. of Biomedical Engineering",
        designation: "Coordinator-UBA Cell",
        email: "sroybme@gmail.com, sukumar.roy@nsec.ac.in",
        phone: "9433408287",
        desk: "Students joining this project can develop behavioral interactive skills and bring solution of real-life problems faced by the communities in a spirit of mutual benefit. Being the Coordinator of UBA Cell, I would like to invite all stakeholders to join in this novel initiative for imparting knowledge, technology and useful man-hours to the rural community."
      },
      {
        name: "Dr. Partha Sarathi Pal",
        role: "Professor-Electrical Engineering",
        designation: "Co-coordinator-UBA Cell",
        email: "pspal@nsec.ac.in",
        desk: "Our mission is to bridge the gap between theory and practice through community engagement, ensuring that technical education serves the real-world needs of rural India."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30">
      {/* ── HERO SECTION ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="UNNAT"
        titleFill="BHARAT"
        statutoryLabel="Abhiyan"
        policyLabel=""
        rightLabel="UBA.Cell.NSEC"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Bridging', 'the', 'gap', 'between', 'institutional', 'knowledge', 'and'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.32, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.32, 1] }}
                className="relative inline-block"
              >
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}>
                  Rural Excellence
                </span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.32, 1] }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }} className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentSentenceIdx} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      {/* ── 01. QUICK STATS ── */}
      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">
        <SectionHeading title="UBA Status" tagline="Participating Institute under the Ministry of Education." />
        
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <SpotlightStatusCard
              key={i}
              delay={i * 0.1}
              variant="teal"
              backgroundImage="/assets/images/helpline-bg.png"
              icon={stat.icon}
              badge="UBA Status"
              title={stat.value}
              description={stat.label}
              descriptionClassName="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/60"
              meta="Institutional Node"
              cta="Verified"
              className="min-h-[300px] justify-center"
            />
          ))}
        </div>
      </section>

      {/* ── 02. OVERVIEW ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24  overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">National Mission</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              Transforming <br/> <span className="text-brand-maroon">Rural Life</span>
            </h2>
            <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
              <p className="text-lg font-body font-medium text-slate-600 leading-relaxed italic">
                <HighlightText text={ubaData.about} />
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl flex-1 group hover:border-brand-accent/30 transition-all">
                <h4 className="text-sm font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2">Mentoring RCI</h4>
                <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest leading-relaxed">IIT Kharagpur (IITKgp)</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl flex-1 group hover:border-brand-accent/30 transition-all">
                <h4 className="text-sm font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2">PI Institutional Code</h4>
                <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest leading-relaxed">NSEC Garia, PI</p>
              </div>
            </div>
          </div>

          <SpotlightStatusCard
            delay={0.1}
            variant="teal"
            backgroundImage="/assets/images/helpline-bg.png"
            icon={ShieldCheck}
            badge="UBA Cell"
            title="The NSEC UBA Cell"
            value="Participating Institute"
            description={ubaData.nsecRole}
            meta="IIT Kharagpur RCI"
            cta="Explore"
            className="min-h-[420px]"
          />
        </div>
      </section>

      {/* ── 03. ADOPTED VILLAGES ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white">
        <SectionHeading title="Adopted Villages" tagline="Direct technological and knowledge support to rural clusters." />
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {ubaData.villages.map((village, i) => (
            <MinCard
              key={i}
              title={village.name}
              description={village.region}
              badge={`${village.type} Node`}
              meta={`District: ${village.district}`}
              icon={MapPin}
              variant={village.type === 'Local' ? 'accent' : 'danger'}
              index={i}
              center={false}
            />
          ))}
        </div>
      </section>

      {/* ── 04. INTERVENTION DOMAINS ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24  overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Human Development */}
          <div className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Users size={160} />
            </div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Domain Alpha</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              Human <br/> <span className="text-brand-accent">Development</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {ubaData.interventions.human.map((item, i) => (
                <div key={i} className="flex gap-4 p-4  rounded-2xl border border-transparent hover:border-brand-accent/20 hover:bg-white transition-all group/item">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover/item:text-brand-accent group-hover/item:border-brand-accent/30 transition-all shrink-0">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[13px] font-heading font-black italic uppercase tracking-tight text-slate-700 pt-1 leading-none">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material Development */}
          <div className="bg-white rounded-[40px] p-12 text-slate-900 relative overflow-hidden group shadow-2xl border border-slate-100">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Leaf size={160} />
            </div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Domain Beta</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              Material <br/> <span className="text-brand-accent">Development</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {ubaData.interventions.material.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-slate-100 hover:border-brand-accent transition-all group/item">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-200 group-hover/item:text-brand-accent transition-all shrink-0">
                    <item.icon size={18} />
                  </div>
                  <span className="text-[11px] font-heading font-black italic uppercase tracking-tight text-slate-700 pt-1 leading-none group-hover/item:text-slate-900 transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. FOCUS & FUNCTIONS ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Strategic Focus</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              Cell Major <br/> <span className="text-brand-maroon">Interventions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ubaData.focus.map((f, i) => (
                <Card key={i} index={i} variant="slate" className="p-6">
                  <div className="relative z-10 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-sm font-body font-medium text-slate-600 leading-relaxed italic">"{f}"</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">Operational <span className="text-brand-maroon">Functions</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ubaData.functions.map((fn, i) => (
                <Card key={i} index={i} variant="danger" className="p-6">
                  <div className="relative z-10 flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-maroon border border-brand-maroon/10 group-hover:bg-brand-maroon group-hover:text-white transition-all">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-[15px] font-body font-medium text-slate-500 leading-relaxed pt-1 group-hover:text-slate-800 transition-colors">{fn}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. COORDINATORS DESK ── */}
      <section className="relative pt-16 pb-24 px-8 lg:px-24 overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {ubaData.coordinators.map((coord, i) => (
            <SpotlightStatusCard
              key={i}
              delay={i * 0.18}
              variant={i === 0 ? 'teal' : 'maroon'}
              backgroundImage="/assets/images/helpline-bg.png"
              icon={Mail}
              badge="UBA Faculty"
              title={coord.name}
              value={coord.designation}
              description={coord.role}
              meta={coord.phone || coord.email.split(',')[0]}
              cta="Contact"
              className="min-h-[420px]"
            />
          ))}
        </div>
      </section>


    
            {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <BookOpen size={16} />
                  </div>
                  <h3 className="text-sm font-heading font-black italic uppercase tracking-widest text-slate-800">Document Preview</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedPdf} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors" title="Open in new tab">
                    <ExternalLink size={18} />
                  </a>
                  <button onClick={() => setSelectedPdf(null)} className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Close">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <iframe src={selectedPdf} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
