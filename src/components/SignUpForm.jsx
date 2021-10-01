import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';
import routes from '../routes.js';
import FieldLabel from './FieldLabel.jsx';
import useSetFocus from '../hooks/useSetFocus.js';
import useAuth from '../hooks/useAuth.js';
import { pushError } from '../slices/errorsDataSlice.js';

const SignUpForm = () => {
  const { login } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();
  const focusRef = useRef({});
  const { setFocusOn, handleFormikForm } = useSetFocus(focusRef);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .min(3, 'error.lengthMinUsername')
        .max(20, 'error.lengthMaxUsername')
        .required('error.requred'),
      password: yup.string()
        .min(6, 'error.lengthMinPassword')
        .required('error.requred'),
      passwordConfirmation: yup.string()
        .min(6, 'error.lengthMinPassword')
        .required('error.requred')
        .oneOf([yup.ref('password'), null], 'error.mustMatchPassword'),
    }),
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      setSubmitting(false);
      try {
        const { data } = await axios.request({
          url: routes.signupPath(),
          method: 'POST',
          data: { username, password },
        });

        login(data.token, data.username);
        history.replace(routes.mainPage());
      } catch (e) {
        const { response: { status } } = e;
        setFocusOn('username');
        dispatch(pushError({
          type: 'signup',
          text: t(status === 409 ? 'error.usernameAlreadyExisted' : 'error.unknown'),
        }));
      }
    },
  });

  useEffect(() => setFocusOn('username'), []);

  const loginUpHandler = (e) => {
    e.preventDefault();
    history.push(routes.loginPage());
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-center mb-4">{t('form.signup')}</h2>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <FieldLabel
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                isInvalid={formik.touched.username && !!formik.errors.username}
                error={t(formik.errors.username)}
                label={t('label.regUsername')}
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
              <FieldLabel
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                isInvalid={
                  formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation
                }
                error={t(formik.errors.passwordConfirmation)}
                label={t('label.passwordConfirm')}
                ref={(el) => {
                  focusRef.current.passwordConfirmation = el;
                }}
                onChange={formik.handleChange}
              />
              <Button
                type="submit"
                variant="light"
                className="w-100 mb-3 btn btn-lg btn-outline-primary"
                disabled={formik.isSubmitting}
                onClick={() => handleFormikForm(formik.values, formik.errors, formik.isSubmitting)}
              >
                {t('button.signup')}
              </Button>
            </Form>
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
