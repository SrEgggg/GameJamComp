import React, { useEffect, useRef, useState } from 'react';
import { GameScene } from '../game/scenes/GameScene';
import { useGame } from '../context/GameContext';
import { HUD } from '../components/HUD';

export const Gameplay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameSceneRef = useRef<GameScene | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30000);
  const [brokenMachines, setBrokenMachines] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const { gameState, updateScore, endGame, nextDay, reduceSleepDeprivation, increaseSleepDeprivation } = useGame(); // 👈 added increaseSleepDeprivation

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    const scene = new GameScene(canvas, {
      onScoreUpdate: updateScore,
      onGameOver: endGame,
      onNextDay: nextDay,
    });

    gameSceneRef.current = scene;
    scene.start(gameState.day, gameState.sleepDeprivation);

    const updateInterval = setInterval(() => {
      if (scene) {
        setTimeRemaining(scene.getTimeRemaining());
        setBrokenMachines(scene.getBrokenCount());
      }
    }, 100);

    return () => {
      clearInterval(updateInterval);
      scene.stop();
    };
  }, [gameState.day]);

  useEffect(() => {
    if (!isSleeping) return;
    const interval = setInterval(() => {
      reduceSleepDeprivation();
    }, 100);
    return () => clearInterval(interval);
  }, [isSleeping]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSleeping) return;
    const canvas = canvasRef.current;
    const scene = gameSceneRef.current;
    if (!canvas || !scene) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    scene.handleClick(x, y);
    increaseSleepDeprivation(2); // 👈 every click adds 2 fatigue
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 relative">

      {/* Instructions dropdown — top-left corner */}
      {gameState.day === 1 && (
        <div className="absolute top-58 left-25 w-56 z-10">
          <button
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg border-2 border-blue-500 transition-all duration-200 text-sm"
            onClick={() => setShowInstructions(prev => !prev)}
          >
            📋Guide {showInstructions ? '▲' : '▼'}
          </button>
          {showInstructions && (
            <div className="bg-blue-900/95 border-2 border-blue-600 border-t-0 rounded-b-lg p-3">
              <ul className="text-xs text-blue-100 space-y-1">
                <li>• Click machines to fix them before they break</li>
                <li>• Don't let 3 machines fail!</li>
                <li>• Survive each day to progress</li>
                <li>• Difficulty increases with fatigue</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Sleep button — top-right corner */}
      <div className="absolute top-58 right-50 z-10">
        <button
          onClick={() => setIsSleeping(prev => !prev)}
          className={`px-4 py-1.5 rounded-lg font-bold border-2 transition-all duration-200 text-sm ${
            isSleeping
              ? 'bg-yellow-500 hover:bg-yellow-400 border-yellow-300 text-black'
              : 'bg-indigo-700 hover:bg-indigo-600 border-indigo-500 text-white'
          }`}
        >
          {isSleeping ? '⏰ Wake Up' : '😴 Sleep'}
        </button>
      </div>

      <HUD
        day={gameState.day}
        score={gameState.score}
        sleepDeprivation={gameState.sleepDeprivation}
        timeRemaining={timeRemaining}
        brokenMachines={brokenMachines}
      />

      <div className="relative mt-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="border-4 border-slate-700 rounded-lg cursor-pointer shadow-2xl"
          style={{
            maxWidth: '100%',
            height: 'auto',
            imageRendering: 'crisp-edges',
            filter: gameState.sleepDeprivation > 50 ? `blur(${(gameState.sleepDeprivation - 50) * 0.02}px)` : 'none',
          }}
        />

        {/* Blackout overlay while sleeping */}
        {isSleeping && (
          <div className="absolute inset-0 bg-black/90 rounded-lg flex items-center justify-center">
            <div className="text-white text-4xl animate-pulse">😴 Sleeping...</div>
          </div>
        )}

        {/* Screen shake effect */}
        {gameState.sleepDeprivation > 70 && (
          <div className="absolute inset-0 pointer-events-none animate-pulse">
            <div className="absolute inset-0 bg-red-500/5 rounded-lg" />
          </div>
        )}
      </div>

      {/* Day transition overlay */}
      {timeRemaining < 2000 && timeRemaining > 0 && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
          <div className="text-white text-4xl font-bold animate-pulse">
            Day {gameState.day} Complete!
          </div>
        </div>
      )}
    </div>
  );
};