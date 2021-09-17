import { useContext } from 'react';
import { socketContext } from '../context/socketContext.jsx';

export default () => {
  const { socket } = useContext(socketContext);

  const emit = (channel, message, resolve = () => {}, reject = () => {}) => {
    socket.emit(
      channel,
      message,
      (response) => {
        if (response.status === 'ok') {
          resolve();
        } else {
          reject();
        }
      },
    );
  };

  return { emit };
};
