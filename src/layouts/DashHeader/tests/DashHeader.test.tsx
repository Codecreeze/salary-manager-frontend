import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { DashHeader } from '../index';

const toggleColorMode = vi.fn();

vi.mock('@/themes/colorModeContext', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode }),
}));

describe('DashHeader', () => {
  it('calls toggleColorMode when the theme toggle button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DashHeader onMenuClick={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Toggle color mode' }));

    expect(toggleColorMode).toHaveBeenCalledTimes(1);
  });

  it('opens the account menu and shows the current user info', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DashHeader onMenuClick={vi.fn()} />);

    expect(screen.queryByText('Pradeep Kumar')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open account menu' }));

    expect(await screen.findByText('Pradeep Kumar')).toBeInTheDocument();
    expect(screen.getByText('pradeep@example.com')).toBeInTheDocument();
  });
});
