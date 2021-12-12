import { useState } from 'react';
import './App.css';
import './game/SinglePlayerGame';
import SinglePlayerGame from './game/SinglePlayerGame';
import { DefaultButton } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';
import MultiPlayerGame from './game/MultiPlayerGame';

function App() {
const [gameMode, setGameMode ] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
          <h1>Cows and Bulls!</h1>
      </header>
      {gameMode === 0 && (<div className="gameModeSelectionContainer">
        <h2>Select Game Mode</h2>
        <div className="selectGameModeRow">
          <Stack horizontal horizontalAlign="space-between">
            <Stack.Item>
          <DefaultButton className="gameModeButton" onClick={() => setGameMode(1)}>Single Player</DefaultButton>
          </Stack.Item>
          <Stack.Item>
          <DefaultButton className="gameModeButton" onClick={() => setGameMode(2)}>Multi Player</DefaultButton>
          </Stack.Item>
          </Stack>
        </div>
        </div>)}
        {gameMode === 1 && (<div className="singlePlayerGame">
          <SinglePlayerGame />
        </div>)}
        {gameMode === 2 && (<div className="multiPlayerGame">
          <MultiPlayerGame />
        </div>)}
    </div>
  );
}

export default App;
