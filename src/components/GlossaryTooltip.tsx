/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Info } from 'lucide-react';

// Unified Dictionary of technical terms referenced in the workspace
export const techDictionary: Record<string, { definition: string; epoch: string; tag?: string }> = {
  'html': {
    definition: 'HyperText Markup Language : Le langage de balisage standard conçu pour structurer et créer des documents hypertexte sur le Web.',
    epoch: '1991 - Aujourd\'hui'
  },
  'css': {
    definition: 'Cascading Style Sheets : Langage informatique qui décrit la présentation des documents HTML (couleurs, polices, responsive layout).',
    epoch: '1996 - Aujourd\'hui'
  },
  'javascript': {
    definition: 'Langage de script interprété léger, orienté objet, devenu le moteur applicatif incontournable et standard de tous les navigateurs web.',
    epoch: '1995 - Aujourd\'hui'
  },
  'ftp': {
    definition: 'File Transfer Protocol : Protocole de transfert de fichiers utilisé historiquement par les webmasters pour envoyer les fichiers de code sur un serveur.',
    epoch: 'Années 1990 - 2010'
  },
  'docker': {
    definition: 'Technologie de conteneurisation qui scelle une application et toutes ses dépendances système au sein d\'un environnement isolé et immuable.',
    epoch: '2013 - Révolution DevOps'
  },
  'cpanel': {
    definition: 'Interface d\'administration web simplifiée permettant de gérer les fichiers FTP, bases de données SQL et e-mails d\'un hébergement mutualisé.',
    epoch: 'Années 2000'
  },
  'w3c': {
    definition: 'World Wide Web Consortium : L\'organisation de normalisation à but non lucratif chargée de veiller à l\'élaboration des standards du Web.',
    epoch: 'Fondé en 1994 par Tim Berners-Lee'
  },
  'cgi': {
    definition: 'Common Gateway Interface : Le tout premier protocole standard permettant à un serveur web d\'exécuter des programmes externes pour créer du contenu dynamique.',
    epoch: '1993 - Web 1.0'
  },
  'php': {
    definition: 'Hypertext Preprocessor : Langage de programmation côté serveur ultra-populaire conçu spécialement pour la création rapide d\'applications web dynamiques.',
    epoch: '1995 (Rasmus Lerdorf)'
  },
  'websocket': {
    definition: 'Protocole réseau bidirectionnel et persistant en temps réel, établissant une connexion ouverte permanente et rapide entre le navigateur et le serveur.',
    epoch: '2011 (Standard RFC 6455)'
  },
  'vbscript': {
    definition: 'Visual Basic Scripting Edition : Langage de script client propriétaire développé par Microsoft, uniquement fonctionnel sur Internet Explorer.',
    epoch: '1996 - Mort en 2010'
  },
  'jscript': {
    definition: 'Le dialecte JavaScript spécifique développé rétro-conçu par Microsoft pour équiper les versions anciennes d\'Internet Explorer.',
    epoch: '1996 - Années 2000'
  },
  'react': {
    definition: 'Bibliothèque d\'interface utilisateur JavaScript révolutionnaire pilotée par les composants dynamiques et l\'utilisation du DOM virtuel.',
    epoch: '2013 (Facebook open source)'
  },
  'doctissimo': {
    definition: 'Célèbre portail de forums francophones des années 2000, devenu une référence de l\'entraide sociale, du bavardage intime et de l\'hypocondrie collective.',
    epoch: 'Années 2000 - 2010'
  },
  'mercure': {
    definition: 'Mercure Hub : Protocole de communication en temps réel moderne reposant sur des Server-Sent Events (SSE) et HTTP/2 ou HTTP/3, servant d\'alternative plus performante, sécurisée et native aux WebSockets traditionnels.',
    epoch: 'Révolution API Temps-Réel moderne'
  },
  'symfony': {
    definition: 'Framework de référence mondial écrit en PHP, structuré en MVC, reconnu pour sa rigueur industrielle, son système de bundles et Symfony Docker.',
    epoch: '2005 - Aujourd\'hui'
  },
  'marquee': {
    definition: 'Balise de défilement horizontal ou vertical de texte inventée par Microsoft, très populaire durant l\'âge d\'or des GIFs animés et du design brut.',
    epoch: 'HTML3 (Microsoft IE)',
    tag: 'marquee'
  },
  'blink': {
    definition: 'Balise propriétaire Netscape provoquant le clignotement répétitif infini du texte, bête noire historique des ergonomes et spécialistes UX.',
    epoch: 'HTML2 (Netscape)',
    tag: 'blink'
  },
  'canvas': {
    definition: 'Balise HTML5 de dessin dynamique pixel par pixel programmée en JavaScript, clé de voûte de la disparition des plugins propriétaires d\'animation.',
    epoch: 'HTML5',
    tag: 'canvas'
  },
  'iframe': {
    definition: 'Balise permettant d\'incruster un deuxième document HTML autonome entier dans le site hôte.',
    epoch: 'HTML4',
    tag: 'iframe'
  },
  'cleancode': {
    definition: 'Pratiques d\'ingénierie logicielle visant à rendre le code source lisible, explicite, auto-documenté et pérenne face aux cycles de développement.',
    epoch: 'Concept universel'
  }
};

interface GlossaryTooltipProps {
  term: keyof typeof techDictionary | string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);

  const termKey = term.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Find matching key in dictionary
  const matchedKey = Object.keys(techDictionary).find(
    k => k.toLowerCase() === termKey || termKey.startsWith(k.toLowerCase()) || k.toLowerCase().startsWith(termKey)
  );

  const matchedData = matchedKey ? techDictionary[matchedKey] : null;

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position the tooltip centered horizontally above/below or following pointer
      setCoords({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  if (!matchedData) {
    // Return unchanged text if no tech definition exists
    return <span ref={containerRef}>{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      className="relative inline-block cursor-help border-b border-dotted border-indigo-400 text-slate-100 hover:text-indigo-305 transition-colors font-semibold"
      id={`glossary-tooltip-span-${termKey}`}
    >
      {children}
      
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            className="fixed pointer-events-none z-[9999] max-w-sm p-4 bg-slate-950/95 border-2 border-indigo-500/80 text-left rounded-xl shadow-2xl font-sans"
            style={{
              top: `${coords.y + 16}px`,
              left: `${Math.min(window.innerWidth - 340, Math.max(16, coords.x - 170))}px`,
            }}
            id={`glossary-tooltip-bubble-${termKey}`}
          >
            <span className="flex items-center justify-between border-b border-indigo-900/50 pb-1.5 mb-2">
              <span className="flex items-center gap-1 text-[11px] font-mono font-extrabold uppercase tracking-wider text-indigo-400">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                Définition : {matchedKey?.toUpperCase()}
              </span>
              <span className="text-[9px] font-mono font-semibold text-slate-450 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded">
                {matchedData.epoch}
              </span>
            </span>
            <span className="block text-[11px] leading-relaxed text-slate-200">
              {matchedData.definition}
            </span>
            {matchedData.tag && (
              <span className="block mt-2 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-1.5 py-0.5 rounded-md w-fit">
                Balise : &lt;{matchedData.tag}&gt;
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
