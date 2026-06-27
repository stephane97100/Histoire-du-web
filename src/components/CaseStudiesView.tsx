/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  ArrowLeftRight, 
  Layers, 
  Laptop, 
  Layout, 
  Activity, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface CaseStudiesViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
  isLightMode?: boolean;
}

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  icon: string;
  techEraOld: string;
  techEraNew: string;
  explanation: string;
  oldCode: string;
  newCode: string;
  oldExplanation: string;
  newExplanation: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'layout',
    title: 'Mises en page et colonnes : Tableaux vs CSS Grid',
    category: 'Structure & Grilles',
    icon: '📊',
    techEraOld: 'HTML 3.2 / Nesting Tables & spacer.gif (1997)',
    techEraNew: 'HTML5 & CSS Grid Layout (Moderne)',
    explanation: 'Au début du web, le CSS n\'existait pas ou n\'était pas interprété de manière fiable. Pour créer une simple mise en page en 3 colonnes, les webmasters devaient truffer le code de balises de tableaux <table> imbriquées à outrance et d\'images transparentes d\'un pixel (les fameux "spacer.gif") calées pour ajuster les hauteurs et espacements.',
    oldCode: `<!-- Hier : Mise en page par tableaux imbriqués -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <!-- Colonne latérale de menu fixe -->
    <td width="150" bgcolor="#d4d0c8" valign="top">
      <table border="0" width="100%" cellpadding="6">
        <tr><td><font face="Arial" size="2"><b>Rubriques</b></font></td></tr>
        <tr><td><a href="#"><font face="Arial" size="2">Accueil</font></a></td></tr>
        <tr><td><a href="#"><font face="Arial" size="2">Produits</font></a></td></tr>
      </table>
      <img src="images/spacer.gif" width="150" height="1" alt="">
    </td>
    <!-- Colonne de marge invisible (spacer) pour caler -->
    <td width="20"><img src="images/spacer.gif" width="20" height="1"></td>
    <!-- Colonne de contenu principal flexible -->
    <td bgcolor="#ffffff" valign="top">
      <font face="Times New Roman" size="3">
        <h1>Bienvenue sur notre site</h1>
        <p>Le contenu principal s'étale ici sans fluidité adaptative possible.</p>
      </font>
    </td>
  </tr>
</table>`,
    newCode: `<!-- Aujourd'hui : Grille responsive native en CSS Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 max-w-5xl">
  <!-- Sidebar sémantique et élégante -->
  <aside class="col-span-1 md:col-span-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
    <nav class="flex flex-col gap-2">
      <strong class="text-xs uppercase tracking-wider text-slate-500">Navigation</strong>
      <a href="#" class="text-slate-300 hover:text-white hover:bg-slate-800 p-2 rounded-lg text-sm">Accueil</a>
      <a href="#" class="text-slate-300 hover:text-white hover:bg-slate-800 p-2 rounded-lg text-sm">Produits</a>
    </nav>
  </aside>

  <!-- Contenu Principal responsive -->
  <main class="col-span-1 md:col-span-9 bg-slate-950 p-6 rounded-xl border border-slate-850">
    <h1 class="text-2xl font-bold mb-2">Bienvenue</h1>
    <p class="text-slate-400 text-sm leading-relaxed">Les grilles s'ajustent nativellement.</p>
  </main>
</div>`,
    oldExplanation: 'Contraintes : Code extrêmement rigide, très lourd à charger, inadapté aux mobiles, et détournant les balises sémantiques de tableaux destinées uniquement à la manipulation de données brutes.',
    newExplanation: 'Bénéfices : Séparation stricte et élégante du fond (HTML) et de la forme (CSS). Le site s\'adapte d\'un seul bloc au mobile par écoute des breakpoints media-queries.'
  },
  {
    id: 'buttons',
    title: 'Boutons 3D : Slices Photoshop vs CSS3 natif',
    category: 'Design & Décorations',
    icon: '✨',
    techEraOld: 'Découpage d\'images biseautées (1999)',
    techEraNew: 'Style CSS3 & pseudo-classes de Transitions (Moderne)',
    explanation: 'Pour dessiner un bouton avec des coins arrondis et un biseau réaliste en relief sous IE5 ou Netscape, le code CSS3 border-radius n\'existait pas. Le créateur devait découper son bouton dans Photoshop en 3 tranches distinctes (gauche, centre répétable, droite), assemblées dans une micro-table HTML avec interdiction de sauts de lignes pour éviter les décalages de pixels.',
    oldCode: `<!-- Hier : Assemblage de tranches d'images découpées -->
<table border="0" cellpadding="0" cellspacing="0" height="24">
  <tr>
    <td><img src="images/btn_left_rounded.gif" width="8" height="24" border="0"></td>
    <td background="images/btn_center_gradient.gif" valign="middle" nowrap>
      <a href="#" class="btn-link">
        <font face="Arial" size="1" color="#ffffff"><b>VALIDER LA COMMANDE</b></font>
      </a>
    </td>
    <td><img src="images/btn_right_rounded.gif" width="8" height="24" border="0"></td>
  </tr>
</table>`,
    newCode: `<!-- Aujourd'hui : Un seul bouton structuré en CSS pur -->
<button class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-sans text-xs font-black px-6 py-2.5 rounded-full shadow-lg hover:shadow-indigo-500/10 active:scale-95 transition-all cursor-pointer select-none">
  VALIDER LA COMMANDE
</button>`,
    oldExplanation: 'Contraintes : Nécessitait de multiples requêtes HTTP (une par image découpée), pesait lourd en bande passante, était impossible à traduire à la volée, et interdisait tout changement dynamique de couleur.',
    newExplanation: 'Bénéfices : Code infinitésimal (zéro image requise), modification de style immédiate via CSS, support natif de la mise à l\'échelle pour les écrans Retina haute définition.'
  },
  {
    id: 'menu',
    title: 'Menus Déroulants : DHTML/Hacks CSS vs Pseudo-Sélecteurs',
    category: 'Comportements',
    icon: '📂',
    techEraOld: 'Hacks CSS d\'hover et Javascript IE (2001)',
    techEraNew: 'Sélecteurs CSS3 hover et transitions fluides (Moderne)',
    explanation: 'Créer un menu déroulant invisible par défaut qui s\'affiche lorsqu\'on passe la souris au-dessus requérait à l\'origine d\'importants scripts DHTML ou des hacks compliqués comme le célèbre sélecteur "Suckerfish" pour compenser les erreurs d\'interprétation de la balise hover dans Internet Explorer 6.',
    oldCode: `<!-- Hier : Gestion du hover en JS car IE6 ne supporte pas :hover sur les <LI> -->
<li onmouseover="this.className='hover'" onmouseout="this.className=''">
  <a href="#">Fichiers</a>
  <ul class="submenu">
    <li><a href="#">Ouvrir</a></li>
    <li><a href="#">Sauvegarder</a></li>
  </ul>
</li>`,
    newCode: `<!-- Aujourd'hui : Composants de dropdown natifs sans JS -->
<div class="relative group inline-block font-sans text-xs">
  <button class="bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer">
    Fichiers
    <span class="text-[8px] opacity-70 group-hover:rotate-180 transition-transform">▼</span>
  </button>
  
  <!-- Sous-menu s'affichant au hover du groupe -->
  <ul class="absolute top-full left-0 mt-1 hidden group-hover:block bg-slate-950 border border-slate-800 rounded-lg py-1.5 w-36 shadow-xl z-20">
    <li><button class="w-full text-left px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900/60 block">Ouvrir</button></li>
    <li><button class="w-full text-left px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900/60 block">Sauvegarder</button></li>
  </ul>
</div>`,
    oldExplanation: 'Contraintes : Forte dépendance à Javascript pour de simples comportements visuels élémentaires, ralentissements d\'affichage, et instabilité récurrente.',
    newExplanation: 'Bénéfices : Performance maximale accélérée matériellement par la puce graphique de la machine, aucun script requis, et accessibilité naturelle assurée pour les bots.'
  },
  {
    id: 'ajax',
    title: 'Mises à jour : Rechargement complet vs AJAX / Fetch',
    category: 'Architecture',
    icon: '📡',
    techEraOld: 'Soumission de formulaire d\'attente blanche (1998)',
    techEraNew: 'Asynchronisme via l\'API Fetch / React Query (Moderne)',
    explanation: 'Avant 2005, la moindre action de l\'internaute (comme l\'ajout d\'un produit au panier ou l\'affichage d\'un nouveau filtre) obligeait le navigateur à soumettre la page entière au serveur. Le moteur de rendu détruisait la page actuelle, affichait un écran blanc complet de chargement, puis réactualisait la structure complète, causant des lenteurs extrêmes.',
    oldCode: `<!-- Hier : Soumission classique d'une action, provoquant un écran blanc -->
<form action="refresh_page.php" method="POST">
  <input type="hidden" name="action" value="buy_item_g3">
  <input type="submit" value="RECHARGER LA PAGE ET AJOUTER AU PANIER">
</form>`,
    newCode: `<!-- Aujourd'hui : Envoi asynchrone non bloquant pour l'usager -->
<button onclick="
  fetch('/api/cart', {
    method: 'POST',
    body: JSON.stringify({ item: 'g3' })
  }).then(r => showNotification('iMac ajouté au panier !'))
" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-bold select-none cursor-pointer">
  AJOUTER AU PANIER INSTANTANÉMENT
</button>`,
    oldExplanation: 'Contraintes : Perte immédiate du contexte de lecture de l\'internaute, obligation de recharger les images d\'en-têtes et bannières à chaque clic, saturation inutile de la bande passante.',
    newExplanation: 'Bénéfices : Fluidité absolue semblable à une application bureautique desktop native locale, l\'utilisateur n\'est jamais interrompu, et les consommations réseau sont limitées au strict nécessaire de données JSON.'
  },
  {
    id: 'headless',
    title: 'Étude de cas : Le passage au Headless',
    category: 'Architecture',
    icon: '🚀',
    techEraOld: 'Monolithe PHP/SQL (2005)',
    techEraNew: 'React + API (Moderne)',
    explanation: 'La transition du monolithique où la base de données, la logique et le rendu sont intimement liés dans un même serveur, vers le "Headless", où le rendu est séparé de la donnée.',
    oldCode: `// PHP/SQL Monolithique (Backend + Rendu)
$query = "SELECT * FROM recipes WHERE id = 1";
$result = $db->query($query);
$row = $result->fetch_assoc();
echo "<h1>" . $row['title'] . "</h1>";`,
    newCode: `// React + API (Découplé)
// Back: Serveur REST (Node.js/Go)
// Front: React (fetch API)
const res = await fetch('/api/recipes/1');
const data = await res.json();
return <h1>{data.title}</h1>;`,
    oldExplanation: 'Contraintes : Code intimement lié, base de données exposée à la logique de vue, difficile à maintenir à grande échelle.',
    newExplanation: 'Bénéfices : Découplage complet, sécurité accrue, réutilisabilité du backend pour plusieurs clients (web, app mobile, etc.).'
  }
];

export default function CaseStudiesView({ theme, isLightMode = false }: CaseStudiesViewProps) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy>(CASE_STUDIES[0]);

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans',
          title: 'text-blue-900 border-b-2 border-slate-700 font-extrabold text-[#000080]',
          metaBox: 'bg-[#d4d0c8] border-2 border-inset border-white p-3 text-black text-xs space-y-2',
          badgeActive: 'bg-[#000080] text-white px-2 py-0.5 border text-[9px] uppercase font-bold'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          title: 'text-[#ffb000] border-b border-[#ffb000]/30 font-black',
          metaBox: 'bg-black border border-[#ffb000]/25 p-3 text-xs space-y-2',
          badgeActive: 'bg-[#ffb000] text-black px-2 py-0.5 text-[9px] uppercase font-bold'
        };
      default: // Modern - Supports isLightMode
        return {
          card: isLightMode 
            ? 'bg-[#f5f5f7] border border-[#d2d2d7] p-6 rounded-2xl shadow-sm text-[#1d1d1f]' 
            : 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl text-slate-100',
          title: isLightMode
            ? 'text-[#1c1c1e] font-sans font-extrabold text-sm'
            : 'text-white font-sans font-extrabold text-base bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent',
          metaBox: isLightMode
            ? 'bg-white border border-[#e5e5ea] rounded-xl p-4 text-xs space-y-2 text-[#3a3a3c]'
            : 'bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2 text-slate-350',
          badgeActive: 'bg-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-500/30'
        };
    }
  };

  const style = getThemeClass();

  return (
    <div className="space-y-6 text-left" id="case-studies-root">
      
      {/* Intro Banner */}
      <div className={style.card}>
        <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3 mb-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase block">Études de cas historiques</span>
            <h2 className="text-base font-black tracking-tight mt-0.5">
              Études de Cas : Avant &amp; Après (Evolution du code)
            </h2>
          </div>
        </div>
        <p className="text-xs leading-relaxed opacity-85">
          Revoyez l'impact du W3C et des nouveautés CSS3 : comparez les techniques de bidouillage "Hacks" requises autrefois pour afficher des éléments graphiques aujourd'hui prisés nativement par un simple mot-clé CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List selector (span 4) */}
        <div className="lg:col-span-4 space-y-2.5">
          
          <div className={`p-4 rounded-xl border ${theme === 'ie6' ? 'bg-[#d4d0c8]' : 'bg-[#121215]/80'}`}>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500 block mb-3">
              -- CHOISIR L'ÉTUDE DE CAS --
            </span>
            <div className="space-y-2">
              {CASE_STUDIES.map((study) => {
                const isSelected = study.id === activeStudy.id;
                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveStudy(study)}
                    className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition cursor-pointer select-none ${
                      isSelected
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 font-bold'
                        : 'border-transparent hover:bg-slate-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                    id={`btn-case-study-${study.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl leading-none">{study.icon}</span>
                      <div>
                        <span className="text-[8px] font-mono tracking-wider opacity-60 block uppercase">{study.category}</span>
                        <h4 className="text-xs font-bold leading-tight mt-0.5">{study.title.split(':')[0]}</h4>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition ${isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick didactic note */}
          <div className="p-4 bg-slate-950/30 border border-slate-900 rounded-xl space-y-2 font-sans text-xs text-slate-400">
            <span className="text-indigo-400 font-bold flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Est-ce que le code est réel ?
            </span>
            <p className="text-[11px] leading-relaxed">
              Oui ! Les snippets présentés sont d'authentiques morceaux de code utilisés pour le développement web des deux époques concernées.
            </p>
          </div>

        </div>

        {/* Right Column: Comparison & Previews (span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* Core explanation */}
              <div className={style.card}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 mb-3">
                  <h3 className="font-extrabold text-sm">{activeStudy.title}</h3>
                  <span className={style.badgeActive}>{activeStudy.category}</span>
                </div>
                <p className="text-xs leading-relaxed font-sans opacity-95">
                  {activeStudy.explanation}
                </p>
              </div>

              {/* Side by side code view */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Vintage Code Block */}
                <div className="space-y-2 font-mono">
                  <span className="text-[9px] uppercase font-bold text-red-400 tracking-wider flex items-center gap-1 bg-red-955/20 border border-red-500/25 px-2.5 py-1 rounded-lg">
                    <span>🔴 HIER :</span>
                    <span>{activeStudy.techEraOld}</span>
                  </span>
                  <div className="bg-black p-3 rounded-xl border border-slate-900 max-h-80 overflow-y-auto scrollbar-thin">
                    <pre className="text-[9px] text-[#ffb000] leading-normal font-mono text-left whitespace-pre-wrap">{activeStudy.oldCode}</pre>
                  </div>
                  <div className="p-3 bg-red-950/5 border border-red-900/15 rounded-xl text-[11px] text-slate-450 leading-relaxed font-sans">
                    <span className="text-red-400 font-bold block mb-0.5">La Contrainte :</span>
                    {activeStudy.oldExplanation}
                  </div>
                </div>

                {/* Modern Code Block */}
                <div className="space-y-2 font-mono">
                  <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1 bg-emerald-990/20 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    <span>🟢 AUJOURD'HUI :</span>
                    <span>{activeStudy.techEraNew}</span>
                  </span>
                  <div className="bg-black p-3 rounded-xl border border-slate-900 max-h-80 overflow-y-auto scrollbar-thin">
                    <pre className="text-[9px] text-emerald-400 leading-normal font-mono text-left whitespace-pre-wrap">{activeStudy.newCode}</pre>
                  </div>
                  <div className="p-3 bg-emerald-950/5 border border-emerald-900/15 rounded-xl text-[11px] text-slate-450 leading-relaxed font-sans">
                    <span className="text-emerald-400 font-bold block mb-0.5">L'Avancement :</span>
                    {activeStudy.newExplanation}
                  </div>
                </div>

              </div>
              
              {/* Interactive side by side preview representation */}
              <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-xl space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono block">
                  🎨 Représentation d'affichage comparée :
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Vintage visual preview simulation representation */}
                  <div className="p-3 border-2 border-dashed border-red-500/50 bg-red-950/5 rounded-xl text-center space-y-2">
                    <span className="text-[9px] uppercase font-bold text-red-400 font-mono">[ Rendu simulé Époque Rétro ]</span>
                    
                    {/* Simulated view based on id */}
                    <div className="flex justify-center p-2 bg-white text-black font-serif text-xs align-middle">
                      {activeStudy.id === 'layout' && (
                        <table border={1} cellPadding={4} cellSpacing={0} width="100%" className="border-collapse border-slate-400 bg-[#d4d0c8] text-[10px]">
                          <tbody>
                            <tr>
                              <td width="30%" bgcolor="#808080" className="text-white font-bold p-1">Rubriques</td>
                              <td bgcolor="white" className="p-2 font-serif text-left">
                                <b>Bienvenue</b><br />
                                Le contenu est statique et figé horizontalement...
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                      
                      {activeStudy.id === 'buttons' && (
                        <div className="inline-block p-1 bg-[#d4d0c8]" style={{ border: '2px solid white', boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset' }}>
                          <span className="font-sans font-extrabold text-[9px] text-black tracking-tighter">VALIDER COMMANDE</span>
                        </div>
                      )}

                      {activeStudy.id === 'menu' && (
                        <div className="bg-[#d4d0c8] p-1.5 border border-gray-450 text-[10px] text-left">
                          📂 <b>Fichiers</b> (Hover ne marche que grâce au code JS d'époque)<br />
                          └ Ouvrir<br />
                          └ Sauvegarder
                        </div>
                      )}

                      {activeStudy.id === 'ajax' && (
                        <div className="bg-white p-3 text-center border-2 border-dashed border-red-500 text-[10px] space-y-1">
                          <span className="loading-line block animate-pulse">⏳ RECHARGEMENT GÉNÉRAL...</span>
                          <span className="text-red-600 font-bold block">ÉCRAN BLANC TEMPORAIRE (1.8s)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modern visual preview simulation representation */}
                  <div className="p-3 border-2 border-dashed border-emerald-500/40 bg-emerald-950/5 rounded-xl text-center space-y-2">
                    <span className="text-[9px] uppercase font-bold text-emerald-400 font-mono">[ Rendu natif Moderne ]</span>
                    
                    {/* Simulated modern view */}
                    <div className="flex justify-center p-2">
                      {activeStudy.id === 'layout' && (
                        <div className="grid grid-cols-12 gap-2 text-[10px] w-full text-left font-sans">
                          <div className="col-span-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 p-1.5 rounded-lg font-bold">
                            Sidebar adaptive
                          </div>
                          <div className="col-span-8 bg-slate-900 border border-slate-800 p-1.5 rounded-lg text-slate-300">
                            Grille responsive fluide !
                          </div>
                        </div>
                      )}

                      {activeStudy.id === 'buttons' && (
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-sans text-[10px] font-black px-4 py-1.5 rounded-full shadow-md active:scale-95 transition-all leading-none">
                          VALIDER LA COMMANDE
                        </button>
                      )}

                      {activeStudy.id === 'menu' && (
                        <div className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-lg text-[10.5px] font-sans flex items-center gap-1.5 cursor-pointer hover:bg-slate-800">
                          📁 Fichiers <span className="text-[8px] opacity-70">▼</span>
                        </div>
                      )}

                      {activeStudy.id === 'ajax' && (
                        <button className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] rounded-lg transition-colors font-bold select-none cursor-pointer leading-tight">
                          ✨ Modification en tâche de fond (0ms)
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
