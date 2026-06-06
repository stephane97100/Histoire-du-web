/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ArrowRight, 
  Wrench, 
  FileCode, 
  Briefcase, 
  Cpu, 
  AlertCircle, 
  Binary, 
  RefreshCw,
  Sparkles,
  MousePointer,
  HelpCircle
} from 'lucide-react';

interface WebmasterEvolutionProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface PeriodProfile {
  yearRange: string;
  title: string;
  tagline: string;
  avatar: string;
  roles: string[];
  tools: string[];
  typicalTech: string[];
  favoriteQuote: string;
  codeSnippet: string;
  dailyRoutine: string;
  difficultyScale: number; // 1 to 5
}

const PERIODS: PeriodProfile[] = [
  {
    yearRange: "2000 - 2005",
    title: "Le Webmaster Solitaire",
    tagline: "L'artisan absolu et couteau-suisse du web naissant.",
    avatar: "🧙‍♂️",
    roles: ["Webmaster", "Intégrateur HTML/CSS", "Codeur CGI", "Maquettiste"],
    tools: ["Macromedia Dreamweaver 4", "Photoshop 6.0", "FileZilla", "Notepad++", "Netscape Navigator 4.7"],
    typicalTech: ["HTML 3.2 / 4.01", "Layouts en Tableaux (<table>)", "Styles en ligne (style=\"...\")", "GIFs animés", "Perl / CGI", "PHP 3"],
    favoriteQuote: "« Le site est optimisé pour un affichage en 800x600 sous Internet Explorer 5.5, n'oublie pas de vider ton cache FTP. »",
    codeSnippet: `<table width="100%" border="0" cellspacing="0" cellpadding="5">
  <tr>
    <td bgcolor="#000080" align="center">
      <font face="Verdana" color="#FFFFFF"><b>BIENVENUE SUR MON SITE PERSO !</b></font>
    </td>
  </tr>
  <tr>
    <td align="left">
      <img src="construction.gif" /> C'est encore en chantier...
    </td>
  </tr>
</table>`,
    dailyRoutine: "Dessiner un logo biseauté sous Photoshop, découper les tranches manuellement, coder la structure dans un fichier unique index.html, configurer les permissions CHMOD 755 sur le dossier CGI-BIN par FTP, et croiser les doigts pour que la facture de téléphone de 56k ne dépasse pas les bornes.",
    difficultyScale: 2
  },
  {
    yearRange: "2005 - 2012",
    title: "L'Ère des Spécialistes Rétro",
    tagline: "La division précoce : Webdesigner vs. Intégrateur PHP.",
    avatar: "🎨",
    roles: ["Webdesigner (PSD)", "Intégrateur Web CSS", "Développeur Flash (ActionScript)", "Développeur PHP / MySQL"],
    tools: ["Adobe Flash CS3", "Photoshop CS2/CS3", "WampServer", "TortoiseSVN", "Mozilla Firefox & Firebug"],
    typicalTech: ["HTML 4 / XHTML 1.0", "Mises en page en flottants (float: left)", "CSS 2.1 (Coins carrés)", "WordPress / Joomla", "jQuery v1.4", "ActionScript 2.0 / 3.0"],
    favoriteQuote: "« C'est bon, j'ai fini d'isoler le bug d'affichage sous IE6 avec un hack CSS à base de underscore. On peut livrer la maquette ! »",
    codeSnippet: `<div id="header" class="clear">
  <div class="logo">
    <a href="/"><img src="images/logo.png" alt="Mon Logotype" /></a>
  </div>
  <ul class="nav">
    <li><a href="#" class="active">Accueil</a></li>
    <li><a href="#">Produits</a></li>
  </ul>
</div>
<!-- Hack IE6 pour les coins arrondis avec des images de bordure -->`,
    dailyRoutine: "Prendre le fichier PSD de 150 Mo du designer, découper méticuleusement les coins arrondis en micro-images PNG transparentes de 4px, écrire des hacks CSS complexes pour IE6, écrire du code PHP spaghetti pour interroger la base SQL, et animer la page d'accueil avec un lecteur de musique Flash interactif.",
    difficultyScale: 3
  },
  {
    yearRange: "2012 - 2018",
    title: "La Scission Front-End & Back-End",
    tagline: "Quand les sites web sont devenus des applications lourdes.",
    avatar: "⚙️",
    roles: ["Développeur Front-End", "Développeur Back-End", "UI Designer", "Intégrateur WordPress"],
    tools: ["Sublime Text 3", "Git / GitHub", "Sass / Compass", "Grunt / Gulp", "Bower", "Chrome DevTools"],
    typicalTech: ["HTML5", "CSS3 (Gradian / Border-radius native)", "Media Queries (Responsive)", "AngularJS (v1)", "Bootstrap 3", "REST APIs", "Node.js / Express"],
    favoriteQuote: "« J'ai réécrit tout le système de grille avec Bootstrap en responsive. On verra plus tard pourquoi le bundle Webpack pèse 4 Mo à vide. »",
    codeSnippet: `// Front-End (AngularJS Controller)
angular.module('retroApp', [])
  .controller('MainCtrl', function($scope, $http) {
    $scope.visitors = [];
    $http.get('/api/visitors').then(function(res) {
      $scope.visitors = res.data;
    });
  });`,
    dailyRoutine: "Installer 427 dépendances JavaScript via npm, pester contre les configurations Webpack, créer des Media Queries pour le nouvel iPhone, s'expliquer sur pourquoi l'application Angular ne s'affiche pas du tout si le JavaScript est désactivé chez l'utilisateur, et faire de l'intégration sous Git en résolvant des conflits de fusion cauchemardesques.",
    difficultyScale: 4
  },
  {
    yearRange: "2018 - Présent",
    title: "L'Ère Full-Stack & Industrielle",
    tagline: "Le retour du couteau-suisse, mais dans un environnement hyper-technique.",
    avatar: "🚀",
    roles: ["Développeur Full-Stack", "Ingénieur Cloud / DevOps", "Product Engineer", "UX Engineer"],
    tools: ["VS Code", "Figma", "Docker", "Vercel / AWS", "Copilot / AI Assistants", "GitHub Actions CI/CD"],
    typicalTech: ["React 18 / Next.js / Nuxt", "TypeScript", "Tailwind CSS", "GraphQL / REST", "Serverless Functions", "Edge computing", "CSS Grid & Flexbox"],
    favoriteQuote: "« J'ai configuré la pipeline CI/CD sur Docker pour déployer l'Edge function SSR. On a une note de 100/100 sur Lighthouse ! »",
    codeSnippet: `// Composant React Moderne avec Tailwind & TS
import React from 'react';

interface CardProps {
  title: string;
}

export const ModernCard: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
    </div>
  );
};`,
    dailyRoutine: "Créer des maquettes interactives collaboratives Figma, implémenter un composant React réutilisable typé en TypeScript avec Tailwind CSS, orchestrer des conteneurs isolés sous Docker, gérer les clusters de déploiement automatique sur Vercel, surveiller les métriques de Web Vitals, et utiliser des IA pour générer le code d'amorçage.",
    difficultyScale: 5
  }
];

export default function WebmasterEvolution({ theme }: WebmasterEvolutionProps) {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number>(0);
  const selectedPeriod = PERIODS[selectedPeriodIdx];
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'specialization' | 'obsolescence' | 'comparison'>('specialization');

  // Colors & styles adjusting according to selected theme
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          title: 'text-blue-900 font-extrabold text-[#000080] font-sans text-xl border-b-2 border-[#808080] pb-1',
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans',
          buttonActive: 'bg-[#d4d0c8] border-2 border-inset border-white text-black font-bold px-3 py-1 text-xs',
          buttonInactive: 'bg-[#d4d0c8] border-2 border-outset border-white text-black px-3 py-1 text-xs hover:bg-[#c0c0c0]',
          badge: 'bg-[#000080] text-white text-[10px] uppercase font-bold px-1.5 py-0.5 border border-[#808080]',
          bulletIcon: 'text-[#000080] font-bold text-sm mr-2 shrink-0 select-none',
          codeBg: 'bg-white border-2 border-inset border-[#808080] font-mono text-xs text-black p-3 overflow-x-auto select-all rounded-none',
          accentText: 'text-blue-800 font-bold',
          techBadge: 'bg-[#d4d0c8] text-black border border-[#808080] text-[10px] px-2 py-0.5 font-bold rounded-none',
        };
      case 'terminal':
        return {
          title: 'text-[#ffb000] font-mono font-black text-lg border-b border-[#ffb000]/30 pb-2 uppercase tracking-wider',
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          buttonActive: 'bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000] px-3 py-1 text-xs font-bold',
          buttonInactive: 'text-[#ffb000]/60 border border-[#ffb000]/25 hover:border-[#ffb000]/60 hover:text-[#ffb000] px-3 py-1 text-xs',
          badge: 'bg-[#ffb000]/10 text-[#ffb000] text-[10px] px-2 py-0.5 font-black border border-[#ffb000]',
          bulletIcon: 'text-[#ffb000] mr-2 shrink-0 font-bold select-none',
          codeBg: 'bg-[#050505] border border-[#ffb000]/20 font-mono text-xs text-[#ffb000] p-4 overflow-x-auto select-all rounded-none',
          accentText: 'text-[#ffb000] font-bold decoration-dotted underline',
          techBadge: 'bg-black text-[#ffb000] border border-[#ffb000]/30 text-[10px] px-2 py-0.5 font-medium rounded-none',
        };
      default: // Modern - Slate Slate & Indigo
        return {
          title: 'text-white font-sans font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white to-slate-450 bg-clip-text text-transparent',
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl',
          buttonActive: 'bg-[#1d1d23] text-indigo-400 border border-indigo-500/40 rounded-lg px-4 py-1.5 text-xs font-bold shadow-sm shadow-indigo-500/5',
          buttonInactive: 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent rounded-lg px-4 py-1.5 text-xs transition duration-150',
          badge: 'bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full',
          bulletIcon: 'text-indigo-400 mr-2 shrink-0 w-3.5 h-3.5',
          codeBg: 'bg-[#0a0a0c] border border-[#2a2a2e]/60 font-mono text-[11px] text-slate-300 p-4 rounded-xl overflow-x-auto select-all shadow-inner',
          accentText: 'text-indigo-400 font-semibold',
          techBadge: 'bg-[#16161a] text-slate-300 border border-slate-800 text-[10.5px] px-2.5 py-1 rounded-md font-sans hover:border-gray-700 transition',
        };
    }
  };

  const style = getThemeClass();

  return (
    <div className="space-y-6" id="webmaster-evolution-container">
      {/* Introduction Banner header */}
      <div className={style.card}>
        <div className="flex items-start gap-4">
          <div className={`p-3 shrink-0 rounded-xl ${theme === 'modern' ? 'bg-indigo-500/10 text-indigo-400' : theme === 'ie6' ? 'bg-[#000080] text-white' : 'bg-[#ffb000]/10 text-[#ffb000]'}`}>
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className={style.title}>Le Webmaster de 2000 à aujourd'hui</h2>
            <p className={`text-xs ${theme === 'ie6' ? 'text-black font-semibold' : 'text-slate-400'}`}>
              L'histoire captivante des artisans du web. D'un modèle artisan unique où un seul humain configurait des modems, dessinait des GIFs animés et écrivait du PHP brut, à l'industrialisation hyper-spécialisée d'aujourd'hui.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive historical slider widget */}
      <div className={style.card}>
        <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block border-b border-[#2a2a2e] pb-2 mb-4">
          -- 🎚️ COMPARATEUR D'ÉPOQUES INTERACTIF --
        </span>

        {/* Timeline sliders triggers */}
        <div className="relative mb-6">
          <div className={`absolute top-1/2 left-2 right-2 h-0.5 -translate-y-1/2 z-0 ${theme === 'ie6' ? 'bg-[#808080]' : theme === 'terminal' ? 'bg-[#ffb000]/30' : 'bg-slate-800/80'}`} />
          <div className="relative z-10 flex justify-between items-center px-1">
            {PERIODS.map((period, idx) => {
              const isActive = selectedPeriodIdx === idx;
              return (
                <button
                  key={period.yearRange}
                  onClick={() => setSelectedPeriodIdx(idx)}
                  className={`flex flex-col items-center group cursor-pointer focus:outline-none`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition duration-200 ${
                    isActive 
                      ? (theme === 'modern' ? 'bg-indigo-500 text-white scale-115 ring-4 ring-indigo-500/20' : theme === 'ie6' ? 'bg-[#000080] text-white' : 'bg-[#ffb000] text-black font-black') 
                      : (theme === 'modern' ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:scale-105' : theme === 'ie6' ? 'bg-[#c0c0c0] border-2 border-outset border-white text-black' : 'bg-black border border-[#ffb000]/30 text-[#ffb000]/60')
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[9.5px] mt-1.5 font-bold transition duration-200 ${
                    isActive 
                      ? (theme === 'modern' ? 'text-indigo-400' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-[#000080]') 
                      : (theme === 'modern' ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-500')
                  }`}>
                    {period.yearRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current profile details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPeriodIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${theme === 'ie6' ? 'border-2 border-inset border-[#808080] p-4 bg-[#d4d0c8]' : 'bg-[#0d0d10]/40 p-5 rounded-xl border border-slate-900'}`}
          >
            {/* Column 1: Profile avatar & general presentation */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl select-none">{selectedPeriod.avatar}</span>
                <div>
                  <div className={style.badge}>{selectedPeriod.yearRange}</div>
                  <h3 className={`text-base font-black ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'}`}>
                    {selectedPeriod.title}
                  </h3>
                </div>
              </div>

              <p className={`text-xs italic leading-relaxed ${theme === 'ie6' ? 'text-black' : 'text-slate-350'}`}>
                {selectedPeriod.tagline}
              </p>

              {/* Roles list */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-500 block">Appellations courantes :</span>
                <div className="flex flex-wrap gap-1">
                  {selectedPeriod.roles.map(r => (
                    <span key={r} className="bg-slate-950/40 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-900 font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Checklist details */}
              <div className="space-y-2 pt-2 border-t border-slate-950/50">
                <div className="text-[10.5px] leading-relaxed">
                  <strong className={style.accentText}>Outils fétiches :</strong>{' '}
                  <span className={theme === 'ie6' ? 'text-black' : 'text-slate-300'}>{selectedPeriod.tools.join(', ')}</span>
                </div>
                <div className="text-[10.5px] leading-relaxed">
                  <strong className={style.accentText}>Technologies reines :</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPeriod.typicalTech.map(t => (
                      <span key={t} className={style.techBadge}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Code Snippet & typical daily routine */}
            <div className="md:col-span-7 space-y-4">
              {/* Daily routine box */}
              <div className={`p-3 bg-slate-950/60 rounded-xl space-y-1.5 border border-slate-900 ${theme === 'ie6' ? 'bg-white text-black border-[#808080]' : ''}`}>
                <span className="text-[9.5px] font-mono font-black text-amber-500 uppercase tracking-wider block">
                  ⚙️ Le Quotidien Professionnel d'Époque :
                </span>
                <p className={`text-xs leading-relaxed ${theme === 'ie6' ? 'text-black' : 'text-gray-300'}`}>
                  {selectedPeriod.dailyRoutine}
                </p>
              </div>

              {/* Typical Citation box */}
              <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-505/10">
                <span className="text-[9.5px] font-mono font-black text-indigo-400 uppercase tracking-wider block mb-1">
                  💬 Citation typique :
                </span>
                <p className="text-xs italic text-slate-300 leading-relaxed font-sans">
                  {selectedPeriod.favoriteQuote}
                </p>
              </div>

              {/* Code snippet showing syntax evolution */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-500 block">Exemple de code représentatif :</span>
                <pre className={style.codeBg}>
                  <code>{selectedPeriod.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Analytical Tab Segment: Why old words no longer make sense */}
      <div className={style.card}>
        <div className="flex border-b border-[#2a2a2e]/80 pb-3 mb-5 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveAnalysisTab('specialization')}
            className={activeAnalysisTab === 'specialization' ? style.buttonActive : style.buttonInactive}
          >
            🚀 Pourquoi "Webmaster" a disparu
          </button>
          <button
            onClick={() => setActiveAnalysisTab('obsolescence')}
            className={activeAnalysisTab === 'obsolescence' ? style.buttonActive : style.buttonInactive}
          >
            🎨 La chute du "Webdesigner" traditionnel
          </button>
          <button
            onClick={() => setActiveAnalysisTab('comparison')}
            className={activeAnalysisTab === 'comparison' ? style.buttonActive : style.buttonInactive}
          >
            ⚔️ La Spécialisation moderne vs l'Artisanat
          </button>
        </div>

        {/* Tab contents description inside a neat, readable panel */}
        <div className="min-h-[170px] flex flex-col justify-between">
          {activeAnalysisTab === 'specialization' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-bold ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'}`}>
                De l'omnipotence solitaire à la division scientifique du travail du web
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                Dans les années 1995 à 2005, le terme <strong className="text-indigo-400">"Webmaster"</strong> régnait en maître. Il désignait la personne universelle responsable d'un site web de bout en bout : du branchement physique de la machine serveur à la rédaction de l'éditorial, de la création graphique de boutons paillettes à la programmation PHP brute.
              </p>
              <p className={`text-xs leading-relaxed ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                Pourquoi ce terme n'a virtuellement plus de sens aujourd'hui :
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <li className={`flex items-start p-2 bg-slate-950/40 rounded-lg border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className={style.bulletIcon}>■</span>
                  <div className="leading-tight">
                    <strong className="text-gray-200 block">L'hyper-spécialisation technique :</strong> Les empilements de technologies (Webpack, Node, SSR, Docker, CI/CD, React) forment une masse de connaissances impossible à maîtriser pour un seul humain.
                  </div>
                </li>
                <li className={`flex items-start p-2 bg-slate-950/40 rounded-lg border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className={style.bulletIcon}>■</span>
                  <div className="leading-tight">
                    <strong className="text-gray-200 block">La dissolution de la gestion de serveur :</strong> Le Webmaster gérait son serveur Linux/FTP. Aujourd'hui, les ingénieurs DevOps et le Cloud Serverless gèrent l'infrastructure logicielle à l'échelle mondiale.
                  </div>
                </li>
                <li className={`flex items-start p-2 bg-slate-950/40 rounded-lg border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className={style.bulletIcon}>■</span>
                  <div className="leading-tight">
                    <strong className="text-gray-200 block">L'industrialisation des contenus (CMS / SEO) :</strong> L'écriture de textes, l'indexation sémantique (SEO) et l'animation marketing sont désormais gérées par des Content Managers dédiés, détachés du codeur.
                  </div>
                </li>
                <li className={`flex items-start p-2 bg-slate-950/40 rounded-lg border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className={style.bulletIcon}>■</span>
                  <div className="leading-tight">
                    <strong className="text-gray-200 block">La cybersécurité moderne :</strong> On ne peut plus laisser de scripts "CGI-BIN" sans surveillance et sans sandbox d'isolation. La sécurité web exige des spécialistes à plein temps.
                  </div>
                </li>
              </ul>
            </motion.div>
          )}

          {activeAnalysisTab === 'obsolescence' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-bold ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'}`}>
                La mort du Webdesigner de découpe Photoshop (PSD to HTML)
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                En 2004, le rôle de <strong className="text-indigo-400">"Webdesigner"</strong> consistait à ouvrir Photoshop, appliquer des biseaux et des textures métalliques ou d'eau douce, dessiner le site complet de manière figée pixel par pixel, puis d'utiliser l'outil "Tranche" (Slice) pour exporter 40 petits fichiers GIF/PNG qui servaient d'ossature de cellule pour une immense structure <code>&lt;table&gt;</code> HTML.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                <div className={`p-3 bg-slate-950/40 rounded-xl border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className="font-bold text-indigo-400 block mb-1">📐 UI/UX vs Pixel Art statique</span>
                  <p className="text-[10.5px] text-gray-400">
                    Les écrans n'ont plus une taille fixe de 800x600. L'arrivée du responsive design a tué la notion de maquette figée. On conçoit désormais des systèmes de design de composants réactifs fluides d'échelle.
                  </p>
                </div>
                <div className={`p-3 bg-slate-950/40 rounded-xl border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className="font-bold text-indigo-400 block mb-1">🛠️ Outils collaboratifs réels</span>
                  <p className="text-[10.5px] text-gray-400">
                    Exit Photoshop pour le web. Des outils comme Figma conçoivent des maquettes collaboratives interactives vectorielles que les intégrateurs front-end transforment directement en CSS fluide sans découpe d'images.
                  </p>
                </div>
                <div className={`p-3 bg-slate-950/40 rounded-xl border border-slate-900 ${theme === 'ie6' ? 'bg-white border-[#808080]' : ''}`}>
                  <span className="font-bold text-indigo-400 block mb-1">🚀 Des styles CSS ultra-puissants</span>
                  <p className="text-[10.5px] text-gray-400">
                    À l'époque, pour afficher une ombre ou un coin arrondi, il fallait faire des calculs d'incorporation d'images. Aujourd'hui, une simple ligne de styles CSS comme <code className="text-indigo-305">box-shadow</code> ou <code className="text-indigo-305">border-radius</code> gère tout instantanément en haute définition vectorielle.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeAnalysisTab === 'comparison' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-bold ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'}`}>
                Comparaison directe : Hier vs Aujourd'hui suite de productivité
              </h3>
              
              <div className="overflow-x-auto">
                <table className={`w-full text-xs text-left border-collapse ${theme === 'ie6' ? 'border-2 border-slate-500 text-black' : 'border border-slate-900'}`}>
                  <thead>
                    <tr className={`font-mono text-[10px] uppercase ${theme === 'ie6' ? 'bg-[#000080] text-white' : theme === 'terminal' ? 'bg-black text-[#ffb000] border-b border-[#ffb000]/30' : 'bg-[#121216] text-indigo-400 border-b border-[#2a2a2e]/30'}`}>
                      <th className="p-2 border border-slate-800">Symptôme</th>
                      <th className="p-2 border border-slate-800">Méthodes 2000</th>
                      <th className="p-2 border border-slate-800">Méthodes Modernes 2026</th>
                    </tr>
                  </thead>
                  <tbody className={theme === 'ie6' ? 'text-black' : 'text-slate-300'}>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold border border-slate-800 font-mono text-[10.5px]">Stockage de code</td>
                      <td className="p-2 border border-slate-800">Copie locale sur disque zip gravée, sauvegarde temporaire "index_old3_final.html"</td>
                      <td className="p-2 border border-slate-800">Git distribué multi-canaux, pull requests isolées, historique linéaire</td>
                    </tr>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold border border-slate-800 font-mono text-[10.5px]">Mise en production</td>
                      <td className="p-2 border border-slate-800">Téléversement FTP manuel en ligne par bloc de fichiers modifiés sous FileZilla</td>
                      <td className="p-2 border border-slate-800">Pipelines d'intégration continue (CI/CD) sur validation Git, serveurs CDN</td>
                    </tr>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold border border-slate-800 font-mono text-[10.5px]">Mise en page</td>
                      <td className="p-2 border border-slate-800">Tableaux imbriqués de manière fractale avec cellules transparentes d'espacement spacer.gif</td>
                      <td className="p-2 border border-slate-800">CSS Flexbox (ligne/colonne réactive) et structures de Grilles bidimensionnelles (CSS Grid)</td>
                    </tr>
                    <tr className="hover:bg-slate-950/20">
                      <td className="p-2 font-bold border border-slate-800 font-mono text-[10.5px]">Besoins serveurs</td>
                      <td className="p-2 border border-slate-800">Louer une machine fixe chez l'hébergeur gratuit local avec bases SQL lentes d'époque</td>
                      <td className="p-2 border border-slate-800">Réseau Edge global, bases Serverless distribuées géographiquement, mise à l'échelle automatique</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Retro educational summary note */}
      <div className={`p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1 ${theme === 'ie6' ? 'bg-white text-black border-[#808080]' : ''}`}>
        <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> Le Démon de l'Industrialisation :
        </span>
        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
          Si l'hyper-spécialisation a grandement fait gagner le web en performance brute, en sécurité industrielle et en capacité d'échelle, elle a également gommé une certaine poésie : l'époque où un humble débutant d'époque pouvait, armé d'un simple éditeur de texte et d'un espace FTP gratuit de 10 Mo, créer et orchestrer un espace de liberté totalement personnalisé à travers le monde.
        </p>
      </div>
    </div>
  );
}
