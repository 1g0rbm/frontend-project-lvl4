import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Form as FormikForm, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import AuthContext from '../context/authContext.jsx';
import useSocket from '../hooks/useSocket.js';

export default () => {
  const { currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const { username } = useContext(AuthContext);
  const { emit } = useSocket();
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleSubmit = ({ text }, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    emit(
      'newMessage',
      { author: username, channelId: currentChannelId, text },
      () => {
        setSubmitting(false);
        resetForm();
        inputRef.current?.focus();
      },
      () => {
        setSubmitting(false);
        inputRef.current?.focus();
        setError('Network error');
      },
    );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <FormikForm className="py-1 rounded-2">
            <Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
            </Form.Group>
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={handleChange}
                type="text"
                name="text"
                placeholder="text"
                value={values.text}
                className="p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting || !!error}
              />
              <button
                type="submit"
                className="btn btn-outline-primary btn-group-vertical"
                disabled={isSubmitting || !values.text || !!error}
              >
                Send
              </button>
            </Form.Group>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
