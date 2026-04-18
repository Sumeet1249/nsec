import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Rocket, 
  Shield, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

const programs = [
  {
    title: 'B.Tech Degrees',
    desc: 'Undergraduate programs focused on core engineering disciplines and emerging technologies.',
    items: ['Computer Science & Eng.', 'Electronics & Communication', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Computer Science & Business Systems'],
    icon: Rocket,
  },
  {
    title: 'M.Tech Programs',
    desc: 'Advanced postgraduate studies for specialization in research and industrial applications.',
    items: ['Computer Science & Eng.', 'Electronics & Communication', 'Power Systems'],
    icon: Cpu,
  },
  {
    title: 'Professional Studies',
    desc: 'Industry-aligned graduate and postgraduate degrees in application and management.',
    items: ['MCA (Master of Comp. App.)', 'BCA (Bachelor of Comp. App.)', 'MBA (Master of Bus. Admin.)', 'BBA (Bachelor of Bus. Admin.)'],
    icon: Shield,
  },
];

export default function Programs() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-brand-bg pt-32">
      <section className="px-6 lg:px-12 py-32 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
             >
               <span className="section-label !mb-0">Academic Offerings</span>
               <div className="h-px w-12 bg-brand-accent/20" />
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-7xl lg:text-9xl text-brand-maroon font-black uppercase tracking-tighter"
             >
               Knowledge <br />
               <span className="hero-serif text-brand-accent italic">Verticals.</span>
             </motion.h1>
          </div>
          
          <div className="lg:col-span-4 pb-4">
             <p className="text-xl text-brand-muted font-medium leading-relaxed border-l-2 border-brand-accent pl-8">
               Designing specialized academic pathways for the next generation of global engineering professionals.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 flex flex-col justify-between group"
            >
              <div>
                <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-10 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <prog.icon className="w-8 h-8" />
                </div>
                <h2 className="text-4xl text-white mb-4">{prog.title}</h2>
                <p className="text-brand-muted font-medium mb-10 leading-relaxed">{prog.desc}</p>
                
                <ul className="space-y-4 mb-12">
                  {prog.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-3">
                Download Syllabus <BookOpen className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 pb-40 max-w-[1800px] mx-auto w-full">
         <div className="bg-brand-accent text-white p-16 lg:p-24 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-brand-accent/20">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 max-w-2xl text-center lg:text-left">
               <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">Ready to begin?</h2>
               <p className="text-white/80 text-xl font-medium leading-relaxed">
                 Our academic advisors are here to help you choose the right path for your technical journey.
               </p>
            </div>
            
            <button className="bg-white text-brand-accent px-12 py-6 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
               Apply Now <ArrowRight />
            </button>
         </div>
      </section>
    </div>
  );
}
