/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  Terminal, 
  Settings, 
  Sparkles, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  FileCode,
  RotateCcw,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';

interface PageRendererSimulatorProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

type TargetBrowser = 'mosaic1' | 'netscape4' | 'ie6' | 'safari1' | 'chrome';

interface PresetSnippet {
  id: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

const PRESETS: PresetSnippet[] = [
  {
    id: 'modern_card',
    name: '1. Card Produit Moderne (Flexbox, CSS Gradients & JS ES6)',
    description: 'Utilise Flexbox, dégradés CSS3, ombres portées et JS ES6. Incompatible avec Mosaic 1.0, Netscape 4 et IE6.',
    html: `<div class="card">
  <span class="tag">Édition Collector</span>
  <h3>iMac G3 Tangerine</h3>
  <p>L'ordinateur tout-en-un qui a révolutionné le design informatique en 1998.</p>
  <div class="footer">
    <span class="price">1 299 €</span>
    <button id="buy-btn" onclick="handleClick()">Acheter</button>
  </div>
</div>`,
    css: `.card {
  background: linear-gradient(135deg, #1e1e2f, #3b3b5c);
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  max-width: 320px;
  font-family: system-ui, sans-serif;
}
.tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #10b981;
  font-weight: bold;
}
h3 { margin: 8px 0; font-size: 18px; }
p { font-size: 12px; color: #cbd5e1; line-height: 1.5; }
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.price { font-size: 18px; font-weight: bold; color: #3b82f6; }
button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`,
    js: `const handleClick = () => {
  const btn = document.getElementById('buy-btn');
  btn.innerText = 'Ajouté !';
  console.log('Article ajouté avec succès (ES6 Arrow Function).');
};`
  },
  {
    id: 'retro_newsletter',
    name: '2. Encart 1999 (Table, Marquee, Blink & document.layers)',
    description: 'Page typique de la guerre Netscape vs IE avec balises d\'époque et API JS obsolète.',
    html: `<center>
  <table border="3" cellpadding="10" cellspacing="5" bgcolor="#c0c0c0" bordercolor="#000080" width="380">
    <tr>
      <td align="center" bgcolor="#000080">
        <font color="#ffffff" size="3" face="Courier New"><b>SURFEZ SUR L'AN 2000 !</b></font>
      </td>
    </tr>
    <tr>
      <td bgcolor="#ffffff">
        <marquee scrollamount="4" direction="left"><font color="#ff0000"><b>★★★ GRAND CONCOURS DE L'ÉTÉ - GAGNEZ UN MODEM 56K !!! ★★★</b></font></marquee>
        <p align="center">
          <font face="Times New Roman" size="3" color="#000000">
            Inscrivez-vous à notre cyber-newsletter !
            <br><br>
            <blink><b>Faites vite !</b></blink>
          </font>
        </p>
        <center>
          <input type="text" id="email" size="20" value="visiteur@caramail.com">
          <br><br>
          <input type="button" value="S'INSCRIRE" onclick="registerUser()">
        </center>
      </td>
    </tr>
  </table>
</center>`,
    css: `/* Style minimaliste d'époque */
body { background-color: #008080; }
font { font-family: 'Times New Roman', serif; }`,
    js: `function registerUser() {
  if (document.layers) {
    // Netscape 4 API
    alert('Bienvenue cher utilisateur de Netscape Navigator !');
  } else if (document.all) {
    // Internet Explorer 4/5 API
    alert('Bienvenue cher utilisateur d\'Internet Explorer !');
  } else {
    // Standard W3C DOM
    var mail = document.getElementById('email').value;
    alert('Inscrit : ' + mail);
  }
}`
  },
  {
    id: 'ie_box_model',
    name: '3. Test du Bug du Modèle de Boîte d\'IE6 (Quirks Mode)',
    description: 'Démontre la différence de largeur calculée entre Internet Explorer 5.5/6.0 Quirks Mode et les standards W3C.',
    html: `<div className="box-container">
  <div class="test-box">
    <b>Boîte de Test (Width: 200px, Padding: 20px, Border: 10px)</b>
    <p>En mode W3C, la largeur totale vaut 260px. En mode IE6 Quirks, elle vaut exactement 200px (le padding et les bordures étouffent le contenu) !</p>
  </div>
</div>`,
    css: `.test-box {
  width: 200px;
  padding: 20px;
  border: 10px solid #ff0000;
  background-color: #ffffcc;
  color: #000000;
  font-family: Arial, sans-serif;
  font-size: 11px;
  /* Hack spécifique IE6 filter opacity */
  filter: alpha(opacity=90);
}`,
    js: `var box = document.all ? document.all['test-box'] : document.getElementById('test-box');
console.log('Test du modèle de boîte chargé.');`
  }
];

export default function PageRendererSimulator({ theme }: PageRendererSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>(PRESETS[0].id);
  const [htmlCode, setHtmlCode] = useState<string>(PRESETS[0].html);
  const [cssCode, setCssCode] = useState<string>(PRESETS[0].css);
  const [jsCode, setJsCode] = useState<string>(PRESETS[0].js);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [selectedBrowser, setSelectedBrowser] = useState<TargetBrowser>('netscape4');

  // Diagnostics & Compatibility Report
  const [criticalErrors, setCriticalErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [historicalHacks, setHistoricalHacks] = useState<string[]>([]);

  // Load preset on selection
  const handleSelectPreset = (presetId: string) => {
    const found = PRESETS.find(p => p.id === presetId);
    if (found) {
      setSelectedPreset(presetId);
      setHtmlCode(found.html);
      setCssCode(found.css);
      setJsCode(found.js);
    }
  };

  // Comprehensive Code Analysis Engine based on Selected Browser
  useEffect(() => {
    const errs: string[] = [];
    const warns: string[] = [];
    const hacks: string[] = [];

    const fullCode = (htmlCode + ' ' + cssCode + ' ' + jsCode).toLowerCase();

    // 1. MOSAIC 1.0 (1993)
    if (selectedBrowser === 'mosaic1') {
      if (cssCode.trim().length > 0) {
        errs.push("NCSA Mosaic 1.0 n'a aucun support du CSS (inventé en 1994). Vos règles CSS seront totalement ignorées.");
      }
      if (jsCode.trim().length > 0) {
        errs.push("NCSA Mosaic 1.0 ne supporte pas JavaScript (créé en 1995 par Brendan Eich). Vos scripts ne s'exécuteront pas.");
      }
      if (fullCode.includes('<table')) {
        warns.push("Les tableaux HTML (<table) n'existaient pas encore dans Mosaic 1.0. Le texte sera affiché au kilomètre.");
      }
      if (fullCode.includes('<img')) {
        warns.push("Mosaic 1.0 a été le premier navigateur à afficher des images inline, mais uniquement en format GIF ou XBM.");
      }
      hacks.push("Contournement d'époque (1993) : Formater la mise en page à l'aide de la balise de texte préformaté <PRE>.");
    }

    // 2. NETSCAPE NAVIGATOR 4.0 (1997)
    else if (selectedBrowser === 'netscape4') {
      if (fullCode.includes('display: flex') || fullCode.includes('display:grid') || fullCode.includes('display: flex')) {
        errs.push("Netscape 4 ne supporte ni Flexbox ni CSS Grid. La mise en page s'effondrera sous forme de bloc vertical.");
      }
      if (fullCode.includes('border-radius') || fullCode.includes('box-shadow') || fullCode.includes('linear-gradient')) {
        errs.push("Propriétés CSS3 (border-radius, box-shadow, linear-gradient) inconnues dans Netscape 4.");
      }
      if (fullCode.includes('const ') || fullCode.includes('let ') || fullCode.includes('=>')) {
        errs.push("Syntaxe JavaScript ES6 (const/let/fonctions fléchées) non gérée par le moteur JS de Netscape 4 (ES1/ES3).");
      }
      if (fullCode.includes('document.getelementbyid')) {
        warns.push("document.getElementById() n'était pas encore standardisé dans Netscape 4. Il fallait utiliser document.layers['monLayer'].");
      }
      if (fullCode.includes('<marquee>') || fullCode.includes('<blink>')) {
        warns.push("Netscape 4 gère la balise <blink> (sa création propre), mais la balise <marquee> est une extension concurrent d'Internet Explorer.");
      }
      hacks.push("Contournement d'époque (1997) : Réaliser les mises en page multi-colonnes en imbriquant des tableaux HTML <table border=0>.");
    }

    // 3. INTERNET EXPLORER 5.5 / 6.0 (2001)
    else if (selectedBrowser === 'ie6') {
      if (fullCode.includes('display: flex') || fullCode.includes('display: grid')) {
        errs.push("Internet Explorer 6 (Trident) ne supporte pas Flexbox ni CSS Grid.");
      }
      if (fullCode.includes('border-radius') || fullCode.includes('box-shadow')) {
        errs.push("Aucun support des coins arrondis (border-radius) ni des ombres CSS3 dans IE6.");
      }
      if (cssCode.includes('padding:') && cssCode.includes('width:')) {
        warns.push("⚠️ BUG DU MODÈLE DE BOÎTE IE6 (Quirks Mode) : La largeur 'width' englobe le padding et la border, rétrécissant le contenu visuel par rapport aux standards W3C.");
      }
      if (fullCode.includes('document.all')) {
        warns.push("Utilisation de l'API propriétaire IE document.all[id].");
      }
      if (fullCode.includes('opacity:')) {
        warns.push("IE6 n'accepte pas CSS opacity. Il faut utiliser la propriété propriétaire filter: alpha(opacity=XX).");
      }
      hacks.push("Hacks d'époque IE6 : Utiliser les commentaires conditionnels <!--[if IE 6]> pour charger des feuilles de style correctives ou le hack * html .box.");
    }

    // 4. SAFARI 1.0 (2003)
    else if (selectedBrowser === 'safari1') {
      if (fullCode.includes('display: flex') || fullCode.includes('display: grid')) {
        errs.push("Safari 1.0 (basé sur KHTML) ne supportait pas encore Flexbox ni CSS Grid (introduits plus tard dans WebKit).");
      }
      if (fullCode.includes('const ') || fullCode.includes('let ')) {
        warns.push("Syntaxe ES6 détectée. Safari 1.0 utilise ECMAScript 3 (requiert 'var').");
      }
      if (fullCode.includes('document.getelementbyid')) {
        warns.push("Safari 1.0 supporte parfaitement le W3C DOM Level 1 (document.getElementById).");
      }
      hacks.push("Soutien précurseur de WebKit : Safari 1.0 fut l'un des premiers navigateurs à valider rigoureusement le test Acid2 du W3C.");
    }

    // 5. MODERN CHROME (2026)
    else {
      if (fullCode.includes('<blink>') || fullCode.includes('<layer>')) {
        warns.push("Les balises historiques <blink> et <layer> sont dépréciées et désactivées sur les navigateurs modernes.");
      }
      if (fullCode.includes('document.all') || fullCode.includes('document.layers')) {
        warns.push("Les objets propriétaires anciens (document.all, document.layers) sont obsolètes.");
      }
      if (errs.length === 0) {
        warns.push("Code 100% compatible avec les normes du Web moderne (HTML5 / CSS3 / ES6+).");
      }
    }

    setCriticalErrors(errs);
    setWarnings(warns);
    setHistoricalHacks(hacks);

  }, [htmlCode, cssCode, jsCode, selectedBrowser]);

  // Construct simulated html preview with browser-specific styles
  const getSimulatedHTML = () => {
    let modifiedCSS = cssCode;
    let modifiedHTML = htmlCode;

    // Simulate Netscape 4 rendering limitations
    if (selectedBrowser === 'netscape4') {
      modifiedCSS = modifiedCSS
        .replace(/linear-gradient\([^)]+\)/gi, '#c0c0c0')
        .replace(/display:\s*flex/gi, 'display: block')
        .replace(/display:\s*grid/gi, 'display: block')
        .replace(/border-radius:[^;]+/gi, 'border-radius: 0px')
        .replace(/box-shadow:[^;]+/gi, 'box-shadow: none');
    }

    // Simulate IE6 Box Model and rendering quirks
    if (selectedBrowser === 'ie6') {
      modifiedCSS = modifiedCSS
        .replace(/linear-gradient\([^)]+\)/gi, '#2b303c')
        .replace(/display:\s*flex/gi, 'display: block')
        .replace(/display:\s*grid/gi, 'display: block')
        .replace(/border-radius:[^;]+/gi, 'border-radius: 0px')
        .replace(/box-shadow:[^;]+/gi, 'border: 2px solid #808080');
    }

    // Simulate Mosaic 1.0 (no styles)
    if (selectedBrowser === 'mosaic1') {
      modifiedCSS = 'body { font-family: "Times New Roman", serif; background-color: #c0c0c0; color: #000000; } a { color: #0000ff; text-decoration: underline; }';
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${selectedBrowser === 'mosaic1' ? `
              body { font-family: 'Times New Roman', serif !important; background-color: #c0c0c0 !important; color: #000000 !important; padding: 15px; }
              a { color: #0000ff !important; text-decoration: underline !important; }
            ` : ''}
            ${selectedBrowser === 'netscape4' ? `
              body { font-family: 'Times New Roman', serif; background-color: #c0c0c0; color: #000000; padding: 15px; }
              ${modifiedCSS}
            ` : ''}
            ${selectedBrowser === 'ie6' ? `
              body { font-family: 'MS Sans Serif', Arial, sans-serif; background-color: #3a6ea5; color: #000000; padding: 15px; }
              ${modifiedCSS}
            ` : ''}
            ${selectedBrowser === 'safari1' ? `
              body { font-family: 'Lucida Grande', Arial, sans-serif; background-color: #e8e8e8; color: #000000; padding: 15px; }
              ${modifiedCSS}
            ` : ''}
            ${selectedBrowser === 'chrome' ? `
              body { font-family: system-ui, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
              ${modifiedCSS}
            ` : ''}
          </style>
        </head>
        <body>
          ${modifiedHTML}
          <script>
            try {
              ${jsCode}
            } catch(e) {
              console.error("Erreur de script exécuté dans le simulateur :", e.message);
            }
          </script>
        </body>
      </html>
    `;
  };

  return (
    <div className="space-y-6 text-left" id="browser-compatibility-simulator-root">
      
      {/* Simulation Banner Header */}
      <div className={`p-5 rounded-2xl border ${
        theme === 'ie6' ? 'bg-[#c0c0c0] border-white text-black shadow-[2px_2px_0px_white_inset]' :
        theme === 'terminal' ? 'bg-[#ffb000]/10 border-[#ffb000]/40 text-[#ffb000]' : 'bg-[#111114] border-[#2a2a2e] text-slate-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Monitor className="w-6 h-6 animate-pulse text-sky-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-sky-400 uppercase block">Simulateur Rétro-Technologique</span>
              <h2 className="text-base md:text-lg font-extrabold flex items-center gap-2 mt-0.5">
                Browser Compatibility Simulator (Simulateur de Compatibilité Navigateurs)
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono opacity-80">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mosaic, Netscape 4, IE 6, Safari 1 & Chrome</span>
          </div>
        </div>
        <p className="text-xs opacity-80 mt-3 leading-relaxed">
          Testez le comportement de vos snippets d'HTML, CSS et JavaScript face aux moteurs de rendu historiques. Obtenez un aperçu visuel en direct ainsi qu'un rapport détaillé des anomalies, des erreurs de syntaxe non gérées d'époque et des hacks de compatibilité.
        </p>
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className={`p-4 rounded-xl border ${
        theme === 'ie6' ? 'bg-[#d4d0c8] border-[#808080]' : 'bg-[#141417] border-[#2a2a2e]'
      }`}>
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block mb-2">
          ⚡ Charger un Modèle de Test Pré-configuré :
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`p-3 rounded-lg text-left text-xs transition border cursor-pointer ${
                selectedPreset === preset.id
                  ? 'bg-indigo-650/20 border-indigo-500 text-indigo-300 font-bold shadow-md'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block text-[11px] font-sans">{preset.name}</span>
              <span className="text-[10px] opacity-70 block font-normal leading-tight mt-1">{preset.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace: Left Column Code Input Tabs / Right Column Browser Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code Snippet Textarea Editor (span 6) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">
              📝 Saisie des Extraits de Code (Snippet) :
            </span>
            <div className="flex gap-1">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-t-lg transition border-t border-x cursor-pointer uppercase ${
                    activeTab === tab
                      ? 'bg-black text-emerald-400 border-slate-700 font-black'
                      : 'bg-slate-900 text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-black flex flex-col flex-1 min-h-[360px]">
            <div className="px-4 py-2 bg-[#18181c] border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 uppercase font-bold text-emerald-400">
                <Code2 className="w-3.5 h-3.5" /> Éditeur {activeTab.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  if (activeTab === 'html') setHtmlCode('');
                  if (activeTab === 'css') setCssCode('');
                  if (activeTab === 'js') setJsCode('');
                }}
                className="text-[10px] text-red-400 hover:text-red-300 transition cursor-pointer"
              >
                Vider {activeTab.toUpperCase()}
              </button>
            </div>

            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="Entrez votre code HTML..."
                className="w-full flex-1 min-h-[320px] p-4 font-mono text-[11px] bg-black text-emerald-400 focus:outline-none resize-none scrollbar-thin outline-none leading-relaxed"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                placeholder="Entrez vos règles CSS..."
                className="w-full flex-1 min-h-[320px] p-4 font-mono text-[11px] bg-black text-sky-300 focus:outline-none resize-none scrollbar-thin outline-none leading-relaxed"
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                placeholder="Entrez votre script JavaScript..."
                className="w-full flex-1 min-h-[320px] p-4 font-mono text-[11px] bg-black text-yellow-300 focus:outline-none resize-none scrollbar-thin outline-none leading-relaxed"
              />
            )}
          </div>

        </div>

        {/* Right Column: Historical Browser Engine Selector & Frame Preview (span 6) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
          
          {/* Target Browser Selector Toolbar */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block">
              🌐 Sélectionner le Navigateur Cible :
            </span>
            <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'mosaic1', label: 'Mosaic 1.0 (1993)' },
                { id: 'netscape4', label: 'Netscape 4 (1997)' },
                { id: 'ie6', label: 'IE 6 Quirks (2001)' },
                { id: 'safari1', label: 'Safari 1.0 (2003)' },
                { id: 'chrome', label: 'Chrome (2026)' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrowser(b.id as TargetBrowser)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg transition cursor-pointer shrink-0 ${
                    selectedBrowser === b.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Browser Frame */}
          <div className="border border-slate-800 bg-[#0c0c0e] rounded-xl overflow-hidden shadow-2xl flex flex-col flex-1 min-h-[340px]">
            
            {/* Retro Window Header */}
            <div className="bg-[#1b1b22] px-4 py-2 border-b border-slate-850 flex items-center justify-between text-xs select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                </div>
                <span className="text-[10px] font-mono text-slate-300 font-bold ml-2">
                  {selectedBrowser === 'mosaic1' ? 'NCSA Mosaic v1.0 - [X11 Window]' :
                   selectedBrowser === 'netscape4' ? 'Netscape Communicator v4.7' :
                   selectedBrowser === 'ie6' ? 'Internet Explorer 6.0 - Windows XP Edition' :
                   selectedBrowser === 'safari1' ? 'Safari v1.0 (v85) - Mac OS X Panther' :
                   'Google Chrome - Engine 2026'}
                </span>
              </div>
            </div>

            {/* Address Bar */}
            <div className="bg-[#141416] px-3 py-1.5 border-b border-slate-900 flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 select-none">URL :</span>
              <div className="flex-1 bg-slate-950 px-3 py-1 rounded border border-slate-850 text-[10px] text-slate-400 font-mono">
                {selectedBrowser === 'mosaic1' ? 'http://info.cern.ch/hypertext/test.html' :
                 selectedBrowser === 'netscape4' ? 'http://home.netscape.com/preview.htm' :
                 selectedBrowser === 'ie6' ? 'res://mshtml.dll/index.html' :
                 selectedBrowser === 'safari1' ? 'http://www.apple.com/safari/test.html' :
                 'https://localhost:3000/browser-simulator'}
              </div>
            </div>

            {/* Interactive iFrame Render Area */}
            <div className="flex-1 bg-white overflow-auto min-h-[280px]">
              <iframe
                title="Browser Compatibility Frame"
                srcDoc={getSimulatedHTML()}
                className="w-full h-full min-h-[280px] border-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Comprehensive Compatibility & Diagnostic Report Cards */}
      <div className="space-y-3 pt-2">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block">
          🔍 Diagnostic Détaillé de Compatibilité pour {selectedBrowser.toUpperCase()} :
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Critical Incompatibilities */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-red-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> Erreurs / Propriétés Incompatibles ({criticalErrors.length}) :
            </span>
            {criticalErrors.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Aucune incompatibilité critique détectée.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-red-200 font-sans">
                {criticalErrors.map((err, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quirks & Warnings */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Quirks & Particularités de Rendu ({warnings.length}) :
            </span>
            {warnings.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Aucune particularité notable.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-amber-200 font-sans">
                {warnings.map((warn, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Historical Hacks & Advice */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Hacks & Conseils Historiques ({historicalHacks.length}) :
            </span>
            <ul className="space-y-1.5 text-xs text-indigo-200 font-sans">
              {historicalHacks.map((hack, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{hack}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
