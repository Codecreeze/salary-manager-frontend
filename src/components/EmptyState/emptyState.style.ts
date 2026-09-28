import type { SxProps, Theme } from '@mui/material';

export const emptyStateSx = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: 8,
  } as SxProps<Theme>,

  image: {
    width: 160,
    height: 'auto',
  } as SxProps<Theme>,
};
