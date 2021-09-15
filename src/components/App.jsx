import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { AuthProvider } from '../context/authContext.jsx';
import SocketContext from '../context/socketContext.jsx';
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
import rollbarConfig from '../rollbar.js';

const App = () => {
  const store = configureStore({
    reducer: {
      channelsData: channelsDataReducer,
      messagesData: messagesDataReducer,
      modalData: modalDataReducer,
    },
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={() => <Error404 />}>
        <AuthProvider>
          <SocketContext.Provider value={{ socket: initSocket(store) }}>
            <ReduxProvider store={store}>
              <BrowserRouter>
                <div className="d-flex flex-column h-100">
                  <Navbar />
                  <Switch>
                    <PrivateRoute path="/" exact>
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
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
