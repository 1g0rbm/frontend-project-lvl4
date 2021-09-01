import { useState, useCallback, useEffect } from 'react';

const storageKey = 'userData';

export default () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = useCallback((newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);

    localStorage.setItem(storageKey, JSON.stringify({ token, username }));
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data && data.token && data.username) {
      login(data.token, data.username);
    }
  }, login);

  return { login, token, username };
};
