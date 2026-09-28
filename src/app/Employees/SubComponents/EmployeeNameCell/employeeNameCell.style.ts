import type { CSSProperties } from 'react';
import type { SxProps, Theme } from '@mui/material';

export const employeeNameCellSx = {
  container: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  } as SxProps<Theme>,
};

export const employeeNameCellUnderlineStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -2,
  height: 2,
  backgroundColor: 'currentColor',
  transformOrigin: 'left',
};
