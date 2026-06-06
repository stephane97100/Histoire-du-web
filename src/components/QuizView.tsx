/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from '../data/quizQuestions';
import { QuizQuestion } from '../types';
import { Award, CheckCircle, XCircle, RotateCcw, AlertCircle, HelpCircle, Trophy, Sparkles, BookOpen } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface QuizViewProps {
  theme: 'modern' | 'ie6' | 'terminal';
}

export default function QuizView({ theme }: QuizViewProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);
  const [shownExplanation, setShownExplanation] = useState<boolean>(false);

  // Filter questions based on selected difficulty
  const filteredQuestions = selectedDifficulty && selectedDifficulty !== 'all'
    ? quizQuestions.filter(q => q.difficulty === selectedDifficulty)
    : quizQuestions;

  // Reactively load specific difficulty highscore
  useEffect(() => {
    if (selectedDifficulty) {
      const saved = localStorage.getItem(`web_history_high_score_${selectedDifficulty}`);
      if (saved) {
        setHighScore(parseInt(saved, 10));
      } else {
        setHighScore(0);
      }
    }
  }, [selectedDifficulty]);

  const activeQuestion: QuizQuestion = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptIdx(idx);
    setIsAnswered(true);
    setShownExplanation(true);
    if (idx === activeQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    const isCorrect = selectedOptIdx === activeQuestion.correctAnswerIndex;
    const finalScoreCandidate = score; // has already been updated in click handler

    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
      setShownExplanation(false);
    } else {
      // Quiz finished !
      setQuizFinished(true);
      if (finalScoreCandidate > highScore) {
        setHighScore(finalScoreCandidate);
        localStorage.setItem(`web_history_high_score_${selectedDifficulty}`, finalScoreCandidate.toString());
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setShownExplanation(false);
  };

  const changeDifficulty = () => {
    setSelectedDifficulty(null);
    restartQuiz();
  };

  const getBadgeAndTitle = (finalScore: number) => {
    const total = filteredQuestions.length;
    const ratio = total > 0 ? finalScore / total : 0;
    
    if (ratio === 1) {
      return { 
        title: 'Archi-Tim Berners-Lee du Web', 
        desc: 'Connaissances parfaites d\'authentique gardien des premiers bits !', 
        color: 'text-emerald-450 border-emerald-500/30 bg-emerald-500/10' 
      };
    }
    if (ratio >= 0.7) {
      return { 
        title: 'Docteur ès-Mises en Page Tableaux', 
        desc: 'Vous connaissez sur le bout des doigts l\'histoire du CGI et de PHP et avez dompté IE6.', 
        color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' 
      };
    }
    if (ratio >= 0.4) {
      return { 
        title: 'Intégrateur Web de l\'An 2000', 
        desc: 'Vos bases d\'HTML et du duel VBScript/JS sont robustes. Encore un effort pour dompter React !', 
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' 
      };
    }
    return { 
      title: 'Surfeur d\'Initiation du Netscape', 
      desc: 'Idéal pour acquérir les premiers reflexes et réviser les fondamentaux archéologiques.', 
      color: 'text-slate-400 border-slate-700 bg-slate-905' 
    };
  };

  const currentPercent = filteredQuestions.length > 0 
    ? Math.round((currentIdx / filteredQuestions.length) * 100) 
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6" id="quiz-view-root">

      <AnimatePresence mode="wait">
        
        {/* State 1: Difficulty Selection Menu */}
        {!selectedDifficulty ? (
          <motion.div
            key="difficulty-picker"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="p-3 bg-indigo-650/10 text-indigo-400 rounded-full border border-indigo-550/20 inline-block">
                <Trophy className="w-8 h-8 mx-auto text-indigo-450" />
              </span>
              <h2 className="text-lg font-bold text-slate-100">Choisissez Votre Époque d'Exploration</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Testez vos connaissances en voyageant à travers nos parcours pédago-historiques calibrés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Easy Level */}
              <button
                onClick={() => setSelectedDifficulty('easy')}
                className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-emerald-400 uppercase bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-500/20">
                    Niveau Débutant
                  </span>
                  <span className="text-lg group-hover:scale-125 transition-transform">🌱</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Novice (HTML de Base)</h4>
                <p className="text-[11.5px] text-slate-400 leading-relaxed">
                  Questions accessibles sur l'histoire générale, les premières balises physiques et les fondamentaux du Web des origines.
                </p>
              </button>

              {/* Medium Level */}
              <button
                onClick={() => setSelectedDifficulty('medium')}
                className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-450 uppercase bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/20">
                    Niveau Intermédiaire
                  </span>
                  <span className="text-lg group-hover:scale-125 transition-transform">📟</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Vétéran des années 2000</h4>
                <p className="text-[11.5px] text-slate-400 leading-relaxed">
                  Dédié aux concepteurs survivants des design par tableaux d'images transparentes, des layouts instables par flottements (float) et des débuts du Web 2.0.
                </p>
              </button>

              {/* Hard Level */}
              <button
                onClick={() => setSelectedDifficulty('hard')}
                className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/90 transition text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-red-400 uppercase bg-red-900/20 px-2 py-0.5 rounded border border-red-500/20">
                    Niveau Expert
                  </span>
                  <span className="text-lg group-hover:scale-125 transition-transform">🏛️</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Archéologue Web Élite</h4>
                <p className="text-[11.5px] text-slate-400 leading-relaxed">
                  Recommandé aux érudits du W3C, amoureux des bogues d'IE6, des CGI et des spécificités poussées des premiers parseurs et protocoles.
                </p>
              </button>

              {/* All Level Marathon */}
              <button
                onClick={() => setSelectedDifficulty('all')}
                className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-indigo-400 uppercase bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-500/20">
                    Marathon Complet
                  </span>
                  <span className="text-lg group-hover:scale-125 transition-transform">🧭</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">Arbre Historique Global</h4>
                <p className="text-[11.5px] text-slate-400 leading-relaxed">
                  Jouez la totalité de notre banque de {quizQuestions.length} questions ordonnées de manière séquentielle pour revivre l'intégralité du parcours d'apprentissage.
                </p>
              </button>

            </div>
          </motion.div>
        ) : !quizFinished ? (
          
          /* State 2: Active Question Playing Board */
          <motion.div
            key="quiz-card-playing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 shadow-md space-y-6"
          >
            {/* Header / Sub-Nav */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-700/60 pb-3 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-400" /> 
                Question {currentIdx + 1} sur {filteredQuestions.length}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-450" /> Score : <b className="text-emerald-400">{score}</b>
                </span>
                <span className="text-slate-500">
                  Record : {highScore}/{filteredQuestions.length}
                </span>
                <button
                  onClick={changeDifficulty}
                  className="text-[11px] underline text-indigo-450 hover:text-indigo-405 ml-2 cursor-pointer"
                >
                  Changer de niveau
                </button>
              </div>
            </div>

            {/* Progress-Bar */}
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300" 
                style={{ width: `${currentPercent}%` }} 
              />
            </div>

            {/* Question metadata label */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-indigo-400">
                Rubrique : {
                  activeQuestion.category === 'html' ? 'Balisage Sémantique &' :
                  activeQuestion.category === 'css' ? 'Design visuel & Tables CSS' :
                  activeQuestion.category === 'js_vbs' ? 'Showdown JS vs VBScript' :
                  activeQuestion.category === 'browsers' ? 'Incompatibilités Navigateurs' :
                  activeQuestion.category === 'protocols' ? 'Spécifications Protocolaires' :
                  'Serveurs CGI & Héritage'
                }
              </span>
              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {activeQuestion.question}
              </h3>
            </div>

            {/* Answer Options list */}
            <div className="grid grid-cols-1 gap-2.5">
              {activeQuestion.options.map((option, idx) => {
                let optionStyle = "bg-slate-900/50 border-slate-750 hover:border-slate-600 hover:bg-slate-900/80 text-slate-200";
                
                if (isAnswered) {
                  if (idx === activeQuestion.correctAnswerIndex) {
                    optionStyle = "bg-emerald-500/10 border-emerald-500/80 text-emerald-400 font-semibold";
                  } else if (idx === selectedOptIdx) {
                    optionStyle = "bg-red-500/10 border-red-500/80 text-red-400";
                  } else {
                    optionStyle = "bg-slate-900/20 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === activeQuestion.correctAnswerIndex && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-3" />
                    )}
                    {isAnswered && idx === selectedOptIdx && idx !== activeQuestion.correctAnswerIndex && (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanatory Panel displayed after click */}
            {shownExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-slate-900/90 border border-slate-750/70 rounded-xl space-y-2.5"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">
                  <AlertCircle className="w-4 h-4" /> Analyse Pédagogique Explicative
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{activeQuestion.explanation}"
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-semibold rounded text-xs cursor-pointer transition select-none flex items-center gap-1.5 shadow-md"
                  >
                    <span>
                      {currentIdx + 1 === filteredQuestions.length 
                        ? 'Consulter mon Évaluation Globale 🏆' 
                        : 'Valider et Continuer...'}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        ) : (
          
          /* State 3: Quiz Finished Panel & Diplomas */
          <motion.div
            key="quiz-finished-block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/80 rounded-xl p-8 border border-slate-700/80 shadow-xl text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/25 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">Examen d'Archéologie Validé !</h3>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">
                Parcours d'exploration : {
                  selectedDifficulty === 'easy' ? 'Novice (HTML original)' :
                  selectedDifficulty === 'medium' ? 'Vétéran (CSS d\'Antan)' :
                  selectedDifficulty === 'hard' ? 'Archéologue Élite (W3C)' :
                  'Marathon Ultime'
                }
              </p>
            </div>

            {/* Score Showcase */}
            <div className="inline-block p-4 bg-slate-900 rounded-2xl border border-slate-755 font-mono">
              <span className="text-4xl font-extrabold text-emerald-400">{score}</span>
              <span className="text-slate-400 text-sm"> / {filteredQuestions.length}</span>
              <div className="text-[10px] text-slate-450 mt-1 uppercase font-semibold">
                Réponses exactes récoltées
              </div>
            </div>

            {/* Humorous virtual Windows 95 style Certificate for perfect scores! */}
            {score === filteredQuestions.length ? (
              <motion.div
                initial={{ rotate: -1, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-slate-900 border-r-slate-900 shadow-[4px_4px_16px_rgba(0,0,0,0.6)] p-1.5 rounded-none max-w-xl mx-auto space-y-4 font-mono text-left animate-fade-in"
              >
                {/* Win 95 program outline tab */}
                <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs font-bold font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">💾</span>
                    <span>PROGMAN.EXE - DIPLÔME DE SOUVERAINETÉ ET CONSERVATION</span>
                  </div>
                  <div 
                    onClick={changeDifficulty}
                    className="bg-[#c0c0c0] text-black border border-white px-1.5 py-0.2 text-[9px] cursor-pointer shadow-sm font-sans"
                  >
                    X
                  </div>
                </div>

                {/* Win 95 insert area */}
                <div className="bg-white border-2 border-inset border-[#808080] p-6 space-y-6 text-center">
                  
                  {/* Seal circle stamp */}
                  <div className="flex justify-center flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-[#c0c0c0] border-2 border-outset border-white flex items-center justify-center font-bold text-3xl text-blue-900 shadow">
                      🛡️
                    </div>
                    <span className="text-[9px] tracking-wider text-[#808080] font-sans font-bold uppercase select-none">
                      W3C ARCHAEOLOGICAL PROTECTION SOCIETY
                    </span>
                  </div>

                  {/* Ribbon text content */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-black tracking-tight underline">
                      LÉGATION SOLENNELLE DE CONSERVATEUR DE LA TOILE
                    </h3>
                    <p className="text-[11px] text-justify text-slate-800 leading-normal max-w-md mx-auto font-sans">
                      Nous, pionniers de l'hypertexte d'origine, attestons solennellement que l'étudiant a achevé sans un seul faux pas le quiz avec un score impeccable. Il est déclaré immunisé contre les clignotements féroces de la balise &lt;blink&gt;, habilité à centrer une div par marge négative absolue, et toléré par Internet Explorer 6 lui-même.
                    </p>
                    
                    {/* Golden Banner text status */}
                    <div className="bg-[#f0f0f0] border border-dashed border-[#808080] p-3 font-bold text-center space-y-1">
                      <div className="text-blue-900 uppercase text-[10px] tracking-widest font-sans">Distinction Honorifique :</div>
                      <div className="text-xs text-red-700 font-extrabold uppercase tracking-wide">
                        {selectedDifficulty === 'easy' ? 'Sage Éminent d\'HTML CERN 1991' :
                         selectedDifficulty === 'medium' ? 'Gourou Vétéran de l\'Époque Clearfix' :
                         selectedDifficulty === 'hard' ? 'Archéologue Élite du W3C et Acid2' :
                         'Monarque Absolu du Temps Réseau'}
                      </div>
                      <div className="text-[9px] text-slate-500 italic">
                        Score parfait : {score} sur {filteredQuestions.length} conquis d'une traite !
                      </div>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-[#c5c1b8]">
                    <div className="text-[9px] text-slate-700 text-left">
                      <strong>Délégué de l'Académie :</strong>
                      <div className="italic border-b border-[#808080] pb-1 font-serif mt-1 text-[11px] font-semibold text-black">
                        Tim Berners-Lee
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-700 text-left">
                      <strong>Date de Certification :</strong>
                      <div className="italic border-b border-[#808080] pb-1 font-sans mt-1 text-[11px] font-semibold text-black">
                        {new Date().toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  <div className="text-[8px] text-black text-center select-none pt-1">
                    * Protégé sous licence Netscape Navigator Gold 3.0. Tous droits d'émulation réservés.
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Educational score summary explanation fallback */
              <div className={`p-4 border rounded-xl text-left space-y-2.5 max-w-md mx-auto ${getBadgeAndTitle(score).color}`}>
                <div className="flex items-center gap-2 font-bold font-mono text-xs uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Mention Décernée :</span>
                </div>
                <h4 className="text-sm font-extrabold">{getBadgeAndTitle(score).title}</h4>
                <p className="text-xs opacity-85 leading-relaxed italic">"{getBadgeAndTitle(score).desc}"</p>
                <div className="text-[10px] opacity-75 font-mono">
                  Conseil : obtenez un score parfait de {filteredQuestions.length}/{filteredQuestions.length} pour débloquer votre diplôme Windows 95 d'Archéologue de la Toile !
                </div>
              </div>
            )}

            {/* Quiz result share panel */}
            <div className="max-w-md mx-auto pt-2">
              <ShareButtons
                theme={theme}
                title="🏆 Mon Score au Quiz d'Histoire du Code"
                text={`J'ai obtenu le score de ${score}/${filteredQuestions.length} au Quiz d'Histoire de la programmation web (${selectedDifficulty === 'easy' ? 'Débutant HTML' : selectedDifficulty === 'medium' ? 'Intermédiaire CSS' : selectedDifficulty === 'hard' ? 'Expert Archéologique' : 'Marathon'}). Saurez-vous faire mieux ?`}
              />
            </div>

            {/* Quick Actions buttons */}
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={restartQuiz}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition select-none"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recommencer ce parcours</span>
              </button>

              <button
                onClick={changeDifficulty}
                className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition select-none"
              >
                <Sparkles className="w-4 h-4" />
                <span>Changer d'époque d'études</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
