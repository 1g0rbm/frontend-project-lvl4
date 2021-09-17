import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialState } from '../slices/channelsDataSlice.js';
import { authContext } from '../context/authContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const auth = useContext(authContext);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(async () => {
    const initialData = await request(
      '/api/v1/data',
      'GET',
      null,
      {
        Authorization: `Bearer ${auth.token}`,
      },
    );

    dispatch(setInitialState(initialData));
  }, [request, dispatch, setInitialState, auth]);

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
