import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setInitialState } from '../slices/channelsDataSlice.js';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const Chat = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.request({
      url: routes.dataPath(),
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setInitialState(data));
  }, [dispatch, setInitialState, token]);

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
