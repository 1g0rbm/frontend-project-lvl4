import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';

export default ({ hide }) => (
  <>
    <Modal.Header>Add channel</Modal.Header>
    <Modal.Body>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={({ name }, { setSubmitting }) => {
          setSubmitting(false);
          console.log('VALUES: ', name);
        }}
      >
        {({ handleChange, values, isSubmitting }) => (
          <FormikForm>
            <Form.Group className="input-group has-validation mb-3">
              <Form.Control
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Channel"
                value={values.name}
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="input-group">
              <Button onClick={hide} variant="secondary">Cancel</Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !values.name}
              >
                Add
              </Button>
            </Form.Group>
          </FormikForm>
        )}
      </Formik>
    </Modal.Body>
  </>
);
