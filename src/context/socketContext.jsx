import React, { createContext } from 'react';

const socketContext = createContext({ socket: null });

const SocketContextProvider = ({ children, socket }) => (
  <socketContext.Provider value={{ socket }}>
    {children}
  </socketContext.Provider>
);

export { SocketContextProvider, socketContext };
