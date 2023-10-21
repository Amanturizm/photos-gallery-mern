import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchPhotos } from './photosThunk';
import { Box } from '@mui/material';
import Photo from './components/Photo';

const Photos = () => {
  const dispatch = useAppDispatch();
  const { photos } = useAppSelector((state) => state.photos);

  useEffect(() => {
    if (!photos.length) {
      dispatch(fetchPhotos(null));
    }
  }, [photos, dispatch]);

  return (
    <Box display="flex" gap={2} flexWrap="wrap" sx={{ p: 3 }}>
      {photos.map((photo) => (
        <Photo photo={photo} visibleUser key={photo._id} />
      ))}
    </Box>
  );
};

export default Photos;
