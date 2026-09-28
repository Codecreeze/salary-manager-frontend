import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencySelect } from '../index';

describe('CurrencySelect', () => {
  it('renders the currently selected currency', () => {
    render(<CurrencySelect currencies={['USD', 'EUR']} value="USD" onChange={vi.fn()} />);

    expect(screen.getByRole('combobox')).toHaveTextContent('USD');
  });

  it('calls onChange with the newly selected currency', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CurrencySelect currencies={['USD', 'EUR']} value="USD" onChange={onChange} />);

    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'EUR' }));

    expect(onChange).toHaveBeenCalledWith('EUR');
  });
});
