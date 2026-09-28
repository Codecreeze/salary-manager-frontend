import { useMemo, useState, type ReactNode } from 'react';
import type { NumberFormatLocale } from '@/utils/utilityFunctions';
import {
  SettingsContext,
  SETTINGS_STORAGE_KEY,
  getInitialLocale,
  type SettingsContextValue,
} from '@/hooks/useSettings';

/** Holds the current number-format preference, persists it to localStorage, and exposes a setter. */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [numberFormatLocale, setLocale] = useState<NumberFormatLocale>(getInitialLocale);

  const value = useMemo<SettingsContextValue>(
    () => ({
      numberFormatLocale,
      setNumberFormatLocale: (locale: NumberFormatLocale) => {
        window.localStorage.setItem(SETTINGS_STORAGE_KEY, locale);
        setLocale(locale);
      },
    }),
    [numberFormatLocale],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
