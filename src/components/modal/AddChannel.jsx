import React, { useRef, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';
import FieldLabel from '../FieldLabel.jsx';
import useAuth from '../../hooks/useAuth.js';
import { pushError } from '../../slices/errorsDataSlice.js';
import { selectChannels } from '../../slices/channelsDataSlice.js';

const AddChannel = ({ hide }) => {
  const { t } = useTranslation();
  const channels = useSelector(selectChannels);
  const inputRef = useRef(null);
  const { emitNewChannel } = useSocket();
  const { username } = useAuth();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: () => validators.addChannelForm(
      channels.map((channel) => channel.name),
    ),
    onSubmit: ({ name }, { setSubmitting }) => {
      setSubmitting(true);
      emitNewChannel({ name, owner: username })
        .then(() => {
          setSubmitting(false);
          hide();
        })
        .catch(() => {
          setSubmitting(false);
          inputRef.current?.focus();
          dispatch(pushError({
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
        <h3>{t('text.addChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FieldLabel
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={!!formik.errors?.name}
            error={t(formik.errors.name)}
            label={t('label.channel')}
            testid="add-channel"
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
              {t('button.add')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

AddChannel.displayName = 'AddChannel';

export default AddChannel;
