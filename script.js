// Gameboard module
const Gameboard = (() => {

    let gameboard = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let gameActive = true;
    
    // Event delegation
    const gameboardGrid = document.querySelector('#gameboard');
    gameboardGrid.addEventListener('click', e => {
        const cell = e.target;
        const index = cell.dataset.index;
        if (cell.className.includes('game-cell') && gameboard[index] === '') {
            setCell(user, index);
            setTimeout(() => {
                computerMove();
            }, Math.floor(Math.random() * 200) + 600);
            
        }
    });

    const getState = () => gameboard.slice();

    const setCell = (player, index) => {
        if (index >= gameboard.length || !gameActive) return;
        gameboard[index] = player.marker;
        document.querySelector(`[data-index="${index}"]`).textContent = player.marker;

        const gameResult = document.querySelector('#game-result')
        if (checkForWinner(player)) {
            gameActive = false;
            displayResult(gameResult, player.name + ' wins.');
            displayResetBtn();
        } else if (gameboard.every(cell => cell !== '')) {
            gameActive = false;
            displayResult(gameResult, 'Draw.');
            displayResetBtn();
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

    const displayResult = (element, text, interval = 20) => {
        let index = 0;
        element.textContent = '';
        function nextLetter() {
            element.textContent += text[index++];
            if (index < text.length) {
                setTimeout(nextLetter, interval);
            }
        }
        nextLetter();
    }

    const displayResetBtn = () => {
        const main = document.querySelector('main');
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.className = 'fade-in';
        main.appendChild(resetBtn);

        setTimeout(() => {
            resetBtn.classList.add('visible');
        }, 10);
    }

    const reset = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.textContent = '';
        })
    }

    return { getState, reset };

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

