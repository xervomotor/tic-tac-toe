const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', '',];
    
    const setCell = (index, marker) => {
        if (index >= gameboard.length) return;
        gameboard[index] = marker;
    }
    const getCell = (index) => {
        if (index >= gameboard.length) return;
        return gameboard[index];
    }
    const reset = () => {
        gameboard = ['', '', '', '', '', '', '', '', '',];
    }
    return {setCell, getCell, reset};
})();

const Player = (name, marker) => {
    this.name = name;
    this.marker = marker;
}

const playerX = Player('playerX', 'X');
const playerO = Player('playerO', 'O');