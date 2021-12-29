import { useEffect, useState, useRef } from "react";
import { DefaultButton } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import Attempts from "./Attempts";
import GuessInput from "./GuessInput";

function SinglePlayerGame() {
  const getSecret = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const [secret, setSecret] = useState(getSecret());
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(240);
  const [gameWon, setGameWon] = useState(false);
  const intervalRef = useRef();

  const checkAttempt = (attempt) => {
    attempt = attempt.replace(/ /g, "");
    if (attempt === secret.toString()) {
      console.log("You Won");
      setGameOver(true);
      setGameWon(true);
    }
  };

  useEffect(() => {
    if (submitButtonEnabled) {
      document.getElementById("btnSubmit-singlePlayer").focus();
    }
  }, [submitButtonEnabled]);

//   useEffect(() => {
//       console.log("Inside useEffect for settingTimeRemaining");
//      intervalRef.current = setInterval(() => {
//       setTimeRemaining((t) => t - 1);
//     }, 1000);

//     return function cleanup() {
//       clearInterval(intervalRef.current);
//     }
//   }, []);

  useEffect(() => {
     intervalRef.current = setInterval(() => {
      setTimeRemaining((t) => t - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(intervalRef.current);
    }
  }, [secret]);

  useEffect(() => {
      if (timeRemaining <= 0 || gameOver) {
          clearInterval(intervalRef.current);
          if (!gameOver) {
              setGameOver(true);
              setGameWon(false);
          }
      }
  },[timeRemaining, gameOver]);

  const questionString = gameOver ? secret : "X X X X";
  return (
    <div className="singlePlayerGame">
      <p className="questionString">{questionString}      Time: {timeRemaining}</p>
      <Attempts attempts={attempts} secret={secret} />
      {!gameOver && (
        <Stack
          horizontal
          horizontalAlign="center"
          verticalAlign="center"
          tokens={{ childrenGap: 50 }}
          styles={{ root: { marginTop: "20px" } }}
        >
          <Stack.Item>
            <GuessInput
              playerName="singlePlayer"
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
                attempts.push(currentAttempt);
                setAttempts(attempts);
                checkAttempt(currentAttempt);
                setCurrentAttempt("");
                setSubmitButtonEnabled(false);
              }}
              disabled={!submitButtonEnabled}
              id="btnSubmit-singlePlayer"
            />
          </Stack.Item>
        </Stack>
      )}
      {gameOver && (
        <div className="gameOver">
          {gameWon ? <p>You Won!</p> : <p>You Lost!</p>}
          <DefaultButton
            text="Play Again"
            onClick={() => {
              setGameWon(false);
              setGameOver(false);
              setTimeRemaining(240);
              setAttempts([]);
              setCurrentAttempt("");
              setSubmitButtonEnabled(false);
              setSecret(getSecret());
            }}
          />
        </div>
      )}
    </div>
  );
}
export default SinglePlayerGame;
