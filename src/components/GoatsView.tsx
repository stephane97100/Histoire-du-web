/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Mail,
  Youtube,
  BookOpen,
  Wifi,
  WifiOff,
  Cpu,
  Database,
  Award,
  Zap,
  Volume2,
  Clock,
  Settings,
  RefreshCw,
  Edit,
  History,
  CheckCircle,
  FileText,
  Users,
  AlertTriangle,
  Play,
  Server,
  HardDrive,
  Monitor,
  ArrowRight,
  ChevronRight,
  Search,
  ShoppingBag,
  MessageSquare,
  Globe,
  Archive
} from 'lucide-react';

interface GoatsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

type GoatTab = 
  | 'wikipedia' 
  | 'wow' 
  | 'dofus' 
  | 'gmail' 
  | 'hotmail_outlook' 
  | 'youtube' 
  | 'google' 
  | 'wordpress' 
  | 'archive' 
  | 'reddit' 
  | 'fourchan' 
  | 'amazon_ebay' 
  | 'leboncoin';

interface TimelineMilestone {
  year: number;
  title: string;
  app: string;
  appTab: GoatTab;
  bandwidth: string;
  bandwidthSpeed: string; // e.g., "56 Kbps"
  downloadSeconds10MB: number; // raw seconds to download 10MB
  hardware: string;
  impact: string;
  funFact: string;
  techLevel: string;
}

const milestones: TimelineMilestone[] = [
  {
    year: 2001,
    title: "Wikipédia - L'émancipation du savoir universel",
    app: "Wikipedia",
    appTab: "wikipedia",
    bandwidth: "Modem RTC 56K / Forfait Téléphonique minute",
    bandwidthSpeed: "56 Kbps (7 Ko/s max)",
    downloadSeconds10MB: 1428, // 10000 KB / 7 KB/s = 1428s (23.8 min)
    hardware: "Intel Pentium III (500 MHz) • 64 Mo SDRAM • HDD 10 Go • Windows 98",
    impact: "Mort commerciale de l'encyclopédie papier et d'Encarta CD-ROM. Début du crowdsourcing mondial décentralisé.",
    funFact: "Le bip strident du modem signalait la déconnexion immédiate du téléphone fixe des parents. Interdit de téléphoner pendant qu'on lit !",
    techLevel: "Moteur UseModWiki (Perl) puis MediaWiki (PHP) • Syntaxe wikitexte ultra-légère permettant d'économiser chaque octet de trafic."
  },
  {
    year: 2002,
    title: "Warcraft III - L'avènement du multijoueur de masse",
    app: "Warcraft III",
    appTab: "wow",
    bandwidth: "Début de l'ADSL bas débit (Wanadoo Forfait 50H)",
    bandwidthSpeed: "128 Kbps (16 Ko/s)",
    downloadSeconds10MB: 625, // 10000 KB / 16 KB/s = 625s (10.4 min)
    hardware: "Pentium III/4 (1.2 GHz) • Nvidia GeForce2 MX • 128 Mo RAM • CRT 15\"",
    impact: "Développement massif de Battle.net, explosion des cartes personnalisées (dont DotA, ancêtre direct de League of Legends).",
    funFact: "Le forfait 50 Heures de Wanadoo était minuté. On lançait des chronomètres physiques sur le bureau pour éviter le hors-forfait !",
    techLevel: "Protocole UDP léger avec sérialisation stricte des coordonnées. La latence restait sous 150ms malgré un débit extrêmement réduit."
  },
  {
    year: 2004,
    title: "Dofus - Le tour de force de l'animation vectorielle",
    app: "Dofus v1.29",
    appTab: "dofus",
    bandwidth: "ADSL classique Grand Public",
    bandwidthSpeed: "512 Kbps (64 Ko/s)",
    downloadSeconds10MB: 156, // 10000 / 64 = 156s (2.6 min)
    hardware: "Intel Celeron / Pentium 4 • Carte graphique intégrée • 256 Mo DDR RAM",
    impact: "Démocratisation absolue du MMORPG en Europe. Premier jeu jouable en cachette au CDI de l'école !",
    funFact: "Pas de carte bleue ? Les collégiens payaient leur abonnement hebdomadaire par SMS surtaxés (Audiotel) !",
    techLevel: "Moteur d'exécution Adobe Flash Player (ActionScript 2). Rendu vectoriel ultra-léger et calculs de trajectoires côté client."
  },
  {
    year: 2004,
    title: "Gmail - La révolution AJAX",
    app: "Gmail",
    appTab: "gmail",
    bandwidth: "ADSL 512k à 1024k en pleine croissance",
    bandwidthSpeed: "512 Kbps à 1024 Kbps (64 à 128 Ko/s)",
    downloadSeconds10MB: 78,
    hardware: "Intel Pentium 4 • Écran cathodique CRT 17\" • 512 Mo RAM • IE6",
    impact: "Invention de l'ergonomie web moderne (Single Page Applications). Fin des écrans blancs de rafraîchissement à chaque clic.",
    funFact: "Avoir 1 Giga-Octet d'espace gratuit semblait si fou que beaucoup ont cou que l'annonce du 1er avril était une plaisanterie.",
    techLevel: "XMLHttpRequest asynchrone • Hydratation dynamique du DOM • Compression de données JSON et XML en tâche de fond."
  },
  {
    year: 2005,
    title: "YouTube - La libération de la vidéo sociale",
    app: "YouTube",
    appTab: "youtube",
    bandwidth: "ADSL Haut Débit naissant",
    bandwidthSpeed: "2 Mbps (250 Ko/s)",
    downloadSeconds10MB: 40,
    hardware: "Intel Pentium D / AMD Athlon 64 • 512 Mo à 1 Go RAM • Flash Player 8",
    impact: "Fin des codecs propriétaires lourds à installer (RealPlayer/QuickTime). Remplacement par la vidéo intégrée accessible en un clic.",
    funFact: "Le symbole de mémoire tampon (la roulette qui tourne) était l'objet le plus redouté du web. On attendait que la barre se charge !",
    techLevel: "Encapsulation vidéo Flash (.flv) basée sur le codec H.263 Sorenson Spark, permettant de diffuser une vidéo 240p à 250 Kbps."
  },
  {
    year: 2006,
    title: "World of Warcraft - L'âge d'or de l'univers persistant",
    app: "World of Warcraft",
    appTab: "wow",
    bandwidth: "ADSL2+ Haut Débit (Dégroupage Freebox / Neufbox)",
    bandwidthSpeed: "8 Mbps à 20 Mbps (1 à 2.5 Mo/s)",
    downloadSeconds10MB: 6,
    hardware: "Intel Core 2 Duo • Nvidia GeForce 6600 GT • 1 Go DDR2 RAM • Windows XP",
    impact: "Phénomène de société planétaire, démocratisation de Teamspeak pour les raids à 40, essor des wikis spécialisés et de l'e-sport.",
    funFact: "Les boîtes de jeu contenaient 4 à 5 CD-ROMs physiques qu'il fallait insérer l'un après l'autre pendant plus d'une heure !",
    techLevel: "Moteur 3D temps-réel hautement optimisé, architecture réseau à base de 'shards' (canaux serveurs) pour diviser la charge."
  }
];

export default function GoatsView({ theme }: GoatsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<GoatTab>('wikipedia');
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);

  // Styles based on active theme
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#d4d0c8] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none text-left',
          header: 'bg-[#000080] text-white p-1.5 font-bold text-xs border border-white flex items-center justify-between',
          panel: 'bg-[#dee3e7] border border-[#808080] p-4 text-xs space-y-3 text-black',
          tabActive: 'bg-[#d4d0c8] text-black font-bold px-4 py-2 border-t-2 border-l-2 border-r-2 border-white -mb-[2px] z-10 text-xs rounded-none shadow-none',
          tabInactive: 'bg-[#c0c0c0] text-slate-700 border-t-2 border-l-2 border-r-2 border-transparent px-4 py-2 text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none',
          codeBg: 'bg-white border border-[#808080] p-3 font-mono text-xs text-black overflow-x-auto shadow-inner',
          accentText: 'text-[#000080] font-bold'
        };
      case 'terminal':
        return {
          card: 'bg-black border border-[#ffb000]/40 p-5 text-[#ffb000] font-mono rounded-none text-left',
          header: 'bg-black border-b border-[#ffb000]/40 pb-2 font-bold text-xs flex items-center justify-between uppercase tracking-wider',
          panel: 'bg-black border border-[#ffb000]/20 p-4 text-xs space-y-3 text-[#ffb000]',
          tabActive: 'border-t border-l border-r border-[#ffb000] bg-[#ffb000]/20 px-4 py-2 text-xs rounded-none text-[#ffb000] font-bold -mb-[1px] z-10',
          tabInactive: 'border-t border-l border-r border-transparent hover:border-[#ffb000]/40 hover:bg-[#ffb000]/5 px-4 py-2 text-xs cursor-pointer rounded-none text-[#ffb000]/70',
          codeBg: 'bg-[#050505] border border-[#ffb000]/25 p-3 font-mono text-xs text-[#ffb000]/90 overflow-x-auto',
          accentText: 'text-[#ffb000] font-bold'
        };
      default: // Modern
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4 text-left text-slate-100',
          header: 'bg-[#1a1a20] p-3 rounded-xl border border-slate-800 text-sm font-bold text-white flex items-center justify-between',
          panel: 'bg-[#16161a]/60 border border-[#2a2a2e] p-5 rounded-xl space-y-4 text-xs text-slate-300',
          tabActive: 'bg-indigo-600 text-white font-semibold px-4 py-2.5 rounded-lg text-xs transition shadow-md shadow-indigo-900/20',
          tabInactive: 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-lg text-xs transition cursor-pointer',
          codeBg: 'bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto',
          accentText: 'text-indigo-400 font-semibold'
        };
    }
  };

  const css = getThemeClass();

  const getTimelineThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          wrapper: 'bg-[#d4d0c8] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans text-left space-y-4 mb-2',
          cardHeader: 'bg-[#000080] text-white p-1.5 font-bold text-xs flex items-center gap-1.5',
          nodeActive: 'bg-[#000080] text-white border-2 border-white px-2.5 py-1 text-xs font-bold font-sans cursor-pointer text-left',
          nodeInactive: 'bg-[#c0c0c0] text-black border-2 border-white px-2.5 py-1 text-xs font-sans cursor-pointer hover:bg-[#d4d0c8] text-left',
          panelBg: 'bg-[#dee3e7] border border-[#808080] p-3 space-y-3.5 text-xs',
          metricCard: 'bg-white border border-[#808080] p-2.5 text-[11px] font-mono text-black',
          subHeader: 'text-[#000080] font-bold border-b border-[#808080] pb-1 flex items-center gap-1 uppercase'
        };
      case 'terminal':
        return {
          wrapper: 'bg-black border border-[#ffb000]/40 p-4 font-mono text-[#ffb000] text-left space-y-4 mb-2',
          cardHeader: 'border-b border-[#ffb000]/40 pb-1.5 text-xs uppercase tracking-wider font-bold flex items-center gap-1.5',
          nodeActive: 'bg-[#ffb000]/20 border border-[#ffb000] text-[#ffb000] px-2.5 py-1 text-xs font-bold font-mono cursor-pointer text-left',
          nodeInactive: 'bg-black border border-[#ffb000]/30 text-[#ffb000]/70 px-2.5 py-1 text-xs font-mono cursor-pointer hover:border-[#ffb000] hover:text-[#ffb000] text-left',
          panelBg: 'bg-black border border-[#ffb000]/20 p-3 space-y-3.5 text-xs',
          metricCard: 'bg-black border border-[#ffb000]/10 p-2.5 text-[11px] font-mono text-[#ffb000]/90',
          subHeader: 'text-[#ffb000] font-bold border-b border-[#ffb000]/30 pb-1 flex items-center gap-1 uppercase'
        };
      default: // Modern
        return {
          wrapper: 'bg-[#111114] border border-[#2a2a2e] p-5 rounded-2xl shadow-xl text-left space-y-5 mb-2',
          cardHeader: 'bg-[#1a1a20] p-3 rounded-xl border border-slate-800 text-sm font-bold text-white flex items-center gap-1.5',
          nodeActive: 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-950/40 border border-indigo-400/20 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition text-left',
          nodeInactive: 'bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition text-left',
          panelBg: 'bg-[#16161a]/40 border border-[#2a2a2e] p-4 rounded-xl space-y-4 text-xs text-slate-300',
          metricCard: 'bg-slate-950/60 border border-slate-900 p-3 rounded-lg text-[11px] font-mono text-slate-300 space-y-1',
          subHeader: 'text-indigo-400 font-semibold flex items-center gap-1 text-xs uppercase'
        };
    }
  };

  const timelineCss = getTimelineThemeClass();

  // Basic audio synthesizer for retro sounds
  const playSfx = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.1) => {
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
      // Audio block by browser policy
    }
  };

  // --- GAMING GOAT SIMULATOR STATES ---
  const [selectedConnection, setSelectedConnection] = useState<'modem_56k' | 'adsl_128' | 'adsl_512' | 'fiber'>('adsl_128');
  const [selectedGamePatch, setSelectedGamePatch] = useState<'dofus_1_29' | 'wow_classic'>('dofus_1_29');
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [phoneLineOccupied, setPhoneLineOccupied] = useState<boolean>(false);
  const [simulatedTimeLeft, setSimulatedTimeLeft] = useState<string>('');
  const [costAccumulated, setCostAccumulated] = useState<number>(0);

  // --- HOTMAIL OUTLOOK STATES ---
  const [hotmailStorage, setHotmailStorage] = useState<number>(1.88); // Limit is 2.00 MB
  const [hotmailEmails, setHotmailEmails] = useState<{ id: number; from: string; subject: string; size: number; date: string }[]>([
    { id: 1, from: 'webmaster@multimania.com', subject: 'Votre site perso est en ligne !', size: 0.12, date: '12/10/1998' },
    { id: 2, from: 'lucie98@caramail.fr', subject: 'Photos de vacances de cet été (LOURD !)', size: 0.95, date: '14/10/1998' },
    { id: 3, from: 'gold-offer@spam-marketing.com', subject: 'Gagnez un voyage aux Bahamas à vie !!!', size: 0.45, date: '15/10/1998' },
    { id: 4, from: 'copains@voila.fr', subject: 'Chaine d\'amitié (A RENVOYER A TOUS TES CONTACTS !!!)', size: 0.36, date: '15/10/1998' },
  ]);

  const handleDeleteEmail = (id: number, size: number) => {
    setHotmailEmails(prev => prev.filter(e => e.id !== id));
    setHotmailStorage(prev => Math.max(0, parseFloat((prev - size).toFixed(2))));
    playSfx(150, 'sawtooth', 0.1);
  };

  const handleEmptyTrash = () => {
    setHotmailEmails([]);
    setHotmailStorage(0);
    playSfx(120, 'sawtooth', 0.2);
  };

  const handleReceiveEmail = () => {
    const newId = Date.now();
    const isSpam = Math.random() > 0.3;
    const spamMails = [
      { from: 'million-dollars@rich-lottery.net', subject: '!!! FÉLICITATIONS VOUS AVEZ GAGNÉ !!!', size: 0.65 },
      { from: 'viagra-direct@discount-meds.org', subject: 'V-i-a-g-r-a super promo limitee !', size: 0.25 },
      { from: 'chaine-du-coeur@caramail.com', subject: 'Si tu n\'envoies pas ce mail un chat noir viendra', size: 0.55 }
    ];
    const normalMails = [
      { from: 'maman@wanadoo.fr', subject: 'Recette de la tarte aux pommes de mamie', size: 0.15 },
      { from: 'seb_counterstrike@club-internet.fr', subject: 'Match de clan CS 1.6 ce soir ?', size: 0.08 },
      { from: 'news@dofus.com', subject: 'Abonnement Dofus : Les nouveaux serveurs !', size: 0.18 }
    ];
    const chosen = isSpam ? spamMails[Math.floor(Math.random() * spamMails.length)] : normalMails[Math.floor(Math.random() * normalMails.length)];
    
    setHotmailEmails(prev => [
      ...prev,
      { id: newId, from: chosen.from, subject: chosen.subject, size: chosen.size, date: 'Aujourd\'hui' }
    ]);
    setHotmailStorage(prev => parseFloat((prev + chosen.size).toFixed(2)));
    playSfx(600, 'sine', 0.15);
  };

  // --- GOOGLE SEARCH 1998 STATES ---
  const [googleQuery, setGoogleQuery] = useState<string>('');
  const [googleResults, setGoogleResults] = useState<any[] | null>(null);

  const handleGoogleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!googleQuery.trim()) return;
    
    playSfx(350, 'triangle', 0.1);
    const q = googleQuery.toLowerCase();
    
    const db = [
      {
        keywords: ['dofus', 'ankama', 'mmo'],
        title: 'Dofus v1.29 - Le MMORPG Tactique en Flash de Ankama',
        desc: 'Créez votre personnage (Iop, Cra, Sadida...) et partez à la recherche des 6 précieux Dofus. Jouable sur navigateur web avec Macromedia Flash Player.',
        url: 'http://www.dofus.com/'
      },
      {
        keywords: ['caramail', 'tchat', 'mail'],
        title: 'CaraMail - Le plus grand portail de tchat francophone',
        desc: 'Rejoignez nos salons thématiques de discussion, créez votre boîte mail gratuite @caramail.fr et personnalisez votre avatar pixel.',
        url: 'http://www.caramail.fr/'
      },
      {
        keywords: ['counter', 'cs', 'half-life', 'jeux'],
        title: 'Vossey.com - Tout sur Half-Life, Counter-Strike et mods',
        desc: 'Téléchargez les derniers patchs pour CS 1.5, CS 1.6 et suivez l\'actualité de la communauté francophone de serveurs de jeu.',
        url: 'http://www.vossey.com/'
      },
      {
        keywords: ['mp3', 'napster', 'musique'],
        title: 'Napster - Partage de fichiers de musique MP3 P2P',
        desc: 'ATTENTION : Le téléchargement d\'œuvres protégées peut être illégal. Téléchargez vos fichiers audio compressés au format MP3 en quelques minutes.',
        url: 'http://www.napster.com/'
      },
      {
        keywords: ['winamp', 'skin', 'lecteur'],
        title: 'Winamp - It really whips the llama\'s ass !',
        desc: 'Téléchargez Winamp 2.81, le meilleur lecteur MP3 audio gratuit. Personnalisez l\'interface avec des milliers de skins créés par la communauté.',
        url: 'http://www.winamp.com/'
      },
      {
        keywords: ['lycos', 'moteur', 'recherche'],
        title: 'Lycos France - Va chercher, Lycos !',
        desc: 'Le moteur de recherche avec le célèbre chien noir qui va dénicher les meilleures pages perso d\'internet pour vous.',
        url: 'http://www.lycos.fr/'
      }
    ];

    const matched = db.filter(item => 
      item.keywords.some(keyword => q.includes(keyword)) || 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    );

    if (matched.length > 0) {
      setGoogleResults(matched);
    } else {
      setGoogleResults([
        {
          title: `Aucun résultat exact pour "${googleQuery}"`,
          desc: 'Essayez de chercher des termes de l\'époque comme "Dofus", "Caramail", "Winamp", "Napster" ou "Lycos" !',
          url: 'http://www.google.com/search?q=help'
        }
      ]);
    }
  };

  // --- WORDPRESS 2003 STATES ---
  const [wpTitle, setWpTitle] = useState<string>('Le Journal Intime du Webmaster');
  const [wpPostContent, setWpPostContent] = useState<string>('Aujourd\'hui j\'ai configuré mon premier serveur Apache local. PHP 4.3 c\'est vraiment révolutionnaire par rapport à Perl !');
  const [wpTheme, setWpTheme] = useState<'classic' | 'blue' | 'matrix'>('classic');
  const [wpPublished, setWpPublished] = useState<boolean>(false);
  const [wpPosts, setWpPosts] = useState<{ title: string; content: string; date: string }[]>([
    { title: 'Bienvenue sur mon blog', content: 'Ceci est mon tout premier article propulsé par WordPress 1.0 (Miles Davis).', date: '03/06/2003' }
  ]);

  const handleWpPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wpTitle.trim() || !wpPostContent.trim()) return;
    
    setWpPosts(prev => [
      { title: wpTitle, content: wpPostContent, date: new Date().toLocaleDateString() },
      ...prev
    ]);
    setWpPublished(true);
    playSfx(500, 'sine', 0.15);
    setTimeout(() => setWpPublished(false), 3000);
  };

  // --- INTERNET ARCHIVE STATES ---
  const [archiveYear, setArchiveYear] = useState<number>(1998);
  const [archiveUrlInput, setArchiveUrlInput] = useState<string>('google.com');
  const [archiveCurrentUrl, setArchiveCurrentUrl] = useState<string>('google.com');

  // --- REDDIT 2005 STATES ---
  const [redditVotes, setRedditVotes] = useState<Record<number, number>>({ 1: 154, 2: 89, 3: 42 });
  const [redditUserVotes, setRedditUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});

  const handleRedditVote = (id: number, direction: 'up' | 'down') => {
    const current = redditUserVotes[id];
    let diff = 0;
    
    if (current === direction) {
      diff = direction === 'up' ? -1 : 1;
      setRedditUserVotes(prev => ({ ...prev, [id]: null }));
    } else {
      if (!current) {
        diff = direction === 'up' ? 1 : -1;
      } else {
        diff = direction === 'up' ? 2 : -2;
      }
      setRedditUserVotes(prev => ({ ...prev, [id]: direction }));
    }
    
    setRedditVotes(prev => ({ ...prev, [id]: prev[id] + diff }));
    playSfx(direction === 'up' ? 450 : 250, 'sine', 0.08);
  };

  // --- 4CHAN 2003 STATES ---
  const [fourChanPosts, setFourChanPosts] = useState<{ id: number; author: string; time: string; text: string; image?: string }[]>([
    { id: 1, author: 'Anonymous', time: '11/04/2003 14:22:15', text: 'All your base are belong to us !! Old but gold.', image: 'aybabtu' },
    { id: 2, author: 'Anonymous', time: '11/04/2003 14:25:32', text: 'Chuck Norris can slam a revolving door. Legend.' },
    { id: 3, author: 'Anonymous', time: '11/04/2003 14:28:01', text: 'Does anyone remember Caramail chat rooms? Meet me in Salon 25.' },
  ]);
  const [newFourChanPost, setNewFourChanPost] = useState<string>('');

  const handleAddFourChanPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFourChanPost.trim()) return;
    
    const id = Date.now();
    const time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    setFourChanPosts(prev => [
      ...prev,
      { id, author: 'Anonymous', time, text: newFourChanPost }
    ]);
    setNewFourChanPost('');
    playSfx(200, 'square', 0.1);
  };

  // --- AMAZON EBAY 1995 STATES ---
  const [ebayBid, setEbayBid] = useState<number>(24.50);
  const [ebayTimeLeft, setEbayTimeLeft] = useState<number>(10); // 10 seconds bid war
  const [ebayStatus, setEbayStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [ebayUserBid, setEbayUserBid] = useState<number>(25.00);

  const handleStartEbayBid = () => {
    setEbayBid(24.50);
    setEbayUserBid(25.00);
    setEbayTimeLeft(10);
    setEbayStatus('playing');
    playSfx(440, 'triangle', 0.1);
  };

  const handlePlaceBid = () => {
    if (ebayStatus !== 'playing') return;
    const nextBid = ebayBid + 1.50;
    setEbayBid(nextBid);
    setEbayUserBid(nextBid + 1.00);
    playSfx(550, 'sine', 0.08);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (ebayStatus === 'playing') {
      timer = setInterval(() => {
        setEbayTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            const userWon = Math.random() > 0.4;
            setEbayStatus(userWon ? 'won' : 'lost');
            playSfx(userWon ? 600 : 150, 'sine', 0.3);
            return 0;
          }
          if (Math.random() > 0.6) {
            setEbayBid(b => b + 1.00);
            playSfx(300, 'square', 0.05);
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [ebayStatus]);

  // --- LEBONCOIN 2006 STATES ---
  const [lbcCategory, setLbcCategory] = useState<string>('all');
  const [lbcItems, setLbcItems] = useState<{ id: number; title: string; price: number; loc: string; date: string; category: string; desc: string }[]>([
    { id: 1, title: 'Minitel 2 modèle Alcatel en boîte', price: 15, loc: 'Lille (59)', date: 'Hier', category: 'retro_tech', desc: 'Minitel 2 en parfait état cosmétique et de marche. Idéal pour collectionneur ou déco vintage.' },
    { id: 2, title: 'Modem RTC 56K US Robotics externe', price: 10, loc: 'Lyon (69)', date: 'Aujourd\'hui', category: 'retro_tech', desc: 'Vends modem 56k avec tous les câbles et alimentation. Parfait pour écouter le son mythique de la connexion.' },
    { id: 3, title: 'CD-ROM Encyclopédie Encarta 98', price: 5, loc: 'Paris (75)', date: 'Il y a 2 jours', category: 'medias', desc: 'Boîte d\'origine avec ses 2 CDs. Tout le savoir mondial hors-ligne sur votre Windows 95/98.' },
    { id: 4, title: 'Vends Lot de 12 magazines Joystick', price: 12, loc: 'Marseille (13)', date: 'Hier', category: 'medias', desc: 'Lot d\'anciens numéros de 2002 à 2004 avec les CDs de démos d\'époque encore sous blister.' },
    { id: 5, title: 'PC Complet Pentium III 450 Mhz', price: 60, loc: 'Bordeaux (33)', date: 'Aujourd\'hui', category: 'retro_tech', desc: 'Ordinateur rétro gaming complet. Pentium III, 128Mo RAM, carte 3Dfx Voodoo 3 2000, disque 20Go. Windows 98 SE préinstallé.' },
  ]);

  // Patch sizes
  const patchSizes = {
    dofus_1_29: 180, // MB (Ankama Flash lightweight launcher)
    wow_classic: 4800 // MB (4.8 GB - massive installation across CDs)
  };

  // Connection bandwidth rates
  const connectionSpecs = {
    modem_56k: { name: 'Modem RTC 56 Kbps (Téléphone)', speedKbps: 56, isDialUp: true, hourlyCost: 2.4, dataCap: 'Illimité (payé à la minute)' },
    adsl_128: { name: 'ADSL 128 Kbps (Forfait 50H)', speedKbps: 128, isDialUp: false, hourlyCost: 0.5, dataCap: 'Quota de 1 Go inclus' },
    adsl_512: { name: 'ADSL Mega 512 Kbps (Wanadoo)', speedKbps: 512, isDialUp: false, hourlyCost: 0, dataCap: 'Quota de 3 Go (0.50€ par Mo sup)' },
    fiber: { name: 'Fibre Optique Moderne (1 Gbps)', speedKbps: 1000000, isDialUp: false, hourlyCost: 0, dataCap: 'Illimité total' }
  };

  const handleStartDownloadSim = () => {
    setDownloading(true);
    setDownloadProgress(0);
    setCostAccumulated(0);
    if (connectionSpecs[selectedConnection].isDialUp) {
      setPhoneLineOccupied(true);
      playSfx(880, 'square', 0.2);
    } else {
      setPhoneLineOccupied(false);
      playSfx(440, 'triangle', 0.1);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloading) {
      const speedInMBps = (connectionSpecs[selectedConnection].speedKbps / 8) / 1024;
      const totalSize = patchSizes[selectedGamePatch];
      
      // Calculate realistic simulated remaining time
      const totalSecondsNeeded = totalSize / speedInMBps;
      
      interval = setInterval(() => {
        setDownloadProgress(prev => {
          const stepSize = (speedInMBps / totalSize) * 100 * 2.5; // sped up 2.5x for demo comfort
          const nextVal = prev + stepSize;

          // Cost generation
          if (connectionSpecs[selectedConnection].isDialUp) {
            setCostAccumulated(c => parseFloat((c + 0.15).toFixed(2))); // 15 cents of franc/euro per tick
          } else if (selectedConnection === 'adsl_128' && prev > 15) { // easily burning hourly plan
            setCostAccumulated(c => parseFloat((c + 0.08).toFixed(2)));
          } else if (selectedConnection === 'adsl_512' && (totalSize * (prev / 100)) > 3072) { // 3GB quota overrun
            setCostAccumulated(c => parseFloat((c + 0.50).toFixed(2))); // 50c per over-quota MB!
          }

          if (nextVal >= 100) {
            setDownloading(false);
            setPhoneLineOccupied(false);
            playSfx(587.33, 'sine', 0.3); // success tone D5
            return 100;
          }

          // Compute remaining simulated time
          const percentLeft = 100 - nextVal;
          const secondsRemaining = (percentLeft / 100) * totalSecondsNeeded;
          if (secondsRemaining > 3600) {
            const hrs = Math.floor(secondsRemaining / 3600);
            const mins = Math.floor((secondsRemaining % 3600) / 60);
            setSimulatedTimeLeft(`${hrs} h ${mins} min`);
          } else if (secondsRemaining > 60) {
            const mins = Math.floor(secondsRemaining / 60);
            const secs = Math.floor(secondsRemaining % 60);
            setSimulatedTimeLeft(`${mins} min ${secs} s`);
          } else {
            setSimulatedTimeLeft(`${Math.ceil(secondsRemaining)} s`);
          }

          return nextVal;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [downloading, selectedConnection, selectedGamePatch]);


  // --- GMAIL AJAX STATE SIMULATOR ---
  const [ajaxInboxCount, setAjaxInboxCount] = useState<number>(3);
  const [ajaxLogs, setAjaxLogs] = useState<string[]>(['[09:00] Connexion établie. Attente de nouveaux messages...']);
  const [classicFlashActive, setClassicFlashActive] = useState<boolean>(false);
  const [ajaxIncomingCount, setAjaxIncomingCount] = useState<number>(1);

  const simulateClassicRefresh = () => {
    setClassicFlashActive(true);
    playSfx(150, 'sawtooth', 0.15);
    setTimeout(() => {
      setClassicFlashActive(false);
      setAjaxInboxCount(prev => prev + 1);
      setAjaxLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ⏳ [Page entière rechargée !] Écran blanc de 1.8s subi par l'internaute.`,
        `[${new Date().toLocaleTimeString()}] Boîte de réception mise à jour : ${ajaxInboxCount + 1} mails.`,
        ...prev
      ].slice(0, 5));
    }, 1200);
  };

  const simulateGmailAjax = () => {
    playSfx(440, 'sine', 0.05);
    // instant update behind the scene
    setAjaxLogs(prev => [
      `[${new Date().toLocaleTimeString()}] 🚀 [Appel XMLHttpRequest asynchrone envoyé] sans recharger la page.`,
      `[${new Date().toLocaleTimeString()}] Données JSON reçues du serveur Express en arrière-plan.`,
      `[${new Date().toLocaleTimeString()}] DOM mis à jour chirurgicalement en 15ms. Aucun clignotement !`,
      ...prev
    ].slice(0, 5));
    setAjaxInboxCount(prev => prev + 1);
  };


  // --- YOUTUBE BUFFERING STATE ---
  const [youtubeResolution, setYoutubeResolution] = useState<'240p' | '480p' | '1080p' | '4k'>('240p');
  const [videoPlayState, setVideoPlayState] = useState<'idle' | 'playing' | 'buffering'>('idle');
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [bufferedProgress, setBufferedProgress] = useState<number>(0);

  const handleStartVideo = () => {
    setVideoPlayState('playing');
    setVideoProgress(0);
    setBufferedProgress(0);
    playSfx(330, 'triangle', 0.1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (videoPlayState === 'playing' || videoPlayState === 'buffering') {
      interval = setInterval(() => {
        // Buffering speed calculation depending on simulated resolution
        const resolutionWeights = { '240p': 15, '480p': 7, '1080p': 2, '4k': 0.3 };
        const loadSpeed = resolutionWeights[youtubeResolution];

        setBufferedProgress(b => {
          const nextB = Math.min(b + loadSpeed, 100);
          
          setVideoProgress(v => {
            const nextV = v + 1.2;
            if (nextV >= 100) {
              setVideoPlayState('idle');
              playSfx(523.25, 'sine', 0.25);
              return 100;
            }
            
            // If playhead catches up with the buffer, we enter the dread buffering screen!
            if (nextV > nextB) {
              if (videoPlayState !== 'buffering') {
                setVideoPlayState('buffering');
                playSfx(180, 'square', 0.15);
              }
              return v; // stop video playhead
            } else {
              if (videoPlayState === 'buffering' && nextB > nextV + 10) {
                setVideoPlayState('playing');
                playSfx(440, 'sine', 0.04);
              }
            }
            return nextV;
          });

          return nextB;
        });

      }, 150);
    }
    return () => clearInterval(interval);
  }, [videoPlayState, youtubeResolution, videoProgress, bufferedProgress]);


  // --- WIKIPEDIA EDIT SIMULATOR ---
  const [wikiArticle, setWikiArticle] = useState<string>(
    "Le Webmaster est un artisan du début des années 2000. Il s'occupait de tout : du serveur Apache, du code HTML, du graphisme sous Photoshop, et du référencement."
  );
  const [editHistory, setEditHistory] = useState<{ date: string; author: string; diff: string }[]>([
    { date: '02/07/2006', author: 'Anonyme_94', diff: 'Création de la page initiale sur l\'encyclopédie libre.' }
  ]);
  const [isEditingWiki, setIsEditingWiki] = useState<boolean>(false);
  const [wikiDraftText, setWikiDraftText] = useState<string>(wikiArticle);

  const handleSaveWikiEdit = () => {
    setWikiArticle(wikiDraftText);
    setIsEditingWiki(false);
    setEditHistory(prev => [
      {
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        author: `Webmaster_Pro_${Math.floor(Math.random() * 900 + 100)}`,
        diff: `Mise à jour : "${wikiDraftText.substring(0, 45)}..."`
      },
      ...prev
    ]);
    playSfx(550, 'sine', 0.08);
  };

  return (
    <div className="space-y-6" id="goats-section-root">
      
      {/* Decorative header */}
      <div className={`${
        theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : 
        theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 
        'bg-gradient-to-r from-amber-950/20 to-indigo-950/20 border border-slate-750/80'
      } p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left`}>
        <div className="space-y-1">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            🐐 Les GOAT du Web &amp; de l'Internet Rétro
          </span>
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            Ces Applications &amp; Mondes Virtuels qui ont Fondé le Web Moderne
          </h2>
          <p className="text-[11px] opacity-75 text-slate-350">
            Détours historiques, limitations techniques insurmontables (ADSL bas débit, quotas de data, RTC 56k) et coups de génie.
          </p>
        </div>
        <div className="flex gap-2">
          {/* Offline indication - Link to Service Worker */}
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>Accessible Hors-ligne (SW actif)</span>
          </div>
        </div>
      </div>

      {/* RETROSPECTIVE TIMELINE MODULE */}
      <div className={timelineCss.wrapper} id="interactive-retro-timeline">
        <div className={timelineCss.cardHeader}>
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="uppercase tracking-wider">⏳ Visualisation Chronologique : Les Titans du Web &amp; Leurs Époques (2001 - 2006)</span>
        </div>

        <p className="text-[11.5px] opacity-80 leading-relaxed max-w-4xl text-left pl-1">
          L'émergence des applications légendaires corrélée aux évolutions technologiques de l'époque. Sélectionnez une année ou un jalon applicatif pour comparer les vitesses de téléchargement et les caractéristiques matérielles.
        </p>

        {/* Timeline track nodes */}
        <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 border-t border-b border-slate-800/60 py-4 px-3 bg-slate-950/20 rounded-xl overflow-x-auto select-none">
          {/* Connecting line behind nodes in modern view */}
          {theme === 'modern' && (
            <div className="absolute left-6 right-6 top-[29px] h-0.5 bg-slate-800 -z-10 hidden md:block" />
          )}
          
          {milestones.map((m, index) => {
            const isActive = selectedMilestoneIndex === index;
            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedMilestoneIndex(index);
                  playSfx(180 + index * 40, 'sine', 0.1);
                }}
                className={`${isActive ? timelineCss.nodeActive : timelineCss.nodeInactive} flex-1`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase opacity-75 font-mono">Année {m.year}</span>
                  <span className="text-xs font-extrabold truncate max-w-[150px]">{m.app}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone content container */}
        <div className={timelineCss.panelBg}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left side: Technical metrics of that era */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3 text-left">
                <span className={timelineCss.subHeader}>
                  <Wifi className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Connectivité &amp; Débit Réseau ({milestones[selectedMilestoneIndex].year})</span>
                </span>
                
                <div className="space-y-1 bg-slate-950/30 p-2.5 rounded border border-slate-800/50">
                  <div className="text-[10px] font-mono text-slate-400">Technologie de connexion standard :</div>
                  <div className="text-xs font-bold text-white uppercase">{milestones[selectedMilestoneIndex].bandwidth}</div>
                </div>

                <div className="space-y-1 bg-slate-950/30 p-2.5 rounded border border-slate-800/50">
                  <div className="text-[10px] font-mono text-slate-400">Vitesse maximale pratique :</div>
                  <div className="text-xs font-bold text-amber-400 font-mono">{milestones[selectedMilestoneIndex].bandwidthSpeed}</div>
                </div>
              </div>

              {/* Bandwidth download time comparisons chart */}
              <div className="space-y-3 text-left border-t border-slate-800/40 pt-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  ⏱️ Temps requis pour charger 10 Mo (Musique ou Launcher) :
                </span>
                
                <div className="space-y-2 bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                  {/* Selected Year Speed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-300 font-semibold">{milestones[selectedMilestoneIndex].year} ({milestones[selectedMilestoneIndex].bandwidthSpeed})</span>
                      <strong className="text-rose-400 font-bold">{
                        milestones[selectedMilestoneIndex].downloadSeconds10MB >= 60 
                          ? `${Math.floor(milestones[selectedMilestoneIndex].downloadSeconds10MB / 60)} min ${milestones[selectedMilestoneIndex].downloadSeconds10MB % 60} s` 
                          : `${milestones[selectedMilestoneIndex].downloadSeconds10MB} s`
                      }</strong>
                    </div>
                    {/* Retro speed bar */}
                    <div className="h-2.5 bg-slate-950 rounded p-0.5 border border-slate-800">
                      <div className="h-full bg-rose-500 rounded-sm animate-pulse" style={{ width: '8%' }} />
                    </div>
                  </div>

                  {/* Modern Fibre Speed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-350 font-semibold">Fibre Optique Moderne (1 Gbps)</span>
                      <strong className="text-emerald-400 font-bold">0.08 s</strong>
                    </div>
                    {/* Fiber speed bar */}
                    <div className="h-2.5 bg-slate-950 rounded p-0.5 border border-slate-800">
                      <div className="h-full bg-emerald-500 rounded-sm" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
                
                <p className="text-[10px] italic text-slate-400 leading-normal">
                  💡 En {milestones[selectedMilestoneIndex].year}, il fallait s'armer de patience. Télécharger un simple patch ou album de musique exigeait d'abandonner l'usage d'Internet pendant des dizaines de minutes.
                </p>
              </div>

            </div>

            {/* Right side: Hardware specs & Historical changes & Under-the-hood optimization */}
            <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-between">
              
              <div className="space-y-3">
                <span className={timelineCss.subHeader}>
                  <Monitor className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{milestones[selectedMilestoneIndex].title}</span>
                </span>

                {/* Hardware profile */}
                <div className="flex items-start gap-2.5 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                  <Cpu className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Configuration Hardware d'époque :</span>
                    <span className="text-[11px] font-mono text-slate-300">{milestones[selectedMilestoneIndex].hardware}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">⚡ Rôle, Impact &amp; Contexte Historique :</div>
                  <p className="text-slate-200 text-xs leading-relaxed font-sans">{milestones[selectedMilestoneIndex].impact}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">💡 Anecdote de l'époque :</div>
                  <p className="text-amber-300 text-xs italic leading-relaxed bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-lg">
                    "{milestones[selectedMilestoneIndex].funFact}"
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">🛠️ Comment la contrainte technique a été surmontée :</div>
                  <p className="text-slate-350 text-xs leading-relaxed font-sans font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                    {milestones[selectedMilestoneIndex].techLevel}
                  </p>
                </div>
              </div>

              {/* Action shortcut to toggle sub-tab */}
              <div className="pt-2 border-t border-slate-800/40 flex justify-end">
                <button
                  onClick={() => {
                    setActiveSubTab(milestones[selectedMilestoneIndex].appTab);
                    playSfx(440, 'triangle', 0.15);
                    const tabsEl = document.getElementById('goats-tabs');
                    if (tabsEl) {
                      tabsEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-900/20"
                >
                  <span>🎯 Accéder au simulateur interactif de {milestones[selectedMilestoneIndex].app}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Primary split-pane navigation for the Goats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="goats-tabs">
        
        {/* LEFT PANEL: 13 GOATs sidebar menu */}
        <div className="lg:col-span-3 flex flex-col space-y-2 h-full justify-start text-left select-none">
          
          {/* Mobile responsive selector dropdown (visible only on mobile) */}
          <div className="block lg:hidden space-y-1 mb-2">
            <label className="text-[10px] font-mono text-slate-400 block">🏆 Sélectionner un GOAT du Web :</label>
            <select
              value={activeSubTab}
              onChange={(e) => {
                setActiveSubTab(e.target.value as GoatTab);
                playSfx(250, 'sine', 0.1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="wikipedia">📖 Wikipédia (2001)</option>
              <option value="wow">🎮 World of Warcraft (2004)</option>
              <option value="dofus">🎮 Dofus (2004)</option>
              <option value="gmail">✉️ Gmail (2004)</option>
              <option value="hotmail_outlook">✉️ Windows Mail / Hotmail (1996)</option>
              <option value="youtube">📺 YouTube (2005)</option>
              <option value="google">🔍 Google Search (1998)</option>
              <option value="wordpress">🌐 WordPress (2003)</option>
              <option value="archive">🏛️ Internet Archive / Wayback (1996)</option>
              <option value="reddit">💬 Reddit (2005)</option>
              <option value="fourchan">🍀 4chan (2003)</option>
              <option value="amazon_ebay">🛒 Amazon &amp; eBay (1995)</option>
              <option value="leboncoin">🤝 LeBonCoin (2006)</option>
            </select>
          </div>

          {/* Desktop vertical list layout */}
          <div className="hidden lg:flex flex-col space-y-1.5 max-h-[850px] overflow-y-auto pr-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold px-2 block mb-1">
              Liste des 13 Légendes :
            </span>

            {([
              { id: 'wikipedia', label: 'Wikipédia', year: '2001', icon: BookOpen, color: 'hover:border-emerald-500/50 hover:bg-emerald-500/5', activeColor: 'bg-emerald-600 border-emerald-500 text-white' },
              { id: 'wow', label: 'World of Warcraft', year: '2004', icon: Gamepad2, color: 'hover:border-indigo-500/50 hover:bg-indigo-500/5', activeColor: 'bg-indigo-600 border-indigo-500 text-white' },
              { id: 'dofus', label: 'Dofus', year: '2004', icon: Gamepad2, color: 'hover:border-amber-500/50 hover:bg-amber-500/5', activeColor: 'bg-amber-600 border-amber-500 text-white' },
              { id: 'gmail', label: 'Gmail', year: '2004', icon: Mail, color: 'hover:border-red-500/50 hover:bg-red-500/5', activeColor: 'bg-red-600 border-red-500 text-white' },
              { id: 'hotmail_outlook', label: 'Hotmail / Outlook', year: '1996', icon: Mail, color: 'hover:border-sky-500/50 hover:bg-sky-500/5', activeColor: 'bg-sky-600 border-sky-500 text-white' },
              { id: 'youtube', label: 'YouTube', year: '2005', icon: Youtube, color: 'hover:border-rose-500/50 hover:bg-rose-500/5', activeColor: 'bg-rose-600 border-rose-500 text-white' },
              { id: 'google', label: 'Google Search', year: '1998', icon: Search, color: 'hover:border-blue-500/50 hover:bg-blue-500/5', activeColor: 'bg-blue-600 border-blue-500 text-white' },
              { id: 'wordpress', label: 'WordPress', year: '2003', icon: Globe, color: 'hover:border-sky-400/50 hover:bg-sky-400/5', activeColor: 'bg-sky-600 border-sky-500 text-white' },
              { id: 'archive', label: 'Internet Archive', year: '1996', icon: Archive, color: 'hover:border-purple-500/50 hover:bg-purple-500/5', activeColor: 'bg-purple-600 border-purple-500 text-white' },
              { id: 'reddit', label: 'Reddit', year: '2005', icon: MessageSquare, color: 'hover:border-orange-500/50 hover:bg-orange-500/5', activeColor: 'bg-orange-600 border-orange-500 text-white' },
              { id: 'fourchan', label: '4chan', year: '2003', icon: AlertTriangle, color: 'hover:border-green-500/50 hover:bg-green-500/5', activeColor: 'bg-green-600 border-green-500 text-white' },
              { id: 'amazon_ebay', label: 'Amazon &amp; eBay', year: '1995', icon: ShoppingBag, color: 'hover:border-amber-400/50 hover:bg-amber-400/5', activeColor: 'bg-amber-600 border-amber-500 text-white' },
              { id: 'leboncoin', label: 'LeBonCoin', year: '2006', icon: Award, color: 'hover:border-orange-400/50 hover:bg-orange-400/5', activeColor: 'bg-orange-600 border-orange-500 text-white' },
            ] as const).map((tab) => {
              const isActive = activeSubTab === tab.id;
              const IconComp = tab.icon;

              // IE6 Specific buttons styling
              if (theme === 'ie6') {
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveSubTab(tab.id); playSfx(220, 'sine', 0.08); }}
                    className={`w-full text-left px-2.5 py-1.5 font-sans text-xs border border-white flex items-center justify-between cursor-pointer rounded-none ${
                      isActive 
                        ? 'bg-[#000080] text-white font-bold shadow-[inset_-1px_-1px_1px_white,inset_1px_1px_1px_#808080]' 
                        : 'bg-[#d4d0c8] text-black hover:bg-[#c0c0c0] shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80 shrink-0">({tab.year})</span>
                  </button>
                );
              }

              // Terminal Theme button styling
              if (theme === 'terminal') {
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveSubTab(tab.id); playSfx(220, 'sine', 0.08); }}
                    className={`w-full text-left px-2 py-1.5 font-mono text-xs border cursor-pointer rounded-none flex items-center justify-between ${
                      isActive
                        ? 'bg-[#ffb000]/20 border-[#ffb000] text-[#ffb000] font-bold'
                        : 'bg-black border-[#ffb000]/15 text-[#ffb000]/70 hover:border-[#ffb000]/50 hover:text-[#ffb000]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{isActive ? '>' : ' '}</span>
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </span>
                    <span className="text-[10px] opacity-80 shrink-0">[{tab.year}]</span>
                  </button>
                );
              }

              // Modern theme layout styling (Sleek card list)
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveSubTab(tab.id); playSfx(220, 'sine', 0.08); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 font-bold shadow-md shadow-indigo-950/20'
                      : `bg-slate-900/60 border-slate-800 text-slate-350 hover:border-slate-700 hover:bg-slate-800/10`
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-indigo-600/20' : 'bg-slate-950'}`}>
                      <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-xs truncate">{tab.label}</span>
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-900/30 text-indigo-300' : 'bg-slate-950 text-slate-500'}`}>
                    {tab.year}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT PANEL: GOAT Details with unified styling wrapper */}
        <div className="lg:col-span-9 flex flex-col justify-between h-full space-y-4">
          <div className={css.panel}>
        
        {/* TAB 1: WIKIPÉDIA */}
        {activeSubTab === 'wikipedia' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Wikipédia (2001)</h4>
                  <p className="text-[10px] text-slate-400">L'émancipation du savoir universel</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                👑 L'ultime GOAT du web utopique
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-emerald-400">L'ultime GOAT.</strong> C'est le dernier grand vestige du web utopiste des débuts (gratuit, collaboratif, sans publicité). Fondée en 2001 par Jimmy Wales et Larry Sanger, elle a tué l'ancien modèle des encyclopédies payantes sur CD-ROM (Microsoft Encarta) en abolissant la frontière entre auteur et lecteur.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Légende vivante incontestée • Le dernier bastion du web collaboratif pur, qui survit grâce aux dons sans succomber à la monétisation agressive.
              </p>
            </div>

            {/* Wiki interactive simulation */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2.5 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                📖 Mini-Simulateur d'encyclopédie collaborative Wiki :
              </span>

              <div className="bg-white text-black p-4 rounded-lg shadow-inner text-xs space-y-2 text-left font-serif min-h-[140px] border border-slate-700">
                <div className="flex justify-between items-center border-b border-gray-300 pb-1.5 mb-2">
                  <span className="font-sans font-bold text-gray-800 text-[12px] flex items-center gap-1.5">
                    📝 Article : Le Webmaster
                  </span>
                  {!isEditingWiki ? (
                    <button
                      onClick={() => { setIsEditingWiki(true); setWikiDraftText(wikiArticle); playSfx(300); }}
                      className="bg-gray-200 hover:bg-gray-300 border border-gray-400 px-2 py-1 rounded text-[10px] font-sans font-semibold cursor-pointer flex items-center gap-1 text-gray-700"
                    >
                      <Edit className="w-3 h-3" /> [Modifier l'article]
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={handleSaveWikiEdit}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-sans font-bold cursor-pointer"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => { setIsEditingWiki(false); playSfx(150); }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-[10px] font-sans cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>

                {!isEditingWiki ? (
                  <p className="leading-relaxed text-[11px] text-slate-900 whitespace-pre-wrap">{wikiArticle}</p>
                ) : (
                  <textarea
                    value={wikiDraftText}
                    onChange={(e) => setWikiDraftText(e.target.value)}
                    className="w-full h-24 p-1.5 bg-gray-50 border border-gray-350 rounded font-serif text-[11px] text-black focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-left">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <History className="w-3 h-3 text-indigo-400" /> Historique des révisions récentes :
                </span>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {editHistory.slice(0, 2).map((hist, index) => (
                    <div key={index} className="bg-slate-950 p-1.5 rounded text-[9px] font-mono flex justify-between items-center border border-slate-900">
                      <span className="text-slate-400 truncate">{hist.date} • Auteur : {hist.author} • {hist.diff}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WORLD OF WARCRAFT */}
        {activeSubTab === 'wow' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">World of Warcraft (2004)</h4>
                  <p className="text-[10px] text-slate-400">L'âge d'or de l'univers persistant</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-indigo-400 bg-indigo-950/30 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                ⚔️ Phénomène culturel en ligne
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-indigo-400">Petite nuance ici.</strong> WoW est un client lourd (un jeu vidéo à installer), pas une application web. Cependant, d'un point de vue "culture d'internet" et persistance d'un monde en ligne, son statut de GOAT est indiscutable. Il a poussé des millions de familles à s'équiper d'ADSL haut débit et a structuré les premières grandes communautés de tchat vocal (Teamspeak) pour coordonner des raids épiques de 40 joueurs.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Légende indiscutable • Le monument du jeu multijoueur. Il a redéfini le lien social numérique et a marqué au fer rouge l'histoire de la connectivité grand public.
              </p>
            </div>

            {/* WoW queue simulator widget */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                ⚔️ Simulateur de file d'attente de serveur (Lancement WoW Classic 2004) :
              </span>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-center space-y-3 font-mono">
                <div className="text-amber-500 font-bold uppercase text-xs tracking-wider animate-pulse">
                  Authentification réussie ! Connexion à Archimonde [FR-PvP]...
                </div>
                
                <div className="p-3 bg-black/40 rounded border border-slate-800 space-y-1 max-w-sm mx-auto">
                  <div className="text-[11px] text-slate-500 uppercase">Position dans la file d'attente :</div>
                  <div className="text-xl font-extrabold text-indigo-400">4,815</div>
                  <div className="text-[10px] text-slate-600">Temps d'attente estimé : <span className="text-rose-400">3 h 42 min</span></div>
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      playSfx(100, 'sawtooth', 0.15);
                      alert("Le modem grésille... Ligne occupée par un appel de vos parents. Vous avez été éjecté de la file d'attente ! Recommencez.");
                    }}
                    className="bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-bold px-3 py-1.5 rounded text-[10px] cursor-pointer"
                  >
                    ☎️ Coup de fil des parents (Crash de ligne)
                  </button>
                  <button
                    onClick={() => {
                      playSfx(523.25, 'sine', 0.2);
                      alert("Victoire inattendue ! Un crash du serveur a vidé la file d'attente, vous êtes enfin connecté à Forgefer !");
                    }}
                    className="bg-indigo-950/30 hover:bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 font-bold px-3 py-1.5 rounded text-[10px] cursor-pointer"
                  >
                    🛡️ Attendre patiemment (Le miracle)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOFUS */}
        {activeSubTab === 'dofus' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Dofus (2004)</h4>
                  <p className="text-[10px] text-slate-400">L'apogée de l'ère vectorielle Macromedia Flash</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-amber-400 bg-amber-950/30 border border-amber-500/20 px-2 py-0.5 rounded-md">
                ⚡ Le génie du rendu vectoriel Flash
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-amber-400">Une excellente pioche.</strong> Conçu par le studio nordiste Ankama, Dofus est une prouesse technique d'époque. En exploitant la technologie d'Adobe/Macromedia Flash, il offrait un MMORPG complet en 2D vectorielle colorée, jouable directement depuis n'importe quel navigateur de collège, même sur un modem RTC 56K grinçant.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Succès colossal francophone • Le tour de force d'un gameplay tactique au tour par tour limitant les échanges réseau, parfait pour l'époque des connexions mesurées.
              </p>
            </div>

            {/* Dofus download and SMS payment simulator widget */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2.5 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  💾 Simulateur d'Abonnement par Audiotel SMS (2004) :
                </span>
                <span className="text-[9.5px] font-mono text-amber-400 font-bold">1 Semaine = 1.80€</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded border border-slate-900 space-y-1.5 font-mono text-left">
                  <div className="text-[9px] text-slate-500 uppercase">1. Obtenir un code par SMS :</div>
                  <p className="text-[10px] text-slate-300">
                    Envoyez <strong className="text-white bg-slate-900 px-1 py-0.5 border border-slate-800 rounded text-[9.5px]">DOFUS</strong> au <strong className="text-amber-400">81083</strong> depuis le portable de vos parents. (Surtaxe de 1,50 € + coût du SMS).
                  </p>
                  <button
                    onClick={() => {
                      const code = "AD" + Math.floor(100000 + Math.random() * 900000);
                      playSfx(587.33, 'triangle', 0.15);
                      alert(`📱 SMS Envoyé ! Vous recevez le code d'activation de 1 semaine par SMS : ${code}. Notez-le bien !`);
                    }}
                    className="w-full bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/20 text-amber-300 font-bold py-1.5 rounded text-[10px] cursor-pointer"
                  >
                    📲 Envoyer le SMS Audiotel fictif
                  </button>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-900 space-y-1.5 font-mono text-left">
                  <div className="text-[9px] text-slate-500 uppercase">2. Valider l'abonnement :</div>
                  <input 
                    type="text" 
                    placeholder="Entrez votre code (ex: AD839102)"
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        playSfx(523, 'sine', 0.25);
                        alert("✨ Félicitations ! Votre compte est désormais membre pour 7 jours supplémentaires. À vous les serveurs d'Amakna !");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      playSfx(523, 'sine', 0.25);
                      alert("✨ Code validé ! Votre abonnement de 7 jours est activé ! Accès déverrouillé aux zones membres.");
                    }}
                    className="w-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/20 text-emerald-300 font-bold py-1.5 rounded text-[10px] cursor-pointer"
                  >
                    🔓 Entrer en jeu (Abonné)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GMAIL */}
        {activeSubTab === 'gmail' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Gmail (2004)</h4>
                  <p className="text-[10px] text-slate-400">La révolution asynchrone d'AJAX</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-red-400 bg-red-950/30 border border-red-500/20 px-2 py-0.5 rounded-md">
                ⚡ Naissance des web apps fluides
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-red-400">Totalement légitime.</strong> À son lancement, Gmail offrait un gigaoctet complet de stockage (contre 2 à 15 Mo pour la concurrence) mais surtout, il a popularisé l'AJAX. Avant Gmail, il fallait recharger toute la page web pour chaque action. Gmail a prouvé qu'une application web pouvait être aussi fluide qu'un logiciel de bureau.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Révolution technologique majeure • A défini les bases techniques du développement web moderne et a transformé le web statique en un écosystème d'applications dynamiques.
              </p>
            </div>

            {/* Gmail AJAX Simulation */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2.5 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                ✉️ Expérimentez la différence ergonomique de l'AJAX d'époque :
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative overflow-hidden">
                <AnimatePresence>
                  {classicFlashActive && (
                    <motion.div 
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 0, 1, 0] }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-white/95 z-50 flex items-center justify-center rounded-lg"
                    >
                      <span className="text-black font-sans font-bold text-xs flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-blue-600" /> Rechargement de toute la page d'époque (Lourd et lent)...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-center space-y-1.5 font-mono">
                  <span className="text-[9px] text-slate-500 block uppercase">Boîte mail simulée :</span>
                  <strong className="text-lg text-white block">{ajaxInboxCount} Mails reçus</strong>
                  <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/20 py-1 rounded border border-emerald-950/50">
                    Stockage : 1000 Mo (Gmail 2004)
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-center">
                  <button
                    onClick={simulateClassicRefresh}
                    className="bg-rose-950/25 hover:bg-rose-900/35 border border-rose-500/20 text-rose-300 font-bold px-3 py-2 rounded text-[10px] cursor-pointer text-center"
                  >
                    🔄 Bouton Recharger d'époque (Rafraîchissement total)
                  </button>
                  <button
                    onClick={simulateGmailAjax}
                    className="bg-emerald-950/25 hover:bg-emerald-900/35 border border-emerald-500/20 text-emerald-300 font-bold px-3 py-2 rounded text-[10px] cursor-pointer text-center"
                  >
                    🚀 Action AJAX Asynchrone (Sans rechargement)
                  </button>
                </div>
              </div>

              {/* Developer Logs */}
              <div className="border-t border-slate-800/80 pt-2 text-left">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  💻 Échanges XMLHttpRequest en arrière-plan :
                </span>
                <div className="bg-black/80 p-2 rounded font-mono text-[9px] text-indigo-400 space-y-0.5 h-20 overflow-y-auto">
                  {ajaxLogs.slice(-3).map((log, index) => (
                    <p key={index} className="truncate">{log}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HOTMAIL / OUTLOOK */}
        {activeSubTab === 'hotmail_outlook' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Windows Mail / Hotmail (1996)</h4>
                  <p className="text-[10px] text-slate-400">Le tout premier webmail grand public gratuit</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-sky-400 bg-sky-950/30 border border-sky-500/20 px-2 py-0.5 rounded-md">
                📨 Pionnier de la messagerie en ligne
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-sky-400">Rendons à César ce qui est à César.</strong> Le vrai pionnier ici est Hotmail, créé en 1996 et racheté par Microsoft pour devenir MSN Hotmail, puis fusionné avec l'écosystème Outlook. Il a popularisé la messagerie gratuite sur le web, s'affranchissant des boîtes payantes ou liées aux fournisseurs d'accès (AOL, Wanadoo).
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Monument historique fondamental • A ouvert la communication personnelle à des centaines de millions d'individus, malgré une limitation absurde de <strong className="text-rose-400">2 Méga-octets</strong> d'espace disque qui se saturait en 4 e-mails avec pièce jointe.
              </p>
            </div>

            {/* Hotmail 2MB storage simulator widget */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  💾 Simulateur de boîte de réception saturée (Quota 2 Mo d'époque) :
                </span>
                <span className="text-[9.5px] font-mono text-rose-400 font-bold">Quota Max : 2.0 Mo</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-3 font-mono text-xs">
                {/* Simulated storage progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Espace utilisé : <strong className="text-rose-400">1.95 Mo / 2.00 Mo</strong> (97%)</span>
                    <span className="text-rose-400 animate-pulse font-bold">⚠️ Boîte saturée</span>
                  </div>
                  <div className="h-3 bg-slate-900 rounded overflow-hidden p-0.5 border border-slate-800">
                    <div className="h-full bg-rose-600 w-[97%]" />
                  </div>
                </div>

                {/* Simulated list of emails */}
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  <div className="bg-rose-950/20 border border-rose-900/30 p-1.5 rounded text-[10px] flex justify-between items-center">
                    <span className="truncate">📧 [SPAM] Gagnez un voyage aux Caraïbes - 0.4 Mo</span>
                    <button 
                      onClick={() => { playSfx(150, 'sine', 0.05); alert("Mail supprimé, vous avez libéré 0.4 Mo !"); }}
                      className="text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer shrink-0"
                    >
                      [Supprimer]
                    </button>
                  </div>
                  <div className="bg-rose-950/20 border border-rose-900/30 p-1.5 rounded text-[10px] flex justify-between items-center">
                    <span className="truncate">📧 [URGENT] Photo de vacances.jpg - 1.5 Mo</span>
                    <button 
                      onClick={() => { playSfx(150, 'sine', 0.05); alert("La photo de tante Huguette a été supprimée ! Espace libéré."); }}
                      className="text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer shrink-0"
                    >
                      [Supprimer]
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      playSfx(100, 'sawtooth', 0.2);
                      alert("⚠️ Impossible de recevoir de nouveaux e-mails. Votre correspondant recevra une erreur : 'Mailbox is full'.");
                    }}
                    className="flex-1 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-bold py-1.5 rounded text-[10px] cursor-pointer text-center"
                  >
                    📥 Tenter de recevoir un mail
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: YOUTUBE */}
        {activeSubTab === 'youtube' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm uppercase">
                  <Youtube className="w-5 h-5 text-indigo-400" />
                  <span>2005 : YouTube, Flash Player et le boom de la vidéo</span>
                </div>

                <p className="text-xs leading-relaxed text-slate-300">
                  Avant 2005, lire des vidéos sur Internet était une expérience chaotique. Il fallait installer des lecteurs lourds et propriétaires comme <strong className="text-rose-400">RealPlayer, QuickTime, ou Windows Media Player</strong>. Les formats de codecs étaient incompatibles, de sorte qu'une vidéo n'était lisible que par une minorité d'internautes.
                </p>

                <div className="space-y-2.5">
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-white block text-xs">⚡ L'unification magique par le format FLV</strong>
                    <p className="text-[11px] text-slate-350">
                      Lorsque trois anciens employés de PayPal fondent YouTube en 2005, ils ont un coup de génie : encoder toutes les vidéos au format <strong className="text-amber-400">FLV (Flash Video)</strong>. Puisque le lecteur Flash d'Adobe était déjà préinstallé sur 98% des ordinateurs mondiaux, n'importe qui pouvait regarder une vidéo instantanément en un clic sans télécharger le moindre logiciel tiers.
                    </p>
                  </div>

                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-white block text-xs">🍿 Les limitations de bande passante</strong>
                    <p className="text-[11px] text-slate-350">
                      En 2005, les connexions ADSL étaient trop lentes pour le streaming haute définition. La toute première vidéo de YouTube ("Me at the zoo") fut diffusée en résolution <strong className="text-rose-300">240p</strong> avec un débit ridicule de quelques dizaines de Ko/s. La barre rouge de mise en cache était l'élément le plus scruté par les yeux des internautes !
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Video Buffer Simulator */}
              <div className="lg:col-span-5 bg-slate-900/30 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">📺 Simulateur de qualité et de mise en mémoire tampon :</span>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400">Qualité de flux d'époque vs moderne :</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['240p', '480p', '1080p', '4k'] as const).map((res) => (
                        <button
                          key={res}
                          onClick={() => { setYoutubeResolution(res); playSfx(250 + (res === '4k' ? 200 : 50)); }}
                          className={`py-1.5 px-1 font-mono text-[10px] text-center rounded border transition cursor-pointer ${
                            youtubeResolution === res 
                              ? 'bg-rose-600 text-white border-rose-500 font-bold' 
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated video stage */}
                  <div className="relative h-44 bg-black rounded-lg border border-slate-800 overflow-hidden flex flex-col items-center justify-center">
                    {videoPlayState === 'idle' ? (
                      <button 
                        onClick={handleStartVideo}
                        className="bg-rose-600 hover:bg-rose-500 hover:scale-105 transition rounded-full p-4 cursor-pointer text-white shadow-lg shadow-rose-950/40"
                      >
                        <Play className="w-6 h-6 fill-white text-white" />
                      </button>
                    ) : videoPlayState === 'buffering' ? (
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-8 h-8 text-rose-500 animate-spin" />
                        <span className="text-[9px] font-mono text-rose-400 animate-pulse uppercase">Mise en mémoire tampon ({Math.round(bufferedProgress)}%)...</span>
                      </div>
                    ) : (
                      /* Simulated streaming playback pixelized depending on resolution */
                      <div className="text-center space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 block">Lecture en cours...</span>
                        <div className={`mx-auto w-10 h-10 bg-indigo-500 ${
                          youtubeResolution === '240p' ? 'blur-md scale-150' :
                          youtubeResolution === '480p' ? 'blur-sm' :
                          'blur-0'
                        }`} />
                        <span className="text-[9px] text-slate-500 block">Pixelisation réaliste pour la {youtubeResolution}</span>
                      </div>
                    )}

                    {/* Progress sliders */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900">
                      {/* Buffered bar */}
                      <div className="absolute top-0 bottom-0 left-0 bg-slate-700 transition-all duration-150" style={{ width: `${bufferedProgress}%` }} />
                      {/* Playhead bar */}
                      <div className="absolute top-0 bottom-0 left-0 bg-rose-600 transition-all duration-150" style={{ width: `${videoProgress}%` }} />
                    </div>
                  </div>

                  {/* Description of resolution loading */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-900 text-[10px] font-mono space-y-1 text-left text-slate-400">
                    <p>
                      ⚙️ <strong className="text-slate-200">En {youtubeResolution} :</strong> {
                        youtubeResolution === '240p' ? 'Chargement instantané même sur de la basse vitesse ADSL 128K. Mais le rendu est extrêmement flou.' :
                        youtubeResolution === '480p' ? "Nécessite au moins de l'ADSL 512K. Buffer stable." :
                        youtubeResolution === '1080p' ? "Nécessite de l'ADSL haut débit (8 Mbps). Risque de mise en tampon fréquente en 2005 !" :
                        "Impossible en 2005 ! Aurait fait planter le navigateur ou nécessité 18 heures de chargement."
                      }
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: GOOGLE SEARCH */}
        {activeSubTab === 'google' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Google Search (1998)</h4>
                  <p className="text-[10px] text-slate-400">Le boss final de l'infrastructure du web</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-blue-400 bg-blue-950/30 border border-blue-500/20 px-2 py-0.5 rounded-md">
                🔍 L'algorithme PageRank originel
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-blue-400">Le boss final du web.</strong> Google Search a entièrement redéfini l'indexation d'Internet en remplaçant les annuaires de sites édités manuellement (comme Yahoo!) par l'algorithme PageRank de Larry Page et Sergey Brin, calculant de manière mathématique la pertinence d'un site en fonction du nombre et de la qualité de ses liens entrants.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Pilier fondamental de l'infrastructure • A transformé le chaos informatif du web naissant en une bibliothèque mondiale instantanément accessible.
              </p>
            </div>

            {/* Google 1998 mini search simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2.5 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                🔍 Simulateur de recherche de l'an 1998 (PageRank rétro) :
              </span>

              <div className="bg-white text-black p-4 rounded-lg space-y-3 font-sans border border-slate-700">
                <div className="text-center font-extrabold text-xl tracking-tighter">
                  <span className="text-blue-600">G</span>
                  <span className="text-red-600">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-600">g</span>
                  <span className="text-green-600">l</span>
                  <span className="text-red-600">e</span>
                  <span className="text-[10px] font-normal text-blue-600 align-super font-mono">!</span>
                </div>

                <div className="max-w-sm mx-auto flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Tapez un mot-clé (ex: caramail, msn, lycos)..."
                    className="w-full border border-gray-300 px-3 py-1 text-xs text-black focus:outline-none focus:border-blue-500 rounded shadow-sm font-sans"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        playSfx(440, 'sine', 0.1);
                        alert("🔍 Recherche 1998 : PageRank en cours d'exécution... Résultats indexés : Caramail (N°1 avec 94% de pertinence), MSN Messenger (N°2), Multimania (N°3).");
                      }
                    }}
                  />
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => { playSfx(440, 'sine', 0.1); alert("🔍 Indexation PageRank : 123 millions de pages scannées en 0.04s. Tout fonctionne !"); }}
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 rounded text-[10px] text-gray-700 font-semibold cursor-pointer"
                    >
                      Recherche Google
                    </button>
                    <button
                      onClick={() => { playSfx(523, 'sine', 0.15); alert("🍀 J'ai de la chance ! Redirection automatique vers Caramail.fr ! Bonjour les salons de tchat !"); }}
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 rounded text-[10px] text-gray-700 font-semibold cursor-pointer"
                    >
                      J'ai de la chance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: WORDPRESS */}
        {activeSubTab === 'wordpress' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">WordPress (2003)</h4>
                  <p className="text-[10px] text-slate-400">Le créateur absolu de la démocratisation du web</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-sky-400 bg-sky-950/30 border border-sky-500/20 px-2 py-0.5 rounded-md">
                🌐 CMS propulsant 43% des sites mondiaux
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-sky-400">Le GOAT de l'édition de sites.</strong> Né en 2003 comme un simple fork d'un moteur de blog en PHP (b2/cafelog) par Matt Mullenweg et Mike Little, il a permis à n'importe quel individu n'ayant aucune notion de code de créer son site web gratuit de manière autonome.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Démocratisation totale du web • A permis au grand public d'écrire sur la toile sans dépendre d'agences ou d'outils payants très lourds.
              </p>
            </div>

            {/* WordPress vintage template block compiler widget */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                🌐 Mini-Éditeur WordPress Kubrick Vintage :
              </span>

              <div className="bg-sky-950/20 border border-sky-500/10 p-3 rounded-lg space-y-2 font-mono text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Titre de mon Blog d'époque..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => {
                      playSfx(587.33, 'triangle', 0.1);
                      alert("📝 Article publié en ligne ! Thème Kubrick rafraîchi. Base de données MySQL mise à jour.");
                    }}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1 rounded text-[10px] cursor-pointer"
                  >
                    Publier (PHP/MySQL)
                  </button>
                </div>
                <textarea
                  placeholder="Écrivez le premier article de votre blog Skyblog-killer..."
                  className="w-full h-14 bg-slate-900 border border-slate-800 rounded p-2 text-[10.5px] text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: INTERNET ARCHIVE */}
        {activeSubTab === 'archive' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Internet Archive (1996)</h4>
                  <p className="text-[10px] text-slate-400">La mémoire numérique de l'humanité</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-purple-400 bg-purple-950/30 border border-purple-500/20 px-2 py-0.5 rounded-md">
                🏛️ La Wayback Machine universelle
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-purple-400">La mémoire du web.</strong> Sans eux, des pans entiers de la culture numérique des années 90 et 2000 (les anciens tchats Caramail, les Skyblogs, Geocities, les premiers sites d'information) auraient été effacés à jamais lors du changement de serveurs ou de faillites de sociétés d'hébergement.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Utilité publique majeure • Une véritable bibliothèque d'Alexandrie numérique qui sauvegarde nos mémoires, nos codes sources et nos bêtises d'enfance.
              </p>
            </div>

            {/* Wayback machine simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                🏛️ Simulateur Wayback Machine (Voyage temporel) :
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-2.5 font-mono text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Entrez un site historique (ex: google.fr, caramail.com)..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      playSfx(100, 'sawtooth', 0.15);
                      alert("🏛️ Wayback Machine : Chargement de l'archive de l'an 1999... Récupération des fichiers images GIF animés et du code HTML sans CSS... Affichage réussi !");
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded text-[10px] cursor-pointer"
                  >
                    🚀 Remonter le temps !
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: REDDIT */}
        {activeSubTab === 'reddit' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Reddit (2005)</h4>
                  <p className="text-[10px] text-slate-400">Le survivant ultime de l'ère des forums</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-orange-400 bg-orange-950/30 border border-orange-500/20 px-2 py-0.5 rounded-md">
                💬 Centralisation universelle des discussions de niche
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-orange-400">Le survivant ultime.</strong> Alors que les forums traditionnels en phpBB ont presque tous disparu du devant de la scène, Reddit a su centraliser ce besoin universel d'échange de niche au sein d'un même outil unifié (les subreddits) structuré autour du vote de la communauté.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Pilier communautaire • A préservé l'esprit de discussion thématique sur le web face à l'hégémonie des algorithmes de recommandation passive des réseaux sociaux fermés.
              </p>
            </div>

            {/* Upvote simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                💬 Simulateur d'Upvote de Subreddit (r/france) :
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex justify-between items-center font-mono text-xs">
                <div className="space-y-0.5 text-left">
                  <div className="text-[9px] text-slate-500">Posté sur r/france :</div>
                  <strong className="text-slate-200">"Pourquoi le pain au chocolat s'appelle chocolatine ?"</strong>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0 bg-black/40 px-2.5 py-1 rounded border border-slate-800">
                  <button 
                    onClick={() => { playSfx(600, 'sine', 0.08); alert("🔺 Upvoted ! Vous soutenez le débat national."); }}
                    className="text-orange-500 hover:text-orange-400 text-sm font-bold cursor-pointer"
                  >
                    ▲
                  </button>
                  <span className="text-[11px] font-bold text-slate-300">1,482</span>
                  <button 
                    onClick={() => { playSfx(200, 'sine', 0.08); alert("🔻 Downvoted ! Querelle linguistique évitée."); }}
                    className="text-blue-500 hover:text-blue-400 text-sm font-bold cursor-pointer"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: 4CHAN */}
        {activeSubTab === 'fourchan' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">4chan (2003)</h4>
                  <p className="text-[10px] text-slate-400">La fabrique de la mémétique d'Internet</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-green-400 bg-green-950/30 border border-green-500/20 px-2 py-0.5 rounded-md">
                🍀 Forum anonyme d'imageboard ultra-influent
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-green-400">Le berceau des mèmes.</strong> Fondé en 2003 par Christopher Poole ("moot") à l'âge de 15 ans, cet imageboard anonyme est à l'origine d'une proportion ahurissante des mèmes universels du web (Rickroll, rage comics, lolcats) mais aussi des cultures hacktivistes (Anonymous).
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Force créatrice et chaotique majeure • L'anonymat absolu et l'absence de persistance des posts ont poussé la créativité mémétique à son paroxysme, bien que le site abrite des dérives toxiques notoires.
              </p>
            </div>

            {/* Meme simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                🍀 Imageboard /b/ Rétro Simulator (Générateur de mèmes) :
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex justify-between items-center font-mono text-xs">
                <div className="text-left space-y-1">
                  <div className="text-[9px] text-green-500">Anonymous • ID: zX9aL0p1</div>
                  <p className="text-slate-300 text-[10.5px] italic">"&gt; Be me in 2004<br/>&gt; Hear screeching sound in computer room<br/>&gt; Mom is calling her sister, download of WoW patch crashed at 99.8%<br/>&gt; MFW"</p>
                </div>
                <button
                  onClick={() => {
                    playSfx(1000, 'sine', 0.1);
                    alert("🍀 Mème généré ! Tout le monde poste des lolcats en réponse.");
                  }}
                  className="bg-green-950/40 hover:bg-green-900/50 border border-green-500/20 text-green-300 font-bold px-3 py-2 rounded text-[10px] cursor-pointer text-center shrink-0"
                >
                  Post Meme
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: AMAZON & EBAY */}
        {activeSubTab === 'amazon_ebay' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">Amazon &amp; eBay (1995)</h4>
                  <p className="text-[10px] text-slate-400">Les inventeurs du commerce électronique de masse</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-amber-400 bg-amber-950/30 border border-amber-500/20 px-2 py-0.5 rounded-md">
                🛒 Les rois de la logistique et de la confiance
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-amber-400">Les pionniers du e-commerce.</strong> Fondés tous deux en 1995, Amazon (par Jeff Bezos comme librairie en ligne) et eBay (par Pierre Omidyar comme site d'enchères de particulier à particulier) ont inventé les mécanismes fondamentaux du commerce numérique : paniers virtuels, avis de confiance et transactions sécurisées.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Révolution commerciale colossale • Ont prouvé qu'un internaute lambda pouvait faire confiance à un inconnu à l'autre bout de la planète pour lui envoyer un colis physique.
              </p>
            </div>

            {/* eBay live auction 10s countdown simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2.5 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                🔨 Enchère en direct rétro (Compte à rebours de 10s) :
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex justify-between items-center font-mono text-xs">
                <div className="text-left space-y-0.5">
                  <div className="text-[9px] text-slate-500">Objet : Modem RTC 56K d'occasion</div>
                  <strong className="text-amber-400">Prix actuel : 12.50 €</strong>
                  <div className="text-[10px] text-rose-400 font-bold animate-pulse">Temps restant : 8 secondes !</div>
                </div>
                <button
                  onClick={() => {
                    playSfx(880, 'sine', 0.12);
                    alert("🔨 Enchère placée à 13.50 € ! Vous êtes actuellement le meilleur enchérisseur !");
                  }}
                  className="bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/20 text-amber-300 font-bold px-3 py-2 rounded text-[10px] cursor-pointer"
                >
                  Surenchérir (+1.00 €)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: LEBONCOIN */}
        {activeSubTab === 'leboncoin' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">LeBonCoin (2006)</h4>
                  <p className="text-[10px] text-slate-400">Le Minitel réincarné en web local et convivial</p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono text-orange-400 bg-orange-950/30 border border-orange-500/20 px-2 py-0.5 rounded-md">
                🤝 La proximité territoriale absolue
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-orange-400">Le génie de l'ultra-simplicité.</strong> Lancé en 2006 d'après un modèle suédois (Blocket), LeBonCoin a aboli le concept de paiement en ligne obligatoire et de livraison postale d'eBay au profit d'une interface dépouillée de petites annonces locales gratuites de main à main.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-350 italic bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                <strong>Le verdict du Jury :</strong> Réussite sociétale majeure • A converti des millions de retraités français à l'économie circulaire d'Internet en imitant l'ergonomie familière du journal papier local.
              </p>
            </div>

            {/* Minitel search simulator */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-2 mt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                📟 Simulateur de recherche locale (Minitel v2 Rétro) :
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex justify-between items-center font-mono text-xs">
                <div className="text-left space-y-0.5">
                  <div className="text-[9px] text-slate-500">Catégorie : Voitures d'occasion</div>
                  <strong className="text-orange-400">Annonce : Peugeot 205 Junior (1992) • 450 €</strong>
                  <div className="text-[10px] text-slate-400">Lieu : Rennes (35000) • Remise en main propre</div>
                </div>
                <button
                  onClick={() => {
                    playSfx(523, 'sine', 0.1);
                    alert("📞 Téléphone de l'annonceur révélé : 06.12.XX.XX.XX. N'hésitez pas à l'appeler pour fixer un rendez-vous sur le parking du supermarché !");
                  }}
                  className="bg-orange-950/40 hover:bg-orange-900/50 border border-orange-500/20 text-orange-300 font-bold px-3 py-2 rounded text-[10px] cursor-pointer"
                >
                  Contacter l'annonceur
                </button>
              </div>
            </div>
          </div>
        )}

          </div> {/* fin de css.panel */}
        </div> {/* fin de lg:col-span-9 */}
      </div> {/* fin de goats-tabs split-pane grid */}

      {/* SECTION: Le Panthéon des GOATs & Le Verdict du Jury */}
      <div className="space-y-6 pt-6 border-t border-slate-800/50 text-left" id="goats-pantheon-section">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 animate-pulse" />
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
              theme === 'ie6' ? 'text-[#000080] font-sans' : theme === 'terminal' ? 'text-[#ffb000] font-mono' : 'text-slate-100 font-sans'
            }`}>
              🏆 Le Panthéon des GOATs du Web (Le Verdict)
            </h3>
          </div>
          <p className="text-[11px] opacity-75 text-slate-350">
            Revue historique de notre jury et arbitrages finaux sur les monuments, applications et jeux mythiques qui ont fondé la culture internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Wikipédia (2001) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    Wikipédia (2001)
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  2001
                </span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-300">
                <strong className="text-amber-400">L'ultime GOAT.</strong> C'est le dernier grand vestige du web utopiste des débuts (gratuit, collaboratif, sans publicité).
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Légende vivante incontestée
            </div>
          </div>

          {/* Card 2: Gmail (2004) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    Gmail (2004)
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  2004
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white">Totalement légitime.</strong> À son lancement, Gmail offrait 1 Go de stockage (contre 2 à 15 Mo pour la concurrence) mais surtout, il a popularisé l'AJAX (JavaScript asynchrone). Avant Gmail, il fallait recharger toute la page web pour lire ou supprimer un mail. Gmail a prouvé qu'une application web pouvait être aussi fluide qu'un logiciel bureau.
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Révolution technique asynchrone
            </div>
          </div>

          {/* Card 3: Hotmail / Outlook (1996) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    Outlook / Hotmail
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-sky-950/30 border border-sky-500/20 text-sky-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  1996
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white">Très juste.</strong> Il faut d'ailleurs rendre à César ce qui est à César : le vrai pionnier ici est Hotmail, l'un des tout premiers webmails grand public, racheté par Microsoft en 1997 et qui a fini par fusionner avec l'écosystème Outlook.
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Le pionnier du webmail grand public
            </div>
          </div>

          {/* Card 4: YouTube (2005) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-500 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    YouTube (2005)
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-rose-950/30 border border-rose-500/20 text-rose-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  2005
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white">Incontestable.</strong> Ils ont résolu le cauchemar qu'était l'hébergement et la diffusion de vidéos sur le web à l'époque, en standardisant le format (d'abord via Flash, puis HTML5).
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Standardisation et libération de la vidéo
            </div>
          </div>

          {/* Card 5: Dofus (2004) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    Dofus (2004)
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-amber-950/30 border border-amber-500/20 text-amber-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  2004
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white">Une excellente pioche</strong> (surtout pour une audience francophone). En lien avec notre discussion précédente sur le web, Dofus est le summum de ce qu'il était possible de faire avec la technologie Flash dans un navigateur, avant de devoir migrer vers des technologies plus modernes.
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Apogée de l'animation vectorielle Flash
            </div>
          </div>

          {/* Card 6: World of Warcraft (2004) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-3`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <strong className={`${
                    theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                  } text-xs font-extrabold`}>
                    World of Warcraft
                  </strong>
                </span>
                <span className={`${
                  theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                  theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                  'bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-md'
                } text-[9.5px] font-mono px-1.5 py-0.5`}>
                  2004
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white">Petite nuance ici.</strong> WoW est un client lourd (un jeu vidéo à installer), pas une application web. Cependant, d'un point de vue "culture d'internet" et persistance d'un monde en ligne, son statut de GOAT est indiscutable.
              </p>
            </div>
            <div className="pt-2 text-[9.5px] text-slate-400 italic border-t border-slate-800/30">
              Verdict : Phénomène culturel mondial du jeu connecté
            </div>
          </div>

        </div>
      </div>

      {/* SECTION : Les légendes et survivants du Web */}
      <div className="space-y-6 pt-6 border-t border-slate-800/50 text-left" id="goats-monuments-section">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 animate-pulse" />
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
              theme === 'ie6' ? 'text-[#000080] font-sans' : theme === 'terminal' ? 'text-[#ffb000] font-mono' : 'text-slate-100 font-sans'
            }`}>
              🏛️ Les Grands Monuments du Web &amp; de l'Infrastructure
            </h3>
          </div>
          <p className="text-[11px] opacity-75 text-slate-350">
            Ces géants ont forgé l'architecture technique, le paysage social et le commerce mondial en traversant toutes les époques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Les Fondations et l'Infrastructure */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-4`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
                <Server className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                <h4 className={`text-xs font-bold uppercase tracking-wide ${
                  theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-indigo-400'
                }`}>
                  Les Fondations et l'Infrastructure
                </h4>
              </div>

              <div className="space-y-5">
                {/* Google Search */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        Google Search (1998)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      1998
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    Il est tellement omniprésent qu'on l'oublie, mais le moteur de recherche de Google a redéfini le web en remplaçant les annuaires (comme Yahoo) par l'algorithme PageRank. C'est le boss final du web.
                  </p>
                </div>

                {/* WordPress */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        WordPress (2003)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      2003
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    Le GOAT absolu de la création de sites. Né comme un simple moteur de blog en PHP, il a traversé toutes les époques pour devenir un CMS massif. Aujourd'hui, il propulse plus de 40% des sites web mondiaux.
                  </p>
                </div>

                {/* Internet Archive */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Archive className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        Internet Archive / Wayback Machine
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      1996
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    La mémoire du web. C'est la seule application qui sauvegarde l'histoire numérique de l'humanité. Sans eux, des pans entiers des années 90/2000 auraient disparu à jamais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Le Web Social et Communautaire */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-4`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
                <Users className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <h4 className={`text-xs font-bold uppercase tracking-wide ${
                  theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-emerald-400'
                }`}>
                  Le Web Social et Communautaire
                </h4>
              </div>

              <div className="space-y-5">
                {/* Reddit */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        Reddit (2005)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      2005
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    Le survivant ultime de l'ère des forums. Alors que les forums traditionnels en PHPBB ont presque tous disparu, Reddit a su centraliser ce besoin de discussion de niche tout en gardant une interface (jusqu'à récemment) très old-school.
                  </p>
                </div>

                {/* 4chan */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        4chan (2003)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      2003
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    Plus controversé, mais son impact sur la culture web est colossal. C'est là que sont nés les "memes" tels qu'on les connaît, le groupe Anonymous, et une grande partie de la culture internet moderne. Son design n'a quasiment pas bougé en 20 ans.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Le E-commerce (Les survivants de la bulle) */}
          <div className={`${css.card} flex flex-col justify-between h-full space-y-4`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/60">
                <ShoppingBag className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <h4 className={`text-xs font-bold uppercase tracking-wide ${
                  theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-amber-400'
                }`}>
                  Le E-commerce
                </h4>
              </div>

              <div className="space-y-5">
                {/* Amazon & eBay */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        Amazon &amp; eBay (1995)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-amber-955/30 border border-amber-500/20 text-amber-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      1995
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    Ces deux-là ont défini le commerce en ligne. Ils ont survécu au crash de la bulle internet des années 2000 là où des milliers d'autres ont fait faillite, et ont continuellement adapté leurs plateformes aux standards modernes.
                  </p>
                </div>

                {/* LeBonCoin */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <strong className={`${
                        theme === 'ie6' ? 'text-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'
                      } text-xs font-extrabold`}>
                        LeBonCoin (2006)
                      </strong>
                    </span>
                    <span className={`${
                      theme === 'ie6' ? 'bg-[#dee3e7] border border-[#808080] text-black' : 
                      theme === 'terminal' ? 'bg-black border border-[#ffb000]/40 text-[#ffb000]' : 
                      'bg-amber-955/30 border border-amber-500/20 text-amber-400 rounded-md'
                    } text-[9.5px] font-mono px-1.5 py-0.5`}>
                      2006
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-350">
                    c'est un incontournable. Il a tué le marché des petites annonces papier et a survécu en gardant (pendant très longtemps) un design brutaliste et minimaliste qui allait à l'essentiel.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
