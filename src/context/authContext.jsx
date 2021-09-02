import { noop } from 'jquery';
import { createContext } from 'react';

export default createContext({
  token: null,
  username: null,
  login: noop,
  isAuth: false,
});
