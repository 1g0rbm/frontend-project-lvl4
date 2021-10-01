import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hide, selectModalData } from '../../slices/modalDataSlice.js';
import AddChannel from './AddChannel.jsx';
import DeleteChannelConfirmation from './DeleteChannelConfirmation.jsx';
import RenameChannel from './RenameChannel.jsx';

const ChannelModal = () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(hide());
  const { data, state, type } = useSelector(selectModalData);

  const modals = {
    addChannel: <AddChannel hide={onHide} />,
    deleteChannelConfirmation: <DeleteChannelConfirmation data={data} hide={onHide} />,
    renameChannel: <RenameChannel data={data} hide={onHide} />,
  };

  return (
    <Modal show={state === 'show'} centered onHide={onHide}>
      {modals[type]}
    </Modal>
  );
};

ChannelModal.displayName = 'ChannelModal';

export default ChannelModal;
