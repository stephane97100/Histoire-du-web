/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Skull, 
  Flame, 
  HelpCircle, 
  Cpu, 
  History, 
  Shuffle, 
  Share2, 
  Compass, 
  Sparkles, 
  X, 
  AlertOctagon, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Terminal,
  FileText
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface CemeteryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface Relic {
  id: string;
  name: string;
  icon: string;
  birthYear: string;
  deathYear: string;
  epitaph: string;
  summary: string;
  whyItRuled: string;
  whyItDiedHtml: string; // contains the beautiful technical reasons requested by the user
  modernSuccessor: string;
  retroAnecdote: string;
  specials: string[]; // tags like 'Microsoft', 'OpenSource Duel', etc.
  category?: string;
}

const categoryMapping: Record<string, 'portals' | 'communities' | 'technologies' | 'tools' | 'farwest'> = {
  netscape: 'portals',
  aol: 'portals',
  yahoo: 'portals',
  lycos_standalone: 'portals',
  altavista: 'portals',
  voila_portal: 'portals',
  icq: 'communities',
  caramail: 'communities',
  myspace: 'communities',
  skyblog: 'communities',
  geocities: 'communities',
  multimania_standalone: 'communities',
  perso_hosts: 'communities',
  yahoo_answers: 'communities',
  flash: 'technologies',
  applets: 'technologies',
  activex: 'technologies',
  cgi: 'technologies',
  dhtml: 'technologies',
  asp: 'technologies',
  coldfusion: 'technologies',
  xml: 'technologies',
  frontpage: 'tools',
  golive: 'tools',
  dreamweaver: 'tools',
  easyphp: 'tools',
  siteduzero: 'tools',
  allhtml: 'tools',
  hijackthis: 'tools',
  napster: 'farwest',
  megaupload: 'farwest',
  telecharger: 'farwest',
  jeuxflash: 'farwest',
  koreus: 'farwest',
  habbo: 'farwest',
  ibazar: 'farwest'
};

const orderedIds = [
  'netscape', 'aol', 'yahoo', 'lycos_standalone', 'altavista', 'voila_portal',
  'icq', 'caramail', 'myspace', 'skyblog', 'geocities', 'multimania_standalone', 'perso_hosts', 'yahoo_answers',
  'flash', 'applets', 'activex', 'cgi', 'dhtml', 'asp', 'coldfusion', 'xml',
  'frontpage', 'golive', 'dreamweaver', 'easyphp', 'siteduzero', 'allhtml', 'hijackthis',
  'napster', 'megaupload', 'telecharger', 'jeuxflash', 'koreus', 'habbo', 'ibazar'
];

const categoriesList = [
  { id: 'portals', label: "Portails & Navs", icon: "🌐" },
  { id: 'communities', label: "Communautés", icon: "💬" },
  { id: 'technologies', label: "Technologies", icon: "⚙️" },
  { id: 'tools', label: "Outils & Tutos", icon: "🛠️" },
  { id: 'farwest', label: "Far West", icon: "🤠" }
] as const;

export default function CemeteryView({ theme }: CemeteryViewProps) {
  const [activeRelicId, setActiveRelicId] = useState<string>('netscape');
  const [activeSubMenu, setActiveSubMenu] = useState<'portals' | 'communities' | 'technologies' | 'tools' | 'farwest'>('portals');
  const [hoveredRelicId, setHoveredRelicId] = useState<string | null>(null);

  // Interactive data for "Le Cimetière du Web"
  const relics: Relic[] = [
    {
      id: 'hijackthis',
      name: 'HijackThis',
      icon: '🛡️',
      birthYear: '2003',
      deathYear: 'Encore utilisé par les experts',
      epitaph: 'Ci-gît le diagnostic ultime des systèmes Windows infestés, dont les rapports textuels étaient scrutés par des milliers de mains expertes sur les forums d\'entraide.',
      summary: 'HijackThis (développé par Merijn Bellekom) est un outil de diagnostic gratuit capable de scanner les zones de Windows fréquemment modifiées par les malwares (registres, processus, extensions navigateur).',
      whyItRuled: 'À l\'ère où les malwares et les barres d\'outils intrusives (Adware) s\'installaient par dizaines, HijackThis fournissait un rapport textuel complet et cryptique. Ce rapport était la clé du salut : les utilisateurs le collaient sur des forums spécialisés (comme Zebulon, Malekal, ou les forums GeeksToGo), où des experts bénévoles, en un coup d\'œil, identifiaient la ligne malicieuse et guidaient l\'utilisateur pour la supprimer. C\'était l\'apogée de l\'entraide communautaire contre la cybercriminalité.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le rôle d'HijackThis a évolué avec la sécurisation native de Windows :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Sécurisation accrue de Windows :</strong> Avec Windows 7, 8, et surtout 10/11, les contrôles de compte d'utilisateur (UAC) et la protection native de Windows Defender ont drastiquement réduit la surface d'attaque classique des adwares.</li>
          <li><strong class="text-indigo-400">Automatisation des outils de désinfection :</strong> Des outils comme Malwarebytes ou AdwCleaner ont automatisé la détection et la suppression, rendant inutile l'analyse manuelle par un expert humain sur un forum.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Malwarebytes, AdwCleaner, Windows Defender, et les antivirus modernes automatisés.',
      retroAnecdote: 'Le terme "poster son rapport HijackThis" était le passage obligé pour tout utilisateur qui voyait sa page d\'accueil de navigateur modifiée ou des pop-ups apparaître partout.',
      specials: ['Entraide communautaire', 'Diagnostic manuel', 'Windows 9x/XP']
    },
    {
      id: 'flash',
      name: 'Macromedia / Adobe Flash',
      icon: '⚡',
      birthYear: '1996',
      deathYear: '2020',
      epitaph: 'Ci-gît le souverain absolu des jeux par navigateur et du streaming vidéo pré-HTML5, terrassé par un "Thoughts on Flash" fatidique.',
      summary: 'Flash (initialement FutureSplash de FutureWave, racheté par Macromedia puis Adobe en 2005) a été l\'épine dorsale de l\'interactivité riche du Web pendant plus d\'une décennie.',
      whyItRuled: 'À la fin des années 1990 et dans les années 2000, le HTML standard était textuel, rigide et incapable de gérer des animations complexes, des polices vectorielles personnalisées, du son synchronisé ou de la saisie utilisateur dynamique intégrée. Flash offrait aux designers un outil auteur visuel inégalé pour composer des expériences immersives autonomes (fichiers .SWF compressés), exécutées n\'importe où grâce à un plugin de 1 Mo installé sur 99% des ordinateurs de bureau. Flash a donné naissance au streaming vidéo moderne (YouTube à ses débuts tournait sous Flash !) et à d\'immenses portails de jeux cultes (Newgrounds, Kongregate, Miniclip) ainsi que des interfaces de sites artistiques ultra-riches.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          La chute spectaculaire de Flash est multifactorielle, et s'explique par trois événements géopolitiques et technologiques majeurs :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">La lettre ouverte historique de Steve Jobs (2010) :</strong> En avril 2010, le patron d'Apple publie la lettre mythique <em class="text-amber-450">"Thoughts on Flash"</em>. Il y déclare solennellement que le format propriétaire de Flash sera banni des terminaux iOS (iPhone et iPad). Il pointe du doigt le manque de sécurité, l'absence d'adaptation au tactile multiniveaux de l'époque, la dépendance à un acteur unique (Adobe) et, par-dessus tout, l'épuisement critique des batteries mobiles causé par l'absence d'accélération matérielle efficace.
          </li>
          <li>
            <strong class="text-indigo-400">L'essor triomphant du HTML5, CSS3, et de l'API Canvas :</strong> En parallèle de la fronde d'Apple, le W3C accélère la standardisation d'alternatives libres et natives. La balise <code class="text-pink-400 bg-slate-900 px-1 py-0.5 rounded">&lt;video&gt;</code>, le conteneur sémantique <code class="text-pink-400 bg-slate-900 px-1 py-0.5 rounded">&lt;canvas&gt;</code>, les animations matérielles CSS3 et l'évolution de JavaScript (moteurs JS à compilation JIT à haute efficacité) permettent de refaire tout ce que faisait Flash, mais sans aucun greffon tiers de manière native et sécurisée.
          </li>
          <li>
            <strong class="text-indigo-400">Le cauchemar sécuritaire permanent :</strong> Le plugin Flash Player était devenu le principal vecteur d'infection de logiciels malveillants au monde. Ses vulnérabilités de type "Zero-Day" (dépassements de mémoire tampon, exécution de code arbitraire) étaient si fréquentes que les navigateurs ont commencé à le bloquer par sécurité, décourageant définitivement les utilisateurs et développeurs.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Balises HTML5 natives (<video>, <audio>), API Canvas 2D, SVG animés, WebGL (pour la 3D) et WebAssembly.',
      retroAnecdote: 'Le célèbre site YouTube a utilisé Flash Player pour diffuser toutes ses vidéos jusqu\'à l\'adoption par défaut du lecteur HTML5 en janvier 2015.',
      specials: ['Révolution Vectorielle', 'Flash Player', 'La Lettre d\'Apple']
    },
    {
      id: 'coldfusion',
      name: 'Macromedia ColdFusion (CFML)',
      icon: '❄️',
      birthYear: '1995',
      deathYear: 'Déclin progressif (toujours édité par Adobe)',
      epitaph: 'Ci-gît le pionnier absolu des pages web dynamiques par balises orientées base de données, gelé par la gratuité de PHP et la rigueur de Java ASP.NET.',
      summary: 'Créé à l\'origine par les frères Allaire en 1995, puis racheté par Macromedia en 2001 et Adobe en 2005, ColdFusion a été l\'un des tout premiers serveurs d\'applications capables de générer des pages web couplées à des bases de données SQL à l\'aide d\'un jeu de balises HTML-like appelé CFML.',
      whyItRuled: 'Au milieu des années 1990, interroger une base de données sur le web exigeait de pénibles scripts CGI complexes écrits en Perl ou C. ColdFusion a tout changé en introduisant la balise magique <cfquery>. N\'importe quel webmaster amateur pouvait instantanément lancer une requête SQL et boucler sur les résultats à l\'aide de la balise <cfoutput>. Ce fut un triomphe immédiat pour la création rapide d\'intranets, de bases de connaissances et de sites e-commerce d\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Pourquoi cette plate-forme pionnière s'est-elle fait distancer par les autres technologies du Web ?
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Le coût exorbitant des licences :</strong> Contrairement à PHP, qui était libre, ouvert et gratuit, ColdFusion exigeait des licences serveurs d'exécution commerciale hors de prix (facturées plusieurs milliers de dollars par CPU par Allaire, Macromedia puis Adobe). Les hébergeurs mutualisés bon marché ne pouvaient pas l'offrir, ce qui a drastiquement restreint son adoption.
          </li>
          <li>
            <strong class="text-indigo-400">L'émergence d'alternatives solides et gratuites :</strong> La transition de PHP de simple script à un moteur de confiance pour le web (PHP 4 et 5) combiné aux plateformes d'entreprises gratuites et structurées comme Java JSP/Servlets et ASP.NET a complètement rendu caduc l'argument de vente de ColdFusion.
          </li>
          <li>
            <strong class="text-indigo-400">L'architecture par balises dépassée :</strong> Réaliser de la programmation algorithmique complexe et des boucles avec des balises d'interprétation HTML (comme &lt;cfif&gt; ou &lt;cfloop&gt;) est devenu un cauchemar de lisibilité ("code spaghetti") comparé aux architectures Modèle-Vue-Contrôleur (MVC) et aux langages tout-objet.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Frameworks MVC modernes (Laravel, Symfony, Spring Boot), Node.js (Express), Python (Django, FastAPI), ou engines CFML open-source alternatifs comme Lucee.',
      retroAnecdote: 'Les sites internet construits en ColdFusion étaient immédiatement identifiables dans les années 2000 par la présence de l\'extension insolite de fichiers ".cfm" ou ".cfml" dans leur barre d\'adresse.',
      specials: ['Macromedia Power', 'Pionnier Serveur', 'CFML Tags', 'Extension .cfm']
    },
    {
      id: 'asp',
      name: 'ASP Classic vs PHP',
      icon: '🕳️',
      birthYear: '1996',
      deathYear: '2002',
      epitaph: 'Ci-gît Active Server Pages d\'origine, vaincu sur la Toile publique par le digne artisan PHP et sa sainte stack libre Apache/MySQL.',
      summary: 'Introduit par Microsoft en 1996 avec IIS 3.0, ASP (souvent codé en VBScript ou JScript) s\'est heurté à un concurrent open-source plus rapide, plus accessible et sans limites matérielles : PHP.',
      whyItRuled: 'Dans la première ère du web dynamique, ASP Classic offrait une intégration transparente avec l\'écosystème Windows NT. Les développeurs pouvaient rapidement coupler leurs pages web à des fichiers de base de données Access ou à de gros serveurs SQL Server via ADO (ActiveX Data Objects). C\'était robuste pour l\'intranet d\'entreprise et les serveurs Microsoft IIS précurseurs de l\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          ASP Classic a perdu sa suprématie face à PHP en raison d'un contraste philosophique et économique fondamental :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Le verrouillage propriétaire (Vendor Lock-in) de Microsoft :</strong> ASP Classic nécessitait impérativement le serveur web IIS de Microsoft, fonctionnant uniquement sur Windows NT/2000. S'offrir un hébergement dynamique ASP demandait des licences logicielles d'exploitation Windows onéreuses. À l'inverse, PHP tournait divinement bien sur Linux, UNIX, macOS, et Apache libre.
          </li>
          <li>
            <strong class="text-indigo-400">La naissance de la suite LAMP (Linux Apache MySQL PHP) :</strong> PHP s'est trouvé au cœur d'une alliance incroyable avec Apache et MySQL. Les hébergeurs web du monde entier (comme OVH, GoDaddy ou Free.fr en France) ont pu proposer des hébergements mutualisés d'une simplicité désarmante et à bas coût (quelques francs par mois). Un simple transfert FTP de scripts HTML/PHP suffisait à lancer un forum ou un blog, sans compilation fastidieuse.
          </li>
          <li>
            <strong class="text-indigo-400">L'abandon de Microsoft pour ASP.NET :</strong> En 2002, Microsoft réinvente totalement son approche en remplaçant ASP Classic par <em class="text-indigo-350">ASP.NET</em> reposant sur le framework .NET (C# / VB.NET). Cette rupture brutale a cassé la rétrocompatibilité des anciens scripts ASP, poussant une immense partie des concepteurs à migrer définitivement vers PHP, alors en phase de maturité avec PHP 4 puis PHP 5.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'PHP 8.x (qui fait tourner ~75% du web grâce à WordPress), ASP.NET Core open-source et multiplateforme, Node.js (JavaScript côté serveur) et Python.',
      retroAnecdote: 'Les fichiers ASP se repéraient à leur extension ".asp". De célèbres plateformes de forums d\'époque comme Snitz Forum ou WebWiz étaient codées entièrement en ASP Classic.',
      specials: ['Saga Dynamique', 'Guerre IIS vs Apache', 'LAMP Suite']
    },
    {
      id: 'cgi',
      name: 'Scripts CGI (Common Gateway Interface)',
      icon: '⚙️',
      birthYear: '1993',
      deathYear: 'Début 2000',
      epitaph: 'Ci-gît le protocole d\'aiguillage universel du premier web dynamique, terrassé par le coût exorbitant de la création de processus système.',
      summary: 'Le CGI était la première passerelle standardisée permettant au serveur web d\'appeler un programme externe (généralement écrit en Perl, C, ou C++) pour générer du contenu dynamique.',
      whyItRuled: 'En 1993, le protocole HTTP ne savait servir que du contenu statique (fichiers HTML ou images physiques posés sur disque). CGI a révolutionné cela : chaque fois qu\'un formulaire (balise <form>) était envoyé de manière soumise, le serveur web le transmettait sous forme de variables d\'environnement à un script exécutable (comme un script d\'envoi d\'emails en Perl ou un compteur de visites). CGI offrait une modularité totale : on écrivait du code dans n\'importe quel langage compilé ou interprété, et le script renvoyait simplement du texte brut sémantique (Content-Type: text/html) au navigateur.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Pourquoi le CGI canal historique a quasi-totalement disparu au bénéfice de moteurs d'exécutions modernes :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Le modèle d'exécution "One process per request" (Le goulot d'étranglement de RAM) :</strong> C'est la cause mortelle majeure de CGI. Pour CHACUNE des connexions reçues par le serveur web, le noyau OS devait instancier un tout nouveau processus lourd pour lancer l'interpréteur Perl ou exécuter l'application C. Si 1000 internautes arrivaient simultanément sur votre livre d'or, le serveur Linux ouvrait 1000 sous-processus d'un coup, saturant la mémoire vive et figeant instantanément la machine hôte.
          </li>
          <li>
            <strong class="text-indigo-400">Le manque persistant d'état applicatif :</strong> Comme le processus s'exécutait puis s'arrêtait immédiatement une fois sa réponse HTML envoyée, il n'y avait aucun partage de base de données à l'état chaud. Les connexions SQL devaient être réouvertes péniblement à chaque chargement de page.
          </li>
          <li>
            <strong class="text-indigo-400">Des trous de sécurité abyssaux :</strong> Perl s'utilisait massivement pour parser des arguments d'URL. L'utilisation maladroite d'instructions d'ouverture de fichiers menait régulièrement à des failles d'injection shell dévastatrices d'une simplicité déroutante pour les pirates.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Processes persistants en arrière-plan comme FastCGI (PHP-FPM, uWSGI), les serveurs d\'application unifiés (Node.js, Go/Rust serveurs embarqués) et l\'architecture Serverless.',
      retroAnecdote: 'Le dossier spécial "/cgi-bin/" situé à la racine des FTP d\'époque était l\'unique endroit autorisé pour déposer les scripts dotés d\'une permission d\'exécution CHMOD 755.',
      specials: ['Pionnier CGI', 'Perl Power', 'Dossier /cgi-bin/']
    },
    {
      id: 'netscape',
      name: 'Netscape Navigator',
      icon: '🕸️',
      birthYear: '1994',
      deathYear: '2008 (Racheté par AOL)',
      category: 'acquired',
      epitaph: 'Ci-gît le navigateur roi ayant fait découvrir la Toile au grand public, noyé par le raz-de-marée monopolistique d\'Internet Explorer.',
      summary: 'Fondé par Marc Andreessen (co-auteur de Mosaic), Netscape Navigator a codifié le Web en y inventant le protocole SSL (HTTPS), les cookies de session et le langage JavaScript.',
      whyItRuled: 'En 1995, Netscape Navigator détenait plus de 80% des parts de marché mondiales. Il était le fer de lance de la "Dot-Com" Mania, le symbole de l\'accès à l\'Internet mondial. C\'est Netscape qui commande l\'invention express de JavaScript en 10 jours en 1995 par Brendan Eich pour dynamiser les formulaires, et c\'est également lui qui crée les balises propriétaires extravagantes d\'interactivité enrichie.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Netscape n'a pas résisté à la première guerre des navigateurs menée sans merci par la firme de Redmond :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">La distribution gratuite abusive (Le bundling) d'Internet Explorer :</strong> Dès août 1995, Microsoft lance Internet Explorer. Et à partir de Windows 95 OSR2 puis Windows 98, IE est intégré d'office au cœur du système d'exploitation de manière gratuite et indésinstallable. Netscape, qui était alors payant pour un usage commercial, a vu sa base d'utilisateurs s'effondrer car IE était préinstallé sur 95% des PC vendus.
          </li>
          <li>
            <strong class="text-indigo-400">Le suicide technique de Netscape 6 :</strong> Pour tenter de riposter, Netscape décide de récrire intégralement le moteur de rendu vieillissant de Netscape 4 (le fameux moteur Mozilla/Gecko). Ce projet titanesque de "code-rewrite" prend des années. À sa sortie en 2000, Netscape 6 est lourd, instable, truffé de bogues d'affichage et lent. Cette mauvaise passe achève de convaincre les entreprises de basculer définitivement sur IE.
          </li>
          <li>
            <strong class="text-indigo-400">Un rachat toxique par AOL :</strong> Racheté en 1999 par AOL pour près de 10 milliards de dollars, Netscape perd son identité de start-up agile de la Silicon Valley, étouffé sous les décisions managériales incohérentes jusqu'à l'extinction officielle du support en 2008.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Firefox (directement issu du code open-source de Netscape libéré en 1998 lors de la création de la Fondation Mozilla), Google Chrome, Microsoft Edge et Apple Safari.',
      retroAnecdote: 'C\'est l\'User Agent de Netscape, qui affichait la chaîne "Mozilla/1.0" (Mo-zilla pour Mosaic-Killer), qui est aujourd\'hui présent par rétrocompatibilité obligatoire au début de tous les navigateurs modernes (Chrome, Safari, etc.) !',
      specials: ['Browser Wars', 'Mosaic Heritage', 'Inventeur de JS']
    },
    {
      id: 'applets',
      name: 'Java Applets (Greffons Java)',
      icon: '☕',
      birthYear: '1995',
      deathYear: '2016',
      epitaph: 'Ci-gît le rêve de lancer des applications lourdes compilées multiplateformes dans une balise web, abattu par les temps de chargement d\'un autre âge.',
      summary: 'Les Applets Java permettaient d\'imbriquer des applications compilées rédigées en Java directement via la balise &lt;applet&gt; ou &lt;object&gt;.',
      whyItRuled: 'En permettant aux développeurs d\'exécuter du vrai code compilé, avec un accès direct aux threads, aux sockets TCP bruts et aux outils graphiques AWT/Swing de Java sur la machine de l\'utilisateur, les Applets offraient une puissance applicative dont HTML/JS ne pouvaient que rêver au milieu des années 90.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Causes fatales de leur mise au rebut historique :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Les temps de démarrage catastrophiques :</strong> Charger une applet obligeait le navigateur à instancier en local une lourde machine virtuelle Java (JVM). L'utilisateur se retrouvait devant un écran gris immobile pendant une à deux minutes au chargement de la moindre page Web.
          </li>
          <li>
            <strong class="text-indigo-400">Les failles de sandboxing (Sécurité locale) :</strong> Les applets contournaient régulièrement leur "bac à sable" sécurisé, donnant libre accès au disque dur local pour des installateurs de virus furtifs.
          </li>
          <li>
            <strong class="text-indigo-400">La désactivation globale des plugins NPAPI :</strong> Oracle a déprécié officiellement les applets en 2016 lorsque Chrome, Firefox, et Safari ont retiré le support historique de l'API NPAPI pour des raisons de sécurité évidentes.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'WebAssembly (WASM), permettant d\'exécuter du code proche des performances de la machine (C, C++, Rust, Go) directement et sécuritairement dans le moteur JS natif.',
      retroAnecdote: 'Les premiers tchats de discussion en ligne (Caramail en France par exemple) s\'appuyaient sur des applets Java massives pour maintenir la connexion socket texte en temps réel.',
      specials: ['JVM du Navigateur', 'NPAPI Bloqué', 'Lenteur Java']
    },
    {
      id: 'activex',
      name: 'ActiveX (Composants OLE d\'IE)',
      icon: '🛡️',
      birthYear: '1996',
      deathYear: '2015',
      epitaph: 'Ci-gît la passerelle exclusive d\'Internet Explorer vers le système Windows, condamnée pour avoir transformé la navigation web en stand de tir pour virus.',
      summary: 'ActiveX était le framework de Microsoft permettant d\'instancier des contrôles natifs Windows COM/OLE à l\'intérieur du Web classique.',
      whyItRuled: 'Pour les intranets d\'entreprise, ActiveX était magique. Il permettait à une simple page Web d\'ouvrir un fichier Excel natif, de manipuler des ports série ou USB de la machine cliente, ou de piloter la base de registres Windows directement en code.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Cause tragique de la mort de cette technologie :
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">L'absence totale de bac à sable (No Sandbox) :</strong> Les contrôles ActiveX étaient des bibliothèques dynamiques d'exécution Windows (.DLL) compilées en langage machine. Une fois que l'utilisateur cliquait maladroitement sur "Accepter" lors de l'alerte d'exécution d'un composant ActiveX non-signé d'un site malveillant, le contrôle obtenait les permissions de l'administrateur système pour effacer ou crypter le disque dur. Un vecteur d'attaques d'une vulnérabilité insoluble pour le W3C.
          </li>
          <li>
            <strong class="text-indigo-400">L'incompatibilité absolue hors-Windows :</strong> Ne fonctionnant que sur Internet Explorer avec Win32, ActiveX s'est trouvé hors-jeu avec la montée des appareils mobiles et l'essor des navigateurs alternatifs universels.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Extensions de navigateur isolées en sandbox, WebUSB, WebSerial API pour les objets physiques, et applications PWAs réactives.',
      retroAnecdote: 'Pendant de longues années, les banques en ligne et l\'administration publique coréenne exigeaient l\'installation obligatoire d\'un contrôle ActiveX propriétaire pour sécuriser la saisie des codes d\'accès.',
      specials: ['Exclusif Windows', 'Virus Heaven', 'COM/OLE System']
    },
    {
      id: 'aol',
      name: 'America Online (AOL)',
      icon: '📬',
      birthYear: '1985',
      deathYear: '2015',
      epitaph: 'Ci-gît le géant propriétaire des disques d\'installation CD-ROM illimités et des heures gratuites de connexion par modem, terrassé par l\'essor de l\'Internet ouvert à haut débit.',
      summary: 'AOL (America Online) a été la première "porte d\'entrée" du réseau pour des dizaines de millions d\'internautes à travers le monde, combinant fournisseur d\'accès, portail captif et messagerie instantanée (AIM).',
      whyItRuled: 'Durant la seconde moitié des années 90, AOL a littéralement inondé la planète de millions de CD-ROM promotionnels offrant 50 ou 100 heures gratuites de connexion. Pour l\'abonné, AOL n\'était pas seulement un FAI, c\'était l\'Internet tout entier : un environnement sécurisé fermé, autonome, disposant de ses propres forums exclusifs, canaux d\'actualités, salons de discussion (chatrooms) et du cultissime client de messagerie AIM (AOL Instant Messenger). À son apogée en 2000, AOL fusionne avec Time Warner pour 164 milliards de dollars, représentant la plus grande transaction de l\'histoire financière.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le déclin foudroyant d'AOL est une leçon classique d'incapacité à pivoter technologiquement :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le virage manqué du haut débit (ADSL et Câble) :</strong> AOL régnait sur l'accès bas débit (modem 56k à l'abonnement horaire). À l'arrivée de l'ADSL et du câble, les utilisateurs n'avaient plus besoin de passer par l'interface captive d'AOL pour se connecter au réseau mondial. Les nouveaux abonnements "sans limite" ont rendu le modèle d'heures AOL d'époque obsolète.</li>
          <li><strong class="text-indigo-400">Le déclin lié au web ouvert (Open Web) :</strong> Les utilisateurs ont rapidement préféré explorer le web ouvert via de simples fureteurs (Netscape puis Internet Explorer) pour visiter de vrais sites internet, s'éloignant des jardins fermés et censurés d'AOL.</li>
          <li><strong class="text-indigo-400">La fusion Time Warner catastrophique :</strong> Conclue juste avant l'éclatement de la bulle spéculative des dot-coms en 2000-2001, cette fusion a grevé les finances du groupe, entraînant la plus grande dépréciation d'actifs de l'histoire (99 milliards de dollars de pertes en 2002) et paralysant toute innovation.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Réseaux sociaux modernes (Discord, Slack, WhatsApp issus de la philosophie d\'AIM), portails de fournisseur d\'accès Internet génériques, Google et l\'Open Web.',
      retroAnecdote: 'Le fameux bruit d\'alerte sonore "AOL, vous avez un message !" ("You\'ve Got Mail!") est gravé à jamais dans la pop-culture des années 90.',
      specials: ['AOL Time Warner', 'AIM Chat', 'CD-ROM 50h']
    },
    {
      id: 'yahoo',
      name: 'Yahoo!',
      icon: '🟣',
      birthYear: '1994',
      deathYear: '2016',
      epitaph: 'Ci-gît le premier grand annuaire universel de la Toile, le roi déchu de l\'auto-route de l\'information ayant refusé d\'acheter Google à ses débuts.',
      summary: 'Créé par Jerry Yang et David Filo à l\'université de Stanford, Yahoo! (Yet Another Hierarchical Officious Oracle) était le portail d\'accueil central, moteur de recherche et boîte aux lettres (Yahoo Mail) de référence de l\'Internet originel.',
      whyItRuled: 'Au milieu des années 90, trouver un site web relevait du parcours du combattant. Yahoo! a résolu cela en créant un annuaire web sémantique structuré, classé et hiérarchisé à la main par des armées d\'opérateurs humains. C\'était la page de démarrage absolue du web mondial. Yahoo a grossi en rachetant Geocities, Broadcast.com (pour 5,7 milliards !) et en lançant Yahoo! Messenger et Yahoo Mail.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>La chute de Yahoo! découle d'une série de mauvaises décisions stratégiques légendaires :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le refus de racheter Google :</strong> En 1998, Larry Page et Sergey Brin proposent de revendre Google (et sa technologie PageRank) à Yahoo! pour seulement 1 million de dollars. Yahoo refuse pour préserver son propre portail. En 2002, Yahoo tente de racheter Google pour 3 milliards, mais Google en demande 5. Yahoo décline à nouveau.</li>
          <li><strong class="text-indigo-400">L'algorithme battu par PageRank :</strong> Alors que Yahoo persistait dans l'annuaire éditorial humain et un moteur de recherche hybride peu efficace, Google a balayé le marché avec un algorithme de recherche automatisé instantané et épuré de toute publicité encombrante.</li>
          <li><strong class="text-indigo-400">Crise d'identité permanente :</strong> Yahoo n'a jamais su dire s'il était une entreprise technologique de recherche (concurrente de Google) ou un groupe de médias et de contenus (concurrente de Disney/AOL). Le rachat calamiteux de Tumblr en 2013 pour 1,1 milliard de dollars n'a rien arrangé, menant au rachat final de la firme par Verizon pour "seulement" 4,8 milliards en 2016.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Google Search (pour la recherche), Gmail, Reddit et Twitter pour les flux d\'actualités communautaires.',
      retroAnecdote: 'En 2006, Yahoo! a également failli racheter Facebook pour 1 milliard de dollars. Lorsque Yahoo a baissé son offre à 850 millions suite à une baisse de cours, Mark Zuckerberg a refusé de signer.',
      specials: ['Stanford Pioneers', 'L\'Annuaire Humain', 'Tumblr Fail']
    },
    {
      id: 'perso_hosts',
      name: 'Hébergeurs Gratuits & Sites Persos',
      icon: '🐕',
      birthYear: '1995',
      deathYear: '2010',
      epitaph: 'Ci-gît l\'époque bénie des pages personnelles en HTML artisanal, des GIFs animés de flammes et du chien de garde Lycos, supplantée par l\'uniformisation des réseaux sociaux.',
      summary: 'L\'âge d\'or des hébergeurs web gratuits (Multimania, Lycos, Free, Geocities, Voila) permettait à n\'importe quel passionné de publier sa page personnelle gratuitement en échange de bannières publicitaires intrusives.',
      whyItRuled: 'À la fin des années 1990, le web était personnel et décentré. Des services comme Multimania ou Geocities offraient 10, 20 ou 50 Mo d\'espace disque avec un accès FTP gratuit. Des millions de personnes ont ainsi créé de fantastiques pages dédiées à leurs passions (jeux vidéo, tuning, poésie, chats, avec de célèbres "Livres de doléances" et compteurs de visites). En France, Lycos ("Lycos, va chercher !") et Free (avec son hébergement gratuit mythique sans abonnement avec bases MySQL facultatives) ont démocratisé la liberté d\'expression numérique de toute une génération.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Pourquoi les pages personnelles s'exprimant en HTML artisanal ont presque totalement disparu aujourd'hui :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le monopole d'uniformisation des réseaux sociaux (Facebook, Twitter, Instagram) :</strong> Au milieu des années 2000, l'internaute n'a plus voulu s'embêter à coder du code HTML imbriqué ou à configurer un client FTP FileZilla. Les réseaux sociaux ont offert des profils prêts à l'emploi instantanés avec une viralité qu'un site perso isolé n'avait pas.</li>
          <li><strong class="text-indigo-400">La mort du modèle économique de la publicité intrusive (Framing & Popups) :</strong> Des hébergeurs comme Lycos et Multimania survivaient en injectant de lourdes bannières publicitaires et des fenêtres intempestives (pop-ups). L'arrivée des bloqueurs de pub et la baisse générale de valeur de ces espaces d'affichage ont coulé ce modèle d'époque.</li>
          <li><strong class="text-indigo-400">La complexification technique :</strong> Créer un site web moderne aujourd'hui est devenu intimidant pour un novice (frameworks complexes, Webpack, certificats SSL HTTPS Let's Encrypt, hébergement cloud, CI/CD). Les hébergeurs gratuits d'origine ont donc fermé leurs portes (Geocities en 2009, Voila en 2015, changement radical de Multimania).</li>
        </ul>
      </div>`,
      modernSuccessor: 'Profils sociaux (Linktree, X, Instagram), plateformes de blog SaaS clé en main (Medium, Substack, WordPress.com, Wix) et hébergeurs statiques gratuits (Vercel, GitHub Pages, Netlify).',
      retroAnecdote: 'Le fameux chien retriever noir de Lycos ("Va chercher !") était la mascotte la plus connue du web francophone de l\'époque, synonyme de recherche efficace dans l\'annuaire Multimania.',
      specials: ['Multimania', 'Lycos Va Chercher', 'Sites Persos 1.0']
    },
    {
      id: 'easyphp',
      name: 'EasyPHP',
      icon: '🔌',
      birthYear: '1999',
      deathYear: '2020 (Déclin / Payant)',
      epitaph: 'Ci-gît le sauveur incontestable des développeurs PHP amateurs sous Windows, dont la transition soudaine vers un modèle payant par abonnement a trahi l\'esprit "free" originel.',
      summary: 'Lancé en 1999 par Laurent Abbal, Emmanuel Faivre et Thierry Muraro, EasyPHP a été le tout premier package unifié "WAMP" (Windows, Apache, MySQL, PHP) prêt à l\'emploi au monde. Fini les heures de maux de tête passées à essayer d\'éditer des fichiers de configuration d\'Apache, de compiler des bibliothèques MySQL compliquées, ou de greffer PHP à la main : EasyPHP installait un serveur web complet d\'un simple clic.',
      whyItRuled: 'Avant EasyPHP, installer un environnement de développement web local complet était un rite de passage technique terrifiant qui décourageait les débutants du Web. En empaquetant de manière unifiée Apache, MySQL, PHP et l\'excellent outil d\'administration phpMyAdmin sous la forme d\'un simple exécutable Windows doté d\'une petite icône de prise dans la barre des tâches, EasyPHP a rendu le développement web universellement accessible. C\'était l\'outil fétiche absolu de tous les étudiants, professeurs de technologie en collège/lycée, bidouilleurs de forums phpBB, et développeurs indépendants de la francophonie.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Pourquoi cet outil légendaire, pilier de l'apprentissage de la programmation dynamique, a-t-il été boudé par sa communauté ?
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Le glissement vers un modèle commercial fermé (La trahison du "Free") :</strong> Pendant de longues années, EasyPHP a été distribué de manière entièrement gratuite et open-source, en adéquation avec la philosophie de gratuité absolue du Web et de PHP. Cependant, à la fin des années 2010, l'équipe a décidé de proposer les nouvelles versions à jour dites "Devserver" et "Webserver" sous forme de licences strictement payantes (parfois par abonnement ou par achat de composants indispensables). Les anciennes versions gratuites ont été délaissées et rendues obsolètes, créant une onde de choc et un sentiment amer de trahison collective.
          </li>
          <li>
            <strong class="text-indigo-400">La concurrence féroce de WampServer, XAMPP et Laragon :</strong> Face à ce virage commercial payant, la communauté n'a pas attendu. Elle s'est massivement tournée vers des alternatives 100% libres, gratuites et de grande qualité. Des outils comme <em class="text-indigo-300">WampServer</em> (le fétiche de la communauté francophone), le très rigoureux <em class="text-indigo-300">XAMPP</em> ou encore l'ultra-rapide et moderne <em class="text-indigo-300">Laragon</em> ont instantanément détrôné EasyPHP de tous les postes de développement.
          </li>
          <li>
            <strong class="text-indigo-400">La révolution de la conteneurisation (Docker & Vagrant) :</strong> À l'ère post-2015, les développeurs professionnels ont progressivement abandonné les solutions WAMP locales au profit de conteneurs Docker (avec Docker Compose). Cela a éliminé le problème ancestral des disparités d'environnements d'exécution entre le PC Windows du développeur et le serveur final de production sous Linux.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Laragon (le seigneur actuel du WAMP local moderne), Docker (Docker Compose pour des environnements isolés performants), WampServer ou DDEV.',
      retroAnecdote: 'L\'icône de la prise électrique EasyPHP dans la barre d\'état système Windows changeait dynamiquement de couleur d\'un rouge figé à un vert éclatant pour signifier que le serveur web Apache et le démon SQL MySQL écoutaient enfin les requêtes locales !',
      specials: ['WAMP Pioneers', 'The WAMP Era', 'La Prise Électrique', 'Trahison Payante']
    },
    {
      id: 'ibazar',
      name: 'iBazar.fr',
      icon: '🛍️',
      birthYear: '1999',
      deathYear: '2001 (Racheté par eBay)',
      category: 'acquired',
      epitaph: "Ci-gît le roi pionnier des enchères en ligne en France, racheté au prix fort par le géant eBay avant d'être totalement fondu sous sa bannière.",
      summary: "Lancé en 1999 par Pierre-François Grimaldi, iBazar a été le premier site d'enchères en ligne gratuit en France, une véritable révolution e-commerce pré-eBay dans l'Hexagone.",
      whyItRuled: "iBazar offrait un concept addictif et convivial : acheter et vendre des objets d'occasion aux enchères de manière entièrement gratuite (sans commissions de vente au départ). Grâce à une campagne publicitaire télévisée mythique ('iBazar point fr !') mettant en scène des objets insolites ou du quotidien, le site est rapidement devenu le premier vide-grenier virtuel de France, réunissant une communauté de millions de membres passionnés qui s'envoyaient des chèques par la poste.",
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>La fin d'iBazar est un cas d'école de consolidation et d'acquisition stratégique de la bulle Internet :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le rachat spectaculaire par eBay (2001) :</strong> En février 2001, alors que la bulle Internet commence à éclater, le géant américain eBay, qui peine à s'imposer sur le marché français face à iBazar, décide de racheter son concurrent pour une somme colossale d'environ 112 millions de dollars en actions. Une transaction historique pour le web français.</li>
          <li><strong class="text-indigo-400">L'introduction des commissions obligatoires :</strong> Après l'acquisition, eBay a progressivement unifié les plateformes et, surtout, a mis fin au modèle 100% gratuit d'iBazar en introduisant des frais d'insertion et des commissions sur les ventes, ce qui a provoqué la colère et la dispersion d'une partie des fidèles d'époque.</li>
          <li><strong class="text-indigo-400">La disparition progressive de la marque :</strong> Courant 2002, la marque iBazar est définitivement abandonnée et les comptes des utilisateurs sont migrés de force sur eBay.fr, effaçant le nom mythique du paysage numérique.</li>
        </ul>
      </div>`,
      modernSuccessor: 'eBay.fr, Vinted, Leboncoin (le véritable héritier des petites annonces et transactions locales gratuites en France).',
      retroAnecdote: "Le slogan publicitaire chanté 'iBazar point fr !' avec son petit jingle entêtant à la télévision à la fin des années 1990 est resté gravé comme l'un des plus grands symboles sonores du début du web grand public en France.",
      specials: ['Pionnier Enchères', 'eBay Acquisition', 'iBazar Point Fr !', 'Bulle Internet 2000']
    },
    {
      id: 'caramail',
      name: 'Caramail',
      icon: '💬',
      birthYear: '1997',
      deathYear: '2009 (Racheté par Lycos)',
      category: 'acquired',
      epitaph: 'Ci-gît le point de ralliement légendaire de la jeunesse francophone, pionnier du courrier gratuit et de ses salons de tchat animés par applets Java, emporté par MSN Messenger et l\'avènement des réseaux sociaux intégrés.',
      summary: 'Lancé en 1997 par Orianne Garcia, Alexandre Roos et Christophe Schaming, Caramail a été le portail web communautaire et le service de courriers électroniques gratuits le plus populaire de l\'Internet francophone de la fin des années 1990.',
      whyItRuled: 'Pour des millions de francophones découvrant le Web à l\'ère des connexions modem 56k, Caramail était le cœur battant de leur vie numérique. Son atout majeur était son célèbre salon de discussion ("Tchat") basé sur de dynamiques applets Java. Il permettait d\'entrer instantanément en relation textuelle dans des dizaines d\'espaces thématiques sans installer de logiciel externe. Le webmail gratuit intégrait quant à lui des services inédits comme des smileys géants animés, des cartes virtuelles de vœux, et des outils ludiques qui ont initié toute une génération aux usages collaboratifs du réseau.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le déclin et la disparition finale de cette icône communautaire pionnière s'expliquent par plusieurs virages technologiques majeurs manqués :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La confrontation avec MSN Messenger :</strong> Caramail reposait exclusivement sur des salons de discussion fonctionnant au sein d'une page Web via Java. À partir de 2001, Microsoft intègre d'office Windows Messenger (puis MSN Messenger) au cœur de son système Windows XP. Les internautes ont massivement migré vers ce client autonome de bureau de messagerie instantanée, plus rapide, stable et offrant des fonctions de visioconférence et d'appels audio intégrées.</li>
          <li><strong class="text-indigo-400">Des reventes à répétition et une saturation publicitaire :</strong> Racheté au paroxysme de la bulle des dot-coms en 2000 par Spray, puis par Lycos pour 150 millions d'euros, Caramail a vu son expérience utilisateur se dégrader. Son portail a été surchargé de bannières publicitaires massives et clignotantes de type pop-up pour rentabiliser l'investissement, ralentissant considérablement le chargement du site sur les liaisons bas débit.</li>
          <li><strong class="text-indigo-400">Le délaissement des infrastructures face à la charge réseau :</strong> Durant ses années de gloire, Caramail souffrait de pannes serveurs continuelles en raison de serveurs mail sous-équipés pour traiter les requêtes de dizaines de millions d'utilisateurs simultanés, décourageant au fil du temps les fidèles du service.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Réseaux de tchat unifiés (Discord, Slack, WhatsApp), messageries instantanées des réseaux sociaux de pointe (Instagram, TikTok) et les grands webmails (Gmail, Outlook).',
      retroAnecdote: 'Pour coloriser les textes, envoyer des messages clignotants ou faire des effets spéciaux dans les salons de tchat de Caramail, les utilisateurs devaient taper manuellement du code ou des balises HTML au sein de l\'unique champ de saisie !',
      specials: ['Légende Francophone', 'Applet Java Chat', 'Lycos Era', 'Tchat 90s']
    },
    {
      id: 'napster',
      name: 'Napster',
      icon: '🎧',
      birthYear: '1999',
      deathYear: '2001',
      epitaph: 'Ci-gît l\'architecte du premier séisme musical mondial en Peer-to-Peer, qui a bravé l\'industrie du disque pour prouver que les données veulent circuler librement entre les disques durs.',
      summary: 'Créé par Shawn Fanning et Sean Parker en 1999, Napster a été le premier logiciel grand public d\'échange de fichiers audio MP3 basé sur un protocole Peer-to-Peer (P2P), déclenchant une révolution numérique sans précédent au tournant du millénaire.',
      whyItRuled: 'À la fin des années 1990, obtenir un morceau de musique au format numérique sur le réseau demandait de longues recherches sur des serveurs FTP ou des canaux de discussion IRC d\'initiés. Napster a rendu le procédé d\'une simplicité déroutante : un logiciel léger doté d\'une barre de recherche universelle. En tapant le nom d\'une chanson, le serveur local de Napster mettait en relation directe deux ordinateurs pour s\'échanger directement le fichier MP3 depuis leurs disques durs respectifs. Cette bibliothèque illimitée a immédiatement fasciné les utilisateurs, propulsant le MP3 comme format hégémonique universel.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le réseau Napster originel a été terrassé de manière fulgurante par une action juridique d'envergure majeure dirigée par l'industrie de l'audiovisuel :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le procès mondial mène par la RIAA et des artistes phares :</strong> Fin 1999, l'association américaine de l'industrie du disque (RIAA) intente une plainte groupée pour piratage de propriété intellectuelle à l'échelle industrielle. Des groupes célèbres comme <em class="text-amber-450">Metallica</em> (porté par Lars Ulrich) ou Dr. Dre mènent une offensive frontale contre le service après avoir découvert que leurs albums non encore publiés circulaient librement sur le réseau de Napster.</li>
          <li><strong class="text-indigo-400">Une architecture réseau centralisée fatalement vulnérable :</strong> Bien que la transmission de fichiers MP3 d'ordinateur à ordinateur se faisait dans un véritable modèle Peer-to-Peer direct, Napster s'appuyait sur une base de données d'index et des serveurs centraux physiques pour coordonner les adresses IP et les listes de recherche. Cette centralisation a offert une cible parfaite pour les tribunaux fédéraux américains, qui ont ordonné à l'entreprise de filtrer et fermer définitivement les serveurs centraux en juillet 2001.</li>
          <li><strong class="text-indigo-400">Une renaissance sous forme de licence légale :</strong> Après sa mise en faillite, les droits rattachés au logo de chat bleu au casque audio ont été rachetés par diverses enseignes pour opérer une reconversion de la marque en un service cloud de streaming musical payant pleinement légisé.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Géants de la diffusion et du streaming musical par abonnement (Spotify, Apple Music, Deezer, YouTube Music) et protocoles d\'échange décentralisés à haute tolérance de pannes (BitTorrent).',
      retroAnecdote: 'Avec le faible débit moyen des modems RTC 56k, télécharger un unique fichier MP3 de seulement 3 Mo prenait de 20 à 30 minutes de patience pendant lesquelles la ligne de téléphone de la maison était entièrement monopolisée !',
      specials: ['P2P Revolution', 'Metallica & Lars', 'Sean Parker', 'MP3 Industry Wave']
    },
    {
      id: 'geocities',
      name: 'Yahoo! GeoCities',
      icon: '🏙️',
      birthYear: '1994',
      deathYear: '2009 (Racheté par Yahoo!)',
      category: 'acquired',
      epitaph: 'Ci-gît le premier incubateur mondial d\'expression personnelle en ligne, fondé sur une sémantique de quartiers virtuels thématiques avant que l\'Internet n\'uniformise ses profils numériques.',
      summary: 'Créé en 1994 par David Bohnett et John Rezner sous le nom originel de Beverly Hills Internet (BHI), GeoCities offrait aux internautes la liberté d\'héberger et de composer gratuitement leurs pages web personnelles à l\'intérieur de quartiers thématiques.',
      whyItRuled: 'GeoCities a été le berceau absolu du HTML amateur de l\'ère Web 1.0. Le service reposait sur une métaphore brillante de quartiers virtuels thématiques calqués sur de vraies ou d\'imaginaires cités : \'Hollywood\' unissait les sites de critiques de cinéma, \'SiliconValley\' les fanatiques d\'ordinateurs, \'Area51\' les théories du complot extrascolaire et \'EnchantedForest\' les récits intimes et familiaux. Les internautes utiliaient des éditeurs WYSIWYG rudimentaires pour inonder leurs pages de GIF animés tape-à-l\'œil (dont les cultissimes petits ouvriers "Under Construction"), d\'effets de textes clignotants et d\'ambiance musicale au format brut MIDI.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le démantèlement de ce patrimoine culturel mondial de la friche artistique du Web s'est scellé par une série de mauvais arbitrages stratégiques :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le rachat gargantuesque par Yahoo! (1999) :</strong> Yahoo! acquiert GeoCities pour la coquette somme d'actions de 3,57 milliards de dollars au pic de la bulle technologique. Après le rachat, Yahoo! change les règles d'utilisation d'origine, s'arrogeant les pleins droits d'exploitation commerciale sur l'intégralité des créations hébergées, déclenchant le départ massif des pionniers du site.</li>
          <li><strong class="text-indigo-400">Le démantèlement des adresses de quartiers historiques :</strong> Yahoo! a délibérément abandonné le modèle mythique d'URLs structuré sur les quartiers et numéros de rues virtuels (ex: geocities.com/SiliconValley/Way/4096) pour y imposer de froides URLs chiffrées sans âme, anéantissant l'esprit d'appartenance locale.</li>
          <li><strong class="text-indigo-400">L'arrêt de mort brutal (2009) :</strong> En avril 2009, face à l'émergence triomphante de WordPress, des blocs modernes, et de Facebook, Yahoo! prend la décision sans concession de couper et supprimer définitivement l'intégralité du stockage mondial de GeoCities, détruisant à jamais le premier musée d'expression brute de millions de créateurs amateurs de l'histoire du Web.</li>
        </ul>
      </div>`,
      modernSuccessor: 'NeoCities (l\'incroyable héritier spirituel open-source d\'hébergement HTML/CSS d\'esprit rétro rebelle), WordPress, Webflow, Squarespace et plateformes de création modulaire.',
      retroAnecdote: 'Lors de l\'annonce d\'effacement en 2009, une section dissidente d\'archivistes (Archive Team) a lancé une action commando de téléchargement automatisé massif pour sauvegarder près de 1 To de pages GeoCities avant que Yahoo! ne fige ses disques durs.',
      specials: ['Web 1.0 Heritage', 'Under Construction Gif', 'MIDI Loops', 'Virtual Districts']
    },
    {
      id: 'megaupload',
      name: 'Megaupload',
      icon: '☁️',
      birthYear: '2005',
      deathYear: '2012',
      epitaph: 'Ci-gît le seigneur absolu du stockage direct démesuré en un clic, désactivé lors d\'un raid héliporté spectaculaire du FBI pour infraction massive d\'œuvres de divertissement.',
      summary: 'Fondé par le très excentrique Kim Dotcom (Kim Schmitz) à Hong Kong en 2005, Megaupload a représenté l\'un des services de stockage cloud (One-click hosting) les plus gigantesques de l\'histoire numérique, drainant à son zénith plus de 4% de la totalité du trafic IP du Web mondial.',
      whyItRuled: 'À une époque où l\'envoi de gros fichiers de travail de plusieurs centaines de mégaoctets bloquait continuellement les boîtes aux lettres classiques, Megaupload a éliminé tous les obstacles. Son fonctionnement était magique : glisser-déposer un fichier de plusieurs Giga-octets sans inscription pour récupérer un simple lien de téléchargement direct ultrarapide. La force du modèle résidait également dans un système d\'affiliation rémunérateur en argent de poche pour les déposeurs populaires, alimentant un vivier autonome de distribution planétaire d\'œuvres numériques en direct.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>L'anéantissement subit du géant du partage de fichiers direct s'est orchestré lors d'une action policière transnationale menée en liaison étroite par le FBI :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">L'assaut d'envergure "Mega Raid" (2012) :</strong> Le 19 janvier 2012, soixante agents lourdement armés de fusils automatiques et assistés par hélicoptères prennent d'assaut la propriété résidentielle de Kim Dotcom en Nouvelle-Zélande sur instruction directe du FBI américain. En parallèle, les serveurs d'exécutions et les noms de domaine de Megaupload et Megavideo sont suspendus d'un coup, remplacés par le panneau officiel rouge de saisie légale fédérale du DOJ.</li>
          <li><strong class="text-indigo-400">Le procès pour complot criminel de piratage :</strong> Les autorités judiciaires américaines ont accusé l'entreprise d'avoir sciemment conçu un modèle financier incitant à la violation de copyright à visées commerciales, évaluant le manque à gagner pour l'industrie du cinéma et de la musique à plus de 500 millions de dollars. Les serveurs ont été effacés sans distinction, faisant perdre aux utilisateurs des millions de gigaoctets de documents personnels légitimes.</li>
          <li><strong class="text-indigo-400">La saga de l'extradition de Kim Dotcom :</strong> Cette affaire a redéfini les contours judiciaires de l'extradition sur les réseaux mondiaux, initiant une bataille procédurale de plus de dix ans en Nouvelle-Zélande sur la validité internationale des mandats émis par le gouvernement américain.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Solutions d\'hébergement cloud synchronisées (Google Drive, Dropbox, OneDrive, Box) et hébergeurs éphémères spécialisés de gros volumes (WeTransfer, Smash).',
      retroAnecdote: 'En décembre 2011, au sommet de sa puissance, Megaupload publiait une vidéo musicale devenue virale, la "Mega Song", dans laquelle des musiciens et célébrités renommées comme Kanye West, Snoop Dogg, et Alicia Keys clamaient leur amour pour ce service de stockage cloud !',
      specials: ['Kim Dotcom Mafia', 'FBI Seizure Red Banner', 'Mega Upload Song', 'Cloud Storage Rise']
    },
    {
      id: 'icq',
      name: 'ICQ (I Seek You)',
      icon: '🌸',
      birthYear: '1996',
      deathYear: '2024 (Racheté par AOL / VK)',
      category: 'acquired',
      epitaph: 'Ci-gît le parrain fondateur mythique de la messagerie instantanée mondiale, dont la marguerite bicolore et le "Uh-Oh !" emblématique ont pavé la voie des communications directes actuelles.',
      summary: 'Lancé en novembre 1996 par la jeune start-up israélienne Mirabilis, ICQ (homophone phonétique de "I Seek You" ou "Je te cherche") a été la première messagerie instantanée mondiale à réunir des dizaines de millions d\'humains en direct sur leur écran.',
      whyItRuled: 'À l\'époque des connexions modem bas débit, ICQ a bouleversé l\'économie du temps réel. Auparavant, le web était discret et asynchrone (e-mails, requêtes web statiques) ou purement public (IRC). Avec l\'apparition d\'ICQ, un miracle se produit : un panneau vertical discret affiche la liste de vos contacts préalablement saisis par leur UIN (numéro d\'identification unique séquentiel). En un coup d\'œil, vous découvrez s\'ils sont en ligne (marguerite verte), absents (marguerite rouge), et pouvez ouvrir une fenêtre de tchat privée directe. Primes de sons d\'alertes inoubliables (notamment le cri d\'oiseau ou le fameux "Uh-Oh !"), transfert de fichiers de disque dur à disque dur et jeux de compagnie intégrés ont converti plus de 100 millions d\'adeptes au sommet de son hégémonie culturelle.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Le retrait d'antenne final et officiel d'ICQ (le 26 juin 2024, figeant définitivement ses serveurs après 28 ans d'existence) résulte d'une cascade d'évolutions d'usages et de glissements d'attention :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le rachat par AOL & la rivalité d'acier avec MSN Messenger :</strong> En 1998, AOL fait sensation en rachetant la start-up Mirabilis pour 407 millions de dollars. Malheureusement, AOL multiplie les divisions et gère de front ICQ et AIM (AOL Instant Messenger). À partir de 1999, Microsoft lance MSN Messenger. En le distribuant d'office avec Windows XP et Hotmail, Microsoft rafle la mise mondiale grâce à un design épuré, des émoticones personnalisés et la webcam de bureau intégrée.</li>
          <li><strong class="text-indigo-400">La fatale suralimentation du logiciel (Bloatware) :</strong> Dans les années 2000, pour faire face à la concurrence, ICQ grossit de manière pathologique. Le petit tchat minimaliste se transforme en usine à gaz saturée de bannières publicitaires massives, de mini-jeux Flash de seconde zone, et d'options complexes. Sa communauté originelle fuit alors vers des alternatives légères comme Skype, Gtalk, ou des surcouches universelles sans pubs (Pidgin, Trillian, Adium).</li>
          <li><strong class="text-indigo-400">Le rachat par VKontakte (VK) et l'inéluctable mutation mobile :</strong> Racheté en 2010 pour 187,5 millions de dollars par le géant d'Internet russe DST (devenu le groupe VK), ICQ s'est transformé en messagerie de niche en Europe de l'Est. Le basculement total vers l'ère du smartphone a parachevé son déclin. Les applications modernes comme WhatsApp, Telegram ou Signal ont résolu la messagerie sans forcer un code UIN incompréhensible, en s'appuyant directement sur le répertoire de numéros de téléphone du mobile, rendant ICQ obsolète sur tous les écrans occidentaux jusqu'à son arrêt total en juin 2024.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Messageries instantanées synchronisées par numéros (WhatsApp, Signal, Telegram), logiciels rattachés de salons vocaux-écrits communautaires (Discord, Slack) et systèmes intégrés de profils.',
      retroAnecdote: 'Le son légendaire du "Uh-Oh !" d\'ICQ était si ancré pour les premiers utilisateurs qu\'il a été copié-collé et inséré dans de nombreuses productions de musique électronique underground de la fin des années 1990 !',
      specials: ['Uh-Oh Sound', 'UIN Registry', 'Mirabilis History', 'AOL & VK Battles']
    },
    {
      id: 'yahoo_answers',
      name: 'Yahoo! Questions/Réponses',
      icon: '❓',
      birthYear: '2005',
      deathYear: '2021',
      epitaph: 'Ci-gît le temple mondial du savoir improvisé, de la camaraderie naïve et des questions incongrues, terrassé par l\'évolution des moteurs de recherche et la modération impossible.',
      summary: 'Lancé en décembre 2005, Yahoo! Questions/Réponses était une plateforme communautaire d\'esprit collaboratif permettant à quiconque de poser une question et d\'obtenir des réponses de la part d\'autres internautes, récompensés par un système de points et de niveaux.',
      whyItRuled: 'À l\'époque du Web 2.0 naissant, Yahoo! Q/R est devenu une référence absolue de l\'entraide gratuite. Les internautes s\'y pressaient pour trouver des explications immédiates sur tout et n\'importe quoi. Des rubriques comme "Actualité et Événements", "Amour" (le confessionnal des adolescents d\'alors), et des espaces hautement polémiques tels que "Politique", "Immigration", ou le sujet enflammé de la "Corrida" suscitaient des débats d\'une ferveur de forum inégalée. Les utilisateurs adoraient gravir les échelons pour obtenir le badge de "Meilleur contributeur", créant un vivier vivant de discussions passionnées, amusantes ou profondément sincères.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>
          Pourquoi cette plateforme mythique a-t-elle fini par fermer ses portes le 4 mai 2021 ?
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>
            <strong class="text-indigo-400">Le fléau de la modération impossible (Disclaimer) :</strong> Au fil des années, la plateforme a souffert d'un glissement délétère. Faute d'outils de modération structurés et d'investissements de Yahoo, certaines rubriques sensibles (Politique, Immigration, Corrida) sont devenues le terreau de dérives haineuses, hébergeant parfois des propos racistes, homophobes, complotistes ou injurieux. <em class="text-amber-450 font-semibold text-[10.5px]">Il convient toutefois de souligner un disclaimer essentiel : bien que ces débordements aient terni son image à la fin, l'immense majorité des contributions sur Yahoo! Q/R demeurait profondément bienveillante, axée sur la camaraderie, le dépannage quotidien, la curiosité enfantine et le réconfort humain gratuit.</em>
          </li>
          <li>
            <strong class="text-indigo-400">La montée de plateformes expertes (Reddit, Quora, StackOverflow) :</strong> Le modèle du "savoir généraliste" non vérifié a perdu de sa valeur face à des espaces hautement spécialisés. Les internautes ont préféré la rigueur de StackOverflow pour le code, la structure thématique des subreddits ou la modération par vote de Quora.
          </li>
          <li>
            <strong class="text-indigo-405">Le désinvestissement stratégique d'un Yahoo déclinant :</strong> Dépassé par Google, Yahoo s'est recentré sur ses activités de médias purs. Face aux coûts de stockage de dizaines de millions de données textuelles obsolètes et le risque de réputation constant, la décision radicale a été prise d'effacer définitivement toute la base historique, sans possibilité de consultation.
          </li>
        </ul>
      </div>`,
      modernSuccessor: 'Quora (pour les questions généralistes), Reddit (pour les débats communautaires thématiques) et Stack Exchange.',
      retroAnecdote: `Parallèlement, la décennie 2000-2010 a vu l'essor de Doctissimo en France. Véritable équivalent et référence absolue des forums de santé et de vie quotidienne, Doctissimo partageait cette même double identité : un immense espace d'entraide humaine indispensable et bienveillant, doublé d'un vivier mythique d'hypocondrie collective et de discussions sentimentales ou intimes devenues des mèmes d'époque dans la culture web francophone.`,
      specials: ['Discussions Cultes', 'Disclaimer Bienveillance', 'Parallel Doctissimo', 'Points & Niveaux XML']
    },
    {
      id: 'dreamweaver',
      name: 'Dreamweaver 2 & 3',
      icon: '🎛️',
      birthYear: '1997',
      deathYear: 'Racheté par Adobe en 2005',
      category: 'editors',
      epitaph: 'Ci-gît le mythique roi du WYSIWYG et du fenêtrage flottant multiple, qui a permis à toute une génération de concevoir des sites par tableaux imbriqués et GIFs transparents.',
      summary: 'Édité à l\'origine par Macromedia en 1997, racheté par Adobe en 2005, Dreamweaver a régné en maître absolu sur la création de sites internet pour les professionnels et agences de communication au tournant du millénaire, en particulier via ses légendaires versions 2 (1998) et surtout 3 (1999).',
      whyItRuled: 'À la fin des années 1990, écrire du code à la main était lent. Dreamweaver a révolutionné le marché en introduisant le concept de "split screen" automatique (Code & Plan Visuel synchronisés en temps réel). Intégrant parfaitement Flash et Fireworks, doté d\'un gestionnaire de transfert FTP robuste, il offrait la technologie "Roundtrip HTML" : contrairement à Microsoft FrontPage, il garantissait que l\'éditeur ne modifierait pas à votre insu le code source écrit manuellement. Les développeurs adoraient sa palette d\'objets invisibles, sa "Layout View" dessinant des tableaux de mise en page à la volée, et la génération programmée de roll-overs complexes en JavaScript d\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le déclin inéluctable de cet éditeur WYSIWYG s'explique par l'évolution profonde des paradigmes du Web :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La transition des tableaux HTML vers le CSS sémantique :</strong> Les éditeurs WYSIWYG généraient un code HTML extrêmement verbeux basé sur des tableaux imbriqués et des dizaines de GIFs transparents de 1 pixel ("spacer.gif") pour caler les éléments. Lorsque le W3C a imposé la séparation stricte du fond (HTML) et de la forme (Sass / CSS moderne avec divisions flexbox/grid), concevoir visiellement en glisser-déposer est devenu impossible.</li>
          <li><strong class="text-indigo-400">Le passage à des architectures par composants réactifs :</strong> À partir de 2013, le développement moderne a basculé vers le Component-Driven development (React, Vue, TS). Un éditeur visuel ne peut pas modéliser le cycle de vie de composants réactifs, de requêtes API asynchrones ou de states, condamnant les outils WYSIWYG traditionnels.</li>
          <li><strong class="text-indigo-400">Le rachat stratégique et l'avènement de VS Code :</strong> Après le rachat de Macromedia par Adobe en 2005, le développement de Dreamweaver s'est ralenti. La communauté a massivement basculé vers des éditeurs de code légers et hautement extensibles gratuits comme Sublime Text, Atom puis VS Code.</li>
        </ul>
      </div>`,
      modernSuccessor: 'VS Code ou Cursor pour le code pur et structuré ; Webflow ou Framer pour la composition visuelle contemporaine respectant les modèles CSS modernes.',
      retroAnecdote: 'Le split-view de Dreamweaver 3 était si novateur qu\'il a instantanément défini l\'ergonomie standard de tous les outils de création web pour la décennie suivante.',
      specials: ['Macromedia Era', 'Split View', 'Roundtrip HTML', 'WYSIWYG King']
    },
    {
      id: 'frontpage',
      name: 'Microsoft FrontPage',
      icon: '📄',
      birthYear: '1995',
      deathYear: '2003 (Remplacé par Expression Web puis arrêté)',
      category: 'editors',
      epitaph: 'Ci-gît le traitement de texte déguisé en éditeur de pages Web, champion absolu du code HTML gonflé et des extensions serveurs propriétaires obligatoires.',
      summary: 'Lancé par Vermeer Technologies puis racheté par Microsoft en 1996 pour l\'intégrer à la suite MS Office, FrontPage promettait de rendre la création d\'un site web aussi simple et intuitive qu\'écrire un document Word.',
      whyItRuled: 'En ciblant le grand public et les secrétariats d\'entreprise, FrontPage a démocratisé la création de pages d\'accueil personnelles. L\'intégration parfaite avec Word et Excel permettait d\'importer des tableaux volumineux à la volée. FrontPage incluait des fonctionnalités instantanées magiques appelées "WebBots" (compteurs de visites, formulaires automatisés, barres de recherche locales) activables sans écrire la moindre ligne de code d\'arrière-plan.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Plusieurs faiblesses techniques insurmontables ont précipité sa fin :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">L'exigence des "FrontPage Server Extensions" :</strong> Pour faire fonctionner ses WebBots interactifs, le serveur d'hébergement devait installer des scripts et exécutables Microsoft propriétaires. C'était un cauchemar de sécurité (trous de mémoire, failles IIS) et de portabilité matérielle que les serveurs Linux interdisaient ou n'implémentaient pas universellement.</li>
          <li><strong class="text-indigo-400">Un code HTML effroyablement lourd et non-standard :</strong> FrontPage insérait par défaut des centaines de lignes d'instructions XML propriétaires Microsoft Office (balises <code class="text-pink-450 bg-slate-900 px-1 py-0.5 rounded">&lt;o:p&gt;</code>, namespaces spécifiques), des chemins d'accès locaux absolus "C:\\My Documents", et du VBScript incompatible, rendant l'affichage des sites chaotique en dehors d'Internet Explorer.</li>
          <li><strong class="text-indigo-400">Le triomphe général des standards du W3C :</strong> Au fil des années, la communauté web a vigoureusement rejeté les outils qui encourageaient la violation des normes universelles au profit de monopoles propriétaires, poussant Microsoft à abandonner le projet.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Outils SaaS de landing-pages (Wix, Squarespace) ou des CMS visuels respectueux du W3C.',
      retroAnecdote: 'Les formulaires générés par FrontPage stockaient les saisies des internautes dans des fichiers bruts situés dans des dossiers cachés baptisés "_vti_cnf" ou "_private", lisibles en clair par toute personne tapant l\'adresse URL directe !',
      specials: ['Microsoft Office', 'Server Extensions', 'WebBots', 'IE6 Target']
    },
    {
      id: 'golive',
      name: 'Adobe GoLive',
      icon: '🎨',
      birthYear: '1996',
      deathYear: '2008 (Arrêt définitif)',
      category: 'editors',
      epitaph: 'Ci-gît GoLive (l\'audacieux CyberStudio originel de GoNet) et Netscape Composer, vaillants combattants de la mise en grille restés dans l\'ombre de Dreamweaver.',
      summary: 'Adobe GoLive (conçu à l\'origine par GoNet sous le nom de CyberStudio avant d\'être acheté par Adobe en 1999) et Netscape Composer incarnent les alternatives de l\'époque pour dessiner de l\'hypertexte.',
      whyItRuled: 'GoLive offrait aux graphistes professionnels des outils de tracé vectoriel précis, ainsi qu\'un éditeur de timeline pour concevoir des animations dynamiques complexes (Dynamic HTML) en modifiant les positions de calques. Netscape Composer, de son côté, excellait par sa simplicité absolue : intégré à la suite gratuite Netscape Communicator, il permettait de corriger instantanément une faute de frappe sur sa page personnelle en deux clics sans installer d\'outils externes.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Les raisons de leur effacement commercial définitif :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Un sabordage commercial interne chez Adobe :</strong> Suite au rachat spectaculaire de Macromedia par Adobe en 2005, Adobe s'est retrouvé propriétaire de deux éditeurs de premier plan rivaux : GoLive et Dreamweaver. L'entreprise a choisi de pérenniser Dreamweaver, tuant définitivement GoLive en 2008.</li>
          <li><strong class="text-indigo-400">Le déclin lié au fureteur Netscape Navigator :</strong> Netscape Composer a suivi la trajectoire descendante globale de Netscape face à la déferlante Internet Explorer, sa compatibilité avec l'avancée rapide de la spécification CSS n'étant plus assurée.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Framer, Webflow ou l\'éditeur moderne basé sur les Web Composants modernes.',
      retroAnecdote: 'Adobe GoLive possédait un module de visualisation magique en 3D représentant les calques d\'une page web sous forme de blocs d\'immeubles texturés, la hauteur de chaque pilier traduisant la valeur CSS "z-index" correspondante !',
      specials: ['CyberStudio', 'Netscape Suite', 'z-index 3D View', 'Adobe Decisions']
    },
    {
      id: 'skyblog',
      name: 'Les Skyblogs (Skyrock)',
      icon: '📔',
      birthYear: '2002',
      deathYear: '2023 (Archivé à la BnF)',
      category: 'network',
      epitaph: 'Ci-gît le temple absolu de l\'adolescence des années 2000, ses écritures SMS colorées, ses GIFs pailletés et le fameux et incontournable "Lâche tes coms !" d\'anthologie.',
      summary: 'Créé par la radio Skyrock en 2002, Skyrock Blog (ou Skyblog) a été le plus grand réseau social de blogs en France et le 17e site mondial en 2007. Il a permis à une génération entière de s\'approprier un espace d\'intimité publique numérique.',
      whyItRuled: 'Skyblog offrait une simplicité déroutante : en deux clics, on créait sa page sans connaître une ligne d\'HTML. Les adolescents y publiaient leurs chroniques de vie, photos pixelisées prises à la webcam ou d\'appareils argentiques, paroles de rap, dédiant des articles entiers à leur cercle d\'amis. Le bouton d\'engagement universel "Lâche tes coms !" ainsi que le compteur de visites ont introduit l\'économie de l\'attention et des likes bien avant Instagram ou Facebook. C\'était un espace libérateur d\'expression libre, de journal intime collectif et de construction de l\'identité numérique.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le déclin et la fermeture finale de cette plateforme culte en août 2023 répondent à des problématiques modernes :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La transition immédiate vers Facebook et le smartphone :</strong> À partir de 2008, l'arrivée de Facebook en français, puis des smartphones (iPhone, Android) avec des applications dédiées (Instagram, Snapchat) a instantanément ringardisé le format blog sur ordinateur. Les jeunes ont préféré des profils normalisés facilitant les clichés mobiles rapides.</li>
          <li><strong class="text-indigo-400">Un design et une ergonomie figés :</strong> Resté attaché à sa mise en page rectiligne figée très Web 1.5, Skyblog était inadapté aux écrans mobiles responsifs et saturé de publicités d'époque.</li>
          <li><strong class="text-indigo-400">Le poids de la conformité légale (RGPD) :</strong> Héberger des millions de blogs laissés à l'abandon depuis 15 ans avec des visages d'enfants mineurs et des données nominatives non sécurisées représentait une responsabilité juridique et financière colossale pour le groupe Skyrock, poussant sa direction à figer et couper les serveurs en 2023 (tout en transférant les archives à la BNF).</li>
        </ul>
      </div>`,
      modernSuccessor: 'Instagram, TikTok pour la mise en scène personnelle ; Tumblr ou Medium pour le blogging textuel.',
      retroAnecdote: 'Les polices pailletées générées sur des sites comme "Dafont" ou des générateurs de textes d\'époque, collées en fond d\'image, rendaient la lecture de certains blogs physiquement douloureuse tant le contraste de couleurs était hasardeux.',
      specials: ['Lâche tes coms', 'Génération MSN', 'Skyrock Radio', 'Archivé à la BNF']
    },
    {
      id: 'multimania_standalone',
      name: 'Multimania',
      icon: '🏰',
      birthYear: '1995',
      deathYear: '2000 (Racheté par Lycos)',
      category: 'acquired',
      epitaph: 'Ci-gît la cité pionnière à l\'origine de l\'hébergement web francophone, victime de sa riposte tardive face à l\'offre d\'espace illimité.',
      summary: 'Fondé en 1995 par Michel Meyer et Olivier de Baillenx, Multimania a été le premier hébergeur grand public gratuit francophone, offrant à chacun de quoi fonder sa parcelle numérique en échange d\'un bandeau de pub.',
      whyItRuled: 'À une époque où héberger un site exigeait des abonnements onéreux, Multimania offrait 10 Mo (puis 50 Mo), un accès FTP et des outils d\'administration web simples. C\'était magique : n\'importe quel passionné pouvait publier son code HTML de fansite Star Wars ou d\'émulation console. Multimania a vu grandir les prémices du web francophone, hébergeant d\'immenses communautés de créateurs.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le pionnier a péri sous le feu de la concurrence et du changement de modèle :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le rachat par Lycos et la dégradation de l'expérience :</strong> Acheté en 2000 par Lycos Europe pour une somme colossale, Multimania a été progressivement étouffé sous les publicités intrusives. L'insertion forcée de fenêtres publicitaires sauvages ("pop-ups") à chaque chargement de page a fait fuir les créateurs d'origine.</li>
          <li><strong class="text-indigo-400">L'offre imbattable de Free.fr :</strong> Free a lancé son offre d'hébergement "Pages Persos" entièrement gratuite, sans publicité obligatoire, et proposant d'emblée un grand espace disque avec le support de PHP et de bases de données MySQL, balayant instantanément le modèle publicitaire de Multimania.</li>
        </ul>
      </div>`,
      modernSuccessor: 'GitHub Pages, Vercel ou Netlify.',
      retroAnecdote: 'La fureur des créateurs Multimania s\'est exprimée lors du rachat par Lycos, lorsque l\'hébergeur a imposé une barre publicitaire latérale permanente qui déballait entièrement les cadres ("frames") soignés façonnés par les webmasters.',
      specials: ['FTP Upload', 'Pionnier FR', 'Popups Era', '10 Mo Gratuit']
    },
    {
      id: 'lycos_standalone',
      name: 'Lycos',
      icon: '🐕',
      birthYear: '1994',
      deathYear: 'Déclin commercial au profit de Google',
      category: 'network',
      epitaph: 'Ci-gît le retriever le plus célèbre du web francophone, qui n\'a plus su où chercher une fois que le PageRank de Google a réinventé la navigation mondiale.',
      summary: 'Né comme projet de recherche à l\'université Carnegie-Mellon en 1994, Lycos est devenu un moteur de recherche hégémonique et un portail d\'accueil universel au début des années 2000.',
      whyItRuled: 'Porté par sa mascotte inoubliable, un chien noir ultra-dynamique obéissant au slogan "Lycos, va chercher !", le site faisait partie du top mondial des destinations web. En rachetant Multimania, Tripod et Spray, Lycos a constitué un empire d\'hébergement, d\'e-mails et de salons de tchat d\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Pourquoi le célèbre toutou d'Internet a-t-il mordu la poussière ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le rouleau compresseur Google :</strong> Lycos classait ses résultats par pertinence basique de mots-clés (facilement spammables par "keyword stuffing"). Google est arrivé avec son algorithme PageRank s'appuyant sur les liens hypertextes croisés, fournissant des résultats infiniment plus précis en une fraction de seconde, détrônant instantanément Lycos.</li>
          <li><strong class="text-indigo-400">L'épuisement sous l'effet "portail" :</strong> À l'instar de Yahoo, Lycos a voulu devenir un portail fourre-tout saturé de météo, de cours de bourse, d'horoscope et de publicités, alors que les internautes voulaient simplement un champ de recherche vide et rapide.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Google, DuckDuckGo, Bing.',
      retroAnecdote: 'Les spots publicitaires télévisés mettant en scène le retriever virtuel noir bondissant à travers les circuits informatiques pour "rapporter" un résultat de recherche ont marqué l\'imaginaire de la France du début de l\'ADSL.',
      specials: ['Va Chercher !', 'Mascotte Culte', 'Portail 2000', 'Carnegie-Mellon']
    },
    {
      id: 'voila_portal',
      name: 'Voilà',
      icon: '🍊',
      birthYear: '1998',
      deathYear: '2015 (Fermeture complète)',
      category: 'network',
      epitaph: 'Ci-gît le moteur de recherche historique de France Télécom, digne serviteur du Minitel 2.0 et de la boîte mail voilà.fr adorée des Français.',
      summary: 'Lancé en 1998 par France Télécom (Orange), Voilà était à la fois un portail d\'actualités, un annuaire de référence, un moteur de recherche francophone et un service d\'e-mail gratuit massivement adopté en France.',
      whyItRuled: 'Voilà régnait sur l\'Internet de l\'Hexagone grâce à sa position de page d\'accueil par défaut de tous les abonnements Wanadoo. Son annuaire était riche et mis à jour très précisément. Mais ce qui a assuré son immortalité, ce sont les adresses e-mails "@voila.fr" gratuites, faciles à prononcer et à retenir, qui ont servi de boîte aux lettres principale à des millions de foyers français.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le sabordage de Voilà s'explique par les mutations stratégiques de son opérateur d'origine :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">L'unification d'Orange :</strong> France Télécom a décidé d'unifier toutes ses marques (Wanadoo, Voilà, MaLigneTV) sous la bannière unique "Orange". Dès lors, Voilà a cessé de faire l'objet de développements techniques majeurs, se transformant en un portail de secours.</li>
          <li><strong class="text-indigo-400">Le raz-de-marée Gmail de Google :</strong> L'arrivée de Gmail en 2004 avec son stockage de 1 Giga-Octet (contre 2 Mo ou 10 Mo pour Voilà à l'époque) puis l'apparition des applications asynchrones réactives ont rendu obsolète l'interface e-mail de Voilà, qui s'est progressivement vidée de ses utilisateurs.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Orange Mail, Gmail, ProtonMail.',
      retroAnecdote: 'En 2015, l\'annonce de la fermeture définitive de Voilà et la suppression de toutes les boîtes e-mails ont déclenché une immense vague de colère en France, se soldant par des pétitions d\'utilisateurs désespérés de conserver l\'adresse e-mail de leur enfance.',
      specials: ['France Télécom', 'Wanadoo Era', 'Mail @voila.fr', 'Patrimoine FR']
    },
    {
      id: 'altavista',
      name: 'AltaVista',
      icon: '🔭',
      birthYear: '1995',
      deathYear: '2013 (Fermé définitivement par Yahoo)',
      category: 'network',
      epitaph: 'Ci-gît le tout premier télescope géant de la recherche web, capable d\'indexer l\'Internet mondial à la vitesse de la lumière avant que Google n\'en rationalise la pertinence.',
      summary: 'Créé par les chercheurs de Digital Equipment Corporation (DEC) en 1995, AltaVista a été le premier moteur de recherche à indexer une part colossale de l\'Internet mondial avec un crawler performant (Scooter).',
      whyItRuled: 'Avant AltaVista, chercher un site web prenait des plombes et on se butait à des annuaires incomplets. AltaVista a stupéfié le monde grâce à ses serveurs supercalculateurs 64 bits de DEC, effectuant des recherches sur des millions de pages web en quelques millisecondes. AltaVista a également inventé "Babelfish", le tout premier traducteur automatique de pages web en ligne au monde.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Comment le seigneur de l'indexation s'est-il fait balayer ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le fléau de la refonte en portail publicitaire :</strong> Racheté à plusieurs reprises, AltaVista a pris la décision dramatique d'abandonner son design d'origine super propre et centré sur la recherche pour copier AOL et Yahoo. Il est devenu un portail touffu chargé de pubs, de widgets boursiers et d'actualités, perdant l'identité visuelle que Google a justement reprise à son compte.</li>
          <li><strong class="text-indigo-400">L'incapacité à déjouer le spam de mots-clés :</strong> L'algorithme d'AltaVista indexait seulement la récurrence de texte. Les référenceurs d'époque en ont abusé en écrivant des dizaines de mots-clés cachés en texte blanc sur fond blanc en bas de page pour tricher, dégradant gravement la qualité de ses recherches face à l'ingénieux PageRank de Google.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Google, Bing ou le traducteur DeepL/Google Translate (héritiers directs de Babelfish).',
      retroAnecdote: 'AltaVista a été victime d\'un imbroglio financier légendaire : ils n\'avaient pas réservé le nom de domaine internet direct "altavista.com" au départ, devant reverser une somme phénoménale de 3,3 millions de dollars en 1998 pour racheter l\'adresse à la société AltaVista Technology !',
      specials: ['DEC Alpha Servers', 'Babelfish Translate', 'First Real Crawler', 'Domain Scandal']
    },
    {
      id: 'telecharger',
      name: 'Télécharger.com',
      icon: '📥',
      birthYear: '1997',
      deathYear: 'Fusionné et déclin des logiciels tiers',
      category: 'network',
      epitaph: 'Ci-gît le supermarché de la disquette numérique, temple suprême du shareware d\'époque, du crack inoffensif et des codecs DivX indispensables.',
      summary: 'Lancé en 1997, Télécharger.com a été le portail francophone ultime de référencement de logiciels, jeux, démos et utilitaires pour PC et Mac à glisser sur disque dur.',
      whyItRuled: 'Avant le très haut débit, trouver et télécharger un logiciel sûr (Winamp, VLC, MSN Messenger, IncrediMail ou Kazaa) relevait du parcours du combattant. Télécharger.com était la cathédrale sacrée du téléchargement : des serveurs haut débit français garantissant d\'excellents temps de réponse, une classification par catégories soignée et des avis détaillés de la rédaction de 01net de l\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le déclin de ce modèle s'explique par l'avènement des magasins d'applications contrôlés et du web SaaS-first :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le ras-le-bol des instalateurs publicitaires (Adwares) :</strong> Dans les années 2010, pour augmenter les profits, le site a commencé à empaqueter ses téléchargements dans des installeurs contenant des publicitaires forcés (adwares, barres d'outils types Babylon Search ou Ask Toolbar). Cela a ravagé la confiance des utilisateurs, qui ont fui vers les sites officiels des éditeurs de logiciels originels.</li>
          <li><strong class="text-indigo-400">La domination des App Stores et du Cloud :</strong> Aujourd'hui, les ordinateurs (Windows Store, Mac App Store) et les mobiles intègrent d'office leur propre magasin sécurisé d'applications d'un clic. Le concept même de devoir télécharger manuellement un fichier installateur indépendant ".exe" ou ".dmg" a quasiment disparu du quotidien du grand public.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Mac App Store, Microsoft Store, dépôts de packages CLI de pointe (Chocolatey, Winget, Homebrew).',
      retroAnecdote: 'C\'est sur Télécharger.com que la France entière s\'est ruée en 2002 pour télécharger le pack de codecs "Simo\'s DivX Pack" ou "K-Lite Codec Pack" afin de pouvoir lire les films compressés au format ".avi" récupérés en ligne sur eMule.',
      specials: ['Anciens Sharewares', 'Winamp Skins', 'La Suite 01net', 'Codecs DivX']
    },
    {
      id: 'jeuxflash',
      name: 'AbsoluFlash / Jeux-Flash.com',
      icon: '🎮',
      birthYear: '1998',
      deathYear: '2020 (Fin de Flash)',
      category: 'network',
      epitaph: 'Ci-gît la salle d\'arcade infinie des salles informatiques de collèges, paradis du "casual gaming" pionnier terrassé par l\'extinction définitive du lecteur Flash Player d\'Adobe.',
      summary: 'Créés pour fédérer et proposer le catalogue de jeux interactifs vectoriels conçus sous Flash (ou Shockwave), les portails comme AbsoluFlash ou Jeux-Flash.com ont amusé des millions d\'enfants et de salariés s\'ennuyant devant leur écran d\'ordinateur.',
      whyItRuled: 'Ces sites étaient des trésors de récréation instantanée. Pas besoin d\'installer de gros jeux sur le disque dur du PC familial : on cliquait, et le jeu se chargeait en 10 secondes. Ils offraient des heures de rigolade sur des références immortelles comme "Yetisports" (lancer de pingouin), "Defend Your Castle", les animations interactives d\'Happy Tree Friends, ou les excellents jeux d\'artillerie d\'esprit Flash légendaires.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Ces temples de la récréation numérique ont péri d'un coup de sabre logiciel :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le retrait mondial du plugin Flash Player en 2020 :</strong> Le 31 décembre 2020, Adobe décactive et bloque l'exécution de tout son code d'animation interactif dans les navigateurs. Sans support Flash, ces milliers de jeux d'antologie sont devenus instantanément illisibles, transformant ces annuaires de jeux en coquilles vides obsolètes.</li>
          <li><strong class="text-indigo-400">Le basculement massif vers les jeux mobiles (App Store / Play Store) :</strong> Les créations casual se sont déplacées sur mobiles (Angry Birds, Candy Crush), détrônant le jeu sur page web par navigateur.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Portails HTML5 sémantiques (itch.io, CrazyGames) et les émulateurs de pointe en WebAssembly (Ruffle) pour faire revivre ces jeux rétro.',
      retroAnecdote: 'Les administrateurs informatiques des écoles et administrations se livraient à une guerre permanente contre AbsoluFlash, devant bloquer manuellement l\'adresse IP de ces sites afin d\'éviter que les élèves n\'y passent l\'intégralité de leurs heures de cours en salle info !',
      specials: ['Yetisports', 'Web Arcade', 'Shockwave Player', 'Ruffle Emulator']
    },
    {
      id: 'habbo',
      name: 'Habbo Hotel',
      icon: '🏨',
      birthYear: '2000',
      deathYear: 'Déclin d\'audience (toujours actif en niche)',
      category: 'network',
      epitaph: 'Ci-gît le lobby en vue isométrique pixel-art le plus célèbre des années 2000, paradis de la discussion en bulles et des arnaques de meubles virtuels (Mobicartes).',
      summary: 'Lancé en 2000 par la société finlandaise Sulake sous le nom d\'Hotelli Kultakala, Habbo Hotel est un monde virtuel et un espace de discussion destiné aux adolescents, représenté sous la forme d\'un immense hôtel en pixel-art isométrique.',
      whyItRuled: 'Habbo a inventé la socialisation immersive en ligne d\'époque. L\'utilisateur personnalisait son avatar pixelisé, louait sa chambre virtuelle et l\'aménageait à l\'aide de meubles d\'époque stylés ("Furnis") achetés avec de vrais crédits terrestres. C\'était l\'endroit de ralliement culte après les cours pour discuter, participer à des jeux de rôle organisés par de jeunes animateurs en herbe, ou parader devant la piscine virtuelle de l\'hôtel.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Le déclin de cet empire virtuel en pixels s'explique par de multiples crises d'époque :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Les polémiques de sécurité et de cyberharcèlement :</strong> En 2012, un reportage de Channel 4 pointe du doigt l'absence de modération efficace面对 de graves dérives de prédateurs rôdant au milieu des adolescents. La plateforme a dû couper tous ses tchats ("Great Habbo Mute"), anéantissant l'interactivity d'origine.</li>
          <li><strong class="text-indigo-400">La transition technique post-Flash traumatique :</strong> Habbo tournait sur Flash Player. La transition vers Unity puis HTML5 pour survivre en 2020 s'est soldée par une interface buggée, lourde et boudée par les nostalgiques qui ont regretté l'ancienne réactivité fluide.</li>
          <li><strong class="text-indigo-400">L'émergence de jeux immersifs 3D (Minecraft, Roblox, Fortnite) :</strong> Les enfants ont rapidement préféré des mondes 3D à fort contrôle physique (Minecraft ou Roblox) aux chatrooms isométriques 2D statiques.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Roblox, VRChat, Discord pour les salons communautaires légers.',
      retroAnecdote: 'Les crédits Habbo s\'achetaient massivement par de jeunes mineurs en dérobant le téléphone des parents pour composer des numéros Audiotel payants ou envoyer des SMS surtaxés récupérés au dos des "Mobicartes" d\'héritage SFR ou Wanadoo !',
      specials: ['Sulake Pixelart', 'Furnis Market', 'La Piscine Habbo', 'Audiotel Crisis']
    },
    {
      id: 'koreus',
      name: 'LeBottinCinglé / Koreus',
      icon: '🎬',
      birthYear: '2002',
      deathYear: 'Déclin d\'audience au profit des plateformes vidéo',
      category: 'network',
      epitaph: 'Ci-gît le point de triage des vidéos cultes, des diaporamas humoristiques PPT de secrétariat en entreprise et du LOL pré-historique d\'Internet.',
      summary: 'Avant l\'arrivée de YouTube ou de Dailymotion, les portails francophones d\'esprit "curateur" comme Koreus ou LeBottinCinglé étaient l\'unique moyen de découvrir et visionner les mèmes et vidéos virales circulant sur le web.',
      whyItRuled: 'Dans les années 2000, la vidéo en ligne ne s\'hébergeait pas gratuitement. Pour rire et se divertir, on se connectait quotidiennement sur Koreus ou LeBottinCinglé. Ces passionnés dénichaient de courtes animations d\'humour, des gags en fichiers ".wmv" ou de gros fichiers d\'animations flash insolites. C\'était le foyer de créations mémorables d\'époque partagées par e-mails.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Comment ces précurseurs du LOL se sont-ils fait dépasser ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La suprématie de YouTube :</strong> À partir de 2005/2006, YouTube fournit une infrastructure de diffusion mondiale illimitée, gratuite, de haute qualité avec un player Flash universel, rendant l'hébergement artisanal de petits clips vidéos lourds non économique pour ces annuaires.</li>
          <li><strong class="text-indigo-400">L'essor des réseaux sociaux algorithmiques :</strong> Aujourd'hui, les mèmes se créent et se propagent de manière autonome en 5 secondes sur Twitter, TikTok ou Instagram sans passer par un intermédiaire de tri humain gérant un annuaire web statique de vidéos d'époque.</li>
        </ul>
      </div>`,
      modernSuccessor: 'TikTok, YouTube Shorts, Reddit (r/videos, r/funny) et Twitter.',
      retroAnecdote: 'La moitié des vidéos partagées sur LeBottinCinglé arrivait dans les boîtes e-mails professionnelles sous forme de lourds diaporamas Microsoft PowerPoint au format ".pps" ou ".ppt", qu\'on s\'envoyait discrètement de collègue en collègue entre deux rendez-vous d\'affaires.',
      specials: ['Pre-YouTube', 'Vidéos Insolites', 'Fichiers PPS', 'Culture Mèmes']
    },
    {
      id: 'siteduzero',
      name: 'Le Site du Zéro',
      icon: '🎓',
      birthYear: '1999',
      deathYear: '2013 (OpenClassrooms)',
      category: 'network',
      epitaph: 'Ci-gît le temple de l\'apprentissage informatique de toute une génération de développeurs francophones, transformé en plateforme commerciale.',
      summary: 'Le Site du Zéro était la plus grande communauté d\'apprentissage programmation de langue française, réputée pour ses tutoriels progressifs particulièrement adaptés aux novices démunis de connaissances préalables.',
      whyItRuled: 'Créé en 1999 par Mathieu Nebra, alors âgé de 13 ans, le site proposait des tutoriels extrêmement limpides avec sa sainte mascotte Zozor et un ton convivial dénué de jargon lourd. Sa communauté d\'entraide comptait des millions de codeurs qui y ont fait leurs premiers pas sur l\'HTML, le PHP, le MySQL ou les langages compilés.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-350 leading-relaxed">
        <p>Pourquoi cet esprit communautaire de partage bénévole gratuit a-t-il disparu ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">Le pivot commercial vers OpenClassrooms (2013) :</strong> Pour structurer l'entreprise et assurer une viabilité financière, l'équipe efface le nom historique, abandonne la mascotte Zozor et transforme le site en plateforme de formation certifiante par abonnements payants.</li>
          <li><strong class="text-indigo-400">La perte de l'esprit ouvert libre :</strong> Cette mutation a écarté les rédacteurs amateurs bénévoles d'origine, laissant les nostalgiques orphelins de l'enthousiasme du web d'époque.</li>
        </ul>
      </div>`,
      modernSuccessor: 'OpenClassrooms, MDN Web Docs, freeCodeCamp, ou Grafikart.',
      retroAnecdote: 'Les manuels "Concevez votre site web avec PHP et MySQL" édités par le Site du Zéro trônaient sur les bureaux de presque tous les étudiants en informatique des années 2000.',
      specials: ['Zozor Mascotte', 'Tutoriels Libres', 'Mathieu Nebra', 'WAMP Guides']
    },
    {
      id: 'allhtml',
      name: 'AllHTML',
      icon: '📁',
      birthYear: '1998',
      deathYear: '2009 (Déclin progressif)',
      category: 'network',
      epitaph: 'Ci-gît la première trousse à outils des "Webmasters" francophones, supplantée par la standardisation globale du W3C.',
      summary: 'AllHTML fournissait aux webmasters des années 2000 des fiches de balises HTML, des règles CSS naissantes et des dizaines de générateurs de code légers.',
      whyItRuled: 'Le site offrait des générateurs automatiques simples d\'utilisation : menus déroulants d\'un clic en JS, balises meta-tags SEO pour AltaVista, ou boîtes alertes pop-ups. Ses forums étaient bondés de concepteurs s\'entraidant pour brancher des serveurs FTP ou déboguer les fureteurs de l\'époque.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-355 leading-relaxed">
        <p>Le déclin d'AllHTML s'explique par sa stagnation face à l'avènement des nouveaux standards :</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La transition vers HTML5 et les frameworks modernes :</strong> AllHTML est resté attaché à sa configuration visuelle table-grid rétro et n'a pas survécu au responsive design et aux nouvelles API.</li>
          <li><strong class="text-indigo-400">La montée du réseau MDN et de StackOverflow :</strong> Les ressources unifiées fiables de Mozilla ont déclassé les petits portails de webmasters amateurs isolés.</li>
        </ul>
      </div>`,
      modernSuccessor: 'MDN Web Docs, W3Schools et StackOverflow.',
      retroAnecdote: 'Le compteur de connexions à l\'entrée d\'AllHTML affichait avec fierté plus de 20 millions de visites au début des années 2000.',
      specials: ['Générateurs JS', 'CHMOD FTP', 'Dictionnaire Balises', 'Webmasters FR']
    },
    {
      id: 'myspace',
      name: 'MySpace',
      icon: '🎵',
      birthYear: '2003',
      deathYear: '2008 (Déclin mondial au profit de Facebook)',
      category: 'network',
      epitaph: 'Ci-gît le seigneur absolu de la socialisation musicale en ligne, étouffé sous les injections de code CSS sauvage et la rapidité de Facebook.',
      summary: 'Lancé en 2003, MySpace de Chris DeWolfe et Tom Anderson offrait un espace d\'expression musicale totale doté d\'une modification complète du HTML/CSS par profil.',
      whyItRuled: 'Son succès venait de sa liberté d\'altérer la mise en page. Les membres injectaient des styles CSS délirants pour façonner leur page et y greffer des lecteurs de musiques MP3, devenant le tremplin d\'icônes musicales mondiales comme Lily Allen ou Arctic Monkeys.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-355 leading-relaxed">
        <p>Comment MySpace a-t-il été terrassé par Facebook ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La lassitude face au désordre visuel :</strong> L'absence d'homogénéité a causé des temps de chargement catastrophiques et d'abondants profils d'utilisateurs cassés par des scripts et styles incompatibles.</li>
          <li><strong class="text-indigo-400">L'émergence épurée de Facebook (2007) :</strong> Facebook a apporté un design blanc, uniforme, léger et structuré autour d'un fil d'actualités central fluide et sans fioritures publicitaires destructrices.</li>
        </ul>
      </div>`,
      modernSuccessor: 'Facebook, Twitter, Instagram, et Bandcamp ou SoundCloud pour les artistes.',
      retroAnecdote: 'Le co-fondateur de MySpace, Tom Anderson ("Tom"), était instantanément installé comme premier ami virtuel de chaque usager, célèbre par son cliché souriant devant son tableau blanc.',
      specials: ['Top 8 Amis', 'Style CSS Sauvage', 'Indie Rock Wave', 'Tom Anderson']
    },
    {
      id: 'dhtml',
      name: 'DHTML (Dynamic HTML)',
      icon: '✨',
      birthYear: '1997',
      deathYear: 'Début des années 2005 (DOM unifié / AJAX)',
      category: 'network',
      epitaph: 'Ci-gît l\'époque insouciante des rideaux de textes défilants, des traînées de souris scintillantes et des calques positionnés incompatibles.',
      summary: 'Combinant HTML4, CSS naissant et scripts (JavaScript/VBScript), le Dynamic HTML était une formule marketing forte pour désigner l\'interactivité côté client au tournant de l\'an 2000, avant que les standards rigoureux du DOM et AJAX n\'unifient l\'architecture Web.',
      whyItRuled: 'Avant le DHTML, une page web était désespérément figée. Le DHTML a tout éveillé : il a permis de créer les premiers menus déroulants interactifs, d\'animer et de déplacer des images en manipulant des calques absolus (<layer> chez Netscape et <div> absolute chez Internet Explorer), d\'ajouter des effets sonores au clic, ou de faire suivre le curseur par des cascades d\'étoiles colorées. C\'était l\'époque de l\'expérimentation visuelle décomplexée, adorée par tous les "webmasters" amateurs.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Pourquoi la frénésie du DHTML s'est-elle éteinte ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">La guerre absurde du Document Object Model (DOM) :</strong> Microsoft et Netscape ont implémenté deux manières totalement incompatibles de cibler les éléments. Pour déplacer un calque en JavaScript, le développeur devait écrire des acrobaties : <code>if (document.all)</code> (pour IE) et <code>if (document.layers)</code> (pour Netscape). Cette dualité rendait l'écriture de grands sites épuisante et instable.</li>
          <li><strong class="text-indigo-400">Le standard DOM unifié du W3C :</strong> Le W3C a mis fin au Far-West en standardisant l'accès universel et neutre via <code>document.getElementById()</code>, unifiant enfin les navigateurs.</li>
          <li><strong class="text-indigo-400">L'éclosion d'AJAX (2005) :</strong> L'apparition d'un échange asynchrone sécurisé de données en arrière-plan sans recharger les pages a ringardisé le bricolage DHTML au profit des puissantes Single Page Applications.</li>
        </ul>
      </div>`,
      modernSuccessor: 'L\'API DOM moderne, les frameworks de pointe (React, Vue) avec des transitions CSS matérielles intégrées.',
      retroAnecdote: 'Faire tomber de la neige virtuelle en cascade sur sa page personnelle en décembre à l\'aide d\'un script d\'une centaine de lignes DHTML "Javascript" était le summum du raffinement technique d\'un webmaster.',
      specials: ['document.layers', 'Guerre des DOM', 'Trainée d\'étoiles', 'Concept Marketing', 'Dynamic HTML']
    },
    {
      id: 'xml',
      name: 'XML (Extensible Markup Language)',
      icon: '📁',
      birthYear: '1998',
      deathYear: 'Remplacé massivement par le JSON (survit en de rares cas de niche/config)',
      category: 'network',
      epitaph: 'Ci-gît le langage de balisage ultra-rigide qui prétendait structurer toutes les données du globe, étouffé sous sa lourde et verbeuse bureaucratie syntaxique.',
      summary: 'Promis par le W3C à un avenir hégémonique universel avec le XHTML, le XML a été le format roi de structuration de documents et d\'échanges de données d\'entreprise (SOAP, XML-RPC) avant de céder face à l\'extrême agilité et concision du format JSON.',
      whyItRuled: 'À la fin de la décennie 1990, le Web s\'inquiétait de la transmission indisciplinée de données non structurées. Le XML offrait un cadre impitoyablement rigide : les développeurs pouvaient inventer leurs propres balises et forcer des validations de schémas (DTD, XSD). Le W3C croyait tellement à ce format qu\'il a échafaudé un écosystème géant tout-XML : XHTML pour forcer la fermeture de chaque balise HTML, XSLT pour transformer des documents et SOAP pour le web d\'entreprise.',
      whyItDiedHtml: `<div class="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
        <p>Pourquoi la promesse du tout-XML a-t-elle capitulé face à JSON ?</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><strong class="text-indigo-400">L'incontestable verbosité et lourdeur :</strong> Réécrire chaque balise d'ouverture à la fermeture (ex: <code>&lt;prenom&gt;Jean&lt;/prenom&gt;</code>) consommait d'immenses ressources de bande passante et s'avérait fastidieux par rapport au format JSON, léger, concis et naturellement décodé comme des objets mémoires par le JavaScript.</li>
          <li><strong class="text-indigo-400">La "Yellow Screen of Death" du XHTML :</strong> En voulant remplacer le HTML robuste par du XML strict, les navigateurs cessaient brutalement d'afficher la page web au moindre oubli de fermeture de balise ou d'unesperluette non échappée. Les développeurs révoltés ont abandonné la rigueur du W3C pour participer à la fronde du WHATWG menant à la naissance du HTML5 tolérant.</li>
          <li><strong class="text-indigo-400">Le pivot asynchrone vers JSON :</strong> Bien qu'AJAX contienne le terme XML, les concepteurs d'API ont rapidement banni le parsing fastidieux de documents XML (via responseXML) pour utiliser de simples requêtes JSON d'une vélocité incomparable.</li>
        </ul>
        <p class="text-slate-400 text-[11px] italic">
          Note : Bien que détrôné pour les API web dominantes, le XML survit aujourd\'hui dans des niches industrielles : les configurations Maven (pom.xml), le Manifest Android, le format SVG, les flux d\'actualités RSS, ou sous le capot des fichiers Word (.docx) ou Excel (.xlsx).
        </p>
      </div>`,
      modernSuccessor: 'Le format JSON pour les API, le format YAML pour l\'administration système et les configurations, et le HTML5 sémantique robuste.',
      retroAnecdote: 'Certains universitaires de l\'époque recommandaient d\'écrire les articles et fiches de sites en XML brut, d\'y lier des fichiers XSLT de 1000 lignes pour générer le HTML de sortie... une usine à gaz incommensurable.',
      specials: ['Validation XHTML', 'XML vs JSON', 'Yellow Screen of Death', 'Ecosystème SOAP', 'RSS Heritage', 'Survies de Niche']
    }
  ];

  // Enrich and sort the relics list based on the requested categories and orders
  const mappedRelics: Relic[] = orderedIds.map(id => {
    const found = relics.find(r => r.id === id);
    if (!found) return null;
    return {
      ...found,
      category: categoryMapping[id]
    } as Relic;
  }).filter((r): r is Relic => r !== null);

  const selectSubMenu = (menu: 'portals' | 'communities' | 'technologies' | 'tools' | 'farwest') => {
    setActiveSubMenu(menu);
    const firstOfCat = mappedRelics.find(r => r.category === menu);
    if (firstOfCat) {
      setActiveRelicId(firstOfCat.id);
    }
  };

  const filteredRelics = mappedRelics.filter(r => r.category === activeSubMenu);

  const activeRelic = mappedRelics.find(r => r.id === activeRelicId) || filteredRelics[0] || mappedRelics[0];

  // Theme styling mapping helper
  const getThemeCSS = () => {
    switch (theme) {
      case 'ie6':
        return {
          banner: "bg-[#000080] text-white p-1.5 border-b border-white text-xs font-bold flex items-center gap-1.5 font-sans justify-between select-none rounded-none",
          panel: "bg-[#d4d0c8] border-2 border-outset border-white p-4 font-sans text-black rounded-none shadow-sm",
          listItem: (active: boolean) => active 
            ? "bg-[#c0c0c0] font-bold border-2 border-inset border-white p-2.5 flex items-center justify-between text-xs rounded-none" 
            : "bg-[#d4d0c8] hover:bg-[#c0c0c0] border-2 border-outset border-white p-2.5 flex items-center justify-between text-xs cursor-pointer rounded-none",
          detailsBox: "bg-white border-2 border-inset border-[#808080] p-4 text-xs font-sans text-black space-y-4",
          cardTitle: "text-base font-black text-[#000080] border-b-2 border-dashed border-[#808080] pb-2 font-sans flex items-center gap-2",
          badge: "bg-[#c0c0c0] border-2 border-outset border-white text-[10px] uppercase font-bold text-black px-1.5 py-0.5",
          funFact: "bg-[#ffffe1] border border-[#808080] p-3 text-black text-xs leading-normal"
        };
      case 'terminal':
        return {
          banner: "bg-[#ffb000]/10 text-[#ffb000] p-2 border border-[#ffb000]/40 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 font-mono select-none rounded-none",
          panel: "bg-black border border-[#ffb000]/30 p-4 font-mono text-[#ffb000] rounded-none",
          listItem: (active: boolean) => active 
            ? "border border-[#ffb000] bg-[#ffb000]/15 p-2.5 flex items-center justify-between text-xs rounded-none font-bold" 
            : "border border-transparent hover:border-[#ffb000]/40 hover:bg-[#ffb000]/5 p-2.5 flex items-center justify-between text-xs cursor-pointer rounded-none text-[#ffb000]/70",
          detailsBox: "bg-black border border-[#ffb000]/25 p-4 text-xs font-mono text-[#ffb000] space-y-4",
          cardTitle: "text-sm font-bold text-[#ffb000] border-b border-[#ffb000]/30 pb-2 font-mono uppercase flex items-center gap-2",
          badge: "border border-[#ffb000]/55 bg-black text-[9px] uppercase font-bold text-[#ffb000] px-1.5 py-0.5",
          funFact: "border border-dashed border-[#ffb000]/40 bg-[#ffb000]/5 p-3 text-[#ffb000] text-xs font-mono leading-normal"
        };
      default: // Modern - Slate
        return {
          banner: "bg-gradient-to-r from-red-950/20 to-slate-900 border border-slate-750 p-4 rounded-xl flex items-center justify-between gap-3 text-xs",
          panel: "bg-[#0a0a0c]/80 border border-slate-800/80 p-5 rounded-xl space-y-4",
          listItem: (active: boolean) => active 
            ? "bg-[#16161c] border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition duration-200 border" 
            : "bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-700 text-slate-300 p-4 rounded-xl flex items-center justify-between text-xs transition duration-200 cursor-pointer border",
          detailsBox: "bg-[#111114]/90 border border-slate-750/70 p-5 rounded-xl text-xs text-slate-355 space-y-4 shadow-inner",
          cardTitle: "text-base font-bold text-slate-100 font-sans flex items-center gap-2",
          badge: "bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md font-mono",
          funFact: "bg-[#17171e] border-l-4 border-amber-500 p-4 text-slate-300 rounded-r-xl text-xs leading-relaxed"
        };
    }
  };

  const css = getThemeCSS();

  const renderSubMenuSelectors = () => {
    switch (theme) {
      case 'ie6':
        return (
          <div className="flex flex-wrap gap-y-1 border-b border-[#808080] mb-3" id="cemetery-submenu-ie6">
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => selectSubMenu(cat.id)}
                className={`px-2 py-1.5 text-[9px] font-sans select-none cursor-pointer border-t border-l border-r border-[#808080] ${
                  activeSubMenu === cat.id
                    ? 'bg-[#d4d0c8] font-bold border-t-white border-l-white border-r-[#808080] -mb-[1px] z-10'
                    : 'bg-[#c0c0c0] text-slate-700 hover:bg-[#d4d0c8]'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        );
      case 'terminal':
        return (
          <div className="flex flex-wrap gap-2 border-b border-[#ffb000]/25 pb-2 mb-3 text-[9px] font-mono" id="cemetery-submenu-terminal">
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => selectSubMenu(cat.id)}
                className={`hover:text-[#ffb000] cursor-pointer transition uppercase ${
                  activeSubMenu === cat.id
                    ? 'text-[#ffb000] font-extrabold'
                    : 'text-[#ffb000]/40'
                }`}
              >
                {activeSubMenu === cat.id ? `[*${cat.id.toUpperCase()}]` : `[${cat.id.toUpperCase()}]`}
              </button>
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 p-1 bg-[#09090b]/85 rounded-xl border border-slate-800/80 mb-3" id="cemetery-submenu-modern">
            {categoriesList.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => selectSubMenu(cat.id)}
                className={`py-1.5 px-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  activeSubMenu === cat.id
                    ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/20 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="cemetery-root">
      
      {/* Top Warning banner context */}
      <div className={css.banner} id="cemetery-banner">
        <div className="flex items-center gap-2">
          <Skull className="w-5 h-5 text-red-500 animate-pulse shrink-0 animate-bounce" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Panthéon Archéologique &amp; Cimetière de la Toile</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Étude exhaustive des disparitions technologiques ayant façonné ou bloqué les origines du World Wide Web.</p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-mono bg-red-950/40 border border-red-500/30 px-2 py-0.5 text-red-400 font-bold max-sm:hidden">
          Reliques archivées : {relics.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Column 1: Tombstone relic list selection */}
        <div className="md:col-span-1 space-y-2.5">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
            🪦 Sélectionner une relique :
          </span>

          {renderSubMenuSelectors()}

          <div className="flex flex-col gap-2">
            {filteredRelics.map((relic) => {
              const isActive = relic.id === activeRelicId;
              const isHovered = relic.id === hoveredRelicId;
              
              // Sibling ghost effect: if another relic is hovered, apply opacity & light blur to this one.
              const isAnyHovered = hoveredRelicId !== null;
              const ghostEffectCss = isAnyHovered && !isHovered
                ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";

              return (
                <div
                  key={relic.id}
                  onClick={() => setActiveRelicId(relic.id)}
                  onMouseEnter={() => setHoveredRelicId(relic.id)}
                  onMouseLeave={() => setHoveredRelicId(null)}
                  className={`${css.listItem(isActive)} ${ghostEffectCss}`}
                  id={`tombstone-item-${relic.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl select-none">{relic.icon}</span>
                    <div className="text-left">
                      <b className="block text-[11px] font-bold tracking-tight">{relic.name}</b>
                      <span className="text-[9px] opacity-70 font-mono tracking-wide">
                        {relic.birthYear} - {relic.deathYear}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition ${isActive ? 'translate-x-1 text-indigo-400' : 'text-slate-500'}`} />
                </div>
              );
            })}
          </div>

          {/* Quick didactic note */}
          <div className="rounded-lg p-3 bg-slate-950/20 border border-slate-850/60 text-[10px] text-slate-450 leading-relaxed max-sm:hidden">
            <h5 className="font-extrabold uppercase flex items-center gap-1 text-slate-350 select-none text-[9px] mb-1">
              <AlertOctagon className="w-3 text-red-400" /> Note de l'éducateur
            </h5>
            Pratiquement tous ces outils ou programmes ont régné de manière absolue avant d'être destitués par le W3C au profit de protocoles ou de balisages universels et ouverts.
          </div>
        </div>

        {/* Column 2 & 3: Detailed Interactive Exhibit Exposition */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRelic.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={css.panel}
              id={`exhibit-details-${activeRelic.id}`}
            >
              {/* Exhibit main title */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/40 pb-3">
                <h3 className={css.cardTitle}>
                  <span className="text-2xl select-none">{activeRelic.icon}</span>
                  <span>{activeRelic.name}</span>
                </h3>
                <span className={css.badge}>
                  ❌ Éteint en {activeRelic.deathYear}
                </span>
              </div>

              {/* Epitaph box */}
              <div className="p-4 rounded-xl border border-dashed border-red-500/25 bg-red-950/5 text-left text-xs text-red-400 italic leading-relaxed relative flex items-start gap-2">
                <Skull className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                <div>
                  <strong className="block not-italic text-[10px] uppercase tracking-wide font-mono mb-0.5">Épitaphe Pédagogique :</strong>
                  "{activeRelic.epitaph}"
                </div>
              </div>

              {/* The big exposition content tabs */}
              <div className={css.detailsBox}>
                
                {/* Block 1: Presentation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-indigo-400">
                    📂 Carte d'identité de la relique :
                  </span>
                  <p className="leading-relaxed text-slate-300">
                    {activeRelic.summary}
                  </p>
                </div>

                {/* Block 2: Dominance period */}
                <div className="space-y-1 bg-slate-950/20 p-3 rounded-lg border border-slate-900 font-sans">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-emerald-400 block mb-1">
                    👑 L'Époque de Gloire (Pourquoi il régnait sur le Web) :
                  </span>
                  <p className="leading-relaxed text-slate-300">
                    {activeRelic.whyItRuled}
                  </p>
                </div>

                {/* Block 3: Demographic fall reasons (The crucial pedagogical answers) */}
                <div className="space-y-2 border-t border-slate-800/50 pt-3">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold text-red-400 uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> La cause fatale du trépas technique :
                  </span>
                  
                  {/* Actual HTML Inject of detailed causes */}
                  <div dangerouslySetInnerHTML={{ __html: activeRelic.whyItDiedHtml }} />
                </div>

                {/* Block 4: Successors */}
                <div className="p-3 bg-indigo-950/10 border border-indigo-900/30 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-[#9ea7ff] block">
                    🚀 Aujourd'hui dans le Web moderne, nous utilisons :
                  </span>
                  <p className="leading-relaxed font-semibold italic text-[#8a92ff] text-xs">
                    {activeRelic.modernSuccessor}
                  </p>
                </div>

                {/* Block 5: Fun fact retro anecdote */}
                <div className={css.funFact}>
                  <strong className="block text-[10px] uppercase font-mono text-amber-500 mb-1">💡 Anecdote Archéologique d'époque :</strong>
                  "{activeRelic.retroAnecdote}"
                </div>

                {/* Tags showcase */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/40">
                  {activeRelic.specials.map((spec, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="text-[9px] font-mono tracking-tight bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      #{spec}
                    </span>
                  ))}
                </div>

              </div>

              {/* Social sharing buttons for relic findings */}
              <div className="pt-2">
                <ShareButtons
                  theme={theme}
                  title={`Musée du Web — Épitaphe de : ${activeRelic.name}`}
                  text={`J'explore le Cimetière du Web : découvrez pourquoi et comment ${activeRelic.name} (actif de ${activeRelic.birthYear} à ${activeRelic.deathYear}) est mort face aux standards modernes.`}
                />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
