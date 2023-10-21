import { createSlice } from '@reduxjs/toolkit';

interface State {
  prevEndpoint: string;
}

const initialState: State = {
  prevEndpoint: '/',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPrevEndpoint: (state, { payload }) => {
      state.prevEndpoint = payload;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const { setPrevEndpoint } = mainSlice.actions;
