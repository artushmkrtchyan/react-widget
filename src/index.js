import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

window.renderWidget = function (id, props = {}) {
    ReactDOM.render(
        <React.StrictMode>
            <App renderId={id} {...props} />
        </React.StrictMode>,
        document.getElementById(id),
    );
};

// renderWidget('widget-content', {
//     url: 'https://jsonplaceholder.typicode.com/users/1',
// });
