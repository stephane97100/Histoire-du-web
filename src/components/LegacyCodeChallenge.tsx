import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  language: 'vbscript' | 'javascript';
  codeSnippet: string;
  objective: string;
  correctAnswer: string;
  explanation: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'vb_alert',
    name: 'VBScript : Message Box',
    language: 'vbscript',
    codeSnippet: 'Sub Command1_Click()\n  // Objectif : Afficher "Bonjour !" dans une boîte de dialogue\n  ???\nEnd Sub',
    objective: 'Afficher une boîte de message.',
    correctAnswer: 'MsgBox "Bonjour !"',
    explanation: 'En VBScript, MsgBox est la fonction standard pour afficher une boîte de dialogue modale.'
  },
  {
    id: 'js_old_dom',
    name: 'JS Rétro : Modification de texte',
    language: 'javascript',
    codeSnippet: 'function changeText() {\n  // Objectif : Changer le contenu d\'un élément avec id="monTexte"\n  ???\n}',
    objective: 'Modifier le contenu HTML via document.all.',
    correctAnswer: 'document.all.monTexte.innerHTML = "Bonjour !";',
    explanation: 'Avant le standard DOM moderne, document.all était la manière propre à IE de cibler les éléments.'
  }
];

export default function LegacyCodeChallenge({ theme }: { theme: 'modern' | 'ie6' | 'terminal' }) {
  const [challenge, setChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  const checkAnswer = () => {
    if (answer.trim() === challenge.correctAnswer) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${theme === 'ie6' ? 'bg-[#c0c0c0] border-white' : 'bg-[#111114] border-[#2a2a2e]'}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-indigo-400" /> Défi de Code Legacy
      </h2>
      <div className="bg-black p-4 rounded-lg font-mono text-sm text-emerald-400 mb-4 whitespace-pre-wrap">
        {challenge.codeSnippet}
      </div>
      <p className="text-sm mb-4">Objectif : {challenge.objective}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 mb-4 bg-slate-900 border border-slate-700 rounded text-sm"
        placeholder="Votre réponse..."
      />
      <button onClick={checkAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-bold">
        Vérifier
      </button>
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-4 p-4 rounded ${result === 'correct' ? 'bg-emerald-900/20' : 'bg-red-900/20'}`}>
          <div className="flex items-center gap-2 font-bold mb-2">
            {result === 'correct' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
            {result === 'correct' ? 'Correct !' : 'Incorrect...'}
          </div>
          <p className="text-sm">{challenge.explanation}</p>
        </motion.div>
      )}
      <button onClick={() => { setAnswer(''); setResult(null); setChallenge(CHALLENGES[(CHALLENGES.indexOf(challenge) + 1) % CHALLENGES.length]); }} className="mt-4 text-xs text-slate-400 flex items-center gap-1">
        <RefreshCcw className="w-3 h-3" /> Défi suivant
      </button>
    </div>
  );
}
