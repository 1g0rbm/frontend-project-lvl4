import React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { remove } from '../slices/errorsDataSlice.js';

const ErrorCard = ({ id, text }) => {
  const dispatch = useDispatch();

  setTimeout(() => dispatch(remove(id)), 5000);

  return (
    <Alert variant="danger" onClose={() => dispatch(remove(id))} dismissible>{text}</Alert>
  );
};

ErrorCard.displayName = 'ErrorCard';

export default ErrorCard;
