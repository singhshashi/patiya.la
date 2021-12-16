 
 class Game {
    constructor(playerOne, connectionId) {
        this.playerOne = playerOne; 
        this.playerOneConnectionId = connectionId;
        this.playerTwo = null;
        this.playerTwoConnectionId = null;
        this.secret = this.generateSecret();
        this.playerOneAttempts = [];
        this.playerTwoAttempts = [];
        this.id = new Date().getTime(); 
        this.gameOver = false;
        this.winner = null;
    }

    generateSecret() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    
    gameStarted() {
        return this.playerOne && this.playerTwo;
    }

    joinPlayer(playerTwo, connectionId) {
        this.playerTwo = playerTwo;
        this.playerTwoConnectionId = connectionId;
    }

    submitGuess(guess, player) {
        console.log("Submitting guess");
        if (player === this.playerOne) {
        this.playerOneAttempts.push(guess);
        this.checkForWinner(guess, this.playerOne);
        } else if (player === this.playerTwo) {
        this.playerTwoAttempts.push(guess);
        this.checkForWinner(guess, this.playerTwo);
        }
    }

    checkForWinner(guess, player) {
        console.log("Checking for winner");
        console.log(this);
        guess = guess.replace(/ /g, '');
        if (!this.gameOver) {
            if (guess === this.secret.toString()) {
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
            id: this.id,
            playerOne: this.playerOne,
            playerOneConnectionId: this.playerOneConnectionId,
            playerTwo: this.playerTwo,
            playerTwoConnectionId: this.playerTwoConnectionId,
            secret: this.secret,
            playerOneAttempts: this.playerOneAttempts,
            playerTwoAttempts: this.playerTwoAttempts,
            gameOver: this.gameOver,
            gameStarted: this.gameStarted(),
            winner: this.winner
        }
    }

}

module.exports = Game;