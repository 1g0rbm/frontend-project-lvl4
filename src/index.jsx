// @ts-check

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const vdom = await init(io());
  ReactDOM.render(
    vdom,
    document.getElementById('chat'),
  );

  console.log('it works!');
};

run();
