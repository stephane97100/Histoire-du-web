/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Wifi, 
  Zap, 
  Smartphone, 
  Smile, 
  Volume2, 
  Users, 
  Clock, 
  AlertCircle,
  HelpCircle,
  Hash,
  Share2,
  Lock,
  BatteryCharging
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface ChatHistoryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface ChatApplication {
  id: string;
  name: string;
  period: string;
  icon: string;
  slogan: string;
  historyText: string;
  mainFeatures: string[];
  deathReason: string;
  nostalgiaAnecdote: string;
  category: 'pionniers' | 'social' | 'mondiales';
}

export default function ChatHistoryView({ theme }: ChatHistoryViewProps) {
  const [activeAppId, setActiveAppId] = useState<string>('msn');
  const [currentStatus, setCurrentStatus] = useState<string>('online');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'contact'; text: string; time: string; type?: 'default' | 'wizz' }>>([
    { sender: 'contact', text: 'Salut ! Ça te dit de s\'échanger des fichiers musicaux sur mon espace perso ? 🎵', time: '18:02' },
    { sender: 'user', text: 'Carrément ! Tu as vu que j\'ai mis à jour mon pseudo avec les paroles de ma chanson préférée ? xD', time: '18:03' },
    { sender: 'contact', text: 'Trop cool ! Regarde ce truc : p', time: '18:04' },
  ]);
  const [inputText, setInputText] = useState('');
  
  // Wizz vibration state for interactive MSN simulator
  const [isWizzing, setIsWizzing] = useState(false);

  const chatApps: ChatApplication[] = [
    {
      id: 'caramail',
      name: 'CaraMail',
      period: '1997 - 2009',
      icon: '✉️',
      category: 'pionniers',
      slogan: 'Le repaire et portail communautaire pionnier des ados des années 2000.',
      historyText: 'Lancé en 1997 par Orianne Garcia, Alexandre Roos et Christophe Schaming, CaraMail est devenu le portail web communautaire et le service de courriers électroniques gratuits le plus populaire de l\'Internet francophone. C\'était l\'époque des salons de discussion thématiques animés en Java, devenant le repaire des jeunes dans les années 2000 avant de fermer ses portes en 2009 et d\'être racheté et relancé par GMX.',
      mainFeatures: [
        'Salons de discussion thématiques ("Célibataires", "Musique", "Cinéma", "Régions") extrêmement denses.',
        'La fameuse interface de courrier gratuit avec émoticônes géantes intégrées.',
        'La force d\'une communauté complète de plus de 10 millions d\'utilisateurs.'
      ],
      deathReason: 'Racheté par Spray puis par Lycos pour 150 millions d\'euros, CaraMail a souffert d\'une pollution publicitaire d\'envergure (pop-ups massives) et de pannes critiques d\'infrastructures serveurs. Supplanté par l\'avancée fulgurante de MSN Messenger, il a fermé en 2009 avant d\'être racheté par GMX.',
      nostalgiaAnecdote: 'L\'exaltation d\'attendre le chargement complet de l\'applet Java pour taper /info sur un contact et converser toute la nuit.'
    },
    {
      id: 'tchatche',
      name: 'Tchatche.com',
      period: '1999 - Présent',
      icon: '💬',
      category: 'pionniers',
      slogan: 'L\'un des espaces de bavardage anonyme les plus fréquentés de l\'Internet français.',
      historyText: 'Lancé en 1999, Tchatche.com a été un site incontournable permettant de discuter et de faire des rencontres en ligne. Il fonctionnait sur la base d\'une section de salons thématiques classés par tranches d\'âge ou par régions géographiques, complété de messages privés en direct.',
      mainFeatures: [
        'Bavardage instantané segmenté par tranches d\'âge précises et par régions géographiques.',
        'Un système de messages privés (MP) directs très populaire à l\'époque pour échanger en tête-à-tête.',
        'Entrée sans inscription requise, favorisant l\'anonymat total.'
      ],
      deathReason: 'Bien que le tchat survive sous une forme applicative, l\'érosion complète des salons anonymes web au profit des réseaux sociaux nominatifs et des applications de rencontre à géolocalisation directe (Tinder, Bumble) a mis fin à son hégémonie historique.',
      nostalgiaAnecdote: 'Essayer de deviner si la personne derrière le pseudo habitait vraiment le même code postal.'
    },
    {
      id: 'voila',
      name: 'Voila.fr',
      period: '1998 - 2016',
      icon: '🎨',
      category: 'pionniers',
      slogan: 'L\'espace de tchat gratuit ultra-fréquenté conçu par le célèbre moteur de recherche français.',
      historyText: 'Propulsé par le moteur de recherche vedette de France Télécom / Orange dans les années 2050, le portail Voila.fr proposait son propre espace de tchat gratuit. C\'était l\'un des espaces les plus fréquentés du pays avant l\'essor planétaire des messageries instantanées de bureau.',
      mainFeatures: [
        'Des centaines de salons thématiques très fréquentés et classés.',
        'Une connexion simplifiée à la volée qui ne nécessitait qu\'un pseudo éphémère sans mot de passe.',
        'L\'envoi de flashs sonores et d\'alertes dynamiques qui amusaient la galerie.'
      ],
      deathReason: 'Submergé par la concurrence de Google et de Facebook, Orange a fermé définitivement le portail Voilà et ses services associés en 2016 après l\'érosion complète des salons de discussion anonymes sur le Web fixe.',
      nostalgiaAnecdote: 'Rejoindre le salon régional pour trouver d\'autres ados du même département pendant les vacances.'
    },
    {
      id: 'msn',
      name: 'MSN Messenger (Windows Live)',
      period: '1999 - 2013',
      icon: '👥',
      category: 'social',
      slogan: 'L\'icône absolue des années collège/lycée avec ses deux petits bonshommes vert et bleu.',
      historyText: 'Incontournable entre 2000 et 2010, MSN Messenger a remplacé les salons de tchat publics par des conversations privées. C\'était l\'époque des adresses e-mail Hotmail obligatoires, des pseudos colorés truffés d\'émojis complexes et de caractères spéciaux, et de la possibilité de configurer "Ce que j\'écoute" en temps réel avec Winamp ou Windows Media Player.',
      mainFeatures: [
        'Les célèbres Émoticônes animées géantes et bruits associés (les Clins d\'œil).',
        'Le bouton "Wizz" qui faisait trembler l\'écran et retentir un bruit strident chez son correspondant.',
        'La gestion de statuts cultes : Absent, Occupé, De retour dans 5 min, et l\'affichage de sa musique Winamp.'
      ],
      deathReason: 'Racheté par Microsoft pour remplacer Skype, MSN a été délaissé par son jeune public parti vers Facebook Chat à partir de 2008-2009. L\'impossibilité pour MSN de fonctionner proprement sur l\'écosystème mobile naissant (iOS, Android) sans vider complètement la batterie en raison de sa connexion persistante obligatoire a scellé sa disparition définitive en 2013.',
      nostalgiaAnecdote: 'Se connecter et se déconnecter à répétition toutes les 3 minutes pour qu\'une notification pop-up s\'affiche en bas à droite de l\'écran de la personne qu\'on convoitait secrètement.'
    },
    {
      id: 'skyblog',
      name: 'Skyblog',
      period: '2002 - 2023',
      icon: '📓',
      category: 'social',
      slogan: 'La plateforme de cybercarnets mythique dont les commentaires servaient de tchat en temps réel.',
      historyText: 'Lancé en 2002 par la station de radio Skyrock, il s\'agissait initialement d\'une plateforme de blogs. Les sections de commentaires animées et les messages privés ont servi de véritable salon de discussion pour toute une génération d\'adolescents avant sa fermeture définitive en août 2023.',
      mainFeatures: [
        'La liberté totale de création de pages personnelles avec habillages fluos, polices et photos locales.',
        'Une section commentaires devenue le tchat principal par excellence d\'une génération ("Lâche tes coms !").',
        'Un classement des blogs "étoilés" les plus populaires pour mesurer l\'influence de son pseudo.'
      ],
      deathReason: 'Fermé définitivement le 21 août 2023 par le groupe Skyrock pour des contraintes juridiques de stockage mondial de données du début des années 2000 et la mise en conformité vis-à-vis des législations RGPD.',
      nostalgiaAnecdote: 'Copier-coller désespérément son adresse de blog sur MSN : "Nouveau Skyblog en ligne, viens lâcher tes coms, tout est rendu !" avec des dizaines d\'étoiles dans le pseudo.'
    },
    {
      id: 'skype',
      name: 'Skype',
      period: '2003 - Présent (En déclin)',
      icon: '🔵',
      category: 'social',
      slogan: 'Le pionnier révolutionnaire de la téléphonie VoIP gratuite de PC à PC.',
      historyText: 'Créé en 2003 par les fondateurs de Kazaa, Skype a changé la donne mondiale en exploitant une architecture Peer-to-Peer ultra-optimisée pour faire transiter la voix et la vidéo à travers les connexions haut-débit sans aucune latence, court-circuitant ainsi les opérateurs de télécoms traditionnels surtaxés.',
      mainFeatures: [
        'Appels audio et vidéo internationaux entièrement gratuits de PC à PC.',
        'Achat de crédits SkypeOut pour téléphoner à bas coût vers de vrais téléphones fixes ou portables.',
        'La fameuse tonalité de connexion joyeuse qui résonnait dans les bureaux à la fin des années 2000.'
      ],
      deathReason: 'Racheté par Microsoft en 2011, Skype s\'est alourdi au fil de mises à jour de plus en plus lourdes et commerciales. Sa nature décentralisée P2P s\'est avérée inadaptée aux smartphones, provoquant des retards d\'envoi d\'images majeurs et vidant les batteries. Il a été supplanté dans le public par WhatsApp/FaceTime, et en entreprise par Teams, Slack et Zoom.',
      nostalgiaAnecdote: 'Les appels interminables dans des micros sur pied bon marché pour jouer en réseau ou bavarder toute la nuit avec des amis lointains.'
    },
    {
      id: 'mirc',
      name: 'mIRC (IRC)',
      period: '1995 - Présent',
      icon: '⚙️',
      category: 'mondiales',
      slogan: 'L\'outil culte des initiés et développeurs pour communiquer sur les réseaux IRC.',
      historyText: 'Ce logiciel client IRC, très populaire dès la fin des années 1990, permettait de se connecter à des milliers de salons textuels inter-connectés. Les utilisateurs devaient taper des commandes spécifiques (comme /join #salon) dans une console textuelle pour discuter.',
      mainFeatures: [
        'Maîtrise complète de la connexion en console avec les expressions cultes (/join, /part, /msg).',
        'Transfert direct de données de disque dur à disque dur à l\'aide du protocole DCC.',
        'Moteur de scripts personnalisés pour programmer ses propres robots de modération et jeux.'
      ],
      deathReason: 'Toujours opérationnel et maintenu, le protocole IRC s\'est marginalisé en raison de sa barrière technique d\'apprentissage, le grand public ayant massivement migré vers la simplicité graphique de Discord ou Slack.',
      nostalgiaAnecdote: 'Saper le salon #jeuxvideo ou #quiz de commandes de script de couleurs multicolores pour imposer son style.'
    },
    {
      id: 'icq',
      name: 'ICQ',
      period: '1996 - 2024',
      icon: '🌸',
      category: 'mondiales',
      slogan: 'L\'ancêtre absolu qui utilisait un numéro d\'identification unique (UIN).',
      historyText: 'Lancé en 1996 par la jeune start-up israélienne Mirabilis, cet ancêtre des messageries instantanées actuelles utilisait un numéro d\'identification numérique unique (UIN) de connexion pour contacter ses amis ou des inconnus en ligne.',
      mainFeatures: [
        'Le signal d\'alerte sonore de message "Uh-Oh !" immanquablement gravé dans toutes les mémoires.',
        'Le logo marguerite clignotant passant du rouge (absent) au vert (en ligne / disponible).',
        'Le code UIN séquentiel servant de sésame absolu de l\'authentification d\'époque, à retenir par cœur.'
      ],
      deathReason: 'Surclassé par la puissance de MSN Messenger, le passage mobile raté et les SMS. Après divers rachats (AOL puis VKontakte), ICQ a officiellement fermé définitivement ses portes le 26 juin 2024.',
      nostalgiaAnecdote: 'Se féliciter d\'avoir un vieux numéro d\'UIN court à 7 ou 8 chiffres, signe d\'ancienneté respectable sur la toile.'
    },
    {
      id: 'yahoo',
      name: 'Yahoo! Chat',
      period: '1998 - 2014',
      icon: '💜',
      category: 'mondiales',
      slogan: 'Les célèbres salons de discussion mondiaux ou régionaux intégrés à Yahoo.',
      historyText: 'Intégré au grand portail web mondial de Yahoo!, il permettait de rejoindre des rooms de discussion thématiques, mondiales ou régionales en quelques clics via un simple navigateur ou Yahoo! Messenger. Il a fermé en 2014 en raison de la baisse de fréquentation.',
      mainFeatures: [
        'Division très structurée en salons géographiques et catégories d\'intérêt.',
        'Intégration d\'avatars interactifs personnalisés et d\'alertes de chat colorées.',
        'Liaison étroite avec les services associés (Yahoo! Mail, Yahoo! Groups).'
      ],
      deathReason: 'Fermé définitivement en 2014 par Yahoo! suite à un effondrement d\'audience lié aux réseaux sociaux personnels et à l\'invasion ingérable de faux robots publicitaires.',
      nostalgiaAnecdote: 'Avoir des amis de tchat à l\'autre bout de la planète et chatter sous un avatar pixelisé drôle.'
    }
  ];

  const activeApp = chatApps.find(a => a.id === activeAppId) || chatApps[3];

  // Send message on virtual MSN simulator
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: inputText, time: timeNow, type: 'default' }
    ]);
    setInputText('');

    // Trigger mock automatic response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'contact', text: 'Haha pas mal ! Écris "wizz" pour s\'amuser 😂', time: timeNow }
      ]);
    }, 1500);
  };

  const handleWizzTrigger = () => {
    setIsWizzing(true);
    const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { sender: 'contact', text: '⚡ A ENVOYÉ UN WIZZ !', time: timeNow, type: 'wizz' }
    ]);
    
    // Play sound from browser if supported
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Low buzz
      oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.3); // High frequency slide
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // Ignored if sound blocked by browser autoplay constraints
    }

    setTimeout(() => {
      setIsWizzing(false);
    }, 850);
  };

  const cssTheme = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-4 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-3 text-black text-xs space-y-3 rounded-none',
          btnActive: 'bg-[#000080] text-white font-bold p-3 border border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none flex items-center justify-between',
          simBox: 'bg-white border-2 border-inset border-[#808080] rounded-none p-3 text-xs',
          topBar: 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white p-1 font-bold text-xs flex justify-between'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/40 p-4 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/20 p-3 text-[#ffb000] text-xs space-y-4 font-mono rounded-none',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          simBox: 'bg-black border border-[#ffb000]/30 p-3 text-[#ffb000] font-mono rounded-none text-xs',
          topBar: 'bg-[#0a0a0a] border-b border-[#ffb000]/40 text-[#ffb000] py-1 px-2 font-bold text-xs flex justify-between'
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-5 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600/10 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
          simBox: 'bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-3 shadow-inner',
          topBar: 'bg-slate-900 border border-slate-800 rounded-t-xl py-2 px-3 flex justify-between items-center'
        };
    }
  };

  const css = cssTheme();

  return (
    <div className={`space-y-6 ${isWizzing ? 'animate-bounce' : ''}`} id="chat-history-root">
      
      {/* Page upper notification */}
      <div className={`${theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : theme === 'terminal' ? 'bg-[#ffb000]/10 border border-[#ffb000]/30 text-[#ffb000] font-mono' : 'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750'} p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500 shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">💾 T'chat with me — L'ère d'Or de l'Instant Messaging</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Des tchats anonymes en Java aux sessions de tchat MSN Messenger interminables après le lycée.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar Apps List Selector (4 wide) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            📟 Sélectionner un système légendaire :
          </span>
          
          <div className="space-y-4">
            {/* Groupe 1: Les tchats pionniers */}
            <div className="space-y-1.5 text-left">
              <span className="text-[9.5px] font-bold font-mono tracking-wider text-indigo-400 uppercase flex items-center gap-1 border-b border-slate-800/60 pb-1">
                💬 Les salons pionniers francophones
              </span>
              <div className="flex flex-col gap-1.5 pl-1">
                {chatApps.filter(app => app.category === 'pionniers').map((app) => {
                  const isActive = app.id === activeAppId;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveAppId(app.id)}
                      className={isActive ? css.btnActive : css.btnInactive}
                      id={`btn-chat-${app.id}`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-base shrink-0 select-none">{app.icon}</span>
                        <div className="text-left truncate">
                          <b className="block text-[11px] font-bold tracking-tight">{app.name}</b>
                          <span className="text-[9px] opacity-75 font-mono block">
                            {app.period}
                          </span>
                        </div>
                      </div>
                      <Clock className={`w-3 h-3 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Groupe 2: Les réseaux sociaux et salons de messagerie */}
            <div className="space-y-1.5 text-left">
              <span className="text-[9.5px] font-bold font-mono tracking-wider text-indigo-400 uppercase flex items-center gap-1 border-b border-slate-800/60 pb-1">
                🎶 Réseaux sociaux & messagerie
              </span>
              <div className="flex flex-col gap-1.5 pl-1">
                {chatApps.filter(app => app.category === 'social').map((app) => {
                  const isActive = app.id === activeAppId;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveAppId(app.id)}
                      className={isActive ? css.btnActive : css.btnInactive}
                      id={`btn-chat-${app.id}`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-base shrink-0 select-none">{app.icon}</span>
                        <div className="text-left truncate">
                          <b className="block text-[11px] font-bold tracking-tight">{app.name}</b>
                          <span className="text-[9px] opacity-75 font-mono block">
                            {app.period}
                          </span>
                        </div>
                      </div>
                      <Clock className={`w-3 h-3 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Groupe 3: Les clients et messageries mondiales */}
            <div className="space-y-1.5 text-left">
              <span className="text-[9.5px] font-bold font-mono tracking-wider text-indigo-400 uppercase flex items-center gap-1 border-b border-slate-800/60 pb-1">
                💻 Clients & messageries mondiales
              </span>
              <div className="flex flex-col gap-1.5 pl-1">
                {chatApps.filter(app => app.category === 'mondiales').map((app) => {
                  const isActive = app.id === activeAppId;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveAppId(app.id)}
                      className={isActive ? css.btnActive : css.btnInactive}
                      id={`btn-chat-${app.id}`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-base shrink-0 select-none">{app.icon}</span>
                        <div className="text-left truncate">
                          <b className="block text-[11px] font-bold tracking-tight">{app.name}</b>
                          <span className="text-[9px] opacity-75 font-mono block">
                            {app.period}
                          </span>
                        </div>
                      </div>
                      <Clock className={`w-3 h-3 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-3 bg-[#0a0a0d] border border-slate-850 text-[10px] text-slate-400 leading-normal text-left font-sans">
            <span className="font-extrabold uppercase text-indigo-400 flex items-center gap-1 text-[9px] mb-1">
              📢 Fait insolite
            </span>
            À son apogée en 2007, MSN Messenger connectait plus de 330 millions de personnes uniques de manière active par mois à travers la planète, devenant le plus grand nœud synchronisé du web d'époque.
          </div>
        </div>

        {/* Exhibition panel details & simulator (8 wide) */}
        <div className="lg:col-span-8 space-y-6">
          <div className={css.card}>

            {/* Application profile line */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/40 pb-3 text-left gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeApp.icon}</span>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-100">{activeApp.name}</h3>
                  <span className="text-[10px] font-mono opacity-70">{activeApp.period}</span>
                </div>
              </div>
              <span className="text-[10.5px] font-mono bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 px-2.5 py-0.5 rounded font-bold uppercase">
                {activeApp.period}
              </span>
            </div>

            {/* Description Sheet */}
            <div className={css.innerCard}>
              <div className="text-left italic border-l-2 border-indigo-500/50 pl-3 text-xs text-slate-300">
                "{activeApp.slogan}"
              </div>

              {/* History */}
              <div className="space-y-1 text-left text-xs pt-1">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                  📚 Enseignement Historique :
                </span>
                <p className="leading-relaxed text-slate-350">
                  {activeApp.historyText}
                </p>
              </div>

              {/* Notable functions */}
              <div className="p-3.5 bg-slate-950/35 border border-slate-850 rounded-xl text-left text-xs">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-2">💡 Fonctionnalités cultes d'époque :</span>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                  {activeApp.mainFeatures.map((feat, idx) => (
                    <li key={idx} className="leading-snug">{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Drop reason */}
              <div className="p-3.5 bg-rose-955/5 border border-rose-500/10 rounded-xl text-left text-xs">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block mb-1">🥀 Pourquoi ce dinosaure s'est éteint :</span>
                <p className="text-[#fca5a5] leading-relaxed">
                  {activeApp.deathReason}
                </p>
              </div>

              {/* Anecdote */}
              <div className="p-3.5 bg-amber-955/5 border border-amber-500/10 rounded-xl text-left text-xs">
                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase block mb-1">💭 Anecdote Partagée :</span>
                <p className="text-slate-350 leading-relaxed italic">
                  "{activeApp.nostalgiaAnecdote}"
                </p>
              </div>
            </div>

            {/* MSN Simulator Sandbox */}
            {activeApp.id === 'msn' && (
              <div className="space-y-3 text-left">
                <div className="flex gap-2 items-center text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-bold text-slate-300">Interactif : MSN Messenger (Live Simulator)</span>
                </div>

                {/* Simulated frame */}
                <div className={css.simBox}>
                  {/* Inner top-bar */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="text-xl">🤵</span>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border border-slate-950 rounded-full bg-emerald-500"></span>
                      </div>
                      <div>
                        <div className="font-bold text-[11px] text-slate-200">Tom (Indispensable) {"<tom.anderson@hotmail.fr>"}</div>
                        <div className="text-[9px] text-slate-450 italic">"N'écoute rien de Spécial - Hors Ligne"</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select 
                        value={currentStatus} 
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 px-1 py-0.5 rounded cursor-pointer"
                      >
                        <option value="online">🟢 En Ligne</option>
                        <option value="busy">🔴 Jamais là ! (Occupé)</option>
                        <option value="lunch">🟠 Mange une pizza (Absent)</option>
                        <option value="offline">⚪ Se cacher (Invisible)</option>
                      </select>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="h-44 overflow-y-auto bg-slate-950 border border-slate-850 p-2.5 rounded-lg space-y-2.5 space-y-reverse max-h-44 text-xs font-sans">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`${msg.sender === 'user' ? 'text-indigo-400' : 'text-emerald-400'} text-[10px] font-bold`}>
                            {msg.sender === 'user' ? 'Moi' : 'Tom'}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">{msg.time}</span>
                        </div>
                        {msg.type === 'wizz' ? (
                          <div className="py-1 px-2.5 bg-rose-500/10 text-rose-450 border border-rose-500/20 font-bold uppercase text-[9.5px] rounded animate-pulse mt-0.5 tracking-tight">
                            {msg.text}
                          </div>
                        ) : (
                          <div className={`mt-0.5 py-1 px-2.5 rounded-lg max-w-sm leading-normal ${msg.sender === 'user' ? 'bg-indigo-600 font-medium text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                            {msg.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sending form controls */}
                  <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Tapez votre message MSN d'époque..."
                      className="flex-1 bg-slate-900 border border-slate-800 text-xs text-white px-3 py-1.5 rounded-lg focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs transition font-semibold cursor-pointer shrink-0"
                    >
                      Envoyer
                    </button>

                    <button
                      type="button"
                      onClick={handleWizzTrigger}
                      className="px-3 py-1.5 bg-rose-950/20 border border-rose-500/30 text-rose-400 hover:bg-rose-955/35 rounded-lg text-xs transition cursor-pointer font-bold uppercase shrink-0 flex items-center gap-1"
                      title="Envoyer un Wizz !"
                    >
                      ⚡ WIZZ
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Share action */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Souvenirs messageries`}
                text={`Explorons comment ${activeApp.name} a façonné la culture d'instant messaging des années 2000 sur le Musée du Web !`}
              />
            </div>

          </div>

          {/* Explanation block: why modern apps crushed them */}
          <div className="bg-[#111114] border border-slate-800 p-5 rounded-2xl text-left space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Pourquoi des géants comme WhatsApp ou Signal ont complètement effacé MSN & compagnie ?
            </h4>

            <p className="text-xs text-slate-350 leading-relaxed font-sans">
              La disparition de MSN, Skype ou ICQ face à des applications comme **WhatsApp**, **Signal**, ou **Telegram** n'est pas qu'un hasard cosmétique. Elle répond à 3 ruptures architecturales brutales :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-1">
              {/* Point 1: Phone numbers as ID */}
              <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-850 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-extrabold text-indigo-400 flex items-center gap-1">
                  🔑 1. L'Annuaire Universel
                </span>
                <p className="text-slate-300 leading-normal">
                  Pour ajouter un ami sur MSN, il fallait recopier une adresse e-mail complexe. Sur Skype, un identifiant obscur. Les applications mobiles modernes identifient l'utilisateur par son **simple numéro de téléphone**, analysant instantanément le carnet d'adresses natif pour connecter l'utilisateur en une seconde sans recherches manuelles fastidieuses.
                </p>
              </div>

              {/* Point 2: Battery friendly Push notifications */}
              <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-850 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-extrabold text-indigo-400 flex items-center gap-1">
                  🔋 2. Rupture "Push" & Mobile
                </span>
                <p className="text-slate-300 leading-normal">
                  Les anciens messagers de bureau nécessitaient une **liaison TCP solide et permanente** active, d'où le statut "Hors-Ligne". Si l'application fermait, on était inaccessible. Sur smartphone, ce protocole vide la batterie en 2 heures. WhatsApp et iOS/Android ont démocratisé les **Notifications Push centralisées** : le client s'éteint mais reste réceptif aux messages légers poussés par l'OS sans épuiser votre batterie.
                </p>
              </div>

              {/* Point 3: Secure End-to-End Encryption */}
              <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-850 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-extrabold text-indigo-400 flex items-center gap-1">
                  🔒 3. Le Chiffrement de bout en bout
                </span>
                <p className="text-slate-300 leading-normal">
                  MSN et les tchats de portails envoyaient des blocs de messages **en texte clair** transitant de manière transparente par les serveurs des constructeurs de portails. De nos jours, l'opinion publique exige la confidentialité absolue. Signal et WhatsApp chiffrent de bout en bout (protocole Noise/Curve), garantissant qu'aucun intermédiaire, ni même l'éditeur, ne sache lire le secret partagé.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
