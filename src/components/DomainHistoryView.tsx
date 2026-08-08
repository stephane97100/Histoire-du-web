/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Scale, 
  History, 
  User, 
  Award, 
  Tv, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Volume2
} from 'lucide-react';

interface DomainHistoryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface HistoricalSale {
  domain: string;
  price: string;
  year: string;
  buyer: string;
  description: string;
  category: 'legal' | 'premium';
}

interface DisputeCase {
  domain: string;
  conflict: string;
  verdict: string;
  year: string;
  winner: string;
  story: string;
}

export default function DomainHistoryView({ theme }: DomainHistoryViewProps) {
  const [activeSection, setActiveSection] = useState<'intro' | 'domaining' | 'cybersquatting' | 'udrp' | 'uzi_nissan'>('intro');
  const [selectedCase, setSelectedCase] = useState<string>('nissan');
  const [simulatedDomainInput, setSimulatedDomainInput] = useState<string>('');
  const [simulatedSearchResult, setSimulatedSearchResult] = useState<{
    status: 'available' | 'registered' | 'premium' | 'squatted' | 'none';
    price?: string;
    owner?: string;
    recomm?: string;
  }>({ status: 'none' });

  // Play a simple retro beep if audio context is allowed
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context blocked
    }
  };

  const sales: HistoricalSale[] = [
    {
      domain: 'Cars.com',
      price: '872 000 000 $',
      year: '2014',
      buyer: 'Gannett Co.',
      description: 'Évalué comme l\'actif immatériel le plus cher de l\'histoire, valorisé lors du rachat complet de la société éditrice.',
      category: 'premium'
    },
    {
      domain: 'Voice.com',
      price: '30 000 000 $',
      year: '2019',
      buyer: 'Block.one',
      description: 'Vendu cash par MicroStrategy pour lancer une plateforme décentralisée de réseaux sociaux.',
      category: 'premium'
    },
    {
      domain: 'Sex.com',
      price: '13 000 000 $',
      year: '2010',
      buyer: 'Clover Holdings',
      description: 'Revendu plusieurs fois après des batailles judiciaires homériques impliquant des vols de domaine par fax contrefaits.',
      category: 'legal'
    },
    {
      domain: 'Tesla.com',
      price: '11 000 000 $',
      year: '2016',
      buyer: 'Elon Musk (Tesla)',
      description: 'Détenu pendant 24 ans par Stu Grossman, un ingénieur fan de Nikola Tesla. Musk a mis des années à négocier le rachat.',
      category: 'legal'
    }
  ];

  const disputes: DisputeCase[] = [
    {
      domain: 'madonna.com',
      year: '2000',
      conflict: 'Un spéculateur a acheté le domaine et y a placé un portail de divertissement adulte.',
      verdict: 'Victoire de Madonna.',
      winner: 'Madonna Ciccone',
      story: 'Le tribunal international de l\'OMPI a jugé que l\'acheteur n\'avait aucun intérêt légitime dans ce nom et l\'utilisait de mauvaise foi pour attirer les fans de la chanteuse.'
    },
    {
      domain: 'milka.fr',
      year: '2001',
      conflict: 'Une couturière française prénommée Milka Budimir a créé son site professionnel milka.fr.',
      verdict: 'Victoire de Kraft Foods.',
      winner: 'Chocolat Milka',
      story: 'La multinationale a prouvé que la notoriété planétaire de son chocolat rendait l\'usage commercial du prénom préjudiciable, créant un précédent "David contre Goliath" très contesté.'
    },
    {
      domain: 'nissan.com',
      year: '1994 - Présent',
      conflict: 'Uzi Nissan, réparateur d\'ordinateurs, a enregistré son propre nom de famille.',
      verdict: 'Victoire définitive du squatteur.',
      winner: 'Uzi Nissan (Computer)',
      story: 'Uzi Nissan s\'appelait réellement ainsi et exploitait légitimement ses commerces d\'informatique et d\'automobile bien avant la campagne de renommage de la marque Datsun en Nissan.'
    },
    {
      domain: 'france-billet.com',
      year: '1999',
      conflict: 'Un internaute a enregistré le domaine juste avant le lancement de la billetterie par la FNAC.',
      verdict: 'Victoire de la FNAC.',
      winner: 'FNAC / France Billet',
      story: 'L\'intention évidente de revendre le domaine à prix d\'or en l\'absence de toute marque propre du défendeur a permis de prouver la mauvaise foi absolue de l\'enregistrement.'
    }
  ];

  const handleDomainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    playBeep(600, 'triangle', 0.15);
    const domain = simulatedDomainInput.toLowerCase().trim().replace(/\s+/g, '');
    if (!domain) return;

    const domainName = domain.split('.')[0];
    const extension = domain.includes('.') ? domain.split('.').slice(1).join('.') : 'com';
    const cleanDomain = `${domainName}.${extension}`;

    // Simple simulation logic
    if (['google', 'apple', 'nissan', 'microsoft', 'facebook', 'amazon'].includes(domainName)) {
      setSimulatedSearchResult({
        status: 'squatted',
        owner: 'Propriété exclusive de la marque officielle',
        recomm: `Attention ! Déposer ${cleanDomain} sans droit légitime entraînera une plainte UDRP quasi-immédiate de la marque et la perte gratuite du domaine.`
      });
    } else if (['sex', 'cars', 'voice', 'hotel', 'crypto', 'art'].includes(domainName)) {
      setSimulatedSearchResult({
        status: 'premium',
        price: 'Environ 5 000 000 $ - 25 000 000 $',
        owner: 'Spéculateurs de fonds de pension (Domaining)',
        recomm: `Ce mot est un mot générique ultra-prisé du dictionnaire. Pas de risque de cybersquattage légal, mais préparez un compte bancaire bien garni !`
      });
    } else {
      setSimulatedSearchResult({
        status: 'available',
        price: '9.99 $ / an',
        recomm: `Libre ! Enregistrez-le vite pour créer votre site ou votre start-up. C'est l'équivalent de la ruée vers l'or, version civilisée de nos jours.`
      });
    }
  };

  // UI Theme overrides
  const getThemeStyles = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#d4d0c8] text-black border-2 border-white shadow-[1px_1px_0px_white_inset] p-5 font-sans',
          buttonActive: 'bg-[#d4d0c8] font-bold border-2 border-inset border-white px-3 py-1.5 text-xs',
          buttonInactive: 'bg-[#d4d0c8] border-2 border-outset border-white hover:bg-[#c0c0c0] px-3 py-1.5 text-xs text-slate-800',
          badgeRed: 'bg-red-800 text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase',
          badgeGreen: 'bg-green-800 text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase',
          innerBox: 'bg-[#c0c0c0] border-2 border-inset border-white p-4 text-xs text-black shadow-[1px_1px_0px_white_inset]',
          tableHeader: 'bg-[#000080] text-white font-bold p-2 text-xs border border-white',
          tableRow: 'bg-[#d4d0c8] border border-[#808080] text-xs text-black'
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/40 p-5 font-mono text-[#ffb000]',
          buttonActive: 'border border-[#ffb000] text-[#ffb000] bg-[#ffb000]/10 font-bold px-3 py-1.5 text-xs uppercase',
          buttonInactive: 'border border-[#ffb000]/20 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#ffb000]/5 px-3 py-1.5 text-xs uppercase',
          badgeRed: 'border border-red-500 text-red-500 px-2 py-0.5 text-[9px] uppercase font-bold',
          badgeGreen: 'border border-[#ffb000] text-[#ffb000] px-2 py-0.5 text-[9px] uppercase font-bold',
          innerBox: 'bg-black border border-[#ffb000]/15 p-4 text-xs text-[#ffb000]/90 font-mono',
          tableHeader: 'border-b-2 border-[#ffb000] text-[#ffb000] font-bold p-2 text-xs text-left uppercase',
          tableRow: 'border-b border-[#ffb000]/20 text-xs text-[#ffb000]/80 font-mono'
        };
      default: // Modern
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] rounded-xl p-6 text-slate-100 font-sans',
          buttonActive: 'bg-indigo-600/10 border border-indigo-500/50 text-indigo-400 font-bold px-4 py-2 rounded-xl text-xs transition duration-200',
          buttonInactive: 'border border-[#2a2a2e] bg-[#1a1a1e]/40 text-slate-400 hover:text-white hover:bg-[#1a1a1e] px-4 py-2 rounded-xl text-xs transition duration-200 cursor-pointer',
          badgeRed: 'bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md font-mono',
          badgeGreen: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md font-mono',
          innerBox: 'bg-[#09090b]/80 border border-[#2a2a2e] p-5 rounded-xl text-xs text-slate-300 leading-relaxed shadow-inner',
          tableHeader: 'bg-[#141418] text-slate-200 font-semibold p-3 text-xs border-b border-[#2a2a2e] text-left',
          tableRow: 'border-b border-[#202024] hover:bg-[#141418]/50 text-xs text-slate-300'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div className="space-y-6" id="domain-history-main-container">
      
      {/* View Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500 shrink-0" />
          <h2 className={theme === 'terminal' ? 'text-lg font-bold uppercase text-[#ffb000]' : 'text-xl font-bold text-slate-100 font-sans'}>
            L'Achat et la Revente des Noms de Domaine
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Explorez l'épopée spéculative du web : de la ruée vers l'or du <i>Domaining</i> au combat judiciaire du <i>Cybersquattage</i>, sans oublier l'incroyable résistance d'Uzi Nissan.
        </p>
      </div>

      {/* Sub-menu Tabs */}
      <div className="flex gap-1.5 flex-wrap border-b border-[#2a2a2e]/30 pb-3" id="domain-history-sub-tabs">
        <button
          onClick={() => { setActiveSection('intro'); playBeep(350, 'sine', 0.05); }}
          className={activeSection === 'intro' ? style.buttonActive : style.buttonInactive}
        >
          🤠 Le Far West Numérique
        </button>
        <button
          onClick={() => { setActiveSection('domaining'); playBeep(400, 'sine', 0.05); }}
          className={activeSection === 'domaining' ? style.buttonActive : style.buttonInactive}
        >
          💰 Le Domaining
        </button>
        <button
          onClick={() => { setActiveSection('cybersquatting'); playBeep(450, 'sine', 0.05); }}
          className={activeSection === 'cybersquatting' ? style.buttonActive : style.buttonInactive}
        >
          🏴‍☠️ Le Cybersquattage
        </button>
        <button
          onClick={() => { setActiveSection('udrp'); playBeep(500, 'sine', 0.05); }}
          className={activeSection === 'udrp' ? style.buttonActive : style.buttonInactive}
        >
          ⚖️ La Contre-Attaque (UDRP)
        </button>
        <button
          onClick={() => { setActiveSection('uzi_nissan'); playBeep(550, 'sine', 0.05); }}
          className={activeSection === 'uzi_nissan' ? style.buttonActive : style.buttonInactive}
        >
          🚗 L'Affaire Nissan.com
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* 1. INTRO VIEW */}
          {activeSection === 'intro' && (
            <div className={`${style.card} space-y-4`} id="section-intro-domain-names">
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                <div className="flex-1 space-y-3.5">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                    <span>🌾</span> La Ruée vers l'Or des Adresses Internet
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    C'est une facette fascinante et souvent oubliée de l'histoire d'internet. Entre la fin des années 90 et le début des années 2010, le web a connu son <b className="text-indigo-400">Far West numérique</b>. Les noms de domaine étaient l'équivalent des terrains vierges pendant la ruée vers l'or : le premier arrivé plantait son drapeau, et pouvait ensuite revendre ce terrain virtuel pour une fortune.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Cette époque s'est divisée en deux pratiques très distinctes : la spéculation légale (le <b className="text-emerald-400">Domaining</b>) et l'extorsion (le <b className="text-red-400">Cybersquatting</b>), qui a forcé la création d'une justice internationale propre à internet.
                  </p>
                  
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="text-xs block font-bold">Le Saviez-vous ?</strong>
                      <p className="text-[11px] text-slate-350 leading-normal">
                        Jusqu'en 1995, enregistrer un nom de domaine auprès de la NSF (National Science Foundation) était <b>totalement gratuit</b> ! Personne ne mesurait encore la valeur stratégique absolue de ces quelques lettres en ".com".
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Interactive domain name check simulator box */}
                <div className="w-full lg:w-80 p-4 bg-slate-900/60 border border-[#2a2a2e]/60 rounded-xl space-y-4 shadow-inner">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-indigo-500" />
                    Simulateur Whois Retro
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    Entrez un nom de domaine ou un nom de marque pour voir s'il s'agirait de Domaining, de Cybersquattage ou d'un domaine disponible !
                  </p>
                  
                  <form onSubmit={handleDomainCheck} className="flex gap-1.5">
                    <input
                      type="text"
                      value={simulatedDomainInput}
                      onChange={(e) => setSimulatedDomainInput(e.target.value)}
                      placeholder="ex: cars.com ou google.fr"
                      className="bg-slate-950 border border-slate-750/70 text-slate-100 text-xs px-2.5 py-1.5 rounded-lg flex-1 font-mono focus:outline-none focus:border-indigo-500/60"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer transition shrink-0"
                    >
                      Vérifier
                    </button>
                  </form>

                  {/* Simulator outcome info */}
                  {simulatedSearchResult.status !== 'none' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg space-y-2 text-[11px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono">Statut détecté :</span>
                        {simulatedSearchResult.status === 'available' && <span className={style.badgeGreen}>Disponible</span>}
                        {simulatedSearchResult.status === 'premium' && <span className={style.badgeGreen}>Premium Générique</span>}
                        {simulatedSearchResult.status === 'squatted' && <span className={style.badgeRed}>Cybersquattable</span>}
                      </div>

                      {simulatedSearchResult.price && (
                        <div>
                          <span className="text-slate-500 block">Valeur marchande estimée :</span>
                          <span className="text-amber-400 font-bold font-mono text-xs">{simulatedSearchResult.price}</span>
                        </div>
                      )}

                      {simulatedSearchResult.owner && (
                        <div>
                          <span className="text-slate-500 block">Propriétaire typique :</span>
                          <span className="text-indigo-300 font-mono text-[10.5px]">{simulatedSearchResult.owner}</span>
                        </div>
                      )}

                      <p className="text-slate-400 leading-normal text-[10.5px] border-t border-slate-800/80 pt-1.5 mt-1">
                        {simulatedSearchResult.recomm}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. DOMAINING */}
          {activeSection === 'domaining' && (
            <div className={`${style.card} space-y-4`} id="section-domaining">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                1. L'Âge d'Or de la Spéculation (Le Domaining)
              </h3>
              
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Dans les années 2000, certains visionnaires ont compris avant tout le monde que les mots génériques deviendraient les adresses les plus prisées au monde. Ils ont acheté des milliers de noms de domaine pour environ <b className="text-emerald-400">10$ pièce</b>, dans le seul but de les revendre.
              </p>
              
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                C'était <b className="text-emerald-400">parfaitement légal</b>, car personne ne détient les droits d'auteur sur un mot du dictionnaire (ex: "Cars", "Voice", "Sex"). Les transactions ont atteint des montants astronomiques, souvent dans le plus grand secret, car les entreprises voulaient s'assurer un monopole intuitif sur leur secteur.
              </p>

              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold font-mono pt-2">
                🏆 Quelques Ventes Historiques du Web :
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sales.map((sale) => (
                  <div key={sale.domain} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700/80 transition duration-200">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-black text-indigo-400 tracking-wide">{sale.domain}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-xs font-mono font-bold">
                        {sale.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Transaction : <b>{sale.year}</b></span>
                      <span>Acheteur : <b>{sale.buyer}</b></span>
                    </div>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans pt-1 border-t border-slate-800/80">
                      {sale.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`${style.innerBox} border-l-4 border-indigo-500`}>
                <span className="font-extrabold uppercase text-[10px] text-indigo-400 tracking-widest block mb-1">
                  💡 ASTUCE DE RETRO-ÉVALUATION :
                </span>
                <p className="leading-relaxed">
                  Au-delà de la vente, les <i>Domainers</i> gagnaient des millions en attendant un acheteur grâce aux <b>"Pages Parking"</b>. C'étaient des portails vides blindés de liens publicitaires de recherche Google Adsense. Dès qu'un internaute tapait l'URL par erreur dans son navigateur, les clics rapportaient de l'argent de façon 100% passive !
                </p>
              </div>
            </div>
          )}

          {/* 3. CYBERSQUATTING */}
          {activeSection === 'cybersquatting' && (
            <div className={`${style.card} space-y-4`} id="section-cybersquatting">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                2. Le Cybersquattage : La prise d'otage des marques
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    La deuxième facette de ce marché était beaucoup plus sombre et litigieuse. Des petits malins ont commencé à acheter les noms de domaine de marques célèbres, de célébrités ou de multinationales <b className="text-red-400">avant</b> que celles-ci ne comprennent l'importance d'un site web commercial.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Le but ? Attendre que la marque veuille créer son site web officiel, et lui revendre l'adresse correspondante pour des millions de dollars. C'était une véritable <b className="text-red-400">prise d'otage numérique</b> qui parasitait la propriété intellectuelle.
                  </p>
                  
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-red-400 font-sans">Le Fléau du Typosquattage</h4>
                    <p className="text-[11.5px] text-slate-350 leading-relaxed">
                      Variante perfide du cybersquattage, le <b>Typosquattage</b> consistait à acquérir des domaines imitant des fautes de frappe courantes commises par les utilisateurs. Par exemple, acheter <code>gogle.com</code>, <code>facebok.com</code> ou <code>yahoo.com</code>. 
                    </p>
                    <p className="text-[11.5px] text-slate-350 leading-relaxed">
                      L'intérêt était soit de détourner le trafic pour du profit publicitaire, soit de mener des campagnes d'hameçonnage (phishing) extrêmement redoutables en clonant visuellement les sites d'origine.
                    </p>
                  </div>
                </div>

                {/* Illustrated vintage hostage card */}
                <div className="lg:col-span-4 p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono">
                  <div className="text-[11px] text-red-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="animate-pulse">●</span> EXORTION EN LIGNE
                  </div>
                  
                  <div className="bg-black p-3 border border-red-900/40 rounded text-[10px] text-red-400 space-y-2 leading-relaxed">
                    <div>FROM: squatter_pro_99@hotmail.com</div>
                    <div>TO: webmaster@grandemarque.com</div>
                    <div className="border-t border-red-900/30 pt-1.5 mt-1.5 text-slate-300 font-sans">
                      "Bonjour, nous avons acheté <code>grandemarque.com</code> ainsi que <code>grandemarque.net</code>. Notre prix de cession est de <b>150 000 $</b>. Sans réponse sous 48h, nous redirigerons ce trafic vers vos concurrents directs."
                    </div>
                  </div>
                  
                  <span className="text-[9px] text-slate-500 leading-normal block">
                    C'était le scénario cauchemardesque récurrent subi par les directeurs marketing de l'époque, désemparés devant le vide législatif initial.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 4. UDRP */}
          {activeSection === 'udrp' && (
            <div className={`${style.card} space-y-4`} id="section-udrp">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <Scale className="w-5 h-5 text-indigo-400" />
                3. La Contre-Attaque Juridique : L'UDRP
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Face à cette anarchie sans frontières, il fallait un shérif. Les tribunaux traditionnels étaient trop lents et inadaptés (un Américain squattant une marque française via un serveur d'hébergement russe : quelle juridiction s'applique ?).
              </p>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                En 1999, l'<b>ICANN</b> (le régulateur mondial d'internet) a créé une procédure d'arbitrage internationale ultra-rapide et standardisée : l'<b>UDRP</b> (<i>Uniform Domain-Name Dispute-Resolution Policy</i>), souvent gérée sous l'égide de l'<b>OMPI</b> (Organisation Mondiale de la Propriété Intellectuelle).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2 text-center">
                  <div className="w-7 h-7 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xs mx-auto">1</div>
                  <strong className="text-xs text-slate-200 block">Identité ou Confusion</strong>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed">
                    Le nom de domaine litigieux est identique ou prêtant grandement à confusion avec la marque déposée du plaignant.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2 text-center">
                  <div className="w-7 h-7 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xs mx-auto">2</div>
                  <strong className="text-xs text-slate-200 block">Aucun Droit Légitime</strong>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed">
                    Le propriétaire du domaine n'a aucun droit de marque ni aucun intérêt légitime avéré sur ce terme spécifique.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2 text-center">
                  <div className="w-7 h-7 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold text-xs mx-auto">3</div>
                  <strong className="text-xs text-slate-200 block">Mauvaise Foi Prouvée</strong>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed">
                    Le domaine a été enregistré ET est utilisé de mauvaise foi (demande de rançon, blocage d'un concurrent, etc.).
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 italic text-center font-sans">
                ⚠️ Pour qu'une marque récupère un nom de domaine gratuitement, elle doit prouver ces <b>trois conditions cumulatives</b> !
              </p>

              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold font-mono pt-3">
                ⚖️ Les Batailles Juridiques Historiques :
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={style.tableHeader}>Domaine</th>
                      <th className={style.tableHeader}>Le Conflit</th>
                      <th className={style.tableHeader}>Le Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputes.map((d) => (
                      <tr 
                        key={d.domain} 
                        onClick={() => { setSelectedCase(d.domain); playBeep(480, 'sine', 0.08); }}
                        className={`${style.tableRow} cursor-pointer transition ${selectedCase === d.domain ? 'bg-indigo-950/20' : ''}`}
                      >
                        <td className="p-3 font-mono font-bold text-indigo-400">{d.domain}</td>
                        <td className="p-3 text-[11px] leading-relaxed">{d.conflict}</td>
                        <td className="p-3 font-bold text-[11px]">
                          <span className={d.verdict.includes('Victoire de Madonna') || d.verdict.includes('Victoire de la FNAC') || d.verdict.includes('Victoire de Kraft') ? 'text-green-400' : 'text-amber-400'}>
                            {d.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dispute Detail Box */}
              {selectedCase && (
                <div className="p-4 bg-[#141418] border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Détails de la jurisprudence : <b className="text-indigo-400">{selectedCase}</b></span>
                    <span className="text-indigo-400">Année {disputes.find(d => d.domain === selectedCase)?.year}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {disputes.find(d => d.domain === selectedCase)?.story}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 5. UZI NISSAN */}
          {activeSection === 'uzi_nissan' && (
            <div className={`${style.card} space-y-6`} id="section-uzi-nissan-story">
              
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 block">Focus Légendaire</span>
                    <h3 className="text-lg font-black text-slate-100 font-sans flex items-center gap-2">
                      L'Histoire Incroyable de Uzi Nissan
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    C'est probablement l'histoire de "David contre Goliath" la plus célèbre, la plus longue et la plus absurde de l'histoire d'internet.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    L'affaire <code>nissan.com</code> n'est pas une simple histoire de cybersquattage. C'est l'histoire d'un homme qui a refusé de plier face à une multinationale de plusieurs milliards de dollars pour une raison très simple : <b className="text-amber-400">c'était son nom.</b>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Voici comment Uzi Nissan a tenu tête à Nissan Motor Corporation pendant plus de deux décennies.
                  </p>

                  <div className="border-t border-slate-800/80 pt-4 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">📌 Les Origines : Avant que Datsun ne devienne Nissan</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Uzi Nissan est un immigré israélien arrivé aux États-Unis. En 1980, il crée sa première entreprise en Caroline du Nord : <i>Nissan Foreign Car</i>, un garage automobile. En 1989, il se lance dans l'import-export avec <i>Nissan International</i>, puis en 1991, il fonde <b>Nissan Computer Corporation</b>, une entreprise de vente et de réparation d'ordinateurs.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Pendant ce temps, le constructeur automobile japonais Nissan vendait ses voitures aux États-Unis sous la marque <b>Datsun</b>. Ce n'est qu'à la fin des années 1980 que la marque Datsun est progressivement abandonnée au profit de "Nissan" sur le marché américain.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      L'argument d'Uzi était donc implacable : il utilisait son nom de famille pour ses entreprises américaines <i>avant</i> que le constructeur automobile ne l'utilise massivement pour vendre ses voitures aux États-Unis.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">🌐 L'enregistrement du domaine (1994)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      En mai 1994, très tôt dans l'histoire du web commercial, Uzi Nissan enregistre logiquement <code>nissan.com</code> pour son entreprise d'informatique, Nissan Computer. Il enregistre également <code>nissan.net</code> en 1996 pour offrir des services d'accès à internet.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Pendant cinq ans, personne ne s'en soucie. Le constructeur automobile, arrivé en retard sur le web, se contente du domaine <code>nissanmotors.com</code> (et plus tard <code>nissanusa.com</code>).
                    </p>
                  </div>
                </div>

                {/* VISUAL COMPONENT: Retro Simulator Mockup of nissan.com based on the uploaded image */}
                <div className="w-full lg:w-96 shrink-0 bg-[#d4d0c8] text-black border-2 border-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] p-2 font-sans select-none">
                  
                  {/* Browser Bar */}
                  <div className="bg-[#000080] text-white px-2 py-1 font-bold text-xs flex justify-between items-center mb-2">
                    <span>Netscape - [http://www.nissan.com]</span>
                    <div className="flex gap-1">
                      <span className="w-3 h-3 bg-[#c0c0c0] border border-white text-black text-[9px] flex items-center justify-center leading-none">?</span>
                      <span className="w-3 h-3 bg-[#c0c0c0] border border-white text-black text-[9px] flex items-center justify-center leading-none">X</span>
                    </div>
                  </div>

                  {/* Top Bar of Website */}
                  <div className="bg-[#2d5986] text-white py-1.5 text-center font-bold tracking-widest text-[11px] border border-[#808080] flex justify-between items-center px-2">
                    <span className="text-[9px] font-serif font-semibold text-slate-300">NISSAN</span>
                    <span className="text-xs uppercase font-mono tracking-widest font-black">NISSAN.COM</span>
                    <span className="text-[9px] font-serif font-semibold text-slate-300">NISSAN</span>
                  </div>

                  {/* Main retro website mockup stage */}
                  <div className="bg-white p-2 border border-[#808080] space-y-3 text-center mt-1">
                    
                    {/* B"H Hebrew sign */}
                    <div className="text-right text-[10px] text-slate-550 font-serif font-bold pr-2 leading-none">ב"ה</div>

                    {/* Blue Title & Subtitle */}
                    <div className="space-y-1">
                      <h4 className="text-blue-850 font-bold text-[12px] leading-tight hover:underline cursor-pointer">
                        Nissan Motor's Lawsuit Against Us
                      </h4>
                      <p className="text-[9px] font-semibold text-slate-800 leading-tight">
                        It Can Happen To You Or Someone You Know
                      </p>
                    </div>

                    {/* Opinions drop down selector box */}
                    <div className="flex justify-center">
                      <div className="bg-[#d4d0c8] border border-[#808080] px-3 py-1 text-[9px] text-slate-800 flex items-center gap-3">
                        <span>People's Opinions</span>
                        <span className="text-[8px] font-bold">▼</span>
                      </div>
                    </div>

                    {/* Red anti-nissan logos with image */}
                    <div className="grid grid-cols-12 gap-1 items-center py-1">
                      {/* Left logo */}
                      <div className="col-span-2 flex justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-red-650 flex items-center justify-center relative">
                          <span className="text-[#333] font-black text-[6px] tracking-tighter uppercase">NISSAN</span>
                          <div className="absolute w-full h-0.5 bg-red-650 rotate-45" />
                        </div>
                      </div>

                      {/* Center photo reproduction of walking people with custom shirts */}
                      <div className="col-span-8 bg-slate-100 p-1 border border-slate-300">
                        <div className="bg-slate-300 h-28 w-full relative overflow-hidden flex flex-col justify-end text-left p-1">
                          {/* Vector representation of Uzi's friends */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                          <div className="absolute top-1 left-1 bg-slate-900/40 text-[7px] text-white p-0.5 rounded leading-none">
                            North Carolina, USA
                          </div>
                          <div className="z-20 text-[7.5px] text-white leading-normal font-sans font-bold">
                            🚶‍♂️🚶‍♀️ Amis d'Uzi marchant avec des T-Shirts "Anti-Nissan Lawsuit"
                          </div>
                        </div>
                      </div>

                      {/* Right logo */}
                      <div className="col-span-2 flex justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-red-650 flex items-center justify-center relative">
                          <span className="text-[#333] font-black text-[6px] tracking-tighter uppercase">NISSAN</span>
                          <div className="absolute w-full h-0.5 bg-red-650 rotate-45" />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Links and boxes */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                      {/* Navigation buttons */}
                      <div className="col-span-1 space-y-1">
                        <button className="w-full text-center bg-[#004080] hover:bg-[#002b59] text-white text-[8px] py-1 font-bold rounded-lg border border-white shadow">Home</button>
                        <button className="w-full text-center bg-[#004080] hover:bg-[#002b59] text-white text-[8px] py-1 font-bold rounded-lg border border-white shadow">Internet</button>
                        <button className="w-full text-center bg-[#004080] hover:bg-[#002b59] text-white text-[8px] py-1 font-bold rounded-lg border border-white shadow">Services</button>
                        <button className="w-full text-center bg-[#004080] hover:bg-[#002b59] text-white text-[8px] py-1 font-bold rounded-lg border border-white shadow">Contact Us</button>
                        <div className="bg-white border border-[#808080] p-0.5 text-[7px] text-slate-800 flex justify-between items-center mt-2">
                          <span>Site Map</span>
                          <span>▼</span>
                        </div>
                      </div>

                      {/* Center/Right other boxes */}
                      <div className="col-span-2 space-y-1.5 text-center flex flex-col justify-between">
                        <div className="border border-red-500 p-1 text-[7px] text-red-500 font-bold bg-red-50 hover:bg-red-100 cursor-pointer">
                          VIPOLAND.COM 🐹
                        </div>
                        <div className="border border-blue-800 p-1 text-[7.5px] text-blue-900 font-serif leading-none flex items-center justify-center gap-1 bg-blue-50">
                          <span>🌐</span>
                          <b>Public Citizen</b>
                        </div>
                        <div className="text-[7px] text-slate-500 text-left leading-normal italic">
                          "This site is NOT associated with Nissan Motor. It belongs to Nissan Computer Corporation."
                        </div>
                      </div>
                    </div>

                    {/* Selection boxes at footer */}
                    <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-200">
                      <div className="border border-slate-400 p-0.5 text-[7px] text-slate-700 flex justify-between items-center bg-[#d4d0c8]">
                        <span className="truncate">Local Resources</span>
                        <span>▼</span>
                      </div>
                      <div className="border border-slate-400 p-0.5 text-[7px] text-slate-700 flex justify-between items-center bg-[#d4d0c8]">
                        <span className="truncate">National Resources</span>
                        <span>▼</span>
                      </div>
                      <div className="border border-slate-400 p-0.5 text-[7px] text-slate-700 flex justify-between items-center bg-[#d4d0c8]">
                        <span className="truncate">Global Resources</span>
                        <span>▼</span>
                      </div>
                    </div>

                    {/* Bottom footer text */}
                    <div className="flex justify-between items-center text-[7px] text-slate-500 font-mono pt-1">
                      <span>Privacy</span>
                      <span>Copyright © 1994-2022 Nissan.com</span>
                      <span>Mail</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Legal War Timeline */}
              <div className="border-t border-slate-800/80 pt-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  ⚔️ La Chronologie de la Guerre des Tranchées (1999 - 2008)
                </h4>

                <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-5">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="font-mono text-xs font-bold text-red-400">Décembre 1999 : Plainte Initiale</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-0.5">Nissan Motor attaque pour 10 millions de dollars</h5>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans mt-1">
                      Le constructeur automobile japonais réclame la saisie immédiate du nom de domaine ainsi que des dommages pharaoniques, invoquant la dilution et la contrefaçon de sa marque. Uzi refuse de céder sous la menace.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-mono text-xs font-bold text-amber-400">Année 2002 : Premier Jugement</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-0.5">Uzi Nissan n'est pas qualifié de cybersquatteur</h5>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans mt-1">
                      Le tribunal américain reconnaît la bonne foi d'Uzi. Néanmoins, il lui interdit d'héberger des bandeaux publicitaires de pièces automobiles (qui créaient une confusion). Uzi conserve son domaine, mais le constructeur fait appel.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="font-mono text-xs font-bold text-indigo-400">Année 2004 : Confirmation en Cour d'Appel (9e Circuit)</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-0.5">Le droit au nom propre triomphe</h5>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans mt-1">
                      La Cour fédérale confirme que l'usage informatique non commercial de son propre nom de famille par Uzi ne constitue pas une dilution illicite. C'est une immense victoire juridique qui fera date.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs font-bold text-emerald-400">Année 2008 : Épilogue Judiciaire</span>
                    <h5 className="text-xs font-bold text-slate-200 mt-0.5">La Cour Suprême rejette l'ultime appel de Nissan</h5>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans mt-1">
                      Après de multiples tentatives de recours de la part de la multinationale, la Cour Suprême des États-Unis refuse de se saisir du dossier, scellant définitivement la victoire héroïque d'Uzi Nissan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Uzi's Legacy */}
              <div className={`${style.innerBox} bg-[#1a1a24]/40 border-l-4 border-amber-500 space-y-1.5`}>
                <span className="font-extrabold uppercase text-[10px] text-amber-400 tracking-widest block">
                  🕯️ L'Héritage d'Uzi Nissan
                </span>
                <p className="leading-relaxed text-xs">
                  Uzi Nissan a conservé <code>nissan.com</code> jusqu'à la fin de ses jours. Pendant des années, son site est resté figé dans son design rudimentaire des années 90, affichant fièrement les coupures de presse de son triomphe et dénonçant les tactiques d'intimidation corporative. 
                </p>
                <p className="leading-relaxed text-xs">
                  Le coût personnel fut titanesque : Uzi a englouti des centaines de milliers de dollars en frais de justice. Emporté par la COVID-19 en juillet 2020, il laisse derrière lui un site toujours en ligne et un témoignage légendaire : avec de la ténacité et de bons avocats, terrasser un géant mondial de l'automobile pour défendre son propre nom était possible.
                </p>
              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
