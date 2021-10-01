/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: 'hide',
  type: null,
  data: null,
};

const modalData = createSlice({
  name: 'modalData',
  initialState,
  reducers: {
    showModal: (state, { payload: { type, channel } }) => {
      state.state = 'show';
      state.type = type;
      state.data = { channel };
    },
    hide: () => initialState,
  },
});

export const {
  showModal,
  showAddChannel,
  showDeleteChannelConfirmation,
  showRenameChanel,
  hide,
} = modalData.actions;

export default modalData.reducer;
