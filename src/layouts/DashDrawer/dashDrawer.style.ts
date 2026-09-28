import type { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const dashDrawerSx = {
  root: {
    height: '100%',
  } as SxProps<Theme>,

  brandBar: (theme: Theme, collapsed: boolean) =>
    ({
      ...theme.mixins.toolbar,
      px: collapsed ? 2 : 3,
      justifyContent: collapsed ? 'center' : 'flex-start',
    }) as SxProps<Theme>,

  logo: {
    width: 36,
    height: 36,
  } as SxProps<Theme>,

  brandTitle: {
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as SxProps<Theme>,

  navList: {
    px: 1.5,
    py: 2,
    flexGrow: 1,
  } as SxProps<Theme>,

  navItem: (collapsed: boolean) =>
    ({
      borderRadius: '10px',
      mb: 0.5,
      justifyContent: collapsed ? 'center' : 'flex-start',
      px: collapsed ? 1.5 : 2,
      '&.Mui-selected': {
        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
        color: 'primary.main',
        '& .MuiListItemIcon-root': { color: 'primary.main' },
      },
      '&.Mui-selected:hover': {
        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
      },
    }) as SxProps<Theme>,

  navItemIcon: (collapsed: boolean, isActive: boolean) =>
    ({
      minWidth: collapsed ? 0 : 40,
      color: isActive ? 'inherit' : 'text.secondary',
      justifyContent: 'center',
    }) as SxProps<Theme>,
};
