import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId, selectChannels, selectCurrentChannelId } from '../slices/channelsDataSlice.js';
import { showModal, selectType } from '../slices/modalDataSlice.js';
import ChannelModal from './modal/ChannelModal.jsx';

const ChannelItem = ({ changeChannel, channel, isCurrent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!channel.removable) {
    return (
      <Button
        variant={isCurrent ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start text-truncate text-truncate btn shadow-none"
        onClick={() => changeChannel(channel.id)}
      >
        <span className="me-1">#</span>
        { channel.name }
      </Button>
    );
  }

  const onShowDeleteChannelConfirmation = (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'deleteChannelConfirmation', channel }));
  };
  const onShowRenameChannel = (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'renameChannel', channel }));
  };

  return (
    <Dropdown role="group" className="d-flex" as={ButtonGroup}>
      <Button
        variant={isCurrent ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start text-truncate text-truncate btn shadow-none"
        onClick={() => changeChannel(channel.id)}
      >
        <span className="me-1">#</span>
        { channel.name }
      </Button>
      <Dropdown.Toggle className="shadow-none" split variant={isCurrent ? 'secondary' : 'light'} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={onShowDeleteChannelConfirmation}>{t('button.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={onShowRenameChannel}>{t('button.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = ({ changeChannel, currentChannelId, children }) => (
  <ul className="nav flex-column nav-pills nav-fill px-2">
    {children.map((channel) => (
      <li key={channel.id} className="nav-item w-100">
        <ChannelItem
          changeChannel={changeChannel}
          isCurrent={currentChannelId === channel.id}
          channel={channel}
        />
      </li>
    ))}
  </ul>
);

const Sidebar = () => {
  const channels = useSelector(selectChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const changeChannel = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  const showAddChannelForm = () => {
    dispatch(showModal({ type: 'addChannel' }));
  };

  const type = useSelector(selectType);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
        <div className="bg-light p-2">{t('text.channels')}</div>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={showAddChannelForm}
        >
          +
        </button>
      </div>
      {channels && (
      <Channels
        changeChannel={changeChannel}
        currentChannelId={currentChannelId}
      >
        {channels}
      </Channels>
      )}
      {type && <ChannelModal />}
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
