import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { 
  ChevronDown,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';

export default function Navbar() {
  const location = useLocation();
  const [navItems, setNavItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredChild, setHoveredChild] = useState(null);

  useEffect(() => {
    fetch('/config/site-config.json')
      .then(res => res.json())
      .then(data => setNavItems(data.navigation || []))
      .catch(err => console.error("Failed to load nav config:", err));
  }, []);

  const getIcon = (iconName) => {
    const Icon = Lucide[iconName];
    return Icon ? <Icon size={14} strokeWidth={2.5} /> : null;
  };

  return (
    <nav className="fixed top-[126px] left-0 right-0 z-[110] bg-white border-b border-brand-accent/10 shadow-md">
      <div className="max-w-[1920px] mx-auto px-12 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {navItems.map((item) => (
            <div 
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => {
                setHoveredItem(null);
                setHoveredChild(null);
              }}
              className="relative h-[60px] flex items-center"
            >
              {/* MAIN_BUTTON */}
              <div className={cn(
                "px-3 py-2 flex items-center gap-2 cursor-pointer rounded-lg transition-all duration-300 mx-0.5 border-2",
                hoveredItem === item.id 
                  ? "bg-brand-blue text-white border-brand-blue shadow-md" 
                  : "bg-white text-brand-blue border-transparent hover:border-brand-accent/20 hover:bg-brand-accent/5"
              )}>
                <div className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center transition-colors shrink-0",
                  hoveredItem === item.id ? "bg-brand-accent text-white" : "bg-brand-accent/10 text-brand-accent"
                )}>
                  {getIcon(item.icon)}
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider whitespace-nowrap">{item.name}</span>
                {item.children && (
                  <ChevronDown size={12} className={cn("transition-transform duration-500 opacity-40 shrink-0", hoveredItem === item.id && "rotate-180 opacity-100")} />
                )}
              </div>

              {/* DROPDOWN */}
              <AnimatePresence>
                {hoveredItem === item.id && item.children && (
                  <Motion.div 
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    className="absolute top-full left-0 pt-1 min-w-[280px]"
                  >
                    <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-brand-accent/10 p-1.5 overflow-visible">
                      <div className="grid gap-0">
                        {item.children.map((child) => (
                          <div 
                            key={child.name}
                            className="relative"
                            onMouseEnter={() => setHoveredChild(child.name)}
                            onMouseLeave={() => setHoveredChild(null)}
                          >
                            <Link
                              to={child.path}
                              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-brand-accent/5 group transition-all"
                            >
                              <div className="flex flex-col">
                                <span className="text-[12.5px] font-black text-brand-blue uppercase tracking-tight group-hover:text-brand-accent transition-colors leading-none">
                                  {child.name}
                                </span>
                                {child.desc && (
                                  <span className="text-[7.5px] font-bold text-brand-blue/60 uppercase tracking-widest leading-none mt-1">
                                    {child.desc}
                                  </span>
                                )}
                              </div>
                              {child.subChildren ? (
                                <ChevronRight size={13} className="text-brand-accent group-hover:translate-x-1 transition-all" />
                              ) : (
                                <ArrowUpRight size={12} className="text-brand-blue/20 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                              )}
                            </Link>

                            {/* SUB-SUB-MENU */}
                            <AnimatePresence>
                              {hoveredChild === child.name && child.subChildren && (
                                <Motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="absolute top-0 left-full pl-1.5 min-w-[200px]"
                                >
                                  <div className="bg-white rounded-xl shadow-xl border border-brand-accent/10 p-1">
                                    {child.subChildren.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        to={sub.path}
                                        className="flex items-center py-1.5 px-2.5 rounded-lg hover:bg-brand-accent/5 text-[10.5px] font-black text-brand-blue uppercase tracking-tight hover:text-brand-accent transition-all leading-none"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                </Motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                      <Link to={`/${item.id}`} className="mt-1 p-2 bg-brand-blue rounded-xl flex items-center justify-between group cursor-pointer overflow-hidden relative h-8">
                        <div className="absolute inset-0 bg-brand-accent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] relative z-10">Overview</span>
                        <ChevronRight size={12} className="text-white relative z-10" />
                      </Link>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center h-full">
          {/* Industrial Admission Button - Driven from Config */}
          <Link 
            to={navItems.find(item => item.id === 'admission')?.path || '/admission'} 
            className="h-full px-12 bg-brand-blue text-white flex items-center justify-center gap-5 relative group overflow-hidden shadow-[0_0_30px_rgba(0,139,139,0.3)]"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
          >
            {/* Darker internal shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
            
            {/* Hover Slide Effect */}
            <div className="absolute inset-0 bg-brand-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            
            <div className="w-7 h-7 bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30 relative z-10 transition-colors group-hover:bg-white/20">
              <Lucide.GraduationCap size={16} className="text-brand-accent group-hover:text-white transition-colors" />
            </div>
            
            <span className="font-black text-[12px] uppercase tracking-[0.4em] italic relative z-10 group-hover:text-white transition-colors">
              {navItems.find(item => item.id === 'admission')?.name || 'Admission'}
            </span>
            
            <Lucide.MoveRight size={16} className="text-brand-accent relative z-10 opacity-40 group-hover:opacity-100 group-hover:text-white transition-all group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
