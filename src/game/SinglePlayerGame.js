import { useState } from 'react';
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';
import Attempts from './Attempts';
function SinglePlayerGame() {
    const [ secret] = useState(Math.floor(1000 + Math.random() * 9000));
    const [attempts, setAttempts] = useState([]);
    const [currentAttempt, setCurrentAttempt] = useState('');
    const [ submitButtonEnabled, setSubmitButtonEnabled ] = useState(false);

    return (
        <div className="singlePlayerGame">
            <p>{secret}</p>
            <Attempts attempts={attempts} secret={secret} />
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
                attempts.push(currentAttempt);
                setAttempts(attempts);  
                setCurrentAttempt('');
                setSubmitButtonEnabled(false);
            } } disabled={!submitButtonEnabled}  />
            </Stack.Item>
            </Stack>
        </div>

    )
}
export default SinglePlayerGame;