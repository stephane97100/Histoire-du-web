import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Users, BookOpen, Heart, ExternalLink, MessageSquare, Code2, Sparkles } from 'lucide-react';
import GlossaryTooltip from './GlossaryTooltip';

interface ResistorSite {
  id: string;
  name: string;
  category: 'forum' | 'knowledge' | 'relic';
  launchYear: number;
  url: string;
  avatarText: string;
  description: string;
  survivalSecret: string;
  techStackCommentary: string;
  badgeColor: string;
}

const RESISTOR_SITES: ResistorSite[] = [
  {
    id: 'wikipedia',
    name: 'Wikipédia',
    category: 'knowledge',
    launchYear: 2001,
    url: 'https://wikipedia.org',
    avatarText: 'W',
    description: 'Le plus grand monument du savoir universel libre. Créé en 2001, Wikipédia est resté fidèle à sa philosophie originelle : pas de publicité, pas de traqueurs invasifs, pas d\'algorithmes de recommandation addictifs.',
    survivalSecret: 'Une gouvernance associative à but non lucratif (Wikimedia Foundation) et une communauté mondiale de modérateurs bénévoles passionnés.',
    techStackCommentary: 'Utilise le moteur MediaWiki (PHP/MySQL) avec un rendu HTML hautement optimisé et sémantique, privilégiant l\'accessibilité universelle et la légèreté sur toutes les connexions du globe.',
    badgeColor: 'bg-slate-700 text-slate-100'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'forum',
    launchYear: 2005,
    url: 'https://reddit.com',
    avatarText: 'R',
    description: 'La "page d\'accueil d\'Internet". reddit a succédé aux newsgroups Usenet et aux forums phpBB des années 90 en centralisant l\'ensemble des communautés mondiales autour du texte et du vote démocratique des utilisateurs.',
    survivalSecret: 'L\'auto-modération stricte par les utilisateurs de chaque "subreddit" et l\'importance cruciale donnée au contenu textuel brut plutôt qu\'au narcissisme visuel.',
    techStackCommentary: 'Bien que modernisé en React, son architecture d\'indexation de fils de discussion et d\'arborescences de réponses est l\'héritière directe du Web sémantique et textuel.',
    badgeColor: 'bg-orange-600 text-white'
  },
  {
    id: 'openclassrooms',
    name: 'OpenClassrooms (ex-Site du Zéro)',
    category: 'knowledge',
    launchYear: 1999,
    url: 'https://openclassrooms.com',
    avatarText: 'OC',
    description: 'Né en 1999 sous la plume de Mathieu Nebra (alors âgé de 13 ans) pour expliquer le HTML de façon ultra-simplifiée aux débutants ("le Site du Zéro"). Il a traversé toutes les bulles Internet pour devenir le leader européen de la formation diplômante.',
    survivalSecret: 'Une pédagogie axée sur la clarté absolue, la bienveillance communautaire et une adaptation constante aux besoins du marché de l\'emploi.',
    techStackCommentary: 'Passé d\'un simple site dynamique PHP fait maison à une plateforme éducative moderne, tout en conservant son ADN d\'accessibilité didactique au code.',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'grafikart',
    name: 'Grafikart',
    category: 'knowledge',
    launchYear: 2009,
    url: 'https://grafikart.fr/',
    avatarText: 'GK',
    description: 'Le pilier de la formation vidéo francophone pour les développeurs web. Créé par Jonathan Boyer, ce site indépendant a formé des générations de développeurs de façon souveraine et passionnée.',
    survivalSecret: 'Une production constante de tutoriels de haute qualité technique et une indépendance absolue face aux plateformes centralisées.',
    techStackCommentary: 'Un site web d\'une fluidité exemplaire développé sous PHP (framework Symfony) et modernisé avec soin, prouvant qu\'un bon serveur et du code propre valent mieux que l\'over-engineering.',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'developpez',
    name: 'Developpez.com',
    category: 'forum',
    launchYear: 1998,
    url: 'https://developpez.com',
    avatarText: 'DV',
    description: 'Le portail historique et club des développeurs francophones. Avec ses forums d\'entraide massifs, sa mise en page bleue intemporelle et sa multitude d\'articles techniques, c\'est un phare indispensable.',
    survivalSecret: 'La force d\'une communauté bénévole d\'experts rédigeant des milliers de tutoriels précis et s\'entraidant sur les langages les plus obscurs.',
    techStackCommentary: 'Conserve son forum traditionnel ultra-robuste basé sur vBulletin, garantissant une indexation parfaite et une vitesse d\'affichage imbattable.',
    badgeColor: 'bg-[#1e3a8a] text-white'
  },
  {
    id: 'spacejam',
    name: 'Space Jam (Original 1996 Site)',
    category: 'relic',
    launchYear: 1996,
    url: 'https://www.spacejam.com/1996/',
    avatarText: 'SJ',
    description: 'Le site officiel du film Space Jam de 1996, conservé intact par Warner Bros. C\'est un monument national du Web 1.0, une capsule temporelle témoignant de l\'esthétique et du code du milieu des années 90.',
    survivalSecret: 'La décision délibérée de Warner Bros de ne jamais le supprimer ni le mettre à jour, le transformant en relique de musée numérique.',
    techStackCommentary: 'Entièrement codé en tableaux HTML imbriqués (<table border="0">), avec des fonds étoilés répétitifs (background="bg.jpg"), des GIFs animés de quelques kilo-octets et des cadres de navigation (frameset).',
    badgeColor: 'bg-indigo-900 text-indigo-100 border border-indigo-400'
  },
  {
    id: 'hardwarefr',
    name: 'Hardware.fr Forums',
    category: 'forum',
    launchYear: 1997,
    url: 'https://forum.hardware.fr',
    avatarText: 'HFR',
    description: 'Le forum d\'entraide et de discussion matériel le plus légendaire de France. On y parle de cartes graphiques, de réseaux, de science, d\'actualité et de vie quotidienne avec une liberté de ton unique.',
    survivalSecret: 'Un argot interne riche ("les HFRiens"), des smileys d\'époque devenus des mèmes cultes, et une fidélité absolue des membres actifs depuis 25 ans.',
    techStackCommentary: 'Utilise le logiciel de forum réputé "mesdiscussions.net", caractérisé par sa densité d\'information exceptionnelle par page et sa sobriété visuelle historique.',
    badgeColor: 'bg-red-700 text-white'
  }
];

export default function WebResistorsView({ theme }: { theme: 'modern' | 'ie6' | 'terminal' }) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'forum' | 'knowledge' | 'relic'>('all');
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);

  const filteredSites = selectedCategory === 'all' 
    ? RESISTOR_SITES 
    : RESISTOR_SITES.filter(site => site.category === selectedCategory);

  const getStyle = () => {
    switch (theme) {
      case 'ie6':
        return 'bg-[#d4d0c8] text-black font-sans border-2 border-outset border-white p-4';
      case 'terminal':
        return 'bg-black text-[#00ff00] font-mono border border-[#00ff00] p-6';
      default:
        return 'text-slate-100 p-6';
    }
  };

  return (
    <div className={getStyle()} id="web-resistors-container">
      {/* Header */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Les Résistants du Web <span className="text-xs font-mono font-normal text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">Web Immuable</span>
            </h1>
            <p className="text-sm text-slate-400">
              Ces sites web et communautés iconiques qui, malgré l'évolution technique rapide et les crises d'ergonomie, conservent leur âme et leur architecture d'époque.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Concept Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/15 p-5 rounded-2xl mb-8 flex flex-col md:flex-row gap-5 items-center justify-between shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" /> Pourquoi survivent-ils ?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            À l'ère des algorithmes de recommandation addictifs, du défilement infini et des architectures éphémères en JavaScript, ces résistants démontrent une vérité fondamentale : <strong>le contenu de qualité, l'hypertexte pur et la force de la communauté priment sur l'artifice visuel.</strong> Ils utilisent des technologies réputées "dépassées" (PHP, forums vBulletin, tableaux HTML) mais offrent une efficacité, une vitesse d'indexation et une densité d'information inégalables.
          </p>
        </div>
        <div className="shrink-0 text-center bg-slate-900/80 border border-indigo-500/10 px-4 py-3 rounded-xl">
          <span className="text-xs font-mono text-indigo-300 block">Souveraineté & Clarté</span>
          <span className="text-2xl font-black text-white">100%</span>
          <span className="text-[10px] text-slate-400 block">Axé Humain & Échange</span>
        </div>
      </div>

      {/* Navigation / Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'Tous les résistants', count: RESISTOR_SITES.length },
          { id: 'forum', label: 'Forums & Entraide', count: RESISTOR_SITES.filter(s => s.category === 'forum').length },
          { id: 'knowledge', label: 'Savoirs & Apprentissage', count: RESISTOR_SITES.filter(s => s.category === 'knowledge').length },
          { id: 'relic', label: 'Reliques & Capsules temporelles', count: RESISTOR_SITES.filter(s => s.category === 'relic').length }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/10'
                : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${selectedCategory === cat.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-500'}`}>{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Grid of Resistor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="resistors-grid">
        {filteredSites.map(site => (
          <motion.div
            key={site.id}
            onMouseEnter={() => setHoveredSite(site.id)}
            onMouseLeave={() => setHoveredSite(null)}
            layout
            className={`relative p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
              theme === 'ie6'
                ? 'bg-[#d4d0c8] border-2 border-outset border-white shadow-none'
                : theme === 'terminal'
                ? 'bg-black border border-[#00ff00]'
                : hoveredSite === site.id
                ? 'bg-slate-900/90 border-indigo-500/40 shadow-xl shadow-indigo-950/15'
                : 'bg-slate-950/40 border-slate-850'
            }`}
          >
            <div className="space-y-4">
              {/* Card Title Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-md ${site.badgeColor}`}>
                    {site.avatarText}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                      {site.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-450">
                      Lancé en {site.launchYear} •{' '}
                      {site.category === 'forum' ? 'Forum communautaire' : site.category === 'knowledge' ? 'Portail de connaissances' : 'Relique historique'}
                    </span>
                  </div>
                </div>
                <a
                  href={site.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Visiter le site officiel"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-300 leading-relaxed">
                {site.description}
              </div>

              {/* Secret and technical details */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/30 text-[11px] leading-relaxed">
                  <span className="text-indigo-400 font-bold block mb-0.5">🔒 Secret de longévité :</span>
                  <span className="text-slate-350">{site.survivalSecret}</span>
                </div>
                <div className="bg-indigo-950/10 p-3 rounded-lg border border-indigo-950/20 text-[11px] leading-relaxed">
                  <span className="text-emerald-400 font-mono font-bold block mb-0.5">💻 Stack & Philosophie technique :</span>
                  <span className="text-slate-350 font-sans">{site.techStackCommentary}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900/40 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>RÉSISTANT CODE #{site.id.toUpperCase()}</span>
              <span className="text-indigo-400 hover:underline cursor-pointer">
                Fidélité & Sémantique
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Historical Note */}
      <div className="mt-8 p-5 bg-slate-950/20 border border-slate-850 rounded-2xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-indigo-400" /> Leçons d'Ingénierie tirées des Résistants
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          La leçon universelle offerte par les résistants du web est une piqûre de rappel cruciale face à la frénésie moderne des architectures front-end. À force de concevoir des sites intégralement dépendants du rendu JS côté client (ex: SPA de 5 Mo de bundles), on en oublie que les robots de recherche, l'accessibilité vocale pour malvoyants et les connexions mobiles lentes exigent de l'hypertexte simple. Des projets comme Wikipédia et developpez.com rappellent qu'une structure HTML solide et sémantique reste éternelle et interopérable avec n'importe quel navigateur du passé, d'aujourd'hui, ou du futur.
        </p>
      </div>
    </div>
  );
}
