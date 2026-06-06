/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { htmlVersionsSpecs, cssVersionsSpecs, timelineEvents } from '../data/timelineData';
import { Calendar, Cpu, Layers, Code2, AlertTriangle, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

interface TimelineViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

const eraOptions = [
  { id: 'html1', label: 'CERN 1991 (HTML 1.0)' },
  { id: 'html2', label: 'PizzaNet 1995 (HTML 2.0)' },
  { id: 'html3', label: 'Netscape 1997 (HTML 3.2)' },
  { id: 'html4', label: 'Web 2.0 2004 (CSS 2.1)' },
  { id: 'html5', label: 'Web Moderne 2026 (CSS 3.0)' }
];

const comparativeChallenges = [
  {
    id: 'center_block',
    title: 'Centrer un élément horizontalement et verticalement',
    desc: 'Un des plus célèbres mèmes de l\'histoire du web : centrer une <div> en hauteur et largeur.',
    eras: {
      html1: {
        code: `<!-- CERN 1991 : Impossible ! Sémantique linéaire pure -->
La norme HTML 1.0 n'a aucun concept de centrage vertical.
Tout s'affiche en écoulement vertical séquentiel.

<h1>Titre aligné à gauche obligatoirement</h1>`,
        explanation: 'En HTML1, le modèle est sémantique brut. Il n\'y a pas de mise en page visuelle possible.'
      },
      html2: {
        code: `<!-- HTML 2 1995 : Aucun outil d'affichage vertical -->
<!-- Utilisation d'astuces d'espaces préformatés pour simuler de la marge -->
<pre>




             Contenu approximativement centré
</pre>`,
        explanation: 'Le centrage physique n\'existait pas. Les concepteurs comblaient avec des sauts de ligne ou la balise <pre>.'
      },
      html3: {
        code: `<!-- HTML 3.2 1997 : La dictature des tableaux invisibles -->
<table border="0" width="100%" height="100%" cellspacing="0" cellpadding="0">
  <tr valign="middle">
    <td align="center">
      <!-- Centrage horizontal par td, vertical par valign -->
      <center>
        <font face="Arial" size="4">Mon Bloc Centré</font>
      </center>
    </td>
  </tr>
</table>`,
        explanation: 'L\'utilisation abusive des tableaux avec valign="middle" et align="center" était l\'unique méthode standard en 1997.'
      },
      html4: {
        code: `/* CSS 2.1 2004 : Floats et positionnement absolu */
.parent {
  position: relative;
  height: 300px;
}
.enfant {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 100px;
  /* La fameuse tragédie des marges négatives pour rattraper le flux */
  margin-top: -50px;
  margin-left: -100px;
}`,
        explanation: 'Avant Flexbox, il fallait positionner l\'élément à 50% du haut/gauche et soustraire la moitié exacte de sa taille avec des marges négatives.'
      },
      html5: {
        code: `/* CSS 3.0 / Flexbox & Grid Moderne */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* ou grid + place-items: center */
}`,
        explanation: 'Flexbox résout le problème en seulement 3 lignes de code déclaratif moderne et ultra-générique.'
      }
    }
  },
  {
    id: 'grid_layout',
    title: 'Disposition multi-colonnes / Grille de contenu',
    desc: 'Aligner du contenu sur plusieurs colonnes séparées côte à côte.',
    eras: {
      html1: {
        code: `<!-- CERN 1991 : Défilement linéaire unique -->
<h1>Colonne Unique</h1>
<p>Aucune disposition en colonnes n'existe. Tout s'accumule de haut en bas.</p>`,
        explanation: 'Le web était vu comme un document textuel continu, non comme un catalogue d\'interfaces à compartiments.'
      },
      html2: {
        code: `<!-- HTML 2 1995 : Simulation d'alignement avec <pre> -->
<pre>
Colonne Gauche             | Colonne Droite
---------------------------+---------------------------
Contenu textuel aligné     | Autre article aligné
manuellement au clavier    | au millimètre près
</pre>`,
        explanation: 'Les sauts d\'espaces manuels dans une balise monospacée restaient la seule option pour structurer du texte asymétrique.'
      },
      html3: {
        code: `<!-- HTML 3.2 1997 : Tableau Invisible de Structure -->
<table border="0" width="100%" cellspacing="0" cellpadding="10">
  <tr>
    <td width="50%" bgcolor="#EEEEEE" valign="top">
      <h2>Colonne Gauche</h2>
      <p>Contenu principal...</p>
    </td>
    <td width="50%" bgcolor="#CCCCCC" valign="top">
      <h2>Colonne Droite</h2>
      <p>Contenu secondaire d'accompagnement...</p>
    </td>
  </tr>
</table>`,
        explanation: 'Les tableaux de présentation permettaient enfin de séparer visuellement le contenu horizontalement de façon stable.'
      },
      html4: {
        code: `/* CSS 2.1 2004 : Le règne instable des flottants (float) */
.colonne {
  float: left;
  width: 48%;
  margin-right: 2%;
}
/* Le fameux hack du Clearfix pour rétablir la hauteur du conteneur parent */
.clear-parent::after {
  content: "";
  display: table;
  clear: both;
}`,
        explanation: 'Les flottants servaient à l\'origine à envelopper les images de texte. On les détournait en colonnes en ajoutant des hacks "clearing".'
      },
      html5: {
        code: `/* CSS 3.0 Grid fluide réactive */
.parent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}`,
        explanation: 'CSS Grid permet de configurer des grilles proportionnelles s\'adaptant de façon fluide à la largeur d\'écran automatiquement.'
      }
    }
  },
  {
    id: 'styling',
    title: 'Couleur de fond & Typographies',
    desc: 'Personnaliser l\'apparence graphique (polices de caractères et teintes de fonds).',
    eras: {
      html1: {
        code: `<!-- CERN 1991 : Couleur système immuable grise -->
Le navigateur décide seul.
Généralement, fond gris (#C0C0C0) et texte noir.
Aucune modification possible dans le code de la page.`,
        explanation: 'Le créateur du site n\'avait aucun contrôle sur la direction esthétique, de toute façon le web était d\'abord scientifique.'
      },
      html2: {
        code: `<!-- HTML 2 1995 : Attributs primitifs de corps -->
<body bgcolor="#000080" text="#FFFFFF" link="#FFFF00">
  <h1>Page Blanche ? Non ! En bleu cobalt d'époque.</h1>
</body>`,
        explanation: 'Les premiers attributs de style physiques du tag <body> ont permis de colorier la toile sur décision de l\'intégrateur.'
      },
      html3: {
        code: `<!-- HTML 3.2 1997 : Balise physique d'enveloppe FONT -->
<body bgcolor="#111111" text="#FFFFFF">
  <h2>
    <font face="Courier New, Courier" color="#FF0000">
      Titre sous police spéciale Rouge
    </font>
  </h2>
</body>`,
        explanation: 'Pour changer la moindre occurrence de police ou couleur de mot, il fallait ajouter la balise <font> à outrance.'
      },
      html4: {
        code: `/* CSS 2.1 2004 : Déclarations de polices système Web-Safe */
body {
  background-color: #f0f0f0;
  color: #333333;
  /* Polices de sécurité disponibles sur la majorité des machines */
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}`,
        explanation: 'Le CSS centralise la feuille de style. Mais on dépendait encore exclusivement des polices physiques préinstallées chez l\'usager.'
      },
      html5: {
        code: `/* CSS 3.0 Polices Google Webfonts & Variables Natives */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

:root {
  --theme-primary: #10b981;
}

body {
  font-family: 'Space Grotesk', sans-serif;
  color: var(--theme-primary);
}`,
        explanation: 'Le web moderne importe dynamiquement n\'importe quelle police d\'écriture et modifie ses thèmes en direct par variables CSS `:root`.'
      }
    }
  }
];

export default function TimelineView({ theme }: TimelineViewProps) {
  const [selectedHtmlId, setSelectedHtmlId] = useState<string>('html2');
  const [selectedCssId, setSelectedCssId] = useState<string>('css1');
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('center_block');
  const [eraA, setEraA] = useState<string>('html3');
  const [eraB, setEraB] = useState<string>('html5');

  // Current selected specs
  const selectedHtml = htmlVersionsSpecs.find(h => h.id === selectedHtmlId) || htmlVersionsSpecs[0];
  const selectedCss = cssVersionsSpecs.find(c => c.id === selectedCssId) || cssVersionsSpecs[0];

  const filteredEvents = timelineEvents.filter(e => {
    const categoryMatch = timelineFilter === 'all' || e.category === timelineFilter;
    
    let eraMatch = true;
    if (selectedEra === 'pioneers') {
      eraMatch = e.year >= 1991 && e.year <= 1996;
    } else if (selectedEra === 'standardization') {
      eraMatch = e.year >= 1997 && e.year <= 2004;
    } else if (selectedEra === 'modern') {
      eraMatch = e.year >= 2005 && e.year <= 2026;
    }
    
    return categoryMatch && eraMatch;
  });

  // Era simulation rendering styles helper
  const getSimulatedStyle = () => {
    if (selectedHtmlId === 'html1') {
      return {
        backgroundColor: '#c0c0c0',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif',
        lineHeight: '1.2',
        padding: '16px',
        border: '3px inset #808080',
      };
    }
    if (selectedHtmlId === 'html2' && selectedCssId === 'none') {
      return {
        backgroundColor: '#d3d3d3',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif',
        padding: '16px',
        border: '4px outset #ffffff',
      };
    }
    if (selectedHtmlId === 'html3' && selectedCssId === 'css1') {
      return {
        backgroundColor: '#000080',
        color: '#ffff00',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        padding: '16px',
        border: '4px solid #ff0000',
      };
    }
    if (selectedHtmlId === 'html4' && selectedCssId === 'css2') {
      return {
        backgroundColor: '#f8fafc',
        color: '#334155',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        border: '1px solid #cbd5e1',
        maxWidth: '100%',
      };
    }
    // HTML5 + CSS3 (Modern fallback)
    return {
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #3b82f6',
      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)',
    };
  };

  // Safe retro preview markup generator
  const getSimulatedDemoMarkup = () => {
    if (selectedHtmlId === 'html1') {
      return (
        <div style={getSimulatedStyle()}>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Document Hypertexte (1993)</h1>
          <p>Ceci est l'affichage brut sous HTML 1.0. Il n'existe pas encore de feuille de style CSS pour modifier les couleurs ou l'espacement.</p>
          <ul>
            <li>Pas d'images intégrées</li>
            <li>Police par défaut imposée par le système</li>
            <li><a href="#" style={{ color: '#0000ee', textDecoration: 'underline' }}>Lien hypertexte bleu originel</a></li>
          </ul>
        </div>
      );
    }
    if (selectedHtmlId === 'html2') {
      return (
        <div style={getSimulatedStyle()}>
          <h1 style={{ fontSize: '1.8em', margin: '10px 0' }}>Bienvenue sur la Toile v2 (1995)</h1>
          <p>Le web intègre déjà des formulaires et des images!</p>
          <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
            <div style={{ padding: '10px', background: '#808080', color: 'white', border: '2px inset #ffffff', fontSize: '0.9em' }}>
              [Image PizzaNet Logo]
            </div>
            <div>
              <p>Nom: <input type="text" defaultValue="Abonné 56k" disabled style={{ background: '#ffffff', color: '#000000', border: '1px solid #000000' }} /></p>
              <button disabled style={{ background: '#c0c0c0', border: '2px outset #ffffff', padding: '1px 6px', cursor: 'not-allowed' }}>Soumettre</button>
            </div>
          </div>
        </div>
      );
    }
    if (selectedHtmlId === 'html3') {
      return (
        <div style={getSimulatedStyle()}>
          <center>
            <h1 style={{ fontSize: '24px', margin: '5px' }}>🌟 SITE RETRO 1997 🌟</h1>
            <div style={{ background: '#ff0000', color: '#ffffff', padding: '2px', fontWeight: 'bold' }}>
              [CLIGNOTANT] Bienvenue sur les autoroutes de l'information !
            </div>
          </center>
          <table border={1} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', borderColor: '#ff0000' }}>
            <tbody>
              <tr>
                <td style={{ width: '30%', padding: '5px', verticalAlign: 'top', background: '#808080', color: '#000' }}>
                  <b>Menu principal</b><br />
                  - <a href="#" style={{ color: '#ffff00' }}>Accueil</a><br />
                  - <a href="#" style={{ color: '#ffff00' }}>Email Me</a>
                </td>
                <td style={{ padding: '10px', background: '#000000', color: '#00ff00', fontFamily: 'monospace' }}>
                  <h2>Contenu Web 3.2</h2>
                  <p>Mise en page complexe élaborée grâce à de grands tableaux HTML déguisés.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (selectedHtmlId === 'html4') {
      return (
        <div style={getSimulatedStyle()}>
          <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '8px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '20px', color: '#1e3a8a', fontWeight: 'bold' }}>Société Web 2.0 (Années 2000)</h1>
          </div>
          <p>Mise en page contrôlée avec une feuille de style externe CSS 2.1.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', marginTop: '10px' }}>
            <div style={{ background: '#cbd5e1', padding: '10px', fontSize: '13px' }}>
              <ul style={{ listStyleType: 'square', paddingLeft: '15px' }}>
                <li>Mise en page Divs</li>
                <li>CSS séparée</li>
                <li>Polices Web-Safe</li>
              </ul>
            </div>
            <div>
              <p>Nous utilisons des attributs sémantiques combinés à des propriétés de positionnement absolu pour échapper à la dictature des tableaux.</p>
            </div>
          </div>
        </div>
      );
    }
    // HTML5 + CSS3 (Modern default)
    return (
      <div style={getSimulatedStyle()}>
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-blue-500/30 pb-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-blue-400">Plaque d'Applis HTML5 / CSS3</h1>
            <p className="text-xs text-slate-400">L'ère du Responsive Mobile et des Animations</p>
          </div>
          <span className="px-2 py-0.5 mt-2 md:mt-0 text-[10px] bg-blue-500/10 text-blue-400 rounded-full font-mono border border-blue-500/30">
            FLEXBOX & GRID ACTIVE
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-750 hover:border-blue-500/50 transition-all">
            <h2 className="text-sm font-semibold mb-1 text-slate-200">Sémantique Native</h2>
            <p className="text-xs text-slate-350">
              Chaque bloc est structuré par des balises porteuses de sens (main, header, footer) bénéfiques pour les moteurs et les lecteurs d'écran.
            </p>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-750 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold mb-1 text-slate-200">Interactivité CSS3</h2>
              <p className="text-xs text-slate-350">Finies les découpes Photoshop d'ombres ou d'angles!</p>
            </div>
            <button className="mt-3 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer transition-all self-start">
              Bouton à Effet Ombre & Transition
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/20 text-red-500 dark:text-red-400 border-red-500/30';
      case 'high': return 'bg-amber-500/20 text-amber-500 dark:text-amber-400 border-amber-500/30';
      case 'medium': return 'bg-blue-500/20 text-blue-500 dark:text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-500 dark:text-slate-400 border-slate-500/30';
    }
  };

  const filterButtons = [
    { id: 'all', label: 'Tout' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'Scripts/JS' },
    { id: 'browser', label: 'Navigateurs' },
    { id: 'protocol', label: 'Protocoles' },
    { id: 'milestone', label: 'Jalons' },
  ];

  return (
    <div className="space-y-8" id="timeline-view-root">
      {/* 1. Comparison & Simulator Section */}
      <section className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
            <Cpu className="w-5 h-5" id="cpu-icon" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              Simulateur & Comparateur de Normes Web
            </h2>
            <p className="text-xs text-slate-400">
              Combinez les époques technologiques d'HTML et de CSS pour observer l'impact direct sur les modèles et capacités de rendu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* HTML Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span> Standard HTML :
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-1 gap-2">
                {htmlVersionsSpecs.map((spec) => (
                  <button
                    key={spec.id}
                    id={`btn-html-${spec.id}`}
                    onClick={() => {
                      setSelectedHtmlId(spec.id);
                      // Force corresponding older CSS limitations automatically to maintain historical relevance
                      if (spec.id === 'html1') setSelectedCssId('none');
                      else if (spec.id === 'html2') setSelectedCssId('none');
                      else if (spec.id === 'html3' && selectedCssId === 'css3') setSelectedCssId('css1');
                    }}
                    className={`px-3 py-2 text-left rounded-lg text-xs font-mono transition-all flex items-center justify-between border cursor-pointer ${
                      selectedHtmlId === spec.id
                        ? 'bg-orange-500/10 border-orange-500 text-orange-400 active-shadow shadow-sm'
                        : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <span>{spec.name}</span>
                    <span className="text-[10px] opacity-60">({spec.year})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CSS Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Standard CSS :
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2">
                <button
                  id="btn-css-none"
                  onClick={() => setSelectedCssId('none')}
                  disabled={selectedHtmlId === 'html5'}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-mono transition-all flex items-center justify-between border cursor-pointer ${
                    selectedHtmlId === 'html5' ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    selectedCssId === 'none'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400 active-shadow shadow-sm'
                      : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span>Aucun Style (Brut)</span>
                  <span className="text-[10px] opacity-60">1991-1995</span>
                </button>
                {cssVersionsSpecs.map((spec) => {
                  const allowed = !(selectedHtmlId === 'html1' || (selectedHtmlId === 'html2' && spec.id === 'css3'));
                  return (
                    <button
                      key={spec.id}
                      id={`btn-css-${spec.id}`}
                      onClick={() => allowed && setSelectedCssId(spec.id)}
                      disabled={!allowed}
                      className={`px-3 py-2 text-left rounded-lg text-xs font-mono transition-all flex items-center justify-between border ${
                        !allowed
                          ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
                          : 'cursor-pointer ' + (selectedCssId === spec.id
                              ? 'bg-blue-500/10 border-blue-500 text-blue-400 active-shadow shadow-sm'
                              : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200')
                      }`}
                    >
                      <span>{spec.name}</span>
                      <span className="text-[10px] opacity-60">({spec.year})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vintage Limits Specs Info */}
            <div className="p-4 bg-slate-900/50 border border-slate-750 rounded-lg space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3" /> État des Lieux de l'époque
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{selectedHtmlId === 'html1' ? htmlVersionsSpecs[0].vintageContext : 
                  selectedHtmlId === 'html2' ? htmlVersionsSpecs[1].vintageContext :
                  selectedHtmlId === 'html3' ? htmlVersionsSpecs[2].vintageContext :
                  selectedHtmlId === 'html4' ? htmlVersionsSpecs[3].vintageContext :
                  htmlVersionsSpecs[4].vintageContext}"
              </p>
            </div>
          </div>

          {/* Code Viewer and Output Sandbox Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex bg-slate-900 border border-slate-750 rounded-lg overflow-hidden flex-col h-full min-h-[460px]">
              {/* Header bar */}
              <div className="flex justify-between items-center bg-slate-850 px-4 py-2 text-xs border-b border-slate-750">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-slate-300 font-mono ml-2">Navigator_Demo_Suite.dll</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                  <span>HTML: {selectedHtml.name}</span> | <span>CSS: {selectedCssId === 'none' ? 'Aucun Style' : selectedCss.name}</span>
                </div>
              </div>

              {/* Main inner tabs (Code vs Live Render) */}
              <div className="grid grid-rows-2 h-full flex-1">
                {/* Top Half: Code snippet of that HTML/CSS standard */}
                <div className="p-4 border-b border-slate-750 overflow-y-auto bg-slate-950 font-mono text-xs text-emerald-400 leading-relaxed scrollbar-thin">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2 border-b border-emerald-500/10 pb-1">
                    <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5 text-blue-400" /> Structure & Gabarit d'époque</span>
                    <span>{selectedHtml.status}</span>
                  </div>
                  <pre className="whitespace-pre-wrap select-all">{selectedHtml.codeSnippet}</pre>
                </div>

                {/* Bottom Half: Live Simulation Render Box */}
                <div className="p-4 bg-slate-900/45 flex flex-col justify-between overflow-y-auto">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2 flex justify-between items-center border-b border-slate-700/50 pb-1">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-orange-400" /> Simulateur de Rendu Visuel</span>
                    <span className="text-slate-200">Mode: {theme === 'modern' ? 'Moderne' : theme === 'ie6' ? 'Internet Explorer' : 'Terminal'}</span>
                  </div>
                  <div className="flex-1 overflow-auto rounded-md">
                    {getSimulatedDemoMarkup()}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-400">
                    <CheckCircle2 className="w-3 text-emerald-400" />
                    <span>Lumière sur les balises : <b>{selectedHtml.keyFeatures.join(', ')}</b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 Side-by-side comparative Code block */}
      <section className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <RefreshCw className="w-5 h-5 text-indigo-400" id="refresh-icon" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Comparateur Rétro de Code Côte-à-Côte
            </h2>
            <p className="text-xs text-slate-400">
              Choisissez deux époques technologiques majeures pour comparer instantanément comment coder le même élément à travers les âges.
            </p>
          </div>
        </div>

        {/* Challenge Selection Row */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-750/50 space-y-3 animate-fade-in">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
            Étape 1 : Choisissez le défi de conception web :
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {comparativeChallenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallengeId(challenge.id)}
                className={`p-3 rounded-lg text-left border transition text-xs cursor-pointer ${
                  selectedChallengeId === challenge.id
                    ? 'bg-indigo-600/10 border-indigo-500 text-indigo-450 font-bold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-950/80'
                }`}
              >
                <div className="font-semibold block text-[11px] mb-0.5">{challenge.title}</div>
                <div className="text-[9px] opacity-70 block leading-tight font-normal">{challenge.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Double Columns Eras comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column A */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">
                📟 Époque de Référence A :
              </span>
              <select
                value={eraA}
                onChange={(e) => setEraA(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded px-2.5 py-1 focus:outline-none focus:border-indigo-500 font-mono cursor-pointer"
              >
                {eraOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Code displaying panel A */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden min-h-[240px] flex flex-col justify-between">
              <div className="bg-slate-900/85 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
                <span>Méthode A</span>
                <span className="px-1.5 py-0.2 bg-indigo-950/40 text-indigo-450 border border-indigo-500/10 rounded uppercase font-bold text-[9px]">
                  {eraOptions.find(o => o.id === eraA)?.label || 'HTML'}
                </span>
              </div>
              <div className="p-4 flex-1 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre scrollbar-thin max-h-[180px]">
                {comparativeChallenges.find(c => c.id === selectedChallengeId)?.eras[eraA as 'html1' | 'html2' | 'html3' | 'html4' | 'html5']?.code || '// Code non disponible'}
              </div>
              <div className="bg-slate-900/60 p-3.5 border-t border-slate-800/80 text-xs text-indigo-200 italic leading-relaxed">
                💡 {comparativeChallenges.find(c => c.id === selectedChallengeId)?.eras[eraA as 'html1' | 'html2' | 'html3' | 'html4' | 'html5']?.explanation || 'Pas de note disponible.'}
              </div>
            </div>
          </div>

          {/* Column B */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">
                🚀 Époque Alternative B :
              </span>
              <select
                value={eraB}
                onChange={(e) => setEraB(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded px-2.5 py-1 focus:outline-none focus:border-[#3b82f6] font-mono cursor-pointer"
              >
                {eraOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Code displaying panel B */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden min-h-[240px] flex flex-col justify-between">
              <div className="bg-slate-900/85 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
                <span>Méthode B</span>
                <span className="px-1.5 py-0.2 bg-blue-950/40 text-[#4ca2ff] border border-blue-500/10 rounded uppercase font-bold text-[9px]">
                  {eraOptions.find(o => o.id === eraB)?.label || 'HTML'}
                </span>
              </div>
              <div className="p-4 flex-1 font-mono text-xs text-emerald-450 leading-relaxed overflow-x-auto whitespace-pre scrollbar-thin max-h-[180px]">
                {comparativeChallenges.find(c => c.id === selectedChallengeId)?.eras[eraB as 'html1' | 'html2' | 'html3' | 'html4' | 'html5']?.code || '// Code non disponible'}
              </div>
              <div className="bg-slate-900/60 p-3.5 border-t border-slate-800/80 text-xs text-[#b8dbff] italic leading-relaxed">
                💡 {comparativeChallenges.find(c => c.id === selectedChallengeId)?.eras[eraB as 'html1' | 'html2' | 'html3' | 'html4' | 'html5']?.explanation || 'Pas de note disponible.'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Unified Timeline Section */}
      <section className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 border-b border-slate-700/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <Calendar className="w-5 h-5" id="calendar-icon" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                La Frise Chronologique du Web
              </h2>
              <p className="text-xs text-slate-400">
                Explorez l'évolution des protocoles, navigateurs et langages à travers les grandes étapes décisives.
              </p>
            </div>
          </div>

          {/* Toolboxes: Filters & Eras Zoom */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
            {/* Category selection */}
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Catégorie :</span>
              <div className="flex flex-wrap gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-750">
                {filterButtons.map((btn) => (
                  <button
                    key={btn.id}
                    id={`btn-filter-${btn.id}`}
                    onClick={() => setTimelineFilter(btn.id)}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all cursor-pointer ${
                      timelineFilter === btn.id
                        ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chronological Era Zoom */}
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Zoom Temporel :</span>
              <div className="flex flex-wrap gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-750">
                {[
                  { id: 'all', label: '1991-2026 (Tout)' },
                  { id: 'pioneers', label: 'Pionniers (91-96)' },
                  { id: 'standardization', label: 'Standardisation (97-04)' },
                  { id: 'modern', label: 'Moderne (05-26)' }
                ].map((era) => (
                  <button
                    key={era.id}
                    id={`btn-era-${era.id}`}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all cursor-pointer ${
                      selectedEra === era.id
                        ? 'bg-[#3b82f6] text-black shadow-sm font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Line Grid */}
        <div className="relative border-l border-slate-700 ml-4 md:ml-32 pl-6 md:pl-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => {
              const isExpanded = expandedEventId === event.id;
              return (
                <motion.div
                  key={event.id}
                  id={`timeline-event-${event.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="relative group bg-slate-900/30 p-4 rounded-xl border border-slate-750/50 hover:bg-slate-900/60 transition-all cursor-pointer select-none"
                  onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                >
                  {/* Left Floating Year Badge for MD desktop screens */}
                  <div className="hidden md:flex absolute -left-[144px] top-4 w-24 justify-end">
                    <span className="font-mono text-base font-bold text-indigo-400 bg-slate-800 border border-slate-700/80 px-2.5 py-1 rounded-lg shadow-sm">
                      {event.year}
                    </span>
                  </div>

                  {/* Bullet Bullet Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-[18px] w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-500 group-hover:bg-indigo-400 transition-all shadow-md z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                  </div>

                  {/* Content Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="md:hidden font-mono font-bold text-indigo-400 mr-2 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-xs">
                        {event.year}
                      </span>
                      <h4 className="font-bold text-slate-150 text-sm group-hover:text-white transition-all">
                        {event.title}
                      </h4>
                    </div>
                    {/* Category Label */}
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 text-[9px] font-mono border rounded-full ${getImpactColor(event.impact)} font-semibold uppercase tracking-wider`}>
                        {event.impact === 'critical' ? 'Crucial' : event.impact === 'high' ? 'Majeur' : event.impact === 'medium' ? 'Modéré' : 'Mineur'}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-mono bg-slate-800 border border-slate-700 text-slate-300 rounded font-semibold uppercase">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs text-slate-350 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Expanded block */}
                  {isExpanded && event.detailedContent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-slate-750 text-slate-300 text-xs leading-relaxed space-y-3 bg-slate-950/20 p-3 rounded-lg border border-dashed border-slate-800"
                    >
                      <p>{event.detailedContent}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-slate-900 border border-slate-800 text-slate-400 font-mono rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Prompt for interactivity */}
                  {!isExpanded && event.detailedContent && (
                    <div className="text-[10px] text-indigo-400 mt-2 font-semibold font-mono uppercase group-hover:underline flex items-center gap-1">
                      <span>Cliquez pour en savoir plus...</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
