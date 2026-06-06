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
}

export default function CemeteryView({ theme }: CemeteryViewProps) {
  const [activeRelicId, setActiveRelicId] = useState<string>('flash');

  // Interactive data for "Le Cimetière du Web"
  const relics: Relic[] = [
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
      deathYear: '2008',
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
      id: 'caramail',
      name: 'Caramail',
      icon: '💬',
      birthYear: '1997',
      deathYear: '2009',
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
      deathYear: '2009',
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
      deathYear: '2024',
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
    }
  ];

  const activeRelic = relics.find(r => r.id === activeRelicId) || relics[0];

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
          detailsBox: "bg-[#111114]/90 border border-slate-750/70 p-5 rounded-xl text-xs text-slate-350 space-y-4 shadow-inner",
          cardTitle: "text-base font-bold text-slate-100 font-sans flex items-center gap-2",
          badge: "bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md font-mono",
          funFact: "bg-[#17171e] border-l-4 border-amber-500 p-4 text-slate-300 rounded-r-xl text-xs leading-relaxed"
        };
    }
  };

  const css = getThemeCSS();

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
          <div className="flex flex-col gap-2">
            {relics.map((relic) => {
              const isActive = relic.id === activeRelicId;
              return (
                <div
                  key={relic.id}
                  onClick={() => setActiveRelicId(relic.id)}
                  className={css.listItem(isActive)}
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
