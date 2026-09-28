import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { MuiConfirmDialog } from '../index';

describe('MuiConfirmDialog', () => {
  it('does not render its content when closed', () => {
    renderWithProviders(
      <MuiConfirmDialog
        open={false}
        title="Deactivate this employee?"
        description="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.queryByText('Deactivate this employee?')).not.toBeInTheDocument();
  });

  it('renders title and description when open', () => {
    renderWithProviders(
      <MuiConfirmDialog
        open
        title="Deactivate this employee?"
        description="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Deactivate this employee?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    renderWithProviders(
      <MuiConfirmDialog
        open
        title="Deactivate this employee?"
        description="Are you sure?"
        confirmLabel="Deactivate"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Deactivate' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    renderWithProviders(
      <MuiConfirmDialog
        open
        title="Deactivate this employee?"
        description="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('disables both buttons while loading', () => {
    renderWithProviders(
      <MuiConfirmDialog
        open
        title="Deactivate this employee?"
        description="Are you sure?"
        confirmLabel="Deactivate"
        loading
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
  });
});
