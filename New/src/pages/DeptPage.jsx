import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Users, Image as ImageIcon, TrendingUp, ChevronDown, Award } from 'lucide-react';

export default function DeptPage() {
  const { deptId } = useParams();
  const [openSem, setOpenSem] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Determine which config to fetch based on URL param
    // Fallback to aeie if route matches /departments but no param (though router handles this)
    const targetDept = deptId ? deptId.toLowerCase() : 'aeie';
    
    fetch(`/config/department-${targetDept}-config.json`)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => {
        console.error(`Failed to load config for ${targetDept}:`, err);
        // Fallback or error state could be handled here
      });
  }, [deptId]);

  if (!config) return <div className="h-screen bg-brand-bg flex items-center justify-center text-brand-muted">Loading department data...</div>;

  const { department: deptData } = config;

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full mb-16">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-4 mb-4"
         >
           <span className="section-label !mb-0">Department of</span>
           <div className="h-px w-12 bg-brand-accent/20" />
         </motion.div>
         
         <motion.h1 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-4xl lg:text-7xl text-brand-maroon font-black uppercase tracking-tighter"
         >
           {deptData.name}
         </motion.h1>
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="mt-6 text-xl text-brand-muted max-w-4xl leading-relaxed"
         >
           {deptData.description}
         </motion.p>
      </section>

      {/* Stats row */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-brand-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{deptData.stats.students}</h3>
            <p className="text-sm font-medium text-brand-muted uppercase tracking-wider">Students</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <Award className="w-8 h-8 text-brand-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{deptData.stats.faculty}</h3>
            <p className="text-sm font-medium text-brand-muted uppercase tracking-wider">Faculty</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <ImageIcon className="w-8 h-8 text-brand-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{deptData.stats.labs}</h3>
            <p className="text-sm font-medium text-brand-muted uppercase tracking-wider">Laboratories</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <TrendingUp className="w-8 h-8 text-brand-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{deptData.stats.placementRate}</h3>
            <p className="text-sm font-medium text-brand-muted uppercase tracking-wider">Placement</p>
        </div>
      </section>

      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {/* Faculty Table */}
          <div>
             <h2 className="text-3xl font-bold text-brand-maroon mb-6 flex items-center gap-3">
               <Users className="text-brand-accent" /> Faculty Members
             </h2>
             <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                         <th className="p-4 text-brand-accent font-semibold tracking-wide">Name</th>
                         <th className="p-4 text-brand-accent font-semibold tracking-wide">Designation</th>
                         <th className="p-4 text-brand-accent font-semibold tracking-wide">Qualification</th>
                      </tr>
                   </thead>
                   <tbody>
                      {deptData.faculty.map((member) => (
                         <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-white font-medium">{member.name}</td>
                            <td className="p-4 text-brand-muted">{member.designation}</td>
                            <td className="p-4 text-brand-muted">{member.qualification}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          {/* Curriculum Accordion */}
          <div>
            <h2 className="text-3xl font-bold text-brand-maroon mb-6 flex items-center gap-3">
               <Book className="text-brand-accent" /> Curriculum Overview
             </h2>
             <div className="space-y-4">
                {deptData.curriculum.map((sem, idx) => (
                   <div key={idx} className="glass-card overflow-hidden">
                      <button 
                         className="w-full p-6 text-left flex justify-between items-center text-lg font-bold text-white hover:text-brand-accent transition-colors"
                         onClick={() => setOpenSem(openSem === idx ? null : idx)}
                      >
                         {sem.sem}
                         <ChevronDown className={`transform transition-transform ${openSem === idx ? 'rotate-180 text-brand-accent' : 'text-brand-muted'}`} />
                      </button>
                      
                      {openSem === idx && (
                         <div className="px-6 pb-6 pt-2 border-t border-white/10">
                            <ul className="list-disc ml-6 space-y-2 text-brand-muted font-medium mt-4">
                               {sem.subjects.map((sub, sidx) => (
                                  <li key={sidx}>{sub}</li>
                               ))}
                            </ul>
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
           {/* Labs Gallery snippet */}
           <div>
              <h2 className="text-2xl font-bold text-brand-maroon mb-6 flex items-center gap-3">
               <ImageIcon className="text-brand-accent w-6 h-6" /> Lab Facilities
              </h2>
              <div className="grid grid-cols-2 gap-4">
                 {deptData.labs.map((item, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:border-brand-accent/50 transition-colors overflow-hidden relative group p-4 text-center">
                        <div className="absolute inset-0 bg-brand-maroon/20 group-hover:bg-transparent transition-colors z-10" />
                        <span className="text-white/60 z-20 font-bold tracking-widest text-xs">{item.name}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Quick Contact */}
           <div className="glass-card p-8 border-t-4 border-brand-accent">
              <h3 className="text-xl font-bold text-white mb-4">Department Contact</h3>
              <p className="text-brand-muted mb-2 font-medium">Head of Department</p>
              <p className="text-white font-bold">{deptData.contact.head}</p>
              <p className="text-brand-muted mt-4 text-sm break-words">{deptData.contact.email}</p>
           </div>
        </div>
      </section>
    </div>
  );
}
