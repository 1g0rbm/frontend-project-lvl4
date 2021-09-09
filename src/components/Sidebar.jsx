import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../slices/channelsDataSlice.js';
import { showAddChannel } from '../slices/modalDataSlice.js';

const ChannelItem = ({ changeChannel, channel, isCurrent }) => (
  <button
    type="button"
    className={cn(
      'w-100',
      'rounded-0',
      'text-start',
      'text-truncate',
      'btn',
      {
        'btn-secondary': isCurrent,
      },
    )}
    onClick={() => changeChannel(channel.id)}
  >
    <span className="me-1">#</span>
    { channel.name }
  </button>
);

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

export default () => {
  const { currentChannelId, channels } = useSelector(({ channelsData }) => channelsData);
  const dispatch = useDispatch();

  const changeChannel = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  const showAddChannelForm = () => {
    dispatch(showAddChannel());
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
        <div className="bg-light p-2">Channels</div>
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
    </div>
  );
};
