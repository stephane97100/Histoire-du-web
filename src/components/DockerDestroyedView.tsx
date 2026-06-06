/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Server, 
  Cpu, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  Flame, 
  Layers,
  FileCode,
  Globe,
  Info
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface DockerDestroyedViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function DockerDestroyedView({ theme }: DockerDestroyedViewProps) {
  const [buildStep, setBuildStep] = useState<'idle' | 'building' | 'built' | 'running'>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState<'php' | 'node' | 'python'>('php');
  const [activeSubTab, setActiveSubTab] = useState<'clash' | 'symfony' | 'emulator'>('clash');

  // Trigger simulated synthesizer audio feedback
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Browser audio context blocked
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActive: 'bg-[#000080] text-white font-bold p-2.5 border border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white p-2.5 text-left w-full text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none flex items-center justify-between',
          tag: 'bg-[#000080] text-white text-[9px] font-bold px-1.5 py-0.5 border border-white',
          terminal: 'bg-black text-[#00ff00] p-3 font-mono text-[11px] leading-relaxed border-2 border-inset border-white h-52 overflow-y-auto'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-2.5 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-2.5 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          tag: 'border border-[#ffb000] text-[#ffb000] text-[9px] font-bold px-1.5 py-0.5 bg-black',
          terminal: 'bg-black text-[#ffb000] p-3 font-mono text-[11px] leading-relaxed border border-[#ffb000]/41 h-52 overflow-y-auto'
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600/15 border border-indigo-500/50 text-indigo-400 font-semibold p-3.5 rounded-xl flex items-center justify-between text-xs transition text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border border-slate-850 hover:border-slate-755 text-slate-350 p-3.5 rounded-xl flex items-center justify-between text-xs transition cursor-pointer text-left w-full',
          tag: 'bg-indigo-500/15 text-indigo-400 text-[9px] font-bold px-2 py-0.5 border border-indigo-500/30 rounded-full',
          terminal: 'bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-200 h-52 overflow-y-auto leading-relaxed'
        };
    }
  };

  const css = getThemeClass();

  const handleSimulateBuild = () => {
    if (buildStep === 'building') return;
    playBeep(440, 'sine', 0.08);
    setBuildStep('building');
    setBuildLogs([]);
    
    const steps = [
      `[Docker Build] Sending build context to Docker daemon  2.41MB`,
      `[Docker Build] Step 1/5 : FROM ${selectedBase === 'php' ? 'php:8.2-fpm-alpine' : selectedBase === 'node' ? 'node:20-alpine' : 'python:3.10-alpine'}`,
      `[Docker Build] ---> Pulling image layers from docker.ioRegistry`,
      `[Docker Build] ---> layer 2490ac9a28eb: Downloading [===>                               ]`,
      `[Docker Build] ---> layer 2490ac9a28eb: Extracting completed...`,
      `[Docker Build] Step 2/5 : WORKDIR /var/www/html`,
      `[Docker Build] Step 3/5 : RUN ${selectedBase === 'php' ? 'apk add --no-cache libpq-dev && docker-php-ext-install pdo pdo_mysql' : 'npm install --production' }`,
      `[Docker Build] ---> Running inside container hash [63e528b12f]`,
      `[Docker Build] ---> Dependencies compiled and linked smoothly!`,
      `[Docker Build] Step 4/5 : COPY . .`,
      `[Docker Build] Step 5/5 : EXPOSE 3000`,
      `[Docker Build] Successfully built container image : local_museum_app:tag_v1.0.0`,
      `[Docker Build] Successfully tagged image metadata!`
    ];

    let i = 0;
    const interval = setInterval(() => {
      setBuildLogs(prev => [...prev, steps[i]]);
      playBeep(600 + i * 35, 'triangle', 0.02);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setBuildStep('built');
        playBeep(880, 'sine', 0.2);
      }
    }, 280);
  };

  const handleRunContainer = () => {
    if (buildStep !== 'built') return;
    setBuildStep('running');
    playBeep(660, 'sine', 0.1);
    setTimeout(() => playBeep(990, 'sine', 0.15), 100);

    const runLogs = [
      `\n`,
      `[Docker Run] launching: "docker run -p 3000:3000 local_museum_app:tag_v1.0.0"`,
      `[Docker Run] -----------------------------------------------------------------`,
      selectedBase === 'php' 
        ? `[Symfony Engine] [OK] Database connected on postgres://db_user:***@postgres_db:5432` 
        : selectedBase === 'node' 
        ? `[Vite Server] Server ready at http://localhost:3000` 
        : `[Gunicorn/Django] Listening on http://0.0.0.0:3000 (press CTRL+C to quit)`,
      selectedBase === 'php' 
        ? `[Symfony Engine] [INFO] Cache preheated of env: prod` 
        : ``,
      `[System Core] Container successfully synchronized on system virtualization layer.`,
      `[System Core] [READY] Port 3000 is open. The container runs identical to production context!`
    ].filter(l => l !== '');

    let i = 0;
    const interval = setInterval(() => {
      setBuildLogs(prev => [...prev, runLogs[i]]);
      i++;
      if (i >= runLogs.length) {
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div className="space-y-6" id="docker-destroyed-root">
      
      {/* Intro Banner Header Section */}
      <div className={`${
        theme === 'ie6' 
          ? 'bg-[#000080] text-white p-3 border-b border-white' 
          : theme === 'terminal' 
            ? 'bg-[#ffb000]/15 border border-[#ffb000]/40 text-[#ffb000] p-3' 
            : 'bg-gradient-to-r from-sky-950/20 to-slate-900 border border-slate-755 p-5 rounded-2xl shadow-md'
      } text-left`}>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-450/20">
            <Box className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest font-black text-sky-450 bg-sky-450/10 px-2 py-0.5 rounded-full uppercase">
              La Grande Révolution DevOps
            </span>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 mt-1">
              "Docker a tout détruit" : L'Ère de l'Isolation Légendaire
            </h2>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed opacity-85 mt-2.5 max-w-4xl">
          Découvrez pourquoi l'arrivée de la conteneurisation en 2013 a balayé le métier de webmaster classique, l'hébergement traditionnel à dossiers FTP (cPanel) et unifié le cycle de déploiement de tous les hébergeurs et frameworks mondiaux.
        </p>
      </div>

      {/* Triad Sub-navigation layout pills */}
      <div className="flex gap-2 border-b border-slate-800/60 pb-3 justify-start overflow-x-auto">
        <button
          onClick={() => {
            setActiveSubTab('clash');
            playBeep(400, 'sine', 0.05);
          }}
          className={`px-3 py-1.5 text-[11px] font-mono border whitespace-nowrap rounded-lg cursor-pointer ${
            activeSubTab === 'clash'
              ? 'bg-sky-505/15 border-sky-500/50 text-sky-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚔️ Avant vs Après Docker
        </button>
        <button
          onClick={() => {
            setActiveSubTab('symfony');
            playBeep(450, 'sine', 0.05);
          }}
          className={`px-3 py-1.5 text-[11px] font-mono border whitespace-nowrap rounded-lg cursor-pointer ${
            activeSubTab === 'symfony'
              ? 'bg-sky-505/15 border-sky-500/50 text-sky-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🐘 Le Cas Symfony & Frameworks
        </button>
        <button
          onClick={() => {
            setActiveSubTab('emulator');
            playBeep(500, 'sine', 0.05);
          }}
          className={`px-3 py-1.5 text-[11px] font-mono border whitespace-nowrap rounded-lg cursor-pointer ${
            activeSubTab === 'emulator'
              ? 'bg-sky-505/15 border-sky-500/50 text-sky-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🐳 Simulateur Docker Build & Run
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
        >
          
          {/* TAB 1: BEFORE vs AFTER CONTAINER HISTORY */}
          {activeSubTab === 'clash' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              
              {/* Legacy Block */}
              <div className={`${css.card} flex flex-col justify-between space-y-4`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-455 border-b border-rose-900/30 pb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <h4 className="text-xs font-mono font-extrabold uppercase">L'Ancien Monde : FTP, Apache & "Ma Machine"</h4>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed">
                    Avant Docker, le déploiement de sites consistait à exporter manuellement ses fichiers via un client FTP (comme <i>FileZilla</i> ou <i>gFTP</i>) vers des serveurs mutualisés disposant d'un cPanel. 
                  </p>
                  
                  <div className="space-y-2 text-[11px] font-sans">
                    <div className="p-3 bg-red-950/25 border border-red-900/30 rounded-lg space-y-1.5">
                      <b className="text-red-400 font-mono block">⚠️ Les Fléaux historiques :</b>
                      <ul className="list-disc pl-4 space-y-1 text-slate-350">
                        <li><b>chmod 777</b> : Attribuer les pleins pouvoirs système à tout le dossier web pour régler un souci de permission d'upload d'images, créant des failles béantes.</li>
                        <li><b>Le désastre de la version</b> : Un serveur PHP 5.6 en prod tandis que le local tourne en PHP 7.0. Le site plante sur une malheureuse virgule mal interprétée!</li>
                        <li><b>Les extensions manquantes</b> : Découvrir en panique que <code>php-gd</code>, <code>pdo-pgsq</code>, ou <code>memcached</code> ne sont pas installés sur la machine d'hébergement.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-[#1b1010]/30 border border-rose-900/20 rounded-lg text-[10px] font-mono text-rose-400">
                  ⚡ Statut d'Époque : "C'est bizarre, ça marche pourtant très bien chez moi !" (Phrase bannie depuis 2013).
                </div>
              </div>

              {/* Modern Containerized Block */}
              <div className={`${css.card} flex flex-col justify-between space-y-4`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-455 border-b border-emerald-900/30 pb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-xs font-mono font-extrabold uppercase">Le Nouveau Monde : Conteneur Unifié</h4>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed">
                    Docker a introduit la notion de <b>conteneurisation hermétique</b>. Un conteneur embarque le code de l'application, l'interpréteur (ex: PHP, Node), les extensions système et fichiers de configuration en une seule image scellée et immuable.
                  </p>
                  
                  <div className="space-y-2 text-[11px] font-sans">
                    <div className="p-3 bg-emerald-950/25 border border-emerald-950/30 rounded-lg space-y-1.5">
                      <b className="text-emerald-400 font-mono block">✅ Les Pouvoirs de Docker :</b>
                      <ul className="list-disc pl-4 space-y-1 text-slate-350">
                        <li><b>Considération immuable</b> : Ce qui est compilé en local s'exécutera à l'octet près à l'autre bout de la planète chez n'importe quel hébergeur moderne.</li>
                        <li><b>Infrastructure as Code</b> : Un simple fichier texte <code>Dockerfile</code> déclare toute l'infrastructure sous forme de code source versionnable sur Git.</li>
                        <li><b>Micro-services locaux</b> : Lever PostgreSQL, Redis, Mailhog et Elasticsearch en une seule commande <code>docker-compose up</code>.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/20 rounded-lg text-[10px] font-mono text-emerald-400">
                  ⚡ Règle d'or moderne : Le conteneur s'exécute de façon identique sous Windows, MacOS ou Cloud Run.
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FRAMEWORK FOCUS - SYMFONY, PHP, HOSTINGS */}
          {activeSubTab === 'symfony' && (
            <div className={`${css.card} text-left space-y-5`} id="symfony-docker-focus-pane">
              
              <div className="flex items-center gap-2.5 border-b border-slate-800/60 pb-3">
                <Flame className="w-5 h-5 text-sky-400" />
                <h4 className="text-xs font-mono font-black uppercase">
                  Pourquoi les Hébergeurs et Frameworks (comme Symfony) l'imposent
                </h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <div className="lg:col-span-7 space-y-3.5">
                  
                  <p className="text-[11.5px] text-slate-200 leading-relaxed">
                    Historiquement, les frameworks haut de gamme comme <b>Symfony (PHP)</b> exigent un grand nombre de services rattachés : bases de données robustes, moteurs d'indexation (Elasticsearch), serveurs de cache de données (Redis), démons d'exécution asynchrones (Swoole, PHP-FPM, RabbitMQ) pour les tâches planifiées. Un enfer d'installation manuelle !
                  </p>

                  <div className="space-y-3 scrollbar-none font-sans text-xs">
                    
                    <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                      <h5 className="font-bold text-sky-400 text-[11px] uppercase tracking-wide">
                        1. La fin d'Apache / PHP classique
                      </h5>
                      <p className="text-[11px] leading-relaxed text-slate-350">
                        Auparavant, le développeur installait de lourds utilitaires locaux comme <code>WAMP</code>, <code>MAMP</code> ou <code>XAMPP</code>. La configuration des VirtualHosts Apache, de la mémoire tampon <code>APC/OPCache</code> et de PHP-FPM différait systématiquement de la machine finale du fournisseur. Désormais, Symfony propose un package officiel et natif préconisé avec <b>Symfony Docker</b> pour créer instantanément des conteneurs isolés optimaux de niveau production.
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                      <h5 className="font-bold text-sky-400 text-[11px] uppercase tracking-wide">
                        2. L'adoption critique par les hébergeurs
                      </h5>
                      <p className="text-[11px] leading-relaxed text-slate-350">
                        Que ce soit pour Heroku, Clever Cloud, Platform.sh ou Cloud Run, les hébergeurs ont abandonné les scripts d'installation natifs pour tourner 100% en containers ou sur-couches d'images Docker. Cela élimine les risques de conflits entre versions de bibliothèques C système partagées ou d'incompatibilité de noyau Linux. L'application est autonome de bout en bout !
                      </p>
                    </div>

                  </div>

                </div>

                {/* Sidebar Technical specifications of Container layers */}
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-[9.5px] font-mono tracking-widest font-black uppercase text-slate-400 block border-b border-slate-800/40 pb-1">
                    🐳 Anatomie d'un Container Moderne
                  </span>

                  <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2.5 font-sans">
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 bg-sky-505/10 text-sky-300 rounded font-bold text-center text-[10px] flex items-center justify-center shrink-0 border border-sky-450/20">
                        L3
                      </div>
                      <div className="text-[11px] text-left">
                        <strong className="block text-slate-100 text-[9.5px] uppercase font-mono">Code Applicatif :</strong>
                        L'application Symfony (.env, controllers, views) copiée au cœur de la couche de rendu.
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 bg-indigo-505/10 text-indigo-300 rounded font-bold text-center text-[10px] flex items-center justify-center shrink-0 border border-indigo-450/20">
                        L2
                      </div>
                      <div className="text-[11px] text-left">
                        <strong className="block text-slate-100 text-[9.5px] uppercase font-mono">Bibliothèques Sûres :</strong>
                        Compilateur PHP 8.2, PDO MySQL, extension d'ajustement du cache (OPcache) figés une fois pour toutes.
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 bg-violet-505/10 text-violet-300 rounded font-bold text-center text-[10px] flex items-center justify-center shrink-0 border border-violet-450/20">
                        L1
                      </div>
                      <div className="text-[11px] text-left">
                        <strong className="block text-slate-100 text-[9.5px] uppercase font-mono">Image de base :</strong>
                        Alpine Linux léger et ultra-minimaliste (5 Mo) assurant une sécurité absolue.
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-850/60 text-[10px] font-mono text-amber-450 leading-relaxed">
                      💡 En combinant ces couches, le serveur de n'importe quel hébergeur n'a plus qu'à héberger un interpréteur générique de conteneurs !
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 3: THE DOCKER BUILD SIMULATOR TERMINAL */}
          {activeSubTab === 'emulator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Settings and config */}
              <div className="lg:col-span-5 space-y-4">
                <div className={css.card}>
                  <div className="text-[10px] tracking-wider uppercase font-mono font-bold text-sky-400 mb-1">
                    Configurations d'Hébergement :
                  </div>
                  <h4 className="text-xs font-bold font-sans text-slate-200 mb-2">Choisir l'Image de Base de l'Époque</h4>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedBase('php');
                        setBuildStep('idle');
                        setBuildLogs([]);
                        playBeep(450, 'sine', 0.05);
                      }}
                      className={`px-3 py-2 border rounded-xl flex items-center justify-between text-left cursor-pointer transition-all ${
                        selectedBase === 'php'
                          ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-400'
                          : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:text-slate-350'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">🐘</span>
                        <div>
                          <strong className="block text-[11px] font-mono leading-none">Symfony Engine Stack</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">PHP 8.2 FPM w/ PDO PostgreSQL</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBase('node');
                        setBuildStep('idle');
                        setBuildLogs([]);
                        playBeep(500, 'sine', 0.05);
                      }}
                      className={`px-3 py-2 border rounded-xl flex items-center justify-between text-left cursor-pointer transition-all ${
                        selectedBase === 'node'
                          ? 'bg-green-600/10 border-green-500/50 text-green-400'
                          : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:text-slate-350'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">🟢</span>
                        <div>
                          <strong className="block text-[11px] font-mono leading-none">Vite Node / React Hub</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">NodeJS 20.x Alpine Slim</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBase('python');
                        setBuildStep('idle');
                        setBuildLogs([]);
                        playBeep(550, 'sine', 0.05);
                      }}
                      className={`px-3 py-2 border rounded-xl flex items-center justify-between text-left cursor-pointer transition-all ${
                        selectedBase === 'python'
                          ? 'bg-yellow-600/10 border-yellow-500/50 text-yellow-400'
                          : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:text-slate-350'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">🐍</span>
                        <div>
                          <strong className="block text-[11px] font-mono leading-none">Python Django/FastAPI API</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">Python 3.10-alpine virtual environment</span>
                        </div>
                      </div>
                    </button>

                  </div>

                  {/* Actions Block */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col gap-2">
                    <button
                      onClick={handleSimulateBuild}
                      disabled={buildStep === 'building'}
                      className="w-full py-2 bg-sky-655 hover:bg-sky-555 text-sky-100 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-black text-xs transition border border-sky-505 disabled:opacity-40"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${buildStep === 'building' ? 'animate-spin' : ''}`} />
                      <span>{buildStep === 'building' ? 'Compilation Docker en cours...' : '1. Compiler l\'image (docker build)'}</span>
                    </button>

                    <button
                      onClick={handleRunContainer}
                      disabled={buildStep !== 'built'}
                      className="w-full py-2 bg-emerald-655 hover:bg-emerald-555 text-emerald-100 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-black text-xs transition border border-emerald-505 disabled:opacity-40"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>2. Lancer le Container (docker run)</span>
                    </button>
                  </div>

                </div>

                <div className="rounded-xl p-3 bg-slate-950/40 border border-slate-850/60 text-[10.5px] text-slate-400 leading-normal font-sans">
                  <h6 className="font-extrabold uppercase text-[9px] text-slate-300 flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5 text-sky-400" /> Vocation Pédagogique
                  </h6>
                  <p className="opacity-90">
                    Ce terminal simplifie et documente les opérations systémiques de création d'images de conteneur. Il illustre l'intégration hermétique de votre environnement de dev vécue au quotidien par des millions de codeurs.
                  </p>
                </div>
              </div>

              {/* Shell output monitor console */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex justify-between items-center px-1 font-mono text-[9px] text-slate-400">
                  <span>📟 Console Terminal Docker Interactive</span>
                  <span>Port : 3000 mapped</span>
                </div>

                <div className={css.terminal} id="docker-emulator-terminal-display">
                  {buildLogs.length === 0 ? (
                    <div className="text-slate-500 h-full flex flex-col items-center justify-center text-center space-y-1.5 py-12">
                      <Terminal className="w-8 h-8 opacity-40 text-slate-500" />
                      <p className="font-mono text-[10.5px]">En attente de commandes... Cliquez sur "1. Compiler l'image" pour démarrer.</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {buildLogs.map((log, index) => (
                        <div key={index} className="font-mono text-[11px]">
                          {log}
                        </div>
                      ))}
                      {buildStep === 'building' && (
                        <div className="inline-block w-2.5 h-4 bg-sky-500 animate-pulse ml-0.5" />
                      )}
                    </div>
                  )}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-850 rounded-xl text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      buildStep === 'idle' ? 'bg-slate-500' :
                      buildStep === 'building' ? 'bg-amber-500 animate-ping' :
                      buildStep === 'built' ? 'bg-sky-500' : 'bg-emerald-500 animate-pulse'
                    }`} />
                    <span className="text-slate-400">Statut : 
                      <b className="text-slate-200 uppercase ml-1">
                        {buildStep === 'idle' && 'Arrêté'}
                        {buildStep === 'building' && 'Compilation de l\'image en cours'}
                        {buildStep === 'built' && 'Image compilée (Prête à lancer)'}
                        {buildStep === 'running' && 'Container Actif - Port 3000'}
                      </b>
                    </span>
                  </div>
                  <span className="text-slate-500">v1.1.0</span>
                </div>

              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Share Actions Bar footer */}
      <div className="pt-2 border-t border-slate-800/40 select-none">
        <ShareButtons
          theme={theme}
          title="Musée du Web — Docker a tout détruit !"
          text="J'ai testé l'histoire de la conteneurisation et des raccordements Symfony/Docker sur le Musée interactif du Web !"
        />
      </div>

    </div>
  );
}
