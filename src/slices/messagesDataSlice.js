/* eslint-disable no-param-reassign, */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsDataSlice.js';

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
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload: { id } }) => {
        state.messages = state.messages.filter(({ channelId }) => channelId !== id);
      });
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
