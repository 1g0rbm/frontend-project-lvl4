import { useContext } from 'react';
import SocketContext from '../context/socketContext.jsx';

export default () => {
  const { socket } = useContext(SocketContext);

  const emit = (channel, message, resolve = () => {}, reject = () => {}) => {
    socket.emit(
      'newMessage',
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
