import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lightbulb, Users, Rocket, Building2, FileText, Download, CheckCircle2, ChevronRight, ExternalLink, Zap, Target, Trophy, Share2, Cpu, Globe, Handshake, Wrench, Calendar, Activity, Microscope, Stethoscope, Factory, BookOpen, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/card';
import SpotlightStatusCard from '../components/SpotlightStatusCard';
import MinCard from '../components/minCard';
import ContactSectionCard from '../components/ContactSectionCard.jsx';

void motion;

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'IIC', "Institution's Innovation Council", 'MHRD', 'Innovation Cell', 'MIC',
  'Netaji Subhash Engineering College', 'NSEC', 'Entrepreneurship Development Cell',
  'NSEC-EDC', 'Innovation', 'Entrepreneurship', 'Start-up', 'ARIIA', 'NISP', 'IPR',
  'IDEA Lab', 'Incubation Centre', 'INFERNO'
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

export default function IIC() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "INNOVATION", highlight: "CULTURE" },
    { main: "ENTREPRENEURIAL", highlight: "MINDSET" },
    { main: "STARTUP", highlight: "ECOSYSTEM" },
    { main: "CREATIVE", highlight: "EXCELLENCE" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);



  const iicMembers = [
    { sn: 1, name: "Prof. Amal Kr. Ghosh", position: "President" },
    { sn: 2, name: "Ms. Ina Bose", position: "Vice President, External Expert" },
    { sn: 3, name: "Dr. Shilpi Bose", position: "Convener and ARIIA Coordinator" },
    { sn: 4, name: "Mr. Dhritiman Mandal", position: "Startup Activity Coordinator" },
    { sn: 5, name: "Dr. Tridibesh Nag", position: "IPR Activity Coordinator" },
    { sn: 6, name: "Mr. Soumava Goswami", position: "Social Media Coordinator" },
    { sn: 7, name: "Dr. Chandra Das", position: "Innovation Coordinator" },
    { sn: 8, name: "Dr. Sukumar Roy", position: "Member" },
    { sn: 9, name: "Dr. Atanu Das", position: "Member" },
    { sn: 10, name: "Dr. Subrata Kabiraj", position: "Member" },
    { sn: 11, name: "Dr. Krishnendu Bhattacharya", position: "Member" },
    { sn: 12, name: "Dr. Animesh Bhattacharya", position: "Internship Activity Coordinator" },
    { sn: 13, name: "Dr. Partha Sarathi Pal", position: "NIRF Coordinator" },
    { sn: 14, name: "Dr. Indranil Ghosh", position: "Member" },
    { sn: 15, name: "Dr. Swapna Roy", position: "Member" },
    { sn: 16, name: "Dr. Supriya Dhabal", position: "Member" },
    { sn: 17, name: "Dr. Bijoy Kantha", position: "Member" },
    { sn: 18, name: "Mr. Arnab Datta", position: "Member" },
    { sn: 19, name: "Mr. Maloy Naskar", position: "Member" },
    { sn: 20, name: "Mr. Sourav Mitra", position: "Member" },
    { sn: 21, name: "Mr. Tarak Das", position: "Member" }
  ];

  const resourceCards = [
    { title: "I&E and IPR Policy", icon: ShieldCheck, path: "https://www.nsec.ac.in/notice/NSEC_IPR_Policy.pdf", type: "pdf", desc: "Governance for Entrepreneurship & Intellectual Property." },
    { title: "NISP Document", icon: FileText, path: "https://www.nsec.ac.in/notice/NSEC_NISP_Document.pdf", type: "pdf", desc: "National Innovation and Startup Policy Implementation." },
    { title: "Products & Prototypes", icon: Cpu, path: "#products", type: "anchor", desc: "Showcasing innovations like the Automatic Sanitization Tunnel." },
    { title: "Innovation Facilities", icon: Wrench, path: "#facilities", type: "anchor", desc: "Explore AICTE-IDEA Lab and the Incubation Centre." },
    { title: "Events & Activities", icon: Calendar, path: "#events", type: "anchor", desc: "Flagship events like INFERNO Business Fest." },
    { title: "Regional Ecosystem", icon: Globe, path: "#ecosystem", type: "anchor", desc: "Collaborations with regional and national bodies." },
    { title: "IP Support Node", icon: ShieldCheck, path: "#ip-support", type: "anchor", desc: "Dedicated support for patent filing and protection." },
    { title: "Partnerships & MoUs", icon: Handshake, path: "#mous", type: "anchor", desc: "Strategic alliances with Electrixa, Photonix, and more." },
    { title: "Achievements", icon: Trophy, path: "#achievements", type: "anchor", desc: "Legacy of success in ARIIA and NIRF frameworks." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30">
      {/* ── HERO SECTION ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="IIC"
        titleFill="HUB"
        statutoryLabel="INSTITUTION'S INNOVATION COUNCIL"
        policyLabel=""
        rightLabel="Creative.Node"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Inspiring', 'young', 'minds', 'to', 'transform', 'ideas', 'into'].map((word, i) => (
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
                  Market Prototypes
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



      {/* ── 02. JOURNEY & OVERVIEW ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Institutional Context</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              The NSEC-IIC <br /> <span className="text-brand-maroon">Journey</span>
            </h2>
            <div className="space-y-6">
              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
                <p className="text-[15px] font-body font-medium text-slate-600 leading-relaxed italic">
                  <HighlightText text="Ministry of Human Resource Development (MHRD), Govt. of India has established 'MHRD's Innovation Cell (MIC)' to systematically foster the culture of Innovation amongst all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are in their formative years." />
                </p>
              </div>
              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-maroon" />
                <p className="text-[15px] font-body font-medium text-slate-600 leading-relaxed italic">
                  <HighlightText text="The Institution's Innovation Council (IIC) at Netaji Subhash Engineering College has been established in October, 2019 to encourage the creative energy of our students to work on new ideas and innovation and promote them to create startups and entrepreneurial ventures." />
                </p>
              </div>
            </div>
          </div>

          <MinCard
            variant="danger"
            icon={Rocket}
            badge="EDC Mandate"
            title="EDC Mandate"
            description="The NSEC Entrepreneurship Development Cell (NSEC-EDC) started its journey with the aim to inculcate the spirit of innovation and entrepreneurship amongst the young students, encouraging start-up creation through guidance, mentorship and support."
            className="relative pt-12 h-full"
            contentClassName="gap-5"
          >
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Vibrant Ecosystem", desc: "Creating a local innovation promotion infrastructure." },
                { title: "ARIIA Readiness", desc: "Benchmarking institutional rankings for innovation." },
                { title: "Cognitive Ability", desc: "Developing technical and problem-solving skills." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#fbbf24] flex items-center justify-center text-brand-maroon shrink-0"><CheckCircle2 size={16} /></div>
                  <div>
                    <h4 className="text-[11px] font-mono font-black uppercase tracking-widest text-white">{item.title}</h4>
                    <p className="text-[12px] font-body text-white/75">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </MinCard>
        </div>
      </section>

      {/* ── 03. FOCUS & FUNCTIONS ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Council Mandate</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8 leading-none">
              Functions of <br /> <span className="text-brand-maroon">IIC Council</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Conduct innovation and entrepreneurship activities.",
                "Identify and reward innovations and success stories.",
                "Organize periodic workshops and investor interactions.",
                "Network with national entrepreneurship organizations.",
                "Organize Hackathons, Idea competitions and mini-challenges.",
                "Create Institutional Innovation portal for projects."
              ].map((fn, i) => (
                <Card key={i} index={i} variant={i % 2 === 0 ? 'accent' : 'slate'}>
                  <div className="p-5 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
                    <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
                      <Zap size={18} />
                    </div>
                    <p className="text-[14px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2">
                      {fn}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card index={0} variant="danger" className="p-0">
            <div className="p-12 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 text-brand-maroon">
                <Target size={160} />
              </div>
              <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8">Major <span className="text-brand-maroon">Focus</span></h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Vibrant innovation ecosystem creation.",
                  "Start-up supporting Mechanism at NSEC.",
                  "Prepare institute for ARIIA Framework.",
                  "Scouting Ideas and Pre-incubation Scouting.",
                  "Develop better Cognitive Ability for Students."
                ].map((focus, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 group/item hover:bg-brand-maroon/5 hover:border-brand-maroon/20 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-brand-maroon/10 flex items-center justify-center text-brand-maroon group-hover/item:bg-brand-maroon group-hover/item:text-white transition-all shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-[13px] font-body font-medium text-slate-700 group-hover/item:text-slate-900 pt-1 leading-tight transition-colors">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── 04. IIC MEMBERS ── */}
      <section id="members" className="relative pt-16 pb-8 px-8 lg:px-24 bg-white">
        <SectionHeading title="IIC Members" tagline="Council composition according to the IIC Portal." />

        <div className="max-w-7xl mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {iicMembers.map((member, i) => (
              <ContactSectionCard
                key={i}
                index={i}
                title={member.name}
                subtitle={member.position}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. INNOVATION HUB (RESOURCES) ── */}
      <section id="hub" className="relative pt-16 pb-8 px-8 lg:px-24 bg-white border-t border-slate-200">
        <SectionHeading title="Innovation Hub" tagline="Resources, Facilities, and Strategic Ecosystem Portals." />

        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCards.map((card, i) => (
            <SpotlightStatusCard
              key={i}
              href={card.path}
              target={card.type === 'pdf' ? '_blank' : undefined}
              rel={card.type === 'pdf' ? 'noopener noreferrer' : undefined}
              delay={i * 0.05}
              variant={i % 2 === 0 ? 'teal' : i % 2 === 0 ? 'gold' : 'maroon'}
              backgroundImage="/assets/images/helpline-bg.png"
              icon={card.icon}
              badge={card.type === 'pdf' ? 'PDF Resource' : 'Hub Portal'}
              title={card.title}
              description={card.desc}
              meta="Innovation Hub"
              cta={card.type === 'pdf' ? 'Download' : 'View Portal'}
            />
          ))}
        </div>
      </section>

      {/* ── 06. KEY HIGHLIGHTS (PRODUCTS & FACILITIES) ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Products */}
          <div id="products" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative rounded-[48px] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-brand-accent/10 group-hover:bg-brand-accent/0 transition-colors duration-700" />
              <img
                src="/assets/images/IIC/iic_product_01_sani.jpg"
                alt="Automatic Sanitization Tunnel"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = '/assets/HeroFocus/Campus_Life4.webp'; }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent">
                <span className="text-[9px] font-mono font-black text-brand-accent uppercase tracking-[0.3em] mb-2 block">Flagship Prototype</span>
                <h4 className="text-2xl font-heading font-black italic uppercase tracking-tight text-white leading-none">Automatic Sanitization Tunnel</h4>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Innovation Output</span>
              <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">Products of <br /> <span className="text-brand-accent">NSEC-IIC</span></h3>
              <p className="text-lg font-body font-medium text-slate-500 leading-relaxed italic">
                Our innovation ecosystem translates academic research into market-ready products. The <span className="text-brand-accent font-bold">Automatic Sanitization Tunnel</span>, developed by faculty and student innovators, stands as a testament to our rapid prototyping capabilities during national emergencies.
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div id="facilities" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center direction-rtl">
            <div className="lg:order-2 relative rounded-[48px] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-brand-maroon/10 group-hover:bg-brand-maroon/0 transition-colors duration-700" />
              <img
                src="/assets/images/IIC/nsec-idealab-fp01.jpg"
                alt="AICTE-IDEA Lab"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = '/assets/HeroFocus/Campus_Life3.webp'; }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent text-right">
                <span className="text-[9px] font-mono font-black text-brand-accent uppercase tracking-[0.3em] mb-2 block">Premium Laboratory</span>
                <h4 className="text-2xl font-heading font-black italic uppercase tracking-tight text-white leading-none">AICTE-IDEA Lab</h4>
              </div>
            </div>
            <div className="lg:order-1 text-right">
              <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Research Infra</span>
              <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">State-of-the-art <br /> <span className="text-brand-accent">Facilities</span></h3>
              <p className="text-lg font-body font-medium text-slate-500 leading-relaxed italic">
                From the <span className="text-brand-accent font-bold">AICTE-IDEA Lab</span> for high-end prototyping to the <span className="text-brand-accent font-bold">NSEC Incubation Centre</span> (mentored by CII), we provide the physical and intellectual space required to scale startup ventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. REGIONAL ECOSYSTEM & PARTNERSHIPS ── */}
      <section id="ecosystem" className="pt-16 pb-8 px-8 lg:px-24 bg-white text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-brand-accent rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-black text-black uppercase tracking-[0.4em] mb-4 block">Regional Network</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8">Strategic <span className="text-brand-maroon">Alliances</span></h3>
            <div id="mous" className="space-y-4">
              {[
                { name: "Electrixa Energy and Lighting Pvt. Ltd.", type: "Industry Partner" },
                { name: "Remedy Hospital", type: "Healthcare Partner" },
                { name: "Photonix Solar", type: "Energy Partner" },
                { name: "Suncraft Energy", type: "Sustainable Partner" }
              ].map((mou, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-all">
                  <div>
                    <p className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-900 group-hover:text-brand-accent transition-colors">{mou.name}</p>
                    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">{mou.type}</span>
                  </div>
                  <Handshake size={20} className="text-slate-400 group-hover:text-brand-accent transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div id="achievements">
            <span className="text-[10px] font-mono font-black text-black uppercase tracking-[0.4em] mb-4 block">Achievements</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8">NSEC-EDC <span className="text-brand-maroon">Impact</span></h3>
            <div className="space-y-6">
              <MinCard
                title="Model Assembly Unit"
                description="Established a specialized Model Assembly cum Testing Unit on LED Lighting within the campus, supporting real-world industrial training."
                icon={Trophy}
                variant="accent"
                index={0}
              />
              <MinCard
                title="INFERNO Fest"
                description="Our flagship business fest, INFERNO, continues to act as a launchpad for student-led startups and business plan competitions."
                icon={Activity}
                variant="danger"
                index={1}
              />
            </div>
          </div>
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
