// Gameboard module (IIFE)
const Gameboard = (() => {

    let gameboard = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    // Event delegation
    const gameboardGrid = document.querySelector('#gameboard');
    gameboardGrid.addEventListener('click', e => {
        const cell = e.target;
        const index = cell.dataset.index;
        if (cell.className.includes('game-cell') && gameboard[index] === '') {
            setCell(user, index);
            setTimeout(() => {
                computerMove();
            }, Math.floor(Math.random() * 400) + 800);
            
        }
    });

    const getState = () => gameboard.slice();

    const setCell = (player, index) => {
        if (index >= gameboard.length) return;
        gameboard[index] = player.marker;
        document.querySelector(`[data-index="${index}"]`).textContent = player.marker;

        if (checkForWinner(player)) {
            console.log(player.name + ' wins.');
        } else if (gameboard.every(cell => cell !== '')) {
            console.log('draw.');
        }
    }

    const computerMove = () => {
        let availableCells = gameboard
            .map( (cell, index) => (cell === '' ? index : null))
            .filter(val => val !== null);
        // One simple logic is to radomly place a marker on an available cell
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        if (randomIndex !== undefined) {
            setCell(computer, randomIndex);
        }
    }

    const checkForWinner = (player) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameboard[index] === player.marker
            })
        })
    }

    const reset = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.textContent = '';
        })
    }

    return { getState, setCell, reset };

})();

// Factory function
function createPlayer (name, marker) {
    return { name, marker };
}



function initializeGame() {
    const user = createPlayer('User', 'X');
    const computer = createPlayer('computer', 'O');
    let currentPlayer = user;
    Gameboard.reset();
    return { user, computer, currentPlayer };
}

const { user, computer, currentPlayer } = initializeGame();

