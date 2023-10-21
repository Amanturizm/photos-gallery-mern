import { useEffect } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchPhotos } from '../photosThunk';
import Photo from './Photo';
import { setPrevEndpoint } from '../../main/mainSlice';
import Modal from '../../../components/UI/Modal';

const PhotosUser = () => {
  const dispatch = useAppDispatch();
  const { photos, photosLoading } = useAppSelector((state) => state.photos);
  const { user } = useAppSelector((state) => state.users);

  const navigate = useNavigate();
  const { pathname } = useLocation();
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Gallery {photos[0].user.displayName}
          </Typography>
          {user && id === user._id && (
            <Button
              onClick={() => {
                dispatch(setPrevEndpoint(pathname));
                navigate('/new-photo');
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <AddPhotoAlternate />
              New Photo
            </Button>
          )}
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" gap={2}>
        {photos.map((photo) => (
          <Photo photo={photo} visibleDeleteButton key={photo._id} />
        ))}
      </Box>

      <Modal />
    </Box>
  );
};

export default PhotosUser;
