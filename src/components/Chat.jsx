import React, { useContext, useEffect } from 'react';
import authContext from '../context/authContext.jsx';
import useHttp from '../hooks/useHttp.js';

const Chat = () => {
  const auth = useContext(authContext);
  const { request } = useHttp();

  useEffect(async () => {
    const data = await request(
      '/api/v1/data',
      'GET',
      null,
      {
        Authorization: `Bearer ${auth.token}`,
      },
    );

    console.log('DATA: ', data);
  }, [request, auth]);

  return (
    <h2>Chat</h2>
  );
};

export default Chat;
