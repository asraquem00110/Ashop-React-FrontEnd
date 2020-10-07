import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {roundToDecimal,formatBdayDate} from './helper/helper'
import toastr from 'toastr'


const initalState = {

}
const middleware = [thunk]
const store = createStore(
  allReducers,
  initalState, composeWithDevTools(applyMiddleware(...middleware)
))


window.$helper = {roundToDecimal,formatBdayDate}
window.$toastr = toastr

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
