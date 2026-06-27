/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  FileCode2, 
  Code2, 
  Terminal, 
  Zap, 
  Flame, 
  Globe2, 
  ShieldCheck, 
  Workflow,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface ModernTechViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface ModernTech {
  id: string;
  name: string;
  category: 'Framework' | 'Language' | 'Runtime' | 'Backend' | 'Styling' | 'Format' | 'API' | 'Tool' | 'Platform' | 'A11y';
  badgeStyle: string;
  logo: string;
  whyItRules: string;
  descentText: string;
  modernSnippetTitle: string;
  modernSnippet: string;
  ecosystem: string[];
}

export default function ModernTechView({ theme }: ModernTechViewProps) {
  const [activeTechId, setActiveTechId] = useState<string>('typescript');
  const [activeEditorTab, setActiveEditorTab] = useState<'all' | 'npp' | 'sublime' | 'vim' | 'vscode' | 'antigravity'>('all');

  const techs: ModernTech[] = [
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Language',
      badgeStyle: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
      logo: '🟦',
      whyItRules: 'TypeScript a civilisé le écosystème JavaScript. En superposant un système de types statiques strict compilé en JS brut, il offre aux éditeurs modernes (VS Code) une autocomplétion absolue, un refactoring sans peur et un typage solide empêchant les bugs d\'exécution bêtes (type undefined is not a function).',
      descentText: 'JavaScript originel (1995) ➔ ECMAScript 6 (2015) ➔ TypeScript (Microsoft).',
      modernSnippetTitle: 'Typage strict en action :',
      modernSnippet: `interface UserProfile {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'user';
  createdAt: Date;
}

function greetAdmin(user: UserProfile): string {
  // Le compilateur valide strictement le rôle !
  return \`Bonjour Ô grand \${user.username} !\`;
}`,
      ecosystem: ['Zod', 'TS-Node', 'Compiler Config', 'TypeScript ESLint']
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'Framework',
      badgeStyle: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
      logo: '⚛️',
      whyItRules: 'Développé d\'origine par Facebook, React a introduit le paradigme déclaratif et le flux de données unidirectionnel. Fini les sélections de sélecteurs $(selector) complexes ou les manipulations chirurgicales maladroites de l\'arbre DOM d\'époque : vous décrivez l\'état de la vue, React synchronise automatiquement l\'affichage.',
      descentText: 'Document direct ➔ Dynamic HTML (1998) ➔ jQuery (2006) ➔ React Virtual DOM (2013).',
      modernSnippetTitle: 'Composant fonctionnel avec Crochet d\'état (Hooks) :',
      modernSnippet: `import React, { useState } from 'react';

export default function Counter() {
  const [clicks, setClicks] = useState<number>(0);

  return (
    <button onClick={() => setClicks(c => c + 1)}>
      Nombre de visites : {clicks}
    </button>
  );
}`,
      ecosystem: ['Next.js', 'Vite', 'TailwindCSS', 'Redux / Zustand']
    },
    {
      id: 'symfony',
      name: 'PHP / Symfony',
      category: 'Backend',
      badgeStyle: 'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/35',
      logo: '🖤',
      whyItRules: 'PHP a mûri de manière incroyable. Symfony (conçu par le français SensioLabs) a professionnalisé PHP en y important les standards les plus stricts de la programmation orientée objet (Inversion de contrôle, Dependency Injection, conteneurs de services). Fini les scripts textuels "PHP spaghetti" d\'époque : PHP 8 est un monstre de vitesse et de rigueur typée.',
      descentText: 'PHP 3 Scripts (1997) ➔ PHP 4 OOP fragile ➔ PHP 5 ➔ PHP 8.x + Symfony (Framework Entreprise).',
      modernSnippetTitle: 'Contrôleur Symfony Typé Moderne PHP 8.3 :',
      modernSnippet: `<?php
namespace App\\Controller;

use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;

class ApiController extends AbstractController {
    #[Route('/api/v1/user/{id}', methods: ['GET'])]
    public function getUserProfile(string $id): Response {
        return $this->json(['id' => $id, 'isActive' => true]);
    }
}`,
      ecosystem: ['Doctrine ORM', 'Twig', 'Composer', 'API Platform']
    },
    {
      id: 'python',
      name: 'Python (FastAPI / Django)',
      category: 'Backend',
      badgeStyle: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      logo: '🐍',
      whyItRules: 'Python est le pilier de l\'apprentissage machine et du calcul scientifique. Pour le Web rapide, FastAPI a imposé un renouveau complet : en utilisant l\'asynchronisme natif de Python 3 et en validant la donnée via les annotations de types de Pydantic, nous écrivons des APIs performantes de manière ultra-rapide.',
      descentText: 'Python Scripting (1991) ➔ Django MVC (2005) ➔ FastAPI Async (2018).',
      modernSnippetTitle: 'API asynchrone légère avec FastAPI :',
      modernSnippet: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    # La validation pydantic est instantanée et automatique !
    return {"status": "created", "payload": item}
`,
      ecosystem: ['PyTest', 'Poetry', 'Pydantic', 'SQLAlchemy']
    },
    {
      id: 'ruby',
      name: 'Ruby on Rails',
      category: 'Framework',
      badgeStyle: 'bg-red-500/15 text-red-400 border border-red-500/30',
      logo: '💎',
      whyItRules: 'Rails est le père de l\'architecture MVC moderne et a popularisé les philosophies "Convention over Configuration" et "Don\'t Repeat Yourself" (DRY). Il a prouvé qu\'un développeur solo pouvait bâtir, migrer sa base de données et mettre en production des applications complètes en quelques heures.',
      descentText: 'Ruby Language (1995) ➔ Rails v1 (2005) ➔ Rails 8 (Modern No-Build asset pipelines).',
      modernSnippetTitle: 'Contrôleur Rails de modèle ActiveRecord (MVC) :',
      modernSnippet: `class ArticlesController < ApplicationController
  def index
    # Récupère tous les articles récents en base proprement !
    @articles = Article.where(published: true).limit(10)
    render json: @articles
  end
end`,
      ecosystem: ['ActiveRecord', 'Bundler', 'RSpec', 'Hotwire']
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Runtime',
      badgeStyle: 'bg-green-500/15 text-green-400 border border-green-500/30',
      logo: '🟢',
      whyItRules: 'Node.js a sorti JavaScript des fureteurs pour le propulser sur le serveur. Grâce à son boucle d\'événements (Event Loop) non-bloquante et asynchrone, Node.js traite des milliers de connexions réseau simultanées sur un seul fil d\'exécution (single thread) de manière hautement efficace.',
      descentText: 'Moteur V8 de Chrome (2008) ➔ Node.js (Ryan Dahl - 2009) ➔ Bun / Deno (Modern Successors).',
      modernSnippetTitle: 'Serveur HTTP natif en ES Modules :',
      modernSnippet: `import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', engine: 'NodeJS Event Loop' }));
});

server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});`,
      ecosystem: ['NPM', 'Express', 'Tsup', 'NestJS']
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      category: 'Framework',
      badgeStyle: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
      logo: '📝',
      whyItRules: 'WordPress propulse plus de 43% de l\'ensemble des sites web du monde. Initialement simple plateforme de blog en 2003, il est devenu un moteur web sans égal grâce à son architecture extensible à l\'infini par extensions (plugins) et thèmes, et à son API REST native. C\'est le roi du "No-Code pour clients" combiné à du code sur mesure si nécessaire.',
      descentText: 'B2/cafelog (2001) ➔ WordPress 1.0 (2004) ➔ Éditeur de blocs Gutenberg (2018) ➔ Full Site Editing.',
      modernSnippetTitle: 'Création d\'un Custom Post Type via du PHP moderne :',
      modernSnippet: `register_post_type('exposition', [
  'labels' => [
    'name' => __('Expositions'),
    'singular_name' => __('Exposition')
  ],
  'public' => true,
  'has_archive' => true,
  'show_in_rest' => true, // Active l\'API REST !
  'supports' => ['title', 'editor', 'thumbnail']
]);`,
      ecosystem: ['Gutenberg Blocks', 'WP-CLI', 'Advanced Custom Fields', 'WooCommerce']
    },
    {
      id: 'laravel',
      name: 'Laravel',
      category: 'Framework',
      badgeStyle: 'bg-red-500/15 text-red-400 border border-red-500/30',
      logo: '🔴',
      whyItRules: 'Laravel est le framework PHP le plus populaire au monde. Il a rendu à PHP ses lettres de noblesse en alliant de remarquables syntaxes expressives, de magnifiques abstractions élégantes (Eloquent ORM, Blade, migrations) et un écosystème commercial sans égal (Forge, Vapor, Nova) permettant de déployer à l\'échelle industrielle.',
      descentText: 'PHP brut ➔ CodeIgniter de l\'ancien temps ➔ Laravel 1 (Taylor Otwell - 2011) ➔ Laravel 11.',
      modernSnippetTitle: 'Requête Eloquent ORM élégante et relationnelle :',
      modernSnippet: `use App\\Models\\User;

// Requête typée, protégée contre les injections SQL, avec relations !
$users = User::where('is_active', true)
    ->with('posts')
    ->orderBy('created_at', 'desc')
    ->paginate(15);`,
      ecosystem: ['Eloquent ORM', 'Blade Engines', 'Artisan CLI', 'Laravel Livewire']
    },
    {
      id: 'vuejs',
      name: 'Vue.js',
      category: 'Framework',
      badgeStyle: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      logo: '💚',
      whyItRules: 'Créé par Evan You, Vue.js propose le parfait compromis entre la légèreté de React et l\'encapsulation stricte d\'Angular. Avec sa syntaxe basée sur les fichiers Single File Components (.vue), il sépare proprement HTML, JS et CSS, tout en offrant une réactivité magique et performante grâce à ses Proxies natifs.',
      descentText: 'Document manipulé par jQuery ➔ AngularJS (2010) ➔ Vue.js (2014) ➔ Composition API de Vue 3.',
      modernSnippetTitle: 'Single File Component (.vue) moderne avec Composition API <script setup> :',
      modernSnippet: `<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);
</script>

<template>
  <button @click="count++">
    Compteur : {{ count }} (Double: {{ double }})
  </button>
</template>`,
      ecosystem: ['Vite', 'Pinia Store', 'Vue Router', 'Nuxt.js']
    },
    {
      id: 'angular',
      name: 'Angular',
      category: 'Framework',
      badgeStyle: 'bg-rose-500/15 text-[#f43f5e] border border-rose-500/30',
      logo: '🅰️',
      whyItRules: 'Développé par Google, Angular est la plateforme d\'entreprise par excellence. Il repose sur TypeScript par défaut depuis le jour 1, imposant une structure stricte et modulaire avec injection de dépendance native, architecture par services hautement découplés, et une réactivité de pointe grâce aux nouveaux signaux réactifs (Signals).',
      descentText: 'HTML simple ➔ AngularJS (2010 - Déprécié) ➔ Angular 2 totalement réécrit (2016) ➔ Angular Signals (2024).',
      modernSnippetTitle: 'Composant Angular moderne avec la nouvelle syntaxe de signaux :',
      modernSnippet: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="increment()">
      Clics: {{ count() }} / Double: {{ doubleCount() }}
    </button>
  \`
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}`,
      ecosystem: ['RxJS', 'Angular CLI', 'NgRx State', 'Signals API']
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Styling',
      badgeStyle: 'bg-teal-500/15 text-teal-400 border border-teal-500/30',
      logo: '🎨',
      whyItRules: 'Tailwind CSS a révolutionné l\'écriture du style CSS en éliminant les allers-retours fatigants avec les fichiers .css séparés. En proposant des milliers de classes utilitaires atomiques à composer directement dans le HTML, il garantit un fichier de style final ultra-léger et élimine le CSS mort. Sa philosophie "utility-first" accélère l\'intégration d\'interfaces fluides et réactives.',
      descentText: 'CSS en ligne précaire ➔ CSS sémantique lourd de classes (.class) ➔ Préprocesseurs (Sass) ➔ Tailwind CSS (2017).',
      modernSnippetTitle: 'Composant stylisé sous forme atomique via Tailwind CSS :',
      modernSnippet: `<button className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-550 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  Bouton Moderne de l'Espace
</button>`,
      ecosystem: ['Tailwind CSS CLI', 'PostCSS / Vite', 'Prettier Plugin Tailwind', 'Shadcn UI']
    },
    {
      id: 'json',
      name: 'JSON',
      category: 'Format',
      badgeStyle: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      logo: '📦',
      whyItRules: 'JSON (JavaScript Object Notation) a totalement supplanté le format XML pour devenir le standard absolu de configuration et d\'échange de données légères sur la Toile. Extrêmement rapide à formater et analyser nativiseur dans n\'importe quel langage moderne, c\'est l\'épine dorsale de toutes les APIs modernes.',
      descentText: 'Texte brut délimité par des virgules (CSV) ➔ XML (Verbeux et lourd) ➔ Découverte de JSON par Douglas Crockford (2001) ➔ Standard Universel RFC 8259.',
      modernSnippetTitle: 'Payload JSON de données structurées de l\'application-musée :',
      modernSnippet: `{
  "web_museum": {
    "title": "Musée du Web Retro & Moderne",
    "visitors_count": 14000,
    "interactive": true,
    "exhibits": ["Flash", "Skype", "Torrent", "EasyPHP"]
  }
}`,
      ecosystem: ['JSON.stringify()', 'JSON.parse()', 'Zod validator', 'JSON Schema specs']
    },
    {
      id: 'apirest',
      name: 'API REST',
      category: 'API',
      badgeStyle: 'bg-violet-500/15 text-violet-400 border border-violet-500/30',
      logo: '🔌',
      whyItRules: 'L\'architecture REST (Representational State Transfer) fournit une structure de communication simplifiée et standardisée entre client et serveur en se greffant sur les méthodes du protocole HTTP (GET, POST, PUT, DELETE). Sa nature universelle et sans état (stateless) rend le développement d\'APIs robustes, prévisibles et évolutives.',
      descentText: 'Appels de procédures à distance (RPC) ➔ SOAP (Format XML ultra-lourd) ➔ Concepts REST définis par Roy Fielding (2000) ➔ APIs RESTful modernisées.',
      modernSnippetTitle: 'Appel AJAX moderne d\'accès à une ressource REST :',
      modernSnippet: `// Interroger l'état du serveur via une API REST sécurisée
fetch('/api/health')
  .then(response => {
    if (!response.ok) throw new Error('Erreur Service - Statut: ' + response.status);
    return response.json();
  })
  .then(data => console.log('État du backend récepteur :', data.status))
  .catch(error => console.error('Échec de communication REST :', error));`,
      ecosystem: ['Express.js Router', 'Postman Client', 'Swagger / OpenAPI Specs', 'Axios Client']
    },
    {
      id: 'markdown',
      name: 'Markdown',
      category: 'Language',
      badgeStyle: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
      logo: '📝',
      whyItRules: 'Markdown a offert aux rédacteurs et développeurs un balisage léger d\'une facilité déconcertante pour rédiger du texte riche sans se soucier des balises HTML complexes. Utilisé pour de la documentation (README), des articles ou de la prise de notes rapides, il est immédiatement traduisible en code HTML parfait pour navigateur web.',
      descentText: 'HTML Brut à la main ➔ Éditeurs Rich-Text WYSIWYG complexes ➔ Création par John Gruber et Aaron Swartz (2004) ➔ GFM (GitHub Flavored).',
      modernSnippetTitle: 'Syntaxes légères de formatage d\'un document Markdown :',
      modernSnippet: `# Bienvenue au Musée du Web

Ce musée est **complètement** gratuit !

## Les sections interactives :
- **Chronologie historique** du Web.
- **Le Torrent & P2P** et la riposte graduée.
- **Cimetière** d'EasyPHP.

*Créé par l'équipe d'AI Coding Agent.*`,
      ecosystem: ['React Markdown', 'Marked Renderer', 'MDX Compiler', 'Frontmatter metadata']
    },
    {
      id: 'git',
      name: 'Git & Versioning',
      category: 'Tool',
      badgeStyle: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
      logo: '🔀',
      whyItRules: 'Git est la base de données temporelle infaillible indispensable à tout projet logiciel moderne. Conçu d\'origine par Linus Torvalds, il autorise des branches parallèles virtuelles ultra-légères, des fusions intelligentes sans perte et une décentralisation totale de l\'historique, permettant à de grandes équipes de co-construire une application.',
      descentText: 'Dossier de sauvegarde manuelle (.ZIP) ➔ CVS ➔ Subversion centralisé (SVN) ➔ Git décentralisé par Linus Torvalds (2005).',
      modernSnippetTitle: 'Instructions indispensables d\'usage de Git CLI :',
      modernSnippet: `# Démarrer un suivi de révision sur le projet actuel
git init
git add .
git commit -m "feat: intégrer Tailwind, JSON, API Rest et Git au Musée"

# Créer une ramification pour tester un algorithme
git checkout -b feature/nouvel-incubateur
git push origin feature/nouvel-incubateur`,
      ecosystem: ['GitHub Cloud', 'GitLab Enterprise', 'Git Hooks', 'GitHub Actions CI/CD']
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      category: 'Styling',
      badgeStyle: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
      logo: '💜',
      whyItRules: 'Bootstrap (créé par Mark Otto et Jacob Thornton chez Twitter en 2011) a été le premier framework CSS universel au monde. Il a démocratisé les grilles responsives (Grid System), l\'adaptation automatique mobile-first, et a offert des composants prêts à l\'emploi (modales, boutons, barres de navigation) qui ont sauvé des millions de développeurs du calvaire du CSS brut artisanal incompatible selon les navigateurs.',
      descentText: 'Tableaux HTML complexes ➔ CSS Floats manuels ➔ Twitter Blueprint ➔ Bootstrap v1 (2011) ➔ Bootstrap v5.3 (Sans jQuery, CSS custom properties natives).',
      modernSnippetTitle: 'Grille responsive moderne et composants natifs sans jQuery :',
      modernSnippet: `<div class="container my-5">
  <div class="row g-4 justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm border-purple-subtle bg-body-tertiary">
        <div class="card-body">
          <h5 class="card-title text-primary">Grille Bootstrap 5</h5>
          <p class="card-text">Système de grille fluide mobile-first.</p>
          <button class="btn btn-purple" data-bs-toggle="modal" data-bs-target="#modalInfos">
            Explorer les archives
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`,
      ecosystem: ['NPM & Sass', 'Sass Customizing', 'Bootstrap Icons', 'Bootswatch themes']
    },
    {
      id: 'pwa',
      name: 'PWA (Progressive Web Apps)',
      category: 'Platform',
      badgeStyle: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      logo: '📱',
      whyItRules: 'Les Progressive Web Apps (PWA) révolutionnent le Web mobile en comblant le fossé entre sites traditionnels et applications natives. Grâce à l\'utilisation intelligente des Service Workers (qui agissent comme des proxys réseau locaux en arrière-plan) et du fichier Web Manifest, une PWA offre une navigation hors-ligne complète, des notifications push en temps réel, un chargement instantané grâce au cache applicatif agressif, et une installation directe sur l\'écran d\'accueil sans passer par les lourdeurs des App Stores de Google et Apple.',
      descentText: 'Sites web mobiles lents ➔ WebViews hybrides rigides (PhoneGap/Cordova) ➔ Service Workers (2015) ➔ Standard Progressive Web Apps.',
      modernSnippetTitle: 'Enregistrement d\'un Service Worker et gestion du cache hors-ligne :',
      modernSnippet: `// Dans votre fichier d'entrée principal (main.js)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker enregistré ! Scope:', registration.scope))
      .catch(error => console.error('Échec d\\\'enregistrement du Service Worker:', error));
  });
}

// sw.js : Intercepter les requêtes réseau et servir depuis le cache hors-ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Retourne la ressource en cache ou effectue la requête réseau
        return cachedResponse || fetch(event.request);
      })
  );
});`,
      ecosystem: ['Web App Manifest', 'Workbox Library', 'Push API & Notifications', 'Cache Storage API']
    },
    {
      id: 'a11y',
      name: 'Web Accessibilité (A11y)',
      category: 'A11y',
      badgeStyle: 'bg-violet-500/15 text-violet-400 border border-violet-500/30',
      logo: '♿',
      whyItRules: 'L\'accessibilité du Web garantit que la Toile reste accessible à tous, y compris aux personnes en situation de handicap (moteur, visuel, auditif ou cognitif). Elle retrace l\'histoire de la transition des lecteurs d\'écran précoces (JAWS, NVDA) et du "HTML tag-soup" chaotique des années 90 vers un HTML sémantique strict et structuré, normalisé par les standards d\'accessibilité WCAG (Web Content Accessibility Guidelines) du W3C. La sémantique native permet de faire l\'économie de dizaines de hacks de script complexes et d\'assurer une navigation vocale sans faille.',
      descentText: 'Tag-soup HTML ➔ HTML5 sémantique strict ➔ Attributs WAI-ARIA ➔ Recommandations internationales WCAG 2.2',
      modernSnippetTitle: 'Exemple de marquage sémantique moderne avec rôles d\'importance :',
      modernSnippet: `<article aria-labelledby="guide-title">
  <header>
    <span className="text-[10px] uppercase font-mono tracking-wider">A11y Standards</span>
    <h1 id="guide-title" className="text-xl font-extrabold text-indigo-400">Pourquoi le sémantique gouverne</h1>
  </header>
  
  <p className="mt-3 text-slate-350 leading-relaxed text-xs">
    Plutôt que d\'utiliser des balises <div className="bold"> génériques dénuées de sens, le HTML5 sémantique permet aux lecteurs d\'écrans (comme NVDA, JAWS ou VoiceOver) de comprendre instantanément l\'architecture logique de la page.
  </p>

  <footer className="mt-4 flex gap-2">
    <button aria-label="Aimer cet article éducatif" className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded text-xs">
      ♥ J'aime
    </button>
  </footer>
</article>`,
      ecosystem: ['Normes WCAG 2.2', 'WAI-ARIA specifications', 'Lecteurs d\'écran (NVDA / JAWS / VoiceOver)', 'Audits automatisés (Lighthouse / Axe-core)']
    },
    {
      id: 'modern_editors',
      name: 'Éditeurs Modernes (VS Code, PhpStorm, Antigravity...)',
      category: 'Tool',
      badgeStyle: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      logo: '💻',
      whyItRules: 'Fini le code tabulaire généré en cachette ! Les éditeurs contemporains comme VS Code (Microsoft), PhpStorm/WebStorm (JetBrains) et l\'environnement d\'agent d\'ingénierie Antigravity représentent une révolution cognitive. Ils s\'appuient sur l\'analyse statique de l\'arbre de syntaxe abstraite (AST) pour offrir de l\'autocomplétion absolue (IntelliSense), du refactoring sécurisé et la détection d\'erreurs en direct. L\'agent Antigravity introduit la programmation assistée par IA autonome, traduisant vos instructions en français directement en code robuste rédigé de façon chirurgicale sur de grands projets complets.',
      descentText: 'Bloc-notes d\'époque ➔ Dreamweaver / FrontPage WYSIWYG ➔ Sublime Text (25ms startup) ➔ VS Code (2015) ➔ Agentic IDE Spaces (Antigravity, 2026).',
      modernSnippetTitle: 'Exemple d\'orchestration d\'agent IA (Antigravity SDK) :',
      modernSnippet: `// Exemple de compilation pilotée par agent pour migrer d'anciennes structures
import { AntigravityAgent } from '@antigravity/sdk';

const agent = new AntigravityAgent({
  workspace: './src/components',
  temperature: 0.1
});

// L'agent analyse le code et applique les correctifs
await agent.executeTask({
  task: "Remplacer les spacer.gifs de Dreamweaver par des espaces Tailwind CSS gap-4",
  autoBuild: true,
  runLinter: true
});`,
      ecosystem: ['VS Code Extensions', 'PhpStorm AST Inspections', 'Antigravity Workspace Engine', 'ESLint & Prettier Formatters']
    }
  ];

  const activeTech = techs.find(t => t.id === activeTechId) || techs[0];

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActive: 'bg-[#000080] text-white font-bold p-3 border border-white text-left w-full text-xs rounded-none flex items-center justify-between',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white p-3 text-left w-full text-xs cursor-pointer hover:bg-[#d4d0c8] rounded-none flex items-center justify-between',
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-indigo-600/15 border-indigo-500/50 text-indigo-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
        };
    }
  };

  const css = getThemeClass();

  return (
    <div className="space-y-6" id="modern-tech-root">
      
      {/* Intro Banner */}
      <div className={`${theme === 'ie6' ? 'bg-[#000080] text-white p-2 border-b border-white' : theme === 'terminal' ? 'bg-[#ffb000]/10 border border-[#ffb000]/40 text-[#ffb000] p-2' : 'bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-slate-750 p-4 rounded-xl'} flex justify-between items-center text-xs flex-wrap gap-2`}>
        <div className="flex items-center gap-2 text-left">
          <Workflow className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Les Technologies d'Aujourd'hui &amp; Écosystèmes Actuels</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Explorez les paradigmes, syntaxes et frameworks piliers qui font tourner le Web à l'ère moderne.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Tech Grid List (4 columns) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            🎯 Sélectionner un environnement :
          </span>
          <div className="flex flex-col gap-2">
            {techs.map((tech) => {
              const isActive = tech.id === activeTechId;
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveTechId(tech.id)}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-tech-${tech.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-lg shrink-0 select-none">{tech.logo}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{tech.name}</b>
                      <span className="text-[9px] opacity-70 font-mono tracking-wide block">
                        Catégorie : {tech.category}
                      </span>
                    </div>
                  </div>
                  <Zap className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3 bg-slate-950/20 border border-slate-850/60 text-[10px] text-slate-450 leading-relaxed text-left">
            <h5 className="font-extrabold uppercase flex items-center gap-1 text-slate-350 text-[9px] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Sceau du Web Actuel
            </h5>
            Toutes ces technologies intègrent désormais les concepts de compilation d'arrière-plan, de gestion de dépendances et de cycles de vie automatisés.
          </div>
        </div>

        {/* Right Column: Detailed Exhibit Sheet & Code Source (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className={css.card}>
            
            {/* Title card area */}
            <div className="flex justify-between items-center border-b border-slate-800/40 pb-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeTech.logo}</span>
                <h3 className="text-sm font-bold text-slate-100">{activeTech.name}</h3>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${activeTech.badgeStyle}`}>
                {activeTech.category}
              </span>
            </div>

            {/* Exposition sheet */}
            <div className={css.innerCard}>
              
              <div className="space-y-1 text-left text-xs">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                  ⚡ Pourquoi cette technologie gouverne le Web actuel :
                </span>
                <p className="leading-relaxed text-slate-200">
                  {activeTech.whyItRules}
                </p>
              </div>

              {/* Descent progression line */}
              <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg text-left text-xs space-y-1 select-none">
                <strong className="block text-[9px] font-mono text-amber-500 uppercase tracking-wider">🌟 Hérédité &amp; Ligne de descente historique :</strong>
                <p className="font-mono text-[10.5px] text-slate-300 flex items-center gap-1.5 flex-wrap">
                  {activeTech.descentText}
                </p>
              </div>

              {/* Ecosystem items */}
              <div className="text-left text-xs space-y-1.5 pt-1">
                <span className="text-[10px] font-mono font-bold text-[#a3a8ff] uppercase block">
                  🛠️ Écosystème, outils &amp; compagnons de confiance :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTech.ecosystem.map((eco, ecoIdx) => (
                    <span 
                      key={ecoIdx} 
                      className="text-[9.5px] font-mono bg-indigo-950/20 text-[#a3afee] border border-indigo-500/20 px-2 py-0.5 rounded"
                    >
                      {eco}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {activeTech.id === 'modern_editors' && (
              <div className="space-y-5 mt-4 pt-4 border-t border-slate-800/60 text-left">
                
                {/* Interactive Sub-menu */}
                <div className="flex flex-wrap gap-2 pb-1 bg-slate-950/25 p-2 rounded-xl border border-slate-800/40">
                  <button
                    onClick={() => setActiveEditorTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'all'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    📊 Comparatif Général
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('npp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'npp'
                        ? 'bg-emerald-650 text-white shadow-md shadow-emerald-650/20'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    🦎 Notepad++ (Note++)
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('sublime')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'sublime'
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-orange-400 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    📝 Sublime Text
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('vim')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'vim'
                        ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-green-400 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    💚 Vim / Neovim
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('vscode')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'vscode'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-blue-400 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    🟦 VS Code (Microsoft)
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('antigravity')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeEditorTab === 'antigravity'
                        ? 'bg-indigo-950 text-indigo-400 border border-indigo-500/30'
                        : theme === 'ie6'
                        ? 'bg-[#c0c0c0] text-black border border-white'
                        : 'bg-slate-900/60 text-slate-400 hover:text-indigo-300 hover:bg-slate-900 border border-slate-800/70'
                    }`}
                  >
                    🌌 Antigravity IDE
                  </button>
                </div>

                {/* Sub-tab 1: All Editors & Comparison */}
                {activeEditorTab === 'all' && (
                  <div className="space-y-4">
                    {/* Notepad++ Spotlight miniature */}
                    <div className={`p-4 rounded-xl border ${
                      theme === 'ie6' 
                        ? 'bg-[#d4d0c8] border-inset border-white text-black' 
                        : theme === 'terminal'
                        ? 'bg-black border-[#ffb000]/40 text-[#ffb000]'
                        : 'bg-gradient-to-r from-emerald-950/15 to-[#0b0c10] border-emerald-555/20'
                    }`}>
                      <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide block mb-1">
                        💚 Le Monument de la Légèreté : Notepad++ (Don Ho, 2003)
                      </span>
                      <div className="flex flex-col sm:flex-row items-start gap-4 text-xs">
                        <span className="text-3xl select-none shrink-0" role="img" aria-label="Notepad++ logo">🦎</span>
                        <div className="space-y-1.5 leading-relaxed">
                          <p className={theme === 'ie6' ? 'text-black text-[11.5px]' : 'text-slate-200 text-[11.5px]'}>
                            S'il y a bien un éditeur de texte qui mérite le respect des développeurs et artisans du web, c'est <strong>Notepad++</strong> (communément appelé <strong>Note++</strong> par ses fidèles). 
                            Développé bénévolement en <strong>C++ pur</strong> par le programmeur français <strong>Don Ho</strong>, Notepad++ représente une prouesse d'optimisation matérielle. Il s'appuie directement sur l'API Win32 pure native et la bibliothèque Scintilla, lui permettant de se lancer en moins de 100 millisecondes et d'ouvrir des fichiers gigantesques de several gigadiagonales là où ses rivaux modernes s'engluent.
                          </p>
                          <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px] font-sans">
                            <li>
                              <strong className="text-slate-200 font-bold">Sobriété énergétique absolue :</strong> Moins de 10 Mo de mémoire vive consommés au repos (à comparer aux 600 Mo requis par n'importe quel éditeur bâti sur Chromium/Electron).
                            </li>
                            <li>
                              <strong className="text-slate-200 font-bold">Sauvegarde fantôme indestructible :</strong> Ses onglets gardent en cache locale temporaire vos brouillons de code non enregistrés. Une coupure de courant ou une mise à jour Windows forcée ? Votre travail n'est jamais perdu au démarrage.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Comparative Table */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 block uppercase tracking-wider">
                        📊 Le Grand Comparatif des Éditeurs : De l'Époque à l'Autonomie IA
                      </span>
                      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
                        <table className={`w-full text-[11px] text-left border-collapse ${
                          theme === 'ie6' 
                            ? 'border-2 border-white text-black bg-[#d4d0c8]' 
                            : theme === 'terminal'
                            ? 'border border-[#ffb000] text-[#ffb000]'
                            : 'border border-slate-800 text-slate-300 bg-slate-950/40'
                        }`}>
                          <thead>
                            <tr className={
                              theme === 'ie6' 
                                ? 'bg-[#000080] text-white border-b-2 border-white' 
                                : theme === 'terminal'
                                ? 'bg-[#ffb000]/15 border-b border-[#ffb000]'
                                : 'bg-indigo-950/30 border-b border-slate-800'
                            }>
                              <th className="p-2 border-r border-[#2d3748]/30">Éditeur</th>
                              <th className="p-2 border-r border-[#2d3748]/30">Philosophie &amp; Moteur</th>
                              <th className="p-2 border-r border-[#2d3748]/30 text-center">Vitesse &amp; RAM</th>
                              <th className="p-2 border-r border-[#2d3748]/30 text-center font-mono">IA / Autocomplete</th>
                              <th className="p-2">Point Fort Exceptionnel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={`border-b ${theme === 'ie6' ? 'border-white bg-[#ece9d8]' : 'border-slate-850/80'}`}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold">🦎 Notepad++ (Note++)</td>
                              <td className="p-2 border-r border-[#2d3748]/20">Éditeur système ultra-rapide. Écrit en C++ natif pur.</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-emerald-400">⚡⚡⚡⚡⚡ <br/>(&lt;15 Mo RAM)</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center text-slate-500">Syntaxes colorées de base</td>
                              <td className="p-2 text-slate-350 text-[10.5px]">Se lance instantanément, pèse 5 Mo sur disque, indestructible face aux crashs.</td>
                            </tr>
                            <tr className={`border-b ${theme === 'ie6' ? 'border-white' : 'border-slate-850/80 bg-slate-900/5'}`}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold">📝 Sublime Text</td>
                              <td className="p-2 border-r border-[#2d3748]/20">Esthétisme épuré &amp; réactivité. Écrit en C++ &amp; Python.</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-emerald-450">⚡⚡⚡⚡ <br/>(50 Mo RAM)</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center text-slate-405">Autocomplete locale rapide</td>
                              <td className="p-2 text-slate-350 text-[10.5px]">Curseurs multiples ultra-fluides, mini-carte latérale révolutionnaire.</td>
                            </tr>
                            <tr className={`border-b ${theme === 'ie6' ? 'border-white bg-[#ece9d8]' : 'border-slate-850/80'}`}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold">💚 Vim / Neovim</td>
                              <td className="p-2 border-r border-[#2d3748]/20">Éditeur modal terminal légendaire. Configurable à l'infini (Lua/Vimscript).</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-emerald-400">⚡⚡⚡⚡⚡ <br/>(&lt;10 Mo RAM)</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center text-slate-300 font-semibold text-cyan-400">⚡⚡⚡ <br/>(LSP / Treesitter)</td>
                              <td className="p-2 text-slate-350 text-[10.5px]">Zéro souris. Efficacité ergonomique absolue pour le développement sur serveurs distants.</td>
                            </tr>
                            <tr className={`border-b ${theme === 'ie6' ? 'border-white' : 'border-slate-850/80'}`}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold">🟦 VS Code</td>
                              <td className="p-2 border-r border-[#2d3748]/20">Hub extensible géant. Chrome/Electron + Node.js.</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-yellow-555">⚡⚡ <br/>(400 Mo+ RAM)</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-semibold text-cyan-400">⚡⚡⚡⚡ <br/>(Copilot / LSP)</td>
                              <td className="p-2 text-slate-350 text-[10.5px]">Catalogue d'extensions sans limite, déboguage universel intégré. Le standard incontesté.</td>
                            </tr>
                            <tr className={`border-b ${theme === 'ie6' ? 'border-white' : 'border-slate-850/80 bg-slate-900/5'}`}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold">🐘 PhpStorm / IntelliJ</td>
                              <td className="p-2 border-r border-[#2d3748]/20">IDE lourd d'entreprise. Écrit en Java (JetBrains).</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-rose-500">⚡ <br/>(1,5 Go+ RAM)</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-bold text-emerald-400">⚡⚡⚡⚡⚡ <br/>(AST contextuel)</td>
                              <td className="p-2 text-slate-350 text-[10.5px]">Refactoring automatique infaillible, détection sémantique profonde du PHP/SQL.</td>
                            </tr>
                            <tr className={theme === 'ie6' ? 'bg-[#ece9d8]' : 'bg-indigo-955/20'}>
                              <td className="p-2 border-r border-[#2d3748]/20 font-bold text-[#a0a5ff]">🌌 Antigravity IDE</td>
                              <td className="p-2 border-r border-[#2d3748]/20">Espace de programmation piloté par Agent AI autonome.</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center text-slate-400">Multi-thread Cloud</td>
                              <td className="p-2 border-r border-[#2d3748]/20 text-center font-black text-amber-400">🧠🧠🧠🧠🧠 <br/>(Décisions autonomes)</td>
                              <td className="p-2 text-indigo-250 text-[10.5px]">Comprend vos consignes vocales/textuelles, écrit le code multi-fichiers et s'auto-corrige.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Notepad++ In depth */}
                {activeEditorTab === 'npp' && (
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'ie6' ? 'bg-white text-black border-2 border-black' : 'bg-slate-900/40 border-slate-800'
                  } space-y-4`}>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🦎</span>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-emerald-400">Notepad++ — L'Inflexible Champion du C++</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Lancé en novembre 2003 par Don Ho • Licence Libre GPL</p>
                      </div>
                    </div>

                    <div className="text-[11.5px] leading-relaxed space-y-3 text-slate-300">
                      <p>
                        Créé par un développeur français frustré par la lourdeur phénoménale des IDE basés sur Java à son bureau, <strong>Notepad++</strong> a été optimisé chirurgicalement de A à Z. Écrit en <strong>C++ natif pur</strong>, il dialogue directement avec les API Win32 de Windows, sans runtimes complexes, conteneurs virtuels, ou interpréteurs web interposés (comme Node/V8).
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-3.5 bg-emerald-950/10 border border-emerald-500/10 rounded-xl space-y-1">
                          <strong className="text-emerald-400 text-xs font-bold block">⚡ Rôle &amp; Philosophie Technique :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-350">
                            Sa vocation est la légèreté absolue et l'économie d'énergie. Il peut s'exécuter confortablement sur des micro-ordinateurs de l'an 2000 avec seulement 16 Mo de mémoire vive ou être transporté sur une clé USB de secours (mode portable natif).
                          </p>
                        </div>
                        <div className="p-3.5 bg-slate-950/30 border border-slate-850 rounded-xl space-y-1">
                          <strong className="text-slate-200 text-xs font-bold block">🔒 Résilience Industrielle :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-350">
                            Grâce à son système étanche de clichés temporaires en cache physique directe, ses onglets gardent en mémoire votre code même en cas d'extinction électrique brutale du système de développement.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="font-semibold text-slate-200">🛠️ Pourquoi les artisans du web l'utilisent toujours aujourd'hui :</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-400 text-[11px]">
                          <li>
                            <strong className="text-slate-300">Recherche Regex Instantanée :</strong> Capacité à chercher et remplacer des modèles syntaxiques complexes à travers des répertoires de milliers de fichiers de code locaux en moins de 3 secondes.
                          </li>
                          <li>
                            <strong className="text-slate-300">Traitement de fichiers géants :</strong> Il ouvre des fichiers logs de base de données de 4 gigas sans broncher, là où VS Code provoque un "Out of Memory" du thread Electron.
                          </li>
                          <li>
                            <strong className="text-slate-300">Dépendance Zéro :</strong> Pas besoin d'accès à Internet, d'installation d'outils Node, ou de téléchargement d'extensions de 200 Mo pour inspecter un script.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 3: VS Code In depth */}
                {activeEditorTab === 'vscode' && (
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'ie6' ? 'bg-white text-black border-2 border-black' : 'bg-slate-900/40 border-slate-800'
                  } space-y-4`}>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🟦</span>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-blue-400">VS Code — L'Écosystème aux Cent Mille Extensions</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Lancé en 2015 par Microsoft • Développé sur Electron &amp; TS</p>
                      </div>
                    </div>

                    <div className="text-[11.5px] leading-relaxed space-y-3 text-slate-300">
                      <p>
                        Conçu sous la direction d'Erich Gamma (le célèbre auteur des Design Patterns originels en programmation), <strong>Visual Studio Code (VS Code)</strong> a profondément redéfini la façon dont les éditeurs modernes s'interfacent avec les compilateurs et systèmes d'exploitation.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-3.5 bg-blue-950/10 border border-blue-500/10 rounded-xl space-y-1">
                          <strong className="text-blue-400 text-xs font-bold block">🌐 L'Architecture Electron :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-350">
                            Bâti au-dessus de Chromium (le moteur de Google Chrome) et de Node.js. Bien qu'il consomme beaucoup plus de mémoire vive (souvent 400 à 1200 Mo de RAM), il permet aux développeurs de styliser l'éditeur avec des thèmes CSS riches et des interfaces interactives spectaculaires.
                          </p>
                        </div>
                        <div className="p-3.5 bg-slate-950/30 border border-slate-850 rounded-xl space-y-1">
                          <strong className="text-slate-200 text-xs font-bold block">⚡ Le Secret : Protocole LSP :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-350">
                            Microsoft a inventé le <strong>Language Server Protocol (LSP)</strong>. Au lieu de coder l'analyse syntaxique pour chaque éditeur, le LSP déporte l'intelligence typée de TypeScript, Rust ou Python dans un processus d'arrière-plan autonome, offrant ainsi une autocomplétion parfaite.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="font-semibold text-slate-200">🏅 Pourquoi il domine sans partage :</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-400 text-[11px]">
                          <li>
                            <strong className="text-slate-300">Intégration Git &amp; Terminaux :</strong> Un terminal de commande multi-shell fluide est nativement fusionné avec l'interface graphique de suivi des branches.
                          </li>
                          <li>
                            <strong className="text-slate-300">Hub Extensible Universel :</strong> N'importe quel développeur dans le monde peut publier un plugin sémantique, un linter, ou un visualisateur de base de données d'un clic depuis la marketplace intégrée.
                          </li>
                          <li>
                            <strong className="text-slate-300">Configuration Unifiée JSON :</strong> Tous les raccourcis, préférences de formateur et variables d'environnement sont gérés via des fichiers de configuration universels.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 4: Antigravity IDE In depth */}
                {activeEditorTab === 'antigravity' && (
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'ie6' ? 'bg-white text-black border-2 border-black' : 'bg-slate-900/40 border-indigo-950'
                  } space-y-4`}>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🌌</span>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-indigo-400">Antigravity — L'Espace d'Ingénierie Agentique Autonome</h4>
                        <p className="text-[10px] text-[#a3afee] font-mono">Conçu pour l'Ère de l'Intelligence Intégrée • Multi-thread Cloud</p>
                      </div>
                    </div>

                    <div className="text-[11.5px] leading-relaxed space-y-3 text-slate-300">
                      <p>
                        L'environnement <strong>Antigravity IDE</strong> marque la rupture sémantique fondamentale de notre décennie. On ne parle plus de simple "auto-complétion" passive ou de suggestions générées de lignes isolées. L'IDE s'efface pour devenir un <strong>partenaire de génie logiciel interactif</strong>.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-3.5 bg-indigo-950/15 border border-indigo-500/15 rounded-xl space-y-1">
                          <strong className="text-indigo-455 text-xs font-bold block">🧠 Programmation Orientée Intention :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-330">
                            Le créateur dialogue en langage humain (ex : français). L'agent planifie des solutions globales multi-fichiers, crée les structures absentes, et injecte le code requis directement sans polluer l'éditeur ou briser l'architecture existante.
                          </p>
                        </div>
                        <div className="p-3.5 bg-slate-950/30 border border-slate-850 rounded-xl space-y-1">
                          <strong className="text-slate-200 text-xs font-bold block">⚙️ Boucles de Validation Intégrées :</strong>
                          <p className="text-[11px] leading-relaxed text-slate-330">
                            L'agent ne se contente pas d'écrire à l'aveuglette : il compile, analyse les rapports d'erreurs du linter TypeScript en direct et boucle intelligemment pour corriger ses propres erreurs de frappe syntaxiques avant de soumettre son travail au développeur.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="font-semibold text-slate-200">🚀 Les piliers de la modernité didactique :</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-400 text-[11px]">
                          <li>
                            <strong className="text-slate-300">Lecture Sémantique Profonde :</strong> Compréhension absolue du graphe de types, de l'arborescence des imports et des dépendances tierces sans aucune dérive mémoire locale.
                          </li>
                          <li>
                            <strong className="text-slate-300">Éradication du "Tech-Larping" :</strong> L'agent s'interdit d'insérer des informations système obsolètes en marge de page, préférant soigner le design, l'esthétique interactive et l'ergonomie.
                          </li>
                          <li>
                            <strong className="text-slate-300">Didactique Instantanée :</strong> Il explique ses choix de design de façon transparente, rationnelle et objective, agissant comme un instructeur chevronné.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Code example card */}
            <div className="space-y-1.5 text-left pt-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase tracking-wider">
                💻 {activeTech.modernSnippetTitle}
              </span>
              <pre className="bg-[#070709] border border-slate-800 font-mono text-[11px] text-slate-300 p-3.5 rounded-xl block overflow-x-auto select-all shadow-inner leading-normal">
                {activeTech.modernSnippet}
              </pre>
            </div>

            {/* Sharing feature */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Technologies d'aujourd'hui : ${activeTech.name}`}
                text={`J'ai exploré l'évolution de la technologie ${activeTech.name} sur le Musée du Web ! Découvrez comment on écrit du web moderne en 2026.`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
