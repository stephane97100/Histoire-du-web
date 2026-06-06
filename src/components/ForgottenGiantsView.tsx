/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  History, 
  HelpCircle, 
  HeartCrack, 
  Globe, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface ForgottenGiantsViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface GiantWebsite {
  id: string;
  name: string;
  urlLabel: string;
  launchYear: string;
  deathYear: string;
  icon: string;
  tagline: string;
  history: string;
  whyItSucceeded: string;
  whyItDisappeared: string;
  nostalgiaNote: string;
}

export default function ForgottenGiantsView({ theme }: ForgottenGiantsViewProps) {
  const [activeGiantId, setActiveGiantId] = useState<string>('siteduzero');

  const giants: GiantWebsite[] = [
    {
      id: 'siteduzero',
      name: 'Le Site du Zéro',
      urlLabel: 'www.siteduzero.com',
      launchYear: '1999',
      deathYear: '2013 (pivote en OpenClassrooms)',
      icon: '🎓',
      tagline: 'Le temple absolu de l\'apprentissage informatique de toute une génération de développeurs francophones.',
      history: 'Créé en 1999 par Mathieu Nebra (alors âgé de 13 ans) sous forme de simple page HTML pour expliquer comment coder à ses amis. Le site adopte pour mascotte le fameux petit extraterrestre "Zozor". Il devient le site de référence d\'apprentissage de la programmation en France avec des cours rédigés sur un ton convivial, simple et très pédagogue.',
      whyItSucceeded: 'Son génie résidait dans l\'humilité de son slogan : "Le site pour les Zéros". Les tutoriels partaient du principe que le lecteur n\'avait aucune connaissance préalable. L\'approche extrêmement progressive, l\'absence de jargon académique lourd, l\'interactivité de son forum d\'aide et la possibilité pour n\'importe quel membre de rédiger et soumettre son propre cours de qualité ont créé une communauté dévouée de centaines de milliers de membres.',
      whyItDisappeared: 'Le succès grandissant a poussé ses créateurs à structurer l\'entreprise. En 2013, le "Site du Zéro" fait face à un virage économique majeur : il abandonne son nom d\'origine, son esprit amateur chaleureux et sa mascotte légendaire Zozor pour devenir "OpenClassrooms". Le modèle s\'est transformé d\'une place d\'apprentissage ouverte gratuite en une plateforme commerciale de formation professionnelle certifiante par abonnement payant, laissant les nostalgiques orphelins de l\'esprit communautaire d\'époque.',
      nostalgiaNote: 'Les fameux tutoriels "Concevez votre site web avec PHP et MySQL" ou "Apprenez à programmer en C" imprimés au format poche par l\'éditeur du Site du Zéro trônaient sur les bureaux de presque tous les étudiants en informatique des années 2000.'
    },
    {
      id: 'allhtml',
      name: 'AllHTML',
      urlLabel: 'www.allhtml.com',
      launchYear: '1998',
      deathYear: '2009 (Déclin progressif)',
      icon: '📂',
      tagline: 'La boîte à outils et le dictionnaire de référence des premiers "Webmasters".',
      history: 'AllHTML est né à la fin de l\'année 1998 pour fournir aux pionniers de la conception de sites web des tutoriels complets, des fiches techniques pour toutes les balises HTML, les propriétés CSS naissantes et le codage de CGI scripts en Perl.',
      whyItSucceeded: 'Le site offrait des générateurs automatiques révolutionnaires d\'époque : vous cliquiez pour composer votre menu déroulant en JS, générer vos balises meta-tags SEO pour AltaVista, ou obtenir le code d\'une alerte de bienvenue. Ses guides de dépannage pour contourner les bugs d\'affichage d\'Internet Explorer 5.x sauvaient des vies. Les forums d\'AllHTML foisonnaient de webmasters amateurs qui s\'entraidaient pour le CHMOD de leurs fichiers FTP.',
      whyItDisappeared: 'AllHTML a manqué le virage technologique majeur de la fin des années 2005-2010 (le passage à l\'HTML5, l\'essor du responsive design et des frameworks JS modernes). Le design du site est resté figé dans l\'esthétique table-grid des années 2000. Face à l\'émergence de plateformes globales ultra-complètes, fiables et mises à jour comme le MDN (Mozilla Developer Network) ou de forums universels comme StackOverflow, AllHTML a été déserté puis abandonné.',
      nostalgiaNote: 'Le compteur de connexions à l\'entrée d\'AllHTML affichait fièrement plus de 20 millions de visites au début de la décennie.'
    },
    {
      id: 'caramail',
      name: 'Caramail',
      urlLabel: 'www.caramail.com',
      launchYear: '1997',
      deathYear: '25 Février 2009',
      icon: '📬',
      tagline: 'La plus mythique messagerie et tchat du web francophone des années 56k.',
      history: 'Lancé en 1997 par les fondateurs de l\'annuaire "Lokace", Caramail s\'impose immédiatement comme l\'outil d\'échange incontournable de France et de Navarre. En plus de sa boîte aux lettres électronique, il intègre un chat interactif basé sur une applet Java.',
      whyItSucceeded: 'C\'était l\'époque de l\'ouverture des premières connexions Internet familiales. Caramail offrait un webmail gratuit d\'une rapidité impressionnante avec un nom de domaine cool, mais c\'est surtout son espace de chat thématique (par régions, par âges, salon "Célibataires") qui a déchaîné les passions. Des millions d\'adolescents couraient allumer l\'ordinateur après les cours pour retrouver leurs amis virtuels et s\'échanger des messages colorés.',
      whyItDisappeared: 'Racheté par le suédois Spray en 2000 juste avant l\'explosion de la bulle Internet, Caramail est intégré ensuite à Lycos France. Les multiples refontes graphiques ratées, les lenteurs intolérables des nouveaux serveurs d\'hébergement de Lycos, l\'inondation massive des boîtes de réception par du spam non filtré et, plus que tout, la concurrence féroce de MSN Messenger puis de Facebook ont provoqué sa désertion complète jusqu\'à l\'arrêt définitif de sa structure en 2009.',
      nostalgiaNote: 'Le panneau d\'accueil de Caramail indiquait en temps réel le nombre exact de connectés. À 19 heures, le chiffre frisait les 50 000 utilisateurs simultanés, ralentissant considérablement la ligne téléphonique bas débit du domicile.'
    },
    {
      id: 'lycos',
      name: 'Lycos (Hébergement Multimania)',
      urlLabel: 'www.lycos.fr / multimania.fr',
      launchYear: '1994',
      deathYear: '2010 (Déclassement commercial)',
      icon: '🐕',
      tagline: '"Lycos, va chercher !" — Le premier grand portail d\'annuaire et d\'hébergement personnel gratuit.',
      history: 'Né comme moteur de recherche à l\'université Carnegie-Mellon, Lycos devient une success-story planétaire à la fin des années 90, débarquant en France avec sa mascotte : un chien labrador retriever noir bondissant chargé de trouver les sites internet à la vitesse de l\'éclair.',
      whyItSucceeded: 'En rachetant Multimania (l\'hébergeur web gratuit d\'époque phare de la jeunesse française) et en l\'intégrant à son portail, Lycos est devenu le site d\'accueil de millions de créateurs amateurs. On y créait des pages perso sur son groupe de musique favori, sur sa collection de cartes, ou ses carnets de vacances. Le fait d\'avoir 50 Mo d\'espace disque gratuit et un client FTP accessible sans débourser un centime était d\'une liberté totale.',
      whyItDisappeared: 'La cause principale de son trépas commercial est double : d\'une part, Lycos a été terrassé sur le plan de la recherche par Google, dont l\'algorithme automatisé PageRank renvoyait des résultats bien plus qualitatifs qu\'un annuaire manuel encombré de pubs. D\'autre part, le modèle financier de l\'hébergement gratuit financé par de lourdes fenêtres "pop-ups" agressives s\'est effondré avec l\'intégration de bloqueurs de pub dans Firefox, rendant les serveurs de Multimania trop coûteux à entretenir pour un trafic en chute libre.',
      nostalgiaNote: 'La pub télévisée du labrador noir courant dans un décor technologique en 3D d\'époque est restée une des plus célèbres images médiatiques de la démocratisation d\'Internet.'
    },
    {
      id: 'voila',
      name: 'Voilà (Portail France Télécom)',
      urlLabel: 'www.voila.fr',
      launchYear: '1998',
      deathYear: '2015 (Service mail fermé)',
      icon: '🟠',
      tagline: 'L\'ancienne page d\'accueil obligatoire de millions d\'internautes abonnés à Wanadoo.',
      history: 'Lancé en 1998 par France Télécom pour contrer Yahoo, Voilà s\'impose rapidement en France grâce à une mise en avant automatique systématique sur tous les navigateurs configurés lors de l\'installation des kits de connexion CD-ROM Wanadoo.',
      whyItSucceeded: 'C\'était l\'époque de l\'annuaire thématique intelligent et du guide des sorties de proximité. En proposant des comptes de courrier électronique gratuits simples, un annuaire papier-web combiné, des forums locaux et une section météo de premier plan, Voilà a consolidé le trafic de millions d\'utilisateurs néophytes souscrivant à des forfaits d\'accès fixes France Télécom d\'époque.',
      whyItDisappeared: 'Victime du repositionnement de marque stratégique global de France Télécom vers l\'entité unique "Orange" en 2006. Son moteur de recherche a été abandonné au strict profit d\'un partenariat avec Google. Les comptes de messagerie "@voila.fr" ont survécu en mort cérébrale avec un webmail obsolète avant qu\'Orange ne prenne la décision unilatérale de sabrer définitivement la messagerie de Voilà en 2015, contraignant ses derniers abonnés fidèles à migrer.',
      nostalgiaNote: 'Les adresses mails Voilà étaient particulièrement recherchées car courtes et simples, parfaites pour les premiers CV rédigés au tournant du millénaire.'
    },
    {
      id: 'altavista',
      name: 'AltaVista',
      urlLabel: 'www.altavista.com',
      launchYear: '1995',
      deathYear: '2013 (Fermé par Yahoo!)',
      icon: '🔎',
      tagline: 'Le premier moteur de recherche à indexer le Web de manière complète, rapide et robotisée.',
      history: 'Conçu en 1995 par les chercheurs de l\'entreprise Digital Equipment Corporation (DEC), AltaVista a révolutionné la recherche d\'information par sa puissance de calcul. C\'était le premier engin à utiliser un robot d\'indexation automatisé ultra-rapide (baptisé "Scooter") capable d\'explorer l\'intégralité des serveurs Web et de stocker des dizaines de millions de pages web dans de supercalculateurs Alpha de 64 bits. Il proposait également Babel Fish, le tout premier traducteur en ligne instantané de l\'Histoire du web.',
      whyItSucceeded: 'Avant AltaVista, chercher un site internet sur la Toile se limitait à parcourir manuellement de lents annuaires hiérarchiques construits à la main par des équipes de documentalistes humains (dont Yahoo et Lycos étaient les hérauts). AltaVista a apporté une liberté totale : d\'un simple mot-clé saisi, on interrogeait instantanément la totalité des pages web existantes. Sa vitesse d\'exécution inégalée et son indexation chirurgicale en ont fait le moteur indispensable de 1996 à 1999, représentant le cœur de la navigation.',
      whyItDisappeared: 'Après des rachats chaotiques successifs de DEC par Compaq, puis par CMGI, de lourdes erreurs de stratégie commerciale ont été commises. Ses dirigeants ont refusé de voir que la force d\'AltaVista était son moteur épuré : ils ont cherché à imiter Yahoo! en le transformant en un portail fourre-tout gigantesque, obèse, encombré de bannières publicitaires criardes, de météo locale et de widgets superflus. Lorsque Google est apparu en 1998, débarrassé de fioritures publicitaires avec un algorithme PageRank centré sur la pertinence des liens, le public a fui AltaVista. Racheté par son rival historique Yahoo! en 2003, il a végété avant de s\'éteindre définitivement en 2013.',
      nostalgiaNote: 'C\'est sur AltaVista que toute une génération d\'internautes a forgé ses premières expériences de requêtes complexes en utilisant des opérateurs logiques booléens (AND, OR, NOT).'
    },
    {
      id: 'geocities',
      name: 'GeoCities',
      urlLabel: 'www.geocities.com',
      launchYear: '1994',
      deathYear: '2009 (Supprimé par Yahoo!)',
      icon: '🏠',
      tagline: 'Le pionnier absolu des pages personnelles libres structurées en quartiers thématiques virtuels.',
      history: 'Lancé en 1994 sous le nom initial de "Beverly Hills Internet", GeoCities fut le point d\'ancrage de la culture amateur du Web. Son concept fondateur était novateur : offrir à n\'importe quel citoyen du réseau un hébergement gratuit pour héberger sa propre page web, en s\'organisant au sein de "quartiers thématiques" géographiques fictifs : "SiliconValley" pour le codage et le hardware, "Area51" pour le paranormal et l\'espace, "Colosseum" pour les exploits sportifs, ou "Broadway" pour le théâtre.',
      whyItSucceeded: 'GeoCities a libéré l\'expression individuelle des internautes à une époque où écrire du code exigeait de posséder un hébergeur payant chez son fournisseur d\'accès. Grâce à des outils conviviaux de mise en page en ligne, des millions d\'utilisateurs ont créé des pages dédiées à leurs passions, leurs familles ou leurs animaux. Ce foisonnement créatif a rassemblé la plus colossale bibliothèque culturelle populaire d\'époque, atteignant la 3ème place des sites les plus visités du réseau à la fin des années 1990.',
      whyItDisappeared: 'Acheté par Yahoo! au pinacle de la bulle spéculative technologique de 1999 pour l\'équivalent colossal de 3,6 milliards de dollars, GeoCities fut victime d\'une gestion commerciale délétère. Yahoo! s\'est contenté d\'insérer des publicités agressives en format d\'iframe, n\'a jamais développé d\'hébergement ou d\'éditeurs modernisés et a limité l\'espace disque en interdisant les scripts. Face au boom des plateformes simplifiées de blogs (Blogger, Skyblog) et de réseaux structurés (Facebook, MySpace), les utilisateurs ont abandonné GeoCities, qui fut fermé sans ménagement par Yahoo! en 2009, rayant de la carte des millions de pages historiques sans option de sauvegarde nationale.',
      nostalgiaNote: 'L\'esthétique folklorique de GeoCities est entrée dans l\'histoire : arrière-plans étoilés tapageurs, polices de couleur jaune clignotantes, fichiers audio MIDI en lecture automatique, et le fameux panneau animé d\'avertissement "En Construction" flanqué de barrières de chantier.'
    },
    {
      id: 'myspace',
      name: 'MySpace',
      urlLabel: 'www.myspace.com',
      launchYear: '2003',
      deathYear: 'Déclin mondial vers 2008 (Toujours actif mais dépeuplé)',
      icon: '🎵',
      tagline: 'L\'éveil des réseaux sociaux musicaux et la liberté d\'injecter sa propre identité esthétique.',
      history: 'Conçu en 2003 par Chris DeWolfe et Tom Anderson, MySpace a été le premier réseau social d\'envergure planétaire de l\'histoire. Il offrait un espace personnel modulable où l\'abonné présentait sa galerie de clichés photographiques, son cercle de relations à travers un classement stratégique (le Top 8 invisible), un lecteur audio de titres mp3 et, de façon révolutionnaire, un accès direct pour altérer le code HTML/CSS brut de sa page.',
      whyItSucceeded: 'Son extraordinaire impact venait d\'un sentiment d\'autonomie créative absolue. L\'utilisateur pouvait injecter des styles personnalisés pour transformer un profil en une oeuvre gothique, futuriste ou colorée. MySpace est ainsi devenu le berceau d\'une immense sous-culture musicale (indie rock, emo, punk), propulsant de jeunes artistes à l\'image de Lily Allen, Calvin Harris ou Arctic Monkeys de l\'anonymat total vers les charts mondiaux.',
      whyItDisappeared: 'L\'absence de charte d\'homogénéité a causé son effondrement face à l\'arrivée irrésistible de Facebook à partir de 2007. Au fil du temps, MySpace est devenu un nid de profils au codage chaotique, lents à charger en raison de l\'abondance de lecteurs vidéos, de scripts cassés et de spams publicitaires introduits par ses nouveaux actionnaires (News Corp). De son côté, Facebook proposait une expérience propre, minimaliste, uniforme, rapide et un ingénieux Fil d\'Actualité unifié. Fatigués par les lags, l\'intégralité des usagers ont déserté MySpace pour Facebook.',
      nostalgiaNote: 'La première relation d\'amitié automatique instaurée lors de l\'inscription sur MySpace était de manière culte un certain "Tom", le co-fondateur Tom Anderson, immortalisé par son portrait mythique devant un tableau blanc.'
    }
  ];

  const activeGiant = giants.find(g => g.id === activeGiantId) || giants[0];

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
          btnActive: 'bg-rose-950/20 border-rose-500/50 text-rose-400 font-semibold p-4 rounded-xl flex items-center justify-between text-xs transition border text-left w-full',
          btnInactive: 'bg-[#0c0c0e] hover:bg-[#111115] border-slate-850 hover:border-slate-755 text-slate-350 p-4 rounded-xl flex items-center justify-between text-xs transition cursor-pointer border text-left w-full',
        };
    }
  };

  const css = getThemeClass();

  return (
    <div className="space-y-6" id="forgotten-giants-root">
      
      {/* Banner Intro */}
      <div className={`${theme === 'ie6' ? 'bg-[#c0c0c0] text-[#000080] border-2 border-white' : theme === 'terminal' ? 'bg-red-950/10 border border-red-500/30 text-rose-500 font-mono' : 'bg-gradient-to-r from-rose-955/25 to-slate-900 border border-slate-750/80'} p-4 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 text-left`}>
        <div className="flex items-center gap-2">
          <HeartCrack className="w-5 h-5 text-rose-500 animate-pulse shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">Ça n'existe plus — Les Anciens Géants défunts du Web</h2>
            <p className="text-[10px] opacity-75 mt-0.5">La nostalgie des sites internet de premiers plans qui ont régné avant de s'éteindre.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Sidebar Grid Selector */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
            💾 L'époque nostalgique d'or :
          </span>
          <div className="flex flex-col gap-2">
            {giants.map((giant) => {
              const isActive = giant.id === activeGiantId;
              return (
                <button
                  key={giant.id}
                  onClick={() => setActiveGiantId(giant.id)}
                  className={isActive ? css.btnActive : css.btnInactive}
                  id={`btn-giant-${giant.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-lg shrink-0 select-none">{giant.icon}</span>
                    <div className="text-left truncate">
                      <b className="block text-[11px] font-bold tracking-tight">{giant.name}</b>
                      <span className="text-[9px] opacity-70 font-mono block">
                        {giant.urlLabel}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'translate-x-1 text-rose-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-3 bg-rose-950/5 border border-rose-500/10 text-[10px] text-slate-400 leading-relaxed text-left font-sans">
            <span className="font-extrabold uppercase text-rose-400 flex items-center gap-1 text-[9px] mb-1">
              ⚠️ Devoir de mémoire
            </span>
            La disparition de ces monuments du web francophone est la preuve que de parfaits géants d'époque peuvent couler s'ils ne se conforment pas immédiatement aux évolutions ergonomiques des internautes.
          </div>
        </div>

        {/* Central Card Exposition Sheet */}
        <div className="md:col-span-8">
          <div className={css.card}>
            
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/40 pb-3 text-left gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{activeGiant.icon}</span>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-100">{activeGiant.name}</h3>
                  <span className="text-[10px] font-mono opacity-70">{activeGiant.urlLabel}</span>
                </div>
              </div>
              <span className="text-[10.5px] font-mono bg-rose-500/15 border border-rose-500/30 text-rose-400 px-2.5 py-0.5 rounded uppercase font-bold">
                Activité : {activeGiant.launchYear} ➔ {activeGiant.deathYear}
              </span>
            </div>

            {/* Inner description text */}
            <div className={css.innerCard}>
              <div className="text-left italic border-l-2 border-rose-500/60 pl-3 text-xs text-slate-300">
                "{activeGiant.tagline}"
              </div>

              {/* Story */}
              <div className="space-y-1 text-left text-xs pt-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
                  📚 L'Histoire &amp; La Genèse :
                </span>
                <p className="leading-relaxed text-slate-350">
                  {activeGiant.history}
                </p>
              </div>

              {/* Success reason */}
              <div className="space-y-1 text-left text-xs bg-slate-950/35 p-3.5 rounded-xl border border-slate-850">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                  👑 Pourquoi cela a fonctionné si magnifiquement :
                </span>
                <p className="leading-relaxed text-slate-300">
                  {activeGiant.whyItSucceeded}
                </p>
              </div>

              {/* Loss reason */}
              <div className="space-y-1 text-left text-xs bg-rose-950/5 p-3.5 rounded-xl border border-rose-500/10">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block mb-1">
                  💔 Pourquoi cela a disparu ou pivoté :
                </span>
                <p className="leading-relaxed text-[#fca5a5]">
                  {activeGiant.whyItDisappeared}
                </p>
              </div>

              {/* Anecdote */}
              <div className="p-3 bg-amber-950/10 border border-amber-900/30 rounded-lg text-left text-xs">
                <strong className="block text-[10px] uppercase font-mono text-amber-500 mb-1">💡 La Note de Nostalgie d'Époque :</strong>
                <p className="text-slate-300 leading-normal">
                  {activeGiant.nostalgiaNote}
                </p>
              </div>

            </div>

            {/* Share action */}
            <div className="pt-2 border-t border-slate-800/40 select-none">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Souvenir de ${activeGiant.name}`}
                text={`Ressentez la nostalgie du Web d'époque : revivez l'histoire, le succès et la disparition de ${activeGiant.name} sur le Musée du Web !`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
