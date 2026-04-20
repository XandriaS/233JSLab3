import { NUMBER_OF_DOMINOS } from "./gameLogic.js";

/*  
    Written by Brian Bird, 3/29/2026, using GitHub Copilot

    Finished by Xan Kau, 4/10/2026, no AI used at any step
*/
// -------------------- UI --------------------

export default class UI{
    constructor(){
        this.dominoElements = [];
        this.targetElement = null;
        this.statusElement = null;
    }

    cacheDominoElements() {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
            this.dominoElements.push(document.getElementById(i));
        };

        this.targetElement = document.getElementById('target-domino');
        this.statusElement = document.getElementById('status');
    }

    formatDominoText = (domino) => {return (`${domino.leftPips} | ${domino.rightPips}`);}

    showAllBacks(){
        // TODO: iterate over dominoElements and show the back for each domino.
        for (let i = 0; i < this.dominoElements.length; i++){
            this.showDominoBack(i);
        }
    }

    showDominoBack(index){
        // TODO: show the back of the domino at the given index.
        const domino = this.dominoElements[index];
        domino.textContent = ''; //blank domino face
        domino.classList.add('back'); //back tag shows the domino's back image instead of being blank
        domino.classList.remove('removed'); //removed tag tells the game that the domino cant be touched or seen

    }

    showGridDominoFace(index, dominoObj){
        // TODO: show the face of the domino at the given index.
        const domino = this.dominoElements[index];
        domino.textContent = this.formatDominoText(dominoObj);
        domino.classList.remove('back'); 
        domino.classList.remove('removed');

    }

    updateTarget(dominoObj){
        this.targetElement.textContent = this.formatDominoText(dominoObj);
    }

    disableDomino(index){
        // TODO: disable the domino at the given index.
        const domino = this.dominoElements[index];
        domino.onclick = null; //makes the domino uninteractable
        domino.style.cursor = 'default'
    }

    disableAllDominos(){
        // TODO: iterate over dominoElements and disable each domino.
        for (const domino of this.dominoElements){
            domino.onclick = null;
            domino.style.cursor = 'default'
        }
    }

    enableAllDominos(clickHandler, onlyRemaining = false){
        for (const domino of this.dominoElements) {
            const isRemoved = domino.classList.contains('removed');
            if (!onlyRemaining || !isRemoved) {
                domino.onclick = clickHandler;
                domino.style.cursor = 'pointer';
            }
        }
    }

    removeDomino(index){
        // TODO: remove the domino at the given index from the board.
        const domino = this.dominoElements[index];
        domino.classList.add('removed');
        domino.onclick = null;
        domino.style.cursor = 'default'
        domino.classList.remove('back')

    }

    updateStatus(lives = 5, removedCount = 0, message = ''){
        let text = `Lives: ${lives} Removed: ${removedCount}/20 || ${message}`;
        this.statusElement.innerHTML = text;
    }
};