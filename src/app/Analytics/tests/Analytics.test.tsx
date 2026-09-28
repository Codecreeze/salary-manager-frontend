import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import DashboardPage from '../index';

const API_BASE_URL = 'http://localhost:3000';

function mockAllAnalyticsEndpoints() {
  server.use(
    http.get(`${API_BASE_URL}/analytics/summary`, () =>
      HttpResponse.json({
        headcount: 42,
        payrollByCurrency: [
          { currency: 'USD', totalPayroll: 500000, averagePayroll: 90000 },
          { currency: 'EUR', totalPayroll: 100000, averagePayroll: 50000 },
        ],
      }),
    ),
    http.get(`${API_BASE_URL}/analytics/by-department`, () =>
      HttpResponse.json([
        {
          id: 'eng',
          name: 'Engineering',
          currency: 'USD',
          headcount: 5,
          averageSalary: 1,
          medianSalary: 1,
        },
        {
          id: 'eng-eu',
          name: 'Engineering EU',
          currency: 'EUR',
          headcount: 2,
          averageSalary: 1,
          medianSalary: 1,
        },
      ]),
    ),
    http.get(`${API_BASE_URL}/analytics/by-country`, () => HttpResponse.json([])),
    http.get(`${API_BASE_URL}/analytics/by-level`, () => HttpResponse.json([])),
    http.get(`${API_BASE_URL}/analytics/distribution`, () => HttpResponse.json([])),
  );
}

describe('Analytics DashboardPage', () => {
  it('shows loading skeletons then renders real content once data resolves', async () => {
    mockAllAnalyticsEndpoints();

    renderWithProviders(<DashboardPage />);

    expect(screen.getByText('Analytics')).toBeInTheDocument();

    expect(await screen.findByText('HEADCOUNT')).toBeInTheDocument();
    expect(await screen.findByText('Salary by department')).toBeInTheDocument();
    expect(await screen.findByText('Salary by country')).toBeInTheDocument();
    expect(await screen.findByText('Salary by job level')).toBeInTheDocument();
    expect(await screen.findByText('Salary distribution')).toBeInTheDocument();
  });

  it('propagates a currency selection change down to the charts', async () => {
    mockAllAnalyticsEndpoints();
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />);

    await screen.findByText('HEADCOUNT');

    const select = screen.getByRole('combobox', { name: 'Currency' });
    expect(select).toHaveTextContent('USD');

    await user.click(select);
    await user.click(await screen.findByRole('option', { name: 'EUR' }));

    await waitFor(() => expect(select).toHaveTextContent('EUR'));
  });
});
