import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { SalaryForm } from '../index';

describe('SalaryForm', () => {
  it('shows a validation error and does not submit when amount is zero', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SalaryForm employeeId="emp-1" />);

    const amountInput = screen.getByLabelText('Amount');
    await user.clear(amountInput);
    await user.type(amountInput, '0');

    await user.click(screen.getByRole('button', { name: /add salary record/i }));

    expect(await screen.findByText('Amount must be greater than zero')).toBeInTheDocument();
  });

  it('shows a required-field error when effective date is cleared', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SalaryForm employeeId="emp-1" />);

    const dateGroup = screen.getByRole('group', { name: 'Effective date' });
    await user.click(dateGroup);
    await user.keyboard('{Control>}a{/Control}{Backspace}');

    await user.click(screen.getByRole('button', { name: /add salary record/i }));

    expect(await screen.findByText('Effective date is required')).toBeInTheDocument();
  });
});
