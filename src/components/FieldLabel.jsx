import React, { forwardRef } from 'react';
import { Field } from 'formik';
import { FloatingLabel, Form } from 'react-bootstrap';
import cn from 'classnames';

const FieldLabel = forwardRef(({
  id,
  name,
  value,
  type,
  label,
  isInvalid,
  error,
  testid = null,
}, ref) => (
  <Form.Group className="mb-3">
    <FloatingLabel>
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
      />
      <label htmlFor={id}>{label}</label>
      <div className="invalid-tooltip">
        {error}
      </div>
    </FloatingLabel>
  </Form.Group>
));

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
