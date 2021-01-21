import ReactDOM             from 'react-dom';
import React                from 'react';
import App                  from './App';
import {BrowserRouter}      from 'react-router-dom';
import reportWebVitals      from './reportWebVitals';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer         from './store/reducers/order';
import authReducer          from './store/reducers/auth';
import {
  createStore, 
  applyMiddleware, 
  compose, 
  combineReducers
}                           from 'redux';
import {Provider}           from 'react-redux';
import thunk                from 'redux-thunk'

import './index.css';

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>    
  </BrowserRouter>
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));

const rootReducer = combineReducers({
  bb:    burgerBuilderReducer,
  order: orderReducer,
  auth:  authReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
