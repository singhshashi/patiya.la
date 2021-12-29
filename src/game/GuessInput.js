import { useState, useEffect } from 'react';


function CustomInput(props) {
    return (
            <input id={props.id} type="number" value={props.value} min="0" max="9" onChange={props.onChange} />
    )
}


function GuessInput(props) {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [thirdNumber, setThirdNumber] = useState('');
    const [fourthNumber, setFourthNumber] = useState('');

    useEffect(() => {
        console.log("Inside useEffect");
        document.getElementById(`${props.playerName}-firstNum`).focus();
    }, []);

    useEffect(() => {
        props.onChange(`${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`);
    } , [firstNumber, secondNumber, thirdNumber, fourthNumber]);

    useEffect(() => {
        console.log("Inside useEffect for clearAttempt");
        if (props.clearAttempt) {
            console.log("Clearing Attempt");
        setFirstNumber('');
        setSecondNumber('');
        setThirdNumber('');
        setFourthNumber('');
        document.getElementById(`${props.playerName}-firstNum`).focus();
        }
    } , [props.clearAttempt]);

    return (
        <div className="guess-input">
            <CustomInput id={`${props.playerName}-firstNum`} onChange={(evt) => { setFirstNumber(evt.target.value); document.getElementById(`${props.playerName}-secondNum`).focus(); }} value={firstNumber} />
            <CustomInput id={`${props.playerName}-secondNum`} onChange={(evt) => { setSecondNumber(evt.target.value); document.getElementById(`${props.playerName}-thirdNum`).focus(); }} value={secondNumber} />
            <CustomInput id={`${props.playerName}-thirdNum`} onChange={(evt) => { setThirdNumber(evt.target.value); document.getElementById(`${props.playerName}-fourthNum`).focus(); }} value={thirdNumber} />
            <CustomInput id={`${props.playerName}-fourthNum`} onChange={(evt) => { setFourthNumber(evt.target.value); props.setSubmitButtonEnabled(true) }} value={fourthNumber} />
        </div>
    )
}
export default GuessInput;