/* eslint-disable no-param-reassign, */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { setInitialState, removeChannel } from './channelsDataSlice.js';

const messagesData = createSlice({
  name: 'messagesData',
  initialState: { messages: [] },
  reducers: {
    newMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState, (state, { payload: { messages } }) => {
        state.messages = messages;
      })
      .addCase(removeChannel, (state, { payload: { id } }) => {
        state.messages = state.messages.filter(({ channelId }) => channelId !== id);
      });
  },
});

export const {
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
