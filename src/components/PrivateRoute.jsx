import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({
  isAuth, path, exec, children,
}) => (
  <Route
    exec={exec}
    path={path}
    render={() => (isAuth ? children : <Redirect to="/login" />)}
  />
);
