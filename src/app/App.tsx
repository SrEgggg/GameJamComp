import { GameProvider, useGame } from './context/GameContext';
import { MainMenu } from './screens/MainMenu';
import { Gameplay } from './screens/Gameplay';
import { GameOver } from './screens/GameOver';

function GameRoot() {
  const { gameState } = useGame();

  return (
    <>
      {gameState.currentScreen === 'menu' && <MainMenu />}
      {gameState.currentScreen === 'gameplay' && <Gameplay />}
      {gameState.currentScreen === 'gameover' && <GameOver />}
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameRoot />
    </GameProvider>
  );
}
