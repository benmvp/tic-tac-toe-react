import React, {Component, PropTypes} from 'react';

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
            cursor: this.props.player ? 'default' : 'pointer'
        };

        return (
            <div style={containerStyle} onClick={this.props.onClick}>
                {this.props.player}
            </div>
        );
    }
}
