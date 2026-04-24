import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   THREE.JS  —  RIPPLE WAVE PARTICLE FIELD
═══════════════════════════════════════════════════════════ */
function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 18, 42);
    camera.lookAt(0, 0, 0);

    /* ── Particle Grid  (80 × 60 = 4800 points) ── */
    const COLS = 80, ROWS = 60;
    const SPACING = 1.1;
    const count = COLS * ROWS;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    const cCyan = new THREE.Color('#008b8b');
    const cMaroon = new THREE.Color('#800000');
    const cWhite = new THREE.Color('#ffffff');

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * SPACING;
        const z = (r - ROWS / 2) * SPACING;
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;
        phases[idx] = Math.random() * Math.PI * 2;

        const distFromCentre = Math.sqrt(x * x + z * z) / 30;
        const col = distFromCentre < 0.15
          ? cWhite.clone().lerp(cCyan, 0.4)
          : distFromCentre > 0.8
            ? cMaroon.clone().lerp(cCyan, 0.6)
            : cCyan.clone();
        colors[idx * 3] = col.r;
        colors[idx * 3 + 1] = col.g;
        colors[idx * 3 + 2] = col.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ── Mouse tilt ── */
    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ── */
    let animId;
    const clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position;

      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y =
          Math.sin(x * 0.35 + t * 1.1 + phases[i]) * 1.4 +
          Math.sin(z * 0.28 + t * 0.85) * 1.1 +
          Math.sin((x + z) * 0.18 + t * 0.6) * 0.7;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 4 + 18 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      points.rotation.y = t * 0.04;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE HERO COMPONENT
═══════════════════════════════════════════════════════════ */
export default function PageHero({
  titleStroke = "NSEC",
  titleFill = "PAGE",
  statutoryLabel = "Department",
  policyLabel = "Overview",
  rightLabel = "Explore.Now",
  rightContent = null,
}) {
  return (
    <section className="relative w-full overflow-hidden bg-brand-blue" style={{ minHeight: '30vh' }}>
      <ThreeBackground />

      <div
        className="absolute top-0 right-0 h-full w-[45%] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(0,139,139,0.04) 100%)' }}
      />

      <div className="relative z-10 px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 h-full" style={{ minHeight: '30vh', paddingBlock: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center py-8"
        >
          {statutoryLabel && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1.5px] bg-[var(--color-brand-maroon)]" />
              <span className="text-[8px] font-mono font-black text-[var(--color-brand-maroon)] uppercase tracking-[0.5em]">
                {statutoryLabel}
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-0 select-none leading-none flex-wrap">
            {titleStroke && (
              <span
                className="font-heading font-black italic uppercase tracking-tighter"
                style={{
                  fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--color-brand-accent)',
                  marginRight: '0.2em'
                }}
              >
                {titleStroke}
              </span>
            )}
            <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)' }}>
              {titleFill}
            </span>
          </div>

          {policyLabel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center gap-3 mt-2.5"
            >
              <div className="h-[2px] w-10 bg-[var(--color-brand-accent)]" />
              <span
                className="font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
              >
                {policyLabel}
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 lg:w-[35%] flex flex-col gap-5 py-8"
        >
          {rightLabel && (
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-8 bg-brand-maroon origin-left"
              />
              <span className="text-[8px] font-mono font-black text-brand-maroon uppercase tracking-[0.4em]">
                {rightLabel}
              </span>
            </div>
          )}

          {rightContent && (
            <div className="leading-snug">
              {rightContent}
            </div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-brand-accent), transparent)' }} />
    </section>
  );
}
