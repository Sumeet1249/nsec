import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Handshake, ChevronRight, FlaskConical, Library, Building2, ExternalLink, Award } from 'lucide-react';

export default function RDPage() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-rd-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data.research_and_development))
			.catch((err) => console.error('Failed to load R&D config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white">
				<div className="animate-pulse text-lg font-semibold tracking-wider text-gray-400">Loading...</div>
			</div>
		);
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08
			}
		}
	};

	const itemVariants = {
		hidden: { y: 16, opacity: 0 },
		visible: { y: 0, opacity: 1 }
	};

	const getUrl = (url) => {
		if (!url) return '#';
		return url.startsWith('/') ? url : `/${url}`;
	};

	const getImageForItem = (title, category) => {
		const imageMap = {
			// General items - unique high-quality research/academic images
			'R&D PROJECTS AND AWARDS': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop',
			'INNOVATION ECOSYSTEM': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
			'R&D GUIDELINES': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
			'PH.D. AWARDED': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop',
			'PUBLICATIONS': 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=500&h=300&fit=crop',
			'FACULTY EXCHANGE': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop'
		};
		
		return imageMap[title.toUpperCase()] || 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500&h=300&fit=crop';
	};

	const getMouImage = (organization, index) => {
		const mouImages = [
			'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500&h=300&fit=crop', // business handshake
			'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=500&h=300&fit=crop', // corporate meeting handshake
			'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop', // team meeting
			'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop', // presentation
			'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop', // teamwork over laptop
			'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop', // handshake over desk
		];
		return mouImages[index % mouImages.length];
	};

	const getOtherImage = (title, index) => {
		const otherImages = [
			'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop', // scientist microscope
			'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop', // code/tech
			'https://images.unsplash.com/photo-1531297172864-742c86d4109f?w=500&h=300&fit=crop', // digital tech
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop', // globe connection
		];
		return otherImages[index % otherImages.length];
	};

	return (
		<div className="min-h-screen bg-white font-sans">
			{/* HERO SECTION */}
			<section className="w-full pt-32 pb-20 bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center space-y-6"
					>
						<div className="flex items-center justify-center mb-4">
							<div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center">
								<FlaskConical size={32} className="text-maroon" style={{ color: 'rgb(128, 0, 0)' }} />
							</div>
						</div>
						
						<h1 
							className="text-5xl md:text-7xl font-bold tracking-tight"
							style={{ color: 'rgb(128, 0, 0)' }}
						>
							Research & Development
						</h1>

						<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
							Driving innovation through academic excellence and strategic partnerships with industry leaders. Our commitment to cutting-edge research shapes the future of our institution and beyond.
						</p>
					</motion.div>
				</div>
			</section>

			{/* CONTENT SECTIONS */}
			<div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 space-y-20">
				
				{/* GENERAL INITIATIVES */}
				{config.general && config.general.length > 0 && (
					<motion.section 
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-8"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<div className="w-1 h-8" style={{ backgroundColor: 'rgb(128, 0, 0)' }}></div>
								<h2 
									className="text-3xl md:text-4xl font-bold"
									style={{ color: 'rgb(128, 0, 0)' }}
								>
									Key Initiatives & Reports
								</h2>
							</div>
							<p className="text-gray-500 ml-4 font-light">Latest research projects and institutional reports</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{config.general.map((item, idx) => (
								<motion.a
									key={idx}
									variants={itemVariants}
									href={getUrl(item.url)}
									target={item.url ? "_blank" : "_self"}
									rel={item.url ? "noopener noreferrer" : ""}
									className={`group block rounded-lg border overflow-hidden transition-all duration-300 ${
										item.url 
											? 'border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1' 
											: 'border-gray-100 opacity-60 cursor-not-allowed'
									}`}
									style={item.url ? { backgroundColor: '#fff' } : { backgroundColor: '#fafafa' }}
								>
									<div className="relative h-40 overflow-hidden bg-gray-200">
										<img 
											src={getImageForItem(item.title, 'general')}
											alt={item.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											onError={(e) => {
												e.target.style.display = 'none';
												e.target.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div 
											className="absolute inset-0 hidden items-center justify-center"
											style={{ backgroundColor: 'rgb(128, 0, 0)', opacity: 0.1 }}
										>
											<FileText size={32} style={{ color: 'rgb(128, 0, 0)' }} />
										</div>
									</div>
									<div className="p-6">
										<h3 
											className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition-colors"
										>
											{item.title}
										</h3>
										{item.url && (
											<div className="flex items-center gap-1 mt-4 text-sm font-medium" style={{ color: 'rgb(128, 0, 0)' }}>
												<span>View Document</span>
												<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
											</div>
										)}
									</div>
								</motion.a>
							))}
						</div>
					</motion.section>
				)}

				{/* MOUs SECTION */}
				{config.mous && config.mous.length > 0 && (
					<motion.section 
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-8"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<div className="w-1 h-8" style={{ backgroundColor: 'rgb(128, 0, 0)' }}></div>
								<h2 
									className="text-3xl md:text-4xl font-bold"
									style={{ color: 'rgb(128, 0, 0)' }}
								>
									Industry Partnerships
								</h2>
							</div>
							<p className="text-gray-500 ml-4 font-light">Strategic alliances with leading organizations</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{config.mous.map((item, idx) => (
								<a
									key={idx}
									href={getUrl(item.url)}
									target={item.url ? "_blank" : "_self"}
									rel={item.url ? "noopener noreferrer" : ""}
									className="group flex flex-col overflow-hidden border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white h-full"
								>
									<div className="relative h-40 overflow-hidden bg-gray-200">
										<img 
											src={getMouImage(item.organization, idx)}
											alt={item.organization}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											onError={(e) => {
												e.target.style.display = 'none';
												e.target.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div 
											className="absolute inset-0 hidden items-center justify-center"
											style={{ backgroundColor: 'rgb(128, 0, 0)', opacity: 0.15 }}
										>
											<Building2 size={32} style={{ color: 'rgb(128, 0, 0)' }} />
										</div>
									</div>
									<div className="p-6 flex flex-col flex-1">
										<h3 className="font-semibold text-lg text-gray-900 mb-2">
											{item.organization}
										</h3>
										{item.url && (
											<div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(128, 0, 0)' }}>
												<ExternalLink size={16} />
												<span>View MOU</span>
											</div>
										)}
									</div>
								</a>
							))}
						</div>
					</motion.section>
				)}

				{/* OTHER PROJECTS */}
				{config.other && config.other.length > 0 && (
					<motion.section 
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-8"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<div className="w-1 h-8" style={{ backgroundColor: 'rgb(128, 0, 0)' }}></div>
								<h2 
									className="text-3xl md:text-4xl font-bold"
									style={{ color: 'rgb(128, 0, 0)' }}
								>
									Special Initiatives
								</h2>
							</div>
							<p className="text-gray-500 ml-4 font-light">Featured projects and programs</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{config.other.map((item, idx) => (
								<div 
									key={idx} 
									className="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white flex flex-col h-full hover:-translate-y-1"
								>
									<div className="relative h-40 overflow-hidden bg-gray-200">
										<img 
											src={getOtherImage(item.title, idx)}
											alt={item.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											onError={(e) => {
												e.target.style.display = 'none';
												e.target.nextElementSibling.style.display = 'flex';
											}}
										/>
										<div 
											className="absolute inset-0 hidden items-center justify-center"
											style={{ backgroundColor: 'rgb(128, 0, 0)', opacity: 0.12 }}
										>
											<Award size={32} style={{ color: 'rgb(128, 0, 0)' }} />
										</div>
									</div>
									<div className="p-6 flex flex-col h-full">
										<h3 className="font-semibold text-lg text-gray-900 mb-4">
											{item.title}
										</h3>
										
										{item.url && (
											<a 
												href={getUrl(item.url)}
												target="_blank"
												rel="noopener noreferrer" 
												className="mt-auto inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
												style={{ color: 'rgb(128, 0, 0)' }}
												title={`View ${item.title}`}
											>
												<span>Learn More</span>
												<ChevronRight size={16} />
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					</motion.section>
				)}
			</div>

			{/* FOOTER SPACING */}
			<div className="h-20"></div>
		</div>
	);
}
