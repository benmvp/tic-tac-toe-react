import range from 'lodash/range'
import find from 'lodash/find'

// Cache of precomputed winning paths for each given grid size
let _winningPathsCache = {};

function _getAllWinningPaths(gridSize=3) {
    let winningPaths = _winningPathsCache[gridSize];

    if (!winningPaths) {
        let gridRange = range(gridSize);
        let maxPlays = gridSize ** 2

        winningPaths = _winningPathsCache[gridSize] = [
            // rows
            ...gridRange.map(gridNo => range(gridNo * gridSize, (gridNo * gridSize) + gridSize)),

            // columns
            ...gridRange.map(gridNo => range(gridNo, maxPlays, gridSize)),

            // top-left to bottom-right diagonal
            gridRange.map(gridNo => (gridNo * gridSize) + gridNo),

            // top-right to bottom-left diagonal
            gridRange.map(gridNo => (gridNo * gridSize) + gridSize - gridNo - 1),
        ];
    }

    return winningPaths;
}

export const PLAYER_1 = 'X';
export const PLAYER_2 = 'O';

export function getInitialState(gridSize=3, initialPlayer=PLAYER_1) {
    return {
        plays: Array(gridSize ** 2).fill(''),
        currentPlayer: initialPlayer
    };
}

export function getPreviousPlayer(currentPlayer) {
    return currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

export function getWinningPath(plays, currentPlayer) {
    let gridSize = Math.sqrt(plays.length);
    let previousPlayer = getPreviousPlayer(currentPlayer);

    return find(_getAllWinningPaths(gridSize), hand => (
        hand.every(gridNo => plays[gridNo] === previousPlayer)
    ));
}

export function isFullGame(plays) {
    return plays.every(play => !!play);
}

export function addPlay({plays, currentPlayer}, squareNo) {
    let newPlays = [...plays];

    // In place of an immutable set
    newPlays[squareNo] = currentPlayer;

    return {
        plays: newPlays,
        currentPlayer: getPreviousPlayer(currentPlayer)
    };
}
