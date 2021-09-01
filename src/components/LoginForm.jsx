import React from 'react';
import { Field, Form as FormikForm, Formik } from 'formik';
import cn from 'classnames';
import { FloatingLabel } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import validators from '../validators.js';
import useHttp from '../hooks/useHttp.js';
import routes from '../routes.js';

const LoginForm = () => {
  const { request, clearHttpError, httpError } = useHttp();

  const loginhandler = async (username, password) => {
    const data = await request(
      routes.loginPath(),
      'POST',
      { username, password },
    );

    console.log('RESPONSE: ', data);
  };

  return (
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
              onSubmit={({ username, password }, bag) => {
                clearHttpError();
                bag.setSubmitting(false);
                loginhandler(username, password);
              }}
            >
              {({
                isSubmitting, values, touched, errors,
              }) => (
                <FormikForm>
                  <Form.Group>
                    {httpError && <Alert variant="danger">{httpError}</Alert>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="username">
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
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="password">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="password"
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.password && !!errors.password,
                        })}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    Submit
                  </button>
                </FormikForm>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
