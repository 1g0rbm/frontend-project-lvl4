import React from 'react';
import { Field, Form as FormikForm, Formik } from 'formik';
import Form from 'react-bootstrap/Form';

export default () => {
  const handleSubmit = ({ text }, bag) => {
    bag.setSubmitting(false);
    console.log('TEXT: ', text);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <FormikForm className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
              <Field
                type="text"
                name="text"
                placeholder="text"
                value={values.text}
                className="border-0 p-0 ps-2 form-control"
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-outline-light btn-group-vertical"
                  disabled={isSubmitting || !values.text}
                >
                  Send
                </button>
              </div>
            </Form.Group>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
