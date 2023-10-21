import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { apiUrl } from '../../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { deletePhoto, fetchPhotos } from '../photosThunk';
import { IPhoto } from '../../../types';
import { setCurrentPhoto } from '../photosSlice';
import { Delete } from '@mui/icons-material';

interface Props {
  photo: IPhoto;
  visibleUser?: boolean;
  visibleDeleteButton?: boolean;
}

const Photo: React.FC<Props> = ({ photo, visibleUser, visibleDeleteButton }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);

  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const cardClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch(setCurrentPhoto(photo));
  };

  const userClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    navigate(`/photos/user/${photo.user._id}`);
    await dispatch(fetchPhotos(photo.user._id));
  };

  const deleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this?')) {
      await dispatch(deletePhoto(photo._id));
      await dispatch(fetchPhotos(id ? photo.user._id : null));
    }
  };

  return (
    <Card sx={{ width: 250, position: 'relative' }} onClick={cardClick}>
      <CardActionArea>
        {photo.image && (
          <CardMedia component="img" height="180" image={apiUrl + photo.image} alt="photo" />
        )}
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            bgcolor: '#000',
            opacity: 0.8,
            width: '100%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {visibleUser && (
              <Box display="flex">
                <Typography
                  variant="body1"
                  sx={{
                    cursor: 'pointer',
                    ':hover': { textDecoration: 'underline' },
                  }}
                  onClick={userClick}
                >
                  {photo.user.displayName}
                </Typography>
                <div></div>
              </Box>
            )}

            <Typography
              variant="h5"
              width={200}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {photo.title}
            </Typography>
          </Box>

          <ArrowForwardIosIcon sx={{ mr: 1.5 }} />
        </CardContent>

        {user &&
          (user.role === 'admin' || (visibleDeleteButton && user._id === photo.user._id)) && (
            <Button
              onClick={deleteClick}
              color="error"
              sx={{ position: 'absolute', top: 6, left: 10, minWidth: 30 }}
            >
              <Delete />
            </Button>
          )}
      </CardActionArea>
    </Card>
  );
};

export default Photo;
