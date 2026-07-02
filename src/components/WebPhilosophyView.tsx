/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  DollarSign, 
  Tv, 
  Frown, 
  ShieldAlert, 
  Terminal, 
  TrendingUp, 
  ShoppingBag, 
  Cpu, 
  Award,
  BookOpen
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface WebPhilosophyViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function WebPhilosophyView({ theme }: WebPhilosophyViewProps) {
  const [activeSegment, setActiveSegment] = useState<'free_ideal' | 'shareware' | 'bankruptcies' | 'ecommerce'>('free_ideal');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Trigger synthesizer audio feedback matching the museum theme
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context blocked by browser autoplay policy
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'ie6':
        return {
          header: 'bg-[#000080] text-white p-3 border-b border-white text-left',
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans rounded-none text-left',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-xs space-y-4 text-black',
          btnActive: 'bg-[#000080] text-white font-bold px-4 py-2 border border-white text-xs rounded-none text-left',
          btnInactive: 'bg-[#c0c0c0] text-black border border-white px-4 py-2 hover:bg-[#d4d0c8] text-xs rounded-none text-left',
          highlight: 'text-blue-900 border-b border-blue-900 font-extrabold',
          quote: 'bg-[#c0c0c0] border-l-4 border-[#000080] p-3 italic text-black font-sans text-xs'
        };
      case 'terminal':
        return {
          header: 'bg-[#ffb000]/15 border border-[#ffb000]/40 text-[#ffb000] p-3 text-left',
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono rounded-none text-left',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-xs space-y-4 font-mono text-[#ffb000]',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/20 px-4 py-2 text-xs text-[#ffb000] font-bold rounded-none text-left',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 px-4 py-2 text-xs text-[#ffb000]/70 rounded-none text-left',
          highlight: 'text-amber-400 font-black underline decoration-amber-400/50',
          quote: 'bg-black border-l-2 border-[#ffb000] p-3 text-[11px] font-mono text-amber-500/90 italic'
        };
      default: // Modern Slate
        return {
          header: 'bg-gradient-to-r from-indigo-955/20 to-slate-900 border border-slate-755 p-5 rounded-2xl shadow-md text-left',
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4 text-left',
          innerCard: 'p-5 bg-slate-900 border border-slate-755 rounded-xl space-y-4 text-slate-350',
          btnActive: 'bg-indigo-600/15 border border-indigo-500/50 text-indigo-400 font-bold px-4 py-2.5 rounded-xl text-left transition text-xs',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border border-slate-850 hover:border-slate-755 text-slate-400 px-4 py-2.5 rounded-xl text-left transition text-xs',
          highlight: 'text-indigo-400 font-semibold',
          quote: 'bg-slate-950/40 p-3.5 border-l-4 border-indigo-500 rounded-lg text-xs italic text-slate-300'
        };
    }
  };

  const css = getThemeStyles();

  return (
    <div className="space-y-6" id="web-philosophy-root">
      
      {/* Page Header */}
      <div className={css.header}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase">
              Courant de Pensée Idéologique
            </span>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 mt-1">
              La Philosophie du Web des Années 2000
            </h2>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed opacity-85 mt-2 max-w-4xl text-left">
          L'avènement du grand public sur internet au tournant du millénaire a suscité des espoirs utopiques de gratuité universelle, de partage désintéressé de logiciels (Shareware) et de systèmes d'exploitation ouverts. Retour sur l'épreuve de la réalité commerciale qui a dicté l'ère moderne du Web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar of Philosophy */}
        <div className="md:col-span-4 space-y-3 text-left">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
            📌 Thèmes philosophiques :
          </span>

          <div className="flex flex-col gap-2">
            {(() => {
              const getGhostCss = (id: string) => {
                const isHovered = hoveredSegment === id;
                const isAnyHovered = hoveredSegment !== null;
                return isAnyHovered && !isHovered
                  ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                  : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";
              };
              
              return (
                <>
                  <button
                    onClick={() => {
                      setActiveSegment('free_ideal');
                      playBeep(400, 'sine');
                    }}
                    onMouseEnter={() => setHoveredSegment('free_ideal')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className={`${activeSegment === 'free_ideal' ? css.btnActive : css.btnInactive} ${getGhostCss('free_ideal')}`}
                    id="philosophie-tab-free"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base">🎈</span>
                      <div>
                        <b className="block text-[11.5px]">L'Idéal du Web Gratuit</b>
                        <span className="text-[9px] opacity-70 block font-mono">Pourquoi le "tout-gratuit" a échoué</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSegment('shareware');
                      playBeep(450, 'sine');
                    }}
                    onMouseEnter={() => setHoveredSegment('shareware')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className={`${activeSegment === 'shareware' ? css.btnActive : css.btnInactive} ${getGhostCss('shareware')}`}
                    id="philosophie-tab-shareware"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base">💾</span>
                      <div>
                        <b className="block text-[11.5px]">Le Déclin des Sharewares</b>
                        <span className="text-[9px] opacity-70 block font-mono">L'âge d'or du logiciel à l'essai</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSegment('bankruptcies');
                      playBeep(500, 'sine');
                    }}
                    onMouseEnter={() => setHoveredSegment('bankruptcies')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className={`${activeSegment === 'bankruptcies' ? css.btnActive : css.btnInactive} ${getGhostCss('bankruptcies')}`}
                    id="philosophie-tab-bankruptcies"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base">📉</span>
                      <div>
                        <b className="block text-[11.5px]">La Faillite des Pionniers</b>
                        <span className="text-[9px] opacity-70 block font-mono">Le cas mythique Mandriva et le naufrage</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSegment('ecommerce');
                      playBeep(550, 'sine');
                    }}
                    onMouseEnter={() => setHoveredSegment('ecommerce')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className={`${activeSegment === 'ecommerce' ? css.btnActive : css.btnInactive} ${getGhostCss('ecommerce')}`}
                    id="philosophie-tab-ecommerce"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base">🛍️</span>
                      <div>
                        <b className="block text-[11.5px]">Le Triomphe du "Web Boutique"</b>
                        <span className="text-[9px] opacity-70 block font-mono">L'inéluctable hégémonie d'Amazon et Shein</span>
                      </div>
                    </div>
                  </button>
                </>
              );
            })()}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-850 text-[10px] text-slate-400 leading-relaxed font-sans mt-4">
            <span className="font-extrabold uppercase text-indigo-400 flex items-center gap-1.5 text-[9px] mb-1">
              💭 Citation d'époque :
            </span>
            <p className="italic">
              "L'information veut être libre. Parce que le coût de sa distribution diminue constamment." — John Perry Barlow, Cybermilitant (1996)
            </p>
          </div>
        </div>

        {/* Content detail panel */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {activeSegment === 'free_ideal' && (
              <div className="space-y-4 text-left" id="segment-free-ideal">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                  <span className="text-xl">🎈</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">L'Idéal du Web "Tout Gratuit" & Son Impossibilité</h3>
                    <span className="text-[9px] font-mono opacity-70 uppercase tracking-wider">La croyance candide des débuts du haut-débit</span>
                  </div>
                </div>

                <div className={css.innerCard}>
                  <p className="leading-relaxed">
                    Au tournant des années 2000, avec l'explosion des raccordements ADSL, une croyance s'est ancrée chez les premiers internautes : <span className={css.highlight}>le Web devait être un espace d'accès gratuit et illimité à toute la connaissance et tous les services humainement possibles.</span> Les créateurs de sites offraient généreusement leur temps et leurs créations par passion pure.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-150 uppercase tracking-tight flex items-center gap-1">
                      💔 Les trois piliers qui ont brisé cette illusion :
                    </h4>
                    
                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-850">
                      <strong className="text-indigo-400 block text-xs">1. L'explosion exponentielle des factures serveurs</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-1">
                        Pour héberger des milliers de fichiers image, MP3, forums dynamiques de tchats ou vidéos sur des architectures mutualisées d'époque, le coût de la bande passante et de la RAM serveur est devenu délirant. La passion d'un particulier ne suffisait plus à financer un site accueillant des dizaines de milliers de visiteurs par jour.
                      </p>
                    </div>

                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-850">
                      <strong className="text-[#ffb000] block text-xs">2. Le mirage inefficace de la publicité display</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-1">
                        Aux débuts du réseau, on pensait que de petites bannières rectangulaires 468x60 payées au millier d'affichages (CPM) suffiraient à financer l'entièreté des coûts. Mais les taux de clics (CTR) se sont effondrés, la valeur des bannières a fondu et le public a commencé à installer massivement des bloqueurs de pubs (Adblock), coupant l'unique apport d'oxygène financier.
                      </p>
                    </div>

                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-850">
                      <strong className="text-emerald-400 block text-xs">3. L'exigence de sécurité et de professionnalisation</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-1">
                        Les sites amateurs souffraient de failles de sécurité béantes (attaques par injection SQL, spams massifs). Pour protéger les bases de données et assurer une haute disponibilité h24, il a fallu embaucher des ingénieurs réseau, poussant les éditeurs à basculer vers des formules payantes (Paywalls, Abonnements, Freemium).
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed italic opacity-85">
                    Le passage du Web 1.0 au Web 2.0 a sonné le glas du bénévolat candide : le stockage d'un contenu toujours plus interactif et lourd réclamait une authentique industrie commerciale pour subsister.
                  </p>
                </div>
              </div>
            )}

            {activeSegment === 'shareware' && (
              <div className="space-y-4 text-left" id="segment-shareware">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                  <span className="text-xl">💾</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Pourquoi le Shareware a Presque Totalement Disparu</h3>
                    <span className="text-[9px] font-mono opacity-70 uppercase tracking-wider">L'ancêtre de l'application freemium à essayer chez soi</span>
                  </div>
                </div>

                <div className={css.innerCard}>
                  <p className="leading-relaxed">
                    Le <span className={css.highlight}>Shareware (ou logiciel partagé)</span> constituait le modèle économique dominant des années 1990 et début 2000. Des logiciels mythiques comme WinRAR, Paint Shop Pro, ou Nero Burning ROM étaient mis à disposition en libre téléchargement. Une fenêtre de rappel (appelée "nag screen") s'affichait au démarrage pour exhorter l'utilisateur à envoyer un chèque pour débloquer la version complète, ou restreignait l'usage à un chronomètre de 30 jours.
                  </p>

                  <div className={css.quote}>
                    "WinRAR est gratuit pendant une période d'essai de 40 jours..." — Un pop-up resté immortel dans l'esprit de millions d'utilisateurs qui l'ont ignoré pendant plus de 15 ans.
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-150 uppercase tracking-tight">
                      ❌ Pourquoi ce modèle n'existe plus sur ordinateur :
                    </h4>
                    
                    <ul className="list-disc pl-4 space-y-2.5 text-[11px] text-slate-350 leading-relaxed">
                      <li>
                        <strong className="text-indigo-400">La naissance des App Stores centralisés :</strong> Microsoft et Apple ont intégré leurs propres boutiques centralisées d'applications. Les transactions se font en un seul clic, remplaçant la laborieuse épreuve d'aller chercher sa clé de licence sur un obscur site web d'époque.
                      </li>
                      <li>
                        <strong className="text-indigo-400">Le cauchemar des virus et faux exécutables :</strong> Télécharger un fichier <code className="bg-slate-950 px-1 py-0.5 rounded font-mono text-purple-400">.exe</code> sur un portail de téléchargement au hasard est devenu un danger d'infection par chevaux de Troie intolérable pour le grand public.
                      </li>
                      <li>
                        <strong className="text-indigo-400">Le basculement vers le SaaS (Cloud / Webapps) :</strong> Aujourd'hui, on ne télécharge plus un logiciel de retouche d'image lourd en shareware : on ouvre Figma ou Canva directement dans son navigateur web.
                      </li>
                    </ul>

                    <div className="mt-3 p-3 bg-indigo-950/15 border border-indigo-550/20 rounded-xl">
                      <strong className="text-emerald-400 block text-xs">🤖 L'exception notable de l'écosystème Android :</strong>
                      <p className="text-[10.5px] text-slate-350 leading-relaxed mt-1">
                        Le modèle du shareware a survécu presque exclusivement sur l'OS mobile Android. Grâce à la liberté d'installer des fichiers <code className="bg-slate-950 px-1 py-0.5 rounded font-mono text-emerald-400">.apk</code> indépendants en dehors de Google Play Store et au tissu de développeurs amateurs diffusant des outils utilitaires très légers, on y retrouve l'esprit originel du petit logiciel fonctionnel financé par des dons en direct ou de petites publicités intégrées !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSegment === 'bankruptcies' && (
              <div className="space-y-4 text-left" id="segment-bankruptcies">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                  <span className="text-xl">📉</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">La Chute des Pionniers du Libre & la Faillite de Mandriva</h3>
                    <span className="text-[9px] font-mono opacity-70 uppercase tracking-wider">Quand l'idéalisme communautaire a heurté le mur de la rentabilité</span>
                  </div>
                </div>

                <div className={css.innerCard}>
                  <p className="leading-relaxed">
                    Le Web des années 2000 a vu s'élever d'extraordinaires projets communautaires construits autour de la gratuité, du partage du savoir et de l'accessibilité logicielle. De nombreuses entreprises ont tenté de créer un modèle financier autour de cela, mais sans filet de sécurité solide, beaucoup ont coulé lors de l'explosion de la bulle des dot-coms ou de l'évolution du marché.
                  </p>

                  <div className="border border-red-500/20 bg-red-955/10 p-3.5 rounded-xl space-y-2">
                    <strong className="text-red-400 text-xs flex items-center gap-1.5 uppercase font-black">
                      🐧 1. Le cas tragique de Mandriva (ex-Mandrake Linux) :
                    </strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Fondée en 1998 par Jean-Albert Le keyboardist et Gaël Duval sous le nom de <b>MandrakeSoft</b>, cette distribution Linux française avait pour but de rendre l'installation de Linux d'une simplicité enfantine pour les particuliers, à une époque où configurer X11 ou un modem ADSL réclamait 15 pages de terminal.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-400 leading-relaxed">
                      <li><b>Le triomphe initial :</b> Mandrake a été élue à plusieurs reprises comme la distribution Linux de bureau la plus populaire au monde, facilitant la vie à des millions de personnes rejetant le monopole de Windows XP.</li>
                      <li><b>Le crash économique :</b> Malgré des abonnements facultatifs de soutien ("MandrakeClub") payés par la communauté, les rentrées financières régulières étaient dérisoires car la majorité préférait télécharger gratuitement l'ISO sur les serveurs FTP d'époque.</li>
                      <li><b>Le déclin et la fermeture :</b> En grande fragilité financière, l'entreprise fusionne avec Conectiva en 2005 pour fonder Mandriva. Mais étranglée par des dettes écrasantes et l'absence de contrats d'envergure face à des rivaux colossaux comme Red Hat soutenus par IBM, Mandriva est liquidée judiciairement en 2015, laissant orpheline une merveille d'ergonomie française.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-150 uppercase tracking-tight">
                      💥 5 Autres Naufrages Emblématiques de la Gratuité et du Mirage "Dot-Com" :
                    </h4>

                    {/* Kozmo.com */}
                    <div className="bg-slate-950/25 p-3.5 rounded-lg border border-slate-850/70 space-y-1">
                      <strong className="text-amber-550 text-xs block">🛒 A. Kozmo.com — Les coursiers de la gratuité absolue à perte (1998 - 2001)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed">
                        Kozmo.com promettait de livrer à votre porte n'importe quel petit achat plaisir (un DVD de location, un paquet de chewing-gum, un soda ou un magazine) <span className="text-slate-200 font-semibold">en moins d'une heure, avec une livraison STRICTEMENT GRATUITE et sans aucun minimum de commande</span>.
                      </p>
                      <p className="text-[10.5px] text-red-400 leading-relaxed italic">
                        Le naufrage financier : Amazon et d'autres investisseurs y injectent plus de 250 millions de dollars. Cependant, payer un coursier équipé d'un vélo ou d'un scooter pour parcourir New York sous la neige afin de livrer un paquet de bonbons à 1,50$ rapportait des marges négatives d'environ -15$ par course. Kozmo a brûlé son capital à une vitesse record avant de fermer brutalement ses portes en avril 2001, licenciant ses 1100 salariés.
                      </p>
                    </div>

                    {/* Pets.com */}
                    <div className="bg-slate-950/25 p-3.5 rounded-lg border border-slate-850/70 space-y-1">
                      <strong className="text-pink-400 text-xs block">🐶 B. Pets.com — Vendre des sacs de litière à perte avec livraison gratuite (1998 - 2000)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed">
                        Devenue l'icône de l'hystérie de la bulle spéculative avec sa célèbre marionnette-mascot (un chien-chaussette apparu au Super Bowl), Pets.com voulait conquérir le marché géant de la nourriture pour animaux en captant les clients grâce à des <span className="text-slate-200 font-semibold">rabais extrêmes et des frais de port gratuits</span>.
                      </p>
                      <p className="text-[10.5px] text-red-400 leading-relaxed italic">
                        Le naufrage financier : Vendre et expédier de lourds sacs de croquettes et de la litière pour chats à bas coût à travers les États-Unis en payant des frais de messagerie onéreux revenait à perdre de l'argent sur chaque commande passée. Plus le site gagnait de clients, plus il s'auto-asphyxiait. Pets.com est passé de son introduction en bourse au dépôt de bilan en seulement 268 jours.
                      </p>
                    </div>

                    {/* Napster */}
                    <div className="bg-slate-950/25 p-3.5 rounded-lg border border-slate-850/70 space-y-1">
                      <strong className="text-sky-450 text-xs block">🎵 C. Napster — L'utopie de la musique illimitée sans modèle de reversement (1999 - 2001)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed">
                        Créé par Shawn Fanning et Sean Parker, Napster a été le premier réseau d'échange Peer-to-Peer de fichiers audio MP3 au monde, accumulant plus de 80 millions d'utilisateurs en phase de croissance maximale, tous conquis par l'idée de télécharger gratuitement n'importe quel album de rock ou de rap.
                      </p>
                      <p className="text-[10.5px] text-red-400 leading-relaxed italic">
                        Le naufrage financier : Reposant sur la violation massive des droits d'auteur sans aucune structure d'abonnement ou de redistribution financière pour les créateurs, Napster a fait l'objet d'un procès historique soutenu par le groupe Metallica et l'industrie du disque (RIAA). Incapable de financer des redevances et bloqué par la justice, le service dépose le bilan en 2002 aprés avoir été contraint d'éteindre ses serveurs.
                      </p>
                    </div>

                    {/* Webvan */}
                    <div className="bg-slate-950/25 p-3.5 rounded-lg border border-slate-850/70 space-y-1">
                      <strong className="text-emerald-450 text-xs block">🥦 D. Webvan — Brûler un milliard pour la livraison gratuite de salades (1996 - 2001)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed">
                        Webvan était le pionnier absolu des supermarchés en ligne à domicile. La start-up a commandé d'immenses entrepôts automatisés de haute technologie pour plus d'un milliard de dollars, promettant de livrer des produits frais à des prix inférieurs aux épiceries physiques, toujours <span className="text-slate-200 font-semibold">sans frais de transport</span> pour habituer les clients à ce nouveau mode de consommation.
                      </p>
                      <p className="text-[10.5px] text-red-400 leading-relaxed italic">
                        Le naufrage financier : Le coût monumental des infrastructures et l'absence de marge sur la livraison à domicile de denrées périssables à l'unité ont épuisé les fonds levés en bourse. L'entreprise fait faillite en juillet 2001, détruisant 2000 emplois et laissant des entrepôts robotisés vides, achetés pour une fraction de leur valeur.
                      </p>
                    </div>

                    {/* Multimania */}
                    <div className="bg-slate-950/25 p-3.5 rounded-lg border border-slate-850/70 space-y-1">
                      <strong className="text-purple-400 text-xs block">🌐 E. Multimania — L'hébergement gratuit étouffé sous les coûts de stockage (1995 - 2002)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed">
                        Le pionnier de l'hébergement de pages web personnelles en France permettait à n'importe quel internaute de créer son site gratuitement (avec un espace disque généreux et des bandeaux publicitaires imposés), se positionnant comme le Geocities français.
                      </p>
                      <p className="text-[10.5px] text-red-400 leading-relaxed italic">
                        Le naufrage financier : L'explosion du nombre d'utilisateurs stockant des images de mauvaise qualité, des scripts instables et du contenu lourd a créé une facture d'infrastructure monstrueuse. Les revenus issus des petites bannières publicitaires d'époque ne couvraient pas 10 % du prix des routeurs et des serveurs requis pour acheminer le trafic. Multimania sera rachetée par Lycos lors de l'éclatement de la bulle pour une valorisation sacrifiée, avant d'être dépouillée et remplacée par des portails payants.
                      </p>
                    </div>
                  </div>

                  <p className="text-[11.5px] leading-relaxed">
                    Cette tragédie s'est répétée chez des centaines de pionniers des années 2000. <span className={css.highlight}>L'illusion que les dons, les goodies ou les abonnements communautaires bénis pouvaient payer des dizaines de salaires d'ingénieurs à plein temps s'est brisée contre l'implacable dureté des comptes de résultats.</span>
                  </p>
                </div>
              </div>
            )}

            {activeSegment === 'ecommerce' && (
              <div className="space-y-4 text-left" id="segment-ecommerce">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                  <span className="text-xl">🛍️</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Le Triomphe du "Web Boutique" Transactionnel</h3>
                    <span className="text-[9px] font-mono opacity-70 uppercase tracking-wider">Pourquoi Amazon, Shein et Temu ont capturé l'attention et la valeur</span>
                  </div>
                </div>

                <div className={css.innerCard}>
                  <p className="leading-relaxed">
                    Pendant que les pionniers de l'information en ligne cherchaient vainement à monétiser l'attention par des clics publicitaires à 0,01€, des marchands ont compris que le salut financier résidait exclusivement dans le <span className={css.highlight}>commerce de flux matériels sécurisé par carte bancaire.</span>
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-150 uppercase tracking-tight flex items-center gap-1.5">
                      🏆 Pourquoi le commerce de marchandises physiques a remporté la partie :
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10.5px]">
                      <div className="p-3 bg-slate-950/20 border border-slate-850 rounded-lg">
                        <strong className="text-indigo-400 block mb-1">📦 1) La valeur perçue du réel</strong>
                        <p className="text-slate-400 leading-relaxed">
                          L'être humain rechigne à payer pour lire un article de presse ou écouter un fichier MP3 dématérialisé (qu'il se représentait instinctivement gratuit). En revanche, il paie instantanément et sans négocier pour un objet en plastique, des vêtements ou de l'électronique qu'il va recevoir en mains propres à sa porte.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950/20 border border-slate-850 rounded-lg">
                        <strong className="text-emerald-400 block mb-1">💳 2) Le sentiment de confiance (SSL & HTTPS)</strong>
                        <p className="text-slate-400 leading-relaxed">
                          La standardisation du chiffrement SSL de sécurité a débloqué le verrou de la peur du piratage de carte bancaire. Les gens ont cessé d'éviter l'acte d'achat en ligne pour en faire un automatisme compulsif d'un clic.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-850">
                      <strong className="text-[#ffb000] block text-xs">📈 La bascule de l'optimisation logistique : Du Webmaster au Géant de l'Entrepôt</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-1">
                        Des entreprises comme Amazon ont conçu le Web non pas comme une fin d'édition, mais comme une simple interface d'acquisition. Le coeur de leur métier n'était pas le code source d'origine, mais l'optimisation des centres de tri logistiques routiers, la compression des délais d'acheminement (Amazon Prime) et la modélisation à grande échelle du transport douanier.
                      </p>
                    </div>

                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-850">
                      <strong className="text-red-400 block text-xs">💥 L'ultra-fast-fashion algorithmique (Shein & Temu)</strong>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-1">
                        Le Web commercial contemporain s'est radicalisé. Shein ou Temu ne se contentent plus de vendre, ils s'appuient sur l'analyse prédictive algorithmique pour capter les tendances des réseaux sociaux (TikTok) en temps réel, lançant instantanément des usines chinoises à la production de vêtements ultra-bas de gamme expédiés via des liaisons cargo prioritaires, reléguant le vieux web informatif et encyclopédique de nos débuts au rang de lointain souvenir nostalgique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel footer Share option */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Philosophie des Années 2000 : ${activeSegment}`}
                text={`Découvrez l'analyse historique de la philosophie économique du Web des années 2000 sur le Musée du Web !`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
