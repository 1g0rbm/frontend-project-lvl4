import React, { useContext, useEffect, useRef } from 'react';
import { Field, Form as FormikForm, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import AuthContext from '../context/authContext.jsx';
import useSocket from '../hooks/useSocket.js';

export default () => {
  const { currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const { username } = useContext(AuthContext);
  const { emit } = useSocket();
  const inputRef = useRef(null);

  const handleSubmit = ({ text }, bag) => {
    bag.setSubmitting(true);
    emit(
      'newMessage',
      { author: username, channelId: currentChannelId, text },
      () => {
        bag.setSubmitting(false);
        bag.resetForm();
        inputRef.current?.focus();
      },
      () => {
        bag.setSubmitting(false);
        bag.resetForm();
        inputRef.current?.focus();
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
          <FormikForm className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={handleChange}
                type="text"
                name="text"
                placeholder="text"
                value={values.text}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-group-vertical"
                  disabled={isSubmitting || !values.text}
                >
                  Send
                </button>
              </div>
            </Form.Group>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
