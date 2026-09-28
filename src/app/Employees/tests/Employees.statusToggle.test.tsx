import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { mockEmployee } from '@/test/handlers';
import EmployeeListPage from '../index';

const API_BASE_URL = 'http://localhost:3000';

describe('EmployeeListPage (status toggle confirm dialog)', () => {
  it('opens a confirm dialog and calls the update mutation on confirm', async () => {
    let patchedBody: unknown;
    server.use(
      http.patch(`${API_BASE_URL}/employees/emp-1`, async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({
          ...mockEmployee,
          employmentStatus: 'INACTIVE',
        });
      }),
    );

    const user = userEvent.setup();
    renderWithProviders(<EmployeeListPage />);

    await screen.findByText('Ada Lovelace');
    await user.click(screen.getByRole('button', { name: /actions for ada lovelace/i }));
    await user.click(screen.getByText('Inactive'));

    expect(await screen.findByText('Mark employee as Inactive?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Inactive' }));

    await waitFor(
      () => {
        expect(patchedBody).toEqual({ employmentStatus: 'INACTIVE' });
      },
      { timeout: 10000 },
    );
  }, 15000);

  it('closes the dialog without saving when cancelled', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmployeeListPage />);

    await screen.findByText('Ada Lovelace');
    await user.click(screen.getByRole('button', { name: /actions for ada lovelace/i }));
    await user.click(screen.getByText('Inactive'));

    expect(await screen.findByText('Mark employee as Inactive?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(
      () => {
        expect(screen.queryByText('Mark employee as Inactive?')).not.toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  }, 15000);
});
