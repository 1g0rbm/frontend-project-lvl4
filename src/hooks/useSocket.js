import { useContext } from 'react';
import SocketContext from '../context/socketContext.jsx';

export default () => {
  const socket = useContext(SocketContext);

  console.log('USE_SOCKET: ', socket);
};
