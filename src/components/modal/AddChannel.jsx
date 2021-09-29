import React, { useRef, useEffect, useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';
import FieldLabel from '../FieldLabel.jsx';
import useAuth from '../../hooks/useAuth.js';

const AddChannel = ({ hide }) => {
  const { t } = useTranslation();
  const { channels } = useSelector(({ channelsData }) => channelsData);
  const inputRef = useRef(null);
  const { emitNewChannel } = useSocket();
  const [formError, setError] = useState(null);
  const { username } = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <h3>{t('text.addChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={({ name }, { setSubmitting }) => {
            setSubmitting(true);
            emitNewChannel({ name, owner: username })
              .then(() => {
                setSubmitting(false);
                hide();
              })
              .catch(() => {
                setSubmitting(false);
                inputRef.current?.focus();
                setError('error.network');
              });
          }}
          validationSchema={() => validators.addChannelForm(
            channels.map((channel) => channel.name),
          )}
        >
          {({
            values, errors, isSubmitting,
          }) => (
            <FormikForm>
              <Form.Group>
                {formError && <Alert variant="danger">{t(formError)}</Alert>}
              </Form.Group>
              <FieldLabel
                type="text"
                id="name"
                name="name"
                value={values.name}
                isInvalid={!!errors?.name}
                error={t(errors.name)}
                label={t('label.channel')}
                testid="add-channel"
                ref={inputRef}
              />
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" onClick={hide} variant="secondary">
                  {t('button.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !values.name || !!errors?.name}
                >
                  {t('button.add')}
                </Button>
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

AddChannel.displayName = 'AddChannel';

export default AddChannel;
