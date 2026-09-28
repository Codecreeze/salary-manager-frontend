import type { SxProps, Theme } from '@mui/material';
import { getCardShadow } from '@/themes/theme';

export const dashboardLayoutSx = {
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    bgcolor: 'background.default',
  } as SxProps<Theme>,

  nav: (desktopWidth: number) =>
    ({
      width: { md: desktopWidth },
      flexShrink: { md: 0 },
      transition: 'width 0.2s ease',
    }) as SxProps<Theme>,

  mobileDrawer: (drawerWidth: number) =>
    ({
      display: { xs: 'block', md: 'none' },
      '& .MuiDrawer-paper': { width: drawerWidth },
    }) as SxProps<Theme>,

  desktopDrawer: (desktopWidth: number) =>
    ({
      display: { xs: 'none', md: 'block' },
      '& .MuiDrawer-paper': {
        width: desktopWidth,
        boxSizing: 'border-box',
        // Both axes must be 'visible' together — CSS silently promotes
        // a lone 'visible' axis to 'auto' when the other isn't, which
        // turned the collapse button's edge-straddling overflow into
        // an unwanted scrollbar. The nav list has too few items to
        // need its own scroll; revisit with an inner scroll container
        // in DashDrawer if that changes.
        overflow: 'visible',
        transition: 'width 0.2s ease',
        position: 'fixed',
        top: 0,
        height: '100vh',
      },
    }) as SxProps<Theme>,

  collapseButton: {
    position: 'absolute',
    top: 20,
    left: '100%',
    transform: 'translate(-50%, 0)',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: (theme: Theme) => getCardShadow(theme.palette.mode),
    zIndex: 1,
    '&:hover': { bgcolor: 'background.paper' },
  } as SxProps<Theme>,

  content: {
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'auto',
  } as SxProps<Theme>,

  container: {
    py: { xs: 2, sm: 4 },
    flexGrow: 1,
  } as SxProps<Theme>,
};
