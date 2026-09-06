/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CrtPowerTransitionProps {
  key?: React.Key;
  isActive: boolean;
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function CrtPowerTransition({ isActive, theme }: CrtPowerTransitionProps) {
  if (!isActive) return null;

  // Customize glow tint depending on target theme
  const glowColor = 
    theme === 'terminal' ? 'rgba(255, 176, 0, 0.9)' :
    theme === 'ie6' ? 'rgba(0, 120, 215, 0.9)' : 'rgba(99, 102, 241, 0.9)';

  const beamColor = 
    theme === 'terminal' ? '#ffb000' :
    theme === 'ie6' ? '#60a5fa' : '#818cf8';

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden flex items-center justify-center">
      {/* 1. Dark CRT Screen Mask & Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0.95, 0.8, 1, 0.4, 0] 
        }}
        transition={{ duration: 0.65, times: [0, 0.15, 0.35, 0.5, 0.7, 0.85, 1], ease: "easeInOut" }}
        className="absolute inset-0 bg-black"
      >
        {/* CRT Scanline Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.8) 0px,
              rgba(0, 0, 0, 0.8) 2px,
              transparent 2px,
              transparent 4px
            )`
          }}
        />

        {/* CRT Curved Screen Vignette Edge */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 90%, #000000 100%)`
          }}
        />

        {/* Phosphor Flash Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0.2, 0.6, 0], scale: [0.5, 1.1, 1, 1.05, 1] }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      {/* 2. Horizontal Cathode Ray Beam (Power Collapse & Expand) */}
      <motion.div
        initial={{ scaleX: 0, scaleY: 0.002, opacity: 0 }}
        animate={{ 
          scaleX: [0, 1, 1, 1, 1, 1],
          scaleY: [0.002, 0.002, 0.005, 0.08, 0.5, 1],
          opacity: [0, 1, 1, 0.9, 0.5, 0]
        }}
        transition={{ 
          duration: 0.65, 
          times: [0, 0.15, 0.3, 0.5, 0.75, 1],
          ease: "easeInOut" 
        }}
        className="absolute w-full h-full bg-white origin-center"
        style={{
          boxShadow: `0 0 30px ${beamColor}, 0 0 60px ${beamColor}, 0 0 100px #ffffff`,
          filter: 'blur(0.5px)'
        }}
      />

      {/* 3. Central Bright Dot / Flash on Power-On */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 0.1, 0], opacity: [0, 1, 0.8, 0] }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute w-8 h-8 rounded-full bg-white shadow-[0_0_50px_#ffffff,0_0_100px_#00ffff]"
      />

      {/* 4. Vertical Screen Scan Distortion Band */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 0.4, repeat: 1, ease: "linear" }}
        className="absolute w-full h-24 bg-white/10 border-y border-white/30"
      />
    </div>
  );
}
