import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/authContext.jsx';

export default () => {
  const { logout, isAuth } = useContext(AuthContext);
  const history = useHistory();
  const { t } = useTranslation();

  const onLogout = () => {
    logout();
    history.push('/login');
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
