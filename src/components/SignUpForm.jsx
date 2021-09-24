import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import validators from '../validators';
import useHttp from '../hooks/useHttp';
import routes from '../routes.js';
import FieldLabel from './FieldLabel.jsx';
import useSetFocus from '../hooks/useSetFocus';
import useAuth from '../hooks/useAuth';

const SignUpForm = () => {
  const {
    request, clearHttpError, httpError, responseCode,
  } = useHttp();
  const { login } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();
  const focusRef = useRef({});
  const { setFocusOn, handleFormikForm } = useSetFocus(focusRef);

  useEffect(() => setFocusOn('username'));

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

    login(data.token, data.username);
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
                  <FieldLabel
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                    error={t(errors.username)}
                    label={t('label.regUsername')}
                    ref={(el) => {
                      focusRef.current.username = el;
                    }}
                  />
                  <FieldLabel
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    isInvalid={touched.password && !!errors.password}
                    error={t(errors.password)}
                    label={t('label.password')}
                    ref={(el) => {
                      focusRef.current.password = el;
                    }}
                  />
                  <FieldLabel
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={values.passwordConfirmation}
                    isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                    error={t(errors.passwordConfirmation)}
                    label={t('label.passwordConfirm')}
                    ref={(el) => {
                      focusRef.current.passwordConfirmation = el;
                    }}
                  />
                  <Button
                    type="submit"
                    variant="light"
                    className="w-100 mb-3 btn btn-lg btn-outline-primary"
                    disabled={isSubmitting}
                    onClick={() => handleFormikForm(values, errors, isSubmitting)}
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
