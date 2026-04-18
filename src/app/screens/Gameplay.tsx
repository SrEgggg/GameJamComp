

import { CoinShop } from '../components/Coinshop'
import React, { useEffect, useRef, useState } from 'react';
import { GameScene } from '../game/scenes/GameScene';
import { useGame } from '../context/GameContext';
import { HUD } from '../components/HUD';
import { MathQuiz } from '../components/MathQuiz';
import { TypingGuide } from '../components/TypingGuide';


export const Gameplay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameSceneRef = useRef<GameScene | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30000);
  const [brokenMachines, setBrokenMachines] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const {
    gameState,
    updateScore,
    endGame,
    nextDay,
    reduceSleepDeprivation,
    increaseSleepDeprivation,
    addCoin,
  } = useGame();

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

    // 👇 fatigue reduced 30% per efficiency level
    const baseFatigue = 2;
    const reducedFatigue = baseFatigue * Math.pow(0.7, gameState.efficiencyLevel);
    increaseSleepDeprivation(Math.max(0.1, reducedFatigue));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 relative">


// Inside Gameplay.tsx, replace the instructions dropdown content:

{/* Instructions dropdown — top-left */}
{gameState.day === 1 && (
  <div className="absolute top-100 left-2 z-10">
    <button
    className="w-52 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-3 rounded-lg border-2 
      border-blue-400 transition-all duration-200 text-sm mb-1"
      onClick={() => setShowInstructions(prev => !prev)}
    >
      📋 Game Guide {showInstructions ? '▲' : '▼'}
    </button>
    {showInstructions && (
  <div className="bg-blue-500/95 border-2 border-blue-400 border-t-0 rounded-b-lg p-3 w-48">  {/* 👈 w-48 or even w-40 */}
    <TypingGuide
      text="Hey! Click machines to fix them before they break. Don't let 3 machines fail! Survive each day to progress. Difficulty increases with fatigue. Good luck!"
      speed={25}
    />
  </div>
)}
  </div>
)}

      {/* Sleep button — top-right */}
      <div className="absolute top-75 left-15 z-10">
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
        coins={gameState.coins}
      />

      {/* Canvas + right side panel */}
      <div className="flex gap-4 mt-4 items-start">
        <div className="relative">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="border-4 border-slate-700 rounded-lg cursor-pointer shadow-2xl"
            style={{
              maxWidth: '100%',
              height: 'auto',
              imageRendering: 'crisp-edges',
              filter: gameState.sleepDeprivation > 50
                ? `blur(${(gameState.sleepDeprivation - 50) * 0.02}px)`
                : 'none',
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

        {/* Right panel — Math Quiz + Coin Shop stacked */}
        <div className="flex flex-col gap-4">
          <MathQuiz day={gameState.day} onCorrect={addCoin} />
          <CoinShop /> {/* 👈 added */}
        </div>
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