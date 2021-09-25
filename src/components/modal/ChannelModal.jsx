import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hide } from '../../slices/modalDataSlice.js';
import AddChannel from './AddChannel.jsx';
import DeleteChannelConfirmation from './DeleteChannelConfirmation.jsx';
import RenameChannel from './RenameChannel.jsx';

const ChannelModal = ({ isOpen, type, data }) => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(hide());

  const modals = {
    addChannel: <AddChannel hide={onHide} />,
    deleteChannelConfirmation: <DeleteChannelConfirmation data={data} hide={onHide} />,
    renameChannel: <RenameChannel data={data} hide={onHide} />,
  };

  return (
    <Modal show={isOpen} centered onHide={onHide}>
      {modals[type]}
    </Modal>
  );
};

ChannelModal.displayName = 'ChannelModal';

export default ChannelModal;