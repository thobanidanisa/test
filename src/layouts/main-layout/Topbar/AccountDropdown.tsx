import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    handleClose();               // close the menu
    navigate('/authentication/userprofile'); // redirect to user profile
  };

  const handleHomeClick = () =>{
    handleClose();               // close the menu
    navigate('/authentication/recent-activities'); // redirect to user profile
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Button
        color="inherit"
        id="account-dropdown-button"
        aria-controls={open ? 'account-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          gap: 1.875,
          px: { xs: 0, sm: 0.625 },
          py: 0.625,
        }}
      >
        <Tooltip title="Andani Baloyi" placement="top" arrow enterDelay={0} leaveDelay={0}>
          <Avatar alt="Andani Baloyi"  sx={{ width: 45, height: 45 }} />
        </Tooltip>
        <Typography
          variant="body1"
          component="p"
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        >
          Andani Baloyi
        </Typography>
        <IconifyIcon
          icon="ion:caret-down-outline"
          width={24}
          height={24}
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        />
      </Button>
      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleHomeClick}
        MenuListProps={{
          'aria-labelledby': 'account-dropdown-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="ion:home-sharp" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Home
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleProfileClick}>
      <ListItemIcon>
        <IconifyIcon icon="mdi:account-outline" />
      </ListItemIcon>
      <ListItemText
        sx={(theme) => ({
          '& .MuiListItemText-primary': {
            fontSize: theme.typography.body1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            fontWeight: theme.typography.body1.fontWeight,
          },
        })}
      >
        Profile
      </ListItemText>
    </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          disableRipple
          disableTouchRipple
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ri:logout-circle-line" color="error.main" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
