
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
        if (engine.games.length == 0) {
        let gameId = engine.startGame(data.playerName);
        io.emit('gamestarted', { game: engine.getGame(gameId) }); 
        } else {
            let game = engine.games[0];
            game.joinPlayer(data.playerName);
            io.emit('playerjoined', { game: engine.getGame(game.id) });
        }
       // socket.broadcast.emit('startgame', data);
     });
     socket.on('submitGuess', (data) => {
        console.log("SubmitGuess for user: " + data.playerName);
        let game = engine.getGame(data.gameId);
        game.submitGuess(data.guess, data.playerName);
        io.emit('guessSubmitted', { game: engine.getGame(data.gameId) });  
        if (game.isGameOver()) {
            engine.endGame(data.gameId);
        }
     });
});


server.listen(3001, () => {
    console.log('Server is listening on port 3001');
});