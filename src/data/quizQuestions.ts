/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'En quelle année Tim Berners-Lee a-t-il rédigé la première proposition officielle du World Wide Web ?',
    options: ['1983', '1989', '1991', '1995'],
    correctAnswerIndex: 1,
    explanation: 'Tim Berners-Lee a proposé un système hypertexte d\'organisation des informations au CERN en mars 1989. Ce document marque la date de naissance conceptuelle du World Wide Web.',
    category: 'protocols',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Quelle balise propriétaire et extrêmement clignotante est restée célèbre comme le symbole du désastre ergonomique des années 90 chez Netscape ?',
    options: ['<marquee>', '<blink>', '<flash>', '<sparkle>'],
    correctAnswerIndex: 1,
    explanation: 'La balise <blink>, brevetée informellement par Netscape Navigator, faisait clignoter le texte de façon frénétique. Lassés, les ergonomes et le W3C l\'ont bannie au profit de l\'accessibilité.',
    category: 'html',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'Quel langage de script propriétaire Microsoft a-t-il promu pour Internet Explorer comme alternative à JavaScript ?',
    options: ['JScript', 'VBScript', 'ActionScript', 'AppleScript'],
    correctAnswerIndex: 1,
    explanation: 'Microsoft a développé VBScript (dérivé de Visual Basic) pour automatiser des tâches directement dans Internet Explorer. Face à un manque de portabilité (inopérant sous Netscape, Mac ou Unix), JavaScript a conquis le web.',
    category: 'js_vbs',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: 'Avant l\'invention des CSS, comment réalisait-on l\'espacement précis et les colonnes de texte complexes ?',
    options: [
      'En utilisant des marges physiques <margin>',
      'En imbriquant des balises <table> et en glissant de minuscules images GIF transparentes de 1 pixel',
      'Avec des cadres flottants <frameset>',
      'En écrivant du code Assembleur'
    ],
    correctAnswerIndex: 1,
    explanation: 'Afin d\'obtenir un positionnement précis, les webmasters imbriquaient des balises de tableaux (<table>) et utilisaient des fichiers "spacer.gif" transparents de 1x1 pixel étirés à la largeur souhaitée pour repousser les colonnes.',
    category: 'css',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'Qu\'est-ce que l\'époque des scripts "CGI" (Common Gateway Interface) des années 90 ?',
    options: [
      'Des modules de compression d\'images pour modem 56k',
      'Une technologie d\'accélération de carte graphique de jeu vidéo',
      'Un protocole standard permettant à un serveur web de déléguer l\'exécution d\'un programme externe (C, Perl) pour générer de l\'HTML',
      'Un ancêtre de l\'intelligence artificielle générative'
    ],
    correctAnswerIndex: 2,
    explanation: 'CGI (Common Gateway Interface) permettait à un serveur (comme NCSA HTTPd ou Apache) d\'appeler un binaire externe (souvent compilé en C ou un script Perl/Shell) pour écouter les données issues d\'un <form> et retourner une page web personnalisée.',
    category: 'servers_frameworks',
    difficulty: 'hard'
  },
  {
    id: 'q6',
    question: 'Pourquoi dit-on que le moteur de recherche Google Chrome a révolutionné l\'interprétation de JavaScript à sa sortie en 2008 ?',
    options: [
      'Parce qu\'il a banni JavaScript pour le remplacer par du C++',
      'Il a implémenté le moteur V8 qui compile le JavaScript directement en code machine (Just-In-Time) au lieu de simplement l\'interpréter ligne à ligne',
      'Il a rendu JavaScript compatible avec Flash',
      'Il a forcé l\'utilisation exclusive de VBScript'
    ],
    correctAnswerIndex: 1,
    explanation: 'Le moteur V8 de Google Chrome a transformé le web applicatif en traduisant le JavaScript à la volée en langage machine (compilation JIT / Just-In-Time). Les performances ont fait un bond de x10 à x50, permettant des applications complexes comme Google Maps et Google Docs.',
    category: 'browsers',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    question: 'Quel protocole moderne de transport réseau a été introduit pour remplacer TCP dans HTTP/3 pour accélérer le chargement à l\'aide d\'UDP ?',
    options: ['SPDY', 'QUIC', 'WebSocket', 'FTP'],
    correctAnswerIndex: 1,
    explanation: 'HTTP/3 utilise QUIC, un protocole basé sur UDP conçu par Google. Il élimine le problème de blocage de tête de ligne de TCP et permet des reconnexions instantanées lors du basculement entre Wi-Fi et réseau cellulaire.',
    category: 'protocols',
    difficulty: 'hard'
  },
  {
    id: 'q8',
    question: 'La transition vers HTML5 a permis d\'enterrer quel grand plugin propriétaire nécessaire auparavant pour diffuser des vidéos et jouer sur le web ?',
    options: ['Silverlight', 'Adobe Reader', 'Adobe Flash Player', 'ActiveX'],
    correctAnswerIndex: 2,
    explanation: 'L\'inclusion des balises sémantiques multimédias natives <video> et <audio>, assistées par la flexibilité du <canvas> d\'HTML5, a aboli la présence encombrante et non sécurisée d\'Adobe Flash Player.',
    category: 'html',
    difficulty: 'easy'
  },
  {
    id: 'q9',
    question: 'ASP (Active Server Pages) classique de Microsoft, d\'abord sorti en 1996, permettait d\'insérer du code serveur dans vos pages HTML. Quel langage par défaut était le plus utilisé pour l\'ASP ?',
    options: ['PHP', 'C#', 'VBScript', 'C++'],
    correctAnswerIndex: 2,
    explanation: 'ASP Classique exploitait un interpréteur côté serveur doté de moteurs ActiveX Scripting, le plus utilisé de ces moteurs étant VBScript. C\'était l\'ancêtre direct d\'ASP.NET sous Windows.',
    category: 'servers_frameworks',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    question: 'Qu\'est-ce que le test ACID2 (publié à l\'époque par le Web Standards Project) ?',
    options: [
      'Un test de performance de la vitesse de téléchargement des images',
      'Une page Web testant rigoureusement le rendu CSS des navigateurs en projetant un visage souriant jaune',
      'Un algorithme de chiffrement d\'e-commerce',
      'Le premier vaccin pour réparer les bugs d\'Internet Explorer'
    ],
    correctAnswerIndex: 1,
    explanation: 'Le projet ACID2 dessinait un visage jaune stylisé en utilisant des instructions de positionnement absolu avancées de CSS2. Il a forcé les éditeurs à respecter enfin les spécifications CSS, car le visage apparaissait complètement défiguré en cas de non-conformité.',
    category: 'browsers',
    difficulty: 'hard'
  },
  {
    id: 'q11',
    question: 'En Javascript, quelle mise à jour sémantique majeure en 2015 a permis de structurer des objets proprement avec la syntaxe class et let/const ?',
    options: ['ES3', 'ES5', 'ES6 (ECMAScript 2015)', 'ES8'],
    correctAnswerIndex: 2,
    explanation: 'ECMAScript 2015, couramment appelé ES6, a complètement modernisé le langage en introduisant des mécanismes standardisés comme les classes natives (class), la déclaration explicite de portée fine (let / const), les modules natifs et les promesses.',
    category: 'js_vbs',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    question: 'Quel framework créé par Facebook en 2013 a introduit le concept révolutionnaire de DOM virtuel pour rationaliser les réécritures complètes de pages ?',
    options: ['Angular', 'jQuery', 'React', 'Vue'],
    correctAnswerIndex: 2,
    explanation: 'Sorti en 2013, React a popularisé le DOM virtuel (Virtual DOM) et le flux unidirectionnel de données, permettant des interfaces réactives fluides en écrivant du JSX déclaratif sans manipuler directement le DOM du navigateur de manière coûteuse.',
    category: 'servers_frameworks',
    difficulty: 'medium'
  }
];
