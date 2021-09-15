import React, { useRef, useEffect, useState } from 'react';
import {
  Alert, Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import validators from '../../validators.js';
import useSocket from '../../hooks/useSocket.js';

export default ({ hide, data }) => {
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
            handleChange, values, errors, isSubmitting,
          }) => (
            <FormikForm>
              <Form.Group>
                {formError && <Alert variant="danger">{t(formError)}</Alert>}
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel label={t('label.channel')}>
                  <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder={t('label.channel')}
                    ref={inputRef}
                    value={values.name}
                    className={cn({
                      'form-control': true,
                      'is-invalid': !!errors?.name,
                    })}
                    data-testid="rename-channel"
                  />
                  <div className="invalid-tooltip">
                    {t(errors.name)}
                  </div>
                </FloatingLabel>
              </Form.Group>
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
