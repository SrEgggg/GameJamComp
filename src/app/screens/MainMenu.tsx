import React from 'react';
import { Play, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGame } from '../context/GameContext';

export const MainMenu: React.FC = () => {
  const { gameState, startGame } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Night Shift
          </h1>
          <p className="text-xl text-slate-300 mb-2">Maintenance Madness</p>
          <p className="text-sm text-slate-400">
            Keep the machines running... if you can stay awake
          </p>
        </div>

        {/* Main menu card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-8 mb-6">
          <div className="space-y-4">
            <Button
              onClick={startGame}
              size="lg"
              className="w-full text-xl h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Game
            </Button>

            {gameState.highScore > 0 && (
              <div className="flex items-center justify-center gap-3 p-4 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                <Trophy className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="text-xs text-amber-400">High Score</div>
                  <div className="text-2xl font-bold text-white">{gameState.highScore}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game info */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-bold mb-3">The Job</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              You're the night shift maintenance worker at a failing factory.
              Your job? Keep the machines running at all costs.
            </p>
            <p>
              But there's a problem: you haven't slept in days, and it's getting worse.
              Each passing day, the fatigue sets in harder, and the machines get more temperamental.
            </p>
            <p className="text-red-400 font-semibold">
              If 3 machines fail, you're fired. Good luck.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>Click on machines to fix them • Don't let them break!</p>
        </div>
      </div>
    </div>
  );
};
