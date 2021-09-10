/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

const channelsData = createSlice({
  name: 'channelsData',
  initialState: { currentChannelId: null, channels: [] },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
      state.defaultChannelId = payload.currentChannelId;
      state.channels = payload.channels;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    newChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const { currentChannelId, defaultChannelId } = state;
      const { id: removedChannelId } = payload;

      if (currentChannelId === removedChannelId) {
        state.currentChannelId = defaultChannelId;
      }

      state.channels = state.channels.filter((channel) => channel.id !== removedChannelId);
    },
    renameChannel: (state, { payload }) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === payload.channel.id) {
          return payload.channel;
        }

        return channel;
      });
    },
  },
});

export const {
  setInitialState,
  setCurrentChannelId,
  newChannel,
  removeChannel,
  renameChannel,
} = channelsData.actions;

export default channelsData.reducer;
