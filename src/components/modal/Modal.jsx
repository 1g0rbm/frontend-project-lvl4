import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hide } from '../../slices/modalDataSlice.js';
import AddChannel from './AddChannel.jsx';

export default ({ type }) => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(hide());

  const modals = {
    addChannel: <AddChannel hide={onHide} />,
  };

  return (
    <Modal show centered onHide={onHide}>
      {modals[type]}
    </Modal>
  );
};
