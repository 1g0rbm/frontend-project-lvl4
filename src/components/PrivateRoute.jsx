import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const PrivateRoute = ({
  path, exec, children,
}) => {
  const { isAuth } = useAuth();

  return (
    <Route
      exec={exec}
      path={path}
      render={() => (isAuth ? children : <Redirect to={routes.loginPage()} />)}
    />
  );
};

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
