import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContext from '../context/authContext.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {
  const { login, token, username } = useAuth();
  const isAuth = !!token;

  return (
    <AuthContext.Provider value={{
      login, token, username, isAuth,
    }}
    >
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
    </AuthContext.Provider>
  );
};

export default App;
