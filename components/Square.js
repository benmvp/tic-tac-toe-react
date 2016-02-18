import React, {Component, PropTypes} from 'react';

export default class Square extends Component {
    static propTypes = {
        containerStyle: PropTypes.object
    }

    render() {
        let containerStyle = {
            border: '3px solid black',
            boxSize: 'border-box',
            cursor: 'pointer',
            height: '100%',
            width: '100%',
            ...this.props.containerStyle
        };
        return (
            <div style={containerStyle} />
        );
    }
}
