// DOM manipulations
const gameboardGrid = document.querySelector('#gameboard');
const gameboardCell = document.querySelectorAll('.game-cell');

gameboardCell.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        Gameboard.setCell(john, index);
    });
})

// Gameboard module (IIFE)
const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    
    const getState = () => gameboard.slice();
    const setCell = (player, index) => {
        if (index >= gameboard.length) return;
        gameboard[index] = player.marker;
        gameboardCell[index].textContent = player.marker;
    }
    const reset = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        gameboardCell.forEach(cell => {
            cell.textContent = '';
        })
    }
    return { setCell, reset, getState };
})();

function createPlayer (name, marker) {
    return { name, marker };
}





// Tests
const john = createPlayer('john', 'X')
const ben = createPlayer('ben', 'O');

console.log(john);
console.log(ben);

Gameboard.setCell(john, 4);
Gameboard.setCell(ben, 8);
Gameboard.setCell(john, 2);
Gameboard.setCell(ben, 7);
console.log(Gameboard.getState());

Gameboard.reset();
console.log(Gameboard.getState());

