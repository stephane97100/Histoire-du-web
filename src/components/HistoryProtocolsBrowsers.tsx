/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  RefreshCw, 
  Cpu, 
  Server, 
  Laptop, 
  ChevronRight, 
  HelpCircle, 
  Network, 
  Calendar, 
  Compass, 
  Milestone, 
  Smartphone, 
  Terminal, 
  Landmark, 
  Sparkles 
} from 'lucide-react';
import BrowserMarketShareTimeline from './BrowserMarketShareTimeline';

interface HistoryProtocolsBrowsersProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface EpochData {
  id: string;
  yearRange: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  badgeStyle: string; // colors for modern badge
  text: string;
  points: { title: string; desc: string; tech: string }[];
  legacyFact: string;
}

const EPOCHS: EpochData[] = [
  {
    id: 'pre-web',
    yearRange: "Années 70 - 1989",
    title: "1. L'Infrastructure : Avant le Web",
    subtitle: "La plomberie sans visage, d'ARPANET au protocole Gopher",
    icon: "🌐",
    badge: "Les Fondations",
    badgeStyle: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    text: "Avant que le premier navigateur web n'interprète une balise HTML, Internet était un territoire textuel austère conçu pour faire dialoguer des machines académiques et gouvernementales via des terminaux monochromes.",
    points: [
      {
        title: "TCP/IP et l'adressage DNS (L'acier invisible)",
        desc: "La standardisation du protocole de transmission en paquets TCP/IP s'impose comme clé de voûte. En 1983, l'invention du DNS (Domain Name System, RFC 882) remplace enfin l'antique fichier d'adresses centralisé HOSTS.TXT mis à jour manuellement par les ingénieurs du SRI.",
        tech: "RFC 791 / RFC 882"
      },
      {
        title: "USENET et UUCP (Les forums d'époque)",
        desc: "L'ancêtre direct de nos réseaux sociaux et forums. Créé en 1979, USENET permettait de diffuser des lettres de discussion thématiques (newsgroup) dans le monde entier à l'aide de modems acoustiques connectés par commutations téléphoniques intermittentes.",
        tech: "NNTP / UUCP"
      },
      {
        title: "Le Protocole Gopher (L'alternative oubliée)",
        desc: "Conçu à l'Université du Minnesota juste avant le Web, Gopher structurait l'information mondiale en arborescences strictes de fichiers et répertoires textuels. Rigide, logique et sans mise en page, il a fini par s'incliner face à la souplesse dynamique et créative des liens du Web.",
        tech: "RFC 1436 / Gopher"
      },
      {
        title: "Le réseau Minitel (La singularité française)",
        desc: "En marge d'Internet, la France déploie dès 1980 sa propre révolution télématique Teletel. Le célèbre terminal vidéotexte offrait des milliers de services transactionnels payants interactifs (banques, messageries, annuaires publics) bien avant le décollage grand public du protocole IP.",
        tech: "X.25 / Vidéotexte (V21)"
      }
    ],
    legacyFact: "Les chercheurs devaient configurer à la main les matrices de routage et mémoriser de fastidieuses commandes shell d'émulateurs VT100 pour transférer un simple fichier de données scientifiques de 50 Ko via FTP."
  },
  {
    id: 'old-html',
    yearRange: "1990 - 1994",
    title: "2. L'Étincelle : L'Invention du Web",
    subtitle: "Tim Berners-Lee au CERN, info.cern.ch et le navigateur Mosaic",
    icon: "⚡",
    badge: "La Naissance",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    text: "Le physicien britannique Tim Berners-Lee invente l'ordonnanceur d'information ultime au CERN en Suisse, fédérant l'adressage universel et l'affichage de documents hyperliés.",
    points: [
      {
        title: "Les Trois Piliers Originels de la Toile",
        desc: "Création conjointe du protocole HTTP pour le transfert, du langage structurel HTML v1 pour l'écriture sémantique décentralisée, et des URI (Universal Resource Identifier) pour donner une coordonnée permanente et stable à chaque ressource planétaire.",
        tech: "HTTP 0.9 / HTML 1.0"
      },
      {
        title: "info.cern.ch sur NeXT Cube",
        desc: "Le premier serveur Web de l'histoire tourne sur la station NeXT de Tim Berners-Lee. Il détaillait textuellement aux autres académiques la marche à suivre pour héberger leur propre serveur web et créer des pages pour peupler le réseau naissant.",
        tech: "NeXTSTEP OS"
      },
      {
        title: "Le navigateur NCSA Mosaic (1993)",
        desc: "Écrit par Marc Andreessen et Eric Bina, Mosaic change tout : c'est le premier fureteur de l'histoire à afficher les images directement au milieu du texte ('inline') grâce à la balise <img> inédite, plutôt que d'ouvrir l'image dans une fenêtre logicielle tierce séparée.",
        tech: "Mosaic 1.0 / NCSA"
      },
      {
        title: "Les Années Perl et l'architecture CGI",
        desc: "Le premier pont dynamique : la spécification Common Gateway Interface (CGI). Pour enregistrer un formulaire ou afficher un compteur, le serveur appela un script codé en langage Perl qui 'imprimait' maladroitement les balises HTML en sortie textuelle brute.",
        tech: "CGI 1.1 / Perl 4"
      }
    ],
    legacyFact: "Tim Berners-Lee avait collé une étiquette physique d'avertissement rouge sur le boîtier en magnésium de son ordinateur NeXT disant : 'This machine is a server. DO NOT POWER IT DOWN!' pour éviter qu'un agent d'entretien ne débranche accidentellement l'intégralité d'Internet la nuit."
  },
  {
    id: 'browser-war',
    yearRange: "1995 - 1998",
    title: "3. L'Explosion : La folle guerre des fureteurs",
    subtitle: "Netscape vs Internet Explorer, et la genèse éclair de JavaScript",
    icon: "💥",
    badge: "Chaos & Hype",
    badgeStyle: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    text: "À l'heure de l'essor phénoménal de la bulle Internet, d'immenses géants s'affrontent à coups d'extensions propriétaires incompatibles pour s'accaparer les parts de marché.",
    points: [
      {
        title: "Netscape Navigator domine le globe",
        desc: "L'entreprise fondée par Marc Andreessen prend d'assaut l'industrie. Son navigateur Navigator 1.0 et 2.0 devient le logiciel incontournable pour surfer sur les vagues graphiques du Web de l'époque, introduisant l'usage généralisé des cookies de session.",
        tech: "Navigator 2.0 / SSL v2"
      },
      {
        title: "JavaScript : conçu en 10 jours seulement",
        desc: "En mai 1995, Brendan Eich est recruté par Netscape pour doter le fureteur d'un petit langage d'automatisation dynamique. Il crée en catastrophe le langage 'LiveScript' en 10 jours chrono, hâtivement rebaptisé 'JavaScript' pour capitaliser sur l'immense battage publicitaire de Java.",
        tech: "LiveScript / Mocha"
      },
      {
        title: "Microsoft et Internet Explorer (La riposte de Redmond)",
        desc: "Réalisant le danger mortel du Web pour son monopole, Bill Gates réoriente en hâte le géant Redmond vers Internet. IE1 et IE2 sont intégrés de force de manière transparente dans Windows 95, initiant les premières hostilités de distorsion de compatibilité.",
        tech: "IE 1.0 / Windows 95"
      },
      {
        title: "L'avènement magique de PHP et des bases MySQL",
        desc: "En 1995, Rasmus Lerdorf assemble un lot de scripts en langage C baptisés 'Personal Home Page Tools' pour surveiller les consultations de son CV en ligne. Cet outil open-source se structure avec PHP 3 et le serveur MySQL pour bâtir le cœur du web dynamique libre.",
        tech: "PHP/FI 2.0"
      },
      {
        title: "L'impact colossal de Perl & Java (Au-delà du simple CGI)",
        desc: "Alors que CGI s'essouffle à cause de son architecture énergivore (un processus système lancé par requête), Perl et Java réinventent le serveur. Perl s'impose comme le 'couteau suisse' de l'Internet d'époque : il orchestre l'administration système, le parsing de volumes massifs de logs textuels, et le 'glue-code' de bases de données grâce à DBI/CPAN pour des colosses naissants comme Yahoo!, IMDb, ou Craigslist. En parallèle, Java (créé en 1995 par Sun Microsystems) s'affranchit des navigateurs (où les applets ralentissent tout) pour s'inviter en majesté sur le serveur avec les Servlets (1996) et JSP (JavaServer Pages) : il introduit le concept de cycle de vie en mémoire partagée haute performance, jetant les fondations des backends de banques, de télécoms et des architectures d'entreprise JEE hautement sécurisées.",
        tech: "Servlet 1.0 / JSP / CPAN"
      },
      {
        title: "GeoCities et l'âge d'or du Web amateur",
        desc: "Avant la centralisation des plateformes, GeoCities offre de l'espace disque gratuit classé par 'villes virtuelles' thématiques (SiliconValley, Hollywood). C'est le paradis des animations GIF clignotantes de flammes, des fonds d'écran interstellaires sombres et de la balise défilante <marquee>.",
        tech: "GeoCities / Tripod"
      }
    ],
    legacyFact: "Pour célébrer le lancement réussi de leur version d'Internet Explorer, une équipe d'ingénieurs farceurs de Microsoft est allée déposer en pleine nuit une immense sculpture métallique de 3 mètres de haut de la lettre 'e' directement sur la pelouse d'entrée du siège social de Netscape."
  },
  {
    id: 'css-table-age',
    yearRange: "1999 - 2002",
    title: "4. L'Esthétique : La domination des tableaux et arrivée du CSS",
    subtitle: "Le calvaire des intégrateurs, Photoshop Slices et de Dreamweaver",
    icon: "🎨",
    badge: "Le Style & La Trame",
    badgeStyle: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    text: "Les designers s'approprient enfin le médium et exigent de rompre avec l'alignement vertical rigide pour déployer des directions artistiques sophistiquées.",
    points: [
      {
        title: "L'art délicat de la mise en page par table HTML",
        desc: "Faute de flexbox ou de CSS Grid fonctionnel, les concepteurs créaient des architectures graphiques complexes en triturant la balise sémantique <table>. Ils y imbriquaient des dizaines de structures invisibles aux dimensions rigides, inaptes au responsive.",
        tech: "nested <table>"
      },
      {
        title: "Une naissance chaotique pour CSS1 & CSS2",
        desc: "Le W3C tente de séparer le fond et la forme avec la feuille de style CSS. Cependant, Internet Explorer 5 et Netscape 4 ont des interprétations si divergentes ou boguées (comme l'atroce 'Box Model Bug' d'IE) que le moindre pixel d'espacement cassait toute la page.",
        tech: "CSS 1.0 / Hacks IE5"
      },
      {
        title: "Dreamweaver 3, FrontPage et les outils WYSIWYG",
        desc: "Les éditeurs de code visuel accélèrent le développement mais génèrent un code source obèse et opaque. La fonction 'Slices' (Découpage d'images) de Photoshop découpait une affiche en 80 petites tranches de GIF imbriqués dans un tableau tentaculaire.",
        tech: "Dreamweaver v3"
      },
      {
        title: "Le Dynamic HTML (DHTML) et les scripts magiques",
        desc: "Mettre du mouvement en manipulant l'arbre de documents (DOM) très archaïque avec des petits scripts JS prêts à l'emploi. Les webmasters s'échangeaient sur des forums des flocons de neige tombants virtuels ou des traînées d'étoiles suivant l'œil du pointeur.",
        tech: "DHTML / DOM-0"
      }
    ],
    legacyFact: "Pour forcer l'alignement d'un élément ou créer une marge transparente d'une largeur exacte, la technique professionnelle suprême consistait à insérer un GIF transparent de 1x1 pixel nommé 'spacer.gif' et de l'étirer visuellement via les attributs HTML width et height."
  },
  {
    id: 'flash-ajax',
    yearRange: "2003 - 2005",
    title: "5. L'Interactif : Flash et les prémices d'AJAX",
    subtitle: "L'apogée d'ActionScript, le modèle LAMP et la révolution asynchrone",
    icon: "🔌",
    badge: "L'Interactivité",
    badgeStyle: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    text: "Le Web sort de sa rigidité historique de rechargement continu de page grâce à des plugins gourmands et des requêtes réseau d'arrière-plan.",
    points: [
      {
        title: "Macromedia Flash & ActionScript (Le Web immersif)",
        desc: "La domination absolue des intros vectorielles animées d'agence de pub, des bruits sonores de clics futuristes, de l'art cinétique, et des premiers grands jeux de navigateur (comme Yeti Sports ou Fancy Pants) programmés au pixel près.",
        tech: "Flash MX / ActionScript 2.0"
      },
      {
        title: "L'apparition furtive de XmlHttpRequest et AJAX",
        desc: "Pour faire fonctionner la version Web d'Outlook en 1999, Microsoft intègre un composant obscur XMLHTTPRequest. En 2004, Google secoue le monde en exploitant cette API asynchrone pour Gmail puis Google Maps, prouvant qu'on peut rafraîchir l'écran sans transition visible.",
        tech: "XHR / AJAX"
      },
      {
        title: "L'indétrônable pile LAMP et les CMS libres",
        desc: "La combinaison Linux, Apache, MySQL et PHP (LAMP) propulse l'immense majorité des projets. C'est l'époque de la fondation des premiers gestionnaires de contenus industriels comme WordPress (2003) et Drupal, abolissant la mise à jour manuelle laborieuse.",
        tech: "LAMP / WordPress 1.0"
      }
    ],
    legacyFact: "Pour qu'un site conçu à 100% en Flash puisse être référencé, les développeurs devaient dupliquer le site entier dans une version textuelle cachée sous peine d'être totalement invisibles des robots d'indexation naissants de Google."
  },
  {
    id: 'jquery-html5',
    yearRange: "2006 - 2011",
    title: "6. La Standardisation : L'ère jQuery et HTML5",
    subtitle: "Le sauvetage par les sélecteurs CSS, la mort de Flash et l'essor de Chrome",
    icon: "🛡️",
    badge: "Harmonisation",
    badgeStyle: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    text: "Le besoin critique de stabilité face à l'éparpillement des supports de moteurs pousse la communauté à forger ses propres abstractions et de nouveaux standards natifs.",
    points: [
      {
        title: "jQuery par John Resig (2006)",
        desc: "Une libération inoubliable pour les développeurs. La syntaxe magique $(selector).action() harmonise et dissimule toutes les disparités de manipulation de document (DOM) sous le tapis pour que le code fonctionne à l'identique d'IE6 à Firefox.",
        tech: "jQuery 1.0"
      },
      {
        title: "La rédaction d'HTML5 & CSS3 au service du sens",
        desc: "Le W3C abandonne l'impasse rigoriste d'XHTML2 pour formaliser le pragmatisme opérationnel. HTML5 amène des balises sémantiques robustes (<audio>, <video>, <header>) tandis que CSS3 fournit enfin les dégradés et les coins arrondis natifs.",
        tech: "HTML5 spec / CSS3"
      },
      {
        title: "Steve Jobs et l'arrêt de mort de Flash",
        desc: "En 2010, le patron d'Apple publie sa célèbre lettre ouverte 'Thoughts on Flash', épinglant les failles de sécurité, l'architecture fermée et la consommation de batterie désastreuse d'Adobe Flash sur mobile, scellant le déclin inévitable du plugin.",
        tech: "Thoughts on Flash"
      },
      {
        title: "L'apparition surprise du moteur V8 de Google Chrome",
        desc: "Google bouscule le marché en 2008 avec le navigateur Chrome. Son moteur d'exécution V8 compile directement le JavaScript à la volée (Just-In-Time) sous forme de code machine natif ultra-rapide, déclenchant une véritable course aux armements de performance.",
        tech: "V8 Engine / Chrome"
      }
    ],
    legacyFact: "Avant que CSS3 border-radius ne soit standardisé et supporté par les navigateurs modernes, dessiner une simple boîte à coins arrondis forçait le découpage de 4 petites images de coins de 4 pixels de large assemblées au prix de contorsions folles."
  },
  {
    id: 'spa-era',
    yearRange: "2012 - 2018",
    title: "7. Le Raz-de-marée : Frameworks SPA et Node.js",
    subtitle: "L'unification JavaScript de bout en bout, le responsive par défaut",
    icon: "🚀",
    badge: "Modernisation",
    badgeStyle: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    text: "Le développement web s'industrialise lourdement et extrait les logiques d'interfaces utilisateurs vers d'imposants applicatifs Single Page Application (SPA).",
    points: [
      {
        title: "Ryan Dahl libère JS du navigateur avec Node.js",
        desc: "L'écriture du runtime Node.js propulse JavaScript du côté serveur, réutilisant le véloce moteur V8. L'écurie npm se structure et explose, convertissant la simple écriture de code web en d'immenses chantiers de compilation et d'assemblage système.",
        tech: "Node.js / npm Ecosystem"
      },
      {
        title: "La bataille féroce des architectures Client-Side",
        desc: "Apparition d'AngularJS par Google (2010) popularisant l'injection et le double databinding, suivi du triomphe de React de Facebook (2013) avec son ingénieux concept de DOM Virtuel, puis du challenger souple Vue.js par Evan You (2014).",
        tech: "React / AngularJS / Vue"
      },
      {
        title: "La grille Bootstrap de Twitter et les Media Queries",
        desc: "L'incontournable approche Mobile-First portée par des systèmes de grilles unitaires. On abandonne enfin définitivement les largeurs figées en pixels au profit de layouts entièrement responsives de 12 colonnes fluides s'ajustant au pouce de l'internaute.",
        tech: "CSS Grid / Media Queries"
      },
      {
        title: "Les compilateurs, Builders et le langage Sass",
        desc: "Les styles et les scripts cessent d'être écrits sous format brut. On écrit du Sass modulaire et structuré, assemblé et minifié à grands coups de webpack, gulp ou grunt pour compresser le poids de téléchargement.",
        tech: "Sass Compilation / Webpack"
      }
    ],
    legacyFact: "Cette industrialisation a inauguré la célèbre blague du dossier d'installation 'node_modules', comparé par les développeurs à l'objet le plus lourd de la galaxie, capable d'aspirer la bande passante et le stockage d'un disque entier pour compiler un simple bouton."
  },
  {
    id: 'modern-meta',
    yearRange: "2019 - Présent",
    title: "8. L'Âge Sacré : Meta-Frameworks et compilation ultra-vitesse",
    subtitle: "Le retour équilibré au rendu serveur (SSR), TypeScript et l'intelligence IA",
    icon: "💎",
    badge: "L'Âge Sacré",
    badgeStyle: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    text: "Une ère de maturité technique où l'on cherche à conjuguer la vélocité interactive du client et la sobriété de chargement de la structure sémantique serveur.",
    points: [
      {
        title: "TypeScript : La rigueur indispensable",
        desc: "Le JavaScript classique montre ses limites sur de très gros applicatifs à cause de sa nature permissive. TypeScript, inventé par Microsoft, s'impose comme la solution de référence mondiale en apportant la détection des bugs dès l'étape d'écriture.",
        tech: "TypeScript 4+ / Strict Types"
      },
      {
        title: "Next.js, SSR et les architectures hybrides",
        desc: "Les SPA pures d'hier souffraient d'un cruel déficit de référencement (SEO). Les nouvelles générations de meta-frameworks comme Next.js ou Nuxt réconcilient les mondes en générant l'HTML statique côté serveur pour l'appareil receveur.",
        tech: "Next.js / SSR / Hydration"
      },
      {
        title: "Vite & esbuild (La fin de la lenteur)",
        desc: "Evan You pulvérise à nouveau les barrières en inventant Vite. Il abandonne le modèle de build lourd de Webpack en tirant profit d'esbuild (écrit en langage compilé Go) pour rafraîchir ou reconstruire l'application en moins d'une milliseconde.",
        tech: "Vite JS / esbuild / Rollup"
      },
      {
        title: "L'intégration native des Intelligences Artificielles (2023+)",
        desc: "Les sites web s'enrichissent d'agents conversationnels et de sémantique cognitive. Le développeur web moderno-rétro implémente en quelques lignes de code serveur des liaisons d'API directes avec des LLM comme Google Gemini pour enrichir et générer de l'information contextuelle à la volée.",
        tech: "Google GenAI SDK / LLM API"
      }
    ],
    legacyFact: "L'écosystème web moderne a bouclé une boucle conceptuelle ironique : pour corriger les lenteurs phénoménales et le temps de chargement des Single Page Applications des années 2010 qui transmettaient des dizaines de mégaoctets de code à l'internaute, nous avons fini par réinventer les serveurs web dynamiques pré-compilant directement des pages HTML à la volée côté serveur comme nous le faisions déjà en 1995 !"
  }
];

export default function HistoryProtocolsBrowsers({ theme }: HistoryProtocolsBrowsersProps) {
  const [dnsStatus, setDnsStatus] = useState<'idle' | 'dns-request' | 'dns-resolved' | 'http-request' | 'render-success'>('idle');
  const [selectedTopic, setSelectedTopic] = useState<'history' | 'protocols' | 'browsers'>('history');
  const [selectedEpochIdx, setSelectedEpochIdx] = useState<number>(0);
  const [hoveredEpochIdx, setHoveredEpochIdx] = useState<number | null>(null);
  const [selectedRealtimePhase, setSelectedRealtimePhase] = useState<'polling' | 'websockets' | 'sse' | 'mercure'>('mercure');

  const selectedEpoch = EPOCHS[selectedEpochIdx];

  // Trigger Network Flow Simulation
  const runNetworkSimulation = () => {
    setDnsStatus('dns-request');
    setTimeout(() => {
      setDnsStatus('dns-resolved');
      setTimeout(() => {
        setDnsStatus('http-request');
        setTimeout(() => {
          setDnsStatus('render-success');
        }, 1500);
      }, 1200);
    }, 1200);
  };

  // Adjust theme styles analogous to other view components
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          sidebarBadgeActive: 'bg-[#000080] text-white text-[9px] uppercase font-bold px-1.5 py-0.5 border border-[#808080]',
          sidebarBadgeInactive: 'bg-[#808080] text-white text-[9px] uppercase font-bold px-1.5 py-0.5 border border-white',
          title: 'text-blue-900 font-extrabold text-[#000080] font-sans text-sm border-b-2 border-[#808080] pb-1 uppercase',
          accentText: 'text-blue-800 font-bold',
          tag: 'bg-[#d4d0c8] text-black border border-[#808080] text-[10px] px-2 py-0.5 font-bold',
          code: 'bg-white border-2 border-inset border-[#808080] font-mono text-xs text-black p-3 block overflow-x-auto select-all rounded-none',
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-3 font-mono',
          sidebarBadgeActive: 'bg-[#ffb000] text-black text-[9px] uppercase font-black px-1.5 py-0.5 border border-[#ffb000]',
          sidebarBadgeInactive: 'bg-black text-[#ffb000]/60 text-[9px] uppercase font-bold px-1.5 py-0.5 border border-[#ffb000]/30',
          title: 'text-[#ffb000] font-mono font-black text-sm border-b border-[#ffb000]/30 pb-2 uppercase tracking-wider',
          accentText: 'text-[#ffb000] font-bold decoration-dotted underline',
          tag: 'bg-[#ffb000]/10 text-[#ffb000] border border-[#ffb000]/20 text-[10px] px-2 py-0.5 font-medium rounded-none',
          code: 'bg-[#050505] border border-[#ffb000]/20 font-mono text-xs text-[#ffb000] p-4 block overflow-x-auto select-all rounded-none',
        };
      default: // Modern - Slate Slate & Indigo
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-750/70 rounded-xl space-y-3',
          sidebarBadgeActive: 'bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-500/30',
          sidebarBadgeInactive: 'bg-slate-950/40 text-slate-500 text-[10px] font-medium uppercase px-2 py-0.5 rounded-full border border-transparent',
          title: 'text-white font-sans font-extrabold text-sm tracking-tight bg-gradient-to-r from-white to-slate-450 bg-clip-text text-transparent',
          accentText: 'text-indigo-400 font-semibold',
          tag: 'bg-[#16161a] text-slate-300 border border-slate-800 text-[10.5px] px-2.5 py-1 rounded-md font-sans hover:border-gray-700 transition',
          code: 'bg-[#0a0a0c] border border-[#2a2a2e]/60 font-mono text-[11px] text-slate-300 p-3.5 rounded-xl overflow-x-auto select-all shadow-inner',
        };
    }
  };

  const getTabStyles = (tabId: string) => {
    const isActive = selectedTopic === tabId;
    if (theme === 'ie6') {
      return isActive 
        ? 'bg-[#d4d0c8] border-2 border-inset border-white text-[#000080] font-bold px-3 py-1.5 text-xs'
        : 'bg-[#d4d0c8] border-2 border-outset border-white text-black px-3 py-1.5 text-xs hover:bg-[#c0c0c0]';
    } else if (theme === 'terminal') {
      return isActive
        ? 'bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000] px-3 py-1.5 text-xs font-bold font-mono uppercase'
        : 'text-[#ffb000]/60 border border-[#ffb000]/20 hover:border-[#ffb000]/60 hover:text-[#ffb000] px-3 py-1.5 text-xs font-mono';
    } else { // Modern
      return isActive
        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-bold rounded-lg px-4 py-2 text-xs border cursor-pointer'
        : 'bg-slate-900/30 border-transparent text-slate-450 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg px-4 py-2 text-xs border cursor-pointer';
    }
  };

  const style = getThemeClass();

  return (
    <div className="space-y-6" id="history-protocols-browsers-root">
      {/* Tab select sub-header */}
      <div className={`flex flex-wrap gap-2 pb-3 mb-4 border-b ${theme === 'ie6' ? 'border-[#808080]' : theme === 'terminal' ? 'border-[#ffb000]/20' : 'border-slate-800'}`}>
        {[
          { id: 'history', label: "L'Histoire de World Wide Web", icon: Globe },
          { id: 'protocols', label: "Protocoles Fondamentaux (DNS, HTTP)", icon: Network },
          { id: 'browsers', label: "L'Évolution des Navigateurs", icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-hist-${tab.id}`}
              onClick={() => setSelectedTopic(tab.id as any)}
              className={`${getTabStyles(tab.id)} flex items-center gap-2 transition-all cursor-pointer`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Panel */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          
          {/* ================ TAB 1: HISTORY ================ */}
          {selectedTopic === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
              id="history-topic-content"
            >
              {/* Introduction Card */}
              <div className={style.card}>
                <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block border-b border-[#2a2a2e]/60 pb-2 mb-2">
                  -- ⏳ HISTOIRE CHRONOLOGIQUE DES TECHNOLOGIES ET DES ÉPOQUES WEB --
                </span>
                <p className="text-xs text-gray-400">
                  Sélectionnez une époque dans l'index de gauche pour explorer son anatomie stylistique, sa plomberie technique, sa citation légendaire et ses détails académiques ou industriels.
                </p>
              </div>

              {/* Staggered Interactive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Side list of epochs (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  {EPOCHS.map((epoch, idx) => {
                    const isActive = selectedEpochIdx === idx;
                    const isHovered = idx === hoveredEpochIdx;
                    
                    const isAnyHovered = hoveredEpochIdx !== null;
                    const ghostEffectCss = isAnyHovered && !isHovered
                      ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                      : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";

                    return (
                      <button
                        key={epoch.id}
                        onClick={() => setSelectedEpochIdx(idx)}
                        onMouseEnter={() => setHoveredEpochIdx(idx)}
                        onMouseLeave={() => setHoveredEpochIdx(null)}
                        className={`text-left p-3.5 transition flex flex-col gap-1 cursor-pointer hover:border-amber-500/40 ${
                          theme === 'ie6'
                            ? `border-2 border-solid ${isActive ? 'bg-[#000080] text-white border-white' : 'bg-[#c0c0c0] text-black border-[#808080]'}`
                            : theme === 'terminal'
                            ? `border ${isActive ? 'bg-[#ffb000]/15 text-[#ffb000] border-[#ffb000]' : 'bg-black text-[#ffb000]/65 border-[#ffb000]/25'}`
                            : `rounded-xl border transition-all ${isActive ? 'bg-indigo-600/10 border-indigo-500/60 text-white shadow-lg' : 'bg-[#111114]/90 border-slate-800/80 text-slate-400'}`
                        } ${ghostEffectCss}`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-[9.5px] font-bold ${isActive && theme === 'ie6' ? 'text-yellow-300' : 'text-slate-450'}`}>
                            {epoch.yearRange}
                          </span>
                          <span className={isActive ? style.sidebarBadgeActive : style.sidebarBadgeInactive}>
                            {epoch.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5 mt-0.5">
                          <span className="text-base select-none">{epoch.icon}</span>
                          <span className={isActive && theme === 'modern' ? 'text-indigo-400' : ''}>
                            {epoch.title.split(': ')[1] || epoch.title}
                          </span>
                        </h4>
                      </button>
                    );
                  })}
                </div>

                {/* Detail View of current selected epoch (8 cols) */}
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedEpochIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className={style.card}
                    >
                      {/* Header block details */}
                      <div className="flex items-start gap-3 border-b border-[#2a2a2e]/60 pb-3">
                        <span className="text-4xl select-none">{selectedEpoch.icon}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono text-amber-500 font-bold">{selectedEpoch.yearRange}</span>
                            <span className={selectedEpoch.badgeStyle + " text-[9px] px-1.5 py-0.5 rounded"}>
                              {selectedEpoch.badge}
                            </span>
                          </div>
                          <h3 className={`text-base font-black ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-slate-100'}`}>
                            {selectedEpoch.title}
                          </h3>
                        </div>
                      </div>

                      <p className={`text-xs leading-relaxed italic ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                        {selectedEpoch.text}
                      </p>

                      {/* Timeline content subdivisions */}
                      <div className="space-y-4 pt-1">
                        {selectedEpoch.points.map((p, idx) => (
                          <div key={idx} className={style.innerCard}>
                            <div className="flex items-center justify-between w-full flex-wrap gap-1">
                              <h5 className={`text-xs font-bold ${theme === 'ie6' ? 'text-slate-900 border-b border-black' : 'text-indigo-400'}`}>
                                {p.title}
                              </h5>
                              <span className="bg-slate-950/40 text-[9px] font-mono px-2 py-0.5 text-gray-450 border border-slate-900 rounded select-all">
                                {p.tech}
                              </span>
                            </div>
                            <p className="text-[11.5px] leading-relaxed text-gray-300">
                              {p.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Fact section */}
                      <div className="bg-[#15151a] p-3 rounded-lg border border-slate-900 flex items-start gap-2 text-[10.5px]">
                        <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
                        <div className="leading-tight text-gray-400">
                          <strong className={style.accentText}>Une anecdote de l'époque :</strong>{' '}
                          <span>{selectedEpoch.legacyFact}</span>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Focus asynchrone & Mercure */}
              <div className={style.card}>
                <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block border-b border-[#2a2a2e]/60 pb-2 mb-4">
                  -- ⚡ FOCUS TECHNIQUE : LA RÉVOLUTION ASYNCHRONES ET LE PROTOCOLE MERCURE --
                </span>
                
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-tight text-slate-100">
                      Du cycle requête-réponse (PULL) au flux instantané poussé (PUSH)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Historiquement, le protocole HTTP est "sans état" et "unidirectionnel" : seul le client peut initier une demande. Pour obtenir une mise à jour en temps réel (ex: un tchat ou une notification), le Web a dû inventer plusieurs paradigmes. Cliquez sur les phases pour comprendre l'évolution technique :
                    </p>
                  </div>

                  {/* Phases selector tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'polling', label: '1. Polling (1998)', icon: '🔄', desc: 'Requêtes répétitives' },
                      { id: 'websockets', label: '2. WebSockets (2011)', icon: '🔌', desc: 'Canal bidirectionnel' },
                      { id: 'sse', label: '3. SSE (HTML5)', icon: '📡', desc: 'Flux unilatéral natif' },
                      { id: 'mercure', label: '4. Mercure (2018+)', icon: '🌀', desc: 'Hub Server-to-Client' },
                    ].map((phase) => {
                      const isPressed = selectedRealtimePhase === phase.id;
                      return (
                        <button
                          key={phase.id}
                          onClick={() => setSelectedRealtimePhase(phase.id as any)}
                          className={`p-2.5 text-left transition rounded-xl border flex flex-col gap-0.5 cursor-pointer hover:border-indigo-400/40 ${
                            isPressed
                              ? 'bg-indigo-650/15 border-indigo-500 text-indigo-400 shadow-sm'
                              : 'bg-slate-950/45 border-slate-850/80 text-slate-450'
                          }`}
                        >
                          <span className="text-[11px] font-bold flex items-center gap-1.5">
                            <span>{phase.icon}</span>
                            <span>{phase.label}</span>
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono italic">
                            {phase.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Details Panel for selected Phase */}
                  <div className="bg-[#0b0b0d] p-4 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-12 gap-5 leading-normal">
                    {/* Diagram columns (5 cols) */}
                    <div className="md:col-span-5 flex flex-col justify-center items-center p-3 bg-slate-950 rounded-lg border border-slate-900/60 font-mono text-[10px] space-y-3 min-h-[140px] text-center">
                      <span className="text-[8.5px] font-bold text-slate-455 uppercase tracking-wider block">
                        Schéma d'échange réseau
                      </span>
                      
                      {selectedRealtimePhase === 'polling' && (
                        <div className="space-y-1 w-full text-slate-400">
                          <div className="text-red-400">Client ➔ Serveur : "Du neuf ?" (10kb)</div>
                          <div className="text-slate-500">Serveur ➔ Client : "Non, rien." (01s)</div>
                          <div className="text-red-400">Client ➔ Serveur : "Du neuf ?" (10kb)</div>
                          <div className="text-slate-500">Serveur ➔ Client : "Non, rien." (01s)</div>
                          <div className="text-emerald-400">Client ➔ Serveur : "Du neuf ?" (10kb)</div>
                          <div className="text-emerald-500">Serveur ➔ Client : "Oui ! Message #1"</div>
                        </div>
                      )}

                      {selectedRealtimePhase === 'websockets' && (
                        <div className="space-y-1.5 w-full text-slate-400">
                          <div className="text-indigo-400 border border-indigo-800/40 py-1 px-1 rounded bg-[#0b0b14]/50 leading-tight">
                            Client ➔ Serveur :<br/>HANDSHAKE "Upgrade: websocket"
                          </div>
                          <div className="text-sky-400 font-bold block animate-pulse">
                            ⚡ Canal TCP Unique Ouvert ⚡
                          </div>
                          <div className="text-emerald-400 text-[9.5px]">
                            ⇄ Flux bidirectionnel binaire instantané
                          </div>
                        </div>
                      )}

                      {selectedRealtimePhase === 'sse' && (
                        <div className="space-y-1 w-full text-slate-400">
                          <div className="text-emerald-400 border border-emerald-800/40 py-1 px-1 rounded bg-emerald-950/10 leading-tight">
                            Client ➔ Serveur :<br/>GET /stream (Accept: text/event-stream)
                          </div>
                          <div className="text-slate-500 pt-1">
                            Serveur ➔ Client : <span className="text-sky-400">data: {"{"}"id": 12{"}"}</span>
                          </div>
                          <div className="text-slate-500">
                            Serveur ➔ Client : <span className="text-sky-400">data: {"{"}"id": 13{"}"}</span>
                          </div>
                        </div>
                      )}

                      {selectedRealtimePhase === 'mercure' && (
                        <div className="space-y-1.5 w-full text-slate-400">
                          <div className="text-rose-400 font-bold text-[9.5px] uppercase border border-rose-900/60 rounded px-1.5 py-0.5 bg-rose-955/10">
                            Hub Mercure central
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[8.5px]">
                            <div className="p-1 border border-slate-800 bg-slate-900 leading-tight">
                              <span className="text-emerald-400 block font-bold">1. PUBLISH</span>
                              App ➔ POST Hub
                            </div>
                            <div className="p-1 border border-slate-800 bg-slate-900 leading-tight">
                              <span className="text-sky-400 block font-bold">3. SUBSCRIBE</span>
                              Clients ⇄ SSE Hub
                            </div>
                          </div>
                          <p className="text-[8.5px] text-pink-400">
                            Zéro charge sur l'application backend !
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Explanations columns (7 cols) */}
                    <div className="md:col-span-7 flex flex-col justify-between text-left space-y-3">
                      <div>
                        {selectedRealtimePhase === 'polling' && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                              <span>🔄 Polling (Sondage Périodique)</span>
                              <span className="text-[10px] font-normal px-2 py-0.5 bg-red-950 text-red-400 rounded-full font-mono uppercase">Lourd &amp; Archaïque</span>
                            </h5>
                            <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                              La première méthode consistait à programmer une boucle JavaScript (via <code>setInterval</code>) qui répétait une requête AJAX d'arrière-plan toutes les super-secondes.
                            </p>
                            <ul className="list-disc pl-4 text-[10.5px] text-slate-400 space-y-1">
                              <li><b>Inconvénient :</b> Gaspillage insensé de bande passante. 99% des requêtes revenaient vides.</li>
                              <li><b>Surcharge serveur :</b> Des milliers de connexions TCP s'ouvrent et se coupent chaque seconde, asphyxiant la machine hôte.</li>
                            </ul>
                          </div>
                        )}

                        {selectedRealtimePhase === 'websockets' && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                              <span>🔌 WebSockets</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-[#10b981] rounded-full font-mono uppercase">Bidirectionnel</span>
                            </h5>
                            <p className="text-[11px] text-slate-350 leading-relaxed">
                              Une rupture complète : on envoie une requête HTTP initiale avec un en-tête demandant la modification du protocole. Une fois accepté, le fureteur et la machine communiquent par un tuyau ouvert persistant bidirectionnel.
                            </p>
                            <ul className="list-disc pl-4 text-[10.5px] text-slate-400 space-y-1 font-sans">
                              <li><b>Idéal pour :</b> Les jeux en ligne multijoueurs, terminaux interactifs ou outils collaboratifs complexes (type Figma).</li>
                              <li><b>Contrainte :</b> Bypasse totalement l'écosystème HTTP standard. Lourd à scaler, incompatible avec les directives de cache conventionnelles ou les pare-feux stricts.</li>
                            </ul>
                          </div>
                        )}

                        {selectedRealtimePhase === 'sse' && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                              <span>📡 Server-Sent Events (SSE) : Le Push Web Natif</span>
                              <span className="text-[10px] font-normal px-2 py-0.5 bg-amber-950 text-amber-400 rounded-full font-mono uppercase">Unidirectionnel Natif</span>
                            </h5>
                            <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                              Introduit par HTML5, SSE permet au fureteur de s'abonner à un flux de notifications continu. C'est l'inverse d'AJAX : le serveur garde la connexion ouverte pour envoyer des données textuelles dès qu'il le souhaite via une seule ligne de code.
                            </p>
                            <ul className="list-disc pl-4 text-[10.5px] text-slate-400 space-y-1">
                              <li><b>Avantage :</b> Fonctionne à 100% sur le protocole HTTP standard. Reconnexion automatique intégrée nativement par le navigateur.</li>
                              <li><b>Limite :</b> Nécessite de maintenir une connexion par client ouverte sur le serveur applicatif principal, saturant rapidement les threads d'exécution (comme avec PHP).</li>
                            </ul>
                          </div>
                        )}

                        {selectedRealtimePhase === 'mercure' && (
                          <div className="space-y-2 font-sans">
                            <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                              <span>🌀 Le Protocole Mercure</span>
                              <span className="text-[10px] font-black px-2 py-0.5 bg-indigo-950 text-indigo-400 rounded-full font-mono uppercase">Standard Hub</span>
                            </h5>
                            <p className="text-[11px] text-slate-350 leading-relaxed">
                              Conçu par l'ingénieur français <b>Kévin Dunglas</b>, Mercure est une spécification moderne de push de données standardisée. Elle apporte le compromis ultime : déléguer toute l'asynchronie lourde à un <b>Hub Mercure centralisé</b>.
                            </p>
                            <p className="text-[10.5px] text-slate-400 leading-relaxed">
                              Votre application serveur (ex: en Go, Node, Python, Symfony) n'a plus à s'occuper de conserver des milliers d'utilisateurs connectés. Dès qu'une modification survient sur votre back-office, vous faites une simple requête <span className="text-rose-455 font-bold">HTTP POST</span> vers le Hub Mercure. Ce dernier répartit instantanément l'information à tous les navigateurs abonnés en Server-Sent Events multiplexés (HTTP/2 ou HTTP/3).
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Small badge comparison info */}
                      <div className="bg-slate-900/50 p-2 border border-slate-850 rounded text-[10px] text-slate-400 italic">
                        {selectedRealtimePhase === 'mercure' ? (
                          <span className="text-indigo-400 font-bold block">🚀 Pourquoi Mercure domine :</span>
                        ) : (
                          <span className="font-bold block">💡 Constat historique :</span>
                        )}
                        {selectedRealtimePhase === 'polling' && "Le Polling gaspillait jusqu'à 95% des ressources réseau de la bulle d'époque avec des millions de paquets TCP vides."}
                        {selectedRealtimePhase === 'websockets' && "Le WebSocket nécessite un serveur d'état lourd/stateful et gère difficilement le chiffrement intermédiaire par proxy."}
                        {selectedRealtimePhase === 'sse' && "Le Server-Sent Events reste le moyen le plus simple et léger de pousser du texte, mais exigeait un orchestrateur externe de répartition de charge."}
                        {selectedRealtimePhase === 'mercure' && "Mercure est livré nativement avec la gestion fine des droits d'accès (JSON Web Tokens), la reprise automatique sur coupure, et l'économie drastique de ressources processeurs."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ================ TAB 2: PROTOCOLS ================ */}
          {selectedTopic === 'protocols' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              id="protocols-topic-content"
            >
              {/* Core definitions cards */}
              <div className={style.card}>
                <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block border-b border-[#2a2a2e]/60 pb-2 mb-4">
                  -- 📬 LA PLOMBERIE DU WEB : DE L'ANNUAIRE DNS AU PROTOCOLE HTTP --
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={style.innerCard}>
                    <span className="text-indigo-400 font-mono text-xs font-bold block">1. DNS (Domain Name System)</span>
                    <h5 className={`text-sm font-semibold ${theme === 'ie6' ? 'text-[#000080]' : 'text-slate-200'}`}>L'Annuaire du Net</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Traduit les adresses textuelles compréhensibles par les humains (ex: <code>info.cern.ch</code>) en adresses IP machines brutes (ex: <code>188.184.21.108</code>).
                    </p>
                  </div>

                  <div className={style.innerCard}>
                    <span className="text-emerald-400 font-mono text-xs font-bold block">2. HTTP (HyperText Transfer Protocol)</span>
                    <h5 className={`text-sm font-semibold ${theme === 'ie6' ? 'text-[#000080]' : 'text-slate-200'}`}>Le Dialogue Client-Serveur</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Série de commandes brutes (ex: <code>GET /index.html HTTP/1.1</code>) permettant de demander le code source et de fermer ou recycler les tuyaux de données.
                    </p>
                  </div>

                  <div className={style.innerCard}>
                    <span className="text-amber-400 font-mono text-xs font-bold block">3. Transport & Sécurité (TCP/IP & SSL)</span>
                    <h5 className={`text-sm font-semibold ${theme === 'ie6' ? 'text-[#000080]' : 'text-slate-200'}`}>Les Canaux Empilés</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      TCP vérifie que chaque octet d'HTML arrive intact dans l'ordre de d'envoi. TLS/SSL chiffre les messages sensibles constituant ainsi le protocole HTTPS sécurisé.
                    </p>
                  </div>

                  <div className={style.innerCard}>
                    <span className="text-rose-400 font-mono text-xs font-bold block">4. Mercure (Push & Flux SSE-based)</span>
                    <h5 className={`text-sm font-semibold ${theme === 'ie6' ? 'text-[#000080]' : 'text-slate-200'}`}>L'Asynchronisme Natif</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Protocole de push en temps réel bâti sur HTTP/2+ et les Server-Sent Events, coupant les requêtes en boucle pour actualiser les interfaces d'un claquement de doigts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Network Emulator */}
              <div className={style.card}>
                <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#2a2a2e]/50 pb-3">
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-wide ${theme === 'ie6' ? 'text-[#000080]' : 'text-slate-200'}`}>
                      Simulateur Interactif de Paquets Réseau
                    </h3>
                    <p className="text-xs text-slate-450 leading-tight">
                      Déclenchez une requête pour analyser visuellement le trajet informatique de l'adresse textuelle jusqu'à la compilation du DOM de la page CERN.
                    </p>
                  </div>
                  <button
                    onClick={runNetworkSimulation}
                    id="btn-run-network-sim"
                    disabled={dnsStatus === 'dns-request' || dnsStatus === 'http-request'}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-40 transition-all select-none shadow-sm ${
                      theme === 'ie6' 
                        ? 'bg-[#d4d0c8] border-2 border-outset border-white text-black font-bold active:border-inset' 
                        : theme === 'terminal' 
                        ? 'border border-[#ffb000] text-[#ffb000] bg-black/40 hover:bg-[#ffb000]/10' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${(dnsStatus === 'dns-request' || dnsStatus === 'http-request') ? 'animate-spin' : ''}`} />
                    <span>Récupérer : http://info.cern.ch</span>
                  </button>
                </div>

                {/* Simulation Canvas / Nodes Row */}
                <div className={`p-6 relative overflow-hidden ${theme === 'ie6' ? 'border-2 border-inset border-white bg-[#909090]' : 'bg-slate-950 border border-slate-850 rounded-xl'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    
                    {/* Node 1: Navigateur Client */}
                    <div className={`p-4 flex flex-col items-center text-center space-y-2 ${theme === 'ie6' ? 'bg-[#c0c0c0] border-2 border-outset border-white text-black' : 'bg-slate-900/90 border border-slate-800 rounded-xl'}`}>
                      <div className={`p-3 rounded-full border ${theme === 'ie6' ? 'bg-white text-[#000080]' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25'}`}>
                        <Laptop className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold">Votre Navigateur (Client)</span>
                      <p className="text-[10px] opacity-75 font-mono">Port local d'écoute: 49281</p>
                      
                      {/* Active Status Display inside client */}
                      <div className="w-full mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-left">
                        {dnsStatus === 'idle' && <span className="opacity-50 font-mono">Prêt à émettre...</span>}
                        {dnsStatus === 'dns-request' && <span className="text-indigo-455 font-mono animate-pulse block">Qui résout : info.cern.ch ?</span>}
                        {dnsStatus === 'dns-resolved' && <span className="text-blue-500 font-mono">IP assignée: 188.184.21.108</span>}
                        {dnsStatus === 'http-request' && <span className="text-emerald-455 font-mono animate-pulse block">GET /index.html HTTP/1.1</span>}
                        {dnsStatus === 'render-success' && (
                          <div className="bg-emerald-950/20 p-1.5 border border-emerald-555/30 rounded text-[9px] text-emerald-400 font-mono">
                            HTML Interprété !<br/>Render: H1 (CERN Center)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Node 2: Serveur DNS */}
                    <div className={`p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 ${
                      (dnsStatus === 'dns-request') ? 'border-indigo-500 bg-indigo-950/10' : ''
                    } ${theme === 'ie6' ? 'bg-[#c0c0c0] border-2 border-outset border-white text-black' : 'bg-slate-900/90 border border-slate-800 rounded-xl'}`}>
                      <div className={`p-3 rounded-full border ${theme === 'ie6' ? 'bg-white text-[#000080]' : 'bg-blue-500/10 text-blue-400 border-blue-500/25'}`}>
                        <Server className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold">Serveur de Noms (DNS)</span>
                      <p className="text-[10px] opacity-75 font-mono">IP: 8.8.8.8</p>

                      <div className="w-full mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-left">
                        {dnsStatus === 'dns-request' ? (
                          <span className="text-indigo-400 font-mono animate-bounce block">Résolution du nom textuel...</span>
                        ) : dnsStatus === 'dns-resolved' || dnsStatus === 'http-request' || dnsStatus === 'render-success' ? (
                          <span className="text-blue-500 font-mono">Donné ! 188.184.21.108</span>
                        ) : (
                          <span className="opacity-50 font-mono">En veille...</span>
                        )}
                      </div>
                    </div>

                    {/* Node 3: Serveur Original CERN */}
                    <div className={`p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 ${
                      (dnsStatus === 'http-request') ? 'border-emerald-500 bg-emerald-950/10' : ''
                    } ${theme === 'ie6' ? 'bg-[#c0c0c0] border-2 border-outset border-white text-black' : 'bg-slate-900/90 border border-slate-800 rounded-xl'}`}>
                      <div className={`p-3 rounded-full border ${theme === 'ie6' ? 'bg-white text-[#000080]' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'}`}>
                        <Globe className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold">Serveur CERN (info.cern.ch)</span>
                      <p className="text-[10px] opacity-75 font-mono">IP: 188.184.21.108</p>

                      <div className="w-full mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-left">
                        {dnsStatus === 'http-request' ? (
                          <div className="text-emerald-400 font-mono text-[9px] leading-tight">
                            HTTP/1.1 200 OK<br/>
                            Server: Apache/0.9 (Unix)<br/>
                            Index HTML envoyé !
                          </div>
                        ) : dnsStatus === 'render-success' ? (
                          <span className="opacity-70 font-mono">Fichier envoyé. Session close.</span>
                        ) : (
                          <span className="opacity-50 font-mono">En attente d'appels...</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrows / Visual Overlays */}
                  <div className="hidden md:block absolute top-[68px] left-[26%] right-[26%] h-1 bg-slate-800 rounded z-0">
                    <div className="relative w-full h-full">
                      {dnsStatus === 'dns-request' && (
                        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-indigo-400 to-indigo-500 rounded animate-marquee" />
                      )}
                      {dnsStatus === 'http-request' && (
                        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-transparent via-emerald-400 to-emerald-500 rounded animate-marquee" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================ TAB 3: BROWSERS ================ */}
          {selectedTopic === 'browsers' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={style.card}
              id="browsers-topic-content"
            >
              <h3 className={style.title}>
                De Mosaic à l'Empire Chrome : La Guerre Secrète des Moteurs
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  <div className={style.innerCard}>
                    <span className="text-xs font-bold text-orange-400 font-mono">1993 - 1995</span>
                    <h4 className="text-xs font-bold font-mono text-slate-200 mt-1 mb-2">L'Aube de Mosaic</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Avant Mosaic, les images s'ouvraient dans une fenêtre externe séparée ! NCSA Mosaic innove en incorporant la balise <code>&lt;img&gt;</code> directement au milieu du texte. C'est l'étincelle qui décolle le web grand public de l'environnement universitaire strict.
                    </p>
                  </div>

                  <div className={style.innerCard}>
                    <span className="text-xs font-bold text-indigo-400 font-mono">1995 - 2001</span>
                    <h4 className="text-xs font-bold font-mono text-slate-200 mt-1 mb-2">La Première Guerre de Navigateurs</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Un face-à-face impitoyable oppose Netscape Co. à Microsoft. Microsoft réagit en offrant d'office <b>Internet Explorer</b> intégré de force à Windows 95 OSR2/98. Netscape, payant, coule et lègue son code source au domaine public, lançant le projet Mozilla.
                    </p>
                  </div>

                  <div className={style.innerCard}>
                    <span className="text-xs font-bold text-yellow-500 font-mono">2001 - 2008</span>
                    <h4 className="text-xs font-bold font-mono text-slate-200 mt-1 mb-2">L'Hégémonie Glaciale de IE6</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Vainqueur à 96%, Microsoft licencie les développeurs de l'équipe IE. Microsoft stagne et laisse Internet Explorer 6 sans mise à jour pendant 6 ans, miné par des failles, et d'affreux bugs du moteur CSS. Les "hacks CSS" deviennent indispensables aux développeurs excédés.
                    </p>
                  </div>

                </div>

                {/* Sub-component interactive frise / browser timeline of market share */}
                <BrowserMarketShareTimeline />

                <div className="p-4 bg-slate-950 border border-slate-750/75 rounded-xl space-y-2 text-xs">
                  <h5 className="font-extrabold tracking-widest text-[#ffb000] uppercase font-mono text-[10px]">
                    🚀 Le Moteur de Rendu moderne : Une affaire de Vitesse et de Sandbox d'isolation
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    En 2008, <b>Google Chrome</b> entre dans l'arène avec un secret technologique majeur : le <b>moteur V8</b>. V8 abandonne l'interprétation sémantique pure pour compiler à la volée (Just-In-Time) le code JavaScript directement en assembleur natif de processeur. De surcroît, Chrome cloisonne individuellement chaque onglet dans un conteneur d'isolation logicielle ("Sandbox"), prévenant pour de bon les crashs en chaîne sur l'OS hôte.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
