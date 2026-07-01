/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Timeline Event Types
export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  category: 'html' | 'css' | 'js' | 'browser' | 'protocol' | 'milestone';
  description: string;
  detailedContent?: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
}

// HTML & CSS Versions Specs
export interface VersionSpec {
  id: string; // e.g. "html1", "css3"
  type: 'html' | 'css';
  name: string; // e.g. "HTML 1.0", "CSS Level 3"
  year: number;
  status: string; // "Devenu obsolète", "Standard actuel", etc.
  keyFeatures: string[];
  description: string;
  codeSnippet: string;
  vintageContext: string; // Pedagogical information about limits of the era
}

// Glossary Tag Types
export interface GlossaryTag {
  tag: string; // e.g. "table", "marquee"
  isHtmlTag: boolean; // New field
  version: 'html1' | 'html2' | 'html3' | 'html4' | 'html5';
  category: 'structure' | 'text' | 'media' | 'forms' | 'deprecated' | 'script';
  description: string;
  codeSnippet: string;
  hasClosingTag: boolean;
  attributes: {
    name: string;
    description: string;
    isDeprecated: boolean;
  }[];
  retroTip?: string; // e.g. "Comment l'utiliser pour faire des mises en page avant CSS"
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: 'html' | 'css' | 'js_vbs' | 'browsers' | 'protocols' | 'servers_frameworks'; // dynamic range requested by user
  difficulty: 'easy' | 'medium' | 'hard';
}

// Custom Created Landing Page Simulation
export interface LandingPageProject {
  title: string;
  htmlVersion: 'html2' | 'html4' | 'html5';
  cssVersion: 'none' | 'css1' | 'css3';
}
