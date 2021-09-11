import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Formik, Form as FormikForm, Field,
} from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import cn from 'classnames';
import validators from '../validators';

export default () => {
  const history = useHistory();

  const loginUpHandler = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-center mb-4">Signup form</h2>
            </div>
            <Formik
              initialValues={{ username: '', password: '', passwordConfirmation: '' }}
              validationSchema={validators.signupForm}
              onSubmit={(values) => {
                console.log('SUBMITED_VALUES: ', values);
              }}
            >
              {({ values, touched, errors }) => (
                <FormikForm>
                  {console.log('VALUES: ', values)}
                  {console.log('ERRORS: ', errors)}
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
                      <div className="invalid-tooltip">
                        {errors?.username}
                      </div>
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
                      <div className="invalid-tooltip">
                        {errors?.password}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="passwordConfirmation">
                      <Field
                        id="passwordConfirmation"
                        type="password"
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        placeholder="confirm password"
                        className={cn({
                          'form-control': true,
                          'is-invalid': touched.passwordConfirmation && !!errors.passwordConfirmation,
                        })}
                      />
                      <div className="invalid-tooltip">
                        {errors?.passwordConfirmation}
                      </div>
                    </FloatingLabel>
                  </Form.Group>
                  <Button variant="light" className="w-100 mb-3 btn btn-lg btn-outline-primary">Signup</Button>
                </FormikForm>
              )}
            </Formik>
          </div>
          <div className="card-footer">
            <div className="text-center">
              <span>Already have an account?</span>
              {' '}
              <a href="/login" onClick={loginUpHandler}>Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
