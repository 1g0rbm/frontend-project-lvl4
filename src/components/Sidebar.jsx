import React from 'react';
import { useSelector } from 'react-redux';

const ChannelItem = ({ channel }) => (
  <button type="button" className="w-100 rounded-0 text-start btn">
    <span className="me-1">#</span>
    { channel.name }
  </button>
);

const Channels = ({ children }) => (
  <ul className="nav flex-column nav-pills nav-fill px-2">
    {children.map((channel) => (
      <li key={channel.id} className="nav-item w-100"><ChannelItem channel={channel} /></li>
    ))}
  </ul>
);

export default () => {
  const channels = useSelector(({ channelsData }) => channelsData.channels);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 border-bottom">
        <span>Channels</span>
      </div>
      {channels && <Channels>{channels}</Channels>}
    </div>
  );
};
