import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsProvider } from '../SettingsContext';
import { useSettings } from '../useSettings';

const STORAGE_KEY = 'salary-manager-number-format';

function LocaleProbe() {
  const { numberFormatLocale, setNumberFormatLocale } = useSettings();
  return (
    <button type="button" onClick={() => setNumberFormatLocale('en-IN')}>
      current locale: {numberFormatLocale}
    </button>
  );
}

describe('useSettings', () => {
  it('throws when used outside a SettingsProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<LocaleProbe />)).toThrow(
      'useSettings must be used within a SettingsProvider',
    );

    consoleErrorSpy.mockRestore();
  });
});

describe('SettingsProvider', () => {
  it('defaults to en-US when nothing is stored', () => {
    render(
      <SettingsProvider>
        <LocaleProbe />
      </SettingsProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('current locale: en-US');
  });

  it('updates the locale and persists it to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <SettingsProvider>
        <LocaleProbe />
      </SettingsProvider>,
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('current locale: en-IN');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('en-IN');
  });
});
