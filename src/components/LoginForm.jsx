import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import cn from 'classnames';
import validators from '../validators.js';

const LoginForm = () => (
  <div className="row justify-content-center align-content-center h-100">
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="card-title">
            <h2 className="text-center mb-4">Login form</h2>
          </div>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validators.loginForm}
          >
            {({
              isSubmitting, values, touched, errors,
            }) => (
              <Form>
                <div className="form-floating mb-3 form-group">
                  <Field
                    type="text"
                    name="username"
                    value={values.username}
                    placeholder="username"
                    className={cn({
                      'form-control': true,
                      'is-invalid': touched.username && !!errors.username,
                    })}
                  />
                  <div className="invalid-feedback">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="form-floating mb-3 form-group">
                  <Field
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="password"
                    className={cn({
                      'form-control': true,
                      'is-invalid': touched.password && !!errors.password,
                    })}
                  />
                  <div className="invalid-feedback">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

    </div>
  </div>
);

export default LoginForm;
