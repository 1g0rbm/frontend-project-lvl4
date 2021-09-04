import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../slices/channelsDataSlice.js';
import authContext from '../context/authContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Sidebar from './Sidebar.jsx';

const Chat = () => {
  const auth = useContext(authContext);
  const dispatch = useDispatch();
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

    dispatch(setInitialState(data));
  }, [request, dispatch, setInitialState, auth]);

  const messages = useSelector(({ messagesData }) => messagesData);

  console.log('CHANNELS: ', messages);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Sidebar />
    </div>
  );
};

export default Chat;
