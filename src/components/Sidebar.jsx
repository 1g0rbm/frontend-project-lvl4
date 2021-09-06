import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../slices/channelsDataSlice.js';

const ChannelItem = ({ changeChannel, channel, isCurrent }) => (
  <button
    type="button"
    className={cn(
      'w-100',
      'rounded-0',
      'text-start',
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

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 border-bottom">
        <span>Channels</span>
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
