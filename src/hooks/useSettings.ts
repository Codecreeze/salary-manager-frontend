import { createContext, useContext } from 'react';
import type { NumberFormatLocale } from '@/utils/utilityFunctions';

export const SETTINGS_STORAGE_KEY = 'salary-manager-number-format';

export interface SettingsContextValue {
  /** Locale driving number/currency grouping only — not a full i18n framework (see docs/RULES.md). */
  numberFormatLocale: NumberFormatLocale;
  setNumberFormatLocale: (locale: NumberFormatLocale) => void;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function getInitialLocale(): NumberFormatLocale {
  if (typeof window === 'undefined') return 'en-US';

  const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
  return stored === 'en-IN' ? 'en-IN' : 'en-US';
}

/** Access the current number-format preference and its setter. */
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
