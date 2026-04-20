/*  
    Written by Brian Bird, 3/29/2026, using GitHub Copilot

    Finished by Xan Kau, 4/10/2026, no AI used at any step
*/

// -------------------- Game Logic --------------------
// -------------------- Constants --------------------
export const NUMBER_OF_DOMINOS = 20;
const STARTING_LIVES = 5;
const HALF_CLEARED_COUNT = NUMBER_OF_DOMINOS / 2;

function Domino(leftPips, rightPips) {
    this.leftPips = leftPips;
    this.rightPips = rightPips;
}

export default class GameLogic {
    constructor(){
        this.lives = STARTING_LIVES;
        this.removedCount = 0;
        this.currentTargetIndex = NUMBER_OF_DOMINOS;
        this.dominos = [];
        this.currentPick = -1;
        this.failedPickHistory = {};
    }

    fillDominos() {
        // TODO: fill the dominos array with random domino objects and a starting target.
        this.dominos = [];
        let targetLeft = 0;
        let targetRight = 0;
        let dominoLeft = 0;
        let dominoRight = 0;
        do{
            targetLeft = Math.floor(Math.random() * 7);
            targetRight = Math.floor(Math.random() * 7);
        }while (targetLeft + targetRight > 10 || targetLeft + targetRight < 6);

        //then, I generate half+1 dominos strictly greater in pip value than the target domino.
        for (let i = 0; i < (NUMBER_OF_DOMINOS/2) + 1; i++){
            do{
                dominoLeft = Math.floor(Math.random() * 7);
                dominoRight = Math.floor(Math.random() * 7);
            }while ((dominoLeft + dominoRight) <= (targetLeft + targetRight));
            this.dominos.push(new Domino(dominoLeft, dominoRight));
        }
        for (let i = 0; i < (NUMBER_OF_DOMINOS/2)-1; i++){
            dominoLeft = Math.floor(Math.random() * 7);
            dominoRight = Math.floor(Math.random() * 7);
            this.dominos.push(new Domino(dominoLeft, dominoRight));
        }
        //technically I believe the game is still sometimes unwinnable. if a board generates that is 11 dominos of 12 pip value and 9 dominos of 2 pip value you still cannot win.
        this.dominos.push(new Domino(targetLeft, targetRight));
    }

    shuffleGridDominos() {
        // TODO: shuffle the grid dominos array randomly.

        const newarray = this.dominos;
        for (let i = 0; i < this.currentTargetIndex; i++){
            let randomIndex = Math.floor(Math.random() * this.currentTargetIndex);
            [newarray[i], newarray[randomIndex]] = [newarray[randomIndex], newarray[i]];
        }
        
    }

    pickDomino(index) {
        // TODO: record the player's pick by setting currentPick.
        this.currentPick = index;
    }


    getTotalPips = (domino) => domino.leftPips + domino.rightPips
    

    isHigherThanTarget() {
        // TODO: return true when the picked domino total is greater than the target total.
        const picked = this.dominos[this.currentPick];
        const target = this.dominos[this.currentTargetIndex]
        return (this.getTotalPips(picked) > this.getTotalPips(target));
    }

    acceptPick() {
        this.removedCount++;

        if (this.removedCount > HALF_CLEARED_COUNT) {
            const targetTotal = this.getTotalPips(this.dominos[this.currentTargetIndex]);
            const reducedTargetTotal = Math.max(0, targetTotal - 1);
            const reducedLeft = Math.min(6, reducedTargetTotal);
            const reducedRight = reducedTargetTotal - reducedLeft;

            this.dominos[this.currentTargetIndex] = new Domino(reducedLeft, reducedRight);
            return true;
        }

        return false;
    }

    rejectPick() {
        const pickIndex = this.currentPick;
        const hasFailedBefore = this.failedPickHistory[pickIndex] === true;

        if (hasFailedBefore) {
            this.lives--;
            return true;
        }

        this.failedPickHistory[pickIndex] = true;
        return false;
    }

    hasClearedBoard() {
        return this.removedCount === NUMBER_OF_DOMINOS;
    }

    isOutOfLives() {
        return this.lives <= 0;
    }

    resetPick() {
        // TODO: reset currentPick to -1 for the next turn.
        this.currentPick = -1;
    }
};