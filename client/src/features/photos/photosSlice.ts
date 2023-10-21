import { IPhoto } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPhoto, deletePhoto, fetchPhotos } from './photosThunk';

interface State {
  photos: IPhoto[];
  currentPhoto: IPhoto | null;
  photosLoading: boolean;
  createLoading: boolean;
  deleteLoading: string;
}

const initialState: State = {
  photos: [],
  currentPhoto: null,
  photosLoading: false,
  createLoading: false,
  deleteLoading: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setCurrentPhoto: (state, { payload }) => {
      state.currentPhoto = payload;
    },
  },
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

    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state) => {
      state.createLoading = false;
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
export const { setCurrentPhoto } = photosSlice.actions;
