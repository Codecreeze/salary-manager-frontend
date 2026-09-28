import { alpha, createTheme, type PaletteMode, type Theme } from '@mui/material/styles';

// A clean, professional slate/teal palette instead of MUI's default
// blue/purple — reads as an internal HR tool, not a marketing site.
// Both light and dark variants are tuned for a premium "dashboard" look:
// soft near-white / dark-navy backgrounds, elevated rounded paper, no flat
// 1px-border-only cards.

const SHARED_TYPOGRAPHY = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h3: { fontWeight: 600 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
} as const;

const LIGHT_PALETTE = {
  mode: 'light' as const,
  primary: {
    main: '#0f766e',
    light: '#14b8a6',
    dark: '#115e59',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#475569',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  divider: '#e2e8f0',
  success: { main: '#16a34a' },
  warning: { main: '#d97706' },
  error: { main: '#dc2626' },
};

const DARK_PALETTE = {
  mode: 'dark' as const,
  primary: {
    main: '#2dd4bf',
    light: '#5eead4',
    dark: '#0f766e',
    contrastText: '#052e2b',
  },
  secondary: {
    main: '#94a3b8',
  },
  background: {
    // MUI's own dashboard template dark mode uses a dark navy, not pure
    // black, for a premium feel.
    default: '#0a1929',
    paper: '#0f2537',
  },
  text: {
    primary: '#e2e8f0',
    secondary: '#94a3b8',
  },
  divider: 'rgba(148, 163, 184, 0.16)',
  success: { main: '#4ade80' },
  warning: { main: '#fbbf24' },
  error: { main: '#f87171' },
};

export const CARD_SHADOW_LIGHT =
  '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)';
export const CARD_SHADOW_DARK = '0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.35)';

/** Returns the card/paper shadow tuned for the given palette mode. */
export function getCardShadow(mode: PaletteMode): string {
  return mode === 'dark' ? CARD_SHADOW_DARK : CARD_SHADOW_LIGHT;
}

/** Builds the app theme for the given color mode. */
export function getTheme(mode: PaletteMode): Theme {
  const isDark = mode === 'dark';
  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;
  const cardShadow = getCardShadow(mode);

  return createTheme({
    palette,
    shape: {
      borderRadius: 10,
    },
    typography: SHARED_TYPOGRAPHY,
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#0f2537' : '#ffffff',
            color: isDark ? DARK_PALETTE.text.primary : LIGHT_PALETTE.text.primary,
            backgroundImage: 'none',
            borderBottom: `1px dashed ${alpha(palette.text.primary, 0.06)}`,
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.divider}`,
            boxShadow: cardShadow,
          },
        },
      },
      // Overlay surfaces (Dialog/Menu/Popover) share MuiPaper's global
      // `elevation: 0` default, which strips the box-shadow that would
      // normally separate them from the page. On the flat-white light
      // background (see item 1) an unshadowed, unbordered paper can blend
      // into the surrounding page and read as "not open" even though it
      // technically rendered — so these overlay variants get an explicit
      // border + shadow back regardless of the `elevation` prop passed in.
      MuiDialog: {
        styleOverrides: {
          paper: {
            border: `1px solid ${palette.divider}`,
            boxShadow: cardShadow,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            border: `1px solid ${palette.divider}`,
            boxShadow: cardShadow,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            border: `1px solid ${palette.divider}`,
            boxShadow: cardShadow,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: isDark ? 'rgba(148, 163, 184, 0.08)' : palette.background.paper,
            borderBottom: `2px solid ${palette.divider}`,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.03)',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
            fontSize: '0.9375rem',
            // MUI's default color/background/border transitions interpolate
            // between the old and new theme's palette values on every light/
            // dark toggle, reading as a flicker across every button on
            // screen. Buttons don't need a hover-color transition badly
            // enough to justify that, so it's switched off entirely.
            transition: 'none',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#0f2537' : '#ffffff',
            backgroundImage: 'none',
            borderRight: `1px dashed ${palette.divider}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
    },
  });
}
