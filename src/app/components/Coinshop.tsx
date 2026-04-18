import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export const CoinShop: React.FC = () => {
  const { gameState, upgradeEfficiency, upgradeCoinBooster } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const { coins, efficiencyLevel, coinBoosterLevel } = gameState;

  const efficiencyCosts = [20, 60, 180];
  const nextEfficiencyCost = efficiencyLevel < 3 ? efficiencyCosts[efficiencyLevel] : null;
  const nextCoinBoosterCost = 10 * Math.pow(2, coinBoosterLevel);
  const coinMultiplier = Math.pow(2, coinBoosterLevel);

  const fatigueReduction = Math.round((1 - Math.pow(0.7, efficiencyLevel)) * 100);

  return (
    <div className="w-64">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-1.5 px-3 rounded-lg border-2 border-yellow-500 transition-all duration-200 text-sm flex items-center justify-between"
      >
        <span>🛒 Coin Shop</span>
        <span className="text-yellow-300">🪙 {coins}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="bg-slate-800 border-2 border-yellow-600 border-t-0 rounded-b-lg p-3 space-y-3">

          {/* Machine Efficiency */}
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-bold text-sm">⚙️ Machine Efficiency</span>
              <span className="text-xs text-slate-400">Lv {efficiencyLevel}/3</span>
            </div>

            {/* Upgrade bars */}
            <div className="flex gap-1 mb-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < efficiencyLevel ? 'bg-green-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-slate-300 mb-2">
              Reduces fatigue per click by 30% each level.<br />
              {efficiencyLevel > 0 && (
                <span className="text-green-400">Current: -{fatigueReduction}% fatigue per click</span>
              )}
            </p>

            {nextEfficiencyCost !== null ? (
              <button
                onClick={upgradeEfficiency}
                disabled={coins < nextEfficiencyCost}
                className={`w-full py-1.5 rounded-lg font-bold text-xs border-2 transition-all duration-200 ${
                  coins >= nextEfficiencyCost
                    ? 'bg-green-700 hover:bg-green-600 border-green-500 text-white'
                    : 'bg-slate-600 border-slate-500 text-slate-400 cursor-not-allowed'
                }`}
              >
                Upgrade — 🪙 {nextEfficiencyCost}
              </button>
            ) : (
              <div className="text-center text-green-400 font-bold text-xs">✅ Maxed Out!</div>
            )}
          </div>

          {/* Coin Booster */}
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-bold text-sm">🪙 Coin Booster</span>
              <span className="text-xs text-slate-400">Lv {coinBoosterLevel}</span>
            </div>

            <p className="text-xs text-slate-300 mb-2">
              Multiplies coins earned per correct answer.<br />
              <span className="text-yellow-400">
                Current: x{coinMultiplier} per answer
              </span>
            </p>

            <button
              onClick={upgradeCoinBooster}
              disabled={coins < nextCoinBoosterCost}
              className={`w-full py-1.5 rounded-lg font-bold text-xs border-2 transition-all duration-200 ${
                coins >= nextCoinBoosterCost
                  ? 'bg-yellow-700 hover:bg-yellow-600 border-yellow-500 text-white'
                  : 'bg-slate-600 border-slate-500 text-slate-400 cursor-not-allowed'
              }`}
            >
              Upgrade — 🪙 {nextCoinBoosterCost}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};