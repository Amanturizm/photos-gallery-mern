import { useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useParams } from 'react-router-dom';
import { fetchPhotos } from '../photosThunk';
import Photo from './Photo';

const PhotosUser = () => {
  const dispatch = useAppDispatch();
  const { photos, photosLoading } = useAppSelector((state) => state.photos);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (!photos.length && id) {
      dispatch(fetchPhotos(id));
    }
  }, [photos, dispatch, id]);

  return photosLoading ? (
    <LinearProgress />
  ) : (
    <Box sx={{ p: 3 }}>
      {photos.length && (
        <Typography variant="h4" sx={{ mb: 2 }}>
          {photos[0].user.displayName}
        </Typography>
      )}

      <Box display="flex" gap={2}>
        {photos.map((photo) => (
          <Photo photo={photo} key={photo._id} />
        ))}
      </Box>
    </Box>
  );
};

export default PhotosUser;
