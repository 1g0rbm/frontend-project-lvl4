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
import modalDataReducer from '../slices/modalDataSlice.js';
import initSocket from '../sockets.js';
import Navbar from './Navbar.jsx';
import SignUpForm from './SignUpForm.jsx';

const App = () => {
  const {
    login, logout, token, username,
  } = useAuth();
  const isAuth = !!token;

  const store = configureStore({
    reducer: {
      channelsData: channelsDataReducer,
      messagesData: messagesDataReducer,
      modalData: modalDataReducer,
    },
  });

  return (
    <AuthContext.Provider value={{
      login, logout, token, username, isAuth,
    }}
    >
      <SocketContext.Provider value={{ socket: initSocket(store) }}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <div className="d-flex flex-column h-100">
              <Navbar />
              <Switch>
                <PrivateRoute isAuth={isAuth} path="/" exact>
                  <Chat fluid className="d-flex flex-column vh-100" />
                </PrivateRoute>
                <Route path="/login" exact render={() => <LoginForm />} />
                <Route path="/signup" exact render={() => <SignUpForm />} />
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
