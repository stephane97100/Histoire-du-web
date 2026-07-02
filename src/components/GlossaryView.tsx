/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { glossaryTags } from '../data/glossaryData';
import { GlossaryTag } from '../types';
import { Search, Filter, AlertTriangle, Play, HelpCircle, FileJson, ArrowRight } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface GlossaryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function GlossaryView({ theme }: GlossaryViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<GlossaryTag>(glossaryTags[0]);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  
  // High quality mutable state of current sandbox code snippets
  const [snippets, setSnippets] = useState<Record<string, string>>(
    glossaryTags.reduce((acc, tag) => ({ ...acc, [tag.tag]: tag.codeSnippet }), {})
  );

  const selectedSnippet = snippets[activeTag.tag] || activeTag.codeSnippet;

  // Filter handlers
  const filteredTags = glossaryTags.filter(tag => {
    const matchesSearch = tag.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tag.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tag.category === selectedCategory;
    const matchesVersion = selectedVersion === 'all' || tag.version === selectedVersion;
    return matchesSearch && matchesCategory && matchesVersion;
  });

  const categories = [
    { id: 'all', label: 'Toutes catégories' },
    { id: 'structure', label: 'Structure' },
    { id: 'media', label: 'Médias/Images' },
    { id: 'forms', label: 'Formulaires' },
    { id: 'script', label: 'Scripting' },
    { id: 'deprecated', label: 'Obsolètes/Retro' }
  ];

  const versions = [
    { id: 'all', label: 'Tout' },
    { id: 'html1', label: 'CERN 1991' },
    { id: 'html2', label: 'RFC 1995' },
    { id: 'html3', label: 'HTML3 1997' },
    { id: 'html4', label: 'HTML4 1999' },
    { id: 'html5', label: 'HTML5 2014' }
  ];

  const getEpochDescription = (vId: string) => {
    switch (vId) {
      case 'html1':
        return "CERN 1991 : Genèse du web scientifique. Aucun support d'images, de couleurs, ou de feuilles de style. Uniquement des liens hypertextes bruts.";
      case 'html2':
        return "RFC 1995 : Époque pionnière. Naissance du commerce en ligne. Débuts du protocole HTTP/1.0, des images <img> et des formulaires interactifs.";
      case 'html3':
        return "HTML 3.2 (1997) : Époque nostalgique. Mises en page par tableaux invisibles, fond gif, balise physiques de couleurs <font> et clignotements.";
      case 'html4':
        return "HTML 4.01 (1999) : Séparation structurelle complète pour ordonner le code W3C. Arrivée des divisions <div> et styles CSS.";
      case 'html5':
        return "HTML5 2014+ : Moteur applicatif moderne. Fin de Flash Player au profit de l'audio/vidéo sémantiques natifs et de la balise <canvas>.";
      default:
        return "Sélectionnez une époque historique ci-dessus pour consulter ses origines technologiques d'époque.";
    }
  };

  // Helper safe inner HTML builder for tags sandbox
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="space-y-6" id="glossary-view-root">
      
      {/* 2-Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Filters & Tag list (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 shadow-md space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                id="glossary-search"
                placeholder="Rechercher une balise (ex: table, marquee)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-450 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 timeline-button outline-none"
              />
            </div>

            {/* Version filters */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Norme Standard :</span>
              <div className="flex flex-wrap gap-1.5">
                {versions.map(v => (
                  <button
                    key={v.id}
                    id={`filter-v-${v.id}`}
                    onClick={() => setSelectedVersion(v.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                      selectedVersion === v.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold'
                        : 'bg-slate-900/40 border-slate-750 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              {/* Dynamic epoch overview commentary */}
              <div className="mt-2 p-2 bg-slate-950/80 border border-slate-750/50 rounded text-[10px] leading-relaxed text-indigo-300 font-mono">
                {getEpochDescription(selectedVersion)}
              </div>
            </div>

            {/* Category filters list */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Type de balise :</span>
              <div className="flex flex-wrap gap-1">
                {categories.map(c => (
                  <button
                    key={c.id}
                    id={`filter-cat-${c.id}`}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-2 py-0.5 rounded text-[10px] border transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-semibold'
                        : 'bg-slate-900/40 border-slate-750 text-slate-400 hover:text-slate-250'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* List of filtered tags */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 shadow-md flex-1 max-h-[460px] overflow-y-auto scrollbar-thin">
            <div className="space-y-1.5">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => {
                  const isSelected = activeTag.tag === tag.tag;
                  const isHovered = tag.tag === hoveredTag;
                  
                  const isAnyHovered = hoveredTag !== null;
                  const ghostEffectCss = isAnyHovered && !isHovered
                    ? "opacity-35 blur-[1.2px] scale-[0.98] transition-all duration-500"
                    : "opacity-100 blur-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg";

                  return (
                    <button
                      key={tag.tag}
                      id={`btn-tag-${tag.tag}`}
                      onClick={() => setActiveTag(tag)}
                      onMouseEnter={() => setHoveredTag(tag.tag)}
                      onMouseLeave={() => setHoveredTag(null)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-slate-700 shadow-inner'
                          : 'bg-transparent border-transparent hover:bg-slate-900/35 hover:border-slate-800'
                      } ${ghostEffectCss}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-sm font-bold ${isSelected ? 'text-indigo-400' : 'text-slate-200'}`}>
                          {tag.isHtmlTag ? <>&lt;{tag.tag}&gt;</> : tag.tag}
                        </span>
                        {tag.category === 'deprecated' && (
                          <span className="px-1.5 py-0.5 text-[8px] font-mono bg-red-900/20 text-red-400 border border-red-500/10 rounded uppercase">
                            Obsolète
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-450 uppercase">{tag.category}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-1 py-0.5 rounded font-semibold lowercase">
                          {tag.version.replace('html', 'html ')}
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Aucun élément ne correspond à votre recherche.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Interactive tag sandbox (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md space-y-5 flex-1 flex flex-col justify-between">
            
            {/* Tag metadata title */}
            <div className="flex justify-between items-start gap-4 pb-3 border-b border-slate-700/60 flex-wrap">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-mono font-bold text-slate-100 italic">
                    {activeTag.isHtmlTag ? <>&lt;{activeTag.tag}&gt;</> : activeTag.tag}
                  </h3>
                  <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">
                    Introduit en {activeTag.version.toUpperCase().replace('HTML', 'HTML ')}
                  </span>
                </div>
                <p className="text-xs text-slate-350 mt-1">{activeTag.description}</p>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-450 space-y-0.5">
                <div>Balise fermante : <b className={activeTag.hasClosingTag ? "text-emerald-400" : "text-amber-500"}>{activeTag.hasClosingTag ? "Requise </tag>" : "Orpheline"}</b></div>
              </div>
            </div>

            {/* Vintage Retro Sandbox Editor */}
            <div className="space-y-4 flex-1 flex flex-col justify-between min-h-[360px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                
                {/* Editable snippet text-area */}
                <div className="flex flex-col space-y-1.5 h-full">
                  <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider flex items-center gap-1">
                    <Play className="w-3 text-emerald-400" /> Modifier le fragment :
                  </span>
                  <div className="p-1 bg-slate-950 rounded-lg border border-slate-750 flex-1 flex">
                    <textarea
                      id={`textarea-snippet-${activeTag.tag}`}
                      value={selectedSnippet}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setSnippets(prev => ({ ...prev, [activeTag.tag]: newVal }));
                      }}
                      className="w-full bg-transparent resize-none font-mono text-xs text-emerald-400 leading-normal focus:outline-none p-3 scrollbar-thin outline-none flex-1 min-h-[140px]"
                    />
                  </div>
                </div>

                {/* Sandbox Real-time Rendering display frame */}
                <div className="flex flex-col space-y-1.5 h-full">
                  <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3 text-orange-400" /> Rendu Web simulé :
                  </span>
                  
                  <div className="bg-white border rounded-lg border-slate-300 p-4 h-full overflow-y-auto flex-1 min-h-[140px] text-black font-sans relative">
                    {/* Simulated warning indicator if the tag is deprecated */}
                    {activeTag.category === 'deprecated' && (
                      <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5 bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold select-none animate-pulse">
                        <AlertTriangle className="w-3 text-red-600" /> Obsolète
                      </div>
                    )}
                    {/* Native dangerouslySetInnerHTML preview */}
                    <div dangerouslySetInnerHTML={createMarkup(selectedSnippet)} />
                  </div>
                </div>

              </div>

              {/* Pedagogical Tip block */}
              {activeTag.retroTip && (
                <div className="p-3 bg-slate-900 border border-slate-750/70 rounded-lg text-xs leading-relaxed text-indigo-300 flex gap-2.5 items-start">
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 shrink-0">
                    ASTUCE DE CHRYSALIDE
                  </span>
                  <p className="italic">"{activeTag.retroTip}"</p>
                </div>
              )}

              {/* Social sharing widget */}
              <div className="pt-2">
                <ShareButtons
                  theme={theme}
                  title={`Anecdote d'Archéologie du Web - Balise <${activeTag.tag}>`}
                  text={`Saviez-vous que la balise <${activeTag.tag}>, introduite en ${activeTag.version.toUpperCase().replace('HTML', 'HTML ')}, sert à : "${activeTag.description}" ? Découvert sur Mémoire du Web.`}
                />
              </div>
            </div>

            {/* Custom attributes specification table */}
            {activeTag.attributes.length > 0 && (
              <div className="pt-2 border-t border-slate-700/60">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-450 block mb-2">Attributs historiques :</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {activeTag.attributes.map(attr => (
                    <div key={attr.name} className="p-2.5 bg-slate-900/60 border border-slate-750 rounded-lg text-left">
                      <div className="flex items-center justify-between">
                        <code className="text-xs text-indigo-400 font-bold font-mono">{attr.name}</code>
                        {attr.isDeprecated && (
                          <span className="text-[8px] bg-red-950/30 border border-red-500/10 rounded px-1 py-0.2 uppercase text-red-400 font-mono font-bold">
                            Obs
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal mt-1">{attr.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
