/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

const messagesData = createSlice({
  name: 'messagesData',
  initialState: { messages: [] },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.messages = payload.messages;
    },
  },
});

export const {
  setInitialState,
} = messagesData.actions;

export default messagesData.reducer;
