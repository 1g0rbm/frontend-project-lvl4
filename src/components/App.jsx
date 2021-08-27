import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Error404 from './Error404.jsx';
import LoginForm from './LoginForm.jsx';

const App = () => (
  <div className="container-lg h-100 p-3">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Chat />} />
        <Route path="/login" exact render={() => <LoginForm />} />
        <Route path="*" exact render={() => <Error404 />} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
