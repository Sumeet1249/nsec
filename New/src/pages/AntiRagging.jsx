import React, { useEffect, useState } from 'react';
import PdfPreview from '../components/PdfPreview';

export default function AntiRagging() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-antiragging-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load Anti-Ragging config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				Loading Anti-Ragging page...
			</div>
		);
	}

	return (
		<div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
			<PdfPreview
				pdfSrc="/assets/pdfs/Anti-Ragging-Committee-NSEC-2024-2025.pdf"
				subtitle="Statutory Committee"
				title={config.title || "Anti-Ragging Policy"}
				highlight="2024-2025"
				description="View the complete details of the Anti-Ragging Committee and Squad members."
				minHeightClass="min-h-[56vh]"
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
				<h1 className="text-3xl lg:text-4xl font-black mb-10 text-center" style={{ color: '#800000' }}>
					{config.title} Guidelines
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					{/* What Constitutes Ragging Section */}
					<div className="rounded-xl border shadow-lg p-8 h-full flex flex-col" style={{ borderColor: '#008b8b' }}>
						<div className="flex items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(0, 139, 139, 0.2)' }}>
							<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#800000' }}>
								<span className="text-white font-bold text-lg">?</span>
							</div>
							<h2 className="text-2xl font-bold" style={{ color: '#800000' }}>What Constitutes Ragging?</h2>
						</div>
						<ul className="space-y-4 pl-2">
							{(config.what_constitutes_ragging || []).map((item, index) => (
								<li key={`ragging-item-${index}`} className="flex items-start gap-3">
									<span className="mt-1 flex-shrink-0 font-black text-xl leading-none" style={{ color: '#008b8b' }}>•</span>
									<span className="text-base leading-relaxed" style={{ color: '#008b8b' }}>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Punishments Section */}
					<div className="rounded-xl border shadow-lg p-8 h-full flex flex-col" style={{ borderColor: '#800000' }}>
						<div className="flex items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(128, 0, 0, 0.2)' }}>
							<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#008b8b' }}>
								<span className="text-white font-bold text-lg">!</span>
							</div>
							<h2 className="text-2xl font-bold" style={{ color: '#800000' }}>Punishments for Ragging</h2>
						</div>
						<ul className="space-y-4 pl-2">
							{(config.punishments || []).map((item, index) => (
								<li key={`punishment-item-${index}`} className="flex items-start gap-3">
									<span className="mt-1 flex-shrink-0 text-sm" style={{ color: '#800000' }}>⚠️</span>
									<span className="text-base leading-relaxed" style={{ color: '#008b8b' }}>
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
