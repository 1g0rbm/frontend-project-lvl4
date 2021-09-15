// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './i18n.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <App />,
  document.getElementById('chat'),
);

console.log('it works!');
