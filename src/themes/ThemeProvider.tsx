import { useMemo, useState, type ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, type PaletteMode } from '@mui/material';
import { getTheme } from '@/themes/theme';
import {
  ColorModeContext,
  COLOR_MODE_STORAGE_KEY,
  getInitialColorMode,
  type ColorModeContextValue,
} from '@/themes/colorModeContext';

/**
 * Owns the color mode (persisted to localStorage), builds the matching MUI
 * theme, and provides both — the only context in the app, since mode is the
 * one piece of state a descendant (the TopBar toggle) needs to read back.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(getInitialColorMode);

  const colorMode = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [mode],
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
