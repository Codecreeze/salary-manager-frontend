import type { SxProps, Theme } from '@mui/material';

export const loadingScreenSx = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  } as SxProps<Theme>,

  image: {
    width: 80,
    height: 80,
  } as SxProps<Theme>,
};
