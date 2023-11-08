// Gameboard module (IIFE)
const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    
    // Event delegation
    const gameboardGrid = document.querySelector('#gameboard');
    gameboardGrid.addEventListener('click', e => {
        const cell = e.target;
        const index = cell.dataset.index;
        if (cell.className.includes('game-cell') && gameboard[index] === '') {
            setCell(john, index);
        }
    });

    const getState = () => gameboard.slice();
    const setCell = (player, index) => {
        if (index >= gameboard.length) return;
        gameboard[index] = player.marker;
        document.querySelector(`[data-index="${index}"]`).textContent = player.marker;
    }
    const reset = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.textContent = '';
        })
    }
    return { setCell, reset, getState };
})();

// Factory function
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

