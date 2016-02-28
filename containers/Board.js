import React, {Component, PropTypes} from 'react';
import Square from '../components/Square';
import {getInitialState, addPlay, getWinningPath, isFullGame, getPreviousPlayer, PLAYER_1} from '../action-reducers';

function MessageOverlay({message, onRestart}) {
    let containerStyle = {
        alignItems: 'center',
        background: 'rgba(100, 100, 100, .9)',
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: '100%'
    };
    let messageStyle = {
        background: 'rgba(255, 255, 255, .75)',
        borderRadius: '5px',
        padding: '10px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={messageStyle}>{message}</h1>
            <button onClick={onRestart}>Restart?</button>
        </div>
    );
}

export default class Board extends Component {
    static propTypes = {
        gridSize: PropTypes.number,
        initialPlayer: PropTypes.string,
        containerStyle: PropTypes.object
    }

    static defaultProps = {
        ...Component.defaultProps,
        gridSize: 3,
        initialPlayer: PLAYER_1
    }

    constructor(props) {
        super(props);

        this.state = getInitialState(props.gridSize, props.initialPlayer);
    }

    _handleSquarePlay(squareNo) {
        this.setState(
            addPlay(this.state, squareNo)
        );
    }

    _handleRestart() {
        // Restart the game by resetting state
        // Instead of using initialPlayer, have the loser go first
        this.setState(
            getInitialState(this.props.gridSize, this.state.currentPlayer)
        );
    }

    _getSquares(winningPath) {
        return this.state.plays.map((player, squareNo) => {
            let squarePercentage = 100 / this.props.gridSize;
            let squareWidth = (squarePercentage - 0.1 * squarePercentage).toFixed(0);
            let containerStyle = {
                boxSizing: 'border-box',
                flex: `0 0 ${squareWidth}%`,
                height: 100,
                margin: '10px 0'
            };
            let isWinner = winningPath && winningPath.includes(squareNo);

            return (
                <Square
                    key={squareNo}
                    player={player}
                    containerStyle={containerStyle}
                    isWinner={isWinner}
                    onPlay={this._handleSquarePlay.bind(this, squareNo)} />
            );
        });
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: this.props.gridSize * 150,
            position: 'relative'
        };
        let previousPlayer = getPreviousPlayer(this.state.currentPlayer);
        let winningPath = getWinningPath(this.state.plays, this.state.currentPlayer);
        let isTie = !winningPath && isFullGame(this.state.plays);
        let gameIsOver = winningPath || isTie;
        let messagOverlay;

        if (gameIsOver) {
            let message = winningPath
                ? `${previousPlayer} wins!`
                : 'Tie game!';

            messagOverlay = (
                <MessageOverlay message={message} onRestart={this._handleRestart.bind(this)} />
            );
        }

        return (
            <div style={containerStyle}>
                {this._getSquares(winningPath)}
                {messagOverlay}
            </div>
        );
    }
}
