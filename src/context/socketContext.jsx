import React, { createContext, useContext, useEffect } from 'react';
import {
  newChannel, removeChannel, renameChannel, setCurrentChannelId,
} from '../slices/channelsDataSlice.js';
import { newMessage } from '../slices/messagesDataSlice.js';
import { authContext } from './authContext.jsx';

const socketContext = createContext({ socket: null });

const SocketContextProvider = ({ children, store, socket }) => {
  const { username } = useContext(authContext);

  useEffect(() => {
    socket.on(
      'newMessage',
      (message) => {
        store.dispatch(newMessage(message));
      },
    );
    socket.on(
      'newChannel',
      (channel) => {
        store.dispatch(newChannel(channel));
        if (channel?.owner === username) {
          store.dispatch(setCurrentChannelId(channel.id));
        }
      },
    );
    socket.on(
      'removeChannel',
      (message) => {
        store.dispatch(removeChannel(message));
      },
    );
    socket.on(
      'renameChannel',
      (message) => {
        store.dispatch(renameChannel({ channel: message }));
      },
    );
  }, [socket, username]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { SocketContextProvider, socketContext };
