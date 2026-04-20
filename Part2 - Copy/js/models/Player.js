// Written by Brian Bird, 4/10/2026 using Gemini 3.1 in Antigravity.
//Modified by Xan, 4/17/2026 no AI used at any point

// This class represents a player in the game.
export default class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    // Encapsulates score updates so that only the Player controls its own data.
    setScore(score) {
        this.score = score;
    }
}
