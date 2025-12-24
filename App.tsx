import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParticipantList } from './components/ParticipantList';
import { AssignmentResult } from './components/AssignmentResult';
import { generateAssignments } from './utils/gameLogic';
import { serializeAssignments, deserializeAssignments } from './utils/urlManager';
import { PARTICIPANTS } from './constants';
import { Assignment, GameState } from './types';
import { Sparkles, Gift } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameCode = params.get('game');

    if (gameCode) {
      const loadedAssignments = deserializeAssignments(gameCode);
      if (loadedAssignments) {
        setAssignments(loadedAssignments);
        setGameState(GameState.READY);
        return; 
      }
    }

    const savedAssignments = localStorage.getItem('secret_santa_assignments');
    if (savedAssignments) {
      try {
        const parsed = JSON.parse(savedAssignments);
        setAssignments(parsed);
        setGameState(GameState.READY);
      } catch (e) {
        console.error("Failed to parse saved game");
      }
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newAssignments = generateAssignments(PARTICIPANTS);
      setAssignments(newAssignments);
      setGameState(GameState.READY);
      setIsGenerating(false);
      
      localStorage.setItem('secret_santa_assignments', JSON.stringify(newAssignments));

      const code = serializeAssignments(newAssignments);
      const newUrl = `${window.location.pathname}?game=${code}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }, 2000); // Slightly longer for dramatic effect
  };

  const handleReset = () => {
    setAssignments([]);
    setGameState(GameState.SETUP);
    localStorage.removeItem('secret_santa_assignments');
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    // Radial gradient background in deep red/maroon
    <div className="min-h-screen pb-12 px-4 selection:bg-yellow-400 selection:text-red-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-800 via-red-900 to-black">
      <div className="max-w-4xl mx-auto space-y-8 pt-6">
        <Header />

        {gameState === GameState.SETUP && (
          <div className="animate-fade-in space-y-12">
            <ParticipantList participants={PARTICIPANTS} />
            
            <div className="flex flex-col items-center justify-center space-y-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                  group relative px-10 py-5 
                  bg-gradient-to-b from-green-500 to-green-700
                  border-b-4 border-green-900
                  rounded-2xl text-white font-bold text-2xl shadow-xl shadow-green-900/50 
                  transition-all duration-300 hover:scale-105 active:border-b-0 active:translate-y-1 disabled:opacity-80 disabled:cursor-wait
                `}
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3 festive-font">
                  {isGenerating ? (
                    <>
                       <Gift className="animate-bounce w-6 h-6" />
                      Empaquetando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-yellow-300 group-hover:animate-spin" />
                      ¡Sortear Regalos!
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}

        {gameState === GameState.READY && (
          <AssignmentResult 
            assignments={assignments} 
            participants={PARTICIPANTS} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  );
};

export default App;