/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlossaryTag } from '../types';

export const glossaryTags: GlossaryTag[] = [
  {
    tag: 'a',
    version: 'html1',
    category: 'structure',
    description: 'Définit une ancre pour créer des hyperliens liant des pages entre elles. C\'est l\'essence même du Web Hypertexte.',
    codeSnippet: '<a href="https://www.w3.org" target="_blank">Visiter le W3C</a>',
    hasClosingTag: true,
    attributes: [
      { name: 'href', description: 'Adresse URL de destination du lien.', isDeprecated: false },
      { name: 'target', description: 'Indique où ouvrir le lien (_blank pour nouvel onglet).', isDeprecated: false },
      { name: 'rel', description: 'Relation sémantique du lien (ex: nofollow, noreferrer).', isDeprecated: false }
    ],
    retroTip: 'Dans les années 1990, sans feuilles de style CSS, l\'attribut color (via la balise <body link="...">) gérait globalement la couleur de tous les liens.'
  },
  {
    tag: 'img',
    version: 'html2',
    category: 'media',
    description: 'Insère une image autonome dans la page. Introduite par Mosaic dans le but d\'agrémenter l\'expérience graphique.',
    codeSnippet: '<img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300" alt="Code informatique sur un écran" border="1" />',
    hasClosingTag: false,
    attributes: [
      { name: 'src', description: 'Adresse de l\'image à charger.', isDeprecated: false },
      { name: 'alt', description: 'Texte alternatif requis pour l\'accessibilité si l\'image échoue.', isDeprecated: false },
      { name: 'width / height', description: 'Dimensions forcées en pixels ou pourcentages.', isDeprecated: false },
      { name: 'border', description: 'Épaisseur de la bordure entourant l\'image (souvent bleue si c\'est un lien).', isDeprecated: true }
    ],
    retroTip: 'Avant le haut débit, il était coutume d\'utiliser l\'attribut "lowsrc" pour charger une image pixelisée très légère avant de charger l\'image finale de haute qualité.'
  },
  {
    tag: 'table',
    version: 'html3',
    category: 'structure',
    description: 'Définit un tableau à deux dimensions. Détourné au forceps pendant 10 ans pour accomplir les mises en page multi-colonnes des sites.',
    codeSnippet: `<table border="1" cellpadding="5" cellspacing="2" width="100%">
  <tr>
    <th bgcolor="#c0c0c0">Produit</th>
    <th bgcolor="#c0c0c0">Prix</th>
  </tr>
  <tr>
    <td>Modem 56k USRobotics</td>
    <td>499 FRF</td>
  </tr>
</table>`,
    hasClosingTag: true,
    attributes: [
      { name: 'border', description: 'Épaisseur de la bordure de démarcation extérieure.', isDeprecated: true },
      { name: 'cellpadding', description: 'Marge intérieure des cellules.', isDeprecated: true },
      { name: 'cellspacing', description: 'Distance d\'espacement séparant les cellules.', isDeprecated: true },
      { name: 'width', description: 'Largeur du tableau (durcie en pixels ou pourcentages).', isDeprecated: true }
    ],
    retroTip: 'Pour masquer l\'ossature, on écrivait <table border="0" cellpadding="0" cellspacing="0">. C\'était l\'unique moyen de fixer deux colonnes de texte l\'une à côté de l\'autre !'
  },
  {
    tag: 'marquee',
    version: 'html3',
    category: 'deprecated',
    description: 'Fait défiler du texte ou des images horizontalement ou verticalement de manière infinie. Balise propriétaire ajoutée par Internet Explorer.',
    codeSnippet: '<marquee direction="left" scrollamount="5" bgcolor="#ffff00" style="color: black; font-weight: bold;">📣 FLASH INFO : Sortie d\'Internet Explorer 4.0 !</marquee>',
    hasClosingTag: true,
    attributes: [
      { name: 'direction', description: 'Le sens du défilement (left, right, up, down).', isDeprecated: true },
      { name: 'scrollamount', description: 'Vitesse de défilement (pixels par saut).', isDeprecated: true },
      { name: 'behavior', description: 'Type de mouvement : scroll (infini), slide (s\'arrête à la fin), alternate.', isDeprecated: true }
    ],
    retroTip: 'Cette balise n\'a jamais fait partie des standards du W3C bien qu\'elle ait été implémentée par Firefox pour compatibilité historique. Elle fatigue grandement la lecture et nuit à l\'accessibilité.'
  },
  {
    tag: 'blink',
    version: 'html2',
    category: 'deprecated',
    description: 'Provoque le clignotement répétitif infini du texte qu\'elle renferme. Balise propriétaire emblématique inventée par Netscape.',
    codeSnippet: '<blink><span style="color: red; font-weight: bold;">🔥 ATTENTION - BUG DE L\'AN 2000 PROCHE ! 🔥</span></blink>',
    hasClosingTag: true,
    attributes: [],
    retroTip: 'Nostalgie pure et bête noire des ergonomes ! Elle fut désactivée progressivement par tous les navigateurs modernes au milieu des années 2010.'
  },
  {
    tag: 'form',
    version: 'html2',
    category: 'forms',
    description: 'Définit une section interactive de saisie de données pour envoyer des renseignements au serveur.',
    codeSnippet: `<form action="/mon-script.php" method="GET">
  <label for="search">Recherche :</label>
  <input type="text" id="search" name="q" placeholder="Rechercher sur Yahoo...">
  <button type="submit">Lancer</button>
</form>`,
    hasClosingTag: true,
    attributes: [
      { name: 'action', description: 'L\'URI de traitement des données côté serveur.', isDeprecated: false },
      { name: 'method', description: 'Méthode HTTP d\'envoi (GET transmet dans l\'URL, POST masque les données).', isDeprecated: false },
      { name: 'enctype', description: 'Type d\'encodage, indispensable pour uploader des fichiers (multipart/form-data).', isDeprecated: false }
    ],
    retroTip: 'Avant le JavaScript asynchrone (AJAX), la soumission d\'un formulaire rechargeait obligatoirement la page entière. On validait son formulaire et on "attendait" le rechargement...'
  },
  {
    tag: 'canvas',
    version: 'html5',
    category: 'media',
    description: 'Définit une zone de dessin dynamique et scriptable en pixel via JavaScript (utilisée pour des graphiques, animations interactives ou jeux).',
    codeSnippet: `<canvas id="monCanvas" width="200" height="100" style="border:1px solid #000000;">
  Votre navigateur ne gère pas le canvas natif.
</canvas>`,
    hasClosingTag: true,
    attributes: [
      { name: 'width', description: 'Largeur intrinsèque de la surface.', isDeprecated: false },
      { name: 'height', description: 'Hauteur intrinsèque de la surface.', isDeprecated: false }
    ],
    retroTip: 'L\'introduction de <canvas> a permis d\'enterrer les jeux Shockwave Flash en permettant un rendu 2D/3D dynamique haute fidélité natif, contrôlé par code JS.'
  },
  {
    tag: 'video',
    version: 'html5',
    category: 'media',
    description: 'Permet de diffuser et de contrôler nativement de la vidéo dans le document sans nécessiter l\'installation pénible de greffons tierce-partie.',
    codeSnippet: `<video controls width="250">
  <source src="/media/cc-retro.mp4" type="video/mp4">
  Lecteur non supporté
</video>`,
    hasClosingTag: true,
    attributes: [
      { name: 'controls', description: 'Affiche l\'interface de lecture (Play, Volume, Barre de progression).', isDeprecated: false },
      { name: 'autoplay', description: 'Démarre la vidéo dès la fin du chargement.', isDeprecated: false },
      { name: 'muted', description: 'Coupe le son d\'usine (requis pour l\'autoplay dans la plupart des navigateurs modernes).', isDeprecated: false },
      { name: 'poster', description: 'Image placeholder affichée avant le clic de lecture.', isDeprecated: false }
    ],
    retroTip: 'Avant HTML5, regarder des vidéos nécessitait d\'installer Adobe Flash Player ou RealPlayer, qui plantaient souvent Windows et accumulaient les failles de sécurité.'
  },
  {
    tag: 'iframe',
    version: 'html4',
    category: 'structure',
    description: 'Incruste une seconde page web autonome entière au sein de la page courante.',
    codeSnippet: '<iframe src="https://example.com" width="100%" height="200" frameborder="0"></iframe>',
    hasClosingTag: true,
    attributes: [
      { name: 'src', description: 'La cible de la ressource extérieure à afficher.', isDeprecated: false },
      { name: 'frameborder', description: 'Active ou non la bordure biseautée par défaut autour de la boîte.', isDeprecated: true },
      { name: 'sandbox', description: 'Restreint les scripts et les formulaires de l\'iframe pour renforcer la sécurité.', isDeprecated: false }
    ],
    retroTip: 'Les "framesets" et "iframes" étaient très utilisés au tournant de l\'an 2000 pour conserver fixe la barre de lecture audio MP3 d\'un site tandis que les pages de contenu s\'actualisaient à côté.'
  },
  {
    tag: 'script',
    version: 'html2',
    category: 'script',
    description: 'Intègre ou référence des instructions logiques exécutables (JavaScript, historiquement VBScript/JScript).',
    codeSnippet: `<script type="text/javascript">
  console.log("Bonjour l'Histoire du Web !");
</script>`,
    hasClosingTag: true,
    attributes: [
      { name: 'src', description: 'Chemin du script externe à exécuter.', isDeprecated: false },
      { name: 'type', description: 'Indique le langage (ex: text/javascript, module, ou historiquement text/vbscript).', isDeprecated: false },
      { name: 'async / defer', description: 'Charge et exécute de manière non bloquante vis-à-vis du parseur HTML.', isDeprecated: false }
    ],
    retroTip: 'Pour masquer le code JavaScript aux très vieux navigateurs incapables de le lire (qui l\'affichaient directement au milieu de la mise en page), on encapsulait le code à l\'intérieur de commentaires HTML : <!-- code... // -->'
  }
];
