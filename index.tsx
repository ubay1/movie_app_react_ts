import React from 'react';
import ReactDOM from 'react-dom';
import './src/css/tailwind.css';
import App from './src/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/store/rootReducers';
import { store } from "./src/store/index";

// const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, 
document.querySelector('#root'));