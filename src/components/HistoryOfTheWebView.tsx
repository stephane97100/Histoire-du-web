/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Server, Link2, Monitor, Code2, Cpu } from 'lucide-react';

interface HistoryViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

const historyNodes = [
  {
    id: 'origins',
    title: 'Origines du Web (1989-1991)',
    icon: Globe,
    desc: 'Tim Berners-Lee invente le WWW au CERN.',
    details: 'Le Web a été conçu comme un espace documentaire partagé. L\'idée était d\'utiliser des adresses (URL) pour identifier des ressources et le langage HTML pour les structurer, le tout lié par des hyperliens.'
  },
  {
    id: 'protocols',
    title: 'Protocoles Fondamentaux',
    icon: Server,
    desc: 'TCP/IP, DNS, HTTP/HTTPS : Les piliers de la communication réseau.',
    details: 'TCP/IP assure le transport fiable des données. DNS traduit les noms de domaine en adresses IP. HTTP est le langage de requête/réponse entre navigateur et serveur, et HTTPS ajoute une couche de chiffrement TLS pour sécuriser ces échanges.'
  },
  {
    id: 'browsers',
    title: 'Évolution des Navigateurs',
    icon: Monitor,
    desc: 'Mosaic, Netscape, IE, Firefox, Chrome...',
    details: 'Mosaic a apporté les images. Netscape a introduit le dynamisme (JS) et le SSL. IE6 a imposé un monopole. Firefox a défendu l\'open-source. Chrome a optimisé la performance et standardisé le Web moderne.'
  }
];

export default function HistoryOfTheWebView({ theme }: HistoryViewProps) {
  const [activeNode, setActiveNode] = useState(historyNodes[0].id);
  const activeData = historyNodes.find(n => n.id === activeNode);

  const getStyle = () => {
    switch(theme) {
      case 'ie6': return 'bg-[#d4d0c8] border-2 border-white text-black p-4';
      case 'terminal': return 'bg-black border border-[#ffb000] text-[#ffb000] p-4 font-mono';
      default: return 'bg-[#111114] border border-[#2a2a2e] text-slate-100 p-6 rounded-2xl';
    }
  };

  return (
    <div className={`space-y-6 ${getStyle()}`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <Link2 className="w-6 h-6" /> Histoire du Web : Fondations
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {historyNodes.map(node => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`p-4 rounded-xl text-left transition ${
                isActive ? 'bg-indigo-600/20 border border-indigo-500' : 'bg-slate-900 border border-slate-800'
              }`}
            >
              <Icon className="w-6 h-6 mb-2 text-indigo-400" />
              <h3 className="font-bold text-sm mb-1">{node.title}</h3>
              <p className="text-xs text-slate-400">{node.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
        <h4 className="text-lg font-bold text-indigo-300 mb-2">{activeData?.title}</h4>
        <p className="text-sm leading-relaxed">{activeData?.details}</p>
      </div>
    </div>
  );
}
