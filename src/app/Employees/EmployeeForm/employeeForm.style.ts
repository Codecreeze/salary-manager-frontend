import type { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SUBTLE_BORDER_ALPHA } from '@/utils/constants';

export const employeeFormSx = {
  container: {
    maxWidth: 640,
    mx: 'auto',
    p: 3,
    border: '1px dashed',
    borderColor: (theme: Theme) => alpha(theme.palette.text.primary, SUBTLE_BORDER_ALPHA),
    borderRadius: 1,
  } as SxProps<Theme>,
};
