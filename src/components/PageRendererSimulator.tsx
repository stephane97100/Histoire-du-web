/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  Terminal, 
  Settings, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  FileCode,
  Layers,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface PageRendererSimulatorProps {
  theme: 'modern' | 'ie6' | 'terminal';
  isLightMode?: boolean;
}

interface PresetSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
}

const PRESETS: PresetSnippet[] = [
  {
    id: 'modern_card',
    name: 'Card de Produit Moderne (Flexbox/Gradients)',
    description: 'Une carte moderne avec bords arrondis, ombres portées, dégradés de couleur et mise en page Flexbox.',
    code: `<div style="background: linear-gradient(135deg, #1e1e2f, #3b3b5c); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-width: 320px; font-family: sans-serif; transition: transform 0.2s;">
  <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #10b981; font-weight: bold; margin-bottom: 8px;">Nouveauté</div>
  <h3 style="margin: 0 0 10px 0; font-size: 20px;">iMac G3 Graphite</h3>
  <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 20px;">Le design rétro-futuriste transparent qui a sauvé Apple. Connectique USB intégrée par défaut.</p>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 18px; font-weight: bold; color: #3b82f6;">1 299 €</span>
    <button style="background-color: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer;">Acheter en ligne</button>
  </div>
</div>`
  },
  {
    id: 'retro_newsletter',
    name: 'Encart avec Blinks & Marquees (Années 1999)',
    description: 'Une mise en page typique de la fin des années 90 avec texte défilant et clignotements.',
    code: `<center>
  <table border="3" cellpadding="10" cellspacing="5" bgcolor="#c0c0c0" bordercolor="#000080" width="400">
    <tr>
      <td align="center" bgcolor="#000080">
        <font color="#ffffff" size="4" face="Courier New"><b>SURFEZ SUR L'AN 2000 !</b></font>
      </td>
    </tr>
    <tr>
      <td bgcolor="#ffffff">
        <marquee scrollamount="3" direction="left"><font color="#ff0000"><b>★★★ GRAND CONCOURS DE L'ÉTÉ POUR GAGNER UN MODEM 56K !!! ★★★</b></font></marquee>
        <p align="center">
          <font face="Times New Roman" size="3" color="#000000">
            Inscrivez-vous dès maintenant à notre club d'internautes privilégiés.
            <br><br>
            <blink><b>Saisissez votre email rapidement !</b></blink>
          </font>
        </p>
        <center>
          <input type="text" size="25" value="visiteur@caramail.com">
          <br><br>
          <input type="submit" value="REJOINDRE LE CYBER-RÉSEAU">
        </center>
      </td>
    </tr>
  </table>
</center>`
  },
  {
    id: 'nav_column',
    name: 'Menu de Navigation en Grille responsive',
    description: 'Une grille de navigation utilisant CSS Grid et des transitions au hover.',
    code: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 450px; font-family: sans-serif;">
  <a href="#" style="background-color: #1e293b; color: white; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; border: 1px solid #334155;">
    <div style="font-size: 18px;">🏠</div>
    <div style="font-size: 11px; font-weight: bold; margin-top: 4px;">Accueil</div>
  </a>
  <a href="#" style="background-color: #1e293b; color: white; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; border: 1px solid #334155;">
    <div style="font-size: 18px;">🛒</div>
    <div style="font-size: 11px; font-weight: bold; margin-top: 4px;">Boutique</div>
  </a>
  <a href="#" style="background-color: #1e293b; color: white; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; border: 1px solid #334155;">
    <div style="font-size: 18px;">📧</div>
    <div style="font-size: 11px; font-weight: bold; margin-top: 4px;">Contact</div>
  </a>
</div>`
  }
];

export default function PageRendererSimulator({ theme, isLightMode = false }: PageRendererSimulatorProps) {
  const [code, setCode] = useState<string>(PRESETS[0].code);
  const [selectedBrowser, setSelectedBrowser] = useState<'netscape' | 'ie6' | 'chrome'>('chrome');
  const [analysisReport, setAnalysisReport] = useState<string[]>([]);

  // Function to analyze user code for historical problems
  const analyzeCodeForBugs = (htmlCode: string) => {
    const alerts: string[] = [];
    const lowerCode = htmlCode.toLowerCase();

    // Check layouts
    if (lowerCode.includes('display: flex') || lowerCode.includes('display:flex')) {
      alerts.push("Flexbox : Totalement ignoré par Netscape 4 et IE 6. Les éléments s'empileront à plat de haut en bas.");
    }
    if (lowerCode.includes('display: grid') || lowerCode.includes('display:grid') || lowerCode.includes('grid-template')) {
      alerts.push("CSS Grid : Inconnu des navigateurs d'époque. IE6 et Netscape 4 afficheront les éléments les uns en dessous des autres d'une manière désordonnée.");
    }

    // Check styling decoration
    if (lowerCode.includes('border-radius')) {
      alerts.push("Bords Arrondis (border-radius) : Coins parfaitement carrés sous Netscape 4 et IE6. Apparu seulement avec le standard CSS3 à la fin des années 2000.");
    }
    if (lowerCode.includes('box-shadow')) {
      alerts.push("Ombres Portées (box-shadow) : Absentes ou gâchées sous IE6. Les surfaces de cartes flottent sans profondeur réaliste.");
    }
    if (lowerCode.includes('linear-gradient') || lowerCode.includes('radial-gradient')) {
      alerts.push("Dégradés CSS (gradient) : Ignorés. Netscape 4 et IE6 s'arrêteront au fond de secours unicolor si spécifié, sinon afficheront un fond vide transparent ou blanc.");
    }

    // Check tags
    if (lowerCode.includes('<blink')) {
      alerts.push("Balise <blink> : Spécifique à Netscape Navigator. Elle fera clignoter le texte sous Netscape, restera statique sous Internet Explorer, et est proscrite par le W3C moderne.");
    }
    if (lowerCode.includes('<marquee')) {
      alerts.push("Balise <marquee> : Créée à l'origine par Microsoft pour Internet Explorer. Le texte défilera sous IE6, mais restera statique ou absent sous des versions de Netscape non raccordées.");
    }
    if (lowerCode.includes('<center')) {
      alerts.push("Balise <center> : Dépréciée dans les normes HTML5 modernes par souci de séparation fond/forme, mais incroyablement robuste et interprétée par tous les navigateurs retros !");
    }

    if (alerts.length === 0) {
      alerts.push("Aucun élément CSS sensible détecté. Votre code brut utilise des structures standardisées très simples.");
    }

    setAnalysisReport(alerts);
  };

  useEffect(() => {
    analyzeCodeForBugs(code);
  }, [code]);

  // Apply browser simulations
  const getSimulatedStyles = () => {
    if (selectedBrowser === 'netscape') {
      return `
        font-family: 'Times New Roman', Times, serif !important;
        background-color: #c0c0c0 !important;
        color: #000000 !important;
        line-height: normal !important;
        font-size: 14px !important;
        text-align: left !important;
      `;
    }
    if (selectedBrowser === 'ie6') {
      return `
        font-family: 'MS Sans Serif', 'Arial', sans-serif !important;
        background-color: #3a6ea5 !important;
        color: #000000 !important;
        line-height: normal !important;
        font-size: 12px !important;
      `;
    }
    return ''; // Chrome: Raw modern CSS unmodified
  };

  const getCleanPreviewHTML = () => {
    // If Netscape 4 simulation: we inject overrides to simulate failure of modern CSS properties.
    if (selectedBrowser === 'netscape') {
      let filtered = code
        // Replace gradients
        .replace(/background:\s*linear-gradient\([^)]+\)/gi, 'background-color: #c0c0c0')
        .replace(/background:\s*radial-gradient\([^)]+\)/gi, 'background-color: #c0c0c0')
        // Remove modern display patterns
        .replace(/display:\s*flex/gi, 'display: block')
        .replace(/display:\s*grid/gi, 'display: block')
        .replace(/justify-content:[^;]+/gi, '')
        .replace(/align-items:[^;]+/gi, '')
        // Remove corner decorations & shadows
        .replace(/border-radius:[^;]+/gi, 'border-radius: 0px')
        .replace(/box-shadow:[^;]+/gi, 'box-shadow: none')
        .replace(/transition:[^;]+/gi, '')
        // Replace colors to basic ones
        .replace(/color:\s*#cbd5e1/gi, 'color: #000000')
        .replace(/color:\s*#10b981/gi, 'color: #008000')
        .replace(/color:\s*#3b82f6/gi, 'color: #0000ff');

      // Netscape had grey light-grey background defaults
      return `
        <div style="font-family: 'Times New Roman', Times, serif; color: black; background-color: #c0c0c0; padding: 15px; min-height: 250px; text-align: left;">
          ${filtered}
        </div>
      `;
    }

    // If IE6 simulation: we inject box shadow and flex/grid cancellation
    if (selectedBrowser === 'ie6') {
      let filtered = code
        // Replace gradients with opaque solid background
        .replace(/background:\s*linear-gradient\([^)]+\)/gi, 'background-color: #1e1e2f')
        .replace(/background:\s*radial-gradient\([^)]+\)/gi, 'background-color: #1e1e2f')
        // Cancel layouts
        .replace(/display:\s*flex/gi, 'display: block')
        .replace(/display:\s*grid/gi, 'display: block')
        .replace(/justify-content:[^;]+/gi, '')
        .replace(/align-items:[^;]+/gi, '')
        // Cancel rounded edges & shadows
        .replace(/border-radius:[^;]+/gi, 'border-radius: 0px')
        .replace(/box-shadow:[^;]+/gi, 'border: 2px solid #808080')
        // Box model bug simulation (padding and border subtracts height and width unexpectedly to shrink element)
        .replace(/max-width:\s*320px/gi, 'max-width: 240px; border: 3px solid #808080; box-sizing: border-box;');

      return `
        <div style="font-family: 'MS Sans Serif', Arial, sans-serif; color: black; background-color: #3a6ea5; padding: 25px; min-height: 250px; display: flex; align-items: center; justify-content: center;">
          <div style="background-color: #ffffff; padding: 10px; border: 2px solid white; display: inline-block;">
            ${filtered}
          </div>
        </div>
      `;
    }

    // Modern Chrome: Render snippet cleanly
    return `
      <div style="padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 250px;">
        ${code}
      </div>
    `;
  };

  return (
    <div className="space-y-6 text-left" id="page-renderer-simulator-root">
      
      {/* Simulation Banner Info */}
      <div className={`p-5 rounded-2xl border ${
        theme === 'ie6' ? 'bg-[#c0c0c0] border-white text-black' :
        theme === 'terminal' ? 'bg-[#ffb000]/10 border-[#ffb000]/40 text-[#ffb000]' :
        isLightMode ? 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f]' : 'bg-[#111114] border-[#2a2a2e] text-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Monitor className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold tracking-wider text-blue-4e0 uppercase block">Simulateur Rétro-Technologique</span>
            <h2 className="text-sm font-extrabold flex items-center gap-2 mt-0.5">
              Simulateur de Rendu de Moteur de Navigateurs
            </h2>
          </div>
        </div>
        <p className="text-xs opacity-80 mt-2.5 leading-relaxed">
          Écrivez ou importez n'importe quel code HTML/CSS brut. Sélectionnez ensuite la version du moteur de navigation pour voir comment les anomalies de rendering d'époque (comme la non-coordination des flexbox ou le bug du modèle de boîte d'IE) détruiraient ou altéreraient votre design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code input & presets selector (span 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Preset Buttons */}
          <div className={`p-4 rounded-xl border ${
            theme === 'ie6' ? 'bg-[#d4d0c8]' : 'bg-[#141417]'
          }`}>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block mb-2">
              📂 Charger un modèle prédéfini :
            </span>
            <div className="flex flex-col gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setCode(preset.code);
                  }}
                  className={`p-2 rounded-lg text-left text-xs transition border cursor-pointer ${
                    code === preset.code
                      ? 'bg-indigo-650/15 border-indigo-500/40 text-indigo-400 font-bold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <span className="font-bold block text-[11px] font-sans">{preset.name}</span>
                  <span className="text-[10px] opacity-70 block font-normal leading-tight mt-0.5">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Textarea Editor */}
          <div className={`rounded-xl border overflow-hidden flex flex-col ${
            theme === 'ie6' ? 'border-[#808080]' : 'border-slate-800'
          }`}>
            <div className={`px-4 py-2 border-b flex justify-between items-center text-xs ${
              theme === 'ie6' ? 'bg-[#d4d0c8]' : 'bg-[#18181c]'
            }`}>
              <span className="font-mono text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" /> Saisissez votre snippet HTML/CSS :
              </span>
              <button
                onClick={() => setCode('')}
                className="text-[10px] font-mono text-red-400 hover:text-red-300 transition cursor-pointer"
              >
                Vider
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Saisissez ou collez votre code brut ici (Inline styles autorisés)..."
              className="w-full h-80 max-h-96 min-h-[180px] p-4 font-mono text-[11px] bg-black text-emerald-400 focus:outline-none resize-none scrollbar-thin outline-none leading-relaxed"
            />
          </div>

        </div>

        {/* Right Column: Rendering Preview & Browser simulation (span 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Browser Selector Toolbar */}
          <div className="p-2 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-slate-400 ml-2 font-mono flex items-center gap-1 text-[11px]">
              <Settings className="w-3.5 h-3.5 text-indigo-400" /> Choisir le Navigateur Cible :
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedBrowser('netscape')}
                className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all cursor-pointer ${
                  selectedBrowser === 'netscape'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/35 font-bold'
                    : 'text-slate-500 hover:text-slate-350 border border-transparent'
                }`}
              >
                Netscape 4 (1997)
              </button>
              <button
                onClick={() => setSelectedBrowser('ie6')}
                className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all cursor-pointer ${
                  selectedBrowser === 'ie6'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/35 font-bold'
                    : 'text-slate-500 hover:text-slate-350 border border-transparent'
                }`}
              >
                IE 6 Quirks (2001)
              </button>
              <button
                onClick={() => setSelectedBrowser('chrome')}
                className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all cursor-pointer ${
                  selectedBrowser === 'chrome'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                    : 'text-slate-500 hover:text-slate-350 border border-transparent'
                }`}
              >
                Modern Chrome (2026)
              </button>
            </div>
          </div>

          {/* Browser Container Frame Display */}
          <div className="border border-slate-800 bg-[#0c0c0e] rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[340px]">
            
            {/* Simulated Desktop Window Frame */}
            <div className="bg-[#1b1b22] px-4 py-2 border-b border-slate-850 flex items-center justify-between text-xs select-none">
              
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 height h-3 rounded-full bg-red-500 block" />
                  <span className="w-3 height h-3 rounded-full bg-yellow-500 block" />
                  <span className="w-3 height h-3 rounded-full bg-emerald-500 block" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 ml-2">
                  {selectedBrowser === 'netscape' ? 'Netscape Communicator 4.7' : 
                   selectedBrowser === 'ie6' ? 'Internet Explorer 6.0 - Windows XP Edition' : 
                   'Google Chrome - Stable Build 2026'}
                </span>
              </div>

              {/* Status Lamp */}
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                <span className={`w-2 h-2 rounded-full ${
                  selectedBrowser === 'netscape' ? 'bg-orange-500 animate-pulse' :
                  selectedBrowser === 'ie6' ? 'bg-blue-500' : 'bg-emerald-500'
                }`} />
                <span>Simul_Mod_ENG</span>
              </div>
            </div>

            {/* Address Bar */}
            <div className="bg-[#141416] p-2 border-b border-slate-900 flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 select-none">Adresse :</span>
              <div className="flex-1 bg-slate-950 px-3 py-1 rounded border border-slate-850 text-[10px] text-slate-400 font-mono">
                {selectedBrowser === 'netscape' ? 'http://internetsite.com/welcome.htm' :
                 selectedBrowser === 'ie6' ? 'c:\\windows\\temp\\index.html' :
                 'https://museum.w3c.org/sandbox'}
              </div>
            </div>

            {/* Interactive Simulated Render Frame Output */}
            <div className="flex-1 bg-[#1c1c22] p-0 overflow-auto min-h-[300px] flex flex-col justify-stretch">
              <iframe
                title="Browser Simulation Frame"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        body { margin: 0; padding: 0; }
                        ${selectedBrowser === 'netscape' ? `
                          body, p, h1, h2, h3, h4, td, div, button {
                            font-family: 'Times New Roman', Times, serif !important;
                            color: #000000 !important;
                          }
                          a { color: #0000ff !important; text-decoration: underline !important; }
                        ` : ''}
                        ${selectedBrowser === 'ie6' ? `
                          body, p, h1, h2, h3, h4, td, div, button {
                            font-family: 'MS Sans Serif', 'Arial', sans-serif !important;
                            color: #000000 !important;
                          }
                        ` : ''}
                      </style>
                    </head>
                    <body>
                      ${getCleanPreviewHTML()}
                    </body>
                  </html>
                `}
                className="w-full flex-1 border-none min-h-[300px] bg-white text-black"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* Differential Analysis Report */}
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-4 space-y-3">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#3b82f6] flex items-center gap-1 pb-1 border-b border-[#2a2a2e]">
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
              Rapport d'Analyse Chronologique et de Rendu :
            </span>
            <div className="space-y-2 text-xs">
              {analysisReport.map((rep, index) => (
                <div key={index} className="flex gap-2 items-start text-slate-400 font-sans leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  <p>{rep}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
