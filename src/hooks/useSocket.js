import { useContext } from 'react';
import { socketContext } from '../context/socketContext.jsx';

const TIMEOUT = 2000;

export default () => {
  const { socket } = useContext(socketContext);

  const emit = (channel, message) => (
    new Promise((resolve, reject) => {
      const timerId = setTimeout(reject, TIMEOUT);
      socket.volatile.emit(
        channel,
        message,
        (response) => {
          clearInterval(timerId);
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        },
      );
    })
  );

  const emitNewMessage = (message) => emit('newMessage', message);
  const emitNewChannel = (message) => emit('newChannel', message);
  const emitRemoveChannel = (message) => emit('removeChannel', message);
  const emitRenameChannel = (message) => emit('renameChannel', message);

  return {
    emit, emitNewMessage, emitNewChannel, emitRemoveChannel, emitRenameChannel,
  };
};
