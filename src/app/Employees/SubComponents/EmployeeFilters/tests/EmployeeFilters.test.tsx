import { describe, expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { EmployeeFilters } from '../index';

describe('EmployeeFilters', () => {
  it('updates the Redux search filter as the user types', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<EmployeeFilters />);

    const searchInput = screen.getByLabelText('Search employees');
    await user.type(searchInput, 'Ada');

    await waitFor(() => {
      expect(store.getState().employeeFilters.search).toBe('Ada');
    });
  });

  it('lists department options fetched from the lookups API', async () => {
    renderWithProviders(<EmployeeFilters />);

    const departmentSelect = await screen.findByLabelText('Department');
    await userEvent.setup().click(departmentSelect);

    const listbox = await screen.findByRole('listbox');
    expect(await within(listbox).findByText('Engineering')).toBeInTheDocument();
    expect(await within(listbox).findByText('Sales')).toBeInTheDocument();
  });
});
