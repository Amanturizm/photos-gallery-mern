import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Logout, AddPhotoAlternate, Collections } from '@mui/icons-material';
import { IUserForUsing } from '../types';
import { apiUrl } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import { setPrevEndpoint } from '../features/main/mainSlice';
import { fetchPhotos } from '../features/photos/photosThunk';

interface Props {
  user: IUserForUsing;
  onLogout: React.MouseEventHandler;
}

const ToolbarMenu: React.FC<Props> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let avatar = '';
  if (user.avatar) {
    avatar = user.avatar.includes('http') ? user.avatar.toString() : apiUrl + user.avatar;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={avatar} sx={{ width: 32, height: 32 }}>
              {user.username[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            color: '#fff',
            bgcolor: '#222',
            '& .MuiMenuItem-root': {
              ':hover': {
                bgcolor: 'rgba(227,227,227,.08)',
                transition: 'all .1s linear',
              },
            },
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#222',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ width: 200 }}>
          <Avatar src={avatar} />
          <Typography variant="body1" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {user.displayName || user.username}
          </Typography>
        </MenuItem>
        <Divider color="#ccc" />
        <MenuItem
          onClick={() => {
            dispatch(setPrevEndpoint(pathname));
            navigate('/new-photo');
          }}
        >
          <ListItemIcon>
            <AddPhotoAlternate />
          </ListItemIcon>
          New photo
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/photos/user/${user._id}`);
            dispatch(fetchPhotos(user._id));
          }}
        >
          <ListItemIcon>
            <Collections />
          </ListItemIcon>
          My gallery
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#fff', marginLeft: 0.5 }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ToolbarMenu;
