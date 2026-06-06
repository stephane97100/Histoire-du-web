/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Milestone, 
  Code2, 
  Laptop, 
  HelpCircle, 
  Calendar, 
  Layers, 
  Terminal, 
  Check, 
  Cpu, 
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';
import ShareButtons from './ShareButtons';

interface W3cVersionerProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

interface SpecItem {
  id: string; // '1995' | '2004' | '2026'
  epoch: string;
  w3cSpec: string;
  techStack: string;
  limitationHtml: string;
  explanation: string;
  codeSnippet: string;
  renderSim: () => React.ReactNode;
}

interface SpecTask {
  id: string; // 'button' | 'card' | 'layout'
  label: string;
  description: string;
  specs: Record<string, SpecItem>;
}

export default function W3cVersioner({ theme }: W3cVersionerProps) {
  const [activeTaskId, setActiveTaskId] = useState<string>('button');
  const [activeSpecId, setActiveSpecId] = useState<string>('2026');

  const tasks: SpecTask[] = [
    {
      id: 'button',
      label: '🔘 Bouton d\'Action (CTA)',
      description: 'Programmer un bouton cliquable de couleur avec des coins adoucis et un effet interactif de survol.',
      specs: {
        '1995': {
          id: '1995',
          epoch: 'Années 1995 (HTML 2.0 / 3.2)',
          w3cSpec: 'W3C HTML 3.2 Standard',
          techStack: '<center> & <table> de tricheur',
          limitationHtml: 'Pas de CSS, pas d\'arrondis du tout, pas d\'états de survol réactifs en natif (sauf via de lourdes fonctions JScript d\'époque).',
          explanation: 'En 1995, pour donner une apparence de bouton capitonné en relief sans utiliser d\'images physiques découpées, on trichait en imbriquant des cellules de tableau dotées d\'attributs de bordure étirés et de balises de polices dures.',
          codeSnippet: `<center>
  <table border="3" cellpadding="6" cellspacing="0" bgcolor="#C0C0C0" bordercolorlight="#FFFFFF" bordercolordark="#808080">
    <tr>
      <td align="center">
        <font face="Arial" size="2" color="#000000">
          <a href="#" style="text-decoration:none;font-weight:bold;color:#000000;">
            CLIQUEZ ICI
          </a>
        </font>
      </td>
    </tr>
  </table>
</center>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-8 bg-[#d4d0c8] min-h-[140px] select-none text-black font-sans border border-[#808080]">
              <div className="bg-[#c0c0c0] p-[2px]" style={{ boxShadow: '2px 2px 0px #000 inset, -2px -2px 0px #fff inset' }}>
                <table border={3} style={{ backgroundColor: '#c0c0c0', borderColor: '#ffffff #808080 #808080 #ffffff' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '6px 14px', textAlign: 'center' }}>
                        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#000000', cursor: 'pointer' }}>
                          CLIQUEZ ICI
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span className="text-[9px] text-[#555] font-mono mt-3">Rendu natif 16 bits sans fioritures (Simulé)</span>
            </div>
          )
        },
        '2004': {
          id: '2004',
          epoch: 'Années 2004 (HTML 4.01 + CSS 2.1)',
          w3cSpec: 'W3C CSS 2.1 Specification',
          techStack: 'Divs & Slices Photoshop (.gif)',
          limitationHtml: 'La propriété border-radius n\'existait pas encore sous IE6 ! Les coins arrondis devaient être créés en découpant quatre petites images d\'angles assemblées.',
          explanation: 'Pour éviter d\'assembler 4 images à chaque fois, on programmait des boutons carrés rigides mais personnalisés en CSS1/2 avec un état de survol (:hover) changeant l\'arrière-plan.',
          codeSnippet: `/* Feuille CSS d'époque */
.btn-retro-2004 {
  display: block;
  width: 140px;
  background-color: #3b5998; /* Bleu Facebook original */
  border: 1px solid #223863;
  padding: 8px 12px;
  text-align: center;
  font-family: Verdana, sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: #FFFFFF;
  text-decoration: none;
}
.btn-retro-2004:hover {
  background-color: #4c66a4;
  cursor: pointer;
}`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-8 bg-[#f5f5f5] min-h-[140px] text-black">
              <div 
                className="w-40 bg-[#3b5998] border border-[#223863] py-2 px-3 text-center align-middle transition duration-150 hover:bg-[#4c66a4] select-none text-white font-bold"
                style={{ fontFamily: 'Verdana, sans-serif', fontSize: '11px', cursor: 'pointer' }}
              >
                CLIQUEZ ICI
              </div>
              <span className="text-[9px] text-gray-550 font-mono mt-3">Coins carrés standard conformes à l'ère IE6</span>
            </div>
          )
        },
        '2026': {
          id: '2026',
          epoch: 'Aujourd\'hui (HTML5 + CSS 3.0 / Next-gen)',
          w3cSpec: 'W3C CSS3 Values & Variables Standard',
          techStack: 'Variables Natives, Flexbox & Gradients',
          limitationHtml: 'Aucune limitation matérielle. Prise en charge fluide des grilles matérielles, de l\'antialiasing subpixel, des variables CSS et des transitions d\'accélération matérielle.',
          explanation: 'Aujourd\'hui, nul besoin d\'images ou de tableaux. Nous appliquons un simple border-radius fluide avec des gradients cinétiques colorés et une transition linéaire accélérée sur le GPU.',
          codeSnippet: `/* CSS moderne et sémantique */
.btn-modern-2026 {
  padding: 10px 20px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 9999px; /* Forme pilule parfaite */
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  transition: all 0.2s ease-in-out;
}
.btn-modern-2026:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-8 bg-[#09090b] min-h-[140px] text-white rounded-xl border border-slate-800">
              <motion.button 
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-550 to-purple-600 rounded-full font-bold text-xs text-white shadow-[0_4px_12px_rgba(99,102,241,0.25)] select-none cursor-pointer"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                CLIQUEZ ICI
              </motion.button>
              <span className="text-[9px] text-slate-500 font-mono mt-3">Pellicule vectorielle antialiasée 2026</span>
            </div>
          )
        }
      }
    },
    {
      id: 'card',
      label: '📇 Carte de Profil Membre',
      description: 'Assembler un bloc d\'utilisateur contenant un avatar circulaire aligné à gauche avec un titre et un petit paragraphe adjacent.',
      specs: {
        '1995': {
          id: '1995',
          epoch: 'Années 1995 (HTML 2.0 / 3.2)',
          w3cSpec: 'HTML 3.2 Tables Framework',
          techStack: 'Imbrications complexes de <td>',
          limitationHtml: 'Créer un conteneur divisé en deux sections horizontales sans tableur était impossible en HTML2. Les images d\'avatar n\'avaient pas de bordures arrondies.',
          explanation: 'On enfermait les données dans une table sémantique avec des cellules séparées pour structurer la colonne gauche (avatar) et droite (texte descriptif).',
          codeSnippet: `<table width="280" border="1" cellpadding="8" cellspacing="0" bgcolor="#D4D0C8">
  <tr>
    <td valign="top" width="60">
      <!-- Pas de coins ronds. Avatar carré obligatoire -->
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40" width="40" height="40" alt="Avatar" border="0" />
    </td>
    <td valign="top">
      <font face="Courier New" size="2">
        <b>Marc Webmaster</b><br />
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='2'></svg>" height="4" /><br />
        Pionnier du réseau HTTP. Conception de sites persos.
      </font>
    </td>
  </tr>
</table>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-6 bg-[#d4d0c8] text-black font-sans min-h-[160px]">
              <table border={1} style={{ width: '280px', backgroundColor: '#d4d0c8', borderColor: '#ffffff #808080 #808080 #ffffff' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', width: '50px', verticalAlign: 'top', textAlign: 'center' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=40" 
                        style={{ width: '40px', height: '40px', display: 'block' }} 
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    </td>
                    <td style={{ padding: '8px', verticalAlign: 'top', textAlign: 'left' }}>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '11px' }}>
                        <strong>Marc Webmaster</strong><br />
                        <hr style={{ padding: 0, margin: '4px 0', border: 0, borderTop: '1px dashed #000' }} />
                        Pionnier du réseau HTTP. Conception de sites persos.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        },
        '2004': {
          id: '2004',
          epoch: 'Années 2004 (HTML 4.01 + CSS 2.1)',
          w3cSpec: 'CSS Floats Layout Engine',
          techStack: 'Abstractions float: left & clear: both',
          limitationHtml: 'La propriété Float extrait l\'élément du document de base. Si l\'on n\'ajoutait pas un "clearing div" à la fin, le conteneur s\'effondrait sur lui-même.',
          explanation: 'L\'utilisation de float: left permettait d\'aligner l\'image à gauche du texte. Un élément additionnel doté de "clear: both" était obligatoire pour rétablir la hauteur du parent.',
          codeSnippet: `<!-- Code HTML & CSS 2004 -->
<div style="width: 280px; background-color: #FFFFFF; border: 1px solid #CCCCCC; padding: 10px;">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40" 
       style="float: left; width: 40px; height: 40px; margin-right: 10px;" />
  <div style="float: left; width: 210px;">
    <span style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; color: #333333;">Marc Webmaster</span>
    <p style="font-family: Arial, sans-serif; font-size: 10px; color: #666666; margin: 4px 0 0 0;">
      Technicien DHTML. Expert en animations Flash MX.
    </p>
  </div>
  <div style="clear: both;"></div> <!-- Clear hack obligatoire ! -->
</div>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-6 bg-[#f0f2f5] min-h-[160px] text-black text-left">
              <div style={{ width: '280px', backgroundColor: '#ffffff', border: '1px solid #cccccc', padding: '10px' }} className="shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=40" 
                  style={{ float: 'left', width: '40px', height: '40px', marginRight: '10px' }} 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
                <div style={{ float: 'left', width: '210px' }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', color: '#333333' }}>Marc Webmaster</span>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '10.5px', color: '#666666', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                    Technicien DHTML. Expert en animations Flash MX.
                  </p>
                </div>
                <div style={{ clear: 'both' }}></div>
              </div>
            </div>
          )
        },
        '2026': {
          id: '2026',
          epoch: 'Aujourd\'hui (HTML5 + CSS 3.0 / Next-gen)',
          w3cSpec: 'CSS Flexbox Modern Engine',
          techStack: 'Balise <article> & Display: Flex',
          limitationHtml: 'Aucun hack requis. Code extrêmement court, hautement sémantique et réactif aux écrans.',
          explanation: 'La structure Flexbox aligne l\'avatar (doté d\'un arrondi parfait avec border-radius: 50%) de manière fluide avec l\'élément de description en gérant l\'espacement de manière native.',
          codeSnippet: `<article class="profile-card">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40" alt="Avatar" />
  <div>
    <h4>Marc Webmaster</h4>
    <p>Ingénieur Front-end principal. Spécialiste des micro-fureteurs réactifs.</p>
  </div>
</article>

<style>
.profile-card {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 280px;
  background-color: #111114;
  border: 1px solid #2a2a2e;
  border-radius: 12px;
  padding: 12px;
}
.profile-card img {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Arrondi parfait natif ! */
}
</style>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-6 bg-[#09090b] min-h-[160px] text-white rounded-xl border border-slate-800 text-left">
              <div className="flex items-center gap-3 w-[280px] bg-[#111114] border border-[#2a2a2e] p-3.5 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=40" 
                  className="w-10 h-10 rounded-full border border-slate-700/80" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-100" style={{ fontFamily: 'system-ui, sans-serif' }}>Marc Webmaster</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.3 }}>
                    Ingénieur Front-end principal. Spécialiste des micro-fureteurs réactifs.
                  </p>
                </div>
              </div>
            </div>
          )
        }
      }
    },
    {
      id: 'layout',
      label: '🧱 Grille de Structure (Bento Layout)',
      description: 'Disposer de petits blocs d\'information juxtaposés de manière horizontale sans casser les alignements.',
      specs: {
        '1995': {
          id: '1995',
          epoch: 'Années 1995 (HTML 2.0 / 3.2)',
          w3cSpec: 'Multi-Nested HTML Tables',
          techStack: 'Tableaux imbriqués multiples',
          limitationHtml: 'L\'utilisation de cellules de hauteur variable désalignait automatiquement les autres cellules de la même rangée.',
          explanation: 'On devait imbriquer des tables auxiliaires à l\'intérieur d\'une table maîtresse pour séparer la grille géométrique sans dérégler la rigidité verticale.',
          codeSnippet: `<!-- Double Niveau d'imbrication d'époque -->
<table width="320" border="0" cellpadding="2" cellspacing="0">
  <tr>
    <td>
      <table width="100%" border="1" bgcolor="#E0E0E0">
        <tr>
          <td><font size="1">Section A</font></td>
        </tr>
      </table>
    </td>
    <td>
      <table width="100%" border="1" bgcolor="#C0C0C0">
        <tr>
          <td><font size="1">Section B</font></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-4 bg-[#808080] min-h-[160px] text-black">
              <table border={0} cellPadding={2} cellSpacing={0} style={{ width: '300px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <table border={1} style={{ width: '100%', backgroundColor: '#c0c0c0' }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: '8px', textAlign: 'center', fontFamily: 'monospace', fontSize: '10px' }}>A: Gauche</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ width: '50%' }}>
                      <table border={1} style={{ width: '100%', backgroundColor: '#d4d0c8' }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: '8px', textAlign: 'center', fontFamily: 'monospace', fontSize: '10px' }}>B: Droite</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span className="text-[9px] text-[#222] font-mono mt-3">Disposé par double tableur rigide invisible</span>
            </div>
          )
        },
        '2004': {
          id: '2004',
          epoch: 'Années 2004 (HTML 4.01 + CSS 2.1)',
          w3cSpec: 'CSS Floats Box Model',
          techStack: 'float: left; width: 48%',
          limitationHtml: 'Si la somme des largeurs et des bordures dépassait ne serait-ce que 100%, l\'élément de droite descendait violemment en dessous (Float Wrap Bug).',
          explanation: 'On appliquait des largeurs en pourcentages stricts. Du fait du Box Model d\'Internet Explorer d\'époque, la moindre bordure additionnelle pouvait faire sauter le layout.',
          codeSnippet: `<div style="width: 300px;">
  <div style="float: left; width: 47%; background-color:#DDD; margin-right: 4%;">
    <span style="font-size: 10px;">Gauche (47%)</span>
  </div>
  <div style="float: left; width: 47%; background-color:#CCC;">
    <span style="font-size: 10px;">Droite (47%)</span>
  </div>
  <div style="clear: both;"></div>
</div>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-4 bg-[#f0f2f5] min-h-[160px] text-black">
              <div style={{ width: '300px' }}>
                <div style={{ float: 'left', width: '140px', backgroundColor: '#bbbbbb', padding: '10px', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '10px' }}>
                  A: Float Left
                </div>
                <div style={{ float: 'right', width: '140px', backgroundColor: '#dddddd', padding: '10px', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '10px' }}>
                  B: Float Right
                </div>
                <div style={{ clear: 'both' }}></div>
              </div>
              <span className="text-[9px] text-gray-550 font-mono mt-3">Flottage avec dégagement asymétrique manuel</span>
            </div>
          )
        },
        '2026': {
          id: '2026',
          epoch: 'Aujourd\'hui (HTML5 + CSS 3.0 / Next-gen)',
          w3cSpec: 'CSS Grid & CSS Variables',
          techStack: 'Display: Grid; grid-template-columns',
          limitationHtml: 'Aucun hack, calcul de pourcentage ou bloc de dégagement. Alignement géré à 100% de manière fluide par le fureteur.',
          explanation: 'La force de CSS Grid réside dans la séparation complète de la structure matricielle et du markup élémentaire. Les écarts se gèrent par une propriété sémantique native "gap".',
          codeSnippet: `<div class="grid-container">
  <div>Bloc A</div>
  <div>Bloc B</div>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colonnes parfaitement égales ! */
  gap: 16px;
  width: 300px;
}
</style>`,
          renderSim: () => (
            <div className="flex flex-col items-center justify-center p-4 bg-[#09090b] min-h-[160px] text-white rounded-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-4 w-[300px]">
                <div className="bg-[#111114] border border-[#2a2a2e]/60 p-3 rounded-xl text-center text-[10.5px] text-indigo-400 font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  A: Grid Col 1
                </div>
                <div className="bg-[#111114] border border-[#2a2a2e]/60 p-3 rounded-xl text-center text-[10.5px] text-indigo-400 font-bold" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  B: Grid Col 2
                </div>
              </div>
              <span className="text-[9px] text-slate-500 font-mono mt-3">Grille bidimensionnelle CSS Grid sémantique</span>
            </div>
          )
        }
      }
    }
  ];

  const activeTask = tasks.find(t => t.id === activeTaskId) || tasks[0];
  const activeSpec = activeTask.specs[activeSpecId] || activeTask.specs['2026'];

  const getThemeClass = () => {
    switch (theme) {
      case 'ie6':
        return {
          card: 'bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_1px_#808080,inset_1px_1px_1px_white] p-5 text-black font-sans',
          innerCard: 'bg-[#d4d0c8] border-2 border-inset border-white p-4 text-black text-xs space-y-3',
          btnActiveSpec: 'bg-[#000080] text-white font-bold p-2 text-xs border border-white flex-1 text-center',
          btnInactiveSpec: 'bg-[#c0c0c0] text-black p-2 text-xs border border-white hover:bg-[#d4d0c8] flex-1 text-center',
          codePanel: 'bg-white border-2 border-inset border-[#808080] font-mono text-[10px] text-black p-3 block overflow-x-auto select-all rounded-none',
          title: 'text-blue-900 font-sans font-black uppercase text-sm border-b-2 border-[#808080] pb-1',
          btnTabActive: 'bg-[#c0c0c0] font-bold border-2 border-inset border-white shadow-[inset_1px_1px_2px_#333] px-3 py-1.5 text-xs rounded-none',
          btnTabInactive: 'bg-[#d4d0c8] border-2 border-outset border-white px-3 py-1.5 text-xs hover:bg-[#c0c0c0] rounded-none',
        };
      case 'terminal':
        return {
          card: 'bg-[#0a0a0a] border border-[#ffb000]/45 p-5 text-[#ffb000] font-mono',
          innerCard: 'bg-black border border-[#ffb000]/25 p-4 text-[#ffb000] text-xs space-y-3 font-mono',
          btnActiveSpec: 'bg-[#ffb000]/20 text-[#ffb000] font-bold p-2 text-xs border border-[#ffb000] flex-1 text-center',
          btnInactiveSpec: 'bg-black text-[#ffb000]/60 p-2 text-xs border border-[#ffb000]/25 hover:bg-[#ffb000]/5 flex-1 text-center',
          codePanel: 'bg-[#050505] border border-[#ffb000]/20 font-mono text-[10px] text-[#ffb000] p-4 block overflow-x-auto select-all rounded-none',
          title: 'text-[#ffb000] font-mono font-black text-sm border-b border-[#ffb000]/30 pb-2 uppercase tracking-wider',
          btnTabActive: 'border border-[#ffb000] bg-[#ffb000]/15 px-3 py-1.5 text-xs rounded-none font-bold',
          btnTabInactive: 'border border-[#ffb000]/20 hover:border-[#ffb000]/60 text-[#ffb000]/60 px-3 py-1.5 text-xs rounded-none',
        };
      default: // Modern - Slate
        return {
          card: 'bg-[#111114] border border-[#2a2a2e] p-6 rounded-2xl shadow-xl space-y-4',
          innerCard: 'p-4 bg-slate-900 border border-slate-750/70 rounded-xl space-y-3',
          btnActiveSpec: 'bg-indigo-600 text-white font-semibold p-2.5 text-xs rounded-lg shadow-md flex-1 text-center border border-indigo-500',
          btnInactiveSpec: 'bg-[#0c0c0e] hover:bg-[#111115] text-slate-400 p-2.5 text-xs rounded-lg transition border border-slate-800 flex-1 text-center hover:text-white',
          codePanel: 'bg-[#0a0a0c] border border-[#2a2a2e]/60 font-mono text-[11px] text-slate-300 p-3.5 rounded-xl overflow-x-auto select-all shadow-inner',
          title: 'text-white font-sans font-extrabold text-sm bg-gradient-to-r from-white to-slate-450 bg-clip-text text-transparent',
          btnTabActive: 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-bold rounded-lg px-4 py-2 text-xs border cursor-pointer',
          btnTabInactive: 'bg-slate-900/30 border-transparent text-slate-450 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg px-4 py-2 text-xs border cursor-pointer',
        };
    }
  };

  const css = getThemeClass();

  return (
    <div className="space-y-6" id="w3c-versioner-root">
      
      {/* Banner */}
      <div className={`${theme === 'ie6' ? 'bg-[#000080] text-white p-2 border-b border-white' : theme === 'terminal' ? 'bg-[#ffb000]/10 border border-[#ffb000]/40 text-[#ffb000] p-2' : 'bg-gradient-to-r from-teal-950/20 to-slate-950/10 border border-slate-750 p-4 rounded-xl'} flex justify-between items-center flex-wrap gap-2 text-xs`}>
        <div className="flex items-center gap-2 text-left">
          <Milestone className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <h2 className="text-xs font-bold leading-none uppercase">La Machine à voyager dans les Spécifications W3C</h2>
            <p className="text-[10px] opacity-75 mt-0.5">Étudiez visuellement et comparez l'évolution des techniques de mise en page, du HTML d'origine aux grilles synchrones de 2026.</p>
          </div>
        </div>
      </div>

      {/* Selector of Target Tasks */}
      <div className={`flex flex-wrap gap-2 pb-3 border-b ${theme === 'ie6' ? 'border-[#808080]' : theme === 'terminal' ? 'border-[#ffb000]/20' : 'border-slate-850'}`}>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setActiveTaskId(task.id)}
            className={`${activeTaskId === task.id ? css.btnTabActive : css.btnTabInactive} flex items-center gap-2 transition cursor-pointer`}
          >
            <span>{task.label}</span>
          </button>
        ))}
      </div>

      {/* Double Column Display board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Interactive Playground Box (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className={css.card}>
            <div className="flex flex-col gap-1 text-left border-b border-slate-800/40 pb-3 mb-2">
              <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase">Mission de mise en page sélectionnée :</span>
              <h4 className="text-xs font-bold text-gray-200 leading-normal">{activeTask.description}</h4>
            </div>

            {/* Spec Selector Sliders / Tabs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1 text-left">
                ⏱️ Choisir l'époque de la Spécification W3C :
              </span>
              <div className="flex border border-slate-850/80 p-1.5 bg-[#0a0a0c] rounded-xl gap-2 select-none">
                <button
                  onClick={() => setActiveSpecId('1995')}
                  className={activeSpecId === '1995' ? css.btnActiveSpec : css.btnInactiveSpec}
                >
                  <span className="block font-bold">1995</span>
                  <span className="text-[9px] opacity-75 block">HTML 3.2</span>
                </button>
                <button
                  onClick={() => setActiveSpecId('2004')}
                  className={activeSpecId === '2004' ? css.btnActiveSpec : css.btnInactiveSpec}
                >
                  <span className="block font-bold">2004</span>
                  <span className="text-[9px] opacity-75 block">CSS 2.1</span>
                </button>
                <button
                  onClick={() => setActiveSpecId('2026')}
                  className={activeSpecId === '2026' ? css.btnActiveSpec : css.btnInactiveSpec}
                >
                  <span className="block font-bold">2026</span>
                  <span className="text-[9px] opacity-75 block">HTML5 + CSS3</span>
                </button>
              </div>
            </div>

            {/* Render Output Showcase */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block text-left">
                🖥️ Rendu visuel simulé par l'affichage d'époque :
              </span>
              <div className="overflow-hidden bg-slate-950 p-[1px] rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTaskId}-${activeSpecId}`}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeSpec.renderSim()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Temporal explanation box */}
            <div className="p-3.5 bg-indigo-950/15 border border-indigo-900/35 rounded-xl space-y-1 text-left mt-4 text-xs">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase flex items-center gap-1.1">
                <Sparkles className="w-3.5 h-3.5" /> Explication académique :
              </span>
              <p className="leading-relaxed text-slate-300">
                {activeSpec.explanation}
              </p>
            </div>

          </div>
        </div>

        {/* Right Code Display Column (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#111114] border border-[#2a2a2e] rounded-xl p-5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-800/40 pb-2 flex-wrap gap-2 text-left">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider select-none">-- Code source requis --</span>
                  <span className="text-xs font-bold text-gray-200">{activeSpec.epoch}</span>
                </div>
                <span className="text-[9px] font-mono bg-slate-900 px-2 py-0.5 border border-slate-800 rounded font-black text-gray-400">
                  {activeSpec.w3cSpec}
                </span>
              </div>

              {/* Limitation box */}
              <div className="p-3 rounded-lg bg-red-950/5 border border-red-500/20 text-[10.5px] text-red-400 leading-relaxed text-left flex items-start gap-1.5 select-none">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div>
                  <strong className="block text-[8.5px] uppercase tracking-wider font-mono">Limites matérielles du standard :</strong>
                  {activeSpec.limitationHtml}
                </div>
              </div>

              {/* Code viewer panel */}
              <div className="space-y-1 text-left flex-1 flex flex-col justify-between">
                <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400 block mb-1">
                  💻 Balisage et Styles de l'époque :
                </span>
                <pre className={css.codePanel}>
                  {activeSpec.codeSnippet}
                </pre>
              </div>
            </div>

            {/* Share action buttons */}
            <div className="pt-2 border-t border-slate-800/40">
              <ShareButtons
                theme={theme}
                title={`Musée du Web — Comparateur ${activeTask.label} de ${activeSpecId}`}
                text={`Regardez comment on codait ${activeTask.label} en ${activeSpecId} d'après l'évolution des spécifications W3C !`}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
