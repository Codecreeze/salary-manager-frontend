import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { MuiRowActionsMenu } from '../index';

describe('MuiRowActionsMenu', () => {
  it('does not show menu items until the trigger is clicked', () => {
    renderWithProviders(<MuiRowActionsMenu actions={[{ label: 'Edit', onClick: vi.fn() }]} />);

    expect(screen.queryByRole('menuitem', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('opens the menu when the 3-dot trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MuiRowActionsMenu actions={[{ label: 'Edit', onClick: vi.fn() }]} />);

    await user.click(screen.getByRole('button', { name: 'Row actions' }));
    expect(await screen.findByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
  });

  it('calls the matching action onClick and closes the menu', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onView = vi.fn();
    renderWithProviders(
      <MuiRowActionsMenu
        actions={[
          { label: 'Edit', onClick: onEdit },
          { label: 'View', onClick: onView },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Row actions' }));
    await user.click(await screen.findByRole('menuitem', { name: 'View' }));

    expect(onView).toHaveBeenCalledTimes(1);
    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.queryByRole('menuitem', { name: 'View' })).not.toBeInTheDocument();
  });

  it('does not bubble the trigger click to an ancestor click handler (e.g. a clickable table row)', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    renderWithProviders(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={onRowClick}>
        <MuiRowActionsMenu actions={[{ label: 'Edit', onClick: vi.fn() }]} />
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Row actions' }));
    expect(onRowClick).not.toHaveBeenCalled();
  });
});
