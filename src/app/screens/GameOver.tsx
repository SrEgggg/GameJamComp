import React from 'react';
import { RotateCcw, Home, Trophy, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGame } from '../context/GameContext';

export const GameOver: React.FC = () => {
  const { gameState, startGame, returnToMenu } = useGame();
  const isNewHighScore = gameState.score === gameState.highScore && gameState.score > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Game Over Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/50 border-2 border-red-600 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            Game Over
          </h1>
          <p className="text-xl text-slate-300">
            The machines got the best of you...
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-8 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Final Score */}
            <div className="col-span-2 text-center p-6 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-sm text-slate-400 mb-2">Final Score</div>
              <div className="text-5xl font-bold text-white mb-2">{gameState.score}</div>
              {isNewHighScore && (
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-semibold">New High Score!</span>
                </div>
              )}
            </div>

            {/* Days Survived */}
            <div className="text-center p-4 bg-slate-900/30 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Days Survived</div>
              <div className="text-3xl font-bold text-white">{gameState.day}</div>
            </div>

            {/* Machines Failed */}
            <div className="text-center p-4 bg-slate-900/30 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Machines Failed</div>
              <div className="text-3xl font-bold text-red-400">{gameState.machinesFailed}</div>
            </div>
          </div>

          {/* High Score */}
          {!isNewHighScore && gameState.highScore > 0 && (
            <div className="text-center p-4 bg-amber-900/20 border border-amber-700/30 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-sm text-amber-400">High Score: </span>
                  <span className="text-xl font-bold text-white">{gameState.highScore}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Flavor Text */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 mb-6">
          <p className="text-slate-300 text-center italic">
            "Maybe you should have gotten some sleep after all..."
          </p>
          <p className="text-slate-400 text-center text-sm mt-2">
            The factory floor is silent now. The boss won't be happy about this.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={startGame}
            size="lg"
            className="w-full text-xl h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            onClick={returnToMenu}
            variant="outline"
            size="lg"
            className="w-full h-12 border-slate-600 hover:bg-slate-800"
          >
            <Home className="w-5 h-5 mr-2" />
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
};
