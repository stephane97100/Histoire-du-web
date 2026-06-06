/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Upload, 
  ShieldAlert, 
  Tv, 
  History, 
  Lock, 
  Users, 
  Database, 
  AlertTriangle,
  Play,
  RotateCcw,
  Scale,
  FileCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface TorrentHistoryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface PeerConnection {
  ip: string;
  client: string;
  progress: number;
  speed: string;
  type: 'seeder' | 'leecher';
}

export default function TorrentHistoryView({ theme }: TorrentHistoryViewProps) {
  // Simulator state
  const [selectedTorrent, setSelectedTorrent] = useState<'music' | 'linux' | 'video'>('music');
  const [downloadProgress, setDownloadProgress] = useState(12);
  const [downloadSpeed, setDownloadSpeed] = useState(45); // in KB/s (retro!)
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showHadopiLetter, setShowHadopiLetter] = useState(false);
  const [peers, setPeers] = useState<PeerConnection[]>([
    { ip: '192.168.1.45', client: 'µTorrent 1.8.2', progress: 100, speed: '0 KB/s', type: 'seeder' },
    { ip: '82.234.12.102', client: 'Vuze 4.2', progress: 100, speed: '0 KB/s', type: 'seeder' },
    { ip: '90.45.189.23', client: 'Transmission 2.1', progress: 45, speed: '12 KB/s', type: 'leecher' },
    { ip: '109.23.4.156', client: 'BitComet 1.12', progress: 8, speed: '2 KB/s', type: 'leecher' }
  ]);

  // Handle mock download progression
  useEffect(() => {
    let interval: any;
    if (isDownloading && downloadProgress < 100) {
      interval = setInterval(() => {
        setDownloadProgress(prev => {
          const increment = Math.random() * 3 + 1;
          const target = Math.min(100, Number((prev + increment).toFixed(1)));
          
          // Randomize speed slightly to simulate ADSL lines
          const baseSpeed = selectedTorrent === 'linux' ? 245 : selectedTorrent === 'video' ? 120 : 45;
          setDownloadSpeed(Math.floor(baseSpeed + (Math.random() - 0.5) * 20));

          if (target >= 100) {
            setIsDownloading(false);
            setIsFinished(true);
            // Change status of leechers to seeders upon completeness
            setPeers(prevPeers => prevPeers.map(p => p.progress < 100 ? { ...p, progress: 100, speed: '0 KB/s', type: 'seeder' } : p));
            return 100;
          }
          return target;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isDownloading, downloadProgress, selectedTorrent]);

  const startDownload = () => {
    if (downloadProgress >= 100) {
      setDownloadProgress(0);
      setIsFinished(false);
    }
    setIsDownloading(true);
  };

  const pauseDownload = () => {
    setIsDownloading(false);
  };

  const resetDownload = () => {
    setIsDownloading(false);
    setDownloadProgress(0);
    setIsFinished(false);
    setDownloadSpeed(0);
    // Restart peer speeds
    setPeers([
      { ip: '192.168.1.45', client: 'µTorrent 1.8.2', progress: 100, speed: '0 KB/s', type: 'seeder' },
      { ip: '82.234.12.102', client: 'Vuze 4.2', progress: 100, speed: '0 KB/s', type: 'seeder' },
      { ip: '90.45.189.23', client: 'Transmission 2.1', progress: 42, speed: '12 KB/s', type: 'leecher' },
      { ip: '109.23.4.156', client: 'BitComet 1.12', progress: 8, speed: '2 KB/s', type: 'leecher' }
    ]);
  };

  const getThemeCSS = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActive: 'bg-[#000080] text-white font-bold px-3 py-1.5 border border-white text-xs rounded-none',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white px-3 py-1.5 text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none',
          preBox: 'bg-white border-2 border-inset border-[#808080] p-3 text-[11px] font-mono text-black overflow-x-auto',
          accentText: 'text-[#000080] font-black',
          tableHeader: 'bg-[#000080] text-white font-bold p-1 text-[10px]'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/40 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/20 px-3 py-1.5 text-xs rounded-none text-[#ffb000] font-bold',
          btnInactive: 'border border-[#ffb000]/30 hover:border-[#ffb000]/60 hover:bg-[#ffb000]/5 px-3 py-1.5 text-xs cursor-pointer rounded-none text-[#ffb000]/70',
          preBox: 'bg-black border border-[#ffb000]/25 p-3 text-[11px] font-mono text-[#ffb000] overflow-x-auto',
          accentText: 'text-[#ffb000] font-bold',
          tableHeader: 'border-b border-[#ffb000]/40 text-[#ffb000] font-bold p-1 text-[10px]'
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600 border-indigo-500 text-white font-semibold px-4 py-2 rounded-lg text-xs transition border',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-xs transition cursor-pointer border',
          preBox: 'bg-[#08080a] border border-slate-800 p-3.5 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto shadow-inner',
          accentText: 'text-indigo-400 font-semibold',
          tableHeader: 'bg-slate-950 text-slate-400 font-medium p-2 text-[10px] uppercase tracking-wider rounded-t-lg'
        };
    }
  };

  const css = getThemeCSS();

  return (
    <div className="space-y-6 animate-fadeIn" id="torrent-history-root">
      
      {/* Upper header notifications */}
      <div className={`${theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : theme === 'terminal' ? 'bg-[#ffb000]/10 border border-[#ffb000]/30 text-[#ffb000] font-mono' : 'bg-gradient-to-r from-red-955/20 to-slate-900 border border-slate-750'} p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-indigo-455 shrink-0 animate-bounce" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">💾 Le Torrent & P2P — L'Épopée du Partage Décentralisé</h2>
            <p className="text-[10px] opacity-75 mt-0.5">De la révolution physique de Napster et BitTorrent aux tribunaux de la loi Hadopi et l'avènement du streaming.</p>
          </div>
        </div>
      </div>

      {/* Legal & Didactic Disclaimer */}
      <div className={`${
        theme === 'ie6' 
          ? 'bg-[#ffffcc] text-[#800000] border-2 border-[#800000] p-3' 
          : theme === 'terminal' 
            ? 'bg-red-950/20 border border-red-500/30 text-red-400 p-3 font-mono' 
            : 'bg-red-500/5 border border-red-500/20 text-red-300 p-4 rounded-xl'
      } text-left text-xs`}>
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-red-400 mb-1">
          <Scale className="w-4 h-4 text-red-500 shrink-0" />
          Avertissement légal & But didactique
        </div>
        <p className="text-[11px] leading-relaxed opacity-92">
          Ce module interactif et historique est proposé exclusivement à titre <b>didactique, éducatif et culturel</b> afin de documenter l'évolution technique et juridique des protocoles de transmission décentralisés (P2P). <b>Nous n'encourageons ni ne tolérons en aucun cas le téléchargement ou le partage illégal d'œuvres protégées.</b> Le client de téléchargement présenté ci-dessous est un simulateur purement fictif fonctionnant en circuit fermé avec des données fictives simulées localement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left main text / Timeline (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={css.card}>
            <div className="border-b border-slate-800/40 pb-3 text-left">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                L'Histoire du Téléchargement de Fichiers (1999 - Présent)
              </h3>
            </div>

            <div className={`space-y-5 text-left text-xs ${theme === 'terminal' ? 'font-mono' : 'font-sans'}`}>
              
              {/* Napster Era */}
              <div className="border-l-2 border-indigo-500/35 pl-4 relative space-y-1">
                <div className="absolute w-3.5 h-3.5 bg-indigo-605 border-4 border-[#0c0c0e] rounded-full -left-[8px] top-1"></div>
                <span className="text-[10px] font-mono font-bold text-indigo-400">1999 - 2001 : Napster & la Naissance du MP3</span>
                <p className="leading-relaxed text-slate-300">
                  Créé par Shawn Fanning et John Fanning, Napster a brisé l'industrie musicale du CD en offrant le tout premier réseau <b>Peer-to-Peer (P2P)</b> grand public. En partageant les fichiers MP3 hébergés directement sur le disque dur des utilisateurs sans serveur central de stockage, Napster a prouvé la puissance d'une bande passante collaborative, avant d'être fermé par décision judiciaire suite aux plaintes de groupes comme Metallica et de la RIAA.
                </p>
              </div>

              {/* eMule / Kazaa Era */}
              <div className="border-l-2 border-indigo-500/35 pl-4 relative space-y-1">
                <div className="absolute w-3.5 h-3.5 bg-indigo-605 border-4 border-[#0c0c0e] rounded-full -left-[8px] top-1"></div>
                <span className="text-[10px] font-mono font-bold text-indigo-400">2002 - 2006 : Les Réseaux Gnutella, Kazaa et l'Âne d'eMule</span>
                <p className="leading-relaxed text-slate-300">
                  Après Napster, le P2P s'est totalement décentralisé. <b>eMule (réseau eDonkey2000)</b> et <b>Kazaa (protocole FastTrack)</b> permettaient de partager tous types de fichiers (DivX obsolètes, logiciels lourds, albums entiers). Les files d'attente interminables de l'âne d'eMule ont forgé la patience d'une génération, qui laissait tourner les ordinateurs bruyants toute la nuit pour un seul fichier de 700 Mo.
                </p>
              </div>

              {/* BitTorrent Era */}
              <div className="border-l-2 border-indigo-500/35 pl-4 relative space-y-1">
                <div className="absolute w-3.5 h-3.5 bg-indigo-605 border-4 border-[#0c0c0e] rounded-full -left-[8px] top-1"></div>
                <span className="text-[10px] font-mono font-bold text-indigo-400">2006 - 2012 : L'algorithme BitTorrent & Le protocole Multi-sources</span>
                <p className="leading-relaxed text-slate-300">
                  Conçu par Bram Cohen, <b>BitTorrent</b> a résolu le goulot d'étranglement traditionnel : plus un fichier est populaire, plus le téléchargement devient <i>rapide</i>. En découpant les fichiers en milliers de morceaux microscopiques et en forçant les clients à envoyer (uploader) leurs morceaux possédés en échange des morceaux manquants, BitTorrent a éliminé le besoin de gros serveurs de stockage. Des sites d'annuaires de trackers (The Pirate Bay, t411, KickassTorrents) sont devenus les temples du partage mondial.
                </p>
              </div>

              {/* Decline and Streaming */}
              <div className="border-l-2 border-rose-500/35 pl-4 relative space-y-1">
                <div className="absolute w-3.5 h-3.5 bg-rose-501 border-4 border-[#0c0c0e] rounded-full -left-[8px] top-1"></div>
                <span className="text-[10px] font-mono font-bold text-rose-455 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  De nos jours : Le déclin par la commodité du Streaming
                </span>
                <p className="leading-relaxed text-slate-300">
                  Le piratage de masse a fortement reflué avec l'arrivée des plateformes de streaming légal comme <b>Spotify</b> (2008), <b>Netflix</b> (2014 en France) ou <b>Steam</b> pour le jeu. La raison de ce démantèlement est simple : <b>l'expérience utilisateur</b>. Payer un abonnement mensuel modique élimine instantanément le risque de télécharger des virus informatiques déguisés, d'attendre des heures que le fichier charge, de configurer des ports NAT de modem complexes ou de recevoir des menaces d'amendes administratives.
                </p>
                <div className="bg-amber-955/15 border border-amber-500/20 p-2.5 rounded-lg text-[10.5px] mt-2 text-amber-400 flex items-start gap-1.5 leading-normal">
                  <Info className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>
                    <b>Insolite :</b> Paradoxalement, la fragmentation excessive du marché actuel de la SVOD (qui oblige un cinéphile à souscrire à 5 abonnements différents : Netflix, Disney+, Prime Video, Apple TV+, Max pour tout voir) engendre un retour modéré et mesurable vers le Torrent ces dernières années !
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Hadopi Educational Focus */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-left space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              Hadopi & DMCA : L'arsenal législatif de riposte graduée
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Face au tsunami du téléchargement illégal en P2P qui échappait à la fiscalité et aux droits d'auteurs, d'immenses vagues juridiques et de sanctions se sont déployées à l'échelle internationale.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-rose-450 font-bold block">
                  🇫🇷 En France : La riposte graduée Hadopi (2009)
                </span>
                <p className="text-slate-350 leading-normal text-[11px]">
                  La Haute Autorité pour la diffusion des œuvres et la protection des droits sur Internet surveillait les réseaux P2P publics à l'aide de prestataires privés (comme TMG). Elle extrayait les adresses IP d'internautes partageant des fichiers sous droits de propriété intellectuelle. La sanction fonctionnait en 3 phases : un premier e-mail solennel d'avertissement, une lettre recommandée si récidive sous quelques mois, puis un renvoi devant un juge pénal avec une amende théorique maximale de 1500€.
                </p>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-rose-450 font-bold block">
                  🇺🇸 Aux USA : Les DMCA Takedown & Copyright Alerts
                </span>
                <p className="text-slate-350 leading-normal text-[11px]">
                  Le <i>Digital Millennium Copyright Act</i> de 1998 a permis aux détenteurs de droits d'obliger les hébergeurs web à détruire immédiatement des fichiers hébergés illégalement sous peine de poursuites. Sur le P2P, de colossales alliances de majors (RIAA, MPAA) engageaient des détectives privés de données pour traquer d'immenses collectifs et bloquaient directement les lignes internet des abonnés américains pris sur le vif.
                </p>
              </div>
            </div>

            {/* Simulated letter invocation buttons */}
            <div className="pt-2 border-t border-slate-800 flex justify-center flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowHadopiLetter(true)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <AlertTriangle className="w-4 h-4 animate-pulse shrink-0" />
                <span>Simuler la Réception de l'E-mail d'Avertissement Hadopi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right segment: Simulation Box & Stats (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={css.card}>
            
            <div className="border-b border-slate-800/40 pb-3 text-left">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-100 flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                Interactif : µTorrent Classic Simulator (Client P2P Rétro)
              </h3>
            </div>

            {/* µTorrent simulated interface */}
            <div className="bg-slate-950/80 border border-slate-855 rounded-xl p-3 text-left text-xs font-sans space-y-3 shadow-inner">
              
              {/* Torrent Selector */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Fichier .torrent chargé :</span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => {
                      setSelectedTorrent('music');
                      resetDownload();
                    }}
                    className={`px-2 py-1.5 text-[10.5px] truncate font-semibold rounded transition ${
                      selectedTorrent === 'music' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    🎵 Linkin_Park.torrent
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTorrent('linux');
                      resetDownload();
                    }}
                    className={`px-2 py-1.5 text-[10.5px] truncate font-semibold rounded transition ${
                      selectedTorrent === 'linux' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    💿 ubuntu_desktop.torrent
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTorrent('video');
                      resetDownload();
                    }}
                    className={`px-2 py-1.5 text-[10.5px] truncate font-semibold rounded transition ${
                      selectedTorrent === 'video' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    🎬 matrix_screener_avi.torrent
                  </button>
                </div>
              </div>

              {/* Transfer Metrics line */}
              <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-lg space-y-1.5 font-mono text-[10.5px] text-slate-300">
                <div className="flex justify-between">
                  <span>Satut : {isFinished ? <b className="text-emerald-400">Complété (Seed)</b> : isDownloading ? 'Téléchargement' : 'En Pause'}</span>
                  <span>Vitesse : <b className="text-emerald-400">{downloadSpeed} KB/s</b></span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-450 text-left">
                  <span>Seeds (Sources actives) : {selectedTorrent === 'linux' ? '128' : '4'}</span>
                  <span>Peers (Partageurs) : {selectedTorrent === 'linux' ? '30' : '6'}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10.5px] font-mono">
                  <span>{downloadProgress}%</span>
                  <span>{selectedTorrent === 'linux' ? '700 Mo' : selectedTorrent === 'video' ? '680 Mo' : '68 Mo'}</span>
                </div>
                <div className="w-full h-4 bg-slate-900 border border-slate-800 rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300 ease-out" 
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons to trigger mock behavior */}
              <div className="flex gap-1.5">
                {!isDownloading ? (
                  <button
                    onClick={startDownload}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Lancer µTorrent
                  </button>
                ) : (
                  <button
                    onClick={pauseDownload}
                    className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={resetDownload}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-4c0 border border-slate-800 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Connected Peers Table */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-450 select-none block">Détails des connexions Client (P2P swarm) :</span>
                
                <div className="border border-slate-850 rounded-lg overflow-hidden bg-slate-950 font-mono text-[9px]">
                  <div className="grid grid-cols-4 bg-slate-900 p-1.5 text-slate-400 border-b border-slate-850">
                    <div>Adresse IP</div>
                    <div>Logiciel</div>
                    <div>% Partagé</div>
                    <div>Envoi</div>
                  </div>
                  <div className="max-h-24 overflow-y-auto divide-y divide-slate-900/50">
                    {peers.map((peer, i) => (
                      <div key={i} className="grid grid-cols-4 p-1.5 text-slate-300">
                        <div className="truncate text-left text-slate-450">{peer.ip}</div>
                        <div className="truncate text-left font-bold text-slate-350">{peer.client}</div>
                        <div className="text-left">{peer.progress}%</div>
                        <div className="text-left font-bold text-emerald-450">{peer.progress === 100 && isDownloading ? '14 KB/s' : '0 KB/s'}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Historical comparison summary */}
            <div className="rounded-xl p-3.5 bg-indigo-950/15 border border-indigo-500/10 text-left space-y-1.5 font-sans text-xs">
              <span className="font-extrabold uppercase text-indigo-400 flex items-center gap-1 text-[10px]">
                ⚖️ Les condamnations emblématiques
              </span>
              <p className="text-slate-350 leading-relaxed text-[11.5px]">
                Plusieurs figures marquantes du partage en ligne ont écopé de peines historiques sévères destinées à l'exemple :
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-300">
                <li>
                  <b>The Pirate Bay (Suède, 2009) :</b> Les quatre fondateurs de l'annuaire de fichiers ont été condamnés à 1 an de prison ferme et 2,7 millions d'euros d'amendes solidaires.
                </li>
                <li>
                  <b>Megaupload (Nouvelle-Zélande, 2012) :</b> Une intervention policière ultra-médiatisée au fusil d'assaut a mis à genoux le domaine de Kim Dotcom sur sa colline d'hébergement direct, causant l'extinction du service.
                </li>
                <li>
                  <b>t411 (France, 2017) :</b> Le plus grand tracker privé francophone a été stoppé net par la police nationale en collaboration avec la police suédoise, à la recherche de serveurs miroirs dissimulés.
                </li>
              </ul>
            </div>

            {/* Share buttons */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Histoire d'Internet : Le Torrent`}
                text={`Explorons comment le protocole BitTorrent et la loi Hadopi ont transformé le partage de données d'époque sur le Musée du Web !`}
              />
            </div>

          </div>
        </div>

      </div>

      {/* Hadopi Simulated Warning Letter (Custom High Quality Modals) */}
      <AnimatePresence>
        {showHadopiLetter && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto font-sans">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-800 max-w-2xl w-full p-6 md:p-8 rounded-xl shadow-2xl relative border-t-8 border-red-600 text-left font-serif leading-relaxed"
            >
              <div className="flex justify-between items-start border-b pb-4 mb-4 font-sans text-xs text-slate-500">
                <div>
                  <h1 className="text-base font-black tracking-tight text-slate-800 font-sans uppercase">HADOPI</h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider">Haut Conseil de la Diffusion des Œuvres</span>
                </div>
                <div className="text-right">
                  <p>Référence : IPV4-SWARM-2026</p>
                  <p>Date : {new Date().toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-700">
                <span className="font-bold underline block font-sans">Objet : Recommandation de la Commission de Protection des Droits</span>

                <p>
                  Madame, Monsieur,
                </p>

                <p>
                  Il a été constaté qu'une liaison internet d'abonnement raccordée à votre nom d'utilisateur a été exploitée pour procéder directement au partage, au téléchargement ou à la mise à disposition d'œuvres protégées par la propriété intellectuelle (Art. L.336-2 du code du droit d'auteur).
                </p>

                <div className="p-3 bg-red-50 border border-red-200 rounded font-mono text-[10.5px] text-slate-705 block leading-normal">
                  <b>DÉTAILS DES INFRACTIONS CONSTATÉES :</b>
                  <p className="mt-1">Date et heure : {new Date().toLocaleTimeString('fr-FR')} UTC</p>
                  <p>Adresse IP surveillée : 82.234.12.102</p>
                  <p>Fichier torrent / Œuvre : {selectedTorrent === 'music' ? 'Linkin Park - Hybrid Theory (Album MP3)' : selectedTorrent === 'video' ? 'The Matrix (1999) WebRip DivX' : 'Ubuntu Desktop Core Desktop Distribution ISO'}</p>
                  <p>Réseau de détection : BitTorrent Peer Swarm Network (TMG Surveillance SAS)</p>
                </div>

                <p>
                  Cette recommandation constitue l'étape initiale de la <b>riposte graduée</b>. Nous vous rappelons que l'obligation de veiller à la sécurisation de l'accès internet de votre résidence est à votre entière charge. En l'absence de renouvellement de ces pratiques illégales dans un délai de six mois, le dossier sera clos.
                </p>

                <p>
                  À défaut, si un deuxième constat est établi, vous recevrez une mise en garde par lettre recommandée. Des peines d'amendes à hauteur de <b>1 550 euros</b> et de suspension administrative globale de l'accès internet de votre foyer pourront être requises devant un tribunal pénal.
                </p>

                <p className="italic text-slate-500 text-[11px]">
                  Veuillez accepter, Madame, Monsieur, l'expression de nos sentiments vigilants pour la promotion du droit d'auteur légal en France.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end gap-2 font-sans select-none">
                <button
                  type="button"
                  onClick={() => setShowHadopiLetter(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                >
                  Fermer l'avertissement de sécurité
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
