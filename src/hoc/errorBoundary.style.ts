import type { SxProps, Theme } from '@mui/material';

export const errorBoundarySx = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    py: 6,
    px: 3,
    textAlign: 'center',
  } as SxProps<Theme>,

  message: {
    color: 'text.secondary',
  } as SxProps<Theme>,
};
