import React, { useEffect, useRef, useState } from 'react';
import { GameScene } from '../game/scenes/GameScene';
import { useGame } from '../context/GameContext';
import { HUD } from '../components/HUD';

export const Gameplay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameSceneRef = useRef<GameScene | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30000);
  const [brokenMachines, setBrokenMachines] = useState(0);
  const { gameState, updateScore, endGame, nextDay, increaseSleepDeprivation } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Create game scene
    const scene = new GameScene(canvas, {
      onScoreUpdate: updateScore,
      onGameOver: endGame,
      onNextDay: nextDay,
    });

    gameSceneRef.current = scene;
    scene.start(gameState.day, gameState.sleepDeprivation);

    // Update UI
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

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const scene = gameSceneRef.current;
    if (!canvas || !scene) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    scene.handleClick(x, y);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative">
      {/* HUD Overlay */}
      <HUD
        day={gameState.day}
        score={gameState.score}
        sleepDeprivation={gameState.sleepDeprivation}
        timeRemaining={timeRemaining}
        brokenMachines={brokenMachines}
      />

      {/* Game Canvas */}
      <div className="relative">
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
        
        {/* Screen shake effect container */}
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
