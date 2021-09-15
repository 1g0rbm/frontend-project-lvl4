import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../context/authContext.jsx';

export default ({
  path, exec, children,
}) => {
  const { isAuth } = useAuthContext();

  return (
    <Route
      exec={exec}
      path={path}
      render={() => (isAuth ? children : <Redirect to="/login" />)}
    />
  );
};
