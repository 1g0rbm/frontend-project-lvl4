import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialState } from '../slices/channelsDataSlice.js';
import useHttp from '../hooks/useHttp.js';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';
import useAuth from '../hooks/useAuth.js';

const Chat = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(async () => {
    const initialData = await request(
      '/api/v1/data',
      'GET',
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    dispatch(setInitialState(initialData));
  }, [request, dispatch, setInitialState, token]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Sidebar />
        <Messages />
      </div>
    </div>
  );
};

Chat.displayName = 'Chat';

export default Chat;
