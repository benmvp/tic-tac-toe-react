import React, {Component, PropTypes} from 'react';
import {PLAYER_1} from '../reducers';

export default class Square extends Component {
    static propTypes = {
        player: PropTypes.string,
        containerStyle: PropTypes.object,
        onClick: PropTypes.func.isRequired
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle,
            border: '3px solid black',
            cursor: this.props.player ? 'default' : 'pointer',
            textAlign: 'center',
            fontSize: 80,
            color: this.props.player === PLAYER_1 ? 'red': 'blue'
        };

        return (
            <div style={containerStyle} onClick={this.props.onClick}>
                {this.props.player}
            </div>
        );
    }
}
