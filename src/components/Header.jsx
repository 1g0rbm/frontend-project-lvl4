import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const Header = () => {
  const { logout, isAuth } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const onLogout = () => {
    logout();
    history.push(routes.loginPage());
  };

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPage()}>{t('text.chat')}</Navbar.Brand>
        { !!isAuth && <Button variant="primary" onClick={onLogout}>{t('button.logout')}</Button> }
      </Container>
    </Navbar>
  );
};

Header.displayName = 'Header';

export default Header;
