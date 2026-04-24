'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MotionSection = motion.section;

export default function Hero({
	title,
	highlight,
	subtitle,
	description,
	mediaType = 'image',
	mediaSrc,
	mediaPoster,
	mediaAlt = 'Hero media',
	overlayOpacity = 0.45,
	minHeightClass = 'min-h-[70vh]',
	align = 'left',
	cta,
	children,
	className = '',
	contentClassName = ''
}) {
	const textAlignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

	return (
		<MotionSection
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			className={`relative w-full overflow-hidden ${minHeightClass} ${className}`.trim()}
		>
			<div className="absolute inset-0">
				{mediaType === 'video' && mediaSrc ? (
					<video
						className="h-full w-full object-cover"
						src={mediaSrc}
						poster={mediaPoster}
						autoPlay
						muted
						loop
						playsInline
						preload="metadata"
						aria-label={mediaAlt}
					/>
				) : mediaSrc ? (
					<img className="h-full w-full object-cover" src={mediaSrc} alt={mediaAlt} />
				) : (
					<div className="h-full w-full bg-brand-blue" />
				)}

				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(120deg, rgba(2, 6, 23, ${Math.min(overlayOpacity + 0.15, 0.9)}), rgba(2, 6, 23, ${overlayOpacity}))`
					}}
				/>
			</div>

			<div className="relative z-10 mx-auto flex h-full w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
				<div className={`flex max-w-3xl flex-col justify-center gap-5 ${textAlignClass}`}>
				<div className={`w-full ${contentClassName}`.trim()}>
					{subtitle ? (
						<p className="text-xs font-black uppercase tracking-[0.28em] text-brand-accent/90">{subtitle}</p>
					) : null}

					{title ? (
						<h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-7xl">
							{title}{' '}
							{highlight ? <span className="text-brand-accent">{highlight}</span> : null}
						</h1>
					) : null}

					{description ? (
						<p className="max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">{description}</p>
					) : null}

					{cta?.label && cta?.href ? (
						<a
							href={cta.href}
							target={cta.newTab ? '_blank' : '_self'}
							rel={cta.newTab ? 'noopener noreferrer' : undefined}
							className="mt-2 inline-flex w-fit items-center gap-2 border border-brand-accent bg-brand-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-accent/90"
						>
							{cta.label}
						</a>
					) : null}

					{children ? <div className="mt-2 w-full">{children}</div> : null}
				</div>
				</div>
			</div>
		</MotionSection>
	);
}
