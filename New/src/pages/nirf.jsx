import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Archive, Mail, ExternalLink, ChevronRight, Maximize, Download } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function NirfPage() {
	const [config, setConfig] = useState(null);
	const [showAllArchives, setShowAllArchives] = useState(false);

	useEffect(() => {
		fetch('/config/page-nirf-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load NIRF config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white">
				<div className="animate-pulse text-lg font-semibold tracking-wider text-gray-400">Loading NIRF Data...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brand-bg font-sans pb-24">
			{/* HERO SECTION */}
			<PageHero 
				showParticles={false}
				maxHeight="33vh"
				titleStroke="NIRF"
				titleFill="RANKING"
				statutoryLabel="National Institutional"
				policyLabel="Ranking Framework"
				rightLabel="Institutional.Value"
				rightContent={
					<div className="leading-snug">
						{/* Main description text */}
						<div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
							{['National', 'Institutional', 'Ranking', 'Framework', '(NIRF)'].map((word, i) => (
								<motion.span
									key={i}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
									className="text-white/70 text-[15px] font-body font-medium"
								>
									{word}
								</motion.span>
							))}

							{/* Glowing keyword — "Rankings & Submissions" */}
							<motion.span
								initial={{ opacity: 0, scale: 0.85 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
								className="relative inline-block"
							>
								<span
									className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
									style={{ textShadow: '0 0 25px var(--color-brand-accent), 0 0 50px rgba(0,139,139,0.5)' }}
								>
									Rankings & Submissions
								</span>
								{/* animated underline */}
								<motion.span
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
									className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
									style={{ boxShadow: '0 0 8px rgba(0,139,139,0.8)' }}
								/>
							</motion.span>
						</div>

						{/* Line 2 */}
						<div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
							{['for', 'the', 'Ministry', 'of', 'Education'].map((word, i) => (
								<motion.span
									key={i}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 1.0 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
									className="text-white/70 text-[15px] font-body font-medium"
								>
									{word}
								</motion.span>
							))}
						</div>
					</div>
				}
			/>

			{/* Golden gradient separator below hero */}
			<div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

			<div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
				
				{/* DESCRIPTION SECTION */}
				<section className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-[#008b8b] opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
					<div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100 relative z-10">
						<div className="w-2 h-10 bg-[#008b8b] rounded-full"></div>
						<h2 className="text-2xl md:text-3xl font-black text-[#800000] uppercase tracking-wide">Transparency & Accuracy</h2>
					</div>
					<div className="space-y-5 relative z-10">
						{config.description.map((desc, idx) => (
							<p key={idx} className="text-lg text-gray-700 leading-relaxed font-medium flex items-start gap-3">
								<span className="text-[#008b8b] mt-1.5 shrink-0">•</span>
								<span>{desc}</span>
							</p>
						))}
					</div>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* LEFT COLUMN: Current Year & Archives */}
					<div className="lg:col-span-2 space-y-16">
						
						{/* CURRENT YEAR */}
						<section>
							<div className="flex items-center gap-4 mb-8">
								<div className="w-14 h-14 rounded-2xl bg-[#800000]/10 flex items-center justify-center text-[#800000] shadow-inner">
									<FileText size={28} />
								</div>
								<h2 className="text-3xl md:text-4xl font-black text-[#800000] tracking-tight">
									Submitted Data {config.current_year.year}
								</h2>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{config.current_year.categories.map((cat, idx) => (
									<a
										key={idx}
										href={cat.url || '#'}
										target={cat.url ? "_blank" : "_self"}
										className={`group p-8 rounded-2xl border transition-all duration-300 flex items-center justify-between shadow-sm ${
											cat.url 
												? 'bg-white border-gray-200 hover:border-[#008b8b] hover:shadow-xl hover:-translate-y-1' 
												: 'bg-gray-50 border-gray-100 opacity-70 cursor-not-allowed'
										}`}
									>
										<div>
											<h3 className="font-bold text-xl text-gray-800 group-hover:text-[#008b8b] transition-colors">{cat.name}</h3>
											<p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">Category</p>
										</div>
										<div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
											cat.url ? 'bg-[#f5f0eb] text-[#800000] group-hover:bg-[#008b8b] group-hover:text-white' : 'bg-gray-200 text-gray-400'
										}`}>
											{cat.url ? <ExternalLink size={20} /> : <FileText size={20} />}
										</div>
									</a>
								))}
							</div>
						</section>

						{/* ARCHIVES */}
						<section>
							<div className="flex items-center justify-between mb-8">
								<div className="flex items-center gap-4">
									<div className="w-14 h-14 rounded-2xl bg-[#008b8b]/10 flex items-center justify-center text-[#008b8b] shadow-inner">
										<Archive size={28} />
									</div>
									<h2 className="text-3xl md:text-4xl font-black text-[#800000] tracking-tight">Archives</h2>
								</div>
								<button 
									onClick={() => setShowAllArchives(!showAllArchives)}
									className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-[#008b8b] uppercase tracking-[0.2em] hover:translate-x-2 transition-transform shrink-0"
								>
									{showAllArchives ? 'View Less' : 'View All Archives'} <ChevronRight size={14} className={`transition-transform ${showAllArchives ? 'rotate-90' : ''}`} />
								</button>
							</div>

							<div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
								{config.archives.slice(0, showAllArchives ? undefined : 2).map((archive, idx) => (
									<div key={idx} className={`p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50 transition-colors ${idx !== config.archives.length - 1 ? 'border-b border-gray-100' : ''}`}>
										<h3 className="text-3xl font-black text-gray-800 w-28 shrink-0">{archive.year}</h3>
										<div className="flex flex-wrap gap-3 flex-1">
											{archive.categories ? (
												archive.categories.map((cat, catIdx) => (
													<span key={catIdx} className="bg-white border border-[#008b8b]/30 px-4 py-1.5 rounded-full text-sm font-bold text-[#008b8b] shadow-sm">
														{cat}
													</span>
												))
											) : (
												<span className="text-sm font-medium text-gray-400 italic px-2">Data available upon request</span>
											)}
										</div>
										<button className="text-[#800000] font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:text-[#008b8b] transition-colors group px-4 py-2 rounded-lg hover:bg-[#008b8b]/5">
											View 
											<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
										</button>
									</div>
								))}
							</div>
						</section>
					</div>

					{/* RIGHT COLUMN: Contact & Info */}
					<div className="space-y-8">
						<div className="bg-gradient-to-br from-[#800000] to-[#5a0000] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
							<div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
							<div className="absolute bottom-0 left-0 w-32 h-32 bg-[#008b8b] opacity-20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
							
							<div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md mb-8 border border-white/20 relative z-10 shadow-inner">
								<Mail size={28} className="text-white" />
							</div>
							
							<h3 className="text-2xl font-bold mb-4 relative z-10">Feedback & Comments</h3>
							<p className="text-white/80 leading-relaxed mb-8 relative z-10 font-medium">
								{config.contacts.description}
							</p>
							
							<div className="space-y-4 relative z-10">
								{config.contacts.emails.map((email, idx) => (
									<a 
										key={idx} 
										href={`mailto:${email}`}
										className="flex items-center gap-4 bg-white/5 hover:bg-white/15 p-4 rounded-xl transition-all border border-white/10 hover:border-white/30 group backdrop-blur-sm"
									>
										<div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#008b8b] transition-colors">
											<Mail size={16} className="text-white" />
										</div>
										<span className="font-bold tracking-wide">{email}</span>
									</a>
								))}
							</div>
						</div>
						
						<div className="bg-[#f5f0eb] rounded-3xl p-8 md:p-10 border border-[#800000]/10 shadow-sm relative overflow-hidden">
							<div className="absolute right-0 top-0 w-24 h-24 bg-[#008b8b]/5 rounded-bl-full"></div>
							<h3 className="text-xl font-black text-[#800000] mb-4 uppercase tracking-widest flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[#008b8b]"></span>
								Important Notice
							</h3>
							<p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
								All submitted data is strictly in accordance with the rules and guidelines provided by the National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India.
							</p>
						</div>
					</div>
				</div>

				{/* ── RANKING CERTIFICATE PREVIEW ── */}
				<section className="pt-16 pb-24 px-0 relative overflow-hidden">
					<div className="flex items-center justify-center mb-12">
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 rounded-full bg-[#008b8b]"></div>
							<h2 className="text-4xl md:text-5xl font-black text-[#800000] uppercase tracking-tight">NIRF Ranking</h2>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-slate-200/60"
					>
						{/* Premium browser chrome bar */}
						<div className="flex items-center justify-between px-6 py-4 bg-brand-blue">
							<div className="flex items-center gap-5">
								<div className="flex gap-2">
									{['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
										<div key={i} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
									))}
								</div>
								<div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.08]">
									<FileText size={11} className="text-brand-accent/60" />
									<span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
										NIRF-Ranking-Certificate.jpg
									</span>
								</div>
							</div>
							<div className="flex items-center gap-2.5">
								<a
									href="/assets/nirf/nirf-2020-rank-l.jpg"
									target="_blank"
									rel="noopener noreferrer"
									title="Fullscreen"
									className="group/btn inline-flex items-center justify-center p-2.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-lg
													   hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
								>
									<Maximize size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
								</a>
								<a
									href="/assets/nirf/nirf-2020-rank-l.jpg"
									download
									className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-brand-maroon text-white rounded-lg
													   font-mono font-black text-[10px] uppercase tracking-[0.15em]
													   hover:bg-white hover:text-brand-maroon hover:shadow-lg transition-all duration-300"
								>
									<Download size={12} className="group-hover/btn:translate-y-[1px] transition-transform duration-200" /> Download
								</a>
							</div>
						</div>

						{/* Image viewer */}
						<div className="w-full bg-white flex items-center justify-center p-8" style={{ minHeight: '60vh' }}>
							<img
								src="/assets/nirf/nirf-2020-rank-l.jpg"
								alt="NIRF Ranking Certificate"
								className="w-full h-auto object-contain max-h-[65vh] rounded-lg shadow-lg"
							/>
						</div>

						{/* Status bar */}
						<div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-100">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#fbbf24', boxShadow: '0 0 6px rgba(251,191,36,0.5)' }} />
								<span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
									Netaji Subhash Engineering College
								</span>
							</div>
							<span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest">
								Ranking Certificate
							</span>
						</div>
					</motion.div>
				</section>
			</div>
		</div>
	);
}
