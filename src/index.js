import React           from 'react';
import ReactDOM        from 'react-dom';
import App             from './App';
import {BrowserRouter}    from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import reducer from './store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';

const store = createStore(reducer);

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>    
  </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
