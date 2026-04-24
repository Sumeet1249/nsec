import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  ArrowUp,
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function Footer() {
  const [config, setConfig] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetch('/config/site-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load footer config:", err));

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!config || !config.footer) return null;

  return (
    <footer className="bg-brand-blue text-white pt-24 pb-8 px-8 lg:px-16 relative overflow-hidden border-t-8 border-brand-maroon">
      {/* Background Industrial Decal */}
      <div className="absolute top-0 right-0 p-10 text-[20vw] font-black text-white/[0.03] leading-none select-none pointer-events-none uppercase italic tracking-tighter">
        ESTD.1998
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Identity & Heritage Section */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-maroon flex items-center justify-center border border-white/20">
                  <img
                    src="/assets/uba/nsec_logo_w962xh1280.jpeg"
                    alt="NSEC Logo"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-maroon to-transparent" />
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter leading-[0.8] mb-6 text-white uppercase">
                Netaji Subhash <br /> 
                <span className="text-brand-accent">Engineering College</span>
              </h2>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/50 leading-loose max-w-sm border-l-2 border-brand-maroon pl-6">
                Synthesizing <span className="text-brand-accent">Industrial Precision</span> with <span className="text-brand-maroon">Academic Heritage</span>. NSEC stands as a premier autonomous node in engineering and technology since 1998.
              </p>
            </div>

            {/* Live Node Status */}
            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-none max-w-xs">
              <div className="w-10 h-10 rounded-full border border-brand-accent/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border border-brand-accent animate-ping opacity-20" />
                <Clock size={16} className="text-brand-accent" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Kolkata_Standard_Time</span>
                <span className="block font-mono text-sm font-bold text-brand-accent">
                  {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Directory Matrix */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            {config.footer.sections.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-brand-maroon" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                    {section.title}
                  </span>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx} className="group overflow-hidden">
                      <Link 
                        to={link.path} 
                        className="text-sm font-bold uppercase tracking-tighter text-white/40 hover:text-brand-accent transition-all duration-300 flex items-center gap-2 -translate-x-4 hover:translate-x-0"
                      >
                        <div className="w-2 h-[1px] bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Global Access Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="lg:col-span-3 px-8 flex flex-col justify-center border-r border-white/5">
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-brand-maroon flex items-center justify-center hover:bg-brand-accent transition-all duration-500 group">
                  <Icon size={16} className="text-white group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 px-8 flex flex-col justify-center border-r border-white/5">
            <div className="flex flex-wrap gap-8">
              <a href="tel:9831817307" className="flex items-center gap-3 group">
                <Phone size={14} className="text-brand-accent" />
                <span className="font-mono text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">9831817307</span>
              </a>
              <a href="mailto:info@nsec.ac.in" className="flex items-center gap-3 group">
                <Mail size={14} className="text-brand-accent" />
                <span className="font-mono text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">info@nsec.ac.in</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MapPin size={20} className="text-brand-maroon" />
              <div>
                <span className="block font-mono text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                  Techno City, Garia, Kolkata - 700152, <br /> West Bengal, India
                </span>
              </div>
            </div>
            <a 
              href="https://www.google.com/maps/place/Netaji+Subhash+Engineering+College/@22.47616,88.414933,15z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent transition-all group"
            >
              <Globe size={16} className="text-white/40 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Legal & Status Line */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
              © 2026 NSEC_CORE_UNIT
            </span>
            <div className="flex gap-6">
              <Link to="#" className="font-mono text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-brand-accent transition-colors">Privacy_Protocol</Link>
              <Link to="#" className="font-mono text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-brand-accent transition-colors">Compliance_Log</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-maroon hover:border-brand-maroon transition-all group"
            >
              <ArrowUp size={16} className="text-white/40 group-hover:text-white group-hover:-translate-y-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
