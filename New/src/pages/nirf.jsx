import React, { useEffect, useState } from 'react';
import Hero from '../components/hero';
import { motion } from 'framer-motion';
import { FileText, Archive, Mail, ExternalLink, ChevronRight } from 'lucide-react';

export default function NirfPage() {
	const [config, setConfig] = useState(null);

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
		<div className="min-h-screen bg-[#f9f9f9] font-sans pb-24">
			
			{/* TOP LOGO SECTION */}
			{/* <section className="w-full pt-32 pb-16 bg-white border-b border-gray-100 flex flex-col items-center justify-center">
				<motion.div 
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="h-32 md:h-40 mb-6"
				>
					<img 
						src="/assets/nirf/nirf-main-logo.png" 
						alt="NIRF Logo" 
						className="h-full w-auto object-contain drop-shadow-md"
					/>
				</motion.div>
				<motion.h1 
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-4xl md:text-5xl font-black text-[#800000] uppercase tracking-tight text-center px-4"
				>
					{config.title}
				</motion.h1>
			</section> */}

			{/* HERO SECTION (LOCAL ASSET) */}
			<Hero
				title={config.external_reference.title}
				subtitle="National Institutional Ranking Framework"
				description={config.external_reference.note}
				mediaSrc="/assets/nirf/nirf-2020-rank-l.jpg"
				minHeightClass="min-h-[85vh]"
				className="border-b-4 border-[#008b8b]"
			>
				<div className="w-full h-[60vh] mt-8 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.3)] flex items-center justify-center p-2">
					<img
						src="/assets/nirf/nirf-2020-rank-l.jpg"
						alt="NIRF Ranking Certificate"
						className="h-full w-auto object-contain rounded-lg"
					/>
				</div>
			</Hero>

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
							<div className="flex items-center gap-4 mb-8">
								<div className="w-14 h-14 rounded-2xl bg-[#008b8b]/10 flex items-center justify-center text-[#008b8b] shadow-inner">
									<Archive size={28} />
								</div>
								<h2 className="text-3xl md:text-4xl font-black text-[#800000] tracking-tight">Archives</h2>
							</div>

							<div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
								{config.archives.map((archive, idx) => (
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
			</div>
		</div>
	);
}
