import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MuiButton } from '../index';

describe('MuiButton', () => {
  it('renders its children', () => {
    render(<MuiButton>Save</MuiButton>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MuiButton onClick={onClick}>Save</MuiButton>);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards the variant prop to the underlying MUI button', () => {
    render(<MuiButton variant="outlined">Save</MuiButton>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('MuiButton-outlined');
  });

  it('leaves an explicit color prop untouched instead of overriding it with the default ink tone', () => {
    render(
      <MuiButton variant="contained" color="error">
        Delete
      </MuiButton>,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('MuiButton-containedError');
  });
});
