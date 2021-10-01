import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';
import { pushError } from '../slices/errorsDataSlice.js';
import { selectCurrentChannelId } from '../slices/channelsDataSlice.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { username } = useAuth();
  const { emitNewMessage } = useSocket();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: ({ text }, { resetForm }) => (
      emitNewMessage(
        { author: username, channelId: currentChannelId, text },
      )
        .then(() => {
          resetForm();
          inputRef.current?.focus();
        })
        .catch(() => {
          inputRef.current?.focus();
          dispatch(pushError(t('error.network')));
        })
    ),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            onChange={formik.handleChange}
            type="text"
            name="text"
            placeholder={t('label.message')}
            value={formik.values.text}
            className="p-0 ps-2 form-control"
            ref={inputRef}
            disabled={formik.isSubmitting || !formik.isValid}
            data-testid="new-message"
          />
          <Button
            type="submit"
            variant="light"
            className="btn btn-outline-primary btn-group-vertical"
            disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
          >
            {t('button.send')}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

MessageForm.displayName = 'MessageForm';

export default MessageForm;
