import { Stack } from "@fluentui/react";

function Attempts(props) {
    const { attempts, secret } = props;
    const getCowsAndBullsString = (attempt) => {
        attempt = attempt.replace(/ /g, '');
        const secretString = secret.toString();
        console.log('getCowsAndBullsString.attempt', attempt);
        console.log('getCowsAndBullsString.secret', secretString);
        let cows = 0;
        let bulls = 0;
        for (let i = 0; i < secretString.length; i++) {
            if (secretString[i] === attempt[i]) {
                bulls++;
            } else if (secretString.includes(attempt[i])) {
                cows++;
            }
        }
        return `${bulls}B ${cows}C`;
    }
    return (
        <div className="attempts">
            {attempts.map((attempt, index) => {
                const cowsAndBulls = getCowsAndBullsString(attempt);
                const attemptCssClass = cowsAndBulls === '4B 0C' ? 'attempt-success' : 'attempt';
                return (
                    <div key={index} className={attemptCssClass}>
                        <Stack horizontalAlign="space-around" verticalAlign="center" horizontal>
                            <Stack.Item>
                        <div className="attempt-word">{attempt}</div>
                                </Stack.Item>
                                <Stack.Item>
                                    {getCowsAndBullsString(attempt)}                                    </Stack.Item>
                                   </Stack> 
                    </div>
                );
            })}
        
        </div>
    );
}

export default Attempts;