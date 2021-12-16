import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { DefaultButton } from "@fluentui/react";
import { TextField } from "@fluentui/react";
import { Stack } from "@fluentui/react";
import { Text } from "@fluentui/react";
import PlayerGame from "./PlayerGame";

function MultiPlayerGame() {
    const getRandomName = () => {
        const names = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Mew", "Mewtwo", "Meowth", "Psyduck", "Jigglypuff"];
        return names[Math.floor(Math.random() * names.length)];
    };
   
    const [name, setName] = useState(getRandomName());
    const [game, setGame] = useState(null);
    const [connectionId] = useState(Math.random().toString(36).substring(7));
    

    const socket = useRef();

    console.log("name: ", name);

    useEffect(() => {
        const initalizedSocket = socketIOClient("http://localhost:3001", {transports: ['websocket']});
        socket.current = initalizedSocket;
        return () => {
            const currentSocket = socket.current;
            currentSocket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!game) {
            console.log(socket.current);
        socket.current.on('gamestarted', (data) => { 
            console.log('game started:', data); 
            setGame(data.game); 
        });
        socket.current.on('playerjoined', (data) => {
            setGame(data.game);
        });
        socket.current.on('guessSubmitted', (data) => {
            setGame(data.game);
        });
    }
    } , [game,socket]);

    const submitGuess = (guess, playerName) => {
        socket.current.emit('submitGuess', {gameId:game.id, guess: guess, playerName: playerName});
    }

    console.log("MutliPlayerGame", game);
    return (<div className="multipPlayerGameContainer">
        <Text as="h4" variant="xLarge" block>MutliPlayer Game</Text>
        {!game && (<Stack horizontal horizontalAlign="space-around" verticalAlign="end">
            <Stack.Item>
                <TextField label="Player Name" value={name} onChange={(e,v) => setName(v)}/>
            </Stack.Item>
            <Stack.Item>
                <DefaultButton text="Join" onClick={() => { socket.current.emit('joingame', {playerName: name, connectionId: connectionId }); }}/>
            </Stack.Item>
        </Stack>)}
        {game && (<div className="gameContainer">
        <Text as="p" variant="medium" block>Game ID: {game.id} </Text>
        <Stack horizontal horizontalAlign="start" verticalAlign="start" styles={{root:{marginTop: '50px'}}}>
            <Stack.Item styles={{root: {width:'48%'}}}>
                <Text as="p" block> Player One ({game.playerOne ? game.playerOne : 'Waiting for player to join..'})</Text>
                <PlayerGame game={game} playerName={name} isPlayerOne={true} submitGuess={submitGuess} />
            </Stack.Item>
            <Stack.Item styles={{root:{width:'48%'}}}>
                <Text as="p" block>Player Two ({game.playerTwo ? game.playerTwo : 'Waiting for player to join..'})</Text>
                <PlayerGame game={game} playerName={name} isPlayerOne={false} submitGuess={submitGuess} />
            </Stack.Item>
        </Stack>
        </div>)
        }

    </div>)
}

export default MultiPlayerGame;