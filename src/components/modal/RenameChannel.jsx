import React, { useRef, useEffect, useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';

export default ({ hide, data }) => {
  const { channels } = useSelector(({ channelsData }) => channelsData);
  const inputRef = useRef(null);
  const { emit } = useSocket();
  const dispatch = useDispatch();
  const [formError, setError] = useState(null);
  const onHide = () => dispatch(hide());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <h3>Rename channel</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: data.channel.name }}
          onSubmit={({ name }, { setSubmitting }) => {
            setSubmitting(true);
            emit(
              'renameChannel',
              { ...data.channel, name },
              () => {
                setSubmitting(false);
                onHide();
              },
              () => {
                setSubmitting(false);
                inputRef.current?.focus();
                setError('Network error');
              },
            );
          }}
          validationSchema={() => validators.addChannelForm(
            channels.map((channel) => channel.name),
          )}
        >
          {({
            handleChange, values, errors, isSubmitting,
          }) => (
            <FormikForm>
              <Form.Group>
                {formError && <Alert variant="danger">{formError}</Alert>}
              </Form.Group>
              <Form.Group className="input-group has-validation mb-3">
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Channel"
                  ref={inputRef}
                  value={values.name}
                  className={cn({
                    'form-control': true,
                    'is-invalid': !!errors?.name,
                  })}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={cn({ 'ps-3': true, 'd-block': !!errors?.name })}
                >
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" onClick={hide} variant="secondary">Cancel</Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !values.name || !!errors?.name}
                >
                  Rename
                </Button>
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};
