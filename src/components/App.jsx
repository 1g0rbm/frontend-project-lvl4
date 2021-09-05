import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import AuthContext from '../context/authContext.jsx';
import SocketContext from '../context/socketContext.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import channelsDataReducer from '../slices/channelsDataSlice.js';
import messagesDataReducer from '../slices/messagesDataSlice.js';
import initSocket from '../sockets.js';

const App = () => {
  const { login, token, username } = useAuth();
  const isAuth = !!token;

  const store = configureStore({
    reducer: {
      channelsData: channelsDataReducer,
      messagesData: messagesDataReducer,
    },
  });

  return (
    <AuthContext.Provider value={{
      login, token, username, isAuth,
    }}
    >
      <SocketContext.Provider value={{ socket: initSocket(store) }}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <div className="container-lg h-100 p-3">
              <Switch>
                <PrivateRoute isAuth={isAuth} path="/" exact>
                  <Chat />
                </PrivateRoute>
                <Route path="/login" exact render={() => <LoginForm />} />
                <Route path="*" exact render={() => <Error404 />} />
              </Switch>
            </div>
          </BrowserRouter>
        </ReduxProvider>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
