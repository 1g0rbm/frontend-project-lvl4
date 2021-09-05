/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

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

export default messagesData.reducer;
