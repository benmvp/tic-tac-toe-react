import React, {Component, PropTypes} from 'react';
import range from 'lodash/range'
import Board from './Board'

export default class App extends Component {
    static propTypes = {
        numBoards: PropTypes.number,
        gridSize: PropTypes.number
    }

    static defaultProps = {
        ...Component.defaultProps,
        numBoards: 1
    }

    render() {
        let boardComponents = range(this.props.numBoards).map(boardNo =>
            <Board
                gridSize={this.props.gridSize}
                key={boardNo}
                containerStyle={{marginBottom: 50}}
            />
        );

        return (
            <div>
                {boardComponents}
            </div>
        );
    }
}
