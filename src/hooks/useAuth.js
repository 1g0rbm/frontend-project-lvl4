import { useState, useCallback } from 'react';

const storageKey = 'userData';

export default () => {
  const data = JSON.parse(localStorage.getItem(storageKey));

  const [token, setToken] = useState(data?.token);
  const [username, setUsername] = useState(data?.username);

  const login = useCallback((newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);

    localStorage.setItem(storageKey, JSON.stringify({ token: newToken, username: newUsername }));
  }, []);

  return { login, token, username };
};
