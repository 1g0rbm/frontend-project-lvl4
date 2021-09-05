import { io } from 'socket.io-client';
import { newMessage } from './slices/messagesDataSlice.js';

export default (store) => {
  const socket = io();

  socket.on(
    'newMessage',
    (message) => {
      store.dispatch(newMessage(message));
    },
  );

  return socket;
};
