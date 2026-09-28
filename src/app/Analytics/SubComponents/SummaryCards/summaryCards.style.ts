import type { SxProps, Theme } from '@mui/material';

export const summaryCardsSx = {
  grid: {
    mb: 3,
    justifyContent: 'center',
  } as SxProps<Theme>,

  card: {
    height: '100%',
  } as SxProps<Theme>,

  value: {
    mt: 1.5,
    wordBreak: 'break-word',
    lineHeight: 1.2,
  } as SxProps<Theme>,

  subvalue: {
    mt: 0.5,
  } as SxProps<Theme>,
};
