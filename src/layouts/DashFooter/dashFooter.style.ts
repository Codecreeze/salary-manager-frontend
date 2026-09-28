import type { SxProps, Theme } from '@mui/material';

export const dashFooterSx = {
  root: {
    px: { xs: 2, sm: 4 },
    py: 2,
    borderTop: '1px dashed',
    borderColor: 'divider',
  } as SxProps<Theme>,
};
