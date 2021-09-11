import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/authContext.jsx';

export default () => {
  const { logout, isAuth } = useContext(AuthContext);
  const history = useHistory();

  const onLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        { !!isAuth && <Button variant="primary" onClick={onLogout}>Logout</Button> }
      </Container>
    </Navbar>
  );
};
