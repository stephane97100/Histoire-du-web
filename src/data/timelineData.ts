/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelineEvent, VersionSpec } from '../types';

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1989-web-proposal',
    year: 1989,
    title: 'Invention du World Wide Web',
    category: 'milestone',
    description: 'Tim Berners-Lee propose un système de gestion de l\'information décentralisé au CERN, combinant hypertextes et Internet.',
    detailedContent: 'Tim Berners-Lee conçoit un système pour aider les physiciens à partager des informations au CERN. Cette proposition décrit une structure de documents interconnectés par des hyperliens, ouvrant la voie à la création du web.',
    impact: 'critical',
    tags: ['CERN', 'Tim Berners-Lee', 'Hypertexte']
  },
  {
    id: '1990-first-server',
    year: 1990,
    title: 'Premier serveur, navigateur et protocole',
    category: 'protocol',
    description: 'Création d\'HTTP/0.9, de WorldWideWeb (le premier client web/éditeur) et d\'une première ébauche d\'HTML.',
    detailedContent: 'Fonctionnant sur un ordinateur NeXT au CERN, la première page d\'accueil décrit le projet web. Le protocole HTTP/0.9 est rudimentaire : il ne supporte que la commande GET pour récupérer du texte brut sans images ni feuilles de style.',
    impact: 'critical',
    tags: ['HTTP/0.9', 'NextStep', 'CERN']
  },
  {
    id: '1993-mosaic',
    year: 1993,
    title: 'Sortie du navigateur NCSA Mosaic',
    category: 'browser',
    description: 'Mosaic démocratise le web en introduisant la balise <img src="..."> permettant d\'afficher des images directement dans le texte.',
    detailedContent: 'Développé par Marc Andreessen et Eric Bina à l\'université de l\'Illinois, Mosaic est le premier navigateur populaire multiplateforme (X, Mac, PC). L\'insertion d\'images en ligne transforme le web textuel en un média visuel attrayant.',
    impact: 'critical',
    tags: ['Mosaic', 'Images', 'Andreessen']
  },
  {
    id: '1993-html1',
    year: 1993,
    title: 'HTML 1.0 (Première ébauche)',
    category: 'html',
    description: 'Définition informelle d\'HTML contenant 18 balises basiques pour structurer du texte (liens, listes, paragraphes).',
    detailedContent: 'HTML est initialement conçu comme un simple langage de balisage structurel. Il n\'y a ni formulaires ni tableaux, seulement des titres, des paragraphes et les balises <a href> de base.',
    impact: 'high',
    tags: ['HTML 1.0', 'Balisage', 'Hyperliens']
  },
  {
    id: '1994-netscape',
    year: 1994,
    title: 'Fondation de Netscape et HTTPS',
    category: 'browser',
    description: 'Sortie de Netscape Navigator 1.0 et création du protocole HTTPS pour sécuriser les transactions commerciales de l\'e-commerce naissant.',
    detailedContent: 'Netscape devient rapidement le navigateur leader ultra-dominant (plus de 85% du marché). Ils inventent des balises propriétaires comme <center> et <blink>, amorçant l\'ère de la mise en page brute avant l\'invention des CSS.',
    impact: 'critical',
    tags: ['Netscape', 'HTTPS', 'E-commerce']
  },
  {
    id: '1995-html2',
    year: 1995,
    title: 'HTML 2.0 standardisé',
    category: 'html',
    description: 'Première spécification officielle (RFC 1866) ajoutant le support des formulaires indispensables pour l\'interactivité commerciale.',
    detailedContent: 'HTML 2.0 définit un socle standard pour le web. La nouveauté majeure est l\'élément FORM, qui permet de soumettre des données (boutons, champs textes, listes déroulantes) à des scripts serveurs CGI.',
    impact: 'high',
    tags: ['HTML 2.0', 'Spécification', 'Formulaires', 'RFC 1866']
  },
  {
    id: '1995-javascript',
    year: 1995,
    title: 'Invention de JavaScript (Mocha / LiveScript)',
    category: 'js',
    description: 'Brendan Eich développe un langage de script en 10 jours chez Netscape pour ajouter du dynamisme côté client dans le navigateur.',
    detailedContent: 'Nommé initialement Mocha, puis LiveScript, et enfin rebaptisé JavaScript pour capitaliser sur la popularité de Java. JavaScript permet de manipuler les formulaires et les images côté navigateur, de manière simple mais révolutionnaire pour l\'époque.',
    impact: 'critical',
    tags: ['Brendan Eich', 'Netscape', 'Dynamic HTML']
  },
  {
    id: '1995-windows95',
    year: 1995,
    title: 'Lancement mondial de Windows 95',
    category: 'milestone',
    description: 'Microsoft lance Windows 95 avec l\'intégration d\'Internet Explorer, démocratisant l\'accès au Web pour le grand public.',
    detailedContent: 'Windows 95, avec sa signature sonore exclusive et son fameux bouton Démarrer, est livré avec un pack additionnel contenant Internet Explorer 1.0. Cet événement historique marque l\'accession massive d\'Internet dans les foyers du monde entier.',
    impact: 'critical',
    tags: ['Windows 95', 'Internet Explorer', 'Grand Public']
  },
  {
    id: '1996-css1',
    year: 1996,
    title: 'CSS Niveau 1 standardisé',
    category: 'css',
    description: 'Le W3C adopte la première spécification CSS pour séparer le contenu (HTML) du style (couleurs, polices, alignements).',
    detailedContent: 'Sous la direction d\'Håkon Wium Lie et Bert Bos, CSS1 est publié. Il vise à mettre fin au piratage structurel du HTML (mises en page complexes faites de <table> imbriquées et d\'images transparentes GIF de 1px). Cependant, le support initial par les navigateurs est erratique et rempli de bugs.',
    impact: 'critical',
    tags: ['CSS 1', 'W3C', 'Style', 'Design']
  },
  {
    id: '1996-vbscript',
    year: 1996,
    title: 'Microsoft lance VBScript et IE 3.0',
    category: 'js',
    description: 'Microsoft lance un concurrent direct à JavaScript basé sur Visual Basic, utilisable uniquement dans Internet Explorer.',
    detailedContent: 'Afin de concurrencer JavaScript de Netscape, Microsoft crée JScript (un dérivé rétroconçu) et VBScript (dérivé de Visual Basic) pour Internet Explorer 3.0. Cela déclenche une féroce guerre d\'incompatibilités.',
    impact: 'high',
    tags: ['VBScript', 'JScript', 'Internet Explorer', 'Guerre des navigateurs']
  },
  {
    id: '1997-html32',
    year: 1997,
    title: 'HTML 3.2 et l\'art des Tables',
    category: 'html',
    description: 'Standardisation d\'HTML 3.2 intégrant les tableaux, les calques flottants, l\'alignement et de nombreux éléments propriétaires.',
    detailedContent: 'Faute de support complet de la CSS par les navigateurs, HTML 3.2 légitimise les structures à base de tableaux pour faire des colonnes et des mises en page sophistiquées. C\'est l\'âge d\'or des GIFs animés, de la balise <marquee> et des fonds répétés.',
    impact: 'medium',
    tags: ['HTML 3.2', 'Tables', 'Widgets', 'Retro']
  },
  {
    id: '1998-css2',
    year: 1998,
    title: 'CSS 2.0 (Positionnement absolu et Z-Index)',
    category: 'css',
    description: 'Sortie de CSS2 introduisant le positionnement absolu/relatif, les polices téléchargeables et la prise en charge des médias d\'impression.',
    detailedContent: 'CSS2 apporte un contrôle géométrique extraordinaire (top, left, position, z-index). Cela permet de concevoir des pages pixel-perfect, même s\'il faudra des années avant d\'avoir des navigateurs respectant le standard (comme le fameux test Acid2).',
    impact: 'high',
    tags: ['CSS 2', 'Position', 'Z-Index', 'W3C']
  },
  {
    id: '1999-html4',
    year: 1999,
    title: 'HTML 4.01 et séparation rigide',
    category: 'html',
    description: 'Recommandation majeure d\'HTML 4.01 qui sépare fermement le contenu (HTML) du domaine stylistique géré par la CSS.',
    detailedContent: 'HTML 4.01 introduit des variantes Transitional (qui tolèrent les attributs physiques comme bgcolor et <font>) et Strict (qui force l\'usage exclusif du CSS). C\'est sous cette version que le Web interactif bascule vers Web 2.0 avec AJAX.',
    impact: 'high',
    tags: ['HTML 4.01', 'Transitional', 'Strict', 'Standard']
  },
  {
    id: '2000-dotcom-crash',
    year: 2000,
    title: 'Éclatement de la Bulle Dot-Com',
    category: 'milestone',
    description: 'La bulle spéculative des start-ups technologiques éclate, forçant le web à gagner en rentabilité économique et en maturité logicielle.',
    detailedContent: 'En mars 2000, les valorisations astronomiques des entreprises \'.com\' s\'effondrent. Ce nettoyage radical élimine les projets fantômes et force les géants survivants (comme Amazon ou eBay) à concevoir des architectures sémantiques robustes et optimisées, posant les bases de la maturité interactive du Web 2.0.',
    impact: 'critical',
    tags: ['Bulle Internet', 'Krach Boursier', 'Silicon Valley', 'E-commerce']
  },
  {
    id: '2001-ie6-dominance',
    year: 2001,
    title: 'Monopole absolu d\'Internet Explorer 6',
    category: 'browser',
    description: 'IE6 est livré par défaut avec Windows XP, s\'octroyant plus de 95% des parts de marché et gelant l\'innovation du web pendant 5 ans.',
    detailedContent: 'Avec l\'écrasement de Netscape, Microsoft dissout l\'équipe de développement d\'IE. IE6, bourré de failles de sécurité et doté d\'un moteur CSS non-conforme, stagne. Les développeurs doivent inventer des dizaines de "hacks" CSS (comme zoom: 1 pour déclencher "hasLayout") pour que leurs sites s\'affichent correctement.',
    impact: 'critical',
    tags: ['IE6', 'Monopole', 'Bug CSS', 'hasLayout']
  },
  {
    id: '2004-firefox',
    year: 2004,
    title: 'Renaissance avec Mozilla Firefox',
    category: 'browser',
    description: 'Une scission d\'anciens de Netscape fait naître Firefox 1.0, ramenant la concurrence, la navigation par onglets et le respect des standards.',
    detailedContent: 'Firefox renaît des cendres de la suite Mozilla. Léger, sécurisé, pourvu du blocage de popups et d\'extensions, il grignote patiemment les parts de marché d\'IE6 et remet le respect des standards du W3C au centre du jeu.',
    impact: 'high',
    tags: ['Firefox', 'Open Source', 'Netscape', 'Standards']
  },
  {
    id: '2005-ajax',
    year: 2005,
    title: 'La Révolution AJAX (Web 2.0)',
    category: 'js',
    description: 'Jesse James Garrett théorise l\'AJAX (XMLHTTPRequest), permettant de mettre à jour une page sans la recharger en arrière-plan.',
    detailedContent: 'Google Maps et Gmail prouvent qu\'une page moderne peut agir comme un logiciel bureautique. XMLHTTPRequest (initié en secret par Microsoft dans IE5 pour Outlook Web) devient le moteur de l\'immersion interactive moderne côté client.',
    impact: 'critical',
    tags: ['AJAX', 'Web 2.0', 'JavaScript', 'Google']
  },
  {
    id: '2007-iphone',
    year: 2007,
    title: 'Annonce de l\'iPhone (Révolution Web Mobile)',
    category: 'milestone',
    description: 'Steve Jobs dévoile l\'iPhone v1 équipé d\'un Safari mobile complet, contraignant l\'industrie à concevoir des mises en page réactives et fluides.',
    detailedContent: 'En intégrant un navigateur tactile capacitif ultra-réactif capable de charger les sites originels (et non des versions WAP amputées), l\'iPhone propulse le surf nomade. Cet événement déclenche l\'ère obligatoire du design responsive pour s\'adapter de façon fluide à tous les ratios d\'écran.',
    impact: 'critical',
    tags: ['Steve Jobs', 'iPhone v1', 'Mobile Safari', 'Responsive']
  },
  {
    id: '2008-chrome',
    year: 2008,
    title: 'Lancement de Google Chrome et V8',
    category: 'browser',
    description: 'Google lance Chrome avec le moteur V8 ultra-rapide, transformant l\'interprétation du JS en compilation JIT (Just-In-Time).',
    detailedContent: 'Le moteur V8 révolutionne les performances JavaScript. Chrome sépare chaque onglet dans un processus sandboxé, évitant le gel complet du navigateur. Les applications web riches et complexes deviennent viables et surclassent les plug-ins comme Flash.',
    impact: 'critical',
    tags: ['Chrome', 'Moteur V8', 'JIT', 'Google']
  },
  {
    id: '2010-steve-jobs-flash',
    year: 2010,
    title: 'Lettre ouverte sur Adobe Flash (Thoughts on Flash)',
    category: 'milestone',
    description: 'Steve Jobs publie son réquisitoire exclusif condamnant le format Adobe Flash, propulsant le décollage massif du standard HTML5 sémantique.',
    detailedContent: 'Le refus catégorique d\'Apple de tolérer l\'intégration d\'Adobe Flash Player sur iPhone et iPad pour des impératifs d\'autonomie et de sécurité hâte la fin de Flash. L\'industrie web pivote drastiquement vers les balises sémantiques natives HTML5 <video>, <audio> et le canvas de dessin 2D.',
    impact: 'high',
    tags: ['Steve Jobs', 'Adobe Flash', 'HTML5 Sémantique', 'Tribune']
  },
  {
    id: '2011-css3',
    year: 2011,
    title: 'CSS3 et découpage modulaire',
    category: 'css',
    description: 'Publication progressive des spécifications CSS3 modulaires (animations, coins arrondis border-radius, ombres, et Flexbox).',
    detailedContent: 'Contrairement aux versions précédentes, CSS3 est divisé en "modules" indépendants pour accélérer les révisions. Finies les images découpées dans Photoshop pour simuler des coins arrondis ou des dégradés : la CSS s\'occupe désormais de l\'esthétique visuelle complexe à elle seule.',
    impact: 'critical',
    tags: ['CSS3', 'Flexbox', 'Animations', 'Responsive']
  },
  {
    id: '2014-html5',
    year: 2014,
    title: 'Standardisation d\'HTML5',
    category: 'html',
    description: 'Recommandation finale du W3C (co-développée avec le WHATWG) introduisant les balises sémantiques, Canvas 2D, l\'Audio/Vidéo natifs.',
    detailedContent: 'HTML5 unifie le web applicatif. Il sonne le glas d\'Adobe Flash en intégrant nativement la diffusion multimédia (<video>, <audio>) et le dessin 2D dynamique via l\'API <canvas>. Les balises sémantiques (<header>, <article>, <footer>) organisent le web moderne et l\'accessibilité.',
    impact: 'critical',
    tags: ['HTML5', 'WHATWG', 'Sémantique', 'Multimédia', 'Canvas']
  },
  {
    id: '2015-es6',
    year: 2015,
    title: 'ECMAScript 2015 (ES6) - JavaScript moderne',
    category: 'js',
    description: 'Mise à jour majeure de JavaScript avec l\'arrivée des classes, de let/const, des promesses, et des fonctions fléchées =>.',
    detailedContent: 'ES6 modernise syntaxiquement JavaScript pour lui donner la puissance des langages objets et asynchrones robustes. Cela stabilise massivement le développement de frameworks modernes comme React, Vue, et Angular.',
    impact: 'high',
    tags: ['ES6', 'ECMAScript', 'Classes', 'Promises']
  },
  {
    id: '2020-modern-web',
    year: 2020,
    title: 'Le Web Moderne, HTTPS par défaut et CSS Grid',
    category: 'protocol',
    description: 'HTTP/2 et HTTP/3 accélèrent la latence réseau. CSS Grid permet un contrôle bidimensionnel des mises en page sans frameworks.',
    detailedContent: 'Le web atteint sa maturité avec HTTPS comme standard de sécurité global requis, l\'avénement d\'HTTP/3 sur protocole UDP (QUIC) et un support total des mises en page complexes réactives via CSS Grid et Flexbox par l\'ensemble des navigateurs du marché.',
    impact: 'medium',
    tags: ['CSS Grid', 'HTTP/3', 'QUIC', 'Sécurité']
  }
];

export const htmlVersionsSpecs: VersionSpec[] = [
  {
    id: 'html1',
    type: 'html',
    name: 'HTML 1.0 (1993)',
    year: 1993,
    status: 'Obsolète historique',
    keyFeatures: [
      'Titres (H1 à H6)',
      'Hyperliens basiques (<a href>)',
      'Listes ordonnées et non ordonnées (<ol>, <ul>, <li>)',
      'Texte préformaté (<pre>)',
      'Pas de formulaires ni de tableaux'
    ],
    description: 'La version originelle de Tim Berners-Lee au CERN. Uniquement textuelle, conçue pour l\'écriture de rapports scientifiques liés par hypertexte.',
    vintageContext: 'Une page HTML 1.0 s\'affichait en texte noir sur écran gris classique avec des polices à empattement d\'usine (comme Times New Roman). Aucune image n\'existait avant l\'invention de Mosaic.',
    codeSnippet: `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML>
  <HEAD>
    <TITLE>Document de Recherche CERN 1993</TITLE>
  </HEAD>
  <BODY>
    <H1>Hypertexte en Physique</H1>
    <P>Voici le premier langage du web. Il sert a relier les documents par des hyperliens simples.</P>
    <P>Pour en savoir plus, visitez le <A HREF="http://info.cern.ch/">site officiel du CERN</A>.</P>
    <UL>
      <LI>Item de liste simple</LI>
      <LI>Pas encore d'images dans le texte</LI>
    </UL>
  </BODY>
</HTML>`
  },
  {
    id: 'html2',
    type: 'html',
    name: 'HTML 2.0 (1995)',
    year: 1995,
    status: 'Obsolète standard',
    keyFeatures: [
      'Formulaires interactifs (<form>, <input>, <select>)',
      'Intégration d\'images via <img src="..." alt="...">',
      'Spécification de l\'encodage par défaut',
      'Éléments d\'en-tête formalisés (<head>, <body>)'
    ],
    description: 'La première version officiellement normalisée par l\'IETF sous forme de RFC. Elle introduit le web commercial en permettant aux clients d\'envoyer des données via des formulaires.',
    vintageContext: 'C\'est l\'apparition de l\'e-commerce (Amazon, eBay). Les données de formulaires sont traitées par des scripts PHP naissants ou des programmes écrits en C/Perl nommés CGI (Common Gateway Interface).',
    codeSnippet: `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML>
  <HEAD>
    <TITLE>Formulaire Vintage de Commande - 1995</TITLE>
  </HEAD>
  <BODY>
    <H1>Bienvenue sur PizzaNet</H1>
    <P>Commandez votre pizza de maniere interactive sur l'Internet américain !</P>
    <IMG SRC="pizza.jpg" ALT="Photo de notre pizza">
    
    <FORM METHOD="POST" ACTION="/cgi-bin/order.pl">
      <P>Entrez votre nom : <INPUT TYPE="text" NAME="username" SIZE="30"></P>
      <P>Taille : 
        <SELECT NAME="size">
          <OPTION VALUE="small">Petite</OPTION>
          <OPTION VALUE="medium" SELECTED>Moyenne</OPTION>
          <OPTION VALUE="large">Grande</OPTION>
        </SELECT>
      </P>
      <P><INPUT TYPE="submit" VALUE="Passer commande !"></P>
    </FORM>
  </BODY>
</HTML>`
  },
  {
    id: 'html3',
    type: 'html',
    name: 'HTML 3.2 (1997)',
    year: 1997,
    status: 'Obsolète',
    keyFeatures: [
      'Tableaux de données (<table border="1">) utilisés pour la mise en page',
      'Balises de formatage physique (<font color="red">, <center>, <blink>)',
      'Prise en charge d\'applets Java intégrées',
      'Attributs physiques (align, bgcolor, background, border)'
    ],
    description: 'Publiée par le W3C, cette spécification inclut de nombreuses fonctionnalités ajoutées par Netscape et IE de leur propre fait, sans attendre de standard.',
    vintageContext: 'La mise en page se fait en créant de gigantesques structures complexes de tableaux invisibles de sorte à positionner les bandeaux et menus horizontaux. C\'est l\'âge le plus nostalgique.',
    codeSnippet: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<HTML>
  <HEAD>
    <TITLE>Ma Superbe Page Perso - Web 97</TITLE>
  </HEAD>
  <BODY BGCOLOR="#000080" TEXT="#FFFFFF" LINK="#FFFF00" VLINK="#FF00FF">
    <CENTER>
      <H1><FONT COLOR="#00FF00" FACE="Comic Sans MS">Bienvenue sur mon site perso !</FONT></H1>
      <IMG SRC="animated_fire.gif" HEIGHT="50" WIDTH="50">
      <BLINK>--- Nouveaute exclusive ! ---</BLINK>
    </CENTER>
    
    <!-- Mise en page par Tableau vintage -->
    <TABLE BORDER="0" WIDTH="100%" CELLSPACING="5">
      <TR>
        <TD WIDTH="20%" BGCOLOR="#808080" VALIGN="TOP">
          <B>Menu de navigation</B><BR><BR>
          * <A HREF="index.html">Accueil</A><BR>
          * <A HREF="photos.html">Mes Photos</A><BR>
          * <A HREF="liens.html">Favoris</A>
        </TD>
        <TD WIDTH="80%" BGCOLOR="#000000">
          <H2>A propos de moi</H2>
          <P>Je suis un passionne d'ordinateurs Pentium et d'Internet 56k.</P>
          <CENTER>
            <IMG SRC="under_construction.gif" ALT="En construction">
          </CENTER>
        </TD>
      </TR>
    </TABLE>
  </BODY>
</HTML>`
  },
  {
    id: 'html4',
    type: 'html',
    name: 'HTML 4.01 (1999)',
    year: 1999,
    status: 'Ancien Standard stable',
    keyFeatures: [
      'Standardisation stricte (Strict, Transitional, Frameset)',
      'Séparation robuste du style dans les fichiers CSS externes',
      'Introduction des frames iFrame et Framesets complexes',
      'Support amélioré de l\'accessibilité et multi-langues'
    ],
    description: 'Recommandation finale qui fige le web pendant près de 15 ans. Elle insiste sur le fait que la décoration visuelle doit être transférée à la CSS, tout en conservant une déclinaison "Transitional".',
    vintageContext: 'C\'est l\'époque d\'AJAX, de Macromedia Flash qui remplace l\'HTML pour les jeux et contenus interactifs, et des feuilles de style externes (.css) pour contrôler uniformément l\'ensemble du site.',
    codeSnippet: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Application Portail d'Entreprise - Année 2000</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript">
      function saluer() {
        alert("Bienvenue sur le portail HTML 4.01 !");
      }
    </script>
  </head>
  <body>
    <div id="header">
      <h1>Portail Corporate</h1>
    </div>
    <div id="content">
      <h2>séparation Contenu / Présentation</h2>
      <p>Cette page utilise des balises "div" structurelles au lieu des vieux tableaux physiques.</p>
      <button onclick="saluer()">Cliquez pour tester l'interactivité d'origine</button>
    </div>
  </body>
</html>`
  },
  {
    id: 'html5',
    type: 'html',
    name: 'HTML5 (2014)',
    year: 2014,
    status: 'Standard moderne actuel',
    keyFeatures: [
      'Balises sémantiques claires (<header>, <nav>, <article>, <section>)',
      'API multimédias indigènes (<video>, <audio>) sans Flash',
      'Balise de dessin vectoriel et pixels dynamiques <canvas>',
      'Stockage local rapide (localStorage, IndexedDB)',
      'API géolocalisation, glisser-déposer, Web Workers asynchrones'
    ],
    description: 'Unification par le WHATWG et le W3C pour transformer le web de simples pages de documents vers une plateforme applicative riche complète.',
    vintageContext: 'HTML5 a balayé les plug-ins propriétaires comme Flash pour de bon. Associé aux animations CSS3 et JS ES6, plus aucun moteur tiers n\'est nécessaire pour l\'audio, la vidéo ou les applications réactives.',
    codeSnippet: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Moderne HTML5</title>
  </head>
  <body>
    <header>
      <h1>Tableau de bord Moderne</h1>
      <nav>
        <ul>
          <li><a href="#accueil">Accueil</a></li>
          <li><a href="#media">Médias</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <article>
        <h2>Nouvelles balises sémantiques</h2>
        <p>Le SEO et l'accessibilité sont grandement améliorés grâce aux balises sémantiques natives.</p>
      </article>
      
      <section id="media">
        <h3>Vidéo HTML5 Native</h3>
        <video controls width="320" poster="preview.jpg">
          <source src="movie.mp4" type="video/video/mp4">
          Votre navigateur ne supporte pas la balise vidéo native.
        </video>
      </section>
    </main>
    
    <footer>
      <p>&copy; 2026 - Le Web Moderne</p>
    </footer>
  </body>
</html>`
  }
];

export const cssVersionsSpecs: VersionSpec[] = [
  {
    id: 'css1',
    type: 'css',
    name: 'CSS Niveau 1 (1996)',
    year: 1996,
    status: 'Obsolète historique',
    keyFeatures: [
      'Propriétés de polices de caractères basiques (font-family, font-size)',
      'Couleur de texte, de fond et images de fond répétées',
      'Bordures basiques, margins et paddings',
      'Alignement du texte simple et décalages'
    ],
    description: 'La première feuille de style normalisée par le W3C. Initialement très simple pour structurer de la typographie à l\'écart de l\'HTML.',
    vintageContext: 'Le problème historique majeur fut la mise en œuvre chaotique par Microsoft IE et Netscape qui ignoraient délibérément ou géraient mal le modèle de boîte (box-model), rendant son adoption extrêmement risquée.',
    codeSnippet: `/* Stylesheet CSS 1.0 d'archive */
body {
  font-family: Arial, sans-serif;
  font-size: 12pt;
  color: #333333;
  background-color: #f0f0f0;
  margin: 10px;
}

h1 {
  font-family: Helvetica, sans-serif;
  font-size: 24pt;
  color: #000080;
  border-bottom: 2px solid #000080;
  padding-bottom: 5px;
}

p {
  line-height: 14pt;
  text-indent: 20px;
}`
  },
  {
    id: 'css2',
    type: 'css',
    name: 'CSS 2.1 (2011 Rétro-définie)',
    year: 2011,
    status: 'Standard partiel toujours actif',
    keyFeatures: [
      'Positionnement précis absolu, relatif, fixe (position: absolute)',
      'Le fameux sélecteur de débordement z-index',
      'Propriétés "float" (utilisées au forceps pour réaliser des grilles)',
      'Sélecteurs avancés (enfant, frères, attributs)'
    ],
    description: 'CSS 2 a été publié en 1998 mais s\'est avérée si instable et inégale entre navigateurs que le W3C a dû écrire CSS 2.1 pour documenter uniquement ce que les navigateurs supportaient réellement en commun.',
    vintageContext: 'La mise en page a consisté à hacker le flottement (`float: left`) pour fabriquer des colonnes, ce qui nécessitait l\'utilisation récurrente du fameux hack de nettoyage de flottement (`clear: both` ou `clearfix`).',
    codeSnippet: `/* Feuille de style CSS 2.1 standard */
.container {
  width: 960px;
  margin: 0 auto;
  position: relative;
}

.sidebar {
  width: 250px;
  float: left;
  background-color: #eaeaea;
  padding: 15px;
}

.content {
  width: 650px;
  float: right;
  background-color: #ffffff;
  padding: 15px;
}

/* Clearfix pour rétablir le flux */
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}`
  },
  {
    id: 'css3',
    type: 'css',
    name: 'CSS3 (Dès 2011)',
    year: 2011,
    status: 'Standard moderne actuel',
    keyFeatures: [
      'Coins arrondis (border-radius) et ombres portées (box-shadow)',
      'Mises en page flexibles (Flexbox) et quadrillages (CSS Grid)',
      'Transitions, Transformations 2D/3D et Animations fluides',
      'Media Queries (Base du Responsive Web Design)',
      'Variables natives CSS (--primary-color)'
    ],
    description: 'CSS3 s\'organise en modules évoluant chacun à leur rythme. C\'est l\'âge d\'or du design moderne adaptable au mobile, sans aucune image pré-découpée requise.',
    vintageContext: 'Avec CSS3, le web devient enfin responsive. Le même code HTML s\'affiche parfaitement sur smartphone, tablette et grand écran d\'ordinateur grâce aux requêtes média de taille d\'écran.',
    codeSnippet: `/* CSS3 Moderne & Responsive */
:root {
  --blue-brand: #3b82f6;
  --dark-slate: #1e293b;
}

.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
}

/* Media query responsive */
@media (max-width: 768px) {
  .card {
    border-radius: 0;
    box-shadow: none;
  }
}`
  }
];
