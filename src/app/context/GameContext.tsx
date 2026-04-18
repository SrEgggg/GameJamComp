<<<<<<< HEAD
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
  coins: number;
  efficiencyLevel: number;   // 👈 0-3
  coinBoosterLevel: number;  // 👈 0-infinite
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  endGame: (finalScore: number, failed: number) => void;
  nextDay: () => void;
  updateScore: (points: number) => void;
  returnToMenu: () => void;
  increaseSleepDeprivation: (amount: number) => void;
  reduceSleepDeprivation: () => void;
  addCoin: () => void;
  spendCoins: (amount: number) => boolean;
  upgradeEfficiency: () => void;
  upgradeCoinBooster: () => void;
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
    coins: 0,
    efficiencyLevel: 0,
    coinBoosterLevel: 0,
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
      coins: 0,
      efficiencyLevel: 0,
      coinBoosterLevel: 0,
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
    setGameState(prev => ({ ...prev, score: prev.score + points }));
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScreen: 'menu', isGameRunning: false }));
  }, []);

  const increaseSleepDeprivation = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.min(100, prev.sleepDeprivation + amount),
    }));
  }, []);

  const reduceSleepDeprivation = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.max(0, prev.sleepDeprivation - 1),
    }));
  }, []);

  const addCoin = useCallback(() => {
    setGameState(prev => {
      const multiplier = Math.pow(2, prev.coinBoosterLevel);
      return { ...prev, coins: prev.coins + multiplier };
    });
  }, []);

  // returns true if successful, false if not enough coins
  const spendCoins = useCallback((amount: number): boolean => {
    let success = false;
    setGameState(prev => {
      if (prev.coins < amount) return prev;
      success = true;
      return { ...prev, coins: prev.coins - amount };
    });
    return success;
  }, []);

  const upgradeEfficiency = useCallback(() => {
    setGameState(prev => {
      if (prev.efficiencyLevel >= 3) return prev;
      const costs = [20, 60, 180];
      const cost = costs[prev.efficiencyLevel];
      if (prev.coins < cost) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        efficiencyLevel: prev.efficiencyLevel + 1,
      };
    });
  }, []);

  const upgradeCoinBooster = useCallback(() => {
    setGameState(prev => {
      const cost = 10 * Math.pow(2, prev.coinBoosterLevel);
      if (prev.coins < cost) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        coinBoosterLevel: prev.coinBoosterLevel + 1,
      };
    });
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
        reduceSleepDeprivation,
        addCoin,
        spendCoins,
        upgradeEfficiency,
        upgradeCoinBooster,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
=======
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
  coins: number;
  efficiencyLevel: number;   // 👈 0-3
  coinBoosterLevel: number;  // 👈 0-infinite
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  endGame: (finalScore: number, failed: number) => void;
  nextDay: () => void;
  updateScore: (points: number) => void;
  returnToMenu: () => void;
  increaseSleepDeprivation: (amount: number) => void;
  reduceSleepDeprivation: () => void;
  addCoin: () => void;
  spendCoins: (amount: number) => boolean;
  upgradeEfficiency: () => void;
  upgradeCoinBooster: () => void;
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
    coins: 0,
    efficiencyLevel: 0,
    coinBoosterLevel: 0,
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
      coins: 0,
      efficiencyLevel: 0,
      coinBoosterLevel: 0,
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
    setGameState(prev => ({ ...prev, score: prev.score + points }));
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScreen: 'menu', isGameRunning: false }));
  }, []);

  const increaseSleepDeprivation = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.min(100, prev.sleepDeprivation + amount),
    }));
  }, []);

  const reduceSleepDeprivation = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      sleepDeprivation: Math.max(0, prev.sleepDeprivation - 1),
    }));
  }, []);

  const addCoin = useCallback(() => {
    setGameState(prev => {
      const multiplier = Math.pow(2, prev.coinBoosterLevel);
      return { ...prev, coins: prev.coins + multiplier };
    });
  }, []);

  // returns true if successful, false if not enough coins
  const spendCoins = useCallback((amount: number): boolean => {
    let success = false;
    setGameState(prev => {
      if (prev.coins < amount) return prev;
      success = true;
      return { ...prev, coins: prev.coins - amount };
    });
    return success;
  }, []);

  const upgradeEfficiency = useCallback(() => {
    setGameState(prev => {
      if (prev.efficiencyLevel >= 3) return prev;
      const costs = [20, 60, 180];
      const cost = costs[prev.efficiencyLevel];
      if (prev.coins < cost) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        efficiencyLevel: prev.efficiencyLevel + 1,
      };
    });
  }, []);

  const upgradeCoinBooster = useCallback(() => {
    setGameState(prev => {
      const cost = 10 * Math.pow(2, prev.coinBoosterLevel);
      if (prev.coins < cost) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        coinBoosterLevel: prev.coinBoosterLevel + 1,
      };
    });
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
        reduceSleepDeprivation,
        addCoin,
        spendCoins,
        upgradeEfficiency,
        upgradeCoinBooster,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
>>>>>>> eb30028916e28f64c0980fac1a0791b6b792021d
};