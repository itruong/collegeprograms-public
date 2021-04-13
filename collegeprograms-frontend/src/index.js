import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import './index.css';
import Main from 'Main';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>, 
  document.getElementById('root')
);
