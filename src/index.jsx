// @ts-check

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(io())
  .then((vdom) => {
    ReactDOM.render(
      vdom,
      document.getElementById('chat'),
    );
  });

console.log('it works!');
