import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Navbar from './Navbar.jsx';
import SignUpForm from './SignUpForm.jsx';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Switch>
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/signup" render={() => <SignUpForm />} />
        <PrivateRoute path="/" exact>
          <Chat fluid className="d-flex flex-column vh-100" />
        </PrivateRoute>
        <Route path="*" exact render={() => <Error404 />} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
