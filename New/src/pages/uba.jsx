import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function UbaPage() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-uba-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load UBA config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				<div className="animate-pulse text-xl font-bold tracking-widest">Loading UBA page...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen font-sans" style={{ backgroundColor: '#ffffff' }}>
			{/* HERO SECTION with Emblem */}
			<section className="relative w-full pt-32 pb-24 flex flex-col items-center justify-center bg-gradient-to-b from-[#f5f0eb] to-white border-b border-gray-100">
				<motion.div 
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="w-40 h-40 md:w-56 md:h-56 mb-8 drop-shadow-xl"
				>
					<img src="/assets/uba/emblem.png" alt="Emblem" className="w-full h-full object-contain" />
				</motion.div>
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="text-center px-6 max-w-4xl"
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#800000] mb-4">
						{config.title}
					</h1>
					<p className="text-lg md:text-xl font-medium text-gray-600 uppercase tracking-widest">
						Netaji Subhash Engineering College
					</p>
				</motion.div>
			</section>

			{/* MAP SECTION */}
			<section className="max-w-6xl mx-auto px-6 lg:px-12 -mt-12 relative z-10">
				<motion.div 
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.5 }}
					className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white ring-1 ring-gray-200"
				>
					<div className="bg-[#800000] py-4 px-6 text-white text-center">
						<h2 className="text-2xl font-bold uppercase tracking-widest">Adopted Villages Map</h2>
					</div>
					<div className="w-full h-[50vh] md:h-[65vh] bg-gray-100 relative">
						<img 
							src="/assets/uba/uba-map-01.jpg" 
							alt="UBA Map" 
							className="w-full h-full object-cover object-center"
						/>
					</div>
					<div className="bg-white p-6 grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-gray-100">
						{config.adopted_villages.map((village, idx) => (
							<div key={idx} className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-[#008b8b]"></div>
								<span className="text-sm font-bold text-gray-700">{village}</span>
							</div>
						))}
					</div>
				</motion.div>
			</section>

			{/* MAIN CONTENT GRID */}
			<section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
				{/* LEFT COLUMN: About & Mission */}
				<div className="lg:col-span-2 space-y-16">
					<div>
						<h2 className="text-3xl font-black text-[#800000] mb-6 border-l-4 border-[#008b8b] pl-4">About UBA</h2>
						<div className="space-y-4">
							{config.about.map((p, idx) => (
								<p key={idx} className="text-lg text-gray-700 leading-relaxed font-medium">
									{p}
								</p>
							))}
						</div>
					</div>

					<div className="bg-[#f9f9f9] rounded-2xl p-8 border border-gray-200 shadow-sm">
						<h2 className="text-2xl font-black text-[#800000] mb-6">Mission</h2>
						<ul className="space-y-4">
							{config.mission.map((m, idx) => (
								<li key={idx} className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-full bg-[#008b8b] text-white flex items-center justify-center shrink-0 font-bold">
										{idx + 1}
									</div>
									<span className="text-gray-800 text-lg pt-1">{m}</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="text-3xl font-black text-[#800000] mb-6 border-l-4 border-[#008b8b] pl-4">Coordinator's Message</h2>
						<div className="space-y-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
							<div className="absolute top-2 left-4 text-7xl text-gray-100 font-serif leading-none">"</div>
							{config.coordinator_message.map((p, idx) => (
								<p key={idx} className="text-lg text-gray-600 leading-relaxed relative z-10 italic">
									{p}
								</p>
							))}
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN: Focus, Functions, Intervention */}
				<div className="space-y-8">
					<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 border-t-4 border-t-[#800000]">
						<h3 className="text-xl font-bold text-[#800000] mb-4 uppercase tracking-widest">Major Focus</h3>
						<ul className="space-y-3">
							{config.major_focus.map((f, idx) => (
								<li key={idx} className="flex items-start gap-2">
									<span className="text-[#008b8b] font-bold mt-1">▹</span>
									<span className="text-gray-700">{f}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 border-t-4 border-t-[#008b8b]">
						<h3 className="text-xl font-bold text-[#800000] mb-4 uppercase tracking-widest">Functions</h3>
						<ul className="space-y-3">
							{config.functions.map((f, idx) => (
								<li key={idx} className="flex items-start gap-2">
									<span className="text-[#800000] font-bold mt-1">▹</span>
									<span className="text-gray-700">{f}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="bg-gradient-to-br from-[#800000] to-[#5a0000] rounded-2xl shadow-md p-8 text-white">
						<h3 className="text-xl font-bold mb-6 uppercase tracking-widest text-white">Intervention Areas</h3>
						
						<div className="mb-8">
							<h4 className="font-bold text-[#008b8b] mb-4 uppercase text-sm bg-white px-3 py-1 rounded inline-block shadow-sm">Human Development</h4>
							<div className="flex flex-wrap gap-2">
								{config.intervention_areas.human_development.map((item, idx) => (
									<span key={idx} className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">{item}</span>
								))}
							</div>
						</div>
						
						<div>
							<h4 className="font-bold text-[#008b8b] mb-4 uppercase text-sm bg-white px-3 py-1 rounded inline-block shadow-sm">Economic Development</h4>
							<div className="flex flex-wrap gap-2">
								{config.intervention_areas.economic_development.map((item, idx) => (
									<span key={idx} className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">{item}</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CONTACTS & DOCUMENTS */}
			<section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div>
						<h2 className="text-2xl font-bold text-[#800000] mb-6">Contact Details</h2>
						<div className="grid gap-6">
							{config.contacts.map((contact, idx) => (
								<div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
									<h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
									<p className="text-[#008b8b] font-bold text-sm mb-2">{contact.designation}</p>
									<p className="text-sm text-gray-600 mb-4">{contact.role}</p>
									<div className="space-y-2 text-sm bg-white p-4 rounded-lg border border-gray-100">
										<p className="flex items-center gap-2"><span className="font-bold text-gray-700 w-12">Email:</span> <span className="text-gray-600">{Array.isArray(contact.email) ? contact.email.join(', ') : contact.email}</span></p>
										<p className="flex items-center gap-2"><span className="font-bold text-gray-700 w-12">Phone:</span> <span className="text-gray-600">{Array.isArray(contact.phone) ? contact.phone.join(', ') : contact.phone}</span></p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-[#800000] mb-6">Important Documents</h2>
						<div className="space-y-4">
							{config.documents.map((doc, idx) => (
								<a 
									key={idx} 
									href={doc.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:border-[#008b8b] hover:shadow-md transition-all group"
								>
									<div className="w-12 h-12 rounded-full bg-[#f5f0eb] flex items-center justify-center text-[#800000] group-hover:bg-[#008b8b] group-hover:text-white transition-colors">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
									</div>
									<div>
										<h4 className="font-bold text-gray-800 group-hover:text-[#008b8b] transition-colors">{doc.title}</h4>
										<p className="text-xs text-gray-500 uppercase mt-1 font-bold">{doc.type}</p>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER LOGOS */}
			<section className="w-full bg-[#f9f9f9] py-16 border-t border-gray-200">
				<div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-16 md:gap-24">
					<div className="flex flex-col items-center group cursor-pointer">
						<img src="/assets/uba/uba-logo.png" alt="UBA Logo" className="h-32 md:h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
						<p className="mt-6 text-sm font-bold text-gray-500 uppercase tracking-widest text-center group-hover:text-[#800000] transition-colors">Unnat Bharat Abhiyan</p>
					</div>
					<div className="hidden sm:block w-px h-32 bg-gray-300"></div>
					<div className="flex flex-col items-center group cursor-pointer">
						<img src="/assets/uba/nsec_logo_w962xh1280.jpeg" alt="NSEC Logo" className="h-32 md:h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform rounded-md" />
						<p className="mt-6 text-sm font-bold text-gray-500 uppercase tracking-widest text-center group-hover:text-[#008b8b] transition-colors">Netaji Subhash Engineering College</p>
					</div>
				</div>
			</section>
		</div>
	);
}
