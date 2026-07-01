/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';
import { glossaryTags } from '../data/glossaryData';

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);

  const termKey = term.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Find matching entry in glossary
  const matchedData = glossaryTags.find(
    t => t.tag.toLowerCase() === term.toLowerCase() || 
         t.description.toLowerCase().includes(term.toLowerCase())
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    setCoords({
      x: e.clientX,
      y: e.clientY
    });
  };

  if (!matchedData) {
    return <span ref={containerRef}>{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      className="relative inline-block cursor-help border-b border-dotted border-indigo-400 text-slate-100 hover:text-indigo-305 transition-colors font-semibold"
      id={`glossary-tooltip-span-${termKey}`}
    >
      {children}
      
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            className="fixed pointer-events-none z-[9999] max-w-sm p-4 bg-slate-950/95 border-2 border-indigo-500/80 text-left rounded-xl shadow-2xl font-sans"
            style={{
              top: `${coords.y + 16}px`,
              left: `${Math.min(window.innerWidth - 340, Math.max(16, coords.x - 170))}px`,
            }}
            id={`glossary-tooltip-bubble-${termKey}`}
          >
            <span className="flex items-center justify-between border-b border-indigo-900/50 pb-1.5 mb-2">
              <span className="flex items-center gap-1 text-[11px] font-mono font-extrabold uppercase tracking-wider text-indigo-400">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                DÉFINITION : {matchedData.tag.toUpperCase()}
              </span>
              <span className="text-[9px] font-mono font-semibold text-slate-450 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded">
                {matchedData.version.toUpperCase().replace('HTML', 'HTML ')}
              </span>
            </span>
            <span className="block text-[11px] leading-relaxed text-slate-200">
              {matchedData.description}
            </span>
            {matchedData.isHtmlTag && (
              <span className="block mt-2 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-1.5 py-0.5 rounded-md w-fit">
                Balise : &lt;{matchedData.tag}&gt;
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
