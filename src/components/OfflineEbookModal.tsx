/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateStudyGuideHTML } from '../utils/exportGuide';
import { FileText, Download, CheckSquare, Square, X, Printer, BookOpen, Clock, Laptop, Eye } from 'lucide-react';

interface OfflineEbookModalProps {
  theme: 'modern' | 'ie6' | 'terminal';
  isOpen: boolean;
  onClose: () => void;
}

export default function OfflineEbookModal({ theme, isOpen, onClose }: OfflineEbookModalProps) {
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeGlossary, setIncludeGlossary] = useState(true);
  const [includeQuiz, setIncludeQuiz] = useState(true);
  const [includeCompatDiagnostics, setIncludeCompatDiagnostics] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    const htmlContent = generateStudyGuideHTML({
      includeTimeline,
      includeGlossary,
      includeQuiz,
      includeCompatDiagnostics
    });

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Guide_Etude_Histoire_du_Web_${new Date().getFullYear()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 6000);
  };

  // Theme-specific styles
  const getThemeClasses = () => {
    switch (theme) {
      case 'ie6':
        return {
          overlay: "fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50",
          card: "bg-[#d4d0c8] text-black border-2 border-white max-w-lg w-full rounded-none shadow-[4px_4px_20px_rgba(0,0,0,0.5)] font-sans",
          header: "bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs select-none",
          body: "p-5 space-y-4",
          btnPrimary: "bg-[#d4d0c8] hover:bg-[#c0c0c0] border-2 border-outset border-white px-4 py-2 text-xs font-bold active:border-inset cursor-pointer flex items-center justify-center gap-2 rounded-none text-black",
          btnSecondary: "bg-[#d4d0c8] hover:bg-[#c0c0c0] border-2 border-outset border-white px-3 py-1.5 text-xs font-bold active:border-inset cursor-pointer rounded-none text-black",
          title: "text-sm text-white font-sans font-bold",
          itemCard: "bg-white border-2 border-inset border-[#808080] p-3 rounded-none text-black text-xs"
        };
      case 'terminal':
        return {
          overlay: "fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 pointer-events-auto",
          card: "bg-[#0a0a0a] text-[#ffb000] border border-[#ffb000] max-w-lg w-full rounded-none shadow-[0_0_25px_rgba(255,176,0,0.25)] font-mono",
          header: "border-b border-[#ffb000]/60 px-4 py-2 flex items-center justify-between font-bold text-xs select-none uppercase",
          body: "p-5 space-y-4",
          btnPrimary: "border border-[#ffb000] bg-[#ffb000]/10 hover:bg-[#ffb000]/20 text-[#ffb000] px-4 py-2 text-xs font-bold uppercase cursor-pointer flex items-center justify-center gap-2 rounded-none",
          btnSecondary: "border border-transparent hover:border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] px-3 py-1.5 text-xs uppercase cursor-pointer rounded-none",
          title: "text-sm text-[#ffb000] font-bold font-mono",
          itemCard: "bg-black border border-[#ffb000]/30 p-3 text-xs"
        };
      default: // Modern - Slate 2026
        return {
          overlay: "fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50",
          card: "bg-[#0c0c0e] text-[#e0e0e0] border border-[#2a2a2e] max-w-lg w-full rounded-2xl shadow-2xl font-sans overflow-hidden",
          header: "bg-[#111114] border-b border-[#2a2a2e] px-5 py-4 flex items-center justify-between",
          body: "p-6 space-y-5",
          btnPrimary: "bg-indigo-650 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10",
          btnSecondary: "bg-slate-900 border border-slate-750 text-slate-300 hover:text-white hover:bg-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition",
          title: "text-base text-slate-100 font-bold",
          itemCard: "bg-[#111114] border border-[#1e1e22] p-3 rounded-xl text-xs space-y-1"
        };
    }
  };

  const css = getThemeClasses();

  return (
    <div className={css.overlay} onClick={onClose} id="offline-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={css.card}
        onClick={(e) => e.stopPropagation()}
        id="offline-modal-card"
      >
        {/* Title Bar Header */}
        <div className={css.header}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className={css.title}>Générateur de Guide d'Études Sémantique</span>
          </div>
          <button onClick={onClose} className="p-1 hover:opacity-80 transition cursor-pointer" id="btn-close-modal">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className={css.body}>
          <p className="text-xs text-slate-400 leading-relaxed">
            Générez instantanément un compendium pédagogique clé en main. Ce dernier compile les archives chronologiques, les fiches du dictionnaire et un cahier d'exercices, prêt pour une lecture hors-ligne ou une impression physique (PDF).
          </p>

          {/* Config checkboxes */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
              Options d'assemblage du Guide :
            </span>

            {/* Config 1 */}
            <div 
              onClick={() => setIncludeTimeline(!includeTimeline)}
              className={`flex items-start gap-3 cursor-pointer select-none transition ${css.itemCard} ${includeTimeline ? 'border-indigo-500/40' : ''}`}
            >
              <div className="mt-1">
                {includeTimeline ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </div>
              <div>
                <b className="text-slate-200 block">⏱️ Archives chronologiques du Web (1989-2026)</b>
                <span className="text-[10px] text-slate-405 leading-relaxed">Inclut l'intégralité des versions du protocole HTTP, HTML, CSS et l'histoire des premiers fureteurs.</span>
              </div>
            </div>

            {/* Config 2 */}
            <div 
              onClick={() => setIncludeGlossary(!includeGlossary)}
              className={`flex items-start gap-3 cursor-pointer select-none transition ${css.itemCard} ${includeGlossary ? 'border-indigo-500/40' : ''}`}
            >
              <div className="mt-1">
                {includeGlossary ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </div>
              <div>
                <b className="text-slate-200 block">📖 Dictionnaire sémantique des balises W3C</b>
                <span className="text-[10px] text-slate-405 leading-relaxed">Ajoute le lexique complet, les codes de démonstration rétro-compatibles et les astuces de conception.</span>
              </div>
            </div>

            {/* Config 3 */}
            <div 
              onClick={() => setIncludeQuiz(!includeQuiz)}
              className={`flex items-start gap-3 cursor-pointer select-none transition ${css.itemCard} ${includeQuiz ? 'border-indigo-500/40' : ''}`}
            >
              <div className="mt-1">
                {includeQuiz ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </div>
              <div>
                <b className="text-slate-200 block">📚 Cahier d'évaluation (Quiz complet avec réponses)</b>
                <span className="text-[10px] text-slate-405 leading-relaxed">Assemble la liste des questions pédagogiques, idéale pour tester ses aptitudes sur papier ou corriger les notions.</span>
              </div>
            </div>

            {/* Config 4 */}
            <div 
              onClick={() => setIncludeCompatDiagnostics(!includeCompatDiagnostics)}
              className={`flex items-start gap-3 cursor-pointer select-none transition ${css.itemCard} ${includeCompatDiagnostics ? 'border-indigo-500/40' : ''}`}
            >
              <div className="mt-1">
                {includeCompatDiagnostics ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </div>
              <div>
                <b className="text-slate-200 block">🛡️ Recueil d'incompatibilités et Survie IE6</b>
                <span className="text-[10px] text-slate-405 leading-relaxed">Intègre les astuces de résolution de bogues comme le double-margin bug ou le décalage de "clearfix".</span>
              </div>
            </div>
          </div>

          {/* Download feedback */}
          <AnimatePresence>
            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-xl text-[11px] leading-normal font-sans space-y-1.5"
              >
                <div className="font-bold flex items-center gap-1">
                  <span>📥 Compilation et téléchargement réussis !</span>
                </div>
                <p>
                  Ouvrez simplement le fichier <b>html</b> téléchargé dans n'importe quel navigateur (même déconnecté). Pour le convertir en PDF impeccable, déclenchez la commande d'impression de votre fureteur (<b>Ctrl+P</b> ou <b>Cmd+P</b>) et choisissez "Enregistrer au format PDF" avec l'option "Inclure les graphiques d'arrière-plan" cochée.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-2.5 justify-end pt-2">
            <button
              onClick={onClose}
              className={css.btnSecondary}
              id="btn-modal-cancel"
            >
              Fermer
            </button>
            <button
              onClick={handleExport}
              disabled={!includeTimeline && !includeGlossary && !includeQuiz && !includeCompatDiagnostics}
              className={`${css.btnPrimary} ${(!includeTimeline && !includeGlossary && !includeQuiz && !includeCompatDiagnostics) ? 'opacity-50 cursor-not-allowed' : ''}`}
              id="btn-modal-generate"
            >
              <Download className="w-4 h-4" />
              <span>Générer et compiler maintenant</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
