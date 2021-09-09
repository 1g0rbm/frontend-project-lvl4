import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import validators from '../../validators.js';

export default ({ hide }) => {
  const { channels } = useSelector(({ channelsData }) => channelsData);

  return (
    <>
      <Modal.Header><h3>Add channel</h3></Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={({ name }, { setSubmitting }) => {
            setSubmitting(false);
            console.log('VALUES: ', name);
          }}
          validationSchema={() => validators.addChannelForm(
            channels.map((channel) => channel.name),
          )}
        >
          {({
            handleChange, values, errors, isSubmitting,
          }) => (
            <FormikForm>
              {console.log('ERRORS: ', errors)}
              <Form.Group className="input-group has-validation mb-3">
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Channel"
                  value={values.name}
                  className={cn({
                    'form-control': true,
                    'is-invalid': !!errors?.name,
                  })}
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" onClick={hide} variant="secondary">Cancel</Button>
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
};
