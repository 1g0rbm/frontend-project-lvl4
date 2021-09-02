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
  },
});

export const {
  setInitialState,
} = channelsData.actions;

export default channelsData.reducer;
