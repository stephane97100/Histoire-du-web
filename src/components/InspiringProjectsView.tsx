/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Layers, 
  History, 
  Bookmark, 
  CheckCircle2, 
  Info,
  Calendar,
  Cpu,
  Zap,
  Search,
  BookOpen
} from 'lucide-react';

interface InspiringProjectsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface HistoricWebsite {
  id: string;
  name: string;
  year: string;
  creators: string;
  url: string;
  archiveUrl: string;
  category: 'pioneer' | 'design' | 'community' | 'viral' | 'standards';
  era: '1990-1995' | '1996-2000' | '2001-2006' | '2007+';
  summary: string;
  historicalImportance: string;
  techStack: {
    html: string;
    css: string;
    js: string;
  };
  keyFeature: string;
  sampleCodeSnippet: string;
  legacyLessons: string[];
  badgeColor?: string;
}

const HISTORIC_PROJECTS: HistoricWebsite[] = [
  {
    id: 'cern_first_page',
    name: 'Premier Site Web du CERN (The World Wide Web)',
    year: '1991',
    creators: 'Tim Berners-Lee',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    archiveUrl: 'https://web.archive.org/web/19970101000000*/http://info.cern.ch/',
    category: 'pioneer',
    era: '1990-1995',
    summary: 'Le tout premier document hypertexte mis en ligne sur le réseau du CERN par Tim Berners-Lee.',
    historicalImportance: 'A donné naissance au World Wide Web en expliquant le fonctionnement de l\'hypertexte, de HTTP, d\'HTML et du serveur web NeXTSTEP.',
    techStack: {
      html: 'HTML 1.0 ultra-minimaliste : uniquement des balises de structuration de texte (<H1>, <P>, <A HREF=...>, <HEADER>, <ADDRESS>). Pas d\'images, pas de styles.',
      css: 'Inexistant (Le CSS ne sera inventé qu\'en 1994 par Håkon Wium Lie). Le style était déterminé par le navigateur (Line Mode Browser / WorldWideWeb).',
      js: 'Aucun (JavaScript n\'existait pas encore).'
    },
    keyFeature: 'Liens hypertexte universels inter-documents reliés par des adresses URL uniques.',
    sampleCodeSnippet: `<HEADER>
<TITLE>The World Wide Web project</TITLE>
</HEADER>
<BODY>
<H1>World Wide Web</H1>
The WorldWideWeb (W3) is a wide-area<A NAME=0 HREF="WhatIs.html"> hypermedia</A> information retrieval initiative aiming to give universal access to a large universe of documents.
<P>
Everything that is there in W3 is available by directly linking to document URL addresses.
</BODY>`,
    legacyLessons: [
      'La puissance absolue de la sémantique : le texte accessible brut traverse le temps sans vieillir.',
      'L\'absence de fioritures permettait un affichage instantané même à 300 baud.',
      'La décentralisation du Web repose sur le principe de l\'URL unique.'
    ]
  },
  {
    id: 'space_jam_1996',
    name: 'Space Jam Official Movie Site (Warner Bros)',
    year: '1996',
    creators: 'Michael B. & Équipe Digital Warner',
    url: 'https://www.warnerbros.com/archive/spacejam/movie/jam.html',
    archiveUrl: 'https://web.archive.org/web/19961222000000*/http://www.spacejam.com/',
    category: 'viral',
    era: '1996-2000',
    summary: 'Le site officiel du film Space Jam de 1996, rendu célèbre pour être resté intact et en ligne pendant plus de 25 ans.',
    historicalImportance: 'Un monument de la pop-culture du web des années 90, montrant l\'utilisation massive des GIF animés, des arrière-plans tuilés et des tables HTML pour simuler une mise en page graphique.',
    techStack: {
      html: 'Emploi intensif de tables imbriquées (<TABLE BORDER=0 CELLSPACING=0>), d\'images réactives (<MAP NAME="..."> <AREA SHAPE="rect">) et d\'arrière-plans GIF étoiles.',
      css: 'Inexistant dans la version originale. Tout le style était géré par des attributs HTML bruts (BGCOLOR, ALIGN, VALIGN, FONT COLOR).',
      js: 'Scripts légers pour ouvrir des pop-ups d\'extraits audio .au / .wav et vidéos QuickTime.'
    },
    keyFeature: 'Menu planétaire circulaire composé d\'images GIF découpées dans un tableau HTML.',
    sampleCodeSnippet: `<BODY BGCOLOR="#000000" BACKGROUND="img/bg_stars.gif" TEXT="#FFFFFF" LINK="#FF0000">
<CENTER>
  <TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" WIDTH="500">
    <TR>
      <TD ALIGN="CENTER">
        <A HREF="press/index.html"><IMG SRC="img/p_press.gif" BORDER="0" ALT="Press Kit"></A>
      </TD>
      <TD ALIGN="CENTER">
        <A HREF="behind/index.html"><IMG SRC="img/p_behind.gif" BORDER="0" ALT="Behind the Jam"></A>
      </TD>
    </TR>
  </TABLE>
</CENTER>
</BODY>`,
    legacyLessons: [
      'Découpage d\'images en grille dans un <TABLE> pour contourner l\'absence de CSS.',
      'Simplicité d\'hébergement : des fichiers statiques purement autonomes ne nécessitant aucune base de données.',
      'L\'impact d\'une identité visuelle kitsch mais mémorable.'
    ]
  },
  {
    id: 'css_zen_garden',
    name: 'CSS Zen Garden (The Beauty of CSS Design)',
    year: '2003',
    creators: 'Dave Shea',
    url: 'http://www.csszengarden.com/',
    archiveUrl: 'https://web.archive.org/web/20031001000000*/http://www.csszengarden.com/',
    category: 'standards',
    era: '2001-2006',
    summary: 'Le projet fondateur qui a convaincu le monde de séparer définitivement la structure HTML du style CSS.',
    historicalImportance: 'Dave Shea proposait un seul fichier HTML immuable et invitait les designers du monde entier à soumettre leur propre fichier CSS. Le résultat fut une révélation : des centaines de designs radicalement différents générés à partir du même code source.',
    techStack: {
      html: 'HTML4 Strict / XHTML 1.0 propre avec identifiants sémantiques (#container, #intro, #supportingText, #linkList). Aucune table de présentation.',
      css: 'L\'apogée du CSS2.1 : positionnement absolu/relatif, sprites d\'images en fond (background-image), flottements (float) et hacks pour Internet Explorer 6.',
      js: 'Minimaliste (sélection de thèmes en modifiant le lien <link rel="stylesheet">).'
    },
    keyFeature: 'Un seul fichier HTML fixe transformé en des milliers d\'expériences visuelles distinctes via CSS.',
    sampleCodeSnippet: `/* Fichier CSS externe personnalisé */
#container {
  width: 750px;
  margin: 0 auto;
  background: url(images/bkg_zen.jpg) no-repeat top left;
}
#intro h1 {
  text-indent: -9999px; /* Fast Image Replacement technique (FIR) */
  background: url(images/title_logo.png) no-repeat;
  height: 120px;
}`,
    legacyLessons: [
      'Séparation stricte du contenu (HTML) et de la présentation (CSS).',
      'Popularisation du CSS Float et du positionnement absolu avant l\'arrivée de Flexbox.',
      'Inspiration pour les thèmes et systèmes de design modernes.'
    ]
  },
  {
    id: 'million_dollar_homepage',
    name: 'The Million Dollar Homepage',
    year: '2005',
    creators: 'Alex Tew',
    url: 'http://www.milliondollarhomepage.com/',
    archiveUrl: 'https://web.archive.org/web/20050901000000*/http://www.milliondollarhomepage.com/',
    category: 'viral',
    era: '2001-2006',
    summary: 'Un étudiant britannique vend 1 000 000 de pixels à 1$ par pixel sous forme de grille de publicités d\'un mégapixel.',
    historicalImportance: 'Une des idées virales les plus célèbres de l\'histoire d\'Internet qui a rapporté 1 million de dollars en quelques mois.',
    techStack: {
      html: 'Une grille géante composée d\'une image PNG de 1000x1000 pixels combinée avec une carte d\'images HTML (<MAP> / <AREA SHAPE="rect">).',
      css: 'Positionnement de base avec infobulles (tooltips) affichant le nom de l\'annonceur au survol.',
      js: 'JavaScript pour mettre à jour le compteur de pixels vendus et afficher dynamiquement les informations des liens au survol.'
    },
    keyFeature: 'Grille d\'un mégapixel interactive générée par une image map HTML.',
    sampleCodeSnippet: `<img src="image-map.png" width="1000" height="1000" usemap="#pixels" border="0">
<map name="pixels">
  <area shape="rect" coords="0,0,10,10" href="http://www.casino.com" title="Casino en ligne (10x10 pixels)">
  <area shape="rect" coords="10,0,30,20" href="http://www.tenniproductions.com" title="Studio Web">
</map>`,
    legacyLessons: [
      'Preuve de la puissance des idées simples et virales sur le web.',
      'Utilisation ingénieuse des cartes d\'images HTML pour gérer des milliers de zones cliquables sans alourdir le DOM.',
      'Un aperçu de l\'effervescence publicitaire du Web 2.0.'
    ]
  },
  {
    id: 'google_1998',
    name: 'Google Search Alpha / Beta',
    year: '1998',
    creators: 'Larry Page & Sergey Brin',
    url: 'https://google.com',
    archiveUrl: 'https://web.archive.org/web/19981111184551/http://google.stanford.edu/',
    category: 'pioneer',
    era: '1996-2000',
    summary: 'Le moteur de recherche minimaliste issu de l\'Université de Stanford qui a détrôné Yahoo! et AltaVista.',
    historicalImportance: 'Alors que les portails de l\'époque (Yahoo!, AOL, Lycos) surchargeaient leurs pages d\'actualités et de bannières flash, Google proposait une seule barre de recherche ultra-rapide axée sur l\'algorithme PageRank.',
    techStack: {
      html: 'HTML ultra-épuré, formulaire simple (<FORM ACTION="/search"> <INPUT TYPE="text" NAME="q">), boutons "Google Search" et "I\'m feeling lucky".',
      css: 'Centrage simple via la balise <CENTER> et quelques styles de fonte par défaut.',
      js: 'Quasi-existant au départ : le focus automatique sur le champ de texte (<BODY onLoad="document.f.q.focus()">) a révolutionné l\'ergonomie.'
    },
    keyFeature: 'Minimalisme radical et vitesse de chargement instantanée.',
    sampleCodeSnippet: `<FORM ACTION="http://www.google.com/search" METHOD="GET" NAME="f">
  <CENTER>
    <IMG SRC="google.jpg" ALT="Google!"><BR><BR>
    Search the web using Google!<BR>
    <INPUT TYPE="text" NAME="q" SIZE="40" VALUE=""><BR>
    <INPUT TYPE="submit" VALUE="Google Search">
    <INPUT TYPE="submit" NAME="sa" VALUE="I'm feeling lucky">
  </CENTER>
</FORM>`,
    legacyLessons: [
      'Le minimalisme au service de l\'utilisateur : zéro distraction, vitesse d\'exécution maximale.',
      'L\'ergonomie du focus automatique sur le champ de saisie dès le chargement.',
      'L\'algorithme serveur (PageRank) prime sur la surcharge visuelle client.'
    ]
  },
  {
    id: 'hamster_dance',
    name: 'Hampster Dance (1998)',
    year: '1998',
    creators: 'Deidre LaCarte',
    url: 'http://www.hamsterdance.com',
    archiveUrl: 'https://web.archive.org/web/19991128091722/http://www.hamsterdance.com/',
    category: 'viral',
    era: '1996-2000',
    summary: 'Un des premiers phénomènes viraux de l\'histoire du Web composé de GIFs animés de hamsters qui dansent sur un fichier MIDI en boucle.',
    historicalImportance: 'Démontre comment un simple assemblage de GIF animés et une boucle sonore en arrière-plan pouvait générer des millions de visites spontanées au début de l\'ère des réseaux sociaux.',
    techStack: {
      html: 'Quatre rangées de hamsters en GIF animés répétés dans un tableau HTML (<TABLE>).',
      css: 'Arrière-plan GIF répétitif (<BODY BACKGROUND="tile.gif">).',
      js: 'Utilisation de la balise Internet Explorer non standard <BGSOUND SRC="hamster.mid" LOOP="infinite"> ou <EMBED> pour Netscape.'
    },
    keyFeature: 'Audio MIDI automatique en boucle synchronisé avec des GIFs animés.',
    sampleCodeSnippet: `<BODY BACKGROUND="bg_dance.gif">
<BGSOUND SRC="hampster.mid" LOOP="INFINITE">
<CENTER>
  <H1><FONT COLOR="#FF00FF" FACE="Comic Sans MS">WELCOME TO THE HAMPSTER DANCE!</FONT></H1>
  <IMG SRC="hamster1.gif"> <IMG SRC="hamster2.gif"> <IMG SRC="hamster1.gif">
</CENTER>
</BODY>`,
    legacyLessons: [
      'L\'ancêtre des mèmes et du contenu court fortement partageable.',
      'L\'utilisation mythique du son d\'ambiance <bgsound> de l\'époque IE.',
      'La culture Internet brute portée par les fans et les créateurs indépendants.'
    ]
  }
];

export default function InspiringProjectsView({ theme }: InspiringProjectsViewProps) {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectId, setActiveProjectId] = useState<string>(HISTORIC_PROJECTS[0].id);

  const filteredProjects = HISTORIC_PROJECTS.filter(project => {
    if (selectedEra !== 'all' && project.era !== selectedEra) return false;
    if (selectedCategory !== 'all' && project.category !== selectedCategory) return false;
    return true;
  });

  const activeProject = HISTORIC_PROJECTS.find(p => p.id === activeProjectId) || HISTORIC_PROJECTS[0];

  return (
    <div className="space-y-6 text-left" id="inspiring-projects-root">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border ${
        theme === 'ie6' ? 'bg-[#c0c0c0] border-white text-black shadow-[2px_2px_0px_white_inset]' :
        theme === 'terminal' ? 'bg-[#ffb000]/10 border-[#ffb000]/40 text-[#ffb000]' : 'bg-[#111114] border-[#2a2a2e] text-slate-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase block">Projets Mythiques & Monuments D'époque</span>
              <h2 className="text-base md:text-lg font-extrabold flex items-center gap-2 mt-0.5">
                Inspiring Projects (Les Chefs-d'Œuvre du Web)
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono opacity-80">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Analyse Technique & Héritage du Code</span>
          </div>
        </div>
        <p className="text-xs opacity-80 mt-3 leading-relaxed max-w-4xl">
          Explorez les sites internet qui ont marqué l'histoire de la toile : du tout premier document hypertexte du CERN aux révolutions visuelles comme CSS Zen Garden ou Space Jam. Découvrez la manière dont les développeurs utilisaient l'HTML, le CSS et le JavaScript de leur temps pour contourner les limites techniques.
        </p>
      </div>

      {/* Interactive Filters Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        theme === 'ie6' ? 'bg-[#d4d0c8] border-[#808080]' :
        theme === 'terminal' ? 'bg-black border-[#ffb000]/30' : 'bg-[#141417] border-[#2a2a2e]'
      }`}>
        {/* Era filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[10px] font-mono font-black uppercase text-slate-400 shrink-0">Époque :</span>
          {['all', '1990-1995', '1996-2000', '2001-2006'].map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-2.5 py-1 text-xs rounded-lg font-mono font-bold transition cursor-pointer shrink-0 ${
                selectedEra === era
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {era === 'all' ? 'Toutes époques' : era}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[10px] font-mono font-black uppercase text-slate-400 shrink-0">Catégorie :</span>
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'pioneer', label: 'Pionniers' },
            { id: 'standards', label: 'Standards' },
            { id: 'viral', label: 'Viraux / Pop Culture' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs rounded-lg font-mono font-bold transition cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content: Left Sidebar List + Right Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List of Projects (span 4) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block px-1">
            🏛️ Sélectionner une œuvre ({filteredProjects.length}) :
          </span>
          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            {filteredProjects.map((project) => {
              const isSelected = project.id === activeProjectId;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500/50'
                      : 'bg-[#111114] border-[#2a2a2e] text-slate-300 hover:bg-[#1a1a1e] hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-xs font-bold font-sans line-clamp-1">{project.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 font-bold">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2 font-normal">
                    {project.summary}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span>Créateur : {project.creators}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Project Inspector (span 8) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-2xl border space-y-6 ${
                theme === 'ie6' ? 'bg-[#d4d0c8] border-[#808080] text-black' :
                theme === 'terminal' ? 'bg-[#080808] border-[#ffb000]/40 text-[#ffb000]' : 'bg-[#111114] border-[#2a2a2e] text-slate-100'
              }`}
            >
              {/* Top Title & Links Header */}
              <div className="border-b border-slate-800 pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Année {activeProject.year}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Auteur : <strong className="text-slate-200">{activeProject.creators}</strong>
                      </span>
                    </div>
                    <h3 className="text-xl font-black font-sans tracking-tight text-white">
                      {activeProject.name}
                    </h3>
                  </div>

                  {/* Links buttons */}
                  <div className="flex items-center gap-2">
                    {activeProject.url && (
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono transition flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Site Original
                      </a>
                    )}
                    {activeProject.archiveUrl && (
                      <a
                        href={activeProject.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                      >
                        <History className="w-3.5 h-3.5 text-amber-400" /> Wayback Machine
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {activeProject.summary}
                </p>
              </div>

              {/* Historical Significance Block */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Importance Historique & Révolution :
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {activeProject.historicalImportance}
                </p>
              </div>

              {/* Technology Stack Detailed Analysis */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" /> Utilisation des Technologies d'Époque :
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-orange-400 block">HTML :</span>
                    <p className="text-[11px] text-slate-300 leading-normal font-sans">
                      {activeProject.techStack.html}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-sky-400 block">CSS :</span>
                    <p className="text-[11px] text-slate-300 leading-normal font-sans">
                      {activeProject.techStack.css}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-yellow-400 block">JavaScript / DOM :</span>
                    <p className="text-[11px] text-slate-300 leading-normal font-sans">
                      {activeProject.techStack.js}
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Snippet Example */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Code2 className="w-4 h-4 text-indigo-400" /> Extrait du Code Source d'Origine :
                  </span>
                  <span className="text-[10px] text-slate-500">Syntaxe d'époque</span>
                </div>
                <div className="p-4 rounded-xl bg-black border border-slate-800 overflow-x-auto">
                  <pre className="font-mono text-[11px] text-emerald-400 leading-relaxed scrollbar-thin">
                    {activeProject.sampleCodeSnippet}
                  </pre>
                </div>
              </div>

              {/* Legacy Lessons Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  💡 Ce que les développeurs modernes retiennent de cette œuvre :
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProject.legacyLessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
