import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as FormikForm, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const { username } = useAuth();
  const { emitNewMessage } = useSocket();
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleSubmit = ({ text }, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    emitNewMessage(
      { author: username, channelId: currentChannelId, text },
    )
      .then(() => {
        setSubmitting(false);
        resetForm();
        inputRef.current?.focus();
      })
      .catch(() => {
        setSubmitting(false);
        inputRef.current?.focus();
        setError('error.network');
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <FormikForm className="py-1 rounded-2">
            <Form.Group>
              {error && <Alert variant="danger">{t(error)}</Alert>}
            </Form.Group>
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={handleChange}
                type="text"
                name="text"
                placeholder={t('label.message')}
                value={values.text}
                className="p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting || !!error}
                data-testid="new-message"
              />
              <Button
                type="submit"
                variant="light"
                className="btn btn-outline-primary btn-group-vertical"
                disabled={isSubmitting || !values.text || !!error}
              >
                {t('button.send')}
              </Button>
            </Form.Group>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

MessageForm.displayName = 'MessageForm';

export default MessageForm;
