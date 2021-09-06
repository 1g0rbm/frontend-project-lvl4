/* eslint-disable no-param-reassign, */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const messagesData = createSlice({
  name: 'messagesData',
  initialState: { messages: [] },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.messages = payload.messages;
    },
    newMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const {
  setInitialState,
  newMessage,
} = messagesData.actions;

export const selectActiveChannelMessages = createSelector(
  [
    (state) => state.messagesData.messages,
    (state) => state.channelsData.currentChannelId,
  ],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

export default messagesData.reducer;
