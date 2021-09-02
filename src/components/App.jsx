import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import AuthContext from '../context/authContext.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import channelsDataReducer from '../slices/channelsDataSlice.js';

const App = () => {
  const { login, token, username } = useAuth();
  const isAuth = !!token;

  const store = configureStore({
    reducer: {
      channelsData: channelsDataReducer,
    },
  });

  return (
    <AuthContext.Provider value={{
      login, token, username, isAuth,
    }}
    >
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
    </AuthContext.Provider>
  );
};

export default App;
