import React, { useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket.js';

export default ({ hide, data }) => {
  const { emit } = useSocket();
  const dispatch = useDispatch();
  const [formError, setError] = useState(null);
  const onHide = () => dispatch(hide());

  return (
    <>
      <Modal.Header>
        <h3>Delete</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{}}
          onSubmit={(value, { setSubmitting }) => {
            setSubmitting(true);
            emit(
              'removeChannel',
              data.channel,
              () => {
                setSubmitting(false);
                onHide();
              },
              () => {
                setSubmitting(false);
                setError('Network error');
              },
            );
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <Form.Group>
                {formError && <Alert variant="danger">{formError}</Alert>}
              </Form.Group>
              <p>{`Are you sure you want to delete channel "${data.channel.name}"?`}</p>
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" onClick={hide} variant="secondary">Cancel</Button>
                <Button
                  type="submit"
                  variant="danger"
                  disabled={isSubmitting}
                >
                  Delete
                </Button>
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};
