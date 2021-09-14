import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import MessageForm from './MessageForm.jsx';
import { selectActiveChannelMessages } from '../slices/messagesDataSlice.js';

const Title = ({ channel, text }) => {
  if (!channel) {
    return null;
  }

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">#</span>
          {channel.name}
        </b>
      </p>
      <span className="text-muted">{ text }</span>
    </div>
  );
};

const Message = ({ message }) => (
  <div className="text-break mb-2">
    <span><b>{`${message.author}: `}</b></span>
    <span>{message.text}</span>
  </div>
);

const MessagesBox = ({ messages }) => (
  <div className="chat-messages overflow-auto px-5">
    {messages.map((message) => <Message key={message.id} message={message} />)}
  </div>
);

export default () => {
  const { t } = useTranslation();
  const messages = useSelector(selectActiveChannelMessages);
  const { channels, currentChannelId } = useSelector(({ channelsData }) => channelsData);
  const currentChannel = _.find(channels, { id: currentChannelId });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Title channel={currentChannel} text={t('text.message', { count: messages.length })} />
        <MessagesBox messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};
