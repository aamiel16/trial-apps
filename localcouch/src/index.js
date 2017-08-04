import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App';

import store from './stores/store';
import routes from './routes/';


import './index.css';
import 'semantic-ui/dist/semantic.min.css';

// =========== For semantic ui ==============
window.$ = window.jQuery = require('jquery');
require('semantic-ui/dist/semantic.min.js');
// ==========================================

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
