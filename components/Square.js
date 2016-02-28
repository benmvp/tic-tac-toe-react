import React, {Component, PropTypes} from 'react';
import {PLAYER_1} from '../action-reducers';

export default class Square extends Component {
    static propTypes = {
        player: PropTypes.string,
        containerStyle: PropTypes.object,
        onPlay: PropTypes.func.isRequired,
        isWinner: PropTypes.bool
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle,
            background: this.props.isWinner ? 'peachpuff': 'transparent',
            border: '3px solid black',
            color: this.props.player === PLAYER_1 ? 'red': 'blue',
            cursor: this.props.player ? 'not-allowed' : 'pointer',
            fontSize: 80,
            textAlign: 'center'
        };
        let containerProperties = {};

        if (!this.props.player) {
            containerProperties.onClick = this.props.onPlay;
        }

        return (
            <div style={containerStyle} {...containerProperties}>
                {this.props.player}
            </div>
        );
    }
}
