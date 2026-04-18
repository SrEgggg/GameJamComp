<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Play, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const MainMenu: React.FC = () => {
  const { gameState, startGame } = useGame();
  const [currentTime, setCurrentTime] = useState('03:17 AM');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/factory-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-slate-900/60" />

      {/* Ambient glowing lights */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <div className="absolute top-20 right-32 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div className="absolute bottom-32 left-40 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
            NIGHT SHIFT
          </h1>
          <p className="text-2xl text-slate-300 font-medium">Maintenance Madness</p>
          <p className="text-sm text-slate-400 mt-1">
            Keep the machines running... if you can stay awake
          </p>
        </div>

        {/* Main Terminal Panel */}
        <div className="relative">
          {/* Outer metal frame */}
          <div className="bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-lg p-1 shadow-2xl">
            {/* Inner frame with screws */}
            <div className="bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 rounded p-1 relative">
              {/* Corner screws */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-600 rotate-45" />
              </div>
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-600 rotate-45" />
              </div>
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-600 rotate-45" />
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-600 rotate-45" />
              </div>

              {/* Side indicator lights */}
              <div className="absolute left-0.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 py-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_2px_rgba(234,179,8,0.6)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]" />
              </div>
              <div className="absolute right-0.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 py-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_2px_rgba(234,179,8,0.6)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_2px_rgba(251,146,60,0.6)]" />
              </div>

              {/* Main screen area */}
              <div className="bg-gray-900 rounded mx-6 my-4 p-6 space-y-4">

                {/* START SHIFT Button - Blue */}
                <button
                  onClick={startGame}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600
                           hover:from-blue-500 hover:via-blue-400 hover:to-blue-500
                           border-2 border-blue-400 rounded flex items-center justify-center gap-3
                           text-white font-bold text-xl tracking-wide shadow-lg
                           transition-all duration-150 active:scale-[0.98]
                           hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  <Play className="w-5 h-5 fill-current" />
                  START SHIFT
                </button>

                {/* Global Operator Record - Gold/Brass */}
                {gameState.highScore > 0 && (
                  <div className="w-full h-14 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700
                               border-2 border-amber-500 rounded flex items-center justify-center gap-4
                               shadow-lg">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-amber-200 font-medium tracking-wider">GLOBAL OPERATOR RECORD</span>
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-amber-300" />
                        <span className="text-3xl font-mono font-bold text-amber-300 drop-shadow-md">
                          {gameState.highScore}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CRT Terminal Display */}
              <div className="mx-6 mb-4">
                <div className="bg-black border-4 border-gray-700 rounded-lg p-4 relative overflow-hidden">
                  {/* CRT scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent opacity-50 pointer-events-none"
                       style={{ backgroundSize: '100% 4px' }} />

                  {/* Screen glow */}
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />

                  <div className="relative z-10 font-mono text-sm">
                    {/* Header */}
                    <div className="text-green-400 font-bold mb-3 text-base tracking-wide border-b border-green-800 pb-2">
                      CRITICAL SYSTEM STATUS: OPERATOR MANDATE
                    </div>

                    {/* Story text */}
                    <div className="space-y-3 text-green-300">
                      <p className="leading-relaxed">
                        You're the night shift maintenance worker at a failing factory.
                        Your job? Keep the machines running at all costs.
                      </p>
                      <p className="leading-relaxed">
                        But there's a problem: you haven't slept in days, and it's getting worse.
                        Each passing day, the fatigue sets in harder, and the machines get more temperamental.
                      </p>

                      {/* Warning */}
                      <div className="flex justify-between items-end pt-2 border-t border-green-900/50">
                        <p className="text-red-400 font-bold tracking-wide animate-pulse">
                          IF 3 MACHINES FAIL, YOU'RE FIRED. GOOD LUCK.
                        </p>
                        <span className="text-green-500 text-xs">{currentTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Controls hint */}
        <div className="mt-6 text-center text-slate-500 text-xs tracking-wide">
          <p>Click on machines to fix them • Don't let them break!</p>
        </div>
      </div>
    </div>
  );
};
=======
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
>>>>>>> eb30028916e28f64c0980fac1a0791b6b792021d
