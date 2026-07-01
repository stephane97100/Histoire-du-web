/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TimelineView from './components/TimelineView';
import HistoryOfTheWebView from './components/HistoryOfTheWebView';
import HistoryProtocolsBrowsers from './components/HistoryProtocolsBrowsers';
import LegacyCodeChallenge from './components/LegacyCodeChallenge';
import GlossaryView from './components/GlossaryView';
import QuizView from './components/QuizView';
import RetroSimulator from './components/RetroSimulator';
import CemeteryView from './components/CemeteryView';
import ModernTechView from './components/ModernTechView';
import WebRevolutionsView from './components/WebRevolutionsView';
import ChatHistoryView from './components/ChatHistoryView';
import AdultFinancingHistoryView from './components/AdultFinancingHistoryView';
import WebmasterEvolution from './components/WebmasterEvolution';
import VbscriptJsDuel from './components/VbscriptJsDuel';
import CleanCodeView from './components/CleanCodeView';
import SoundCabinetView from './components/SoundCabinetView';
import W3cVersioner from './components/W3cVersioner';
import TorrentHistoryView from './components/TorrentHistoryView';
import EasterEggsView from './components/EasterEggsView';
import FranceContributionsView from './components/FranceContributionsView';
import WebPhilosophyView from './components/WebPhilosophyView';
import OutsideCodeView from './components/OutsideCodeView';
import PageRendererSimulator from './components/PageRendererSimulator';
import CaseStudiesView from './components/CaseStudiesView';
import { playWin95Startup, playModemDialup } from './lib/audioSynth';
import OfflineEbookModal from './components/OfflineEbookModal';
import { timelineEvents } from './data/timelineData';
import { 
  History, 
  BookOpen, 
  ShieldAlert, 
  PenTool, 
  BadgeHelp, 
  Compass, 
  Settings, 
  Code2,
  Terminal as TermIcon, 
  Sparkles,
  Layers,
  Heart,
  Volume2,
  VolumeX,
  FileDown,
  Radio,
  Skull,
  Users,
  Folder,
  Zap,
  MessageSquare,
  PhoneCall,
  Download,
  Gift,
  Globe,
  Sun,
  Moon,
  Palette,
  Monitor,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type AppTab = 'timeline' | 'history_of_the_web' | 'protocols' | 'glossary' | 'duel' | 'legacy_challenge' | 'sandbox' | 'quiz' | 'cemetery' | 'webmaster_evolution' | 'clean_code' | 'soundboard' | 'w3c_versioner' | 'modern_tech' | 'france_contributions' | 'web_revolutions' | 'tchat_with_me' | 'pour_adultes' | 'torrent' | 'easter_eggs' | 'web_philosophy' | 'outside_code' | 'page_renderer' | 'case_studies';
type ThemeMode = 'modern' | 'ie6' | 'terminal';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('timeline');
  const [themeMode, setThemeMode] = useState<ThemeMode>('modern');
  const [readingFilter, setReadingFilter] = useState<'none' | 'sepia' | 'dim'>('none');
  const [soundMode, setSoundMode] = useState<'muted' | 'modem' | 'win95'>(
    () => (localStorage.getItem('web_history_retro_sound') as any) || 'muted'
  );
  const [isEbookModalOpen, setIsEbookModalOpen] = useState(false);

  // Interaction-triggered starting sound effect
  useEffect(() => {
    if (soundMode === 'muted') return;

    let hasPlayed = false;
    const playStartupOnUserFirstAction = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      if (soundMode === 'win95') {
        playWin95Startup();
      } else if (soundMode === 'modem') {
        playModemDialup();
      }

      // Safe immediate removal of the triggers
      window.removeEventListener('click', playStartupOnUserFirstAction);
      window.removeEventListener('keydown', playStartupOnUserFirstAction);
      window.removeEventListener('touchstart', playStartupOnUserFirstAction);
    };

    window.addEventListener('click', playStartupOnUserFirstAction);
    window.addEventListener('keydown', playStartupOnUserFirstAction);
    window.addEventListener('touchstart', playStartupOnUserFirstAction);

    return () => {
      window.removeEventListener('click', playStartupOnUserFirstAction);
      window.removeEventListener('keydown', playStartupOnUserFirstAction);
      window.removeEventListener('touchstart', playStartupOnUserFirstAction);
    };
  }, [soundMode]);

  const handleSoundModeChange = (mode: 'muted' | 'modem' | 'win95') => {
    setSoundMode(mode);
    localStorage.setItem('web_history_retro_sound', mode);
    if (mode === 'win95') {
      playWin95Startup();
    } else if (mode === 'modem') {
      playModemDialup();
    }
  };

  // Universal CSS theme injector styles
  const getThemeVars = () => {
    switch (themeMode) {
      case 'ie6':
        return {
          wrapperClass: 'bg-[#5a7edc] text-black font-sans min-h-screen p-4 md:p-6',
          containerClass: 'bg-[#d4d0c8] text-black border-2 border-white max-w-7xl mx-auto rounded-none shadow-[2px_2px_15px_rgba(0,0,0,0.4)]',
          headerClass: 'bg-[#000080] text-white px-4 py-2 border-b border-slate-300 font-bold font-sans flex flex-col md:flex-row md:items-center justify-between',
          sidebarClass: 'bg-[#d4d0c8] border-r-2 border-[#808080] p-4 text-black font-sans shrink-0',
          activeTabClass: 'text-black font-bold border-transparent rounded-none',
          inactiveTabClass: 'bg-[#d4d0c8]/20 text-black border-2 border-outset border-white rounded-none hover:bg-[#c0c0c0]',
          cardClass: 'bg-[#c0c0c0] border-2 border-white p-6 shadow-[1px_1px_0px_white_inset]',
          titleFont: 'font-sans font-extrabold text-blue-900',
          logoClass: 'text-xl font-black font-serif italic text-white tracking-wider flex items-center gap-1'
        };
      case 'terminal':
        return {
          wrapperClass: 'bg-[#050505] text-[#ffb000] font-mono min-h-screen p-4 md:p-6 relative overflow-hidden scanlines',
          containerClass: 'bg-[#0a0a0a] text-[#ffb000] border border-[#ffb000]/60 max-w-7xl mx-auto rounded-none shadow-[0_0_20px_rgba(255,176,0,0.15)]',
          headerClass: 'bg-black border-b border-[#ffb000]/40 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between font-mono',
          sidebarClass: 'bg-[#050505] border-r border-[#ffb000]/30 p-4 font-mono shrink-0',
          activeTabClass: 'text-[#ffb000] font-black border-transparent rounded-none shadow-[0_0_8px_rgba(255,176,0,0.3)]',
          inactiveTabClass: 'text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#ffb000]/5 border border-transparent rounded-none',
          cardClass: 'bg-[#080808] border border-[#ffb000]/20 p-6',
          titleFont: 'font-mono text-xl font-bold tracking-tight text-[#ffb000] uppercase',
          logoClass: 'text-lg font-bold font-mono tracking-widest text-[#ffb000] flex items-center gap-1.5'
        };
      default: // Modern - Geometric Balance Design Theme
        return {
          wrapperClass: 'bg-[#0a0a0c] text-[#e0e0e0] font-sans min-h-screen p-4 md:p-6 flex flex-col justify-between transition-all',
          containerClass: 'bg-[#0c0c0e] border border-[#2a2a2e] max-w-7xl mx-auto w-full rounded-xl shadow-2xl overflow-hidden flex-1 flex flex-col justify-between',
          headerClass: 'bg-[#111114] px-6 py-4 border-b border-[#2a2a2e] flex flex-col md:flex-row md:items-center justify-between gap-4',
          sidebarClass: 'bg-[#111114] border-r border-[#2a2a2e] p-5 shrink-0',
          activeTabClass: 'text-[#367bf0] font-bold border-transparent shadow-[#3b82f6]/5',
          inactiveTabClass: 'text-[#8a8a93] hover:text-white hover:bg-[#1a1a1e] border-transparent',
          cardClass: 'bg-[#111114] border border-[#2a2a2e] p-5 rounded-xl text-slate-100',
          titleFont: 'font-sans text-xl font-light tracking-tight text-[#e0e0e0]',
          logoClass: 'text-base font-bold text-white flex items-center gap-2'
        };
    }
  };

  const style = getThemeVars();

  const navGroups = [
    {
      label: 'Frise Chronologique',
      icon: Compass,
      items: ['timeline', 'protocols', 'history_of_the_web', 'web_philosophy']
    },
    {
      label: 'Simulateurs & Normes',
      icon: Monitor,
      items: ['page_renderer', 'w3c_versioner']
    },
    {
      label: 'Comparateur de Code',
      icon: ShieldAlert,
      items: ['duel', 'case_studies', 'webmaster_evolution']
    },
    {
      label: 'Révolutions & Tech',
      icon: Zap,
      items: ['web_revolutions', 'modern_tech', 'clean_code', 'w3c_versioner']
    },
    {
      label: 'Réseau & Outils',
      icon: Download,
      items: ['torrent', 'outside_code']
    },
    {
      label: 'Développement',
      icon: Code2,
      items: ['duel', 'legacy_challenge', 'sandbox', 'page_renderer', 'glossary']
    },
    {
      label: 'Communauté',
      icon: Users,
      items: ['quiz', 'cemetery', 'soundboard', 'easter_eggs', 'tchat_with_me']
    },
    {
      label: 'Divers',
      icon: Settings,
      items: ['pour_adultes', 'france_contributions']
    }
  ];

  const navItems = [
    { id: 'timeline', label: 'Chronologie & Versions', description: 'Du HTML1 au CSS3', icon: Compass },
    { id: 'history_of_the_web', label: 'Histoire du Web', description: 'WWW, Protocoles, Navigateurs', icon: Globe },
    { id: 'web_revolutions', label: "Les Révolutions du Web", description: 'Flash, AJAX, CSS3, WebSockets...', icon: Zap },
    { id: 'torrent', label: 'Le Torrent & P2P', description: 'Histoire, Hadopi, sanctions...', icon: Download },
    { id: 'protocols', label: 'Histoire & Protocoles', description: 'DNS, HTTP & Navigateurs', icon: History },
    { id: 'w3c_versioner', label: 'Spécifications W3C', description: 'Évolution du code et rendu', icon: Layers },
    { id: 'clean_code', label: 'On code proprement', description: "L'art du rangement (Années 1999/2004)", icon: Folder },
    { id: 'glossary', label: 'Glossaire des Balises', description: 'Lexique et bac à sable de code', icon: BookOpen },
    { id: 'soundboard', label: 'Cabinet Acoustique', description: 'Sons mythiques d\'époque', icon: Volume2 },
    { id: 'cemetery', label: 'Le Cimetière du Web', description: 'Les reliques oubliées du réseau', icon: Skull },
    { id: 'modern_tech', label: "Technologies d'Aujourd'hui", description: 'PHP/Symfony, React, TS, Python...', icon: Sparkles },
    { id: 'tchat_with_me', label: "T'chat with me", description: 'MSN, Skype, Caramail, ICQ...', icon: MessageSquare },
    { id: 'pour_adultes', label: 'Section "Pour adultes"', description: 'Minitel rose, Audiotel, Dialers...', icon: PhoneCall },
    { id: 'webmaster_evolution', label: 'Le Webmaster (2000 - Présent)', description: 'Évolution et spécialisation du métier', icon: Users },
    { id: 'duel', label: 'Duel JScript VS VBScript', description: 'La guerre des scripts clients', icon: ShieldAlert },
    { id: 'legacy_challenge', label: 'Défi Code Legacy', description: 'Testez vos compétences legacy', icon: Code2 },
    { id: 'sandbox', label: 'Création Landing Page', description: 'Éditeur rétro < 500 lignes', icon: PenTool },
    { id: 'quiz', label: 'Quiz d\'Histoire du Code', description: 'Testez vos connaissances', icon: BadgeHelp },
    { id: 'easter_eggs', label: 'Cabinet des Secrets', description: 'Easter Eggs & blagues d\'époque', icon: Gift },
    { id: 'france_contributions', label: "L'apport de la France au Web", description: 'CYCLADES, Minitel, Freebox, Docker...', icon: Globe },
    { id: 'web_philosophy', label: 'Philosophie du Web 2000', description: 'Idéal du gratuit, faillites, e-commerce...', icon: BookOpen },
    { id: 'outside_code', label: "En dehors du code", description: "Design, Marketing, SEO & Rédacteur", icon: Palette },
    { id: 'page_renderer', label: 'Simulateur de Rendu', description: 'Simulez Netscape / IE6', icon: Monitor },
    { id: 'case_studies', label: 'Études de Cas : Code', description: 'Avant vs Après (HTML/CSS)', icon: Layers },
  ] as const;

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={themeMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={style.wrapperClass} 
        id="app-wrapper"
        style={{
          filter: (
            readingFilter === 'sepia' 
              ? 'sepia(0.62) contrast(0.96) saturate(0.85) brightness(0.95)' 
              : readingFilter === 'dim' 
              ? 'brightness(0.76) contrast(0.95) saturate(0.9)' 
              : ''
          ) || 'none',
          transition: 'filter 0.35s ease'
        }}
      >
      {/* Immersive CRT Grid Overlay pattern for amber terminal */}
      {themeMode === 'terminal' && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,176,0,0.06)_0%,transparent_80%)] z-50 mix-blend-screen" />
      )}

      <div className={style.containerClass} id="app-container">
        
        {/* Header toolbar */}
        <header className={style.headerClass} id="app-header">
          <div className="flex items-center gap-3">
            <span className={style.logoClass}>
              <div className={`w-8 h-8 rounded flex items-center justify-center font-bold shrink-0 shadow-md ${
                themeMode === 'modern' ? 'bg-[#3b82f6] text-black' : 
                themeMode === 'terminal' ? 'bg-[#ffb000] text-black' : 'bg-white text-[#000080]'
              }`}>
                <TermIcon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm tracking-tight md:text-base">MÉMOIRE DU WEB & DESIGN RÉTRO</span>
            </span>
          </div>

          {/* Controls Bar Row */}
          <div className="flex flex-wrap items-center gap-3 self-start">
            
            {/* Reading Eye Comfort Filter Controller */}
            <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-750 text-xs font-mono font-bold">
              <span className="text-[10px] uppercase font-bold text-slate-450 mr-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-400" /> Œil-Sain/Lecture :
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setReadingFilter('none')}
                  id="btn-eye-none"
                  className={`px-2 py-0.5 text-[9px] font-semibold border rounded-lg transition-all ${
                    readingFilter === 'none'
                      ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40 font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setReadingFilter('sepia')}
                  id="btn-eye-sepia"
                  className={`px-2 py-0.5 text-[9px] font-semibold border rounded-lg transition-all ${
                    readingFilter === 'sepia'
                      ? 'bg-amber-900/35 text-amber-300 border-amber-600/40 font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  Sépia chaud
                </button>
                <button
                  onClick={() => setReadingFilter('dim')}
                  id="btn-eye-dim"
                  className={`px-2 py-0.5 text-[9px] font-semibold border rounded-lg transition-all ${
                    readingFilter === 'dim'
                      ? 'bg-indigo-950/35 text-indigo-300 border-indigo-700/40 font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  Tamisé (Nuit)
                </button>
              </div>
            </div>

            {/* Theme custom selector controllers */}
            <div className="flex items-center gap-2.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-750 text-xs font-mono font-bold">
              <span className="text-[10px] uppercase font-bold text-slate-450 mr-1.5 flex items-center gap-1">
                <Settings className="w-3" /> Époque UI :
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setThemeMode('modern')}
                  id="btn-theme-modern"
                  className={`px-2 py-1 text-[10px] font-semibold border ${
                    themeMode === 'modern'
                      ? 'bg-indigo-600 text-white border-indigo-500 rounded font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  Slate 2026
                </button>
                <button
                  onClick={() => setThemeMode('ie6')}
                  id="btn-theme-ie6"
                  className={`px-2 py-1 text-[10px] font-semibold border ${
                    themeMode === 'ie6'
                      ? 'bg-blue-600 text-white border-blue-500 rounded font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  Win95/Netscape
                </button>
                <button
                  onClick={() => setThemeMode('terminal')}
                  id="btn-theme-terminal"
                  className={`px-2 py-1 text-[10px] font-semibold border ${
                    themeMode === 'terminal'
                      ? 'bg-amber-600 text-black border-amber-500 rounded font-black'
                      : 'text-slate-450 border-transparent hover:text-slate-200'
                  }`}
                >
                  CRT Terminal
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* Mid section: Nav & Component render */}
        <div className="flex flex-col min-h-[580px] flex-1">
          
          {/* Navigation drawer as top horizontal bar */}
          <aside className={`${style.sidebarClass} !border-r-0 !border-b !p-4 w-full`} id="app-sidebar">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-slate-500 block">
                  -- MENU PRINCIPAL DU SÉLECTEUR MUSÉE (↔ Défilement Horizontal) --
                </span>
                <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">{navItems.length} Sections interactives</span>
              </div>

              <nav className="flex items-center gap-2 flex-wrap pb-2">
                {navGroups.map((group) => {
                  const Icon = group.icon;
                  const isGroupActive = group.items.includes(activeTab);
                  return (
                    <div className="relative" key={group.label}>
                      <motion.button
                        whileHover={{ x: 3, y: -1, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                        className={`px-4 py-2 border rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 z-0 text-left ${
                          isGroupActive ? style.activeTabClass : style.inactiveTabClass
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[11px] font-bold tracking-tight">{group.label}</span>
                        {openGroup === group.label ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </motion.button>

                      {openGroup === group.label && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-slate-900 border border-slate-700 rounded-xl z-[100] shadow-2xl flex flex-col gap-1 min-w-[200px]">
                          {group.items.map(itemId => {
                             const item = navItems.find(i => i.id === itemId);
                             if (!item) return null;
                             return (
                               <motion.button 
                                 whileHover={{ x: 3 }}
                                 transition={{ type: 'spring', stiffness: 300 }}
                                 key={item.id}
                                 onClick={(e) => { e.stopPropagation(); setActiveTab(item.id); setOpenGroup(null); }}
                                 className={`px-3 py-2 text-xs text-left rounded-lg transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                               >
                                 {item.label}
                               </motion.button>
                             );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Active view component display panel */}
          <main className="w-full p-6 overflow-y-auto scrollbar-thin flex flex-col justify-between flex-1" id="app-view-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-between"
              >
                {activeTab === 'timeline' && <TimelineView theme={themeMode} />}
                {activeTab === 'history_of_the_web' && <HistoryOfTheWebView theme={themeMode} />}
                {activeTab === 'web_revolutions' && <WebRevolutionsView theme={themeMode} />}
                {activeTab === 'torrent' && <TorrentHistoryView theme={themeMode} />}
                {activeTab === 'protocols' && <HistoryProtocolsBrowsers theme={themeMode} />}
                {activeTab === 'w3c_versioner' && <W3cVersioner theme={themeMode} />}
                {activeTab === 'clean_code' && <CleanCodeView theme={themeMode} />}
                {activeTab === 'glossary' && <GlossaryView theme={themeMode} />}
                {activeTab === 'soundboard' && <SoundCabinetView theme={themeMode} />}
                {activeTab === 'cemetery' && <CemeteryView theme={themeMode} />}
                {activeTab === 'modern_tech' && <ModernTechView theme={themeMode} />}
                {activeTab === 'tchat_with_me' && <ChatHistoryView theme={themeMode} />}
                {activeTab === 'pour_adultes' && <AdultFinancingHistoryView theme={themeMode} />}
                {activeTab === 'webmaster_evolution' && <WebmasterEvolution theme={themeMode} />}
                {activeTab === 'duel' && <VbscriptJsDuel theme={themeMode} />}
                {activeTab === 'legacy_challenge' && <LegacyCodeChallenge theme={themeMode} />}
                {activeTab === 'sandbox' && <RetroSimulator theme={themeMode} />}
                {activeTab === 'quiz' && <QuizView theme={themeMode} />}
                {activeTab === 'easter_eggs' && <EasterEggsView theme={themeMode} />}
                {activeTab === 'france_contributions' && <FranceContributionsView theme={themeMode} />}
                {activeTab === 'web_philosophy' && <WebPhilosophyView theme={themeMode} />}
                {activeTab === 'outside_code' && <OutsideCodeView theme={themeMode} />}
                {activeTab === 'page_renderer' && <PageRendererSimulator theme={themeMode} />}
                {activeTab === 'case_studies' && <CaseStudiesView theme={themeMode} />}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>

      </div>

      {/* Footer copyright and controllers */}
      <footer className="py-6 border-t border-[#2a2a2e]/30 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 select-none px-4 font-mono text-[10px] text-slate-400" id="app-footer">
        
        {/* Left Option: Offline booklet compiler */}
        <button
          onClick={() => setIsEbookModalOpen(true)}
          className={`px-3 py-1.5 border transition cursor-pointer flex items-center gap-1.5 focus:outline-none ${
            themeMode === 'ie6'
              ? 'bg-[#d4d0c8] text-black border-2 border-outset border-white font-bold active:border-inset'
              : themeMode === 'terminal'
              ? 'border-[#ffb000]/60 text-[#ffb000] hover:bg-[#ffb000]/10'
              : 'border-[#2a2a2e] hover:border-indigo-500/40 bg-[#111114]/40 hover:bg-[#111114] text-slate-350 hover:text-white rounded-lg'
          }`}
          id="btn-footer-open-guide-compiler"
        >
          <FileDown className="w-3.5 h-3.5 text-indigo-405 shrink-0" />
          <span>📖 Compiler Guide d'Études PDF/HTML</span>
        </button>

        {/* Center: copyright text */}
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span>© 1989 - 2026 Musée interactif du Développement Web</span>
          <span className="flex items-center gap-1 text-slate-500">
            Façonné pour l'éducation informatique <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
          </span>
        </div>

        {/* Right Option: Startup sound preset selector */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1">
            🔊 Éveil Sonore :
          </span>
          <div className="flex gap-1 bg-slate-950/40 p-1 border border-slate-750/50 rounded-lg">
            
            {/* Muted option */}
            <button
              onClick={() => handleSoundModeChange('muted')}
              title="Désactiver le son d'origine"
              className={`p-1 px-1.5 rounded text-[9px] font-bold border cursor-pointer ${
                soundMode === 'muted'
                  ? 'bg-red-500/15 border-red-500/35 text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-350'
              }`}
            >
              <VolumeX className="w-3 h-3 inline-block mr-1" /> Muté
            </button>

            {/* Windows 95 option */}
            <button
              onClick={() => handleSoundModeChange('win95')}
              title="Activer la musique de démarrage Windows 95"
              className={`p-1 px-1.5 rounded text-[9px] font-bold border cursor-pointer ${
                soundMode === 'win95'
                  ? 'bg-blue-500/15 border-blue-500/35 text-blue-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-350'
              }`}
            >
              <Radio className="w-3 h-3 inline-block mr-1 text-sky-400" /> Win95
            </button>

            {/* 56k Modem option */}
            <button
              onClick={() => handleSoundModeChange('modem')}
              title="Activer le chant du modem 56k analogique"
              className={`p-1 px-1.5 rounded text-[9px] font-bold border cursor-pointer ${
                soundMode === 'modem'
                  ? 'bg-amber-500/15 border-amber-500/35 text-amber-500 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-350'
              }`}
            >
              <Volume2 className="w-3 h-3 inline-block mr-1 text-amber-500" /> Modem
            </button>

          </div>
        </div>

      </footer>

      {/* Compiler Dialog Modal Overlay */}
      <AnimatePresence>
        {isEbookModalOpen && (
          <OfflineEbookModal
            theme={themeMode}
            isOpen={isEbookModalOpen}
            onClose={() => setIsEbookModalOpen(false)}
          />
        )}
      </AnimatePresence>
      </motion.div>
      </AnimatePresence>
    );
  }
