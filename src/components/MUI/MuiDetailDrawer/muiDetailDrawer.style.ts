import type { SxProps, Theme } from '@mui/material';

export const muiDetailDrawerSx = {
  paper: (width: number) =>
    ({
      width: { xs: '100%', sm: width },
    }) as SxProps<Theme>,

  root: {
    height: '100%',
  } as SxProps<Theme>,

  header: {
    py: 1.5,
    px: 2.5,
  } as SxProps<Theme>,

  titleBox: {
    minWidth: 0,
  } as SxProps<Theme>,

  content: {
    p: 2.5,
    overflowY: 'auto',
    flexGrow: 1,
  } as SxProps<Theme>,
};
