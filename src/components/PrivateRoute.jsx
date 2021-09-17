import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../context/authContext.jsx';
import routes from '../routes.js';

export default ({
  path, exec, children,
}) => {
  const { isAuth } = useContext(authContext);

  return (
    <Route
      exec={exec}
      path={path}
      render={() => (isAuth ? children : <Redirect to={routes.loginPage()} />)}
    />
  );
};
