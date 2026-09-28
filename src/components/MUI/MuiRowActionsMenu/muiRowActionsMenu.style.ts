import type { SxProps, Theme } from '@mui/material';
import { MENU_MAX_HEIGHT } from '@/themes/menuProps';

export const muiRowActionsMenuSx = {
  paper: {
    maxHeight: MENU_MAX_HEIGHT,
    borderRadius: '10px',
  } as SxProps<Theme>,

  itemIcon: {
    minWidth: 32,
  } as SxProps<Theme>,

  itemColor: (color: string) => ({ color: `${color}.main` }) as SxProps<Theme>,
};
