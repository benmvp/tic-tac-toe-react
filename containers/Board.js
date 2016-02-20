import React, {Component, PropTypes} from 'react';
import Square from '../components/Square';
import {getInitialState, addPlay, PLAYER_1} from '../reducers';

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

    _handleSquareClick(squareNo) {
        this.setState(
            addPlay(this.props.gridSize, this.state, squareNo)
        );
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: this.props.gridSize * 150
        };
        let squareComponents = this.state.plays.map((player, squareNo) => {
            let squarePercentage = 100 / this.props.gridSize;
            let squareWidth = (squarePercentage - 0.1 * squarePercentage).toFixed(0);
            let squareContainerStyle = {
                boxSizing: 'border-box',
                flex: `0 0 ${squareWidth}%`,
                height: 100,
                margin: '10px 0'
            };
            let handleSquareClick = () => {
                this._handleSquareClick(squareNo);
            };

            return (
                <Square
                    key={squareNo}
                    player={player}
                    containerStyle={squareContainerStyle}
                    onClick={handleSquareClick} />
            );
        });

        return (
            <div style={containerStyle}>
                {squareComponents}
            </div>
        );
    }
}
