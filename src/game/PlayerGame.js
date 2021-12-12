import React, { useState } from 'react';
import Attempts from './Attempts';
import { Stack, PrimaryButton, MaskedTextField } from '@fluentui/react';

function PlayerGame(attemptsFromServer, secretFromServer, submitAttempt, playerName) {

    const [ secret] = useState(secretFromServer);
    const [currentAttempt, setCurrentAttempt] = useState('');
    const [ submitButtonEnabled, setSubmitButtonEnabled ] = useState(false);

    return (
        <div className="singlePlayerGame">
            <p>{secret}</p>
            <Attempts attempts={attemptsFromServer} secret={secret} />
            <Stack horizontal horizontalAlign="center">
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
                submitAttempt(currentAttempt, playerName);
                setSubmitButtonEnabled(false);
            } } disabled={!submitButtonEnabled}  />
            </Stack.Item>
            </Stack>
        </div>

    )
}

export default PlayerGame;