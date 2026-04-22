import React, { useEffect, useState } from 'react';
import Hero from '../components/hero';

export default function IdeaLab() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-idealab-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load IDEA Lab config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				Loading IDEA Lab page...
			</div>
		);
	}

	return (
		<div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
			

			<Hero
				mediaType="image"
				mediaSrc="/assets/HeroFocus/nsec-idealab-fp01.jpg"
				mediaAlt="AICTE IDEA Lab at NSEC"
				minHeightClass="min-h-[58vh]"
				subtitle={config.section}
				title="AICTE"
				highlight="IDEA Lab"
				description=""
				overlayOpacity={0.5}
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
				<h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#008b8b' }}>
					{config.subheading}
				</h2>

				<div className="space-y-5">
					{(config.content || []).map((paragraph, index) => (
						<p key={`idea-content-${index}`} className="text-base leading-relaxed" style={{ color: '#800000' }}>
							{paragraph}
						</p>
					))}
				</div>
			</section>
		</div>
	);
}
