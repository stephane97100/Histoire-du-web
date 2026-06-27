/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Cpu, 
  Tv, 
  Flame, 
  CheckCircle2, 
  Box, 
  Terminal, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  BookOpen,
  Info,
  ChevronRight,
  Sparkles,
  Volume2
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface FranceContributionsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface ContributionItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  pioneers: string;
  icon: string;
  summary: string;
  significance: string;
  detailedStoryHtml: string;
  tags: string[];
}

export default function FranceContributionsView({ theme }: FranceContributionsViewProps) {
  const [activeTab, setActiveTab] = useState<string>('datagram');
  const [buildStep, setBuildStep] = useState<'idle' | 'building' | 'built' | 'running'>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState<'php' | 'node' | 'python'>('php');

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

  const contributions: ContributionItem[] = [
    {
      id: 'datagram',
      title: 'Le Datagramme & CYCLADES',
      subtitle: 'La genèse absolue de TCP/IP',
      year: '1971 - 1973',
      pioneers: 'Louis Pouzin (et son équipe INRIA)',
      icon: '🕸️',
      summary: 'Louis Pouzin crée CYCLADES, le premier réseau à s\'appuyer sur le concept révolutionnaire de "datagramme" pour acheminer des paquets de données de manière décentralisée.',
      significance: 'C\'est l\'invention même de la commutation par paquets autonome. Louis Pouzin a dissocié le transport des données du réseau lui-même, remettant la responsabilité de la livraison entre les mains des machines d\'extrémité.',
      detailedStoryHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed text-left">
        <p>
          Au début des années 1970, alors que l'Arpanet américain concevait un réseau complexe contrôlé par le réseau lui-même (circuits virtuels), l'ingénieur français <strong class="text-indigo-400">Louis Pouzin</strong> invente une approche orthogonale au sein de l'IRIA (futur INRIA) de Rocquencourt :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">L'invention du Datagramme :</strong> Pouzin comprend que pour concevoir un réseau indestructible, rapide et léger, chaque message doit être découpé en paquets autonomes (les datagrammes) contenant l'adresse de destination, acheminés individuellement sans circuit pré-établi de manière dynamique.
          </li>
          <li>
            <strong class="text-indigo-400">Source direct de TCP/IP :</strong> Vint Cerf et Bob Kahn (considérés comme les pères fondateurs d'Internet) ont maintes fois répété que les spécifications de CYCLADES et la clarté des travaux de Louis Pouzin ont directement inspiré la conception finale du protocole TCP/IP.
          </li>
          <li>
            <strong class="text-indigo-400">Le piratage politique :</strong> Malheureusement, en 1978, sous la pression des PTT français qui préféraient le réseau Transpac basé sur la norme commerciale X.25 (génératrice d'abonnements à la minute), le financement public de CYCLADES est sauvagement sabré, laissant les États-Unis commercialiser et piloter le futur Internet mondial.
          </li>
        </ul>
      </div>`,
      tags: ['TCP/IP', 'Datagramme', 'Louis Pouzin', 'Inria', 'Cyclades']
    },
    {
      id: 'minitel',
      title: 'Le Minitel (Minitel 1B & Teletel)',
      subtitle: 'Les prémices du e-commerce et des tchats',
      year: '1980 - 2012',
      pioneers: 'France Télécom / Bernard Marti',
      icon: '🎛️',
      summary: 'Plus d\'une décennie avant le décollage mondial du Web, la France invente et déploie le premier réseau télématique interactif de masse au monde.',
      significance: 'En distribuant gratuitement des terminaux passifs Minitel à des millions de foyers, la France a démocratisé les services en ligne : banque à distance, annuaire électronique, réservation de billets de train (3615 SNCF) et messageries interactives ("Minitel rose").',
      detailedStoryHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed text-left">
        <p>
          Le Minitel représentait une prouesse culturelle et technologique incomparable dans les années 1980. Alors que le reste du monde surfait sur des lignes papier ordinaires, la France Télécom lançait :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Un écosystème transactionnel en direct :</strong> Le Minitel offrait l'accès sécurisé à des milliers de compagnies privées. Le modèle "Kiosque" permettait de reverser une partie du coût surtaxé de l'appel téléphonique (les fameux codes 3615 ou 3617) directement aux éditeurs de contenus de manière transparente préfigurant l'économie moderne d'Internet et de l'App Store.
          </li>
          <li>
            <strong class="text-indigo-400">Les Messageries Roses & le Tchat :</strong> La folie des messageries temps réel (comme ALINE ou 3615 ULLA) a initié toute une génération aux joies de la socialisation virtuelle anonyme sous pseudonyme, des décennies avant MSN Messenger ou Tinder.
          </li>
          <li>
            <strong class="text-indigo-400">Un frein temporaire pour la Toile :</strong> De par son succès colossal (9 millions de foyers équipés à la fin des années 90), le Minitel a paradoxalement ralenti le virage initial de la France vers l'Internet haut débit et le World Wide Web standard, le public se sentant déjà parfaityment doté en terminaux interactifs simples d'usage.
          </li>
        </ul>
      </div>`,
      tags: ['3615 Télématique', 'Teletel', 'Kiosque Facturation', 'Internet Français']
    },
    {
      id: 'docker',
      title: 'Solomon Hykes & Docker',
      subtitle: 'La révolution des conteneurs isolés (DevOps)',
      year: '2013',
      pioneers: 'Solomon Hykes (dotCloud à Paris)',
      icon: '🐳',
      summary: 'Le développeur franco-américain Solomon Hykes crée Docker au cœur de sa start-up dotCloud à Paris, révolutionnant l\'emballage, le transport et le déploiement de logiciels.',
      significance: 'En unifiant sous un format de conteneur autonome unifié le code source, les serveurs d\'exécution et les variables distantes, Docker a libéré les codeurs de l\'enfer des disparités système, devenant l\'épine dorsale universelle de l\'infrastructure cloud.',
      detailedStoryHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed text-left">
        <p>
          L'histoire de Docker commence à Paris, dans les bureaux de la jeune start-up <strong class="text-indigo-400">dotCloud</strong>, fondée par Solomon Hykes. Face à l'enfer d'isoler les applications de ses clients sur Linux, Hykes écrit un wrapper malin au-dessus de LXC (Linux Containers) :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">La naissance de la conteneurisation moderne :</strong> Plutôt que d'instancier de lourdes machines virtuelles (VM) émulant tout le matériel physique, Docker s'appuie directement sur les fonctionnalités de partage de noyau Linux (namespaces et cgroups) pour créer des boîtes logicielles hermétiques, lancées en quelques millisecondes seulement.
          </li>
          <li>
            <strong class="text-indigo-400">Le Dockerfile & l'Infrastructure-as-Code :</strong> En décrétant qu'un simple fichier texte déclaratif peut documenter et automatiser la compilation d'un serveur applicatif complet, Docker a permis de versionner l'infrastructure sur Git et de l'exécuter à l'octet près, réduisant à néant l'ancestral compromis "ça marche pourtant très bien sur ma machine !".
          </li>
        </ul>
      </div>`,
      tags: ['DevOps', 'Conteneurs', 'dotCloud Paris', 'Solomon Hykes', 'Immuabilité']
    },
    {
      id: 'vlc_players',
      title: 'Le Lecteur DivX VLC & CERN',
      subtitle: 'Les joyaux du code open-source mondial',
      year: '1996 - Présent',
      pioneers: 'Étudiants Centrale Paris / Jean-François Groff (CERN)',
      icon: '🎬',
      summary: 'VLC Media Player est né au sein de l\'école École Centrale Paris pour distribuer la télévision locale par satellite. De son côté, Jean-François Groff a corédigé l\'HTML d\'origine aux côtés de Tim Berners-Lee.',
      significance: 'VLC est devenu le lecteur média le plus libre, le plus propre et le plus téléchargé au monde (plus de 4 milliards de téléchargements) capable d\'isoler et d\'interpréter n\'importe quel flux sans greffer de codecs espions.',
      detailedStoryHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed text-left">
        <p>
          La France a apporté deux pièces maîtresses et universellement adoptées à la friche du code libre :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">VLC Media Player (PJS de Centrale Paris) :</strong> Lancé en 1996 sous le nom de "VideoLAN Client", le lecteur a été conçu par des étudiants voulant diffuser de la télévision haut débit par satellite sur le réseau local de leur résidence universitaire de Châtenay-Malabry. Libéré sous licence libre GNU GPL en 2001, il dédaigne l'industrie du disque et intègre ses propres décodeurs natifs sans réclamer l'installation d'outils tiers, sauvant des milliards d'usagers du piratage abusif d'extensions.
          </li>
          <li>
            <strong class="text-indigo-400">Jean-François Groff au CERN (1990) :</strong> L'ingénieur français Jean-François Groff a rejoint Tim Berners-Lee au CERN de Genève dès le départ pour l'aider à modéliser le World Wide Web. Il est co-auteur de la première spécification sémantique d'HTML, du protocole HTTP originel et du code de base du premier fureteur en mode texte qui a fait circuler le Web sur d'autres types d'ordinateurs non graphiques d'époque.
          </li>
        </ul>
      </div>`,
      tags: ['VideoLAN', 'Centrale Paris', 'Codecs Libres', 'CERN Web Origin', 'DivX Player']
    },
    {
      id: 'triple_play',
      title: 'Xavier Niel & La Box Triple Play',
      subtitle: 'La démocratisation de la fibre mondiale',
      year: '2002',
      pioneers: 'Xavier Niel (Free)',
      icon: '📼',
      summary: 'Le fondateur de Free invente la "Freebox" et le concept de "Triple Play" (Internet fixe + Télévision IP + Ligne de téléphonie fixe) pour le prix unique révolutionnaire de 29,99€ / mois.',
      significance: 'Cette offensive tarifaire et technologique a déclenché une concurrence d\'une violence inouïe en France, hissant les infrastructures françaises au premier plan du déploiement de l\'ultra-haut débit par fibre optique mondial.',
      detailedStoryHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed text-left">
        <p>
          Au tournant de l'an 2002, s'équiper d'une liaison haut débit ADSL à la maison requis l'achat d'un modem tiers instable, d'abonnements séparés onéreux et de frais de communications téléphoniques locales à la minute. Xavier Niel bouleverse l'industrie :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">La Freebox V1, première "Box" au monde :</strong> Free conçoit son propre matériel réseau à base d'une puce spécifique, la Freebox, distribuée à tous les abonnés de manière intégrée. Elle embarque un modem, un décodeur TV IP et une prise de raccordement téléphonique classique.
          </li>
          <li>
            <strong class="text-indigo-400">Le Tarif Unique Universel (29,99€) :</strong> En éliminant l'abonnement téléphonique de France Télécom, Free permet des économies colossales aux familles. Ce concept de "Triple Play" a été immédiatement copié dans toute l'Europe, puis par les plus grands câblo-opérateurs américains et mondiaux de l'époque.
          </li>
        </ul>
      </div>`,
      tags: ['Freebox', 'Xavier Niel', 'Triple Play ADSL', 'Haut-Débit Populaire']
    }
  ];

  const activeContrib = contributions.find(c => c.id === activeTab) || contributions[0];

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
          btnActive: 'bg-indigo-655/15 border border-indigo-500/50 text-indigo-400 font-semibold p-3.5 rounded-xl flex items-center justify-between text-xs transition text-left w-full',
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
    <div className="space-y-6" id="france-contributions-root">
      
      {/* Intro Banner Header Section */}
      <div className={`${
        theme === 'ie6' 
          ? 'bg-[#000080] text-white p-3 border-b border-white' 
          : theme === 'terminal' 
            ? 'bg-[#ffb000]/15 border border-[#ffb000]/40 text-[#ffb000] p-3' 
            : 'bg-gradient-to-r from-blue-955/20 to-slate-900 border border-slate-755 p-5 rounded-2xl shadow-md'
      } text-left`}>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-450/20">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest font-black text-blue-450 bg-blue-450/10 px-2 py-0.5 rounded-full uppercase">
              Patrimoine Technologique Mondial
            </span>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 mt-1">
              L'Apport de la France dans le Web Mondial
            </h2>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed opacity-85 mt-2.5 max-w-4xl">
          De l'invention décisive du datagramme par Louis Pouzin (CYCLADES), ancètre direct d'Internet, au déploiement de l'incroyable réseau télématique Minitel ou la création universelle de Docker par Solomon Hykes à Paris, explorez l'immense contribution des ingénieurs et start-ups français à l'architecture informatique planétaire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
        
        {/* Column 1: Selection Menu */}
        <div className="md:col-span-4 space-y-2.5">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
            ⚜️ Les Grandes Inventions :
          </span>

          <div className="flex flex-col gap-2">
            {contributions.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    playBeep(450 + (isActive ? 100 : 0), 'sine', 0.05);
                  }}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-france-contrib-${item.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-lg shrink-0 select-none">{item.icon}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{item.title}</b>
                      <span className="text-[9px] opacity-70 font-mono block">
                        {item.year} - {item.pioneers.split(' (')[0]}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition ${isActive ? 'translate-x-1 text-indigo-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3.5 bg-indigo-950/10 border border-indigo-500/10 text-[10px] text-slate-400 leading-relaxed font-sans">
            <span className="font-extrabold uppercase text-indigo-400 flex items-center gap-1.5 text-[9px] mb-1">
              💡 Le Saviez-Vous ?
            </span>
            <p>
              Vint Cerf, le co-concepteur de la stack TCP/IP, a officiellement qualifié <b className="text-slate-350">Louis Pouzin</b> de pionnier absolu sans lequel Internet n'aurait jamais pu exister de façon aussi décentralisée.
            </p>
          </div>
        </div>

        {/* Column 2: Detailed Selection Panel */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/40 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeContrib.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{activeContrib.title}</h3>
                  <span className="text-[10px] font-mono opacity-70">{activeContrib.subtitle}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-500/15 border border-blue-500/30 text-blue-450 px-2.5 py-0.5 rounded uppercase font-bold">
                Époque : {activeContrib.year}
              </span>
            </div>

            {/* Inner description text */}
            <div className={css.innerCard}>
              
              <div className="space-y-1.5">
                <span className="text-[9.5px] font-mono font-bold text-blue-400 uppercase flex items-center gap-1">
                  👤 Pionniers en Chef :
                </span>
                <p className="text-xs font-bold font-sans text-slate-200">
                  {activeContrib.pioneers}
                </p>
              </div>

              <div className="space-y-1 text-xs pt-2">
                <span className="text-[9.5px] font-mono font-bold text-indigo-400 uppercase flex items-center gap-1">
                  📖 Résumé & Concept :
                </span>
                <p className="leading-relaxed text-slate-300">
                  {activeContrib.summary}
                </p>
              </div>

              <div className="space-y-1 text-[11px] bg-slate-950/35 p-3.5 rounded-xl border border-slate-850">
                <span className="text-[9.5px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                  🏅 Portée & Significations Historiques :
                </span>
                <p className="leading-relaxed text-slate-300">
                  {activeContrib.significance}
                </p>
              </div>

              {/* Detailed story HTML */}
              <div className="pt-2">
                <span className="text-[9.5px] font-mono font-bold text-blue-400 uppercase block mb-2">
                  📝 Récit Historique & Spécifications :
                </span>
                <div dangerouslySetInnerHTML={{ __html: activeContrib.detailedStoryHtml }} />
              </div>

              {/* Tags panel */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/40">
                {activeContrib.tags.map((tag, index) => (
                  <span key={index} className={css.tag}>
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Share action */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Apport de la France : ${activeContrib.title}`}
                text={`Découvrez l'histoire fascinante de ${activeContrib.title} (${activeContrib.year}) conçue par des pionniers français sur le Musée du Web !`}
              />
            </div>

          </div>
        </div>

      </div>

      {/* DOCKER LIVE BUILDING SIMULATOR (ONLY SHOW IF IN DOCKER TAB OR SHOW IT AS A FUN BONUS!) */}
      <AnimatePresence mode="wait">
        {activeTab === 'docker' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="border-t border-slate-800/60 pt-6 mt-6 space-y-4"
            id="docker-simulator-subcomponent"
          >
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Box className="w-5 h-5 text-sky-400" />
                <h3 className="text-xs font-mono font-extrabold text-sky-400 uppercase">
                  ⚡ Simulateur d'exécution Docker ( dotCloud / Paris )
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal max-w-4xl">
                Solomon Hykes s'est inspiré du système de conteneurs de marchandises maritimes pour créer une suite logicielle permettant d'isoler n'importe quelle stack de développement. Compilez et exécutez votre container virtuel ci-dessous :
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Settings and config */}
              <div className="lg:col-span-5 space-y-4">
                <div className={css.card}>
                  <div className="text-[10px] tracking-wider uppercase font-mono font-bold text-sky-450 mb-1">
                    Image Applicative Dockerfile :
                  </div>
                  <h4 className="text-xs font-bold font-sans text-slate-200 mb-2">Sélectionner l'environnement de base</h4>
                  
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
                          <strong className="block text-[11px] font-mono leading-none">Symfony Core Engine</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">PHP 8.2 FPM w/ Alpine Linux OS</span>
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
                          <strong className="block text-[11px] font-mono leading-none">React Vite Frontend</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">NodeJS 20.x Light Container</span>
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
                          <strong className="block text-[11px] font-mono leading-none">Python FastAPI Back-End</strong>
                          <span className="text-[9px] opacity-70 block mt-0.5">Python 3.10-alpine micro-runtime</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Actions Block */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col gap-2">
                    <button
                      onClick={handleSimulateBuild}
                      disabled={buildStep === 'building'}
                      className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-sky-100 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-black text-xs transition border border-sky-505 disabled:opacity-40"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${buildStep === 'building' ? 'animate-spin' : ''}`} />
                      <span>{buildStep === 'building' ? 'Compilation en cours...' : '1. Compiler l\'image (docker build)'}</span>
                    </button>

                    <button
                      onClick={handleRunContainer}
                      disabled={buildStep !== 'built'}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-emerald-100 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-black text-xs transition border border-emerald-505 disabled:opacity-40"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>2. Lancer le Container (docker run)</span>
                    </button>
                  </div>

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
                  <span className="text-slate-500">v1.2.0</span>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
