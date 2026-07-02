import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Users, Code2, ArrowRight, Zap, Target, Layers, Sparkles, MessageSquare } from 'lucide-react';
import GlossaryTooltip from './GlossaryTooltip';

interface FrameworkDetails {
  name: string;
  creator: string;
  year: number;
  philosophy: string;
  domApproach: string;
  teamImpact: string;
  codeSnippet: string;
  pros: string[];
}

const FRAMEWORKS: FrameworkDetails[] = [
  {
    name: 'React',
    creator: 'Meta / Facebook (Jordan Walke)',
    year: 2013,
    philosophy: 'Bibliothèque minimaliste, un composant est une fonction pure de son état. Paradigme déclaratif fort basé sur JSX (HTML dans le JS).',
    domApproach: 'DOM Virtuel (Virtual DOM) : Calcule la différence (diffing) en mémoire avant d\'appliquer le minimum de modifications nécessaires au DOM réel.',
    teamImpact: 'A popularisé l\'isolation par composants réutilisables, favorisant la création de "Design Systems" partagés et l\'indépendance de conception pour les UI designers et intégrateurs.',
    codeSnippet: 'function Greeting({ name }) {\n  const [count, setCount] = React.useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Bonjour {name} ({count})\n    </button>\n  );\n}',
    pros: ['Écosystème colossal', 'Composants ultra-réutilisables', 'Apprentissage logique pur (fonctions/hooks)']
  },
  {
    name: 'Angular',
    creator: 'Google (Miško Hevery)',
    year: 2010,
    philosophy: 'Framework tout-en-un ultra-structuré (opinionated). Impose TypeScript, l\'architecture MVC/MVVM, l\'injection de dépendances et les modules.',
    domApproach: 'Rendu incrémental (Ivy) & Détection des changements (historiquement Zone.js, évoluant vers les signaux pour plus de précision fine).',
    teamImpact: 'Idéal pour les très grandes équipes (entreprises). La structure rigide garantit que deux développeurs écriront du code quasi-identique, facilitant grandement la maintenance à long terme.',
    codeSnippet: '@Component({\n  selector: "app-greet",\n  template: `<button (click)="inc()">Bonjour {{name}} ({{count}})</button>`\n})\nexport class Greet {\n  @Input() name: string = "";\n  count = 0;\n  inc() { this.count++; }\n}',
    pros: ['Structure standardisée', 'TypeScript natif robuste', 'Complet : pas de librairie tierce requise']
  },
  {
    name: 'Vue.js',
    creator: 'Evan You (ex-Google)',
    year: 2014,
    philosophy: 'Le framework progressif. Combine le meilleur d\'Angular (directives simples) et de React (Virtual DOM, réactivité) dans une syntaxe fluide et accessible.',
    domApproach: 'Réactivité fine basée sur des proxys d\'objets JS (Composition API / Options API) traquant automatiquement les dépendances.',
    teamImpact: 'Courbe d\'apprentissage très douce, permettant à des profils juniors ou designers d\'intégrer du code rapidement, tout en restant robuste pour l\'entreprise.',
    codeSnippet: '<script setup>\nimport { ref } from "vue";\ndefineProps(["name"]);\nconst count = ref(0);\n</script>\n<template>\n  <button @click="count++">Bonjour {{name}} ({{count}})</button>\n</template>',
    pros: ['Excellente documentation', 'Syntaxe intuitive et hybride', 'Performance de rendu remarquable']
  }
];

export default function FrameworkImpactsView({ theme }: { theme: 'modern' | 'ie6' | 'terminal' }) {
  const [activeFw, setActiveFw] = useState<string>('React');

  const selectedFw = FRAMEWORKS.find(f => f.name === activeFw) || FRAMEWORKS[0];

  const getStyle = () => {
    switch (theme) {
      case 'ie6':
        return 'bg-[#d4d0c8] text-black font-sans border-2 border-outset border-white p-4';
      case 'terminal':
        return 'bg-black text-[#00ff00] font-mono border border-[#00ff00] p-6';
      default:
        return 'text-slate-100 p-6';
    }
  };

  return (
    <div className={getStyle()} id="framework-impacts-view">
      {/* Title */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              L'Impact des Frameworks JavaScript
            </h1>
            <p className="text-sm text-slate-400">
              L'évolution majeure qui a transformé des sites web statiques en applications logicielles dynamiques de haute performance.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 3 Pillars of Revolution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-3">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">La façon de coder</h3>
          <p className="text-xs text-slate-405 leading-relaxed">
            Finie la manipulation manuelle rébarbative du DOM avec jQuery (ex: <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">$('#btn').html()</code>). Les frameworks ont introduit le concept de <strong>programmation déclarative</strong> : vous décrivez l'état de votre interface, et le framework s'occupe de mettre à jour le DOM de manière optimale.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">Le travail en équipe</h3>
          <p className="text-xs text-slate-405 leading-relaxed">
            L'isolation par composants réutilisables a aboli le cloisonnement strict d'autrefois (le développeur s'occupant d'un fichier HTML géant d'un côté, et de CSS de l'autre). Désormais, les équipes conçoivent des <strong>Design Systems</strong> indépendants et testables isolément, accélérant massivement la production.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg w-fit mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">La structure logicielle</h3>
          <p className="text-xs text-slate-405 leading-relaxed">
            Ils ont propulsé le Web au rang d'applications d'entreprise (Single Page Applications, ou SPA). Tout le code de navigation, les états complexes et les appels d'API se passent en mémoire du navigateur, offrant une fluidité digne de logiciels natifs.
          </p>
        </div>
      </div>

      {/* Selector and detailed Comparison */}
      <div className="bg-slate-950/45 border border-slate-850 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-base">
          <Target className="w-5 h-5 text-indigo-400" /> Analyse Comparative du "Grand Trio"
        </h3>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6 border-b border-slate-900 pb-4">
          {FRAMEWORKS.map(fw => (
            <button
              key={fw.name}
              onClick={() => setActiveFw(fw.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeFw === fw.name
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {fw.name}
            </button>
          ))}
        </div>

        {/* Tab content panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-indigo-400 block uppercase tracking-wider">Créateur & Date</span>
              <p className="text-sm font-bold text-white">{selectedFw.creator} ({selectedFw.year})</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-indigo-400 block uppercase tracking-wider">Philosophie d'Architecture</span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedFw.philosophy}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider">Approche de mise à jour du DOM</span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedFw.domApproach}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 block uppercase tracking-wider">Impact sur l'organisation des équipes</span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedFw.teamImpact}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-purple-400 block uppercase tracking-wider">Avantages majeurs</span>
              <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                {selectedFw.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-indigo-400 block uppercase tracking-wider">Aperçu du Code (Composant type)</span>
            <div className="bg-black/80 rounded-xl border border-slate-900 p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              <pre>{selectedFw.codeSnippet}</pre>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-[10px] text-slate-500">
              💡 Remarquez comment la logique de comportement (JS) et la structure visuelle (HTML) s'entremêlent intimement au sein d'un même fichier réutilisable. C'est l'essence même du développement par composants.
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Section */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-850 p-6 rounded-2xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-400" /> Bilan : La "Component Revolution"
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Avant 2010, concevoir une interface web de type tableau de bord revenait à écrire des scripts spaghetti interminables, chargés de modifier chaque nœud du DOM un par un lors de chaque clic utilisateur. Les frameworks modernes ont structuré ce chaos en introduisant les <strong>Single Page Applications</strong> et le concept d'état unifié (State Management).
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Travailler en équipe est ainsi passé d'une laborieuse réconciliation de fichiers disparates à de véritables pipelines industriels : déploiement continu par composants isolés, tests automatisés de non-régression visuelle (via Storybook ou Playwright) et alignement parfait des équipes produits via des bibliothèques de composants Figma-to-Code.
        </p>
      </div>
    </div>
  );
}
