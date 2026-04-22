'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Users, Target, CheckCircle2, Mail, BookOpen } from 'lucide-react';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const iconMap = {
  'IQAC Links': FileText,
  'Annual Reports': BookOpen,
  'Major Focus': Target,
  'Functions': CheckCircle2,
  'Coordinator Message': Users,
  'Contact': Mail
};

function normalizeIqacConfig(source) {
  const linkItems = (source.links || []).flatMap((link) => {
    if (link.items && link.items.length) {
      return link.items.map((item) => ({
        title: item.title,
        url: item.url
      }));
    }

    return [{
      title: link.title,
      url: link.url
    }];
  });

  const annualReportItems = (source.annual_reports || []).map((report) => ({
    title: report.year,
    url: report.url
  }));

  const coordinatorMessageItems = [
    source.coordinator_message?.summary,
    source.coordinator_message?.invitation
  ].filter(Boolean);

  const contactItems = source.contact ? [
    source.contact.role,
    source.contact.designation,
    ...(source.contact.email || []),
    source.contact.phone
  ].filter(Boolean) : [];

  return {
    hero: {
      title: 'Internal Quality',
      titleHighlight: 'Assurance Cell.',
      subtitle: 'IQAC: NSEC'
    },
    summary: source.about,
    content: [
      {
        title: 'IQAC Links',
        desc: 'Committee composition, meeting records, and AQAR references.',
        items: linkItems,
        buttonLabel: 'Open Reference',
        icon: 'IQAC Links'
      },
      {
        title: 'Annual Reports',
        desc: 'Institutional annual reports by academic year.',
        items: annualReportItems,
        buttonLabel: 'View Annual Report',
        icon: 'Annual Reports'
      },
      {
        title: 'Major Focus',
        desc: 'Strategic priorities of the IQAC.',
        items: source.major_focus || [],
        icon: 'Major Focus'
      },
      {
        title: 'Functions',
        desc: 'Core responsibilities and quality assurance activities.',
        items: source.functions || [],
        icon: 'Functions'
      },
      {
        title: 'Coordinator Message',
        desc: source.coordinator_message?.summary,
        items: coordinatorMessageItems,
        icon: 'Coordinator Message'
      },
      {
        title: 'Contact',
        desc: source.contact?.name,
        items: contactItems,
        icon: 'Contact'
      }
    ]
  };
}

export default function IqacPage({ configPath }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(configPath)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, [configPath]);

  const pageConfig = config?.iqac ? normalizeIqacConfig(config.iqac) : config;

  if (!pageConfig) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: '#008b8b' }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: '#800000' }} />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-32 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-32">
          <div className="lg:col-span-8 space-y-8">
            <MotionDiv 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 font-semibold text-sm" style={{ backgroundColor: '#e8dfd5', color: '#008b8b' }}>
                {pageConfig.hero.subtitle}
              </div>
            </MotionDiv>
            
            <MotionH1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tight leading-tight"
              style={{ color: '#2d2d2d' }}
            >
              {pageConfig.hero.title}
              <br />
              <span style={{ color: '#800000' }}>
                {pageConfig.hero.titleHighlight}
              </span>
            </MotionH1>
          </div>
          
          <div className="lg:col-span-4">
            <p className="text-lg font-medium leading-relaxed pl-6" style={{ color: '#4a4a4a', borderLeftColor: '#008b8b', borderLeftWidth: '4px' }}>
              {pageConfig.summary || 'Ensuring continuous improvement in the entire operations of the institution.'}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageConfig.content.map((prog, i) => {
            const Icon = iconMap[prog.icon] || FileText;
            return (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col h-full"
                style={{ backgroundColor: '#fff9f5', borderColor: '#e8dfd5' }}
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000' }} />

                <div className="flex-1">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: i % 2 === 0 ? '#e8f4f4' : '#f4e8e8', color: i % 2 === 0 ? '#008b8b' : '#800000' }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 transition-colors" style={{ color: '#2d2d2d' }}>
                    {prog.title}
                  </h2>
                  
                  <p className="font-medium mb-6 leading-relaxed text-sm" style={{ color: '#555' }}>
                    {prog.desc}
                  </p>
                  
                  {prog.items.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {prog.items.slice(0, 3).map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000' }} />
                          <span className="text-sm font-medium" style={{ color: '#333' }}>
                            {typeof item === 'string' ? (
                              item
                            ) : (
                              <a 
                                href={item.url} 
                                className="hover:underline transition-colors" 
                                style={{ color: i % 2 === 0 ? '#008b8b' : '#800000' }}
                                target="_blank" 
                                rel="noreferrer"
                              >
                                {item.title}
                              </a>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {prog.buttonLabel ? (
                  <button className="w-full py-3 px-4 font-semibold rounded flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:scale-105 mt-auto" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000', color: '#fff' }}>
                    {prog.buttonLabel} 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : null}
              </MotionDiv>
            );
          })}
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
