import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setInitialState } from '../slices/channelsDataSlice.js';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import { pushError } from '../slices/errorsDataSlice.js';

const Chat = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let isActive = true;

    axios.request({
      url: routes.dataPath(),
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        if (isActive) {
          dispatch(setInitialState(data));
        }
      })
      .catch((err) => {
        const { isAxiosError } = err;
        dispatch(pushError({
          type: 'signup',
          text: t(isAxiosError === 409 ? 'error.network' : 'error.unknown'),
        }));
      });

    return () => {
      isActive = false;
    };
  }, [dispatch, t, setInitialState, token]);

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
