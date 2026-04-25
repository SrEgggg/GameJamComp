import React, { useState } from 'react';
import { Coffee, Wrench, AlertTriangle, Clock, Coins } from 'lucide-react';

interface HUDProps {
  day: number;
  score: number;
  sleepDeprivation: number;
  timeRemaining: number;
  brokenMachines: number;
  coins: number; // 👈 added
}

export const HUD: React.FC<HUDProps> = ({
  day,
  score,
  sleepDeprivation,
  timeRemaining,
  brokenMachines,
  coins, // 👈 added
}) => {
  const timeSeconds = Math.ceil(timeRemaining / 1000);
  const timePercent = (timeRemaining / 30000) * 100;
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/90 backdrop-blur-sm border-2 border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">

            {/* Day */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-xs text-slate-400">Day</div>
                <div className="text-xl font-bold text-white">{day}</div>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-xs text-slate-400">Score</div>
                <div className="text-xl font-bold text-white">{score}</div>
              </div>
            </div>

            {/* Coins 👈 added */}
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <div>
                <div className="text-xs text-slate-400">Coins</div>
                <div className="text-xl font-bold text-yellow-400">{coins}</div>
              </div>
            </div>

            {/* Failed Machines */}
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-xs text-slate-400">Failed</div>
                <div className="text-xl font-bold text-red-400">{brokenMachines}/3</div>
              </div>
            </div>

            {/* Fatigue */}
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-400" />
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-slate-400 mb-1">Fatigue</div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300"
                    style={{ width: `${sleepDeprivation}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Time remaining */}
        <div className="bg-slate-900/90 backdrop-blur-sm border-2 border-slate-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Time Remaining</span>
            <span className="text-lg font-bold text-white">{timeSeconds}s</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                timePercent < 30 ? 'bg-red-500' : timePercent < 60 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};