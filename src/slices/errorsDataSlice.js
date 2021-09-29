/* eslint-disable no-param-reassign, */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const errorsData = createSlice({
  name: 'errorsData',
  initialState: { errors: [] },
  reducers: {
    pushError: (state, { payload }) => {
      state.errors.push({ id: _.uniqueId(), ...payload });
    },
    remove: (state, { payload }) => {
      state.errors = state.errors.filter(({ id }) => id !== payload);
    },
  },
});

export const {
  pushError,
  remove,
} = errorsData.actions;

export default errorsData.reducer;
