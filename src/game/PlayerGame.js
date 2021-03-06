import React, { useState } from "react";
import Attempts from "./Attempts";
import GuessInput from "./GuessInput";
import { Stack, DefaultButton } from "@fluentui/react";
import { Text } from "@fluentui/react";

function PlayerGame(props) {
  console.log(props);
  const game = props.game;
  const submitGuess = props.submitGuess;

  const gameStarted = game.playerOne && game.playerTwo;

  const [currentAttempt, setCurrentAttempt] = useState("");
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  const attemptsFromServer = props.isPlayerOne
    ? game.playerOneAttempts
    : game.playerTwoAttempts;
  console.log(props.playerName);

  const showSubmit =
    (props.playerName === game.playerOne && props.isPlayerOne) ||
    (props.playerName === game.playerTwo && !props.isPlayerOne);

  return (
    <div className="singlePlayerGame">
      <Attempts attempts={attemptsFromServer} secret={game.secret} />
      {!gameStarted && <Text as="p">Waiting... </Text>}
      {gameStarted && !game.gameOver && showSubmit && (
        <Stack
          horizontal
          horizontalAlign="center"
          verticalAlign="center"
          tokens={{ childrenGap: 50 }}
          styles={{ root: { marginTop: "15px" } }}
        >
          <Stack.Item>
            <GuessInput
              playerName={props.playerName}
              onChange={(currentAttempt) => {
                setCurrentAttempt(currentAttempt);
              }}
              setSubmitButtonEnabled={setSubmitButtonEnabled}
              clearAttempt={currentAttempt === ""}
            />
            {/* <MaskedTextField 
                mask="9 9 9 9" 
                label="" 
                borderless
                value={currentAttempt}
                inputClassName="singlePlayerGame__input" 
                styles={{ root: { width: '150px', margin:'0 auto', },
                    field: { width: '150px', margin:'0 auto', fontSize:'25px'}
             }}
                onChange={(e, v) => {
                    if (v.indexOf('_')<0){
                        console.log('SettingValue:', v); 
                        setCurrentAttempt(v)
                        setSubmitButtonEnabled(true);
                    }
                }
                } /> */}
          </Stack.Item>
          <Stack.Item>
            <DefaultButton
              text="Submit"
              onClick={() => {
                submitGuess(currentAttempt, props.playerName);
                setCurrentAttempt("");
                // setSubmitButtonEnabled(false);
              }}
              disabled={!submitButtonEnabled}
            />
          </Stack.Item>
        </Stack>
      )}
    </div>
  );
}

export default PlayerGame;
