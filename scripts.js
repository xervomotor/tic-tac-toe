const Gameboard = (() => {
    const gameboard = [['1','2','3'],['4','5','6'],['7','8','9']];
    
    const getGameBoard = () => {
        return gameboard;
    }
    const resetGameBoard = () => {
        gameboard = [['1','2','3'],['4','5','6'],['7','8','9']];
    }
    const setGameBoard = (i, j, value) => {
        gameboard[i][j] = value;
    }
    return {getGameBoard, resetGameBoard, setGameBoard};
})();