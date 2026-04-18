import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Download,
  ShieldCheck
} from 'lucide-react';

export default function Admissions() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pt-32">
      <section className="px-6 lg:px-12 py-32 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
             >
               <span className="section-label !mb-0">Enrollment 2025</span>
               <div className="h-px w-12 bg-brand-accent/20" />
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-7xl lg:text-9xl text-brand-maroon font-black uppercase tracking-tighter"
             >
               Secure your Technical <br />
               <span className="hero-serif text-brand-accent italic">Legacy.</span>
             </motion.h1>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
             <p className="text-xl text-brand-muted font-medium leading-relaxed border-l-2 border-brand-accent pl-8">
               Join a cohort of thinkers, makers, and innovators. Our admission process is designed to identify potential and academic excellence.
             </p>
             <div className="flex items-center gap-3 text-brand-accent font-bold text-sm tracking-widest uppercase">
                <ShieldCheck className="w-5 h-5" />
                AICTE Approved Institution
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {[
            { step: '01', title: 'Eligibility Check', desc: 'Verify your entrance exam scores (WBJEE/JEE Main) and academic prerequisites.', icon: CheckCircle },
            { step: '02', title: 'Application Phase', desc: 'Complete your digital profile with academic history and personal achievements.', icon: FileText },
            { step: '03', title: 'Counseling Sync', desc: 'Engage in the centralized counseling process for final seat allocation.', icon: Calendar }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 space-y-10 group"
            >
              <span className="text-6xl font-serif italic text-white/5 group-hover:text-brand-accent/20 transition-colors duration-500">{item.step}</span>
              <div className="space-y-4">
                <h3 className="text-3xl text-white">{item.title}</h3>
                <p className="text-brand-muted font-medium leading-relaxed">{item.desc}</p>
              </div>
              <item.icon className="w-8 h-8 text-brand-accent opacity-20 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-16 flex flex-col justify-between items-start bg-brand-surface group">
            <div className="space-y-6">
              <span className="section-label">Documentation</span>
              <h2 className="text-5xl text-white">Institutional <br /> Prospectus</h2>
              <p className="text-brand-muted font-medium text-lg leading-relaxed max-w-sm">Download the comprehensive guide to our 2025 academic offerings and campus profile.</p>
            </div>
            <button className="btn-primary mt-12 flex items-center gap-3">
              Download PDF <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-card p-16 flex flex-col justify-between items-start border-brand-accent/30 group">
            <div className="space-y-6">
              <span className="section-label">Online Portal</span>
              <h2 className="text-5xl text-white">Application <br /> Gateway</h2>
              <p className="text-brand-muted font-medium text-lg leading-relaxed max-w-sm">Start your journey today through our streamlined digital application system.</p>
            </div>
            <button className="w-full py-6 border-2 border-brand-accent rounded-full text-brand-accent font-bold text-lg hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-3 mt-12">
              Access Portal <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
