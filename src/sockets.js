import { io } from 'socket.io-client';
import { newChannel, removeChannel, setCurrentChannelId } from './slices/channelsDataSlice.js';
import { newMessage } from './slices/messagesDataSlice.js';
import useAuth from './hooks/useAuth.js';

export default (store) => {
  const { username } = useAuth();
  const socket = io();

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

  return socket;
};
