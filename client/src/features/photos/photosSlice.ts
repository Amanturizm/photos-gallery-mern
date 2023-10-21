import { IPhoto } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deletePhoto, fetchPhotos } from './photosThunk';

interface State {
  photos: IPhoto[];
  photosLoading: boolean;
  deleteLoading: string;
}

const initialState: State = {
  photos: [],
  photosLoading: false,
  deleteLoading: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.photosLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload }) => {
      state.photosLoading = false;
      state.photos = payload;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.photosLoading = false;
    });

    builder.addCase(deletePhoto.pending, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(deletePhoto.fulfilled, (state, { meta }) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleteLoading = '';
    });
  },
});

export const photosReducer = photosSlice.reducer;
