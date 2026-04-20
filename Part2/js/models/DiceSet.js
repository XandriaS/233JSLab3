//Modified by Xan, 4/17/2026 no AI used at any point
import Die from './Die.js';

export default class DiceSet {
    constructor() {
        this.dice = [];
        for (let i = 0; i < 6; i++) {
            this.dice.push(new Die());
        }

        this.hasOne = false;
        this.hasFour = false;
    }

    rollAll() {
        for (const die of this.dice) {
            die.roll();
        }
        this.evaluateDice();
    }

    evaluateDice() {
        // Reset state so it can be dynamically evaluated based on what the user currently holds.
        this.hasOne = false;
        this.hasFour = false;

        // Simply check the pool of manually held dice for the presence of our target qualifiers.
        let held1 = false;
        let held4 = false;

        for (const die of this.dice) {
            if (die.isHeld) {
                if (die.value === 1) held1 = true;
                else if (die.value === 4) held4 = true;
            }
        }

        // Apply rules strictly based on what is currently held: 
        // Ship unlocks Captain, Captain unlocks Crew
        if (held1) {
            this.hasOne = true;
        }
        if (held4){
            this.hasFour = true;
        }
    }

    // Returns true if the player has secured both qualifiers (1,4).
    isQualified() {
        return this.hasOne && this.hasFour;
    }

    // Checks if the physical board contains the 1 and 4, regardless of whether 
    // the user has actually clicked to hold them yet.
    canPotentiallyQualify() {
        let has1 = false;
        let has4 = false;

        for (const die of this.dice) {
            if (die.value === 1) has1 = true;
            if (die.value === 4) has4 = true;
        }

        return has1 && has4;
    }

    getCurrentCargoScore() {
        // A player only scores points if they have acquired the 6, 5, and 4.
        if (this.isQualified()) {
            // Because we always play with exactly 6 dice, and the qualifying
            // 1 and 4 will always sum exactly to 5, 
            // the fastest way to sum the remaining 4 "Cargo" dice is to sum ALL 6 dice 
            // and subtract the 5 we know comes from the qualifiers.
            let total = 0;
            for (const die of this.dice) {
                total += die.value;
            }
            return total - 5; 
        }
        return 0; // If they don't qualify with all three pieces, their score is 0.
    }

    reset() {
        for (const die of this.dice) {
            die.reset();
        }
    }
}
