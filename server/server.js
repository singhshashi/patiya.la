
const app = require('express')();
const e = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const GameEngine = require('./GameEngine.js');

const engine = new GameEngine();

app.get('/', (req, res) => {
    res.send('Hello! I can hear you!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('joingame', (data) => { 
        console.log("StartGame for user: " + data.playerName);
        if (engine.games.length === 0) {
        let gameId = engine.startGame(data.playerName, data.connectionId);
        io.emit('gamestarted', { game: engine.getGame(gameId) }); 
        } else {
            let game = engine.games[0];
            console.log("Engine.games: ", engine.games);
            if(game.playerTwo === null) {
                console.log("Joinign Player Two: " + data.playerName);
                game.joinPlayer(data.playerName, data.connectionId);
                console.log("UpdatedGame: ", game);
                console.log("EngineGame:", engine.getGame(game.id));
                io.emit('playerjoined', { game: engine.getGame(game.id) });
            } else {
                console.log("Game Full");
            }
        }
       // socket.broadcast.emit('startgame', data);
     });
     socket.on('submitGuess', (data) => {
        console.log("SubmitGuess for user: " + data.playerName);
        let game = engine.getGame(data.gameId);
        if (game) {
            game.submitGuess(data.guess, data.playerName);
            console.log("UpdatedGame: ", game);
            console.log("EngineGame:", engine.getGame(data.gameId));
            io.emit('guessSubmitted', { game: engine.getGame(data.gameId) });  
            if (game.isGameOver()) {
                engine.endGame(data.gameId);
            }
        }
        else {
            io.emit('gamenotfound', { gameId: data.gameId });
        } 
     });
});


server.listen(3001, () => {
    console.log('Server is listening on port 3001');
});