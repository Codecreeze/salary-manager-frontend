import type { SxProps, Theme } from '@mui/material';
import { THEME_TOGGLE_MOON_COLOR, THEME_TOGGLE_SUN_COLOR } from '@/utils/constants';

export const dashHeaderSx = {
  toolbar: {
    gap: 2,
  } as SxProps<Theme>,

  spacer: {
    flexGrow: 1,
  } as SxProps<Theme>,

  circleIconButton: {
    border: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  accountIconButton: {
    border: '1px solid',
    borderColor: 'divider',
    p: 0.5,
  } as SxProps<Theme>,

  avatar: {
    width: 32,
    height: 32,
  } as SxProps<Theme>,

  lightModeIcon: {
    color: THEME_TOGGLE_SUN_COLOR,
  } as SxProps<Theme>,

  darkModeIcon: {
    color: THEME_TOGGLE_MOON_COLOR,
  } as SxProps<Theme>,

  menuPaper: {
    minWidth: 260,
    borderRadius: '10px',
  } as SxProps<Theme>,

  userInfo: {
    px: 2,
    py: 1.5,
  } as SxProps<Theme>,

  sectionLabel: {
    px: 2,
    pt: 1,
    display: 'block',
  } as SxProps<Theme>,

  menuItemIcon: {
    minWidth: 32,
  } as SxProps<Theme>,
};
