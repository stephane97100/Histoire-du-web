/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Terminal as TermIcon, 
  BookOpen, 
  Trophy, 
  Tv, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Info
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface EasterEggItem {
  id: string;
  title: string;
  platform: string;
  year: string;
  icon: string;
  description: string;
  anecdote: string;
  hasInteractive: boolean;
}

interface EasterEggsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function EasterEggsView({ theme }: EasterEggsViewProps) {
  const [activeEggId, setActiveEggId] = useState<string>('konami');
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [konamiUnlocked, setKonamiUnlocked] = useState<boolean>(false);
  const [virtualPresses, setVirtualPresses] = useState<string[]>([]);
  const [mozillaVersion, setMozillaVersion] = useState<string>('ff1');
  const [aquariumFishes, setAquariumFishes] = useState<{ id: number; color: string; x: number; y: number; speed: number; dir: number }[]>([
    { id: 1, color: '#f97316', x: 20, y: 30, speed: 1.5, dir: 1 },
    { id: 2, color: '#3b82f6', x: 70, y: 50, speed: 1.0, dir: -1 },
    { id: 3, color: '#eab308', x: 40, y: 70, speed: 2.0, dir: 1 }
  ]);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  // Audio synthesizer chime for retro triggers
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context block
    }
  };

  const checkKonamiCode = (key: string) => {
    const code = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    
    // Add to current press sequence
    setVirtualPresses(prev => {
      const updated = [...prev, key].slice(-10);
      
      // Match checker
      const isMatch = updated.length === 10 && updated.every((val, i) => {
        const target = code[i];
        if (target.startsWith('Arrow')) {
          return val === target;
        }
        return val.toLowerCase() === target.toLowerCase();
      });

      if (isMatch) {
        setKonamiUnlocked(true);
        playBeep(523.25, 'triangle', 0.15); // C5
        setTimeout(() => playBeep(659.25, 'triangle', 0.15), 150); // E5
        setTimeout(() => playBeep(783.99, 'triangle', 0.15), 300); // G5
        setTimeout(() => playBeep(1046.50, 'triangle', 0.4), 450); // C6
        setFeedbackMsg('🎉 CODE KONAMI DÉVERROUILLÉ ! FÉLICITATIONS !');
      } else {
        // Simple key tap feedback
        playBeep(261.63, 'sine', 0.05); // C4
      }
      return updated;
    });
  };

  // Keyboard monitoring listener for physical entries
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeEggId === 'konami') {
        const monitoredKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'b', 'B', 'a', 'A'];
        if (monitoredKeys.includes(e.key)) {
          e.preventDefault();
          checkKonamiCode(e.key);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEggId]);

  // Handle virtual buttons triggers
  const handleVirtualPress = (key: string) => {
    checkKonamiCode(key);
  };

  // Move aquarium fish in step intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setAquariumFishes(prev => 
        prev.map(fish => {
          let newX = fish.x + (fish.speed * fish.dir);
          let newDir = fish.dir;
          if (newX > 92) {
            newX = 92;
            newDir = -1;
          } else if (newX < 2) {
            newX = 2;
            newDir = 1;
          }
          return { ...fish, x: newX, dir: newDir };
        })
      );
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const addAquariumFish = () => {
    const colors = ['#f43f5e', '#a855f7', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newFish = {
      id: Date.now(),
      color: randomColor,
      x: 10 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      speed: 0.8 + Math.random() * 1.8,
      dir: Math.random() > 0.5 ? 1 : -1
    };
    setAquariumFishes(prev => [...prev, newFish]);
    playBeep(600, 'sine', 0.05);
  };

  const eggsList: EasterEggItem[] = [
    {
      id: 'konami',
      title: 'Le Code Konami Universel',
      platform: 'Général & Web Récent',
      year: '1986 - Présent',
      icon: '🎮',
      description: 'Né à l\'origine dans le studio de jeu d\'arcade de Konami, cette séquence de touches légendaire s\'est imposée au fil du temps comme le mème technique suprême du web mondial, caché sur d\'innombrables portails d\'envergure.',
      anecdote: 'En 1986, Kazuhisa Hashimoto, chargé d\'adapter le jeu d\'arcade Gradius sur console NES, estimait que la difficulté du jeu était absurde. Pour tester les niveaux sans mourir en boucle, il implante une commande secrète lui accordant instantanément l\'intégralité des Power-Ups. Ayant par mégarde oublié de retirer le code de la puce finale avant industrialisation en usine, une légende venait d\'éclore.',
      hasInteractive: true
    },
    {
      id: 'mozilla',
      title: 'Le Livre de Mozilla (about:mozilla)',
      platform: 'Netscape & Firefox',
      year: '1995 - Présent',
      icon: '📕',
      description: 'Depuis les premiers balbutiements de Netscape Navigator, taper "about:mozilla" dans l\'adresse réseau ne renvoie pas une erreur mais ouvre une page écarlate contenant une prophétie apocalyptique écrite dans un majestueux style biblique prophétisant la lutte du Web.',
      anecdote: 'Les extraits utilisent un ton prophétique grandiose pour conter l\'histoire moderne des navigateurs. La "Bête" désigne Microsoft Internet Explorer, tandis que le "Messager" fait un clin d\'œil direct au client e-mail Netscape Mail. Les "disciples de la créature de feu" représentent la communauté mondiale des développeurs du projet open-source Mozilla Firefox terrassant les ténèbres d\'un web propriétaire.',
      hasInteractive: true
    },
    {
      id: 'excel95',
      title: 'Hall of Tortured Souls (Excel 95)',
      platform: 'Microsoft Office 95',
      year: '1995',
      icon: '📈',
      description: 'L\'un des secrets de concepteurs les plus légendaires et impressionnants : le tableur Excel 95 intégrait discrètement un mini-jeu en 3D immersive digne de Doom, dont le seul but était d\'illustrer les portraits de l\'équipe projet.',
      anecdote: 'Le monument virtuel de pixels est accessible en sélectionnant la ligne entière "95", en sautant à la colonne B, en ouvrant l\'onglet "À propos d\'Excel", puis en maintenant Ctrl+Maj tout en appuyant sur le bouton d\'Assistance technique. Les couloirs sadiques mènent vers un gouffre. En effectuant un demi-tour secret et en écrivant le sésame "excelkfa", un pont d\'une seule case se crée et mène au tableau d\'honneur des développeurs !',
      hasInteractive: false
    },
    {
      id: 'word97',
      title: 'Le Simulateur de Vol Intégré (Word 97)',
      platform: 'Microsoft Office 97',
      year: '1997',
      icon: '✈️',
      description: 'Microsoft Word 97, livré sur des millions de postes d\'entreprises rigides de l\'époque, camouflait un véritable simulateur de vol 3D vectoriel rudimentaire mais jouable à la souris ! Bureaucrates et étudiants s\'y adonnaient en secret.',
      anecdote: 'Pour s\'envoler au-dessus d\'un relief violet abstrait, les utilisateurs devaient créer de toutes pièces un nouveau document, taper le mot magique "Blue", le surligner en bleu gras, ouvrir la boîte d\'options, et sous Ctrl+Maj appuyer sur les crédits de copyright de l\'éditeur. Le survol dévoilait un monument affichant en boucle un texte défilant dédié aux programmeurs et créateurs d\'Office.',
      hasInteractive: false
    },
    {
      id: 'netscape_fishcam',
      title: 'L\'Aquarium de Netscape (Fishcam)',
      platform: 'Netscape Navigator 1.0 - 4.0',
      year: '1994',
      icon: '🐠',
      description: 'Une combinaison de touches mystiques "Ctrl + Alt + F" dans Netscape Navigator remplaçait le fond d\'écran ou ouvrait un aquarium interactif de poissons tropicaux colorés.',
      anecdote: 'Marc Andreessen et Lou Montulli ont implémenté l\'aquarium à une époque où le concept même de "webcam" n\'existait presque pas universellement. Les poissons pixelisés qu\'on voyait nageant en arrière-plan découlaient d\'une caméra physique réelle pointée vers un véritable aquarium géant installé à la réception de Netscape Communications Corp, une attraction pionnière historique du réseau !',
      hasInteractive: true
    }
  ];

  const activeEgg = eggsList.find(e => e.id === activeEggId) || eggsList[0];

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActive: 'bg-[#000080] text-white font-bold p-3 border border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none flex items-center justify-between',
          tag: 'bg-[#000080] text-white text-[9px] font-bold px-1.5 py-0.5 border border-white'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          tag: 'border border-[#ffb000] text-[#ffb000] text-[9px] font-bold px-1.5 py-0.5 bg-black'
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600/15 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
          tag: 'bg-indigo-500/15 text-indigo-400 text-[9px] font-bold px-2 py-0.5 border border-indigo-500/30 rounded-full'
        };
    }
  };

  const css = getThemeClass();

  // About Mozilla specific exhibits records
  const mozillaQuotes: Record<string, { ver: string; date: string; quote: string }> = {
    ff1: {
      ver: 'The Book of Mozilla, 7:15',
      date: 'Date : 15 Septembre 2003 (Sortie de Firebird 0.6)',
      quote: 'And the beast shall come forth clad in a million shared pixels, and the disciples of the firebrand took heart and shook the earth with the message of the salvation of their screens. With the shield of the open source, they drove back the claws of the beast...'
    },
    net1: {
      ver: 'The Book of Mozilla, 12:10',
      date: 'Date : 10 Décembre 1994 (Sortie de Netscape 1.0)',
      quote: 'And the beast shall come forth surrounded by a mountain of light, and the earth was rent asunder as the monster did fly. And the followers of the true code labored long and did preach the word of the open standard, and they did cover the land with the message of its glory...'
    },
    ff2: {
      ver: 'The Book of Mozilla, 15:1',
      date: 'Date : 26 Octobre 2006 (Sortie de Firefox 2.0)',
      quote: 'And behold, the creature of fire did rise from the ashes of the great messenger. And it did gather strength from the wind, and did strike down the giant who claimed dominion over the land. Thus the beast was cast out, and the disciples did rejoice in the light...'
    }
  };

  const activeMoz = mozillaQuotes[mozillaVersion] || mozillaQuotes.ff1;

  return (
    <div className="space-y-6" id="easteregg-root-container">
      {/* Introduction Banner header */}
      <div className={`${
        theme === 'ie6' 
          ? 'bg-[#000080] text-white p-2 border-b border-white' 
          : theme === 'terminal' 
            ? 'bg-[#ffb000]/10 border border-[#ffb000]/40 text-[#ffb000] p-2' 
            : 'bg-gradient-to-r from-violet-950/20 to-slate-900 border border-slate-755 p-4 rounded-xl'
      } flex justify-between items-center text-xs flex-wrap gap-2`}>
        <div className="flex items-center gap-2 text-left">
          <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Cabinet des Secrets &amp; Easter Eggs</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Chroniques instructives des blagues cachées et sésames d'éditeurs insérés au cœur des premiers systèmes.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left selector menu list */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            🔮 Index des codes cachés :
          </span>
          <div className="flex flex-col gap-2">
            {eggsList.map((egg) => {
              const isActive = egg.id === activeEggId;
              return (
                <button
                  key={egg.id}
                  onClick={() => {
                    setActiveEggId(egg.id);
                    setFeedbackMsg('');
                  }}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-egg-${egg.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-base shrink-0 select-none">{egg.icon}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{egg.title}</b>
                      <span className="text-[9px] opacity-70 font-mono block">
                        Millésime : {egg.year}
                      </span>
                    </div>
                  </div>
                  <Tv className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3 bg-[#0a0a0a] border border-slate-850/60 text-[10px] text-slate-400 leading-normal text-left font-sans space-y-1.5">
            <h6 className="font-extrabold uppercase text-[9px] text-slate-300 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-400" /> Sceau Didactique
            </h6>
            <p className="opacity-90">
              Ces programmations camouflées témoignent de l'esprit frondeur et créatif des premiers artisans du web, introduisant de l'humour potache au sein de progiciels complexes.
            </p>
          </div>
        </div>

        {/* Right side detailed pane */}
        <div className="lg:col-span-8 space-y-4">
          <div className={css.card} id="active-egg-display-card">
            
            {/* Header Area */}
            <div className="flex justify-between items-center border-b border-slate-800/40 pb-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl select-none">{activeEgg.icon}</span>
                <h3 className="text-sm font-bold text-slate-100">{activeEgg.title}</h3>
              </div>
              <span className={css.tag}>
                {activeEgg.platform}
              </span>
            </div>

            {/* Exposition details card */}
            <div className={css.innerCard}>
              
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest block">
                  🚀 Description de l'Easter Egg :
                </span>
                <p className="leading-relaxed text-slate-200">
                  {activeEgg.description}
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-lg text-left text-xs space-y-1 select-none">
                <strong className="block text-[9px] font-mono text-amber-500 uppercase tracking-wider">📜 L'Anecdote historique du concepteur :</strong>
                <p className="font-sans text-[11px] text-slate-300 leading-relaxed italic">
                  "{activeEgg.anecdote}"
                </p>
              </div>

            </div>

            {/* Interactive Section depending on active egg selected */}
            {activeEgg.hasInteractive && (
              <div className="border border-slate-800/60 rounded-xl p-4 bg-slate-950/20 text-left space-y-3" id="interactive-egg-simulator">
                <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase tracking-wider">
                  ⚡ Simulateur Interactif d'Époque :
                </span>

                {/* INTERACTIVE COMPONENT 1: KONAMI CODE TESTER */}
                {activeEgg.id === 'konami' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-350">
                      Tapez l'enchaînement mythique sur votre clavier ou cliquez sur les touches du contrôleur de jeu ci-dessous :
                    </p>
                    <div className="flex flex-col items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-850 relative">
                      
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-mono text-slate-450 uppercase">
                          Séquence saisie :
                        </span>
                        <span className="text-[9px] bg-slate-900 border border-slate-800 px-2 py-0.5 text-indigo-400 font-mono">
                          {virtualPresses.length > 0 ? virtualPresses.map(k => k.replace('Arrow', '')).join(' ') : 'En attente...'}
                        </span>
                      </div>

                      {/* Gamepad interface design layout */}
                      <div className="flex items-center gap-6 p-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
                        {/* D-Pad controls */}
                        <div className="grid grid-cols-3 gap-1 w-20 h-20 items-center justify-center p-1 bg-slate-950 rounded-full border border-slate-800">
                          <div />
                          <button 
                            onClick={() => handleVirtualPress('ArrowUp')}
                            className="bg-slate-850 hover:bg-slate-750 text-slate-350 active:bg-violet-600 p-1 rounded flex items-center justify-center cursor-pointer active:text-white"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <div />

                          <button 
                            onClick={() => handleVirtualPress('ArrowLeft')}
                            className="bg-slate-850 hover:bg-slate-750 text-slate-350 active:bg-violet-600 p-1 rounded flex items-center justify-center cursor-pointer active:text-white"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-3.5 h-3.5 bg-slate-800 rounded-full" />
                          <button 
                            onClick={() => handleVirtualPress('ArrowRight')}
                            className="bg-slate-850 hover:bg-slate-750 text-slate-350 active:bg-violet-600 p-1 rounded flex items-center justify-center cursor-pointer active:text-white"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <div />
                          <button 
                            onClick={() => handleVirtualPress('ArrowDown')}
                            className="bg-slate-850 hover:bg-slate-750 text-slate-350 active:bg-violet-600 p-1 rounded flex items-center justify-center cursor-pointer active:text-white"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <div />
                        </div>

                        {/* Mid Select / Start */}
                        <div className="text-[8px] font-mono text-slate-500 uppercase flex gap-2">
                          <div>
                            <div className="w-6 h-2 bg-slate-850 rounded-full" />
                            <span>Select</span>
                          </div>
                          <div>
                            <div className="w-6 h-2 bg-slate-850 rounded-full" />
                            <span>Start</span>
                          </div>
                        </div>

                        {/* Button Action A / B */}
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleVirtualPress('b')}
                            className="w-8 h-8 rounded-full bg-red-600 active:bg-red-500 text-white font-extrabold text-xs shadow cursor-pointer focus:outline-none flex items-center justify-center"
                          >
                            B
                          </button>
                          <button 
                            onClick={() => handleVirtualPress('a')}
                            className="w-8 h-8 rounded-full bg-red-600 active:bg-red-500 text-white font-extrabold text-xs shadow cursor-pointer focus:outline-none flex items-center justify-center"
                          >
                            A
                          </button>
                        </div>

                      </div>

                      {/* Achievements unlocked block screen */}
                      <AnimatePresence>
                        {konamiUnlocked && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-black/95 rounded-xl border border-emerald-500 flex flex-col items-center justify-center p-4 text-center z-25"
                          >
                            <Trophy className="w-10 h-10 text-yellow-400 animate-bounce mb-1" />
                            <h4 className="text-emerald-400 font-mono font-black text-xs uppercase">🏆 CONCEPTEUR HOMOLOGUÉ 🏆</h4>
                            <p className="text-[10px] text-slate-300 mt-1 max-w-[280px]">
                              Vous avez invoqué le code d'appel de l'agent. Un certificat virtuel vous est délivré par le Musée d'histoire informatique du Web !
                            </p>
                            <button
                              onClick={() => {
                                setKonamiUnlocked(false);
                                setVirtualPresses([]);
                                setFeedbackMsg('');
                              }}
                              className="mt-3 px-3 py-1 bg-emerald-650 hover:bg-emerald-550 border border-emerald-500 text-black font-black text-[10px] rounded cursor-pointer"
                            >
                              Réinitialiser
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                    {feedbackMsg && (
                      <p className="text-[10.5px] font-mono text-emerald-400 text-center font-bold">
                        {feedbackMsg}
                      </p>
                    )}
                  </div>
                )}

                {/* INTERACTIVE COMPONENT 2: ABOUT MOZILLA PROPHESIER */}
                {activeEgg.id === 'mozilla' && (
                  <div className="space-y-3">
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={() => setMozillaVersion('net1')}
                        className={`px-2.5 py-1 text-[10px] font-mono border rounded ${
                          mozillaVersion === 'net1' 
                            ? 'bg-rose-950/30 text-rose-300 border-rose-500/40' 
                            : 'bg-slate-900 border-transparent text-slate-450 hover:text-slate-300'
                        }`}
                      >
                        Netscape 1.0 (1994)
                      </button>
                      <button
                        onClick={() => setMozillaVersion('ff1')}
                        className={`px-2.5 py-1 text-[10px] font-mono border rounded ${
                          mozillaVersion === 'ff1' 
                            ? 'bg-rose-950/30 text-rose-300 border-rose-500/40' 
                            : 'bg-slate-900 border-transparent text-slate-450 hover:text-slate-300'
                        }`}
                      >
                        Firebird 0.6 (2003)
                      </button>
                      <button
                        onClick={() => setMozillaVersion('ff2')}
                        className={`px-2.5 py-1 text-[10px] font-mono border rounded ${
                          mozillaVersion === 'ff2' 
                            ? 'bg-rose-950/30 text-rose-300 border-rose-500/40' 
                            : 'bg-slate-900 border-transparent text-slate-450 hover:text-slate-300'
                        }`}
                      >
                        Firefox 2.0 (2006)
                      </button>
                    </div>

                    {/* Book of mozilla crimson view */}
                    <div className="p-4 bg-[#8b0000] text-amber-200 rounded-xl border-2 border-amber-400 shadow-lg text-center font-serif text-[11px] leading-relaxed relative">
                      <div className="absolute top-2 left-2 text-[20px] opacity-20">❝</div>
                      <div className="absolute bottom-2 right-2 text-[20px] opacity-20">❞</div>
                      
                      <p className="italic font-bold tracking-wide italic mb-3">
                        "{activeMoz.quote}"
                      </p>
                      
                      <div className="border-t border-amber-400/40 pt-2 text-right">
                        <cite className="block text-[9.5px] font-mono text-amber-300 font-extrabold not-italic uppercase tracking-wider">
                          — {activeMoz.ver}
                        </cite>
                        <span className="text-[8.5px] block font-mono text-amber-100 opacity-80 font-medium">
                          {activeMoz.date}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INTERACTIVE COMPONENT 3: FISHCAM SIMULATOR */}
                {activeEgg.id === 'netscape_fishcam' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-350">
                      Simulateur virtuel d'aquarium pixélisé de bureau. Cliquez pour rajouter de nouveaux poissons colorés :
                    </p>
                    
                    {/* Aquarium tank */}
                    <div className="h-44 bg-[#0c1f3c] border-2 border-sky-400 rounded-xl relative overflow-hidden flex flex-col justify-between p-2 select-none shadow-[inset_0_0_20px_rgba(30,144,255,0.4)]">
                      {/* Coral & seaweed styling elements */}
                      <div className="absolute bottom-0 inset-x-0 h-4 bg-[#ad8b56] opacity-90 border-t border-[#8f754b] pointer-events-none" />
                      <div className="absolute bottom-1 left-5 w-2 h-14 bg-emerald-600 rounded-full opacity-60 filter blur-[0.5px] pointer-events-none" />
                      <div className="absolute bottom-1 left-9 w-1.5 h-10 bg-emerald-500 rounded-full opacity-50 filter blur-[0.5px] pointer-events-none" />
                      <div className="absolute bottom-1 right-12 w-2 h-16 bg-emerald-600 rounded-full opacity-60 filter blur-[0.5px] pointer-events-none" />

                      {/* Water bubble rising nodes */}
                      <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping" />
                      <div className="absolute bottom-6 left-2/3 w-1.5 h-1.5 bg-white/10 rounded-full animate-ping" />

                      {/* Header controller inside aquarium */}
                      <div className="flex justify-between items-center z-10">
                        <span className="text-[8.5px] font-mono font-bold bg-[#000080] text-sky-200 px-2.5 py-0.5 border border-sky-300/40 rounded-full">
                          🐠 Live Fishcam Netscape Corp.
                        </span>
                        <button
                          onClick={addAquariumFish}
                          className="px-2 py-0.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-extrabold text-[9px] border border-sky-300 rounded cursor-pointer"
                        >
                          + Ajouter poisson
                        </button>
                      </div>

                      {/* Dynamic fishes map */}
                      <div className="flex-1 relative">
                        {aquariumFishes.map(fish => (
                          <div
                            key={fish.id}
                            className="absolute transition-all duration-75 text-base"
                            style={{
                              left: `${fish.x}%`,
                              top: `${fish.y}%`,
                              color: fish.color,
                              transform: `scaleX(${fish.dir})`
                            }}
                          >
                            🐡
                          </div>
                        ))}
                      </div>

                      {/* Summary indicator */}
                      <div className="text-right z-10 pointer-events-none">
                        <span className="text-[8.5px] font-mono text-sky-200 font-bold">
                          Nombre : {aquariumFishes.length} poissons d'époque
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Sharing feature */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Easter Eggs : ${activeEgg.title}`}
                text={`J'ai découvert et déverrouillé les secrets d'époque (comme ${activeEgg.title}) sur le Musée interactif du Développement Web ! Venez tester le Code Konami !`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
