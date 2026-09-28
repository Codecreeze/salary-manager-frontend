import { useState, type MouseEvent } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useColorMode } from '@/themes/colorModeContext';
import { useSettings } from '@/hooks/useSettings';
import type { NumberFormatLocale } from '@/utils/utilityFunctions';
import adminAvatar from '@/assets/images/avatars/admin-user.png';
import { dashHeaderSx } from './dashHeader.style';

const CURRENT_USER = {
  name: 'Pradeep Kumar',
  email: 'pradeep@example.com',
};

const NUMBER_FORMAT_OPTIONS: Array<{
  locale: NumberFormatLocale;
  label: string;
}> = [
  { locale: 'en-US', label: 'International' },
  { locale: 'en-IN', label: 'Indian' },
];

export interface DashHeaderProps {
  onMenuClick: () => void;
}

/** Top application bar: sidebar collapse toggle, theme toggle, account menu. */
export function DashHeader({ onMenuClick }: DashHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleColorMode } = useColorMode();
  const { numberFormatLocale, setNumberFormatLocale } = useSettings();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={dashHeaderSx.toolbar}>
        {isMobile ? (
          <IconButton edge="start" onClick={onMenuClick} aria-label="Open navigation menu">
            <MenuIcon />
          </IconButton>
        ) : null}
        <Box sx={dashHeaderSx.spacer} />
        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            sx={dashHeaderSx.circleIconButton}
          >
            {mode === 'dark' ? (
              <LightModeIcon sx={dashHeaderSx.lightModeIcon} />
            ) : (
              <DarkModeIcon sx={dashHeaderSx.darkModeIcon} />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Account">
          <IconButton
            onClick={handleAvatarClick}
            aria-label="Open account menu"
            size="small"
            sx={dashHeaderSx.accountIconButton}
          >
            <Avatar src={adminAvatar} alt={CURRENT_USER.name} sx={dashHeaderSx.avatar} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{ paper: { sx: dashHeaderSx.menuPaper } }}
        >
          <Box sx={dashHeaderSx.userInfo}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {CURRENT_USER.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap component="div">
              {CURRENT_USER.email}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="caption" color="text.secondary" sx={dashHeaderSx.sectionLabel}>
            Number format
          </Typography>
          {NUMBER_FORMAT_OPTIONS.map((option) => (
            <MenuItem
              key={option.locale}
              selected={numberFormatLocale === option.locale}
              onClick={() => {
                setNumberFormatLocale(option.locale);
                handleMenuClose();
              }}
            >
              <ListItemIcon sx={dashHeaderSx.menuItemIcon}>
                {numberFormatLocale === option.locale ? <CheckIcon fontSize="small" /> : null}
              </ListItemIcon>
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon sx={dashHeaderSx.menuItemIcon}>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
