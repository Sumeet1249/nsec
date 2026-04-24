import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  MessageCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

const AccreditationLine = () => (
  <div className="flex items-center gap-12 whitespace-nowrap">
    <span className="text-[11px] font-bold text-brand-blue/80 uppercase tracking-tight">
      Approved by <span className="text-brand-accent">AICTE</span> • 
      Affiliated to <span className="text-brand-accent">MAKAUT</span> • 
      Accredited by <span className="text-brand-accent">NBA</span> (Programmes) and 
      <span className="text-brand-accent ml-1">NAAC</span> • 
      Ranked by <span className="text-brand-accent ml-1">NIRF</span> [2020] & 
      <span className="text-brand-accent ml-1">ARIIA</span>
    </span>
  </div>
);

export default function Header() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config/site-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load header config:", err));
  }, []);

  const utilityLinks = [
    { name: 'IQAC', path: '/iqac' },
    { name: 'R&D', path: '/rd' },
    { name: 'NBA', path: '/nba' },
    { name: 'NAAC', path: '/naac' },
    { name: 'UBA', path: '/uba' },
    { name: 'MOOCs', path: '/moocs' },
    { name: 'ARIIA', path: '/ariia' },
    { name: 'IIC', path: '/iic' },
    { name: 'IDEA Lab', path: '/idealab' },
    { name: 'Anti-ragging', path: '/anti-ragging' },
  ];

  if (!config) return <div className="h-22 bg-white" />;

  return (
    <div className="fixed top-0 left-0 right-0 z-[120]">
      {/* LAYER 01: CYAN UTILITY BAR */}
      <div className="bg-brand-accent text-white h-10 flex items-center justify-between px-12 relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <a href="tel:9831817307" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-brand-maroon flex items-center justify-center group-hover:bg-white group-hover:text-brand-maroon transition-all shadow-sm">
                <Phone size={12} className="text-white group-hover:text-brand-maroon" />
              </div>
              <span className="text-xs font-bold tracking-wider text-white">9831817307</span>
            </a>
            <a href="mailto:info@nsec.ac.in" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-brand-maroon flex items-center justify-center group-hover:bg-white group-hover:text-brand-maroon transition-all shadow-sm">
                <Mail size={12} className="text-white group-hover:text-brand-maroon" />
              </div>
              <span className="text-xs font-bold tracking-wider text-white">info@nsec.ac.in</span>
            </a>
            <div className="flex items-center gap-2 ml-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: "whatsapp", href: "https://wa.me/919831817307" }
              ].map((item, i) => (
                <a 
                  key={i}
                  href={item.href}
                  className="flex items-center justify-center w-8 h-8 bg-brand-maroon rounded-full border border-white/20 hover:bg-white hover:text-brand-maroon hover:border-brand-maroon transition-all group/icon shadow-sm"
                >
                  {item.icon === "whatsapp" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover/icon:text-brand-maroon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.661 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  ) : (
                    <item.icon size={14} className="text-white group-hover/icon:text-brand-maroon" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden lg:flex items-center gap-4">
            {utilityLinks.map((link, i) => (
              <React.Fragment key={link.name}>
                <a href={link.path} className="text-[11px] font-black uppercase tracking-widest hover:text-brand-maroon transition-colors whitespace-nowrap text-white">
                  {link.name}
                </a>
                {i < utilityLinks.length - 1 && <div className="h-3 w-[1px] bg-white/30" />}
              </React.Fragment>
            ))}
          </div>
          <Link to="/silverjubilee" className="flex items-center gap-3 px-4 py-1.5 bg-brand-maroon rounded-full border border-white/20 hover:bg-white hover:text-brand-maroon hover:border-brand-maroon transition-all group shadow-sm">
            <img
              src="/assets/HeroFocus/25-years-nsec-logo-3.png"
              alt="25 Years"
              className="w-4 h-4 object-contain"
            />
            <span className="text-[11px] font-black uppercase tracking-widest">25 Years</span>
          </Link>
        </div>
      </div>

      {/* LAYER 02: BRANDING BAR */}
      <header className="bg-white h-22 flex flex-col justify-center border-b border-brand-accent/10 shadow-lg relative overflow-hidden">
        <div className="px-12 flex items-center justify-between h-full">
          {/* LOGOS */}
          <div className="flex items-center justify-start gap-6 h-full py-2">
            <Link to="/" className="w-auto h-full flex items-center justify-center p-0 group border-r-2 border-brand-accent/20 pr-6">
              <img src={config.header.primaryLogo} alt="NSEC Logo" className="h-[90%] w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>
            <div className="flex items-center gap-4 h-full py-2">
              <img src={config.header.secondaryLogo} alt="AICTE Logo" className="h-[85%] w-auto object-contain opacity-90" />
              <img src={config.header.tertiaryLogo} alt="ICCE Logo" className="h-[85%] w-auto object-contain opacity-90" />
            </div>
          </div>

          {/* COLLEGE NAME & MARQUEE */}
          <div className="flex flex-col items-end justify-center shrink-0">
            <h1 className="text-3xl lg:text-4xl font-black text-brand-maroon leading-none tracking-tighter uppercase italic whitespace-nowrap text-right">
              NETAJI SUBHASH ENGINEERING <span className="text-brand-accent">COLLEGE</span>
            </h1>
            
            {/* NEW AGE SCROLLING TEXT */}
            <div className="w-full max-w-2xl h-6 mt-1.5 bg-brand-bg rounded-full border border-brand-accent/5 overflow-hidden relative flex items-center px-6 group">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-bg to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-bg to-transparent z-10" />
              
              <Motion.div 
                animate={{ x: [0, -800] }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
                className="whitespace-nowrap flex items-center gap-12"
              >
                <AccreditationLine />
                <AccreditationLine />
              </Motion.div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
