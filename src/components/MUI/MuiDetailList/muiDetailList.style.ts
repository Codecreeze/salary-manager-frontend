import type { SxProps, Theme } from '@mui/material';

export const muiDetailListSx = {
  divider: {
    borderBottom: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  row: {
    px: 2,
    py: 1.25,
  } as SxProps<Theme>,

  value: {
    wordBreak: 'break-word',
    textAlign: 'right',
  } as SxProps<Theme>,
};
