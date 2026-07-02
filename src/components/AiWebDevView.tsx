import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Cpu, Code2, ArrowRight, Star, Send, RefreshCcw, Terminal, Lightbulb } from 'lucide-react';

interface PresetPrompt {
  id: string;
  title: string;
  prompt: string;
  responseTitle: string;
  responseSnippet: string;
  explanation: string;
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: 'jquery_to_react',
    title: 'Analyse & Migration JQuery vers React',
    prompt: 'Convertis ce vieux code jQuery en composant moderne React : $("#btn-valider").click(function() { $(this).addClass("active"); $("#contenu").fadeIn(); });',
    responseTitle: 'Refactorisation en Composant React fonctionnel',
    responseSnippet: `import React, { useState } from 'react';\n\nexport default function ValiderContenu() {\n  const [isActive, setIsActive] = useState(false);\n\n  return (\n    <div>\n      <button \n        onClick={() => setIsActive(true)}\n        className={\`px-4 py-2 transition-all \${isActive ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300'}\`}\n      >\n        Valider\n      </button>\n      \n      {isActive && (\n        <div className="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-xl animate-fade-in">\n          Contenu révélé de manière fluide !\n        </div>\n      )}\n    </div>\n  );\n}`,
    explanation: 'L\'IA supprime la manipulation directe impérative du DOM de jQuery et la remplace par un état déclaratif "isActive" dans React. L\'affichage du contenu se fait nativement via une condition logique.'
  },
  {
    id: 'write_tests',
    title: 'Génération de Tests Unitaires',
    prompt: 'Écris des tests unitaires robustes pour ma fonction calculerPanier(items) qui additionne les prix avec une taxe de 20%.',
    responseTitle: 'Suite de tests unitaires avec Jest / Vitest',
    responseSnippet: `import { describe, it, expect } from 'vitest';\nimport { calculerPanier } from './panier';\n\ndescribe('calculerPanier', () => {\n  it('devrait calculer le total avec 20% de taxe', () => {\n    const items = [{ prix: 10 }, { prix: 20 }];\n    expect(calculerPanier(items)).toBe(36); // (10 + 20) * 1.2\n  });\n\n  it('devrait retourner 0 pour un panier vide', () => {\n    expect(calculerPanier([])).toBe(0);\n  });\n});`,
    explanation: 'La rédaction de tests unitaires est une tâche fastidieuse que l\'IA accélère de plus de 70% en devinant les cas limites (panier vide, valeurs négatives, débordements).'
  },
  {
    id: 'explain_code',
    title: 'Explication de Regex Obscure',
    prompt: 'Explique-moi ce que fait cette expression régulière : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$/',
    responseTitle: 'Décodage sémantique de l\'expression',
    responseSnippet: `// ^ : Début de la chaîne\n// ([a-zA-Z0-9._%-]+) : Partie locale de l'e-mail (lettres, chiffres, points, tirets)\n// @ : Caractère @ obligatoire\n// [a-zA-Z0-9.-]+ : Nom de domaine\n// \\. : Point obligatoire avant l'extension\n// [a-zA-Z]{2,6}$ : Extension de domaine (2 à 6 lettres, fin de chaîne)`,
    explanation: 'L\'IA analyse et décortique instantanément les blocs complexes de Regex ou de calculs binaires, agissant comme un décodeur interactif ultra-rapide.'
  }
];

export default function AiWebDevView({ theme }: { theme: 'modern' | 'ie6' | 'terminal' }) {
  const [selectedPrompt, setSelectedPrompt] = useState<PresetPrompt | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetPrompt) => {
    setIsSimulating(true);
    setSelectedPrompt(preset);
    setCustomResponse(null);
    setTimeout(() => {
      setIsSimulating(false);
    }, 900);
  };

  const handleSendCustom = () => {
    if (!customInput.trim()) return;
    setIsSimulating(true);
    setSelectedPrompt(null);
    setTimeout(() => {
      setCustomResponse(
        `// Code généré sur mesure pour : "${customInput}"\nexport function solutionSurMesure() {\n  // L'IA a analysé votre demande !\n  console.log("Accélération et résolution de : ${customInput}");\n  return { succes: true, gainDeTemps: "Estime à 85%" };\n}`
      );
      setIsSimulating(false);
    }, 1200);
  };

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
    <div className={getStyle()} id="ai-webdev-view">
      {/* Title Header */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Développement Web & IA <span className="text-xs font-mono font-normal text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">L'Ère des Copilotes</span>
            </h1>
            <p className="text-sm text-slate-400">
              L'émergence des modèles de langage de grande taille (LLM) et des agents d'IA qui redéfinissent la productivité et la vitesse de création logicielle.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of AI Realities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-3">
            <Cpu className="w-5 h-5 animate-spin" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">Aujourd'hui : L'Accélération</h3>
          <p className="text-xs text-slate-355 leading-relaxed">
            L'IA n'est pas un substitut de pensée mais un <strong>amplificateur cognitif</strong>. Elle écrit le code rébarbatif (boilerplates, schémas de base de données, configurations de build), trouve des bugs de syntaxe complexes et traduit des algorithmes d'un langage à un autre en une fraction de seconde.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-3">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">Le Développeur "Augmenté"</h3>
          <p className="text-xs text-slate-355 leading-relaxed">
            Le métier de développeur évolue de l'écriture pure de lignes de code vers le rôle de <strong>concepteur et réviseur d'architecture</strong>. Le défi n'est plus de se souvenir d'une syntaxe obscure, mais de guider l'IA par des prompts précis (Prompt Engineering) et d'assurer la cohérence globale.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg w-fit mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-white mb-2 text-sm">Demain : Les Promesses</h3>
          <p className="text-xs text-slate-355 leading-relaxed">
            L'émergence des agents de codage complets (comme AI Studio Build ou Antigravity) capables d'interagir directement avec le système d'exploitation, de planifier, de compiler, de tester et de corriger du code de bout en bout de façon autonome à partir d'un simple cahier des charges naturel.
          </p>
        </div>
      </div>

      {/* Interactive AI Code Copilot Simulator */}
      <div className="bg-slate-950/45 border border-slate-850 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" /> Simulateur de Copilote Virtuel d'IA
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Sélectionnez l'un de nos prompts d'entraînement ci-dessous ou saisissez votre propre requête pour voir la vitesse de résolution assistée par intelligence artificielle.
        </p>

        {/* Preset selections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {PRESET_PROMPTS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPrompt?.id === preset.id
                  ? 'bg-indigo-950/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <span className="text-xs font-bold block mb-1">{preset.title}</span>
              <span className="text-[10px] text-slate-500 truncate block w-full">{preset.prompt}</span>
            </button>
          ))}
        </div>

        {/* Custom manual query input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ex: Convertis mon code VBScript MsgBox en JS, ou explique-moi comment marche un Webhook..."
            className="flex-1 bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={handleSendCustom}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Poser une question
          </button>
        </div>

        {/* Simulator Render screen */}
        <div className="bg-[#0c0c0e] rounded-xl border border-slate-900 p-5 min-h-[180px] relative">
          <AnimatePresence mode="wait">
            {isSimulating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c0e]/95 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-2" />
                <span className="text-xs font-mono text-indigo-400">Génération du code par l'assistant d'IA...</span>
              </motion.div>
            ) : selectedPrompt ? (
              <motion.div
                key={selectedPrompt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-400" /> {selectedPrompt.responseTitle}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    Format : TypeScript / ES6
                  </span>
                </div>

                <div className="bg-black/95 p-4 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed border border-slate-900">
                  <pre>{selectedPrompt.responseSnippet}</pre>
                </div>

                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/30">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Explication de la correction
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {selectedPrompt.explanation}
                  </p>
                </div>
              </motion.div>
            ) : customResponse ? (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-400" /> Solution IA sur-mesure
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Générée instantanément
                  </span>
                </div>
                <div className="bg-black/95 p-4 rounded-lg font-mono text-xs text-indigo-450 overflow-x-auto leading-relaxed border border-slate-900">
                  <pre>{customResponse}</pre>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6" key="empty">
                <Brain className="w-10 h-10 text-slate-700 mb-2" />
                <span className="text-xs text-slate-500 font-mono">En attente de votre sélection ou question...</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Synthesis */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-850 p-6 rounded-2xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-400" /> Promesses d'Avenir & Vigilance
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          L'IA ouvre des perspectives vertigineuses : création d'applications complexes par de simples descriptifs en langage naturel, documentation automatique de millions de lignes de code patrimonial incompréhensible (ex: conversion de VBScript/Cobol vers Node.js/TypeScript) et correction automatique de vulnérabilités critiques de sécurité en temps réel.
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Cependant, l'esprit critique de l'ingénieur reste irremplaçable. L'IA peut générer des "hallucinations" (code erroné ou utilisant des fonctions inexistantes) et requiert des validations rigoureuses via des tests unitaires et de l'intégration continue. L'avenir du développement web appartient à ceux qui sauront harmonieusement faire collaborer l'intuition humaine avec l'efficacité brute des assistants d'IA.
        </p>
      </div>
    </div>
  );
}
