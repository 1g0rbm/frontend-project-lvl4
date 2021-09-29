import React, { forwardRef } from 'react';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';
import cn from 'classnames';

const FieldLabel = forwardRef(({
  id,
  name,
  value,
  type,
  label,
  isInvalid,
  error,
  autoFocus = false,
  testid = null,
}, ref) => (
  <Form.Group className="mb-3">
    <div className="form-floating mb-3">
      <Field
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={label}
        className={cn({
          'form-control': true,
          'is-invalid': isInvalid,
        })}
        data-testid={testid}
        innerRef={ref}
        autoFocus={autoFocus}
      />
      <label htmlFor={id}>{label}</label>
      <div className="invalid-tooltip">
        {error}
      </div>
    </div>
  </Form.Group>
));

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
