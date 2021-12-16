const Game = require('./Game');

class GameEngine {
    constructor() {
        this.games = [];
    }

    startGame(playerOne, connectionId) {
        const game = new Game(playerOne, connectionId);
        this.games.push(game);
        return game.id;
    }

    getGame(id) {
        return this.games.find(game => game.id === id);
    }

    endGame(id) {
        const gameIndex = this.games.findIndex(game => game.id === id);
        this.games.splice(gameIndex, 1);
    }
}

module.exports = GameEngine;