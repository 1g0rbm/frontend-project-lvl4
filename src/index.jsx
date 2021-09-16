// @ts-check

import ReactDOM from 'react-dom';
import init from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init()
  .then((vdom) => {
    ReactDOM.render(
      vdom,
      document.getElementById('chat'),
    );
  });

console.log('it works!');
