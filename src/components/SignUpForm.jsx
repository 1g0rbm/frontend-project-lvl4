import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Formik, Form as FormikForm, Field,
} from 'formik';
import {
  Alert, Button, FloatingLabel, Form,
} from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import validators from '../validators';
import useHttp from '../hooks/useHttp';
import routes from '../routes.js';
import { authContext } from '../context/authContext.jsx';

const SignUpForm = () => {
  const {
    request, clearHttpError, httpError, responseCode,
  } = useHttp();
  const auth = useContext(authContext);
  const history = useHistory();
  const { t } = useTranslation();

  const loginUpHandler = (e) => {
    e.preventDefault();
    history.push(routes.loginPage());
  };

  const signupHandler = async (username, password) => {
    const data = await request(
      routes.signupPath(),
      'POST',
      { username, password },
    );

    if (data === null) {
      return;
    }

    auth.login(data.token, data.username);
    history.replace(routes.mainPage());
  };

  const getErrorLabel = () => {
    if (responseCode === 409) {
      return 'error.usernameAlreadyExisted';
    }

    return 'error.unknown';
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-center mb-4">{t('form.signup')}</h2>
            </div>
            <Formik
              initialValues={{ username: '', password: '', passwordConfirmation: '' }}
              validationSchema={validators.signupForm}
              onSubmit={({ username, password }, { setSubmitting }) => {
                setSubmitting(false);
                clearHttpError();
                signupHandler(username, password);
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
                    <FloatingLabel>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        placeholder={t('label.regUsername')}
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.username && !!errors.username,
                        })}
                      />
                      <label htmlFor="username">{t('label.regUsername')}</label>
                      <div className="invalid-tooltip">
                        {t(errors.username)}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel>
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
                      <label htmlFor="password">{t('label.password')}</label>
                      <div className="invalid-tooltip">
                        {t(errors.password)}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel>
                      <Field
                        id="passwordConfirmation"
                        type="password"
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        placeholder={t('label.passwordConfirm')}
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.passwordConfirmation && !!errors.passwordConfirmation,
                        })}
                      />
                      <label htmlFor="passwordConfirmation">{t('label.passwordConfirm')}</label>
                      <div className="invalid-tooltip">
                        {t(errors.passwordConfirmation)}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="light"
                    className="w-100 mb-3 btn btn-lg btn-outline-primary"
                    disabled={isSubmitting}
                  >
                    {t('button.signup')}
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </div>
          <div className="card-footer">
            <div className="text-center">
              <span>{t('text.alreadyHaveAccount')}</span>
              {' '}
              <a href={routes.loginPage()} onClick={loginUpHandler}>{t('button.login')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
