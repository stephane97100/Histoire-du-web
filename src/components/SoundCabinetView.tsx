/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  HelpCircle, 
  Disc, 
  Radio, 
  Terminal, 
  AlertOctagon, 
  Play, 
  Activity, 
  BookOpen, 
  Share2, 
  Sparkles,
  Award,
  Database
} from 'lucide-react';
import { 
  playWin95Startup, 
  playModemDialup, 
  playIeDing, 
  playAolWelcome, 
  playFloppyDrive 
} from '../lib/audioSynth';
import ShareButtons from './ShareButtons';

interface SoundCabinetViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface RetroSound {
  id: string;
  name: string;
  category: 'System' | 'Network' | 'Hardware';
  icon: any;
  year: string;
  color: string;
  description: string;
  techExplain: string;
  action: () => void;
  waves: string; // descriptive wave visual class
}

export default function SoundCabinetView({ theme }: SoundCabinetViewProps) {
  const [activeSoundId, setActiveSoundId] = useState<string>('modem');
  const [waveAnimation, setWaveAnimation] = useState<boolean>(false);
  const [triggerCount, setTriggerCount] = useState<number>(0);

  const sounds: RetroSound[] = [
    {
      id: 'win95',
      name: 'Windows 95 Startup Chime',
      category: 'System',
      icon: Radio,
      year: '1995',
      color: 'from-blue-600/25 to-indigo-600/35 border-blue-500/30 text-blue-400',
      description: 'Le carillon légendaire composé par Brian Eno, symbole de l\'avènement du multimédia grand public.',
      techExplain: 'Brian Eno a composé ce morceau de 3,25 secondes sur un Mac parce qu\'il "détestait les PC". Pour obtenir cette profondeur sur des cartes son 16 bits d\'époque, il a superposé des rames de synthétiseurs d\'ondes triangulaires et de cloches sinusoïdales à des rythmes asynchrones.',
      action: playWin95Startup,
      waves: 'bg-indigo-505'
    },
    {
      id: 'modem',
      name: 'Modem analogique 56k (Handshake)',
      category: 'Network',
      icon: Activity,
      year: '1996',
      color: 'from-amber-650/20 to-yellow-600/25 border-amber-500/30 text-amber-500',
      description: 'Le chant strident et mécanique d\'autorisation réseau que toute une génération a religieusement écouté.',
      techExplain: 'Ce bruit n\'était pas facultatif : c\'était un dialogue acoustique brut appelé "Handshake". Les tonalités DTMF initiales composaient le numéro d\'appel, suivies de sifflements et de fritures permettant de négocier la fréquence et d\'égaliser le canal téléphonique en fonction des bruits physiques de la ligne.',
      action: playModemDialup,
      waves: 'bg-amber-450'
    },
    {
      id: 'aol',
      name: 'Message Entrant AOL & Alertes',
      category: 'System',
      icon: Sparkles,
      year: '1997',
      color: 'from-purple-650/20 to-pink-600/25 border-purple-500/30 text-purple-400',
      description: 'Le tri-tonalité nostalgique annonçant que vous aviez du courrier ("You\'ve Got Mail!") ou qu\'un contact AIM passait en ligne.',
      techExplain: 'La signature originale fut enregistrée sur cassette par un employé d\'AOL dans son salon. Nous la reproduisons ici via trois oscillateurs sinusoïdaux purs superposés avec un glissando exponentiel de transition ultra-rapide.',
      action: playAolWelcome,
      waves: 'bg-purple-405'
    },
    {
      id: 'ie_ding',
      name: 'Notification Bloqueur de Popups IE6',
      category: 'System',
      icon: AlertOctagon,
      year: '2004',
      color: 'from-red-650/20 to-rose-600/25 border-red-500/30 text-rose-400',
      description: 'Le sifflement de verre "Ding" accompagnant l\'infobas jaune indiquant que l\'affichage sauvage a été maîtrisé.',
      techExplain: 'À partir de Windows XP SP2, Internet Explorer 6 intègre un bloqueur de fenêtres intempestives natif. Le son est une note de triangle brute à 880Hz entremêlée de deux harmoniques sinusoïdales pures dures s\'éteignant de manière logarithmique en 850 millisecondes.',
      action: playIeDing,
      waves: 'bg-red-405'
    },
    {
      id: 'floppy',
      name: 'Lecteur Disquette 3.5" (Lecture/Écriture)',
      category: 'Hardware',
      icon: Database,
      year: '1989',
      color: 'from-emerald-650/20 to-teal-600/25 border-emerald-500/30 text-emerald-400',
      description: 'Le grognement rythmique et saccadé de la tête de lecture se déplaçant sur l\'oreillette magnétique.',
      techExplain: 'C\'est le bruit du moteur pas-à-pas (stepper) déplaçant radialement la tête de lecture métallique sur 80 pistes magnétiques concentriques distinctes. Les impulsions sonores correspondent aux sauts mécaniques de piste à piste à intervalle de 3 millisecondes.',
      action: playFloppyDrive,
      waves: 'bg-emerald-405'
    }
  ];

  const handlePlaySound = (sound: RetroSound) => {
    sound.action();
    setActiveSoundId(sound.id);
    setWaveAnimation(true);
    setTriggerCount(prev => prev + 1);
    setTimeout(() => {
      setWaveAnimation(false);
    }, sound.id === 'modem' ? 7500 : sound.id === 'win95' ? 5500 : 2500);
  };

  const activeSound = sounds.find(s => s.id === activeSoundId) || sounds[0];

  const getThemeVars = () => {
    switch (theme) {
      case 'ie6':
        return {
          banner: 'bg-[#000080] text-white p-2 border-b border-slate-300 font-bold font-sans flex items-center justify-between select-none rounded-none',
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActive: 'bg-[#c0c0c0] font-bold border-2 border-inset border-white shadow-[inset_1px_1px_2px_#333] p-3 text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#d4d0c8] border-2 border-outset border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#c0c0c0] rounded-none flex items-center justify-between',
          tag: 'bg-[#c0c0c0] border border-[#808080] font-bold text-[9px] px-1.5 py-0.5 text-black uppercase',
          accentText: 'text-blue-900 font-bold',
        };
      case 'terminal':
        return {
          banner: 'bg-[#ffb000]/10 text-[#ffb000] p-2 border border-[#ffb000]/40 text-xs font-mono uppercase tracking-wider flex items-center justify-between font-mono select-none rounded-none',
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-3 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          tag: 'border border-[#ffb000]/40 text-[9px] px-1.5 py-0.5 font-bold',
          accentText: 'text-[#ffb000] font-extrabold',
        };
      default: // Modern - Slate
        return {
          banner: 'bg-gradient-to-r from-blue-950/20 to-slate-900 border border-slate-750 p-4 rounded-xl flex items-center justify-between gap-3 text-xs',
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-750/70 rounded-xl space-y-3',
          btnActive: 'bg-indigo-600/15 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
          tag: 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-md font-mono',
          accentText: 'text-indigo-400 font-semibold',
        };
    }
  }

  const css = getThemeVars();

  return (
    <div className="space-y-6" id="soundboard-root">
      
      {/* Top Info Banner */}
      <div className={css.banner} id="soundboard-banner">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
          <div className="text-left">
            <h2 className="text-xs font-bold leading-none uppercase">Le Cabinet Acoustique &amp; Musée des Sons du Web</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Explorez et déclenchez les signatures sonores mythiques des débuts de l'informatique personnelle.</p>
          </div>
        </div>
        <span className="text-[9px] uppercase font-mono bg-indigo-950/40 border border-indigo-505/30 px-2 py-0.5 text-indigo-400 font-bold max-sm:hidden">
          Sons Synthétisés : {sounds.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column: Interactive Sound Trigger Buttons */}
        <div className="md:col-span-1 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
            🎧 Console de Lecture Acoustique :
          </span>
          <div className="flex flex-col gap-2">
            {sounds.map((sound) => {
              const isActive = sound.id === activeSoundId;
              const Icon = sound.icon;
              return (
                <button
                  key={sound.id}
                  onClick={() => handlePlaySound(sound)}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-sound-${sound.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isActive && theme === 'modern' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-slate-950/40 text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{sound.name}</b>
                      <span className="text-[9px] opacity-70 font-mono tracking-wide">
                        Année d'apparition : {sound.year}
                      </span>
                    </div>
                  </div>
                  <Play className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-400 animate-bounce' : 'text-slate-500 hover:text-white'}`} />
                </button>
              );
            })}
          </div>

          {/* Realism Note */}
          <div className="rounded-xl p-3 bg-slate-950/20 border border-slate-850/60 text-[10px] text-slate-450 leading-relaxed text-left">
            <h5 className="font-extrabold uppercase flex items-center gap-1 text-slate-350 text-[9px] mb-1">
              <Award className="w-3 text-amber-400" /> Synthèse Web Audio
            </h5>
            Aucun fichier audio n'est chargé ! Le synthétiseur recrée les ondes et fritures physiques en modulant mathématiquement en temps réel les tensions de l'oscillateur.
          </div>
        </div>

        {/* Center & Right Column: Interactive Oscilloscope & Scientific Explanation */}
        <div className="md:col-span-2 space-y-4">
          
          {/* Waveform Visualizer simulation */}
          <div className={css.card} id="sound-oscilloscope-box">
            <div className="flex justify-between items-center border-b border-slate-800/40 pb-2.5">
              <span className="text-[10px] font-mono font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                <Activity className="w-4 h-4 text-emerald-400" /> Oscilloscope de Fréquence en temps réel
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase">
                Statut : {waveAnimation ? 'Lecture active' : 'Signal continu'}
              </span>
            </div>

            {/* Simulated Animated Waves */}
            <div className="h-28 bg-[#040406] border border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
              {/* Overlay CRT scanlines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5))] pointer-events-none z-10" />
              
              {/* Horizontal center threshold grid line */}
              <div className="absolute left-0 right-0 h-[1px] bg-slate-900/60 border-t border-dashed" />

              <div className="flex items-center justify-center gap-[3px] w-full max-w-md h-full relative z-0">
                {Array.from({ length: 42 }).map((_, idx) => {
                  // Generate random-looking deterministic wave ripples
                  const speed = 0.5 + Math.sin(idx * 0.4) * 0.3;
                  const delay = idx * 0.04;
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        height: waveAnimation 
                          ? [
                              '8px', 
                              `${15 + Math.abs(Math.sin((idx + triggerCount) * 0.5)) * 66}px`, 
                              '6px', 
                              `${20 + Math.abs(Math.cos(idx * 0.8)) * 45}px`, 
                              '8px'
                            ] 
                          : ['6px', `${12 + Math.sin(idx * 0.15) * 8}px`, '6px']
                      }}
                      transition={{
                        duration: waveAnimation ? speed : 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: waveAnimation ? delay : idx * 0.02
                      }}
                      className={`w-[4px] rounded-full shrink-0 ${
                        waveAnimation 
                          ? activeSound.id === 'modem' 
                            ? 'bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                            : activeSound.id === 'win95'
                            ? 'bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                            : activeSound.id === 'ie_ding'
                            ? 'bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : 'bg-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                          : 'bg-gray-800'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => handlePlaySound(activeSound)}
                className={`text-[10px] font-mono px-3 py-1 text-slate-350 hover:text-white border border-slate-800 hover:border-indigo-500 bg-slate-950/40 rounded-lg inline-flex items-center gap-1.5 transition select-none cursor-pointer`}
              >
                <Play className="w-3 h-3 text-emerald-400" /> Réécouter : {activeSound.name}
              </button>
            </div>
          </div>

          {/* Sound Details Board */}
          <div className={css.innerCard} id="sound-details-exhibit">
            <div className="flex justify-between items-center border-b border-slate-800/40 pb-2 select-none">
              <h4 className="font-extrabold text-xs uppercase flex items-center gap-1.5 text-white">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Fiche Signalétique : {activeSound.name}
              </h4>
              <span className={css.tag}>Époque {activeSound.year}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left">
              <strong>Résumé :</strong> {activeSound.description}
            </p>

            <div className="p-3 bg-[#15151a] border border-[#2a2a2e]/60 rounded-xl space-y-1.5 text-left">
              <span className="text-[10px] font-mono font-extrabold uppercase text-amber-500 block">
                🧠 La science &amp; l'explication technique du signal :
              </span>
              <p className="text-[11px] leading-relaxed text-slate-350">
                {activeSound.techExplain}
              </p>
            </div>

            {/* Social connection sharing */}
            <div className="pt-2">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Acoustique Réseau : ${activeSound.name}`}
                text={`J'ai testé le synthétiseur acoustique du Musée du Web ! Écoutez en temps réel le sifflement rétro du ${activeSound.name} de l'année ${activeSound.year}.`}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
