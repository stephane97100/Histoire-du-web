/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileCode, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  CornerDownRight, 
  Terminal, 
  HelpCircle, 
  Wrench, 
  Users, 
  Code2, 
  Info, 
  Database, 
  Layers, 
  FileText 
} from 'lucide-react';

interface CleanCodeViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  desc: string;
  details?: string;
  codeSnippet?: string;
  children?: TreeNode[];
}

const namingErrors = [
  {
    id: 1,
    title: "1. Le syndrome de la version finale",
    subtitle: "Le piège de l'historique manuel",
    errorExample: "logo_final.gif, logo_final_v2.gif, logo_VRAIMENT_final.gif",
    lesson: "On ne met jamais d'indice de version dans un nom de fichier Web. Le fichier doit s'appeler logo.gif, et c’est le dossier de sauvegarde (ou plus tard Git) qui gère l'historique.",
    sampleFile: "logo_VRAIMENT_final.gif",
    icon: "🔄"
  },
  {
    id: 2,
    title: "2. La \"French Touch\" (Accents & Espaces)",
    subtitle: "Le cauchemar des serveurs Linux",
    errorExample: "Présentation de l'équipe.html ou icône menu.jpg",
    lesson: "Le navigateur transforme les caractères spéciaux en %20 ou en entités bizarres (Pr%C3%A9sentation%20de%20l'equipe.html), cassant souvent le lien. Pas d'accents, pas d'espaces, jamais.",
    sampleFile: "Présentation de l'équipe.html",
    icon: "🥖"
  },
  {
    id: 3,
    title: "3. Confusion des Majuscules (Casing)",
    subtitle: "Windows (insensible) vs Linux (robuste)",
    errorExample: "Photo.JPG invoqué pour photo.jpg ou Image.jpg",
    lesson: "Le site marche parfaitement en local sur Windows, mais une fois hébergé en ligne sur un serveur Linux sensible à la casse, le fichier n'est pas trouvé (erreur 404) !",
    sampleFile: "Photo.JPG",
    icon: "🔠"
  },
  {
    id: 4,
    title: "4. Le nommage \"Générique\"",
    subtitle: "L'absence totale de sens (SEO et indexation)",
    errorExample: "image1.jpg, bouton2.png, texte.html, page.html",
    lesson: "Un nom de fichier doit d'abord décrire son contenu (ex: tour-eiffel-paris.jpg) pour aider les moteurs de recherche (SEO) à comprendre la sémantique de la page.",
    sampleFile: "image1.jpg",
    icon: "🏷️"
  },
  {
    id: 5,
    title: "5. L'abus de points",
    subtitle: "Confusion de l'interpréteur MIME",
    errorExample: "mon.site.v1.0.html",
    lesson: "Le serveur HTTP ou l'analyseur FTP peut s'emmêler les pinceaux sur la détection de l'extension de fichier réelle si plusieurs points coexistent. Un seul point, juste avant l'extension.",
    sampleFile: "mon.site.v1.0.html",
    icon: "💬"
  },
  {
    id: 6,
    title: "6. Le CamelCase mal maîtrisé",
    subtitle: "Mélange laborieux dans la barre d'adresse",
    errorExample: "MonSuperDossierImagesClient (complexe à déchiffrer)",
    lesson: "On préfère aujourd'hui le kebab-case (mon-super-dossier) pour la lisibilité immédiate dans la barre d'adresse du navigateur.",
    sampleFile: "MonSuperDossierImagesClient.png",
    icon: "🐪"
  },
  {
    id: 7,
    title: "7. Les noms \"Temporaires\" éternels",
    subtitle: "La dette technique poussiéreuse",
    errorExample: "test.html, vieux_truc.php, test2.css, v1.old.js",
    lesson: "On oublie irrémédiablement ce qu'il y a dedans au bout de quelques mois, on n'ose plus les supprimer par sécurité, et le serveur devient un placard surchargé.",
    sampleFile: "vieux_truc.php",
    icon: "⏳"
  }
];

const erasData = [
  {
    id: 0,
    title: "1. L'Âge Organique (1995 - 2003)",
    subtitle: "La platitude chaotique & les fichiers libres",
    tagline: "Nos magasins, nos services et le règne du copier-coller",
    bannerColor: "from-amber-600/20 to-orange-700/10 border-amber-500/30",
    textTheme: "text-amber-400",
    description: "À l'ère du Web 1.0, les sites web ne sont qu'une collection brute de documents statiques reliés par des liens hypertextes simples. Le concept de compilateur d'Assets ou de routage virtuel est totalement inconnu. Le dossier racine FTP est un placard surchargé où cohabitent en vrac pages de rubriques et images aux noms arbitraires.",
    whyImportant: "À l'origine, pour créer une nouvelle page, on duplique simplement la précédente. Si le numéro de téléphone ou l'adresse du magasin change dans le pied de page, on doit ouvrir manuellement et modifier un par un l'ensemble des fichiers du site (accueil.html, nos-magasins.html, nos-services.html, contact.html) !",
    anecdote: "C'est l'époque fétiche de Microsoft FrontPage et Macromedia Dreamweaver 3. L'arborescence imite simplement celle d'un dossier de documents de bureau Windows 95/98.",
    tree: [
      { name: "accueil.html", type: "file", desc: "La page d'accueil avec d'immenses blocs de styles et de scripts en ligne.", detail: "Contient des styles directs répétés et des balises <font color='blue'> obsolètes." },
      { name: "nos magasins.html", type: "file", desc: "Une page simple listant les boutiques physiques.", detail: "Génère des URL encodées brisées ou bizarres du type /nos%20magasins.html en raison de l'espace." },
      { name: "nos-services.html", type: "file", desc: "Page de présentation des prestations de l'entreprise.", detail: "Images de puces pointant parfois vers des chemins absolus de disque local C:\\ !" },
      { name: "contact.html", type: "file", desc: "Un simple formulaire de contact vintage.", detail: "Ouvre directement l'application de messagerie par défaut du client (ex: Outlook Express)." },
      { name: "logo_boutique_final_v2.gif", type: "file", desc: "Le logo compressé avec un historique manuel dans le nom du fichier.", detail: "Preuve absolue que les gestionnaires de version comme Git n'étaient pas encore installés." },
      { name: "fond_marbre.gif", type: "file", desc: "Une petite texture de marbre beige répétée en mosaïque sur l'ensemble de l'écran.", detail: "Pèse quelques Ko et évite les chargements interminables." },
      { name: "visiteurs-compteur.js", type: "file", desc: "Un petit script permettant d'afficher un compteur vert de visiteurs.", detail: "Utilisé comme preuve ultime de trafic de l'époque." }
    ]
  },
  {
    id: 1,
    title: "2. L'Ère des Fragments PHP & WAMP (2004 - 2010)",
    subtitle: "La naissance du tri civilisé et du WAMP local",
    tagline: "L'avènement d'EasyPHP et l'indispensable include() PHP",
    bannerColor: "from-[#3572A5]/20 to-indigo-700/10 border-sky-450/30",
    textTheme: "text-sky-400",
    description: "Avec la démocratisation des bases de données et des hébergeurs supportant PHP/MySQL (comme l'époque dorée de Free.fr), les concepteurs installent localement des packages serveurs tout-en-un. On commence à ranger le projet dans des sous-dossiers spécifiques.",
    whyImportant: "C'est la fin du copier-coller éternel. On isole enfin les blocs répétés dans un tiroir centralisé nommé /includes ou /inc. Grâce à l'instruction 'include' ou 'require' de PHP, on peut importer dynamiquement le menu de navigation (menu.php) sur 150 pages différentes à partir d'un fichier source unique.",
    anecdote: "C'est la grande époque des sites dynamiques auto-générés et du fameux dossier /forum ou /phpBB2 installé à la racine pour animer le site.",
    tree: [
      { name: "index.php", type: "file", desc: "Le point d'entrée universel du site Web dynamique.", detail: "Exécute en tête les inclusions standardisées du header et du menu réutilisables." },
      { name: "contact.php", type: "file", desc: "Le formulaire de contact géré côté serveur.", detail: "Utilise la fonction standard PHP mail() pour envoyer les formulaires à l'administrateur." },
      {
        name: "css",
        type: "folder",
        desc: "Dossier logique regroupant les feuilles de style.",
        children: [
          { name: "style.css", type: "file", desc: "L'unique fichier centralisant toute la mise en page CSS.", detail: "Monolithe gigantesque de plus de 4000 lignes contenant l'intégralité du style global." }
        ]
      },
      {
        name: "includes",
        type: "folder",
        desc: "Les fragments HTML communs réincorporés à la volée par PHP.",
        children: [
          { name: "header.php", type: "file", desc: "L'en-tête commun contenant la balise <head> et le début du corps de la page.", detail: "Évite de dupliquer la configuration HTML d'une page à l'autre." },
          { name: "menu.php", type: "file", desc: "Le bloc de navigation principal contenant les liens de rubriques.", detail: "Toute mise à jour ici s'applique instantanément à l'intégralité du site." },
          { name: "footer.php", type: "file", desc: "Pied de page unifié avec informations légales.", detail: "Pratique pour centraliser la mise à jour des droits de copyright." }
        ]
      },
      {
        name: "images",
        type: "folder",
        desc: "Dossier structuré pour isoler les clichés et icônes.",
        children: [
          { name: "logo.png", type: "file", desc: "Le logo d'entreprise gérant une transparence progressive.", detail: "Nécessitait un patch JS spécifique pour s'afficher proprement sur Internet Explorer 6." },
          { name: "fond-degrade.gif", type: "file", desc: "Un pixel de large étiré à l'infini pour simuler un style dégradé.", detail: "Solution d'époque pour simuler du CSS3 moderne sans alourdir la page." }
        ]
      },
      {
        name: "magasins",
        type: "folder",
        desc: "Rubrique isolée dans son propre répertoire logique.",
        children: [
          { name: "index.php", type: "file", desc: "La page listant les magasins locaux.", detail: "Attention : elle doit importer des images via des chemins relatifs compliqués : '../../images/logo.png' !" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "3. La Centralisation /assets & Tâches Automated (2011 - 2016)",
    subtitle: "L'industrialisation des ressources et pré-production",
    tagline: "Grunt, Gulp et la minification automatisée des sources",
    bannerColor: "from-pink-600/20 to-purple-700/10 border-pink-500/30",
    textTheme: "text-pink-400",
    description: "Le Web devient applicatif. Suite à l'essor d'HTML5, de jQuery et des applications monopages, on commence à vouloir concilier un code lisible en développement avec des fichiers légers en production. Les dossiers locaux s'adaptent pour héberger des robots automatiques de build.",
    whyImportant: "Un dossier global nommé /assets fait son apparition. Dedans, on structure le code source de travail. Un exécuteur de tâches en arrière-plan (Grunt ou Gulp) écoute vos modifications de fichiers en temps réel et génère des versions compressées unifiées (.min.js, .min.css) transmises au serveur.",
    anecdote: "C'est l'aube d'npm et de package.json sur le développement Front-End. Le dossier bower_components y cohabitera parfois avant d'être délaissé.",
    tree: [
      { name: "index.html", type: "file", desc: "L'index HTML principal faisant référence uniquement aux fichiers compilés.", detail: "Charge app.min.js et main.min.css pour une exécution ultra-rapide." },
      { name: "package.json", type: "file", desc: "Fichier de configuration du projet et gestion des utilitaires locaux.", detail: "Consigne la liste des dépendances de développement (plugins Gulp)." },
      { name: "gulpfile.js", type: "file", desc: "Le script régulateur contenant la liste des tâches automatiques.", detail: "Enchaîne les tâches de concaténation, minification et d'optimisation d'images." },
      {
        name: "assets",
        type: "folder",
        desc: "Le répertoire unifié réunissant vos fichiers sources d'intégration.",
        children: [
          {
            name: "css",
            type: "folder",
            desc: "Dossier contenant les préprocesseurs Sass/Less.",
            children: [
              { name: "main.scss", type: "file", desc: "Fichier maître centralisant les importations de variables et styles réutilisables.", detail: "Compilé automatiquement en version compressé css/main.min.css." }
            ]
          },
          {
            name: "js",
            type: "folder",
            desc: "Logique JavaScript brute.",
            children: [
              { name: "app.js", type: "file", desc: "Code de comportement dynamique d'époque.", detail: "Minifié automatiquement en enlevant les espaces et commentaires." }
            ]
          },
          { name: "fonts", type: "folder", desc: "Polices d'écriture Web intégrées localement.", detail: "Fichiers WOFF de typographies personnalisées." }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "4. L'ère Moderne : Public, Src & Dist (2017 - Présent)",
    subtitle: "La sémantique des applications de pointe",
    tagline: "Vite, React, TypeScript et l'isolation totale des compilateurs",
    bannerColor: "from-emerald-600/20 to-teal-700/10 border-emerald-500/30",
    textTheme: "text-emerald-400",
    description: "Le standard actuel sépare hermétiquement les rôles : d'un côté ce qui est statique non compilé (public), de l'autre le code source métier transformé à la volée (src), et enfin le produit fini généré éphémèrement à chaque livraison (dist ou build).",
    whyImportant: "Le browser final ne lit jamais directement le contenu de votre dossier /src. Il reçoit une production optimisée dans /dist générée par votre bundler (comme Vite). Les liaisons relatives ont disparu au profit d'Imports ES Modules résolus statiquement au build, réduisant la taille du code final au strict utile.",
    anecdote: "C'est l'unification ultime du Clean Code. Toute la logique complexe de chargement asynchrone est déportée sur le compilateur, laissant le développeur se focaliser sur des composants d'une clarté absolue.",
    tree: [
      { name: "package.json", type: "file", desc: "Fiche d'identité, scripts de build et dépendances d'application.", detail: "Définit les paquets essentiels à l'exécution et de développement." },
      { name: "vite.config.ts", type: "file", desc: "Fichier régulateur du bundler nouvelle génération Vite.", detail: "Fait tourner le serveur de développement ultra-rapide et l'optimiseur de build." },
      {
        name: "public",
        type: "folder",
        desc: "Fichiers statiques recopiés littéralement dans la racine de destination au build.",
        children: [
          { name: "favicon.ico", type: "file", desc: "Petite icône représentant le site dans l'onglet.", detail: "Servi instantanément à la racine sans traitement." },
          { name: "robots.txt", type: "file", desc: "Directives d'indexation pour les crawlers de recherche.", detail: "Consigne l'adresse d'indexation principale." }
        ]
      },
      {
        name: "src",
        type: "folder",
        desc: "Le saint des saints : tout le code source de l'application !",
        children: [
          { name: "App.tsx", type: "file", desc: "Composant racine coordonnant les pages dynamiquement.", detail: "Navigue asynchronement entre sections d'un simple clic sans rechargement de page !" },
          {
            name: "components",
            type: "folder",
            desc: "Vos sections isolées et sémantiques réutilisables.",
            children: [
              { name: "MagasinsView.tsx", type: "file", desc: "Affichage moderne des boutiques locales.", detail: "Utilise des variables locales et du style utilitaire Tailwind CSS." },
              { name: "ContactForm.tsx", type: "file", desc: "Formulaire de contact fluide validé dynamiquement en temps réel.", detail: "Retourne des retours d'erreurs visuels précis." }
            ]
          },
          {
            name: "styles",
            type: "folder",
            desc: "Fichiers de thèmes consolidés.",
            children: [
              { name: "index.css", type: "file", desc: "En-tête centralisé initialisant Tailwind.", detail: "Plus aucun fichier CSS volumineux de styles figés n'est stocké ici." }
            ]
          }
        ]
      },
      {
        name: "dist",
        type: "folder",
        desc: "Le dossier de production généré éphémèrement.",
        children: [
          { name: "index.html", type: "file", desc: "L'unique fichier d'entrée de production optimisé et minifié.", detail: "Point de chargement ultra-rapide optimisé par compression." },
          { name: "assets-bundle.js", type: "file", desc: "Le code javascript compressé issu de vos modules.", detail: "Tous les composants y sont fusionnés de manière optimisée." }
        ]
      }
    ]
  }
];

export default function CleanCodeView({ theme }: CleanCodeViewProps) {
  // Navigation for tab sub-sections
  const [activeSubTab, setActiveSubTab] = useState<'integrator' | 'tree' | 'naming' | 'heritage' | 'foldersTimeline'>('foldersTimeline');
  const [selectedEra, setSelectedEra] = useState<number>(0);
  const [selectedEraFile, setSelectedEraFile] = useState<any>(erasData[0].tree[0]);

  const selectEra = (id: number) => {
    setSelectedEra(id);
    if (erasData[id] && erasData[id].tree && erasData[id].tree.length > 0) {
      setSelectedEraFile(erasData[id].tree[0]);
    } else {
      setSelectedEraFile(null);
    }
  };
  
  // States for file path validator
  const [inputFilename, setInputFilename] = useState('Logo Officiel Final v2_Édition Spéciale.png');
  // States for interactive file tree explorer
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    img: true,
    includes: false,
    css: false,
    produits: false,
  });
  // Active selected node on the file tree
  const [selectedNodePath, setSelectedNodePath] = useState<string>('root/index.html');

  // Simulated browser router for Section 1 (Single Page Ancestral)
  const [simulationUrl, setSimulationUrl] = useState<'/' | '/contact.html' | '/produits/catalogue.html' | '/services/index.html'>('/');

  // Toggle folders in the interactive explorer
  const toggleFolder = (key: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 10 Detailed Points encoded cleanly for deep reference
  const points = {
    p1: {
      title: "1. L'Intégrateur vs le Développeur",
      text: "Dans les années 2000, le métier de 'Frontend Developer' n'existait pas encore. On parlait d'Intégrateur Web.",
      details: "Leur univers consistait à recevoir une maquette graphique dessinée au pixel près sous Adobe Photoshop (.psd), à la découper méticuleusement et à la transcrire en structures HTML valides sémantiquement, habillées d'une feuille CSS. Le développeur, quant à lui, s'occupait des bases de données ou des scripts côté serveur (Perl, PHP, ASP) sans se soucier de l'esthétique."
    },
    p2: {
      title: "2. Le 'Single Page' Ancestral",
      text: "Contrairement à nos routeurs virtuels modernes (React Router, Next.js), chaque fichier physique présent sur le serveur FTP correspondait exactement à une URL publique visible par l'internaute.",
      details: "Beaucoup de sites corporatifs contenaient seulement une page unique (le fameux 'One-Pager') ou trois fichiers distincts. L'absence de routeur signifiait que naviguer vers 'contact' chargeait intégralement contact.html depuis le serveur, vidant brusquement la mémoire du navigateur."
    },
    p3: {
      title: "3. L'Anatomie du Dossier Racine (/)",
      text: "C'est l'aube du rangement méthodique. L'incontournable point d'entrée universel s'appelle index.html.",
      details: "Pourquoi index ? Les serveurs HTTP de l'époque (Apache) étaient configurés par défaut pour rechercher et servir ce fichier en premier lorsqu'un visiteur accédait à un répertoire. S'il était manquant, le serveur listait tous les fichiers du dossier brut, exposant le code au grand public !"
    },
    p4: {
      title: "4. Le Dossier /img (ou /images) & le Poids du Visuel",
      text: "À l'ère des modems RTC 56k et de l'ADSL balbutiant, charger une image de 500 Ko gelait l'affichage pendant d'interminables secondes.",
      details: "Les intégrateurs ont dû concevoir un dossier /img hautement fragmenté. On y triait les /icones, les /photos, les /backgrounds (motifs minuscules répétés en boucle). Chaque image était compressée au maximum, et l'usage d'accents ou d'espaces dans le nommage y était banni sous peine de renvoyer une erreur administrative 404.",
    },
    p5: {
      title: "5. L'Arrivée du Dossier /css et /js",
      text: "La saine transition vers la séparation absolue entre le fond et la mise en forme.",
      details: "Puisque nous avions enfin banni les balises <font> et styles directs, un dossier /css accueillait l'unique fichier global style.css. Ce fichier monolithique faisait couramment plus de 3000 lignes de hacks d'alignement, centralisant la totalité esthétique du domaine."
    },
    p6: {
      title: "6. L'Organisation par Rubriques (/produits, /services)",
      text: "Quand l'arborescence s'étend : le piège vicieux des chemins relatifs.",
      details: "Pour les catalogues volumineux, les rubriques possédaient leurs propres dossiers. Mais en l'absence de routage dynamique, l'inclusion d'une simple image de logo dans /produits/catalogue.html obligeait le webmaster à jongler avec l'effrayante syntaxe relative : ../../img/logo.gif pour forcer l'arborescence à remonter."
    },
    p7: {
      title: "7. Le 'Menu' et les Includes (L'astuce PHP)",
      text: "Le cauchemar des modifications répétitives résolu en une ligne de script côté serveur.",
      details: "Si un site possédait 50 pages HTML statiques et que le numéro de téléphone changeait dans le footer, le webmaster devait éditer les 50 fichiers un par un ! L'introduction de PHP permit de découper le site en fragments dynamiques : un dossier /includes hébergeant header.php et menu.php, réincorporés par de simples balises <?php include('includes/menu.php'); ?>."
    },
    p8: {
      title: "8. La Rigueur du Nommage",
      text: "Sur internet, les serveurs tournaient massivement sous Unix/Linux, sensibles à la casse, tandis que les webmasters concevaient leurs sites sous Windows.",
      details: "Le fichier 'Mon Image.JPG' fonctionnait en local sur Windows, mais provoquait une image brisée sur le serveur de production. Les espacements devenaient des '%20' illisibles. Le webmaster apprit à la dure les règles de survie : kebab-case (mon-image.jpg) ou snake_case (mon_image.jpg), tout en minuscules sans accents."
    },
    p9: {
      title: "9. L'Héritage pour le Front-End d'Aujourd'hui",
      text: "Les philosophies appliquées par nos frameworks actuels proviennent directement de ces premières consignes logiques.",
      details: "Le dossier /src/assets de React, l'organisation des modules isolés, et l'écriture de CSS centralisée globale dérivent du dossier racine originel. Apprendre le 'Clean Code' a commencé sur ces répertoires FTP."
    },
    p10: {
      title: "10. L'Impact pour le Back-End",
      text: "Organiser rationnellement les médias sur le disque dur a débloqué la programmation dynamique.",
      details: "Grâce à des dossiers standardisés d'images, de premiers scripts PHP ou Perl automatisés ont pu parcourir séquentiellement le répertoire /produits/img pour en générer de façon entièrement automatique et dynamique des galeries marchandes, ouvrant la voie au e-commerce moderne."
    }
  };

  // Interactive Tree Data representing Point 3, 4, 5, 6, 7
  const fileTree: TreeNode = {
    name: "mon-projet-web (Dossier Racine /)",
    type: "folder",
    desc: "Le répertoire maître hébergé chez Free ou Wanadoo, accessible en lecture/écriture par le client FTP FileZilla.",
    children: [
      {
        name: "index.html",
        type: "file",
        size: "4.2 Ko",
        desc: "Le point d'entrée obligatoire. C'est la page d'accueil par défaut servie par Apache.",
        codeSnippet: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <title>Bienvenue chez l'Antiquaire Rétro</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
  <!-- Astuce PHP pour charger le menu sans copier-coller ! -->
  <?php include("includes/header.php"); ?>
  
  <h1>Accueil du site</h1>
  <p>Découvrez notre boutique d'objets oubliés.</p>
  <img src="img/icones/star.gif" alt="nouveau" />
  
  <?php include("includes/footer.php"); ?>
</body>
</html>`,
        details: "Si vous accédez à un site sans spécifier de page (ex: www.monsite.fr), le serveur cherchera automatiquement index.html. Sans lui, le serveur affiche une liste brute de vos fichiers personnels !"
      },
      {
        name: "contact.html",
        type: "file",
        size: "2.8 Ko",
        desc: "Fichier physique réel correspondant à la page de contact. Pas de routage virtuel, c'est l'URL réelle du site.",
        codeSnippet: `<!-- Page de contact - URL: /contact.html -->
<form action="cgi-bin/formulaire.pl" method="POST">
  <label>Votre Email :</label>
  <input type="text" name="email" />
  <input type="submit" value="Envoyer" />
</form>`,
        details: "Le 'Single Page Ancestral' chargeait cette page complètement depuis le serveur. Toute adresse .html était un fichier posé physiquement sur le disque dur."
      },
      {
        name: "css",
        type: "folder",
        desc: "Le dossier centralisant les feuilles de style globales.",
        children: [
          {
            name: "style.css",
            type: "file",
            size: "24.5 Ko",
            desc: "L'unique fichier centralisant toute la mise en page. Il fait souvent 3000 lignes.",
            codeSnippet: `/* Feuille de style unique - style.css */
body {
  background-color: #d4d0c8;
  font-family: "MS Sans Serif", Geneva, sans-serif;
  margin: 0px;
}

#bloc-principal {
  width: 780px;
  margin: 0px auto;
  border-left: 2px solid #ffffff;
}

/* Hacks d'alignement pour les tableaux rétro */
table {
  border-collapse: collapse;
}

/* Fin de la balise <font> ! */
.texte-bleu {
  color: #000080;
  font-weight: bold;
}`,
            details: "Avant le CSS, on devait injecter <font face='Arial' color='red'> sur chaque paragraphe. CSS1 permit de tout ranger proprement dans ce fichier CSS unique."
          }
        ]
      },
      {
        name: "img",
        type: "folder",
        desc: "Le dossier de stockage des images. On trie le poids visuel pour ménager la bande passante 56k.",
        children: [
          {
            name: "background-pattern.gif",
            type: "file",
            size: "1.2 Ko",
            desc: "Un minuscule motif de 16x16 pixels répété en x et y pour former un fond texturé sans surcharger le réseau.",
            details: "Une image de fond de 200 Ko était inacceptable. On préférait répéter à l'infini une micro-texture de quelques octets."
          },
          {
            name: "logo-final.gif",
            type: "file",
            size: "8.4 Ko",
            desc: "Le logo de l'entreprise compressé au format GIF historique limité à 256 couleurs avec transparence tranchée.",
            details: "Pour conserver le fond transparent impeccable, on utilisait le GIF. Les ombres progressives (semi-transparence) n'existaient pas encore sur IE6."
          },
          {
            name: "photos",
            type: "folder",
            desc: "Sous-dossier contenant les clichés des objets compressés en JPEG progressif.",
            children: [
              {
                name: "mobylette-bleue.jpg",
                type: "file",
                size: "45.0 Ko",
                desc: "Cliché JPEG compressé à un taux de 65% pour peser moins de 50 Ko.",
                details: "Un nom de fichier en kebab-case strict, tout en minuscules, sans caractères accentués français."
              }
            ]
          }
        ]
      },
      {
        name: "includes",
        type: "folder",
        desc: "Dossier contenant les morceaux de code répétés sur toutes les pages grâce à l'astuce côté serveur (PHP).",
        children: [
          {
            name: "header.php",
            type: "file",
            size: "1.5 Ko",
            desc: "La section d'en-tête contenant la bannière publicitaire et le bandeau d'accueil.",
            codeSnippet: `<!-- includes/header.php -->
<div id="banniere-haut">
  <img src="img/logo-final.gif" alt="Logo Antiquaire" />
  <h2>Le temple de l'ancien temps</h2>
</div>`,
            details: "En unifiant l'en-tête ici, changer le logo s'effectue en une seule manipulation pour l'ensemble complet du site."
          },
          {
            name: "menu.php",
            type: "file",
            size: "1.1 Ko",
            desc: "La liste des liens vers les différentes rubriques du site.",
            codeSnippet: `<!-- includes/menu.php -->
<ul class="style-menu">
  <li><a href="index.html">Accueil</a></li>
  <li><a href="produits/catalogue.html">Nos Produits</a></li>
  <li><a href="contact.html">Contactez-nous</a></li>
</ul>`,
            details: "Le fichier menu.php évite le copier-coller récurrent de la structure de navigation sur 50 pages."
          }
        ]
      },
      {
        name: "produits",
        type: "folder",
        desc: "Rubrique sous-dossier isolant les fiches produits. Pose le cauchemar des liens relatifs.",
        children: [
          {
            name: "catalogue.html",
            type: "file",
            size: "12.0 Ko",
            desc: "Page de liste des objets à vendre. Situé un niveau en dessous du dossier racine (/).",
            codeSnippet: `<!-- produits/catalogue.html -->
<html>
<head>
  <title>Notre Catalogue</title>
  <!-- Attention : il faut remonter d'un niveau pour trouver le CSS ! -->
  <link rel="stylesheet" type="text/css" href="../css/style.css" />
</head>
<body>
  <!-- Danger : remonter pour aller sur le dossier parent -->
  <a href="../index.html">Retour à l'accueil</a>
  
  <h1>Notre catalogue</h1>
  <!-- Remonter pour chercher l'image -->
  <img src="../img/photos/mobylette-bleue.jpg" />
</body>
</html>`,
            details: "L'enfer des chemins relatifs : Pour dessiner le logo depuis cette page, le webmaster devait écrire path_relative='../img/logo-final.gif'."
          }
        ]
      }
    ]
  };

  // Helper to flat recursive search node by path
  const findNodeByPath = (nodes: TreeNode, path: string): TreeNode | null => {
    if (path === 'root' && nodes.name.includes("Root")) return nodes;
    const parts = path.split('/');
    let current: TreeNode = nodes;
    
    // Simple lookup based on matching names
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (current.children) {
        const found = current.children.find(c => c.name === part);
        if (found) {
          current = found;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    return current;
  };

  const selectedNode = findNodeByPath(fileTree, selectedNodePath);

  // Filename safety validator logic (Point 8 expanded with the 7 rule integrations)
  const getValidationReport = (name: string) => {
    const hasSpaces = name.includes(' ');
    const hasAccents = /[éèàùçîïûüôöêëÂÊÎÔÛÄËÏÖÜ]/i.test(name);
    const hasUppercase = /[A-Z]/.test(name);
    const isTooLong = name.length > 30;
    const hasSpecialChars = /[^A-Z0-9.\-_]/i.test(name.replace(/\s/g, ''));
    
    // Rule 1: Le syndrome de la version finale (contains final, v2, v1.0, etc.)
    const hasVersionPattern = /(_v[0-9]|_final|final|v[0-9]|vraiment_final)/i.test(name);
    
    // Rule 5: L'abus de points (multiple dots, e.g. mon.site.v1.0.html)
    const baseName = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
    const hasMultipleDots = baseName.includes('.');

    // Rule 6: CamelCase mal maîtrisé
    const isCamelCase = /[a-z][A-Z]/.test(name);

    // Rule 7: Noms temporaires (test.html, vieux_truc.php, test2.css)
    const isTemporary = /(^test[0-9]*\.|vieux|truc|tmp|temp)/i.test(name);

    // Rule 4: Nommage générique (image1.jpg, bouton2.png, texte.html)
    const nameWithoutExt = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
    const isGeneric = /^(image[0-9]*|bouton[0-9]*|texte[0-9]*|photo[0-9]*|fichier[0-9]*|doc[0-9]*)$/i.test(nameWithoutExt);

    const report = {
      original: name,
      hasSpaces,
      hasAccents,
      hasUppercase,
      isTooLong,
      hasSpecialChars,
      hasVersionPattern,
      hasMultipleDots,
      isCamelCase,
      isTemporary,
      isGeneric,
      suggested: '',
      isSafeForRetro: false,
    };

    // Correct the name step by step
    let suggested = name;
    
    // Remove accents
    const accentsMap: Record<string, string> = {
      'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'à': 'a', 'â': 'a', 'ä': 'a',
      'î': 'i', 'ï': 'i',
      'ô': 'o', 'ö': 'o',
      'û': 'u', 'ü': 'u',
      'ç': 'c',
      'É': 'e', 'È': 'e', 'Ê': 'e', 'Ë': 'e',
      'À': 'a', 'Â': 'a', 'Ä': 'a',
      'Î': 'i', 'Ï': 'i',
      'Ô': 'o', 'Ö': 'o',
      'Û': 'u', 'Ü': 'u',
      'Ç': 'c'
    };
    suggested = suggested.split('').map(char => accentsMap[char] || char).join('');
    
    // Convert CamelCase to kebab-case before lowercase if detected
    if (isCamelCase) {
      suggested = suggested.replace(/([a-z])([A-Z])/g, '$1-$2');
    }

    // Lowercase
    suggested = suggested.toLowerCase();

    // If it has temporary or final version patterns, get rid of them
    suggested = suggested.replace(/(_final|final|vraiment_final|v[0-9]|_v[0-9]|v[0-9]\.[0-9])/gi, '');
    suggested = suggested.replace(/(_vieux|_truc|vieux_||vieux|truc_||truc)/gi, '');

    // Replace special chars/spaces/multiple dots in name with hyphens
    const lastDotIndex = suggested.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const mainPart = suggested.substring(0, lastDotIndex).replace(/\./g, '-');
      const extPart = suggested.substring(lastDotIndex);
      suggested = mainPart + extPart;
    }

    // Replace other special characters
    suggested = suggested.replace(/[^a-z0-9.]+/g, '-');
    
    // Cleanup consecutive and outer hyphens
    suggested = suggested.replace(/-+/g, '-').replace(/-(\.[a-z0-9]+)$/i, '$1').replace(/^-+|-+$/g, '');

    // Default if skeleton
    const ext = suggested.includes('.') ? suggested.substring(suggested.lastIndexOf('.')) : '';
    const cleanBase = suggested.includes('.') ? suggested.substring(0, suggested.lastIndexOf('.')) : suggested;
    if (cleanBase.length === 0 || isGeneric) {
      suggested = `logo-officiel-entreprise${ext || '.png'}`;
    }

    report.suggested = suggested;
    report.isSafeForRetro = !hasSpaces && !hasAccents && !hasUppercase && !isTooLong && !hasSpecialChars && !hasVersionPattern && !hasMultipleDots && !isTemporary && !isGeneric;

    return report;
  };

  const nameReport = getValidationReport(inputFilename);

  // Visual Styling Object Mapping for current mode
  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          badgeActive: 'bg-[#000080] text-white text-[9px] uppercase font-bold px-2 py-0.5 border border-[#808080]',
          badgeInactive: 'bg-[#808080] text-white text-[9px] uppercase font-bold px-2 py-0.5 border border-white',
          title: 'text-blue-900 font-extrabold font-sans text-sm border-b-2 border-[#808080] pb-1 uppercase flex items-center gap-2',
          accentText: 'text-blue-800 font-bold',
          tag: 'bg-[#d4d0c8] text-black border border-[#808080] text-[10px] px-2 py-0.5 font-bold',
          code: 'bg-white border-2 border-inset border-[#808080] font-mono text-xs text-black p-3 block overflow-x-auto select-all rounded-none leading-normal',
          formInput: 'bg-white border-2 border-inset border-[#808080] text-black px-2 py-1 text-xs w-full font-mono outline-none focus:border-blue-900',
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-3 font-mono',
          badgeActive: 'bg-[#ffb000] text-black text-[9px] uppercase font-black px-2 py-0.5 border border-[#ffb000]',
          sidebarBadgeInactive: 'bg-black text-[#ffb000]/60 text-[9px] uppercase font-bold px-2 py-0.5 border border-[#ffb000]/30',
          badgeInactive: 'bg-black text-[#ffb000]/60 text-[9px] uppercase font-bold px-2 py-0.5 border border-[#ffb000]/30',
          title: 'text-[#ffb000] font-mono font-black text-sm border-b border-[#ffb000]/30 pb-2 uppercase tracking-wider flex items-center gap-2',
          accentText: 'text-[#ffb000] font-bold decoration-dotted underline',
          tag: 'bg-[#ffb000]/10 text-[#ffb000] border border-[#ffb000]/20 text-[10px] px-2 py-0.5 font-medium rounded-none',
          code: 'bg-[#050505] border border-[#ffb000]/20 font-mono text-xs text-[#ffb000] p-4 block overflow-x-auto select-all rounded-none',
          formInput: 'bg-black border border-[#ffb000]/40 text-[#ffb000] px-3 py-1.5 text-xs w-full font-mono focus:border-[#ffb000] outline-none',
        };
      default: // Modern - Slate Slate & Blue
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-750/70 rounded-xl space-y-3',
          badgeActive: 'bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-500/20',
          badgeInactive: 'bg-slate-950/40 text-slate-500 text-[10px] font-medium uppercase px-2 py-0.5 rounded-full border border-transparent',
          title: 'text-white font-sans font-extrabold text-sm tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-2',
          accentText: 'text-blue-400 font-semibold',
          tag: 'bg-[#16161a] text-slate-300 border border-slate-800 text-[10.5px] px-2.5 py-1 rounded-md font-sans hover:border-gray-700 transition',
          code: 'bg-[#0a0a0c] border border-[#2a2a2e]/60 font-mono text-[11px] text-slate-300 p-3.5 rounded-xl overflow-x-auto select-all shadow-inner leading-relaxed',
          formInput: 'bg-slate-950 border border-slate-800 focus:border-blue-500/70 text-slate-200 px-3 py-2 rounded-lg text-xs w-full outline-none transition',
        };
    }
  };

  const getSubTabStyles = (tabId: string) => {
    const isActive = activeSubTab === tabId;
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
        ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-bold rounded-lg px-4 py-2 text-xs border cursor-pointer'
        : 'bg-slate-900/30 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg px-4 py-2 text-xs border cursor-pointer';
    }
  };

  const style = getThemeClass();

  // Recursive render helper for the file tree JSX
  const renderTreeNodes = (node: TreeNode, currentPath: string, depth = 0) => {
    const nodePath = `${currentPath}/${node.name}`;
    const key = node.name.replace(/[^a-z0-9]/gi, '_');
    const isExpanded = expandedFolders[key];
    const isSelected = selectedNodePath === nodePath;

    const paddingLeft = `${depth * 14}px`;

    return (
      <div key={nodePath} className="space-y-1">
        <div 
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(key);
            }
            setSelectedNodePath(nodePath);
          }}
          style={{ paddingLeft }}
          className={`flex items-center justify-between cursor-pointer py-1.5 px-2 transition-all ${
            isSelected 
              ? theme === 'ie6' ? 'bg-[#000080] text-white' : theme === 'terminal' ? 'bg-[#ffb000]/20 text-[#ffb000] font-black border-l-2 border-[#ffb000]' : 'bg-blue-900/15 text-blue-300 border-l-2 border-blue-500'
              : theme === 'ie6' ? 'text-black hover:bg-white/20' : theme === 'terminal' ? 'text-[#ffb000]/70 hover:text-[#ffb000]' : 'text-slate-400 hover:text-slate-200'
          }`}
          id={`tree-node-${key}`}
        >
          <div className="flex items-center gap-1.5 truncate">
            {node.type === 'folder' ? (
              isExpanded ? <FolderOpen className="w-3.5 h-3.5 shrink-0 text-amber-500" /> : <Folder className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            ) : (
              node.name.endsWith('.html') || node.name.endsWith('.php') ? <FileCode className="w-3.5 h-3.5 shrink-0 text-sky-400" /> : <FileText className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
            )}
            <span className="text-[11.5px] font-mono truncate">{node.name}</span>
          </div>
          {node.size && (
            <span className="text-[9.5px] opacity-60 font-mono shrink-0 ml-1">
              ({node.size})
            </span>
          )}
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div className="border-l border-dashed border-gray-700/50 ml-3.5">
            {node.children.map(child => renderTreeNodes(child, nodePath, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderEraTree = (nodes: any[], depth = 0): React.ReactNode => {
    return nodes.map((node: any) => {
      const isFolder = node.type === 'folder';
      const isSelected = selectedEraFile && selectedEraFile.name === node.name && selectedEraFile.desc === node.desc;
      const key = `${node.name}-${depth}`;

      return (
        <div key={key} className="space-y-1">
          <div
            onClick={() => setSelectedEraFile(node)}
            style={{ paddingLeft: `${depth * 14}px` }}
            className={`flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg transition-all text-xs ${
              isSelected
                ? theme === 'ie6'
                  ? 'bg-[#000080] text-white'
                  : theme === 'terminal'
                  ? 'bg-[#ffb000]/20 text-[#ffb000] border-l-2 border-[#ffb000] font-bold'
                  : 'bg-blue-600/15 text-blue-300 border-l-2 border-blue-500 font-semibold'
                : theme === 'ie6'
                ? 'text-black hover:bg-[#808080]/15'
                : theme === 'terminal'
                ? 'text-[#ffb000]/75 hover:text-[#ffb000]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              {isFolder ? (
                <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              ) : (
                node.name.endsWith('.html') || node.name.endsWith('.php')
                  ? <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  : <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              )}
              <span className="font-mono truncate">{node.name}</span>
            </div>
            <span className="text-[9px] opacity-40 uppercase tracking-tight italic select-none font-mono shrink-0 ml-1">
              {isFolder ? 'dossier' : 'fichier'}
            </span>
          </div>

          {isFolder && node.children && (
            <div className="border-l border-dashed border-gray-700/40 ml-2.5 font-sans">
              {renderEraTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6" id="clean-code-root">
      {/* 1. Introductory Hero Header */}
      <div className={style.card}>
        <div className="flex items-start gap-3 flex-col sm:flex-row">
          <div className={`p-3 shrink-0 rounded-xl ${theme === 'ie6' ? 'bg-white text-blue-900' : 'bg-blue-600/10 text-blue-400 border border-blue-500/20'}`}>
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`${theme === 'ie6' ? 'text-[#000080] font-black' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'} text-lg font-black tracking-tight leading-tight`}>
              L'Art du Rangement – L'ère des Intégrateurs (Années 2000)
            </h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              En l'absence de frameworks intégrés et de compilateurs automatiques, la survie du webmaster des années 2000 passait par une discipline militaire de rangement. Découvrez comment s'organisait le dossier racine et pourquoi ces rigueurs structurelles influencent l'excellence du Front-End moderne.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sub Navigation Menu */}
      <div className={`flex flex-wrap gap-2 pb-3 border-b ${theme === 'ie6' ? 'border-[#808080]' : theme === 'terminal' ? 'border-[#ffb000]/20' : 'border-slate-800'}`}>
        <button
          onClick={() => setActiveSubTab('foldersTimeline')}
          className={`${getSubTabStyles('foldersTimeline')} flex items-center gap-2`}
          id="btn-subtab-folders-timeline"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Évolution des Dossiers</span>
        </button>
        <button
          onClick={() => setActiveSubTab('tree')}
          className={`${getSubTabStyles('tree')} flex items-center gap-2`}
          id="btn-subtab-tree"
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Explorateur de Structure (/)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('integrator')}
          className={`${getSubTabStyles('integrator')} flex items-center gap-2`}
          id="btn-subtab-integrator"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Intégrateur vs Développeur</span>
        </button>
        <button
          onClick={() => setActiveSubTab('naming')}
          className={`${getSubTabStyles('naming')} flex items-center gap-2`}
          id="btn-subtab-naming"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Régulateur de Nommage</span>
        </button>
        <button
          onClick={() => setActiveSubTab('heritage')}
          className={`${getSubTabStyles('heritage')} flex items-center gap-2`}
          id="btn-subtab-heritage"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>L'Héritage & le Back-End</span>
        </button>
      </div>

      {/* 3. Panel Container */}
      <div className="grid grid-cols-1 gap-6">

        {/* ============== TIMELINE TAB: FOLDERS TIMELINE =============== */}
        {activeSubTab === 'foldersTimeline' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="panel-folders-timeline"
          >
            {/* Timeline Stepper Header */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {erasData.map((era) => {
                const isActive = selectedEra === era.id;
                let activeStyleState = '';
                if (theme === 'ie6') {
                  activeStyleState = isActive 
                    ? 'bg-[#d4d0c8] border-2 border-inset border-white text-[#000080] font-bold shadow-sm'
                    : 'bg-[#d4d0c8] border-2 border-outset border-white text-black hover:bg-[#c0c0c0]';
                } else if (theme === 'terminal') {
                  activeStyleState = isActive
                    ? 'bg-[#ffb000]/20 text-[#ffb000] border border-[#ffb000] font-bold shadow-md'
                    : 'text-[#ffb000]/60 border border-[#ffb000]/15 hover:border-[#ffb000]/55 hover:text-[#ffb000]';
                } else {
                  activeStyleState = isActive
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-bold shadow-lg'
                    : 'bg-[#121215]/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40';
                }

                return (
                  <button
                    key={era.id}
                    onClick={() => selectEra(era.id)}
                    className={`${activeStyleState} p-4 text-left transition-all border font-sans cursor-pointer flex flex-col justify-between`}
                    id={`btn-era-${era.id}`}
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-mono opacity-65">
                        Époque {era.id + 1}
                      </span>
                      <h4 className="text-[12px] font-extrabold leading-tight mt-1">
                        {era.title.replace(/^[0-9]\. /i, '')}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Split layout: Tree of Era (Left), Analysis and Anatomy of Era (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (5/12 cols): Simulated structure tree */}
              <div className="lg:col-span-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black ${theme === 'terminal' ? 'text-[#ffb000]' : 'text-blue-400'} uppercase block tracking-wider`}>
                    📁 ARBORESCENCE {selectedEra === 0 ? 'PLATE (Vrac FTP)' : 'STRUCTURÉE'}
                  </span>
                  <span className="text-[9.5px] font-mono text-zinc-500 italic">
                    Cliquez sur un fichier
                  </span>
                </div>

                <div className={`p-4 select-none overflow-y-auto min-h-[300px] max-h-[420px] ${
                  theme === 'ie6' 
                    ? 'bg-[#ffffff] border-2 border-inset border-[#808080] text-black' 
                    : theme === 'terminal' 
                    ? 'bg-black border border-[#ffb000]/30 text-[#ffb000]' 
                    : 'bg-[#15151a] border border-slate-800/95 rounded-2xl shadow-lg'
                }`}>
                  <div className="space-y-1.5">
                    {renderEraTree(erasData[selectedEra].tree)}
                  </div>
                </div>

                {/* Micro Item Inspector (Node Selected details) */}
                {selectedEraFile && (
                  <div className={`p-4 ${
                    theme === 'ie6' 
                      ? 'bg-[#d4d0c8] border-2 border-inset border-white text-black' 
                      : theme === 'terminal' 
                      ? 'bg-black border border-[#ffb000]/25 text-[#ffb000]' 
                      : 'bg-[#121215] border border-slate-800 rounded-xl'
                  } space-y-2`}>
                    <div className="flex items-center gap-1.5 pb-2 border-b border-gray-800/40">
                      <span className="text-xs">🔬</span>
                      <span className="text-xs font-bold font-mono text-blue-400">
                        Analyse : {selectedEraFile.name}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-zinc-300 leading-normal">
                      <strong>Rôle :</strong> {selectedEraFile.desc}
                    </p>
                    {selectedEraFile.detail && (
                      <div className="text-[11px] text-gray-400 italic bg-black/20 p-2.5 rounded border border-gray-800/20">
                        <strong>Vérité historique :</strong> {selectedEraFile.detail}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column (7/12 cols): Historical explanation & autopsy */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`p-5 space-y-4 ${
                  theme === 'ie6' 
                    ? 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] text-black' 
                    : theme === 'terminal' 
                    ? 'bg-black border border-[#ffb000]/30 text-[#ffb000]' 
                    : 'bg-[#111114] border border-slate-800 rounded-2xl shadow-xl'
                }`}>
                  {/* Title & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <h3 className={`text-md font-extrabold ${theme === 'terminal' ? 'text-[#ffb000]' : 'text-white'}`}>
                        {erasData[selectedEra].title}
                      </h3>
                      <p className="text-xs text-blue-400 font-medium italic mt-1">
                        « {erasData[selectedEra].tagline} »
                      </p>
                    </div>
                    {theme !== 'ie6' && (
                      <span className={style.tag}>
                        {erasData[selectedEra].subtitle}
                      </span>
                    )}
                  </div>

                  {/* Core description text */}
                  <div className="space-y-4 pt-1">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">🔍 Résumé Archéologique :</h4>
                      <p className={`text-[12.5px] leading-relaxed mt-2 ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                        {erasData[selectedEra].description}
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      theme === 'ie6' 
                        ? 'bg-[#d4d0c8] border-inset border-white' 
                        : 'bg-blue-950/20 border-blue-500/10'
                    } space-y-2`}>
                      <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>💡 La Révolution Logistique de cette Étape :</span>
                      </h4>
                      <p className="text-[12px] text-zinc-300 leading-relaxed">
                        {erasData[selectedEra].whyImportant}
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl space-y-1.5">
                      <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest font-mono block">
                        🎙️ L'anecdote de l'expert rétro :
                      </span>
                      <p className="text-[11.5px] text-gray-400 italic leading-relaxed">
                        {erasData[selectedEra].anecdote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============== TAB 1: INTERACTIVE DIRECTORY EXPLORER =============== */}
        {activeSubTab === 'tree' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="panel-tree"
          >
            {/* Split Explorer layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Column: Direct File Tree Explorer (5 cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-3">
                <span className={`text-[10px] font-mono font-black ${theme === 'terminal' ? 'text-[#ffb000]' : 'text-blue-400'} uppercase block tracking-wider`}>
                  📁 DOSSIER FTP DU SITE (FTP: CLIENT/MON-PROJET-WEB/)
                </span>

                <div className={`p-3 select-none overflow-y-auto max-h-[400px] ${
                  theme === 'ie6' 
                    ? 'bg-[#ffffff] border-2 border-inset border-[#808080] text-black' 
                    : theme === 'terminal' 
                    ? 'bg-black border border-[#ffb000]/30 text-[#ffb000]' 
                    : 'bg-[#15151a] border border-slate-800 rounded-xl shadow-lg'
                }`}>
                  {renderTreeNodes(fileTree, 'root')}
                </div>
                
                <div className="p-3.5 bg-yellow-500/5 border border-yellow-500/10 rounded-lg text-gray-400 text-[11px] leading-relaxed">
                  <span className="text-yellow-500 font-bold block mb-1">💡 Indices d'exploration :</span>
                  Découvrez l'intérêt des dossiers en cliquant sur{' '}
                  <strong className="text-white font-mono">img</strong>,{' '}
                  <strong className="text-white font-mono">css</strong>,{' '}
                  <strong className="text-white font-mono">includes</strong>, ou{' '}
                  <strong className="text-white font-mono">produits/catalogue.html</strong>.
                </div>
              </div>

              {/* Right Column: Node details & code preview (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedNodePath}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.12 }}
                    className={style.card}
                  >
                    {/* Node title & file details */}
                    <div className="flex items-center justify-between border-b border-[#2a2a2e]/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {selectedNode?.type === 'folder' ? '📁' : '📄'}
                        </span>
                        <div>
                          <h3 className={`text-sm font-black font-mono ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-blue-400'}`}>
                            {selectedNode?.name}
                          </h3>
                          <span className="text-[10px] text-gray-500 font-mono block">
                            Chemin complet : /{selectedNodePath.replace('root/', '')}
                          </span>
                        </div>
                      </div>
                      
                      {selectedNode?.size && (
                        <span className={style.tag}>
                          Poids : {selectedNode.size}
                        </span>
                      )}
                    </div>

                    {/* Explanatory description linking Points 3, 4, 5, 6, 7 */}
                    <div className="space-y-3 mt-1.5">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 font-mono uppercase block">Rôle / Contexte Vintage :</span>
                        <p className={`text-[12px] leading-relaxed mt-0.5 ${theme === 'ie6' ? 'text-black' : 'text-slate-300'}`}>
                          {selectedNode?.desc}
                        </p>
                      </div>

                      {selectedNode?.details && (
                        <div className="p-3 bg-[#131317]/50 border border-slate-900 rounded-lg text-[11px] text-gray-400 italic leading-relaxed">
                          <strong className={style.accentText}>Éclairage d'époque :</strong> {selectedNode.details}
                        </div>
                      )}

                      {/* Associated point highlights if relevant */}
                      {selectedNode?.name === 'index.html' && (
                        <div className={style.innerCard}>
                          <h4 className="text-xs font-bold text-blue-400">{points.p3.title}</h4>
                          <p className="text-[11px] text-gray-300">{points.p3.text} {points.p3.details}</p>
                        </div>
                      )}
                      {selectedNode?.name === 'img' && (
                        <div className={style.innerCard}>
                          <h4 className="text-xs font-bold text-emerald-400">{points.p4.title}</h4>
                          <p className="text-[11px] text-gray-300">{points.p4.text} {points.p4.details}</p>
                        </div>
                      )}
                      {selectedNode?.name === 'style.css' && (
                        <div className={style.innerCard}>
                          <h4 className="text-xs font-bold text-indigo-400">{points.p5.title}</h4>
                          <p className="text-[11px] text-gray-300">{points.p5.text} {points.p5.details}</p>
                        </div>
                      )}
                      {selectedNode?.name === 'produits' && (
                        <div className={style.innerCard}>
                          <h4 className="text-xs font-bold text-rose-400">{points.p6.title}</h4>
                          <p className="text-[11px] text-gray-300">{points.p6.text}</p>
                        </div>
                      )}
                      {selectedNode?.name === 'catalogue.html' && (
                        <div className={style.innerCard}>
                          <span className="text-red-400 text-[10px] font-bold block">⚠️ L'ENFER DES LIENS RELATIFS (Point 6) :</span>
                          <p className="text-[11px] text-zinc-300 leading-relaxed">
                            Pour afficher le logo depuis le dossier produit, l'intégrateur devait remonter l'arborescence : <code className="font-mono text-red-300 font-bold bg-black/40 px-1">../img/logo-final.gif</code>. Une seule mauvaise manipulation du dossier cassait l'affichage complet !
                          </p>
                        </div>
                      )}
                      {selectedNode?.name === 'includes' || selectedNode?.name?.endsWith('.php') ? (
                        <div className={style.innerCard}>
                          <h4 className="text-xs font-bold text-amber-500">{points.p7.title}</h4>
                          <p className="text-[11px] text-gray-300">{points.p7.text} {points.p7.details}</p>
                        </div>
                      ) : null}

                      {/* Code Snippet block if file has code */}
                      {selectedNode?.codeSnippet && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-gray-500 font-mono uppercase block">Aperçu du Code Source :</span>
                          <pre className={style.code}>
                            <code>{selectedNode.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============== TAB 2: INTEGRATOR VS DEVELOPER (Point 1 & 2) =============== */}
        {activeSubTab === 'integrator' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="panel-integrator"
          >
            {/* Segment: L'Intégrateur vs le Développeur */}
            <div className={style.card}>
              <h3 className={style.title}>
                <Users className="w-4 h-4 shrink-0 text-blue-400" />
                <span>1. L'Intégrateur vs le Développeur (Années 2000)</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                {points.p1.text} {points.p1.details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                
                {/* Vintage Integrator Column */}
                <div className="p-4 bg-blue-950/10 border border-blue-500/20 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest font-mono">L'Intégrateur Rétro</h4>
                      <p className="text-[10px] text-zinc-500">Focus : Esthétique & Standards</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                    <li>Reçoit les fichiers <strong className="text-white">Photoshop (.psd)</strong> de 150 Mo.</li>
                    <li>Découpe les calques en images transparentes (GIF/PNG).</li>
                    <li>Code les structures HTML4 sémantiques ou XHTML1.0.</li>
                    <li>Peste contre l'interprétation d'Internet Explorer 6.</li>
                    <li>N'utilise pas de bases de données, il "montera" des pages statiques rigides.</li>
                  </ul>
                </div>

                {/* Vintage Developer Column */}
                <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest font-mono">Le Développeur Rétro</h4>
                      <p className="text-[10px] text-zinc-500">Focus : Logique & Serveur</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                    <li>Rédige des scripts côté serveur en <strong className="text-white">Perl, PHP 3/4, ou ASP</strong>.</li>
                    <li>Configure les permissions de fichiers chiffrées sur le serveur UNIX (CHMOD).</li>
                    <li>Structure de premières bases de données relationnelles SQL rudimentaires.</li>
                    <li>Ignore souverainement les décalages de design de 3 pixels.</li>
                    <li>Récupère le HTML de l'intégrateur et y greffe ses boucles asynchrones.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Segment: Le "Single Page" Ancestral (Point 2) */}
            <div className={style.card}>
              <h3 className={style.title}>
                <Info className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>2. Le "Single Page" Ancestral (Pas de Routeur Virtuel)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                {points.p2.text}
              </p>

              <div className={`p-4 mt-3 rounded-lg border ${theme === 'ie6' ? 'bg-[#909090]' : 'bg-slate-950 border-slate-900'} space-y-4`}>
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block">
                  🖥️ Simulateur de Routeur physique par URL Réelle :
                </span>

                {/* Virtual Browser address bar */}
                <div className="bg-[#111] p-2 rounded border border-slate-700 flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-500">Adresse :</span>
                  <span className="text-blue-400">http://retro-boutique.wanadoo.fr{simulationUrl}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button 
                    onClick={() => setSimulationUrl('/')}
                    className={`p-2 font-mono text-[11px] border cursor-pointer ${simulationUrl === '/' ? 'bg-blue-600 text-white' : 'bg-[#222] text-zinc-400 hover:bg-[#333]'}`}
                  >
                    /index.html (Accueil)
                  </button>
                  <button 
                    onClick={() => setSimulationUrl('/contact.html')}
                    className={`p-2 font-mono text-[11px] border cursor-pointer ${simulationUrl === '/contact.html' ? 'bg-blue-600 text-white' : 'bg-[#222] text-zinc-400 hover:bg-[#333]'}`}
                  >
                    /contact.html (Contact)
                  </button>
                  <button 
                    onClick={() => setSimulationUrl('/produits/catalogue.html')}
                    className={`p-2 font-mono text-[11px] border cursor-pointer ${simulationUrl === '/produits/catalogue.html' ? 'bg-blue-600 text-white' : 'bg-[#222] text-zinc-400 hover:bg-[#333]'}`}
                  >
                    /produits/catalogue.html
                  </button>
                  <button 
                    onClick={() => setSimulationUrl('/services/index.html')}
                    className={`p-2 font-mono text-[11px] border cursor-pointer ${simulationUrl === '/services/index.html' ? 'bg-blue-600 text-white' : 'bg-[#222] text-zinc-400 hover:bg-[#333]'}`}
                  >
                    /services/index.html
                  </button>
                </div>

                {/* Screen Render Simulation of selected physical file */}
                <div className="bg-white p-4 border border-zinc-300 text-black font-sans min-h-[120px] flex flex-col justify-between">
                  <div>
                    {simulationUrl === '/' && (
                      <div className="space-y-1">
                        <h4 className="text-[#000080] font-black text-sm">🏡 Page d'Accueil – index.html</h4>
                        <p className="text-xs text-zinc-600">Bienvenue sur l'ancêtre du web ! Fichier chargé intégralement en 1.5s.</p>
                      </div>
                    )}
                    {simulationUrl === '/contact.html' && (
                      <div className="space-y-1">
                        <h4 className="text-[#000080] font-black text-sm">📬 Formulaire Administratif – contact.html</h4>
                        <p className="text-xs text-zinc-600">Formulaire géré par scripts Perl CGI. Fichier physique indépendant.</p>
                      </div>
                    )}
                    {simulationUrl === '/produits/catalogue.html' && (
                      <div className="space-y-1">
                        <h4 className="text-[#000080] font-black text-sm">📦 Catalogue d'Objets – produits/catalogue.html</h4>
                        <p className="text-xs text-zinc-600">Nous utilisons le niveau inférieur pour ranger. Pour afficher le logo du dossier parent, on appelle ../img/logo.gif !</p>
                      </div>
                    )}
                    {simulationUrl === '/services/index.html' && (
                      <div className="space-y-1">
                        <h4 className="text-[#000080] font-black text-sm">⚙️ Services Techniques – services/index.html</h4>
                        <p className="text-xs text-zinc-600">L'adresse se termine par le dossier /services/ mais Apache charge automatiquement index.html par défaut !</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Warning message explaining why it refreshed */}
                  <span className="text-[9px] text-[#000080] italic block font-mono border-t border-zinc-200 pt-2 mt-4">
                    ⚡ Signal : [Navigation Réelle] Écran rafraîchi de force, perte totale des variables d'état (pas de Hot Reloading en 2000).
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============== TAB 3: RIGUEUR DU NOMMAGE & VALIDATEUR (Point 8) =============== */}
        {activeSubTab === 'naming' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="panel-naming"
          >
            {/* Point 8 description */}
            <div className={style.card}>
              <h3 className={style.title}>
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                <span>8. La Rigueur du Nommage : La Survie du Webmaster</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                {points.p8.text} {points.p8.details}
              </p>
            </div>

            {/* The 7 Typical Naming Errors Grid */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800/80 pb-2 gap-2">
                <h4 className={`text-xs font-extrabold uppercase tracking-widest ${theme === 'terminal' ? 'text-[#ffb000]' : theme === 'ie6' ? 'text-[#000080]' : 'text-blue-400'}`}>
                  🚫 Les 7 erreurs de nommage typiques
                </h4>
                <span className="text-[10px] text-gray-500 font-mono italic">
                  Cliquez sur "Tester l'erreur" pour simuler son comportement réel
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {namingErrors.map((err) => (
                  <div 
                    key={err.id} 
                    className={`${style.card} hover:border-slate-700 transition-all duration-200 flex flex-col justify-between`}
                    id={`naming-error-card-${err.id}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{err.icon}</span>
                        <h5 className={`text-[12.5px] font-extrabold leading-snug ${theme === 'ie6' ? 'text-black' : 'text-slate-100'}`}>
                          {err.title}
                        </h5>
                      </div>
                      
                      <div className="text-[9.5px] text-gray-500 italic font-mono leading-none">
                        {err.subtitle}
                      </div>

                      <div className="p-2 bg-rose-950/20 border border-rose-900/10 font-mono text-[10.5px] text-rose-300 rounded">
                        <span className="text-[8px] uppercase text-rose-400 font-bold block mb-0.5">L'erreur :</span>
                        <code>{err.errorExample}</code>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {err.lesson}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-gray-800/40">
                      <button
                        onClick={() => setInputFilename(err.sampleFile)}
                        className={`w-full py-1.5 px-2 text-[10px] font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                          theme === 'ie6'
                            ? 'bg-[#d4d0c8] border-2 border-outset border-white text-black'
                            : theme === 'terminal'
                            ? 'bg-black border border-[#ffb000]/60 text-[#ffb000] hover:bg-[#ffb000]/10'
                            : 'bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20'
                        }`}
                        id={`btn-test-error-${err.id}`}
                      >
                        <span>Tester l'erreur ⚡</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive safety tester */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">

              {/* Input Form Column (5 cols) */}
              <div className={`lg:col-span-5 ${style.card}`}>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-3">
                  🔍 Testeur de Compatibilité Rétro
                </h4>
                <p className="text-[11px] text-zinc-400 mb-3 leading-snug">
                  Entrez n'importe quel nom pour simuler la publication FTP et l'affichage de vos liens Web :
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 block mb-1">Nom du fichier média :</label>
                    <input 
                      type="text"
                      className={style.formInput}
                      value={inputFilename}
                      onChange={(e) => setInputFilename(e.target.value)}
                      placeholder="Ex: Mon Image Géniale Version 1.JPG"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] text-zinc-500 block w-full font-mono">Suggestions rapides :</span>
                    <button 
                      onClick={() => setInputFilename("contact-valide.html")}
                      className={`text-[9.5px] px-2 py-0.5 border cursor-pointer border-slate-700 hover:border-blue-500 ${theme === 'ie6' ? 'text-black border-gray-400' : ''}`}
                    >
                      kebab-case-propre.html
                    </button>
                    <button 
                      onClick={() => setInputFilename("Logo_Officiel_final_v3.gif")}
                      className={`text-[9.5px] px-2 py-0.5 border cursor-pointer border-slate-700 hover:border-blue-500 ${theme === 'ie6' ? 'text-black border-gray-400' : ''}`}
                    >
                      Logo_Officiel_final_v3.gif
                    </button>
                  </div>
                </div>
              </div>

              {/* Diagnosis Report Column (7 cols) */}
              <div className={`lg:col-span-7 ${style.card}`}>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-2">
                  🩺 Diagnostic de Compatibilité (Serveur Apache/OS Unix)
                </h4>

                <div className="space-y-3 text-xs">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {nameReport.isSafeForRetro ? (
                      <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded border border-emerald-500/30 flex items-center gap-2 w-full">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <div>
                          <strong className="block text-[11.5px]">Standard Valide & Sûr !</strong>
                          <span className="text-[9.5px] opacity-80 font-mono text-gray-400">Le nom respecte l'homogénéité du serveur de production.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-rose-500/10 text-rose-400 p-2.5 rounded border border-rose-500/20 flex items-center gap-2 w-full">
                        <XCircle className="w-5 h-5 shrink-0" />
                        <div>
                          <strong className="block text-[11.5px]">Alerte : Nom du fichier non-conforme</strong>
                          <span className="text-[9.5px] opacity-80 font-mono text-gray-400">Certains environnements d'hébergement échoueront à résoudre ce média.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checklist indicators covering the 7 errors */}
                  <div className="space-y-1.5 font-mono text-[10.5px] border-y border-slate-800/60 py-2">
                    <div className="flex items-center justify-between">
                      <span>1. Syndrome de la version finale :</span>
                      {nameReport.hasVersionPattern ? (
                        <span className="text-rose-400 font-bold">❌ Présent (_final, _v2, etc.)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Nom stable)</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>2. French Touch (Accents & Espaces) :</span>
                      {(nameReport.hasAccents || nameReport.hasSpaces) ? (
                        <span className="text-rose-400 font-bold">❌ Présents (%20 ou caractères invalides)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Pas d'accents/espaces)</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>3. Différence de Casse (Casing) :</span>
                      {nameReport.hasUppercase ? (
                        <span className="text-rose-400 font-bold">❌ Majuscules détectées (Risque 404)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Tout en minuscules)</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>4. Nommage non-générique (SEO/Sens) :</span>
                      {nameReport.isGeneric ? (
                        <span className="text-rose-400 font-bold">❌ Trop générique (ex: image1.jpg)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Explicite / Descriptif)</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>5. Abus de points (Extension unique) :</span>
                      {nameReport.hasMultipleDots ? (
                        <span className="text-rose-400 font-bold">❌ Points multiples détectés</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Un seul point)</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>6. Kebab-case au lieu de CamelCase :</span>
                      {nameReport.isCamelCase ? (
                        <span className="text-rose-400 font-bold">❌ CamelCase détecté</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>7. Absence de nom d'archive temporaire :</span>
                      {nameReport.isTemporary ? (
                        <span className="text-rose-400 font-bold">❌ Nom temporaire/périssable</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ OK (Nom pérenne)</span>
                      )}
                    </div>
                  </div>

                  {/* Automated correction recommendation */}
                  {!nameReport.isSafeForRetro && (
                    <div className="p-3 bg-blue-950/15 border border-blue-500/20 rounded-lg space-y-1 mt-4">
                      <span className="text-[10px] font-bold text-blue-400 uppercase font-mono block">
                        🛠️ Recommandation automatique de Nettoyage :
                      </span>
                      <p className="text-[11px] text-zinc-300">
                        Pour maximiser la compatibilité, renommez ce fichier selon le standard moderne kebab-case :
                      </p>
                      <div className="bg-[#0c0c0e] border border-blue-900/30 font-mono text-emerald-400 p-2 text-xs rounded select-all break-all text-center">
                        {nameReport.suggested}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============== TAB 4: HERITAGE & BACK-END (Points 9 & 10) =============== */}
        {activeSubTab === 'heritage' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="panel-heritage"
          >
            {/* Point 9 Layout (Héritage Front-end d'aujourd'hui) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className={style.card}>
                <h3 className={style.title}>
                  <Layers className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>9. L'Héritage pour le Front-End d'Aujourd'hui</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-2">
                  {points.p9.text} {points.p9.details}
                </p>

                <div className="p-3.5 bg-blue-950/10 border border-blue-500/20 rounded-lg space-y-2 mt-4 text-xs">
                  <span className="text-blue-400 font-bold font-mono text-[10px] uppercase block">
                    🔄 De l'Intégration Rétro à React :
                  </span>
                  <div className="space-y-1 text-[11px] text-gray-300">
                    <p>• <strong className="text-white">Assets :</strong> Le fameux répertoire <code className="font-mono text-zinc-400 bg-black/40 px-1">/img</code> d'époque est le grand-père direct du dossier <code className="font-mono text-blue-300 bg-black/40 px-1">/public/</code> ou <code className="font-mono text-blue-300 bg-black/40 px-1">/src/assets/</code>.</p>
                    <p>• <strong className="text-white">Modularité :</strong> Les fragments d'includes PHP (<code className="font-mono text-zinc-400 bg-black/40 px-1">menu.php</code>) préfigurent l'anatomie isolatrice de nos composants React réutilisables.</p>
                  </div>
                </div>
              </div>

              {/* Point 10 Layout (Impact pour le Back-end) */}
              <div className={style.card}>
                <h3 className={style.title}>
                  <Database className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>10. L'Impact pour le Back-End</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-2">
                  {points.p10.text} {points.p10.details}
                </p>

                <div className="p-3.5 bg-emerald-950/10 border border-emerald-500/20 rounded-lg space-y-2 mt-4 text-xs">
                  <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                    ⚡ Exemple d'automatisation d'images (PHP Rétro) :
                  </span>
                  <p className="text-[11px] text-gray-300 mb-1 leading-snug">
                    Grâce à des dossiers standardisés d'images, le développeur PHP boucle pour auto-générer les vignettes du site sans manipulations manuelles repetitives :
                  </p>
                  <pre className="bg-[#050505] p-2 border border-emerald-500/10 text-[10px] font-mono text-emerald-400 rounded-lg leading-tight select-all">
{`<?php
// Parcourir séquentiellement le dossier standard
$images = glob("img/photos/*.jpg");
foreach ($images as $img) {
    echo "<div class='produit'>";
    echo "  <img src='\${img}' />";
    echo "</div>";
}
?>`}
                  </pre>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
