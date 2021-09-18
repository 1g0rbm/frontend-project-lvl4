import React, { useContext } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import validators from '../validators.js';
import useHttp from '../hooks/useHttp.js';
import routes from '../routes.js';
import { authContext } from '../context/authContext.jsx';
import FieldLabel from './FieldLabel.jsx';

const LoginForm = () => {
  const {
    request, clearHttpError, httpError, responseCode,
  } = useHttp();
  const auth = useContext(authContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { t } = useTranslation();

  const signUpHandler = (e) => {
    e.preventDefault();
    history.push(routes.signupPage());
  };

  const loginHandler = async (username, password) => {
    const data = await request(
      routes.loginPath(),
      'POST',
      { username, password },
    );

    if (data === null) {
      return;
    }

    auth.login(data.token, data.username);
    history.replace(from);
  };

  const getErrorLabel = () => {
    if (responseCode === 401) {
      return 'error.unauthorized';
    }

    return 'error.unknown';
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-center mb-4">{t('form.login')}</h2>
            </div>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validators.loginForm}
              onSubmit={({ username, password }, bag) => {
                clearHttpError();
                bag.setSubmitting(false);
                loginHandler(username, password);
              }}
            >
              {({
                isSubmitting, values, touched, errors,
              }) => (
                <FormikForm>
                  <Form.Group>
                    {httpError && <Alert variant="danger">{t(getErrorLabel())}</Alert>}
                  </Form.Group>
                  <FieldLabel
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                    error={t(errors.username)}
                    label={t('label.username')}
                  />
                  <FieldLabel
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    isInvalid={touched.password && !!errors.password}
                    error={t(errors.password)}
                    label={t('label.password')}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 mb-3 btn btn-lg btn-outline-primary"
                  >
                    {t('button.login')}
                  </button>
                </FormikForm>
              )}
            </Formik>
          </div>
          <div className="card-footer">
            <div className="text-center">
              <span>{t('text.dontHaveAccount')}</span>
              {' '}
              <a href={routes.signupPage()} onClick={signUpHandler}>{t('button.toSignup')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
