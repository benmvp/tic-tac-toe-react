import React, {Component, PropTypes} from 'react';
import Square from '../components/Square'

export default class Board extends Component {
    static propTypes = {
        gridSize: PropTypes.number,
        initialPlayer: PropTypes.string,
        containerStyle: PropTypes.object
    }

    static defaultProps = {
        ...Component.defaultProps,
        gridSize: 3,
        initialPlayer: 'X'
    }

    constructor(props) {
        super(props);

        this.state = {
            plays: Array(props.gridSize ** 2).fill(''),
            currentPlayer: props.initialPlayer
        };
    }

    _handleSquareClick(squareNo) {
        console.log('square clicked', squareNo);
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: this.props.gridSize * 150
        };
        let squareComponents = this.state.plays.map((v, squareNo) => {
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
