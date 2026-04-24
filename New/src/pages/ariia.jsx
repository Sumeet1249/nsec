import React, { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import { FileText, ExternalLink, Mail } from 'lucide-react';

export default function Ariia() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-ariia-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load ARIIA config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				Loading ARIIA page...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brand-bg font-sans">
			{/* HERO SECTION */}
			<PageHero 
				titleStroke="ARIIA"
				titleFill="REPORT"
				statutoryLabel="Atal Ranking of Institutions"
				policyLabel="Innovation Achievements"
				rightLabel="Innovation.Index"
				rightContent={
					<div className="space-y-4">
						<p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
							National ranking framework for <span className="text-brand-accent">Innovation & Entrepreneurship</span> development among students and faculties.
						</p>
						<a 
							href="/assets/pdfs/ARIIA_Rankings_2020_Report.pdf" 
							target="_blank"
							className="inline-flex items-center gap-2 px-6 py-3 bg-brand-maroon text-white font-mono font-black text-xs uppercase tracking-widest hover:bg-brand-accent transition-colors duration-300"
						>
							<FileText size={16} /> View Full Report
						</a>
					</div>
				}
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
				<div className="flex items-center gap-3 mb-10">
					<div className="w-12 h-[1.5px] bg-brand-accent" />
					<span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Institutional Innovation</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					<div className="lg:col-span-2 space-y-8">
						{(config.content || []).map((paragraph, index) => (
							<p key={`ariia-content-${index}`} className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 border-brand-blue/5 pl-6">
								{paragraph}
							</p>
						))}
					</div>

					<div className="space-y-8">
						<div className="bg-white p-8 border border-brand-blue/10 shadow-sm rounded-lg relative overflow-hidden group">
							<div className="absolute top-0 left-0 w-1 h-full bg-brand-maroon" />
							<div className="flex items-center gap-3 mb-6 text-brand-maroon">
								<Mail size={24} />
								<h2 className="text-xl font-black uppercase tracking-tight">Contact Node</h2>
							</div>
							<p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">{config.contacts?.description}</p>
							<div className="space-y-3">
								{(config.contacts?.emails || []).map((email, index) => (
									<a key={`ariia-email-${index}`} href={`mailto:${email}`} className="flex items-center gap-3 text-brand-blue hover:text-brand-accent transition-colors font-mono text-sm font-bold truncate">
										<ExternalLink size={14} className="shrink-0" />
										{email}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
