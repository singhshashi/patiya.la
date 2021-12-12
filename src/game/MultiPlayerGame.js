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
    

    const socket = useRef();

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
    }
    } , [game, name, socket]);

    return (<div className="multipPlayerGameContainer">
        <Text as="h4" variant="xLarge" block>MutliPlayer Game</Text>
        {!game && (<Stack horizontal horizontalAlign="space-around" verticalAlign="end">
            <Stack.Item>
                <TextField label="Player Name" value={name} onChange={(e,v) => setName(v)}/>
            </Stack.Item>
            <Stack.Item>
                <DefaultButton text="Join" onClick={() => { socket.current.emit('joingame', {playerName: name}); }}/>
            </Stack.Item>
        </Stack>)}
        {game && (<div className="gameContainer">
        <Text as="p" variant="medium" block>Game ID: {game.gameId} (Share this with second player)</Text>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="start">
            <Stack.Item>
                Player One
                <PlayerGame game={game} playerName={name} playerOne={true} />
            </Stack.Item>
            <Stack.Item>
                Player Two
                <PlayerGame game={game} playerName={name} playerOne={false} />
            </Stack.Item>
        </Stack>
        </div>)
        }

    </div>)
}

export default MultiPlayerGame;