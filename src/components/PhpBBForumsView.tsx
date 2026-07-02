/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Users, 
  Settings, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  CornerDownRight, 
  History, 
  AlertTriangle,
  Flame,
  UserCheck,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Clock
} from 'lucide-react';

interface PhpBBForumsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

type SectionId = 'genesis' | 'survival' | 'challenges';

export default function PhpBBForumsView({ theme }: PhpBBForumsViewProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('genesis');
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  
  // High fidelity style helper
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#d4d0c8] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans rounded-none text-left',
          header: 'bg-[#006699] text-white p-2 font-bold text-xs border border-white flex items-center justify-between',
          subSilverHeader: 'bg-[#ececec] border-b border-[#006699] p-2 text-[11px] font-mono flex justify-between text-slate-700',
          postContainer: 'bg-[#dee3e7] border border-[#a0a0a0] p-3 text-black space-y-3 font-sans text-xs',
          postHeader: 'bg-[#e5e5e5] p-2 border-b border-[#c0c0c0] font-bold text-[#006699] text-[11px] flex items-center justify-between',
          avatarArea: 'bg-[#d4d0c8] border-r border-[#a0a0a0] pr-3 text-[10px] space-y-1 text-slate-800 shrink-0 w-28 md:w-36 font-sans',
          contentArea: 'pl-3 flex-1 text-xs text-[#000000] leading-relaxed',
          btnActive: 'bg-[#006699] text-white font-bold p-3 border-2 border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#d4d0c8] text-[#006699] border-2 border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#c0c0c0] rounded-none flex items-center justify-between',
          quoteBlock: 'bg-[#fafafa] border border-[#006699] p-3 my-2 text-[10.5px] italic text-[#444444] rounded-none shadow-inner',
          rankAdmin: 'text-red-700 font-extrabold font-mono text-[9px] uppercase tracking-wide',
          rankMod: 'text-green-700 font-bold font-mono text-[9px] uppercase tracking-wide',
          rankVeteran: 'text-blue-700 font-semibold font-mono text-[9px] uppercase tracking-wide',
          rankNew: 'text-slate-600 font-mono text-[9px] uppercase tracking-wide',
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/40 p-4 text-[#ffb000] font-mono rounded-none text-left',
          header: 'bg-black border-b border-[#ffb000]/40 p-2 font-bold text-xs text-[#ffb000] flex items-center justify-between uppercase tracking-wider',
          subSilverHeader: 'bg-[#050505] border-b border-[#ffb000]/25 p-2 text-[10px] flex justify-between text-[#ffb000]/70 font-mono',
          postContainer: 'bg-black border border-[#ffb000]/20 p-3 text-[#ffb000] space-y-3 font-mono text-xs',
          postHeader: 'bg-[#0a0a0a] p-2 border-b border-[#ffb000]/30 font-bold text-[#ffb000] text-[10px] flex items-center justify-between',
          avatarArea: 'border-r border-[#ffb000]/20 pr-3 text-[9px] space-y-1 text-[#ffb000]/80 shrink-0 w-28 md:w-36 font-mono',
          contentArea: 'pl-3 flex-1 text-xs text-[#ffb000]/95 leading-relaxed',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          quoteBlock: 'bg-[#0c0c0c] border-l-2 border-[#ffb000] p-3 my-2 text-[10.5px] italic text-[#ffb000]/75 rounded-none',
          rankAdmin: 'text-[#ffb000] border border-[#ffb000] px-1 font-bold text-[8px] uppercase tracking-wider',
          rankMod: 'text-[#ffb000]/90 border border-[#ffb000]/70 px-1 text-[8px] uppercase tracking-wider',
          rankVeteran: 'text-[#ffb000]/80 text-[8px] uppercase tracking-wider',
          rankNew: 'text-[#ffb000]/60 text-[8px] uppercase tracking-wider',
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4 text-left text-slate-100',
          header: 'bg-[#1a1a20] p-3 rounded-xl border border-slate-800 text-sm font-bold text-white flex items-center justify-between',
          subSilverHeader: 'p-2.5 text-[11px] text-slate-400 bg-[#16161a] rounded-lg border border-slate-850 flex justify-between font-mono',
          postContainer: 'bg-[#16161a]/60 border border-[#2a2a2e] p-4 rounded-xl space-y-3 font-sans text-xs',
          postHeader: 'bg-[#202026]/70 p-3 rounded-t-lg border-b border-slate-800 font-semibold text-indigo-400 text-[11.5px] flex items-center justify-between',
          avatarArea: 'border-r border-slate-800/80 pr-4 text-[10.5px] space-y-1.5 text-slate-300 shrink-0 w-28 md:w-36 font-sans',
          contentArea: 'pl-4 flex-1 text-xs text-slate-300 leading-relaxed',
          btnActive: 'bg-indigo-950/20 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
          quoteBlock: 'bg-slate-900/60 border-l-4 border-indigo-500/50 p-3 my-2 text-[11px] italic text-slate-400 rounded-r-lg',
          rankAdmin: 'text-rose-400 font-extrabold text-[9px] uppercase tracking-wider bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20',
          rankMod: 'text-emerald-400 font-bold text-[9px] uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20',
          rankVeteran: 'text-sky-400 font-semibold text-[9px] uppercase tracking-wider bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/10',
          rankNew: 'text-slate-450 text-[9px] uppercase tracking-wider bg-slate-800/20 px-1.5 py-0.5 rounded border border-slate-800/10',
        };
    }
  };

  const css = getThemeClass();

  // Helper beep noise for tactile retro audio response
  const playBeep = (freq: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // Ignored if browser policy blocks AudioContext
    }
  };

  return (
    <div className="space-y-6" id="phpbb-forums-root">
      {/* Immersive Header */}
      <div className={`${
        theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
        theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
        'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
      } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Histoire d'Internet : Le Phénomène phpBB & La Culture Forum</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Plongée dans l'âge d'or des micro-communautés autonomes et asynchrones pré-algorithmiques.</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar (selectors) and Board Interface (Content) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column: Section Selector (4 Cols) */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            📟 Sélectionner un chapitre :
          </span>

          <div className="flex flex-col gap-2.5">
            {/* Section 1 */}
            {(() => {
              const id = 'genesis';
              const isSelected = activeSection === id;
              const isHovered = hoveredSection === id;
              const isAnyHovered = hoveredSection !== null;
              const ghostCss = isAnyHovered && !isHovered
                ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";
              return (
                <button
                  onClick={() => {
                    setActiveSection(id);
                    playBeep(450);
                  }}
                  onMouseEnter={() => setHoveredSection(id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`${isSelected ? css.btnActive : css.btnInactive} ${ghostCss}`}
                  id="btn-phpbb-genesis"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base">✨</span>
                    <div>
                      <b className="block text-[11.5px]">L'essor de phpBB (Années 2000)</b>
                      <span className="text-[9px] opacity-70 block font-mono">Le kit de démarrage des communautés</span>
                    </div>
                  </div>
                </button>
              );
            })()}

            {/* Section 2 */}
            {(() => {
              const id = 'survival';
              const isSelected = activeSection === id;
              const isHovered = hoveredSection === id;
              const isAnyHovered = hoveredSection !== null;
              const ghostCss = isAnyHovered && !isHovered
                ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";
              return (
                <button
                  onClick={() => {
                    setActiveSection(id);
                    playBeep(500);
                  }}
                  onMouseEnter={() => setHoveredSection(id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`${isSelected ? css.btnActive : css.btnInactive} ${ghostCss}`}
                  id="btn-phpbb-survival"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base">🛡️</span>
                    <div>
                      <b className="block text-[11.5px]">La Résistance face aux Géants</b>
                      <span className="text-[9px] opacity-70 block font-mono">Pourquoi ils survivent à Facebook & Discord</span>
                    </div>
                  </div>
                </button>
              );
            })()}

            {/* Section 3 */}
            {(() => {
              const id = 'challenges';
              const isSelected = activeSection === id;
              const isHovered = hoveredSection === id;
              const isAnyHovered = hoveredSection !== null;
              const ghostCss = isAnyHovered && !isHovered
                ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";
              return (
                <button
                  onClick={() => {
                    setActiveSection(id);
                    playBeep(550);
                  }}
                  onMouseEnter={() => setHoveredSection(id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`${isSelected ? css.btnActive : css.btnInactive} ${ghostCss}`}
                  id="btn-phpbb-challenges"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base">⚙️</span>
                    <div>
                      <b className="block text-[11.5px]">Le Combat de 2026 & Modernité</b>
                      <span className="text-[9px] opacity-70 block font-mono">Dette technique et spam intelligent</span>
                    </div>
                  </div>
                </button>
              );
            })()}
          </div>

          {/* Authentic phpBB Stats Widget */}
          <div className={`${css.card} mt-4 p-4 space-y-2`}>
            <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-450 block border-b border-slate-800 pb-1.5">
              📊 Statistiques du Forum
            </span>
            <div className="space-y-1 text-[10px] text-slate-400 font-mono leading-relaxed">
              <p>📍 Nos membres ont posté un total de <strong className="text-indigo-400">142,683</strong> messages</p>
              <p>👥 Nous avons <strong className="text-indigo-400">8,421</strong> membres inscrits</p>
              <p>🎉 L'utilisateur le plus récent est <strong className="text-indigo-400">WebPionnier_99</strong></p>
              <p>⚡ Record d'utilisateurs en ligne : <strong className="text-indigo-400">1,492</strong> le Mar 14 Fév 2004</p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive phpBB Board Display Screen (8 Cols) */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {/* Header tab board title banner */}
            <div className={css.header}>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>INDEX DU FORUM &gt; HISTOIRE DU WEB &gt; ARCHIVES POPULAIRES</span>
              </div>
              <span className="text-[9px] font-mono">phpBB v2.0.22</span>
            </div>

            {/* Board subheader bar (Time & breadcrumbs info) */}
            <div className={css.subSilverHeader}>
              <span>Heures au format UTC [ UTC + 1 ]</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500 inline" /> Dernière visite : Aujourd'hui à 04:30
              </span>
            </div>

            {/* Active Thread Window */}
            <div className="mt-3.5 space-y-4">
              
              <AnimatePresence mode="wait">
                {activeSection === 'genesis' && (
                  <motion.div
                    key="genesis"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Category Title Header */}
                    <div className="border-l-4 border-[#006699] pl-3 py-1 bg-slate-900/20 rounded">
                      <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                        Sujet : L'essor phénoménal de phpBB au début des années 2000
                      </h3>
                      <p className="text-[10px] text-slate-400">Posté le : Ven 25 Avr 2003 • 492,841 Vues • 1,328 Réponses</p>
                    </div>

                    {/* Intro Post */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Admin_Retro</strong>
                        <span className={css.rankAdmin}>Administrateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 12 Oct 2001</p>
                          <p>Messages : 14,842</p>
                          <p>Localisation : Minitel 3615</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>📝 Message d'introduction</span>
                          <span className="text-[9.5px] opacity-70">Sujet #1</span>
                        </div>
                        <p className="mt-2 text-slate-200 font-semibold leading-relaxed">
                          Si phpBB a provoqué un tel raz-de-marée au début des années 2000, c'est parce qu'il a été le bon outil, au bon moment, pour répondre à un besoin humain fondamental : se regrouper par affinités.
                        </p>
                        <p className="mt-2.5">
                          Avant l'arrivée de Facebook, de Reddit ou de Discord, le web était très fragmenté. phpBB a littéralement inventé le "kit de démarrage" de la communauté en ligne pour plusieurs raisons majeures :
                        </p>
                      </div>
                    </div>

                    {/* Point 1 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Sébastien_K</strong>
                        <span className={css.rankMod}>Modérateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 04 Fév 2002</p>
                          <p>Messages : 6,321</p>
                          <p>Localisation : Free ADSL 512k</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>💡 1. La barrière à l'entrée était presque nulle</span>
                          <span className="text-[9.5px] opacity-70">Posté le 25 Avr 2003</span>
                        </div>
                        <p className="mt-2">
                          À l'époque, créer un site interactif coûtait cher et demandait de solides compétences en programmation. Les solutions professionnelles existantes (comme vBulletin) étaient onéreuses.
                        </p>
                        <p className="mt-2 text-indigo-300 font-medium bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-500/10 mt-2">
                          phpBB a tout changé : il était 100 % gratuit (open-source) et extrêmement facile à installer. Quiconque possédait un hébergement web de base (même les espaces gratuits offerts par les fournisseurs d'accès comme Free ou Wanadoo) pouvait télécharger les fichiers, les envoyer sur un serveur, et avoir un forum fonctionnel en moins de 10 minutes.
                        </p>
                      </div>
                    </div>

                    {/* Point 2 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">BonsaiMaster</strong>
                        <span className={css.rankVeteran}>Membre Vétéran</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 20 Jui 2002</p>
                          <p>Messages : 2,984</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>🌳 2. L'âge d'or des "niches" ultra-spécialisées</span>
                          <span className="text-[9.5px] opacity-70">Posté le 26 Avr 2003</span>
                        </div>
                        <p className="mt-2">
                          Aujourd'hui, si tu es passionné par les bonsaïs ou la mécanique des vieilles Peugeot, tu cherches un groupe Facebook. À l'époque, on créait un forum phpBB.
                        </p>
                        <p className="mt-2">
                          Parce qu'il était gratuit, n'importe quel passionné, étudiant ou professionnel pouvait créer son espace. Cela a permis l'émergence de sites ultra-pointus où la qualité de l'information primait. Des communautés comme <span className="text-indigo-400 font-semibold underline">infirmiers.com</span>, les forums de mathématiques universitaires, ou les clubs d'astronomie sont devenus des encyclopédies vivantes, car chaque problème résolu restait indexé et consultable des années plus tard.
                        </p>
                      </div>
                    </div>

                    {/* Point 3 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Justice_99</strong>
                        <span className={css.rankMod}>Modérateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 14 Sep 2002</p>
                          <p>Messages : 4,115</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>🛡️ 3. L'architecture de la confiance et de la solidarité</span>
                          <span className="text-[9.5px] opacity-70">Posté le 26 Avr 2003</span>
                        </div>
                        <p className="mt-2 font-semibold text-slate-200">
                          Si ces communautés étaient si solidaires et fiables, c'est grâce à la structure même de phpBB :
                        </p>
                        <div className="mt-2 space-y-2 text-slate-300 pl-2 border-l border-slate-700">
                          <p>
                            • <strong className="text-indigo-300">La hiérarchie des rôles :</strong> Administrateurs, modérateurs, membres "Vétérans", nouveaux venus. Ce système de permissions granulaires permettait une auto-régulation très stricte. Les modérateurs gardaient les forums "propres" et bienveillants.
                          </p>
                          <p>
                            • <strong className="text-indigo-300">Les sections privées :</strong> On pouvait créer des salons visibles uniquement par les membres inscrits ou par certains groupes. Cela offrait un espace sécurisant (un "safe space") pour discuter de sujets professionnels sensibles (comme le quotidien difficile des soignants), sans que ce soit exposé au grand public.
                          </p>
                          <p>
                            • <strong className="text-indigo-300">Le compteur de messages :</strong> Le statut d'un membre se mesurait à son ancienneté et à son nombre d'interventions. Cela créait une méritocratie où les experts étaient reconnus et respectés par la communauté.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Point 4 & 5 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Web_Craft</strong>
                        <span className={css.rankVeteran}>Membre Vétéran</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 09 Nov 2002</p>
                          <p>Messages : 3,842</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>🎨 4. Culture "MOD" &amp; 5. Indépendance Algorithmique</span>
                          <span className="text-[9.5px] opacity-70">Posté le 27 Avr 2003</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-indigo-400">Une personnalisation sans limite :</strong> Les créateurs de communautés ne voulaient pas tous le même site. phpBB permettait de modifier entièrement l'apparence (les thèmes) et d'ajouter des fonctionnalités grâce aux MODs (des modifications de code partagées gratuitement par d'autres utilisateurs). On pouvait ajouter des portails, des systèmes de réputation, des calendriers d'événements, ou des galeries photos. Le forum devenait véritablement la "maison" de la communauté, avec son propre code vestimentaire.
                        </p>
                        <p className="mt-3">
                          <strong className="text-indigo-400">L'indépendance totale :</strong> C'est peut-être le point le plus important par rapport au web actuel : il n'y avait pas d'algorithme. Sur un forum phpBB, les messages s'affichaient par ordre chronologique. Personne ne décidait à ta place de ce qui était "tendance" ou de ce qui allait générer du clic. L'administrateur était le seul maître à bord et possédait ses propres données. Cette indépendance a forgé un attachement viscéral des membres à leur forum.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'survival' && (
                  <motion.div
                    key="survival"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Category Title Header */}
                    <div className="border-l-4 border-emerald-500 pl-3 py-1 bg-slate-900/20 rounded">
                      <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                        Sujet : Pourquoi certains vieux forums phpBB survivent encore aujourd'hui ?
                      </h3>
                      <p className="text-[10px] text-slate-400">Posté le : Sam 14 Oct 2017 • 384,119 Vues • 894 Réponses</p>
                    </div>

                    {/* Question Post */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Curieux_Du_Web</strong>
                        <span className={css.rankNew}>Nouveau Membre</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : Hier</p>
                          <p>Messages : 3</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>❓ Question existentielle</span>
                          <span className="text-[9.5px] opacity-70">Sujet #2</span>
                        </div>
                        <p className="mt-2 text-slate-350">
                          Comment ces vieux forums basés sur phpBB ont-ils réussi à survivre et à garder leurs communautés malgré l'arrivée de Facebook, Reddit ou Discord ?
                        </p>
                        <p className="mt-2">
                          C'est la question centrale. Beaucoup ont effectivement disparu, balayés par la facilité de Facebook ou la fluidité de Discord. Mais ceux qui ont survécu (et qui continuent d'être actifs) l'ont fait parce qu'ils possèdent des atouts structurels que les plateformes modernes sont incapables de reproduire.
                        </p>
                      </div>
                    </div>

                    {/* Answer Post - Bibliothek effect */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Admin_Retro</strong>
                        <span className={css.rankAdmin}>Administrateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 12 Oct 2001</p>
                          <p>Messages : 14,842</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>📚 1. La mémoire et le référencement (L'effet "Bibliothèque")</span>
                          <span className="text-[9.5px] opacity-70">Posté le 14 Oct 2017</span>
                        </div>
                        <p className="mt-2">
                          C'est la plus grande faiblesse de Facebook et de Discord, et la plus grande force des forums.
                        </p>
                        <div className={`${css.quoteBlock} space-y-2`}>
                          <p>
                            • <strong>Discord est une messagerie instantanée :</strong> les informations défilent à toute vitesse. Retrouver un tutoriel posté il y a 6 mois est un cauchemar. C'est un trou noir pour la connaissance.
                          </p>
                          <p>
                            • <strong>Facebook est éphémère :</strong> l'algorithme privilégie la nouveauté. Les groupes Facebook sont impossibles à indexer correctement sur les moteurs de recherche.
                          </p>
                        </div>
                        <p className="mt-2.5">
                          <strong>Les forums sont des encyclopédies :</strong> Chaque problème résolu sur un forum phpBB crée une page web statique, parfaitement indexée par Google. Si tu cherches comment réparer une fuite sur un modèle précis de chaudière de 2008, Google te renverra vers un topic de forum de 2012 où la solution est expliquée pas-à-pas. Le forum accumule du "capital de connaissance" au fil des années.
                        </p>
                      </div>
                    </div>

                    {/* Points 2 & 3 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Sébastien_K</strong>
                        <span className={css.rankMod}>Modérateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 04 Fév 2002</p>
                          <p>Messages : 6,321</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>⏳ 2. Le temps asynchrone &amp; 3. L'absence d'algorithme</span>
                          <span className="text-[9.5px] opacity-70">Posté le 15 Oct 2017</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-emerald-400">Le temps asynchrone et la réflexion :</strong> Les réseaux sociaux modernes créent un sentiment d'urgence. Sur Discord, si tu ne réponds pas dans l'heure, la conversation est passée. Sur Twitter ou Facebook, le contenu "périt" en quelques heures. Le forum impose un rythme asynchrone, plus lent et plus posé. Tu peux déterrer un sujet vieux de trois ans pour y apporter une nouvelle solution (le fameux "bump" ou "up"), et la discussion reprend naturellement. Cela favorise les réponses longues, argumentées et réfléchies, indispensables pour des sujets complexes (médecine, droit, mécanique, programmation).
                        </p>
                        <p className="mt-3">
                          <strong className="text-emerald-400">L'absence d'algorithme et le contrôle total :</strong> Sur un groupe Facebook, tu es locataire. L'algorithme décide qui voit tes publications, et Facebook peut fermer le groupe du jour au lendemain sans explication s'il estime que les règles (souvent opaques) ont été violées. Sur phpBB, la communauté est propriétaire. Aucun algorithme de rétention ne vient cacher les messages ou mettre en avant des publications polémiques pour générer du clic. L'ordre est purement chronologique. L'administrateur possède la base de données. Personne ne peut lui confisquer sa communauté.
                        </p>
                      </div>
                    </div>

                    {/* Points 4 & 5 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">BonsaiMaster</strong>
                        <span className={css.rankVeteran}>Membre Vétéran</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 20 Jui 2002</p>
                          <p>Messages : 2,984</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>🔒 4. La friction qualitative &amp; 5. L'identité forte</span>
                          <span className="text-[9.5px] opacity-70">Posté le 15 Oct 2017</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-emerald-400">La "friction" comme filtre de qualité :</strong> Créer un compte sur un forum, valider son email, lire les règles de la section, comprendre comment formuler son titre (les fameuses balises comme [Résolu] ou [Tuto]) demande un effort. Là où Facebook permet de commenter en un clic (ce qui attire les trolls et les réponses impulsives), le forum impose une petite friction. Cette barrière à l'entrée agit comme un filtre naturel : ceux qui prennent le temps de s'inscrire et de poster sont généralement plus investis, plus respectueux et réellement passionnés.
                        </p>
                        <p className="mt-3">
                          <strong className="text-emerald-400">Une identité et une culture fortes :</strong> Sur Reddit, tu es sur Reddit avant d'être sur le sous-forum r/bricolage. L'interface est la même partout. Un forum phpBB, avec son design personnalisé, ses propres smileys historiques, sa bannière faite maison et ses grades humoristiques pour les membres, crée un fort sentiment d'appartenance. C'est une maison numérique conçue sur-mesure pour ses habitants, ce qui forge des liens bien plus durables entre les membres.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'challenges' && (
                  <motion.div
                    key="challenges"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Category Title Header */}
                    <div className="border-l-4 border-rose-500 pl-3 py-1 bg-slate-900/20 rounded">
                      <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                        Sujet : Les menaces de mort et d'obsolescence en 2026
                      </h3>
                      <p className="text-[10px] text-slate-400">Posté le : Mar 14 Fév 2026 • 248,301 Vues • 611 Réponses</p>
                    </div>

                    {/* Threat Intro */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Admin_Retro</strong>
                        <span className={css.rankAdmin}>Administrateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 12 Oct 2001</p>
                          <p>Messages : 14,842</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>⚠️ Le double mur : Technique et Générationnel</span>
                          <span className="text-[9.5px] opacity-70">Sujet #3</span>
                        </div>
                        <p className="mt-2 text-rose-350 font-semibold">
                          Pour les forums historiques basés sur phpBB, survivre en 2026 est un véritable sport de combat. S'ils disposent d'une base de membres fidèles, ils font face à un double mur : un mur technique lié à l'évolution du web, et un mur générationnel lié aux nouvelles habitudes de consommation.
                        </p>
                        <p className="mt-2.5">
                          Voici les plus grands défis auxquels ils sont confrontés :
                        </p>
                      </div>
                    </div>

                    {/* Defis Points */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Sébastien_K</strong>
                        <span className={css.rankMod}>Modérateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 04 Fév 2002</p>
                          <p>Messages : 6,321</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>📱 1. Le "Mobile-First" &amp; 🤖 2. Le Spam IA</span>
                          <span className="text-[9.5px] opacity-70">Posté le 15 Fév 2026</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-rose-400">Le défi du "Mobile-First" et l'absence d'application :</strong> phpBB a été conçu à une époque où le web se consommait exclusivement sur un écran d'ordinateur 4:3 avec une souris.
                        </p>
                        <div className="my-2 text-[11px] text-slate-300 pl-3 border-l-2 border-rose-500/30">
                          <p className="italic">
                            - L'ergonomie mobile : Même si phpBB a fait de gros efforts pour rendre ses thèmes responsives, l'expérience reste souvent lourde. Naviguer dans une arborescence de sous-forums, zoomer pour cliquer sur un micro-bouton "Page 34", ou rédiger un long pavé textuel sur un clavier virtuel est fastidieux.
                          </p>
                          <p className="italic mt-1">
                            - Le manque de notifications push : Les utilisateurs d'aujourd'hui sont habitués à recevoir une notification instantanée sur leur téléphone dès qu'on leur répond (comme sur Discord ou WhatsApp). Sur un vieux forum, il faut souvent ouvrir son navigateur ou attendre un e-mail de notification pour savoir si le sujet a bougé.
                          </p>
                        </div>
                        <p className="mt-3">
                          <strong className="text-rose-400">La guerre thermonucléaire contre le spam IA :</strong> Le spam a toujours été le fléau des forums, mais l'explosion des outils d'intelligence artificielle a changé la donne.
                        </p>
                        <p className="mt-1.5">
                          Auparavant, les robots de spam postaient des liens grossiers pour du Viagra ou des casinos en ligne, faciles à bloquer avec un simple captcha. Aujourd'hui, des bots dopés à l'IA s'inscrivent, rédigent des messages qui ont l'air totalement humains et pertinents dans une discussion, puis insèrent subtilement des liens malveillants quelques jours plus tard. Pour les administrateurs bénévoles, la charge de modération technique est devenue immense.
                        </p>
                      </div>
                    </div>

                    {/* Defis Points 3 & 4 */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">BonsaiMaster</strong>
                        <span className={css.rankVeteran}>Membre Vétéran</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 20 Jui 2002</p>
                          <p>Messages : 2,984</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>⚡ 3. Renouvellement Générationnel &amp; 💾 4. Dette Technique</span>
                          <span className="text-[9.5px] opacity-70">Posté le 15 Fév 2026</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-rose-400">Le renouvellement générationnel (La culture du "Fast Web") :</strong> Les moins de 25 ans n'ont pas grandi avec la culture des forums. Ils sont habitués à l'immédiateté (le chat textuel ou la vidéo), au flux vertical infini (le scroll à la TikTok ou Reddit), et à la centralisation (une seule application pour tout faire).
                        </p>
                        <p className="mt-1.5">
                          Pour un jeune internaute, l'idée de devoir créer un compte spécifique, d'attendre la validation d'un modérateur, et de lire trois pages de texte avant d'avoir sa réponse paraît d'un autre siècle. Les vieux forums peinent donc à attirer du sang neuf, et leur population a tendance à vieillir avec le site.
                        </p>
                        <p className="mt-3.5">
                          <strong className="text-rose-400">La dette technique et les coûts d'infrastructure :</strong> Faire tourner un forum qui a 15 ou 20 ans d'existence pose de lourds problèmes de maintenance :
                        </p>
                        <p className="mt-1 text-slate-300">
                          • <strong>Les versions de PHP :</strong> Le web évolue, les serveurs se mettent à jour (passages aux versions supérieures de PHP). Si le code du forum ou des vieux "MODs" installés en 2012 n'est pas compatible, tout le site plante.
                        </p>
                        <p className="mt-1 text-slate-300">
                          • <strong>Le poids de la base de données :</strong> Des millions de messages et d'images stockés pendant deux décennies pèsent lourd. Cela demande des serveurs performants, et donc des coûts d'hébergement qui grimpent, alors que les revenus publicitaires sur les forums ont fondu.
                        </p>
                      </div>
                    </div>

                    {/* Defis Point 5 & Modernization solution */}
                    <div className={`${css.postContainer} flex flex-col md:flex-row gap-3`}>
                      <div className={css.avatarArea}>
                        <strong className="text-slate-100 block text-[11.5px] truncate">Admin_Retro</strong>
                        <span className={css.rankAdmin}>Administrateur</span>
                        <div className="text-[9px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-850">
                          <p>Inscrit le : 12 Oct 2001</p>
                          <p>Messages : 14,842</p>
                        </div>
                      </div>
                      <div className={css.contentArea}>
                        <div className={css.postHeader}>
                          <span>❤️ 5. Fatigue de la modération &amp; Solution Modernité</span>
                          <span className="text-[9.5px] opacity-70">Posté le 16 Fév 2026</span>
                        </div>
                        <p className="mt-2">
                          <strong className="text-rose-400">La fatigue de la modération humaine :</strong> Un groupe Facebook se modère en partie via des algorithmes de signalement automatique. Sur un forum phpBB, la modération repose presque entièrement sur des humains. Trouver des bénévoles prêts à passer des heures chaque semaine à régler des conflits entre membres, à trier les sujets et à nettoyer les spams – le tout gratuitement – est devenu extrêmement difficile.
                        </p>
                        <div className="mt-3.5 p-3 rounded-lg border border-indigo-500/20 bg-indigo-950/20 text-xs text-indigo-300 font-semibold space-y-1">
                          <p className="text-xs uppercase tracking-wider font-extrabold text-indigo-200">
                            🚀 La solution de la dernière chance : la modernisation
                          </p>
                          <p className="font-normal text-[11px] leading-relaxed text-indigo-350">
                            Pour ne pas mourir, de nombreux forums historiques font le choix douloureux mais nécessaire de migrer leur base de données vers des moteurs de forums modernes de nouvelle génération comme Discourse ou Flarum. Ces outils reprennent la logique du forum (la structure, l'indexation Google) mais y injectent une interface ultra-moderne, un défilement infini, des notifications instantanées et une ergonomie pensée pour le smartphone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
