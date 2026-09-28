import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../ThemeProvider';
import { useColorMode } from '../colorModeContext';

const STORAGE_KEY = 'salary-manager-color-mode';

function ModeProbe() {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <button type="button" onClick={toggleColorMode}>
      current mode: {mode}
    </button>
  );
}

describe('useColorMode', () => {
  it('throws when used outside a ThemeProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ModeProbe />)).toThrow('useColorMode must be used within a ThemeProvider');

    consoleErrorSpy.mockRestore();
  });
});

describe('ThemeProvider', () => {
  it('defaults to light mode when nothing is stored', () => {
    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('current mode: light');
  });

  it('toggles the mode and persists the new value to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('current mode: dark');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });
});
