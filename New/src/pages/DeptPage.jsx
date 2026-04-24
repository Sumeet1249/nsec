import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Users, Image as ImageIcon, TrendingUp, ChevronDown, Award, Mail, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function DeptPage() {
  const { deptId } = useParams();
  const [openSem, setOpenSem] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const targetDept = deptId ? deptId.toLowerCase() : 'aeie';
    
    fetch(`/config/department-${targetDept}-config.json`)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => {
        console.error(`Failed to load config for ${targetDept}:`, err);
      });
  }, [deptId]);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading department data...</div>;

  const { department: deptData } = config;

  return (
    <div className="w-full min-h-screen bg-brand-bg pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke="DEPT."
        titleFill={deptData.code.toUpperCase()}
        statutoryLabel="Department of"
        policyLabel={deptData.name}
        rightLabel="Academic.Node"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Advancing <span className="text-brand-accent">technological frontiers</span> through specialized education in {deptData.name}.
            </p>
            <div className="flex items-center gap-4 mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:bg-brand-accent/10 hover:border-brand-accent transition-all">
               <div className="p-2 bg-brand-accent/20 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Globe size={20} />
               </div>
               <span className="text-[11px] font-mono font-black text-white/60 uppercase tracking-widest">Dept.Code: {deptData.code}</span>
            </div>
          </div>
        }
      />

      <section className="px-6 lg:px-24 py-20 max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Departmental Overview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info & Stats */}
          <div className="lg:col-span-8 space-y-16">
             <div className="glass-card p-12">
                <h2 className="text-3xl font-black text-brand-maroon uppercase tracking-tighter mb-6">About the Department</h2>
                <p className="text-xl text-brand-muted leading-relaxed font-medium">{deptData.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {[
                    { label: 'Students', value: deptData.stats.students, icon: Users },
                    { label: 'Faculty', value: deptData.stats.faculty, icon: Award },
                    { label: 'Laboratories', value: deptData.stats.labs, icon: ImageIcon },
                    { label: 'Placement', value: deptData.stats.placementRate, icon: TrendingUp }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/50 p-6 rounded-2xl border border-white flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
                      <stat.icon className="w-6 h-6 text-brand-accent mb-3" />
                      <span className="text-2xl font-bold text-brand-maroon">{stat.value}</span>
                      <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Faculty Table */}
             <div className="glass-card p-12 overflow-hidden">
                <h2 className="text-3xl font-black text-brand-maroon uppercase tracking-tighter mb-8 flex items-center gap-4">
                  <Users className="text-brand-accent" /> Faculty Panel
                </h2>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b-2 border-brand-accent/20">
                            <th className="pb-4 text-brand-accent font-black text-xs uppercase tracking-widest">Name</th>
                            <th className="pb-4 text-brand-accent font-black text-xs uppercase tracking-widest">Designation</th>
                            <th className="pb-4 text-brand-accent font-black text-xs uppercase tracking-widest">Qualification</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-accent/5">
                         {deptData.faculty.map((member) => (
                            <tr key={member.id} className="hover:bg-brand-accent/5 transition-colors group">
                               <td className="py-6 pr-4 text-brand-maroon font-bold text-lg group-hover:pl-2 transition-all">{member.name}</td>
                               <td className="py-6 px-4 text-brand-muted font-medium uppercase text-xs tracking-wider">{member.designation}</td>
                               <td className="py-6 pl-4 text-brand-muted font-medium">{member.qualification}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Curriculum */}
             <div className="space-y-8">
                <h2 className="text-3xl font-black text-brand-maroon uppercase tracking-tighter flex items-center gap-4">
                  <Book className="text-brand-accent" /> Curriculum Node
                </h2>
                <div className="space-y-4">
                   {deptData.curriculum.map((sem, idx) => (
                      <div key={idx} className="glass-card overflow-hidden">
                         <button 
                            className="w-full p-8 text-left flex justify-between items-center group"
                            onClick={() => setOpenSem(openSem === idx ? null : idx)}
                         >
                            <span className={`text-xl font-bold transition-colors ${openSem === idx ? 'text-brand-accent' : 'text-brand-maroon'}`}>{sem.sem}</span>
                            <div className={`p-2 rounded-full transition-all ${openSem === idx ? 'bg-brand-accent text-white rotate-180' : 'bg-brand-accent/10 text-brand-accent'}`}>
                               <ChevronDown className="w-5 h-5" />
                            </div>
                         </button>
                         <AnimatePresence>
                           {openSem === idx && (
                              <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="px-8 pb-8 pt-0"
                              >
                                 <div className="h-px w-full bg-brand-accent/10 mb-6" />
                                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {sem.subjects.map((sub, sidx) => (
                                       <li key={sidx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-brand-accent/5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                                          <span className="text-brand-muted font-medium">{sub}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Labs & Contact */}
          <div className="lg:col-span-4 space-y-8">
             <div className="glass-card p-8">
                <h2 className="text-2xl font-black text-brand-maroon uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <ImageIcon className="text-brand-accent w-6 h-6" /> Lab Units
                </h2>
                <div className="grid grid-cols-1 gap-4">
                   {deptData.labs.map((item, i) => (
                      <div key={i} className="p-6 bg-white/50 rounded-2xl border border-white hover:border-brand-accent transition-all group flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                             <span className="font-mono text-xs font-black">{String(i+1).padStart(2, '0')}</span>
                          </div>
                          <span className="text-brand-maroon font-bold uppercase tracking-widest text-[10px]">{item.name}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="glass-card p-8 bg-brand-maroon text-white border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
                   <Mail className="w-5 h-5 text-brand-accent" /> Contact Node
                </h3>
                <div className="space-y-6 relative z-10">
                   <div>
                      <p className="text-white/50 text-[10px] font-mono uppercase tracking-widest mb-1">Head of Department</p>
                      <p className="text-2xl font-bold">{deptData.contact.head}</p>
                   </div>
                   <div className="h-px w-full bg-white/10" />
                   <a href={`mailto:${deptData.contact.email}`} className="text-brand-accent font-mono text-sm font-bold block hover:underline truncate">
                      {deptData.contact.email}
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
