import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import MessageForm from './MessageForm.jsx';

const Title = ({ channel, messagesCount }) => {
  if (!channel) {
    return null;
  }

  const messagesCountString = `${messagesCount} messages`;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">#</span>
          {channel.name}
        </b>
      </p>
      <span className="text-muted">{ messagesCountString }</span>
    </div>
  );
};

const Message = ({ message }) => (
  <div className="text-break mb-2">
    {message.text}
  </div>
);

const MessagesBox = ({ messages }) => (
  <div className="chat-messages overflow-auto px-5">
    {messages.map((message) => <Message message={message} />)}
  </div>
);

export default () => {
  const { messages } = useSelector(({ messagesData }) => messagesData);
  const { channels, currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const currentChannel = _.find(channels, { id: currentChannelId });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Title channel={currentChannel} messagesCount={messages.length} />
        <MessagesBox messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};
