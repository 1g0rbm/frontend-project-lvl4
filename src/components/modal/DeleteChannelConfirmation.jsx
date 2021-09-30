import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket.js';
import { pushError } from '../../slices/errorsDataSlice.js';

const DeleteChannelConfirmation = ({ hide, data }) => {
  const { t } = useTranslation();
  const { emitRemoveChannel } = useSocket();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
    onSubmit: (value, { setSubmitting }) => {
      setSubmitting(true);
      emitRemoveChannel(data.channel)
        .then(() => {
          setSubmitting(false);
          hide();
        })
        .catch(() => {
          setSubmitting(false);
          useDispatch(pushError({
            type: 'modal',
            text: t('error.network'),
          }));
        });
    },
  });

  return (
    <>
      <Modal.Header>
        <h3>{t('text.deleteChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <p>{t('text.deleteChannelConfirmation', { name: data.channel.name })}</p>
          <Form.Group className="d-flex justify-content-end">
            <Button className="me-2" onClick={hide} variant="secondary">
              {t('button.cancel')}
            </Button>
            <Button
              type="submit"
              variant="danger"
              disabled={formik.isSubmitting}
            >
              {t('button.delete')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

DeleteChannelConfirmation.displayName = 'DeleteChannelConfirmation';

export default DeleteChannelConfirmation;
