import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Navbar from './Navbar.jsx';
import SignUpForm from './SignUpForm.jsx';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar />
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

export default App;
