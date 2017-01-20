import 'babel-register';
import {Api} from './api';

import loadingReducer from './reducers/loading-reducer';
import worldReducer from './reducers/world-reducer';
import {doUpdateCurrentState} from './actions';

import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import {Provider} from 'react-redux';
import {combineReducers} from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const api = new Api();

const thunkExtra = {
  api: api,
};

const reducer = combineReducers({
  loading: loadingReducer,
  world: worldReducer,
});

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(thunkMiddleware.withExtraArgument(thunkExtra)),
    applyMiddleware(promiseMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('content')
);

store.dispatch(doUpdateCurrentState());
