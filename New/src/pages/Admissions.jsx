import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Download,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Admissions() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke="SECURE YOUR"
        titleFill="LEGACY"
        statutoryLabel="Enrollment 2025"
        policyLabel="Admissions Gateway"
        rightLabel="Join.NSEC"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Join a cohort of <span className="text-brand-accent">thinkers and makers</span>. Our process identifies potential and academic excellence.
            </p>
            <div className="flex items-center gap-3 mt-6 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl">
               <ShieldCheck className="text-brand-accent" size={20} />
               <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">AICTE Approved Path</span>
            </div>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Enrollment Protocol</span>
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
