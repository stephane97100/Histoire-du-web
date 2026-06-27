/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Tv, 
  TrendingUp, 
  Zap, 
  GitCommit, 
  Smartphone, 
  ArrowRight, 
  RefreshCw, 
  Radio, 
  FileCode, 
  Eye, 
  CheckCircle,
  Clock,
  MousePointer2
} from 'lucide-react';
import ShareButtons from './ShareButtons';
import GlossaryTooltip from './GlossaryTooltip';

interface WebRevolutionsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface RevolutionItem {
  id: string;
  name: string;
  year: string;
  icon: string;
  brief: string;
  impactTitle: string;
  beforeText: string;
  revolutionPower: string;
  afterText: string;
  vintageCodeTitle: string;
  vintageCode: string;
  modernCodeTitle: string;
  modernCode: string;
  technicalKeywords: string[];
}

export default function WebRevolutionsView({ theme }: WebRevolutionsViewProps) {
  const [activeRevId, setActiveRevId] = useState<string>('ajax');
  
  // Interactive simulation states
  const [ajaxStatus, setAjaxStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [pollMessages, setPollMessages] = useState<string[]>(['[00:00] Client : Y a-t-il du nouveau ? (Poll)', '[00:00] Serveur : Non (Séance close)']);
  const [wsMessages, setWsMessages] = useState<string[]>(['[Connexion WebSockets établie]']);
  const [wsInput, setWsInput] = useState('');

  // Figma interactive collaborative simulated canvas
  const [figmaShapes, setFigmaShapes] = useState<Array<{ id: string; type: 'rect' | 'circle' | 'triangle'; x: number; y: number; color: string }>>([
    { id: '1', type: 'rect', x: 25, y: 35, color: '#4f46e5' },
    { id: '2', type: 'circle', x: 160, y: 75, color: '#ec4899' },
  ]);
  const [collaboratorUsers, setCollaboratorUsers] = useState<Array<{ id: string; name: string; x: number; y: number; color: string }>>([
    { id: 'alice', name: 'Alice (Designer UI)', x: 120, y: 50, color: '#f43f5e' },
    { id: 'bob', name: 'Bob (Lead Dev)', x: 210, y: 95, color: '#3b82f6' },
  ]);

  // Game simulation states (Dofus retro & modern)
  const [iopCell, setIopCell] = useState<number>(12);
  const [iopAP, setIopAP] = useState<number>(6);
  const [iopMP, setIopMP] = useState<number>(3);
  const [iopLogs, setIopLogs] = useState<string[]>(['[10:15] Iop : Combat lancé !', '[10:15] Un Bouftou sauvage apparaît en cellule 8 !']);
  const [dofusTech, setDofusTech] = useState<'flash' | 'html5_unity'>('flash');

  const resetCombat = () => {
    setIopCell(12);
    setIopAP(6);
    setIopMP(3);
    setIopLogs(['[10:15] Combat réinitialisé aux valeurs initiales.']);
  };

  const moveIop = (cellId: number) => {
    if (iopCell === cellId) return;
    if (iopMP <= 0) {
      setIopLogs(prev => [...prev, "❌ Mode Tactique : PM insuffisants pour ce déplacement !"]);
      return;
    }
    setIopCell(cellId);
    setIopMP(prev => Math.max(0, prev - 1));
    setIopLogs(prev => [...prev, `🏃 Déplacement du personnage en cellule ${cellId}. (-1 PM)`]);
  };

  const castIopSpell = () => {
    if (iopAP < 3) {
      setIopLogs(prev => [...prev, "❌ PA insuffisants pour lancer l'attaque Pression !"]);
      return;
    }
    setIopAP(prev => Math.max(0, prev - 3));
    const dmg = Math.floor(Math.random() * 20) + 32;
    setIopLogs(prev => [...prev, `💥 Lancement du sort 'Pression' ! Le Bouftou subit -${dmg} PV. (-3 PA)`]);
  };

  const endTurn = () => {
    setIopAP(6);
    setIopMP(3);
    setIopLogs(prev => [...prev, "🔄 Fin de tour. PA et PM restaurés pour le tour suivant !"]);
  };

  // Handle fake cursor movements in Figma canvas
  useEffect(() => {
    if (activeRevId !== 'figma') return;
    const interval = setInterval(() => {
      setCollaboratorUsers(prev => prev.map(user => {
        // Random brownian motion within the bounds of our mock canvas (max: w-320 h-160)
        const dX = (Math.random() - 0.5) * 45;
        const dY = (Math.random() - 0.5) * 35;
        return {
          ...user,
          x: Math.max(15, Math.min(270, user.x + dX)),
          y: Math.max(15, Math.min(110, user.y + dY))
        };
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [activeRevId]);

  const addFigmaShape = (type: 'rect' | 'circle' | 'triangle') => {
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newShape = {
      id: Date.now().toString(),
      type,
      x: Math.floor(Math.random() * 190) + 20,
      y: Math.floor(Math.random() * 75) + 15,
      color: randomColor
    };
    setFigmaShapes(prev => [...prev, newShape]);
  };

  // SaaS simulation states
  const [saasNodes, setSaasNodes] = useState([
    { id: 'earth', name: 'Serveur Terrestre (Paris/NYC)', latency: '12ms', active: true, load: 24 },
    { id: 'orbit', name: 'Micro-serveur Orbital (Satellite ISS)', latency: '85ms', active: false, load: 0 },
    { id: 'moon', name: 'Relais Lunaire (Base Artemis - Luna-1)', latency: '2400ms', active: false, load: 0 },
  ]);
  const [saasLogs, setSaasLogs] = useState<string[]>([
    "📂 [Connexion SaaS] Portails synchronisés.",
    "🚀 Votre bureau de travail virtuel est disponible n'importe où."
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleSaasNode = (nodeId: string) => {
    setSaasNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        const nextActive = !node.active;
        const logMsg = nextActive 
          ? `⚡ [SaaS Cloud Deploy] Déploiement logiciel configuré pour : ${node.name}. Liaison active !`
          : `⚠️ [SaaS Cloud Deploy] Retrait de l'instance pour : ${node.name}.`;
        setSaasLogs(l => [...l, logMsg]);
        return { ...node, active: nextActive, load: nextActive ? Math.floor(Math.random() * 30) + 10 : 0 };
      }
      return node;
    }));
  };

  const triggerSaasSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSaasLogs(l => [...l, "🔄 [SaaS Sync] Lancement d'une mise à jour de données bidirectionnelle globale..."]);
    
    setTimeout(() => {
      setSaasLogs(l => [...l, "🌍 [Sync Terrestre] Sauvegarde persistée sur Terre (Paris/NYC) - Réponse en 12ms."]);
    }, 450);

    const orbitActive = saasNodes.find(n => n.id === 'orbit')?.active;
    if (orbitActive) {
      setTimeout(() => {
        setSaasLogs(l => [...l, "🛰️ [Sync Orbite] Liaison Satellite OK ! Application synchronisée en direct de l'espace en 85ms."]);
      }, 1000);
    }

    const moonActive = saasNodes.find(n => n.id === 'moon')?.active;
    if (moonActive) {
      setTimeout(() => {
        setSaasLogs(l => [...l, "🌙 [Sync Lunaire] SUCCESS ! Données répliquées en Base Artemis. Le logiciel est disponible sur la Lune en 2.4s !"]);
      }, 1800);
    }

    setTimeout(() => {
      setIsSyncing(false);
      setSaasLogs(l => [...l, "✅ [SaaS Sync] Cycle de réplication achevé !"]);
    }, 2100);
  };

  const revolutions: RevolutionItem[] = [
    {
      id: 'flash',
      name: 'L\'Ère Macromedia Flash',
      year: '1996 - rich multimedia',
      icon: '⚡',
      brief: 'L\'introduction du dessin vectoriel, du son synchronisé, de l\'écriture ActionScript et du multimédia interactif autonome sur de simples connexions bas débit.',
      impactTitle: 'L\'apport créatif historique de Flash :',
      beforeText: 'Un Web statique et morne restreint à du bête HTML textuel brut, sans vidéo fluide, sans polices personnalisées lisses, et sans jeux interactifs.',
      revolutionPower: 'Flash a apporté un outil auteur visuel incroyable permettant d\'embarquer des sites artistiques d\'une richesse inouïe (.SWF compacts) s\'exécutant à l\'identique partout grâce à son greffon ultra-léger universel. Il a littéralement inventé le streaming vidéo moderne et l\'univers du jeu par navigateur indépendant.',
      afterText: 'Une prise de conscience qu\'Internet pouvait devenir un milieu hautement immersif, interactif, sonore et cinématographique.',
      vintageCodeTitle: 'Script ActionScript 2.0 vintage (Actions attachées) :',
      vintageCode: `on(release) {
    this.gotoAndPlay("intro_fade");
    loadMovieNum("ambient_synth.swf", 2);
    _root.score += 100;
    getURL("javascript:alert('Flash interactif !');");
}`,
      modernCodeTitle: 'Remplacé de nos jours par HTML5 & CSS3 :',
      modernCode: `<video src="clip.mp4" controls autoplay muted></video>
<canvas id="gameGrid"></canvas>

<script>
  const canvas = document.getElementById('gameGrid');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 150, 150);
</script>`,
      technicalKeywords: ['Vector graphics', 'ActionScript', 'Streaming FLV', 'SWF files']
    },
    {
      id: 'jeux_en_ligne',
      name: 'Les Jeux en Ligne & Navigateurs',
      year: '1999 - Lancement & Mutation',
      icon: '🎮',
      brief: 'Lancer des univers de jeux persistants directement dans un onglet : de l\'hégémonie de Macromedia Flash jusqu\'au passage forcé vers le HTML5 Canvas, WebGL et WebAssembly.',
      impactTitle: 'L\'essor du divertissement instantané en ligne :',
      beforeText: 'Des jeux d\'époque purement textuels en PHP (comme OGame, Kraland, Nécrofolia) ou de lentes applications clientes Java exigeant l\'installation risquée de la machine virtuelle d\'Oracle (JRE).',
      revolutionPower: 'Le plugin Flash a démocratisé le jeu instantané : des millions d\'internautes découvrent le "casual gaming" (pionniers comme Miniclip, Kongregate ou Armor Games). Des studios visionnaires comme Ankama créent l\'événement en septembre 2004 avec DOFUS, un MMORPG d\'une profondeur inouïe avec système de combat tactique au tour par tour dessiné entièrement en vectoriel sous Flash (ActionScript), ouvrant la voie à des millions de joueurs simultanés.',
      afterText: 'La mort décrétée d\'Adobe Flash fin 2020 a poussé l\'industrie vers des réarchitectures d\'envergure : Dofus et d\'autres légendes migrent vers Unity, WebGL ou des moteurs HTML5 hybrides robustes, prouvant que le navigateur web est une véritable console de jeu.',
      vintageCodeTitle: 'Extrait ActionScript 2 (Dofus - Gestionnaire tactique) :',
      vintageCode: `// ActionScript vintage d'Ankama (moteur de combat d'époque)
on(release) {
    var cellId = _root.getMouseHoverCell();
    if (_root.isCellWalkable(cellId)) {
        _root.character.api.moveToCell(cellId);
        _root.soundCabinet.playFx("move_grass_heavy");
    }
}`,
      modernCodeTitle: 'Équivalent d\'un moteur de jeu HTML5 Canvas / Javascript Modern (Phaser) :',
      modernCode: `// Code moderne Phaser 3 de rendu WebGL matériel
import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO, // Rendu WebGL prioritaire si compatible
  width: 800,
  height: 600,
  physics: { default: 'arcade' },
  scene: {
    preload() { this.load.image('iop', 'assets/iop.png'); },
    create() { this.add.sprite(400, 300, 'iop'); }
  }
};
const game = new Phaser.Game(config);`,
      technicalKeywords: ['Ankama Dofus', 'Macromedia Flash', 'Phaser Engine', 'WebGL Render', 'ActionScript 2.0']
    },
    {
      id: 'ajax',
      name: 'La Révolution AJAX',
      year: '2005 - web 2.0 interactive',
      icon: '🔄',
      brief: 'Asynchronous JavaScript And XML. Permet d\'échanger des données avec le serveur en arrière-plan sans rafraîchir la page complète.',
      impactTitle: 'La transition immédiate vers les Applications Web :',
      beforeText: 'Toute action (valider un message, filtrer un moteur de recherche, cliquer sur un menu) provoquait un flash blanc complet et un rechargement interminable de toute la page HTML.',
      revolutionPower: 'AJAX (utilisant l\'objet natif XMLHttpRequest d\'Internet Explorer, déterré ensuite par Gmail et Google Maps) a permis d\'interroger le serveur en coulisses de manière asynchrone pour mettre à jour chirurgicalement des portions isolées de l\'affichage.',
      afterText: 'Le Web s\'est fluidifié et est devenu comparable à une application de bureau. C\'est l\'étincelle qui a allumé la mèche du Web 2.0 moderne.',
      vintageCodeTitle: 'La syntaxe complexe XMLHttpRequest d\'origine :',
      vintageCode: `var xhr = new XMLHttpRequest();
xhr.open("GET", "/api/data", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var doc = xhr.responseXML;
        var name = doc.getElementsByTagName("user")[0].textContent;
        document.getElementById("output").innerHTML = "Bonjour " + name;
    }
};
xhr.send();`,
      modernCodeTitle: 'La syntaxe simplifiée moderne ES6 Fetch & JSON :',
      modernCode: `try {
  const response = await fetch('/api/data');
  const data = await response.json();
  document.getElementById("output").textContent = \`Bonjour \${data.username}\`;
} catch (err) {
  console.error("Échec du chargement :", err);
}`,
      technicalKeywords: ['XMLHttpRequest', 'Asynchronous JS', 'Gmail 2004', 'XML to JSON']
    },
    {
      id: 'css3',
      name: 'Le Big Bang CSS3 & Transitions',
      year: '2009 - visual liberation',
      icon: '🎨',
      brief: 'La fin des ruses infâmes (tableaux imbriqués, coins arrondis en GIFs découpés) au profit de transitions, ombres et animations matérielles gérées directement par le moteur graphique du navigateur.',
      impactTitle: 'La liberté graphique native sans concession :',
      beforeText: 'Des mises en page raides contraintes par des balises <table> détournées de leur but sémantique, des images d\'arrière-plan assemblées au pixel près et l\'absence de polices lisses.',
      revolutionPower: 'CSS3 a introduit la séparation absolue de la structure et du style enrichi : polices web universelles (@font-face), bordures arrondies natives, dégradés linéaires fluides, ombres portées et transitions matérielles exemptées de JavaScript.',
      afterText: 'Un code HTML sémantique pur, extrêmement léger, modulaire et hautement flexible pour les designers d\'interface.',
      vintageCodeTitle: 'Ruse d\'époque pour faire un bouton aminci à coins arrondis :',
      vintageCode: `<!-- Structure d'époque à cadres d'images en miettes -->
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td><img src="corner_top_left.gif"></td>
    <td background="border_top.gif">Bouton interactif</td>
    <td><img src="corner_top_right.gif"></td>
  </tr>
</table>`,
      modernCodeTitle: 'La pureté syntaxique de CSS3 / Tailwind :',
      modernCode: `/* CSS Standard propre */
.premium-button {
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #ec4899);
  transition: transform 0.2s ease, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}
.premium-button:hover {
  transform: translateY(-2px);
}`,
      technicalKeywords: ['CSS Transitions', 'Web Fonts', 'Hardware Acceleration', 'Rounded Corners']
    },
    {
      id: 'responsive',
      name: 'Le Responsive Web Design',
      year: '2010 - mobile unified layout',
      icon: '📱',
      brief: 'L\'unification de la Toile mobile grâce aux requêtes de médias (Media Queries) de CSS3 théorisées par Ethan Marcotte.',
      impactTitle: 'La fin du web mobile fragmenté :',
      beforeText: 'Des versions doublonnées dégradées et coûteuses (comme m.site.com) et des pincements de doigts répétitifs insupportables pour zoomer sur des colonnes de texte fixes destinées aux écrans de bureau.',
      revolutionPower: 'Responsive Web Design a introduit le concept de grille fluide, d\'images flexibles et de requêtes de médias CSS3 adaptant une unique et même page HTML à toutes les largeurs d\'appareils (du mobile de poche aux écrans larges d\'ordinateurs).',
      afterText: 'Un Web unique, fluide, accessible et inclusif indépendamment de l\'appareil de navigation de l\'utilisateur.',
      vintageCodeTitle: 'Ruse JS d\'orientation et redirection mobile d\'époque :',
      vintageCode: `<script type="text/javascript">
  if (screen.width <= 480) {
    // Redirige péniblement vers un sous-site mobile épuré artificiel
    window.location = "http://m.mon-site-vintage.com";
  }
</script>`,
      modernCodeTitle: 'La puissance des requêtes médias intégrées (Media Queries) :',
      modernCode: `/* Un seul layout flexible avec des points de rupture */
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* Mobile par défaut */
  gap: 16px;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes sur tablette/bureau */
  }
}`,
      technicalKeywords: ['Media Queries', 'Fluid Grids', 'Flexible Images', 'Ethan Marcotte']
    },
    {
      id: 'websockets',
      name: 'WebSockets, Mercure & Temps Réel',
      year: '2011+ - real-time push revolution',
      icon: '💬',
      brief: 'Fini le "Short Polling" (requête AJAX répétée toutes les 5 secondes). WebSockets ouvre un tunnel bidirectionnel permanent sans latence, tandis que Mercure unifie le push temps réel moderne basé sur HTTP/2 & Server-Sent Events (SSE).',
      impactTitle: 'Le Web actif et vivant instantanément :',
      beforeText: 'Le navigateur devait harceler constamment le serveur en AJAX toutes les quelques secondes pour voir si un nouveau message était disponible, écroulant la bande passante sous des requêtes HTTP superflues répétitives.',
      revolutionPower: 'Le protocole WebSocket (RFC 6455) offre une connexion TCP persistante full-duplex. Parallèlement, Mercure se présente comme l\'alternative moderne par excellence : il repose sur les Server-Sent Events (SSE) natifs et HTTP/2 ou HTTP/3. Avec Mercure Hub, pas besoin de serveurs de sockets complexes : le serveur pousse l\'information instantanément au client, gère l\'autorisation jwt, le reconnexion auto et le rattrapage de messages de façon native.',
      afterText: 'Une interactivité synchrone instantanée (jeux multijoueurs, clavardages, édition collaborative). Mercure permet de propager ce flux à chaud en respectant les standards du web et l\'authentification cookie/en-tête de façon ultra-performante.',
      vintageCodeTitle: 'Exemple de Short-Polling AJAX d\'époque (Harcèlement) :',
      vintageCode: `// Harcèlement du serveur toutes les 5 secondes
setInterval(function() {
  $.ajax({
    url: "/api/check-messages",
    success: function(newMessages) {
      if (newMessages.length > 0) {
        updateChatWindow(newMessages);
      }
    }
  });
}, 5000);`,
      modernCodeTitle: 'Abonnement Temps Réel moderne via Mercure Hub (SSE) :',
      modernCode: `// Connexion native au hub Mercure via EventSource (SSE)
const url = new URL('https://demo.mercure.rocks/.well-known/mercure');
url.searchParams.append('topic', 'https://mon-site.com/salon_discussions');

const eventSource = new EventSource(url);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  displayLiveMessage(data.text); // Réception en temps réel !
};

eventSource.onerror = (err) => {
  console.error("Erreur de reconnexion auto gérée par SSE :", err);
};`,
      technicalKeywords: ['RFC 6455 Sockets', 'Mercure Hub', 'Server-Sent Events', 'HTTP/3 Push', 'Dual channel Real-time']
    },
    {
      id: 'figma',
      name: 'Figma & Design Collaboratif',
      year: '2016 - WebGL & WebAssembly era',
      icon: '🎨',
      brief: 'Le passage de la création d\'interfaces graphiques hors-ligne lourdes (Photoshop, Sketch) à un design vectoriel multi-joueurs s\'exécutant en temps réel directement dans le navigateur.',
      impactTitle: 'La mort du fichier de design offline (.psd, .sketch) :',
      beforeText: 'Travailler sur Photoshop ou Sketch nécessitait des applications locales payantes et lourdes (souvent restreintes à macOS). Les fichiers .PSD de centaines de mégaoctets étaient partagés par email provoquant la naissance d\'innombrables doublons ("maquette_v2_finale_V3_retours_client_OK_PROD.psd") sans aucun travail d\'équipe synchrone.',
      revolutionPower: 'Figma a prouvé que la Toile web n\'avait plus à rougir devant le natif. En orchestrant WebGL pour le rendu de tracés vectoriels complexes à 60 fps, et WebAssembly (WASM) pour faire tourner à chaud du code d\'exécution C++ ultra-performant, Figma a libéré la co-conception instantanée, indépendamment de l\'OS de l\'utilisateur.',
      afterText: 'Une synergie immédiate entre design et intégration : un seul lien URL partagé sert de maquette, de prototype fluide et de documentation technique actualisée à la seconde près.',
      vintageCodeTitle: 'La gestion chaotique des fichiers locaux d\'époque :',
      vintageCode: `// Workflow traditionnel par email et dossiers réseau
[Projet_LandingPage]
 ├── maquette_accueil_v1.psd (420 Mo)
 ├── maquette_accueil_v2_retours_client.psd (455 Mo)
 ├── maquette_accueil_final.psd (480 Mo)
 └── maquette_accueil_final_v2_NE_PAS_TOUCHER.psd (482 Mo)`,
      modernCodeTitle: 'La puissance de Figma via le Web et WebGL/WASM :',
      modernCode: `<!-- Un seul lien d'accès partagé en temps réel -->
<iframe 
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/projet_historique"
  width="100%" 
  height="450" 
  allowfullscreen>
</iframe>`,
      technicalKeywords: ['WebGL performance', 'WebAssembly (WASM)', 'Real-time multiplayer design', 'CRDT synchronization']
    },
    {
      id: 'webassembly',
      name: 'WebAssembly (WASM)',
      year: '2017 - binary native speed',
      icon: '⚙️',
      brief: 'L\'arrivée d\'un format d\'instructions binaire portable à hautes performances, permettant d\'exécuter du code compilé (C, C++, Rust, Go) dans le navigateur à une vitesse proche du natif.',
      impactTitle: 'Performance native & calculs lourds déportés chez le client :',
      beforeText: 'Toutes les opérations scientifiques lourdes (retouche photo complexe, montage vidéo brut, modélisation 3D en direct, moteurs physiques de jeux) devaient obligatoirement s\'exécuter côté serveur au prix de factures d\'hébergement astronomiques et de latence réseau insupportable.',
      revolutionPower: 'WebAssembly permet de compiler des bases de code industrielles existantes en C/C++ ou Rust en un binaire compact exécuté par le moteur de machine virtuelle du navigateur par de véritables threads matériels parallèles. Les calculs lourds glissent ainsi du serveur vers le processeur direct du client.',
      afterText: 'Le navigateur devient un véritable système d\'exploitation d\'exécution autonome capable de faire tourner des logiciels professionnels mastodontes (Photoshop, AutoCAD, moteurs 3D Unreal Engine) avec zéro installation.',
      vintageCodeTitle: 'JavaScript d\'époque simulant laborieusement un calcul intensif (Monofil) :',
      vintageCode: `// Boucle JavaScript bloquant complètement l'interface utilisateur
function calculerPhysiqueLourde() {
  let mathResult = 0;
  for (let i = 0; i < 10000000; i++) {
    // Calcul bloquant sur un seul thread
    mathResult += Math.sin(i) * Math.cos(i);
  }
  return mathResult;
}`,
      modernCodeTitle: 'Exécution d\'un module binaire compilé Rust/C++ via WebAssembly :',
      modernCode: `// Chargement asynchrone ultra-rapide du binaire WASM
const wasmResponse = await fetch('/physics_engine.wasm');
const wasmModule = await WebAssembly.instantiateStreaming(wasmResponse);
const { calculer_physique_rust } = wasmModule.instance.exports;

// Exécution multithread à la vitesse du processeur local !
const result = calculer_physique_rust(10000000);`,
      technicalKeywords: ['Binary Instruction Format', 'Near-native speed', 'Rust / C++ compilation', 'Client-side heavy rendering']
    },
    {
      id: 'api',
      name: 'Les API et l\'Écosystème SaaS',
      year: '2005+ - The Service Era',
      icon: '🧩',
      brief: 'L\'abstraction du logiciel : Transformer le code complexe en services "Lego" consommables par de simples appels réseau sécurisés (REST/GraphQL).',
      impactTitle: 'L\'interconnexion et la démocratisation des services :',
      beforeText: 'Avant les API, installer un logiciel d\'entreprise signifiait acheter des serveurs, insérer un CD-ROM, et passer des mois à configurer le tout en local.',
      revolutionPower: 'La spécialisation extrême (Stripe, Twilio, SendGrid) et le modèle économique à l\'usage ont transformé le code en commodité, permettant des intégrations en 5 minutes. Les clés API identifient précisément les appels, démocratisant l\'accès à des technologies surpuissantes pour les start-ups. Au lieu de réinventer la roue (cartographier le monde, envoyer des mails), on branche des services tiers, enrichissant instantanément les fonctionnalités avec des données globales.',
      afterText: 'Une émancipation totale du Front-End : L\'ère du Headless et du BaaS permet de découpler totalement la logique métier du rendu. La base de données est abstraite derrière des routes d\'API, sécurisant l\'étanchéité entre le client et les données tout en rendant le développement universel pour Web, iOS et Android.',
      vintageCodeTitle: 'La complexité avant les API (Gestion locale) :',
      vintageCode: `// Avant, on devait coder tout le système complexe...
function verifierPaiementLocal(montant) {
  // Gérer base de données, sécurité serveur, protocoles bancaires...
  // Des milliers de lignes de code critiques à maintenir !
}`,
      modernCodeTitle: 'La simplicité moderne (API REST en Front) :',
      modernCode: `// En React, la base de données est résumée à une simple URL
useEffect(() => {
  fetch('https://api.villes.fr/communes?codePostal=75000', {
    headers: { 'Authorization': \`Bearer \${process.env.REACT_APP_API_KEY}\` }
  })
  .then(res => res.json())
  .then(data => setVilles(data));
}, []);`,
      technicalKeywords: ['SaaS', 'REST', 'GraphQL', 'Stripe', 'Twilio', 'BaaS', 'Headless CMS']
    },
    {
      id: 'saas',
      name: 'Les SaaS : Logiciel disponible même sur la Lune',
      year: '2013+ - Cloud-software era',
      icon: '☁️',
      brief: 'L\'externalisation complète du logiciel : plus d\'installation locale pénible, vos applications s\'exécutent et stockent leurs données à chaud dans le nuage, accessibles depuis n\'importe quel navigateur sur Terre (ou dans l\'espace).',
      impactTitle: 'La mort de la disquette de licence d\'utilisation :',
      beforeText: 'L\'achat de licences physiques (boîtes Windows, packs Office en CD-ROM, disquettes de serveurs). Chaque mise à jour exigeait de racheter une version complète ou d\'installer un patch obscur.',
      revolutionPower: 'Le Logiciel en tant que Service (SaaS). Grâce à des API unifiées, des infrastructures serveurs conteneurisées (Docker/Kubernetes) et l\'ubiquité du haut débit, l\'utilisateur s\'abonne à un service distant accessible par simple login. Le navigateur n\'est plus un simple visualisateur mais le terminal d\'accueil d\'un ordinateur planétaire partagé.',
      afterText: 'Une agilité commerciale sans précédent pour les entreprises et les particuliers : des déploiements instantanés, des corrections de bugs transparentes en temps réel, et la fin définitive de la maintenance matérielle locale.',
      vintageCodeTitle: 'La méthode d\'époque : Clé produit certifiée en local chez le client :',
      vintageCode: `// Vérification locale d'une clé de licence physique (CD-ROM)
function validerCleUnique(licenceUser) {
  const cleDure = "XXXX-1234-ABCD-9999";
  if (licenceUser === cleDure) {
    this.debloquerLogiciel(); // Facile à pirater en mémoire ou via patch
    return true;
  }
  return false;
}`,
      modernCodeTitle: 'Équivalent d\'une vérification d\'autorisation SaaS Cloud (REST API + Stripe JWT) :',
      modernCode: `// Appel d'API sécurisé pour vérifier l'abonnement actif dans le Cloud
async function checkSaaSSubscription(userToken) {
  const res = await fetch('https://api.mon-saas.com/v1/billing/status', {
    headers: { 'Authorization': \`Bearer \${userToken}\` }
  });
  const status = await res.json();
  // Sécurité hébergée dans le Cloud, totalement infalsifiable côté client
  return status.plan === 'enterprise' && status.active;
}`,
      technicalKeywords: ['SaaS', 'Cloud Hosting', 'Subscription model', 'Multi-tenant', 'Stripe API']
    },
    {
      id: 'docker',
      name: 'Docker : La Conteneurisation',
      year: '2013+ - L\'ère des conteneurs',
      icon: '🐳',
      brief: 'L\'isolation logicielle totale : Packager une application et toutes ses dépendances dans un conteneur standardisé, garantissant qu\'elle s\'exécute exactement de la même manière partout.',
      impactTitle: 'Le "Write Once, Run Anywhere" :',
      beforeText: 'Avant Docker, les environnements de développement et de production différaient souvent, menant au fameux problème : "ça marche sur ma machine !".',
      revolutionPower: 'Docker permet de packager le code avec son runtime, ses librairies et ses configurations dans un conteneur léger. Cela offre une portabilité totale : le conteneur fonctionne sur n\'importe quel OS hôte compatible, éliminant les conflits de dépendances.',
      afterText: 'Une standardisation absolue du déploiement : les applications deviennent des composants interchangeables, facilitant la gestion de micro-services complexes.',
      vintageCodeTitle: 'Le chaos des dépendances locales :',
      vintageCode: `// Exemple : Installation manuelle (conflit de version probable)
sudo apt-get install python=2.7
// Si le serveur a besoin d'une version différente... conflit !`,
      modernCodeTitle: 'Le standard Dockerfile :',
      modernCode: `FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`,
      technicalKeywords: ['Docker', 'Containers', 'Infrastructure as Code', 'Microservices', 'Portability']
    },
    {
      id: 'composer',
      name: 'Composer : Le Chef d\'orchestre PHP',
      year: '2012+ - La standardisation PHP',
      icon: '🎼',
      brief: 'L\'outil de gestion des dépendances par excellence pour PHP, structurant les projets via composer.json et le dossier vendor.',
      impactTitle: 'La maturité de l\'écosystème PHP :',
      beforeText: 'Avant Composer, l\'inclusion manuelle de bibliothèques téléchargées par FTP était la norme, rendant les mises à jour et les dépendances cauchemardesques.',
      revolutionPower: 'Composer automatise tout : il télécharge les bibliothèques, gère leurs propres dépendances et crée un autoloader performant (chargement automatique des classes). Le fichier composer.json définit tout le projet.',
      afterText: 'PHP a rattrapé son retard, permettant de construire des architectures robustes et modulaires, pilier des frameworks modernes comme Symfony ou Laravel.',
      vintageCodeTitle: 'La gestion manuelle (le chaos des includes) :',
      vintageCode: `// Avant : inclusion manuelle de chaque fichier...
require_once 'lib/dossier/classeA.php';
require_once 'lib/dossier/classeB.php';`,
      modernCodeTitle: 'L\'élégance de Composer :',
      modernCode: `// composer.json définit les dépendances
require 'vendor/autoload.php';
$log = new Monolog\Logger('name');`,
      technicalKeywords: ['PHP', 'Composer', 'Dependencies', 'Autoloading', 'vendor']
    }
  ];

  const activeRev = revolutions.find(r => r.id === activeRevId) || revolutions[1];

  // Simulated live AJAX Action handler
  const simulateAjax = () => {
    setAjaxStatus('loading');
    setTimeout(() => {
      setAjaxStatus('success');
    }, 1200);
  };

  // Simulated Poll Action handler
  const addPollMessage = () => {
    const timestamp = new Date().toLocaleTimeString().substring(3, 8);
    setPollMessages(prev => [
      ...prev,
      `[${timestamp}] Client : requête AJAX répétée... (HTTP GET)`,
      `[${timestamp}] Serveur : Aucune nouvelle donnée (Statut 200 - 0 octets transmis)`
    ]);
  };

  // Simulated WS message send
  const sendWsMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString().substring(3, 8);
    setWsMessages(prev => [
      ...prev,
      `[${timestamp}] Client : ${wsInput} ➔ (Poussé instantanément)`,
      `[${timestamp}] Réponse Serveur : Bien reçu ! Aucun en-tête HTTP d\'enveloppe.`
    ]);
    setWsInput('');
  };

  const getThemeCSS = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-4 rounded-none',
          btnActive: 'bg-[#000080] text-white font-bold p-3 border border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none flex items-center justify-between',
          preBox: 'bg-white border-2 border-inset border-[#808080] p-3 text-[11px] font-mono text-black overflow-x-auto leading-normal',
          interactiveBox: 'bg-[#ffffcc] border-2 border-inset border-[#808080] p-4 text-black text-xs space-y-2'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
          preBox: 'bg-[#070707] border border-[#ffb000]/25 p-3 text-[11px] font-mono text-[#ffb000] overflow-x-auto leading-normal',
          interactiveBox: 'bg-black border border-[#ffb000]/40 p-4 text-[#ffb000] text-xs space-y-2'
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-5',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600/15 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
          preBox: 'bg-[#08080a] border border-slate-800 p-3.5 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-normal shadow-inner',
          interactiveBox: 'bg-slate-950/40 border border-slate-800 p-4 rounded-xl space-y-3'
        };
    }
  };

  const css = getThemeCSS();

  return (
    <div className="space-y-6 animate-fadeIn" id="web-revolutions-root">
      
      {/* Upper header segment */}
      <div className={`${theme === 'ie6' ? 'bg-[#000080] text-white p-2 border-b border-white' : theme === 'terminal' ? 'bg-[#ffb000]/10 border border-[#ffb000]/40 text-[#ffb000] p-2 font-mono' : 'bg-gradient-to-r from-emerald-950/20 to-slate-900 border border-slate-750 p-4 rounded-xl'} flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Les Grandes Révolutions de la Toile (1996 - Présent)</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Explorez les technologies clés qui ont arraché le Web à son immobilité d'intranet universitaire.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left selection Sidebar (4 width) */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            🔮 Sélectionner l'Ère révolutionnaire :
          </span>
          <div className="flex flex-col gap-2">
            {revolutions.map((rev) => {
              const isActive = rev.id === activeRevId;
              return (
                <button
                  key={rev.id}
                  onClick={() => setActiveRevId(rev.id)}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-rev-${rev.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-lg shrink-0 select-none">{rev.icon}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{rev.name}</b>
                      <span className="text-[9px] opacity-70 font-mono block">
                        Lancement : {rev.year}
                      </span>
                    </div>
                  </div>
                  <TrendingUp className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400 rotate-45' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3 bg-slate-950/20 border border-slate-850/60 text-[10px] text-slate-450 leading-relaxed text-left">
            <h5 className="font-extrabold uppercase flex items-center gap-1 text-slate-350 text-[9px] mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Sceau Didactique
            </h5>
            Toutes ces technologies ont brisé des goulots d'étranglement cruciaux d'ergonomie et ont transformé les "lecteurs" passifs d'informations en "acteurs" interactifs.
          </div>
        </div>

        {/* Right exhibition content sheet (8 width) */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {/* Upper line metadata */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/40 pb-3 text-left gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeRev.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{activeRev.name}</h3>
                  <span className="text-[9px] font-mono opacity-70">R évolution majeure d'Époque</span>
                </div>
              </div>
              <span className="text-[10px] mt-0.5 px-2 py-0.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-md font-mono uppercase font-bold">
                Impact : {activeRev.year}
              </span>
            </div>

            {/* Exposition sheet details */}
            <div className={css.innerCard}>
              <div className="text-left leading-relaxed text-slate-200">
                <p className="text-xs bg-indigo-950/10 p-3 rounded-lg border border-indigo-500/10 italic">
                  "{activeRev.brief}"
                </p>
              </div>

              {/* Before and After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-left">
                {/* Before */}
                <div className="p-3.5 bg-rose-950/5 border border-rose-500/10 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
                    💀 L'Ancien Web Préhistorique :
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeRev.beforeText}
                  </p>
                </div>

                {/* After / Power */}
                <div className="p-3.5 bg-emerald-950/5 border border-emerald-500/10 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                    🌟 L'Essor et la Force Active :
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeRev.revolutionPower}
                  </p>
                </div>
              </div>

              {/* Legacy summary tag */}
              <div className="p-3 bg-slate-950/45 border border-slate-850 rounded-lg text-xs text-left">
                <strong className="block text-[9.5px] font-mono text-amber-500 uppercase mb-1">🏁 L'impact sémantique d'après-coup :</strong>
                <p className="text-slate-200">
                  {activeRev.afterText}
                </p>
              </div>

              {/* Interactivity demo for ajax / websockets */}
              {activeRevId === 'ajax' && (
                <div className={css.interactiveBox}>
                  <strong className="block text-[10px] uppercase font-mono text-emerald-400 mb-1">🎮 Module Bac à sable AJAX (Simulateur) :</strong>
                  <p className="text-slate-300 mb-2">Simulez une mise à jour d'élément asynchrone sans relancement général de la page HTML :</p>
                  
                  <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                    <button
                      onClick={simulateAjax}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs transition cursor-pointer"
                    >
                      {ajaxStatus === 'loading' ? 'Interrogation du serveur...' : 'Lancer Requête AJAX'}
                    </button>
                    
                    <div className="text-xs">
                      {ajaxStatus === 'idle' && <span className="text-slate-400 font-mono">Prêt (Aucune requête en cours)</span>}
                      {ajaxStatus === 'loading' && <span className="text-amber-400 font-mono flex items-center gap-1 animate-pulse"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> xhr.send()...</span>}
                      {ajaxStatus === 'success' && <span className="text-emerald-400 font-mono font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Succès ! Contenu injecté à chaud : "Session ID active"</span>}
                    </div>
                  </div>
                </div>
              )}

              {activeRevId === 'jeux_en_ligne' && (
                <div className={css.interactiveBox}>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 flex-wrap gap-2 text-left">
                    <strong className="text-[10px] uppercase font-mono text-amber-500 font-extrabold flex items-center gap-1.5">
                      ⚔️ Simulateur Tactique d'Époque : "Dofus Arena" (Simulateur)
                    </strong>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] text-slate-400">Technologie active :</span>
                      <button
                        onClick={() => setDofusTech(dofusTech === 'flash' ? 'html5_unity' : 'flash')}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition cursor-pointer border ${
                          dofusTech === 'flash' 
                            ? 'bg-amber-955/40 border-amber-500/50 text-amber-400' 
                            : 'bg-emerald-955/40 border-emerald-500/50 text-emerald-400'
                        }`}
                      >
                        {dofusTech === 'flash' ? '🎬 Macromedia Flash Player (SWF v8)' : '🚀 HTML5 / Canvas WebGL (Moderne)'}
                      </button>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-350 leading-relaxed mb-3 text-left">
                    Pour honorer le MMORPG d'Ankama, simulez les affrontements au tour par tour d'époque. Cliquez sur une case adjacente à votre personnage <span className="text-amber-400 font-bold">Iop 🧑‍🦰</span> pour vous déplacer, ou utilisez les sorts :
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Tactical Grid (Isometric simulation using orthogonal divs) */}
                    <div className="md:col-span-7 flex flex-col items-center">
                      <div className="grid grid-cols-5 gap-1.5 p-3.5 bg-slate-950/80 rounded-xl border border-slate-850 relative">
                        {/* Custom background color to match Flash vs Canvas flavor */}
                        {dofusTech === 'flash' && (
                          <div className="absolute inset-x-0 top-0 text-[8px] font-mono text-amber-500/30 text-center uppercase tracking-wider py-0.5 select-none">
                            Adobe Flash Player 8.0 - Rendu Vectoriel 24 FPS
                          </div>
                        )}
                        {dofusTech === 'html5_unity' && (
                          <div className="absolute inset-x-0 top-0 text-[8px] font-mono text-emerald-500/30 text-center uppercase tracking-wider py-0.5 select-none">
                            WebGL 2.0 Engine - 60 FPS GPU Accelerated
                          </div>
                        )}
                        
                        {Array.from({ length: 25 }).map((_, idx) => {
                          const isPlayer = idx === iopCell;
                          const isMonster = idx === 8;
                          const isWalkable = !isMonster && !isPlayer;
                          const row = Math.floor(idx / 5);
                          const col = idx % 5;
                          const pRow = Math.floor(iopCell / 5);
                          const pCol = iopCell % 5;
                          // Distance calculation (Manhattan distance for adjacent moves)
                          const distance = Math.abs(row - pRow) + Math.abs(col - pCol);
                          const isAdjacent = distance === 1;

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (isMonster) {
                                  setIopLogs(prev => [...prev, "💥 Ciblez le monstre avec le sort 'Pression' !"]);
                                } else if (isAdjacent) {
                                  moveIop(idx);
                                } else {
                                  setIopLogs(prev => [...prev, "❌ Hors de portée de déplacement (1 case max par action)"]);
                                }
                              }}
                              className={`w-10 h-10 rounded flex flex-col items-center justify-center transition relative ${
                                isPlayer 
                                  ? 'bg-amber-500/20 border-2 border-amber-500 shadow shadow-amber-500/50' 
                                  : isMonster 
                                  ? 'bg-rose-600/30 border-2 border-rose-500 animate-pulse' 
                                  : isAdjacent && iopMP > 0
                                  ? 'bg-indigo-900/30 hover:bg-indigo-800/40 border border-indigo-500/40 cursor-pointer animate-pulse'
                                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
                              }`}
                              title={`Cellule ${idx}`}
                            >
                              <span className="text-[7.5px] font-mono text-slate-550 absolute top-0.5 left-1 select-none">
                                {idx}
                              </span>
                              {isPlayer && <span className="text-sm">🧑‍🦰</span>}
                              {isMonster && <span className="text-sm">🐑</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Stats view */}
                      <div className="flex gap-4 mt-2.5 text-[11px] font-mono bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-850 w-full justify-around">
                        <span className="flex items-center gap-1">
                          🟢 <b>Cell :</b> {iopCell}
                        </span>
                        <span className="flex items-center gap-1 text-sky-400">
                          🔵 <b>{iopAP} PA</b>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          🏃 <b>{iopMP} PM</b>
                        </span>
                      </div>
                    </div>

                    {/* Action buttons and Combat log (5 width) */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5 text-left">
                        <span className="text-[9px] uppercase font-mono text-slate-400 font-extrabold block">
                          📖 Journal de combat :
                        </span>
                        <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg h-32 overflow-y-auto space-y-1 text-[9.5px] font-mono text-slate-350 leading-relaxed max-w-full">
                          {iopLogs.slice(-6).map((log, lIdx) => (
                            <div 
                              key={lIdx} 
                              className={log.includes('sort') || log.includes('💥') ? 'text-amber-400 font-semibold' : log.includes('❌') ? 'text-rose-450' : 'text-slate-350'}
                            >
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={castIopSpell}
                          className="py-1.5 px-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-bold shadow-md cursor-pointer transition flex items-center justify-center gap-1 uppercase"
                        >
                          💥 Sort "Pression" (3 PA)
                        </button>
                        <button
                          onClick={endTurn}
                          className="py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold shadow-md cursor-pointer transition flex items-center justify-center gap-1 uppercase"
                        >
                          🔄 Finir le Tour
                        </button>
                      </div>

                      <button
                        onClick={resetCombat}
                        className="py-1 w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-450 hover:text-slate-300 rounded text-[9px] font-mono cursor-pointer transition"
                      >
                        [Réinitialiser le Combat]
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {activeRevId === 'websockets' && (
                <div className={css.interactiveBox}>
                  <strong className="block text-[10px] uppercase font-mono text-[#8f9bff] mb-1">🎮 Clavardage en "Temps Réel" (Sockets vs Polling) :</strong>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Polling container */}
                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[9.5px] uppercase font-mono text-red-400 font-bold">Harceleur d'époque (Polling)</span>
                        <div className="text-[10px] font-mono text-slate-400 max-h-32 overflow-y-auto space-y-1 leading-snug">
                          {pollMessages.slice(-4).map((msg, idx) => (
                            <div key={idx} className={msg.includes('Client') ? 'text-slate-350' : 'text-rose-400/80'}>{msg}</div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={addPollMessage}
                        className="mt-3 w-full py-1 bg-rose-950/30 hover:bg-rose-900/30 text-rose-300 border border-rose-500/20 rounded text-[10px] tracking-tight cursor-pointer"
                      >
                        Harcéler le Serveur (Lancer Poll)
                      </button>
                    </div>

                    {/* Websocket real push container */}
                    <div className="p-3 bg-slate-950/40 border border-slate-00 rounded-lg flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[9.5px] uppercase font-mono text-emerald-400 font-bold">Tunnel Persistant (WebSocket)</span>
                        <div className="text-[10px] font-mono text-slate-400 max-h-32 overflow-y-auto space-y-1 leading-snug">
                          {wsMessages.slice(-4).map((msg, idx) => (
                            <div key={idx} className={msg.includes('Client') ? 'text-indigo-400' : 'text-emerald-400'}>{msg}</div>
                          ))}
                        </div>
                      </div>
                      
                      <form onSubmit={sendWsMessage} className="mt-2 flex gap-1.5">
                        <input
                          type="text"
                          value={wsInput}
                          onChange={(e) => setWsInput(e.target.value)}
                          placeholder="Écrire..."
                          className="flex-1 bg-slate-900 border border-slate-750 text-xs text-white px-2 py-0.5 rounded focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] cursor-pointer"
                        >
                          Push
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeRevId === 'figma' && (
                <div className={css.interactiveBox}>
                  <div className="flex items-center justify-between">
                    <strong className="block text-[10px] uppercase font-mono text-indigo-400 mb-1">🎮 Simulateur de Table de Conception Collaborative (Figma WebGL) :</strong>
                    <div className="flex gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => addFigmaShape('rect')}
                        className="px-2 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 rounded text-[9.5px] cursor-pointer"
                      >
                        + Rectangle
                      </button>
                      <button
                        type="button"
                        onClick={() => addFigmaShape('circle')}
                        className="px-2 py-1 bg-rose-600/30 text-rose-300 border border-rose-500/30 hover:bg-rose-600/50 rounded text-[9.5px] cursor-pointer"
                      >
                        + Cercle
                      </button>
                      <button
                        type="button"
                        onClick={() => addFigmaShape('triangle')}
                        className="px-2 py-1 bg-amber-600/30 text-amber-300 border border-amber-500/30 hover:bg-amber-600/50 rounded text-[9.5px] cursor-pointer"
                      >
                        + Triangle
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
                    Cliquez sur les boutons pour ajouter des éléments vectoriels complexes. Observez la fluidité WebGL et les collaborateurs fictifs qui ajustent le projet simultanément !
                  </p>

                  <div className="relative w-full h-40 bg-slate-950 border border-slate-850 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                    {/* SVG grid background for high fidelity blueprint design */}
                    <div className="absolute inset-0 bg-[radial-gradient(#2a2a35_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                    {/* Shapes */}
                    {figmaShapes.map((shape) => (
                      <div
                        key={shape.id}
                        className="absolute flex items-center justify-center cursor-move"
                        style={{
                          left: `${shape.x}px`,
                          top: `${shape.y}px`,
                          width: '45px',
                          height: '45px',
                          color: shape.color,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {shape.type === 'rect' && (
                          <div className="w-full h-full border-2 opacity-80" style={{ borderColor: shape.color, backgroundColor: `${shape.color}15` }} />
                        )}
                        {shape.type === 'circle' && (
                          <div className="w-full h-full rounded-full border-2 opacity-80" style={{ borderColor: shape.color, backgroundColor: `${shape.color}15` }} />
                        )}
                        {shape.type === 'triangle' && (
                          <div className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[40px] opacity-80" style={{ borderBottomColor: shape.color }} />
                        )}
                        <span className="absolute text-[8px] font-mono opacity-60 uppercase tracking-tighter" style={{ color: shape.color }}>
                          {shape.type}
                        </span>
                      </div>
                    ))}

                    {/* Collaborative Real-time Cursors moving around */}
                    {collaboratorUsers.map((user) => (
                      <div
                        key={user.id}
                        className="absolute pointer-events-none flex items-center gap-1.5"
                        style={{
                          left: `${user.x}px`,
                          top: `${user.y}px`,
                          transition: 'left 1.2s ease-in-out, top 1.2s ease-in-out',
                          zIndex: 30
                        }}
                      >
                        <MousePointer2 className="w-4 h-4 shrink-0 drop-shadow" style={{ color: user.color, fill: user.color }} />
                        <span className="text-[8px] px-1.5 py-0.5 rounded text-white font-mono font-bold whitespace-nowrap shadow-sm" style={{ backgroundColor: user.color }}>
                          {user.name}
                        </span>
                      </div>
                    ))}

                    <span className="absolute bottom-2 right-2 text-[8.5px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/25 px-1.5 py-0.5 rounded">
                      🟢 {collaboratorUsers.length + 1} Actifs sur le projet
                    </span>
                  </div>
                </div>
              )}

              {activeRevId === 'api' && (
                <div className={css.interactiveBox}>
                  <strong className="block text-[10px] uppercase font-mono text-indigo-400 mb-1">🔗 Simulateur de Clé API : Échange de données</strong>
                  <p className="text-slate-300 text-xs mb-3">Visualisez l'échange entre une clé d'accès et une réponse JSON sécurisée :</p>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 flex flex-col gap-3 font-mono text-[10px] overflow-hidden">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex gap-2 bg-slate-900 p-2 rounded border border-indigo-900/50"
                    >
                      <span className="text-indigo-400">Request:</span>
                      <span className="text-slate-300 truncate">GET /api/recipes/1?key=sk_live_...</span>
                    </motion.div>

                    <button
                      onClick={() => setSaasLogs(l => [...l, '📡 API : Clé validée, réponse JSON reçue !'])}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded cursor-pointer uppercase font-bold"
                    >
                      Appeler API
                    </button>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-500/20"
                    >
                      Response: {'{ "status": "success", "data": "Recette des cookies" }'}
                    </motion.div>
                  </div>
                </div>
              )}

              {activeRevId === 'saas' && (
                <div className={css.interactiveBox}>
                  <div className="flex items-center justify-between border-b border-slate-800/40 pb-2 mb-2 flex-wrap gap-2 text-left">
                    <strong className="block text-[10px] uppercase font-mono text-indigo-400 mb-1">
                      🌌 Console Multi-Nœuds SaaS : Liaison Terrestre & Spatiale (Lunaire)
                    </strong>
                    <button
                      onClick={triggerSaasSync}
                      disabled={isSyncing}
                      className={`px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold rounded text-[10px] transition cursor-pointer font-mono uppercase`}
                    >
                      {isSyncing ? "⚡ Synchronisation..." : "📡 Synchroniser tout à chaud"}
                    </button>
                  </div>

                  <p className="text-[10.5px] text-slate-400 mb-3 leading-relaxed text-left">
                    Gérez et déployez votre logiciel SaaS dans des recoins inexplorés ! Activez le nœud de relais de l'ISS ou de la Base Artemis sur la Lune pour simuler à quel point les API Cloud gèrent la réplication asynchrone universelle de vos données de navigation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {saasNodes.map(node => (
                      <div 
                        key={node.id} 
                        className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                          node.active 
                            ? 'bg-indigo-950/25 border-indigo-500/35 shadow-sm shadow-indigo-550/10' 
                            : 'bg-slate-950/50 border-slate-850 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-slate-200">{node.name}</span>
                            <span className={`w-2 h-2 rounded-full ${node.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
                          </div>
                          
                          <div className="space-y-1 text-[10px] font-mono text-slate-400">
                            <div>📶 Latence : <span className="text-indigo-400">{node.latency}</span></div>
                            <div>📊 Charge : <span className="text-slate-300">{node.active ? `${node.load}%` : 'HORS LIGNE'}</span></div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaasNode(node.id)}
                          className={`mt-3 py-1 px-1.5 rounded text-[9.5px] font-bold font-mono transition cursor-pointer text-center uppercase ${
                            node.active 
                              ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/40 border border-rose-500/20' 
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                          }`}
                        >
                          {node.active ? "🔴 Fermer" : "🟢 Déployer"}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Terminal log for syncing output */}
                  <div className="mt-3 text-left">
                    <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block mb-1">
                      Terminaux de Synchronisation Multi-Nœuds (Logs) :
                    </span>
                    <div className="bg-[#040406] border border-slate-850 p-2.5 rounded-lg h-28 overflow-y-auto space-y-1 text-[9.5px] font-mono text-slate-350 max-w-full">
                      {saasLogs.map((log, lIdx) => (
                        <div 
                          key={lIdx} 
                          className={log.includes('SUCCESS') || log.includes('Lunaire') ? 'text-emerald-400 font-bold' : log.includes('Satellite') || log.includes('Orbite') ? 'text-sky-400' : log.includes('⚠️') || log.includes('Retrait') ? 'text-amber-400' : 'text-slate-350'}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeRevId === 'docker' && (
                <div className={css.interactiveBox}>
                  <strong className="block text-[10px] uppercase font-mono text-sky-400 mb-1">🐳 Simulateur Docker : Conteneurisation</strong>
                  <p className="text-slate-400 text-xs mb-3">Cliquez pour créer un conteneur et isoler une application. Chaque conteneur possède ses propres librairies et dépendances.</p>
                  <button 
                    onClick={() => setSaasLogs(l => [...l, '🐳 Docker : Conteneur créé avec succès ! Isolation confirmée.'])}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs transition cursor-pointer font-mono"
                  >
                    docker run -d my-app
                  </button>
                </div>
              )}

              {activeRevId === 'composer' && (
                <div className={css.interactiveBox}>
                  <strong className="block text-[10px] uppercase font-mono text-amber-400 mb-1">🎼 Composer : Gestion des dépendances</strong>
                  <p className="text-slate-400 text-xs mb-3">Simulez l'installation des dépendances définies dans votre fichier <code>composer.json</code>.</p>
                  <button 
                    onClick={() => setSaasLogs(l => [...l, '🎼 Composer : Installation des packages dans le dossier /vendor... Succès !'])}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs transition cursor-pointer font-mono"
                  >
                    composer install
                  </button>
                </div>
              )}

            </div>

            {/* Code comparator panels representing the evolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-left select-all">
              {/* Before Code Block */}
              <div className="space-y-1">
                <span className="text-[10.5px] font-mono font-bold text-rose-400 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5" /> {activeRev.vintageCodeTitle}
                </span>
                <pre className={css.preBox}>
                  {activeRev.vintageCode}
                </pre>
              </div>

              {/* After Code Block */}
              <div className="space-y-1">
                <span className="text-[10.5px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5" /> {activeRev.modernCodeTitle}
                </span>
                <pre className={css.preBox}>
                  {activeRev.modernCode}
                </pre>
              </div>
            </div>

            {/* Keyword tags and Share elements */}
            <div className="pt-2 border-t border-slate-800/40 text-left space-y-3">
              <div className="flex flex-wrap gap-1.5 font-sans">
                {activeRev.technicalKeywords.map((tag, tagIdx) => (
                  <span key={tagIdx}>
                    <GlossaryTooltip term={tag}>
                      <span 
                        className="text-[9.5px] font-mono bg-indigo-950/30 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded block cursor-help font-bold"
                      >
                        🚀 #{tag}
                      </span>
                    </GlossaryTooltip>
                  </span>
                ))}
              </div>

              <ShareButtons
                theme={theme}
                title={`Musée du Web — Révolution: ${activeRev.name}`}
                text={`Découvrez comment ${activeRev.name} en ${activeRev.year} a propulsé le World Wide Web vers le futur au Musée du Web.`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
