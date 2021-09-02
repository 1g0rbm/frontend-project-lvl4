import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../slices/channelsDataSlice.js';
import authContext from '../context/authContext.jsx';
import useHttp from '../hooks/useHttp.js';

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

  const channels = useSelector(({ channelsData }) => channelsData);

  console.log('DATA: ', channels);

  return (
    <h2>Chat</h2>
  );
};

export default Chat;
