import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[110] origin-left shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
