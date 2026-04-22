'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PdfPreview({
	title,
	highlight,
	subtitle,
	description,
	pdfSrc,
	minHeightClass = 'min-h-[80vh]',
	className = ''
}) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			className={`relative w-full overflow-hidden bg-[#020617] ${minHeightClass} ${className}`.trim()}
		>
			<div className="absolute inset-0 bg-brand-blue" />
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(120deg, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.8))`
				}}
			/>

			<div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col lg:flex-row px-6 py-20 md:px-10 lg:px-12 gap-10">
				<div className={`flex w-full lg:w-1/3 flex-col justify-center gap-5 items-start text-left`}>
					{subtitle ? (
						<p className="text-xs font-black uppercase tracking-[0.28em] text-brand-accent/90">{subtitle}</p>
					) : null}

					{title ? (
						<h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
							{title}{' '}
							{highlight ? <span className="text-brand-accent">{highlight}</span> : null}
						</h1>
					) : null}

					{description ? (
						<p className="max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">{description}</p>
					) : null}
					
					{pdfSrc ? (
						<a
							href={pdfSrc}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-4 inline-flex w-fit items-center gap-2 border border-brand-accent bg-brand-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-accent/90"
						>
							Open PDF in New Tab
						</a>
					) : null}
				</div>
				
				<div className="w-full lg:w-2/3 h-[60vh] lg:h-auto min-h-[500px] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2">
					{pdfSrc ? (
						<iframe 
							src={`${pdfSrc}#view=FitH`} 
							className="w-full h-full rounded-lg bg-white" 
							title={title || "PDF Document"}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
							<span className="text-white/50 font-bold tracking-widest uppercase">No PDF Source Provided</span>
						</div>
					)}
				</div>
			</div>
		</motion.section>
	);
}
