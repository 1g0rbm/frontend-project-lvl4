import React, { useRef, useEffect, useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';
import FieldLabel from '../FieldLabel.jsx';

const RenameChannel = ({ hide, data }) => {
  const { t } = useTranslation();
  const { channels } = useSelector(({ channelsData }) => channelsData);
  const inputRef = useRef(null);
  const { emit } = useSocket();
  const dispatch = useDispatch();
  const [formError, setError] = useState(null);
  const onHide = () => dispatch(hide());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <h3>{t('text.renameChannel')}</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: data.channel.name }}
          onSubmit={({ name }, { setSubmitting }) => {
            setSubmitting(true);
            emit(
              'renameChannel',
              { ...data.channel, name },
              () => {
                setSubmitting(false);
                onHide();
              },
              () => {
                setSubmitting(false);
                inputRef.current?.focus();
                setError('error.network');
              },
            );
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
                testid="rename-channel"
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
                  {t('button.rename')}
                </Button>
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

RenameChannel.displayName = 'RenameChannel';

export default RenameChannel;
