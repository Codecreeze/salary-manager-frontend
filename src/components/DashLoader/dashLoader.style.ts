import type { SxProps, Theme } from '@mui/material';

export const dashLoaderSx = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 320,
  } as SxProps<Theme>,

  bar: {
    width: '40%',
    minWidth: 160,
  } as SxProps<Theme>,
};
