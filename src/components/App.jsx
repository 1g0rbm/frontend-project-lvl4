import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Header from './Header.jsx';
import SignUpForm from './SignUpForm.jsx';
import routes from '../routes.js';

const App = () => {
  const { state } = useSelector(({ modalData }) => modalData);

  return (
    <BrowserRouter>
      <div aria-hidden={state === 'show'} className="d-flex flex-column h-100">
        <Header />
        <Switch>
          <Route path={routes.loginPage()} render={() => <LoginForm />} />
          <Route path={routes.signupPage()} render={() => <SignUpForm />} />
          <PrivateRoute path={routes.mainPage()} exact>
            <Chat fluid className="d-flex flex-column vh-100" />
          </PrivateRoute>
          <Route path="*" exact render={() => <Error404 />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.displayName = 'App';

export default App;
