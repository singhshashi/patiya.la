const Game = require('./Game');

class GameEngine {
    constructor() {
        this.games = [];
    }

    startGame(playerOne) {
        const game = new Game(playerOne);
        this.games.push(game);
        return game.gameId;
    }

    getGame(gameId) {
        return this.games.find(game => game.gameId === gameId);
    }

    endGame(gameId) {
        const gameIndex = this.games.findIndex(game => game.id === gameId);
        this.games.splice(gameIndex, 1);
    }
}

module.exports = GameEngine;