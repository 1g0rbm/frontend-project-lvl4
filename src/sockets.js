import { io } from 'socket.io-client';
import {
  newChannel, removeChannel, renameChannel, setCurrentChannelId,
} from './slices/channelsDataSlice.js';
import { newMessage } from './slices/messagesDataSlice.js';
import { useAuthContext } from './context/authContext.jsx';

export default (store) => {
  const { username } = useAuthContext();
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
  socket.on(
    'renameChannel',
    (message) => {
      store.dispatch(renameChannel({ channel: message }));
    },
  );

  return socket;
};
