import { createContext, useContext } from 'react';
import type { PaletteMode } from '@mui/material';

export const COLOR_MODE_STORAGE_KEY = 'salary-manager-color-mode';

export interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

export function getInitialColorMode(): PaletteMode {
  if (typeof window === 'undefined') return 'light';

  const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/** Access the current color mode and its toggle function. */
export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ThemeProvider');
  }
  return context;
}
