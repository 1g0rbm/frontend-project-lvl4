import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import routes from '../routes.js';
import { authContext } from '../context/authContext.jsx';
import FieldLabel from './FieldLabel.jsx';
import useSetFocus from '../hooks/useSetFocus.js';
import useAuth from '../hooks/useAuth.js';
import { pushError } from '../slices/errorsDataSlice.js';

const LoginForm = () => {
  const { login } = useAuth(authContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { t } = useTranslation();
  const focusRef = useRef({});
  const { setFocusOn, handleFormikForm } = useSetFocus(focusRef);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .required('error.requred'),
      password: yup.string()
        .required('error.requred'),
    }),
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      setSubmitting(false);
      try {
        const { data } = await axios.request({
          url: routes.loginPath(),
          method: 'POST',
          data: { username, password },
        });

        login(data.token, data.username);
        history.replace(from);
      } catch (e) {
        const { response: { status } } = e;
        setFocusOn('username');
        dispatch(pushError({
          type: 'login',
          text: t(status === 401 ? 'error.unauthorized' : 'error.unknown'),
        }));
      }
    },
  });

  useEffect(() => setFocusOn('username'), []);

  const signUpHandler = (e) => {
    e.preventDefault();
    history.push(routes.signupPage());
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-center mb-4">{t('form.login')}</h2>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <FieldLabel
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                isInvalid={formik.touched.username && !!formik.errors.username}
                error={t(formik.errors.username)}
                label={t('label.username')}
                ref={(el) => {
                  focusRef.current.username = el;
                }}
                onChange={formik.handleChange}
              />
              <FieldLabel
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                isInvalid={formik.touched.password && !!formik.errors.password}
                error={t(formik.errors.password)}
                label={t('label.password')}
                ref={(el) => {
                  focusRef.current.password = el;
                }}
                onChange={formik.handleChange}
              />
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-100 mb-3 btn btn-lg btn-outline-primary"
                onClick={() => handleFormikForm(formik.values, formik.errors, formik.isSubmitting)}
              >
                {t('button.login')}
              </button>
            </Form>
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
