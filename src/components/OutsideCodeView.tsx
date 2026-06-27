/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Megaphone, 
  Search, 
  PenTool, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye,
  AlertTriangle,
  Layout,
  MousePointerClick,
  Smartphone,
  Gauge,
  Lightbulb,
  FileText
} from 'lucide-react';

interface OutsideCodeViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
  isLightMode?: boolean;
}

type SubSection = 'webdesign' | 'ergonomie_web' | 'marketing' | 'seo' | 'copywriter';

export default function OutsideCodeView({ theme, isLightMode = false }: OutsideCodeViewProps) {
  const [activeSub, setActiveSub] = useState<SubSection>('webdesign');
  const [ergonomicMode, setErgonomicMode] = useState<'chaotic' | 'ergonomic'>('chaotic');

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          badgeActive: 'bg-[#000080] text-white text-[9px] uppercase font-bold px-2 py-0.5 border border-[#808080]',
          badgeInactive: 'bg-[#808080] text-white text-[9px] uppercase font-bold px-2 py-0.5 border border-white',
          title: 'text-blue-900 font-extrabold text-[#000080] font-sans text-sm border-b-2 border-[#808080] pb-1 uppercase',
          accentText: 'text-blue-800 font-bold',
          paraText: 'text-black font-sans',
          labelColor: 'text-[#000080]'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-3 font-mono',
          badgeActive: 'bg-[#ffb000] text-black text-[9px] uppercase font-black px-2 py-0.5 border border-[#ffb000]',
          badgeInactive: 'bg-black text-[#ffb000]/60 text-[9px] uppercase font-bold px-2 py-0.5 border border-[#ffb000]/30',
          title: 'text-[#ffb000] font-mono font-black text-sm border-b border-[#ffb000]/30 pb-2 uppercase tracking-wider',
          accentText: 'text-[#ffb000] font-bold decoration-dotted underline',
          paraText: 'text-[#ffb000]/90 font-mono',
          labelColor: 'text-[#ffb000]'
        };
      default: // Modern - Supports native isLightMode
        return {
          card: isLightMode 
            ? 'bg-[#f5f5f7] border border-[#d2d2d7] p-6 rounded-2xl shadow-sm space-y-4 text-[#1d1d1f]' 
            : 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4 text-slate-100',
          innerCard: isLightMode
            ? 'p-4 bg-white border border-[#e5e5ea] rounded-xl space-y-3 text-[#1d1d1f]'
            : 'p-4 bg-slate-900 border border-slate-750/70 rounded-xl space-y-3 text-slate-350',
          badgeActive: 'bg-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-500/30',
          badgeInactive: isLightMode
            ? 'bg-[#e5e5ea] text-[#8e8e93] text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full border border-transparent'
            : 'bg-slate-950/40 text-slate-500 text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full border border-transparent',
          title: isLightMode
            ? 'text-[#1c1c1e] font-sans font-extrabold text-sm tracking-tight'
            : 'text-white font-sans font-extrabold text-sm tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent',
          accentText: 'text-indigo-500 font-semibold',
          paraText: isLightMode ? 'text-[#3a3a3c] font-sans' : 'text-slate-405 font-sans',
          labelColor: 'text-indigo-400 font-bold'
        };
    }
  };

  const style = getThemeClass();

  const getSubTabStyle = (tabId: SubSection) => {
    const isActive = activeSub === tabId;
    if (theme === 'ie6') {
      return isActive 
        ? 'bg-[#d4d0c8] border-2 border-inset border-white text-[#000080] font-bold px-3 py-2 text-xs'
        : 'bg-[#d4d0c8] border-2 border-outset border-white text-black px-3 py-2 text-xs hover:bg-[#c0c0c0]';
    } else if (theme === 'terminal') {
      return isActive
        ? 'bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000] px-3 py-2 text-xs font-bold font-mono uppercase'
        : 'text-[#ffb000]/60 border border-[#ffb000]/20 hover:border-[#ffb000]/60 hover:text-[#ffb000] px-3 py-2 text-xs font-mono';
    } else { // Modern
      if (isLightMode) {
        return isActive
          ? 'bg-indigo-500/10 border-indigo-600 text-indigo-600 font-bold rounded-lg px-4 py-2 text-xs border cursor-pointer'
          : 'bg-[#e5e5ea] border-transparent text-[#48484a] hover:text-[#1c1c1e] hover:bg-[#d1d1d6] rounded-lg px-4 py-2 text-xs border cursor-pointer';
      }
      return isActive
        ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400 font-bold rounded-lg px-4 py-2 text-xs border cursor-pointer'
        : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/70 rounded-lg px-4 py-2 text-xs border cursor-pointer';
    }
  };

  return (
    <div className="space-y-6 text-left" id="outside-code-view-root">
      
      {/* Intro Header Section */}
      <div className={style.card}>
        <span className={`text-[10px] font-mono font-black uppercase tracking-widest block border-b pb-2 mb-2 ${
          theme === 'ie6' ? 'border-[#808080] text-blue-900' : theme === 'terminal' ? 'border-[#ffb000]/30 text-[#ffb000]' : 'border-slate-800 text-amber-500'
        }`}>
          -- 🧠 UNIVERSE - LE WEB N'EST PAS QUE DU CODE --
        </span>
        <h3 className={`text-base font-black ${theme === 'ie6' ? 'text-[#000080]' : theme === 'terminal' ? 'text-[#ffb000]' : 'text-slate-100'}`}>
          Évolution des métiers et des techniques hors programmation
        </h3>
        <p className="text-xs leading-relaxed font-sans opacity-90">
          La réussite d'un outil numérique ne dépend pas uniquement de son compilateur. Depuis les premiers gif clignotants jusqu'à l'ergonomie fine et la saine rédaction de contenu persuasive orientée SEO, découvrez les disciplines parallèles indispensables à l'expérience de l'internaute.
        </p>
      </div>

      {/* Responsive Horizontal Submenu tabs */}
      <div className={`flex flex-wrap gap-2 pb-3 mb-2 border-b ${theme === 'ie6' ? 'border-[#808080]' : theme === 'terminal' ? 'border-[#ffb000]/20' : 'border-slate-800'}`}>
        {[
          { id: 'webdesign', label: '1. Évolution du Webdesign', icon: Palette },
          { id: 'ergonomie_web', label: '2. Ergonomie du Web (UX/UI)', icon: Layout },
          { id: 'marketing', label: '3. Marketing & Monétisation', icon: Megaphone },
          { id: 'seo', label: '4. Référencement & SEO', icon: Search },
          { id: 'copywriter', label: '5. Rédacteur Web', icon: PenTool },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSub(tab.id as SubSection)}
              className={`${getSubTabStyle(tab.id as SubSection)} flex items-center gap-2 transition-all cursor-pointer`}
              id={`tab-outside-code-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main interactive area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSub}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >

          {/* ================ SECTION 1: WEBDESIGN ================ */}
          {activeSub === 'webdesign' && (
            <div className="space-y-6" id="sub-webdesign">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Eras (Comparative timeline) */}
                <div className="md:col-span-8 space-y-4">
                  <div className={style.card}>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-200">
                      Les Grandes Époques Esthétiques du Web (1991 - Présent)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Le design d'interface est un balancier oscillant de l'utilitarisme brut au réalisme immersif, pour se stabiliser aujourd'hui vers une pureté épurée et géométrique.
                    </p>

                    <div className="space-y-4 pt-2">
                      {[
                        {
                          period: '1991 - 1995',
                          title: "L'Âge Brutaliste & Académique (Web 1.0 initial)",
                          styleDesc: "Textes gris monochromes, fond #c0c0c0 ou blanc, hyperliens soulignés en bleu vif (#0000ff). Pas de mise en page structurée, le design est imposé par les contraintes par défaut du navigateur.",
                          icon: "💾"
                        },
                        {
                          period: '1996 - 2003',
                          title: "La Fièvre Décorative & Skeuomorphisme précoce",
                          styleDesc: "Apparition des cadres (frames), fonds répétés en tuiles (textures bois, marbre ou étoiles galactiques), animations GIF à outrance, badges clignotants 'Under Construction', boutons biseautés simulant du relief physique.",
                          icon: "🎨"
                        },
                        {
                          period: '2004 - 2011',
                          title: "L'Ère Flash Immersive & Web 2.0 Brillant",
                          styleDesc: "Reflets de type miroir, grosses icônes 3D avec ombres douces (style Mac OS X Aqua), dégradés radiaux lumineux. En parallèle, les sites Flash permettent des transitions de pages sonorisées et des vecteurs ultra-fluides.",
                          icon: "✨"
                        },
                        {
                          period: '2012 - 2019',
                          title: "Le Flat Design & L'Impératif Responsif",
                          styleDesc: "Éradication complète du skeuomorphisme et de la fausse 3D. Passage au design plat, aplats de couleurs vives (Metro UI), grandes typographies sans empattements (Roboto, Open Sans), grilles élastiques adaptables au mobile.",
                          icon: "📱"
                        },
                        {
                          period: '2020 - Présent',
                          title: "Le Néo-Minimalisme & Glassmorphism",
                          styleDesc: "Surfaces semi-transparentes imitant le verre dépoli (blur), ombres très diffuses à longue portée, micro-animations réactives (Framer Motion, CSS transitions), intégration poussée du mode sombre par défaut.",
                          icon: "🌀"
                        }
                      ].map((era, index) => (
                        <div key={index} className="flex gap-3 items-start border-l-2 border-[#2a2a2e]/65 pl-4 ml-2">
                          <span className="text-xl leading-none">{era.icon}</span>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-amber-500 block">{era.period}</span>
                            <h5 className="text-xs font-bold leading-tight mb-1">{era.title}</h5>
                            <p className="text-[11px] leading-relaxed font-sans">{era.styleDesc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practical sandbox look card on Design */}
                <div className="md:col-span-4 space-y-4">
                  <div className={style.card}>
                    <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                      <Palette className="w-4 h-4 text-emerald-400" />
                      Fiche d'Artiste
                    </h5>
                    
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Concept Clé</span>
                        <p className="text-[11px] leading-relaxed">
                          La <strong>psychologie des couleurs</strong> et la règle d'or du ratio d'or des blancs typographiques : un site web respire par ses marges négatives.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950/70 text-slate-300 border border-slate-900 rounded-lg text-[11px]">
                        <span className="text-emerald-400 font-bold block mb-1">💡 La Loi de Fitts :</span>
                        Le temps requis pour atteindre une cible graphique dépend de la distance et de sa taille physique. C'est l'argument numéro un justifiant la taille minimale de 44px pour les boutons de validation cliquables sur mobile.
                      </div>

                      <div className="border border-slate-800 rounded-lg p-3 text-center space-y-2 bg-[#0d0d10]">
                        <span className="text-[10px] font-mono text-indigo-400 block tracking-wider uppercase font-black">--- DÉMO SKEUOMORPHISME ---</span>
                        <p className="text-[10px] text-slate-500">Cliquez pour voir la différence de rendu d'un même bouton :</p>
                        
                        <div className="flex flex-col gap-2 items-center pt-1">
                          <button className="w-full max-w-[140px] px-3 py-1.5 bg-[#d4d0c8] text-black border-2 border-outset border-white font-bold select-none text-[11px] active:border-inset">
                            Bouton (IE 6 / 1999)
                          </button>
                          <button className="w-full max-w-[140px] px-3 py-1.5 bg-gradient-to-b from-[#79b4fb] to-[#125ebd] text-white font-sans font-bold text-[11px] rounded-lg shadow-md border border-[#0d4f9f] block">
                            Bouton (Web 2.0 Aqua)
                          </button>
                          <button className="w-full max-w-[140px] px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[11px] font-semibold transition-all rounded shadow-sm block">
                            Bouton (Flat / 2013)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}


          {/* ================ SECTION 2: ERGONOMIC DU WEB (NEW!) ================ */}
          {activeSub === 'ergonomie_web' && (
            <div className="space-y-6" id="sub-ergonomie-web">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Visual guidelines */}
                <div className="lg:col-span-7 space-y-4">
                  <div className={style.card}>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-400 flex items-center gap-1">
                      <Layout className="w-4 h-4 text-indigo-400" />
                      L'Ergonomie et l'Indexation de l'Efficacité (UX/UI Evolution)
                    </h4>
                    <p className="text-xs max-w-2xl opacity-95">
                      L'ergonomie web étudie comment organiser l'information pour minimiser la charge cognitive de l'utilisateur. Du chaos absolu de 1998 à la standardisation mathématique actuelle, l'internaute n'a plus à déchiffrer l'emplacement d'un bouton de validation.
                    </p>

                    <div className="space-y-4 pt-3 font-sans">
                      <div className={style.innerCard}>
                        <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          La Loi de Jakob (Jakob Nielsen)
                        </h5>
                        <p className="text-[11px] leading-relaxed">
                          Les utilisateurs passent l'essentiel de leur temps sur d'autres sites web. Cela signifie qu'ils préfèrent que votre site fonctionne de la même manière que tous les autres de leur quotidien. N'inventez pas une navigation circulaire s'il existe des barres horizontales standardisées !
                        </p>
                      </div>

                      <div className={style.innerCard}>
                        <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                          Le parcours en "F" (F-Shaped Pattern)
                        </h5>
                        <p className="text-[11px] leading-relaxed">
                          La recherche d'eye-tracking montre que les internautes ne "lisent" pas, ils "balayent". Leurs yeux dessinent un "F" : deux balayages horizontaux denses en haut (header et premier paragraphe), puis une descente verticale rapide à gauche. Les informations capitales doivent donc être placées à l'intersection haute gauche.
                        </p>
                      </div>

                      <div className={style.innerCard}>
                        <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          Le Mythe des "3 Clics" vs La Règle des 15 Secondes
                        </h5>
                        <p className="text-[11px] leading-relaxed">
                          Pendant longtemps, le dogme voulait qu’aucune information d'importance ne requière plus de 3 clics. La recherche moderne a prouvé son inefficacité : l'utilisateur accepte volontiers 10 clics si chaque étape est fluide, sans ambiguïté et rassurante, plutôt qu'une structure à 3 clics surchargée et chaotique.
                        </p>
                      </div>

                      <div className={style.innerCard}>
                        <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                          L'Accessibilité Numérique (A11y) & WCAG
                        </h5>
                        <p className="text-[11px] leading-relaxed">
                          Aujourd’hui, le design de haut-niveau est inclusif par défaut. Il intègre le respect de contrastes de couleurs d’au moins 4.5:1, des balises explicatives lues par transcripteurs vocaux ou encore une navigation fluide entièrement gérée via la touche Tabulation du clavier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Comparative Interactive Widget */}
                <div className="lg:col-span-5 space-y-4 text-xs font-mono">
                  
                  <div className={style.card}>
                    <div className="flex items-center justify-between border-b pb-2 gap-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <MousePointerClick className="w-4 h-4 text-indigo-400" />
                        Atelier Interactif d'Ergonomie
                      </h5>
                      <span className="text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase font-sans">
                        Faites le Test
                      </span>
                    </div>

                    <p className="text-[11px] leading-normal font-sans text-slate-400">
                      Basculez entre le chaos ergonomique des années 90 et l'ergonomie responsive moderne pour en ressentir directement les effets physiques :
                    </p>

                    <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-900 justify-center">
                      <button
                        onClick={() => setErgonomicMode('chaotic')}
                        className={`flex-1 py-1.5 text-[10px] font-sans font-bold rounded-lg cursor-pointer transition ${
                          ergonomicMode === 'chaotic'
                            ? 'bg-red-500/15 border border-red-500/35 text-red-400'
                            : 'text-slate-500 hover:text-slate-350 bg-transparent'
                        }`}
                      >
                        🚨 Chaos Ergonomique (1998)
                      </button>
                      <button
                        onClick={() => setErgonomicMode('ergonomic')}
                        className={`flex-1 py-1.5 text-[10px] font-sans font-bold rounded-lg cursor-pointer transition ${
                          ergonomicMode === 'ergonomic'
                            ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-400'
                            : 'text-slate-500 hover:text-slate-350 bg-transparent'
                        }`}
                      >
                        🥬 Expérience Fluide (Moderne)
                      </button>
                    </div>

                    {/* Interactive Sandbox Representation Container */}
                    <AnimatePresence mode="wait">
                      {ergonomicMode === 'chaotic' ? (
                        <motion.div
                          key="chaotic"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="bg-[#c0c0c0] font-serif border-2 border-white p-3 space-y-3 shadow-[1px_1px_0px_white_inset] text-black"
                          id="chaotic-ergonomic-preview"
                        >
                          {/* Saturated and clunky title */}
                          <center>
                            <h3 className="text-sm font-extrabold text-blue-900 uppercase tracking-widest leading-none">
                              ★★ COMPTE_RENDU_DE_VENTE ★★
                            </h3>
                            <span className="text-[9px] text-red-600 block animate-pulse">!!! CLIQUER EN URGENCE !!!</span>
                          </center>

                          <div className="text-[10px] leading-tight space-y-1 bg-[#d4d0c8] p-2 border-2 border-inset border-white text-left overflow-x-auto whitespace-nowrap scrollbar-thin">
                            <div>Client_ID=32014 &amp; Nom=Mme.Dupont &amp; Solde_Dist=120000_FRF &amp; Statut=PremiumActive</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                            <button className="bg-[#c0c0c0] border border-white p-1 text-[8px] active:border-inset truncate" style={{ boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset' }}>
                              ANNULER ET SUPPRIMER TOUT L'HISTORIQUE DE CETTE FICHE
                            </button>
                            <button className="bg-[#c0c0c0] border border-white p-1 text-[8px] active:border-inset font-black text-red-800" style={{ boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset' }}>
                              OK
                            </button>
                          </div>

                          <div className="text-[8.5px] border-t border-gray-600 pt-1 text-center font-sans space-y-1">
                            <span className="text-red-700 block">⚠️ Ergonomie Dégradée :</span>
                            <ul className="list-disc text-[8px] list-inside text-gray-800 space-y-0.5 text-left font-serif">
                              <li>Texte horizontal non responsive (force le scroll horizontal).</li>
                              <li>Taille de boutons microscopique et zones d'action confuses.</li>
                              <li>Choc des polices sémantiques (Arial, Times New Roman, Courrier).</li>
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="ergonomic"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className={`${
                            isLightMode ? 'bg-white border-[#d2d2d7]' : 'bg-slate-950 border-slate-900'
                          } border p-4 rounded-xl space-y-4`}
                          id="ergonomic-clean-preview"
                        >
                          {/* Aesthetic Title and subtitle */}
                          <div className="flex justify-between items-center whitespace-normal">
                            <div>
                              <span className="text-[9px] font-sans font-bold text-emerald-500 uppercase tracking-widest block">Fiche Client active</span>
                              <h3 className="text-xs font-sans font-extrabold text-slate-100' : 'text-slate-800 leading-tight">Fiche de transaction</h3>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                              Actif
                            </span>
                          </div>

                          {/* Beautiful and responsive data box */}
                          <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs font-sans overflow-hidden">
                            <div>
                              <strong className="block text-[11px] text-slate-300">Marie Dupont</strong>
                              <span className="text-[9px] text-slate-500">ID: #32014</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[11px] font-mono font-bold text-emerald-400">12 000 €</span>
                              <span className="text-[9px] text-slate-500">Solde principal</span>
                            </div>
                          </div>

                          {/* Responsive CTA Buttons built at 44px touch space */}
                          <div className="flex gap-2 font-sans text-xs">
                            <button className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition cursor-pointer select-none text-[10.5px] leading-none">
                              Annuler
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition cursor-pointer select-none text-[10.5px] leading-none shadow-md">
                              Valider la fiche
                            </button>
                          </div>

                          <div className="text-[9px] border-t border-slate-800 pt-2 text-left font-sans space-y-1">
                            <span className="text-emerald-400 font-bold block">💡 Avantages Ergonomiques :</span>
                            <p className="text-slate-400 leading-relaxed text-[8.5px]">
                              Touch-targets de 44px conformes, hiérarchie sémantique parfaite, grille élastique, et contrastes rigoureux limitant considérablement le taux de rebond des usagers.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

              </div>

            </div>
          )}


          {/* ================ SECTION 3: MARKETING ================ */}
          {activeSub === 'marketing' && (
            <div className="space-y-6" id="sub-marketing">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Narrative column */}
                <div className="md:col-span-7 space-y-4">
                  <div className={style.card}>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-200">
                      L'Évolution des Stratégies de Vente et de Capture Web
                    </h4>
                    <p className="text-[11.5px] text-slate-400">
                      Le neuromarketing d'aujourd'hui, basé sur l'analyse fine des tunnels de conversion et de l'A/B testing, descend d'une ère d'agressivité sauvage de fenêtres pop-ups intrusives qui saturaient les processeurs des micro-ordinateurs Pentium.
                    </p>

                    <div className="space-y-4 pt-3 font-sans">
                      <div className={style.innerCard}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-red-955 font-bold text-red-400 rounded">1995 - 2002</span>
                          <h5 className="text-xs font-black text-slate-100">La Flibuste de la Pop-Up & Spamming de masse</h5>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Pour monétiser les premiers sites d'actualité ou d'hébergement gratuit, la technique par défaut consistait à ouvrir des fenêtres secondaires d'arrière-plan sans le consentement de l'internaute (les scripts de <code>window.open()</code>). Des flots d'emails d'affiliation non sollicités (Spam) remplissaient les boîtes de tchat ou adresses Hotmail.
                        </p>
                      </div>

                      <div className={style.innerCard}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-950 font-bold text-amber-400 rounded">2003 - 2012</span>
                          <h5 className="text-xs font-black text-slate-100">La Structuration : Régies Publicitaires & affiliation</h5>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Google révolutionne le marketing en lançant <strong>AdWords</strong> (enchères sur mots-clés) et <strong>AdSense</strong> (encarts publicitaires ciblés sur le contenu des sites éditeurs). L'affiliation devient un métier : on vend des ebooks de niche et des guides d'achat automatisés grâce à des bannières animées en format standardisé GIF de 468x60 pixels.
                        </p>
                      </div>

                      <div className={style.innerCard}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 font-bold text-indigo-400 rounded">2013 - Présent</span>
                          <h5 className="text-xs font-black text-slate-100">Neuromarketing, Pixel de tracking & RGPD</h5>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          La publicité devient chirurgicale : le pixel invisible Facebook ou Google Analytics suit chaque mouvement de l'internaute. L'Inbound Marketing s'impose (séduire l'utilisateur avec du contenu de valeur plutôt que l'interrompre) conjointement au tunnel de vente optimisé (Landing Page ➔ Lead Magnet ➔ Emailing intelligent). L'Union Européenne encadre cela avec le RGPD (obligation du consentement des cookies).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Tool / Ad simulator card */}
                <div className="md:col-span-5 space-y-4">
                  <div className={style.card}>
                    <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                      <Megaphone className="w-4 h-4 text-amber-500" />
                      Simulateur Publicitaire Rétro
                    </h5>
                    
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">
                      Voyez à quel point l'agressivité d'un bandeau publicitaire des années 2000 contrastait avec le tracking silencieux d'aujourd'hui.
                    </p>

                    {/* Fun Interactive Panel */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 flex flex-col items-center justify-center space-y-3 min-h-[160px]">
                      
                      {/* Authentic 468x60 GIF-like Banner Ad */}
                      <div className="w-full border-2 border-dashed border-red-500/80 bg-red-950/20 p-2 text-center select-none font-mono text-[10px] text-yellow-405 leading-tight animate-pulse rounded-lg relative overflow-hidden">
                        <span className="absolute top-1 left-2 bg-yellow-400 text-black text-[8px] font-black uppercase px-1 leading-none rounded-sm">AD</span>
                        <div className="font-extrabold uppercase tracking-wide text-xs text-red-500">⚡ FELICITATIONS VISITEUR !!! ⚡</div>
                        <div className="text-[9.5px] text-slate-350">Vous avez été élu 1 000 000ème internaute à gagner un iMac G3 !</div>
                        <div className="text-[9px] underline text-indigo-400 font-bold font-sans cursor-pointer mt-0.5">CLIQUER ICI EN URGENCE !!!</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full text-[10.5px]">
                        <div className="p-2 border border-slate-805 rounded bg-slate-900/60 leading-snug">
                          <strong className="text-red-400 block font-mono">Bandeaux Rétro :</strong>
                          Clignotement lourd pour forcer le clic compulsif. Taux d'impression élevé mais rejet massif par dictionnaire d'attention saturé.
                        </div>
                        <div className="p-2 border border-slate-805 rounded bg-slate-900/60 leading-snug">
                          <strong className="text-emerald-400 block font-mono">Retargeting Moderne :</strong>
                          Silencieux et invisible, mais alimenté en temps-réel par des bases cloud prédictives analysant chaque scroll.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================ SECTION 4: SEO ================ */}
          {activeSub === 'seo' && (
            <div className="space-y-6" id="sub-seo">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Timeline and list */}
                <div className="md:col-span-8 space-y-4">
                  <div className={style.card}>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-200">
                      L'Évolution du Référencement Naturel (Search Engine Optimization)
                    </h4>
                    <p className="text-[11.5px] text-slate-400 font-sans">
                      Faire comprendre à un algorithme que votre contenu mérite d'occuper la première place. Cette discipline est passée d'un jeu de dupes d'arrière-salle (techniques de triche) à une quête d'excellence de l'expérience utilisateur globale.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 font-sans">
                      
                      {/* Vintage Black Hat */}
                      <div className="p-4 rounded-xl border border-red-900/30 bg-red-950/5 space-y-2">
                        <span className="text-[9.5px] uppercase font-bold text-red-400 tracking-wider font-mono block">--- L'ère préhistorique (Black Hat SEO) ---</span>
                        <h5 className="text-xs font-bold text-slate-200 leading-tight">Le bourrage de mots-clés (Keyword Stuffing)</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Au début des années 2000, l'algorithme de Google reposait massivement sur la densité de mots-clés présents dans la page et dans les headers de méta-balises. Les tricheurs écrivaient 400 fois le mot 'voyage gratuit' écrit en blanc sur fond blanc en bas de page pour berner le robot d'indexation. Une simple soumission manuelle de l'URL à l'index suffisait.
                        </p>
                        <div className="text-[10px] text-red-300 font-mono italic">
                          Sanctionné définitivement par les algorithmes Panda / Penguin.
                        </div>
                      </div>

                      {/* Modern White Hat */}
                      <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-900/5 space-y-2">
                        <span className="text-[9.5px] uppercase font-bold text-emerald-400 tracking-wider font-mono block">--- L'ère moderne (White Hat UX) ---</span>
                        <h5 className="text-xs font-bold text-slate-200 leading-tight">Autorité, Expérience et signaux d'usage web</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Aujourd'hui, Google analyse l'intention de recherche (Search Intent) par traitement de langage naturel (IA BERT / MUM). Le SEO repose sur les critères de qualité <strong>E-E-A-T</strong> (Expérience, Expertise, Autorité, Confidentialité), la vitesse de chargement mesurée par les signaux web essentiels (Core Web Vitals) et l'accessibilité sur mobile par défaut.
                        </p>
                        <div className="text-[10px] text-emerald-300 font-mono italic">
                          Alignement total sur l'expérience et l'utilité humaine du contenu.
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Side parameters */}
                <div className="md:col-span-4 space-y-4">
                  <div className={style.card}>
                    <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                      <Search className="w-4 h-4 text-indigo-400" />
                      Critères Classiques d'Indexation
                    </h5>

                    <div className="space-y-3 pt-2 font-mono text-[10.5px]">
                      <div className="p-2.5 bg-slate-950/70 text-slate-350 border border-slate-900 rounded-lg flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-250 block text-[9.5px] uppercase">Balise Title & Meta Description :</strong>
                          Le premier contact visuel de l'internaute dans les résultats de recherche (SERP).
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-950/70 text-slate-350 border border-slate-900 rounded-lg flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-250 block text-[9.5px] uppercase">Attribut 'Alt' (Image alternative) :</strong>
                          Indispensable pour l'accessibilité numérique des aveugles et lu par les robots d'indexation.
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-950/70 text-slate-350 border border-slate-900 rounded-lg flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-250 block text-[9.5px] uppercase">Vitesse & Intégration mobile :</strong>
                          Pénalité immédiate sur le score d'indexation si une page n'est pas optimisée (responsive ou s'il y a des décalages de layout).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================ SECTION 5: COPYWRITER / RÉDACTEUR WEB ================ */}
          {activeSub === 'copywriter' && (
            <div className="space-y-6" id="sub-copywriter">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual content copywriting focus */}
                <div className="md:col-span-8 space-y-4 font-sans">
                  <div className={style.card}>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      Rédacteur Web : Le Maître du Texte, de la Sémantique et du Clic
                    </h4>
                    <p className="text-[11.5px] leading-relaxed opacity-95">
                      Un rédacteur web n'est pas un romancier traditionnel. C'est un traducteur bilingue capable d'écrire une histoire sémantique captivante pour les yeux d'un lecteur humain fatigué, tout en envoyant des signaux structurels précis aux robots d'indexation.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-[#141416]/90 border border-slate-800 rounded-xl space-y-2">
                        <h5 className="text-xs font-black text-indigo-400">🧠 Raconter une histoire (Storytelling)</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          La capacité de structurer un argumentaire pour captiver l'audience dès la première seconde. La formule A.I.D.A. (Attention, Intérêt, Désir, Action) reste la boussole inaltérable d'une rédaction commerciale persuasive de haute qualité.
                        </p>
                      </div>

                      <div className="p-4 bg-[#141416]/90 border border-slate-800 rounded-xl space-y-2">
                        <h5 className="text-xs font-black text-emerald-400">📡 Optimisation Lexicale & Sémantique</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          L'analyse des intentions de recherche permet de dresser un champ sémantique riche (mots-clés connexes, questions populaires posées par l'internaute) pour couvrir le sujet de manière exhaustive et gagner une légitimité de niche.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 border border-slate-800 bg-slate-950/45 rounded-xl space-y-2">
                      <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wide font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        🤖 La Transition IA Générative (Le Défi Actuel)
                      </h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        L'apparition récente des grands modèles de langage (LLM comme Google Gemini ou ChatGPT) bouleverse fondamentalement la discipline de la rédaction de contenu d'entrée de gamme. Les rédacteurs d'élite se réinventent en <strong>Prompt Engineers</strong>, en relecteurs techniques avancés, et en spécialistes du copywriting à haute valeur émotionnelle que l'IA ne peut pas simuler.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparative table snippet */}
                <div className="md:col-span-4 space-y-4 text-xs font-mono">
                  <div className={style.card}>
                    <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                      <PenTool className="w-4 h-4 text-emerald-400" />
                      Savoir-Faire & Formules
                    </h5>

                    <div className="space-y-3 font-sans text-[11px]">
                      <p className="leading-relaxed opacity-90">
                        Voici la formule séculaire d'une structure sémantique persuasive imbattable, utilisée tant en emailing qu'en landing pages :
                      </p>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 font-mono text-[9px] text-[#ffb000]">
                        <div className="font-bold border-b border-amber-500/20 pb-1 mb-2 text-[10px] text-amber-400 uppercase">La Formule A.I.D.A. :</div>
                        <ul className="space-y-2">
                          <li><b>[A] Attention :</b> Une accroche choc terrassant l'inattention de l'internaute.</li>
                          <li><b>[I] Intérêt :</b> Soulever un problème concret que vit votre cible.</li>
                          <li><b>[D] Désir :</b> Présenter la solution idéale en lui faisant imaginer sa réussite.</li>
                          <li><b>[A] Action :</b> Un bouton clair d'appel à l'action (Call-To-Action).</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
