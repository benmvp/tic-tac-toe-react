import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';

render(
    <App numBoards={3} />,
    document.getElementById('app')
)
