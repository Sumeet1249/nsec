import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Globe,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export default function TopUtilityBar() {
  return (
    <div className="w-full bg-white text-primary-950/40 py-2 px-6 lg:px-12 flex items-center justify-between border-b border-primary-950/5 z-50 relative font-heading text-[10px] uppercase tracking-[0.2em] font-bold">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-accent-blue">
            <ShieldCheck className="w-3 h-3" />
            <span>NBA_ACCREDITED</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Globe className="w-3 h-3" />
            <span>NAAC_GRADE_A</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 border-l border-primary-950/10 pl-8">
          <a href="tel:9831817307" className="hover:text-primary-950 transition-colors flex items-center gap-2">
            <Phone className="w-3 h-3" /> +91.9831.817.307
          </a>
          <a href="mailto:info@nsec.ac.in" className="hover:text-primary-950 transition-colors flex items-center gap-2">
            <Mail className="w-3 h-3" /> INFO@NSEC.AC.IN
          </a>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6">
          <span className="hover:text-primary-950 cursor-pointer transition-colors">IQAC</span>
          <span className="hover:text-primary-950 cursor-pointer transition-colors">NIRF</span>
          <span className="hover:text-primary-950 cursor-pointer transition-colors">ARIIA</span>
        </div>
        
        <div className="flex items-center gap-3 bg-primary-950/5 px-3 py-1 rounded-full">
          <Activity className="w-3 h-3 text-accent-cyan animate-pulse" />
          <span className="text-primary-950 font-bold">ADMISSIONS_LIVE</span>
        </div>
      </div>
    </div>
  );
}
