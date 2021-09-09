import { io } from 'socket.io-client';
import { newChannel, setCurrentChannelId } from './slices/channelsDataSlice.js';
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

  return socket;
};
