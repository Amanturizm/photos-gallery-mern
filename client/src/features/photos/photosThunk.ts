import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPhoto, IPhotoRequest } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchPhotos = createAsyncThunk<IPhoto[], string | null>(
  'photos/fetchAll',
  async (userId) => {
    const { data } = await axiosApi.get(userId ? `photos?user=${userId}` : 'photos');
    return data;
  },
);

export const createPhoto = createAsyncThunk<void, IPhotoRequest>(
  'photos/createOne',
  async (photo) => {
    const formData = new FormData();
    const keys = Object.keys(photo) as (keyof IPhotoRequest)[];

    keys.forEach((key) => {
      const value = photo[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('photos', formData);
  },
);

export const deletePhoto = createAsyncThunk<void, string>('photos/deleteOne', async (id) => {
  await axiosApi.delete('photos/' + id);
});
