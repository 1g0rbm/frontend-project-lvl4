/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

const channelsData = createSlice({
  name: 'channelsData',
  initialState: { currentChannelId: null, channels: [] },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
      state.channels = payload.channels;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    newChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
  },
});

export const {
  setInitialState,
  setCurrentChannelId,
  newChannel,
} = channelsData.actions;

export default channelsData.reducer;
