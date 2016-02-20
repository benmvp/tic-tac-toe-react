import range from 'lodash/range'

// TODO: Cache precomputed winning hands for each given grid size

function _getWinningHands(gridSize=3) {
    let gridRange = range(gridSize);
    let maxPlays = gridSize ** 2

    return [
        // rows
        ...gridRange.map(gridNo => range(gridNo * gridSize, (gridNo * gridSize) + gridSize)),

        // columns
        ...gridRange.map(gridNo => range(gridNo, maxPlays, gridSize)),

        // top-left to bottom-right diagonal
        gridRange.map(gridNo => (gridNo * gridSize) + gridNo),

        // top-right to bottom-left diagonal
        gridRange.map(gridNo => (gridNo * gridSize) + gridSize - gridNo - 1),
    ];
};

function _getWinningHand(plays, player) {
    // TODO: return winning hand for player (if exists)
}

export const PLAYER_1 = 'X';
export const PLAYER_2 = 'O';

export function getInitialState(gridSize=3, initialPlayer=PLAYER_1) {
    return {
        plays: Array(gridSize ** 2).fill(''),
        currentPlayer: initialPlayer,
        winningHand: undefined
    };
}

export function addPlay(gridSize, {plays, currentPlayer, winningHand}=getInitialState(gridSize), squareNo) {
    let newPlays = [...plays];

    // In place of an immutable set
    newPlays[squareNo] = currentPlayer;

    return {
        plays: newPlays,
        currentPlayer: currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1,
        winningHand: _getWinningHand(plays)
    };
}
