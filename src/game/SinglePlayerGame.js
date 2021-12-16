import { useState } from 'react';
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';
import Attempts from './Attempts';
function SinglePlayerGame() {
    const getSecret = () => {
        return Math.floor(1000 + Math.random() * 9000);
    }

    const [ secret , setSecret ] = useState(getSecret());
    const [attempts, setAttempts] = useState([]);
    const [currentAttempt, setCurrentAttempt] = useState('');
    const [ submitButtonEnabled, setSubmitButtonEnabled ] = useState(false);
    const [gameOver , setGameOver] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [  gameWon, setGameWon ] = useState(false);

    const checkAttempt = (attempt)  => {
        attempt = attempt.replace(/ /g, '');
        if (attempt === secret.toString()) {
           console.log("You Won"); 
            setGameOver(true);
            setGameWon(true);
        }
    }



    const questionString = gameOver ? secret : 'X X X X';
    return (
        <div className="singlePlayerGame">
            <p>{questionString}</p>
            <Attempts attempts={attempts} secret={secret} />
            {!gameOver && (<Stack horizontal horizontalAlign="center" styles={{root:{marginTop:'20px'}}}>
                <Stack.Item>
            <MaskedTextField 
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
                } />
                </Stack.Item>
            <Stack.Item>
            <PrimaryButton text="Submit" onClick={() => {
                attempts.push(currentAttempt);
                setAttempts(attempts);  
                checkAttempt(currentAttempt);
                setCurrentAttempt('');
                setSubmitButtonEnabled(false);
            } } disabled={!submitButtonEnabled}  />
            </Stack.Item>
            </Stack>)}
            {gameOver && (<div className="gameOver">
                {gameWon ? (<p>You Won!</p>) : (<p>You Lost!</p>)}
                <DefaultButton text="Play Again" onClick={() => {
                    setGameWon(false);
                    setGameOver(false);
                    setTimeRemaining(60);
                    setAttempts([]);
                    setCurrentAttempt('');
                    setSubmitButtonEnabled(false);
                    setSecret(getSecret());
                } } />
                </div>)}
        </div>

    )
}
export default SinglePlayerGame;