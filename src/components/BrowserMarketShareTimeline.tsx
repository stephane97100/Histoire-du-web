/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Globe, HelpCircle, Award, CheckCircle, Smartphone, Cpu } from 'lucide-react';

interface BrowserTimelineItem {
  id: string;
  name: string;
  peakShare: number; // 97, 90, 96, 28
  peakShareLabel: string;
  peakYear: string;
  contributions: string[];
  anecdote: string;
  description: string;
  badge: string;
  logoChar: string;
  colorClass: string;
  iconBg: string;
}

const BROWSER_TIMELINE_DATA: BrowserTimelineItem[] = [
  {
    id: 'mosaic',
    name: 'NCSA Mosaic',
    peakShare: 97,
    peakShareLabel: '97% de parts de marché (Web mondial)',
    peakYear: '1993',
    contributions: [
      'Balise HTML <img> intégrée directement au texte',
      'Barre d\'adresse URL unifiée et intuitive',
      'Affichage graphique multiplateforme universel'
    ],
    anecdote: 'Avant Marc Andreessen et Eric Bina (qui ont codé Mosaic), les images s\'ouvraient dans une fenêtre système externe séparée ! Mosaic a unifié les pixels et le texte, déclenchant l\'étincelle de la Toile.',
    description: 'Surnommé le premier navigateur populaire du monde, Mosaic a été conçu en Illinois au National Center for Supercomputing Applications. Il offrait un confort de lecture inouï pour l\'époque et a permis au grand public d\'appréhender le protocole HTTP.',
    badge: '🌀 Mosaic',
    logoChar: '🌀',
    colorClass: 'text-amber-500 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10',
    iconBg: 'bg-amber-500/10 text-amber-400'
  },
  {
    id: 'netscape',
    name: 'Netscape Navigator',
    peakShare: 90,
    peakShareLabel: '90% de parts de marché',
    peakYear: '1995',
    contributions: [
      'Création de JavaScript en 10 jours en 1995',
      'Invention du protocole sécurisé SSL/HTTPS',
      'Invention des cookies de session client-serveur'
    ],
    anecdote: 'Créé sous le nom de code secret de "Mosaic Killer" (donnant naissance au mot "Mozilla"), Netscape a marqué les esprits avec une introduction en bourse légendaire qui a propulsé le coup d\'envoi de la bulle spéculative Internet.',
    description: 'Souverain commercial absolu de 1994 à 1997, Netscape Navigator était synonyme d\'Internet. Vaincu brutalement par Microsoft lors de la première guerre des navigateurs, il a fait don de son code source au domaine public, lançant la Fondation Mozilla.',
    badge: '🧭 Netscape',
    logoChar: '🧭',
    colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10',
    iconBg: 'bg-indigo-500/10 text-indigo-450'
  },
  {
    id: 'ie',
    name: 'Internet Explorer',
    peakShare: 96,
    peakShareLabel: '96% d\'hégémonie mondiale',
    peakYear: '2002',
    contributions: [
      'Balise <iframe> intégrée de façon native',
      'Support pionnier des feuilles de styles CSS1/2',
      'Développement originel du moteur Trident (MSHTML)'
    ],
    anecdote: 'Après avoir terrassé Netscape en insérant directement Explorer dans Windows 95/98 gratuits, Microsoft a stoppé tout développement d\'IE de 2002 à 2006 par excès de confiance, figeant le web d\'époque dans un océan de failles sécuritaires.',
    description: 'Arme de monopole absolu de Microsoft, Internet Explorer reste associé à l\'ère IE6 et à ses infinis "hacks CSS". Ses dérives non-standardisées ont poussé la communauté à militer activement pour le respect strict des chartes du W3C.',
    badge: '🌐 Explorer',
    logoChar: '🌐',
    colorClass: 'text-sky-400 border-sky-500/30 bg-[#0e3b6d]/30 hover:bg-[#0e3b6d]/50',
    iconBg: 'bg-sky-500/10 text-sky-450'
  },
  {
    id: 'opera',
    name: 'Opera & Opera Mini',
    peakShare: 28,
    peakShareLabel: '28% de parts mondiales mobiles',
    peakYear: '2009',
    contributions: [
      'Navigation par onglets unifiés (1998)',
      'Invention de l\'accès rapide "Speed Dial"',
      'Compression d\'époque des données de 90%'
    ],
    anecdote: 'Sur les vieux téléphones portables et PDA J2ME à bande passante lente, Opera Mini délocalisait le rendu : un serveur proxy d\'Opera digérait la page web complexe originale puis envoyait un fichier compressé binaire ultra-rapide !',
    description: 'Né en Norvège, le discret ingénieur d\'Opera a inventé des dizaines d\'innovations ergonomiques cruciales aujourd\'hui adoptées par tous. Sa déclinaison mobile, Opera Mini, a propulsé le web de poche mondial à l\'ère pré-smartphone.',
    badge: '⭕ Opera',
    logoChar: '⭕',
    colorClass: 'text-rose-500 border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10',
    iconBg: 'bg-rose-500/10 text-rose-450'
  }
];

export default function BrowserMarketShareTimeline() {
  const [selectedBrowserId, setSelectedBrowserId] = useState<string>('mosaic');

  const activeBrowser = BROWSER_TIMELINE_DATA.find(b => b.id === selectedBrowserId) || BROWSER_TIMELINE_DATA[0];

  return (
    <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl space-y-6" id="browser-timeline-sub">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#ffb000] uppercase">
          ⚡ Frise interactive &amp; Chronologie des Parts de Marché
        </span>
        <h4 className="text-sm font-bold text-slate-100">
          L'Épopée Secrète des Navigateurs &amp; Leurs Secrets d'Apogée
        </h4>
        <p className="text-[11px] text-slate-400">
          Cliquez sur les logos légendaires de la Toile pour examiner les statistiques de combat, parts de marché maximales et contributions pérennes de chaque ancêtre.
        </p>
      </div>

      {/* HORIZONTAL TIMELINE DOTTED WORKFLOW */}
      <div className="relative pt-6 pb-2" id="timeline-node-scroller">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-dashed border-b border-dashed border-slate-700 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-4 gap-2 relative z-10">
          {BROWSER_TIMELINE_DATA.map((item) => {
            const isSelected = item.id === selectedBrowserId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedBrowserId(item.id)}
                className={`flex flex-col items-center gap-2 cursor-pointer transition focus:outline-none`}
                id={`btn-browser-timeline-item-${item.id}`}
              >
                {/* Year Badge */}
                <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${
                  isSelected 
                    ? 'bg-[#ffb000]/10 border-[#ffb000] text-[#ffb000]' 
                    : 'bg-slate-950/40 border-slate-850 text-slate-450'
                }`}>
                  {item.peakYear}
                </span>

                {/* Logo Capsule */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl select-none transition-all duration-300 ${
                  isSelected 
                    ? 'scale-110 ring-2 ring-[#ffb000] bg-slate-950 border border-[#ffb000] shadow-[0_0_15px_rgba(255,176,0,0.15)]'
                    : 'bg-slate-950/80 border border-slate-800 opacity-65 hover:opacity-100 hover:scale-105'
                }`}>
                  {item.logoChar}
                </div>

                {/* Short text label */}
                <span className={`text-[10px] font-bold text-center tracking-tight ${
                  isSelected ? 'text-slate-200' : 'text-slate-450'
                }`}>
                  {item.name.replace(' & Opera Mini', '')}
                </span>

                {/* Micro peak share percentage badge on node */}
                <span className="text-[9px] font-mono text-slate-500">
                  Peak: ~{item.peakShare}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE BROWSER SPECS BOARD - WITH MOTION FADING ANCHOR */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBrowser.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="bg-slate-950/55 p-5 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
          id={`timeline-active-board-${activeBrowser.id}`}
        >
          {/* Column A: Interactive Peak Gauge (3 md cols) */}
          <div className="md:col-span-4 flex flex-col justify-center items-center p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-4 text-center">
            <span className="text-[9px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">
              🏆 PART DE MARCHÉ À L'APOGÉE
            </span>

            {/* Simulated Round Circle / Elegant visual gauge bar */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer circular background track */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-855"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-amber-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${activeBrowser.peakShare}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${activeBrowser.peakShare}, 100` }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-100 font-mono tracking-tighter">
                  {activeBrowser.peakShare}%
                </span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  apogée
                </span>
              </div>
            </div>

            {/* Peak Share Label Description banner */}
            <div className="text-[10px] font-semibold text-slate-350">
              {activeBrowser.peakShareLabel}
            </div>
          </div>

          {/* Column B: Explanatory Legacy (8 md cols) */}
          <div className="md:col-span-8 space-y-4 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl select-none">{activeBrowser.logoChar}</span>
                <h5 className="text-sm font-black text-slate-100">
                  {activeBrowser.name} <span className="text-xs text-amber-500 font-mono">({activeBrowser.peakYear})</span>
                </h5>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                {activeBrowser.description}
              </p>
            </div>

            {/* Contributions listing block */}
            <div className="space-y-1.5 pt-2 border-t border-slate-850">
              <strong className="text-[9px] font-mono uppercase tracking-wider text-indigo-400 block mb-1">
                🔧 Contributions majeures au Web d'aujourd'hui :
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {activeBrowser.contributions.map((contr, k) => (
                  <div key={k} className="flex items-start gap-1.5 text-[10.5px] text-slate-350">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{contr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Antique Retro Trivia Anecdote Box */}
            <div className="p-3 bg-slate-900 border border-slate-850 text-[10.5px] rounded-lg text-slate-400 italic font-sans leading-relaxed">
              <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-[#ffb000] block not-italic mb-0.5">
                💡 Anecdote Archéologique d'époque :
              </span>
              "{activeBrowser.anecdote}"
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
