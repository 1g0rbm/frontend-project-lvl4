import { useContext } from 'react';
import { socketContext } from '../context/socketContext.jsx';

export default () => {
  const { socket } = useContext(socketContext);

  const acknowledgeWrap = (func) => {
    const withTimeout = (onSuccess, onTimeout, timeout = 2000) => {
      // eslint-disable-next-line functional/no-let
      let called = false;

      const timer = setTimeout(() => {
        if (called) return;
        called = true;
        onTimeout();
      }, timeout);

      return (...args) => {
        if (called) return;
        called = true;
        clearTimeout(timer);
        onSuccess(args);
      };
    };

    return func(withTimeout);
  };

  const emit = acknowledgeWrap((acknowledge) => (channel, message) => (
    new Promise((resolve, reject) => {
      socket.volatile.emit(
        channel,
        message,
        acknowledge(
          ([response]) => {
            if (response.status === 'ok') {
              resolve();
            } else {
              reject();
            }
          },
          () => reject(),
        ),
      );
    })
  ));

  const emitNewMessage = (message) => emit('newMessage', message);
  const emitNewChannel = (message) => emit('newChannel', message);
  const emitRemoveChannel = (message) => emit('removeChannel', message);
  const emitRenameChannel = (message) => emit('renameChannel', message);

  return {
    emit, emitNewMessage, emitNewChannel, emitRemoveChannel, emitRenameChannel,
  };
};
