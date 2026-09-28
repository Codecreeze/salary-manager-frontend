import type { SxProps, Theme } from '@mui/material';

export const breadCrumbsSx = {
  root: {
    mb: 3,
  } as SxProps<Theme>,

  separatorDot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: 'text.disabled',
  } as SxProps<Theme>,

  subtitle: {
    mt: 0.5,
  } as SxProps<Theme>,
};
