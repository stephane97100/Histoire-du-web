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

      {/* Detailed Technical Analysis Section */}
      <div className="bg-slate-900 border border-slate-750 rounded-xl p-6 text-left space-y-5" id="detailed-technical-duel-analysis">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Code2 className="w-5 h-5 text-indigo-400" />
          {duelMode === 'client' 
            ? 'Analyse technique approfondie : JScript vs VBScript Côté Navigateur' 
            : 'Analyse technique approfondie : Le Match d\'Architecture ASP vs PHP'}
         </h3>

        {duelMode === 'client' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed" id="detailed-client-analysis">
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60">
                <h4 className="font-extrabold text-amber-550 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  ⚠️ VBScript & "ILOVEYOU" : Le séisme sécuritaire de l'an 2000
                </h4>
                <p>
                  En mai 2000, le ver informatique <b className="text-slate-200">"ILOVEYOU"</b> se propage à la vitesse de la lumière à travers la planète. Son secret ? Un simple script VBScript d'une centaine de lignes exécuté par les victimes.
                </p>
                <p className="mt-2 text-slate-400">
                  Sous Windows d'époque, le moteur local <b>Windows Script Host</b> permettait aux fichiers <code className="bg-slate-950 px-1 py-0.5 rounded text-pink-400 font-mono">.vbs</code> d'accéder sans aucune restriction aux APIs du système (manipulation de fichiers, écriture dans la base de registre, envoi discret de courriels massifs via Outlook). Cette faille monumentale a scellé le destin de la sécurité des extensions ActiveX chez les clients professionnels.
                </p>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60 font-sans">
                <h4 className="font-extrabold text-emerald-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  🐞 "On Error Resume Next" : L'anti-pattern absolu
                </h4>
                <p>
                  VBScript a popularisé une commande restée tristement célèbre auprès des ingénieurs Windows : <code className="bg-slate-950 px-1.5 py-1 rounded text-emerald-400 font-mono">On Error Resume Next</code>.
                </p>
                <p className="mt-2 text-slate-400">
                  Cette ligne simple ordonnait au moteur d'ignorer absolument toutes les exceptions bloquantes ou variables indéfinies qui survenaient dans le script pour foncer directement à l'exécution de la ligne suivante. Si cela offrait une apparente tolérance aux pannes à l'écran, cela masquait des corruptions d'état catastrophiques en arrière-plan, rendant l'écriture de grands logiciels impossible.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60">
                <h4 className="font-extrabold text-indigo-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  ⚙️ Comparatif technique des moteurs d'exécutions
                </h4>
                <div className="space-y-2 mt-2 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5 text-slate-400 font-bold">
                    <span>Fonctionnalité</span>
                    <span className="text-indigo-400">JavaScript / JScript</span>
                    <span className="text-amber-500">VBScript</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Sensibilité de casse</span>
                    <span>Sensible (Style C)</span>
                    <span>Insensible (Visual Basic)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Gestion mémoire</span>
                    <span>Garbage Collector (Fluide)</span>
                    <span>Reference Counting (COM)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Sécurité sandbox</span>
                    <span className="text-emerald-400">Hermétique & isolée</span>
                    <span className="text-rose-500">Accès ActiveX (Dangereux)</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-400">Standardisation</span>
                    <span className="text-emerald-400">ECMAScript (Ouvert)</span>
                    <span>Propriétaire Microsoft (Fermé)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-950/15 rounded-xl border border-indigo-500/10 text-sans">
                <h4 className="font-extrabold text-indigo-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  🌐 Le monopole raté de la JVM Microsoft & JScript
                </h4>
                <p className="text-[11.5px] leading-relaxed text-slate-350">
                  Dans sa volonté d'étouffer Netscape et Sun Microsystems, Microsoft avait également conçu sa propre machine virtuelle Java et intégré <b>JScript</b> avec des extensions exclusives à Windows. Face aux actions en justice intentées par Sun et aux exigences d'innocuité du monde open-source, les développeurs ont massivement refusé ces chaînes de dépendance technique pour se tourner vers le standard ouvert et universel d'ECMA.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed" id="detailed-server-analysis">
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60 font-sans">
                <h4 className="font-extrabold text-sky-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  💾 Connexion BDD : Le choc de la lisibilité
                </h4>
                <p className="mb-3">
                  La différence de productivité originelle entre PHP et ASP saute aux yeux dans l'écriture de la requête de base de données :
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1 font-mono">ASP Classic avec ADODB (Lourd et Verbeux) :</span>
                    <pre className="text-[10px] text-slate-350 font-mono bg-slate-950 p-2 rounded border border-slate-850 leading-relaxed">
{`Set conn = Server.CreateObject("ADODB.Connection")
conn.Provider = "Microsoft.Jet.OLEDB.4.0"
conn.Open Server.MapPath("mabase.mdb") ' Fichier Access !
Set rs = conn.Execute("SELECT * FROM clients")`}
                    </pre>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1 font-mono">PHP 3/4 avec MySQL (Simple et Linéaire) :</span>
                    <pre className="text-[10px] text-slate-350 font-mono bg-slate-950 p-2 rounded border border-slate-850 leading-relaxed">
{`$db = mysql_connect("localhost", "root", "mdp");
mysql_select_db("mabase", $db);
$res = mysql_query("SELECT * FROM clients");`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60 font-sans">
                <h4 className="font-extrabold text-amber-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  💣 L'enfer des DLLs partagées (DLL Hell) & plantages IIS
                </h4>
                <p>
                  Dans l'environnement Windows Server avec IIS et ASP Classic des années 2000, lorsque l'on voulait envoyer un e-mail ou retailler une image, il n'existait pas d'instruction native simple au sein du langage.
                </p>
                <p className="mt-2 text-slate-400">
                  Le webmaster devait acheter des composants compilés tiers (fichiers <code className="bg-slate-950 px-1 py-0.5 rounded text-pink-400 font-mono">.dll</code> payants comme ASPMail ou JMail) et les installer physiquement sur le serveur. Si l'installation d'une nouvelle DLL écrasait une bibliothèque système existante d'une autre version, tout le serveur web IIS finissait par planter en cascade, un phénomène redouté appelé le <b>DLL Hell</b>.
                </p>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60 font-sans">
                <h4 className="font-extrabold text-sky-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  📁 Le fichier global.asa : Le chef d'orchestre de l'application ASP
                </h4>
                <p className="text-[11.5px] leading-relaxed">
                  En ASP Classic, l'ensemble du cycle de vie de l'application et des sessions utilisateur était piloté par un précieux fichier d'initialisation facultatif nommé <strong>global.asa</strong> (Active Server Application), positionné obligatoirement à la racine de l'application web IIS.
                </p>
                <p className="mt-2 text-slate-400 text-[11.5px] leading-relaxed">
                  Ce fichier interceptait les événements du serveur web pour y adosser des scripts VBScript ou de déclarations d'objets globaux, orchestrant notamment les fonctions clés :
                </p>
                <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-400 text-[11px]">
                  <li><code>Application_OnStart</code> : S'exécute une seule fois à l'initialisation du serveur (pratique pour configurer des variables d'environnement, des variables globales ou des chaînes de connexion).</li>
                  <li><code>Session_OnStart</code> : Se lance dès qu'un nouvel internaute ouvre une session de navigation (permettant d'initialiser des timeouts ou d'incrémenter des compteurs d'utilisateurs actifs).</li>
                  <li><code>Session_OnEnd</code> et <code>Application_OnEnd</code> : Libèrent les ressources mémoire et décrémentent proprement les sessions détruites.</li>
                </ul>
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1 font-mono">Exemple classique de global.asa :</span>
                  <pre className="text-[10px] text-slate-350 font-mono bg-slate-950 p-2 rounded border border-slate-850 leading-relaxed">
{`<script language="VBScript" runat="Server">
Sub Application_OnStart
  Application("ConnString") = "Provider=Microsoft.Jet.OLEDB..."
  Application("OnlineUsers") = 0
End Sub
Sub Session_OnStart
  Application.Lock
  Application("OnlineUsers") = Application("OnlineUsers") + 1
  Application.UnLock
End Sub
</script>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/60 font-mono text-[11px]">
                <h4 className="font-extrabold text-[#777bb3] mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11.5px]">
                  ⚙️ Comparatif d'infrastructure : WINTEL contre LAMP
                </h4>
                <div className="space-y-2.5 mt-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5 text-slate-400 font-bold">
                    <span>Critère</span>
                    <span className="text-[#3ea4f5]">ASP & Windows NT / IIS</span>
                    <span className="text-[#8fa2ff]">PHP & Apache Linux</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Base de données d'élection</span>
                    <span>MS Access / SQL Server</span>
                    <span>MySQL / PostgreSQL</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Coûts de licences</span>
                    <span className="text-rose-400">Élevés (Payant à l'OS)</span>
                    <span className="text-emerald-400">Totalement Gratuit (GPL)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850 pb-1.5">
                    <span className="text-slate-400">Mécanisme d'Extension</span>
                    <span>Composants ActiveX / COM+</span>
                    <span>Extensions C natives adaptables</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-400">Stabilité des Processus</span>
                    <span className="text-amber-500">Un composant instable plante IIS</span>
                    <span className="text-emerald-400">Isolation processus (Prefork)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-950/15 rounded-xl border border-indigo-500/10 font-sans">
                <h4 className="font-extrabold text-[#8fa2ff] mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-mono">
                  📉 La rupture brutale d'ASP en 2002 : La trahison historique
                </h4>
                <p className="text-[11.5px] leading-relaxed text-slate-350">
                  En 2002, pour contrer la montée en puissance de Java d'entreprise, Microsoft a complètement modifié sa stratégie serveur en lançant le framework <b>ASP.NET</b>. En faisant cela, ils ont totalement abandonné l'interpréteur classique d'ASP, cassant brutalement toute la compatibilité avec les applications écrites par des centaines de milliers de webmasters. Cette décision a poussé la quasi-totalité des développeurs déçus à migrer leurs compétences vers PHP, asseyant la domination écrasante de ce dernier pour les décennies à venir.
                </p>
              </div>
            </div>
          </div>
        )}
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
