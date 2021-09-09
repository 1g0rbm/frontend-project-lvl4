/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: 'hide',
  type: null,
};

const modalData = createSlice({
  name: 'modalData',
  initialState,
  reducers: {
    showAddChannel: (state) => {
      state.state = 'show';
      state.type = 'addChannel';
    },
    hide: () => initialState,
  },
});

export const {
  showAddChannel,
  hide,
} = modalData.actions;

export default modalData.reducer;
