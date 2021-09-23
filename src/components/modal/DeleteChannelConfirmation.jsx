import React, { useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm } from 'formik';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket.js';

const DeleteChannelConfirmation = ({ hide, data }) => {
  const { t } = useTranslation();
  const { emitRemoveChannel } = useSocket();
  const dispatch = useDispatch();
  const [formError, setError] = useState(null);
  const onHide = () => dispatch(hide());

  return (
    <>
      <Modal.Header>
        <h3>{t('text.deleteChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{}}
          onSubmit={(value, { setSubmitting }) => {
            setSubmitting(true);
            emitRemoveChannel(data.channel)
              .then(() => {
                setSubmitting(false);
                onHide();
              })
              .catch(() => {
                setSubmitting(false);
                setError('error.network');
              });
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <Form.Group>
                {formError && <Alert variant="danger">{t(formError)}</Alert>}
              </Form.Group>
              <p>{t('text.deleteChannelConfirmation', { name: data.channel.name })}</p>
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" onClick={hide} variant="secondary">
                  {t('button.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="danger"
                  disabled={isSubmitting}
                >
                  {t('button.delete')}
                </Button>
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

DeleteChannelConfirmation.displayName = 'DeleteChannelConfirmation';

export default DeleteChannelConfirmation;
