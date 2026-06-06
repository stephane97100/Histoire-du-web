/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { timelineEvents } from '../data/timelineData';
import { glossaryTags } from '../data/glossaryData';
import { quizQuestions } from '../data/quizQuestions';

interface ExportOptions {
  includeTimeline: boolean;
  includeGlossary: boolean;
  includeQuiz: boolean;
  includeCompatDiagnostics: boolean;
}

/**
 * Generates an elegant, self-contained HTML document optimized for offline reading or saving to PDF via browser print.
 */
export function generateStudyGuideHTML(options: ExportOptions): string {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timelineHtml = options.includeTimeline
    ? `
    <section class="section page-break">
      <h2 class="section-title">⏱️ I. Chronologie de l'Évolution du Web</h2>
      <p class="section-description">Retracez les moments clés de l'histoire du web, de la proposition initiale au CERN en 1989 jusqu'à la maturation du HTML5 sémantique.</p>
      
      <div class="timeline-container">
        ${timelineEvents
          .map(
            (event) => `
          <div class="timeline-card">
            <div class="timeline-card-header">
              <span class="timeline-year">${event.year}</span>
              <h3 class="timeline-event-title">${event.title}</h3>
            </div>
            <div class="timeline-meta">
              <span class="badge badge-${event.impact}">Effet: ${event.impact.toUpperCase()}</span>
              <span class="badge bg-slate-100">${event.category.toUpperCase()}</span>
            </div>
            <p class="timeline-description"><strong>Description :</strong> ${event.description}</p>
            ${
              event.detailedContent
                ? `<p class="timeline-detail"><strong>Contexte Approfondi :</strong> ${event.detailedContent}</p>`
                : ''
            }
            <div class="tags-container">
              ${event.tags.map((t) => `<span class="tag">#${t}</span>`).join(' ')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
    `
    : '';

  const glossaryHtml = options.includeGlossary
    ? `
    <section class="section page-break">
      <h2 class="section-title">📖 II. Glossaire Sémantique des Balises Historiques</h2>
      <p class="section-description">Le dictionnaire officiel des concepteurs d'époque. Comprend les attributs standards et les antiques balises propriétaires dépréciées.</p>
      
      <div class="glossary-grid">
        ${glossaryTags
          .map(
            (item) => `
          <div class="glossary-card">
            <div class="glossary-card-header">
              <span class="tag-name">&lt;${item.tag}&gt;</span>
              <span class="age-badge">${item.version.toUpperCase()}</span>
            </div>
            <div class="tag-category">Matière sémantique : ${item.category.toUpperCase()}</div>
            <p class="tag-description">${item.description}</p>
            
            <div class="code-box">
              <div class="code-header">Exemple de Code type :</div>
              <pre><code>${escapeHtml(item.codeSnippet)}</code></pre>
            </div>

            ${
              item.retroTip
                ? `
              <div class="retro-tip">
                <strong>💡 Astuce Archéologique d'Époque :</strong> ${item.retroTip}
              </div>
            `
                : ''
            }

            ${
              item.attributes && item.attributes.length > 0
                ? `
              <div class="attributes-section">
                <strong>Attributs notables :</strong>
                <table>
                  <thead>
                    <tr>
                      <th>Attribut</th>
                      <th>Rôle sémantique</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${item.attributes
                      .map(
                        (attr) => `
                      <tr>
                        <td><code>${attr.name}</code></td>
                        <td>${attr.description}</td>
                        <td>${attr.isDeprecated ? '<span class="status-depr">DÉPRÉCIÉ</span>' : '<span class="status-std">STANDARD</span>'}</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            `
                : ''
            }
          </div>
        `
          )
          .join('')}
      </div>
    </section>
    `
    : '';

  const quizHtml = options.includeQuiz
    ? `
    <section class="section page-break">
      <h2 class="section-title">🎓 III. Feuille d'Examen d'Archéologie du Code</h2>
      <p class="section-description">Exercez vos facultés hors-ligne. Idéal pour un examen écrit ou un devoir d'études.</p>
      
      <div class="quiz-container">
        ${quizQuestions
          .map(
            (q, idx) => `
          <div class="quiz-card-item">
            <h3 class="quiz-question-title">${idx + 1}. ${q.question}</h3>
            <span class="badge bg-indigo-50">Difficulté: ${q.difficulty.toUpperCase()}</span>
            <span class="badge bg-slate-50">Catégorie: ${q.category.toUpperCase()}</span>
            
            <ul class="quiz-options-list">
              ${q.options
                .map(
                  (opt, optIdx) => `
                <li>
                  <span class="checkbox-box"></span> ${opt}
                </li>
              `
                )
                .join('')}
            </ul>
            
            <div class="quiz-solution no-print">
              <strong>Corrigé Officiel :</strong> Option n°${q.correctAnswerIndex + 1}
              <p class="quiz-explanation-text"><em>Explication :</em> "${q.explanation}"</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
    `
    : '';

  const compatHtml = options.includeCompatDiagnostics
    ? `
    <section class="section">
      <h2 class="section-title">🛡️ IV. Guide de Survie et Pièges Réseau</h2>
      <p class="section-description">Synthèse des règles de compatibilité critiques de l'histoire des fureteurs pour fiabiliser le code.</p>
      
      <div class="survival-rules-container">
        <div class="rule-box rule-error">
          <h3>💥 Le bug de la double bordure d'Internet Explorer</h3>
          <p>Sous IE6, appliquer des marges à un élément flottant du même côté que sa direction de flottement doublera mystérieusement cette marge. Solution d'époque : déclarer <code>display: inline;</code> sur l'élément flottant.</p>
        </div>
        
        <div class="rule-box rule-warning">
          <h3>⚡ Box Model féroce (W3C vs Netscape)</h3>
          <p>Le W3C dicte que le padding et les bordures s'ajoutent à la largeur déclarée. Internet Explorer les englobait au contraire dans la largeur. Un bogue corrigé par l'adoption universelle du <code>box-sizing: border-box;</code>.</p>
        </div>

        <div class="rule-box rule-info">
          <h3>💾 Le mythe de l'image de 1 pixel transparente</h3>
          <p>Pour fixer de fines dimensions dans une mise en page sous forme de tableau invisible, les développeurs utilisaient un fichier GIF transparent de 1x1 pixel étiré via les attributs <code>width</code> et <code>height</code> de la balise <code>&lt;img&gt;</code>.</p>
        </div>
      </div>
    </section>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Guide d'Études Archéologique du Devenir Web</title>
  <style>
    :root {
      --primary: #1e3a8a;
      --secondary: #0d9488;
      --text: #1f2937;
      --bg: #f9fafb;
      --card-bg: #ffffff;
      --border: #e5e7eb;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--text);
      background-color: var(--bg);
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .wrapper {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header.main-header {
      border-bottom: 3px double var(--primary);
      padding-bottom: 30px;
      margin-bottom: 40px;
      text-align: center;
    }

    header.main-header h1 {
      font-size: 2.2rem;
      color: var(--primary);
      margin: 0 0 10px 0;
      letter-spacing: -0.025em;
    }

    .meta-header {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #6b7280;
      font-style: italic;
    }

    .section {
      margin-bottom: 60px;
    }

    .section-title {
      font-size: 1.6rem;
      color: var(--primary);
      border-bottom: 2px solid var(--primary);
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 12px;
    }

    .section-description {
      font-size: 0.95rem;
      color: #4b5563;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    /* Timeline Cards styling */
    .timeline-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .timeline-card-header {
      display: flex;
      align-items: baseline;
      gap: 15px;
      margin-bottom: 10px;
    }

    .timeline-year {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--secondary);
      font-family: Menlo, Monaco, Consolas, monospace;
    }

    .timeline-event-title {
      font-size: 1.15rem;
      margin: 0;
      font-weight: 700;
      color: #111827;
    }

    .timeline-meta {
      margin-bottom: 12px;
    }

    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      margin-right: 6px;
      text-transform: uppercase;
    }

    .badge-critical { background-color: #fef2f2; color: #991b1b; border: 1px solid #fee2e2; }
    .badge-high { background-color: #fffbeb; color: #92400e; border: 1px solid #fef3c7; }
    .badge-medium { background-color: #eff6ff; color: #1e40af; border: 1px solid #dbeafe; }
    .badge-low { background-color: #f0fdf4; color: #166534; border: 1px solid #dcfce7; }
    .bg-slate-100 { background-color: #f3f4f6; color: #374151; }

    .timeline-description {
      font-size: 0.9rem;
      margin: 0 0 10px 0;
    }

    .timeline-detail {
      font-size: 0.85rem;
      color: #555;
      background: #fdfdfd;
      border-left: 3px solid #ccc;
      padding-left: 12px;
      margin: 10px 0;
    }

    .tags-container {
      margin-top: 12px;
    }

    .tag {
      font-size: 0.8rem;
      color: #4b5563;
      margin-right: 10px;
      font-family: monospace;
    }

    /* Glossary cards styling */
    .glossary-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .glossary-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .tag-name {
      font-size: 1.4rem;
      font-weight: bold;
      font-family: Menlo, Monaco, Consolas, monospace;
      color: var(--primary);
    }

    .age-badge {
      font-size: 0.75rem;
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 8px;
      border-radius: 9999px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .tag-category {
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 12px;
      font-family: monospace;
    }

    .tag-description {
      font-size: 0.9rem;
      margin-bottom: 15px;
    }

    .code-box {
      background: #0f172a;
      color: #f8fafc;
      padding: 15px;
      border-radius: 6px;
      margin: 12px 0;
      overflow-x: auto;
    }

    .code-header {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      font-family: monospace;
      margin-bottom: 6px;
    }

    .code-box pre {
      margin: 0;
    }

    .code-box code {
      font-family: Consolas, "Liberation Mono", Courier, monospace;
      font-size: 0.85rem;
    }

    .retro-tip {
      font-size: 0.85rem;
      background: #fffbeb;
      color: #78350f;
      padding: 12px 16px;
      border-radius: 6px;
      border-left: 4px solid #f59e0b;
      margin: 15px 0;
    }

    .attributes-section {
      margin-top: 15px;
    }

    .attributes-section table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;
      margin-top: 8px;
    }

    .attributes-section th, .attributes-section td {
      border: 1px solid var(--border);
      padding: 8px 10px;
      text-align: left;
    }

    .attributes-section th {
      background-color: #f3f4f6;
    }

    .status-depr {
      color: #dc2626;
      font-weight: bold;
    }

    .status-std {
      color: #16a34a;
      font-weight: bold;
    }

    /* Quiz styling */
    .quiz-card-item {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 20px;
    }

    .quiz-question-title {
      font-size: 1.05rem;
      margin-top: 0;
      margin-bottom: 10px;
      color: #111827;
    }

    .quiz-options-list {
      list-style-type: none;
      padding-left: 0;
      margin: 15px 0;
    }

    .quiz-options-list li {
      padding: 8px 12px;
      border: 1px solid #f3f4f6;
      border-radius: 4px;
      margin-bottom: 6px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .checkbox-box {
      width: 14px;
      height: 14px;
      border: 2px solid #9ca3af;
      border-radius: 3px;
      display: inline-block;
    }

    .quiz-solution {
      font-size: 0.8rem;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
      padding: 12px;
      border-radius: 6px;
      margin-top: 15px;
    }

    .quiz-explanation-text {
      margin-top: 4px;
      margin-bottom: 0;
    }

    /* Survival rules styling */
    .survival-rules-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .rule-box {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .rule-box h3 {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 1rem;
    }

    .rule-box p {
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.5;
    }

    .rule-error { background-color: #fff5f5; border-color: #feb2b2; color: #9b2c2c; }
    .rule-warning { background-color: #fffaf0; border-color: #fbd38d; color: #9c4221; }
    .rule-info { background-color: #f0f9ff; border-color: #bae6fd; color: #0369a1; }

    /* Print utility controls */
    .print-actions {
      background: #111827;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 30px;
    }

    .btn-print {
      background: var(--secondary);
      color: white;
      border: none;
      padding: 10px 20px;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-print:hover {
      background: #0f766e;
    }

    @media print {
      body {
        background: white !important;
        color: black !important;
        font-family: Georgia, serif !important;
        font-size: 11pt;
      }

      .wrapper {
        padding: 0;
      }

      .no-print {
        display: none !important;
      }

      .page-break {
        page-break-after: always;
        break-after: page;
      }

      .timeline-card, .glossary-card, .quiz-card-item {
        border: none !important;
        border-bottom: 1px solid #ccc !important;
        box-shadow: none !important;
        background: transparent !important;
        page-break-inside: avoid;
        break-inside: avoid;
        padding: 15px 0 !important;
      }

      .code-box {
        background: #f3f4f6 !important;
        color: black !important;
        border: 1px solid #ccc !important;
      }

      .retro-tip {
        background: #fafafa !important;
        border: 1px solid #ccc !important;
        color: black !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="print-actions no-print">
      <p style="margin: 0 0 10px 0; font-size: 0.85rem;"><strong>💡 Option d'exportation d'étude :</strong> Utilisez votre navigateur pour imprimer ou enregistrer en format PDF (Raccourci : Ctrl+P / Cmd+P).</p>
      <button onclick="window.print()" class="btn-print">Imprimer ou Sauvegarder en PDF</button>
    </div>

    <header class="main-header">
      <span class="meta-header">Musée du Développement Web — ${dateStr}</span>
      <h1>Guide d'Études Archéologique et Sémantique Complet</h1>
      <p style="margin: 8px 0 0 0; color: #4b5563; font-size: 0.95rem;">Compendium rassemblant l'évolution historique du code pour une consultation ou révision hors-ligne.</p>
    </header>

    ${timelineHtml}
    ${glossaryHtml}
    ${quizHtml}
    ${compatHtml}

    <footer style="margin-top: 80px; text-align: center; font-size: 0.75rem; color: #9ca3af; border-top: 1px solid var(--border); padding-top: 20px;">
      Musée du Développement Web — Synthèse Sémantique &amp; Archéologie de la Toile (1989-2026)<br>
      Fait à vocation pédagogique.
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Escapes characters string for safe HTML code blocks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
