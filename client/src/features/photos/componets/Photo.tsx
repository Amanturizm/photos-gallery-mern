import React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hook';
import { fetchPhotos } from '../photosThunk';
import { IPhoto } from '../../../types';

interface Props {
  photo: IPhoto;
  visibleUser?: boolean;
}

const Photo: React.FC<Props> = ({ photo, visibleUser }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    navigate(`/photos/user/${photo.user._id}`);
    await dispatch(fetchPhotos(photo.user._id));
  };

  return (
    <Card sx={{ width: 250, position: 'relative' }}>
      <CardActionArea>
        {photo.image && (
          <CardMedia component="img" height="140" image={apiUrl + photo.image} alt="photo" />
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
                  sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
                  onClick={userClick}
                >
                  {photo.user.displayName}
                </Typography>
                <div></div>
              </Box>
            )}

            <Typography variant="h5" component="div">
              {photo.title}
            </Typography>
          </Box>

          <ArrowForwardIosIcon sx={{ mr: 1.5 }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Photo;
