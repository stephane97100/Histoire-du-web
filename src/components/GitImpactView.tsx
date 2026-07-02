import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitBranch, GitCommit, GitPullRequest, GitMerge, Layers, Cpu, Code2, Play, RefreshCcw, Sparkles } from 'lucide-react';

interface CommitNode {
  id: string;
  label: string;
  branch: 'main' | 'feature';
  parentId?: string;
}

export default function GitImpactView({ theme }: { theme: 'modern' | 'ie6' | 'terminal' }) {
  // Interactive Git simulation state
  const [commits, setCommits] = useState<CommitNode[]>([
    { id: 'c1', label: 'Initial commit', branch: 'main' },
    { id: 'c2', label: 'Ajout de index.html', branch: 'main', parentId: 'c1' },
  ]);
  const [currentBranch, setCurrentBranch] = useState<'main' | 'feature'>('main');
  const [gitOutput, setGitOutput] = useState<string[]>([
    'Initialized empty Git repository in /workspace/.git/',
    'Created commit c1: "Initial commit"',
    'Created commit c2: "Ajout de index.html"'
  ]);

  // Actions
  const handleCommit = () => {
    const newId = 'c' + (commits.length + 1);
    const parent = commits.filter(c => c.branch === currentBranch).slice(-1)[0];
    const newCommit: CommitNode = {
      id: newId,
      label: currentBranch === 'main' ? `Modif main #${newId}` : `Fonctionnalité #${newId}`,
      branch: currentBranch,
      parentId: parent ? parent.id : undefined,
    };
    setCommits([...commits, newCommit]);
    setGitOutput([...gitOutput, `git commit -m "${newCommit.label}" -> commit ${newId} créé`]);
  };

  const handleBranch = () => {
    if (currentBranch === 'feature') {
      setGitOutput([...gitOutput, '⚠️ Déjà sur la branche feature']);
      return;
    }
    const lastMain = commits.filter(c => c.branch === 'main').slice(-1)[0];
    setCurrentBranch('feature');
    setGitOutput([...gitOutput, `git checkout -b feature -> Branche "feature" créée à partir de ${lastMain ? lastMain.id : 'root'}`]);
  };

  const handleCheckoutMain = () => {
    setCurrentBranch('main');
    setGitOutput([...gitOutput, 'git checkout main -> Basculé sur la branche "main"']);
  };

  const handleMerge = () => {
    if (currentBranch !== 'main') {
      setGitOutput([...gitOutput, '⚠️ Vous devez être sur "main" pour fusionner "feature"']);
      return;
    }
    const featureCommits = commits.filter(c => c.branch === 'feature');
    if (featureCommits.length === 0) {
      setGitOutput([...gitOutput, '⚠️ Aucun commit sur la branche "feature" à fusionner']);
      return;
    }

    const newId = 'c' + (commits.length + 1);
    const lastMain = commits.filter(c => c.branch === 'main').slice(-1)[0];
    const newCommit: CommitNode = {
      id: newId,
      label: `Merge branch 'feature'`,
      branch: 'main',
      parentId: lastMain?.id,
    };

    // Move all feature branch nodes to main logically or just append merge node
    setCommits([...commits, newCommit]);
    setCurrentBranch('main');
    setGitOutput([...gitOutput, `git merge feature -> Fusion réussie (${newId}). Conflits résolus proprement !`]);
  };

  const handleReset = () => {
    setCommits([
      { id: 'c1', label: 'Initial commit', branch: 'main' },
      { id: 'c2', label: 'Ajout de index.html', branch: 'main', parentId: 'c1' },
    ]);
    setCurrentBranch('main');
    setGitOutput(['Repository reset complet. Recommençons à zéro.']);
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
    <div className={getStyle()} id="git-impact-view">
      {/* Title Header */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              L'Ère Git & GitHub <span className="text-xs font-mono font-normal text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">Révolution GitLens</span>
            </h1>
            <p className="text-sm text-slate-400">
              Comment Linus Torvalds a aboli le chaos du partage de code, et comment GitHub a transformé le développement en réseau social mondial.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Contrast Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-950/15 border border-red-900/20 p-5 rounded-2xl">
          <h3 className="font-bold text-red-400 flex items-center gap-2 text-sm mb-2">
            ⚠️ Le Chaos Pré-Git (Les années 90 - 2005)
          </h3>
          <ul className="text-xs text-slate-350 space-y-2 list-disc pl-4 leading-relaxed">
            <li><strong>Le cauchemar des conflits</strong> : Les systèmes centralisés comme CVS ou SVN bloquaient les fichiers travaillés par d'autres, paralysant le travail en parallèle.</li>
            <li><strong>FTP de la mort</strong> : Envoyer son code directement en FTP écrasait les fichiers des collègues sans aucun historique de retour en arrière.</li>
            <li><strong>Zips empilés</strong> : On s'envoyait des archives nommées <code className="bg-slate-900 text-red-300 px-1 py-0.5 rounded">app_final_v2_mardi_ok.zip</code> par mail ou clé USB.</li>
          </ul>
        </div>

        <div className="bg-emerald-950/15 border border-emerald-900/20 p-5 rounded-2xl">
          <h3 className="font-bold text-emerald-400 flex items-center gap-2 text-sm mb-2">
            🚀 La Délivrance Git (Depuis 2005)
          </h3>
          <ul className="text-xs text-slate-350 space-y-2 list-disc pl-4 leading-relaxed">
            <li><strong>Décentralisation totale</strong> : Chaque développeur possède l'historique complet et autonome du projet sur sa machine.</li>
            <li><strong>Branches instantanées</strong> : Créer une branche prend une microseconde, permettant d'isoler chaque fonctionnalité de façon parfaitement étanche.</li>
            <li><strong>Fusion mathématique</strong> : Des algorithmes de merge ultra-performants réconcilient automatiquement les contributions parallèles de milliers d'ingénieurs.</li>
          </ul>
        </div>
      </div>

      {/* Git Commands Simulator */}
      <div className="bg-slate-950/45 border border-slate-850 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-indigo-400" /> Simulateur de Commits & Branches Git
            </h3>
            <p className="text-xs text-slate-400">
              Interagissez avec le terminal à gauche pour voir la structure du graphe de commits se dessiner en temps réel à droite.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Réinitialiser
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Action Panel & Shell */}
          <div className="flex flex-col justify-between bg-[#0a0a0c] rounded-xl border border-slate-900 p-5 space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-indigo-400 block uppercase tracking-wider">Lancer une commande</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCommit}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" /> git commit
                </button>
                <button
                  onClick={handleBranch}
                  disabled={currentBranch === 'feature'}
                  className={`px-3 py-2 font-mono text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentBranch === 'feature'
                      ? 'bg-slate-900 text-slate-650 border border-slate-950 cursor-not-allowed'
                      : 'bg-emerald-605 text-white hover:bg-emerald-500 border border-emerald-600'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5" /> git checkout -b feature
                </button>
                {currentBranch === 'feature' && (
                  <button
                    onClick={handleCheckoutMain}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 font-mono text-xs rounded-lg text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    git checkout main
                  </button>
                )}
                <button
                  onClick={handleMerge}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <GitMerge className="w-3.5 h-3.5" /> git merge feature
                </button>
              </div>
            </div>

            {/* Simulated Shell Logs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-450 block uppercase tracking-wider">Journal du Terminal</span>
              <div className="bg-black/90 p-4 rounded-lg font-mono text-[11px] text-emerald-400 space-y-1 h-36 overflow-y-auto border border-slate-900">
                {gitOutput.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    <span className="text-slate-500">$</span> {log}
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Branche active : <span className="text-indigo-400 font-bold">{currentBranch}</span>
              </div>
            </div>
          </div>

          {/* Graphical commit tree */}
          <div className="bg-[#0a0a0c] rounded-xl border border-slate-900 p-5 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-indigo-400 block uppercase tracking-wider mb-3">Visualisation du Graphe de Commits</span>
            
            <div className="relative flex-1 flex flex-col gap-3 justify-center min-h-[220px]">
              {/* Branch Lanes Visuals */}
              <div className="space-y-6 pl-4 border-l-2 border-slate-850 relative">
                {commits.map((commit, index) => (
                  <motion.div
                    key={commit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 relative"
                  >
                    {/* Circle representing the commit node */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border z-10 ${
                      commit.branch === 'main'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-emerald-600 border-emerald-400 text-white'
                    }`}>
                      <GitCommit className="w-3 h-3 text-white" />
                    </div>

                    {/* Description of the node */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-850">
                        {commit.id}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {commit.label}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.1 font-mono rounded ${
                        commit.branch === 'main' ? 'bg-indigo-950/40 text-indigo-400' : 'bg-emerald-950/40 text-emerald-400'
                      }`}>
                        {commit.branch}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-450 border-t border-slate-900 pt-3 mt-4">
              ℹ️ Une branche en Git n'est pas un dossier physique copié, c'est un simple <strong>pointeur mathématique</strong> glissant vers le dernier commit créé. C'est ce qui rend l'architecture Git si rapide et révolutionnaire.
            </div>
          </div>
        </div>
      </div>

      {/* GitHub & GitLens Impact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950/40 border border-slate-850 p-6 rounded-2xl">
          <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-purple-400" /> Le Pouvoir Social de GitHub
          </h3>
          <p className="text-xs text-slate-350 leading-relaxed mb-3">
            Créé en 2008, GitHub a propulsé Git au rang de réseau d'échange mondial. Le concept de la <strong>Pull Request (PR)</strong> a tout changé : un développeur n'envoie plus ses fichiers bruts, il soumet une "proposition de fusion" ouverte au débat, aux relectures de code collégiales et aux tests automatisés de sécurité avant intégration.
          </p>
          <p className="text-xs text-slate-350 leading-relaxed">
            C'est l'essence même de l'explosion des projets Open Source modernes. Tout le monde peut "forker" (dupliquer) un projet mondial de grande envergure (comme React ou Linux), y apporter une correction sur sa machine et la soumettre en un clic.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-850 p-6 rounded-2xl">
          <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" /> La Révolution GitLens dans l'IDE
          </h3>
          <p className="text-xs text-slate-350 leading-relaxed mb-3">
            Dans l'éditeur de code, des outils comme <strong>GitLens</strong> ont mis fin à la cécité du développeur en injectant l'historique du code ligne par ligne (concept de <em>Git Blame</em> en temps réel).
          </p>
          <p className="text-xs text-slate-350 leading-relaxed">
            D'un seul coup d'œil subtil en filigrane de sa ligne de code active, le développeur sait <strong>qui</strong> a modifié cette ligne, <strong>quand</strong> (il y a 3 mois ou 2 ans) et <strong>pourquoi</strong> (référence au ticket de tâche ou au numéro de Pull Request). Ce contexte historique ultra-précis accélère massivement la compréhension des bases de code complexes sans avoir à poser des questions sans fin aux anciens de l'équipe.
          </p>
        </div>
      </div>
    </div>
  );
}
