import React, { useContext } from 'react';
import { Field, Form as FormikForm, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { FloatingLabel } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import validators from '../validators.js';
import useHttp from '../hooks/useHttp.js';
import routes from '../routes.js';
import AuthContext from '../context/authContext.jsx';

const LoginForm = () => {
  const {
    request, clearHttpError, httpError, responseCode,
  } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { t } = useTranslation();

  const signUpHandler = (e) => {
    e.preventDefault();
    history.replace('/signup');
  };

  const loginHandler = async (username, password) => {
    const data = await request(
      routes.loginPath(),
      'POST',
      { username, password },
    );

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
                  <Form.Group className="mb-3">
                    <FloatingLabel label={t('label.username')}>
                      <Field
                        type="text"
                        name="username"
                        value={values.username}
                        placeholder={t('label.username')}
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.username && !!errors.username,
                        })}
                      />
                      <div className="invalid-tooltip">
                        {t(errors.username)}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label={t('label.password')}>
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder={t('label.password')}
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.password && !!errors.password,
                        })}
                      />
                      <div className="invalid-tooltip">
                        {t(errors.password)}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
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
              <a href="/signup" onClick={signUpHandler}>{t('button.signup')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
