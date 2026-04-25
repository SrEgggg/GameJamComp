import React, { useState, useEffect, useRef } from 'react';
import { Play, Trophy, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGame } from '../context/GameContext';

export const MainMenu: React.FC = () => {
  const { gameState, startGame } = useGame();
  const [currentTime, setCurrentTime] = useState('03:17 AM');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioInitialized = useRef(false);

  const initAudio = () => {
    if (audioInitialized.current) return;
    audioInitialized.current = true;

    audioRef.current = new Audio('/Assets/Music/Midnight_at_the_Relay.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  };

  const toggleMute = () => {
    if (!audioInitialized.current) {
      initAudio();
      return;
    }
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Background music effect - initialize on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      initAudio();
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/factory-background.jpg')`,
      }}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80" />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
           }}
      />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-white mb-2 tracking-wider drop-shadow-lg"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            NIGHT SHIFT
          </h1>
          <p className="text-2xl text-slate-200 mb-1 font-semibold">Maintenance Madness</p>
          <p className="text-sm text-slate-400">
            Keep the machines running... if you can stay awake
          </p>
        </div>

        {/* Monitor Frame */}
        <div className="relative">
          {/* Outer metallic frame */}
          <div className="bg-gradient-to-b from-gray-600 via-gray-500 to-gray-700 rounded-lg p-1 shadow-2xl"
               style={{
                 boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)',
                 border: '4px solid #4a4a4a'
               }}>

            {/* Screws in corners */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
              <div className="w-2 h-0.5 bg-gray-600 rotate-45" />
            </div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
              <div className="w-2 h-0.5 bg-gray-600 rotate-45" />
            </div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gray-400 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
              <div className="w-2 h-0.5 bg-gray-600 rotate-45" />
            </div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gray-400 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
              <div className="w-2 h-0.5 bg-gray-600 rotate-45" />
            </div>

            {/* Inner bezel */}
            <div className="bg-gray-800 rounded p-6"
                 style={{
                   boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                   border: '2px solid #3a3a3a'
                 }}>

              {/* Indicator lights - Left side */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                     style={{ boxShadow: '0 0 8px #22c55e, 0 0 15px #22c55e' }} />
                <div className="w-2 h-2 rounded-full bg-yellow-500"
                     style={{ boxShadow: '0 0 5px #eab308' }} />
                <div className="w-2 h-2 rounded-full bg-red-500"
                     style={{ boxShadow: '0 0 5px #ef4444' }} />
              </div>

              {/* Indicator lights - Right side */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"
                     style={{ boxShadow: '0 0 5px #eab308' }} />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                     style={{ boxShadow: '0 0 8px #22c55e, 0 0 15px #22c55e' }} />
                <div className="w-2 h-2 rounded-full bg-red-500"
                     style={{ boxShadow: '0 0 5px #ef4444' }} />
              </div>

              {/* Screen content */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded p-6"
                   style={{
                     boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)',
                     border: '1px solid #2a2a2a'
                   }}>

                {/* START SHIFT Button */}
                <button
                  onClick={startGame}
                  className="w-full h-16 mb-4 rounded font-bold text-xl text-white tracking-wider
                           bg-gradient-to-b from-blue-500 to-blue-700
                           hover:from-blue-400 hover:to-blue-600
                           active:from-blue-700 active:to-blue-800
                           transition-all duration-150
                           flex items-center justify-center gap-3"
                  style={{
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '2px solid #1e40af',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  <Play className="w-6 h-6 fill-current" />
                  START SHIFT
                </button>

                {/* Global Operator Record */}
                <div className="w-full h-20 mb-4 rounded flex items-center justify-center gap-4
                              bg-gradient-to-b from-amber-600 to-amber-800"
                     style={{
                       boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.2)',
                       border: '2px solid #92400e'
                     }}>
                  <span className="text-amber-900 font-bold text-sm tracking-wider">GLOBAL OPERATOR RECORD</span>
                  <Trophy className="w-8 h-8 text-amber-900" />
                  <div className="font-mono text-4xl font-bold text-amber-900 bg-amber-950/30 px-4 py-2 rounded"
                       style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    {gameState.highScore}
                  </div>
                </div>

                {/* Critical System Status Panel */}
                <div className="bg-black/80 rounded-lg p-4 font-mono text-sm"
                     style={{
                       border: '2px solid #1a1a1a',
                       boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                     }}>
                  <div className="text-green-400 font-bold mb-2 tracking-wider text-base"
                       style={{ textShadow: '0 0 5px #22c55e' }}>
                    CRITICAL SYSTEM STATUS: OPERATOR MANDATE
                  </div>
                  <div className="space-y-2 text-gray-300 text-xs leading-relaxed">
                    <p>
                      You're the night shift maintenance worker at a failing factory. Your job? Keep the machines running at all costs.
                    </p>
                    <p>
                      But there's a problem: you haven't slept in days, and it's getting worse. Each passing day, the fatigue sets in harder, and the machines get more temperamental.
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-red-500 font-bold" style={{ textShadow: '0 0 5px #ef4444' }}>
                        IF 3 MACHINES FAIL, YOU'RE FIRED. GOOD LUCK.
                      </p>
                      <p className="text-green-400 text-xs">{currentTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls hint */}
        <div className="mt-6 flex items-center justify-between text-slate-400 text-sm"
             style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          <p className="flex-1 text-center">Click on machines to fix them • Don't let them break!</p>
          <button
            onClick={toggleMute}
            className="ml-4 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors flex items-center gap-2 text-slate-300"
            style={{ border: '1px solid #4a4a4a' }}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'} Music</span>
          </button>
        </div>
      </div>
    </div>
  );
};
