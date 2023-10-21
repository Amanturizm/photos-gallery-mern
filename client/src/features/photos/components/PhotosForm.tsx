import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IPhotoRequest } from '../../../types';
import FileInput from '../../../components/UI/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { createPhoto, fetchPhotos } from '../photosThunk';
import { useNavigate } from 'react-router-dom';

const initialState: IPhotoRequest = {
  title: '',
  image: null,
};

const PhotosForm = () => {
  const dispatch = useAppDispatch();
  const { prevEndpoint } = useAppSelector((state) => state.main);
  const { createLoading } = useAppSelector((state) => state.photos);

  const navigate = useNavigate();
  const [state, setState] = useState<IPhotoRequest>(initialState);

  const [message, setMessage] = useState<string>('');

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.image) {
      setMessage('This field is required!');
      return;
    } else {
      await dispatch(createPhoto(state));

      const regex = /\/([^/]+)$/;
      const match = prevEndpoint.match(regex);

      await dispatch(fetchPhotos(match ? match[0] : null));
      navigate(prevEndpoint);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={sendData}
      width="60%"
      margin="auto"
      display="flex"
      flexDirection="column"
      gap={2}
      paddingY={3}
    >
      <Typography variant="h4">New Photo</Typography>

      <TextField required label="Title" name="title" value={state.title} onChange={changeValue} />

      <FileInput
        name="image"
        onChange={changeFileValue}
        image={state.image}
        label="Image"
        message={message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          ':disabled': {
            pointerEvents: 'auto',
            cursor: 'not-allowed',
          },
        }}
        disabled={createLoading}
      >
        {createLoading ? (
          <CircularProgress size={25} />
        ) : (
          <span style={{ display: 'flex', gap: 10 }}>
            Create photo <SendIcon />
          </span>
        )}
      </Button>
    </Box>
  );
};

export default PhotosForm;
