/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Layout,
  Layers,
  Sparkles,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Maximize2,
  Minimize2,
  BatteryCharging,
  Cpu,
  RefreshCw,
  Database,
  Terminal,
  Clock,
  ExternalLink,
  RotateCcw,
  Monitor,
  Flame,
  FileCode,
  Eye,
  Settings,
  ShieldAlert
} from 'lucide-react';

interface WebWarsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
  warId: 'integration' | 'xhtml_vs_html5' | 'flash_vs_html5' | 'angular_vs_react' | 'tool_war' | 'apache_vs_nginx' | 'js_engines';
}

export default function WebWarsView({ theme, warId }: WebWarsViewProps) {
  // Styles based on active theme
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#d4d0c8] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans rounded-none text-left',
          header: 'bg-[#000080] text-white p-1.5 font-bold text-xs border border-white flex items-center justify-between',
          panel: 'bg-[#dee3e7] border border-[#808080] p-3 text-xs space-y-3 text-black',
          btnActive: 'bg-[#000080] text-white font-bold px-3 py-1.5 border-2 border-white text-xs rounded-none shadow-sm',
          btnInactive: 'bg-[#d4d0c8] text-black border-2 border-white px-3 py-1.5 text-xs cursor-pointer hover:bg-[#c0c0c0] rounded-none active:border-b-white active:border-r-white',
          badgeWinner: 'bg-[#008000] text-white px-2 py-0.5 border border-white font-mono text-[10px] font-bold uppercase',
          codeBg: 'bg-white border border-[#808080] p-3 font-mono text-xs text-black overflow-x-auto shadow-inner',
          accentText: 'text-[#000080] font-bold'
        };
      case 'terminal':
        return {
          card: 'bg-black border border-[#ffb000]/40 p-4 text-[#ffb000] font-mono rounded-none text-left',
          header: 'bg-black border-b border-[#ffb000]/40 pb-2 font-bold text-xs flex items-center justify-between uppercase tracking-wider',
          panel: 'bg-black border border-[#ffb000]/20 p-3 text-xs space-y-3 text-[#ffb000]',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/20 px-3 py-1.5 text-xs rounded-none text-[#ffb000] font-bold',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/60 hover:bg-[#ffb000]/5 px-3 py-1.5 text-xs cursor-pointer rounded-none text-[#ffb000]/70',
          badgeWinner: 'border border-[#ffb000] bg-[#ffb000]/10 text-[#ffb000] px-2 py-0.5 text-[10px] font-bold uppercase',
          codeBg: 'bg-[#050505] border border-[#ffb000]/25 p-3 font-mono text-xs text-[#ffb000]/90 overflow-x-auto',
          accentText: 'text-[#ffb000] font-bold'
        };
      default: // Modern
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4 text-left text-slate-100',
          header: 'bg-[#1a1a20] p-3 rounded-xl border border-slate-800 text-sm font-bold text-white flex items-center justify-between',
          panel: 'bg-[#16161a]/60 border border-[#2a2a2e] p-4 rounded-xl space-y-3 text-xs text-slate-300',
          btnActive: 'bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg text-xs transition shadow-md shadow-indigo-900/20',
          btnInactive: 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-xs transition cursor-pointer',
          badgeWinner: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide',
          codeBg: 'bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto',
          accentText: 'text-indigo-400 font-semibold'
        };
    }
  };

  const css = getThemeClass();

  // Sounds helper
  const playSfx = (freq: number, type: 'sine' | 'square' | 'triangle' = 'sine', duration = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Browser policy blocker
    }
  };

  // --- WAR 1: INTEGRATION (Tableaux vs CSS) ---
  const [resizeWidth, setResizeWidth] = useState<number>(100); // percentage (50% to 100%)
  const [integrationCodeTab, setIntegrationCodeTab] = useState<'table' | 'css'>('table');

  // --- WAR 2: XHTML vs HTML5 ---
  const [xhtmlValidatorErrors, setXhtmlValidatorErrors] = useState({
    missingCloseImg: true,
    uppercaseTags: false,
    unquotedAttrs: false
  });
  const [xhtmlMode, setXhtmlMode] = useState<'xhtml' | 'html5'>('xhtml');
  const [xhtmlValidationLogs, setXhtmlValidationLogs] = useState<string[]>([]);

  const handleToggleValidatorError = (key: 'missingCloseImg' | 'uppercaseTags' | 'unquotedAttrs') => {
    setXhtmlValidatorErrors(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      playSfx(500, 'sine', 0.05);
      return updated;
    });
  };

  // --- WAR 3: FLASH vs OPEN WEB ---
  const [flashSimulatorRunning, setFlashSimulatorRunning] = useState<boolean>(true);
  const [flashSimulatorLogs, setFlashSimulatorLogs] = useState<string[]>([]);
  const [flashBattery, setFlashBattery] = useState<number>(98);
  const [flashSavesCount, setFlashSavesCount] = useState<number>(0);
  const [secAlarms, setSecAlarms] = useState<string[]>([]);
  const [bounceBallPos, setBounceBallPos] = useState({ x: 50, y: 50 });
  const [bounceBallSpeed, setBounceBallSpeed] = useState({ dx: 2.2, dy: 1.8 });

  // Animation Loop for Flash Bouncing Ball Simulator
  useEffect(() => {
    let animId: number;
    const updateBall = () => {
      if (flashSimulatorRunning) {
        setBounceBallPos(prev => {
          let nx = prev.x + bounceBallSpeed.dx;
          let ny = prev.y + bounceBallSpeed.dy;
          let ndx = bounceBallSpeed.dx;
          let ndy = bounceBallSpeed.dy;

          if (nx <= 5 || nx >= 95) {
            ndx = -ndx;
            playSfx(220, 'square', 0.05);
          }
          if (ny <= 5 || ny >= 95) {
            ndy = -ndy;
            playSfx(260, 'square', 0.05);
          }

          if (ndx !== bounceBallSpeed.dx || ndy !== bounceBallSpeed.dy) {
            setBounceBallSpeed({ dx: ndx, dy: ndy });
          }

          return { x: nx, y: ny };
        });

        // Drain battery
        setFlashBattery(b => {
          if (b <= 5) return 5;
          const drainRate = 0.03;
          return parseFloat((b - drainRate).toFixed(2));
        });
      }
      animId = requestAnimationFrame(updateBall);
    };

    animId = requestAnimationFrame(updateBall);
    return () => cancelAnimationFrame(animId);
  }, [flashSimulatorRunning, bounceBallSpeed]);

  // Handle Security attack or trigger in Flash
  const triggerFlashAttack = () => {
    playSfx(100, 'square', 0.3);
    const newAlarm = `[WARN ${new Date().toLocaleTimeString()}] Faille Flash Player : Buffer Overflow exploité via ActionScript 2.0 (CVE-2010-2883)`;
    setSecAlarms(prev => [newAlarm, ...prev].slice(0, 5));
  };

  // --- WAR 4: ANGULAR VS REACT ---
  const [angInput, setAngInput] = useState<string>('Hello World');
  const [reactInput, setReactInput] = useState<string>('Hello World');
  const [angDigestCount, setAngDigestCount] = useState<number>(0);
  const [reactDiffCount, setReactDiffCount] = useState<number>(0);
  const [reactDomPatches, setReactDomPatches] = useState<string[]>([]);
  const [angularDirtyChecks, setAngularDirtyChecks] = useState<string[]>([]);

  const handleAngInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAngInput(val);
    setAngDigestCount(prev => prev + 1);
    playSfx(300, 'sine', 0.03);
    setAngularDirtyChecks(prev => [
      `[Digest Cycle #${angDigestCount + 1}] Vérification sale de 'angInput' : '${val}'`,
      `[Digest Cycle #${angDigestCount + 1}] Re-rendu complet du scope local et évaluation des directives`,
      ...prev
    ].slice(0, 6));
  };

  const handleReactInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setReactInput(val);
    setReactDiffCount(prev => prev + 1);
    playSfx(420, 'sine', 0.03);
    setReactDomPatches(prev => [
      `[React Update #${reactDiffCount + 1}] Virtuel DOM re-calculé. Diff détecté sur <span id="msg">`,
      `[React Update #${reactDiffCount + 1}] Patch appliqué au DOM réel pour le nœud texte uniquement (0ms)`,
      ...prev
    ].slice(0, 6));
  };

  // --- WAR 5: GRUNT vs GULP vs WEBPACK ---
  const [activeTool, setActiveTool] = useState<'grunt' | 'gulp' | 'webpack'>('grunt');
  const [toolBuildStatus, setToolBuildStatus] = useState<'idle' | 'building' | 'done'>('idle');
  const [toolBuildLogs, setToolBuildLogs] = useState<string[]>([]);
  const [benchmarkTimes, setBenchmarkTimes] = useState({ grunt: '3420ms', gulp: '1210ms', webpack: '450ms' });

  const runToolBuild = () => {
    setToolBuildStatus('building');
    setToolBuildLogs(['[Build lancé...]']);
    playSfx(350, 'triangle', 0.1);

    let logs: string[] = [];
    if (activeTool === 'grunt') {
      logs = [
        "1. Lecture du fichier source 'src/app.js'...",
        "2. Ecriture du fichier temporaire 'tmp/app.concat.js' sur le disque dur...",
        "   💾 [I/O Disque] Fichier temporaire écrit (45KB)",
        "3. Lecture du fichier temporaire 'tmp/app.concat.js'...",
        "4. Exécution du plugin 'grunt-contrib-uglify' pour minification...",
        "5. Ecriture du fichier temporaire 'tmp/app.min.js' sur le disque dur...",
        "   💾 [I/O Disque] Fichier temporaire écrit (18KB)",
        "6. Nettoyage du dossier 'tmp/'...",
        "7. Ecriture finale dans 'dist/bundle.js'...",
        "✅ Task 'default' complétée en 3420ms !"
      ];
    } else if (activeTool === 'gulp') {
      logs = [
        "1. Initialisation du flux de données Gulp (gulp.src)...",
        "2. Transmission en mémoire (Stream) vers 'gulp-concat'...",
        "   🚀 [Mémoire RAM Stream] Pas d'écriture disque !",
        "3. Transmission en mémoire (Stream) vers 'gulp-uglify'...",
        "4. Sortie du flux final vers le dossier de destination (gulp.dest)...",
        "✅ Gulp Build complété avec succès en 1210ms !"
      ];
    } else {
      logs = [
        "1. Analyse de l'arbre des dépendances depuis 'src/index.js'...",
        "   📦 Webpack résout 14 dépendances circulaires",
        "2. Application du chargeur 'babel-loader' en mémoire virtuelle...",
        "3. Optimisation de l'arbre syntaxique (Tree-Shaking)...",
        "   ✂️ Suppression de 4 variables et 2 fonctions mortes de la production !",
        "4. Génération du bundle optimisé avec hash : dist/bundle.[contenthash].js",
        "✅ Webpack Compilation finie en 450ms !"
      ];
    }

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setToolBuildLogs(prev => [...prev, logs[currentLogIndex]]);
        playSfx(440 + currentLogIndex * 40, 'sine', 0.03);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setToolBuildStatus('done');
        playSfx(600, 'sine', 0.2);
      }
    }, 200);
  };

  // --- WAR 6: APACHE vs NGINX ---
  const [serverSimRunning, setServerSimRunning] = useState<boolean>(false);
  const [serverSimProgress, setServerSimProgress] = useState<number>(0);
  const [serverSimRequests, setServerSimRequests] = useState<number>(100);
  const [serverLogs, setServerLogs] = useState<string[]>([]);
  const [activeServerTab, setActiveServerTab] = useState<'apache' | 'nginx'>('apache');
  const [apacheMemory, setApacheMemory] = useState<number>(128); // MB
  const [nginxMemory, setNginxMemory] = useState<number>(14); // MB
  const [apacheResponseTime, setApacheResponseTime] = useState<number>(45); // ms
  const [nginxResponseTime, setNginxResponseTime] = useState<number>(4); // ms
  const [apacheFailureRate, setApacheFailureRate] = useState<number>(0); // %
  const [nginxFailureRate, setNginxFailureRate] = useState<number>(0); // %

  const runServerBenchmark = () => {
    if (serverSimRunning) return;
    setServerSimRunning(true);
    setServerSimProgress(0);
    setServerSimRequests(100);
    setApacheMemory(128);
    setNginxMemory(14);
    setApacheResponseTime(45);
    setNginxResponseTime(4);
    setApacheFailureRate(0);
    setNginxFailureRate(0);
    setServerLogs(['[Simulation lancée...] Établissement de la connexion...']);
    playSfx(400, 'triangle', 0.15);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setServerSimProgress(progress);

      setServerSimRequests(r => {
        const nextRequests = Math.min(10000, r + 990);
        
        setApacheMemory(m => {
          if (nextRequests > 5000) {
            setApacheFailureRate(fr => Math.min(95, fr + 8));
            setApacheResponseTime(rt => rt + 80);
            return Math.min(2048, m + 180);
          }
          setApacheResponseTime(rt => rt + 15);
          return m + 35;
        });

        setNginxMemory(m => {
          setNginxResponseTime(rt => Math.min(8, rt + 0.3));
          return Math.min(18, m + 0.4);
        });

        if (nextRequests === 1090) {
          setServerLogs(prev => [`[INFO] Trafic en hausse : 1000 connexions actives. Apache consomme plus de processus.`, ...prev]);
          playSfx(500, 'sine', 0.05);
        } else if (nextRequests === 5050) {
          setServerLogs(prev => [
            `[WARN] Apache thread pool saturé. Lancement de nouveaux processus lourds...`,
            `[INFO] Nginx gère l'event-loop asynchrone (epoll/kqueue) sans créer de nouveaux threads.`,
            ...prev
          ]);
          playSfx(400, 'square', 0.08);
        } else if (nextRequests === 10000) {
          setServerLogs(prev => [
            `🔴 [CRASH] Apache : Erreur de segmentation ou Timeout sur 32% des sockets !`,
            `🟢 [OK] Nginx : 10 000 requêtes gérées avec brio en asynchrone sans faiblir.`,
            `✅ Simulation C10k terminée avec succès !`,
            ...prev
          ]);
          playSfx(600, 'sine', 0.2);
        }

        return nextRequests;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setServerSimRunning(false);
      }
    }, 250);
  };

  // --- WAR 7: JS ENGINES ---
  const [engineType, setEngineType] = useState<'standard' | 'v8'>('standard');
  const [executionRunning, setExecutionRunning] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [engineLogs, setEngineLogs] = useState<string[]>([]);

  const runJsEngineBenchmark = () => {
    if (executionRunning) return;
    setExecutionRunning(true);
    setExecutionTime(null);
    setEngineLogs(['[JS Code Executor] Lancement du benchmark algorithmique...', 'Calcul de la suite de Fibonacci (N=35)...']);
    playSfx(300, 'sine', 0.1);

    setTimeout(() => {
      if (engineType === 'standard') {
        setExecutionTime(2450);
        setEngineLogs(prev => [
          ...prev,
          '🐢 Interprétation ligne par ligne de l\'AST (Arbre Syntaxique Abstrait)...',
          '⚠️ Garbage Collector bloquant détecté (Stop-the-world de 150ms).',
          '❌ Temps total de calcul : 2450 ms'
        ]);
        playSfx(150, 'square', 0.4);
      } else {
        setExecutionTime(12);
        setEngineLogs(prev => [
          ...prev,
          '🚀 Compilateur JIT V8 : Traduction directe à la volée vers du code machine assembleur natif !',
          '🔥 Optimisation adaptative (Crankshaft/TurboFan) active.',
          '✅ Temps total de calcul : 12 ms (Performance brute)'
        ]);
        playSfx(880, 'sine', 0.2);
      }
      setExecutionRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6" id={`web-war-${warId}`}>
      
      {/* Immersive Header of the specific War */}
      {warId === 'integration' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Layout className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La guerre de l'intégration : Tableaux (&lt;table&gt;) vs CSS (&lt;div&gt;)</h2>
                <p className="text-[10px] opacity-75 mt-0.5">Fin des années 90 - Milieu des années 2000 • La guerre de la sémantique et de la mise en page.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : CSS &lt;div&gt; (KO)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Avant que le CSS ne soit performant, la seule façon de créer des mises en page complexes (des colonnes, des marges, des blocs) était de détourner la balise HTML <code className="bg-black/40 px-1 py-0.5 rounded text-rose-400">&lt;table&gt;</code>. Les développeurs imbriquaient des tableaux dans des tableaux pour forcer le design.
            </p>
            <p>
              Quand les standards du web ont poussé pour l'utilisation du CSS et des balises <code className="bg-black/40 px-1 py-0.5 rounded text-emerald-400">&lt;div&gt;</code> (pour séparer le contenu de la présentation), une immense résistance a eu lieu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-rose-950/10 border border-rose-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-rose-400 block mb-1">📦 Le camp des Tableaux</span>
                <p className="text-[11px] text-slate-350">"C'est moche, mais au moins ça s'affiche pareil sur tous les navigateurs et ça ne casse pas !"</p>
              </div>
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-emerald-400 block mb-1">🎨 Le camp du CSS</span>
                <p className="text-[11px] text-slate-350">"Les tableaux sont faits pour les données, pas pour le design ! Votre code est illisible."</p>
              </div>
            </div>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> Le CSS a gagné par KO, devenant le standard absolu, ouvrant plus tard la voie au design responsive.
            </p>
          </div>

          {/* Interactive Responsive Breakout Simulator */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Simulateur de comportement : Redimensionnement d'écran
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setIntegrationCodeTab('table'); playSfx(200); }}
                  className={`${integrationCodeTab === 'table' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Code Tableaux
                </button>
                <button
                  onClick={() => { setIntegrationCodeTab('css'); playSfx(250); }}
                  className={`${integrationCodeTab === 'css' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Code CSS &lt;div&gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6 space-y-2">
                <span className="text-[10px] font-mono text-slate-450 block uppercase">📄 Code source du gabarit :</span>
                {integrationCodeTab === 'table' ? (
                  <pre className={css.codeBg}>
{`<table border="0" width="100%" cellpadding="10">
  <tr>
    <td colspan="2" bgcolor="#000080">
      <font color="#ffffff">Mon En-tête</font>
    </td>
  </tr>
  <tr>
    <td width="25%" bgcolor="#c0c0c0" valign="top">
      <b>Menu de navigation</b><br>
      • Lien 1<br>• Lien 2
    </td>
    <td width="75%" bgcolor="#ffffff" valign="top">
      <h2>Contenu Principal</h2>
      <p>Ici, un texte très large qui ne peut pas se casser facilement...</p>
    </td>
  </tr>
</table>`}
                  </pre>
                ) : (
                  <pre className={css.codeBg}>
{`<header className="bg-indigo-650 p-4 text-white">
  Mon En-tête
</header>
<div className="flex flex-col md:flex-row gap-4 mt-3">
  <aside className="w-full md:w-1/4 bg-slate-800 p-3">
    <b>Menu</b>
  </aside>
  <main className="flex-1 bg-slate-900 p-4">
    <h2>Contenu Principal</h2>
  </main>
</div>`}
                  </pre>
                )}
              </div>

              {/* Simulated render with manual resize slider */}
              <div className="md:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span>Largeur du Navigateur Virtuel :</span>
                    <strong className="text-indigo-400">{resizeWidth}%</strong>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="100"
                    value={resizeWidth}
                    onChange={(e) => {
                      setResizeWidth(parseInt(e.target.value));
                      if (parseInt(e.target.value) % 10 === 0) playSfx(300 + parseInt(e.target.value) * 2, 'sine', 0.02);
                    }}
                    className="w-full accent-indigo-500 cursor-ew-resize"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>Mobile (320px)</span>
                    <span>Tablette (768px)</span>
                    <span>Desktop (1200px)</span>
                  </div>
                </div>

                <div className="border border-slate-750 rounded-xl overflow-hidden bg-slate-950 p-2.5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">🖥️ Rendu visuel simulé :</span>
                  
                  {/* Container representing the browser width */}
                  <div 
                    className="border border-slate-800 bg-[#16161a] transition-all duration-150 mx-auto overflow-hidden shadow-2xl"
                    style={{ width: `${resizeWidth}%`, minHeight: '160px' }}
                  >
                    {integrationCodeTab === 'table' ? (
                      /* Table design simulation */
                      <div className="text-[10px] text-black w-full min-w-[340px]">
                        <table className="w-full border-collapse" cellPadding={6}>
                          <tbody>
                            <tr className="bg-[#000080] text-white">
                              <td colSpan={2} className="font-bold border border-[#808080] p-1.5 text-center text-[9px]">Mon En-tête Rétro (Tableau rigide)</td>
                            </tr>
                            <tr>
                              <td width="25%" className="bg-[#c0c0c0] align-top border border-[#808080] p-1.5 font-bold whitespace-nowrap text-[8.5px]">
                                Navigation<br/>• Lien 1<br/>• Lien 2
                              </td>
                              <td width="75%" className="bg-white align-top border border-[#808080] p-1.5 text-[8.5px]">
                                <h4 className="font-bold text-black text-[9px] mb-1">Contenu Principal</h4>
                                <p className="text-slate-800 leading-tight">Ce texte rigide et le tableau provoquent un <span className="text-red-700 font-extrabold">bug d'affichage critique</span> (débordement) sur écran étroit car les tableaux figent les largeurs de colonnes !</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {resizeWidth < 60 && (
                          <div className="bg-rose-900/90 text-white p-1 text-[8.5px] font-mono text-center animate-pulse">
                            ⚠️ DÉBORDEMENT HORIZONTAL CONSTANT !
                          </div>
                        )}
                      </div>
                    ) : (
                      /* CSS Responsive design simulation */
                      <div className="text-[10px] text-slate-200 p-2 space-y-1.5">
                        <header className="bg-indigo-700/80 p-1.5 rounded text-center text-white font-bold text-[9px]">
                          Mon En-tête (Responsive CSS)
                        </header>
                        <div className={`flex ${resizeWidth < 65 ? 'flex-col' : 'flex-row'} gap-1.5`}>
                          <aside className="bg-slate-800/80 p-1.5 rounded shrink-0 text-[8.5px]" style={{ width: resizeWidth < 65 ? '100%' : '25%' }}>
                            <strong className="text-slate-300">Menu</strong>
                            <div className="opacity-70 mt-0.5">• Accueil • Profil</div>
                          </aside>
                          <main className="bg-slate-900/90 p-1.5 rounded flex-1 text-[8.5px]">
                            <strong className="text-slate-300 block text-[9px]">Contenu Fluide</strong>
                            <p className="text-slate-400 mt-0.5 leading-tight">Le layout s'adapte parfaitement. Les blocs se replient verticalement en dessous d'un certain seuil. Zéro défilement horizontal parasite !</p>
                          </main>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {warId === 'xhtml_vs_html5' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La rébellion des standards : W3C (XHTML) vs. WHATWG (HTML5)</h2>
                <p className="text-[10px] opacity-75 mt-0.5">Années 2004 - 2010 • La pureté théorique contre le pragmatisme du web.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : WHATWG (HTML5)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Celle-ci est moins connue du grand public mais fondamentale pour ceux qui écrivent du code.
            </p>
            <p>
              <strong className="text-rose-400">Le combat :</strong> Au début des années 2000, le W3C (l'organisme officiel du web) voulait forcer le web à devenir strict avec XHTML 2.0. Si vous oubliez de fermer une balise, la page entière plante. Une approche théorique pure, mais catastrophique pour la réalité du web. Des développeurs de chez Apple, Mozilla et Opera se sont rebellés, ont fondé le WHATWG dans leur coin, et ont commencé à travailler sur HTML5, une évolution pragmatique, rétrocompatible et indulgente envers les erreurs de code.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-rose-950/10 border border-rose-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-rose-400 block mb-1">📐 XHTML (W3C)</span>
                <p className="text-[11px] text-slate-350">La pureté du code rigide et strict. Tolérance zéro pour les erreurs syntaxiques sous peine de bloquer tout le rendu (Yellow Screen of Death).</p>
              </div>
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-emerald-400 block mb-1">🛠️ HTML5 (WHATWG)</span>
                <p className="text-[11px] text-slate-350">Le pragmatisme d'abord. On pardonne les erreurs d'imbrication ou de fermeture pour que l'expérience utilisateur reste fluide et ininterrompue.</p>
              </div>
            </div>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> Le WHATWG. Le W3C a finalement dû abandonner XHTML 2.0 et adopter HTML5. Aujourd'hui, c'est le WHATWG qui a le contrôle quasi total sur ce qu'est le standard HTML.
            </p>
          </div>

          {/* Interactive Parser Playground */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Simulateur de parseur de navigateur : XHTML vs HTML5
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setXhtmlMode('xhtml'); playSfx(300); }}
                  className={`${xhtmlMode === 'xhtml' ? css.btnActive : css.btnInactive} py-1 px-2.5 text-[10px]`}
                >
                  Parseur XHTML (Strict)
                </button>
                <button
                  onClick={() => { setXhtmlMode('html5'); playSfx(350); }}
                  className={`${xhtmlMode === 'html5' ? css.btnActive : css.btnInactive} py-1 px-2.5 text-[10px]`}
                >
                  Parseur HTML5 (Pragmatique)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Controls */}
              <div className="md:col-span-5 space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">⚡ Introduire des erreurs de syntaxe :</span>
                
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={xhtmlValidatorErrors.missingCloseImg}
                    onChange={() => handleToggleValidatorError('missingCloseImg')}
                    className="mt-0.5 rounded accent-indigo-500"
                  />
                  <div className="text-xs">
                    <strong className="block text-slate-200">Balise image non fermée</strong>
                    <code className="text-[10px] opacity-75 text-rose-300">&lt;img src="logo.png"&gt;</code> au lieu de <code className="text-[10px] opacity-75 text-emerald-400">&lt;img src="..." /&gt;</code>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={xhtmlValidatorErrors.uppercaseTags}
                    onChange={() => handleToggleValidatorError('uppercaseTags')}
                    className="mt-0.5 rounded accent-indigo-500"
                  />
                  <div className="text-xs">
                    <strong className="block text-slate-200">Balise en MAJUSCULE</strong>
                    <code className="text-[10px] opacity-75 text-rose-300">&lt;BR&gt;</code> au lieu de <code className="text-[10px] opacity-75 text-emerald-400">&lt;br /&gt;</code>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={xhtmlValidatorErrors.unquotedAttrs}
                    onChange={() => handleToggleValidatorError('unquotedAttrs')}
                    className="mt-0.5 rounded accent-indigo-500"
                  />
                  <div className="text-xs">
                    <strong className="block text-slate-200">Attributs sans guillemets</strong>
                    <code className="text-[10px] opacity-75 text-rose-300">width=100</code> au lieu de <code className="text-[10px] opacity-75 text-emerald-400">width="100"</code>
                  </div>
                </label>
              </div>

              {/* Console rendering outcome */}
              <div className="md:col-span-7 space-y-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">📺 Sortie d'affichage &amp; Logs :</span>
                
                <div className="min-h-[170px] bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs flex flex-col justify-between">
                  {xhtmlMode === 'xhtml' && (xhtmlValidatorErrors.missingCloseImg || xhtmlValidatorErrors.uppercaseTags || xhtmlValidatorErrors.unquotedAttrs) ? (
                    /* The dreaded yellow XML screen of death */
                    <div className="bg-[#ffffcc] text-[#ff0000] p-4 border-2 border-[#ff0000] text-xs space-y-2 h-full rounded">
                      <div className="flex items-center gap-2 font-bold text-red-800">
                        <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
                        <span>ERREUR DE PARSING XML FATALE (XHTML Strict Mode)</span>
                      </div>
                      <p className="font-mono text-[10.5px] leading-relaxed">
                        Le document XML n'est pas bien formé !<br/>
                        {xhtmlValidatorErrors.missingCloseImg && <span>• Erreur de fermeture : La balise 'img' doit être fermée de manière conforme.<br/></span>}
                        {xhtmlValidatorErrors.uppercaseTags && <span>• Erreur de casse : Les balises XML doivent être en minuscules ('BR' est non valide).<br/></span>}
                        {xhtmlValidatorErrors.unquotedAttrs && <span>• Erreur d'attributs : Les attributs XHTML doivent être entourés de guillemets.<br/></span>}
                      </p>
                      <p className="text-[9.5px] text-slate-700 italic border-t border-red-300 pt-1">
                        &gt; Le moteur de rendu a stoppé tout affichage pour se conformer au standard W3C. Page blanche provoquée.
                      </p>
                    </div>
                  ) : (
                    /* HTML5 rendering - works beautifully no matter what, with internal autocorrect warning */
                    <div className="space-y-3 h-full flex flex-col justify-between">
                      <div className="bg-emerald-950/20 text-emerald-400 p-2 border border-emerald-500/20 rounded text-[11px] leading-relaxed">
                        <span className="font-extrabold block">✨ RENDU OK (HTML5 Pragmatique)</span>
                        <p className="opacity-90">"The Show Must Go On !" Malgré la mauvaise syntaxe, la page s'affiche parfaitement pour l'internaute.</p>
                      </div>

                      <div className="bg-[#121214] p-2.5 rounded border border-slate-900 text-slate-400 text-[10px] space-y-1">
                        <span className="text-slate-500 block uppercase font-bold tracking-wider text-[8px]">[CONSOLE NAVIGATEUR CORRECTION] :</span>
                        {xhtmlValidatorErrors.missingCloseImg && <p className="text-amber-400">• [Avertissement] Balise &lt;img&gt; non fermée. Auto-corrigée par l'algorithme HTML5.</p>}
                        {xhtmlValidatorErrors.uppercaseTags && <p className="text-amber-400">• [Avertissement] Balise &lt;BR&gt; lue en majuscules. Normalisée automatiquement en &lt;br&gt;.</p>}
                        {xhtmlValidatorErrors.unquotedAttrs && <p className="text-amber-400">• [Avertissement] Attribut 'width' sans guillemets. Valeur injectée de manière tolérante.</p>}
                        {!xhtmlValidatorErrors.missingCloseImg && !xhtmlValidatorErrors.uppercaseTags && !xhtmlValidatorErrors.unquotedAttrs && <p className="text-slate-500">• Syntaxe parfaite. Aucune correction nécessaire.</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {warId === 'flash_vs_html5' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La guerre du multimédia : Adobe Flash vs. HTML5</h2>
                <p className="text-[10px] opacity-75 mt-0.5">Fin des années 2000 - 2010 • Plugins propriétaires vs Standards ouverts.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : HTML5 / Standards ouverts</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Pendant des années, le web natif était trop pauvre pour offer des animations fluides, de la vidéo ou des jeux complexes. Adobe Flash dominait le marché de manière écrasante : si on voulait de l'interactivité avancée, il fallait installer le plugin.
            </p>
            <p>
              <strong className="text-indigo-400">Le combat :</strong> L'arrivée du W3C et du WHATWG avec la spécification HTML5 (intégrant nativement les balises &lt;video&gt;, &lt;canvas&gt;, etc.) a commencé à menacer Flash. Le coup de grâce a été porté en 2010 par Steve Jobs avec sa lettre ouverte "Thoughts on Flash", interdisant la technologie sur iOS pour des raisons de performances, de batterie et de sécurité.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-rose-950/10 border border-rose-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-rose-400 block mb-1">🎮 Adobe Flash</span>
                <p className="text-[11px] text-slate-350">Un plugin propriétaire puissant mais lourd, gourmand en batterie, non indexable par Google, et criblé de failles critiques de sécurité.</p>
              </div>
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-emerald-400 block mb-1">🌐 HTML5 / standards ouverts</span>
                <p className="text-[11px] text-slate-350">Rendu matériel natif ultra-rapide via &lt;canvas&gt;, lecteur vidéo intégré sans dépendance, sécurité maximale garantie par le navigateur.</p>
              </div>
            </div>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> HTML5 et les standards ouverts du web (JavaScript/CSS3). Flash a officiellement été mis à mort fin 2020.
            </p>
          </div>

          {/* Flash Player vs HTML5 Canvas Interactive Benchmark */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Simulateur de CPU, Sécurité &amp; Consommation : Flash vs Canvas
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setFlashSimulatorRunning(true); playSfx(440); }}
                  className={`${flashSimulatorRunning ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Démarrer Flash Player
                </button>
                <button
                  onClick={() => { setFlashSimulatorRunning(false); playSfx(220); }}
                  className={`${!flashSimulatorRunning ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Passer au Standard HTML5
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Animation view screen */}
              <div className="md:col-span-6 space-y-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  🎮 {flashSimulatorRunning ? "Plugin Adobe Flash Player v10.1 Active" : "Rendu natif HTML5 Canvas API"}
                </span>

                <div className="relative h-48 bg-[#000000] rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {/* Bouncing ball simulation */}
                  <div 
                    className={`absolute w-6 h-6 rounded-full transition-colors ${
                      flashSimulatorRunning ? 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]' : 'bg-indigo-500'
                    }`}
                    style={{ left: `${bounceBallPos.x}%`, top: `${bounceBallPos.y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                  
                  {/* Watermark badge inside */}
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono opacity-50 bg-black/80 px-1.5 py-0.5 rounded text-white border border-slate-800">
                    {flashSimulatorRunning ? "SWF Animation Container" : "HTML5 <canvas> Context"}
                  </span>
                </div>
              </div>

              {/* Hardware / Energy Telemetry */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">📊 Télémétrie &amp; Impact Systémique :</span>

                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {/* CPU gauge */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Utilisation Processeur (CPU) :</span>
                      <strong className={flashSimulatorRunning ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}>
                        {flashSimulatorRunning ? '94% (Ventilateurs à 5400 RPM)' : '2% (Éco-énergétique)'}
                      </strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${flashSimulatorRunning ? 'bg-rose-600' : 'bg-emerald-500'}`}
                        style={{ width: flashSimulatorRunning ? '94%' : '2%' }}
                      />
                    </div>
                  </div>

                  {/* Battery gauge */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Batterie Restante (MacBook Pro) :</span>
                      <strong className="text-slate-300">{flashBattery}%</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${flashSimulatorRunning ? 'bg-amber-500' : 'bg-indigo-500'}`}
                        style={{ width: `${flashBattery}%` }}
                      />
                    </div>
                  </div>

                  {/* Security state */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Failles de sécurité :</span>
                      <strong className={flashSimulatorRunning ? 'text-rose-500' : 'text-emerald-400'}>
                        {flashSimulatorRunning ? '14 Failles Non-Corrigées' : 'Zéro plugin requis'}
                      </strong>
                    </div>
                  </div>

                  {/* Actions depending on simulated technology */}
                  {flashSimulatorRunning ? (
                    <div className="pt-2 border-t border-slate-800/80 flex gap-2">
                      <button
                        onClick={triggerFlashAttack}
                        className="bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg text-[10px] w-full font-bold cursor-pointer"
                      >
                        🔥 Simuler Attaque Buffer Overflow (CVE)
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-800/80 text-[10.5px] text-emerald-400 flex items-center gap-1.5 bg-emerald-950/10 p-2 rounded border border-emerald-500/10">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Sûreté absolue : Code javascript natif confiné par le bac à sable (sandboxing) du navigateur.</span>
                    </div>
                  )}
                </div>

                {/* Alarm Logs if triggered */}
                {secAlarms.length > 0 && flashSimulatorRunning && (
                  <div className="bg-rose-950/20 border border-rose-500/20 p-2.5 rounded-lg font-mono text-[9px] text-rose-400 space-y-1">
                    <span className="font-extrabold uppercase text-[8px] tracking-wider block">[ALERTE SÉCURITÉ FLASH] :</span>
                    {secAlarms.map((alm, idx) => (
                      <p key={idx}>{alm}</p>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {warId === 'angular_vs_react' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La guerre des frameworks Front-End : Angular vs. React vs. Vue</h2>
                <p className="text-[10px] opacity-75 mt-0.5">Les années 2010 • Composants réutilisables vs Frameworks prescriptifs.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : React (Écosystème dominant)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Une fois que JavaScript s'est imposé comme le seul maître du navigateur (après avoir enterré VBScript) et que les applications web sont devenues de plus en plus complexes (les fameuses Single Page Applications ou SPA), la bataille s'est déplacée sur la façon de structurer ce code.
            </p>
            <p>
              <strong className="text-indigo-400">Le combat :</strong> Au début des années 2010, Google a lancé AngularJS, imposant une architecture lourde et complète. Facebook a contre-attaqué avec React, introduisant le concept de DOM virtuel et une approche basée sur des composants beaucoup plus flexibles. Plus tard, Vue.js est arrivé comme l'outsider indépendant, prenant le meilleur des deux mondes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-rose-950/10 border border-rose-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-rose-400 block mb-1">🛡️ Angular (Google)</span>
                <p className="text-[10.5px] text-slate-350">Un framework d'entreprise complet et structuré, particulièrement robuste pour les projets complexes et les équipes à grande échelle.</p>
              </div>
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-emerald-400 block mb-1">⚛️ React (Facebook)</span>
                <p className="text-[10.5px] text-slate-350">Une bibliothèque axée sur l'UI, introduisant le Virtual DOM pour des mises à jour extrêmement rapides et une grande liberté d'outils complémentaires.</p>
              </div>
              <div className="bg-cyan-950/10 border border-cyan-500/20 p-3 rounded-lg">
                <span className="font-extrabold text-cyan-400 block mb-1">🟢 Vue.js (Communauté)</span>
                <p className="text-[10.5px] text-slate-350">L'alternative progressiste créée par Evan You. Combine l'élégance de React avec la simplicité du HTML/CSS d'AngularJS.</p>
              </div>
            </div>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> Actuellement, React domine très largement l'écosystème professionnel et la communauté, bien qu'Angular reste fort dans les sphères Enterprise (souvent couplé à des back-ends stricts) et que Vue conserve une base de fans très fidèle grâce à sa courbe d'apprentissage plus douce.
            </p>
          </div>

          {/* Dual Input engine playground */}
          <div className={css.card}>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              
              {/* Angular Column */}
              <div className="md:col-span-3 space-y-3 bg-rose-950/5 border border-rose-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center border-b border-rose-500/20 pb-2">
                  <span className="font-extrabold text-rose-400 text-[11.5px] uppercase">🛡️ Zone Angular (v1.x Scope)</span>
                  <span className="text-[9px] font-mono bg-rose-500/10 px-1.5 py-0.5 rounded text-rose-300">Liaison Bidirectionnelle</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 block">Saisir du texte (ng-model="angInput") :</label>
                  <input
                    type="text"
                    value={angInput}
                    onChange={handleAngInput}
                    className="w-full bg-slate-950 border border-rose-500/30 rounded p-2 text-xs focus:outline-none focus:border-rose-500 text-white font-mono"
                    placeholder="Tapez ici..."
                  />
                </div>

                <div className="bg-slate-950/80 p-3 rounded border border-rose-950/50 font-mono text-[10.5px]">
                  <p className="text-rose-400 font-bold">&lt;div ng-bind="angInput"&gt;</p>
                  <p className="text-white mt-1 border-b border-slate-900 pb-1.5 min-h-[22px]">{angInput}</p>
                  <div className="mt-2 text-[9px] text-slate-500 space-y-0.5">
                    <p>⚡ Compteur de Cycles Digest : <span className="text-rose-400 font-bold">{angDigestCount}</span></p>
                    <p>⚙️ Algorithme : Dirty checking de l'intégralité des Watchers</p>
                  </div>
                </div>

                {/* Log list for digest updates */}
                <div className="h-28 bg-[#0a0505] p-2 rounded border border-rose-950/60 overflow-y-auto scrollbar-thin text-[9px] font-mono text-rose-300 space-y-1 text-left">
                  <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">[ANGULAR COMPILER DIGEST LOG] :</span>
                  {angularDirtyChecks.length === 0 ? (
                    <p className="text-slate-600 italic">En attente de saisie...</p>
                  ) : (
                    angularDirtyChecks.map((log, idx) => (
                      <p key={idx}>{log}</p>
                    ))
                  )}
                </div>
              </div>

              {/* React Column */}
              <div className="md:col-span-3 space-y-3 bg-emerald-950/5 border border-emerald-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                  <span className="font-extrabold text-emerald-400 text-[11.5px] uppercase">⚛️ Zone React.js Component</span>
                  <span className="text-[9px] font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300">DOM Virtuel Diff</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 block">Saisir du texte (onChange={'{e => setInput()}'}) :</label>
                  <input
                    type="text"
                    value={reactInput}
                    onChange={handleReactInput}
                    className="w-full bg-slate-950 border border-emerald-500/30 rounded p-2 text-xs focus:outline-none focus:border-emerald-500 text-white font-mono"
                    placeholder="Tapez ici..."
                  />
                </div>

                <div className="bg-slate-950/80 p-3 rounded border border-emerald-950/50 font-mono text-[10.5px]">
                  <p className="text-emerald-400 font-bold">{'return <span>{reactInput}</span>'}</p>
                  <p className="text-white mt-1 border-b border-slate-900 pb-1.5 min-h-[22px]">{reactInput}</p>
                  <div className="mt-2 text-[9px] text-slate-500 space-y-0.5">
                    <p>⚡ Mises à jour de l'Arbre virtuel : <span className="text-emerald-400 font-bold">{reactDiffCount}</span></p>
                    <p>⚙️ Algorithme : Réconciliation réactive &amp; Patch ciblé</p>
                  </div>
                </div>

                {/* Log list for VDOM diff patches */}
                <div className="h-28 bg-[#050a05] p-2 rounded border border-emerald-950/60 overflow-y-auto scrollbar-thin text-[9px] font-mono text-emerald-300 space-y-1 text-left">
                  <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">[REACT RECONCILIATION PATCHAR LOG] :</span>
                  {reactDomPatches.length === 0 ? (
                    <p className="text-slate-600 italic">En attente de saisie...</p>
                  ) : (
                    reactDomPatches.map((log, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: log }} />
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {warId === 'tool_war' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La micro-guerre des outils : Grunt vs Gulp vs Webpack</h2>
                <p className="text-[10px] opacity-75 mt-0.5">2012 - 2016 • L'époque infernale de la fatigue JavaScript (Configuration vs Streams vs Bundlers).</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : Webpack (Bundling standardisé)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Une période cauchemardesque pour les développeurs front-end. Pour compiler du code moderne, minifier des images, transfiler l'ES6 ou transformer du CSS SASS, l'écosystème JS a vu naître un nouvel outil standard tous les 6 mois.
            </p>
            <p>
              Les développeurs migraient frénétiquement leurs projets de <strong className="text-indigo-400">Grunt</strong> (basé sur la configuration de fichiers) vers <strong className="text-indigo-400">Gulp</strong> (basé sur des flux Node.js Streams), puis vers <strong className="text-indigo-400">Webpack</strong> (un bundler de modules ultra-complexe). Cette époque folle a inventé le terme de <strong className="text-amber-400">"JavaScript Fatigue"</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-[#121214] border border-slate-800 p-3 rounded-lg text-left">
                <span className="font-extrabold text-orange-400 block mb-1">🐖 Grunt</span>
                <p className="text-[10.5px] text-slate-400">Basé sur une énorme configuration déclarative. Écrit des fichiers temporaires intermédiaires sur le disque à chaque tâche.</p>
              </div>
              <div className="bg-[#121214] border border-slate-800 p-3 rounded-lg text-left">
                <span className="font-extrabold text-red-400 block mb-1">🥤 Gulp</span>
                <p className="text-[10.5px] text-slate-400">Basé sur le code ("Code over Configuration"). Utilise les Streams Node.js en mémoire vive RAM pour une rapidité absolue.</p>
              </div>
              <div className="bg-[#121214] border border-slate-800 p-3 rounded-lg text-left">
                <span className="font-extrabold text-indigo-400 block mb-1">📦 Webpack</span>
                <p className="text-[10.5px] text-slate-400">Résout l'ensemble des modules du projet, gère le chargement d'assets non-JS et compile un bundle unique optimisé (Tree shaking).</p>
              </div>
            </div>
          </div>

          {/* Task runner simulation card */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-indigo-400" /> Pipeline Compiler Simulator &amp; Benchmarks
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTool('grunt'); setToolBuildLogs([]); setToolBuildStatus('idle'); playSfx(200); }}
                  className={`${activeTool === 'grunt' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Tester Grunt
                </button>
                <button
                  onClick={() => { setActiveTool('gulp'); setToolBuildLogs([]); setToolBuildStatus('idle'); playSfx(250); }}
                  className={`${activeTool === 'gulp' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Tester Gulp
                </button>
                <button
                  onClick={() => { setActiveTool('webpack'); setToolBuildLogs([]); setToolBuildStatus('idle'); playSfx(300); }}
                  className={`${activeTool === 'webpack' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Tester Webpack
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Tool metadata & execute trigger */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10.5px] font-mono font-bold text-indigo-400 block uppercase">
                    {activeTool === 'grunt' ? "🐖 Grunt (Gruntfile.js)" : activeTool === 'gulp' ? "🥤 Gulp (gulpfile.js)" : "📦 Webpack (webpack.config.js)"}
                  </span>
                  <p className="text-[11px] text-slate-450 leading-normal">
                    {activeTool === 'grunt' && "Grunt applique une approche par tâche. Chaque tâche (concat, uglify, cssmin) s'exécute séquentiellement en écrivant les étapes intermédiaires sur le disque physique. C'est lourd pour les têtes de lecture !"}
                    {activeTool === 'gulp' && "Gulp utilise les pipes (.pipe()) et le streaming mémoire RAM. La sortie d'une opération sert directement d'entrée à la suivante sans passage intermédiaire par des fichiers temporaires."}
                    {activeTool === 'webpack' && "Webpack n'est pas un simple exécuteur de tâches, c'est un bundler de modules. Il construit un graphe de dépendances et optimise le bundle via le Tree Shaking (extraction de code mort)."}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={runToolBuild}
                      disabled={toolBuildStatus === 'building'}
                      className="w-full bg-indigo-650 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold p-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${toolBuildStatus === 'building' ? 'animate-spin' : ''}`} />
                      <span>{toolBuildStatus === 'building' ? 'Compilation en cours...' : 'Lancer le Build de production'}</span>
                    </button>
                  </div>
                </div>

                {/* Benchmark chart widget */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[9.5px] font-mono text-slate-500 uppercase block">📉 Performance comparée (Temps de compilation) :</span>
                  
                  <div className="space-y-1 text-[10px] font-mono text-slate-400">
                    <div className="flex justify-between items-center">
                      <span>Grunt (I/O Disque lourd) :</span>
                      <span className="text-rose-400 font-extrabold">{benchmarkTimes.grunt}</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: '100%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span>Gulp (Mémoire vive RAM) :</span>
                      <span className="text-amber-400 font-bold">{benchmarkTimes.gulp}</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '35%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span>Webpack (Bundler + Tree Shake) :</span>
                      <span className="text-emerald-400 font-extrabold">{benchmarkTimes.webpack}</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '13%' }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Build Console Logs */}
              <div className="md:col-span-7 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">📟 Console Terminal Output :</span>
                
                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-xs text-indigo-300 min-h-[220px] flex flex-col justify-between">
                  <div className="space-y-1 max-h-[190px] overflow-y-auto scrollbar-thin text-left">
                    <p className="text-slate-500 text-[9px] mb-1">
                      $ {activeTool === 'grunt' ? 'grunt default' : activeTool === 'gulp' ? 'gulp build' : 'webpack --mode=production'}
                    </p>
                    {toolBuildLogs.length === 0 ? (
                      <p className="text-slate-600 italic">Prêt à compiler. Cliquez sur le bouton "Lancer le Build"...</p>
                    ) : (
                      toolBuildLogs.map((log, idx) => (
                        <p 
                          key={idx} 
                          className={
                            log.startsWith('✅') ? 'text-emerald-400 font-extrabold mt-1 border-t border-slate-900 pt-1' : 
                            log.includes('💾') ? 'text-rose-400 font-medium' : 
                            log.includes('🚀') || log.includes('✂️') ? 'text-emerald-400' :
                            'text-slate-350'
                          }
                        >
                          {log}
                        </p>
                      ))
                    )}
                  </div>

                  {toolBuildStatus === 'building' && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
                      <span>Traitement des flux d'assemblage...</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {warId === 'apache_vs_nginx' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La guerre des serveurs web : Apache vs. Nginx</h2>
                <p className="text-[10px] opacity-75 mt-0.5">Années 2004 - Présent • Processus/Threads vs Boucles d'événements asynchrones.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : Nginx (Asynchrone haute performance)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Pendant la première décennie du web, <strong className="text-indigo-400">Apache</strong> régnait en maître absolu (faisant tourner plus de 70% des serveurs). Mais à mesure que le nombre d'internautes explosait, le problème connu sous le nom de <strong className="text-amber-400">"C10k"</strong> (gérer 10 000 connexions simultanées sur une seule machine) est devenu critique.
            </p>
            <p>
              <strong className="text-indigo-400">Le combat :</strong> Apache fonctionne sur un modèle "un thread/processus par connexion". S'il y a 5 000 requêtes en cours, Apache tente de lancer 5 000 threads, ce qui consomme une quantité phénoménale de mémoire vive RAM et ralentit la machine jusqu'au crash (coût de commutation de contexte).
              <br/>
              L'alternative russe <strong className="text-emerald-400">Nginx</strong> a introduit une architecture événementielle asynchrone non-bloquante (une boucle d'événements unique gère des milliers de connexions sur un seul thread CPU sans consommer de mémoire additionnelle).
            </p>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> <strong className="text-white">Nginx</strong> a largement pris le dessus pour les sites à très fort trafic et sert aujourd'hui de proxy inverse ou de cache frontal incontournable devant Apache ou des serveurs d'applications (Node.js, Python, PHP).
            </p>
          </div>

          {/* Interactive Benchmark Simulator */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-indigo-400" /> Simulateur d'impact C10k (Charge de Trafic Massif)
              </span>
              <button
                onClick={runServerBenchmark}
                disabled={serverSimRunning}
                className="bg-indigo-650 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-1 px-3 rounded-lg text-[10px] cursor-pointer"
              >
                {serverSimRunning ? 'Attaque C10k en cours...' : "Lancer l'Attaque C10k (10k Connexions actives)"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Stats & Gauges for Apache */}
              <div className="md:col-span-4 space-y-4 bg-rose-950/5 border border-rose-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center border-b border-rose-500/20 pb-1">
                  <span className="font-extrabold text-rose-400 text-xs">🔴 APACHE SERVER STATS</span>
                  <span className="text-[9px] font-mono bg-rose-500/10 px-1.5 py-0.5 rounded text-rose-300">Thread-per-Connection</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-left">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Utilisation Mémoire :</span>
                      <strong className={apacheMemory > 1000 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}>
                        {apacheMemory >= 2048 ? '2.0 GB (Saturé)' : `${apacheMemory} MB`}
                      </strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${Math.min(100, (apacheMemory / 2048) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Temps de réponse moyen :</span>
                      <strong className={apacheResponseTime > 150 ? 'text-rose-400 font-extrabold' : 'text-slate-300'}>{apacheResponseTime} ms</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${Math.min(100, (apacheResponseTime / 400) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Taux d'échec (Drop requis) :</span>
                      <strong className={apacheFailureRate > 20 ? 'text-rose-500 animate-pulse font-extrabold' : 'text-slate-300'}>{apacheFailureRate}%</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-rose-600 transition-all duration-300" style={{ width: `${apacheFailureRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Gauges for Nginx */}
              <div className="md:col-span-4 space-y-4 bg-emerald-950/5 border border-emerald-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1">
                  <span className="font-extrabold text-emerald-400 text-xs">🟢 NGINX SERVER STATS</span>
                  <span className="text-[9px] font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300">Event-driven Loop</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-left">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Utilisation Mémoire :</span>
                      <strong className="text-emerald-400">{nginxMemory.toFixed(1)} MB</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(nginxMemory / 18) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Temps de réponse moyen :</span>
                      <strong className="text-emerald-400">{nginxResponseTime.toFixed(1)} ms</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(nginxResponseTime / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Taux d'échec (Drop requis) :</span>
                      <strong className="text-emerald-400">0%</strong>
                    </div>
                    <div className="h-2 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Load Console Logs */}
              <div className="md:col-span-4 space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block">Terminal Load Output :</span>
                  <span className="text-[10px] font-mono text-indigo-400 font-extrabold">{serverSimRequests} req/s</span>
                </div>
                
                <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl font-mono text-[10.5px] text-indigo-300 h-[142px] overflow-y-auto scrollbar-thin text-left space-y-1">
                  {serverLogs.length === 0 ? (
                    <p className="text-slate-600 italic text-[10px]">En attente de charge... Cliquez sur "Lancer l'Attaque" pour inonder les serveurs de connexions actives.</p>
                  ) : (
                    serverLogs.map((log, idx) => (
                      <p 
                        key={idx} 
                        className={
                          log.startsWith('🟢') || log.includes('✅') ? 'text-emerald-400 font-extrabold text-[9.5px]' : 
                          log.startsWith('🔴') ? 'text-rose-400 font-extrabold animate-pulse text-[9.5px]' : 
                          log.startsWith('[WARN]') ? 'text-amber-400 text-[9.5px]' :
                          'text-slate-350 text-[9.5px]'
                        }
                      >
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {warId === 'js_engines' && (
        <div className="space-y-4">
          <div className={`${
            theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
            theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
            'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750/80'
          } p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
              <div>
                <h2 className="text-xs font-bold leading-none uppercase">La guerre des moteurs de JavaScript (La course à la performance)</h2>
                <p className="text-[10px] opacity-75 mt-0.5">2008 - Présent • Compilation à la volée (JIT) vs Interprétation pure.</p>
              </div>
            </div>
            <span className={css.badgeWinner}>Vainqueur : Moteurs JIT (V8 de Google Chrome, SpiderMonkey de Firefox)</span>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-750 text-left space-y-3 text-xs leading-relaxed">
            <p>
              <strong className={css.accentText}>Le conflit :</strong> Jusqu'en 2008, JavaScript était vu comme un petit langage de script extrêmement lent, bon uniquement à animer des flocons de neige ou valider des formulaires. Les moteurs interprétaient le code ligne par ligne lors de l'exécution, ce qui était une catastrophe pour le calcul lourd.
            </p>
            <p>
              <strong className="text-indigo-400">Le combat :</strong> Tout a changé avec le lancement de Google Chrome en 2008 et son moteur <strong className="text-emerald-400">V8</strong>. Plutôt que de simplement interpréter, V8 a introduit la compilation **Just-In-Time (JIT)**. Il analyse le code à la volée, détecte les fonctions fréquemment exécutées ("hot functions") et les compile directement en **code machine assembleur natif**, exécuté directement par le processeur hôte !
              <br/>
              Mozilla a immédiatement répliqué avec <strong className="text-indigo-400">TraceMonkey</strong> puis <strong className="text-indigo-400">SpiderMonkey</strong> pour garder Firefox dans la course. Cette rivalité a déclenché une course à la performance brute sans précédent, transformant JavaScript en un langage ultra-rapide capable de propulser des serveurs (Node.js) et des jeux 3D complexes.
            </p>
            <p className="text-[11.5px] border-t border-slate-800 pt-2">
              🏆 <strong className="text-emerald-400">Le vainqueur :</strong> La communauté des développeurs ! Cette course folle aux optimisations a permis de multiplier la vitesse de JavaScript par **plus de 100**, ouvrant la voie à l'émergence des applications modernes comme Google Maps, Figma ou VS Code dans nos navigateurs.
            </p>
          </div>

          {/* Execution speed benchmark playground */}
          <div className={css.card}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Algorithmic Performance Benchmarks (Suite de Fibonacci)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEngineType('standard'); setEngineLogs([]); setExecutionTime(null); playSfx(200); }}
                  className={`${engineType === 'standard' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Moteur Interprété (Pré-2008)
                </button>
                <button
                  onClick={() => { setEngineType('v8'); setEngineLogs([]); setExecutionTime(null); playSfx(300); }}
                  className={`${engineType === 'v8' ? css.btnActive : css.btnInactive} py-1 px-2 text-[10px]`}
                >
                  Moteur JIT V8 (Chrome 2008+)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Algorithm & execution triggers */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 text-left">
                  <span className="text-[10.5px] font-mono font-bold text-indigo-400 block uppercase">
                    Code JavaScript à exécuter :
                  </span>
                  <pre className="text-[9px] font-mono bg-slate-950 p-2.5 rounded text-indigo-200 border border-indigo-950">
{`function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// Calcul intensif de fibonacci(35)
const result = fibonacci(35);`}
                  </pre>

                  <div className="pt-2">
                    <button
                      onClick={runJsEngineBenchmark}
                      disabled={executionRunning}
                      className="w-full bg-emerald-650 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold p-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${executionRunning ? 'animate-spin' : ''}`} />
                      <span>{executionRunning ? 'Calcul en cours...' : "Exécuter l'Algorithme"}</span>
                    </button>
                  </div>
                </div>

                {/* Benchmark Gauge bar */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[9.5px] font-mono text-slate-500 uppercase block">📉 Performance relative (temps de calcul) :</span>
                  
                  <div className="space-y-1 text-[10px] font-mono text-slate-400 text-left">
                    <div className="flex justify-between items-center">
                      <span>Interprétation standard (Lente) :</span>
                      <span className="text-rose-400 font-extrabold">2450 ms</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: '100%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span>Google JIT V8 (Ultra-Rapide) :</span>
                      <span className="text-emerald-400 font-extrabold">12 ms</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '0.5%' }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Engine Logs output */}
              <div className="md:col-span-7 space-y-2 text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold font-mono">📟 Console Execution Log :</span>
                
                <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-xs text-indigo-300 min-h-[220px] flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <p className="text-slate-500 text-[9px] mb-1">
                      $ node --harmony run_benchmark.js
                    </p>
                    {engineLogs.length === 0 ? (
                      <p className="text-slate-600 italic text-[11px]">Prêt à exécuter. Choisissez le type de moteur ci-dessus puis cliquez sur "Exécuter l'Algorithme"...</p>
                    ) : (
                      engineLogs.map((log, idx) => (
                        <p 
                          key={idx} 
                          className={
                            log.includes('✅') || log.startsWith('🚀') ? 'text-emerald-400 font-extrabold mt-1 pt-1' : 
                            log.startsWith('🐢') || log.includes('❌') ? 'text-rose-400 font-medium' : 
                            log.startsWith('⚠️') ? 'text-amber-400' :
                            'text-slate-350'
                          }
                        >
                          {log}
                        </p>
                      ))
                    )}
                  </div>

                  {executionRunning && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
                      <span>Analyse statique et profilage de l'AST...</span>
                    </div>
                  )}

                  {executionTime && (
                    <div className="border-t border-slate-900 pt-2 text-[11px] font-bold text-slate-400 flex justify-between">
                      <span>Vitesse de calcul :</span>
                      <span className={engineType === 'v8' ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}>
                        {engineType === 'v8' ? '🚀 12ms (x204 plus rapide !)' : '🐢 2450ms'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
