import React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { remove } from '../slices/errorsDataSlice.js';

const ErrorCard = ({ id, text }) => {
  const dispatch = useDispatch();

  setTimeout(() => dispatch(remove(id)), 5000);

  return (
    <Alert className="alert-dismissible fade show" variant="danger">
      {text}
      <button
        type="button"
        data-bs-dismiss="alert"
        aria-label="Close"
        className="btn-close btn-sm shadow-none"
        onClick={() => dispatch(remove(id))}
      />
    </Alert>
  );
};

ErrorCard.displayName = 'ErrorCard';

export default ErrorCard;
