import DiceSet from './DiceSet.js';
import Player from './Player.js';
// Written by Brian Bird, 4/10/2026 using Gemini 3.1 in Antigravity.
//Modified by Xan, 4/17/2026 no AI used at any point

//Game logic:
//populate 6 dice
//require 1 die to be reserved before allowing reroll
//first 2 dice reserved need to be a 1 and a 4
//then you may choose any of the other die
//once all 6 dice are reserved, calculate score and end player turn
//
//-Psuedo Code-
//this.diceset = populate dice
//this.isGameOver = false;
//this.dieChosen = true;  this allows the first roll to be done
//this.resetTurnState = (diceLeft = 6)
//
//


// This class represents the overall game state and logic. 
export default class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        
        this.diceSet = new DiceSet();
        
        this.isGameOver = false;
        this.dieChosen = 0; //This represents if a die was reserved, and allows a reroll to be done.

        // Initialize turn-specific state properties
        this.resetTurnState();
    }

    startNewGame(playerNames) {
        this.players = [];
        for (const name of playerNames) {
            this.players.push(new Player(name));
        }
        
        this.currentPlayerIndex = 0;
        this.isGameOver = false;
        this.firstTurn = true;
        this.diceLeft = 6;
        this.resetTurnState();
    }

    resetTurnState() {
        this.diceLeft = 6;
        this.diceSet.reset();
        this.firstTurn = true;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    rollDice() {
        if (this.dieChosen > 0 || this.firstTurn) {
            this.diceSet.rollAll();
            this.dieChosen = 0;
            this.firstTurn = false;
        }
    }

    // Helper methods to abstract end-of-turn game states away from the UI
    isTurnOver() {
        return this.diceLeft === 0;
    }

    hasBusted() {
        // Instead of evaluating their currently selected score (which might be 0 just because they haven't clicked yet),
        // we check if their physical board has the POTENTIAL to score. If not, they've definitively busted.
        return this.isTurnOver() && !this.diceSet.canPotentiallyQualify();
    }

    endTurn() {
        // Save score for current player via its setter to respect encapsulation.
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.setScore(this.diceSet.getCurrentCargoScore());

        // Advance to next player or end game
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.isGameOver = true;
        } else {
            this.resetTurnState();
        }
    }

    getWinners() {
        if (!this.isGameOver) return [];
        
        let maxScore = -1;
        let winners = [];

        // Loop through all players to find the highest score. 
        // We push to an array instead of just saving one player because ties are possible
        // and we want to return all players who share the top score.
        for (const player of this.players) {
            if (player.score > maxScore) {
                maxScore = player.score;
                winners = [player];
            } else if (player.score === maxScore) {
                winners.push(player);
            }
        }
        return winners;
    }
}
