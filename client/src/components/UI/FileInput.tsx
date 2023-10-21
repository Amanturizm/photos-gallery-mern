import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  image?: File | null;
  label?: string;
  message?: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, image, label, message }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    if (image === null) {
      setFilename('');
    }
  }, [image]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box display="flex" gap={2} sx={{ height: 53 }}>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      {label && (
        <Typography
          variant="h6"
          sx={{
            pl: 1.5,
            border: '2px solid #222',
            borderRadius: 2,
            color: filename ? '#222' : message ? '#ff3333' : '#222',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {filename || message || label}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={activateInput}
        sx={{
          textTransform: 'none',
          width: 100,
          overflow: 'hidden',
        }}
      >
        {label ? 'Browse' : filename || 'Browse'}
      </Button>
    </Box>
  );
};

export default FileInput;
