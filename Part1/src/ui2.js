class Ui {
    constructor (){
        this.dominoElements = [];
        this.targetElement = null;
        this.statusElement = null;
    }

    cacheDominioElements(){
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOS; i++) {
            this.dominoElements.push(document.getElementById(i));
        }
        
        this.targetElement = document.getElementById('target-domino');
        this.statusElement = document.getElementById('status');
    }

    formatDominoText = () => {`${domino.leftPips} | ${domino.rightPips}`;}

    showAllBacks(){
        for (let i = 0; i < this.dominoElements.length; i++){
            this.showDominoBack(i);
        }
    }

    showDominoBack(index){
        const domino = this.dominoElements[index];
        domino.textContent = ''; //blank domino face
        domino.classList.add('back'); //back tag shows the domino's back image instead of being blank
        domino.classList.remove('removed'); //removed tag tells the game that the domino cant be touched or seen
    }
}