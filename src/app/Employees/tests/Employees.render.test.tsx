import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { mockEmployee } from '@/test/handlers';
import { suppressConsoleError } from '@/test/suppressConsoleError';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import EmployeeListPage from '../index';

const API_BASE_URL = 'http://localhost:3000';

describe('EmployeeListPage (render)', () => {
  it('renders the employee directory once the list loads', async () => {
    renderWithProviders(<EmployeeListPage />);

    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(await screen.findByText('Ada Lovelace', {}, { timeout: 10000 })).toBeInTheDocument();
    expect(screen.getByText('EMP-00001')).toBeInTheDocument();
  }, 15000);

  it('throws (caught by an ErrorBoundary) when the employee list fails to load', async () => {
    const restoreConsoleError = suppressConsoleError();
    server.use(http.get(`${API_BASE_URL}/employees`, () => HttpResponse.error()));

    renderWithProviders(
      <ErrorBoundary>
        <EmployeeListPage />
      </ErrorBoundary>,
    );

    expect(
      await screen.findByText('Whoops! Something went wrong.', {}, { timeout: 10000 }),
    ).toBeInTheDocument();
    restoreConsoleError();
  }, 15000);

  it('opens the view drawer with employee profile and salary history when View is clicked', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    server.use(
      http.get(`${API_BASE_URL}/employees/emp-1`, () =>
        HttpResponse.json({
          ...mockEmployee,
          managerId: null,
          manager: null,
          createdAt: '2020-01-15T00:00:00.000Z',
          updatedAt: '2020-01-15T00:00:00.000Z',
          salaryHistory: [],
        }),
      ),
    );

    renderWithProviders(<EmployeeListPage />);

    await screen.findByText('Ada Lovelace', {}, { timeout: 10000 });
    await user.click(screen.getByRole('button', { name: /actions for ada lovelace/i }));
    await user.click(screen.getByText('View'));

    expect(await screen.findByText('Salary history', {}, { timeout: 10000 })).toBeInTheDocument();
    expect(screen.getAllByText('EMP-00001').length).toBeGreaterThan(0);
  }, 15000);
});
