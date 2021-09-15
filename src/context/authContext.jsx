import { noop } from 'jquery';
import React, { createContext, useState, useCallback } from 'react';

const storageKey = 'userData';

const authContext = createContext({
  token: null,
  username: null,
  login: noop,
  isAuth: false,
});

const useAuth = () => {
  const data = JSON.parse(localStorage.getItem(storageKey));

  const [token, setToken] = useState(data?.token);
  const [username, setUsername] = useState(data?.username);

  const login = useCallback((newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem(storageKey, JSON.stringify({ token: newToken, username: newUsername }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem(storageKey);
  }, []);

  return {
    login, logout, token, username, isAuth: !!token,
  };
};

const AuthContextProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
