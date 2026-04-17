import React, { createContext, useContext, useState, useCallback } from 'react';

export type GameScreen = 'menu' | 'gameplay' | 'gameover';

export interface GameState {
  currentScreen: GameScreen;
  day: number;
  score: number;
  highScore: number;
  machinesFailed: number;
  isGameRunning: boolean;
  sleepDeprivation: number;
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  endGame: (finalScore: number, failed: number) => void;
  nextDay: () => void;
  updateScore: (points: number) => void;
  returnToMenu: () => void;
  increaseSleepDeprivation: (amount: number) => void;
  reduceSleepDeprivation: () => void; // 👈 added
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'menu',
    day: 1,
    score: 0,
    highScore: parseInt(localStorage.getItem('highScore') || '0'),
    machinesFailed: 0,
    isGameRunning: false,
    sleepDeprivation: 0,
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'gameplay',
      day: 1,
      score: 0,
      machinesFailed: 0,
      isGameRunning: true,
      sleepDeprivation: 0,
    }));
  }, []);

  const endGame = useCallback((finalScore: number, failed: number) => {
    setGameState(prev => {
      const newHighScore = Math.max(prev.highScore, finalScore);
      if (newHighScore > prev.highScore) {
        localStorage.setItem('highScore', newHighScore.toString());
      }
      return {
        ...prev,
        currentScreen: 'gameover',
        score: finalScore,
        machinesFailed: failed,
        highScore: newHighScore,
        isGameRunning: false,
      };
    });
  }, []);

  const nextDay = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      day: prev.day + 1,
      sleepDeprivation: Math.min(100, prev.sleepDeprivation + 15),
    }));
  }, []);

  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'menu',
      isGameRunning: false,
    }));
  }, []);

  const increaseSleepDeprivation = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.min(100, prev.sleepDeprivation + amount),
    }));
  }, []);

  // 👇 added
  const reduceSleepDeprivation = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.max(0, prev.sleepDeprivation - 1),
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        endGame,
        nextDay,
        updateScore,
        returnToMenu,
        increaseSleepDeprivation,
        reduceSleepDeprivation, // 👈 added
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};