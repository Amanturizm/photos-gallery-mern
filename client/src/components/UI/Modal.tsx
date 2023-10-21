import {
  Box,
  CardMedia,
  CircularProgress,
  IconButton,
  Modal as ModalWindow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setCurrentPhoto } from '../../features/photos/photosSlice';
import { apiUrl } from '../../constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  borderRadius: 4,
  p: 4,
  pb: 8,
};

const Modal = () => {
  const dispatch = useAppDispatch();
  const { currentPhoto } = useAppSelector((state) => state.photos);

  const handleClose = () => {
    dispatch(setCurrentPhoto(null));
  };

  return (
    <ModalWindow
      open={!!currentPhoto}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {currentPhoto ? (
        <Box sx={style}>
          {currentPhoto.image && (
            <CardMedia
              component="img"
              image={apiUrl + currentPhoto.image}
              alt="photo"
              height="100%"
              width="100%"
              sx={{ objectFit: 'contain' }}
            />
          )}

          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              bottom: '2.5%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: '#ccc',
            }}
            width="80%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {currentPhoto.title}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </ModalWindow>
  );
};

export default Modal;
