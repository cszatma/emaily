import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';

import './styles/index.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
registerServiceWorker();
