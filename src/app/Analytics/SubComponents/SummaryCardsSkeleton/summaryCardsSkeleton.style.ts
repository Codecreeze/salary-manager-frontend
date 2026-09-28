import type { SxProps, Theme } from '@mui/material';

export const summaryCardsSkeletonSx = {
  grid: {
    mb: 3,
    justifyContent: 'center',
  } as SxProps<Theme>,

  card: {
    height: '100%',
  } as SxProps<Theme>,

  valueLine: {
    mt: 1.5,
  } as SxProps<Theme>,

  subvalueLine: {
    mt: 0.5,
  } as SxProps<Theme>,
};
