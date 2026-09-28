import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import EmployeeListPage from '../index';

describe('EmployeeListPage (filters and pagination)', () => {
  it('updates the search filter in Redux as the user types', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<EmployeeListPage />);

    await screen.findByText('Ada Lovelace');

    await user.type(screen.getByLabelText('Search employees'), 'Ada');

    await waitFor(() => expect(store.getState().employeeFilters.search).toBe('Ada'), {
      timeout: 10000,
    });
  }, 15000);

  it('dispatches a sort change when a sortable column header is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<EmployeeListPage />);

    await screen.findByText('Ada Lovelace');

    await user.click(screen.getByRole('columnheader', { name: /email/i }));

    await waitFor(
      () => {
        expect(store.getState().employeeFilters.sortBy).toBe('email');
        expect(store.getState().employeeFilters.sortOrder).toBe('asc');
      },
      { timeout: 10000 },
    );
  }, 15000);
});
