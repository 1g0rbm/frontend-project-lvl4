import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorCard from './ErrorCard.jsx';
import { selectErrors, remove } from '../slices/errorsDataSlice.js';

const Errors = () => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    const { length } = errors;
    if (length > 5) {
      const { id } = errors[length - 1];
      dispatch(remove(id));
    }
  }, [dispatch, errors]);

  return (
    <div className="error-container">
      {errors.map(({ id, text }) => <ErrorCard key={id} id={id} text={text} />)}
    </div>
  );
};

Errors.displayName = 'Errors';

export default Errors;
