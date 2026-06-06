/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HelpCircle, AlertTriangle, Code2, Play, Terminal, ArrowRight } from 'lucide-react';

interface VbscriptJsDuelProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function VbscriptJsDuel({ theme }: VbscriptJsDuelProps) {
  const [duelMode, setDuelMode] = useState<'client' | 'server'>('client');
  const [activeConsole, setActiveConsole] = useState<'js' | 'vbs' | 'asp' | 'php'>('js');
  const [stdout, setStdout] = useState<string[]>(['Prêt à simuler l\'exécution...']);
  const [popups, setPopups] = useState<{ id: string; text: string }[]>([]);

  const runSample = (lang: 'js' | 'vbs' | 'asp' | 'php') => {
    setActiveConsole(lang);
    if (lang === 'js') {
      setStdout([
        '>> initialisation de Mocha/JavaScript...',
        '>> document.write("Bonjour le monde !");',
        '>> var age = 18;',
        '>> if (age >= 18) { alert("Accès Autorisé"); }',
        '>> [Moteur JS SpiderMonkey] Succès: Exécuté avec portabilité totale sur tous les systèmes.'
      ]);
      // Spawn a simulated browser alert
      const pid = Math.random().toString();
      setPopups(prev => [...prev, { id: pid, text: 'Accès Autorisé (Alerte JavaScript)' }]);
    } else if (lang === 'vbs') {
      setStdout([
        '>> Initialisation du moteur de script VBScript d\'ActiveX...',
        '>> Dim age',
        '>> age = 18',
        '>> If age >= 18 Then MsgBox "Accès Autorisé", vbInformation, "Secured Portal"',
        '>> [Moteur Windows Script Host] Attention: Exécutable exclusivement sous Microsoft Windows + IE.'
      ]);
      const pid = Math.random().toString();
      setPopups(prev => [...prev, { id: pid, text: 'Accès Autorisé (VBScript MsgBox) - Code d\'erreur ActiveX: 0x000' }]);
    } else if (lang === 'asp') {
      setStdout([
        '>> [Microsoft IIS Server] Initialisation de asp.dll pour exécuter VBScript côté serveur...',
        '>> <% Dim name, i %>',
        '>> <% name = "Visiteur" %>',
        '>> <% Response.Write("Bonjour " & name) %>',
        '>> Boucle d\'écriture Response.Write de 1 à 5...',
        '>> [IIS Active Server Pages] Succès: HTML compilé envoyé au client (Vitesse d\'exécution: Moyen).'
      ]);
    } else if (lang === 'php') {
      setStdout([
        '>> [Apache Server] Appel de mod_php pour interpréter le script index.php...',
        '>> <?php $name = "Visiteur"; ?>',
        '>> <?php echo "Bonjour " . $name; ?>',
        '>> Interprétation de la boucle for ($i = 1; $i <= 5; $i++)...',
        '>> [Moteur PHP / Zend Engines] Succès: HTML envoyé hyper rapidement (Serveur Linux + Apache).'
      ]);
    }
  };

  const closePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6" id="vbscript-js-duel-root">
      
      {/* Selector between client & server duels */}
      <div className="flex border border-slate-750/70 p-1 bg-slate-900 rounded-xl max-w-md select-none" id="duel-mode-selector">
        <button
          onClick={() => { setDuelMode('client'); setActiveConsole('js'); setStdout(['Prêt à simuler...']); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition transition-all cursor-pointer ${
            duelMode === 'client' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🖥️ Duel Client (JScript vs VBScript)
        </button>
        <button
          onClick={() => { setDuelMode('server'); setActiveConsole('php'); setStdout(['Prêt à simuler...']); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition transition-all cursor-pointer ${
            duelMode === 'server' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🎛️ Duel Serveur (ASP Classic vs PHP)
        </button>
      </div>

      {/* Introduction Block */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md space-y-4 text-left">
        {duelMode === 'client' ? (
          <>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              JScript vs VBScript : La Guerre des Scripts Clients (1996 - 2004)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              En 1996, le Web commence à bouger. Pour contrecarrer <b>Netscape</b> et son révolutionnaire <b>JavaScript</b>, Microsoft adopte une stratégie d'assimilation et d'élargissement : ils rétro-conçoivent JS sous le nom de <b>JScript</b>, et introduisent en parallèle un tout nouveau langage de script client : <b>VBScript</b>, basé sur la syntaxe robuste et très populaire de Visual Basic.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              ASP Classic vs PHP : L'Origine des Serveurs Web Dynamiques (1996 - 2002)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Avant les frameworks modernes, le Web dynamique se battait sur le serveur. Microsoft proposait <b>ASP Classic (Active Server Pages)</b> pour régner sur l'écosystème Windows NT / IIS en mariant VBScript au HTML, tandis que <b>PHP (Hypertext Preprocessor)</b> naissait comme un utilitaire open-source léger sous Linux/Apache. C'est l'affrontement entre la technologie propriétaire fermée et la suite open-source LAMP.
            </p>
          </>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Why JS/PHP Won Explainer Column */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-750 rounded-xl space-y-3.5 text-left">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
              {duelMode === 'client' ? 'Pourquoi JavaScript a "Gagné"' : 'Pourquoi PHP a terrassé ASP d\'origine'}
            </h3>
            
            <div className="space-y-3 text-xs leading-relaxed">
              {duelMode === 'client' ? (
                <>
                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>La Portabilité Universelle</b> : VBScript reposait intimement sur les composants d'infrastructure COM/ActiveX de Microsoft Windows. Il était incapable de tourner correctement sur Netscape, sur ordinateurs Apple Macintosh, ou sous les systèmes d'exploitation Unix/Linux de l'époque.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>Un Standard Ouvert (ECMAScript)</b> : Dès 1997, Netscape soumet JavaScript à l'organisme d'homologation européen ECMA pour en faire un standard neutre (ECMA-262). Cela a sécurisé l'industrie en garantissant qu'aucune entité unique ne possèderait le langage de base du web.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>L'Inimitié Sécuritaire</b> : L'intégration profonde de VBScript avec les scripts serveurs ActiveX ASP permettait à des scripts malveillants d'accéder au registre Windows ou au système de fichiers du client d'un simple clic involontaire. Les administrateurs réseau ont massivement proscrit VBScript.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>Barrière du prix et de l'Hébergement</b> : ASP demandait un serveur Windows Server d'époque doté de licences Microsoft IIS coûteuses. PHP tournait de manière ultra-rapide sur des machines Linux et serveurs Apache libres et bon marché, permettant le boom historique de l'hébergement mutualisé pas cher (LAMP).
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>Facilité de déploiement</b> : Pour déployer un site PHP, il suffisait de téléverser des scripts textuels par FTP sur son hébergeur (OVH, Lycos, Free). Pour ASP, la configuration des composants ActiveX, de la base de données Access (via ADO) ou des DLLs compilées était fastidieuse à l'époque.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-200">
                      <b>L'abandon de Microsoft pour ASP.NET</b> : En 2002, Microsoft délaisse brutalement ASP Classic pour lancer ASP.NET (C#/.NET). Cette transition a rompu la rétrocompatibilité des scripts, propulsant des millions de développeurs déçus directement dans les bras de PHP 4 et PHP 5.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Vintage Code Comparator column */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-750 overflow-hidden flex flex-col h-full min-h-[460px]">
            {/* Header bar of comparison box */}
            <div className="bg-slate-850 px-4 py-3 flex items-center justify-between border-b border-slate-750">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" /> Console de Scripting {duelMode === 'client' ? 'IE4 (Simulé)' : 'Serveur Web 2000 (Simulé)'}
              </span>
              <div className="flex gap-2">
                {duelMode === 'client' ? (
                  <>
                    <button
                      onClick={() => runSample('js')}
                      id="btn-run-js"
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition"
                    >
                      <Play className="w-2.5 h-2.5" /> Compiler JavaScript
                    </button>
                    <button
                      onClick={() => runSample('vbs')}
                      id="btn-run-vbs"
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition"
                    >
                      <Play className="w-2.5 h-2.5" /> Compiler VBScript
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => runSample('asp')}
                      id="btn-run-asp"
                      className="px-2.5 py-1 bg-[#006cc0] hover:bg-blue-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition animate-pulse"
                    >
                      <Play className="w-2.5 h-2.5" /> Exécuter ASP (VBScript)
                    </button>
                    <button
                      onClick={() => runSample('php')}
                      id="btn-run-php"
                      className="px-2.5 py-1 bg-[#777bb3] hover:bg-[#8892be] text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition animate-pulse"
                    >
                      <Play className="w-2.5 h-2.5" /> Exécuter PHP Script
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Split Editor */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b border-slate-750">
              {duelMode === 'client' ? (
                <>
                  {/* JS sample */}
                  <div className="p-4 border-r border-slate-750 flex flex-col justify-between text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-2 font-mono">JS / JScript Code</span>
                      <pre className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800 leading-normal">
{`// Syntaxe C/Java
var age = 18;

if (age >= 18) {
  alert("Accès Autorisé");
} else {
  alert("Accès Refusé");
}`}
                      </pre>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">Sensible à la casse. Utilise l'accolade d'ouverture.</p>
                  </div>

                  {/* VBS sample */}
                  <div className="p-4 flex flex-col justify-between bg-slate-950/20 text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block mb-2 font-mono">VB Script Code</span>
                      <pre className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800 leading-normal">
{`' Commentaire Visual Basic
Dim age
age = 18

If age >= 18 Then
  MsgBox "Accès Autorisé"
Else
  MsgBox "Accès Refusé"
End If`}
                      </pre>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">Insensible à la casse. Syntaxe verbeuse de base.</p>
                  </div>
                </>
              ) : (
                <>
                  {/* ASP Classic sample */}
                  <div className="p-4 border-r border-slate-750 flex flex-col justify-between text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#3ea4f5] tracking-wider block mb-2 font-mono">{"ASP Classic (<% %>)"}</span>
                      <pre className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800 leading-normal">
{`<!-- Code Serveur Windows IIS -->
<%
Dim name, i
name = "Visiteur"
Response.Write("<h2>Bonjour " & name & " !</h2>")

For i = 1 To 5
  Response.Write("<p>Ligne " & i & "</p>")
Next
%>`}
                      </pre>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">Fusion d'instructions de balises script Windows IIS.</p>
                  </div>

                  {/* PHP Classic sample */}
                  <div className="p-4 flex flex-col justify-between bg-slate-950/20 text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8fa2ff] tracking-wider block mb-2 font-mono">{"PHP (<?php ?>)"}</span>
                      <pre className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800 leading-normal">
{`<!-- Code Serveur OpenSource -->
<?php
$name = "Visiteur";
echo "<h2>Bonjour $name !</h2>";

for ($i = 1; $i <= 5; $i++) {
  echo "<p>Ligne $i</p>";
}
?>`}
                      </pre>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">Parser modulaire ultra-léger et variables précédées du dollar.</p>
                  </div>
                </>
              )}
            </div>

            {/* Simulated Debug Log */}
            <div className="bg-slate-950 p-4 font-mono text-[11px] text-emerald-400 space-y-1 h-32 overflow-y-auto border-t border-slate-750 scrollbar-thin text-left">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500 block mb-1">=== SORTIE STANDARD (STDOUT) ===</span>
              {stdout.map((line, idx) => (
                <div key={idx} className={line.startsWith('>> [M') || line.startsWith('>> [IIS') ? 'text-indigo-400' : line.startsWith('>> Dim') || line.startsWith('>> If') || line.startsWith('>> <%') || line.startsWith('>> <?') ? 'text-amber-550' : 'text-emerald-400'}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Pop-up Dialog alerts Simulator Sandbox */}
      <AnimatePresence>
        {popups.map((popup) => (
          <div key={popup.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#c0c0c0] text-black border-2 border-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] w-80 font-sans"
              style={{
                boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset, 2px 2px 0px #ffffff inset, -2px -2px 0px #000000 inset'
              }}
            >
              {/* Windows 98 Style Title bar */}
              <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between select-none">
                <span className="text-xs font-bold font-sans">Message de Microsoft Explorer</span>
                <button
                  onClick={() => closePopup(popup.id)}
                  className="bg-[#c0c0c0] text-black font-bold text-xs w-4 h-4 flex items-center justify-center leading-none border border-white"
                  style={{
                    boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset'
                  }}
                >
                  X
                </button>
              </div>

              {/* Message Content */}
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-serif font-bold text-xl flex items-center justify-center shrink-0">
                  i
                </div>
                <div className="text-xs py-1 text-slate-900 pr-2">
                  {popup.text}
                </div>
              </div>

              {/* MsgBox button row */}
              <div className="px-4 pb-4 flex justify-end">
                <button
                  onClick={() => closePopup(popup.id)}
                  id={`btn-close-popup-${popup.id}`}
                  className="px-6 py-1 bg-[#c0c0c0] text-black border border-white text-xs font-semibold"
                  style={{
                    boxShadow: '1px 1px 0px white inset, -1px -1px 0px #808080 inset, 1px 1px 0px #000000, -1.5px -1.5px 0px #404040'
                  }}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </AnimatePresence>

    </div>
  );
}
