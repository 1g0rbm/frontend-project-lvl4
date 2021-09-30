import React, { useRef, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';
import FieldLabel from '../FieldLabel.jsx';
import { pushError } from '../../slices/errorsDataSlice.js';

const RenameChannel = ({ hide, data }) => {
  const { t } = useTranslation();
  const { channels } = useSelector(({ channelsData }) => channelsData);
  const inputRef = useRef(null);
  const { emitRenameChannel } = useSocket();
  const formik = useFormik({
    initialValues: { name: data.channel.name },
    validationSchema: () => validators.addChannelForm(
      channels.map((channel) => channel.name),
    ),
    onSubmit: ({ name }, { setSubmitting }) => {
      setSubmitting(true);
      emitRenameChannel({ ...data.channel, name })
        .then(() => {
          setSubmitting(false);
          hide();
        })
        .catch(() => {
          setSubmitting(false);
          inputRef.current?.focus();
          useDispatch(pushError({
            type: 'modal',
            text: t('error.network'),
          }));
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <h3>{t('text.renameChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FieldLabel
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={!formik.isValid}
            error={t(formik.errors.name)}
            label={t('label.channel')}
            testid="rename-channel"
            ref={inputRef}
            onChange={formik.handleChange}
          />
          <Form.Group className="d-flex justify-content-end">
            <Button className="me-2" onClick={hide} variant="secondary">
              {t('button.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
            >
              {t('button.rename')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

RenameChannel.displayName = 'RenameChannel';

export default RenameChannel;
