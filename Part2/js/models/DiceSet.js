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

        return has6 && has5 && has4;
    }

    // Validates if the player is legally allowed to hold a newly clicked die.
    canHold(die) {
        if ((die.value === 2 || die.value === 3 || die.value === 5 || die.value === 6) && !this.isQualified()) return "You need a 1 and a 4 to take this die";
        if (die.value === 1 && this.hasOne && !this.isQualified()) return "You already have a 1! Additional 1s can be taken after you have both a 1 and a 4";
        if (die.value === 4 && this.hasFour && !this.isQualified()) return "You already have a 4! Additional 1s can be taken after you have both a 1 and a 4";
        // if (die.value === 5 && this.hasCaptain && !this.isQualified()) return "You already have a Captain! Additional 5s are Cargo.";
        // if (die.value === 4 && (!this.hasShip || !this.hasCaptain)) return "You must secure a Captain (5) before keeping a Crew!";
        // if (die.value < 4 && !this.isQualified()) return "You cannot keep Cargo dice until you have a Ship, Captain, and Crew!";
        return true;
    }

    // Validates if the player is legally allowed to un-keep a clicked die.
    canUnhold(die) {
        if (die.value === 1 && this.hasOne) {
            let held1Count = 0;
            for (const d of this.dice) {
                if (d.isHeld && d.value === 1) held1Count++;
            }
            if (held1Count === 1) return "You must have more than a single 1!";
        }
        if (die.value === 4 && this.hasFour) {
            let held4Count = 0;
            for (const d of this.dice) {
                if (d.isHeld && d.value === 4) held4Count++;
            }
            if (held4Count === 1) return "You must have more than a single 4!";
        }
        return true;
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
        this.hasShip = false;
        this.hasCaptain = false;
        this.hasCrew = false;
        
        for (const die of this.dice) {
            die.reset();
        }
    }
}
