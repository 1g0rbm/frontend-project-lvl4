import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/authContext.jsx';
import routes from '../routes.js';

export default () => {
  const { logout, isAuth } = useAuthContext();
  const history = useHistory();
  const { t } = useTranslation();

  const onLogout = () => {
    logout();
    history.push(routes.loginPage());
  };

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">{t('text.chat')}</Navbar.Brand>
        { !!isAuth && <Button variant="primary" onClick={onLogout}>{t('button.logout')}</Button> }
      </Container>
    </Navbar>
  );
};
