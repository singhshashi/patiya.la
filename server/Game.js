 
 class Game {
    constructor(playerOne) {
        this.playerOne = playerOne; 
        this.playerTwo = null;
        this.secret = this.generateSecret();
        this.playerOneAttempts = [];
        this.playerTwoAttempts = [];
        this.gameId = new Date().getTime(); 
        this.gameOver = false;
        this.winner = null;
    }

    generateSecret() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    
    gameStarted() {
        return this.playerOne && this.playerTwo;
    }

    joinPlayer(playerTwo) {
        this.playerTwo = playerTwo;
    }

    submitGuess(guess, player) {
        if (player === this.playerOne) {
        this.playerOneAttempts.push(guess);
        this.checkForWinner(guess, this.playerOne);
        } else if (player === this.playerTwo) {
        this.playerTwoAttempts.push(guess);
        this.checkForWinner(guess, this.playerTwo);
        }
    }

    checkForWinner(guess, player) {
        if (!this.gameOver) {
            if (guess === this.secret) {
                this.gameOver = true;
                this.winner = player;
            }
        }
    }

    isGameOver() {
        return this.gameOver;
    }

    getGame() {
        return {
            gameId: this.gameId,
            playerOne: this.playerOne,
            playerTwo: this.playerTwo,
            secret: this.secret,
            playerOneAttempts: this.playerOneAttempts,
            playerTwoAttempts: this.playerTwoAttempts,
            gameOver: this.gameOver,
            winner: this.winner
        }
    }

}

module.exports = Game;