/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Clipboard, 
  FileCode2, 
  Terminal, 
  AlertTriangle, 
  Monitor, 
  HelpCircle, 
  LayoutGrid, 
  Sparkles, 
  Check, 
  RotateCcw,
  BookOpen,
  Info,
  Layers,
  Cpu,
  Image
} from 'lucide-react';

interface RetroSimulatorProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface RetroAsset {
  id: string;
  name: string;
  type: 'badge' | 'texture';
  url: string;
  snippet: string;
}

const retroAssetsList: RetroAsset[] = [
  {
    id: 'under_construction_bar',
    name: 'Barre Chantier',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/UnderCo.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/d/db/UnderCo.gif" alt="Travaux en cours" border="0" />'
  },
  {
    id: 'under_construction_dog',
    name: 'Chantier Chien',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Under_construction.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Under_construction.gif" alt="Attention Travaux" border="0" />'
  },
  {
    id: 'dancing_baby',
    name: 'Bébé qui Danse',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Dancing_baby_3d-retro.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Dancing_baby_3d-retro.gif" alt="Baby Dance" border="0" />'
  },
  {
    id: 'netscape_badge',
    name: 'Netscape Now!',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Netscape_now.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Netscape_now.gif" alt="Netscape Now!" border="0" />'
  },
  {
    id: 'ie_badge',
    name: 'IE Now!',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Ie_now_95.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ie_now_95.gif" alt="Internet Explorer 4.0" border="0" />'
  },
  {
    id: 'animated_smiley',
    name: 'Smiley 3D Animé',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Pop-eyed_smiley_face_animated.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Pop-eyed_smiley_face_animated.gif" alt="Retro Smiley" border="0" />'
  },
  {
    id: 'email_letter',
    name: 'Lettre Volante',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Animated_Email_Letter.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Animated_Email_Letter.gif" alt="Contact" border="0" />'
  },
  {
    id: 'torch_flame',
    name: 'Torche Flamme',
    type: 'badge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Animated_fire.gif',
    snippet: '<img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Animated_fire.gif" alt="Flamme rétro" border="0" />'
  },
  {
    id: 'tile_win95',
    name: 'Fond Métal Win95',
    type: 'texture',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23c0c0c0"/><rect width="1" height="16" fill="%23ffffff"/><rect width="16" height="1" fill="%23ffffff"/><rect x="15" width="1" height="16" fill="%23808080"/><rect y="15" width="16" height="1" fill="%23808080"/></svg>',
    snippet: 'background="data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'16\' height=\'16\' fill=\'%23c0c0c0\'/><rect width=\'1\' height=\'16\' fill=\'%23ffffff\'/><rect width=\'16\' height=\'1\' fill=\'%23ffffff\'/><rect x=\'15\' width=\'1\' height=\'16\' fill=\'%23808080\'/><rect y=\'15\' width=\'16\' height=\'1\' fill=\'%23808080\'/></svg>"'
  },
  {
    id: 'tile_stars',
    name: 'Espace Étoilé',
    type: 'texture',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23000000"/><circle cx="5" cy="5" r="1" fill="%23ffffff" opacity="0.5"/><circle cx="20" cy="18" r="1" fill="%23ffffff" opacity="0.8"/><circle cx="28" cy="8" r="1.5" fill="%23ffff00" opacity="0.9"/><circle cx="12" cy="28" r="0.8" fill="%23ffffff" opacity="0.4"/></svg>',
    snippet: 'background="data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><rect width=\'32\' height=\'32\' fill=\'%23000000\'/><circle cx=\'5\' cy=\'5\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.5\'/><circle cx=\'20\' cy=\'18\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.8\'/><circle cx=\'28\' cy=\'8\' r=\'1.5\' fill=\'%23ffff00\' opacity=\'0.9\'/><circle cx=\'12\' cy=\'28\' r=\'0.8\' fill=\'%23ffffff\' opacity=\'0.4\'/></svg>"'
  },
  {
    id: 'tile_grid',
    name: 'Grille Cyber',
    type: 'texture',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23110022"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23ff00ff" stroke-width="0.5" opacity="0.3"/></svg>',
    snippet: 'background="data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><rect width=\'40\' height=\'40\' fill=\'%23110022\'/><path d=\'M 40 0 L 0 0 0... 40\' fill=\'none\' stroke=\'%23ff00ff\' stroke-width=\'0.5\' opacity=\'0.3\'/></svg>"'
  }
];

const structures = [
  { id: 'centered', label: 'Colonne Centrée', desc: 'Structure classique unifiée et alignée au centre.' },
  { id: 'split', label: 'Double Colonne / Hero', desc: 'Asymétrie moderne avec contenu à gauche et illustration à droite.' },
  { id: 'bento', label: 'Bento Grid', desc: 'Compartiments géométriques ordonnés (CSS Grid d\'époque).' },
  { id: 'card_list', label: 'Z-Layout (Alternatif)', desc: 'Mise en page alternée parfaite pour du bimodal synchrone.' }
];

const stylePresets = [
  { id: 'slate_emerald', label: 'Slate & Emerald', bg: '#0f172a', border: '#334155', accent: '#10b981', text: 'Gris ardoise d\'ingénieur, accents de vert émeraude fluide' },
  { id: 'cyber_amber', label: 'Cyberpunk Amber', bg: '#000000', border: '#f59e0b', accent: '#fbbf24', text: 'Châssis noir profond, grilles d\'ambre électrique et néon' },
  { id: 'brutalist', label: 'Brutaliste Ink', bg: '#ffffff', border: '#000000', accent: '#000000', text: 'Contrastes intraitables noir/blanc, bordures épaisses' },
  { id: 'mono_ice', label: 'Gris Arctique', bg: '#f8fafc', border: '#cbd5e1', accent: '#3b82f6', text: 'Minimalisme givré, gris polaire aérien et azur délicat' }
];

const htmlVersions = [
  { id: 'html1', label: 'HTML 1.0 (1991)', spec: 'Physique de CERN', desc: 'Texte hypertexte brut de base, aucun support d\'images ou de styles.' },
  { id: 'html2', label: 'HTML 2.0 (1995)', spec: 'Standard RFC 1866', desc: 'Support initial de la balise <img> et des formulaires simples.' },
  { id: 'html3', label: 'HTML 3.2 (1997)', spec: 'W3C Standard', desc: 'Apparition des attributs de couleur, des balises <font>, <center> et des tables.' },
  { id: 'html4', label: 'HTML 4.01 (1999)', spec: 'Transitional / Strict', desc: 'Séparation structurelle, introduction de <style> et d\'identifiants de classe.' },
  { id: 'html5', label: 'HTML5 (2026)', spec: 'Sémantique Moderne', desc: 'Balises spécialisées : <header>, <main>, <article>, <footer>.' }
];

const cssVersions = [
  { id: 'none', label: 'Sans CSS', period: '1991-1995', desc: 'Rendu brut géré par l\'environnement ou attributs HTML de base.' },
  { id: 'css1', label: 'CSS 1.0 (1996)', period: 'Style en ligne / Simple', desc: 'Couleurs de base, polices système et marges rudimentaires.' },
  { id: 'css2', label: 'CSS 2.1 (2004)', period: 'Box-Model & Floats', desc: 'Mise en page par flottements (float), hauteur fixe, double bordures.' },
  { id: 'css3', label: 'CSS 3.0 (2026)', period: 'Flexbox & Variables', desc: 'Feuilles réactives, variables natives (:root), coins arrondis et dégradés.' }
];

export default function RetroSimulator({ theme }: RetroSimulatorProps) {
  // Config state
  const [selectedStructure, setSelectedStructure] = useState<string>('centered');
  const [selectedStylePreset, setSelectedStylePreset] = useState<string>('slate_emerald');
  const [selectedHtmlVer, setSelectedHtmlVer] = useState<string>('html5');
  const [selectedCssVer, setSelectedCssVer] = useState<string>('css3');
  const [selectedImgStyle, setSelectedImgStyle] = useState<string>('unsplash');

  // Code editor text state
  const [code, setCode] = useState<string>('');
  const [browserFrame, setBrowserFrame] = useState<'netscape' | 'ie6' | 'chrome'>('chrome');
  const [copied, setCopied] = useState<boolean>(false);

  // Caret control for retro assets insertion
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [insertSuccess, setInsertSuccess] = useState<string | null>(null);

  const handleInsertAsset = (snippet: string, name: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + snippet + code.substring(end);
      setCode(newCode);
      setInsertSuccess(name);
      setTimeout(() => setInsertSuccess(null), 2000);
      
      // Keep selection on and focus on textarea
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + snippet.length);
      }, 50);
    } else {
      setCode(prev => {
        if (prev.toLowerCase().includes('<body>')) {
          return prev.replace(/<body>/i, `<body>\n  ${snippet}`);
        }
        return prev + "\n" + snippet;
      });
      setInsertSuccess(name);
      setTimeout(() => setInsertSuccess(null), 2000);
    }
  };

  // Auto layout generation trigger when options change
  useEffect(() => {
    const generated = generateLandingCode(selectedStructure, selectedStylePreset, selectedHtmlVer, selectedCssVer, selectedImgStyle);
    setCode(generated);
  }, [selectedStructure, selectedStylePreset, selectedHtmlVer, selectedCssVer, selectedImgStyle]);

  // Line count calculations
  const linesArray = code.split('\n');
  const lineCount = linesArray.length;

  // Real-time historical retro warnings
  const getRetroWarnings = () => {
    const warnings: { id: string; message: string; severity: 'warning' | 'info' | 'error' }[] = [];
    
    const codeLower = code.toLowerCase();
    const hasCenter = codeLower.includes('<center');
    const hasFont = codeLower.includes('<font');
    const hasTable = codeLower.includes('<table') || codeLower.includes('<tr') || codeLower.includes('<td');
    const hasCssVars = codeLower.includes(':root') || codeLower.includes('var(--');
    const hasFlexOrGrid = codeLower.includes('display: flex') || codeLower.includes('display: grid') || codeLower.includes('grid-template');
    const hasSemicTags = codeLower.includes('<header') || codeLower.includes('<main') || codeLower.includes('<footer') || codeLower.includes('<article') || codeLower.includes('<nav');
    const hasBlink = codeLower.includes('<blink');
    const hasMarquee = codeLower.includes('<marquee');
    const hasImg = codeLower.includes('<img');

    // Advanced CSS properties checks for 1990/early-2000 engines
    const hasBorderRadius = codeLower.includes('border-radius');
    const hasBoxShadow = codeLower.includes('box-shadow');
    const hasGrad = codeLower.includes('gradient');
    const hasTransition = codeLower.includes('transition');

    // center tag compatibility warning (highly prominent as requested)
    if (hasCenter) {
      warnings.push({
        id: 'h5-center',
        message: "Attention, cette balise <center> n'est pas conforme aux standards HTML5 (elle a été dépréciée par le W3C au profit de styles à caler en CSS).",
        severity: 'warning'
      });
    }

    if (hasFont) {
      warnings.push({
        id: 'h5-font',
        message: "Attention, la balise <font> n'est pas conforme aux standards HTML5 (déconseillée au profit des propriétés CSS d'évolution).",
        severity: 'warning'
      });
    }

    if (browserFrame === 'netscape') {
      if (selectedCssVer !== 'none') {
        warnings.push({
          id: 'ns-css',
          message: 'Ce style CSS ne sera pas interprété de manière stable par Netscape Navigator 4 ou antérieur (le support CSS y est particulièrement partiel).',
          severity: 'error'
        });
      }
      if (hasCssVars || hasBorderRadius || hasBoxShadow || hasGrad || hasTransition) {
        warnings.push({
          id: 'ns-unsupported-css',
          message: 'Attention : Les propriétés CSS avancées (border-radius, box-shadow, dégradés, transitions ou variables) ne seront jamais interprétées par Netscape Navigator 4 ni inférieurs.',
          severity: 'error'
        });
      }
      if (hasFlexOrGrid) {
        warnings.push({
          id: 'ns-flex',
          message: 'Netscape ne gère ni Flexbox ni Grid. Votre bento ou mise en page s\'affichera entièrement empilé à plat.',
          severity: 'error'
        });
      }
      if (hasSemicTags) {
        warnings.push({
          id: 'ns-sem',
          message: 'Netscape 3.0 ignore les balises sémantiques (<header>, <main>, <nav>). Elles se comportent comme de simples conteneurs inconnus.',
          severity: 'warning'
        });
      }
      if (hasTable && codeLower.includes('border="0"')) {
        warnings.push({
          id: 'ns-table-spacer',
          message: 'Astuce : L\'astuce des tableaux de mise en page sans bordure fonctionne parfaitement sous Netscape ! N\'oubliez pas vos spacer.gif d\'époque.',
          severity: 'info'
        });
      }
    }

    if (browserFrame === 'ie6') {
      if (hasCssVars) {
        warnings.push({
          id: 'ie-vars',
          message: 'Internet Explorer 6.0 ignore superbement les variables CSS (:root ou var()). Déclarez des hexadécimaux bruts.',
          severity: 'error'
        });
      }
      if (hasBorderRadius || hasBoxShadow || hasGrad) {
        warnings.push({
          id: 'ie-modern-styles',
          message: 'Attention : Les coins arrondis (border-radius) et les ombres (box-shadow) ne seront pas interprétés par Internet Explorer 6.',
          severity: 'warning'
        });
      }
      if (hasFlexOrGrid) {
        warnings.push({
          id: 'ie-layout-flex',
          message: 'Internet Explorer 6 ne gère ni Flexbox ni Grid. Seul le positionnement absolu ou les flottements (float) débloqueront de véritables colonnes d\'époque.',
          severity: 'error'
        });
      }
      if (hasSemicTags) {
        warnings.push({
          id: 'ie-semic',
          message: 'Les nouveaux éléments sémantiques <header>, <main> ne ne sont pas stylisables par défaut sous IE6 sans injection JS.',
          severity: 'warning'
        });
      }
      if (hasBlink) {
        warnings.push({
          id: 'ie-blink',
          message: 'La balise <blink> est une hérésie de Netscape ; Internet Explorer v6 n\'en a cure et affichera le texte de manière static.',
          severity: 'info'
        });
      }
    }

    if (selectedHtmlVer === 'html5') {
      if (hasMarquee || hasBlink) {
        warnings.push({
          id: 'h5-deprecated',
          message: 'Infographie : Les balises d\'époque clignotantes <blink> et défilantes <marquee> sont proscrites des normes HTML5 modernes.',
          severity: 'warning'
        });
      }
    }

    if (selectedHtmlVer === 'html1') {
      if (hasImg) {
        warnings.push({
          id: 'h1-img',
          message: 'Anachronisme : La balise d\'intégration d\'images <img> n\'est pas supportée en HTML 1.0 (introduite en 1993/1995 plus tard).',
          severity: 'error'
        });
      }
      if (selectedCssVer !== 'none') {
        warnings.push({
          id: 'h1-css-forbidden',
          message: 'Le CSS n\'existait pas en 1991 (HTML 1.0). Seuls les textes bruts et les liens hypertextes bleus sont affichables.',
          severity: 'error'
        });
      }
    }

    if (selectedHtmlVer === 'html2') {
      if (selectedCssVer !== 'none') {
        warnings.push({
          id: 'h2-css-early',
          message: 'En HTML 2.0 (1995), le modèle CSS1 est encore à l\'état de brouillon de recherche W3C.',
          severity: 'warning'
        });
      }
    }

    if (selectedHtmlVer === 'html3' && selectedCssVer === 'css3') {
      warnings.push({
        id: 'h3-css3',
        message: 'Anachronisme : Associer le HTML 3.2 (1997) avec du responsive CSS3 (2011/2026) est temporellement incohérent.',
        severity: 'warning'
      });
    }

    return warnings;
  };

  // Analysis of HTML/CSS temporal consistency
  const getTemporalDiagnostic = () => {
    const htmlYear = selectedHtmlVer === 'html1' ? 1991 : selectedHtmlVer === 'html2' ? 1995 : selectedHtmlVer === 'html3' ? 1997 : selectedHtmlVer === 'html4' ? 1999 : 2026;
    const cssYear = selectedCssVer === 'none' ? 1991 : selectedCssVer === 'css1' ? 1996 : selectedCssVer === 'css2' ? 2004 : 2026;

    if (selectedHtmlVer === 'html1' && selectedCssVer !== 'none') {
      return {
        status: 'anachronism',
        title: 'Anachronisme Majeur !',
        color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
        desc: 'En 1991 (HTML 1.0), CSS n\'existait absolument pas. Le navigateur ignore les styles pour afficher du texte brut et des liens.'
      };
    }
    if (selectedHtmlVer === 'html2' && selectedCssVer !== 'none') {
      return {
        status: 'anachronism',
        title: 'Anachronisme Chronologique',
        color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
        desc: 'Même si HTML 2.0 (1995) standardise l\'intégration d\'images, l\'usage de feuilles de style reste anecdotique avant CSS 1.0 en décembre 1996.'
      };
    }
    if (selectedCssVer === 'css3' && selectedHtmlVer === 'html3') {
      return {
        status: 'warning',
        title: 'Association Asynchrone',
        color: 'text-blue-405 border-blue-500/20 bg-blue-500/5',
        desc: 'Vous injectez des variables et des flexbox modernes de CSS3 dans un document HTML 3.2. C\'est fonctionnel aujourd\'hui, mais impossible en 1997.'
      };
    }
    if (selectedHtmlVer === 'html5' && selectedCssVer === 'none') {
      return {
        status: 'suboptimal',
        title: 'Sémantique Nue',
        color: 'text-slate-400 border-slate-700 bg-slate-900/40',
        desc: 'La structure HTML5 est parfaite, mais l\'absence totale de feuille de style ramène la landing page à un état textuel d\'époque.'
      };
    }
    return {
      status: 'perfect',
      title: 'Cohérence Historique Réussie',
      color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5',
      desc: 'Le couplage technologique choisi respecte scrupuleusement l\'évolution du dictionnaire du W3C. Le code est d\'une concision remarquable.'
    };
  };

  const diagnostic = getTemporalDiagnostic();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `landing_${selectedHtmlVer}_${selectedCssVer}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetToPredefined = () => {
    // Reset back to HTML5 + CSS3 Bento slate
    setSelectedStructure('centered');
    setSelectedStylePreset('slate_emerald');
    setSelectedHtmlVer('html5');
    setSelectedCssVer('css3');
    setSelectedImgStyle('unsplash');
  };

  // HTML frame generator for previews
  const renderSimulatedFrameSource = () => {
    // If lines exceed 500 pages, alert the user but keep preview trimmed to 500 lines for conciseness limit
    const trimmed = linesArray.slice(0, 500).join('\n');
    return { __html: trimmed };
  };

  return (
    <div className="space-y-6" id="retro-simulator-expanded">
      
      {/* Educational Header Banner aligned with Geometric Balance style */}
      <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#3b82f6]/10 text-[#3b82f6] rounded-xl border border-[#3b82f6]/20">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-light tracking-tight text-white">
                Générateur de Landing Pages Historiques&nbsp;
                <span className="font-bold text-[#3b82f6] text-xs px-2 py-0.5 bg-[#3b82f6]/10 rounded border border-[#3b82f6]/20 ml-2">
                  CONCISE &lt; 500 l.
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-3xl">
                Configurez une structure sémantique et un style minimaliste. Observez comment l'ingénierie du code permettait d'accomplir une esthétique soignée avec une empreinte extrêmement faible (moins de 500 lignes de pur code HTML/CSS brut combiné).
              </p>
            </div>
          </div>
          <button
            onClick={handleResetToPredefined}
            className="px-3 py-1.5 bg-[#1a1a1e] hover:bg-[#252529] border border-[#2a2a2e] text-xs rounded text-gray-400 hover:text-white transition flex items-center gap-1.5 self-start cursor-pointer font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
          </button>
        </div>

        {/* Temporal Diagnostic Banner */}
        <div className={`p-4 rounded-lg border flex items-start gap-3 text-xs leading-relaxed ${diagnostic.color}`}>
          {diagnostic.status === 'perfect' ? (
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div>
            <strong className="font-mono text-[10px] uppercase tracking-wider block mb-0.5 text-white">{diagnostic.title}</strong>
            <span className="opacity-90">{diagnostic.desc}</span>
          </div>
        </div>
      </div>

      {/* Grid: 1. Controls Panel (Desktop Left / Fullwidth) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Settings Mixer (span 5) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Controls Card */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-5 space-y-5">
            <span className="text-[10px] font-mono font-black text-[#3b82f6] uppercase tracking-widest block border-b border-[#2a2a2e] pb-2">
              -- Paramètres de la Landing Page --
            </span>

            {/* 1. Predefined Structure Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#3b82f6]" /> 1. Structure Prédéfinie :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {structures.map((struct) => (
                  <button
                    key={struct.id}
                    onClick={() => setSelectedStructure(struct.id)}
                    className={`p-2.5 rounded text-left border transition text-xs cursor-pointer ${
                      selectedStructure === struct.id
                        ? 'bg-[#1a1a1e] border-[#3b82f6] text-white'
                        : 'bg-[#0d0d11]/60 border-[#2a2a2e] text-gray-400 hover:bg-[#111114] hover:text-gray-200'
                    }`}
                  >
                    <span className="font-bold block text-[11px] mb-0.5">{struct.label}</span>
                    <span className="text-[9px] opacity-70 block leading-tight">{struct.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Minimalist Style Preset */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" /> 2. Palette & Ambiance CSS :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedStylePreset(preset.id)}
                    className={`p-2.5 rounded text-left border transition text-xs cursor-pointer ${
                      selectedStylePreset === preset.id
                        ? 'bg-[#1a1a1e] border-[#3b82f6] text-white'
                        : 'bg-[#0d0d11]/60 border-[#2a2a2e] text-gray-400 hover:bg-[#111114] hover:text-gray-200'
                    }`}
                  >
                    <span className="font-bold block text-[11px] items-center gap-1.5 flex mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.accent }} />
                      {preset.label}
                    </span>
                    <span className="text-[9px] opacity-70 block leading-tight">{preset.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2.5. Image Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5 font-mono">
                <Image className="w-3.5 h-3.5 text-[#3b82f6]" /> Template d'Illustration Rétro :
              </label>
              <select
                value={selectedImgStyle}
                onChange={(e) => setSelectedImgStyle(e.target.value)}
                className="w-full bg-[#0d0d11]/80 hover:bg-[#0d0d11] text-gray-300 rounded border border-[#2a2a2e] px-3 py-2 text-xs focus:outline-none focus:border-[#3b82f6] cursor-pointer font-sans"
              >
                <option value="unsplash">✨ Illustrations Minimalistes Unsplash HD</option>
                <option value="construction">🚧 Badge Animé "Under Construction" d'Époque (GIF)</option>
                <option value="vintage_pc">🖥️ Ordinateur CRT Vintage Cathodique (SVG)</option>
                <option value="animated_smiley">😊 Smiley 3D Rétro Jaune Souriant (SVG)</option>
                <option value="dancing_baby">💾 Disquettes de Collection Atari Pixel-Art (PNG)</option>
                <option value="netscape_logo">🌐 Logo Officiel Netscape Navigator</option>
              </select>
            </div>

            {/* 3. HTML Version Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#3b82f6]" /> 3. Version d'HTML Historique :
              </label>
              <div className="flex flex-col gap-1.5 bg-[#0d0d11] p-2 rounded border border-[#2a2a2e]">
                {htmlVersions.map((hVer) => (
                  <button
                    key={hVer.id}
                    onClick={() => setSelectedHtmlVer(hVer.id)}
                    className={`px-3 py-2 rounded text-left flex justify-between items-center transition text-xs cursor-pointer ${
                      selectedHtmlVer === hVer.id
                        ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-bold border border-[#3b82f6]/30'
                        : 'text-gray-400 hover:text-gray-200 border border-transparent'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[11px]">{hVer.label}</span>
                      <span className="text-[9px] opacity-75 block mt-0.5">{hVer.desc}</span>
                    </div>
                    <span className="text-[9px] bg-[#1a1a1e] px-1.5 py-0.5 rounded text-gray-500 font-mono">
                      {hVer.spec}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. CSS Version Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-[#3b82f6]" /> 4. Version du CSS d'Époque :
              </label>
              <div className="flex flex-col gap-1.5 bg-[#0d0d11] p-2 rounded border border-[#2a2a2e]">
                {cssVersions.map((cVer) => {
                  const isDisabled = selectedHtmlVer === 'html1' || selectedHtmlVer === 'html2';
                  return (
                    <button
                      key={cVer.id}
                      disabled={isDisabled}
                      onClick={() => setSelectedCssVer(cVer.id)}
                      className={`px-3 py-2 rounded text-left flex justify-between items-center transition text-xs ${
                        isDisabled 
                          ? 'opacity-40 cursor-not-allowed'
                          : selectedCssVer === cVer.id
                            ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-bold border border-[#3b82f6]/30'
                            : 'text-gray-400 hover:text-gray-200 border border-transparent cursor-pointer'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[11px]">{cVer.label}</span>
                        <span className="text-[9px] opacity-75 block mt-0.5">{cVer.desc}</span>
                      </div>
                      <span className="text-[9px] bg-[#1a1a1e] px-1.5 py-0.5 rounded text-gray-500 font-mono">
                        {cVer.period}
                      </span>
                    </button>
                  );
                })}
              </div>
              { (selectedHtmlVer === 'html1' || selectedHtmlVer === 'html2') && (
                <span className="text-[10px] text-amber-500 block leading-tight mt-1 font-mono">
                  ⚠️ Bloqué sur 'Sans CSS' car le CSS n'a pas encore été formalisé par le W3C à cette époque !
                </span>
              )}
            </div>

          </div>

          {/* Retro Asset Library Card */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-5 space-y-4">
            <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block border-b border-[#2a2a2e] pb-2">
              -- 🎨 Bibliothèque d'Assets Rétros --
            </span>
            <p className="text-[10.5px] text-gray-400">
              Cliquez sur un asset pour l'insérer directement à la position du curseur dans votre code <code className="text-gray-300 font-mono">index.html</code>.
            </p>

            {insertSuccess && (
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 font-mono text-[10px] flex items-center justify-between">
                <span>Inséré : <strong>{insertSuccess}</strong> !</span>
                <span className="text-[9px] opacity-75 animate-bounce">OK</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Category (Badges & Gif Animated) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">
                  🚧 GIFs animés & Badges :
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {retroAssetsList.filter(a => a.type === 'badge').map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleInsertAsset(asset.snippet, asset.name)}
                      className="bg-[#0d0d11] hover:bg-[#1a1a24] border border-[#2a2a2e] hover:border-amber-500/50 rounded p-1.5 flex flex-col items-center justify-between transition cursor-pointer group text-center min-h-[70px]"
                      title={`Insérer ${asset.name}`}
                    >
                      <div className="w-full flex-1 flex items-center justify-center overflow-hidden mb-1">
                        <img 
                          src={asset.url} 
                          alt={asset.name} 
                          className="max-h-[30px] max-w-[45px] object-contain group-hover:scale-110 transition duration-155" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[8px] text-gray-450 group-hover:text-amber-400 transition leading-none truncate max-w-full">
                        {asset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category (Textures de Fond tile) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">
                  🧱 Textures de Fond :
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {retroAssetsList.filter(a => a.type === 'texture').map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleInsertAsset(asset.snippet, asset.name)}
                      className="bg-[#0d0d11] hover:bg-[#1a1a24] border border-[#2a2a2e] hover:border-amber-500/50 rounded p-2 flex items-center gap-2 transition cursor-pointer group text-left"
                      title={`Insérer l'attribut de fond ${asset.name}`}
                    >
                      <div 
                        className="w-7 h-7 rounded border border-gray-700 shrink-0 select-none bg-repeat" 
                        style={{ backgroundImage: `url("${asset.url}")`, backgroundSize: 'contain' }}
                      />
                      <div className="overflow-hidden leading-tight">
                        <span className="text-[9px] font-bold text-gray-300 block group-hover:text-amber-400 transition truncate">
                          {asset.name}
                        </span>
                        <span className="text-[7.5px] text-gray-505 block">
                          Tiling fond
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a1e] p-2 rounded text-[9.5px] text-gray-500 leading-tight">
              <strong>💡 Astuce :</strong> Placez votre curseur avant la fermeture du crochet d'une balise comme <code className="text-gray-300">&lt;body</code> de votre code, puis cliquez sur une texture pour l'appliquer !
            </div>
          </div>

          {/* Quick Copy & Export Action Card */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-gray-400 block font-medium">Récupérer ou Exporter le Code</span>
              <span className="text-[10px] text-emerald-400/80 font-mono">Autonome, optimisé &amp; concis &lt; 500 lignes</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleCopyCode}
                id="copy-code-direct"
                className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-black font-bold uppercase tracking-wider rounded text-[10px] transition cursor-pointer flex items-center gap-1.5"
              >
                <Clipboard className="w-3.5 h-3.5" />
                {copied ? 'Copié !' : 'Copier'}
              </button>
              <button
                onClick={handleDownloadCode}
                id="download-code-direct"
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold uppercase tracking-wider rounded text-[10px] transition cursor-pointer flex items-center gap-1.5"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Browser Render Sandbox (span 7) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          
          {/* Top Code view card */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl overflow-hidden flex flex-col min-h-[280px]">
            <div className="bg-[#1a1a1e] px-4 py-2.5 border-b border-[#2a2a2e] flex justify-between items-center text-xs">
              <span className="font-mono text-gray-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#3b82f6]" /> index.html
              </span>
              <div className="flex items-center gap-2 font-mono">
                {lineCount > 500 ? (
                  <span className="px-2 py-0.5 bg-red-955 text-red-400 border border-red-500/25 rounded font-bold text-[10px] animate-pulse flex items-center gap-1">
                    <AlertTriangle className="w-3" /> {lineCount}/500 l. (Limite dépassée)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold text-[10px]">
                    {lineCount} / 500 lignes
                  </span>
                )}
              </div>
            </div>

            {/* Editable textarea area */}
            <div className="bg-[#0a0a0c] p-1 flex-1 relative flex">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Le code html de la landing page s'affiche ici, vous pouvez le modifier librement..."
                className="w-full bg-transparent resize-none p-4 font-mono text-[11px] text-emerald-400/90 leading-relaxed focus:outline-none min-h-[220px] outline-none scrollbar-thin overflow-y-auto"
              />
            </div>
            <div className="bg-[#1a1a1e] px-4 py-1.5 border-t border-[#2a2a2e] text-[9px] text-gray-500 font-mono">
              Le code se régénère à chaque modification des options du panneau de contrôle ou peut être personnalisé à la main.
            </div>
          </div>

          {/* Browser simulation panel */}
          <div className="space-y-3">
            <div className="bg-[#111114] p-1.5 border border-[#2a2a2e] rounded-xl flex justify-between items-center flex-wrap gap-2 text-xs">
              <span className="font-bold text-gray-400 ml-2 font-mono flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-[#3b82f6]" /> Moteur de rendu :
              </span>
              <div className="flex gap-1 bg-[#0a0a0c] p-1 rounded border border-[#2a2a2e]">
                <button
                  onClick={() => setBrowserFrame('netscape')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded transition cursor-pointer ${
                    browserFrame === 'netscape'
                      ? 'bg-[#1a1a1e] text-orange-400 border border-[#2a2a2e] font-black'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Netscape 3.0 (1996)
                </button>
                <button
                  onClick={() => setBrowserFrame('ie6')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded transition cursor-pointer ${
                    browserFrame === 'ie6'
                      ? 'bg-[#1a1a1e] text-blue-400 border border-[#2a2a2e] font-black'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  IE 6.0 (2001)
                </button>
                <button
                  onClick={() => setBrowserFrame('chrome')}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded transition cursor-pointer ${
                    browserFrame === 'chrome'
                      ? 'bg-[#1a1a1e] text-[#3b82f6] border border-[#2a2a2e] font-black'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Chrome v125 (Moderne)
                </button>
              </div>
            </div>

            {/* Simulated frame renderer */}
            <div className="min-h-[440px] flex flex-col flex-1">
              
              {/* NETSCAPE 3.0 Rendering view */}
              {browserFrame === 'netscape' && (
                <div
                  className="bg-[#c0c0c0] p-1 border-2 border-white text-black font-sans flex flex-col flex-1"
                  style={{
                    boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset, 2px 2px 0px #ffffff inset, -2px -2px 0px #000000 inset'
                  }}
                >
                  {/* Netscape title strip */}
                  <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-xs select-none">
                    <span>Netscape Navigator - [Mise en Page Rétro]</span>
                    <div className="flex gap-1">
                      <button className="w-4 h-4 bg-[#c0c0c0] text-black border border-white text-[9px] font-bold leading-none select-none">_</button>
                      <button className="w-4 h-4 bg-[#c0c0c0] text-black border border-white text-[9px] font-bold leading-none select-none">X</button>
                    </div>
                  </div>

                  {/* Netscape buttons */}
                  <div className="flex flex-wrap gap-1 px-1 py-1 border-b border-gray-400 text-[10px]">
                    {['Back', 'Forward', 'Home', 'Reload', 'Images', 'Open', 'Print'].map(btn => (
                      <button
                        key={btn}
                        className="px-2 py-0.5 bg-[#c0c0c0] border border-white font-bold text-[9px]"
                        style={{ boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset' }}
                      >
                        {btn}
                      </button>
                    ))}
                    <div className="bg-[#c0c0c5] px-1.5 font-bold font-serif text-xs border border-dashed border-[#808080] italic text-red-700 animate-pulse ml-auto leading-none select-none flex items-center">
                      N
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-1 border-b border-[#808080] text-[10px] flex items-center gap-1.5 select-none font-mono">
                    <span>Netsite:</span>
                    <input
                      type="text"
                      readOnly
                      value="http://localhost:1996/my-landing-page.html"
                      className="flex-1 bg-white border border-slate-500 px-1 py-0.5 text-[10px] font-sans h-5 text-black outline-none"
                    />
                  </div>

                  {/* Normalized Netscape view forcing raw styles */}
                  <div className="bg-[#d3d3d3] text-black p-4 flex-1 overflow-y-auto font-serif min-h-[300px] border-2 border-inset border-[#808080]">
                    <style dangerouslySetInnerHTML={{ __html: `
                      #netscape-raw-box h1, #netscape-raw-box h2, #netscape-raw-box h3 { font-family: serif !important; font-weight: bold; color: black !important; background: none !important; border:none !important; }
                      #netscape-raw-box p, #netscape-raw-box a, #netscape-raw-box td { font-family: serif !important; color: black !important; background: none !important; }
                      #netscape-raw-box div, #netscape-raw-box main, #netscape-raw-box article, #netscape-raw-box header { background: none !important; border: none !important; border-radius: 0 !important; color: black !important; padding: 0 !important; margin: 0 !important; width: auto !important; max-width: none !important; box-shadow: none !important; display: block !important; }
                      #netscape-raw-box img { max-width: 250px !important; height: auto !important; border: 2px solid black !important; }
                      #netscape-raw-box button { background: #c0c0c0 !important; color: black !important; border: 2px outset white !important; padding: 2px 6px !important; }
                    `}} />
                    <div id="netscape-raw-box" dangerouslySetInnerHTML={renderSimulatedFrameSource()} />
                  </div>
                </div>
              )}

              {/* IE 6.0 Rendering view */}
              {browserFrame === 'ie6' && (
                <div
                  className="bg-[#d4d0c8] p-1 text-black font-sans flex flex-col flex-1"
                  style={{
                    boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset, 1.5px 1.5px 0px #ffffff inset, -1.5px -1.5px 0px #404040 inset'
                  }}
                >
                  <div
                    className="px-2 py-1 flex justify-between items-center font-bold text-xs select-none text-white rounded-t-sm"
                    style={{
                      background: 'linear-gradient(to right, #0055e5 0%, #00a4fc 100%)'
                    }}
                  >
                    <span className="italic">Internet Explorer 6.0 - Windows XP Edition</span>
                    <div className="flex gap-1">
                      <button className="w-4 h-4 bg-[#c0c0c0] text-black text-[9px] font-bold leading-none">_</button>
                      <button className="w-4 h-4 bg-red-600 text-white text-[9px] font-bold border border-white">X</button>
                    </div>
                  </div>

                  <div className="px-2 py-0.5 text-[10px] text-gray-800 border-b border-gray-400 select-none">
                    Fichier &nbsp; Édition &nbsp; Affichage &nbsp; Favoris &nbsp; Outils &nbsp; ?
                  </div>

                  <div className="p-1 border-b border-gray-300 text-[10px] flex items-center gap-1.5 select-none font-mono">
                    <span>Adresse:</span>
                    <input
                      type="text"
                      readOnly
                      value="C:\\MyDocuments\\WebArchive\\landing.htm"
                      className="flex-1 bg-white border border-slate-400 px-1 py-0.5 text-[11px] font-sans h-5 text-black"
                    />
                    <span className="text-[#000080] font-sans font-bold cursor-pointer px-1">OK</span>
                  </div>

                  <div className="bg-[#ffffff] text-black p-4 flex-1 overflow-y-auto font-sans min-h-[300px] border border-slate-400">
                    <style dangerouslySetInnerHTML={{ __html: `
                      #ie6-box h1, #ie6-box h2, #ie6-box h3 { font-family: "MS Sans Serif", Arial, sans-serif !important; }
                      #ie6-box img { max-width: 320px !important; height: auto !important; }
                      #ie6-box { font-family: "MS Sans Serif", Arial, sans-serif !important; }
                    `}} />
                    <div id="ie6-box" dangerouslySetInnerHTML={renderSimulatedFrameSource()} />
                  </div>
                </div>
              )}

              {/* CHROME v125 (Modern rendering) */}
              {browserFrame === 'chrome' && (
                <div className="bg-slate-900 border border-[#2a2a2e] rounded-xl flex flex-col flex-1 overflow-hidden shadow-2xl">
                  <div className="bg-slate-950 px-4 py-2 border-b border-[#2a2a2e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      </div>
                      <span className="bg-slate-900 px-4 py-1.5 rounded-t-lg border-t border-x border-[#2a2a2e] text-[10px] font-mono text-[#3b82f6] font-bold ml-4 flex items-center gap-1.5">
                        <BookOpen className="w-3" /> sandbox_test.html
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900 px-3 py-1.5 border-b border-[#2a2a2e] flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-mono">http://localhost:3000/my-landing-page</span>
                  </div>

                  {/* Render view directly */}
                  <div className="bg-white text-black p-6 flex-1 overflow-y-auto min-h-[300px] font-sans">
                    <div dangerouslySetInnerHTML={renderSimulatedFrameSource()} />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Debugger real-time compatibility warnings list */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl overflow-hidden flex flex-col shadow-lg">
            <div className="bg-[#1a1a1e] px-4 py-2.5 border-b border-[#2a2a2e] flex justify-between items-center text-xs font-mono select-none">
              <span className="text-gray-300 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" /> Débogueur Historique en Temps Réel
              </span>
              <span className="text-[10px] bg-[#2a2a2e] text-gray-400 px-2 py-0.5 rounded-full">
                {getRetroWarnings().length} avis
              </span>
            </div>
            
            <div className="p-4 space-y-2 max-h-[180px] overflow-y-auto scrollbar-thin">
              {getRetroWarnings().length === 0 ? (
                <div className="text-xs text-gray-500 italic py-2 text-center flex items-center justify-center gap-1.5 font-mono">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Aucun anachronisme ni warning de compatibilité détecté pour cette configuration !
                </div>
              ) : (
                getRetroWarnings().map((warn, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded border text-xs flex gap-2.5 items-start ${
                      warn.severity === 'error'
                        ? 'bg-red-500/5 border-red-500/20 text-red-300'
                        : warn.severity === 'warning'
                          ? 'bg-amber-500/5 border-amber-500/20 text-amber-300'
                          : 'bg-blue-500/5 border-blue-500/25 text-blue-300'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-black/40 rounded shrink-0 font-bold leading-none align-middle mt-0.5 select-none">
                      {warn.severity === 'error' ? 'ÉCHEC' : warn.severity === 'warning' ? 'WARN' : 'INFO'}
                    </span>
                    <span className="leading-relaxed font-sans">{warn.message}</span>
                  </div>
                ))
              )}
            </div>
            <div className="bg-[#1a1a1e] px-4 py-1.5 border-t border-[#2a2a2e] text-[9px] text-gray-500 font-mono">
              Ce système d'analyse statique valide l'intégration par rapport aux bogues réels des navigateurs d'époque.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

/**
 * HISTORICAL LANDING PAGE CODE GENERATOR (HTML 1.0 to 5.0 + CSS 1.0 to 3.0)
 * Respects strict limits of < 500 lines total, and mimics real specifications.
 */
function generateLandingCode(structure: string, stylePreset: string, html: string, css: string, imgStyle: string = 'unsplash') {
  let palette = {
    bg: '#ffffff',
    text: '#111827',
    primary: '#3b82f6',
    border: '#cbd5e1',
    surface: '#f8fafc',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&fit=crop&q=80',
    btnText: '#ffffff'
  };

  if (stylePreset === 'slate_emerald') {
    palette = {
      bg: '#0f172a',
      text: '#cbd5e1',
      primary: '#10b981',
      border: '#334155',
      surface: '#1e293b',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&fit=crop&q=80',
      btnText: '#0f172a'
    };
  } else if (stylePreset === 'cyber_amber') {
    palette = {
      bg: '#000000',
      text: '#fbbf24',
      primary: '#f97316',
      border: '#fbbf24',
      surface: '#111111',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&fit=crop&q=80',
      btnText: '#000000'
    };
  } else if (stylePreset === 'brutalist') {
    palette = {
      bg: '#ffffff',
      text: '#000000',
      primary: '#000000',
      border: '#000000',
      surface: '#ffffff',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&fit=crop&q=80',
      btnText: '#ffffff'
    };
  } else if (stylePreset === 'mono_ice') {
    palette = {
      bg: '#f8fafc',
      text: '#334155',
      primary: '#3b82f6',
      border: '#cbd5e1',
      surface: '#ffffff',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&fit=crop&q=80',
      btnText: '#ffffff'
    };
  }

  // Resolve target image based on user selected vintage/modern theme selector
  let resolvedImg = palette.image;
  if (imgStyle === 'construction') {
    resolvedImg = 'https://upload.wikimedia.org/wikipedia/commons/d/db/UnderCo.gif';
  } else if (imgStyle === 'vintage_pc') {
    resolvedImg = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Computer_Retro.svg';
  } else if (imgStyle === 'animated_smiley') {
    resolvedImg = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Retro_smiley_face.svg';
  } else if (imgStyle === 'dancing_baby') {
    resolvedImg = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Atari_Disketts.png'; // floppies d'époque
  } else if (imgStyle === 'netscape_logo') {
    resolvedImg = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Netscape_icon.svg';
  }
  palette.image = resolvedImg;

  const title = "Musée de l'Histoire du Web";
  const desc = "Cette application interactive vous plonge dans l'histoire passionnante du développement web et de ses révolutions technologiques. Explorez l'évolution des langages fondateurs (HTML, CSS, JavaScript) et des technologies oubliées comme VBScript, tout en découvrant l'épopée des navigateurs mythiques.<br><br><b>Aperçu des sections disponibles :</b><br>• 📅 <b>Frise Chronologique :</b> Retracez l'évolution pas à pas du HTML1 au HTML5, et du CSS1 au CSS3.<br>• 📖 <b>Glossaire & Bac à sable :</b> Un dictionnaire interactif complet des balises historiques.<br>• 🏆 <b>Quiz d'Histoire :</b> Testez vos connaissances sur les protocoles, les guerres des navigateurs et relevez le défi d'identifier des scripts en JavaScript vs VBScript !";
  const cta = "COMMENCER L'EXPLORATION";

  // HTML 1.0 logic
  if (html === 'html1') {
    return `<!-- === LANDING PAGE RETRO (HISTORIQUE HTML 1.0 - CERN 1991) === -->
<h1>${title}</h1>

<p>${desc}</p>

<p>
  Rejoignez la nouvelle frontière en accédant aux autoroutes de l'information :<br>
  <a href="#demarrer"><b>[ === ${cta} === ]</b></a>
</p>

<!-- NOTE HISTORIQUE : La norme primitive HTML 1.0 (1991) ne supporte ni l'affichage d'images distantes via IMG, ni le CSS. Seules les balises H1, P, et A sont normalisées par l'inventeur Tim Berners-Lee. -->`;
  }

  // HTML 2.0 logic
  if (html === 'html2') {
    return `<!-- === LANDING PAGE RETRO (HISTORIQUE HTML 2.0 - 1995) === -->
<h1>${title}</h1>

<p>
  <img src="${palette.image}" alt="Aperçu du Web 1.0" width="220" height="150" />
</p>

<p>${desc}</p>

<p>
  Accéder à la formation en direct :<br>
  <a href="#action" onclick="alert('Bonjour de la part de Netscape Navigator 2.0 ! JavaScript a été inventé cette année en 1995 par Brendan Eich en seulement 10 jours sous le nom de LiveScript.'); return false;"><b>==> ${cta} <==</b></a>
</p>

<!-- EXPLICATION PEDAGOGIQUE : HTML 2.0 (RFC 1866) ajoute les formulaires et le support officiel du tag d'images IMG. JavaScript fait son apparition pour la première fois cette même année (1995) dans Netscape Navigator 2.0 ! -->`;
  }

  // HTML 3.2 logic (tables, font attributes, center, background color)
  if (html === 'html3') {
    if (css === 'none') {
      if (structure === 'split') {
        return `<!-- === LANDING DOUBLE COLONNE (STRUCTURE TABLES - HTML 3.2 - 1997) === -->
<body bgcolor="${palette.bg}" text="${palette.text}">

<center>
  <h1><font face="Arial, Helvetica" color="${palette.primary}">${title}</font></h1>
</center>

<hr size="2" color="${palette.primary}">

<table border="0" width="100%" cellspacing="5" cellpadding="8">
  <tr>
    <!-- Colonne Principale -->
    <td width="60%" valign="top">
      <font face="Arial, sans-serif" size="3">
        <p>${desc}</p>
        <p>
          <a href="#start" onclick="return demarrerDemo();"><b><font color="${palette.primary}">[ ${cta} ]</font></b></a>
        </p>
      </font>
    </td>
    
    <!-- Colonne Illustration -->
    <td width="40%" align="center" valign="middle">
      <img src="${palette.image}" width="180" height="130" border="3" alt="Cocon de code" />
    </td>
  </tr>
</table>

<script type="text/javascript">
  function demarrerDemo() {
    alert("Interaction HTML 3.2 (1997) ! À cette époque, nous utilisions des fonctions de script simples pour animer le texte de la barre de statut ou créer de petites alertes modales.");
    return false;
  }
</script>

</body>`;
      }

      // Default centered HTML 3.2 layout
      return `<!-- === LANDING PAGE CENTRALE (STYLE ATTRIBUTS - HTML 3.2 - 1997) === -->
<body bgcolor="${palette.bg}" text="${palette.text}">

<center>
  <h1><font face="Courier New" color="${palette.primary}">${title}</font></h1>
  
  <p>
    <img src="${palette.image}" width="280" height="180" border="4" alt="Illustration" />
  </p>

  <table width="85%" border="1" cellpadding="10" bgcolor="${palette.surface}">
    <tr>
      <td>
        <font face="Arial" size="2">
          ${desc}
        </font>
      </td>
    </tr>
  </table>

  <br>
  <a href="#cta" onclick="return demarrerAction();"><b><font size="4" color="${palette.primary}">[Cliquez ici : ${cta}]</font></b></a>
</center>

<script type="text/javascript">
  function demarrerAction() {
    alert("Bonjour ! HTML 3.2 (1997) est l'époque de la standardisation de JavaScript par l'ECMA sous la norme ECMA-262 (Edition 1).");
    return false;
  }
</script>

</body>`;
    }

    // HTML3.2 with CSS1 compatibility style tag
    return `<!-- === LANDING PAGE HYBRIDE (HTML 3.2 AVEC CSS 1.0) === -->
<style>
  body { background-color: ${palette.bg}; color: ${palette.text}; font-family: sans-serif; }
  h1 { color: ${palette.primary}; text-align: center; }
  .illustration { border: 2px solid ${palette.border}; display: block; margin: 10px auto; }
</style>

<center>
  <h1>${title}</h1>
  <p><img class="illustration" src="${palette.image}" width="240" alt="Illustration code" /></p>
  <p>${desc}</p>
  <p><a href="#demo" onclick="alert('JavaScript 1.2 est actif ! En 1997, Netscape 4.0 et IE 4.0 se faisaient la guerre pour intégrer les premiers calques dynamiques DHTML.'); return false;"><b>[ === ${cta} === ]</b></a></p>
</center>`;
  }

  // HTML 4.01 logic
  if (html === 'html4') {
    const isCSS1 = css === 'css1' || css === 'none';
    const fontStyle = stylePreset === 'cyber_amber' ? 'monospace' : 'Arial, Helvetica, sans-serif';
    const borderStyle = stylePreset === 'brutalist' ? '3px solid #000' : `1px solid ${palette.border}`;

    if (isCSS1) {
      return `<!-- === LANDING PAGE CONCISE (HTML 4.01 + STYLE CSS 1.0 - 1999) === -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <title>${title}</title>
  <style type="text/css">
    body { background-color: ${palette.bg}; color: ${palette.text}; font-family: ${fontStyle}; padding: 25px; }
    h1 { color: ${palette.primary}; font-size: 26px; }
    .card-element { background-color: ${palette.surface}; border: ${borderStyle}; padding: 15px; margin-top: 15px; }
    .action-link { font-weight: bold; color: ${palette.primary}; text-decoration: underline; }
  </style>
</head>
<body>

  <h1>${title}</h1>
  
  <div class="card-element">
    <p>${desc}</p>
    <p><img src="${palette.image}" width="200" alt="Code base" style="border: 1px solid ${palette.primary};"></p>
    <p><a href="#run" id="actionBtn" class="action-link">${cta}</a></p>
  </div>

  <script type="text/javascript">
    var btn = document.getElementById("actionBtn");
    if (btn) {
      btn.onclick = function() {
        alert("DHTML d'époque 1999 ! Nous utilisons ici le DOM primitif de l'HTML 4.01 pour capturer l'événement de clic de façon externe à la balise.");
        return false;
      };
    }
  </script>

</body>
</html>`;
    }

    // CSS 2.1 Floats syntax
    return `<!-- === LANDING PAGE COLONNES (HTML 4.01 + BLOCS CSS 2.1 - 2004) === -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>${title}</title>
  <style type="text/css">
    body { background-color: ${palette.bg}; color: ${palette.text}; font-family: ${fontStyle}; padding: 30px; }
    .wrapper { width: 100%; max-width: 680px; margin: 0 auto; background-color: ${palette.surface}; border: ${borderStyle}; padding: 20px; }
    h1 { color: ${palette.primary}; font-size: 24px; margin-bottom: 15px; }
    .col-left { float: left; width: 60%; }
    .col-right { float: right; width: 35%; text-align: center; }
    .cleaner { clear: both; }
    .cta-button { display: inline-block; background-color: ${palette.primary}; color: ${palette.btnText}; font-weight: bold; padding: 10px 15px; text-decoration: none; border: 1px solid ${palette.primary}; }
  </style>
</head>
<body>

  <div class="wrapper">
    <h1>${title}</h1>
    
    <div class="col-left">
      <p>${desc}</p>
      <p style="margin-top:20px;">
        <a href="#action" id="ctaBtn" class="cta-button">${cta}</a>
      </p>
    </div>
    
    <div class="col-right">
      <img src="${palette.image}" width="100%" alt="Showcase asset">
    </div>
    
    <div class="cleaner"></div>
  </div>

  <script type="text/javascript">
    var btn = document.getElementById("ctaBtn");
    if (btn) {
      btn.onclick = function() {
        alert("Action 2004 ! C'est le début de l'ère AJAX (Asynchronous JavaScript And XML) popularisée par Gmail, permettant des échanges de données en arrière-plan sans recharger la page.");
        return false;
      };
    }
  </script>

</body>
</html>`;
  }

  // HTML5 + CSS3 Grid/Flex code blocks (Strict Sémantique HTML5)
  if (html === 'html5') {
    const isBrutalist = stylePreset === 'brutalist';
    const borderStyle = isBrutalist ? '4px solid #000000' : '1px solid var(--border)';
    const shadowStyle = isBrutalist ? '6px 6px 0px #000000' : '0 10px 25px -5px rgba(0,0,0,0.1)';
    const radiusStyle = isBrutalist ? '0px' : '12px';

    const es6Script = `
  <script>
    // Script Moderne ES6 sémantique
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.querySelector('.btn') || document.querySelector('.btn-link') || document.querySelector('.cta-btn');
      if (btn) {
        let clicks = 0;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          clicks++;
          btn.textContent = 'REÇU ! (' + clicks + ' CLIC' + (clicks > 1 ? 'S' : '') + ')';
          
          // Toast notification dynamique
          let toast = document.createElement('div');
          toast.style.position = 'fixed';
          toast.style.bottom = '20px';
          toast.style.right = '20px';
          toast.style.background = '${palette.primary}';
          toast.style.color = '${palette.btnText}';
          toast.style.padding = '12px 20px';
          toast.style.borderRadius = '8px';
          toast.style.fontFamily = 'system-ui, sans-serif';
          toast.style.fontSize = '12px';
          toast.style.fontWeight = 'bold';
          toast.style.boxShadow = '0 10px 15px rgba(0,0,0,0.3)';
          toast.style.zIndex = '99999';
          toast.textContent = 'Interactivité HTML5/CSS3 active ! ' + clicks + ' action(s) enregistrée(s).';
          
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2500);
        });
      }
    });
  </script>`;

    if (css === 'none' || css === 'css1') {
      return `<!-- === LANDING ACADÉMIQUE SÉMANTIQUE (HTML5 SANS FEUILLE COMPARTIMENTÉE) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>
<body style="background-color: ${palette.bg}; color: ${palette.text}; font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">

  <header>
    <h1 style="color: ${palette.primary}; font-size: 24px;">${title}</h1>
  </header>

  <main style="margin: 20px 0;">
    <article style="background-color: ${palette.surface}; border: 1px solid ${palette.border}; padding: 20px;">
      <p>${desc}</p>
      <p><img src="${palette.image}" width="100%" alt="Visual sémantique" style="max-height: 200px; object-fit: cover;"></p>
      <button class="btn-link" style="background: ${palette.primary}; color: ${palette.btnText}; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer;">
        ${cta}
      </button>
    </article>
  </main>

  <footer>
    <p style="font-size: 11px; opacity: 0.6;">Conçu pour le Musée d'Apprentissage du Code Web / 2026</p>
  </footer>

  ${es6Script}

</body>
</html>`;
    }

    if (css === 'css2') {
      return `<!-- === LANDING SÉMANTIQUE FLOATS (HTML5 + CSS 2.1 FLOATS) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { background-color: ${palette.bg}; color: ${palette.text}; font-family: sans-serif; line-height: 1.6; padding: 30px; }
    .box { background: ${palette.surface}; border: 1px solid ${palette.border}; width: 620px; margin: 0 auto; padding: 20px; }
    h1 { color: ${palette.primary}; font-size: 24px; margin-top: 0; }
    .left { float: left; width: 360px; }
    .right { float: right; width: 220px; text-align: center; }
    .btn { display: inline-block; background-color: ${palette.primary}; color: ${palette.btnText}; padding: 8px 16px; text-decoration: none; font-weight: bold; margin-top: 15px; }
    .clean:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
  </style>
</head>
<body>

  <main class="box clean">
    <div class="left">
      <h1>${title}</h1>
      <p>${desc}</p>
      <a href="#link" class="btn">${cta}</a>
    </div>
    
    <div class="right">
      <img src="${palette.image}" alt="Retro visual" style="width: 100%; border: 1px solid ${palette.border};">
    </div>
  </main>

  ${es6Script}

</body>
</html>`;
    }

    // Modern HTML5 + CSS3 (Peak performance < 500 lines)
    if (structure === 'bento') {
      return `<!-- === LANDING PAGE COMPARTIMENTÉE BENTO GRID (HTML5 + CSS3 VARIABLES) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    :root {
      --bg: ${palette.bg};
      --text: ${palette.text};
      --primary: ${palette.primary};
      --border: ${palette.border};
      --surface: ${palette.surface};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; padding: 30px 15px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .bento-shell { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 750px; width: 100%; }
    .card { background: var(--surface); border: ${borderStyle}; border-radius: ${radiusStyle}; padding: 22px; box-shadow: ${shadowStyle}; }
    .card-header { grid-column: span 3; border-left: 4px solid var(--primary); }
    .card-body { grid-column: span 2; display: flex; flex-direction: column; justify-content: space-between; }
    .card-img { grid-column: span 1; padding: 0; overflow: hidden; position: relative; min-height: 140px; }
    .card-img img { width: 100%; height: 100%; object-fit: cover; }
    h1 { color: var(--primary); font-size: 24px; font-weight: 800; }
    .btn { display: inline-block; background: var(--primary); color: ${palette.btnText}; padding: 10px 20px; text-decoration: none; border-radius: 99px; font-weight: bold; align-self: start; transition: transform 0.2s; cursor: pointer; }
    .btn:hover { transform: translateY(-2px); }
  </style>
</head>
<body>

  <div class="bento-shell">
    <header class="card card-header">
      <h1>${title}</h1>
      <span style="font-size: 10px; font-family: monospace; opacity: 0.6;">[HISTORICAL SHOWCASE GRID]</span>
    </header>

    <main class="card card-body">
      <p style="font-size: 13px; line-height: 1.6; opacity: 0.95;">${desc}</p>
      <p style="margin-top: 20px;"><a href="#join" class="btn">${cta}</a></p>
    </main>

    <div class="card card-img">
      <img src="${palette.image}" alt="Bento visual display" />
    </div>
  </div>

  ${es6Script}

</body>
</html>`;
    }

    if (structure === 'card_list') {
      return `<!-- === LANDING PAGE CONCISE Z-LAYOUT (HTML5 + CSS3 FLEX) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    :root {
      --bg: ${palette.bg};
      --text: ${palette.text};
      --primary: ${palette.primary};
      --border: ${palette.border};
      --surface: ${palette.surface};
    }
    body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
    .panel { max-width: 650px; width: 100%; background: var(--surface); border: ${borderStyle}; border-radius: ${radiusStyle}; padding: 24px; box-shadow: ${shadowStyle}; }
    .row { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; margin-top: 15px; }
    .content-area { flex: 1; min-width: 250px; }
    .thumbnail { width: 140px; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); }
    .cta-btn { display: inline-block; background: var(--primary); color: ${palette.btnText}; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: bold; margin-top: 15px; cursor: pointer; }
  </style>
</head>
<body>

  <div class="panel">
    <h1 style="color: var(--primary); font-size: 22px;">${title}</h1>
    
    <div class="row">
      <div class="content-area">
        <p style="font-size: 13px; line-height: 1.6;">${desc}</p>
        <a href="#cta" class="cta-btn">${cta}</a>
      </div>
      <img src="${palette.image}" alt="Z-layout mockup thumb" class="thumbnail" />
    </div>
  </div>

</body>
</html>`;
    }

    if (structure === 'split') {
      return `<!-- === LANDING PAGE DOUBLE COLONNE RÉACTIVE (HTML5 + CSS3 FLEXBOX) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    :root {
      --bg: ${palette.bg};
      --text: ${palette.text};
      --primary: ${palette.primary};
      --border: ${palette.border};
      --surface: ${palette.surface};
    }
    body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; margin: 0; padding: 40px 15px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .split-box { display: flex; flex-wrap: wrap; max-width: 720px; width: 100%; background: var(--surface); border: ${borderStyle}; border-radius: ${radiusStyle}; box-shadow: ${shadowStyle}; overflow: hidden; }
    .col-info { flex: 1.2; min-width: 300px; padding: 30px; display: flex; flex-direction: column; justify-content: center; }
    .col-visual { flex: 0.8; min-width: 240px; min-height: 240px; position: relative; }
    .col-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
    h1 { color: var(--primary); font-size: 22px; font-weight: 750; margin-bottom: 15px; }
    .btn { display: inline-block; background: var(--primary); color: ${palette.btnText}; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; align-self: flex-start; margin-top: 15px; cursor: pointer; }
  </style>
</head>
<body>

  <div class="split-box">
    <div class="col-info">
      <h1>${title}</h1>
      <p style="font-size: 13px; line-height: 1.6; opacity: 0.9;">${desc}</p>
      <a href="#discover" class="btn">${cta}</a>
    </div>
    <div class="col-visual">
      <img src="${palette.image}" alt="Mockup Visual Banner" />
    </div>
  </div>

  ${es6Script}

</body>
</html>`;
    }

    // Default centered single column
    return `<!-- === LANDING PAGE CENTRÉE CLASSIQUE (HTML5 + CSS3 ADAPTABILITÉ) === -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    :root {
      --bg: ${palette.bg};
      --text: ${palette.text};
      --primary: ${palette.primary};
      --border: ${palette.border};
      --surface: ${palette.surface};
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .container {
      background: var(--surface);
      border: ${borderStyle};
      border-radius: ${radiusStyle};
      box-shadow: ${shadowStyle};
      padding: 30px;
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    h1 {
      color: var(--primary);
      margin-bottom: 15px;
      font-size: 24px;
    }
    p {
      font-size: 13px;
      line-height: 1.7;
      margin-bottom: 20px;
      opacity: 0.9;
    }
    .thumb-img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 15px;
      border: 1px solid var(--border);
    }
    .btn-link {
      display: inline-block;
      background-color: var(--primary);
      color: ${palette.btnText};
      border: none;
      padding: 10px 24px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <main class="container">
    <h1>${title}</h1>
    
    <img src="${palette.image}" alt="Aperçu Épuré" class="thumb-img" />
    
    <p>${desc}</p>
    
    <a href="#action" class="btn-link">${cta}</a>
  </main>

  ${es6Script}

</body>
</html>`;
  }

  return ``;
}
