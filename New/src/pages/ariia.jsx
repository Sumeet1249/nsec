import React, { useEffect, useState } from 'react';
import PdfPreview from '../components/PdfPreview';

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
		<div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
			<PdfPreview
				pdfSrc="/assets/pdfs/ARIIA_Rankings_2020_Report.pdf"
				subtitle={config.section}
				title={config.title}
				highlight="Report"
				description=""
				minHeightClass="min-h-[56vh]"
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
				<h1 className="text-3xl lg:text-4xl font-black mb-6" style={{ color: '#800000' }}>
					{config.title}
				</h1>

				<div className="space-y-5 mb-10">
					{(config.content || []).map((paragraph, index) => (
						<p key={`ariia-content-${index}`} className="text-base leading-relaxed" style={{ color: '#008b8b' }}>
							{paragraph}
						</p>
					))}
				</div>

				

				<div className="rounded-xl border p-6" style={{ borderColor: '#008b8b' }}>
					<h2 className="text-2xl font-bold mb-3" style={{ color: '#800000' }}>Contact</h2>
					<p className="mb-3" style={{ color: '#008b8b' }}>{config.contacts?.description}</p>
					<ul className="space-y-1" style={{ color: '#008b8b' }}>
						{(config.contacts?.emails || []).map((email, index) => (
							<li key={`ariia-email-${index}`}>
								<a href={`mailto:${email}`} className="hover:underline font-medium">{email}</a>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}
