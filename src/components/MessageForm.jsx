import React, { useContext } from 'react';
import { Field, Form as FormikForm, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import SocketContext from '../context/socketContext.jsx';
import AuthContext from '../context/authContext.jsx';

export default () => {
  const { socket } = useContext(SocketContext);
  const { currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const { username } = useContext(AuthContext);

  const handleSubmit = ({ text }, bag) => {
    bag.setSubmitting(false);
    socket.emit(
      'newMessage',
      { author: username, channelId: currentChannelId, text },
      (response) => {
        console.log('RESPONSE: ', response);
      },
    );
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <FormikForm className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
              <Field
                type="text"
                name="text"
                placeholder="text"
                value={values.text}
                className="border-0 p-0 ps-2 form-control"
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-outline-light btn-group-vertical"
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
