import React, {Component, PropTypes} from 'react';
import range from 'lodash/range'
import Square from '../components/Square'

export default class Board extends Component {
    static propTypes = {
        gridSize: PropTypes.number,
        containerStyle: PropTypes.object
    }

    static defaultProps = {
        ...Component.defaultProps,
        gridSize: 3
    }

    render() {
        let containerStyle = {
            ...this.props.containerStyle
        };
        let rowComponents = range(this.props.gridSize).map(rowNo => {
            let rowStyle = {
                display: 'flex',
                height: 100,
                justifyContent: 'space-between',
                marginBottom: 20
            };
            return (
                <div key={rowNo} style={rowStyle}>
                    {range(this.props.gridSize).map(colNo => (
                        <Square
                            key={`${rowNo}-${colNo}`}
                            containerStyle={{margin: '0 10px'}}
                        />
                    ))}
                </div>
            );
        });
        return (
            <div style={containerStyle}>
                {rowComponents}
            </div>
        );
    }
}
