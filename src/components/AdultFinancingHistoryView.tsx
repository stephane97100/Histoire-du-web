/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  ShieldCheck, 
  HelpCircle, 
  CreditCard, 
  Building, 
  Ban, 
  History, 
  Lock, 
  FileText,
  AlertTriangle,
  Globe,
  Radio
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface AdultFinancingHistoryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface FinancingMechanism {
  id: string;
  name: string;
  era: string;
  techType: string;
  icon: string;
  explanation: string;
  howItWorked: string[];
  deathReason: string;
}

export default function AdultFinancingHistoryView({ theme }: AdultFinancingHistoryViewProps) {
  const [activeMechId, setActiveMechId] = useState<string>('audiotel');

  const mechanisms: FinancingMechanism[] = [
    {
      id: 'audiotel',
      name: 'Les serveurs Audiotel & Allopass',
      era: '1998 - 2008 (Âge d\'or du micro-paiement)',
      techType: 'Numéros de téléphone surtaxés (0899...)',
      icon: '📞',
      explanation: 'À l\'époque où la majorité des ménages n\'avait pas confiance dans le paiement par carte bancaire sur un Internet encore balbutiant (ou n\'en possédait pas), les éditeurs de contenus payants utilisaient les lignes téléphoniques surtaxées comme intermédiaires de facturation universels.',
      howItWorked: [
        'L\'utilisateur se rendait sur la page d\'accès du site payant d\'époque.',
        'La page lui demandait d\'appeler un numéro surtaxé (comme "08 36..." en France).',
        'Une boîte vocale automatisée lisait à voix haute un code d\'accès à 4 ou 6 caractères après quelques minutes d\'appel facturées par exemple 1,35€ l\'appel ou 0,34€ la minute.',
        'L\'internaute tapait ce code unique temporaire (comme un code Allopass) sur la page internet pour débloquer l\'affichage du contenu pendant une durée limitée (généralement 24 heures).'
      ],
      deathReason: 'La multiplication des forfaits téléphoniques dématérialisés en VOIP avec l\'ADSL et la fibre optique (qui bloquent souvent par défaut les numéros surtaxés hors forfait), l\'apparition de lois européennes strictes encadrant les taux de reversement des micro-paiements, et l\'adoption de paiements tiers simplifiés et sécurisés (PayPal, Stripe) ont abattu ce modèle.'
    },
    {
      id: 'dialer',
      name: 'Les logiciels "Dialers" bas-débit',
      era: '1995 - 2004 (Époque des modems 56k)',
      techType: 'Programmes exécutables d\'appel automatique',
      icon: '💾',
      explanation: 'Le "Dialer" était un programme informatique (.exe) que les sites internet incitaient les visiteurs à télécharger. Une fois exécuté, ce programme prenait le contrôle du modem analogique de l\'ordinateur branché sur la ligne téléphonique de la maison.',
      howItWorked: [
        'Le visiteur cliquait pour accéder à un espace protégé et téléchargeait un petit utilitaire.',
        'Le logiciel coupait silencieusement la connexion internet locale habituelle du fournisseur d\'accès.',
        'Il ordonnait au modem RTC (56k) de composer un numéro de téléphone international surtaxé (souvent logé dans des destinations lointaines comme le Vanuatu, la République démocratique du Congo ou les îles Cook).',
        'L\'utilisateur naviguait sur le site à travers cette ligne dont la minute était parfois facturée de 3€ à 5€ directement reportés sur la facture téléphonique France Télécom des parents.'
      ],
      deathReason: 'Il s\'agissait du goulot technique le plus fragile : l\'avènement de la connexion ADSL haut débit permanente (qui n\'utilise plus les impulsions de numérotation de la ligne téléphonique classique analogique) a rendu physiquement impossible la numérotation d\'un numéro par modem. De plus, les navigateurs modernes et les antivirus bloquent immédiatement l\'exécution automatique de ces fichiers système jugés dangereux.'
    },
    {
      id: 'minitel',
      name: 'Le prélèvement Minitel et Télétel',
      era: '1985 - 2000 (Le précurseur d\'Internet)',
      techType: 'Réseau télématique national',
      icon: '📟',
      explanation: 'Bien avant que le Web ne devienne le standard, la France disposait du Minitel. Les services d\'annuaire et d\'échange payants (les fameux services de messagerie rose) utilisaient le réseau Télétel de France Télécom, dont les terminaux étaient distribués gratuitement.',
      howItWorked: [
        'Les services utilisaient le code d\'accès abrégé "3615" de la ligne de facturation.',
        'Le tarif (facturé par exemple 60 francs de l\'heure) était directement calculé et prélevé par l\'opérateur national sur la facture téléphonique fixe de l\'abonné, sans nécessiter d\'authentification par carte bancaire.',
        'De nombreux éditeurs de sites web ont réinvesti leurs colossaux gains du Minitel dans le développement et l\'achat de serveurs pour le nouveau réseau Internet dans les années 1990.'
      ],
      deathReason: 'Le Minitel a souffert de la fermeture définitive de son réseau le 30 juin 2012. Le public a migré en masse vers les ordinateurs personnels avec des écrans couleur haute définition complexes, rendant le terminal Minitel monochrome noir et blanc désuet.'
    }
  ];

  const activeMech = mechanisms.find(m => m.id === activeMechId) || mechanisms[0];

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
          card: 'bg-[#0a0a0a] border border-[#ffb000]/40 p-5 text-[#ffb000] font-mono rounded-none',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-4 font-mono',
          btnActive: 'border border-[#ffb000] bg-[#ffb000]/15 p-3 text-left w-full text-xs rounded-none text-[#ffb000] font-bold flex items-center justify-between',
          btnInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/50 hover:bg-[#ffb000]/5 p-3 text-left w-full text-xs cursor-pointer rounded-none text-[#ffb000]/70 flex items-center justify-between',
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-755 rounded-xl space-y-4',
          btnActive: 'bg-amber-950/20 border-amber-500/50 text-amber-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
        };
    }
  };

  const css = getThemeClass();

  return (
    <div className="space-y-6" id="adult-finance-root">
      
      {/* Educational safe Disclaimer / Header */}
      <div className={`${theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : theme === 'terminal' ? 'bg-amber-955/10 border border-amber-500/30 text-amber-500 font-mono' : 'bg-gradient-to-r from-amber-955/20 to-slate-900 border border-slate-750/80'} p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-3">
          <Radio className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Histoire du Net : Section "Pour adultes" & Financement Téléphonique</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Comprendre objectivement les ingénieuses et périlleuses architectures de paiement d\'époque.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Sidebar mechanism selector (4 columns) */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            🎛️ Les protocoles monétaires d'époque :
          </span>
          <div className="flex flex-col gap-2">
            {mechanisms.map((mech) => {
              const isActive = mech.id === activeMechId;
              return (
                <button
                  key={mech.id}
                  onClick={() => setActiveMechId(mech.id)}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-mech-${mech.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-lg shrink-0 select-none">{mech.icon}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{mech.name}</b>
                      <span className="text-[9px] opacity-70 font-mono block">
                        Époque : {mech.era}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3 bg-amber-950/5 border border-amber-500/10 text-[10px] text-slate-400 leading-relaxed text-left font-sans">
            <span className="font-extrabold uppercase text-amber-500 flex items-center gap-1 text-[9px] mb-1">
              ⚖️ Portée pédagogique
            </span>
            Cette page s'abstient de toute image ou terme indécent. Elle analyse uniquement la mécanique physique et télécom d'accès payant sécurisé mis en œuvre dans les années pionnières du Web.
          </div>
        </div>

        {/* Informative view details (8 columns) */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {/* Upper line metadata */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/40 pb-3 text-left gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeMech.icon}</span>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-100">{activeMech.name}</h3>
                  <span className="text-[10px] font-mono opacity-70">{activeMech.techType}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded uppercase font-bold">
                {activeMech.era}
              </span>
            </div>

            {/* Inner description text */}
            <div className={css.innerCard}>
              <div className="text-left bg-slate-950/25 p-3.5 rounded-xl border border-slate-850">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block mb-1">
                  🔍 Résumé Historique :
                </span>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activeMech.explanation}
                </p>
              </div>

              {/* Steps diagram */}
              <div className="space-y-2 text-left text-xs pt-1">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase flex items-center gap-1">
                  ⚙️ Le Cheminement Technique d'Accès :
                </span>
                
                <div className="space-y-2">
                  {activeMech.howItWorked.map((step, stepIdx) => (
                    <div 
                      key={stepIdx} 
                      className="p-3 bg-slate-950/40 border border-slate-850/60 rounded-lg flex items-start gap-2.5"
                    >
                      <span className="font-mono text-[10px] bg-slate-800 text-amber-400 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {stepIdx + 1}
                      </span>
                      <p className="text-slate-350 leading-normal text-[11px]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why dead text */}
              <div className="p-3.5 bg-rose-950/5 border border-rose-500/10 rounded-xl text-left text-xs space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-rose-450 uppercase flex items-center gap-1">
                  <Ban className="w-3.5 h-3.5" /> Pourquoi c'est impossible today :
                </span>
                <p className="text-[#fca5a5] leading-relaxed text-[11px]">
                  {activeMech.deathReason}
                </p>
              </div>

            </div>

            {/* General Conclusion box on Adult Web financing history */}
            <div className="p-4 bg-slate-950/45 border border-slate-850 rounded-xl text-left text-xs space-y-2 font-sans leading-relaxed">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-500 flex items-center gap-1">
                🌐 Conclusion : Le Financement d'Internet d'hier à aujourd'hui
              </span>
              <p className="text-slate-350">
                Les sites pour adultes ont historiquement fait figure de laboratoires technologiques cachés pour le web. Nés bien avant les outils de paiement sécurisé actuels, ils ont dû exploiter des systèmes d'accès en s'appuyant sur l'infrastructure du **réseau de téléphonie**. La facturation directe "à la minute" prélevée par l'opérateur téléphonique de ligne offrait un rempart pratique de confidentialité pour l'acheteur ne souhaitant pas laisser de trace écrite directe sur son relevé bancaire de carte de paiement.
              </p>
              <p className="text-slate-350">
                Aujourd'hui, suite au passage général aux liaisons IP numériques, l'imposition de protocoles d'identification stricte par carte de crédit, la mort des connexionsRTC analogiques, et la mise à mort commerciale des serveurs téléphoniques vocaux d'accès ont complètement mis fin aux célèbres intermédiaires de micro-paiement analogiques des années 2000.
              </p>
            </div>

            {/* Share action */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Histoire de Financement`}
                text={`Comprenez l'histoire incroyable mais vraie de comment le téléphone finançait les premiers sites payants du net sur le Musée du Web.`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
